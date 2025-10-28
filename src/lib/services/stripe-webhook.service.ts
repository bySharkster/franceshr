import type Stripe from "stripe";

import stripe from "@/lib/stripe/get-stripe";
import { handleError } from "@/lib/utils/error-handler";

import { EmailService } from "./email.service";
import { OrdersService } from "./orders.service";

class StripeWebhookServiceClass {
  /**
   * Handle checkout.session.completed event
   */
  async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
    try {
      const userId = session.metadata?.userId;
      const packageSlug = session.metadata?.package_slug;

      if (!userId || !packageSlug) {
        throw new Error("Missing required metadata in checkout session");
      }

      // Get receipt URL from the payment intent if available
      let receiptUrl: string | undefined;
      if (session.payment_intent && typeof session.payment_intent === "string") {
        // We'll get the receipt URL from the charge later in payment_intent.succeeded
        // For now, we'll store it in metadata when we get it
      }

      const orderData = {
        userId,
        email: session.customer_details?.email || null,
        packageSlug,
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        amount: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        status: session.payment_status === "paid" ? ("paid" as const) : ("pending" as const),
        metadata: {
          ...session.metadata,
          receipt_url: receiptUrl,
        },
      };

      // Create order in database
      await OrdersService.createFromCheckout(orderData);

      console.log(`[Webhook] Order created for session ${session.id}`);
    } catch (error) {
      console.error("[Webhook] Error handling checkout completed:", error);
      throw handleError(error);
    }
  }

  /**
   * Handle payment_intent.succeeded event
   * Sends receipt email to customer and notification to owner
   */
  async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    try {
      // Get receipt URL from the latest charge
      let receiptUrl: string | undefined;
      if (paymentIntent.latest_charge) {
        const chargeId =
          typeof paymentIntent.latest_charge === "string"
            ? paymentIntent.latest_charge
            : paymentIntent.latest_charge.id;

        const charge = await stripe.charges.retrieve(chargeId);
        receiptUrl = charge.receipt_url || undefined;
      }

      // Update order status and store receipt URL in metadata
      await OrdersService.updatePaymentIntent({
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: "paid",
      });

      console.log(`[Webhook] Payment intent ${paymentIntent.id} marked as paid`);

      // Get order details to send emails
      const order = await OrdersService.getByPaymentIntentId(paymentIntent.id);

      if (order?.email) {
        // Send receipt to customer
        await EmailService.sendReceiptToCustomer({
          email: order.email,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          receiptUrl,
          packageSlug: order.package_slug,
        });

        // Send notification to owner
        await EmailService.sendOrderNotificationToOwner({
          customerEmail: order.email,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          packageSlug: order.package_slug,
          receiptUrl,
        });

        console.log(`[Webhook] Emails sent for order ${order.id}`);
      }
    } catch (error) {
      console.error("[Webhook] Error handling payment succeeded:", error);
      throw handleError(error);
    }
  }

  /**
   * Handle payment_intent.payment_failed event
   */
  async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    try {
      await OrdersService.updatePaymentIntent({
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: "failed",
      });

      console.log(`[Webhook] Payment intent ${paymentIntent.id} marked as failed`);
    } catch (error) {
      console.error("[Webhook] Error handling payment failed:", error);
      throw handleError(error);
    }
  }

  /**
   * Handle subscription events (for future use)
   */
  async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<void> {
    console.log(`[Webhook] Subscription created: ${subscription.id}`);
    // TODO: Implement subscription handling
  }

  async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
    console.log(`[Webhook] Subscription updated: ${subscription.id}`);
    // TODO: Implement subscription update handling
  }

  async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
    console.log(`[Webhook] Subscription deleted: ${subscription.id}`);
    // TODO: Implement subscription cancellation handling
  }
}

// Export singleton instance
export const StripeWebhookService = new StripeWebhookServiceClass();

// Export class for testing
export { StripeWebhookServiceClass };
