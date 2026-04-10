-- =================================================
-- CIELO Agency Portfolio Projects Table
-- =================================================
-- Run this in Supabase SQL Editor to create the portfolio_projects table
-- =================================================

-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Project Info
  title text NOT NULL,
  client text,
  description text,
  excerpt text,
  
  -- Project Details
  industry text,
  services text[],
  project_date text,
  project_url text,
  
  -- Media
  featured_image text,
  gallery_images text[],
  thumbnail text,
  
  -- Content
  challenge text,
  solution text,
  results text,
  testimonial text,
  testimonial_author text,
  testimonial_role text,
  
  -- Metrics
  metrics jsonb,
  
  -- Categorization
  tags text[],
  category text,
  
  -- Status
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  
  -- Analytics
  view_count integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create auto-update timestamp function
CREATE OR REPLACE FUNCTION update_portfolio_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_portfolio_projects_updated_at ON portfolio_projects;
CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_portfolio_updated_at();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_portfolio_published ON portfolio_projects(published);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio_projects(created_at DESC);

-- Enable Row Level Security
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Allow public to view published projects
CREATE POLICY "public_view_published_portfolio"
  ON portfolio_projects
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Allow authenticated users to view all projects
CREATE POLICY "authenticated_view_all_portfolio"
  ON portfolio_projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create projects
CREATE POLICY "authenticated_create_portfolio"
  ON portfolio_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update projects
CREATE POLICY "authenticated_update_portfolio"
  ON portfolio_projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete projects
CREATE POLICY "authenticated_delete_portfolio"
  ON portfolio_projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Service role has full access
CREATE POLICY "service_role_portfolio"
  ON portfolio_projects
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Verification query
SELECT 'portfolio_projects' as table_name, COUNT(*) as count FROM portfolio_projects;

-- =================================================
-- ✅ MIGRATION COMPLETE!
-- =================================================
-- The portfolio_projects table is now ready to use.
-- You can view it in Table Editor → portfolio_projects
-- =================================================
