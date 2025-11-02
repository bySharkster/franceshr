import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils/error-handler";

/**
 * GDPR Article 20: Right to Data Portability
 * Export all user data in machine-readable format
 */
export async function GET() {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Collect all user data
    const userData: Record<string, unknown> = {
      exportDate: new Date().toISOString(),
      exportVersion: "1.0",
      gdprCompliance: "Article 20 - Right to Data Portability",

      // User Profile
      profile: {
        id: user.id,
        email: user.email,
        fullName: user.user_metadata?.full_name || null,
        createdAt: user.created_at,
        lastSignIn: user.last_sign_in_at,
      },

      // Orders
      orders: [],

      // Onboarding Data
      onboardingData: [],

      // Metadata
      metadata: {
        provider: user.app_metadata?.provider,
        providers: user.app_metadata?.providers,
      },
    };

    // Fetch orders
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id);

    if (!ordersError && orders) {
      userData.orders = orders;
    }

    // Fetch onboarding data
    const { data: onboarding, error: onboardingError } = await supabase
      .from("onboarding_data")
      .select("*")
      .eq("user_id", user.id);

    if (!onboardingError && onboarding) {
      userData.onboardingData = onboarding;
    }

    // Return as downloadable JSON
    return new NextResponse(JSON.stringify(userData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="franceshr-data-export-${user.id}-${new Date().toISOString().split("T")[0]}.json"`,
      },
    });
  } catch (error) {
    console.error("Data export error:", error);
    return NextResponse.json({ error: handleError(error).message }, { status: 500 });
  }
}
