-- =================================================
-- CIELO Agency Complete Careers System - Database Migration
-- =================================================
-- Run this in Supabase SQL Editor
-- Last Updated: November 7, 2025
-- 
-- This migration creates:
-- 1. job_roles table (main jobs table)
-- 2. job_views table (analytics tracking)
-- 3. job_webhooks table (webhook tracking)
-- 4. All necessary indexes, triggers, and RLS policies
-- =================================================

-- =================================================
-- Step 1: Create job_roles table
-- =================================================

CREATE TABLE IF NOT EXISTS job_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  description text,
  requirements text[],
  location text NOT NULL,
  type text DEFAULT 'Full-time',
  status text DEFAULT 'open',
  featured boolean DEFAULT false,
  url text,
  posted_date date DEFAULT CURRENT_DATE,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- =================================================
-- Step 2: Create job_views table (Analytics)
-- =================================================

CREATE TABLE IF NOT EXISTS job_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES job_roles(id) ON DELETE CASCADE,
  viewed_at timestamptz DEFAULT now(),
  user_agent text,
  referrer text
);

-- =================================================
-- Step 3: Create job_webhooks table (Webhook Tracking)
-- =================================================

CREATE TABLE IF NOT EXISTS job_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES job_roles(id) ON DELETE CASCADE,
  event_type text NOT NULL, -- 'created', 'updated', 'closed'
  payload jsonb,
  status text DEFAULT 'pending', -- 'pending', 'sent', 'failed'
  webhook_url text,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- =================================================
-- Step 4: Create auto-update timestamp function
-- =================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- =================================================
-- Step 5: Create webhook trigger function
-- =================================================

CREATE OR REPLACE FUNCTION notify_job_change()
RETURNS TRIGGER AS $$
DECLARE
  event_type text;
  webhook_payload jsonb;
BEGIN
  -- Determine event type
  IF TG_OP = 'INSERT' THEN
    event_type := 'created';
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'closed' AND OLD.status != 'closed' THEN
    event_type := 'closed';
  ELSIF TG_OP = 'UPDATE' THEN
    event_type := 'updated';
  ELSE
    RETURN NEW;
  END IF;

  -- Build webhook payload
  webhook_payload := jsonb_build_object(
    'event', event_type,
    'job', row_to_json(NEW),
    'timestamp', now()
  );

  -- Insert webhook record
  INSERT INTO job_webhooks (job_id, event_type, payload, status)
  VALUES (NEW.id, event_type, webhook_payload, 'pending');

  RETURN NEW;
END;
$$ language 'plpgsql';

-- =================================================
-- Step 6: Create triggers
-- =================================================

-- Auto-update timestamp on job_roles updates
DROP TRIGGER IF EXISTS update_job_roles_updated_at ON job_roles;
CREATE TRIGGER update_job_roles_updated_at
  BEFORE UPDATE ON job_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Notify on job changes (creates webhook records)
DROP TRIGGER IF EXISTS job_change_webhook_trigger ON job_roles;
CREATE TRIGGER job_change_webhook_trigger
  AFTER INSERT OR UPDATE ON job_roles
  FOR EACH ROW
  EXECUTE FUNCTION notify_job_change();

-- =================================================
-- Step 7: Create indexes for performance
-- =================================================

-- Job roles indexes
CREATE INDEX IF NOT EXISTS idx_job_roles_status ON job_roles(status);
CREATE INDEX IF NOT EXISTS idx_job_roles_featured ON job_roles(featured);
CREATE INDEX IF NOT EXISTS idx_job_roles_posted_date ON job_roles(posted_date DESC);
CREATE INDEX IF NOT EXISTS idx_job_roles_department ON job_roles(department);
CREATE INDEX IF NOT EXISTS idx_job_roles_location ON job_roles(location);
CREATE INDEX IF NOT EXISTS idx_job_roles_type ON job_roles(type);

-- Job views indexes
CREATE INDEX IF NOT EXISTS idx_job_views_job_id ON job_views(job_id);
CREATE INDEX IF NOT EXISTS idx_job_views_viewed_at ON job_views(viewed_at DESC);

-- Job webhooks indexes
CREATE INDEX IF NOT EXISTS idx_job_webhooks_job_id ON job_webhooks(job_id);
CREATE INDEX IF NOT EXISTS idx_job_webhooks_status ON job_webhooks(status);
CREATE INDEX IF NOT EXISTS idx_job_webhooks_event_type ON job_webhooks(event_type);

-- =================================================
-- Step 8: Enable Row Level Security
-- =================================================

ALTER TABLE job_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_webhooks ENABLE ROW LEVEL SECURITY;

-- =================================================
-- Step 9: Create RLS policies
-- =================================================

-- Job Roles Policies
-- Public can view only open jobs
DROP POLICY IF EXISTS "public_read_open_jobs" ON job_roles;
CREATE POLICY "public_read_open_jobs"
  ON job_roles
  FOR SELECT
  USING (status = 'open');

-- Service role can manage all jobs
DROP POLICY IF EXISTS "service_role_all_jobs" ON job_roles;
CREATE POLICY "service_role_all_jobs"
  ON job_roles
  FOR ALL
  USING (auth.role() = 'service_role');

-- Job Views Policies
-- Anyone can insert views (for analytics)
DROP POLICY IF EXISTS "public_insert_views" ON job_views;
CREATE POLICY "public_insert_views"
  ON job_views
  FOR INSERT
  WITH CHECK (true);

-- Service role can read all views
DROP POLICY IF EXISTS "service_role_read_views" ON job_views;
CREATE POLICY "service_role_read_views"
  ON job_views
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Job Webhooks Policies
-- Service role only
DROP POLICY IF EXISTS "service_role_webhooks" ON job_webhooks;
CREATE POLICY "service_role_webhooks"
  ON job_webhooks
  FOR ALL
  USING (auth.role() = 'service_role');

-- =================================================
-- Step 10: Sample Data (Optional - Comment out if not needed)
-- =================================================

-- Insert sample job postings for CIELO Agency
INSERT INTO job_roles (title, department, description, requirements, location, type, status, featured, url) VALUES

(
  'Senior Brand Strategist',
  'Brand & Strategy',
  'Lead brand strategy development for high-growth startups and established companies. Work directly with founders to define positioning, messaging, and go-to-market strategy.',
  ARRAY[
    '5+ years experience in brand strategy or consulting',
    'Portfolio of successful brand launches',
    'Strong understanding of startup ecosystems',
    'Excellent communication and presentation skills'
  ],
  'Remote',
  'Full-time',
  'open',
  true,
  null
),

(
  'Creative Director',
  'Design',
  'Own the creative vision across all client work. Lead a team of designers to deliver world-class brand identities, websites, and digital experiences.',
  ARRAY[
    '7+ years in creative leadership roles',
    'Strong portfolio of brand and digital work',
    'Experience managing creative teams',
    'Proficiency in Figma, Adobe Creative Suite'
  ],
  'Remote',
  'Full-time',
  'open',
  true,
  null
),

(
  'Full-Stack Developer',
  'Development',
  'Build cutting-edge websites and web applications for our clients. Work with modern tech stack (React, Next.js, Node, Supabase) to ship fast.',
  ARRAY[
    '3+ years full-stack development experience',
    'Strong React and TypeScript skills',
    'Experience with modern deployment (Vercel, Netlify)',
    'Portfolio of shipped projects'
  ],
  'Remote',
  'Full-time',
  'open',
  true,
  null
),

(
  'Social Media Manager',
  'Marketing',
  'Manage social media strategy and execution for multiple client accounts. Create engaging content, grow audiences, and drive meaningful engagement.',
  ARRAY[
    '3+ years managing brand social media',
    'Experience with content creation and copywriting',
    'Strong understanding of platform algorithms',
    'Analytics-driven mindset'
  ],
  'Remote',
  'Full-time',
  'open',
  false,
  null
),

(
  'Motion Designer',
  'Design',
  'Create stunning motion graphics and animations for brand campaigns, social media, and websites. Push the boundaries of what''s possible.',
  ARRAY[
    '3+ years motion design experience',
    'Expert in After Effects and Premiere Pro',
    'Strong design fundamentals',
    'Portfolio showcasing range of styles'
  ],
  'Remote',
  'Contract',
  'open',
  false,
  null
),

(
  'UI/UX Designer',
  'Design',
  'Design beautiful, intuitive user interfaces and experiences for web and mobile. Work closely with clients and developers to bring visions to life.',
  ARRAY[
    '3+ years UI/UX design experience',
    'Expert in Figma',
    'Strong portfolio showcasing web/mobile work',
    'Understanding of design systems and component libraries'
  ],
  'Remote',
  'Full-time',
  'open',
  false,
  null
)
ON CONFLICT DO NOTHING;

-- =================================================
-- Verification Queries
-- =================================================

-- Check tables were created
SELECT 'job_roles' as table_name, COUNT(*) as count FROM job_roles
UNION ALL
SELECT 'job_views' as table_name, COUNT(*) as count FROM job_views
UNION ALL
SELECT 'job_webhooks' as table_name, COUNT(*) as count FROM job_webhooks;

-- Count jobs by status
SELECT status, COUNT(*) FROM job_roles GROUP BY status;

-- View featured jobs
SELECT title, department, location FROM job_roles WHERE featured = true;

-- =================================================
-- Complete! ✅
-- =================================================
-- Database setup complete with:
-- ✓ job_roles table (main jobs)
-- ✓ job_views table (analytics)
-- ✓ job_webhooks table (webhook tracking)
-- ✓ All indexes for performance
-- ✓ RLS policies for security
-- ✓ Triggers for auto-updates and webhooks
--
-- Next steps:
-- 1. Verify tables exist in Supabase Dashboard
-- 2. Set up webhook destinations (Slack, email, etc.)
-- 3. Navigate to /jobs to view public page
-- 4. Login and go to /jobs-admin to manage postings
-- 5. Check /jobs/analytics for view tracking
-- =================================================
