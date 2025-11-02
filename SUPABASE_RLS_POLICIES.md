# Supabase Row Level Security (RLS) Policies

## GDPR Compliance & Data Protection

This document outlines the Row Level Security policies required for GDPR compliance and data protection.

## Required RLS Policies

### 1. Orders Table

```sql
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users can only read their own orders
CREATE POLICY "Users can view own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can create own orders"
ON orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update own orders"
ON orders FOR UPDATE
USING (auth.uid() = user_id);

-- Service role can manage all orders (for admin operations)
CREATE POLICY "Service role full access to orders"
ON orders FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');
```

### 2. Onboarding Data Table

```sql
-- Enable RLS
ALTER TABLE onboarding_data ENABLE ROW LEVEL SECURITY;

-- Users can only read their own onboarding data
CREATE POLICY "Users can view own onboarding data"
ON onboarding_data FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own onboarding data
CREATE POLICY "Users can create own onboarding data"
ON onboarding_data FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own onboarding data
CREATE POLICY "Users can update own onboarding data"
ON onboarding_data FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own onboarding data (GDPR Right to Erasure)
CREATE POLICY "Users can delete own onboarding data"
ON onboarding_data FOR DELETE
USING (auth.uid() = user_id);

-- Service role can manage all onboarding data
CREATE POLICY "Service role full access to onboarding data"
ON onboarding_data FOR ALL
USING (auth.jwt() ->> 'role' = 'service_role');
```

### 3. Storage Buckets (Resumes)

```sql
-- Create resumes bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Users can upload to their own folder
CREATE POLICY "Users can upload own resumes"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can view their own files
CREATE POLICY "Users can view own resumes"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can update their own files
CREATE POLICY "Users can update own resumes"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Users can delete their own files (GDPR Right to Erasure)
CREATE POLICY "Users can delete own resumes"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'resumes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Service role can manage all files
CREATE POLICY "Service role full access to resumes"
ON storage.objects FOR ALL
USING (
  bucket_id = 'resumes' AND
  auth.jwt() ->> 'role' = 'service_role'
);
```

## Encryption Settings

### Database Encryption

Supabase provides encryption at rest by default using AES-256 encryption for all data stored in PostgreSQL.

**Verify encryption:**

```sql
-- Check if encryption is enabled (Supabase handles this automatically)
SHOW ssl;
```

### Additional Column-Level Encryption (Optional)

For extra sensitive data, you can implement column-level encryption:

```sql
-- Install pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Example: Encrypt sensitive fields
ALTER TABLE onboarding_data
ADD COLUMN phone_encrypted BYTEA;

-- Encrypt data on insert
CREATE OR REPLACE FUNCTION encrypt_sensitive_data()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.phone IS NOT NULL THEN
    NEW.phone_encrypted = pgp_sym_encrypt(NEW.phone, current_setting('app.encryption_key'));
    NEW.phone = NULL; -- Clear plaintext
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER encrypt_before_insert
BEFORE INSERT OR UPDATE ON onboarding_data
FOR EACH ROW EXECUTE FUNCTION encrypt_sensitive_data();
```

## GDPR Compliance Checklist

### ✅ Data Access Control

- [x] RLS policies enforce user-level data isolation
- [x] Users can only access their own data
- [x] Service role has admin access for GDPR operations

### ✅ Right to Access (Article 15)

- [x] Users can view all their data via `/api/account/export`
- [x] Data export includes all tables and metadata

### ✅ Right to Rectification (Article 16)

- [x] Users can update their own data
- [x] Update policies in place for orders and onboarding

### ✅ Right to Erasure (Article 17)

- [x] Users can delete their account via `/api/account/delete`
- [x] Cascade deletion of all related data
- [x] File storage deletion included
- [x] DELETE policies in place

### ✅ Right to Data Portability (Article 20)

- [x] Data export in JSON format (machine-readable)
- [x] Includes all user data across tables

### ✅ Security Measures (Article 32)

- [x] Encryption at rest (AES-256)
- [x] Encryption in transit (TLS 1.3)
- [x] Row Level Security policies
- [x] Signed URLs for file access (time-limited)
- [x] Service role key protected (environment variable)

## Audit Logging

For production, implement audit logging:

```sql
-- Create audit log table
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Only service role can write to audit log
CREATE POLICY "Service role can write audit log"
ON audit_log FOR INSERT
WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Users can view their own audit log
CREATE POLICY "Users can view own audit log"
ON audit_log FOR SELECT
USING (auth.uid() = user_id);
```

## Data Retention Policy

Implement automatic data deletion after retention period:

```sql
-- Function to delete old data
CREATE OR REPLACE FUNCTION delete_old_data()
RETURNS void AS $$
BEGIN
  -- Delete orders older than 7 years (tax retention requirement)
  DELETE FROM orders
  WHERE created_at < NOW() - INTERVAL '7 years';

  -- Delete onboarding data for deleted users
  DELETE FROM onboarding_data
  WHERE user_id NOT IN (SELECT id FROM auth.users);
END;
$$ LANGUAGE plpgsql;

-- Schedule daily cleanup (use pg_cron extension)
SELECT cron.schedule('daily-cleanup', '0 2 * * *', 'SELECT delete_old_data()');
```

## Verification Commands

Run these to verify RLS is properly configured:

```sql
-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- List all policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';

-- Test as regular user (should only see own data)
SET ROLE authenticated;
SET request.jwt.claim.sub = 'user-uuid-here';
SELECT * FROM orders;
RESET ROLE;
```

## Implementation Steps

1. **Run RLS policies** in Supabase SQL Editor
2. **Verify policies** using verification commands
3. **Test data access** with different user accounts
4. **Enable audit logging** for compliance tracking
5. **Set up data retention** policies
6. **Document encryption** settings in security policy
7. **Regular security audits** (quarterly recommended)

## Contact

For security concerns or GDPR compliance questions:

- **Email:** privacy@franceshr.com
- **DPO:** dpo@franceshr.com
