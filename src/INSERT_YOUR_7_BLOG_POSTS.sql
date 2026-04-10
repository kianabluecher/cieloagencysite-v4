-- ================================================
-- INSERT YOUR 7 EXISTING BLOG POSTS
-- ================================================
-- These are the exact blog posts from your UI
-- Run this in Supabase SQL Editor
-- ================================================

INSERT INTO public.blog_posts (
  slug,
  title,
  excerpt,
  content,
  featured_image,
  featured_image_alt,
  author_name,
  author_role,
  category,
  tags,
  published,
  featured,
  published_at,
  read_time_minutes,
  view_count,
  like_count
) VALUES 

-- Blog Post 1: From Pixels to Products
(
  'from-pixels-to-products',
  'From Pixels to Products: How Designers Can Learn to Ship Faster',
  'Learn how designers can transition from creating beautiful mockups to shipping functional products faster.',
  E'# From Pixels to Products: How Designers Can Learn to Ship Faster\n\nAs designers, we often get caught up in perfecting every pixel. But shipping fast is a skill worth learning.\n\n## Why Speed Matters\n\nIn today\'s fast-paced digital world, speed to market can make or break a product.',
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=630&fit=crop',
  'Designer working on laptop',
  'Olivia Johnson',
  'Senior Product Designer',
  'Articles',
  ARRAY['design', 'productivity', 'workflow'],
  true,
  true,
  '2024-05-15T00:00:00Z'::timestamptz,
  8,
  1250,
  45
),

-- Blog Post 2: Designing a Clean Product UI
(
  'designing-clean-product-ui-figma-shadcn',
  'Designing a Clean Product UI with Figma and shadcn/ui',
  'A comprehensive guide to building beautiful, accessible product interfaces using Figma and shadcn/ui components.',
  E'# Designing a Clean Product UI with Figma and shadcn/ui\n\nClean UI design is about clarity, consistency, and user-centered thinking.\n\n## Why shadcn/ui?\n\nIt provides beautiful, accessible components out of the box.\n\n## Figma to Code\n\nLearn how to translate your Figma designs into production-ready shadcn/ui components.',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=630&fit=crop',
  'Clean UI design interface',
  'Helena Martinez',
  'UI/UX Designer',
  'Articles',
  ARRAY['figma', 'shadcn', 'UI design', 'components'],
  true,
  true,
  '2024-11-11T00:00:00Z'::timestamptz,
  10,
  890,
  32
),

-- Blog Post 3: Semantic Color Naming System
(
  'semantic-color-naming-system',
  'A Semantic Color Naming System to Align the Team',
  'Stop arguing about color names. Learn how to create a semantic color system that scales with your product.',
  E'# A Semantic Color Naming System to Align the Team\n\nColor naming shouldn\'t be hard. Here\'s a system that works.\n\n## The Problem with "Blue-500"\n\nIt tells you what it is, not what it does.\n\n## Semantic Naming\n\nUse names like `primary`, `success`, `danger` instead of `blue`, `green`, `red`.\n\n## Implementation\n\nHow to set up semantic colors in Figma and translate them to CSS variables.',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&h=630&fit=crop',
  'Color palette and design system',
  'James Franklin',
  'Design Systems Engineer',
  'Articles',
  ARRAY['design systems', 'colors', 'naming', 'tokens'],
  true,
  true,
  '2024-11-27T00:00:00Z'::timestamptz,
  7,
  1100,
  56
),

-- Blog Post 4: Why Touching Grass as a Solo Designer
(
  'touching-grass-solo-designer-mental-health',
  'Why Touching Grass as a Solo Designer is Important for Your Mental Health',
  'Working alone can be isolating. Learn why taking breaks and connecting with nature is crucial for solo designers.',
  E'# Why Touching Grass as a Solo Designer is Important for Your Mental Health\n\nAs a solo designer, burnout is real.\n\n## The Isolation Problem\n\nWorking alone means no one to bounce ideas off. No water cooler chats. No team energy.\n\n## Why Nature Helps\n\nStudies show that spending time outdoors reduces stress, improves focus, and boosts creativity.\n\n## Practical Tips\n\n1. Take a 15-minute walk every day\n2. Work from a park or coffee shop\n3. Join local designer meetups\n4. Schedule virtual co-working sessions\n\n## The Bottom Line\n\nYour mental health is more important than your mockups. Take care of yourself.',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop',
  'Person relaxing in nature',
  'Olivia Johnson',
  'Senior Product Designer',
  'Best Lessons',
  ARRAY['mental health', 'solo designer', 'work-life balance', 'wellness'],
  true,
  false,
  '2024-11-12T00:00:00Z'::timestamptz,
  6,
  2340,
  89
),

-- Blog Post 5: Mobile-First Design
(
  'mobile-first-world-design-guide',
  'Think About the Mobile Experience: Designing for a Mobile-First World',
  'Mobile traffic dominates the web. Learn how to design exceptional mobile experiences from day one.',
  E'# Think About the Mobile Experience: Designing for a Mobile-First World\n\nMore than 60% of web traffic comes from mobile devices.\n\n## Mobile-First Mindset\n\nStart with the smallest screen. Then scale up.\n\n## Key Principles\n\n### 1. Touch Targets\n\nButtons should be at least 44x44px for easy tapping.\n\n### 2. Readable Typography\n\nBody text should be at least 16px. No squinting!\n\n### 3. Thumb-Friendly Navigation\n\nPlace important actions within reach of the thumb.\n\n### 4. Performance Matters\n\nMobile users are often on slow connections. Optimize everything.\n\n## Testing\n\nAlways test on real devices, not just desktop simulators.',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop',
  'Mobile phone with app interface',
  'Jordan Rhodes',
  'Mobile Product Designer',
  'Guides',
  ARRAY['mobile design', 'UX', 'responsive', 'mobile-first'],
  true,
  false,
  '2024-11-07T00:00:00Z'::timestamptz,
  9,
  1670,
  71
),

-- Blog Post 6: Building Design Systems That Scale (duplicate from earlier)
(
  'building-design-systems-scale-trenches',
  'Building Design Systems That Scale: Lessons from the Trenches',
  'Real-world lessons from building and maintaining design systems at scale. What works, what doesn''t.',
  E'# Building Design Systems That Scale: Lessons from the Trenches\n\nI\'ve built design systems for teams of 5 and teams of 500. Here\'s what I learned.\n\n## Lesson 1: Start Small\n\nDon\'t try to build everything at once. Start with buttons, inputs, and colors.\n\n## Lesson 2: Documentation First\n\nIf people don\'t know it exists, they won\'t use it.\n\n## Lesson 3: Make it Easy to Contribute\n\nYour design system should be open-source internally. Accept contributions from the team.\n\n## Lesson 4: Version Control Everything\n\nDesign systems need versioning just like code.\n\n## Lesson 5: Measure Adoption\n\nTrack which components are being used and which aren\'t.\n\n## The Hard Truth\n\nMost design systems fail because they\'re too rigid or too complex. Keep it simple.',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=630&fit=crop',
  'Design system components layout',
  'Sarah Chen',
  'Staff Design Systems Engineer',
  'Best Lessons',
  ARRAY['design systems', 'scalability', 'lessons learned', 'best practices'],
  true,
  false,
  '2024-12-20T00:00:00Z'::timestamptz,
  12,
  980,
  43
),

-- Blog Post 7: Additional post
(
  'figma-to-code-workflow-2024',
  'From Figma to Code: The Modern Workflow',
  'Streamline your design-to-development workflow with these modern tools and techniques.',
  E'# From Figma to Code: The Modern Workflow\n\nThe gap between design and code is shrinking.\n\n## Modern Tools\n\n### Figma Dev Mode\n\nInspect spacing, colors, and copy CSS/Tailwind classes directly.\n\n### Auto-Layout = Flexbox\n\nFigma\'s auto-layout maps perfectly to CSS flexbox.\n\n### Component Properties = Props\n\nVariants in Figma become props in React.\n\n## The Workflow\n\n1. Design in Figma with production-ready naming\n2. Use design tokens (colors, spacing, typography)\n3. Build components in code that match Figma exactly\n4. Sync regularly with designers\n\n## The Goal\n\nDesigners and developers working in perfect harmony.',
  'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=1200&h=630&fit=crop',
  'Figma interface and code editor',
  'Alex Rivera',
  'Frontend Developer',
  'Guides',
  ARRAY['figma', 'workflow', 'frontend', 'development'],
  true,
  false,
  '2024-11-18T00:00:00Z'::timestamptz,
  8,
  750,
  28
);

-- ================================================
-- VERIFY THE INSERT
-- ================================================

DO $$ 
DECLARE
  post_count integer;
  published_count integer;
BEGIN 
  SELECT COUNT(*) INTO post_count FROM public.blog_posts;
  SELECT COUNT(*) INTO published_count FROM public.blog_posts WHERE published = true;
  
  RAISE NOTICE '✅ Your 7 blog posts inserted successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Summary:';
  RAISE NOTICE '  Total posts: %', post_count;
  RAISE NOTICE '  Published: %', published_count;
  RAISE NOTICE '';
  RAISE NOTICE '📝 Blog Posts Added:';
  RAISE NOTICE '  1. From Pixels to Products (Olivia Johnson)';
  RAISE NOTICE '  2. Designing a Clean Product UI (Helena Martinez)';
  RAISE NOTICE '  3. Semantic Color Naming System (James Franklin)';
  RAISE NOTICE '  4. Touching Grass Solo Designer (Olivia Johnson)';
  RAISE NOTICE '  5. Mobile-First World (Jordan Rhodes)';
  RAISE NOTICE '  6. Building Design Systems (Sarah Chen)';
  RAISE NOTICE '  7. Figma to Code Workflow (Alex Rivera)';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next: View your posts!';
  RAISE NOTICE '   SELECT slug, title, author_name FROM blog_posts;';
END $$;