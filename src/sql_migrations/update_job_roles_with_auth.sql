-- =================================================
-- CIELO Agency Jobs System - Auth-Based Migration
-- =================================================
-- Run this in Supabase SQL Editor
-- Last Updated: November 7, 2025
-- 
-- This migration updates job_roles table for Supabase Auth
-- and creates proper RLS policies for team management
-- =================================================

-- =================================================
-- Step 1: Add auth-related columns to job_roles
-- =================================================

-- Add created_by column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'job_roles' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE job_roles ADD COLUMN created_by uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Add visibility column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'job_roles' AND column_name = 'visibility'
  ) THEN
    ALTER TABLE job_roles ADD COLUMN visibility text DEFAULT 'public';
  END IF;
END $$;

-- Create index on created_by
CREATE INDEX IF NOT EXISTS idx_job_roles_created_by ON job_roles(created_by);

-- =================================================
-- Step 2: Drop old RLS policies
-- =================================================

DROP POLICY IF EXISTS "public_read_open_jobs" ON job_roles;
DROP POLICY IF EXISTS "service_role_all_jobs" ON job_roles;
DROP POLICY IF EXISTS "Public can view open jobs" ON job_roles;
DROP POLICY IF EXISTS "Service role can manage all jobs" ON job_roles;

-- =================================================
-- Step 3: Create new auth-based RLS policies
-- =================================================

-- Policy 1: Public can view only open jobs
CREATE POLICY "public_view_open_jobs"
  ON job_roles
  FOR SELECT
  USING (status = 'open' AND visibility = 'public');

-- Policy 2: Authenticated users can view all jobs (for dashboard)
CREATE POLICY "authenticated_view_all_jobs"
  ON job_roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Authenticated users can insert jobs
CREATE POLICY "authenticated_insert_jobs"
  ON job_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Policy 4: Authenticated users can update their own jobs
CREATE POLICY "authenticated_update_own_jobs"
  ON job_roles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Policy 5: Authenticated users can delete their own jobs
CREATE POLICY "authenticated_delete_own_jobs"
  ON job_roles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Policy 6: Service role has full access (for server operations)
CREATE POLICY "service_role_full_access"
  ON job_roles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =================================================
-- Step 4: Update job_views policies for auth
-- =================================================

-- Drop old policies
DROP POLICY IF EXISTS "public_insert_views" ON job_views;
DROP POLICY IF EXISTS "service_role_read_views" ON job_views;

-- Anyone can insert views (for analytics)
CREATE POLICY "anyone_insert_views"
  ON job_views
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can read all views
CREATE POLICY "authenticated_read_views"
  ON job_views
  FOR SELECT
  TO authenticated
  USING (true);

-- =================================================
-- Step 5: Update job_webhooks policies for auth
-- =================================================

-- Drop old policies
DROP POLICY IF EXISTS "service_role_webhooks" ON job_webhooks;

-- Authenticated users can read webhooks
CREATE POLICY "authenticated_read_webhooks"
  ON job_webhooks
  FOR SELECT
  TO authenticated
  USING (true);

-- Service role can manage webhooks
CREATE POLICY "service_role_manage_webhooks"
  ON job_webhooks
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =================================================
-- Step 6: Create user profiles table (optional but recommended)
-- =================================================

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text DEFAULT 'team', -- 'admin' or 'team'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "users_view_own_profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "users_update_own_profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role can manage all profiles
CREATE POLICY "service_role_manage_profiles"
  ON user_profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =================================================
-- Step 7: Create trigger to auto-create user profile
-- =================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'team')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =================================================
-- Step 8: Update existing jobs to have a created_by
-- =================================================

-- Set created_by to NULL for existing jobs (or to a system user if you create one)
-- This is safe because the policies allow viewing all jobs for authenticated users
UPDATE job_roles 
SET created_by = NULL 
WHERE created_by IS NULL;

-- =================================================
-- Verification Queries
-- =================================================

-- Check columns exist
SELECT 
  column_name, 
  data_type, 
  column_default 
FROM information_schema.columns 
WHERE table_name = 'job_roles' 
  AND column_name IN ('created_by', 'visibility');

-- Check RLS policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd 
FROM pg_policies 
WHERE tablename IN ('job_roles', 'job_views', 'job_webhooks', 'user_profiles')
ORDER BY tablename, policyname;

-- Check user_profiles table
SELECT COUNT(*) FROM user_profiles;

-- =================================================
-- Complete! ✅
-- =================================================
-- Next steps:
-- 1. Verify RLS policies in Supabase Dashboard
-- 2. Create test user via Supabase Auth UI
-- 3. Test login flow in app
-- 4. Test job creation with authenticated user
-- 5. Verify public can still view open jobs (logged out)
-- =================================================
