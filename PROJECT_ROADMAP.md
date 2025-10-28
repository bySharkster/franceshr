# FrancesHR - Complete Project Roadmap

## 📋 Overview

This document outlines all pending tasks, refactoring work, and new features for the FrancesHR platform.

---

## 🎯 Current Status

### ✅ **Completed**

- Basic authentication flow
- Stripe checkout integration
- Order creation and tracking
- Onboarding form for resume service
- Basic email notifications (order confirmation, onboarding)
- User dashboard with order history
- Service pages and homepage

### 🔨 **In Progress**

- Code refactoring (Supabase, Stripe, Resend)
- Design system consistency

### ❌ **Pending**

- Admin panel
- Document management
- Cal.com integration
- Multiple service tiers
- Subscription packages
- Enhanced email notifications
- Observability & monitoring (Axiom)
- Security layer (Arcjet)
- Product analytics (PostHog)

---

## 🗂️ Task Breakdown

### **Phase 1: Code Refactoring** (Priority: HIGH)

#### 1.1 Supabase Refactoring

**Estimated Time**: 10-15 hours

**Tasks**:

- [ ] Generate Supabase types from schema
- [ ] Create `OrdersService` class
- [ ] Create `OnboardingService` class
- [ ] Create `StorageService` class
- [ ] Create `useAuth()` hook
- [ ] Create `useUserOrders()` hook
- [ ] Create `useOnboardingData()` hook
- [ ] Refactor `/app/app/page.tsx`
- [ ] Refactor `/app/onboarding/page.tsx`
- [ ] Refactor `/app/checkout/page.tsx`
- [ ] Refactor `/app/pay/success/page.tsx`
- [ ] Update error handling across all pages
- [ ] Add unit tests for services

**Files to Create**:

- `/src/types/supabase.types.ts` (generated)
- `/src/types/database.types.ts`
- `/src/lib/services/orders.service.ts`
- `/src/lib/services/onboarding.service.ts`
- `/src/lib/services/storage.service.ts`
- `/src/lib/utils/error-handler.ts`
- `/src/hooks/use-auth.ts`
- `/src/hooks/use-orders.ts`
- `/src/hooks/use-onboarding.ts`

---

#### 1.2 Stripe Refactoring

**Estimated Time**: 4-6 hours

**Tasks**:

- [ ] Create `StripeService` class
- [ ] Create `StripeWebhookService` class
- [ ] Refactor `/app/api/stripe-webhook/route.ts`
- [ ] Refactor `/app/api/create-checkout-session/route.ts`
- [ ] Add subscription support methods
- [ ] Add receipt URL retrieval
- [ ] Add proper error handling
- [ ] Add webhook event logging

**Files to Create**:

- `/src/lib/services/stripe.service.ts`
- `/src/lib/services/stripe-webhook.service.ts`

---

#### 1.3 Resend/Email Refactoring

**Estimated Time**: 3-4 hours

**Tasks**:

- [ ] Create `EmailService` class
- [ ] Fix API key exposure (remove `NEXT_PUBLIC_`)
- [ ] Refactor `/app/api/send-onboarding-email/route.ts`
- [ ] Add centralized email sending method
- [ ] Add email error handling and logging

**Files to Create**:

- `/src/lib/services/email.service.ts`

**Environment Variables to Update**:

```bash
# ❌ Remove
NEXT_PUBLIC_RESEND_API_KEY=

# ✅ Add
RESEND_API_KEY=
EMAIL_FROM=noreply@franceshr.com
EMAIL_TO=frances@franceshr.com
```

---

### **Phase 2: Storage & Document Management** (Priority: HIGH)

#### 2.1 Verify Bucket Accessibility

**Estimated Time**: 2-3 hours

**Tasks**:

- [ ] Test resume bucket access from user panel
- [ ] Test resume bucket access from admin panel (to be created)
- [ ] Verify RLS policies for `resumes` bucket
- [ ] Add PDF viewer component for user panel
- [ ] Add PDF download functionality
- [ ] Test public URL generation

**Files to Modify**:

- `/src/app/app/page.tsx` (add PDF viewer)
- `/src/components/molecules/pdf-viewer.tsx` (create)

---

#### 2.2 User Re-upload & Overwrite

**Estimated Time**: 2-3 hours

**Tasks**:

- [ ] Add re-upload button to user dashboard
- [ ] Implement file replacement logic in `StorageService`
- [ ] Update onboarding form to allow re-submission
- [ ] Add file versioning (optional)
- [ ] Show upload history (optional)

**Files to Modify**:

- `/src/app/app/page.tsx`
- `/src/lib/services/storage.service.ts`
- `/src/app/onboarding/page.tsx`

---

### **Phase 3: Admin Panel** (Priority: HIGH)

#### 3.1 Admin Authentication & Authorization

**Estimated Time**: 3-4 hours

**Tasks**:

- [ ] Create admin role in Supabase (RLS policies)
- [ ] Add `is_admin` field to `users` table
- [ ] Create admin middleware for route protection
- [ ] Create admin login page (or use existing with role check)
- [ ] Add admin navigation

**Files to Create**:

- `/src/app/admin/layout.tsx`
- `/src/middleware/admin-auth.ts`
- `/supabase/migrations/add_admin_role.sql`

---

#### 3.2 Admin Dashboard - Orders Management

**Estimated Time**: 6-8 hours

**Tasks**:

- [ ] Create admin dashboard page
- [ ] Display all orders with filters (status, date, service)
- [ ] Add order detail view
- [ ] Add status update functionality
- [ ] Add notes/comments to orders
- [ ] Display customer information
- [ ] Show onboarding data for each order

**Files to Create**:

- `/src/app/admin/page.tsx`
- `/src/app/admin/orders/page.tsx`
- `/src/app/admin/orders/[orderId]/page.tsx`
- `/src/components/organisms/admin/orders-table.tsx`
- `/src/components/organisms/admin/order-detail.tsx`

**Database Changes**:

```sql
-- Add admin notes to orders
ALTER TABLE orders ADD COLUMN admin_notes TEXT;
ALTER TABLE orders ADD COLUMN completed_at TIMESTAMP WITH TIME ZONE;
```

---

#### 3.3 Admin Document Upload

**Estimated Time**: 4-5 hours

**Tasks**:

- [ ] Create document upload interface for completed orders
- [ ] Store completed documents in `completed_documents` bucket
- [ ] Update order status to "completed" on upload
- [ ] Trigger email notification to user
- [ ] Add document preview for admin
- [ ] Allow multiple document versions

**Files to Create**:

- `/src/app/admin/orders/[orderId]/upload/page.tsx`
- `/src/components/organisms/admin/document-upload.tsx`

**Database Changes**:

```sql
-- Create completed_documents table
CREATE TABLE completed_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  document_url TEXT NOT NULL,
  version INTEGER DEFAULT 1,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('completed_documents', 'completed_documents', false);
```

---

### **Phase 4: Email Notifications** (Priority: HIGH)

#### 4.1 Create Missing Email Templates

**Estimated Time**: 2-3 hours

**Tasks**:

- [ ] Create `DocumentReadyEmail` template
- [ ] Create `ReceiptEmail` template
- [ ] Create `OrderStatusUpdateEmail` template
- [ ] Create `MeetingReminderEmail` template
- [ ] Create `NoShowFeeEmail` template
- [ ] Test all email templates

**Files to Create**:

- `/src/emails/document-ready.tsx`
- `/src/emails/receipt.tsx`
- `/src/emails/order-status-update.tsx`
- `/src/emails/meeting-reminder.tsx`
- `/src/emails/no-show-fee.tsx`

---

#### 4.2 Implement Email Triggers

**Estimated Time**: 2-3 hours

**Tasks**:

- [ ] Send document ready email when admin uploads document
- [ ] Send receipt email after payment (use `receipt_url` from Stripe)
- [ ] Send order status update email when admin changes status
- [ ] Integrate with admin panel actions

**Files to Modify**:

- `/src/app/admin/orders/[orderId]/upload/page.tsx`
- `/src/lib/services/stripe-webhook.service.ts`
- `/src/lib/services/email.service.ts`

---

### **Phase 5: Cal.com Integration** (Priority: MEDIUM)

#### 5.1 Cal.com Webhook Setup

**Estimated Time**: 3-4 hours

**Tasks**:

- [ ] Create Cal.com webhook endpoint
- [ ] Handle booking created event
- [ ] Handle booking cancelled event
- [ ] Handle booking rescheduled event
- [ ] Store meeting data in database
- [ ] Link meetings to services

**Files to Create**:

- `/src/app/api/cal-webhook/route.ts`
- `/src/lib/services/cal.service.ts`

**Database Changes**:

```sql
CREATE TABLE meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  service_type TEXT NOT NULL,
  cal_booking_id TEXT UNIQUE NOT NULL,
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

#### 5.2 Post-Meeting Payment Flow

**Estimated Time**: 3-4 hours

**Tasks**:

- [ ] Create payment page for post-meeting services
- [ ] Link payment to meeting record
- [ ] Send payment link via email after meeting
- [ ] Handle payment confirmation
- [ ] Update meeting status

**Files to Create**:

- `/src/app/meeting/[meetingId]/payment/page.tsx`

---

#### 5.3 No-Show Fee Handling

**Estimated Time**: 2-3 hours

**Tasks**:

- [ ] Implement no-show detection (manual or automated)
- [ ] Create no-show fee charge flow
- [ ] Send no-show fee notification email
- [ ] Track no-show fees in database
- [ ] Admin interface to mark no-shows

**Files to Create**:

- `/src/app/admin/meetings/[meetingId]/no-show/page.tsx`

---

### **Phase 6: Product Expansion** (Priority: MEDIUM)

#### 6.1 Multiple Resume Tiers

**Estimated Time**: 3-4 hours

**Tasks**:

- [ ] Create Stripe products for each tier:
  - Básico ($X)
  - Profesional ($Y)
  - Ejecutivo ($Z)
- [ ] Update `services.config.ts` with tier options
- [ ] Create tier selection UI
- [ ] Update checkout flow for tier selection
- [ ] Add tier information to orders

**Files to Modify**:

- `/src/config/services.config.ts`
- `/src/app/services/[serviceType]/page.tsx`
- `/src/components/molecules/tier-selector.tsx` (create)

**Example Config**:

```typescript
export const RESUME_TIERS = {
  basico: {
    name: "Básico",
    price: 20,
    stripePriceId: "price_xxx",
    features: ["Formato profesional", "1 revisión", "Entrega en 5 días"],
  },
  profesional: {
    name: "Profesional",
    price: 40,
    stripePriceId: "price_yyy",
    features: ["Formato premium", "2 revisiones", "Cover letter incluida", "Entrega en 3 días"],
  },
  ejecutivo: {
    name: "Ejecutivo",
    price: 80,
    stripePriceId: "price_zzz",
    features: [
      "Formato ejecutivo",
      "Revisiones ilimitadas",
      "Cover letter + LinkedIn",
      "Consulta 1-on-1",
      "Entrega en 24 horas",
    ],
  },
};
```

---

#### 6.2 Subscription Packages

**Estimated Time**: 4-6 hours

**Tasks**:

- [ ] Create Stripe subscription products
- [ ] Design subscription tiers:
  - 1 meeting/month
  - 2 meetings/month
  - 4 meetings/month
- [ ] Create subscription management page
- [ ] Handle subscription webhooks
- [ ] Add subscription status to user dashboard
- [ ] Implement meeting credits system

**Files to Create**:

- `/src/app/subscriptions/page.tsx`
- `/src/app/admin/subscriptions/page.tsx`
- `/src/lib/services/subscription.service.ts`

**Database Changes**:

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('active', 'cancelled', 'past_due')),
  plan_type TEXT NOT NULL,
  meetings_per_month INTEGER NOT NULL,
  meetings_used INTEGER DEFAULT 0,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

---

## 📅 Recommended Implementation Order

### **Sprint 1: Foundation** (2-3 weeks)

1. ✅ Supabase Refactoring
2. ✅ Stripe Refactoring
3. ✅ Email Service Refactoring
4. Storage & Document Management

### **Sprint 2: Admin Tools** (2-3 weeks)

5. Admin Authentication
6. Admin Dashboard - Orders Management
7. Admin Document Upload
8. Email Notifications (Document Ready, Status Updates)

### **Sprint 3: Integrations** (2-3 weeks)

9. Cal.com Integration
10. Post-Meeting Payment Flow
11. No-Show Fee Handling
12. Meeting Reminder Emails

### **Sprint 4: Observability & Security** (1 week)

13. Axiom Integration (Logging & Monitoring)
14. Arcjet Integration (Security Layer)
15. PostHog Integration (Analytics)

### **Sprint 5: Product Expansion** (1-2 weeks)

16. Multiple Resume Tiers
17. Subscription Packages
18. Subscription Management

---

## 🔐 Security Checklist

- [ ] Fix Resend API key exposure
- [ ] Add rate limiting to all API routes
- [ ] Validate all webhook signatures
- [ ] Add CORS protection
- [ ] Sanitize user inputs in emails
- [ ] Implement proper RLS policies for admin access
- [ ] Add audit logging for admin actions
- [ ] Secure file upload validation (file type, size)
- [ ] Add CSRF protection
- [ ] Implement API route authentication

---

## 🧪 Testing Checklist

- [ ] Unit tests for all services
- [ ] Integration tests for payment flow
- [ ] E2E tests for user journey
- [ ] Admin panel functionality tests
- [ ] Email delivery tests
- [ ] Webhook handling tests
- [ ] File upload/download tests
- [ ] Subscription management tests

---

## 📊 Success Metrics

### **Technical Metrics**

- Code duplication reduced by 60%+
- API response time < 500ms
- Email delivery rate > 98%
- Zero security vulnerabilities
- Test coverage > 80%

### **Business Metrics**

- Order completion rate
- Customer satisfaction score
- Average time to document delivery
- Meeting attendance rate
- Subscription retention rate

---

## 🚀 Deployment Strategy

### **Phase 1: Refactoring** (No User Impact)

- Deploy refactored code incrementally
- Monitor for regressions
- Keep old and new code paths during transition

### **Phase 2: Admin Panel** (Internal Only)

- Deploy to staging first
- Test with real data
- Train admin user
- Deploy to production

### **Phase 3: New Features** (User-Facing)

- Feature flags for gradual rollout
- Beta testing with select users
- Monitor user feedback
- Full rollout after validation

---

## 📝 Notes

- All estimated times are for a single developer
- Times may vary based on complexity and testing requirements
- Prioritize based on business needs and user feedback
- Consider breaking large tasks into smaller, deployable chunks
- Maintain backward compatibility during refactoring
- Document all new features and APIs

---

## 🎯 Next Immediate Actions

1. **Review and approve** Supabase refactoring plan
2. **Review and approve** Stripe/Resend refactoring plan
3. **Prioritize** which phase to start with
4. **Set up** project management board (Jira, Linear, etc.)
5. **Create** detailed tickets for Sprint 1
6. **Begin** implementation with Supabase refactoring
