-- ================================================
-- INSERT SAMPLE BLOG POSTS
-- ================================================
-- Run this AFTER creating blog_posts table
-- This will add 5 sample blog posts to your database
-- ================================================

-- Insert 5 sample blog posts
INSERT INTO public.blog_posts (
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
  meta_keywords,
  published,
  featured,
  published_at,
  read_time_minutes,
  view_count,
  like_count,
  share_count,
  allow_comments,
  show_in_feed
) VALUES 
-- Blog Post 1
(
  'from-pixels-to-products',
  'From Pixels to Products: How Designers Can Learn to Ship Faster',
  'Learn how designers can transition from creating beautiful mockups to shipping functional products faster with these proven strategies.',
  E'# From Pixels to Products\n\nAs designers, we often get caught up in perfecting every pixel. But shipping fast is a skill worth learning.\n\n## Why Speed Matters\n\nIn today\'s fast-paced digital world, speed to market can make or break a product. Here\'s how to ship faster without sacrificing quality.\n\n### 1. Embrace Imperfection\n\nDone is better than perfect. Ship the MVP and iterate based on real user feedback.\n\n### 2. Use Design Systems\n\nLeverage existing components and patterns. Don\'t reinvent the wheel.\n\n### 3. Collaborate Early\n\nInvolve developers from day one. Their input can save you hours of rework.\n\n## Conclusion\n\nShipping fast is a mindset. Start small, iterate quickly, and learn from your users.',
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&h=630&fit=crop',
  'Designer working on laptop with coffee',
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop',
  'Olivia Johnson',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
  'Senior Product Designer with 8+ years of experience shipping digital products.',
  'Senior Product Designer',
  'Articles',
  ARRAY['design', 'productivity', 'workflow'],
  'From Pixels to Products: Ship Faster as a Designer',
  'Learn how designers can transition from creating beautiful mockups to shipping functional products faster with proven strategies.',
  ARRAY['design', 'productivity', 'shipping', 'workflow', 'product design'],
  true,
  true,
  '2025-03-13T10:00:00Z'::timestamptz,
  8,
  1250,
  45,
  12,
  true,
  true
),

-- Blog Post 2
(
  'building-design-systems-that-scale',
  'Building Design Systems That Actually Scale',
  'A comprehensive guide to creating design systems that grow with your product and team, from tokens to components.',
  E'# Building Design Systems That Actually Scale\n\nDesign systems are more than just component libraries. They\'re the foundation of consistent, scalable products.\n\n## Start with Tokens\n\nColors, spacing, typography - these are your building blocks. Define them once, use them everywhere.\n\n## Component Architecture\n\n### Atomic Design Works\n\n- **Atoms**: Buttons, inputs, labels\n- **Molecules**: Form fields, cards\n- **Organisms**: Headers, forms\n- **Templates**: Page layouts\n- **Pages**: Final compositions\n\n## Documentation is Key\n\nIf it\'s not documented, it doesn\'t exist. Make it easy for your team to find and use components.\n\n## Maintain and Evolve\n\nYour design system should evolve with your product. Schedule regular reviews and updates.',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=630&fit=crop',
  'Design system components on screen',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
  'Marcus Chen',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
  'Design Systems Lead building scalable design infrastructure.',
  'Design Systems Lead',
  'Guides',
  ARRAY['design systems', 'components', 'scalability'],
  'Building Design Systems That Scale - Complete Guide',
  'A comprehensive guide to creating design systems that grow with your product and team, from design tokens to component architecture.',
  ARRAY['design systems', 'components', 'design tokens', 'atomic design', 'scalability'],
  true,
  true,
  '2025-03-10T14:30:00Z'::timestamptz,
  12,
  2100,
  78,
  23,
  true,
  true
),

-- Blog Post 3
(
  'ai-tools-for-designers-2025',
  'The Best AI Tools for Designers in 2025',
  'Discover the AI-powered tools that are revolutionizing the design workflow and boosting productivity.',
  E'# The Best AI Tools for Designers in 2025\n\nAI is transforming how we design. Here are the tools you need to know.\n\n## Image Generation\n\n**Midjourney** and **DALL-E 3** are game-changers for concept exploration and mood boards.\n\n## Design Assistance\n\n**Figma AI** helps with auto-layout, component suggestions, and accessibility checks.\n\n## Content Writing\n\n**ChatGPT** and **Claude** are perfect for microcopy, placeholder text, and content strategy.\n\n## Code Generation\n\n**GitHub Copilot** speeds up frontend development and prototyping.\n\n## The Human Touch Still Matters\n\nAI is a tool, not a replacement. Use it to enhance your creativity, not replace it.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'AI and design interface',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
  'Sarah Mitchell',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
  'Digital Product Designer exploring AI-powered design workflows.',
  'Digital Product Designer',
  'Tools',
  ARRAY['AI', 'tools', 'productivity', 'design'],
  'Best AI Tools for Designers in 2025',
  'Discover the AI-powered tools that are revolutionizing the design workflow and boosting productivity in 2025.',
  ARRAY['AI tools', 'design tools', 'productivity', 'artificial intelligence', 'design workflow'],
  true,
  false,
  '2025-03-08T09:00:00Z'::timestamptz,
  6,
  890,
  34,
  8,
  true,
  true
),

-- Blog Post 4
(
  'user-research-on-a-budget',
  'How to Conduct User Research on a Budget',
  'Effective user research doesn''t require a big budget. Learn practical methods for gathering user insights.',
  E'# How to Conduct User Research on a Budget\n\nYou don\'t need thousands of dollars to understand your users.\n\n## Free Research Methods\n\n### 1. User Interviews\n\nTalk to 5-8 users. That\'s all you need for qualitative insights.\n\n### 2. Surveys\n\nUse Google Forms or Typeform\'s free tier. Keep it under 10 questions.\n\n### 3. Analytics\n\nGoogle Analytics is free and powerful. Look at user flows and drop-off points.\n\n### 4. Social Listening\n\nReddit, Twitter, and Discord are gold mines for user feedback.\n\n## When to Spend Money\n\nInvest in tools like Hotjar or Maze when you need quantitative data at scale.\n\n## The Best Insight is Free\n\nJust talk to your users. Nothing beats direct conversation.',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop',
  'Team conducting user research',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  'Alex Rivera',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
  'UX Researcher passionate about democratizing user research.',
  'UX Researcher',
  'Guides',
  ARRAY['user research', 'UX', 'budget'],
  'User Research on a Budget - Practical Guide',
  'Effective user research doesn''t require a big budget. Learn practical methods for gathering user insights without breaking the bank.',
  ARRAY['user research', 'UX research', 'budget research', 'user interviews', 'surveys'],
  true,
  false,
  '2025-03-05T11:00:00Z'::timestamptz,
  10,
  1560,
  67,
  15,
  true,
  true
),

-- Blog Post 5 (Draft - not published)
(
  'future-of-web-design',
  'The Future of Web Design: Trends to Watch',
  'Exploring upcoming trends that will shape web design in the next few years.',
  E'# The Future of Web Design\n\n*This is a draft. Coming soon!*\n\nWeb design is evolving rapidly. Here\'s what to watch for:\n\n## Trend 1: 3D and Immersive Experiences\n\nWebGL and Three.js are making 3D web experiences mainstream.\n\n## Trend 2: Micro-interactions\n\nDelightful animations that guide users and provide feedback.\n\n## Trend 3: Voice UI\n\nVoice commands are coming to web apps.\n\n## More to come...\n\nThis article is still being written. Check back soon!',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=630&fit=crop',
  'Futuristic web design interface',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop',
  'Jordan Kim',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
  'Creative Director exploring the future of digital experiences.',
  'Creative Director',
  'Trends',
  ARRAY['web design', 'trends', 'future'],
  'The Future of Web Design - Trends to Watch',
  'Exploring upcoming trends that will shape web design in the next few years, from 3D experiences to voice UI.',
  ARRAY['web design', 'design trends', 'future', '3D web', 'voice UI'],
  false,  -- NOT PUBLISHED (draft)
  false,
  NULL,  -- No publish date yet
  5,
  0,  -- No views yet (draft)
  0,
  0,
  true,
  true
);

-- ================================================
-- VERIFY THE INSERT
-- ================================================

DO $$ 
DECLARE
  post_count integer;
  published_count integer;
  draft_count integer;
BEGIN 
  SELECT COUNT(*) INTO post_count FROM public.blog_posts;
  SELECT COUNT(*) INTO published_count FROM public.blog_posts WHERE published = true;
  SELECT COUNT(*) INTO draft_count FROM public.blog_posts WHERE published = false;
  
  RAISE NOTICE '✅ Sample blog posts inserted successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Summary:';
  RAISE NOTICE '  Total posts: %', post_count;
  RAISE NOTICE '  Published: %', published_count;
  RAISE NOTICE '  Drafts: %', draft_count;
  RAISE NOTICE '';
  RAISE NOTICE '📝 Blog Posts:';
  RAISE NOTICE '  1. From Pixels to Products (published, featured)';
  RAISE NOTICE '  2. Building Design Systems (published, featured)';
  RAISE NOTICE '  3. AI Tools for Designers (published)';
  RAISE NOTICE '  4. User Research on a Budget (published)';
  RAISE NOTICE '  5. Future of Web Design (draft)';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Next step: Query your posts!';
  RAISE NOTICE '   SELECT * FROM blog_posts WHERE published = true;';
END $$;
