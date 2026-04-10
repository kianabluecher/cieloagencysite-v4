-- =================================================
-- CIELO Agency Blog Posts Table
-- =================================================
-- Run this in Supabase SQL Editor to create the blog_posts table
-- =================================================

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- URL and Identification
  slug text UNIQUE NOT NULL, -- URL-friendly version of title (e.g., "from-pixels-to-products")
  
  -- Content
  title text NOT NULL,
  excerpt text, -- Short summary/description
  content text, -- Full blog post content (Markdown or HTML)
  
  -- Media
  featured_image text, -- Main blog post image
  featured_image_alt text, -- Alt text for accessibility
  thumbnail text, -- Smaller version for cards/previews
  
  -- Author Information
  author_name text NOT NULL,
  author_avatar text, -- Author profile picture URL
  author_bio text, -- Short author bio
  author_role text, -- e.g., "Senior Designer", "Content Writer"
  author_id uuid REFERENCES auth.users(id), -- Link to user if they have account
  
  -- Categorization
  category text, -- e.g., "Articles", "Workflows", "News", "Tutorials"
  tags text[], -- Array of tags for filtering
  
  -- SEO
  meta_title text, -- Custom SEO title
  meta_description text, -- Custom SEO description
  meta_keywords text[], -- SEO keywords
  
  -- Publishing
  published boolean DEFAULT false,
  featured boolean DEFAULT false, -- Show in featured section
  published_at timestamptz, -- When it was published
  scheduled_for timestamptz, -- Schedule for future publishing
  
  -- Reading Stats
  read_time_minutes integer, -- Estimated read time (e.g., 5, 10)
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  
  -- Related Content
  related_post_ids uuid[], -- Array of related blog post IDs
  
  -- Settings
  allow_comments boolean DEFAULT true,
  show_in_feed boolean DEFAULT true,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_edited_by uuid REFERENCES auth.users(id)
);

-- Create auto-update timestamp function
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

-- RLS Policies

-- Allow public to view published posts
CREATE POLICY "public_view_published_blog_posts"
  ON blog_posts
  FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Allow authenticated users to view all posts (including drafts)
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

-- Create a view for public blog posts (optional - for easier querying)
CREATE OR REPLACE VIEW public_blog_posts AS
SELECT 
  id,
  slug,
  title,
  excerpt,
  content,
  featured_image,
  featured_image_alt,
  thumbnail,
  author_name,
  author_avatar,
  author_bio,
  author_role,
  category,
  tags,
  meta_title,
  meta_description,
  featured,
  published_at,
  read_time_minutes,
  view_count,
  like_count,
  share_count,
  related_post_ids,
  created_at
FROM blog_posts
WHERE published = true
ORDER BY published_at DESC;

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

-- Verification query
SELECT 'blog_posts' as table_name, COUNT(*) as count FROM blog_posts;

-- =================================================
-- ✅ BLOG POSTS TABLE CREATED!
-- =================================================
-- You can now:
-- 1. View the table in Table Editor → blog_posts
-- 2. Insert blog posts via API or directly
-- 3. Query published posts for your blog page
-- 4. Manage drafts and scheduled posts
-- =================================================
