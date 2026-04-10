-- ================================================
-- INSERT 5 BLOG POSTS FROM YOUR UI
-- ================================================
-- Exact data from your screenshot (Mar 13, 2025)
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
  author_avatar,
  author_role,
  category,
  tags,
  published,
  featured,
  published_at,
  read_time_minutes,
  view_count,
  like_count,
  share_count
) VALUES 

-- Blog Post 1: Designing a Clean Product UI with Figma and shadcn/ui
(
  'designing-clean-product-ui-figma-shadcn',
  'Designing a Clean Product UI with Figma and shadcn/ui',
  'A comprehensive guide to building beautiful, accessible product interfaces using Figma and modern component libraries.',
  E'# Designing a Clean Product UI with Figma and shadcn/ui\n\nCreating clean, accessible product interfaces starts with the right tools and mindset.\n\n## Why Clean UI Matters\n\nClean UI isn''t just about aesthetics—it''s about clarity, usability, and user trust.\n\n## The Power of shadcn/ui\n\nshadcn/ui provides beautiful, accessible components built with Radix UI and Tailwind CSS.\n\n## From Figma to Production\n\n1. Design with intention in Figma\n2. Use consistent spacing and typography\n3. Implement with shadcn/ui components\n4. Test for accessibility\n\n## Key Principles\n\n- **Consistency**: Use a design system\n- **Accessibility**: WCAG 2.1 AA minimum\n- **Performance**: Optimize for speed\n- **Simplicity**: Less is more\n\n## Conclusion\n\nGreat product UI combines thoughtful design with solid engineering.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
  'Clean modern UI design interface',
  'Sophia Martinez',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
  'Senior UI Designer',
  'Articles',
  ARRAY['figma', 'shadcn', 'UI design', 'design systems', 'product design'],
  true,
  true,
  '2025-03-13T00:00:00Z'::timestamptz,
  9,
  1420,
  58,
  15
),

-- Blog Post 2: A Semantic Color Naming System to Align the Team
(
  'semantic-color-naming-system-align-team',
  'A Semantic Color Naming System to Align the Team',
  'Stop arguing about color names. Create a semantic color system that scales and keeps your team aligned.',
  E'# A Semantic Color Naming System to Align the Team\n\nColor naming shouldn''t cause conflicts. Here''s how to do it right.\n\n## The Problem with Generic Names\n\nWhat does "blue-500" tell you? Nothing about its purpose.\n\n## Semantic Naming FTW\n\nInstead of:\n- ❌ blue-500, green-600, red-400\n\nUse:\n- ✅ primary, success, danger\n- ✅ text-primary, text-secondary\n- ✅ bg-surface, bg-overlay\n\n## The System\n\n### Base Colors\n- **Brand**: Your company colors\n- **Neutral**: Grays for UI elements\n- **Semantic**: Success, error, warning, info\n\n### Usage Tokens\n- **Text**: text-primary, text-secondary, text-muted\n- **Background**: bg-canvas, bg-surface, bg-overlay\n- **Border**: border-default, border-strong, border-weak\n\n## Implementation\n\n1. Define in Figma using variables\n2. Export as CSS custom properties\n3. Document the system\n4. Train your team\n\n## Benefits\n\n- Clear communication\n- Faster development\n- Easier refactoring\n- Better dark mode support\n\n## Conclusion\n\nSemantic naming is an investment that pays dividends.',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=1200&h=630&fit=crop',
  'Color palette and design tokens',
  'James Franklin',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
  'Design Systems Engineer',
  'Articles',
  ARRAY['design systems', 'colors', 'naming conventions', 'design tokens', 'team collaboration'],
  true,
  true,
  '2025-03-13T00:00:00Z'::timestamptz,
  8,
  1680,
  72,
  19
),

-- Blog Post 3: Why Touching Grass as a Solo Designer Is Important for Your Mental Health
(
  'touching-grass-solo-designer-mental-health',
  'Why Touching Grass as a Solo Designer Is Important for Your Mental Health',
  'Solo design work can be isolating. Learn why taking breaks and connecting with nature is crucial for your wellbeing.',
  E'# Why Touching Grass as a Solo Designer Is Important for Your Mental Health\n\nBurnout is real. Here''s why you need to step outside.\n\n## The Solo Designer Struggle\n\nWorking alone means:\n- No water cooler conversations\n- No design critiques\n- No spontaneous collaboration\n- Constant isolation\n\n## Why Nature Works\n\nScience backs this up:\n- Reduces cortisol (stress hormone)\n- Improves focus and creativity\n- Boosts mood and energy\n- Provides perspective\n\n## Practical Tips\n\n### Daily Habits\n1. **Morning walk**: Start your day outside\n2. **Lunch break**: Eat outside when possible\n3. **Walking meetings**: Take calls while walking\n4. **End-of-day ritual**: Short walk to close the workday\n\n### Weekly Practices\n- Work from a park or outdoor café\n- Join local designer meetups (in person!)\n- Weekend hikes or nature trips\n\n### Mental Health Tools\n- Therapy or coaching\n- Designer communities (online and offline)\n- Co-working spaces\n- Regular social activities\n\n## Signs You Need a Break\n\n- Staring at the screen without progress\n- Everything feels overwhelming\n- Can''t make simple decisions\n- Physical tension or headaches\n- Loss of enthusiasm\n\n## The Bottom Line\n\nYour mental health > any deadline.\n\nYour wellbeing > any mockup.\n\nYour life > any project.\n\nTake care of yourself. Touch grass. You''ll design better for it.\n\n## Resources\n\n- Mental Health America: mhanational.org\n- Designer Hangout community\n- Freelance solidarity groups\n\nRemember: You''re not a machine. You''re a human who designs.',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=630&fit=crop',
  'Person relaxing in nature outdoors',
  'Olivia Johnson',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
  'Freelance Product Designer',
  'Best Lessons',
  ARRAY['mental health', 'solo designer', 'work-life balance', 'wellness', 'self care'],
  true,
  false,
  '2025-03-13T00:00:00Z'::timestamptz,
  7,
  2870,
  145,
  34
),

-- Blog Post 4: Think About the Mobile Experience: Designing for a Mobile-First World
(
  'mobile-experience-designing-mobile-first-world',
  'Think About the Mobile Experience: Designing for a Mobile-First World',
  'Over 60% of web traffic is mobile. Learn how to create exceptional mobile experiences that users love.',
  E'# Think About the Mobile Experience: Designing for a Mobile-First World\n\nMobile isn''t the future—it''s the present.\n\n## The Mobile Reality\n\n- 60%+ of web traffic is mobile\n- Users expect native-like experiences\n- Mobile users are task-oriented\n- Patience is limited on mobile\n\n## Mobile-First Design Principles\n\n### 1. Touch Targets\n\n**Minimum size: 44x44px**\n\nWhy? That''s the average finger pad size. Smaller = frustration.\n\n### 2. Readable Typography\n\n- Body text: 16px minimum\n- Line height: 1.5 minimum\n- Short line length: 50-75 characters\n\n### 3. Thumb-Friendly Navigation\n\n**The Thumb Zone:**\n- ✅ Bottom third: Easy to reach\n- ⚠️ Middle third: Requires stretch\n- ❌ Top third: Hard to reach\n\nPlace primary actions in the bottom third.\n\n### 4. Performance is UX\n\n- Optimize images (WebP, lazy loading)\n- Minimize JavaScript\n- Use system fonts when possible\n- Progressive Web App (PWA) features\n\n### 5. Progressive Disclosure\n\nDon''t overwhelm mobile users:\n- Show essential info first\n- Hide advanced features behind menus\n- Use accordions and tabs\n- Break long forms into steps\n\n## Common Mobile Mistakes\n\n❌ Desktop-first design adapted for mobile\n❌ Tiny tap targets\n❌ Fixed navigation that blocks content\n❌ Unoptimized images (slow loading)\n❌ Hamburger menus hiding critical actions\n❌ Forms requiring desktop keyboard\n\n## The Right Approach\n\n✅ Design for mobile first\n✅ Progressive enhancement for desktop\n✅ Test on real devices\n✅ Optimize for one-handed use\n✅ Fast, responsive, delightful\n\n## Testing Checklist\n\n- [ ] Test on real iOS and Android devices\n- [ ] Try with one hand only\n- [ ] Test on slow 3G connection\n- [ ] Check outdoor readability (screen brightness)\n- [ ] Test form inputs with mobile keyboard\n- [ ] Verify touch target sizes\n- [ ] Test with large text (accessibility)\n\n## Tools\n\n- Chrome DevTools mobile simulator\n- BrowserStack for device testing\n- Lighthouse for performance audits\n- Real devices (borrow from friends!)\n\n## Conclusion\n\nMobile-first isn''t a trend—it''s a necessity. Design for the smallest screen, then scale up.\n\nYour users will thank you.',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop',
  'Mobile phone with modern app interface',
  'Ethan Brooks',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
  'Mobile Product Designer',
  'News',
  ARRAY['mobile design', 'UX', 'responsive design', 'mobile-first', 'user experience'],
  true,
  false,
  '2025-03-13T00:00:00Z'::timestamptz,
  11,
  1950,
  83,
  22
),

-- Blog Post 5: Building Design Systems That Scale: Lessons from the Trenches
(
  'building-design-systems-scale-lessons-trenches',
  'Building Design Systems That Scale: Lessons from the Trenches',
  'Real-world lessons from building and maintaining design systems at scale. What works, what does not work.',
  E'# Building Design Systems That Scale: Lessons from the Trenches\n\nI''ve built design systems for startups and Fortune 500s. Here''s what I learned.\n\n## Lesson 1: Start Small, Think Big\n\n**Don''t try to build everything at once.**\n\n### Phase 1: Foundation\n- Colors (brand, neutrals, semantics)\n- Typography (scale, weights)\n- Spacing (4px or 8px grid)\n- Shadows and elevation\n\n### Phase 2: Primitives\n- Buttons\n- Inputs\n- Labels\n- Icons\n\n### Phase 3: Patterns\n- Forms\n- Cards\n- Navigation\n- Modals\n\n### Phase 4: Templates\n- Page layouts\n- Common flows\n\nDon''t jump to Phase 4 without nailing Phase 1.\n\n## Lesson 2: Documentation is Not Optional\n\n**If it''s not documented, it doesn''t exist.**\n\nYour docs need:\n- When to use each component\n- When NOT to use it\n- Code examples\n- Accessibility notes\n- Do''s and don''ts\n\n**Tools:**\n- Storybook for components\n- Notion/Confluence for guidelines\n- Figma for design specs\n\n## Lesson 3: Make Contributing Easy\n\n**Your design system should be open-source internally.**\n\nHow to enable contributions:\n1. Clear contribution guidelines\n2. Template for new components\n3. Review process (not approval hell)\n4. Recognition for contributors\n5. Regular office hours\n\n## Lesson 4: Version Everything\n\n**Design systems need semantic versioning like software.**\n\n- **Major (v2.0.0)**: Breaking changes\n- **Minor (v1.1.0)**: New features, backward compatible\n- **Patch (v1.0.1)**: Bug fixes\n\n**Tools:**\n- Git for code\n- Figma branching for design\n- Changelog for communication\n\n## Lesson 5: Measure Adoption\n\n**What gets measured gets improved.**\n\nTrack:\n- Component usage across products\n- Most/least used components\n- Support requests by component\n- Time to implement common patterns\n- Developer satisfaction scores\n\n**Why?** Data tells you what to improve, deprecate, or double-down on.\n\n## Lesson 6: Governance Without Gatekeeping\n\nYou need:\n- ✅ Standards and guidelines\n- ✅ Review process\n- ✅ Quality bar\n\nYou don''t need:\n- ❌ Every decision going through you\n- ❌ Months-long approval processes\n- ❌ Design police\n\n**Balance autonomy with consistency.**\n\n## Lesson 7: Design Tokens Are Your Friend\n\n**Tokens = single source of truth**\n\n```json\n{\n  "color-primary": "#0066FF",\n  "spacing-md": "16px",\n  "font-size-body": "16px"\n}\n```\n\nExport to:\n- CSS variables\n- Sass variables\n- Tailwind config\n- iOS/Android tokens\n\n## The Hard Truths\n\n### Why Design Systems Fail\n\n1. **Too rigid**: Teams route around it\n2. **Too complex**: Too hard to use\n3. **No adoption plan**: "Build it and they will come" doesn''t work\n4. **No maintenance**: Systems need care and feeding\n5. **Wrong priorities**: Building components nobody needs\n\n### Success Factors\n\n1. **Executive support**: You need budget and authority\n2. **Dedicated team**: Part-time doesn''t work at scale\n3. **User research**: Talk to your developers and designers\n4. **Incremental value**: Ship useful things fast\n5. **Community**: Make it a movement, not a mandate\n\n## My Advice\n\n**Start now, start small, stay consistent.**\n\nEven a small design system (colors, typography, 5 components) is better than chaos.\n\n**Listen more than you dictate.**\n\nYour design system serves the product teams. They''re your customers.\n\n**Celebrate wins.**\n\nWhen teams ship faster using your system, shout it from the rooftops.\n\n## Resources\n\n- Brad Frost''s Atomic Design\n- Nathan Curtis''s articles on Medium\n- Design Systems Slack communities\n- Storybook documentation\n\n## Conclusion\n\nBuilding a design system is a marathon, not a sprint.\n\nIt''s messy, political, technical, and deeply rewarding.\n\nStart small. Listen hard. Iterate always.\n\nYou''ve got this.',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=630&fit=crop',
  'Design system components and documentation',
  'Sarah Chen',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
  'Staff Design Systems Engineer',
  'Articles',
  ARRAY['design systems', 'scalability', 'lessons learned', 'best practices', 'team collaboration'],
  true,
  false,
  '2025-03-13T00:00:00Z'::timestamptz,
  15,
  2240,
  98,
  27
);

-- ================================================
-- VERIFY THE INSERT
-- ================================================

DO $$ 
DECLARE
  post_count integer;
  published_count integer;
  featured_count integer;
BEGIN 
  SELECT COUNT(*) INTO post_count FROM public.blog_posts;
  SELECT COUNT(*) INTO published_count FROM public.blog_posts WHERE published = true;
  SELECT COUNT(*) INTO featured_count FROM public.blog_posts WHERE featured = true;
  
  RAISE NOTICE '✅ Your 5 blog posts inserted successfully!';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Summary:';
  RAISE NOTICE '  Total posts: %', post_count;
  RAISE NOTICE '  Published: %', published_count;
  RAISE NOTICE '  Featured: %', featured_count;
  RAISE NOTICE '';
  RAISE NOTICE '📝 Blog Posts (All dated Mar 13, 2025):';
  RAISE NOTICE '  1. Designing a Clean Product UI - Sophia Martinez (Articles) ⭐ Featured';
  RAISE NOTICE '  2. Semantic Color Naming System - James Franklin (Articles) ⭐ Featured';
  RAISE NOTICE '  3. Touching Grass Solo Designer - Olivia Johnson (Best Lessons)';
  RAISE NOTICE '  4. Mobile Experience Mobile-First - Ethan Brooks (News)';
  RAISE NOTICE '  5. Building Design Systems - Sarah Chen (Articles)';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Test Query:';
  RAISE NOTICE '   SELECT slug, title, author_name, category FROM blog_posts ORDER BY published_at DESC;';
END $$;