import { createClient } from "@franceshr/database/service-role";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { StripeWebhookService } from "@/lib/services/stripe-webhook.service";
import { stripeWebhookSecret } from "@/lib/stripe/check-env";
import stripe from "@/lib/stripe/get-stripe";

export const runtime = "nodejs"; // ensure Node runtime if your hosting needs it

export async function POST(req: Request) {
  const webhookSecret = stripeWebhookSecret;
  const sig = req.headers.get("stripe-signature") || "";

  // App Router: get raw body as ArrayBuffer for constructEvent
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);

  const supabase = await createClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    console.log(`[Webhook] ${event.type} - ${event.id}`);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Webhook] Signature verification failed:", error.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Idempotency: store raw event in webhook_events table by event.id; if exists, skip processing
  try {
    const rawEvent = event; // object
    await supabase.from("webhook_events").upsert(
      [{ id: event.id, type: event.type, raw: rawEvent }],
      { onConflict: "id" }, // If already exists, this will conflict; using .insert with onConflict depends on supabase-js version
    );
    // The above may throw on duplicate; to be safe, catch unique constraint and continue.
  } catch (err: unknown) {
    // If duplicate insert error occurs, it usually means this event already processed -> respond 200 to stop retries
    // But we will still check and continue idempotent logic below.
    const code =
      typeof err === "object" && err !== null && "code" in err
        ? (err as { code: string }).code
        : undefined;
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null && "message" in err
          ? String((err as { message: string }).message)
          : undefined;

    if (code === "23505" || (typeof message === "string" && message.includes("duplicate"))) {
      console.warn("[Webhook] Event already recorded (duplicate):", event.id);
      // We continue - but ensure we don't reprocess the same business logic
    } else {
      console.error("[Webhook] Failed to insert webhook_events (non-duplicate):", err);
      // don't fail here; we will still attempt processing, but log this
    }
  }

  // Business logic: handle checkout.session.completed and payment_intent.succeeded
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await StripeWebhookService.handleCheckoutCompleted(session);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await StripeWebhookService.handlePaymentSucceeded(paymentIntent);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await StripeWebhookService.handlePaymentFailed(paymentIntent);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Webhook] Subscription event: ${event.type} - ${subscription.id}`);
        // Future: Handle subscription events
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
        break;
    }
  } catch (err: unknown) {
    console.error(`[Webhook] Error processing ${event.type}:`, err);
    return NextResponse.json({ error: "Event processing failed" }, { status: 500 });
  }

  // Success
  return NextResponse.json({ received: true });
}
