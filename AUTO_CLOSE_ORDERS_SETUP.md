# Auto-Close Orders System

Automatically closes paid services after 7 days using Supabase pg_cron and Edge Functions.

## Overview

This system provides two methods to automatically close orders:

1. **SQL-based (Recommended)**: Uses PostgreSQL `pg_cron` extension to run directly in the database
2. **Edge Function**: Supabase Edge Function that can be triggered via HTTP or scheduled

## Method 1: SQL-based Auto-Close (Recommended)

### Setup

1. **Run the migration:**

   ```bash
   supabase db push
   # Or apply the migration file manually in Supabase SQL Editor
   ```

2. **Verify pg_cron is enabled:**

   ```sql
   SELECT * FROM cron.job;
   ```

3. **Check the scheduled job:**
   ```sql
   SELECT
     jobid,
     schedule,
     command,
     nodename,
     nodeport,
     database,
     username,
     active
   FROM cron.job
   WHERE jobname = 'auto-close-orders-daily';
   ```

### What It Does

- **Runs daily at 2:00 AM UTC**
- Finds all orders with `status = 'paid'` older than 7 days
- Updates them to `status = 'completed'`
- Logs each closure in `order_closure_log` table for audit trail
- Adds performance index on `(status, created_at)`

### Features

✅ **Automatic execution** - No manual intervention needed
✅ **Audit logging** - Every closure is tracked
✅ **Performance optimized** - Uses indexed queries
✅ **GDPR compliant** - Maintains audit trail
✅ **Configurable schedule** - Easy to change cron expression

### Monitoring

**View closure logs:**

```sql
SELECT
  ocl.closed_at,
  ocl.service_type,
  ocl.days_since_creation,
  o.id as order_id,
  u.email as user_email
FROM order_closure_log ocl
LEFT JOIN orders o ON ocl.order_id = o.id
LEFT JOIN auth.users u ON ocl.user_id = u.id
ORDER BY ocl.closed_at DESC
LIMIT 50;
```

**Check recent closures:**

```sql
SELECT COUNT(*) as closed_today
FROM order_closure_log
WHERE closed_at > NOW() - INTERVAL '24 hours';
```

**View upcoming orders to be closed:**

```sql
SELECT
  id,
  user_id,
  service_type,
  status,
  created_at,
  EXTRACT(DAY FROM (NOW() - created_at)) as days_old,
  (created_at + INTERVAL '7 days') as will_close_at
FROM orders
WHERE
  status = 'paid'
  AND created_at < NOW() - INTERVAL '7 days'
ORDER BY created_at ASC;
```

### Manual Trigger

To manually trigger the auto-close function:

```sql
SELECT trigger_auto_close_orders_with_audit();
```

### Modify Schedule

**Change to run every hour:**

```sql
SELECT cron.unschedule('auto-close-orders-daily');
SELECT cron.schedule(
  'auto-close-orders-hourly',
  '0 * * * *',  -- Every hour at minute 0
  $$SELECT trigger_auto_close_orders_with_audit();$$
);
```

**Change to run twice daily (2 AM and 2 PM):**

```sql
SELECT cron.unschedule('auto-close-orders-daily');
SELECT cron.schedule(
  'auto-close-orders-twice-daily',
  '0 2,14 * * *',  -- At 2:00 AM and 2:00 PM
  $$SELECT trigger_auto_close_orders_with_audit();$$
);
```

### Disable Auto-Close

```sql
SELECT cron.unschedule('auto-close-orders-daily');
```

---

## Method 2: Edge Function (Alternative)

### Setup

1. **Deploy the Edge Function:**

   ```bash
   supabase functions deploy auto-close-orders
   ```

2. **Set environment variables in Supabase Dashboard:**
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key

3. **Schedule via Supabase Dashboard:**
   - Go to Database → Cron Jobs
   - Create new job:
     - **Name**: `auto-close-orders`
     - **Schedule**: `0 2 * * *` (daily at 2 AM)
     - **Command**:
       ```sql
       SELECT
         net.http_post(
           url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/auto-close-orders',
           headers:='{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
         ) as request_id;
       ```

### Manual Trigger

**Via curl:**

```bash
curl -X POST \
  'https://YOUR_PROJECT_REF.supabase.co/functions/v1/auto-close-orders' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \
  -H 'Content-Type: application/json'
```

**Via Supabase client:**

```typescript
const { data, error } = await supabase.functions.invoke("auto-close-orders");
```

### Response Format

```json
{
  "success": true,
  "message": "Successfully closed 5 orders",
  "closedCount": 5,
  "closedOrders": [
    {
      "id": "uuid",
      "userId": "uuid",
      "serviceType": "resume-profesional"
    }
  ],
  "timestamp": "2025-11-02T14:00:00.000Z"
}
```

---

## Database Schema

### orders table (updated)

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  service_type TEXT NOT NULL,
  status TEXT NOT NULL,  -- 'pending', 'paid', 'completed', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()  -- Added by migration
);
```

### order_closure_log table (new)

```sql
CREATE TABLE order_closure_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_type TEXT,
  closed_at TIMESTAMPTZ DEFAULT NOW(),
  days_since_creation INTEGER,
  previous_status TEXT,
  closure_method TEXT DEFAULT 'auto-cron'
);
```

---

## Cron Expression Reference

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-7, Sunday = 0 or 7)
│ │ │ └───── Month (1-12)
│ │ └─────── Day of month (1-31)
│ └───────── Hour (0-23)
└─────────── Minute (0-59)
```

**Common schedules:**

- `0 2 * * *` - Daily at 2:00 AM
- `0 */6 * * *` - Every 6 hours
- `0 0 * * 0` - Weekly on Sunday at midnight
- `0 2 1 * *` - Monthly on the 1st at 2:00 AM

---

## Testing

### Test the function manually:

```sql
-- 1. Create a test order older than 7 days
INSERT INTO orders (user_id, service_type, status, created_at)
VALUES (
  auth.uid(),
  'test-service',
  'paid',
  NOW() - INTERVAL '8 days'
);

-- 2. Run the auto-close function
SELECT trigger_auto_close_orders_with_audit();

-- 3. Verify the order was closed
SELECT * FROM orders WHERE service_type = 'test-service';

-- 4. Check the audit log
SELECT * FROM order_closure_log WHERE service_type = 'test-service';
```

---

## Troubleshooting

### Cron job not running

**Check if pg_cron is enabled:**

```sql
SELECT * FROM pg_extension WHERE extname = 'pg_cron';
```

**Check cron job status:**

```sql
SELECT * FROM cron.job_run_details
ORDER BY start_time DESC
LIMIT 10;
```

**View errors:**

```sql
SELECT
  jobid,
  runid,
  start_time,
  end_time,
  status,
  return_message
FROM cron.job_run_details
WHERE status = 'failed'
ORDER BY start_time DESC;
```

### Orders not being closed

**Check if there are orders to close:**

```sql
SELECT COUNT(*)
FROM orders
WHERE status = 'paid'
  AND created_at < NOW() - INTERVAL '7 days';
```

**Check function permissions:**

```sql
SELECT has_function_privilege('trigger_auto_close_orders_with_audit()', 'execute');
```

### Performance issues

**Add index if missing:**

```sql
CREATE INDEX IF NOT EXISTS idx_orders_status_created_at
ON orders(status, created_at)
WHERE status = 'paid';
```

**Analyze query performance:**

```sql
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE status = 'paid'
  AND created_at < NOW() - INTERVAL '7 days';
```

---

## Email Notifications (Optional)

To notify users when their service is auto-closed, integrate with Resend:

```typescript
// Add to Edge Function or create separate notification function
import { Resend } from "resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

async function notifyOrderClosure(order: Order) {
  await resend.emails.send({
    from: "FrancesHR <noreply@franceshr.com>",
    to: order.user_email,
    subject: "Your Service Has Been Completed",
    html: `
      <h1>Service Completed</h1>
      <p>Your ${order.service_type} service has been automatically completed after 7 days.</p>
      <p>Thank you for using FrancesHR!</p>
    `,
  });
}
```

---

## Security Considerations

✅ **Service role only** - Function uses service role key for admin operations
✅ **RLS policies** - Audit logs protected by Row Level Security
✅ **Audit trail** - All closures logged with timestamps
✅ **Index optimization** - Queries use indexed columns
✅ **Error handling** - Comprehensive error logging

---

## Monitoring & Alerts

### Set up alerts for failures:

1. **Supabase Dashboard** → Database → Cron Jobs → View logs
2. **Set up webhook** to notify on failures
3. **Monitor closure logs** for anomalies

### Key metrics to track:

- Orders closed per day
- Average days before closure
- Failed cron executions
- Query performance

---

## Maintenance

### Weekly checks:

```sql
-- Check cron job health
SELECT * FROM cron.job WHERE jobname = 'auto-close-orders-daily';

-- Review recent closures
SELECT COUNT(*), DATE(closed_at)
FROM order_closure_log
GROUP BY DATE(closed_at)
ORDER BY DATE(closed_at) DESC
LIMIT 7;

-- Check for stuck orders
SELECT COUNT(*)
FROM orders
WHERE status = 'paid'
  AND created_at < NOW() - INTERVAL '8 days';
```

---

## Rollback

To remove the auto-close system:

```sql
-- Unschedule the cron job
SELECT cron.unschedule('auto-close-orders-daily');

-- Drop the functions
DROP FUNCTION IF EXISTS trigger_auto_close_orders_with_audit();
DROP FUNCTION IF EXISTS trigger_auto_close_orders();

-- Drop the audit log table (optional)
DROP TABLE IF EXISTS order_closure_log;

-- Remove the index (optional)
DROP INDEX IF EXISTS idx_orders_status_created_at;
```

---

## Support

For issues or questions:

- **Email**: info@franceshr.com
- **Documentation**: Check Supabase pg_cron docs
- **Logs**: Review `cron.job_run_details` table
