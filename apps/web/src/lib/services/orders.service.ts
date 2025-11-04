import { createClient } from "@franceshr/database/service-role";
import type {
  CreateOrderData,
  Order,
  OrderInsert,
  OrderUpdate,
  OrderWithOnboarding,
} from "@franceshr/types";

import { DatabaseError, handleError, NotFoundError } from "@/lib/utils/error-handler";

class OrdersServiceClass {
  /**
   * Create a new order from checkout session
   */
  async createFromCheckout(data: CreateOrderData): Promise<Order> {
    try {
      const supabase = await createClient();

      const orderData: OrderInsert = {
        user_id: data.userId,
        email: data.email || "",
        package_slug: data.packageSlug,
        stripe_checkout_session_id: data.stripeCheckoutSessionId,
        stripe_payment_intent_id: data.stripePaymentIntentId,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        metadata: (data.metadata as never) || {},
      };

      const { data: order, error } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (error) {
        throw new DatabaseError("Failed to create order", error);
      }

      return order;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get order by ID
   */
  async getById(orderId: string): Promise<Order> {
    try {
      const supabase = await createClient();

      const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error || !order) {
        throw new NotFoundError("Order");
      }

      return order;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get order by checkout session ID
   */
  async getByCheckoutSessionId(sessionId: string): Promise<Order> {
    try {
      const supabase = await createClient();

      const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("stripe_checkout_session_id", sessionId)
        .single();

      if (error || !order) {
        throw new NotFoundError("Order");
      }

      return order;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get order by payment intent ID
   */
  async getByPaymentIntentId(paymentIntentId: string): Promise<Order | null> {
    try {
      const supabase = await createClient();

      const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("stripe_payment_intent_id", paymentIntentId)
        .single();

      if (error) {
        return null;
      }

      return order;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get all orders for a user
   */
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const supabase = await createClient();

      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new DatabaseError("Failed to fetch orders", error);
      }

      return orders || [];
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get order with onboarding data
   */
  async getWithOnboarding(orderId: string): Promise<OrderWithOnboarding> {
    try {
      const supabase = await createClient();

      const { data: order, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          onboarding_data (*)
        `,
        )
        .eq("id", orderId)
        .single();

      if (error || !order) {
        throw new NotFoundError("Order");
      }

      return order as OrderWithOnboarding;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Update order status
   */
  async updateStatus(
    orderId: string,
    status: "pending" | "paid" | "failed" | "completed",
  ): Promise<Order> {
    try {
      const supabase = await createClient();

      const { data: order, error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId)
        .select()
        .single();

      if (error) {
        throw new DatabaseError("Failed to update order status", error);
      }

      return order;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Update payment intent details
   */
  async updatePaymentIntent(params: {
    paymentIntentId: string;
    amount: number;
    currency: string;
    status: string;
  }): Promise<void> {
    try {
      const supabase = await createClient();

      const updateData: OrderUpdate = {
        stripe_payment_intent_id: params.paymentIntentId,
        amount: params.amount,
        currency: params.currency,
        status: params.status as "pending" | "paid" | "failed",
      };

      const { error } = await supabase
        .from("orders")
        .update(updateData)
        .eq("stripe_payment_intent_id", params.paymentIntentId);

      if (error) {
        throw new DatabaseError("Failed to update payment intent", error);
      }
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Save Stripe customer ID for user
   */
  async saveStripeCustomerId(userId: string, customerId: string): Promise<void> {
    try {
      const supabase = await createClient();

      // Store in user metadata or separate table
      const { error } = await supabase
        .from("orders")
        .update({ metadata: { stripe_customer_id: customerId } })
        .eq("user_id", userId)
        .limit(1);

      if (error) {
        throw new DatabaseError("Failed to save customer ID", error);
      }
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get Stripe customer ID for user
   */
  async getStripeCustomerId(userId: string): Promise<string | null> {
    try {
      const supabase = await createClient();

      const { data: order } = await supabase
        .from("orders")
        .select("metadata")
        .eq("user_id", userId)
        .limit(1)
        .single();

      if (order?.metadata && typeof order.metadata === "object") {
        const metadata = order.metadata as { stripe_customer_id?: string };
        return metadata.stripe_customer_id || null;
      }

      return null;
    } catch (error) {
      throw handleError(error);
    }
  }
}

// Export singleton instance for easy usage while maintaining testability
export const OrdersService = new OrdersServiceClass();

// Export class for testing/mocking
export { OrdersServiceClass };
