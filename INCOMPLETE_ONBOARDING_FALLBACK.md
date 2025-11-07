# Incomplete Onboarding Fallback Feature

## Overview

Added a fallback mechanism to handle users who purchase a service but haven't completed the onboarding form. The dashboard now displays a clear call-to-action for incomplete onboarding submissions.

## Problem Solved

Previously, if a user purchased a resume service but didn't complete the onboarding form:

- There was no way to return to the onboarding process
- No visual indicator that onboarding was incomplete
- Users might forget to complete the required information

## Solution Implemented

### 1. **Visual Indicators**

Added an "Onboarding Pendiente" (Pending Onboarding) badge to orders without completed onboarding:

```tsx
{
  order.status === "paid" && !onboardingData.some((data) => data.order_id === order.id) && (
    <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 dark:bg-orange-950 dark:text-orange-200">
      <AlertCircle className="h-3 w-3" />
      Onboarding Pendiente
    </span>
  );
}
```

### 2. **Dynamic Action Buttons**

The dashboard now shows different buttons based on onboarding status:

#### **For Orders WITHOUT Onboarding Data:**

- **Button**: "Completar Onboarding" (Complete Onboarding)
- **Style**: Gradient primary button (more prominent)
- **Action**: Redirects to `/onboarding?orderId={order.id}`

#### **For Orders WITH Onboarding Data:**

- **Button**: "Ver Detalles" (View Details)
- **Style**: Outline button
- **Action**: Scrolls to onboarding details section

### 3. **Smart Detection Logic**

```tsx
const hasOnboarding = onboardingData.some((data) => data.order_id === order.id);

if (!hasOnboarding) {
  // Show "Complete Onboarding" button
} else {
  // Show "View Details" button
}
```

## User Experience Flow

### Scenario 1: User Completes Purchase but Skips Onboarding

1. User purchases a resume service
2. User closes browser or navigates away before completing onboarding
3. User returns to `/app` dashboard
4. **Dashboard shows**:
   - ✅ Order card with "Pagado" (Paid) status
   - ⚠️ Orange "Onboarding Pendiente" badge
   - 🔵 Prominent "Completar Onboarding" button
5. User clicks button → redirected to onboarding form with `orderId` parameter
6. User completes onboarding → data is saved/updated
7. User returns to dashboard → sees "Ver Detalles" button instead

### Scenario 2: User Completes Everything

1. User purchases service
2. User completes onboarding immediately
3. Dashboard shows:
   - ✅ Order card with "Pagado" status
   - ✅ No pending badge
   - 📋 "Ver Detalles" button to view submission

## Files Modified

### `/apps/web/src/components/molecules/orders-list.tsx`

**Changes:**

1. Added `AlertCircle` icon import
2. Added conditional badge for incomplete onboarding
3. Replaced hardcoded button logic with dynamic logic
4. Added check for onboarding completion status
5. Different button variants based on status

**Key Logic:**

```tsx
{
  order.status === "paid" && (
    <>
      {(() => {
        const hasOnboarding = onboardingData.some((data) => data.order_id === order.id);

        if (!hasOnboarding) {
          return <CompleteOnboardingButton />;
        }

        return <ViewDetailsButton />;
      })()}
    </>
  );
}
```

## Benefits

### 1. **Improved User Experience**

- Clear visual feedback about incomplete tasks
- Easy access to complete onboarding at any time
- No confusion about next steps

### 2. **Reduced Support Requests**

- Users can self-serve to complete onboarding
- Clear indicators prevent "what do I do next?" questions
- Automated guidance through the process

### 3. **Better Conversion**

- Users who abandon onboarding can easily return
- Prominent CTA increases completion rate
- Reduces friction in the service delivery process

### 4. **Data Integrity**

- Ensures all paid orders eventually have onboarding data
- Prevents incomplete service fulfillment
- Owner gets all necessary information to deliver service

## Technical Details

### Badge Styling

- **Color**: Orange (warning/action required)
- **Icon**: AlertCircle from lucide-react
- **Responsive**: Wraps properly on mobile
- **Dark Mode**: Supports dark theme

### Button Behavior

- **Complete Onboarding**:
  - Gradient background (primary → secondary)
  - Navigates to `/onboarding?orderId={order.id}`
  - More prominent to encourage action
- **View Details**:
  - Outline style (less prominent)
  - Scrolls to onboarding section on same page
  - Shows completed submission details

### Compatibility

- Works with existing upsert logic in onboarding form
- Compatible with all service types (resume-basico, resume-profesional, resume-ejecutivo)
- Respects order status (only shows for "paid" orders)

## Testing Checklist

- [ ] Purchase a service and skip onboarding
- [ ] Verify "Onboarding Pendiente" badge appears
- [ ] Click "Completar Onboarding" button
- [ ] Verify redirect to onboarding page with correct orderId
- [ ] Complete onboarding form
- [ ] Return to dashboard
- [ ] Verify badge is gone and "Ver Detalles" button appears
- [ ] Test with multiple orders (some complete, some incomplete)
- [ ] Test on mobile devices (responsive layout)
- [ ] Test dark mode styling

## Future Enhancements

1. **Email Reminders**
   - Send reminder email after 24 hours if onboarding incomplete
   - Include direct link to complete onboarding

2. **Progress Indicator**
   - Show percentage of onboarding completion
   - Display which fields are missing

3. **Deadline Warning**
   - Add countdown timer for service delivery
   - Highlight urgency if onboarding not completed within X days

4. **Dashboard Summary**
   - Add stat card showing "X orders pending onboarding"
   - Quick action to complete all pending onboardings

## Related Files

- `/apps/web/src/components/molecules/orders-list.tsx` - Main implementation
- `/apps/web/src/app/onboarding/page.tsx` - Onboarding form with upsert logic
- `/apps/web/src/app/app/page.tsx` - Dashboard page
- `/supabase/migrations/20251104000000_fix_onboarding_data_policies.sql` - RLS policies
