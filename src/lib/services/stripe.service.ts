import type Stripe from "stripe";

import stripe from "@/lib/stripe/get-stripe";
import { handleError } from "@/lib/utils/error-handler";

import { OrdersService } from "./orders.service";

class StripeServiceClass {
  /**
   * Create a checkout session for one-time payment
   */
  async createCheckoutSession(params: {
    userId: string;
    priceId: string;
    packageSlug: string;
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
  }): Promise<Stripe.Checkout.Session> {
    try {
      const { userId, priceId, packageSlug, successUrl, cancelUrl, customerEmail } = params;

      // Get or create Stripe customer
      const customerId = await this.getOrCreateCustomer(userId, customerEmail);

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card", "link"],
        customer: customerId,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId,
          package_slug: packageSlug,
        },
      });

      return session;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Get or create Stripe customer for user
   */
  async getOrCreateCustomer(userId: string, email?: string): Promise<string> {
    try {
      // Check if customer exists in database
      const existingCustomer = await OrdersService.getStripeCustomerId(userId);

      if (existingCustomer) {
        return existingCustomer;
      }

      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email,
        metadata: { userId },
      });

      // Save customer ID to database
      await OrdersService.saveStripeCustomerId(userId, customer.id);

      return customer.id;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Retrieve receipt URL from payment intent
   */
  async getReceiptUrl(paymentIntentId: string): Promise<string | null> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.latest_charge && typeof paymentIntent.latest_charge === "string") {
        const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);
        return charge.receipt_url;
      }

      return null;
    } catch (error) {
      console.error("Error retrieving receipt URL:", error);
      return null;
    }
  }

  /**
   * Create subscription for recurring payments
   */
  async createSubscription(params: {
    userId: string;
    priceId: string;
    customerEmail?: string;
  }): Promise<Stripe.Subscription> {
    try {
      const { userId, priceId, customerEmail } = params;

      const customerId = await this.getOrCreateCustomer(userId, customerEmail);

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        metadata: { userId },
      });

      return subscription;
    } catch (error) {
      throw handleError(error);
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      await stripe.subscriptions.cancel(subscriptionId);
    } catch (error) {
      throw handleError(error);
    }
  }
}

// Export singleton instance
export const StripeService = new StripeServiceClass();

// Export class for testing
export { StripeServiceClass };
