-- ================================================
-- CREATE PORTFOLIO PROJECTS TABLE
-- ================================================

-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  -- Primary identification
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  
  -- Project info
  title text NOT NULL,
  description text,
  excerpt text,
  
  -- Client & Category
  client_name text,
  category text,
  project_type text,
  industry text,
  
  -- Media
  featured_image text,
  featured_image_alt text,
  thumbnail text,
  gallery_images text[] DEFAULT ARRAY[]::text[],
  video_url text,
  
  -- Project details
  challenge text,
  solution text,
  results text,
  technologies text[] DEFAULT ARRAY[]::text[],
  tags text[] DEFAULT ARRAY[]::text[],
  
  -- Links
  live_url text,
  case_study_url text,
  github_url text,
  
  -- Metrics
  completion_date date,
  duration_weeks integer,
  team_size integer,
  
  -- Status & visibility
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  status text DEFAULT 'completed',
  
  -- SEO
  meta_title text,
  meta_description text,
  
  -- Stats
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- CREATE INDEXES
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug ON public.portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_published ON public.portfolio_projects(published);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON public.portfolio_projects(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON public.portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_status ON public.portfolio_projects(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_tags ON public.portfolio_projects USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_created_at ON public.portfolio_projects(created_at DESC);

-- CREATE TRIGGER FOR AUTO-UPDATE TIMESTAMP
CREATE OR REPLACE FUNCTION public.update_portfolio_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS portfolio_projects_updated_at_trigger ON public.portfolio_projects;
CREATE TRIGGER portfolio_projects_updated_at_trigger
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_portfolio_projects_updated_at();

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- CREATE RLS POLICIES

-- Public can read published projects
DROP POLICY IF EXISTS "Public can read published portfolio projects" ON public.portfolio_projects;
CREATE POLICY "Public can read published portfolio projects"
  ON public.portfolio_projects
  FOR SELECT
  USING (published = true);

-- Authenticated users can read all projects
DROP POLICY IF EXISTS "Authenticated users can read all portfolio projects" ON public.portfolio_projects;
CREATE POLICY "Authenticated users can read all portfolio projects"
  ON public.portfolio_projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert projects
DROP POLICY IF EXISTS "Authenticated users can insert portfolio projects" ON public.portfolio_projects;
CREATE POLICY "Authenticated users can insert portfolio projects"
  ON public.portfolio_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update projects
DROP POLICY IF EXISTS "Authenticated users can update portfolio projects" ON public.portfolio_projects;
CREATE POLICY "Authenticated users can update portfolio projects"
  ON public.portfolio_projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete projects
DROP POLICY IF EXISTS "Authenticated users can delete portfolio projects" ON public.portfolio_projects;
CREATE POLICY "Authenticated users can delete portfolio projects"
  ON public.portfolio_projects
  FOR DELETE
  TO authenticated
  USING (true);

-- GRANT PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.portfolio_projects TO anon;
GRANT ALL ON public.portfolio_projects TO authenticated;
