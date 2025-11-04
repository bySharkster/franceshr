-- Fix RLS policies for onboarding_data table to allow upsert operations
-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.onboarding_data;
DROP POLICY IF EXISTS "Enable read access for own data" ON public.onboarding_data;
DROP POLICY IF EXISTS "Enable update for own data" ON public.onboarding_data;

-- Create comprehensive policies for authenticated users
-- Allow users to insert their own onboarding data
CREATE POLICY "Users can insert their own onboarding data"
ON public.onboarding_data
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own onboarding data
CREATE POLICY "Users can read their own onboarding data"
ON public.onboarding_data
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to update their own onboarding data
CREATE POLICY "Users can update their own onboarding data"
ON public.onboarding_data
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own onboarding data (optional, for future use)
CREATE POLICY "Users can delete their own onboarding data"
ON public.onboarding_data
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add comment for documentation
COMMENT ON TABLE public.onboarding_data IS 'Stores onboarding form data submitted by users after purchasing a service. Each order can have only one onboarding submission (enforced by unique constraint on order_id).';
