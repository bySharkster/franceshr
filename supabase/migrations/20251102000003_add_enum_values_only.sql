-- Add missing enum values to existing order_status type
-- This migration only adds the enum values, column conversion happens separately

DO $$ 
BEGIN
  -- Check if order_status enum exists
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status') THEN
    RAISE NOTICE 'order_status enum type exists, adding missing values';
    
    -- Add 'requires_action' if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumtypid = 'order_status'::regtype 
      AND enumlabel = 'requires_action'
    ) THEN
      ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'requires_action';
      RAISE NOTICE 'Added requires_action to order_status enum';
    END IF;
    
    -- Add 'failed' if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumtypid = 'order_status'::regtype 
      AND enumlabel = 'failed'
    ) THEN
      ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'failed';
      RAISE NOTICE 'Added failed to order_status enum';
    END IF;
    
    -- Add 'completed' if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumtypid = 'order_status'::regtype 
      AND enumlabel = 'completed'
    ) THEN
      ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'completed';
      RAISE NOTICE 'Added completed to order_status enum';
    END IF;
    
    -- Add 'paid' if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumtypid = 'order_status'::regtype 
      AND enumlabel = 'paid'
    ) THEN
      ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'paid';
      RAISE NOTICE 'Added paid to order_status enum';
    END IF;
  ELSE
    RAISE NOTICE 'order_status enum type does not exist yet';
  END IF;
END $$;

-- Add comment to document the enum values
COMMENT ON TYPE order_status IS 'Valid order statuses: paid (payment successful), requires_action (payment needs user action), failed (payment failed), completed (service completed after 7 days)';
