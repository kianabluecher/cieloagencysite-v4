import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
import posthog from 'posthog-js';
import { PostHogProvider } from '@posthog/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SEOHead, SEO_CONFIG } from './components/SEOHead';
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Jobs } from './components/pages/Jobs';
import { JobDetail } from './components/pages/JobDetail';
import { Apply } from './components/pages/Apply';
import { BrandWeb } from './components/pages/BrandWeb';
import { BrandWebPricing } from './components/pages/BrandWebPricing';
import { SocialMedia } from './components/pages/SocialMedia';
import { SmStart } from './components/pages/SmStart';
import { BrandManagement } from './components/pages/BrandManagement';
import { Consulting } from './components/pages/Consulting';
import { Marketing } from './components/pages/Marketing';
import { PRMedia } from './components/pages/PRMedia';
import { LeadGen } from './components/pages/LeadGen';
import { InfluencerMarketing } from './components/pages/InfluencerMarketing';
import { PrintCollateral } from './components/pages/PrintCollateral';
import { VideoMotion } from './components/pages/VideoMotion';
import { VideoAndPhoto } from './components/pages/VideoAndPhoto';
import { Photography } from './components/pages/Photography';
import { PackagingDesign } from './components/pages/PackagingDesign';
import { CGICampaigns } from './components/pages/CGICampaigns';
import { AIContent } from './components/pages/AIContent';
import { EventBranding } from './components/pages/EventBranding';
import { EmailMarketing } from './components/pages/EmailMarketing';
import { CreativeDirection } from './components/pages/CreativeDirection';
import { SeoGeo } from './components/pages/SeoGeo';
import { AdCreatives } from './components/pages/AdCreatives';
import { RapidDelivery } from './components/pages/RapidDelivery';
import { Moodboard2 } from './components/pages/Moodboard2';
import { DesignSubscription } from './components/pages/DesignSubscription';
import { VoidStrategy } from './components/pages/VoidStrategy';
import { Inquiry } from './components/pages/Inquiry';
import { Quote } from './components/pages/Quote';
import { PricingDownload } from './components/pages/PricingDownload';
import { Signup } from './components/pages/Signup';
import { Blog } from './components/pages/Blog';
import { BlogDetail } from './components/pages/BlogDetail';
import { BlogSetup } from './components/pages/BlogSetup';
import { Portfolio } from './components/pages/Portfolio';
import { Portfolio2 } from './components/pages/Portfolio2';
import { PortfolioEmbed } from './components/pages/PortfolioEmbed';
import { PortfolioDetail } from './components/pages/PortfolioDetail';
import { Ventures } from './components/pages/Ventures';
import { Development } from './components/pages/Development';
import { DevelopmentNew } from './components/pages/DevelopmentNew';
import { MarketingNew } from './components/pages/MarketingNew';
import { Outbound } from './components/pages/Outbound';
import { MarketingCollateral } from './components/pages/MarketingCollateral';
import { InfluencerEventMarketing } from './components/pages/InfluencerEventMarketing';
import { BrandDesign } from './components/pages/BrandDesign';
import { Strategy } from './components/pages/Strategy';
import { Animation3D } from './components/pages/Animation3D';
import { AIOperations } from './components/pages/AIOperations';
import { AdsCreatives } from './components/pages/AdsCreatives';
import { PitchDeckDesign } from './components/pages/PitchDeckDesign';
import { AIBusinessIntelligence } from './components/pages/AIBusinessIntelligence';
import { PortfolioAdmin } from './components/pages/PortfolioAdmin';
import { PortfolioImageUpdate } from './components/pages/PortfolioImageUpdate';
import { PortfolioImagesFix } from './components/pages/PortfolioImagesFix';
import { PortfolioSubmissionsAdmin } from './components/pages/PortfolioSubmissionsAdmin';
import { NotionSync } from './components/pages/NotionSync';
import { BrandAudit } from './components/pages/BrandAudit';
import { BrandAuditLanding } from './components/pages/BrandAuditLanding';
import { BrandAuditOffer } from './components/pages/BrandAuditOffer';
import { BrandAuditStrategy } from './components/pages/BrandAuditStrategy';
import { FreebieGPT } from './components/pages/FreebieGPT';
import { AgencySkills } from './components/pages/AgencySkills';
import { AgencySkillsThankYou } from './components/pages/AgencySkillsThankYou';
import { Discovery } from './components/pages/Discovery';
import { DiscoveryTest } from './components/pages/DiscoveryTest';
import { DiscoveryLanding } from './components/pages/DiscoveryLanding';
import { TeamLogin } from './components/pages/TeamLogin';
import { TeamDashboardSidebar } from './components/pages/TeamDashboardSidebar';
import { UserManagement } from './components/pages/UserManagement';
import { JobsAdmin } from './components/pages/JobsAdmin';
import { BrandGuidelines } from './components/pages/BrandGuidelines';
import { LetsTalk } from './components/pages/LetsTalk';
import { Offer } from './components/pages/Offer';
import { BWOffer } from './components/pages/BWOffer';
import { Offer2026 } from './components/pages/Offer2026';
import { OfferSEO } from './components/pages/OfferSEO';
import { OfferWebDev } from './components/pages/OfferWebDev';
import { OfferLaunch } from './components/pages/OfferLaunch';
import { Launch } from './components/pages/Launch';
import { Intro } from './components/pages/Intro';
import { RequestProposal } from './components/pages/RequestProposal';
import { Pricing } from './components/pages/Pricing';
import { CieloHub } from './components/pages/CieloHub';
import { GoogleSheetsCallback } from './components/pages/GoogleSheetsCallback';
import { GoogleSheetsTest } from './components/pages/GoogleSheetsTest';
import { TestGoogleAuth } from './components/pages/TestGoogleAuth';
import { CreateTestUser } from './components/pages/CreateTestUser';
import { EdgeFunctionDiagnostic } from './components/EdgeFunctionDiagnostic';
import { Gallery } from './components/pages/Gallery';
import { InvestorBranding } from './components/pages/InvestorBranding';
import { SaaSBranding } from './components/pages/SaaSBranding';
import { AIPhotography } from './components/pages/AIPhotography';
import { AIContentCreation } from './components/pages/AIContentCreation';
import { AIConsulting } from './components/pages/AIConsulting';
import { ReputationManagement } from './components/pages/ReputationManagement';
import { FintechBranding } from './components/pages/FintechBranding';
import { HealthcareBranding } from './components/pages/HealthcareBranding';
import { RealEstateBranding } from './components/pages/RealEstateBranding';
import { CryptoWeb3Branding } from './components/pages/CryptoWeb3Branding';
import { PodcastBranding } from './components/pages/PodcastBranding';
import { RealEstateAgentBranding } from './components/pages/RealEstateAgentBranding';
import { RestaurantBranding } from './components/pages/RestaurantBranding';
import { OnlineCoachingBranding } from './components/pages/OnlineCoachingBranding';
import { LegalServicesBranding } from './components/pages/LegalServicesBranding';
import { SmallBusinessBranding } from './components/pages/SmallBusinessBranding';
import { ProfessionalWebsiteDesign } from './components/pages/ProfessionalWebsiteDesign';
import { LandingPageConversion } from './components/pages/LandingPageConversion';
import { EcommerceWebsiteDesign } from './components/pages/EcommerceWebsiteDesign';
import { WordPressWebsiteDesign } from './components/pages/WordPressWebsiteDesign';
import { DigitalMarketingSmallBusiness } from './components/pages/DigitalMarketingSmallBusiness';
import { SocialMediaMarketingAgency } from './components/pages/SocialMediaMarketingAgency';
import { SEOServices } from './components/pages/SEOServices';
import { ContentMarketingServices } from './components/pages/ContentMarketingServices';
import { CopywritingServices } from './components/pages/CopywritingServices';
import { VideoProductionServices } from './components/pages/VideoProductionServices';
import { GraphicDesignServices } from './components/pages/GraphicDesignServices';
import { RebrandingServices } from './components/pages/RebrandingServices';
import { StartupBranding } from './components/pages/StartupBranding';
import { EmailMarketingAutomation } from './components/pages/EmailMarketingAutomation';
import { GoogleAdsManagement } from './components/pages/GoogleAdsManagement';
import { BrandStrategyConsultant } from './components/pages/BrandStrategyConsultant';
import { InfluencerMarketingAgency } from './components/pages/InfluencerMarketingAgency';
import { BusinessConsulting } from './components/pages/BusinessConsulting';
import { LogoDesignServices } from './components/pages/LogoDesignServices';
import { MultiStrategyHedgeFund } from './components/pages/MultiStrategyHedgeFund';
import { LongShortMarketNeutral } from './components/pages/LongShortMarketNeutral';
import { FundOfFundsPlatform } from './components/pages/FundOfFundsPlatform';
import { FamilyOfficeBrandingAgency } from './components/pages/FamilyOfficeBrandingAgency';
import { HedgeFundReputationManagement } from './components/pages/HedgeFundReputationManagement';
import { FamilyOfficeWebDesign } from './components/pages/FamilyOfficeWebDesign';
import { PitchDeckPPMDesign } from './components/pages/PitchDeckPPMDesign';
import { AIDesignBranding } from './components/pages/AIDesignBranding';
import { MiamiSEOServices } from './components/pages/MiamiSEOServices';
import { FintechBrandStrategyMiami } from './components/pages/FintechBrandStrategyMiami';
import { BrandReputationManagementSouthFlorida } from './components/pages/BrandReputationManagementSouthFlorida';
import { LandingSocialMedia } from './components/pages/LandingSocialMedia';
import { PinterestRSSFeed } from './components/pages/PinterestRSSFeed';
import { PortfolioManagementPublic } from './components/pages/PortfolioManagementPublic';
import { Onboarding } from './components/pages/Onboarding';
import { ExternalRedirect } from './components/ExternalRedirect';
import { Sitemap } from './components/pages/Sitemap';
import { RobotsTxt } from './components/pages/RobotsTxt';
import { SEOTestPage } from './components/pages/SEOTestPage';
import { ImageDownload } from './components/pages/ImageDownload';

// Wrapper component that provides navigation handler
function PageWrapper({ children }: { children: (handleNavigate: (page: string, projectId?: string) => void) => React.ReactNode } | { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }, [location.pathname]);

  // Navigation handler that converts old page names to new routes
  const handleNavigate = useCallback((page: string, projectId?: string) => {
    const routeMap: Record<string, string> = {
      'home': '/',
      'about': '/About',
      'portfolio': '/Portfolio',
      'portfolio2': '/portfolio2',
      'portfolio-detail': projectId ? `/portfolio/${projectId}` : '/Portfolio',
      'portfolio-admin': '/portfolio-admin',
      'portfolio-image-update': '/portfolio-image-update',
      'portfolio-images-fix': '/portfolio-images-fix',
      'portfolio-submissions': '/portfolio-submissions',
      'notion-sync': '/notion-sync',
      'brand-audit': '/brand-audit',
      'brand-web': '/brand-web',
      'bw-pricing': '/bw-pricing',
      'social-media': '/social-media',
      'brand-management': '/brand-management',
      'ventures': '/Ventures',
      'development': '/development',
      'consulting': '/Consulting',
      'marketing': '/marketing',
      'outbound': '/outbound',
      'marketing-collateral': '/marketing-collateral',
      'influencer-event-marketing': '/influencer-event-marketing',
      'brand-design': '/brand-design',
      'strategy': '/strategy',
      'animation-3d': '/animation-3d',
      'pr-media': '/pr-media',
      'lead-gen': '/lead-gen',
      'influencer-marketing': '/influencer-marketing',
      'print-collateral': '/print-collateral',
      'video-motion': '/video-motion',
      'video-photo': '/video-photo',
      'photography': '/photography',
      'packaging-design': '/packaging-design',
      'cgi-campaigns': '/cgi-campaigns',
      'ai-content': '/ai-content',
      'event-branding': '/event-branding',
      'email-marketing': '/email-marketing',
      'creative-direction': '/creative-direction',
      'seo-geo': '/seo-geo',
      'ad-creatives': '/ad-creatives',
      'rapid-delivery': '/rapid-delivery',
      'moodboard2': '/moodboard2',
      'void-strategy': '/void-strategy',
      'inquiry': '/Inquiry',
      'quote': '/quote',
      'signup': '/signup',
      'discovery': '/discovery',
      'audit': '/audit',
      'blog': '/Blog',
      'blog-detail': projectId ? `/blog/${projectId}` : '/Blog',
      'team-login': '/team-login',
      'team-dashboard': '/dashboard',
      'user-management': '/dashboard/users',
      'jobs': '/Jobs',
      'jobs-admin': '/dashboard/jobs',
      'apply': '/apply',
      'design-subscription': '/design-subscription',
      'brand-guidelines': '/brand-guidelines',
      'lets-talk': '/lets-talk',
      'offer': '/offer',
      'bw-offer': '/bw-offer',
      'offer-2026': '/offer-2026',
      'offer-seo': '/offer-seo',
      'offer-webdev': '/offer-webdev',
      'offer-launch': '/offer-launch',
      'launch': '/launch',
      'rfp': '/rfp',
      'pricing': '/pricing',
      'cielo-hub': '/cielo-hub',
      'gallery': '/gallery',
      'investor-branding': '/investor-branding',
      'saas-branding': '/saas-branding',
      'pitch-deck-design': '/pitch-deck-design',
      'ai-photography': '/ai-photography',
      'ai-content-creation': '/ai-content-creation',
      'ai-consulting': '/ai-consulting',
      'ai-operations': '/ai-operations',
      'ads-creatives': '/ads-creatives',
      'ai-business-intelligence': '/ai-business-intelligence',
      'reputation-management': '/reputation-management',
      'fintech-branding': '/fintech-branding',
      'healthcare-branding': '/healthcare-branding',
      'real-estate-branding': '/real-estate-branding',
      'crypto-web3-branding': '/crypto-web3-branding',
      'podcast-branding': '/podcast-branding-monetization',
      'real-estate-agent-branding': '/real-estate-agent-branding',
      'restaurant-branding': '/restaurant-branding-menu-design',
      'online-coaching-branding': '/online-coaching-branding',
      'legal-services-branding': '/legal-services-branding',
      'small-business-branding': '/small-business-branding',
      'professional-website-design': '/professional-website-design',
      'landing-page-conversion': '/landing-page-conversion',
      'ecommerce-website-design': '/ecommerce-website-design',
      'wordpress-website-design': '/wordpress-website-design',
      'digital-marketing-small-business': '/digital-marketing-small-business',
      'social-media-marketing-agency': '/social-media-marketing-agency',
      'seo-services': '/seo-services',
      'content-marketing-services': '/content-marketing-services',
      'copywriting-services': '/copywriting-services',
      'video-production-services': '/video-production-services',
      'graphic-design-services': '/graphic-design-services',
      'rebranding-services': '/rebranding-services',
      'startup-branding': '/startup-branding',
      'email-marketing-automation': '/email-marketing-automation',
      'google-ads-management': '/google-ads-management',
      'brand-strategy-consultant': '/brand-strategy-consultant',
      'influencer-marketing-agency': '/influencer-marketing-agency',
      'business-consulting': '/business-consulting',
      'logo-design-services': '/logo-design-services',
      'multi-strategy-hedge-fund': '/multi-strategy-hedge-fund',
      'long-short-market-neutral': '/long-short-market-neutral',
      'fund-of-funds-platform': '/fund-of-funds-platform',
      'family-office-branding-agency': '/family-office-branding-agency',
      'hedge-fund-reputation-management': '/hedge-fund-reputation-management',
      'family-office-web-design': '/family-office-web-design',
      'pitch-deck-ppm-design': '/pitch-deck-ppm-design',
      'ai-design-branding': '/ai-design-branding',
      'miami-seo-services': '/miami-seo-services',
      'fintech-brand-strategy-miami': '/fintech-brand-strategy-miami',
      'brand-reputation-management-south-florida': '/brand-reputation-management-south-florida',
      'landing-sm': '/landing-sm',
    };

    // Handle job detail pages dynamically (job-sample-1, job-sample-2, etc.)
    if (page.startsWith('job-')) {
      // Remove 'job-' prefix and navigate to /job/{id}
      const jobId = page.replace('job-', '');
      navigate(`/job/${jobId}`);
      return;
    }

    const route = routeMap[page] || '/';
    navigate(route);
  }, [navigate]);

  return <>{typeof children === 'function' ? children(handleNavigate) : children}</>;
}

// Main app content component
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect if we're on admin subdomain
  const isAdminSubdomain = typeof window !== 'undefined' && 
    (window.location.hostname === 'admin.cielo.agency' || 
     window.location.hostname.startsWith('admin.'));

  // Redirect admin subdomain root to dashboard
  useEffect(() => {
    if (isAdminSubdomain && location.pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
  }, [isAdminSubdomain, location.pathname, navigate]);

  // Determine which pages should hide header/footer
  const hideHeaderFooter = [
    '/portfolio-admin',
    '/portfolio-manage-e8f9a2c1',
    '/portfolio-image-update',
    '/portfolio-images-fix',
    '/portfolio-submissions',
    '/notion-sync',
    '/discovery',
    '/audit',
    '/brand-audit',
    '/lp-brandaudit',
    '/lp-brandaudit-offer',
    '/lp-brandaudit-strategy',
    '/freebie-gpt',
    '/agency-skills',
    '/agency-skills-thank-you',
    '/team-login',
    '/brand-guidelines',
    '/apply',
    '/onboarding',
    '/offer',
    '/bw-offer',
    '/offer-2026',
    '/offer-seo',
    '/offer-webdev',
    '/offer-launch',
    '/launch',
    '/intro',
    '/pricing',
    '/quote',
    '/signup',
  ].some(path => location.pathname === path) || 
    location.pathname.startsWith('/dashboard');

  const hideOnlyHeader = location.pathname.startsWith('/portfolio/') || 
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/Blog') ||
    location.pathname.startsWith('/job/');

  // Hide footer on blog pages (they have their own footer)
  const hideFooter = hideHeaderFooter || 
    location.pathname.startsWith('/blog') ||
    location.pathname.startsWith('/Blog');

  // List of sub-service pages
  const subServicePages = [
    '/brand-web',
    '/social-media',
    '/brand-management',
    '/pr-media',
    '/lead-gen',
    '/influencer-marketing',
    '/print-collateral',
    '/video-motion',
    '/video-photo',
    '/photography',
    '/packaging-design',
    '/cgi-campaigns',
    '/ai-content',
    '/event-branding',
    '/email-marketing',
    '/creative-direction',
    '/seo-geo',
    '/ad-creatives',
    '/rapid-delivery',
    '/moodboard2',
  ];

  const isSubServicePage = subServicePages.includes(location.pathname);

  // Check if current page is Portfolio2 (the iframe version at /portfolio2)
  const isPortfolio2Page = location.pathname === '/portfolio2';

  // Check if current page is Rapid Delivery (moodboard)
  const isRapidDeliveryPage = location.pathname === '/rapid-delivery';

  // Get current page key for SEO
  const getCurrentPageKey = (): string => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/About') return 'about';
    if (path === '/Portfolio') return 'portfolio';
    if (path === '/brand-management') return 'brand-management';
    if (path === '/social-media') return 'social-media';
    if (path === '/Development') return 'development';
    if (path === '/Marketing') return 'marketing';
    if (path === '/seo-geo') return 'seo-geo';
    if (path === '/Consulting') return 'consulting';
    if (path === '/Ventures') return 'ventures';
    if (path === '/Jobs') return 'jobs';
    if (path === '/Inquiry') return 'inquiry';
    return 'home';
  };

  // Get SEO configuration based on current page
  const getSEOConfig = () => {
    const pageMap: Record<string, keyof typeof SEO_CONFIG> = {
      'home': 'home',
      'about': 'about',
      'portfolio': 'portfolio',
      'brand-management': 'brandManagement',
      'social-media': 'socialMedia',
      'development': 'development',
      'marketing': 'marketing',
      'seo-geo': 'seoGeo',
      'void-strategy': 'voidStrategy',
      'consulting': 'consulting',
      'ventures': 'ventures',
      'jobs': 'jobs',
      'inquiry': 'inquiry',
    };

    const configKey = pageMap[getCurrentPageKey()];
    return configKey ? SEO_CONFIG[configKey] : SEO_CONFIG.home;
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* SEO Meta Tags */}
      <SEOHead {...getSEOConfig()} />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#18181b',
            border: '1px solid #27272a',
            color: '#fafafa',
            fontFamily: 'Inter, system-ui, sans-serif',
          },
          className: 'sonner-toast',
        }}
        theme="dark"
      />

      {!hideHeaderFooter && !hideOnlyHeader && (
        <PageWrapper>
          {(handleNavigate) => (
            <Header
              currentPage={getCurrentPageKey()}
              onNavigate={handleNavigate}
              isSubServicePage={isSubServicePage}
              isLightTheme={isPortfolio2Page}
              isGreyTheme={isRapidDeliveryPage}
              customScrollThreshold={location.pathname === '/About' ? window.innerHeight * 3 : 50}
            />
          )}
        </PageWrapper>
      )}

      <Routes>
        {/* Redirects */}
        <Route path="/portfolio-collections/ourwork" element={<Navigate to="/Portfolio" replace />} />
        <Route path="/smm-onboarding" element={<ExternalRedirect to="https://try.cielo.agency/smm-onboarding" />} />
        <Route path="/booking-calendar/discovery-call" element={<ExternalRedirect to="https://app.apollo.io/#/meet/managed-meetings/cieloagency/r7h-tyg-3bs/cielo-discovery" />} />
        <Route path="/talk" element={<ExternalRedirect to="https://app.apollo.io/#/meet/cieloagency/discovery" />} />

        {/* Main Pages */}
        <Route path="/" element={<PageWrapper>{(nav) => <Home onNavigate={nav} />}</PageWrapper>} />
        <Route path="/About" element={<PageWrapper>{(nav) => <About onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Portfolio" element={<PageWrapper>{(nav) => <PortfolioEmbed onNavigate={nav} />}</PageWrapper>} />
        <Route path="/portfolio2" element={<PageWrapper>{(nav) => <Portfolio2 onNavigate={nav} />}</PageWrapper>} />
        <Route path="/portfolio/:projectId" element={<PageWrapper>{(nav) => <PortfolioDetail projectId="" onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Ventures" element={<PageWrapper>{(nav) => <Ventures onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Development" element={<PageWrapper>{(nav) => <DevelopmentNew onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Marketing" element={<PageWrapper>{(nav) => <MarketingNew onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Outbound" element={<PageWrapper>{(nav) => <Outbound onNavigate={nav} />}</PageWrapper>} />
        <Route path="/marketing-collateral" element={<PageWrapper>{(nav) => <MarketingCollateral onNavigate={nav} />}</PageWrapper>} />
        <Route path="/influencer-event-marketing" element={<PageWrapper>{(nav) => <InfluencerEventMarketing onNavigate={nav} />}</PageWrapper>} />
        <Route path="/brand-design" element={<PageWrapper>{(nav) => <BrandDesign onNavigate={nav} />}</PageWrapper>} />
        <Route path="/strategy" element={<PageWrapper>{(nav) => <Strategy onNavigate={nav} />}</PageWrapper>} />
        <Route path="/animation-3d" element={<PageWrapper>{(nav) => <Animation3D onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Jobs" element={<PageWrapper>{(nav) => <Jobs onNavigate={nav} />}</PageWrapper>} />
        <Route path="/job/:jobId" element={<PageWrapper>{(nav) => <JobDetail jobId="" onNavigate={nav} />}</PageWrapper>} />
        <Route path="/apply" element={<PageWrapper>{(nav) => <Apply onNavigate={nav} />}</PageWrapper>} />

        {/* Services */}
        <Route path="/brand-web" element={<PageWrapper>{(nav) => <BrandWeb onNavigate={nav} />}</PageWrapper>} />
        <Route path="/bw-pricing" element={<PageWrapper>{(nav) => <BrandWebPricing onNavigate={nav} />}</PageWrapper>} />
        <Route path="/social-media" element={<PageWrapper>{(nav) => <SocialMedia onNavigate={nav} />}</PageWrapper>} />
        <Route path="/sm-start" element={<PageWrapper>{(nav) => <SmStart onNavigate={nav} />}</PageWrapper>} />
        <Route path="/brand-management" element={<PageWrapper>{(nav) => <BrandManagement onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Consulting" element={<PageWrapper>{(nav) => <Consulting onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Marketing" element={<PageWrapper>{(nav) => <Marketing onNavigate={nav} />}</PageWrapper>} />

        {/* Sub-Services */}
        <Route path="/pr-media" element={<PageWrapper>{(nav) => <PRMedia onNavigate={nav} />}</PageWrapper>} />
        <Route path="/lead-gen" element={<PageWrapper>{(nav) => <LeadGen onNavigate={nav} />}</PageWrapper>} />
        <Route path="/influencer-marketing" element={<PageWrapper>{(nav) => <InfluencerMarketing onNavigate={nav} />}</PageWrapper>} />
        <Route path="/print-collateral" element={<PageWrapper>{(nav) => <PrintCollateral onNavigate={nav} />}</PageWrapper>} />
        <Route path="/video-motion" element={<PageWrapper>{(nav) => <VideoMotion onNavigate={nav} />}</PageWrapper>} />
        <Route path="/video-photo" element={<PageWrapper>{(nav) => <VideoAndPhoto onNavigate={nav} />}</PageWrapper>} />
        <Route path="/photography" element={<PageWrapper>{(nav) => <Photography onNavigate={nav} />}</PageWrapper>} />
        <Route path="/packaging-design" element={<PageWrapper>{(nav) => <PackagingDesign onNavigate={nav} />}</PageWrapper>} />
        <Route path="/cgi-campaigns" element={<PageWrapper>{(nav) => <CGICampaigns onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ai-content" element={<PageWrapper>{(nav) => <AIContent onNavigate={nav} />}</PageWrapper>} />
        <Route path="/event-branding" element={<PageWrapper>{(nav) => <EventBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/email-marketing" element={<PageWrapper>{(nav) => <EmailMarketing onNavigate={nav} />}</PageWrapper>} />
        <Route path="/creative-direction" element={<PageWrapper>{(nav) => <CreativeDirection onNavigate={nav} />}</PageWrapper>} />
        <Route path="/seo-geo" element={<PageWrapper>{(nav) => <SeoGeo onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ad-creatives" element={<PageWrapper>{(nav) => <AdCreatives onNavigate={nav} />}</PageWrapper>} />
        <Route path="/rapid-delivery" element={<PageWrapper>{(nav) => <RapidDelivery onNavigate={nav} />}</PageWrapper>} />
        <Route path="/moodboard2" element={<PageWrapper>{(nav) => <Moodboard2 onNavigate={nav} />}</PageWrapper>} />
        <Route path="/design-subscription" element={<PageWrapper>{(nav) => <DesignSubscription onNavigate={nav} />}</PageWrapper>} />
        <Route path="/void-strategy" element={<PageWrapper>{(nav) => <VoidStrategy onNavigate={nav} />}</PageWrapper>} />

        {/* Other Pages */}
        <Route path="/Inquiry" element={<PageWrapper>{(nav) => <Inquiry onNavigate={nav} />}</PageWrapper>} />
        <Route path="/quote" element={<PageWrapper>{(nav) => <PricingDownload onNavigate={nav} />}</PageWrapper>} />
        <Route path="/signup" element={<PageWrapper>{(nav) => <Signup onNavigate={nav} />}</PageWrapper>} />
        <Route path="/Blog" element={<PageWrapper>{(nav) => <Blog onNavigate={nav} />}</PageWrapper>} />
        <Route path="/blog/:slug" element={<PageWrapper>{(nav) => <BlogDetail onNavigate={nav} />}</PageWrapper>} />
        <Route path="/blog-setup" element={<PageWrapper>{(nav) => <BlogSetup onNavigate={nav} />}</PageWrapper>} />

        {/* Admin Pages */}
        <Route path="/portfolio-admin" element={<PageWrapper>{(nav) => <PortfolioAdmin onNavigate={nav} />}</PageWrapper>} />
        <Route path="/portfolio-manage-e8f9a2c1" element={<PortfolioManagementPublic />} />
        <Route path="/portfolio-image-update" element={<PageWrapper>{(nav) => <PortfolioImageUpdate onNavigate={nav} />}</PageWrapper>} />
        <Route path="/portfolio-images-fix" element={<PageWrapper>{(nav) => <PortfolioImagesFix />}</PageWrapper>} />
        <Route path="/portfolio-submissions" element={<PageWrapper>{(nav) => <PortfolioSubmissionsAdmin onNavigate={nav} />}</PageWrapper>} />
        <Route path="/notion-sync" element={<PageWrapper>{(nav) => <NotionSync onNavigate={nav} />}</PageWrapper>} />
        <Route path="/brand-audit" element={<PageWrapper>{(nav) => <BrandAudit onNavigate={nav} />}</PageWrapper>} />
        <Route path="/lp-brandaudit" element={<PageWrapper>{(nav) => <BrandAuditLanding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/lp-brandaudit-offer" element={<PageWrapper>{(nav) => <BrandAuditOffer onNavigate={nav} />}</PageWrapper>} />
        <Route path="/lp-brandaudit-strategy" element={<PageWrapper>{(nav) => <BrandAuditStrategy onNavigate={nav} />}</PageWrapper>} />
        <Route path="/freebie-gpt" element={<PageWrapper>{(nav) => <FreebieGPT onNavigate={nav} />}</PageWrapper>} />
        <Route path="/agency-skills" element={<PageWrapper>{(nav) => <AgencySkills onNavigate={nav} />}</PageWrapper>} />
        <Route path="/agency-skills-thank-you" element={<PageWrapper>{(nav) => <AgencySkillsThankYou onNavigate={nav} />}</PageWrapper>} />
        <Route path="/discovery" element={<PageWrapper>{(nav) => <Discovery onNavigate={nav} />}</PageWrapper>} />
        <Route path="/discovery-test" element={<PageWrapper>{(nav) => <DiscoveryTest onNavigate={nav} />}</PageWrapper>} />
        <Route path="/audit" element={<PageWrapper>{(nav) => <DiscoveryLanding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/team-login" element={<PageWrapper>{(nav) => <TeamLogin key="team-login" onNavigate={nav} />}</PageWrapper>} />
        <Route path="/dashboard/*" element={<PageWrapper>{(nav) => <TeamDashboardSidebar onNavigate={nav} />}</PageWrapper>} />
        <Route path="/team-dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/user-management" element={<Navigate to="/dashboard/users" replace />} />
        <Route path="/jobs-admin" element={<Navigate to="/dashboard/jobs" replace />} />
        <Route path="/brand-guidelines" element={<PageWrapper>{(nav) => <BrandGuidelines onNavigate={nav} />}</PageWrapper>} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/lets-talk" element={<PageWrapper>{(nav) => <LetsTalk onNavigate={nav} />}</PageWrapper>} />
        <Route path="/offer" element={<PageWrapper>{(nav) => <Offer onNavigate={nav} />}</PageWrapper>} />
        <Route path="/bw-offer" element={<PageWrapper>{(nav) => <BWOffer onNavigate={nav} />}</PageWrapper>} />
        <Route path="/offer-2026" element={<PageWrapper>{(nav) => <Offer2026 onNavigate={nav} />}</PageWrapper>} />
        <Route path="/offer-seo" element={<PageWrapper>{(nav) => <OfferSEO onNavigate={nav} />}</PageWrapper>} />
        <Route path="/offer-webdev" element={<PageWrapper>{(nav) => <OfferWebDev onNavigate={nav} />}</PageWrapper>} />
        <Route path="/offer-launch" element={<PageWrapper>{(nav) => <OfferLaunch onNavigate={nav} />}</PageWrapper>} />
        <Route path="/launch" element={<PageWrapper>{(nav) => <Launch onNavigate={nav} />}</PageWrapper>} />
        <Route path="/intro" element={<PageWrapper>{(nav) => <Intro onNavigate={nav} />}</PageWrapper>} />
        <Route path="/rfp" element={<PageWrapper>{(nav) => <RequestProposal onNavigate={nav} />}</PageWrapper>} />
        <Route path="/pricing" element={<PageWrapper>{(nav) => <Pricing onNavigate={nav} />}</PageWrapper>} />
        <Route path="/cielo-hub" element={<PageWrapper>{(nav) => <CieloHub onNavigate={nav} />}</PageWrapper>} />
        <Route path="/api/google-sheets-callback" element={<GoogleSheetsCallback />} />
        <Route path="/google-sheets-test" element={<GoogleSheetsTest />} />
        <Route path="/test-google-auth" element={<PageWrapper>{(nav) => <TestGoogleAuth onNavigate={nav} />}</PageWrapper>} />
        <Route path="/create-test-user" element={<PageWrapper>{(nav) => <CreateTestUser onNavigate={nav} />}</PageWrapper>} />
        <Route path="/diagnostic" element={<EdgeFunctionDiagnostic />} />
        <Route path="/gallery" element={<PageWrapper>{(nav) => <Gallery onNavigate={nav} />}</PageWrapper>} />
        <Route path="/investor-branding" element={<PageWrapper>{(nav) => <InvestorBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/saas-branding" element={<PageWrapper>{(nav) => <SaaSBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/pitch-deck-design" element={<PageWrapper>{(nav) => <PitchDeckDesign onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ai-photography" element={<PageWrapper>{(nav) => <AIPhotography onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ai-content-creation" element={<PageWrapper>{(nav) => <AIContentCreation onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ai-consulting" element={<PageWrapper>{(nav) => <AIConsulting onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ai-operations" element={<PageWrapper>{(nav) => <AIOperations onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ads-creatives" element={<PageWrapper>{(nav) => <AdsCreatives onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ai-business-intelligence" element={<PageWrapper>{(nav) => <AIBusinessIntelligence onNavigate={nav} />}</PageWrapper>} />
        <Route path="/reputation-management" element={<PageWrapper>{(nav) => <ReputationManagement onNavigate={nav} />}</PageWrapper>} />
        <Route path="/fintech-branding" element={<PageWrapper>{(nav) => <FintechBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/healthcare-branding" element={<PageWrapper>{(nav) => <HealthcareBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/real-estate-branding" element={<PageWrapper>{(nav) => <RealEstateBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/crypto-web3-branding" element={<PageWrapper>{(nav) => <CryptoWeb3Branding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/podcast-branding" element={<PageWrapper>{(nav) => <PodcastBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/real-estate-agent-branding" element={<PageWrapper>{(nav) => <RealEstateAgentBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/restaurant-branding" element={<PageWrapper>{(nav) => <RestaurantBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/online-coaching-branding" element={<PageWrapper>{(nav) => <OnlineCoachingBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/legal-services-branding" element={<PageWrapper>{(nav) => <LegalServicesBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/small-business-branding" element={<PageWrapper>{(nav) => <SmallBusinessBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/professional-website-design" element={<PageWrapper>{(nav) => <ProfessionalWebsiteDesign onNavigate={nav} />}</PageWrapper>} />
        <Route path="/landing-page-conversion" element={<PageWrapper>{(nav) => <LandingPageConversion onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ecommerce-website-design" element={<PageWrapper>{(nav) => <EcommerceWebsiteDesign onNavigate={nav} />}</PageWrapper>} />
        <Route path="/wordpress-website-design" element={<PageWrapper>{(nav) => <WordPressWebsiteDesign onNavigate={nav} />}</PageWrapper>} />
        <Route path="/digital-marketing-small-business" element={<PageWrapper>{(nav) => <DigitalMarketingSmallBusiness onNavigate={nav} />}</PageWrapper>} />
        <Route path="/social-media-marketing-agency" element={<PageWrapper>{(nav) => <SocialMediaMarketingAgency onNavigate={nav} />}</PageWrapper>} />
        <Route path="/seo-services" element={<PageWrapper>{(nav) => <SEOServices onNavigate={nav} />}</PageWrapper>} />
        <Route path="/content-marketing-services" element={<PageWrapper>{(nav) => <ContentMarketingServices onNavigate={nav} />}</PageWrapper>} />
        <Route path="/copywriting-services" element={<PageWrapper>{(nav) => <CopywritingServices onNavigate={nav} />}</PageWrapper>} />
        <Route path="/video-production-services" element={<PageWrapper>{(nav) => <VideoProductionServices onNavigate={nav} />}</PageWrapper>} />
        <Route path="/graphic-design-services" element={<PageWrapper>{(nav) => <GraphicDesignServices onNavigate={nav} />}</PageWrapper>} />
        <Route path="/rebranding-services" element={<PageWrapper>{(nav) => <RebrandingServices onNavigate={nav} />}</PageWrapper>} />
        <Route path="/startup-branding" element={<PageWrapper>{(nav) => <StartupBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/email-marketing-automation" element={<PageWrapper>{(nav) => <EmailMarketingAutomation onNavigate={nav} />}</PageWrapper>} />
        <Route path="/google-ads-management" element={<PageWrapper>{(nav) => <GoogleAdsManagement onNavigate={nav} />}</PageWrapper>} />
        <Route path="/brand-strategy-consultant" element={<PageWrapper>{(nav) => <BrandStrategyConsultant onNavigate={nav} />}</PageWrapper>} />
        <Route path="/influencer-marketing-agency" element={<PageWrapper>{(nav) => <InfluencerMarketingAgency onNavigate={nav} />}</PageWrapper>} />
        <Route path="/business-consulting" element={<PageWrapper>{(nav) => <BusinessConsulting onNavigate={nav} />}</PageWrapper>} />
        <Route path="/logo-design-services" element={<PageWrapper>{(nav) => <LogoDesignServices onNavigate={nav} />}</PageWrapper>} />
        <Route path="/multi-strategy-hedge-fund" element={<PageWrapper>{(nav) => <MultiStrategyHedgeFund onNavigate={nav} />}</PageWrapper>} />
        <Route path="/long-short-market-neutral" element={<PageWrapper>{(nav) => <LongShortMarketNeutral onNavigate={nav} />}</PageWrapper>} />
        <Route path="/fund-of-funds-platform" element={<PageWrapper>{(nav) => <FundOfFundsPlatform onNavigate={nav} />}</PageWrapper>} />
        <Route path="/family-office-branding-agency" element={<PageWrapper>{(nav) => <FamilyOfficeBrandingAgency onNavigate={nav} />}</PageWrapper>} />
        <Route path="/hedge-fund-reputation-management" element={<PageWrapper>{(nav) => <HedgeFundReputationManagement onNavigate={nav} />}</PageWrapper>} />
        <Route path="/family-office-web-design" element={<PageWrapper>{(nav) => <FamilyOfficeWebDesign onNavigate={nav} />}</PageWrapper>} />
        <Route path="/pitch-deck-ppm-design" element={<PageWrapper>{(nav) => <PitchDeckPPMDesign onNavigate={nav} />}</PageWrapper>} />
        <Route path="/ai-design-branding" element={<PageWrapper>{(nav) => <AIDesignBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/miami-seo-services" element={<PageWrapper>{(nav) => <MiamiSEOServices onNavigate={nav} />}</PageWrapper>} />
        <Route path="/fintech-brand-strategy-miami" element={<PageWrapper>{(nav) => <FintechBrandStrategyMiami onNavigate={nav} />}</PageWrapper>} />
        <Route path="/brand-reputation-management-south-florida" element={<PageWrapper>{(nav) => <BrandReputationManagementSouthFlorida onNavigate={nav} />}</PageWrapper>} />
        <Route path="/landing-sm" element={<PageWrapper>{(nav) => <LandingSocialMedia onNavigate={nav} />}</PageWrapper>} />
        <Route path="/pinterest-rss-feed" element={<PinterestRSSFeed />} />
        <Route path="/pins.xml" element={<PinterestRSSFeed />} />
        <Route path="/imagedownload" element={<ImageDownload />} />
        
        {/* SEO Tools */}
        <Route path="/sitemap.xml" element={<Sitemap />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/robots.txt" element={<RobotsTxt />} />
        <Route path="/robots" element={<RobotsTxt />} />
        <Route path="/seo-test" element={<PageWrapper>{(nav) => <SEOTestPage onNavigate={nav} />}</PageWrapper>} />
        
        {/* Template-Based Industry Subpages */}
        <Route path="/crypto-web3-branding" element={<PageWrapper>{(nav) => <CryptoWeb3Branding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/podcast-branding-monetization" element={<PageWrapper>{(nav) => <PodcastBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/real-estate-agent-branding" element={<PageWrapper>{(nav) => <RealEstateAgentBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/restaurant-branding-menu-design" element={<PageWrapper>{(nav) => <RestaurantBranding onNavigate={nav} />}</PageWrapper>} />
        <Route path="/online-coaching-branding" element={<PageWrapper>{(nav) => <OnlineCoachingBranding onNavigate={nav} />}</PageWrapper>} />
        
        {/* Catch-all redirect to home */}
        <Route path="*" element={<PageWrapper>{(nav) => { nav('home'); return null; }}</PageWrapper>} />
      </Routes>

      {!hideFooter && (
        <PageWrapper>
          {(handleNavigate) => <Footer onNavigate={handleNavigate} />}
        </PageWrapper>
      )}
    </div>
  );
}

export default function App() {
  // Initialize PostHog
  useEffect(() => {
    posthog.init('phc_UrkDsjgLdlkFhAHTNVyy949U9DhCchpHixwFSoUi412', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
    });
  }, []);

  // Load ClickRank AI script
  useEffect(() => {
    const clickRankAi = document.createElement("script");
    clickRankAi.src = "https://js.clickrank.ai/seo/2383ed23-6b81-4b4d-94cb-b916cd24e696/script?" + new Date().getTime();
    clickRankAi.async = true;
    document.head.appendChild(clickRankAi);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(clickRankAi)) {
        document.head.removeChild(clickRankAi);
      }
    };
  }, []);

  // Load Visitor Tracking script
  useEffect(() => {
    // Load tracer.js script
    const tracerScript = document.createElement("script");
    tracerScript.src = "https://app.visitortracking.com/assets/js/tracer.js";
    tracerScript.async = true;
    tracerScript.defer = true;
    
    // Initialize tracer after script loads
    tracerScript.onload = () => {
      // Create initialization script
      const initScript = document.createElement("script");
      initScript.text = `
        function init_tracer() { 
          var tracer = new Tracer({  
            websiteId : "b0c34157-8ab4-45b6-bdd2-04f15cc42731",  
            async : true, 
            debug : false 
          }); 
        }
        init_tracer();
      `;
      document.head.appendChild(initScript);
    };
    
    document.head.appendChild(tracerScript);

    // Cleanup function
    return () => {
      if (document.head.contains(tracerScript)) {
        document.head.removeChild(tracerScript);
      }
    };
  }, []);

  return (
    <Router>
      <PostHogProvider client={posthog}>
        <AppContent />
      </PostHogProvider>
    </Router>
  );
}