-- Update portfolio projects with proper titles and subtitles matching the design
-- Order matters: The first 4 projects will be split into 2 columns (0,2 left | 1,3 right)

-- Project 1 (Index 0 - Left Column, First)
UPDATE portfolio_projects 
SET 
  title = 'Welda Club',
  excerpt = 'Brand Identity & Web Development',
  created_at = '2024-01-01 00:00:00'
WHERE slug = 'modern-ecommerce-platform';

-- Project 2 (Index 1 - Right Column, First)
UPDATE portfolio_projects 
SET 
  title = 'AI Insiders',
  excerpt = 'Digital Marketing & Content Strategy',
  created_at = '2024-01-02 00:00:00'
WHERE slug = 'mobile-banking-app-redesign';

-- Project 3 (Index 2 - Left Column, Second)
UPDATE portfolio_projects 
SET 
  title = 'Acenos X',
  excerpt = 'Social Media Management & Growth',
  created_at = '2024-01-03 00:00:00'
WHERE slug = 'analytics-dashboard-saas';

-- Project 4 (Index 3 - Right Column, Second)
UPDATE portfolio_projects 
SET 
  title = 'Parceros Capital',
  excerpt = 'Brand Strategy & Visual Identity',
  created_at = '2024-01-04 00:00:00'
WHERE slug = 'sustainable-fashion-brand';

-- Verify updates (should show in correct order)
SELECT slug, title, excerpt, created_at FROM portfolio_projects ORDER BY created_at;