# FrancesHR - Implementation Guide

## Overview

Complete implementation of the service purchase workflow for FrancesHR, including service pages, checkout, authentication, onboarding, and dashboard.

## Workflow

```
Landing Page (/)
  → Service Selection (#services)
    → Service Detail Page (/services/[serviceId])
      → Checkout (/checkout)
        → Authentication (/auth/login or /auth/sign-up)
          → Stripe Payment
            → Onboarding (/onboarding) [Resume service only]
              → Email Notifications (Resend)
                → Dashboard (/app)
```

## Features Implemented

### 1. Service Detail Pages (`/services/[serviceId]`)

**Location**: `src/app/services/[serviceId]/page.tsx`

- **Dynamic routing** for 3 services:
  - `resume-profesional` - Stripe checkout
  - `mentorias-laborales` - Cal.com redirect
  - `entrevistas-simuladas` - Cal.com redirect

- **Features**:
  - Service pricing and details
  - FAQ accordion
  - Feature lists
  - CTA buttons (Stripe or Cal.com)

### 2. Service Configuration

**Location**: `src/config/services.config.ts`

Centralized service data including:

- Pricing
- Descriptions
- FAQs
- Stripe Price IDs
- Cal.com links

### 3. Checkout Flow (`/checkout`)

**Location**: `src/app/checkout/page.tsx`

- **Authentication check** - redirects to login if not authenticated
- **Stripe integration** - creates checkout session
- **Service validation** - only for Stripe services
- **Return URL handling** - redirects back after login

### 4. Onboarding Form (`/onboarding`)

**Location**: `src/app/onboarding/page.tsx`

**For Resume Profesional service only**:

- Career goals questionnaire
- Industry selection
- Experience description
- Resume file upload (Supabase Storage)
- Progress tracking
- Email notifications

### 5. Protected Dashboard (`/app`)

**Location**: `src/app/app/page.tsx`

**Features**:

- Order history
- Service status tracking
- Onboarding data display
- Stats cards (active, completed, in progress)
- Sign out functionality

### 6. Email System

**Locations**:

- `src/emails/onboarding-owner.tsx`
- `src/emails/onboarding-client.tsx`
- `src/app/api/send-onboarding-email/route.ts`

**Two email templates**:

1. **Owner notification** - includes all onboarding data
2. **Client confirmation** - receipt and next steps

### 7. Middleware Protection

**Location**: `src/lib/supabase/middleware.ts`

Protected routes:

- `/app` - Dashboard
- `/onboarding` - Onboarding form
- `/checkout` - Checkout page

## Database Schema Requirements

### Tables Needed

#### 1. `onboarding_data`

```sql
CREATE TABLE onboarding_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id TEXT NOT NULL,
  career_goals TEXT NOT NULL,
  industry_pursuing TEXT NOT NULL,
  related_experience TEXT NOT NULL,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE onboarding_data ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY "Users can view own onboarding data"
  ON onboarding_data FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own data
CREATE POLICY "Users can insert own onboarding data"
  ON onboarding_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### 2. `orders` (Already exists)

Ensure it has:

- `user_id` (UUID)
- `package_slug` (TEXT)
- `status` (TEXT) - 'paid', 'pending', 'failed'
- `amount` (INTEGER) - in cents
- `currency` (TEXT)
- `stripe_checkout_session_id` (TEXT)
- `stripe_payment_intent_id` (TEXT)
- `created_at` (TIMESTAMPTZ)

#### 3. `users` (Already exists)

Ensure it has:

- `stripe_customer_id` (TEXT)

### Storage Bucket

#### `resumes` bucket

```sql
-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- Policy: Users can upload their own resumes
CREATE POLICY "Users can upload own resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'resumes' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can view their own resumes
CREATE POLICY "Users can view own resumes"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'resumes' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Environment Variables

Add to `.env.local`:

```bash
# Stripe Resume Price ID
NEXT_PUBLIC_STRIPE_RESUME_PRICE_ID=price_xxxxxxxxxxxxx

# Resend (already configured)
NEXT_PUBLIC_RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_EMAIL_FROM=noreply@franceshr.com
NEXT_PUBLIC_EMAIL_TO=frances@franceshr.com

# Site URL (already configured)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Installation

### 1. Install Dependencies

```bash
npm install resend @react-email/components
```

### 2. Create Supabase Tables

Run the SQL commands above in Supabase SQL Editor

### 3. Create Storage Bucket

Create the `resumes` bucket in Supabase Storage with the policies above

### 4. Get Stripe Price ID

1. Go to Stripe Dashboard → Products
2. Find "Resume Profesional" product
3. Copy the Price ID (starts with `price_`)
4. Add to `.env.local`

### 5. Configure Cal.com Links

Update in `src/config/services.config.ts`:

```typescript
calComLink: "https://cal.com/franceshr/mentorias";
calComLink: "https://cal.com/franceshr/entrevistas";
```

## Testing Workflow

### 1. Test Service Pages

```
http://localhost:3000/services/resume-profesional
http://localhost:3000/services/mentorias-laborales
http://localhost:3000/services/entrevistas-simuladas
```

### 2. Test Checkout Flow (Resume)

1. Click "Comprar Resume Profesional"
2. Should redirect to `/checkout?service=resume-profesional`
3. If not logged in → redirects to `/auth/login`
4. After login → redirects back to checkout
5. Click "Proceder al pago" → Stripe Checkout

### 3. Test Stripe Webhook

Use Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

### 4. Test Onboarding

1. Complete Stripe payment
2. Should redirect to `/onboarding?service=resume-profesional`
3. Fill out form
4. Upload resume (optional)
5. Submit → emails sent
6. Redirect to `/app`

### 5. Test Dashboard

1. Navigate to `/app`
2. Should see purchased services
3. View onboarding data
4. Check stats

## Cal.com Services

For Mentorías and Entrevistas:

- Clicking CTA opens Cal.com in new tab
- No payment through Stripe
- No onboarding required
- Users can schedule directly

## Email Templates

Preview emails during development:

```bash
# Install react-email CLI
npm install -g react-email

# Run email preview server
cd src/emails
react-email dev
```

## Troubleshooting

### Issue: Stripe checkout not working

- Check `NEXT_PUBLIC_STRIPE_RESUME_PRICE_ID` is set
- Verify price ID exists in Stripe
- Check Stripe webhook is configured

### Issue: File upload fails

- Verify `resumes` bucket exists in Supabase Storage
- Check RLS policies are correct
- Ensure file size < 5MB

### Issue: Emails not sending

- Verify Resend API key is correct
- Check DNS records for domain
- Test with Resend dashboard

### Issue: Dashboard shows no data

- Check user is authenticated
- Verify `orders` table has data
- Check RLS policies allow user to read their data

## Next Steps

### Enhancements

1. **Progress tracking** - Add status updates for resume creation
2. **File delivery** - Upload completed resume to user's dashboard
3. **Notifications** - Email updates on progress
4. **Reviews** - Request reviews after service completion
5. **Referrals** - Referral program for clients

### Admin Features

1. **Admin dashboard** - View all orders and onboarding data
2. **Status updates** - Mark services as in-progress/completed
3. **File uploads** - Upload completed resumes
4. **Communication** - Message clients directly

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/
│   │   │   └── route.ts
│   │   ├── send-onboarding-email/
│   │   │   └── route.ts
│   │   └── stripe-webhook/
│   │       └── route.ts
│   ├── app/
│   │   └── page.tsx (Dashboard)
│   ├── checkout/
│   │   └── page.tsx
│   ├── onboarding/
│   │   └── page.tsx
│   └── services/
│       └── [serviceId]/
│           └── page.tsx
├── config/
│   └── services.config.ts
├── emails/
│   ├── onboarding-client.tsx
│   └── onboarding-owner.tsx
├── lib/
│   └── supabase/
│       └── middleware.ts (Updated)
└── types/
    └── services.type.ts
```

## Support

For questions or issues:

- Check this guide first
- Review Supabase logs
- Check Stripe dashboard
- Test with Stripe test mode
- Review browser console for errors

---

**Implementation Date**: October 2024
**Status**: ✅ Complete and Ready for Testing
