-- Insert 5 Additional Blog Posts to Supabase
-- Run this in your Supabase SQL Editor

-- Post 1: Designing Clean Product UI
INSERT INTO blog_posts (
  slug, title, excerpt, content, featured_image, featured_image_alt, thumbnail,
  author_name, author_avatar, author_role, category, tags,
  meta_title, meta_description, meta_keywords,
  published, featured, published_at, read_time_minutes, allow_comments, show_in_feed
) VALUES (
  'designing-clean-product-ui-with-figma-and-shadcn',
  'Designing a Clean Product UI with Figma and shadcn/ui',
  'Discover how to create beautiful, consistent product interfaces using Figma and the shadcn/ui component library.',
  '<p>Building clean product UIs requires both design skill and technical understanding. In this guide, we''ll explore how to leverage Figma and shadcn/ui to create stunning interfaces.</p>

<h2>Why shadcn/ui?</h2>
<p>Unlike traditional component libraries, shadcn/ui gives you full control over your components while maintaining consistency and accessibility.</p>

<h2>Design Process</h2>
<p>Start with Figma to create your design system, then use shadcn/ui components to implement them with minimal effort.</p>

<h2>Key Benefits</h2>
<ul>
<li>Full control over component code</li>
<li>Built-in accessibility</li>
<li>Seamless Figma integration</li>
<li>Customizable styling with Tailwind CSS</li>
</ul>',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop',
  'Clean modern UI design interface',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
  'Sophia Martinez',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
  'UI/UX Designer',
  'Articles',
  ARRAY['Design', 'UI', 'Figma', 'Components'],
  'Designing a Clean Product UI with Figma and shadcn/ui',
  'Discover how to create beautiful, consistent product interfaces using Figma and the shadcn/ui component library.',
  ARRAY['design', 'ui', 'figma', 'shadcn', 'components'],
  true,
  false,
  NOW() - INTERVAL '1 day',
  4,
  true,
  true
);

-- Post 2: Semantic Color Naming
INSERT INTO blog_posts (
  slug, title, excerpt, content, featured_image, featured_image_alt, thumbnail,
  author_name, author_avatar, author_role, category, tags,
  meta_title, meta_description, meta_keywords,
  published, featured, published_at, read_time_minutes, allow_comments, show_in_feed
) VALUES (
  'semantic-color-naming-system-align-team',
  'A Semantic Color Naming System to Align the Team',
  'Learn how to create a color naming system that everyone on your team can understand and use effectively.',
  '<p>Color naming is more important than you think. A good naming system helps designers and developers communicate clearly and work faster.</p>

<h2>The Problem</h2>
<p>Traditional color names like "blue-500" or "primary-light" can be confusing and inconsistent across teams.</p>

<h2>The Solution</h2>
<p>Semantic naming that describes the purpose, not the appearance. Think "text-primary", "bg-success", "border-error".</p>

<h2>Implementation Steps</h2>
<ol>
<li>Audit your current color system</li>
<li>Define semantic categories (text, background, border, etc.)</li>
<li>Map colors to purposes</li>
<li>Document everything clearly</li>
<li>Get team buy-in</li>
</ol>

<h2>Benefits</h2>
<p>When everyone speaks the same color language, handoffs are smoother, changes are easier, and your product feels more cohesive.</p>',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=600&fit=crop',
  'Color palette and design system',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=400&fit=crop',
  'James Franklin',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop',
  'Design Systems Lead',
  'Articles',
  ARRAY['Design Systems', 'Color', 'Team', 'Workflow'],
  'A Semantic Color Naming System to Align the Team',
  'Learn how to create a color naming system that everyone on your team can understand and use effectively.',
  ARRAY['design systems', 'color naming', 'team collaboration', 'workflow'],
  true,
  false,
  NOW() - INTERVAL '2 days',
  6,
  true,
  true
);

-- Post 3: Mental Health for Solo Designers
INSERT INTO blog_posts (
  slug, title, excerpt, content, featured_image, featured_image_alt, thumbnail,
  author_name, author_avatar, author_role, category, tags,
  meta_title, meta_description, meta_keywords,
  published, featured, published_at, read_time_minutes, allow_comments, show_in_feed
) VALUES (
  'touching-grass-solo-designer-mental-health',
  'Why Touching Grass as a Solo Designer Is Important for Your Mental Health',
  'Being a solo designer can be isolating. Here''s why taking breaks and connecting with the real world matters.',
  '<p>As solo designers, we often spend hours in front of screens. But stepping away and "touching grass" is essential for mental health and creativity.</p>

<h2>The Burnout Problem</h2>
<p>Solo designers face unique challenges: isolation, decision fatigue, and constant screen time. Without colleagues to bounce ideas off or take coffee breaks with, burnout can sneak up quickly.</p>

<h2>Benefits of Breaks</h2>
<p>Taking regular breaks improves creativity, reduces stress, and helps you see problems from new angles. Your best ideas often come when you''re not actively trying to solve the problem.</p>

<h2>Practical Tips</h2>
<ul>
<li>Schedule regular outdoor breaks</li>
<li>Join local design communities</li>
<li>Set boundaries with clients</li>
<li>Practice mindfulness</li>
<li>Take actual vacations</li>
</ul>

<h2>Remember</h2>
<p>Your mental health isn''t just important for you—it''s essential for doing your best creative work. Take care of yourself!</p>',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
  'Person walking in nature',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
  'Olivia Johnson',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  'Senior Product Designer',
  'Workflows',
  ARRAY['Mental Health', 'Solo Designer', 'Wellness', 'Work-Life Balance'],
  'Why Touching Grass as a Solo Designer Is Important for Your Mental Health',
  'Being a solo designer can be isolating. Here''s why taking breaks and connecting with the real world matters.',
  ARRAY['mental health', 'solo designer', 'wellness', 'work-life balance', 'burnout'],
  true,
  false,
  NOW() - INTERVAL '3 days',
  3,
  true,
  true
);

-- Post 4: Mobile-First Design
INSERT INTO blog_posts (
  slug, title, excerpt, content, featured_image, featured_image_alt, thumbnail,
  author_name, author_avatar, author_role, category, tags,
  meta_title, meta_description, meta_keywords,
  published, featured, published_at, read_time_minutes, allow_comments, show_in_feed
) VALUES (
  'mobile-experience-designing-mobile-first-world',
  'Think About the Mobile Experience: Designing for a Mobile-First World',
  'Mobile-first design isn''t just a trend—it''s essential. Learn how to create experiences that work beautifully on any device.',
  '<p>With most users accessing content on mobile devices, mobile-first design has become crucial for success.</p>

<h2>Mobile-First Principles</h2>
<p>Start with the smallest screen and work your way up. This forces you to prioritize what''s truly important.</p>

<h2>Common Mistakes</h2>
<p>Don''t just shrink your desktop design. Mobile requires its own thoughtful approach:</p>
<ul>
<li>Ignoring touch target sizes</li>
<li>Hiding important content in menus</li>
<li>Not considering thumb zones</li>
<li>Forgetting about slow connections</li>
</ul>

<h2>Best Practices</h2>
<ol>
<li>Design for one-handed use</li>
<li>Optimize images and assets</li>
<li>Use progressive enhancement</li>
<li>Test on real devices</li>
<li>Consider offline experiences</li>
</ol>

<h2>The Future</h2>
<p>Mobile-first isn''t going away. As devices get more diverse, starting small and scaling up will only become more important.</p>',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop',
  'Mobile phone with app interface',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
  'Ethan Brooks',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
  'Mobile Designer',
  'News',
  ARRAY['Mobile', 'Responsive Design', 'UX', 'Mobile-First'],
  'Think About the Mobile Experience: Designing for a Mobile-First World',
  'Mobile-first design isn''t just a trend—it''s essential. Learn how to create experiences that work beautifully on any device.',
  ARRAY['mobile design', 'responsive design', 'ux', 'mobile-first', 'user experience'],
  true,
  false,
  NOW() - INTERVAL '4 days',
  5,
  true,
  true
);

-- Post 5: Design Systems That Scale
INSERT INTO blog_posts (
  slug, title, excerpt, content, featured_image, featured_image_alt, thumbnail,
  author_name, author_avatar, author_role, category, tags,
  meta_title, meta_description, meta_keywords,
  published, featured, published_at, read_time_minutes, allow_comments, show_in_feed
) VALUES (
  'building-design-systems-that-scale',
  'Building Design Systems That Scale: Lessons from the Trenches',
  'Real-world lessons from building and maintaining design systems at scale.',
  '<p>Design systems are easy to start but hard to scale. Here are lessons learned from years of building and maintaining them.</p>

<h2>Start Small</h2>
<p>Don''t try to build everything at once. Start with your most-used components and expand gradually. Focus on:</p>
<ul>
<li>Buttons and form inputs</li>
<li>Typography scale</li>
<li>Color tokens</li>
<li>Spacing system</li>
</ul>

<h2>Documentation is Key</h2>
<p>A design system without documentation is just a collection of components. Invest in clear, helpful documentation that shows both how and why to use each component.</p>

<h2>Governance Matters</h2>
<p>Establish clear processes for proposing changes and adding new components. Without governance, your system will become bloated and inconsistent.</p>

<h2>Version Control</h2>
<p>Treat your design system like software. Use semantic versioning, maintain changelogs, and communicate breaking changes clearly.</p>

<h2>Measure Success</h2>
<p>Track adoption rates, time saved, and consistency improvements. Show stakeholders the ROI of your design system.</p>

<h2>Keep Iterating</h2>
<p>Your design system is never "done." It should evolve with your product and team needs. Regular audits and updates are essential.</p>',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=600&fit=crop',
  'Design system components and documentation',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop',
  'Sarah Chen',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop',
  'Design Systems Architect',
  'Articles',
  ARRAY['Design Systems', 'Scale', 'Documentation', 'Team'],
  'Building Design Systems That Scale: Lessons from the Trenches',
  'Real-world lessons from building and maintaining design systems at scale.',
  ARRAY['design systems', 'scale', 'documentation', 'team collaboration', 'governance'],
  true,
  false,
  NOW() - INTERVAL '5 days',
  7,
  true,
  true
);

-- Verify all posts were inserted
SELECT id, slug, title, featured, published, published_at 
FROM blog_posts 
WHERE featured = false
ORDER BY published_at DESC;
