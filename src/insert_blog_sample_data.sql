-- =================================================
-- INSERT SAMPLE BLOG DATA
-- =================================================
-- Run this AFTER you've run /RUN_THIS_IN_SUPABASE.sql
-- This will populate your blog with the 6 posts currently in your code
-- =================================================

-- First, verify the blog_posts table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_posts') THEN
        RAISE EXCEPTION 'blog_posts table does not exist! Run /RUN_THIS_IN_SUPABASE.sql first.';
    END IF;
END
$$;

-- Insert the 6 blog posts from your current Blog.tsx
INSERT INTO blog_posts (
  slug,
  title,
  excerpt,
  category,
  author_name,
  author_avatar,
  author_role,
  featured_image,
  published,
  featured,
  published_at,
  read_time_minutes,
  tags,
  allow_comments,
  show_in_feed
) VALUES
-- Post 1: Featured post
(
  'from-pixels-to-products',
  'From Pixels to Products: How Designers Can Learn to Ship Faster',
  'Learn how designers can transition from creating beautiful mockups to shipping functional products faster.',
  'Articles',
  'Olivia Johnson',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'Senior Product Designer',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=600&fit=crop',
  true,
  true,
  '2025-03-13T00:00:00Z',
  8,
  ARRAY['design', 'productivity', 'workflow'],
  true,
  true
),

-- Post 2
(
  'designing-clean-product-ui',
  'Designing a Clean Product UI with Figma and shadcn/ui',
  'A comprehensive guide to creating clean, modern product UIs using Figma and shadcn/ui component library.',
  'Articles',
  'Sophia Martinez',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
  'UI/UX Designer',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop',
  true,
  false,
  '2025-03-13T00:00:00Z',
  10,
  ARRAY['design', 'figma', 'ui', 'tutorial'],
  true,
  true
),

-- Post 3
(
  'semantic-color-naming-system',
  'A Semantic Color Naming System to Align the Team',
  'How to create a semantic color naming system that helps your entire team stay aligned on design decisions.',
  'Articles',
  'James Franklin',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
  'Design Systems Lead',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop',
  true,
  false,
  '2025-03-13T00:00:00Z',
  6,
  ARRAY['design-systems', 'colors', 'teamwork'],
  true,
  true
),

-- Post 4
(
  'touching-grass-solo-designer',
  'Why Touching Grass as a Solo Designer Is Important for Your Mental Health',
  'The importance of taking breaks and connecting with nature as a solo designer to maintain mental wellbeing.',
  'Workflows',
  'Olivia Johnson',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'Senior Product Designer',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
  true,
  false,
  '2025-03-13T00:00:00Z',
  5,
  ARRAY['mental-health', 'wellness', 'remote-work'],
  true,
  true
),

-- Post 5
(
  'mobile-experience-design',
  'Think About the Mobile Experience: Designing for a Mobile-First World',
  'Best practices for designing mobile-first experiences that delight users on any device.',
  'News',
  'Ethan Brooks',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
  'Mobile Design Specialist',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop',
  true,
  false,
  '2025-03-13T00:00:00Z',
  7,
  ARRAY['mobile', 'responsive', 'ux'],
  true,
  true
),

-- Post 6
(
  'building-design-systems-scale',
  'Building Design Systems That Scale: Lessons from the Trenches',
  'Real-world lessons learned from building and maintaining design systems at scale.',
  'Articles',
  'Sarah Chen',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop',
  'Design Systems Architect',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=600&fit=crop',
  true,
  false,
  '2025-03-12T00:00:00Z',
  12,
  ARRAY['design-systems', 'scalability', 'architecture'],
  true,
  true
);

-- Verify the data was inserted
SELECT 
  'Blog posts inserted successfully!' as message,
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE published = true) as published_posts,
  COUNT(*) FILTER (WHERE featured = true) as featured_posts
FROM blog_posts;

-- =================================================
-- ✅ SAMPLE DATA INSERTED!
-- =================================================
-- You now have 6 blog posts in your database.
-- View them in Table Editor → blog_posts
-- Or fetch via API: GET /blog/posts
-- =================================================
