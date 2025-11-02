# Auto-Close Orders - Quick Reference

## 🚀 Deployment Status

✅ **Migration Applied**: Database schema updated
✅ **Edge Function Deployed**: `auto-close-orders` is live
✅ **Cron Job Active**: Runs daily at 2:00 AM UTC
✅ **Project**: nxrickciehifetxsbvzj

---

## 📍 Quick Links

- **Dashboard**: https://supabase.com/dashboard/project/nxrickciehifetxsbvzj
- **Functions**: https://supabase.com/dashboard/project/nxrickciehifetxsbvzj/functions/auto-close-orders
- **Edge Function URL**: `https://nxrickciehifetxsbvzj.supabase.co/functions/v1/auto-close-orders`

---

## ⚡ Quick Commands

### Test Edge Function

```bash
./test-edge-function.sh
```

### Check Cron Status

```sql
SELECT * FROM cron.job WHERE jobname = 'auto-close-orders-daily';
```

### View Recent Closures

```sql
SELECT * FROM order_closure_log ORDER BY closed_at DESC LIMIT 10;
```

### Manual Trigger

```sql
SELECT trigger_auto_close_orders_with_audit();
```

### Check Upcoming Closures

```sql
SELECT COUNT(*) FROM orders
WHERE status = 'paid' AND created_at < NOW() - INTERVAL '7 days';
```

---

## 📋 How It Works

**Automatic**: Runs daily at 2:00 AM UTC via pg_cron
**Action**: Closes orders with `status = 'paid'` older than 7 days
**Result**: Updates to `status = 'completed'`
**Audit**: Logs every closure in `order_closure_log` table

---

## 🔧 Common Tasks

### Change Schedule

```sql
-- Hourly
SELECT cron.unschedule('auto-close-orders-daily');
SELECT cron.schedule('auto-close-orders-hourly', '0 * * * *',
  $$SELECT trigger_auto_close_orders_with_audit();$$);
```

### Disable Auto-Close

```sql
SELECT cron.unschedule('auto-close-orders-daily');
```

### Re-enable Auto-Close

```sql
SELECT cron.schedule('auto-close-orders-daily', '0 2 * * *',
  $$SELECT trigger_auto_close_orders_with_audit();$$);
```

---

## 📖 Full Documentation

- **Setup Guide**: `AUTO_CLOSE_ORDERS_SETUP.md`
- **Deployment Summary**: `DEPLOYMENT_SUMMARY.md`
- **Migration File**: `supabase/migrations/20251102000000_setup_auto_close_orders.sql`
- **Edge Function**: `supabase/functions/auto-close-orders/index.ts`
