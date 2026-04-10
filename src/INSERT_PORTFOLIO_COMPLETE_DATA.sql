-- Complete portfolio data matching the design requirements
-- Run this in Supabase SQL Editor after creating the portfolio_projects table

-- Update Welda Club with complete details
UPDATE portfolio_projects 
SET 
  title = 'Welda Club',
  slug = 'modern-ecommerce-platform',
  excerpt = 'Brand Identity & Web Development',
  category = 'Branding & Development',
  date = 'March 2024',
  description = 'A complete brand identity and web development project for Welda Club, a premium wellness and fitness community. We created a modern, sophisticated brand that reflects the club''s commitment to excellence and community.',
  client_type = 'Wellness & Fitness',
  project_type = 'Full Brand & Digital',
  what_we_did = ARRAY[
    'Developed comprehensive brand identity including logo, color palette, and typography system',
    'Designed and built a custom website with membership management capabilities',
    'Created marketing collateral and social media templates',
    'Established brand guidelines for consistent application across all touchpoints'
  ],
  result = 'The new brand identity and website helped Welda Club increase membership inquiries by 250% in the first three months. The sophisticated design positioned them as a premium wellness destination in their market.',
  created_at = '2024-01-01 00:00:00'
WHERE slug = 'modern-ecommerce-platform';

-- Update AI Insiders with complete details
UPDATE portfolio_projects 
SET 
  title = 'AI Insiders',
  slug = 'mobile-banking-app-redesign',
  excerpt = 'Digital Marketing & Content Strategy',
  category = 'Digital Marketing',
  date = 'April 2024',
  description = 'A comprehensive digital marketing strategy and content creation project for AI Insiders, a leading artificial intelligence news and insights platform. We developed a multi-channel approach to increase audience engagement and establish thought leadership.',
  client_type = 'Technology & Media',
  project_type = 'Marketing & Content',
  what_we_did = ARRAY[
    'Created a comprehensive content marketing strategy across social media platforms',
    'Developed email marketing campaigns with personalized content recommendations',
    'Implemented SEO optimization for blog content and landing pages',
    'Designed and executed paid advertising campaigns on LinkedIn and Google'
  ],
  result = 'AI Insiders saw a 180% increase in organic traffic and 65% growth in newsletter subscribers within six months. The content strategy positioned them as the go-to resource for AI industry insights.',
  created_at = '2024-01-02 00:00:00'
WHERE slug = 'mobile-banking-app-redesign';

-- Update Acenos X with complete details
UPDATE portfolio_projects 
SET 
  title = 'Acenos X',
  slug = 'analytics-dashboard-saas',
  excerpt = 'Social Media Management & Growth',
  category = 'Social Media Marketing',
  date = 'February 2024',
  description = 'A complete social media management and growth strategy for Acenos X, a B2B SaaS platform. We managed their presence across LinkedIn, Twitter, and industry forums, focusing on thought leadership and community building.',
  client_type = 'B2B SaaS',
  project_type = 'Social Media & Community',
  what_we_did = ARRAY[
    'Developed and executed a LinkedIn content strategy featuring industry insights and case studies',
    'Created a consistent posting schedule with engaging visuals and compelling copy',
    'Implemented community management practices to increase engagement and response rates',
    'Launched targeted advertising campaigns to reach decision-makers in key industries'
  ],
  result = 'Acenos X experienced 320% follower growth on LinkedIn and a 5x increase in qualified leads from social media. Their engagement rate surpassed industry benchmarks by 40%.',
  created_at = '2024-01-03 00:00:00'
WHERE slug = 'analytics-dashboard-saas';

-- Update Parceros Capital with complete details
UPDATE portfolio_projects 
SET 
  title = 'Parceros Capital',
  slug = 'sustainable-fashion-brand',
  excerpt = 'Brand Strategy & Visual Identity',
  category = 'Brand Strategy',
  date = 'January 2024',
  description = 'A complete brand strategy and visual identity project for Parceros Capital, a venture capital firm focused on Latin American startups. We created a sophisticated brand that communicates trust, expertise, and cultural understanding.',
  client_type = 'Financial Services',
  project_type = 'Brand Strategy & Identity',
  what_we_did = ARRAY[
    'Conducted market research and competitive analysis in the VC industry',
    'Developed brand positioning and messaging framework',
    'Created comprehensive visual identity including logo, color system, and typography',
    'Designed pitch deck templates and investor materials'
  ],
  result = 'The refined brand identity helped Parceros Capital attract high-quality deal flow and close two major fund commitments totaling $50M. Their professional image now reflects their market position.',
  created_at = '2024-01-04 00:00:00'
WHERE slug = 'sustainable-fashion-brand';

-- Verify all updates
SELECT 
  slug, 
  title, 
  excerpt, 
  category, 
  date, 
  project_type, 
  client_type,
  created_at 
FROM portfolio_projects 
ORDER BY created_at;
