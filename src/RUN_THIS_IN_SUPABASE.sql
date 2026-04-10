-- =================================================
-- COPY THIS ENTIRE FILE AND RUN IN SUPABASE SQL EDITOR
-- =================================================
-- 
-- INSTRUCTIONS:
-- 1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
-- 2. Click "New query"
-- 3. Copy this ENTIRE file
-- 4. Paste into the SQL Editor
-- 5. Click "Run" (or press Cmd/Ctrl + Enter)
-- 6. Wait for success message
-- 7. Go to Table Editor and refresh - you'll see 6 new tables!
--
-- =================================================

-- =================================================
-- BLOG POSTS TABLE
-- =================================================

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- URL and Identification
  slug text UNIQUE NOT NULL,
  
  -- Content
  title text NOT NULL,
  excerpt text,
  content text,
  
  -- Media
  featured_image text,
  featured_image_alt text,
  thumbnail text,
  
  -- Author Information
  author_name text NOT NULL,
  author_avatar text,
  author_bio text,
  author_role text,
  author_id uuid REFERENCES auth.users(id),
  
  -- Categorization
  category text,
  tags text[],
  
  -- SEO
  meta_title text,
  meta_description text,
  meta_keywords text[],
  
  -- Publishing
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  published_at timestamptz,
  scheduled_for timestamptz,
  
  -- Reading Stats
  read_time_minutes integer,
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  
  -- Related Content
  related_post_ids uuid[],
  
  -- Settings
  allow_comments boolean DEFAULT true,
  show_in_feed boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_edited_by uuid REFERENCES auth.users(id)
);

-- Create auto-update timestamp function for blog posts
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_name ON blog_posts(author_name);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts

-- Allow public to view published posts
CREATE POLICY "public_view_published_blog_posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Allow authenticated users to view all posts
CREATE POLICY "authenticated_view_all_blog_posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create posts
CREATE POLICY "authenticated_create_blog_posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update posts
CREATE POLICY "authenticated_update_blog_posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete posts
CREATE POLICY "authenticated_delete_blog_posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Service role has full access
CREATE POLICY "service_role_blog_posts"
  ON blog_posts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Helper function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title text)
RETURNS text AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =================================================
-- PORTFOLIO PROJECTS TABLE
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

-- Create auto-update timestamp function for portfolio
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

-- RLS Policies for portfolio_projects

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

-- =================================================
-- ONE-TIME SUBMISSION FORMS TABLES
-- =================================================

-- Create diy_to_credible_brand_submissions table
CREATE TABLE IF NOT EXISTS diy_to_credible_brand_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Business Information
  email text NOT NULL,
  company_name text NOT NULL,
  website text,
  industry text,
  
  -- Brand Analysis Data
  current_brand_assessment text,
  brand_challenges text[],
  target_audience text,
  competitors text[],
  unique_value_proposition text,
  brand_personality text,
  visual_preferences text,
  
  -- Goals and Needs
  primary_goals text[],
  timeline text,
  budget_range text,
  
  -- Analysis Results
  analysis_result jsonb,
  recommendations jsonb,
  
  -- Status and Assignment
  status text DEFAULT 'submitted',
  priority text DEFAULT 'normal',
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  
  -- Timestamps
  submitted_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: One submission per email
  CONSTRAINT unique_email_diy_brand UNIQUE(email)
);

-- Create gtm_strategy_submissions table
CREATE TABLE IF NOT EXISTS gtm_strategy_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Business Information
  email text NOT NULL,
  company_name text NOT NULL,
  website text,
  industry text,
  business_stage text,
  
  -- Product/Service Information
  product_description text,
  target_market text,
  customer_segments jsonb,
  pricing_model text,
  
  -- Current GTM Status
  current_channels text[],
  monthly_revenue text,
  customer_acquisition_cost text,
  current_conversion_rate text,
  
  -- GTM Needs
  gtm_challenges text[],
  funnel_stage_focus text[],
  competitor_analysis text,
  marketing_budget text,
  
  -- Goals
  primary_objectives text[],
  target_metrics jsonb,
  timeline text,
  
  -- Analysis Results
  strategy_analysis jsonb,
  funnel_recommendations jsonb,
  channel_recommendations jsonb,
  
  -- Status and Assignment
  status text DEFAULT 'submitted',
  priority text DEFAULT 'normal',
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  
  -- Timestamps
  submitted_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: One submission per email
  CONSTRAINT unique_email_gtm UNIQUE(email)
);

-- Create social_media_submissions table
CREATE TABLE IF NOT EXISTS social_media_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Business Information
  email text NOT NULL,
  company_name text NOT NULL,
  website text,
  industry text,
  
  -- Social Media Presence
  active_platforms text[],
  platform_handles jsonb,
  current_posting_frequency text,
  content_types text[],
  
  -- Current Performance
  follower_counts jsonb,
  engagement_rate text,
  best_performing_content text,
  
  -- Goals and Needs
  social_media_goals text[],
  target_audience_social text,
  content_challenges text[],
  brand_voice text,
  
  -- Content Preferences
  content_pillars text[],
  competitor_examples text,
  avoided_topics text[],
  
  -- Budget and Timeline
  budget_range text,
  timeline text,
  internal_resources text,
  
  -- Analysis Results
  content_strategy jsonb,
  copy_calendar jsonb,
  content_ideas jsonb,
  
  -- Status and Assignment
  status text DEFAULT 'submitted',
  priority text DEFAULT 'normal',
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  
  -- Timestamps
  submitted_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: One submission per email
  CONSTRAINT unique_email_social UNIQUE(email)
);

-- Create sales_offer_submissions table
CREATE TABLE IF NOT EXISTS sales_offer_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Business Information
  email text NOT NULL,
  company_name text NOT NULL,
  website text,
  industry text,
  business_model text,
  
  -- Current Offer/Product
  product_service_description text,
  current_price_point text,
  pricing_structure text,
  target_customer text,
  
  -- Sales Performance
  current_sales_volume text,
  conversion_rate text,
  average_deal_size text,
  sales_cycle_length text,
  
  -- Offer Challenges
  sales_challenges text[],
  current_sales_materials text[],
  competitor_offers text,
  
  -- Goals
  offer_goals text[],
  target_customer_segments jsonb,
  desired_pricing_model text,
  
  -- Sales Process
  current_sales_process text,
  lead_sources text[],
  sales_team_size text,
  
  -- GTM Needs
  gtm_package_needs text[],
  budget_range text,
  timeline text,
  
  -- Analysis Results
  offer_analysis jsonb,
  pricing_recommendations jsonb,
  sales_package jsonb,
  positioning_strategy jsonb,
  
  -- Status and Assignment
  status text DEFAULT 'submitted',
  priority text DEFAULT 'normal',
  assigned_to uuid REFERENCES auth.users(id),
  notes text,
  
  -- Timestamps
  submitted_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: One submission per email
  CONSTRAINT unique_email_sales UNIQUE(email)
);

-- Create auto-update timestamp functions
CREATE OR REPLACE FUNCTION update_diy_brand_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_gtm_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_social_media_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION update_sales_offer_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for auto-updating updated_at
DROP TRIGGER IF EXISTS update_diy_brand_submissions_updated_at ON diy_to_credible_brand_submissions;
CREATE TRIGGER update_diy_brand_submissions_updated_at
  BEFORE UPDATE ON diy_to_credible_brand_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_diy_brand_updated_at();

DROP TRIGGER IF EXISTS update_gtm_strategy_submissions_updated_at ON gtm_strategy_submissions;
CREATE TRIGGER update_gtm_strategy_submissions_updated_at
  BEFORE UPDATE ON gtm_strategy_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_gtm_updated_at();

DROP TRIGGER IF EXISTS update_social_media_submissions_updated_at ON social_media_submissions;
CREATE TRIGGER update_social_media_submissions_updated_at
  BEFORE UPDATE ON social_media_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_social_media_updated_at();

DROP TRIGGER IF EXISTS update_sales_offer_submissions_updated_at ON sales_offer_submissions;
CREATE TRIGGER update_sales_offer_submissions_updated_at
  BEFORE UPDATE ON sales_offer_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_sales_offer_updated_at();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_diy_brand_email ON diy_to_credible_brand_submissions(email);
CREATE INDEX IF NOT EXISTS idx_diy_brand_status ON diy_to_credible_brand_submissions(status);
CREATE INDEX IF NOT EXISTS idx_diy_brand_priority ON diy_to_credible_brand_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_diy_brand_submitted_at ON diy_to_credible_brand_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_diy_brand_assigned_to ON diy_to_credible_brand_submissions(assigned_to);

CREATE INDEX IF NOT EXISTS idx_gtm_email ON gtm_strategy_submissions(email);
CREATE INDEX IF NOT EXISTS idx_gtm_status ON gtm_strategy_submissions(status);
CREATE INDEX IF NOT EXISTS idx_gtm_priority ON gtm_strategy_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_gtm_submitted_at ON gtm_strategy_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_gtm_assigned_to ON gtm_strategy_submissions(assigned_to);

CREATE INDEX IF NOT EXISTS idx_social_email ON social_media_submissions(email);
CREATE INDEX IF NOT EXISTS idx_social_status ON social_media_submissions(status);
CREATE INDEX IF NOT EXISTS idx_social_priority ON social_media_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_social_submitted_at ON social_media_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_assigned_to ON social_media_submissions(assigned_to);

CREATE INDEX IF NOT EXISTS idx_sales_email ON sales_offer_submissions(email);
CREATE INDEX IF NOT EXISTS idx_sales_status ON sales_offer_submissions(status);
CREATE INDEX IF NOT EXISTS idx_sales_priority ON sales_offer_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_sales_submitted_at ON sales_offer_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_sales_assigned_to ON sales_offer_submissions(assigned_to);

-- Enable Row Level Security
ALTER TABLE diy_to_credible_brand_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_strategy_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_offer_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for DIY Brand
CREATE POLICY "authenticated_view_diy_brand"
  ON diy_to_credible_brand_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_update_diy_brand"
  ON diy_to_credible_brand_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_diy_brand"
  ON diy_to_credible_brand_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for GTM Strategy
CREATE POLICY "authenticated_view_gtm"
  ON gtm_strategy_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_update_gtm"
  ON gtm_strategy_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_gtm"
  ON gtm_strategy_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for Social Media
CREATE POLICY "authenticated_view_social"
  ON social_media_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_update_social"
  ON social_media_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_social"
  ON social_media_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create RLS policies for Sales Offer
CREATE POLICY "authenticated_view_sales"
  ON sales_offer_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_update_sales"
  ON sales_offer_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_sales"
  ON sales_offer_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Verification: Check tables were created
SELECT 'diy_to_credible_brand_submissions' as table_name, COUNT(*) as count FROM diy_to_credible_brand_submissions
UNION ALL
SELECT 'gtm_strategy_submissions' as table_name, COUNT(*) as count FROM gtm_strategy_submissions
UNION ALL
SELECT 'social_media_submissions' as table_name, COUNT(*) as count FROM social_media_submissions
UNION ALL
SELECT 'sales_offer_submissions' as table_name, COUNT(*) as count FROM sales_offer_submissions
UNION ALL
SELECT 'portfolio_projects' as table_name, COUNT(*) as count FROM portfolio_projects
UNION ALL
SELECT 'blog_posts' as table_name, COUNT(*) as count FROM blog_posts;

-- =================================================
-- ✅ MIGRATION COMPLETE!
-- =================================================
-- You should now see 6 new tables in your Table Editor:
-- 1. portfolio_projects
-- 2. diy_to_credible_brand_submissions
-- 3. gtm_strategy_submissions
-- 4. social_media_submissions
-- 5. sales_offer_submissions
-- 6. blog_posts
--
-- Go to Table Editor and refresh the page to see them!
-- =================================================