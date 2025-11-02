# Package Slug Update - Auto-Close Orders

## ✅ Changes Applied

### Summary

Updated the auto-close orders system to use `package_slug` instead of `service_type` to match the actual orders table schema.

---

## 📝 What Was Changed

### 1. Edge Function Updated

**File:** `supabase/functions/auto-close-orders/index.ts`

**Changes:**

- ✅ Updated `Order` interface to include all order fields
- ✅ Changed `service_type` → `package_slug` in SELECT query
- ✅ Updated console logs to use `package_slug`
- ✅ Updated response object to return `packageSlug`

**Before:**

```typescript
interface Order {
  id: string;
  user_id: string;
  status: string;
  created_at: string;
  service_type: string;
}
```

**After:**

```typescript
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
```

### 2. Migration Updated

**File:** `supabase/migrations/20251102000000_setup_auto_close_orders.sql`

**Changes:**

- ✅ Changed `order_closure_log` table column from `service_type` to `package_slug`
- ✅ Updated `trigger_auto_close_orders_with_audit()` function to use `package_slug`

### 3. New Migration Created

**File:** `supabase/migrations/20251102000001_update_closure_log_column.sql`

**Purpose:**

- Renames existing `service_type` column to `package_slug` in `order_closure_log` table
- Recreates the trigger function with correct column name
- Safe for existing deployments (checks if column exists before renaming)

---

## 🚀 Deployment Status

### ✅ Migration Applied

```
NOTICE: Renamed service_type to package_slug in order_closure_log
```

### ✅ Edge Function Redeployed

```
Deployed Functions on project nxrickciehifetxsbvzj: auto-close-orders
```

---

## 🧪 Verification

Run the verification script in Supabase SQL Editor:

```sql
-- Check table structure
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'order_closure_log'
ORDER BY ordinal_position;
```

**Expected columns:**

- `id` (uuid)
- `order_id` (uuid)
- `user_id` (uuid)
- `package_slug` (text) ← Updated!
- `closed_at` (timestamp with time zone)
- `days_since_creation` (integer)
- `previous_status` (text)
- `closure_method` (text)

---

## 📊 Database Schema

### order_closure_log (Updated)

```sql
CREATE TABLE order_closure_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  package_slug TEXT,  -- Changed from service_type
  closed_at TIMESTAMPTZ DEFAULT NOW(),
  days_since_creation INTEGER,
  previous_status TEXT,
  closure_method TEXT DEFAULT 'auto-cron'
);
```

### trigger_auto_close_orders_with_audit() (Updated)

```sql
-- Now selects package_slug from orders table
SELECT
  id,
  user_id,
  package_slug,  -- Changed from service_type
  status,
  EXTRACT(DAY FROM (NOW() - created_at)) as days_old
FROM orders
WHERE
  status = 'paid'
  AND created_at < NOW() - INTERVAL '7 days'
```

---

## 🔍 Testing

### Quick Test

Run in Supabase SQL Editor:

```sql
-- 1. Create test order with package_slug
INSERT INTO orders (user_id, package_slug, status, created_at)
VALUES (
  (SELECT id FROM auth.users LIMIT 1),
  'resume-profesional',
  'paid',
  NOW() - INTERVAL '8 days'
);

-- 2. Run auto-close function
SELECT trigger_auto_close_orders_with_audit();

-- 3. Verify closure log has package_slug
SELECT
  package_slug,
  days_since_creation,
  closed_at
FROM order_closure_log
ORDER BY closed_at DESC
LIMIT 1;

-- 4. Cleanup
DELETE FROM order_closure_log WHERE package_slug = 'resume-profesional';
DELETE FROM orders WHERE package_slug = 'resume-profesional';
```

**Expected result:**

- Order status changed to `completed`
- Audit log entry created with `package_slug = 'resume-profesional'`

---

## 📋 Updated Queries

### View Recent Closures

```sql
SELECT
  closed_at,
  package_slug,  -- Updated column name
  days_since_creation,
  previous_status
FROM order_closure_log
ORDER BY closed_at DESC
LIMIT 10;
```

### Check Upcoming Closures

```sql
SELECT
  id,
  package_slug,  -- Updated column name
  status,
  created_at,
  EXTRACT(DAY FROM (NOW() - created_at)) as days_old
FROM orders
WHERE
  status = 'paid'
  AND created_at < NOW() - INTERVAL '7 days'
ORDER BY created_at ASC;
```

---

## ✨ Benefits

1. **Schema Consistency**: Now matches actual `orders` table structure
2. **Type Safety**: Edge Function interface matches database schema
3. **Better Naming**: `package_slug` is more descriptive than `service_type`
4. **Backward Compatible**: Migration safely handles existing deployments

---

## 🎯 Summary

✅ **Edge Function**: Updated and redeployed with `package_slug`
✅ **Database Migration**: Applied successfully
✅ **Audit Log Table**: Column renamed from `service_type` to `package_slug`
✅ **Trigger Function**: Updated to use correct column name
✅ **Cron Job**: Still active and scheduled (daily at 2:00 AM UTC)

**The system is now fully aligned with your orders table schema!** 🎉
