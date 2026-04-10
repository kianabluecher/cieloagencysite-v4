-- ================================================================
-- COMPLETE PORTFOLIO SETUP - RUN THIS ENTIRE FILE
-- ================================================================
-- This file will:
-- 1. Drop the old table if it exists (fresh start)
-- 2. Create a new portfolio_projects table
-- 3. Add indexes and triggers
-- 4. Set up security policies
-- 5. Insert 5 sample portfolio projects
-- ================================================================

-- STEP 1: Drop existing table (fresh start)
DROP TABLE IF EXISTS public.portfolio_projects CASCADE;

-- STEP 2: Create the portfolio_projects table
CREATE TABLE public.portfolio_projects (
  -- Primary identification
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  
  -- Project info
  title text NOT NULL,
  description text,
  excerpt text,
  
  -- Client & Category
  client_name text,
  category text,
  project_type text,
  industry text,
  
  -- Media
  featured_image text,
  featured_image_alt text,
  thumbnail text,
  gallery_images text[] DEFAULT ARRAY[]::text[],
  video_url text,
  
  -- Project details
  challenge text,
  solution text,
  results text,
  technologies text[] DEFAULT ARRAY[]::text[],
  tags text[] DEFAULT ARRAY[]::text[],
  
  -- Links
  live_url text,
  case_study_url text,
  github_url text,
  
  -- Metrics
  completion_date date,
  duration_weeks integer,
  team_size integer,
  
  -- Status & visibility
  published boolean DEFAULT false,
  featured boolean DEFAULT false,
  status text DEFAULT 'completed',
  
  -- SEO
  meta_title text,
  meta_description text,
  
  -- Stats
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- STEP 3: Create indexes for better performance
CREATE INDEX idx_portfolio_projects_slug ON public.portfolio_projects(slug);
CREATE INDEX idx_portfolio_projects_published ON public.portfolio_projects(published);
CREATE INDEX idx_portfolio_projects_featured ON public.portfolio_projects(featured);
CREATE INDEX idx_portfolio_projects_category ON public.portfolio_projects(category);
CREATE INDEX idx_portfolio_projects_status ON public.portfolio_projects(status);
CREATE INDEX idx_portfolio_projects_tags ON public.portfolio_projects USING GIN(tags);
CREATE INDEX idx_portfolio_projects_created_at ON public.portfolio_projects(created_at DESC);

-- STEP 4: Create trigger for auto-updating timestamp
CREATE OR REPLACE FUNCTION public.update_portfolio_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER portfolio_projects_updated_at_trigger
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_portfolio_projects_updated_at();

-- STEP 5: Enable Row Level Security
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- STEP 6: Create security policies

-- Public can read published projects
CREATE POLICY "Public can read published portfolio projects"
  ON public.portfolio_projects
  FOR SELECT
  USING (published = true);

-- Authenticated users can read all projects
CREATE POLICY "Authenticated users can read all portfolio projects"
  ON public.portfolio_projects
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert projects
CREATE POLICY "Authenticated users can insert portfolio projects"
  ON public.portfolio_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update projects
CREATE POLICY "Authenticated users can update portfolio projects"
  ON public.portfolio_projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete projects
CREATE POLICY "Authenticated users can delete portfolio projects"
  ON public.portfolio_projects
  FOR DELETE
  TO authenticated
  USING (true);

-- STEP 7: Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.portfolio_projects TO anon;
GRANT ALL ON public.portfolio_projects TO authenticated;

-- STEP 8: Insert 5 sample portfolio projects
INSERT INTO public.portfolio_projects (
  slug,
  title,
  description,
  excerpt,
  client_name,
  category,
  project_type,
  industry,
  featured_image,
  featured_image_alt,
  thumbnail,
  gallery_images,
  challenge,
  solution,
  results,
  technologies,
  tags,
  live_url,
  completion_date,
  duration_weeks,
  team_size,
  published,
  featured,
  status,
  view_count,
  like_count
) VALUES

-- Project 1: E-commerce Platform
(
  'modern-ecommerce-platform',
  'Modern E-commerce Platform',
  'A complete redesign of an e-commerce platform that increased conversion rates by 45% and reduced cart abandonment by 30%.',
  'Complete e-commerce redesign with 45% conversion increase',
  'ShopFlow Inc',
  'Web Design',
  'Website',
  'E-commerce',
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=630&fit=crop',
  'Modern e-commerce interface',
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&h=600&fit=crop'
  ],
  'High cart abandonment rate, outdated design, poor mobile experience, and complex checkout process were hurting conversions.',
  'Redesigned the entire user journey with focus on mobile-first design, simplified checkout flow, better product discovery, and trust signals.',
  '45% increase in conversion rate, 30% reduction in cart abandonment, 60% faster checkout process, 4.8/5 customer satisfaction score.',
  ARRAY['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'Shopify'],
  ARRAY['e-commerce', 'web design', 'UX', 'conversion optimization'],
  'https://shopflow-demo.example.com',
  '2024-12-15',
  12,
  4,
  true,
  true,
  'completed',
  2450,
  128
),

-- Project 2: Mobile Banking App
(
  'mobile-banking-app-redesign',
  'Mobile Banking App Redesign',
  'Complete redesign of a mobile banking app focusing on security, accessibility, and user experience.',
  'Banking app redesign with enhanced security and UX',
  'FinTech Solutions',
  'Mobile App',
  'App',
  'Finance',
  'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=630&fit=crop',
  'Mobile banking app interface',
  'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop'
  ],
  'Users found the app difficult to navigate, security features were confusing, and accessibility was poor.',
  'Created intuitive navigation, clear security indicators, voice-over support, and streamlined common tasks like transfers and bill payments.',
  '4.7 App Store rating (up from 3.2), 80% increase in daily active users, 95% WCAG 2.1 AA compliance.',
  ARRAY['React Native', 'TypeScript', 'Biometric Auth', 'Plaid API'],
  ARRAY['mobile design', 'fintech', 'accessibility', 'security'],
  'https://apps.apple.com/fintech-demo',
  '2025-01-20',
  16,
  6,
  true,
  true,
  'completed',
  1890,
  95
),

-- Project 3: SaaS Dashboard
(
  'analytics-dashboard-saas',
  'Analytics Dashboard for SaaS',
  'Data visualization dashboard helping teams make better decisions with real-time insights and custom reporting.',
  'Real-time analytics dashboard with custom reporting',
  'DataViz Pro',
  'Dashboard',
  'Web App',
  'SaaS',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
  'Analytics dashboard interface',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
  ],
  'Customers needed better data visualization, customizable reports, and real-time updates without overwhelming complexity.',
  'Built an intuitive dashboard with drag-and-drop widgets, real-time data streaming, export capabilities, and role-based access control.',
  '70% faster report generation, 90% user satisfaction, 3x increase in paid plan conversions.',
  ARRAY['React', 'D3.js', 'WebSocket', 'PostgreSQL', 'Redis'],
  ARRAY['dashboard', 'data visualization', 'SaaS', 'real-time'],
  'https://dataviz-demo.example.com',
  '2024-11-30',
  10,
  3,
  true,
  false,
  'completed',
  1320,
  67
),

-- Project 4: Brand Identity & Website
(
  'sustainable-fashion-brand',
  'Sustainable Fashion Brand Identity',
  'Complete brand identity and e-commerce website for an eco-friendly fashion startup.',
  'Brand identity and website for sustainable fashion',
  'EcoThread',
  'Branding',
  'Brand + Web',
  'Fashion',
  'https://images.unsplash.com/photo-1558769132-cb1aea47c9fd?w=1200&h=630&fit=crop',
  'Sustainable fashion brand website',
  'https://images.unsplash.com/photo-1558769132-cb1aea47c9fd?w=400&h=300&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1558769132-cb1aea47c9fd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800&h=600&fit=crop'
  ],
  'New brand needed complete visual identity and online presence to compete in sustainable fashion market.',
  'Developed eco-inspired brand identity, sustainable storytelling, e-commerce platform, and content strategy.',
  'Successfully launched to 10k followers in first month, featured in Vogue, 250+ sales in launch week.',
  ARRAY['Figma', 'Next.js', 'Shopify', 'Tailwind CSS'],
  ARRAY['branding', 'fashion', 'e-commerce', 'sustainability'],
  'https://ecothread.example.com',
  '2024-10-12',
  8,
  2,
  true,
  false,
  'completed',
  980,
  54
),

-- Project 5: Healthcare Portal
(
  'patient-portal-healthcare',
  'Patient Portal for Healthcare Provider',
  'Secure patient portal enabling appointment scheduling, medical records access, and telehealth consultations.',
  'HIPAA-compliant patient portal with telehealth',
  'HealthFirst Medical',
  'Web App',
  'Portal',
  'Healthcare',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=630&fit=crop',
  'Healthcare patient portal',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
  ARRAY[
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&h=600&fit=crop'
  ],
  'Patients needed easy access to records, appointment scheduling, and telehealth without compromising HIPAA compliance.',
  'Built secure portal with two-factor authentication, encrypted communications, intuitive scheduling, and video consultations.',
  'Reduced phone calls by 65%, 92% patient satisfaction, HIPAA compliant, 50% increase in telehealth adoption.',
  ARRAY['React', 'Node.js', 'WebRTC', 'PostgreSQL', 'AWS'],
  ARRAY['healthcare', 'HIPAA', 'telehealth', 'portal'],
  null,
  '2025-02-28',
  20,
  8,
  true,
  false,
  'completed',
  750,
  41
);

-- ================================================================
-- SETUP COMPLETE! 
-- You should now have:
-- ✅ portfolio_projects table created
-- ✅ 5 sample projects inserted
-- ✅ All indexes and security policies set up
-- ================================================================
