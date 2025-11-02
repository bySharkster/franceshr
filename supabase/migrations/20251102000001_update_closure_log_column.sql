-- Update order_closure_log table to rename service_type to package_slug
-- This migration handles the column rename for existing deployments

-- Check if service_type column exists and rename it
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'order_closure_log' AND column_name = 'service_type'
  ) THEN
    ALTER TABLE order_closure_log RENAME COLUMN service_type TO package_slug;
    RAISE NOTICE 'Renamed service_type to package_slug in order_closure_log';
  ELSE
    RAISE NOTICE 'Column service_type does not exist, skipping rename';
  END IF;
END $$;

-- Recreate the function with package_slug
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

COMMENT ON FUNCTION trigger_auto_close_orders_with_audit() IS 
'Automatically closes paid orders that are older than 7 days and logs the closure for audit purposes. Uses package_slug from orders table. Runs daily at 2 AM UTC via pg_cron.';
