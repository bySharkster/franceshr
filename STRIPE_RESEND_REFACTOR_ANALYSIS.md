# Stripe & Resend Refactoring Analysis

## 🔍 Current Issues Identified

### **Stripe Issues**

#### 1. **No Centralized Stripe Service**

- Stripe client created inline in webhook handler
- No abstraction for common Stripe operations
- Webhook logic mixed with HTTP handling

**Current Pattern:**

```typescript
// In webhook route
const session = await stripe.checkout.sessions.create({...});
const charge = await stripe.charges.retrieve(pi.latest_charge);
```

#### 2. **Webhook Handler Too Complex**

- 164 lines in single route handler
- Business logic mixed with webhook verification
- No separation between event types
- Error handling not consistent

#### 3. **No Type Safety for Stripe Events**

- Using generic `Stripe.Event` type
- Manual type assertions for event data
- No validation of webhook payloads

#### 4. **Duplicate Checkout Session Logic**

**In `/app/api/create-checkout-session/route.ts`:**

```typescript
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  payment_method_types: ["card", "link"],
  line_items: [{ price: priceId, quantity: 1 }],
  // ... more config
});
```

**In `/app/checkout/page.tsx`:**

```typescript
const response = await fetch("/api/create-checkout-session", {
  method: "POST",
  body: JSON.stringify({
    userId: currentUser.id,
    priceId: service.stripePriceId,
    // ... more data
  }),
});
```

---

### **Resend Issues**

#### 1. **No Email Service Abstraction**

- Resend client created inline in route
- Email sending logic not reusable
- No centralized email templates management

**Current Pattern:**

```typescript
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({...});
```

#### 2. **Missing Email Scenarios**

Based on your requirements, you need emails for:

- ✅ Order confirmation (exists)
- ✅ Onboarding submission (exists)
- ❌ Document ready notification
- ❌ Order status updates
- ❌ Admin notifications
- ❌ Receipt delivery
- ❌ Meeting reminders (Cal.com integration)
- ❌ No-show fee notifications

#### 3. **No Email Queue/Retry Logic**

- Emails sent synchronously
- No retry on failure
- No email delivery tracking

#### 4. **Environment Variable Issues**

```typescript
// Using NEXT_PUBLIC_ prefix for server-side API key (security issue)
const resend = new Resend(process.env.RESEND_API_KEY);
```

**Problem**: `NEXT_PUBLIC_` variables are exposed to the client bundle.

---

## 📋 Refactoring Plan

### **Phase 1: Stripe Service Layer**

#### 1.1 **Create Stripe Service** (`/lib/services/stripe.service.ts`)

```typescript
import type Stripe from "stripe";
import stripe from "@/lib/stripe/get-stripe";
import { OrdersService } from "./orders.service";

export class StripeService {
  /**
   * Create a checkout session for one-time payment
   */
  static async createCheckoutSession(params: {
    userId: string;
    priceId: string;
    packageSlug: string;
    successUrl: string;
    cancelUrl: string;
    customerEmail?: string;
  }): Promise<Stripe.Checkout.Session> {
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
  }

  /**
   * Get or create Stripe customer for user
   */
  static async getOrCreateCustomer(userId: string, email?: string): Promise<string> {
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
  }

  /**
   * Retrieve receipt URL from payment intent
   */
  static async getReceiptUrl(paymentIntentId: string): Promise<string | null> {
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
  static async createSubscription(params: {
    userId: string;
    priceId: string;
    customerEmail?: string;
  }): Promise<Stripe.Subscription> {
    const { userId, priceId, customerEmail } = params;

    const customerId = await this.getOrCreateCustomer(userId, customerEmail);

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata: { userId },
    });

    return subscription;
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(subscriptionId: string): Promise<void> {
    await stripe.subscriptions.cancel(subscriptionId);
  }
}
```

#### 1.2 **Create Webhook Handler Service** (`/lib/services/stripe-webhook.service.ts`)

```typescript
import type Stripe from "stripe";
import { OrdersService } from "./orders.service";
import { EmailService } from "./email.service";

export class StripeWebhookService {
  /**
   * Handle checkout.session.completed event
   */
  static async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
    const userId = session.metadata?.userId;
    const packageSlug = session.metadata?.package_slug;

    if (!userId || !packageSlug) {
      throw new Error("Missing required metadata in checkout session");
    }

    const orderData = {
      userId,
      email: session.customer_details?.email ?? null,
      packageSlug,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      amount: session.amount_total ?? 0,
      currency: session.currency ?? "usd",
      status: session.payment_status === "paid" ? "paid" : "pending",
      metadata: session.metadata ?? {},
    };

    // Create order in database
    await OrdersService.createFromCheckout(orderData);

    // Send confirmation email
    if (session.customer_details?.email) {
      await EmailService.sendOrderConfirmation({
        email: session.customer_details.email,
        orderId: session.id,
        packageSlug,
      });
    }
  }

  /**
   * Handle payment_intent.succeeded event
   */
  static async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const receiptUrl = await StripeService.getReceiptUrl(paymentIntent.id);

    await OrdersService.updatePaymentIntent({
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: "paid",
      receiptUrl,
    });

    // Send receipt email
    const order = await OrdersService.getByPaymentIntentId(paymentIntent.id);
    if (order?.email) {
      await EmailService.sendReceipt({
        email: order.email,
        receiptUrl: receiptUrl ?? undefined,
        orderId: order.id,
      });
    }
  }

  /**
   * Handle subscription events
   */
  static async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<void> {
    // TODO: Handle subscription creation
  }

  static async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
    // TODO: Handle subscription updates
  }

  static async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
    // TODO: Handle subscription cancellation
  }
}
```

---

### **Phase 2: Email Service Layer**

#### 2.1 **Create Email Service** (`/lib/services/email.service.ts`)

```typescript
import { Resend } from "resend";
import { OnboardingEmailClient } from "@/emails/onboarding-client";
import { OnboardingEmailOwner } from "@/emails/onboarding-owner";
import { OrderConfirmationEmail } from "@/emails/order-confirmation";
import { DocumentReadyEmail } from "@/emails/document-ready";
import { ReceiptEmail } from "@/emails/receipt";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailParams {
  to: string;
  subject: string;
  react: React.ReactElement;
  from?: string;
}

export class EmailService {
  private static readonly FROM_EMAIL = process.env.EMAIL_FROM || "noreply@franceshr.com";
  private static readonly OWNER_EMAIL = process.env.EMAIL_TO || "frances@franceshr.com";

  /**
   * Base email sending method
   */
  private static async send(params: SendEmailParams) {
    const { to, subject, react, from = this.FROM_EMAIL } = params;

    try {
      const result = await resend.emails.send({
        from,
        to,
        subject,
        react,
      });

      console.log(`[Email] Sent ${subject} to ${to}`, result.data?.id);
      return result;
    } catch (error) {
      console.error(`[Email] Failed to send ${subject} to ${to}:`, error);
      throw error;
    }
  }

  /**
   * Send order confirmation to customer
   */
  static async sendOrderConfirmation(params: {
    email: string;
    orderId: string;
    packageSlug: string;
  }) {
    return this.send({
      to: params.email,
      subject: "Confirmación de Compra - FrancesHR",
      react: OrderConfirmationEmail({
        orderId: params.orderId,
        packageSlug: params.packageSlug,
      }),
    });
  }

  /**
   * Send receipt with PDF
   */
  static async sendReceipt(params: { email: string; receiptUrl?: string; orderId: string }) {
    return this.send({
      to: params.email,
      subject: "Recibo de Pago - FrancesHR",
      react: ReceiptEmail({
        receiptUrl: params.receiptUrl,
        orderId: params.orderId,
      }),
    });
  }

  /**
   * Send onboarding data to owner
   */
  static async sendOnboardingToOwner(params: {
    userEmail: string;
    userId: string;
    serviceId: string;
    formData: {
      careerGoals: string;
      industryPursuing: string;
      relatedExperience: string;
      resumeUrl?: string;
    };
  }) {
    return this.send({
      to: this.OWNER_EMAIL,
      subject: `Nueva Solicitud de Resume - ${params.userEmail}`,
      react: OnboardingEmailOwner({
        userEmail: params.userEmail,
        userId: params.userId,
        serviceId: params.serviceId,
        ...params.formData,
      }),
    });
  }

  /**
   * Send onboarding confirmation to client
   */
  static async sendOnboardingConfirmation(params: { email: string }) {
    return this.send({
      to: params.email,
      subject: "Confirmación de Envío - FrancesHR",
      react: OnboardingEmailClient({ _userEmail: params.email }),
    });
  }

  /**
   * Notify user when document is ready
   */
  static async sendDocumentReady(params: { email: string; orderId: string; documentUrl: string }) {
    return this.send({
      to: params.email,
      subject: "Tu Documento está Listo - FrancesHR",
      react: DocumentReadyEmail({
        orderId: params.orderId,
        documentUrl: params.documentUrl,
      }),
    });
  }

  /**
   * Send order status update
   */
  static async sendOrderStatusUpdate(params: {
    email: string;
    orderId: string;
    status: string;
    message?: string;
  }) {
    // TODO: Create OrderStatusUpdateEmail template
    return this.send({
      to: params.email,
      subject: `Actualización de Orden - ${params.status}`,
      react: null as any, // Replace with actual template
    });
  }

  /**
   * Send meeting reminder (Cal.com integration)
   */
  static async sendMeetingReminder(params: {
    email: string;
    meetingDate: Date;
    meetingLink: string;
    serviceName: string;
  }) {
    // TODO: Create MeetingReminderEmail template
    return this.send({
      to: params.email,
      subject: `Recordatorio: ${params.serviceName} - ${params.meetingDate.toLocaleDateString()}`,
      react: null as any, // Replace with actual template
    });
  }

  /**
   * Send no-show fee notification
   */
  static async sendNoShowFeeNotification(params: {
    email: string;
    meetingDate: Date;
    feeAmount: number;
    serviceName: string;
  }) {
    // TODO: Create NoShowFeeEmail template
    return this.send({
      to: params.email,
      subject: `Cargo por Inasistencia - ${params.serviceName}`,
      react: null as any, // Replace with actual template
    });
  }
}
```

#### 2.2 **Create Email Templates** (Missing Templates)

Need to create:

- `/emails/order-confirmation.tsx`
- `/emails/document-ready.tsx`
- `/emails/receipt.tsx`
- `/emails/order-status-update.tsx`
- `/emails/meeting-reminder.tsx`
- `/emails/no-show-fee.tsx`

---

## 🎯 Benefits of Refactoring

### **Stripe Benefits**

- **Centralized Logic**: All Stripe operations in one service
- **Type Safety**: Proper typing for all Stripe events
- **Testability**: Easy to mock Stripe calls
- **Maintainability**: Webhook logic separated by event type
- **Reusability**: Checkout session creation reusable across app

### **Resend Benefits**

- **Email Templates**: All email scenarios covered
- **Consistent Sending**: Single method for all emails
- **Error Handling**: Centralized error logging
- **Security**: API key not exposed to client
- **Extensibility**: Easy to add new email types

---

## 📊 Missing Features Implementation

Based on your requirements list:

### ✅ **Already Implemented**

1. Order confirmation emails
2. Onboarding submission emails

### 🔨 **Need to Implement**

1. **Bucket Accessibility & PDF Retrieval**
   - Create StorageService methods for PDF access
   - Add RLS policies for admin access
   - Create user panel PDF viewer

2. **User Re-upload & Overwrite**
   - Add `StorageService.replaceResume()` method
   - Update UI to allow re-upload
   - Handle file versioning

3. **Admin Panel**
   - Create `/app/admin` routes
   - Order management dashboard
   - Status update interface
   - Document upload for completed orders

4. **Document Ready Notification**
   - Trigger email when admin uploads document
   - Update order status to "completed"
   - Store document URL in database

5. **Cal.com Integration**
   - Webhook handler for Cal.com events
   - Meeting creation flow
   - Payment after meeting completion
   - No-show fee handling

6. **Receipt Delivery**
   - Already captured in `receipt_url` field
   - Need to send via email (EmailService.sendReceipt)

7. **Multiple Resume Tiers**
   - Add to services.config.ts:
     - Básico ($X)
     - Profesional ($Y)
     - Ejecutivo ($Z)
   - Create separate Stripe products/prices

8. **Subscription Packages**
   - Create subscription-based pricing
   - Monthly meeting packages
   - Stripe subscription integration

---

## 🚀 Implementation Priority

### **Phase 1: Core Refactoring** (High Priority)

1. Create StripeService
2. Create EmailService
3. Refactor webhook handler
4. Update checkout flow

### **Phase 2: Missing Email Templates** (High Priority)

1. Document ready email
2. Receipt email
3. Order status update email
4. Meeting reminder email

### **Phase 3: Admin Panel** (High Priority)

1. Admin authentication
2. Orders dashboard
3. Status management
4. Document upload

### **Phase 4: Storage Improvements** (Medium Priority)

1. PDF viewer in user panel
2. Re-upload functionality
3. Admin access to resumes

### **Phase 5: Cal.com Integration** (Medium Priority)

1. Webhook setup
2. Meeting flow
3. Post-meeting payment
4. No-show handling

### **Phase 6: Product Expansion** (Low Priority)

1. Resume tiers (Básico, Profesional, Ejecutivo)
2. Subscription packages
3. Pricing updates

---

## 📝 Estimated Timeline

- **Stripe Refactor**: 4-6 hours
- **Email Service Refactor**: 3-4 hours
- **Missing Email Templates**: 2-3 hours
- **Admin Panel**: 8-12 hours
- **Storage Improvements**: 3-4 hours
- **Cal.com Integration**: 6-8 hours
- **Product Expansion**: 4-6 hours

**Total**: 30-43 hours of development

---

## 🔐 Security Fixes Needed

1. **Fix Resend API Key Exposure**

   ```typescript
   // ❌ Wrong (exposed to client)
   const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

   // ✅ Correct (server-only)
   const resend = new Resend(process.env.RESEND_API_KEY);
   ```

2. **Add Rate Limiting** to API routes
3. **Validate Webhook Signatures** (already done for Stripe)
4. **Add CORS Protection** for API routes
5. **Sanitize User Inputs** in email templates
