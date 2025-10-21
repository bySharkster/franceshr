import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import "npm:tslib@2.6.0";
import Stripe from "npm:stripe@19.1.0";
import { createClient } from "npm:@supabase/supabase-js@2.33.0";
const supabaseUrl = Deno.env.get("NEXT_PUBLIC_SUPABASE_URL");
const supabaseServiceRole = Deno.env.get("NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY");
const stripeSecret = Deno.env.get("STRIPE_API_KEY");
const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET");

if (!supabaseUrl || !supabaseServiceRole) {
  console.error("Missing Supabase env vars");
}
if (!stripeSecret || !stripeWebhookSecret) {
  console.error("Missing Stripe env vars");
}

const supabase = createClient(supabaseUrl, supabaseServiceRole, {
  auth: {
    persistSession: false
  }
});


const stripe = new Stripe(stripeSecret ?? "", {
  // apiVersion: "2025-09-30.clover"
  apiVersion: "2023-10-16"
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();
console.info('Stripe Webhook Function booted (async verification)');
Deno.serve(async (req)=>{
  console.info('Received webhook event:', req);
  try {
    const body = await req.text();
    const sig = req.headers.get('Stripe-Signature') ?? req.headers.get('stripe-signature') ?? '';
    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, sig, stripeWebhookSecret ?? "", undefined, cryptoProvider);
    } catch (err) {
      console.error('Webhook signature verification failed:', err?.message ?? err);
      return new Response(JSON.stringify({
        error: 'Invalid signature'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    console.info(`🔔 Event received: ${event.id} (${event.type})`);
    // Idempotency: attempt to insert event id into webhook_events; if exists, skip processing
    const eventRow = {
      id: event.id,
      type: event.type,
      received_at: new Date().toISOString(),
      raw: event
    };
    const { error: insertError } = await supabase.from('webhook_events').insert(eventRow).select();
    if (insertError) {
      // If conflict (duplicate), Supabase returns an error - detect by message
      if (String(insertError.message).includes('duplicate') || String(insertError.message).includes('unique')) {
        console.info('Duplicate event received, skipping processing:', event.id);
        return new Response(JSON.stringify({
          received: true,
          skipped: true
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      console.error('Failed to record webhook event:', insertError.message ?? insertError);
    // proceed cautiously: still process to avoid missing important updates
    }
    switch(event.type){
      case 'product.created':
      case 'product.updated':
        {
          const product = event.data.object;
          await upsertProduct(product);
          break;
        }
      case 'product.deleted':
        {
          const product = event.data.object;
          await markProductDeleted(product);
          break;
        }
      case 'price.created':
      case 'price.updated':
        {
          const price = event.data.object;
          await upsertPrice(price);
          break;
        }
      case 'price.deleted':
        {
          const price = event.data.object;
          await markPriceDeleted(price);
          break;
        }
      case 'customer.created':
      case 'customer.updated':
        {
          const customer = event.data.object;
          await upsertCustomer(customer);
          break;
        }
      case 'customer.deleted':
        {
          const customer = event.data.object;
          await markCustomerDeleted(customer);
          break;
        }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        {
          const subscription = event.data.object;
          await upsertSubscription(subscription);
          break;
        }
      case 'customer.subscription.deleted':
        {
          const subscription = event.data.object;
          await markSubscriptionDeleted(subscription);
          break;
        }
      case 'invoice.payment_succeeded':
        {
          console.info('Invoice payment succeeded:', event.data.object.id);
          break;
        }
      default:
        console.info('Unhandled event type:', event.type);
    }
    return new Response(JSON.stringify({
      received: true
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('Handler error:', err);
    return new Response(JSON.stringify({
      error: 'internal_error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});

async function upsertProduct(product) {
  const row = {
    id: product.id,
    active: product.active ?? true,
    name: product.name ?? null,
    description: product.description ?? null,
    image: Array.isArray(product.images) && product.images.length ? product.images[0] : null,
    metadata: product.metadata ?? {}
  };
  const { error } = await supabase.from('products').upsert(row, {
    onConflict: 'id'
  });
  if (error) console.error('upsertProduct error:', error.message ?? error);
}
async function markProductDeleted(product) {
  const { error } = await supabase.from('products').update({
    active: false
  }).eq('id', product.id);
  if (error) console.error('markProductDeleted error:', error.message ?? error);
}
async function upsertPrice(price) {
  const unitAmount = price.unit_amount ?? (price.unit_amount_decimal ? Math.round(Number(price.unit_amount_decimal)) : null);
  const recurring = price.recurring ?? null;
  const row = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : price.product?.id,
    active: price.active ?? true,
    description: price.nickname ?? null,
    unit_amount: unitAmount,
    currency: price.currency ?? null,
    type: price.type ?? null,
    interval: recurring?.interval ?? null,
    interval_count: recurring?.interval_count ?? null,
    trial_period_days: price.trial_period_days ?? null,
    metadata: price.metadata ?? {}
  };
  const { error } = await supabase.from('prices').upsert(row, {
    onConflict: 'id'
  });
  if (error) console.error('upsertPrice error:', error.message ?? error);
}
async function markPriceDeleted(price) {
  const { error } = await supabase.from('prices').update({
    active: false
  }).eq('id', price.id);
  if (error) console.error('markPriceDeleted error:', error.message ?? error);
}
async function upsertCustomer(customer) {
  const row = {
    id: customer.id,
    email: customer.email ?? null,
    name: customer.name ?? null,
    phone: customer.phone ?? null,
    metadata: customer.metadata ?? {},
    created_at: customer.created ? new Date(customer.created * 1000).toISOString() : null
  };
  const { error } = await supabase.from('customers').upsert(row, {
    onConflict: 'id'
  });
  if (error) console.error('upsertCustomer error:', error.message ?? error);
}
async function markCustomerDeleted(customer) {
  const { error } = await supabase.from('customers').update({
    archived: true
  }).eq('id', customer.id);
  if (error) console.error('markCustomerDeleted error:', error.message ?? error);
}
async function upsertSubscription(subscription) {
  const firstItem = subscription.items?.data?.[0];
  const priceId = firstItem ? firstItem.price?.id ?? firstItem.price : null;
  const row = {
    id: subscription.id,
    customer_id: subscription.customer ?? null,
    status: subscription.status ?? null,
    price_id: priceId,
    quantity: firstItem?.quantity ?? null,
    current_period_start: subscription.current_period_start ? new Date(subscription.current_period_start * 1000).toISOString() : null,
    current_period_end: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null,
    cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
    metadata: subscription.metadata ?? {}
  };
  const { error } = await supabase.from('subscriptions').upsert(row, {
    onConflict: 'id'
  });
  if (error) console.error('upsertSubscription error:', error.message ?? error);
}
async function markSubscriptionDeleted(subscription) {
  const { error } = await supabase.from('subscriptions').update({
    status: subscription.status ?? 'canceled'
  }).eq('id', subscription.id);
  if (error) console.error('markSubscriptionDeleted error:', error.message ?? error);
}
