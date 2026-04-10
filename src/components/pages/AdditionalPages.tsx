import { ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Plus, Sparkles, Edit } from 'lucide-react';
import { CreateDynamicPageForm } from './CreateDynamicPageForm';
import { EditDynamicPageForm } from './EditDynamicPageForm';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface AdditionalPagesProps {
  onNavigate: (page: string) => void;
}

export function AdditionalPages({ onNavigate }: AdditionalPagesProps) {
  const pages = [
    {
      title: 'Investor Branding for Startups',
      slug: 'investor-branding',
      url: '/investor-branding',
      description: 'Branding That Closes Funding Rounds',
      keywords: 'investor branding for startups, startup credibility design, pitch-ready brand identity, minimum viable brand',
      category: 'Startups & Investment'
    },
    {
      title: 'SaaS Branding Agency & Positioning',
      slug: 'saas-branding',
      url: '/saas-branding',
      description: 'SaaS Branding That Converts Trials',
      keywords: 'SaaS branding importance, startup brand differentiation, SaaS competitive positioning',
      category: 'SaaS & Technology'
    },
    {
      title: 'Pitch Deck Design Services',
      slug: 'pitch-deck-design',
      url: '/pitch-deck-design',
      description: 'Pitch Decks That Get Funded',
      keywords: 'pitch deck design best practices, investor pitch deck tips, startup deck mistakes',
      category: 'Startups & Investment'
    },
    {
      title: 'AI Photography & Image Generation',
      slug: 'ai-photography',
      url: '/ai-photography',
      description: 'AI Photography That Looks Real',
      keywords: 'AI photography for brands, AI-generated product images, AI vs real photography',
      category: 'AI & Technology'
    },
    {
      title: 'AI Content Creation Agency',
      slug: 'ai-content-creation',
      url: '/ai-content-creation',
      description: 'AI Content That Scales',
      keywords: 'AI content creation services, AI marketing agency, automated content production',
      category: 'AI & Technology'
    },
    {
      title: 'Reputation Management',
      slug: 'reputation-management',
      url: '/reputation-management',
      description: 'Reputation Management That Controls Your Narrative',
      keywords: 'startup reputation management, online reputation for founders, digital credibility strategy',
      category: 'Marketing & PR'
    },
    {
      title: 'Fintech Branding Agency',
      slug: 'fintech-branding',
      url: '/fintech-branding',
      description: 'Fintech Branding Built on Trust',
      keywords: 'fintech branding agency, startup branding for fintech, financial services brand strategy',
      category: 'Industry-Specific'
    },
    {
      title: 'Healthcare Branding Agency',
      slug: 'healthcare-branding',
      url: '/healthcare-branding',
      description: 'Healthcare Branding That Builds Trust',
      keywords: 'healthcare branding agency, medical brand strategy, healthcare messaging services',
      category: 'Industry-Specific'
    },
    {
      title: 'Real Estate Branding',
      slug: 'real-estate-branding',
      url: '/real-estate-branding',
      description: 'Real Estate Branding That Sells',
      keywords: 'real estate branding agency, property developer branding, real estate marketing services',
      category: 'Industry-Specific'
    },
    {
      title: 'Legal Services Branding',
      slug: 'legal-services-branding',
      url: '/legal-services-branding',
      description: 'Law Firm Branding That Commands Authority',
      keywords: 'law firm branding agency, legal services brand strategy, attorney marketing services',
      category: 'Industry-Specific'
    },
    {
      title: 'Crypto & Web3 Branding',
      slug: 'crypto-web3-branding',
      url: '/crypto-web3-branding',
      description: 'Crypto & Web3 branding services for blockchain projects',
      keywords: 'crypto branding, web3 brand design, blockchain startup branding, NFT project branding',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Podcast Branding & Monetization',
      slug: 'podcast-branding-monetization',
      url: '/podcast-branding-monetization',
      description: 'Podcast branding & monetization strategies',
      keywords: 'podcast branding agency, podcast monetization, audio brand design, podcast visual identity',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Real Estate Agent Branding',
      slug: 'real-estate-agent-branding',
      url: '/real-estate-agent-branding',
      description: 'Real estate agent personal branding',
      keywords: 'real estate agent branding, realtor marketing, agent personal brand, real estate marketing',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Restaurant Branding & Menu Design',
      slug: 'restaurant-branding-menu-design',
      url: '/restaurant-branding-menu-design',
      description: 'Restaurant branding & menu design services',
      keywords: 'restaurant branding agency, menu design services, food brand strategy, restaurant marketing',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Online Coaching Branding',
      slug: 'online-coaching-branding',
      url: '/online-coaching-branding',
      description: 'Online coaching business branding',
      keywords: 'coaching brand design, online coach marketing, coaching business branding, personal brand for coaches',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'FinTech Brand Strategy Miami',
      slug: 'fintech-brand-strategy-miami',
      url: '/fintech-brand-strategy-miami',
      description: 'Close enterprise deals faster with institutional-grade brand infrastructure for FinTech companies',
      keywords: 'fintech branding miami, enterprise brand strategy, institutional credibility, miami fintech, sales acceleration',
      category: 'Industry-Specific'
    },
    {
      title: 'Brand Reputation Management South Florida',
      slug: 'brand-reputation-management-south-florida',
      url: '/brand-reputation-management-south-florida',
      description: 'Protect business value through proactive reputation infrastructure for executives and family offices',
      keywords: 'reputation management south florida, brand protection, family office reputation, executive reputation, crisis management',
      category: 'Marketing & PR'
    },
    {
      title: 'Small Business Branding & Identity Package',
      slug: 'small-business-branding-package',
      url: '/small-business-branding-package',
      description: 'Complete brand identity packages for small businesses',
      keywords: 'small business branding, brand identity package, business logo design, professional logo design, company branding services',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Professional Website Design Services',
      slug: 'professional-website-design-services',
      url: '/professional-website-design-services',
      description: 'Custom website design that converts visitors into customers',
      keywords: 'professional website design, website design services, custom website design, business website design, website redesign services',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Landing Page Design & Conversion',
      slug: 'landing-page-design-conversion',
      url: '/landing-page-design-conversion',
      description: 'High-converting landing pages built for revenue',
      keywords: 'landing page design, conversion rate optimization, custom website design, responsive website design',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'E-Commerce Website Design & Shopify',
      slug: 'ecommerce-website-design-shopify',
      url: '/ecommerce-website-design-shopify',
      description: 'E-commerce design optimized for maximum revenue',
      keywords: 'ecommerce website design, shopify website design, online store design, ecommerce branding',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'WordPress Website Design & Development',
      slug: 'wordpress-website-design-development',
      url: '/wordpress-website-design-development',
      description: 'Custom WordPress sites that load fast and convert',
      keywords: 'wordpress website design, website design services, custom website design, professional website design',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Digital Marketing for Small Business',
      slug: 'digital-marketing-agency-small-business',
      url: '/digital-marketing-small-business',
      description: 'ROI-focused digital marketing for small businesses',
      keywords: 'digital marketing agency, digital marketing services, online marketing services, marketing consultant',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Social Media Marketing Agency',
      slug: 'social-media-marketing-management-agency',
      url: '/social-media-marketing-agency',
      description: 'Social media management that drives revenue',
      keywords: 'social media marketing agency, social media management, instagram marketing services, facebook marketing services',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'SEO Services & Search Engine Optimization',
      slug: 'seo-services-search-engine-optimization',
      url: '/seo-services',
      description: 'SEO that ranks and converts',
      keywords: 'seo services, seo company, seo agency, local seo services, seo consultant',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Content Marketing Services & Strategy',
      slug: 'content-marketing-services-strategy',
      url: '/content-marketing-services',
      description: 'Content marketing that generates leads',
      keywords: 'content marketing services, content marketing agency, content creation services, content strategy consultant',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Copywriting Services for Business',
      slug: 'copywriting-services-business',
      url: '/copywriting-services',
      description: 'Conversion copywriting that sells',
      keywords: 'copywriting services, seo content writing, content writing services, email marketing services',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Video Production Services & Marketing',
      slug: 'video-production-services-marketing',
      url: '/video-production-services',
      description: 'Professional video production that drives results',
      keywords: 'video production services, video marketing services, corporate video production, explainer video production',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Graphic Design Services for Business',
      slug: 'graphic-design-services-business',
      url: '/graphic-design-services',
      description: 'Professional graphic design that communicates',
      keywords: 'graphic design services, presentation design services, infographic design services, packaging design services',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Rebranding Services & Brand Refresh',
      slug: 'rebranding-services-brand-refresh',
      url: '/rebranding-services',
      description: 'Strategic rebranding that repositions for growth',
      keywords: 'rebranding services, brand refresh, brand redesign, company rebranding, rebrand agency',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Startup Branding & Tech Company Identity',
      slug: 'startup-branding-tech-company',
      url: '/startup-branding',
      description: 'Startup branding that attracts investors',
      keywords: 'startup branding, tech startup branding, startup marketing services, pitch deck design',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Email Marketing Services & Automation',
      slug: 'email-marketing-services-automation',
      url: '/email-marketing-automation',
      description: 'Email marketing systems that drive revenue',
      keywords: 'email marketing services, email marketing automation, email campaign management, newsletter design',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Google Ads Management & PPC Services',
      slug: 'google-ads-management-ppc-services',
      url: '/google-ads-management',
      description: 'Google Ads campaigns optimized for profit',
      keywords: 'google ads management, ppc management services, google ads services, paid search management',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Brand Strategy Consultant & Positioning',
      slug: 'brand-strategy-consultant-positioning',
      url: '/brand-strategy-consultant',
      description: 'Brand strategy that drives growth',
      keywords: 'brand strategy consultant, brand consultant, branding consultant, business consultant, marketing consultant',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Influencer Marketing Agency & Partnerships',
      slug: 'influencer-marketing-agency-partnerships',
      url: '/influencer-marketing-agency',
      description: 'Influencer marketing that drives sales',
      keywords: 'influencer marketing agency, influencer marketing services, creator partnerships, social media influencer marketing',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Business Consulting & Growth Strategy',
      slug: 'business-consulting-growth-strategy',
      url: '/business-consulting',
      description: 'Business consulting focused on revenue and scale',
      keywords: 'business consultant, business consulting services, growth consultant, strategy consultant, marketing consultant',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Logo Design Services & Brand Mark',
      slug: 'logo-design-services-brand-mark',
      url: '/logo-design-services',
      description: 'Logo design built for longevity',
      keywords: 'logo design services, professional logo design, business logo design, brand logo design, custom logo design',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Multi-Strategy & Adaptive Hedge Funds',
      slug: 'multi-strategy-hedge-fund-branding',
      url: '/multi-strategy-hedge-fund',
      description: 'Hedge fund branding for multi-strategy and adaptive alpha vehicles',
      keywords: 'multi-strategy hedge fund branding, adaptive alpha fund positioning, global macro fund marketing, convexity hedge fund naming, institutional fund branding',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Long/Short & Market Neutral Hedge Funds',
      slug: 'long-short-market-neutral-branding',
      url: '/long-short-market-neutral',
      description: 'Equity hedge fund branding for long/short and market neutral strategies',
      keywords: 'long short equity hedge fund branding, market neutral fund positioning, 130/30 fund marketing, equity hedge fund naming, institutional equity fund branding',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Fund-of-Funds & Family Office Platforms',
      slug: 'fund-of-funds-platform-branding',
      url: '/fund-of-funds-platform',
      description: 'FoF and family office platform branding for multi-manager allocators',
      keywords: 'fund of funds branding, family office platform branding, multi-family office brand strategy, FoF manager positioning, institutional allocator branding',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Family Office Branding Agency',
      slug: 'family-office-branding-agency',
      url: '/family-office-branding-agency',
      description: 'Brand strategy for family offices, hedge funds, and private investment firms',
      keywords: 'family office branding agency, hedge fund branding, fund of funds brand strategy, investment firm branding, UHNW brand consulting',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Hedge Fund Reputation Management',
      slug: 'hedge-fund-reputation-management',
      url: '/hedge-fund-reputation-management',
      description: 'Reputation management for hedge funds and private capital',
      keywords: 'hedge fund reputation management, investment firm brand reputation, UHNW reputation consulting, private capital reputation, financial services reputation management',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Family Office Web Design & Investor Portal',
      slug: 'family-office-web-design',
      url: '/family-office-web-design',
      description: 'Investor-facing websites and LP portals for family offices and hedge funds',
      keywords: 'family office web design, hedge fund website design, investor portal UX, fund website branding, LP portal design',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Pitch Deck & PPM Design',
      slug: 'pitch-deck-ppm-design',
      url: '/pitch-deck-ppm-design',
      description: 'Investor presentation design for hedge funds and private capital',
      keywords: 'hedge fund pitch deck design, PPM design, investor presentation branding, fund factsheet design, LP presentation design',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'AI Design and Branding Services',
      slug: 'ai-design-branding',
      url: '/ai-design-branding',
      description: 'AI-powered design and branding that looks sharp and feels human',
      keywords: 'AI design tools, AI branding tools, AI logo generator, AI brand identity design, AI design services',
      category: 'Template-Based',
      templateBased: true
    },
    {
      title: 'Miami SEO Services',
      slug: 'miami-seo-services',
      url: '/miami-seo-services',
      description: 'Local SEO services for Miami businesses that want leads, not just rankings',
      keywords: 'SEO services Miami, Miami SEO agency, SEO company Miami, Miami local SEO, Miami search optimization',
      category: 'Template-Based',
      templateBased: true
    }
  ];

  const categories = ['All', ...Array.from(new Set(pages.map(p => p.category)))];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  // Extract all unique keywords
  const allKeywords = Array.from(
    new Set(
      pages.flatMap(page => 
        page.keywords.split(',').map(k => k.trim())
      )
    )
  ).sort();

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-zinc-800 bg-zinc-950 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-white mb-2 tracking-tight">Additional Pages</h1>
            <p className="text-zinc-500 text-sm">
              Industry-specific landing pages with full SEO optimization
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white transition-colors text-sm"
          >
            <Plus size={16} strokeWidth={1.5} />
            Create New Page
          </button>
        </div>
      </div>

      {/* Template Benefits Banner */}
      <div className="flex-shrink-0 border-b border-zinc-800 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-8 py-5">
        <div className="flex items-start gap-3">
          <Sparkles className="text-blue-400 flex-shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
          <div>
            <h3 className="text-white mb-1.5 flex items-center gap-2 text-sm">
              Template System Benefits
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Pages marked with <span className="inline-block px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-['Geist_Mono'] mx-1 uppercase tracking-wider">Template</span> 
              use the shared <code className="text-emerald-400 font-['Geist_Mono'] text-xs">IndustrySubpageTemplate.tsx</code> component. 
              <strong className="text-white"> Edit the template once, and all pages update automatically.</strong> This enables instant design changes across multiple pages—update colors, layouts, sections, or components in one place, and watch all template-based pages reflect the changes immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex-shrink-0 border-b border-zinc-800 bg-black px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
            <div className="text-zinc-500 text-xs mb-2 font-['Geist_Mono'] tracking-wider uppercase">Total Pages</div>
            <div className="text-white text-3xl tracking-tight">{pages.length}</div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
            <div className="text-zinc-500 text-xs mb-2 font-['Geist_Mono'] tracking-wider uppercase">Categories</div>
            <div className="text-white text-3xl tracking-tight">{categories.length - 1}</div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
            <div className="text-zinc-500 text-xs mb-2 font-['Geist_Mono'] tracking-wider uppercase">Status</div>
            <div className="text-emerald-400 text-3xl tracking-tight">LIVE</div>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
            <div className="text-zinc-500 text-xs mb-2 font-['Geist_Mono'] tracking-wider uppercase">SEO</div>
            <div className="text-white text-3xl tracking-tight">100%</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-8 py-8">
        <div className="bg-zinc-950 border border-zinc-800">
          <table className="w-full">
            <thead className="border-b border-zinc-800/50 bg-zinc-950">
              <tr>
                <th className="text-left px-6 py-4 text-zinc-500 text-xs font-['Geist_Mono'] tracking-wider uppercase">
                  Page Title
                </th>
                <th className="text-left px-6 py-4 text-zinc-500 text-xs font-['Geist_Mono'] tracking-wider uppercase">
                  Slug
                </th>
                <th className="text-left px-6 py-4 text-zinc-500 text-xs font-['Geist_Mono'] tracking-wider uppercase">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-zinc-500 text-xs font-['Geist_Mono'] tracking-wider uppercase">
                  Keywords
                </th>
                <th className="text-right px-6 py-4 text-zinc-500 text-xs font-['Geist_Mono'] tracking-wider uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, index) => (
                <tr
                  key={page.slug}
                  className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div>
                      <div className="text-white mb-1 flex items-center gap-2 text-sm">
                        {page.title}
                        {page.templateBased && (
                          <span className="inline-block px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-['Geist_Mono'] uppercase tracking-wider">
                            Template
                          </span>
                        )}
                      </div>
                      <div className="text-zinc-500 text-sm">{page.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <code className="text-emerald-400 text-xs font-['Geist_Mono'] bg-zinc-900/50 px-3 py-1.5 border border-zinc-800/50">
                      {page.slug}
                    </code>
                  </td>
                  <td className="px-6 py-5">
                    <span className="inline-block px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs font-['Geist_Mono']">
                      {page.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-zinc-500 text-sm max-w-xs truncate">
                      {page.keywords}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white transition-colors text-sm"
                      >
                        <ExternalLink size={14} strokeWidth={1.5} />
                        View Page
                      </a>
                      {page.templateBased && (
                        <button
                          onClick={() => {
                            setSelectedPage(page);
                            setShowEditForm(true);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 transition-colors text-sm"
                        >
                          <Edit size={14} strokeWidth={1.5} />
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Keywords Box */}
      <div className="flex-shrink-0 border-t border-zinc-800 bg-black px-8 py-8">
        <div className="bg-zinc-950 border border-zinc-800 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl text-white mb-1 tracking-tight">SEO Keyword Coverage</h2>
              <p className="text-zinc-500 text-sm">
                All unique keywords across {pages.length} pages • {allKeywords.length} total keywords
              </p>
            </div>
            <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-['Geist_Mono']">
              {allKeywords.length} KEYWORDS
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allKeywords.map((keyword, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 text-xs hover:bg-zinc-800/50 hover:border-zinc-700/50 hover:text-zinc-300 transition-all cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="flex-shrink-0 border-t border-zinc-800 bg-zinc-950 px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="text-zinc-500 text-sm">
            <p className="mb-2">
              <strong className="text-white">SEO Optimization:</strong> All pages include comprehensive meta tags, keywords, and structured data for optimal search engine visibility.
            </p>
            <p>
              <strong className="text-white">Note:</strong> These pages are not included in the footer menu but are fully indexed and accessible via direct URLs.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-['Geist_Mono'] text-zinc-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>System Operational</span>
          </div>
        </div>
      </div>

      {/* Create Page Modal */}
      {showCreateForm && (
        <CreateDynamicPageForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            // Refresh the page or fetch dynamic pages
            window.location.reload();
          }}
        />
      )}

      {/* Edit Page Modal */}
      {showEditForm && selectedPage && (
        <EditDynamicPageForm
          pageSlug={selectedPage.slug}
          initialData={selectedPage}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => {
            // Refresh the page or fetch dynamic pages
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}