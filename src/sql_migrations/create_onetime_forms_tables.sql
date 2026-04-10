-- =================================================
-- CIELO Agency One-Time Forms - Complete Migration
-- =================================================
-- Run this in Supabase SQL Editor
-- Created: November 17, 2025
-- 
-- This migration creates 4 separate tables for one-time submission forms:
-- 1. diy_to_credible_brand_submissions (DIY Brand → Credible Brand)
-- 2. gtm_strategy_submissions (GTM Strategy & Funnel)
-- 3. social_media_submissions (Social Media Copy & Calendar)
-- 4. sales_offer_submissions (How to Sell & Offer)
-- 
-- Note: Only ONE submission per business/user is allowed for each form
-- All with proper RLS policies and indexes
-- =================================================

-- =================================================
-- Step 1: Create diy_to_credible_brand_submissions table
-- =================================================

CREATE TABLE IF NOT EXISTS diy_to_credible_brand_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Business Information
  email text NOT NULL,
  company_name text NOT NULL,
  website text,
  industry text,
  
  -- Brand Analysis Data
  current_brand_assessment text, -- 'DIY', 'Semi-professional', 'Professional'
  brand_challenges text[], -- Array of challenges they're facing
  target_audience text,
  competitors text[],
  unique_value_proposition text,
  brand_personality text, -- JSON or text describing desired brand personality
  visual_preferences text, -- What they like/dislike visually
  
  -- Goals and Needs
  primary_goals text[],
  timeline text, -- 'Urgent (1-2 weeks)', '1 month', '2-3 months', 'Flexible'
  budget_range text,
  
  -- Analysis Results (generated after submission)
  analysis_result jsonb, -- AI-generated brand analysis and recommendations
  recommendations jsonb, -- Specific recommendations for improvement
  
  -- Status and Assignment
  status text DEFAULT 'submitted', -- 'submitted', 'analyzing', 'completed', 'contacted', 'converted', 'archived'
  priority text DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  assigned_to uuid REFERENCES auth.users(id),
  notes text, -- Internal team notes
  
  -- Timestamps
  submitted_at timestamptz DEFAULT now(),
  completed_at timestamptz, -- When analysis was completed
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraint: One submission per email/business
  CONSTRAINT unique_email_diy_brand UNIQUE(email)
);

-- =================================================
-- Step 2: Create gtm_strategy_submissions table
-- =================================================

CREATE TABLE IF NOT EXISTS gtm_strategy_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Business Information
  email text NOT NULL,
  company_name text NOT NULL,
  website text,
  industry text,
  business_stage text, -- 'Pre-launch', 'Just launched', 'Growing', 'Scaling'
  
  -- Product/Service Information
  product_description text,
  target_market text,
  customer_segments jsonb, -- Detailed customer personas
  pricing_model text, -- 'Subscription', 'One-time', 'Freemium', 'Enterprise'
  
  -- Current GTM Status
  current_channels text[], -- Existing marketing channels
  monthly_revenue text, -- Revenue range
  customer_acquisition_cost text,
  current_conversion_rate text,
  
  -- GTM Needs
  gtm_challenges text[], -- Challenges in go-to-market
  funnel_stage_focus text[], -- Which funnel stages need work: 'awareness', 'consideration', 'conversion', 'retention'
  competitor_analysis text,
  marketing_budget text,
  
  -- Goals
  primary_objectives text[], -- 'Increase awareness', 'Drive conversions', 'Improve retention', etc.
  target_metrics jsonb, -- Specific metrics they want to achieve
  timeline text,
  
  -- Analysis Results
  strategy_analysis jsonb, -- AI-generated GTM strategy analysis
  funnel_recommendations jsonb, -- Specific funnel optimization recommendations
  channel_recommendations jsonb, -- Recommended marketing channels
  
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
  
  -- Constraint: One submission per email/business
  CONSTRAINT unique_email_gtm UNIQUE(email)
);

-- =================================================
-- Step 3: Create social_media_submissions table
-- =================================================

CREATE TABLE IF NOT EXISTS social_media_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Business Information
  email text NOT NULL,
  company_name text NOT NULL,
  website text,
  industry text,
  
  -- Social Media Presence
  active_platforms text[], -- 'Instagram', 'LinkedIn', 'Twitter', 'TikTok', 'Facebook', etc.
  platform_handles jsonb, -- { "instagram": "@handle", "linkedin": "company-name" }
  current_posting_frequency text, -- 'Daily', '3-4x/week', 'Weekly', 'Inconsistent', 'None'
  content_types text[], -- 'Images', 'Videos', 'Stories', 'Carousels', 'Text posts'
  
  -- Current Performance
  follower_counts jsonb, -- { "instagram": 1000, "linkedin": 500 }
  engagement_rate text, -- 'Low (<1%)', 'Average (1-3%)', 'Good (3-5%)', 'High (>5%)'
  best_performing_content text, -- What content performs best for them
  
  -- Goals and Needs
  social_media_goals text[], -- 'Brand awareness', 'Engagement', 'Lead generation', 'Community building'
  target_audience_social text,
  content_challenges text[], -- 'Consistency', 'Ideas', 'Design', 'Copywriting', 'Strategy'
  brand_voice text, -- Desired tone and voice
  
  -- Content Preferences
  content_pillars text[], -- Main content themes they want to focus on
  competitor_examples text, -- Competitors or brands they admire
  avoided_topics text[], -- Topics to avoid
  
  -- Budget and Timeline
  budget_range text,
  timeline text, -- When they need to start
  internal_resources text, -- 'No team', 'Small team', 'Dedicated team'
  
  -- Analysis Results
  content_strategy jsonb, -- AI-generated content strategy
  copy_calendar jsonb, -- 30-day social media calendar with copy suggestions
  content_ideas jsonb, -- Specific content ideas and formats
  
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
  
  -- Constraint: One submission per email/business
  CONSTRAINT unique_email_social UNIQUE(email)
);

-- =================================================
-- Step 4: Create sales_offer_submissions table
-- =================================================

CREATE TABLE IF NOT EXISTS sales_offer_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE DEFAULT gen_random_uuid()::text,
  
  -- Business Information
  email text NOT NULL,
  company_name text NOT NULL,
  website text,
  industry text,
  business_model text, -- 'B2B', 'B2C', 'B2B2C', 'Marketplace'
  
  -- Current Offer/Product
  product_service_description text,
  current_price_point text,
  pricing_structure text, -- 'Flat fee', 'Tiered', 'Custom', 'Usage-based'
  target_customer text,
  
  -- Sales Performance
  current_sales_volume text, -- 'Just starting', '1-10/month', '10-50/month', '50+/month'
  conversion_rate text,
  average_deal_size text,
  sales_cycle_length text, -- 'Same day', '1 week', '1 month', '3+ months'
  
  -- Offer Challenges
  sales_challenges text[], -- 'Positioning', 'Pricing', 'Value communication', 'Objection handling'
  current_sales_materials text[], -- 'Pitch deck', 'One-pager', 'Website', 'Proposal template'
  competitor_offers text, -- How competitors position their offers
  
  -- Goals
  offer_goals text[], -- 'Increase price point', 'Package better', 'Clarify value', 'Design sales materials'
  target_customer_segments jsonb,
  desired_pricing_model text,
  
  -- Sales Process
  current_sales_process text, -- Description of current sales flow
  lead_sources text[], -- Where leads come from
  sales_team_size text, -- 'Solo', '2-5', '6-10', '10+'
  
  -- GTM Needs
  gtm_package_needs text[], -- 'Sales deck', 'One-pager', 'Email sequences', 'Pricing calculator', 'ROI calculator'
  budget_range text,
  timeline text,
  
  -- Analysis Results
  offer_analysis jsonb, -- AI-generated offer analysis
  pricing_recommendations jsonb, -- Pricing strategy recommendations
  sales_package jsonb, -- Design recommendations for GTM package
  positioning_strategy jsonb, -- How to position and communicate value
  
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
  
  -- Constraint: One submission per email/business
  CONSTRAINT unique_email_sales UNIQUE(email)
);

-- =================================================
-- Step 5: Create auto-update timestamp functions
-- =================================================

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

-- =================================================
-- Step 6: Create triggers for auto-updating updated_at
-- =================================================

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

-- =================================================
-- Step 7: Create indexes for performance
-- =================================================

-- DIY to Credible Brand indexes
CREATE INDEX IF NOT EXISTS idx_diy_brand_email ON diy_to_credible_brand_submissions(email);
CREATE INDEX IF NOT EXISTS idx_diy_brand_status ON diy_to_credible_brand_submissions(status);
CREATE INDEX IF NOT EXISTS idx_diy_brand_priority ON diy_to_credible_brand_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_diy_brand_submitted_at ON diy_to_credible_brand_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_diy_brand_assigned_to ON diy_to_credible_brand_submissions(assigned_to);

-- GTM Strategy indexes
CREATE INDEX IF NOT EXISTS idx_gtm_email ON gtm_strategy_submissions(email);
CREATE INDEX IF NOT EXISTS idx_gtm_status ON gtm_strategy_submissions(status);
CREATE INDEX IF NOT EXISTS idx_gtm_priority ON gtm_strategy_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_gtm_submitted_at ON gtm_strategy_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_gtm_assigned_to ON gtm_strategy_submissions(assigned_to);

-- Social Media indexes
CREATE INDEX IF NOT EXISTS idx_social_email ON social_media_submissions(email);
CREATE INDEX IF NOT EXISTS idx_social_status ON social_media_submissions(status);
CREATE INDEX IF NOT EXISTS idx_social_priority ON social_media_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_social_submitted_at ON social_media_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_assigned_to ON social_media_submissions(assigned_to);

-- Sales Offer indexes
CREATE INDEX IF NOT EXISTS idx_sales_email ON sales_offer_submissions(email);
CREATE INDEX IF NOT EXISTS idx_sales_status ON sales_offer_submissions(status);
CREATE INDEX IF NOT EXISTS idx_sales_priority ON sales_offer_submissions(priority);
CREATE INDEX IF NOT EXISTS idx_sales_submitted_at ON sales_offer_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_sales_assigned_to ON sales_offer_submissions(assigned_to);

-- =================================================
-- Step 8: Enable Row Level Security
-- =================================================

ALTER TABLE diy_to_credible_brand_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_strategy_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_offer_submissions ENABLE ROW LEVEL SECURITY;

-- =================================================
-- Step 9: Create RLS policies
-- =================================================

-- DIY to Credible Brand Policies
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

-- GTM Strategy Policies
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

-- Social Media Policies
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

-- Sales Offer Policies
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

-- =================================================
-- Step 10: Update team_activity_log to include new entity types
-- =================================================

-- No schema changes needed, but update documentation
COMMENT ON COLUMN team_activity_log.entity_type IS 
  'Entity type: job, portfolio, discovery, brand_audit, contact, diy_brand, gtm_strategy, social_media, sales_offer';

-- =================================================
-- Verification Queries
-- =================================================

-- Check tables were created
SELECT 'diy_to_credible_brand_submissions' as table_name, COUNT(*) as count FROM diy_to_credible_brand_submissions
UNION ALL
SELECT 'gtm_strategy_submissions' as table_name, COUNT(*) as count FROM gtm_strategy_submissions
UNION ALL
SELECT 'social_media_submissions' as table_name, COUNT(*) as count FROM social_media_submissions
UNION ALL
SELECT 'sales_offer_submissions' as table_name, COUNT(*) as count FROM sales_offer_submissions;

-- Count by status
SELECT 'diy_brand' as type, status, COUNT(*) FROM diy_to_credible_brand_submissions GROUP BY status
UNION ALL
SELECT 'gtm_strategy' as type, status, COUNT(*) FROM gtm_strategy_submissions GROUP BY status
UNION ALL
SELECT 'social_media' as type, status, COUNT(*) FROM social_media_submissions GROUP BY status
UNION ALL
SELECT 'sales_offer' as type, status, COUNT(*) FROM sales_offer_submissions GROUP BY status
ORDER BY type, status;

-- =================================================
-- Complete! ✅
-- =================================================
-- Database setup complete with:
-- ✓ diy_to_credible_brand_submissions table
-- ✓ gtm_strategy_submissions table
-- ✓ social_media_submissions table
-- ✓ sales_offer_submissions table
-- ✓ All indexes for performance
-- ✓ RLS policies for security
-- ✓ Triggers for auto-updates
-- ✓ One submission per business constraint (by email)
--
-- Next steps:
-- 1. Run this migration in Supabase SQL Editor
-- 2. Create server endpoints for each form type
-- 3. Create frontend forms for submissions
-- 4. Add to unified team dashboard
-- 5. Configure automation/notifications
-- =================================================
