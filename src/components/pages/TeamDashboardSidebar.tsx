import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { auth, profiles } from '../../utils/supabase/client';
import cieloLogo from 'figma:asset/4e2fa22f17e3a3dd877b1e9a1edb1abe0080f6e1.png';
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  Users, 
  Zap, 
  Settings as SettingsIcon, 
  LogOut,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FolderKanban,
  Images,
  Briefcase,
  Video,
  Link,
  Gift,
  CheckSquare,
  StickyNote,
  Menu,
  User,
  TrendingUp,
  BarChart3,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { PortfolioManagement } from './PortfolioManagement';
import { BrandGuidelinesContent } from './admin/BrandGuidelinesContent';
import { BrandAssets } from './admin/BrandAssets';
import { UserManagement } from './UserManagement';
import { BlogManagement } from './BlogManagement';
import { Settings } from './admin/Settings';
import { SubmissionsManagement } from './SubmissionsManagement';
import { TeamMembersManagement } from './TeamMembersManagement';
import { JobManagement } from '../dashboard/JobManagement';
import { MainDashboard } from './MainDashboard';
import { MeetingsManagement } from './MeetingsManagement';
import { LinksManagement } from './LinksManagement';
import { ProjectLinksManagement } from './ProjectLinksManagement';
import { GalleryManagement } from '../admin/GalleryManagement';
import { AdditionalPages } from './AdditionalPages';
import { DealsPage } from './DealsPage';
import { LeadsPage } from './LeadsPage';
import { ServicesPage } from './ServicesPage';
import { TemplatesPage } from './TemplatesPage';
import { MarketingChannelsPage } from './MarketingChannelsPage';
import { AcquisitionChannelsPage } from './AcquisitionChannelsPage';
import { WeeklyTasksPage } from './WeeklyTasksPage';
import { InvoicesPage } from './InvoicesPage';
import { QuotesPage } from './QuotesPage';
import { PipelinePage } from './PipelinePage';
import { EmailMarketingPage } from './EmailMarketingPage';
import { NotesPage } from './NotesPage';
import { ContentCalendar } from './ContentCalendar';
import { PinterestRSSGallery } from './PinterestRSSGallery';
import { PartnersPage } from './PartnersPage';
import { AffiliatesPage } from './AffiliatesPage';
import { ELLEAutomationPage } from './ELLEAutomationPage';
import { HeyReachDashboard } from './HeyReachDashboard';
import { FunctionsAutomation } from './FunctionsAutomation';
import { LandingPagesManagement } from './LandingPagesManagement';
import { FunnelAnalytics } from './FunnelAnalytics';
import '../../styles/admin.css';

interface TeamDashboardSidebarProps {
  onNavigate: (page: string) => void;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'team';
  permissions?: {
    portfolio: { view: boolean; edit: boolean };
    jobs: { view: boolean; edit: boolean };
    blog: { view: boolean; edit: boolean };
    submissions: { view: boolean; edit: boolean };
    brand_guidelines: { view: boolean; edit: boolean };
    team_management: { view: boolean; edit: boolean };
    additional_pages: { view: boolean; edit: boolean };
    meetings: { view: boolean; edit: boolean };
    links_management: { view: boolean; edit: boolean };
    offers_management: { view: boolean; edit: boolean };
  };
}

type DashboardView = 'portfolio-management' | 'jobs-management' | 'brand-guidelines' | 'user-management' | 'blog-management' | 'settings' | 'submissions-management' | 'team-management' | 'main-dashboard' | 'meetings-management' | 'links-management' | 'project-links-management' | 'gallery-management' | 'additional-pages' | 'brand-assets' | 'deals-page' | 'leads-page' | 'services-page' | 'templates-page' | 'marketing-channels-page' | 'acquisition-channels-page' | 'weekly-tasks-page' | 'invoices-page' | 'quotes-page' | 'pipeline-page' | 'email-marketing-page' | 'notes-page' | 'content-calendar' | 'pinterest-rss' | 'partners' | 'affiliates' | 'elle-automation' | 'heyreach-dashboard' | 'functions-automation' | 'landing-pages-management' | 'funnel-analytics';

interface NavItem {
  id: string;
  title: string;
  icon: any;
  viewId?: DashboardView;
  roles?: string[];
}

interface NavGroup {
  id: string;
  title: string;
  icon: any;
  roles?: string[];
  items: NavItem[];
}

export function TeamDashboardSidebar({ onNavigate }: TeamDashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Start closed on mobile, open on desktop
    return window.innerWidth >= 1024;
  });
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['content', 'home']);
  
  // Tab management
  const [openTabs, setOpenTabs] = useState<DashboardView[]>(['main-dashboard']);
  const [activeTab, setActiveTab] = useState<DashboardView>('main-dashboard');

  // Map URL paths to view IDs
  const pathToViewMap: Record<string, DashboardView> = {
    '/dashboard': 'main-dashboard',
    '/dashboard/': 'main-dashboard',
    '/dashboard/home': 'main-dashboard',
    '/dashboard/portfolio': 'portfolio-management',
    '/dashboard/jobs': 'jobs-management',
    '/dashboard/blog': 'blog-management',
    '/dashboard/users': 'user-management',
    '/dashboard/team-members': 'team-management',
    '/dashboard/brand-guidelines': 'brand-guidelines',
    '/dashboard/brand-assets': 'brand-assets',
    '/dashboard/settings': 'settings',
    '/dashboard/submissions': 'submissions-management',
    '/dashboard/meetings': 'meetings-management',
    '/dashboard/links': 'links-management',
    '/dashboard/project-links': 'project-links-management',
    '/dashboard/gallery': 'gallery-management',
    '/dashboard/pages': 'additional-pages',
    '/dashboard/deals': 'deals-page',
    '/dashboard/leads': 'leads-page',
    '/dashboard/services': 'services-page',
    '/dashboard/templates': 'templates-page',
    '/dashboard/marketing-channels': 'marketing-channels-page',
    '/dashboard/acquisition-channels': 'acquisition-channels-page',
    '/dashboard/tasks': 'weekly-tasks-page',
    '/dashboard/invoices': 'invoices-page',
    '/dashboard/quotes': 'quotes-page',
    '/dashboard/pipeline': 'pipeline-page',
    '/dashboard/email-marketing': 'email-marketing-page',
    '/dashboard/notes': 'notes-page',
    '/dashboard/content-calendar': 'content-calendar',
    '/dashboard/pinterest-rss': 'pinterest-rss',
    '/dashboard/partners': 'partners',
    '/dashboard/affiliates': 'affiliates',
    '/dashboard/elle-automation': 'elle-automation',
    '/dashboard/heyreach': 'heyreach-dashboard',
    '/dashboard/functions-automation': 'functions-automation',
    '/dashboard/landing-pages': 'landing-pages-management',
    '/dashboard/funnel-analytics': 'funnel-analytics',
  };

  // Map view IDs to URL paths
  const viewToPathMap: Record<DashboardView, string> = {
    'main-dashboard': '/dashboard/home',
    'portfolio-management': '/dashboard/portfolio',
    'jobs-management': '/dashboard/jobs',
    'blog-management': '/dashboard/blog',
    'user-management': '/dashboard/users',
    'team-management': '/dashboard/team-members',
    'brand-guidelines': '/dashboard/brand-guidelines',
    'brand-assets': '/dashboard/brand-assets',
    'settings': '/dashboard/settings',
    'submissions-management': '/dashboard/submissions',
    'meetings-management': '/dashboard/meetings',
    'links-management': '/dashboard/links',
    'project-links-management': '/dashboard/project-links',
    'gallery-management': '/dashboard/gallery',
    'additional-pages': '/dashboard/pages',
    'deals-page': '/dashboard/deals',
    'leads-page': '/dashboard/leads',
    'services-page': '/dashboard/services',
    'templates-page': '/dashboard/templates',
    'marketing-channels-page': '/dashboard/marketing-channels',
    'acquisition-channels-page': '/dashboard/acquisition-channels',
    'weekly-tasks-page': '/dashboard/tasks',
    'invoices-page': '/dashboard/invoices',
    'quotes-page': '/dashboard/quotes',
    'pipeline-page': '/dashboard/pipeline',
    'email-marketing-page': '/dashboard/email-marketing',
    'notes-page': '/dashboard/notes',
    'content-calendar': '/dashboard/content-calendar',
    'pinterest-rss': '/dashboard/pinterest-rss',
    'partners': '/dashboard/partners',
    'affiliates': '/dashboard/affiliates',
    'elle-automation': '/dashboard/elle-automation',
    'heyreach-dashboard': '/dashboard/heyreach',
    'functions-automation': '/dashboard/functions-automation',
    'landing-pages-management': '/dashboard/landing-pages',
    'funnel-analytics': '/dashboard/funnel-analytics',
  };

  // Get active view from URL
  const activeView = pathToViewMap[location.pathname] || 'main-dashboard';

  useEffect(() => {
    checkAuth();
    setupAuthListener();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
      setLoading(false);
    }
  }, [user]);

  const setupAuthListener = () => {
    const { data: authListener } = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        onNavigate('team-login');
      }
    });
  };

  const checkAuth = async () => {
    try {
      const { data } = await auth.getSession();
      if (data?.session?.user) {
        const userRole = data.session.user.user_metadata?.role;
        const isOwner = data.session.user.user_metadata?.is_owner;
        
        if (userRole !== 'admin' && userRole !== 'team' && !isOwner) {
          toast.error('Access denied. Invalid role.');
          onNavigate('team-login');
          return;
        }
        
        setUser(data.session.user);
        
        if (userRole === 'team' && !isOwner) {
             navigate('/dashboard/brand-guidelines');
        }
      } else {
        toast.error('Please log in to access the dashboard');
        onNavigate('team-login');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      onNavigate('team-login');
    }
  };

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      // Fetch user permissions from backend
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const accessToken = session.access_token;
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/team/members/${user.id}/permissions`;
        
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setProfile({
              id: user.id,
              email: user.email || '',
              full_name: user.user_metadata?.full_name || user.email || '',
              role: user.user_metadata?.role || 'team',
              permissions: data.permissions
            });
            return;
          }
        } catch (error) {
          console.warn('Failed to fetch permissions:', error);
        }
      }
      
      // Fallback if permissions fetch fails
      const { data, error } = await profiles.getProfile(user.id);
      if (error) {
        setProfile({
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email || '',
          role: user.user_metadata?.role || 'team'
        });
      } else if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.warn('Profile fetch exception (non-critical):', error);
      setProfile({
        id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || user.email || '',
        role: user.user_metadata?.role || 'team'
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success('Signed out successfully');
      onNavigate('team-login');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId) 
        : [...prev, groupId]
    );
  };

  const navGroups: NavGroup[] = [
    {
      id: 'home',
      title: 'Home',
      icon: LayoutDashboard,
      roles: ['admin', 'team'],
      items: [
        { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, viewId: 'main-dashboard', roles: ['admin', 'team'] },
        { id: 'weekly-tasks', title: 'Weekly Tasks', icon: CheckSquare, viewId: 'weekly-tasks-page', roles: ['admin', 'team'] },
        { id: 'notes', title: 'Notes', icon: StickyNote, viewId: 'notes-page', roles: ['admin', 'team'] },
      ]
    },
    {
      id: 'content',
      title: 'Content',
      icon: FolderKanban,
      roles: ['admin', 'team'],
      items: [
        { id: 'portfolio', title: 'Portfolio', icon: Image, viewId: 'portfolio-management', roles: ['admin'] },
        { id: 'blog', title: 'News', icon: FileText, viewId: 'blog-management', roles: ['admin'] },
        { id: 'gallery', title: 'Gallery', icon: Images, viewId: 'gallery-management', roles: ['admin'] },
        { id: 'pages', title: 'Pages', icon: FileText, viewId: 'additional-pages', roles: ['admin', 'team'] },
        { id: 'landing-pages', title: 'Funnel Brand Audit', icon: FileText, viewId: 'landing-pages-management', roles: ['admin', 'team'] },
        { id: 'funnel-analytics', title: 'Funnel Analytics', icon: BarChart3, viewId: 'funnel-analytics', roles: ['admin', 'team'] },
        { id: 'links', title: 'Links', icon: Link, viewId: 'links-management', roles: ['admin', 'team'] },
        { id: 'project-links', title: 'Project Links', icon: Link, viewId: 'project-links-management', roles: ['admin', 'team'] },
        { id: 'partners', title: 'Partners', icon: Users, viewId: 'partners', roles: ['admin', 'team'] },
        { id: 'affiliates', title: 'Affiliates', icon: TrendingUp, viewId: 'affiliates', roles: ['admin', 'team'] },
        { id: 'content-calendar', title: 'Content Calendar', icon: FileText, viewId: 'content-calendar', roles: ['admin', 'team'] },
        { id: 'pinterest-rss', title: 'Pinterest RSS', icon: Link, viewId: 'pinterest-rss', roles: ['admin', 'team'] },
      ]
    },
    {
      id: 'jobs',
      title: 'Jobs & Submissions',
      icon: Briefcase,
      roles: ['admin', 'team'],
      items: [
        { id: 'jobs', title: 'Jobs', icon: Briefcase, viewId: 'jobs-management', roles: ['admin', 'team'] },
        { id: 'submissions', title: 'Submissions', icon: FileText, viewId: 'submissions-management', roles: ['admin'] },
      ]
    },
    {
      id: 'team',
      title: 'Team & Users',
      icon: Users,
      roles: ['admin'],
      items: [
        { id: 'users', title: 'Users', icon: Users, viewId: 'user-management', roles: ['admin'] },
        { id: 'team-members', title: 'Team Members', icon: Users, viewId: 'team-management', roles: ['admin'] },
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: Zap,
      roles: ['admin', 'team'],
      items: [
        { id: 'meetings', title: 'Meetings', icon: Video, viewId: 'meetings-management', roles: ['admin', 'team'] },
        { id: 'elle', title: 'ELLE Automation', icon: Zap, viewId: 'elle-automation', roles: ['admin'] },
        { id: 'functions', title: 'Functions Automation', icon: Zap, viewId: 'functions-automation', roles: ['admin'] },
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: SettingsIcon,
      roles: ['admin', 'team'],
      items: [
        { id: 'brand', title: 'Brand Guidelines', icon: Gift, viewId: 'brand-guidelines', roles: ['admin', 'team'] },
        { id: 'brand-assets', title: 'Brand Assets', icon: FolderKanban, viewId: 'brand-assets', roles: ['admin', 'team'] },
        { id: 'services', title: 'Services', icon: FileText, viewId: 'services-page', roles: ['admin', 'team'] },
        { id: 'settings', title: 'Settings', icon: SettingsIcon, viewId: 'settings', roles: ['admin'] },
      ]
    },
    {
      id: 'resources',
      title: 'Resources & Templates',
      icon: Gift,
      roles: ['admin', 'team'],
      items: [
        { id: 'templates', title: 'Templates', icon: FileText, viewId: 'templates-page', roles: ['admin', 'team'] },
      ]
    },
    {
      id: 'sales',
      title: 'Sales',
      icon: Gift,
      roles: ['admin', 'team'],
      items: [
        { id: 'deals', title: 'Deals', icon: Gift, viewId: 'deals-page', roles: ['admin', 'team'] },
        { id: 'leads', title: 'Leads', icon: FileText, viewId: 'leads-page', roles: ['admin', 'team'] },
        { id: 'marketing-channels', title: 'Marketing Channels', icon: Link, viewId: 'marketing-channels-page', roles: ['admin', 'team'] },
        { id: 'acquisition-channels', title: 'Acquisition Channels', icon: Link, viewId: 'acquisition-channels-page', roles: ['admin', 'team'] },
        { id: 'invoices', title: 'Invoices', icon: FileText, viewId: 'invoices-page', roles: ['admin', 'team'] },
        { id: 'quotes', title: 'Quotes', icon: Gift, viewId: 'quotes-page', roles: ['admin', 'team'] },
        { id: 'pipeline', title: 'Pipeline', icon: Zap, viewId: 'pipeline-page', roles: ['admin', 'team'] },
        { id: 'email-marketing', title: 'Email Marketing', icon: Link, viewId: 'email-marketing-page', roles: ['admin', 'team'] },
        { id: 'heyreach', title: 'HeyReach', icon: Users, viewId: 'heyreach-dashboard', roles: ['admin', 'team'] },
      ]
    },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'portfolio-management':
        return <PortfolioManagement onNavigate={onNavigate} />;
      case 'jobs-management':
        return <JobManagement onNavigate={onNavigate} />;
      case 'brand-guidelines':
        return <BrandGuidelinesContent section={activeSection} />;
      case 'brand-assets':
        return <BrandAssets />;
      case 'user-management':
        return <UserManagement onNavigate={onNavigate} />;
      case 'blog-management':
        return <BlogManagement onNavigate={onNavigate} />;
      case 'settings':
        return <Settings onNavigate={onNavigate} />;
      case 'submissions-management':
        return <SubmissionsManagement onNavigate={onNavigate} />;
      case 'team-management':
        return <TeamMembersManagement onNavigate={onNavigate} />;
      case 'main-dashboard':
        return <MainDashboard profile={profile} onNavigate={(view: string) => setActiveView(view as DashboardView)} />;
      case 'meetings-management':
        return <MeetingsManagement onNavigate={onNavigate} />;
      case 'links-management':
        return <LinksManagement onNavigate={onNavigate} />;
      case 'project-links-management':
        return <ProjectLinksManagement onNavigate={onNavigate} />;
      case 'gallery-management':
        return <GalleryManagement onNavigate={onNavigate} />;
      case 'additional-pages':
        return <AdditionalPages onNavigate={onNavigate} />;
      case 'deals-page':
        return <DealsPage onNavigate={onNavigate} />;
      case 'leads-page':
        return <LeadsPage onNavigate={onNavigate} />;
      case 'services-page':
        return <ServicesPage onNavigate={onNavigate} />;
      case 'templates-page':
        return <TemplatesPage onNavigate={onNavigate} />;
      case 'marketing-channels-page':
        return <MarketingChannelsPage onNavigate={onNavigate} />;
      case 'acquisition-channels-page':
        return <AcquisitionChannelsPage onNavigate={onNavigate} />;
      case 'weekly-tasks-page':
        return <WeeklyTasksPage onNavigate={onNavigate} />;
      case 'invoices-page':
        return <InvoicesPage onNavigate={onNavigate} />;
      case 'quotes-page':
        return <QuotesPage onNavigate={onNavigate} />;
      case 'pipeline-page':
        return <PipelinePage onNavigate={onNavigate} />;
      case 'email-marketing-page':
        return <EmailMarketingPage onNavigate={onNavigate} />;
      case 'notes-page':
        return <NotesPage onNavigate={onNavigate} />;
      case 'content-calendar':
        return <ContentCalendar onNavigate={onNavigate} />;
      case 'pinterest-rss':
        return <PinterestRSSGallery onNavigate={onNavigate} />;
      case 'partners':
        return <PartnersPage onNavigate={onNavigate} />;
      case 'affiliates':
        return <AffiliatesPage onNavigate={onNavigate} />;
      case 'elle-automation':
        return <ELLEAutomationPage onNavigate={onNavigate} />;
      case 'heyreach-dashboard':
        return <HeyReachDashboard onNavigate={onNavigate} />;
      case 'functions-automation':
        return <FunctionsAutomation onNavigate={onNavigate} />;
      case 'landing-pages-management':
        return <LandingPagesManagement onNavigate={onNavigate} />;
      case 'funnel-analytics':
        return <FunnelAnalytics onNavigate={onNavigate} />;
      default:
        return <PortfolioManagement onNavigate={onNavigate} />;
    }
  };

  if (loading) {
    return (
      <div className="admin-portal min-h-screen flex items-center justify-center bg-[#0A0A0B]">
        <div className="text-white font-mono text-sm">Loading...</div>
      </div>
    );
  }

  const userRole = profile?.role || user?.user_metadata?.role;
  const isOwner = user?.user_metadata?.is_owner;

  return (
    <div className="admin-portal min-h-screen flex font-sans text-sm">
      {/* Mobile Overlay - Must be before sidebar for proper z-index */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#0A0A0B] border-r border-zinc-800/50 transition-all duration-300 z-50 flex flex-col overflow-hidden ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        {/* Header with Collapse Button */}
        <div className="px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between shrink-0 h-16 relative">
            {sidebarOpen ? (
               <>
                 <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate('home')}>
                      <img src={cieloLogo} alt="CIELO" className="h-10 w-auto object-contain" />
                  </div>
                  {/* Collapse Button - Desktop Only */}
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="w-6 h-6 rounded-full border border-zinc-800/50 bg-[#0A0A0B] flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-700/50 transition-all hidden lg:flex"
                    title="Collapse sidebar"
                  >
                    <ChevronLeft size={14} strokeWidth={2} />
                  </button>
               </>
            ) : (
               <>
                 <div className="w-full flex items-center justify-center">
                    <img src={cieloLogo} alt="CIELO" className="h-10 w-auto object-contain" />
                 </div>
                 {/* Expand Button - Desktop Only */}
                 <button
                   onClick={() => setSidebarOpen(!sidebarOpen)}
                   className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-zinc-800/50 bg-[#0A0A0B] flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-700/50 transition-all shadow-lg hidden lg:flex"
                   title="Expand sidebar"
                 >
                   <ChevronRight size={14} strokeWidth={2} />
                 </button>
               </>
            )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scroll">
            <div className="px-2 space-y-1">
                {/* Grouped Navigation Items */}
                {navGroups.map((group) => {
                  const GroupIcon = group.icon;
                  const isExpanded = expandedGroups.includes(group.id);
                  
                  // Filter group based on role
                  if (group.roles && !isOwner) {
                    if (!userRole || !group.roles.some(r => r === userRole)) {
                      return null;
                    }
                  }
                  
                  // Filter items based on role
                  const visibleItems = group.items.filter(item => {
                    if (item.roles && !isOwner) {
                      return userRole && item.roles.includes(userRole);
                    }
                    return true;
                  });

                  if (visibleItems.length === 0) return null;
                  
                  return (
                    <div key={group.id} className="mb-3">
                      {/* Group Header */}
                      <button
                        onClick={() => toggleGroup(group.id)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors rounded"
                      >
                        {sidebarOpen ? (
                          <>
                            <span className="flex-1 text-left truncate">{group.title}</span>
                            <ChevronDown 
                              size={14} 
                              strokeWidth={2}
                              className={`transition-transform text-zinc-600 ${isExpanded ? '' : '-rotate-90'}`}
                            />
                          </>
                        ) : (
                          <GroupIcon size={16} strokeWidth={1.5} />
                        )}
                      </button>

                      {/* Group Items */}
                      {isExpanded && sidebarOpen && (
                        <div className="mt-0.5 space-y-0.5">
                          {visibleItems.map((item) => {
                            const ItemIcon = item.icon;
                            const isActive = activeView === item.viewId;
                            
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  if (item.viewId) {
                                    navigate(viewToPathMap[item.viewId]);
                                    if (window.innerWidth < 1024) {
                                      setSidebarOpen(false);
                                    }
                                  }
                                }}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-all rounded ${
                                  isActive 
                                  ? 'text-white bg-zinc-900/70' 
                                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                                }`}
                              >
                                <ItemIcon size={16} strokeWidth={1.5} className="shrink-0" />
                                <span className="truncate">{item.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Collapsed state - show items as icons */}
                      {!sidebarOpen && (
                        <div className="mt-0.5">
                          {visibleItems.map((item) => {
                            const ItemIcon = item.icon;
                            const isActive = activeView === item.viewId;
                            
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  if (item.viewId) {
                                    navigate(viewToPathMap[item.viewId]);
                                  }
                                }}
                                className={`w-full flex items-center justify-center py-2 transition-all rounded ${
                                  isActive 
                                  ? 'text-white bg-zinc-900/70' 
                                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
                                }`}
                                title={item.title}
                              >
                                <ItemIcon size={16} strokeWidth={1.5} />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-zinc-800/50 shrink-0 bg-[#0A0A0B]">
             {sidebarOpen ? (
                <div className="flex items-center gap-3 px-2">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800/50 flex items-center justify-center text-zinc-500">
                         <User size={14} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                         <p className="text-xs text-zinc-400 truncate">{profile?.full_name || 'User'}</p>
                         <p className="text-[10px] text-zinc-600 truncate">{profile?.email}</p>
                    </div>
                     <button 
                       onClick={handleSignOut} 
                       className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                       title="Sign out"
                     >
                        <LogOut size={14} strokeWidth={1.5} />
                     </button>
                </div>
             ) : (
                <div className="flex flex-col items-center gap-4">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800/50 flex items-center justify-center text-zinc-500">
                         <User size={14} strokeWidth={1.5} />
                    </div>
                    <button onClick={handleSignOut} className="text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer" title="Sign out">
                        <LogOut size={14} strokeWidth={1.5} />
                    </button>
                </div>
             )}
        </div>

      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 bg-[#0A0A0B] w-full min-w-0 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        {/* Mobile Header */}
        <header className="lg:hidden border-b border-zinc-800/50 bg-[#0A0A0B] sticky top-0 z-40">
          <div className="px-4 py-4 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <button
                onClick={() => setSidebarOpen(true)}
                className="p-3 hover:bg-zinc-900 rounded-lg transition-colors text-zinc-300 hover:text-white active:bg-zinc-800"
                aria-label="Open menu"
                >
                    <Menu size={24} strokeWidth={2} />
                </button>
                <img src={cieloLogo} alt="CIELO" className="h-7 w-auto object-contain" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="min-h-screen bg-[#0A0A0B] text-zinc-300 p-4 md:p-6 w-full overflow-x-hidden">
          {renderContent()}
        </main>
      </div>
      
      <style>{`
        .custom-scroll::-webkit-scrollbar { display: none; }
        .custom-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}