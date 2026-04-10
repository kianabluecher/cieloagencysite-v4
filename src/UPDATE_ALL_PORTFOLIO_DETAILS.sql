-- ================================================================
-- UPDATE ALL PORTFOLIO PROJECTS WITH COMPLETE DETAIL PAGE CONTENT
-- ================================================================
-- Run this in Supabase SQL Editor
-- This updates all 4 portfolio projects with complete data for detail pages
-- ================================================================

-- 1. AI INSIDERS (mobile-banking-app-redesign)
UPDATE portfolio_projects 
SET 
  title = 'AI Insiders',
  category = 'Marketing & Content',
  project_type = 'Marketing & Strategy',
  industry = 'Education & Technology',
  completion_date = '2024-02-01',
  excerpt = 'Digital Marketing & Content Strategy',
  description = 'A comprehensive digital marketing strategy and content creation project for AI Insiders, a leading artificial intelligence news and insights platform. We helped them establish thought leadership and grow their community through strategic content and engagement.',
  challenge = 'AI Insiders needed to increase audience engagement and establish thought leadership in the competitive AI education space.',
  solution = 'We developed a multi-channel content marketing strategy that included:

Developed content strategy and editorial calendar for multiple platforms

Created high-performing social media campaigns with consistent brand voice

Implemented email marketing automation and nurture sequences

Managed community engagement and audience growth initiatives',
  results = 'Our marketing strategy helped AI Insiders grow their community by 180% and achieve a 3x increase in course enrollments. Their social media engagement rates increased by 450%.',
  published = true,
  featured = true,
  updated_at = now()
WHERE slug = 'mobile-banking-app-redesign';

-- 2. WELDA CLUB (modern-ecommerce-platform)
UPDATE portfolio_projects 
SET 
  title = 'Welda Club',
  category = 'Branding & Development',
  project_type = 'Full Brand & Digital',
  industry = 'Wellness & Fitness',
  completion_date = '2024-03-01',
  excerpt = 'Brand Identity & Web Development',
  description = 'A complete brand identity and web development project for Welda Club, a premium wellness and fitness community. We created a modern, sophisticated brand that reflects the club''s commitment to excellence and community.',
  challenge = 'Welda Club needed a premium brand identity that would position them as a leader in the wellness space.',
  solution = 'We created a comprehensive brand and digital solution:

Developed comprehensive brand identity including logo, color palette, and typography system

Designed and built a custom website with membership management capabilities

Created marketing collateral and social media templates

Established brand guidelines for consistent application across all touchpoints',
  results = 'The new brand identity and website helped Welda Club increase membership inquiries by 250% in the first three months. The sophisticated design positioned them as a premium wellness destination in their market.',
  published = true,
  featured = true,
  updated_at = now()
WHERE slug = 'modern-ecommerce-platform';

-- 3. ACENOS X (analytics-dashboard-saas)
UPDATE portfolio_projects 
SET 
  title = 'Acenos X',
  category = 'Social Media Marketing',
  project_type = 'Social Media & Community',
  industry = 'B2B SaaS',
  completion_date = '2024-02-01',
  excerpt = 'Social Media Management & Growth',
  description = 'A complete social media management and growth strategy for Acenos X, a B2B SaaS platform. We managed their presence across LinkedIn, Twitter, and industry forums, focusing on thought leadership and community building.',
  challenge = 'Acenos X needed to establish a strong social media presence to generate qualified leads and build brand awareness.',
  solution = 'We implemented a comprehensive social media strategy:

Developed and executed a LinkedIn content strategy featuring industry insights and case studies

Created a consistent posting schedule with engaging visuals and compelling copy

Implemented community management practices to increase engagement and response rates

Launched targeted advertising campaigns to reach decision-makers in key industries',
  results = 'Acenos X experienced 320% follower growth on LinkedIn and a 5x increase in qualified leads from social media. Their engagement rate surpassed industry benchmarks by 40%.',
  published = true,
  featured = true,
  updated_at = now()
WHERE slug = 'analytics-dashboard-saas';

-- 4. PARCEROS CAPITAL (sustainable-fashion-brand)
UPDATE portfolio_projects 
SET 
  title = 'Parceros Capital',
  category = 'Brand Strategy',
  project_type = 'Brand Strategy & Identity',
  industry = 'Financial Services',
  completion_date = '2024-01-01',
  excerpt = 'Brand Strategy & Visual Identity',
  description = 'A complete brand strategy and visual identity project for Parceros Capital, a venture capital firm focused on Latin American startups. We created a sophisticated brand that communicates trust, expertise, and cultural understanding.',
  challenge = 'Parceros Capital needed a brand that would resonate with both entrepreneurs and institutional investors in the VC space.',
  solution = 'We developed a complete brand strategy and identity:

Conducted market research and competitive analysis in the VC industry

Developed brand positioning and messaging framework

Created comprehensive visual identity including logo, color system, and typography

Designed pitch deck templates and investor materials',
  results = 'The refined brand identity helped Parceros Capital attract high-quality deal flow and close two major fund commitments totaling $50M. Their professional image now reflects their market position.',
  published = true,
  featured = true,
  updated_at = now()
WHERE slug = 'sustainable-fashion-brand';

-- Verify all updates
SELECT 
  slug, 
  title, 
  category, 
  project_type,
  industry,
  excerpt,
  SUBSTRING(description FROM 1 FOR 50) || '...' as description_preview,
  SUBSTRING(solution FROM 1 FOR 50) || '...' as solution_preview,
  SUBSTRING(results FROM 1 FOR 50) || '...' as results_preview,
  published,
  featured
FROM portfolio_projects 
ORDER BY completion_date DESC;
