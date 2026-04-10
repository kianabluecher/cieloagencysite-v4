-- ================================================
-- CREATE BLOG POSTS TABLE
-- ================================================
-- Run this in Supabase SQL Editor to create the blog_posts table
-- ================================================

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  -- Primary identification
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  
  -- Content fields
  title text NOT NULL,
  excerpt text,
  content text,
  
  -- Media fields
  featured_image text,
  featured_image_alt text,
  thumbnail text,
  
  -- Author fields
  author_name text NOT NULL,
  author_avatar text,
  author_bio text,
  author_role text,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Categorization
  category text,
  tags text[] DEFAULT ARRAY[]::text[],
  
  -- SEO fields
  meta_title text,
  meta_description text,
  meta_keywords text[] DEFAULT ARRAY[]::text[],
  
  -- Publishing
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  published_at timestamptz,
  scheduled_for timestamptz,
  
  -- Analytics
  read_time_minutes integer,
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  
  -- Settings
  related_post_ids UUID[] DEFAULT ARRAY[]::UUID[],
  allow_comments boolean DEFAULT true,
  show_in_feed boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_edited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ================================================

-- Index for slug lookups (most common query)
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

-- Index for published posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);

-- Index for featured posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(featured);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);

-- Index for published_at (for sorting)
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Index for author_name
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_name ON public.blog_posts(author_name);

-- GIN index for tags array (for tag searches)
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Index for created_at
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts(created_at DESC);

-- ================================================
-- CREATE TRIGGER FOR AUTO-UPDATE TIMESTAMP
-- ================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before each update
DROP TRIGGER IF EXISTS blog_posts_updated_at_trigger ON public.blog_posts;
CREATE TRIGGER blog_posts_updated_at_trigger
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_blog_posts_updated_at();

-- ================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ================================================

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- ================================================
-- CREATE RLS POLICIES
-- ================================================

-- Policy: Public can read published posts
DROP POLICY IF EXISTS "Public can read published blog posts" ON public.blog_posts;
CREATE POLICY "Public can read published blog posts"
  ON public.blog_posts
  FOR SELECT
  USING (published = true);

-- Policy: Authenticated users can read all posts
DROP POLICY IF EXISTS "Authenticated users can read all blog posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can read all blog posts"
  ON public.blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert posts
DROP POLICY IF EXISTS "Authenticated users can insert blog posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can insert blog posts"
  ON public.blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update posts
DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can update blog posts"
  ON public.blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete posts
DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON public.blog_posts;
CREATE POLICY "Authenticated users can delete blog posts"
  ON public.blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- ================================================
-- GRANT PERMISSIONS
-- ================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant access to the table
GRANT SELECT ON public.blog_posts TO anon;
GRANT ALL ON public.blog_posts TO authenticated;

-- ================================================
-- SUCCESS MESSAGE
-- ================================================

DO $$ 
BEGIN 
  RAISE NOTICE '✅ Blog posts table created successfully!';
  RAISE NOTICE 'Table: blog_posts';
  RAISE NOTICE 'Fields: 32 total';
  RAISE NOTICE 'Indexes: 8 created';
  RAISE NOTICE 'RLS: Enabled with 5 policies';
  RAISE NOTICE '';
  RAISE NOTICE '📊 You can now:';
  RAISE NOTICE '1. Insert blog posts';
  RAISE NOTICE '2. Query blog posts';
  RAISE NOTICE '3. Run analytics queries';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next step: Insert sample data with /insert_blog_sample_data.sql';
END $$;
