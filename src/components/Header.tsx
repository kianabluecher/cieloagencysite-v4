import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import cieloLogo from 'figma:asset/f5ffcf57ca4f4f9d093dc30416ff6cec00f08b1d.png';
import cieloLogoBlack from 'figma:asset/aac9ea24336380213e0d0543a8f002bef7eda579.png';
import signupImage from 'figma:asset/5da311bd486110d77bf1c4c137991ab9cdbf8d73.png';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isSubServicePage?: boolean;
  isLightTheme?: boolean;
  isGreyTheme?: boolean;
  customScrollThreshold?: number;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  published_date: string;
  featured_image: string;
}

export function Header({ currentPage, onNavigate, isSubServicePage = false, isLightTheme = false, isGreyTheme = false, customScrollThreshold = 50 }: HeaderProps) {
  const isHomePage = currentPage === 'home';
  const isVenturesPage = currentPage === 'ventures';
  const isSocialMediaPage = currentPage === 'social-media';
  const isAboutPage = currentPage === 'about';
  // Pages that start transparent and get a gradient/glass effect on scroll
  const isTransparentPage = isVenturesPage || isSocialMediaPage || isAboutPage || isSubServicePage;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  // Fetch latest blog posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        console.log('Fetching latest blog posts...');
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/blog/posts?limit=2`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('Blog posts response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Blog posts data:', data);
          setLatestPosts(data.posts || []);
        } else {
          console.error('Failed to fetch blog posts:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchLatestPosts();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // For home page, only show background after scrolling past the hero section (viewport height)
      if (isHomePage) {
        setIsScrolled(window.scrollY > window.innerHeight - 100);
      } else {
        setIsScrolled(window.scrollY > customScrollThreshold);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, customScrollThreshold]);

  const pages = [
    { id: 'home', label: 'HOME' },
    { id: 'brand-web', label: 'BRAND & WEB' },
    { id: 'social-media', label: 'SOCIAL MEDIA' },
    { id: 'about', label: 'ABOUT' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'consulting', label: 'CONSULTING' },
    { id: 'blog', label: 'NEWS' },
  ];

  const servicePages = [
    { id: 'brand-design', label: 'Branding & Strategy' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'animation-3d', label: 'Animation / 3D' },
    { id: 'cgi-campaigns', label: 'CGI' },
    { id: 'ai-business-intelligence', label: 'AI / Analytics & BI' },
    { id: 'ai-operations', label: 'AI / Operations' },
    { id: 'ads-creatives', label: 'Ads & Creatives' },
    { id: 'pitch-deck-design', label: 'Pitch Deck Design' },
    { id: 'pr-media', label: 'PR' },
    { id: 'video-photo', label: 'Video & Photo' },
    { id: 'development', label: 'Development' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'outbound', label: 'Outbound' },
    { id: 'marketing-collateral', label: 'Marketing Collateral' },
    { id: 'influencer-event-marketing', label: 'Influencer / Event Marketing' },
  ];

  const getHeaderClass = () => {
    // Grey theme for Rapid Delivery page - solid white background with border
    if (isGreyTheme) {
      return "fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200";
    }
    
    // If services dropdown is open, make background black
    if (servicesDropdownOpen) {
      return "fixed top-0 left-0 right-0 z-50 bg-black transition-all duration-300 ease-out";
    }
    
    // Home page: no background initially, solid background when scrolled
    if (isHomePage) {
      return isScrolled 
        ? "fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md transition-all duration-700 ease-out"
        : "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out";
    }
    
    // Ventures and social media pages: gradient background when scrolled
    if (isTransparentPage) {
      return "fixed top-0 left-0 right-0 z-50";
    }
    
    // All other pages: always have solid background
    return "fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md";
  };

  const getHeaderStyle = () => {
    // Grey theme: no additional styles needed, using Tailwind classes
    if (isGreyTheme) {
      return {};
    }
    
    // Portfolio 2 page: always has black gradient dissolving to bottom with 0% opacity
    if (isLightTheme) {
      return {
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
      };
    }
    
    if (isScrolled && isTransparentPage) {
      return {
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)'
      };
    }
    return {};
  };

  return (
    <header className={`${getHeaderClass()} transition-all duration-700 ease-out`} style={getHeaderStyle()}>
      <nav className="mx-auto w-full px-6 lg:px-8 xl:px-12 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer"
          >
            <img 
              src={isGreyTheme ? cieloLogoBlack : cieloLogo} 
              alt="CIELO Agency" 
              className="h-8 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {pages.slice(1, 3).map((page) => (
              <button
                key={page.id}
                onClick={() => onNavigate(page.id)}
                className={`font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase transition-colors flex items-center gap-2 cursor-pointer ${
                  isGreyTheme
                    ? currentPage === page.id
                      ? 'text-neutral-950'
                      : 'text-neutral-500 hover:text-neutral-950'
                    : isLightTheme
                    ? currentPage === page.id
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                    : currentPage === page.id
                      ? 'text-white'
                      : 'text-[rgba(255,255,255,0.5)] hover:text-white'
                }`}
              >
                {page.label}
              </button>
            ))}
            
            {/* SERVICES Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase transition-colors flex items-center gap-1 cursor-pointer ${
                  isGreyTheme
                    ? 'text-neutral-500 hover:text-neutral-950'
                    : isLightTheme
                    ? 'text-white/60 hover:text-white'
                    : 'text-[rgba(255,255,255,0.5)] hover:text-white'
                }`}
              >
                SERVICES
                <ChevronDown size={14} className={`transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`fixed left-0 right-0 top-[48px] ${ 
                      isGreyTheme 
                        ? 'bg-white border-t border-b border-neutral-200' 
                        : 'bg-neutral-950/95 backdrop-blur-md border-t border-b border-white/10'
                    } shadow-2xl`}
                    style={{ zIndex: 40 }}
                  >
                    <div className="max-w-7xl mx-auto px-6 py-12">
                      <div className="grid grid-cols-12 gap-8">
                        {/* Left Column - Navigation */}
                        <div className="col-span-3">
                          <div className="space-y-1">
                            <h3 className={`font-['Geist_Mono'] text-[10px] tracking-[1.4px] uppercase mb-6 ${
                              isGreyTheme ? 'text-neutral-400' : 'text-white/40'
                            }`}>
                              NAVIGATION
                            </h3>
                            <div className="space-y-0.5">
                              {servicePages.map((service) => (
                                <button
                                  key={service.id}
                                  onClick={() => {
                                    onNavigate(service.id);
                                    setServicesDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2.5 text-base transition-colors flex items-center gap-2 ${ 
                                    isGreyTheme
                                      ? 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50'
                                      : 'text-white/70 hover:text-white hover:bg-white/5'
                                  }`}
                                  style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}
                                >
                                  <span className="text-white">↳</span>
                                  {service.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Middle Column - Latest News */}
                        <div className="col-span-6">
                          <div className="flex items-start justify-between mb-6">
                            <h3 className={`font-['Geist_Mono'] text-[10px] tracking-[1.4px] uppercase ${
                              isGreyTheme ? 'text-neutral-400' : 'text-white/40'
                            }`}>
                              LATEST NEWS
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            {latestPosts.length === 0 ? (
                              // Fallback cards if no posts loaded
                              <>
                                <div className="space-y-3">
                                  <div className={`aspect-[16/10] rounded-sm overflow-hidden ${
                                    isGreyTheme ? 'bg-neutral-100' : 'bg-white/5'
                                  }`}>
                                    <div className={`w-full h-full flex items-center justify-center ${
                                      isGreyTheme ? 'text-neutral-300' : 'text-white/20'
                                    }`}>
                                      <span className="font-['Geist_Mono'] text-xs">NEWS IMAGE</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className={`font-['Geist_Mono'] text-[10px] tracking-[1.4px] uppercase mb-2 ${
                                      isGreyTheme ? 'text-neutral-400' : 'text-white/40'
                                    }`}>
                                      CIELO: MARCH 12, 2026
                                    </p>
                                    <h4 className={`font-['Archivo'] text-sm mb-2 ${
                                      isGreyTheme ? 'text-neutral-900' : 'text-white'
                                    }`}>
                                      New AI Operations Service Launched
                                    </h4>
                                    <p className={`font-['Archivo'] text-xs leading-relaxed ${
                                      isGreyTheme ? 'text-neutral-600' : 'text-white/60'
                                    }`}>
                                      CIELO introduces AI-powered operations consulting to help businesses automate workflows and scale teams.
                                    </p>
                                    <button
                                      onClick={() => {
                                        onNavigate('blog');
                                        setServicesDropdownOpen(false);
                                      }}
                                      className={`font-['Geist_Mono'] text-[10px] tracking-[1.4px] uppercase mt-3 flex items-center gap-1 ${
                                        isGreyTheme 
                                          ? 'text-neutral-600 hover:text-neutral-950' 
                                          : 'text-white/60 hover:text-white'
                                      }`}
                                    >
                                      ↳ Read More
                                    </button>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div className={`aspect-[16/10] rounded-sm overflow-hidden ${
                                    isGreyTheme ? 'bg-neutral-100' : 'bg-white/5'
                                  }`}>
                                    <div className={`w-full h-full flex items-center justify-center ${
                                      isGreyTheme ? 'text-neutral-300' : 'text-white/20'
                                    }`}>
                                      <span className="font-['Geist_Mono'] text-xs">NEWS IMAGE</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className={`font-['Geist_Mono'] text-[10px] tracking-[1.4px] uppercase mb-2 ${
                                      isGreyTheme ? 'text-neutral-400' : 'text-white/40'
                                    }`}>
                                      AWARDS: FEBRUARY 28, 2026
                                    </p>
                                    <h4 className={`font-['Archivo'] text-sm mb-2 ${
                                      isGreyTheme ? 'text-neutral-900' : 'text-white'
                                    }`}>
                                      Creative Testing System Drives 3x ROAS
                                    </h4>
                                    <p className={`font-['Archivo'] text-xs leading-relaxed ${
                                      isGreyTheme ? 'text-neutral-600' : 'text-white/60'
                                    }`}>
                                      Our data-driven ad creative system analyzed 10,000+ winning campaigns to triple client returns.
                                    </p>
                                    <button
                                      onClick={() => {
                                        onNavigate('blog');
                                        setServicesDropdownOpen(false);
                                      }}
                                      className={`font-['Geist_Mono'] text-[10px] tracking-[1.4px] uppercase mt-3 flex items-center gap-1 ${
                                        isGreyTheme 
                                          ? 'text-neutral-600 hover:text-neutral-950' 
                                          : 'text-white/60 hover:text-white'
                                      }`}
                                    >
                                      ↳ Read More
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              // Dynamic blog posts
                              latestPosts.map((post) => (
                                <div key={post.id} className="space-y-3">
                                  <div className={`aspect-[16/10] rounded-sm overflow-hidden ${
                                    isGreyTheme ? 'bg-neutral-100' : 'bg-white/5'
                                  }`}>
                                    {post.featured_image ? (
                                      <img 
                                        src={post.featured_image} 
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className={`w-full h-full flex items-center justify-center ${
                                        isGreyTheme ? 'text-neutral-300' : 'text-white/20'
                                      }`}>
                                        <span className="font-['Geist_Mono'] text-xs">NEWS IMAGE</span>
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <p className={`font-['Geist_Mono'] text-[10px] tracking-[1.4px] uppercase mb-2 ${
                                      isGreyTheme ? 'text-neutral-400' : 'text-white/40'
                                    }`}>
                                      {post.category.toUpperCase()}: {new Date(post.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
                                    </p>
                                    <h4 className={`font-['Archivo'] text-sm mb-2 ${
                                      isGreyTheme ? 'text-neutral-900' : 'text-white'
                                    }`}>
                                      {post.title}
                                    </h4>
                                    <p className={`font-['Archivo'] text-xs leading-relaxed ${
                                      isGreyTheme ? 'text-neutral-600' : 'text-white/60'
                                    }`}>
                                      {post.excerpt}
                                    </p>
                                    <button
                                      onClick={() => {
                                        onNavigate('blog', post.slug);
                                        setServicesDropdownOpen(false);
                                      }}
                                      className={`font-['Archivo'] text-xs mt-3 flex items-center gap-1 ${
                                        isGreyTheme 
                                          ? 'text-neutral-600 hover:text-neutral-950' 
                                          : 'text-white/60 hover:text-white'
                                      }`}
                                    >
                                      ↳ Read More
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Right Column - Offerings */}
                        <div className="col-span-3">
                          <div className="space-y-4">
                            {/* Sign Up Image */}
                            <div className="rounded-lg overflow-hidden">
                              <img 
                                src={signupImage} 
                                alt="Free Signup" 
                                className="w-full h-auto"
                              />
                            </div>
                            
                            {/* Sign Up Button */}
                            <a
                              href="https://app.cielo.agency/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`
                                w-full 
                                px-6 py-3 
                                rounded-full 
                                border 
                                font-['Geist_Mono'] 
                                text-sm 
                                tracking-[1.4px] 
                                uppercase 
                                transition-all 
                                cursor-pointer
                                flex items-center justify-center
                                ${
                                  isGreyTheme
                                    ? 'border-neutral-300 text-neutral-950 hover:bg-neutral-950 hover:text-white'
                                    : 'border-white/30 text-white hover:bg-white hover:text-black'
                                }
                              `}
                            >
                              Sign Up
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {pages.slice(3).map((page) => (
              <button
                key={page.id}
                onClick={() => onNavigate(page.id)}
                className={`font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase transition-colors flex items-center gap-2 cursor-pointer ${
                  isGreyTheme
                    ? currentPage === page.id
                      ? 'text-neutral-950'
                      : 'text-neutral-500 hover:text-neutral-950'
                    : isLightTheme
                    ? currentPage === page.id
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                    : currentPage === page.id
                      ? 'text-white'
                      : 'text-[rgba(255,255,255,0.5)] hover:text-white'
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>

          {/* Let's Talk & Sign Up Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://app.cielo.agency/"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                px-6 py-3 
                font-['Geist_Mono'] 
                text-sm 
                tracking-[1.4px] 
                uppercase 
                transition-all 
                cursor-pointer
                ${
                isGreyTheme
                  ? 'text-neutral-950 hover:text-neutral-600'
                  : isLightTheme
                  ? 'text-neutral-950 hover:text-neutral-600'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Sign Up
            </a>
            <a
              href="https://app.apollo.io/#/meet/cieloagency/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                px-8 py-3 
                rounded-full 
                border 
                font-['Geist_Mono'] 
                text-sm 
                tracking-[1.4px] 
                uppercase 
                transition-all 
                cursor-pointer
                ${
                isGreyTheme
                  ? 'border-neutral-300 text-neutral-950 hover:border-neutral-950'
                  : isLightTheme
                  ? 'border-white/30 text-white hover:border-white'
                  : 'border-[rgba(255,255,255,0.3)] text-white hover:border-white'
              }`}
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden cursor-pointer ${isGreyTheme ? 'text-neutral-950' : isLightTheme ? 'text-neutral-950' : 'text-white'}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden fixed inset-0 bg-black z-[9999] flex flex-col h-screen w-screen"
            >
              {/* Header with Close Button Only */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center justify-end px-8 py-8"
              >
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white cursor-pointer"
                >
                  <X size={32} />
                </button>
              </motion.div>

              {/* Menu Items - Centered and Large */}
              <div className="flex-1 px-8 flex flex-col justify-center bg-black">
                {pages.map((page, index) => (
                  <motion.div 
                    key={page.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.1 + (index * 0.05),
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <button
                      onClick={() => {
                        onNavigate(page.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left py-5 font-['Geist_Mono'] text-4xl tracking-[1.4px] uppercase transition-colors flex items-center gap-3 cursor-pointer ${
                        currentPage === page.id
                          ? 'text-white'
                          : 'text-white/50 hover:text-white'
                      }`}
                      style={{ fontWeight: 300 }}
                    >
                      {page.label}
                    </button>
                    <div className="border-b border-white/10" />
                  </motion.div>
                ))}
              </div>

              {/* Call Button at Bottom */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="px-8 pb-12"
              >
                <a
                  href="https://app.apollo.io/#/meet/cieloagency/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-8 py-5 rounded-full border border-white/30 text-white font-['Geist_Mono'] text-base tracking-[1.4px] uppercase hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  Let's Talk
                  <ArrowUpRight size={24} strokeWidth={2} />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}