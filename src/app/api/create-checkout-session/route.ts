// app/api/create-checkout-session/route.js
import { NextResponse } from "next/server";

import stripe from "@/lib/stripe/get-stripe";
import { createClient } from "@/lib/supabase/server";

/**
 * Expected POST JSON:
 * {
 *   userId: "<uuid>",        // auth.users.id
 *   priceId: "price_ABC",    // Stripe Price id (use prices table to validate)
 *   package_slug: "basic-1", // your product reference (stored in orders.package_slug)
 *   successUrl: "https://.../checkout-success",
 *   cancelUrl: "https://.../cancel"
 * }
 */
export async function POST(req: Request) {
  const supabase = await createClient();
  try {
    const body = await req.json();
    const { userId, priceId, package_slug, successUrl, cancelUrl } = body;

    if (!userId || !priceId || !successUrl || !cancelUrl || !package_slug) {
      return NextResponse.json({ error: "Missing required params" }, { status: 400 });
    }

    const { data: priceRow, error: priceErr } = await supabase
      .from("prices")
      .select("id, unit_amount, currency, active")
      .eq("id", priceId)
      .single();

    if (priceErr || !priceRow || !priceRow.active) {
      // If you prefer not to fail on validation, remove this block; validation is recommended.
      console.error("Price lookup error", priceErr);
      return NextResponse.json({ error: "Invalid priceId" }, { status: 400 });
    }

    // Fetch user email (we store email on orders; get from auth.users or profiles table)
    // Prefer the table you have user data in; adapt if you store email elsewhere.
    const {
      data: { user: userRow },
    } = await supabase.auth.getUser();

    if (!userRow) {
      console.error("User lookup error");
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }
    if (!userRow.email) {
      console.error("User email lookup error");
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    // Fallback: try auth.users via RPC or profiles if you have a profiles table
    // For simplicity here we do not fail if `users` row missing; Stripe session will still work.
    // Create or reuse Stripe Customer if we have an email or stored stripe_customer_id in customers table
    const { data: customerRow, error: customerErr } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single();

    let customerId = customerRow?.stripe_customer_id ?? null;

    if (!customerId || customerErr) {
      // Optionally create a Stripe Customer and persist it. We use fallback email from metadata if you prefer.
      // If you don't have user email available here, you can omit `customer` in session and Stripe will create one.
      // Create customer with metadata.userId for traceability.
      const newCustomer = await stripe.customers.create({
        metadata: { userId, email: userRow.email },
      });
      customerId = newCustomer.id;

      // Persist customerId into customers table (id = userId)
      await supabase.from("users").update({ stripe_customer_id: customerId }).eq("id", userId);
    }

    // Create Checkout Session (one-time payment)
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "link"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId,
      metadata: { userId, package_slug, priceId },
      // pass back session id so client can verify on success page
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("create-checkout-session:", err);
    return NextResponse.json({ error: (err as Error).message || "Server error" }, { status: 500 });
  }
}
