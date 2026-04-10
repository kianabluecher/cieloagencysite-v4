import { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Search,
  Globe,
  Shield,
  Briefcase,
  FileText,
  Sparkles,
  CheckCircle2,
  Loader
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface LinksManagementProps {
  onNavigate: (page: string) => void;
}

interface PageLink {
  name: string;
  route: string;
  category: 'Public' | 'Service' | 'Admin' | 'Special' | 'Forms' | 'Additional';
  access: 'Public' | 'Admin Only' | 'Owner Only';
  description?: string;
  templateBased?: boolean; // Flag for template-based pages
}

const allLinks: PageLink[] = [
  // Public Pages
  { name: 'Home', route: '/', category: 'Public', access: 'Public', description: 'Main landing page' },
  { name: 'About', route: '/About', category: 'Public', access: 'Public', description: 'About CIELO Agency' },
  { name: 'News', route: '/Blog', category: 'Public', access: 'Public', description: 'News posts and articles' },
  { name: 'Portfolio', route: '/Portfolio', category: 'Public', access: 'Public', description: 'Portfolio showcase' },
  { name: 'Portfolio 2', route: '/portfolio2', category: 'Public', access: 'Public', description: 'Alternative portfolio view' },
  { name: 'Jobs', route: '/Jobs', category: 'Public', access: 'Public', description: 'Career opportunities' },
  { name: 'Inquiry', route: '/Inquiry', category: 'Public', access: 'Public', description: 'General inquiry form' },
  { name: 'Ventures', route: '/Ventures', category: 'Public', access: 'Public', description: 'Venture initiatives' },
  { name: 'Development', route: '/Development', category: 'Public', access: 'Public', description: 'Development services' },

  // Service Pages
  { name: 'Brand & Web', route: '/brand-web', category: 'Service', access: 'Public', description: 'Brand and web design services' },
  { name: 'Brand & Web Pricing', route: '/bw-pricing', category: 'Admin', access: 'Admin Only', description: 'Brand & Web pricing page (duplicate for admin portal)' },
  { name: 'Social Media', route: '/social-media', category: 'Service', access: 'Public', description: 'Social media management' },
  { name: 'Brand Management', route: '/brand-management', category: 'Service', access: 'Public', description: 'Brand management services' },
  { name: 'Consulting', route: '/Consulting', category: 'Service', access: 'Public', description: 'Strategic consulting' },
  { name: 'Marketing', route: '/Marketing', category: 'Service', access: 'Public', description: 'Marketing services' },
  { name: 'PR & Media', route: '/pr-media', category: 'Service', access: 'Public', description: 'Public relations and media' },
  { name: 'Lead Gen', route: '/lead-gen', category: 'Service', access: 'Public', description: 'Lead generation services' },
  { name: 'Influencer Marketing', route: '/influencer-marketing', category: 'Service', access: 'Public', description: 'Influencer marketing campaigns' },
  { name: 'Print Collateral', route: '/print-collateral', category: 'Service', access: 'Public', description: 'Print design services' },
  { name: 'Video & Motion', route: '/video-motion', category: 'Service', access: 'Public', description: 'Video and motion graphics' },
  { name: 'Photography', route: '/photography', category: 'Service', access: 'Public', description: 'Photography services' },
  { name: 'Packaging Design', route: '/packaging-design', category: 'Service', access: 'Public', description: 'Packaging design' },
  { name: 'CGI Campaigns', route: '/cgi-campaigns', category: 'Service', access: 'Public', description: 'CGI campaigns' },
  { name: 'AI Content', route: '/ai-content', category: 'Service', access: 'Public', description: 'AI-powered content creation' },
  { name: 'Event Branding', route: '/event-branding', category: 'Service', access: 'Public', description: 'Event branding services' },
  { name: 'Email Marketing', route: '/email-marketing', category: 'Service', access: 'Public', description: 'Email marketing campaigns' },
  { name: 'Creative Direction', route: '/creative-direction', category: 'Service', access: 'Public', description: 'Creative direction services' },
  { name: 'SEO & GEO', route: '/seo-geo', category: 'Service', access: 'Public', description: 'SEO and geo-targeting' },
  { name: 'Rapid Delivery', route: '/rapid-delivery', category: 'Service', access: 'Public', description: 'Fast-track delivery services' },
  { name: 'Design Subscription', route: '/design-subscription', category: 'Service', access: 'Public', description: 'Design subscription plans' },

  // Industry-Specific Subpages (Template-Based)
  { name: 'Crypto & Web3 Branding', route: '/crypto-web3-branding', category: 'Additional', access: 'Public', description: 'Crypto & Web3 branding services', templateBased: true },
  { name: 'Podcast Branding', route: '/podcast-branding-monetization', category: 'Additional', access: 'Public', description: 'Podcast branding & monetization', templateBased: true },
  { name: 'Real Estate Agent Branding', route: '/real-estate-agent-branding', category: 'Additional', access: 'Public', description: 'Real estate agent personal branding', templateBased: true },
  { name: 'Restaurant Branding', route: '/restaurant-branding-menu-design', category: 'Additional', access: 'Public', description: 'Restaurant branding & menu design', templateBased: true },
  { name: 'Online Coaching Branding', route: '/online-coaching-branding', category: 'Additional', access: 'Public', description: 'Online coaching business branding', templateBased: true },
  { name: 'FinTech Brand Strategy Miami', route: '/fintech-brand-strategy-miami', category: 'Additional', access: 'Public', description: 'Enterprise brand strategy for FinTech companies' },
  { name: 'Brand Reputation Management South Florida', route: '/brand-reputation-management-south-florida', category: 'Additional', access: 'Public', description: 'Reputation management for executives and family offices' },

  // Special Pages & Forms
  { name: 'Let\'s Talk', route: '/lets-talk', category: 'Forms', access: 'Public', description: 'Multi-step consultation form' },
  { name: 'Brand Audit', route: '/brand-audit', category: 'Forms', access: 'Public', description: 'Brand audit request form' },
  { name: 'Discovery', route: '/discovery', category: 'Forms', access: 'Public', description: 'Discovery session' },
  { name: 'Offer', route: '/offer', category: 'Special', access: 'Public', description: 'Special offer page' },
  { name: 'BW Offer', route: '/bw-offer', category: 'Special', access: 'Public', description: 'Brand & Web offer page' },
  { name: 'The Next Frontier of Enterprise AI', route: '/offer-2026', category: 'Special', access: 'Public', description: 'Partial Creative Direction & Strategic Consulting' },
  { name: 'Offer SEO', route: '/offer-seo', category: 'Special', access: 'Public', description: 'SEO offer page' },
  { name: 'Offer WebDev', route: '/offer-webdev', category: 'Special', access: 'Public', description: 'Web development offer page' },
  { name: 'CIELO Hub', route: '/cielo-hub', category: 'Special', access: 'Public', description: 'Brand & web assets hub' },
  
  // Admin Pages
  { name: 'Team Login', route: '/team-login', category: 'Admin', access: 'Admin Only', description: 'Team member login' },
  { name: 'Team Dashboard', route: '/team-dashboard', category: 'Admin', access: 'Admin Only', description: 'Main team dashboard' },
  { name: 'Portfolio Admin', route: '/portfolio-admin', category: 'Admin', access: 'Admin Only', description: 'Portfolio management' },
  { name: 'Jobs Admin', route: '/jobs-admin', category: 'Admin', access: 'Admin Only', description: 'Job postings management' },
  { name: 'User Management', route: '/user-management', category: 'Admin', access: 'Owner Only', description: 'Manage team members' },
  { name: 'Portfolio Submissions', route: '/portfolio-submissions', category: 'Admin', access: 'Admin Only', description: 'Review portfolio submissions' },
  { name: 'Brand Guidelines', route: '/brand-guidelines', category: 'Admin', access: 'Admin Only', description: 'Brand guidelines reference' },
  { name: 'Portfolio Image Update', route: '/portfolio-image-update', category: 'Admin', access: 'Admin Only', description: 'Update portfolio images' },
  { name: 'Portfolio Images Fix', route: '/portfolio-images-fix', category: 'Admin', access: 'Admin Only', description: 'Fix portfolio images' },
  { name: 'Notion Sync', route: '/notion-sync', category: 'Admin', access: 'Admin Only', description: 'Notion integration sync' },
  { name: 'Google Sheets Callback', route: '/google-sheets-callback', category: 'Admin', access: 'Admin Only', description: 'Google Sheets OAuth callback' },
  { name: 'Google Sheets Test', route: '/google-sheets-test', category: 'Admin', access: 'Admin Only', description: 'Test Google Sheets integration' },
];

export function LinksManagement({ onNavigate }: LinksManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [copiedRoute, setCopiedRoute] = useState<string | null>(null);

  const categories = ['All', 'Public', 'Service', 'Admin', 'Special', 'Forms', 'Additional'];

  const filteredLinks = allLinks.filter(link => {
    const matchesSearch = link.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         link.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || link.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyRoute = (route: string) => {
    const fullUrl = `${window.location.origin}${route}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedRoute(route);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedRoute(null), 2000);
  };

  const handleViewPage = (route: string) => {
    window.open(route, '_blank');
  };

  const [dynamicPages, setDynamicPages] = useState<Record<string, any>>({});
  const [loadingLinks, setLoadingLinks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchDynamicPages();
  }, []);

  const fetchDynamicPages = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dynamic-pages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ action: 'list' })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const pagesMap: Record<string, any> = {};
        if (data.pages) {
          data.pages.forEach((item: any) => {
            const slug = item.key.replace('dynamic-page:', '');
            pagesMap[slug] = item.value;
          });
        }
        setDynamicPages(pagesMap);
      }
    } catch (error) {
      console.error('Failed to fetch dynamic pages:', error);
    }
  };

  const handleUpdateCtaLink = async (link: PageLink, ctaLink: string) => {
    // Generate slug from route: remove leading slash, replace spaces and special chars
    const slug = link.route.replace(/^\//, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
    
    setDynamicPages(prev => ({
      ...prev,
      [slug]: { ...prev[slug], downloadLink: ctaLink }
    }));
    
    setLoadingLinks(prev => ({ ...prev, [slug]: true }));

    try {
        const existingData = dynamicPages[slug] || {};
        
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dynamic-pages`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({
              action: existingData.title ? 'update' : 'create',
              slug: slug,
              pageData: {
                ...existingData,
                title: existingData.title || link.name,
                slug: slug,
                downloadLink: ctaLink
              }
            })
          }
        );

        if (!response.ok) {
            throw new Error('Failed to save');
        }
        
        toast.success('CTA Link updated');
    } catch (error) {
        toast.error('Failed to update CTA Link');
        console.error(error);
    } finally {
        setLoadingLinks(prev => ({ ...prev, [slug]: false }));
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Public': return Globe;
      case 'Service': return Briefcase;
      case 'Admin': return Shield;
      case 'Special': return Sparkles;
      case 'Forms': return FileText;
      case 'Additional': return Globe;
      default: return Globe;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Public': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Service': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'Admin': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Special': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'Forms': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'Additional': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'Public': return 'text-green-400';
      case 'Admin Only': return 'text-yellow-400';
      case 'Owner Only': return 'text-red-400';
      default: return 'text-zinc-400';
    }
  };

  const stats = {
    total: allLinks.length,
    public: allLinks.filter(l => l.access === 'Public').length,
    admin: allLinks.filter(l => l.access === 'Admin Only' || l.access === 'Owner Only').length,
    services: allLinks.filter(l => l.category === 'Service').length,
  };

  return (
    <div className="p-8 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2 tracking-tight">Links & Pages Management</h1>
        <p className="text-zinc-500">
          All website pages, routes, and subpages for CIELO Agency
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-2">Total Pages</p>
              <p className="text-3xl text-white tracking-tight">{stats.total}</p>
            </div>
            <Globe className="w-8 h-8 text-zinc-700" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-2">Public Pages</p>
              <p className="text-3xl text-emerald-400 tracking-tight">{stats.public}</p>
            </div>
            <Globe className="w-8 h-8 text-emerald-900" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-2">Admin Pages</p>
              <p className="text-3xl text-red-400 tracking-tight">{stats.admin}</p>
            </div>
            <Shield className="w-8 h-8 text-red-900" strokeWidth={1.5} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider mb-2">Service Pages</p>
              <p className="text-3xl text-purple-400 tracking-tight">{stats.services}</p>
            </div>
            <Briefcase className="w-8 h-8 text-purple-900" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search pages, routes, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 pl-11 pr-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`
                  px-4 py-2.5 text-xs font-['Geist_Mono'] uppercase tracking-wider transition-all border
                  ${filterCategory === category
                    ? 'bg-white text-black border-white'
                    : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800/50">
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Page Name
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Route
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Access
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Description
                </th>
                <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950 w-64">
                  CTA Link
                </th>
                <th className="text-right px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.map((link, index) => {
                const CategoryIcon = getCategoryIcon(link.category);
                return (
                  <tr 
                    key={index}
                    className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm">{link.name}</span>
                        {link.templateBased && (
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-['Geist_Mono'] tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                            Template
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <code className="text-xs font-['Geist_Mono'] text-zinc-400 bg-zinc-900/50 px-3 py-1.5 border border-zinc-800/50">
                        {link.route}
                      </code>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs ${getCategoryColor(link.category)}`}>
                        <CategoryIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span className="font-['Geist_Mono'] tracking-wide">{link.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-xs font-['Geist_Mono'] tracking-wide ${getAccessColor(link.access)}`}>
                        {link.access}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm text-zinc-500">
                        {link.description || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="relative">
                        <input
                            type="text"
                            placeholder="Add download link..."
                            className="w-full bg-zinc-900/50 border border-zinc-800 text-xs text-white px-3 py-1.5 focus:outline-none focus:border-zinc-700 placeholder-zinc-600 rounded"
                            value={(() => {
                                const slug = link.route.replace(/^\//, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
                                return dynamicPages[slug]?.downloadLink || '';
                            })()}
                            onChange={(e) => {
                                const slug = link.route.replace(/^\//, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
                                setDynamicPages(prev => ({
                                    ...prev,
                                    [slug]: { ...prev[slug], downloadLink: e.target.value }
                                }));
                            }}
                            onBlur={(e) => handleUpdateCtaLink(link, e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleUpdateCtaLink(link, e.currentTarget.value);
                                    e.currentTarget.blur();
                                }
                            }}
                        />
                        {(() => {
                            const slug = link.route.replace(/^\//, '').toLowerCase().replace(/[^a-z0-9-]/g, '-');
                            return loadingLinks[slug] && (
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    <Loader className="w-3 h-3 animate-spin text-zinc-500" />
                                </div>
                            );
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => handleCopyRoute(link.route)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700"
                          title="Copy URL"
                        >
                          {copiedRoute === link.route ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400" strokeWidth={1.5} />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                          )}
                        </Button>
                        <Button
                          onClick={() => handleViewPage(link.route)}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700"
                          title="Open in new tab"
                        >
                          <ExternalLink className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredLinks.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-zinc-400 mb-1">No pages found</p>
            <p className="text-sm text-zinc-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-zinc-500 font-['Geist_Mono']">
          Showing <span className="text-white">{filteredLinks.length}</span> of <span className="text-white">{allLinks.length}</span> pages
        </p>
        <div className="flex items-center gap-2 text-xs font-['Geist_Mono'] text-zinc-600">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span>System Operational</span>
        </div>
      </div>
    </div>
  );
}