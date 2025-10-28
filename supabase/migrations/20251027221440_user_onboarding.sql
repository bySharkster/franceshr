-- Add onboarding_data table
CREATE TABLE onboarding_data(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    service_id TEXT NOT NULL,
    order_id UUID NOT NULL,
    career_goals TEXT NOT NULL,
    industry_pursuing TEXT NOT NULL,
    related_experience TEXT NOT NULL,
    resume_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES auth.users (id),
    FOREIGN KEY (service_id) REFERENCES products (id),
    FOREIGN KEY (order_id) REFERENCES orders (id)
);

-- Add index for faster lookups
CREATE INDEX idx_onboarding_data_user_id ON onboarding_data(user_id);

-- Add index for faster lookups
CREATE INDEX idx_onboarding_data_service_id ON onboarding_data(service_id);

-- Add index for faster lookups
CREATE INDEX idx_onboarding_data_created_at ON onboarding_data(created_at);

-- Enable row level security
ALTER TABLE onboarding_data ENABLE ROW LEVEL SECURITY;

-- Create policy for onboarding_data to allow authenticated users to manage their own data
CREATE POLICY onboarding_data_policy
    ON onboarding_data
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());


-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow authenticated users to select/read files in their own folder
CREATE POLICY "Users can view their own resumes"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'resumes' 
    AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy: Allow authenticated users to insert files in their own folder
CREATE POLICY "Users can upload their own resumes"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'resumes' 
    AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy: Allow authenticated users to update files in their own folder
CREATE POLICY "Users can update their own resumes"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'resumes' 
    AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- Policy: Allow authenticated users to delete files in their own folder
CREATE POLICY "Users can delete their own resumes"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'resumes' 
    AND (auth.uid())::text = (storage.foldername(name))[1]
);


