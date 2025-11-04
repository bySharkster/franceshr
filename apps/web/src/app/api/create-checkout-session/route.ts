import { createClient } from "@franceshr/database/server";
import { NextResponse } from "next/server";

import { StripeService } from "@/lib/services/stripe.service";

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

    // Validate price exists and is active
    const { data: priceRow, error: priceErr } = await supabase
      .from("prices")
      .select("id, unit_amount, currency, active")
      .eq("id", priceId)
      .single();

    if (priceErr || !priceRow || !priceRow.active) {
      console.error("Price lookup error", priceErr);
      return NextResponse.json({ error: "Invalid priceId" }, { status: 400 });
    }

    // Get user email
    const {
      data: { user: userRow },
    } = await supabase.auth.getUser();

    if (!userRow || !userRow.email) {
      console.error("User lookup error");
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }

    // Create checkout session using StripeService
    const session = await StripeService.createCheckoutSession({
      userId,
      priceId,
      packageSlug: package_slug,
      successUrl: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl,
      customerEmail: userRow.email,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("[Checkout] Error creating session:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
