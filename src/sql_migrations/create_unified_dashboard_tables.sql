-- =================================================
-- CIELO Agency Unified Team Dashboard - Complete Migration
-- =================================================
-- Run this in Supabase SQL Editor
-- Last Updated: November 7, 2025
-- 
-- This migration creates all tables for the unified team dashboard:
-- 1. discovery_submissions table
-- 2. brand_audit_submissions table
-- 3. contact_submissions table (general inquiries)
-- 4. team_activity_log table (audit trail)
-- All with proper RLS policies and indexes
-- =================================================

-- =================================================
-- Step 1: Create discovery_submissions table
-- =================================================

CREATE TABLE IF NOT EXISTS discovery_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE,
  name text,
  email text,
  phone text,
  company_name text,
  business_need text,
  services text,
  budget text,
  timeline text,
  message text,
  status text DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted', 'archived'
  priority text DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =================================================
-- Step 2: Create brand_audit_submissions table
-- =================================================

CREATE TABLE IF NOT EXISTS brand_audit_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE,
  email text NOT NULL,
  company_name text,
  industry text,
  website text,
  focus_area text, -- 'brand-positioning', 'visual-identity', 'messaging', 'competitive-analysis'
  target_audience text,
  current_challenges text,
  competitors text,
  unique_value text,
  goals text,
  audit_result jsonb, -- Store the AI-generated audit results
  status text DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'sent', 'archived'
  priority text DEFAULT 'normal',
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  submitted_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =================================================
-- Step 3: Create contact_submissions table
-- =================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE,
  name text,
  email text,
  company text,
  subject text,
  message text,
  source text, -- 'contact-form', 'inquiry-page', 'footer'
  status text DEFAULT 'new',
  priority text DEFAULT 'normal',
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =================================================
-- Step 4: Create team_activity_log table
-- =================================================

CREATE TABLE IF NOT EXISTS team_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL, -- 'created', 'updated', 'deleted', 'viewed', 'assigned', 'status_changed'
  entity_type text NOT NULL, -- 'job', 'portfolio', 'discovery', 'brand_audit', 'contact'
  entity_id text NOT NULL,
  details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- =================================================
-- Step 5: Create auto-update timestamp functions
-- =================================================

CREATE OR REPLACE FUNCTION update_discovery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_brand_audit_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_contact_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- =================================================
-- Step 6: Create triggers for auto-updating updated_at
-- =================================================

DROP TRIGGER IF EXISTS update_discovery_submissions_updated_at ON discovery_submissions;
CREATE TRIGGER update_discovery_submissions_updated_at
  BEFORE UPDATE ON discovery_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_discovery_updated_at();

DROP TRIGGER IF EXISTS update_brand_audit_submissions_updated_at ON brand_audit_submissions;
CREATE TRIGGER update_brand_audit_submissions_updated_at
  BEFORE UPDATE ON brand_audit_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_brand_audit_updated_at();

DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_updated_at();

-- =================================================
-- Step 7: Create indexes for performance
-- =================================================

-- Discovery submissions indexes
CREATE INDEX IF NOT EXISTS idx_discovery_status ON discovery_submissions(status);
CREATE INDEX IF NOT EXISTS idx_discovery_priority ON discovery_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_discovery_email ON discovery_submissions(email);
CREATE INDEX IF NOT EXISTS idx_discovery_submitted_at ON discovery_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_discovery_assigned_to ON discovery_submissions(assigned_to);

-- Brand audit submissions indexes
CREATE INDEX IF NOT EXISTS idx_brand_audit_status ON brand_audit_submissions(status);
CREATE INDEX IF NOT EXISTS idx_brand_audit_priority ON brand_audit_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_brand_audit_email ON brand_audit_submissions(email);
CREATE INDEX IF NOT EXISTS idx_brand_audit_focus_area ON brand_audit_submissions(focus_area);
CREATE INDEX IF NOT EXISTS idx_brand_audit_submitted_at ON brand_audit_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_brand_audit_assigned_to ON brand_audit_submissions(assigned_to);

-- Contact submissions indexes
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_priority ON contact_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_assigned_to ON contact_submissions(assigned_to);

-- Team activity log indexes
CREATE INDEX IF NOT EXISTS idx_activity_user_id ON team_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_entity_type ON team_activity_log(entity_type);
CREATE INDEX IF NOT EXISTS idx_activity_entity_id ON team_activity_log(entity_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON team_activity_log(created_at DESC);

-- =================================================
-- Step 8: Enable Row Level Security
-- =================================================

ALTER TABLE discovery_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_audit_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_activity_log ENABLE ROW LEVEL SECURITY;

-- =================================================
-- Step 9: Create RLS policies
-- =================================================

-- Discovery Submissions Policies
-- Authenticated users can view all submissions
CREATE POLICY "authenticated_view_discovery"
  ON discovery_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update submissions
CREATE POLICY "authenticated_update_discovery"
  ON discovery_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Service role has full access
CREATE POLICY "service_role_discovery"
  ON discovery_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Brand Audit Submissions Policies
-- Authenticated users can view all submissions
CREATE POLICY "authenticated_view_brand_audit"
  ON brand_audit_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update submissions
CREATE POLICY "authenticated_update_brand_audit"
  ON brand_audit_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Service role has full access
CREATE POLICY "service_role_brand_audit"
  ON brand_audit_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Contact Submissions Policies
-- Authenticated users can view all submissions
CREATE POLICY "authenticated_view_contact"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can update submissions
CREATE POLICY "authenticated_update_contact"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Service role has full access
CREATE POLICY "service_role_contact"
  ON contact_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Team Activity Log Policies
-- Authenticated users can view all activity
CREATE POLICY "authenticated_view_activity"
  ON team_activity_log
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert their own activity
CREATE POLICY "authenticated_insert_activity"
  ON team_activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Service role has full access
CREATE POLICY "service_role_activity"
  ON team_activity_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =================================================
-- Step 10: Migrate existing data from KV store
-- =================================================

DO $$
DECLARE
  kv_record RECORD;
  submission_data jsonb;
BEGIN
  -- Check if kv_store_27c238f7 table exists
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'kv_store_27c238f7') THEN
    
    -- Migrate discovery submissions
    FOR kv_record IN 
      SELECT key, value 
      FROM kv_store_27c238f7 
      WHERE key LIKE 'discovery:submission:%'
    LOOP
      submission_data := kv_record.value;
      
      INSERT INTO discovery_submissions (
        submission_id,
        name,
        email,
        phone,
        company_name,
        business_need,
        services,
        budget,
        timeline,
        message,
        submitted_at
      ) VALUES (
        submission_data->>'id',
        submission_data->>'name',
        submission_data->>'email',
        submission_data->>'phone',
        submission_data->>'companyName',
        submission_data->>'businessNeed',
        submission_data->>'services',
        submission_data->>'budget',
        submission_data->>'timeline',
        submission_data->>'message',
        COALESCE((submission_data->>'submittedAt')::timestamptz, now())
      )
      ON CONFLICT (submission_id) DO NOTHING;
      
    END LOOP;
    
    -- Migrate brand audit submissions
    FOR kv_record IN 
      SELECT key, value 
      FROM kv_store_27c238f7 
      WHERE key LIKE 'brand-audit:submission:%'
    LOOP
      submission_data := kv_record.value;
      
      INSERT INTO brand_audit_submissions (
        submission_id,
        email,
        company_name,
        industry,
        website,
        focus_area,
        target_audience,
        current_challenges,
        competitors,
        unique_value,
        goals,
        audit_result,
        status,
        submitted_at
      ) VALUES (
        submission_data->>'id',
        submission_data->>'email',
        submission_data->>'companyName',
        submission_data->>'industry',
        submission_data->>'website',
        submission_data->>'focusArea',
        submission_data->>'targetAudience',
        submission_data->>'currentChallenges',
        submission_data->>'competitors',
        submission_data->>'uniqueValue',
        submission_data->>'goals',
        submission_data->'auditResult',
        CASE 
          WHEN submission_data->>'auditResult' IS NOT NULL THEN 'completed'
          ELSE 'pending'
        END,
        COALESCE((submission_data->>'submittedAt')::timestamptz, now())
      )
      ON CONFLICT (submission_id) DO NOTHING;
      
    END LOOP;
    
    RAISE NOTICE 'Data migration from KV store completed';
  ELSE
    RAISE NOTICE 'KV store table not found, skipping data migration';
  END IF;
END $$;

-- =================================================
-- Verification Queries
-- =================================================

-- Check tables were created
SELECT 'discovery_submissions' as table_name, COUNT(*) as count FROM discovery_submissions
UNION ALL
SELECT 'brand_audit_submissions' as table_name, COUNT(*) as count FROM brand_audit_submissions
UNION ALL
SELECT 'contact_submissions' as table_name, COUNT(*) as count FROM contact_submissions
UNION ALL
SELECT 'team_activity_log' as table_name, COUNT(*) as count FROM team_activity_log;

-- Count by status
SELECT 'discovery' as type, status, COUNT(*) FROM discovery_submissions GROUP BY status
UNION ALL
SELECT 'brand_audit' as type, status, COUNT(*) FROM brand_audit_submissions GROUP BY status
UNION ALL
SELECT 'contact' as type, status, COUNT(*) FROM contact_submissions GROUP BY status
ORDER BY type, status;

-- =================================================
-- Complete! ✅
-- =================================================
-- Database setup complete with:
-- ✓ discovery_submissions table
-- ✓ brand_audit_submissions table
-- ✓ contact_submissions table
-- ✓ team_activity_log table
-- ✓ All indexes for performance
-- ✓ RLS policies for security
-- ✓ Triggers for auto-updates
-- ✓ Data migration from KV store
--
-- Next steps:
-- 1. Verify tables exist in Supabase Dashboard
-- 2. Update server endpoints to use new tables
-- 3. Test unified team dashboard
-- 4. Configure role-based permissions
-- =================================================
