import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Order {
  id: string;
  user_id: string;
  email: string;
  package_slug: string;
  stripe_checkout_session_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  status: string;
  metadata: JSON;
  created_at: string;
  updated_at: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role key for admin operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    // Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    console.log(`[Auto-Close Orders] Running at ${new Date().toISOString()}`);
    console.log(`[Auto-Close Orders] Checking orders older than ${sevenDaysAgoISO}`);

    // Find all paid orders that are older than 7 days and still open
    const { data: ordersToClose, error: fetchError } = await supabaseClient
      .from("orders")
      .select("id, user_id, status, created_at, package_slug")
      .eq("status", "paid")
      .lt("created_at", sevenDaysAgoISO);

    if (fetchError) {
      console.error("[Auto-Close Orders] Error fetching orders:", fetchError);
      throw fetchError;
    }

    if (!ordersToClose || ordersToClose.length === 0) {
      console.log("[Auto-Close Orders] No orders to close");
      return new Response(
        JSON.stringify({
          success: true,
          message: "No orders to close",
          closedCount: 0,
          timestamp: new Date().toISOString(),
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        },
      );
    }

    console.log(`[Auto-Close Orders] Found ${ordersToClose.length} orders to close`);

    // Update all orders to 'completed' status
    const orderIds = ordersToClose.map((order: Order) => order.id);

    const { data: updatedOrders, error: updateError } = await supabaseClient
      .from("orders")
      .update({
        status: "completed",
        updated_at: new Date().toISOString(),
      })
      .in("id", orderIds)
      .select();

    if (updateError) {
      console.error("[Auto-Close Orders] Error updating orders:", updateError);
      throw updateError;
    }

    console.log(`[Auto-Close Orders] Successfully closed ${updatedOrders?.length || 0} orders`);

    // Log the closed orders for audit trail
    for (const order of ordersToClose) {
      console.log(
        `[Auto-Close Orders] Closed order ${order.id} for user ${order.user_id} (${order.package_slug})`,
      );
    }

    // TODO: Optional: Send notification emails to users (implement if needed)
    // await sendClosureNotifications(ordersToClose);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully closed ${updatedOrders?.length || 0} orders`,
        closedCount: updatedOrders?.length || 0,
        closedOrders: updatedOrders?.map((o) => ({
          id: o.id,
          userId: o.user_id,
          packageSlug: o.package_slug,
        })),
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("[Auto-Close Orders] Fatal error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});

/* TODO: Optional: Function to send closure notification emails
async function sendClosureNotifications(orders: Order[]) {
  // Implement email notifications using Resend or similar
  // This would notify users that their service period has ended
  for (const order of orders) {
    try {
      // await sendEmail({
      //   to: order.user_email,
      //   subject: "Service Completed - FrancesHR",
      //   body: `Your ${order.service_type} service has been completed.`
      // });
      console.log(`[Notification] Sent closure email for order ${order.id}`);
    } catch (error) {
      console.error(`[Notification] Failed to send email for order ${order.id}:`, error);
    }
  }
}
*/
