-- Drop order_status enum if it exists
-- This migration removes the enum type that was added but not used

DO $$ 
BEGIN
  -- Check if the enum type exists
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    -- Drop the enum type (this will fail if it's being used by any columns)
    DROP TYPE order_status CASCADE;
    RAISE NOTICE 'Dropped order_status enum type';
  ELSE
    RAISE NOTICE 'order_status enum type does not exist, nothing to drop';
  END IF;
END $$;

-- Remove the index if it was created
DROP INDEX IF EXISTS idx_orders_status;

-- Remove comments if they exist
COMMENT ON COLUMN orders.status IS NULL;
