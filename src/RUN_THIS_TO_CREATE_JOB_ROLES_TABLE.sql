-- ============================================
-- CIELO AGENCY - JOB ROLES TABLE SETUP
-- ============================================
-- Run this in your Supabase SQL Editor to create the job_roles table
-- Dashboard → SQL Editor → New Query → Paste this → Run

-- Create job_roles table
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
  updated_at timestamptz DEFAULT now()
);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_job_roles_updated_at ON job_roles;
CREATE TRIGGER update_job_roles_updated_at
  BEFORE UPDATE ON job_roles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_job_roles_status ON job_roles(status);
CREATE INDEX IF NOT EXISTS idx_job_roles_featured ON job_roles(featured);
CREATE INDEX IF NOT EXISTS idx_job_roles_posted_date ON job_roles(posted_date DESC);

-- Enable Row Level Security
ALTER TABLE job_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view open jobs" ON job_roles;
DROP POLICY IF EXISTS "Service role can manage all jobs" ON job_roles;

-- Create policy for public read access (only open jobs)
CREATE POLICY "Public can view open jobs"
  ON job_roles
  FOR SELECT
  USING (status = 'open');

-- Create policy for authenticated users (service role) to manage all jobs
CREATE POLICY "Service role can manage all jobs"
  ON job_roles
  FOR ALL
  USING (auth.role() = 'service_role');

-- Insert sample data for CIELO Agency
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
  'https://apply.workable.com/cielo-agency/j/123456/'
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
);

-- Verify the table was created
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'job_roles'
ORDER BY ordinal_position;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ job_roles table created successfully!';
  RAISE NOTICE '✅ RLS policies configured';
  RAISE NOTICE '✅ Sample data inserted';
  RAISE NOTICE '✅ You can now use the Jobs Admin panel at /jobs-admin';
END $$;
