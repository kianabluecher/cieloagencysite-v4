import { ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import cieloLogo from 'figma:asset/f5ffcf57ca4f4f9d093dc30416ff6cec00f08b1d.png';
import cieloLogoBlack from 'figma:asset/aac9ea24336380213e0d0543a8f002bef7eda579.png';

interface FooterProps {
  onNavigate: (page: string) => void;
  lightTheme?: boolean;
}

export function Footer({ onNavigate, lightTheme = false }: FooterProps) {
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);
  const [isLoginsOpen, setIsLoginsOpen] = useState(false);

  const serviceLinks = [
    { label: 'Brand & Web', page: 'brand-web' },
    { label: 'Social Media', page: 'social-media' },
    { label: 'Brand Management', page: 'brand-management' },
    { label: 'Ventures', page: 'ventures' },
    { label: 'Development', page: 'development' },
    { label: 'Design Subscription', page: 'design-subscription' },
    { label: 'AI Consulting', page: 'ai-consulting' },
    { label: 'Pitch Deck Design', page: 'pitch-deck-design' },
    { label: 'Consulting', page: 'consulting' },
    { label: 'Marketing', page: 'marketing' },
  ];

  const additionalServices = [
    { label: 'SEO & GEO', page: 'seo-geo', badge: 'GET FOUND BY AI', badgeColor: 'green' },
    { label: 'PR & Media Relations', page: 'pr-media' },
    { label: 'Influencer Marketing', page: 'influencer-marketing' },
    { label: 'Lead Gen', page: 'lead-gen' },
    { label: 'Print Design & Collateral', page: 'print-collateral' },
    { label: 'Video & Motion Design', page: 'video-motion' },
    { label: 'Video & Photo', page: 'video-photo' },
    { label: 'Photography', page: 'photography' },
    { label: 'Packaging Design', page: 'packaging-design' },
    { label: 'CGI & 3D Campaigns', page: 'cgi-campaigns' },
    { label: 'AI Content', page: 'ai-content' },
    { label: 'Event Branding', page: 'event-branding' },
    { label: 'Email Marketing', page: 'email-marketing' },
    { label: 'Creative Direction', page: 'creative-direction' },
    { label: 'Brand Identity & Strategy', page: 'void-strategy' },
  ];

  const company = [
    { label: 'About Us', page: 'about' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Jobs', page: 'jobs', badge: "WE'RE HIRING" },
  ];

  const logins = [
    { label: 'Admin Login', page: 'team-login' },
    { label: 'Team Login', page: 'team-login' },
    { label: 'Client Login', page: 'client-login' },
  ];

  const offersFreebies = [
    { label: 'Moodboard', url: 'https://try.cielo.agency/moodboard' },
    { label: '5 Min Audit', page: 'brand-audit' },
    { label: 'Request a Proposal', page: 'rfp' },
  ];

  const brands = [
    { label: 'CIELO Studio', url: 'https://studio.cielo.agency/', badge: 'DESIGN SUBSCRIPTION', badgeStack: true },
    { label: 'CIELO Holdings', url: 'https://cielo.holdings/' },
    { label: 'CIELO OS', url: 'https://os.cielo.agency/' },
    { label: 'AcenosX', url: 'http://acenosx.com/' },
    { label: 'Aleph Zero', url: 'https://alephzeros.com/' },
  ];

  const socials = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/cieloagency/' },
    { label: 'Pinterest', url: 'https://www.pinterest.com/cieloagencyllc/_created/' },
  ];

  return (
    <footer className={`relative border-t overflow-hidden ${
      lightTheme 
        ? 'border-neutral-200 bg-white' 
        : 'border-[rgba(31,34,40,0.5)] bg-neutral-950'
    }`}>
      {/* Simple Blue Gradient Glow from Bottom - Only for dark theme */}
      {!lightTheme && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(70, 100, 150, 0.15) 0%, rgba(50, 80, 130, 0.08) 30%, transparent 60%)',
            }}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* Main Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1">
            <div className="mb-4">
              <img 
                src={lightTheme ? cieloLogoBlack : cieloLogo} 
                alt="CIELO Agency" 
                className="h-7 w-auto"
              />
            </div>
            <p className={`text-xs leading-relaxed ${lightTheme ? 'text-neutral-600' : 'text-[#7d8187]'}`}>
              Brand-first. Strategy-backed. Execution-powered.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className={`font-['Geist_Mono'] text-[10px] tracking-[1.2px] uppercase mb-4 ${
              lightTheme ? 'text-neutral-500' : 'text-[#7d8187]'
            }`}>
              Services
            </h4>
            <div className="space-y-3">
              {serviceLinks.map((service, index) => (
                <button
                  key={`${service.page}-${index}`}
                  onClick={() => onNavigate(service.page)}
                  className={`block transition-colors text-left text-sm cursor-pointer ${
                    lightTheme 
                      ? 'text-neutral-900 hover:text-neutral-600' 
                      : 'text-white hover:text-[#7d8187]'
                  }`}
                >
                  {service.label}
                </button>
              ))}
              
              {/* Additional Dropdown */}
              <div className="mt-4">
                <button 
                  onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
                  className={`flex items-center gap-1.5 transition-colors text-left text-sm cursor-pointer ${
                  lightTheme 
                    ? 'text-neutral-900 hover:text-neutral-600' 
                    : 'text-white hover:text-[#7d8187]'
                }`}>
                  <span>Additional</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform ${isAdditionalOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Vertical Dropdown Menu */}
                <div className={`mt-0 overflow-hidden transition-all duration-500 ease-in-out ${
                  isAdditionalOpen ? 'max-h-[1000px]' : 'max-h-0'
                }`}>
                  <div className="pt-3 space-y-0">
                    {additionalServices.map((service, index) => (
                      <div key={index}>
                        {index > 0 && (
                          <div className={`h-px my-2 ${lightTheme ? 'bg-neutral-200' : 'bg-[#1f2228]'}`}></div>
                        )}
                        <button
                          onClick={() => onNavigate(service.page)}
                          className={`flex items-center gap-2 transition-colors text-left w-full text-sm cursor-pointer ${
                            lightTheme 
                              ? 'text-neutral-600 hover:text-neutral-900' 
                              : 'text-[#7d8187] hover:text-white'
                          }`}
                        >
                          {service.label}
                          {service.badge && (
                            <span className="px-2 py-0.5 rounded text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 font-['Geist_Mono'] uppercase tracking-wider whitespace-nowrap">
                              {service.badge}
                            </span>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className={`font-['Geist_Mono'] text-[10px] tracking-[1.2px] uppercase mb-4 ${
              lightTheme ? 'text-neutral-500' : 'text-[#7d8187]'
            }`}>
              Company
            </h4>
            <div className="space-y-3">
              {company.map((item, index) => (
                item.url ? (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 transition-colors text-left text-sm cursor-pointer ${
                      lightTheme 
                        ? 'text-neutral-900 hover:text-neutral-600' 
                        : 'text-white hover:text-[#7d8187]'
                    }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 font-['Geist_Mono'] uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ) : (
                  <button
                    key={item.page}
                    onClick={() => onNavigate(item.page)}
                    className={`flex items-center gap-2 transition-colors text-left text-sm cursor-pointer ${
                      lightTheme 
                        ? 'text-neutral-900 hover:text-neutral-600' 
                        : 'text-white hover:text-[#7d8187]'
                    }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 font-['Geist_Mono'] uppercase tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              ))}

              {/* Login Dropdown */}
              <div className="mt-4">
                <button 
                  onClick={() => setIsLoginsOpen(!isLoginsOpen)}
                  className={`flex items-center gap-1.5 transition-colors text-left text-sm cursor-pointer ${
                  lightTheme 
                    ? 'text-neutral-900 hover:text-neutral-600' 
                    : 'text-white hover:text-[#7d8187]'
                }`}>
                  <span>Logins</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform ${isLoginsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Vertical Dropdown Menu */}
                <div className={`mt-0 overflow-hidden transition-all duration-300 ease-in-out ${
                  isLoginsOpen ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="pt-3 space-y-0">
                    {logins.map((login, index) => (
                      <div key={index}>
                        {index > 0 && (
                          <div className={`h-px my-2 ${lightTheme ? 'bg-neutral-200' : 'bg-[#1f2228]'}`}></div>
                        )}
                        <button
                          onClick={() => onNavigate(login.page)}
                          className={`flex items-center gap-2 transition-colors text-left w-full text-sm cursor-pointer ${
                            lightTheme 
                              ? 'text-neutral-600 hover:text-neutral-900' 
                              : 'text-[#7d8187] hover:text-white'
                          }`}
                        >
                          {login.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Offers & Freebies */}
          <div>
            <h4 className={`font-['Geist_Mono'] text-[10px] tracking-[1.2px] uppercase mb-4 ${
              lightTheme ? 'text-neutral-500' : 'text-[#7d8187]'
            }`}>
              Offers & Freebies
            </h4>
            <div className="space-y-3">
              {offersFreebies.map((item, index) => (
                item.url ? (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block transition-colors text-left text-sm cursor-pointer ${
                      lightTheme 
                        ? 'text-neutral-900 hover:text-neutral-600' 
                        : 'text-white hover:text-[#7d8187]'
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={index}
                    onClick={() => item.page && onNavigate(item.page)}
                    className={`block transition-colors text-left text-sm cursor-pointer ${
                      lightTheme 
                        ? 'text-neutral-900 hover:text-neutral-600' 
                        : 'text-white hover:text-[#7d8187]'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className={`font-['Geist_Mono'] text-[10px] tracking-[1.2px] uppercase mb-4 ${
              lightTheme ? 'text-neutral-500' : 'text-[#7d8187]'
            }`}>
              Brands
            </h4>
            <div className="space-y-3">
              {brands.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 transition-colors text-sm cursor-pointer ${
                    lightTheme 
                      ? 'text-neutral-900 hover:text-neutral-600' 
                      : 'text-white hover:text-[#7d8187]'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded text-[9px] bg-green-500/20 text-green-400 border border-green-500/30 font-['Geist_Mono'] uppercase tracking-wider ${
                      // @ts-ignore
                      item.badgeStack ? 'flex flex-col items-center leading-[1.1] text-center' : 'whitespace-nowrap'
                    }`}>
                      {/* @ts-ignore */}
                      {item.badgeStack ? item.badge.split(' ').map((word, i) => <span key={i}>{word}</span>) : item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className={`font-['Geist_Mono'] text-[10px] tracking-[1.2px] uppercase mb-4 ${
              lightTheme ? 'text-neutral-500' : 'text-[#7d8187]'
            }`}>
              Socials
            </h4>
            <div className="space-y-3">
              {socials.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block transition-colors text-sm cursor-pointer ${
                    lightTheme 
                      ? 'text-neutral-900 hover:text-neutral-600' 
                      : 'text-white hover:text-[#7d8187]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section Below - Full Width */}
        <div className={`mt-16 pt-8 border-t ${lightTheme ? 'border-neutral-200' : 'border-[#1f2228]'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <a
              href="mailto:hello@cielo.agency"
              className={`transition-colors cursor-pointer ${
                lightTheme 
                  ? 'text-neutral-900 hover:text-neutral-600' 
                  : 'text-white hover:text-[#7d8187]'
              }`}
            >
              hello@cielo.agency
            </a>
            <button
              onClick={(e) => handleNavigate(e, 'pricing-download')}
              className={`px-6 py-2.5 rounded-full border font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase transition-colors cursor-pointer ${ 
                lightTheme 
                  ? 'border-neutral-300 text-neutral-900 hover:border-neutral-900' 
                  : 'border-[rgba(255,255,255,0.3)] text-white hover:border-white'
              }`}
            >
              Get a Quote
            </button>
            <a 
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7373327741313626112" 
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 transition-colors font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase underline underline-offset-4 cursor-pointer ${
                lightTheme 
                  ? 'text-neutral-900 hover:text-neutral-600' 
                  : 'text-white hover:text-[#7d8187]'
              }`}
            >
              RECEIVE WEEKLY BRAND & AI NEWS
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className={`mt-16 pt-8 border-t ${lightTheme ? 'border-neutral-200' : 'border-[#1f2228]'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${lightTheme ? 'text-neutral-600' : 'text-[#7d8187]'}`}>
              © 2025 CIELO Agency. All rights reserved.
            </p>
            <p className={`text-sm font-['Geist_Mono'] tracking-wider ${lightTheme ? 'text-neutral-600' : 'text-[#7d8187]'}`}>
              LET'S GROW YOUR BRAND LIKE A BUSINESS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}