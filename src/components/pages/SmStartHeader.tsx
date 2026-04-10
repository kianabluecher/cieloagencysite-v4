interface SmStartHeaderProps {
  onNavigate: (page: string) => void;
}

export function SmStartHeader({ onNavigate }: SmStartHeaderProps) {
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 py-4 px-6 z-50">
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" onClick={(e) => handleNavigate(e, 'home')} className="flex items-center cursor-pointer">
          <div className="text-[#145AFF] font-semibold text-xl tracking-tight">
            CIELO
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/brand-web" onClick={(e) => handleNavigate(e, 'brand-web')} className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer">
            Brand & Web
          </a>
          <a href="/social-media" onClick={(e) => handleNavigate(e, 'social-media')} className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer">
            Social Media
          </a>
          <a href="/about" onClick={(e) => handleNavigate(e, 'about')} className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer">
            About
          </a>
          <a href="/portfolio" onClick={(e) => handleNavigate(e, 'portfolio')} className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer">
            Portfolio
          </a>
          <a href="/ventures" onClick={(e) => handleNavigate(e, 'ventures')} className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer">
            Ventures
          </a>
          <a href="/consulting" onClick={(e) => handleNavigate(e, 'consulting')} className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer">
            Consulting
          </a>
        </div>

        {/* CTA Button */}
        <a
          href="/contact"
          onClick={(e) => handleNavigate(e, 'contact')}
          className="hidden md:block bg-[#145AFF] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#0d47cc] transition-colors cursor-pointer"
        >
          Get Started
        </a>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-neutral-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}