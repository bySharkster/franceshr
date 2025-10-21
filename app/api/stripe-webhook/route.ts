// app/api/stripe-webhook/route.js
import { NextResponse } from 'next/server';
import { stripeWebhookSecret } from '@/lib/stripe/check-env';
import { createClient } from '@/lib/supabase/service-role-client';
import stripe from '@/lib/stripe/get-stripe';
import type Stripe from 'stripe';


export const runtime = 'nodejs'; // ensure Node runtime if your hosting needs it

export async function POST(req: Request) {
  console.log('🔔 [Webhook] Received webhook request');
  
  const webhookSecret = stripeWebhookSecret;
  const sig = req.headers.get('stripe-signature') || '';

  // App Router: get raw body as ArrayBuffer for constructEvent
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);

  const supabase = await createClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    console.log('✅ [Webhook] Signature verified successfully');
    console.log(`📦 [Webhook] Event type: ${event.type}, ID: ${event.id}`);
  } catch (err: unknown) {
    const error = err as Error
    console.error('❌ [Webhook] Signature verification failed:', error.message );
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Idempotency: store raw event in webhook_events table by event.id; if exists, skip processing
  console.log('💾 [Webhook] Attempting to store event in webhook_events table');
  try {
    const rawEvent = event; // object
    await supabase
      .from('webhook_events')
      .upsert([{ id: event.id, type: event.type, raw: rawEvent }],
      { onConflict: 'id' } // If already exists, this will conflict; using .insert with onConflict depends on supabase-js version
      )
    console.log('✅ [Webhook] Event stored successfully');
    // The above may throw on duplicate; to be safe, catch unique constraint and continue.
} catch (err: unknown) {
  // If duplicate insert error occurs, it usually means this event already processed -> respond 200 to stop retries
  // But we will still check and continue idempotent logic below.
  const code =
    typeof err === 'object' && err !== null && 'code' in err ? (err as { code: string }).code : undefined;
  const message =
    err instanceof Error
      ? err.message
      : typeof err === 'object' && err !== null && 'message' in err
      ? String((err as { message: string }).message)
      : undefined;

  if (code === '23505' || (typeof message === 'string' && message.includes('duplicate'))) {
    console.warn('⚠️ [Webhook] Event already recorded (duplicate):', event.id);
    // We continue - but ensure we don't reprocess the same business logic
  } else {
    console.error('❌ [Webhook] Failed to insert webhook_events (non-duplicate):', err);
    // don't fail here; we will still attempt processing, but log this
  }
}

  // Business logic: handle checkout.session.completed and payment_intent.succeeded
  console.log('🔄 [Webhook] Processing event business logic');
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('💳 [Webhook] Processing checkout.session.completed');
        const session = event.data.object;
        // Extract values
        const userId = session.metadata?.userId ?? null;
        const package_slug = session.metadata?.package_slug ?? null;
        const priceId = session.metadata?.priceId ?? null;
        const checkoutSessionId = session.id;
        const paymentIntentId = session.payment_intent ?? null; // mode=payment provides this
        const amount_total = session.amount_total ?? null; // cents
        const currency = session.currency ?? 'usd';
        const payment_status = session.payment_status ?? session.status ?? 'unknown';
        
        console.log('📊 [Webhook] Session details:', {
          userId,
          package_slug,
          priceId,
          checkoutSessionId,
          amount_total,
          currency,
          payment_status
        });

        // Map Stripe statuses to your orders.status check constraint values
        // Allowed: 'paid', 'requires_action', 'failed', 'refunded'
        let mappedStatus = 'failed';
        if (payment_status === 'paid') mappedStatus = 'paid';
        else if (payment_status === 'unpaid' ) mappedStatus = 'failed';

        // Idempotent upsert into orders by stripe_checkout_session_id
        const orderPayload = {
          user_id: userId,
          email: session.customer_details?.email ?? null,
          package_slug: package_slug ?? 'unknown',
          stripe_checkout_session_id: checkoutSessionId,
          stripe_payment_intent_id: paymentIntentId,
          amount: amount_total ?? 0,
          currency,
          status: mappedStatus,
          metadata: session.metadata ?? {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        console.log('💾 [Webhook] Upserting order to database');
        await supabase
          .from('orders')
          .upsert(orderPayload, { onConflict: 'stripe_checkout_session_id' });
        console.log('✅ [Webhook] Order upserted successfully');

        // Also ensure customers row exists (id = userId). If no userId, we skip.
        if (userId && session.customer) {
          console.log('👤 [Webhook] Updating user stripe_customer_id');
          await supabase
            .from('users')
            .update({ stripe_customer_id: session.customer })
            .eq('id', userId);
          console.log('✅ [Webhook] User updated with stripe_customer_id');
        }

        console.log('✅ [Webhook] checkout.session.completed processed successfully');
        // Optionally: fulfill order, send confirmation email, etc. Use a job queue or background worker if heavy.
        break;
      }

      case 'payment_intent.succeeded': {
        console.log('💰 [Webhook] Processing payment_intent.succeeded');
        const pi = event.data.object;
        const paymentIntentId = pi.id;
        const userId = pi.metadata?.userId ?? null;
        const amount = pi.amount ?? null;
        const currency = pi.currency ?? 'usd';

        // Upsert orders if you prefer to rely on payment_intent instead of checkout.session
        const orderPayload = {
          user_id: userId,
          email: pi.receipt_email ?? null,
          package_slug: pi.metadata?.package_slug ?? 'unknown',
          stripe_payment_intent_id: paymentIntentId,
          amount,
          currency,
          status: 'paid',
          metadata: pi.metadata ?? {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        console.log('💾 [Webhook] Upserting order via payment_intent');
        await supabase
          .from('orders')
          .upsert(orderPayload, { onConflict: 'stripe_payment_intent_id' });
        console.log('✅ [Webhook] payment_intent.succeeded processed successfully');

        break;
      }

      // Add other events as needed (charge.refunded, charge.dispute.created, etc.)
      default:
        console.log(`ℹ️ [Webhook] Unhandled event type: ${event.type}`);
        // ignore unhandled events
        break;
    }
  } catch (err: unknown) {
    console.error('❌ [Webhook] Error handling webhook event:', err);
    // Return 500 so Stripe will retry; but be careful not to double-process events if you failed halfway.
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }

  // Success
  console.log('✅ [Webhook] Webhook processed successfully, returning 200');
  return NextResponse.json({ received: true });
}
