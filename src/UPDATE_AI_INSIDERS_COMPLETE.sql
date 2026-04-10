-- ================================================================
-- UPDATE AI INSIDERS WITH COMPLETE DETAIL PAGE CONTENT
-- ================================================================
-- Run this in Supabase SQL Editor to update AI Insiders with full content
-- ================================================================

-- Update AI Insiders (mobile-banking-app-redesign)
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

• Developed content strategy and editorial calendar for multiple platforms
• Created high-performing social media campaigns with consistent brand voice
• Implemented email marketing automation and nurture sequences
• Managed community engagement and audience growth initiatives',
  results = 'Our marketing strategy helped AI Insiders grow their community by 180% and achieve a 3x increase in course enrollments. Their social media engagement rates increased by 450%.',
  published = true,
  featured = true,
  updated_at = now()
WHERE slug = 'mobile-banking-app-redesign';

-- Verify the update
SELECT 
  slug, 
  title, 
  category, 
  project_type,
  industry,
  excerpt,
  LEFT(description, 100) as description_preview,
  LEFT(solution, 100) as solution_preview,
  LEFT(results, 100) as results_preview
FROM portfolio_projects 
WHERE slug = 'mobile-banking-app-redesign';
