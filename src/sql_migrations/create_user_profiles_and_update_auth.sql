-- =================================================
-- CIELO Agency User Profiles & Auth Enhancement
-- =================================================
-- Run this in Supabase SQL Editor
-- Last Updated: November 7, 2025
-- 
-- This migration creates:
-- 1. User profiles table with role-based access
-- 2. Auto-create profile trigger on user signup
-- 3. Enhanced RLS policies for team access
-- =================================================

-- =================================================
-- Step 1: Create user profiles table
-- =================================================

CREATE TABLE IF NOT EXISTS user_profiles (\n  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'team', -- 'admin', 'team', 'viewer'
  avatar_url text,
  department text,
  permissions jsonb DEFAULT '{"jobs": true, "portfolio": true, "leads": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_sign_in_at timestamptz
);

-- =================================================
-- Step 2: Create auto-update timestamp function
-- =================================================

CREATE OR REPLACE FUNCTION update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- =================================================
-- Step 3: Create trigger for auto-updating updated_at
-- =================================================

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_updated_at();

-- =================================================
-- Step 4: Create auto-create profile on user signup
-- =================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role, last_sign_in_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'team', -- Default role is 'team', change to 'admin' manually in dashboard
    now()
  )
  ON CONFLICT (id) DO UPDATE
  SET last_sign_in_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- =================================================
-- Step 5: Create trigger for auto-creating profile
-- =================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =================================================
-- Step 6: Add created_by to existing tables
-- =================================================

-- Add created_by and updated_by to job_roles if not exists
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'job_roles' AND column_name = 'created_by') THEN
    ALTER TABLE job_roles ADD COLUMN created_by uuid REFERENCES user_profiles(id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'job_roles' AND column_name = 'visibility') THEN
    ALTER TABLE job_roles ADD COLUMN visibility text DEFAULT 'public';
  END IF;
END $$;

-- Add updated fields to submission tables if not exists
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'discovery_submissions') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'discovery_submissions' AND column_name = 'updated_by') THEN
      ALTER TABLE discovery_submissions ADD COLUMN updated_by uuid REFERENCES user_profiles(id);
    END IF;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'brand_audit_submissions') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'brand_audit_submissions' AND column_name = 'updated_by') THEN
      ALTER TABLE brand_audit_submissions ADD COLUMN updated_by uuid REFERENCES user_profiles(id);
    END IF;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'contact_submissions') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'contact_submissions' AND column_name = 'updated_by') THEN
      ALTER TABLE contact_submissions ADD COLUMN updated_by uuid REFERENCES user_profiles(id);
    END IF;
  END IF;
END $$;

-- =================================================
-- Step 7: Create indexes for performance
-- =================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at DESC);

-- =================================================
-- Step 8: Enable Row Level Security
-- =================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- =================================================
-- Step 9: Create RLS policies for user_profiles
-- =================================================

-- Authenticated users can view all profiles
DROP POLICY IF EXISTS "authenticated_view_profiles" ON user_profiles;
CREATE POLICY "authenticated_view_profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own profile
DROP POLICY IF EXISTS "users_update_own_profile" ON user_profiles;
CREATE POLICY "users_update_own_profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can update any profile (check role from user_profiles)
DROP POLICY IF EXISTS "admins_update_profiles" ON user_profiles;
CREATE POLICY "admins_update_profiles"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Service role has full access
DROP POLICY IF EXISTS "service_role_profiles" ON user_profiles;
CREATE POLICY "service_role_profiles"
  ON user_profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =================================================
-- Step 10: Update job_roles RLS policies for authenticated access
-- =================================================

-- Authenticated users can view all jobs (for dashboard)
DROP POLICY IF EXISTS "authenticated_view_all_jobs" ON job_roles;
CREATE POLICY "authenticated_view_all_jobs"
  ON job_roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can create jobs
DROP POLICY IF EXISTS "authenticated_create_jobs" ON job_roles;
CREATE POLICY "authenticated_create_jobs"
  ON job_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update jobs
DROP POLICY IF EXISTS "authenticated_update_jobs" ON job_roles;
CREATE POLICY "authenticated_update_jobs"
  ON job_roles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete jobs
DROP POLICY IF EXISTS "authenticated_delete_jobs" ON job_roles;
CREATE POLICY "authenticated_delete_jobs"
  ON job_roles
  FOR DELETE
  TO authenticated
  USING (true);

-- =================================================
-- Step 11: Insert default admin user (CHANGE EMAIL!)
-- =================================================
-- IMPORTANT: After running this migration, you need to:
-- 1. Sign up with your admin email in the app
-- 2. Then run this query to make yourself admin:
--
-- UPDATE user_profiles 
-- SET role = 'admin' 
-- WHERE email = 'your-email@example.com';
--
-- Or create a default admin account using Supabase Dashboard > Authentication
-- =================================================

-- =================================================
-- Verification Queries
-- =================================================

-- Check user profiles table
SELECT * FROM user_profiles ORDER BY created_at DESC;

-- Count users by role
SELECT role, COUNT(*) FROM user_profiles GROUP BY role;

-- =================================================
-- Complete! ✅
-- =================================================
-- Database setup complete with:
-- ✓ user_profiles table with role-based access
-- ✓ Auto-create profile on user signup
-- ✓ Enhanced RLS policies for team access
-- ✓ Indexes for performance
-- ✓ Audit trail with created_by fields
--
-- Next steps:
-- 1. Sign up first user in the app
-- 2. Manually set their role to 'admin' in Supabase Dashboard
-- 3. Test team login and dashboard access
-- 4. Invite additional team members
-- =================================================
