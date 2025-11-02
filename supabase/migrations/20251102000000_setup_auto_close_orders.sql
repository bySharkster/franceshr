-- Enable pg_cron extension for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Grant necessary permissions to postgres user
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Create a function to call the Edge Function
CREATE OR REPLACE FUNCTION trigger_auto_close_orders()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  function_url text;
  service_role_key text;
  response text;
BEGIN
  -- Get the Supabase project URL and service role key from environment
  -- In production, these should be set via Supabase dashboard
  function_url := current_setting('app.supabase_url', true) || '/functions/v1/auto-close-orders';
  service_role_key := current_setting('app.supabase_service_role_key', true);
  
  -- Call the Edge Function using pg_net (if available) or http extension
  -- Note: This requires the http extension or pg_net to be enabled
  -- Alternative: Use Supabase's built-in cron with Edge Functions
  
  -- Log the execution
  RAISE NOTICE 'Auto-close orders function triggered at %', NOW();
  
  -- Update orders directly in SQL (alternative to Edge Function)
  UPDATE orders
  SET 
    status = 'completed',
    updated_at = NOW()
  WHERE 
    status = 'paid'
    AND created_at < NOW() - INTERVAL '7 days';
    
  -- Log how many orders were closed
  RAISE NOTICE 'Closed % orders', (SELECT COUNT(*) FROM orders WHERE status = 'completed' AND updated_at > NOW() - INTERVAL '1 minute');
END;
$$;

-- Schedule the function to run daily at 2 AM UTC
-- This uses pg_cron to schedule the job
SELECT cron.schedule(
  'auto-close-orders-daily',           -- Job name
  '0 2 * * *',                         -- Cron expression: Every day at 2:00 AM UTC
  $$SELECT trigger_auto_close_orders();$$
);

-- Alternative: Schedule to run every hour (more frequent)
-- SELECT cron.schedule(
--   'auto-close-orders-hourly',
--   '0 * * * *',                       -- Every hour at minute 0
--   $$SELECT trigger_auto_close_orders();$$
-- );

-- View scheduled jobs
-- SELECT * FROM cron.job;

-- To unschedule the job (if needed):
-- SELECT cron.unschedule('auto-close-orders-daily');

-- Add index for better performance on the query
CREATE INDEX IF NOT EXISTS idx_orders_status_created_at 
ON orders(status, created_at) 
WHERE status = 'paid';

-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'orders' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE orders ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    
    -- Create trigger to auto-update updated_at
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $trigger$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $trigger$ LANGUAGE plpgsql;
    
    CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Create audit log table for tracking auto-closed orders
CREATE TABLE IF NOT EXISTS order_closure_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  package_slug TEXT,
  closed_at TIMESTAMPTZ DEFAULT NOW(),
  days_since_creation INTEGER,
  previous_status TEXT,
  closure_method TEXT DEFAULT 'auto-cron'
);

-- Enable RLS on audit log
ALTER TABLE order_closure_log ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can insert
CREATE POLICY "Service role can insert closure logs"
ON order_closure_log FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Policy: Users can view their own closure logs
CREATE POLICY "Users can view own closure logs"
ON order_closure_log FOR SELECT
USING (auth.uid() = user_id);

-- Enhanced function with audit logging
CREATE OR REPLACE FUNCTION trigger_auto_close_orders_with_audit()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  closed_order RECORD;
  closed_count INTEGER := 0;
BEGIN
  -- Log the execution start
  RAISE NOTICE 'Auto-close orders function started at %', NOW();
  
  -- Update orders and log each closure
  FOR closed_order IN
    SELECT 
      id, 
      user_id, 
      package_slug, 
      status,
      EXTRACT(DAY FROM (NOW() - created_at)) as days_old
    FROM orders
    WHERE 
      status = 'paid'
      AND created_at < NOW() - INTERVAL '7 days'
  LOOP
    -- Update the order
    UPDATE orders
    SET 
      status = 'completed',
      updated_at = NOW()
    WHERE id = closed_order.id;
    
    -- Log the closure
    INSERT INTO order_closure_log (
      order_id,
      user_id,
      package_slug,
      days_since_creation,
      previous_status
    ) VALUES (
      closed_order.id,
      closed_order.user_id,
      closed_order.package_slug,
      closed_order.days_old,
      closed_order.status
    );
    
    closed_count := closed_count + 1;
  END LOOP;
  
  -- Log the execution end
  RAISE NOTICE 'Auto-close orders completed. Closed % orders', closed_count;
END;
$$;

-- Update the cron job to use the audit version
SELECT cron.unschedule('auto-close-orders-daily');
SELECT cron.schedule(
  'auto-close-orders-daily',
  '0 2 * * *',
  $$SELECT trigger_auto_close_orders_with_audit();$$
);

-- Grant execute permission
GRANT EXECUTE ON FUNCTION trigger_auto_close_orders() TO postgres;
GRANT EXECUTE ON FUNCTION trigger_auto_close_orders_with_audit() TO postgres;

COMMENT ON FUNCTION trigger_auto_close_orders_with_audit() IS 
'Automatically closes paid orders that are older than 7 days and logs the closure for audit purposes. Runs daily at 2 AM UTC via pg_cron.';
