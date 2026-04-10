import { Rocket, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface VenturesProps {
  onNavigate: (page: string) => void;
}

export function Ventures({ onNavigate }: VenturesProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const textSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame to avoid forced reflow
      requestAnimationFrame(() => {
        if (textSectionRef.current) {
          const rect = textSectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
        
          if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
            // Progress from 0 to 1 as user scrolls through the section - starts earlier now
            const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.6 + sectionHeight / 2)));
            setScrollProgress(progress);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const offerings = [
    {
      icon: Rocket,
      title: 'Brand incubation and launch support',
      description: 'Full brand systems built for new ventures from day one',
    },
    {
      icon: TrendingUp,
      title: 'Content infrastructure setup',
      description: 'Establish content engines and growth systems',
    },
    {
      icon: Users,
      title: 'Fractional creative and growth leadership',
      description: 'On-demand strategic guidance without full-time overhead',
    },
    {
      icon: Lightbulb,
      title: 'Strategic partnerships and equity models',
      description: 'Co-create and invest in the ventures we believe in',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-32 overflow-hidden min-h-[80vh] flex items-center">
        {/* Gradient Background - extends to top */}
        <div className="absolute inset-0 -top-32 bg-gradient-to-b from-[#2a3344] via-[#1a1f2e] to-neutral-950"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Ventures ]
            </p>
          </div>
          
          {/* Large 3D Title */}
          <h1 
            className="text-[7vw] md:text-[5vw] lg:text-[100px] tracking-tight mb-16 leading-[0.9]"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: '300',
              background: 'linear-gradient(180deg, #ffffff 0%, #ffffff 50%, rgba(255,255,255,0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)',
              letterSpacing: '-0.02em',
            }}
          >
            Creative Infrastructure<br />for Builders
          </h1>
          
          <p className="text-lg md:text-xl text-[#b4bac1] leading-relaxed max-w-4xl">
            CIELO Ventures partners with founders and operators to build, brand, and grow new ventures.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section ref={textSectionRef} className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl tracking-tight" style={{ fontWeight: 400 }}>
              {(() => {
                const text = "We co-create the systems, brand engines, and creative foundations that turn ideas into scalable companies.";
                const chars = text.split('');
                
                return chars.map((char, index) => {
                  const charProgress = index / chars.length;
                  const isRevealed = scrollProgress > charProgress;
                  
                  return (
                    <span
                      key={index}
                      style={{
                        color: isRevealed ? '#ffffff' : '#4a4f55',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {char}
                    </span>
                  );
                });
              })()}
            </h2>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white tracking-tight mb-16">
            We offer:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Brand Incubation */}
            <div className="relative p-8 border border-[#1f2228] bg-[#0a0b0d] hover:border-[rgba(255,255,255,0.15)] transition-all group overflow-hidden aspect-[3/2] flex flex-col justify-between">
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                background: 'linear-gradient(to bottom, rgba(100, 100, 100, 0.08) 0%, rgba(60, 60, 60, 0.12) 100%)'
              }}></div>
              
              {/* Graphic - Timeline/Phases */}
              <div className="mb-4 flex-1 flex items-center justify-center relative z-10">
                <svg width="100%" height="100" viewBox="0 0 280 100" fill="none" className="max-w-full">
                  {/* Timeline Base */}
                  <line x1="40" y1="50" x2="240" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  
                  {/* Phase 1 */}
                  <circle cx="60" cy="50" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="#0a0b0d"/>
                  <circle cx="60" cy="50" r="2" fill="rgba(255,255,255,0.5)"/>
                  
                  {/* Phase 2 */}
                  <circle cx="110" cy="50" r="5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="#0a0b0d"/>
                  <circle cx="110" cy="50" r="2" fill="rgba(255,255,255,0.5)"/>
                  
                  {/* Phase 3 - Active */}
                  <rect x="150" y="38" width="30" height="24" rx="3" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
                  <circle cx="165" cy="50" r="3" fill="rgba(255,255,255,0.7)"/>
                  
                  {/* Phase 4 */}
                  <circle cx="215" cy="50" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="#0a0b0d"/>
                  <circle cx="215" cy="50" r="2" fill="rgba(255,255,255,0.3)"/>
                  
                  {/* Progress Line */}
                  <line x1="40" y1="50" x2="180" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg text-white mb-2 transition-colors">
                  Brand incubation and launch support
                </h3>
                <p className="text-[#7d8187] leading-relaxed text-sm">
                  Full brand systems built for new ventures from day one
                </p>
              </div>
            </div>

            {/* Content Infrastructure */}
            <div className="relative p-8 border border-[#1f2228] bg-[#0a0b0d] hover:border-[rgba(255,255,255,0.15)] transition-all group overflow-hidden aspect-[3/2] flex flex-col justify-between">
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                background: 'linear-gradient(to bottom, rgba(100, 100, 100, 0.08) 0%, rgba(60, 60, 60, 0.12) 100%)'
              }}></div>
              
              {/* Graphic - System Architecture */}
              <div className="mb-4 flex-1 flex items-center justify-center relative z-10">
                <svg width="100%" height="100" viewBox="0 0 280 100" fill="none" className="max-w-full">
                  {/* Central Core */}
                  <rect x="115" y="38" width="50" height="24" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)"/>
                  <circle cx="140" cy="50" r="2" fill="rgba(255,255,255,0.6)"/>
                  
                  {/* Input Sources - Left */}
                  <rect x="30" y="20" width="35" height="12" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="#0a0b0d"/>
                  <rect x="30" y="38" width="35" height="12" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="#0a0b0d"/>
                  <rect x="30" y="56" width="35" height="12" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="#0a0b0d"/>
                  <rect x="30" y="74" width="35" height="12" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="#0a0b0d"/>
                  
                  {/* Input Arrows */}
                  <line x1="65" y1="26" x2="110" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  <line x1="65" y1="44" x2="110" y2="48" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  <line x1="65" y1="62" x2="110" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  <line x1="65" y1="80" x2="110" y2="55" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  
                  {/* Output Channels - Right */}
                  <rect x="215" y="30" width="35" height="12" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="#0a0b0d"/>
                  <rect x="215" y="50" width="35" height="12" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="#0a0b0d"/>
                  <rect x="215" y="70" width="35" height="12" rx="2" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="#0a0b0d"/>
                  
                  {/* Output Arrows */}
                  <line x1="165" y1="45" x2="210" y2="36" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <line x1="165" y1="50" x2="210" y2="56" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  <line x1="165" y1="55" x2="210" y2="76" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg text-white mb-2 transition-colors">
                  Content infrastructure setup
                </h3>
                <p className="text-[#7d8187] leading-relaxed text-sm">
                  Establish content engines and growth systems
                </p>
              </div>
            </div>

            {/* Fractional Leadership */}
            <div className="relative p-8 border border-[#1f2228] bg-[#0a0b0d] hover:border-[rgba(255,255,255,0.15)] transition-all group overflow-hidden aspect-[3/2] flex flex-col justify-between">
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                background: 'linear-gradient(to bottom, rgba(100, 100, 100, 0.08) 0%, rgba(60, 60, 60, 0.12) 100%)'
              }}></div>
              
              {/* Graphic - Org Structure */}
              <div className="mb-4 flex-1 flex items-center justify-center relative z-10">
                <svg width="100%" height="100" viewBox="0 0 280 100" fill="none" className="max-w-full">
                  {/* Leadership Level - Top */}
                  <rect x="110" y="15" width="60" height="20" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
                  <circle cx="140" cy="25" r="2" fill="rgba(255,255,255,0.6)"/>
                  
                  {/* Connection Lines */}
                  <line x1="125" y1="35" x2="65" y2="58" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
                  <line x1="140" y1="35" x2="140" y2="58" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
                  <line x1="155" y1="35" x2="215" y2="58" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
                  
                  {/* Team Nodes - Middle */}
                  <rect x="40" y="58" width="50" height="16" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="#0a0b0d"/>
                  <circle cx="47" cy="66" r="1.5" fill="rgba(255,255,255,0.5)"/>
                  
                  <rect x="115" y="58" width="50" height="16" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="#0a0b0d"/>
                  <circle cx="122" cy="66" r="1.5" fill="rgba(255,255,255,0.5)"/>
                  
                  <rect x="190" y="58" width="50" height="16" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="#0a0b0d"/>
                  <circle cx="197" cy="66" r="1.5" fill="rgba(255,255,255,0.5)"/>
                  
                  {/* Sub-connections */}
                  <line x1="65" y1="74" x2="55" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  <line x1="65" y1="74" x2="75" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  <line x1="140" y1="74" x2="130" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  <line x1="140" y1="74" x2="150" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  <line x1="215" y1="74" x2="205" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  <line x1="215" y1="74" x2="225" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
                  
                  {/* Bottom nodes */}
                  <circle cx="55" cy="88" r="2.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="#0a0b0d"/>
                  <circle cx="75" cy="88" r="2.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="#0a0b0d"/>
                  <circle cx="130" cy="88" r="2.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="#0a0b0d"/>
                  <circle cx="150" cy="88" r="2.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="#0a0b0d"/>
                  <circle cx="205" cy="88" r="2.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="#0a0b0d"/>
                  <circle cx="225" cy="88" r="2.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="#0a0b0d"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg text-white mb-2 transition-colors">
                  Fractional creative and growth leadership
                </h3>
                <p className="text-[#7d8187] leading-relaxed text-sm">
                  On-demand strategic guidance without full-time overhead
                </p>
              </div>
            </div>

            {/* Strategic Partnerships */}
            <div className="relative p-8 border border-[#1f2228] bg-[#0a0b0d] hover:border-[rgba(255,255,255,0.15)] transition-all group overflow-hidden aspect-[3/2] flex flex-col justify-between">
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                background: 'linear-gradient(to bottom, rgba(100, 100, 100, 0.08) 0%, rgba(60, 60, 60, 0.12) 100%)'
              }}></div>
              
              {/* Graphic - Partnership Flow */}
              <div className="mb-4 flex-1 flex items-center justify-center relative z-10">
                <svg width="100%" height="100" viewBox="0 0 280 100" fill="none" className="max-w-full">
                  {/* Partner A */}
                  <rect x="30" y="35" width="55" height="30" rx="3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="#0a0b0d"/>
                  <circle cx="57" cy="50" r="3" fill="rgba(255,255,255,0.5)"/>
                  
                  {/* Partner B */}
                  <rect x="195" y="35" width="55" height="30" rx="3" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="#0a0b0d"/>
                  <circle cx="222" cy="50" r="3" fill="rgba(255,255,255,0.5)"/>
                  
                  {/* Connection Flow */}
                  <line x1="85" y1="50" x2="120" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <polygon points="120,50 116,48 116,52" fill="rgba(255,255,255,0.3)"/>
                  
                  <line x1="160" y1="50" x2="195" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                  <polygon points="160,50 156,48 156,52" fill="rgba(255,255,255,0.3)"/>
                  
                  {/* Center Value Exchange */}
                  <rect x="120" y="40" width="40" height="20" rx="3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="rgba(255,255,255,0.05)"/>
                  <circle cx="140" cy="50" r="2" fill="rgba(255,255,255,0.6)"/>
                  
                  {/* Corner Brackets */}
                  <line x1="20" y1="20" x2="35" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  <line x1="20" y1="20" x2="20" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  <line x1="260" y1="20" x2="245" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                  <line x1="260" y1="20" x2="260" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-lg text-white mb-2 transition-colors">
                  Strategic partnerships and equity models
                </h3>
                <p className="text-[#7d8187] leading-relaxed text-sm">
                  Co-create and invest in the ventures we believe in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Partner */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl text-white tracking-tight mb-12">
                How We Partner
              </h2>
              <p className="text-xl text-[#7d8187] leading-relaxed mb-8">
                We don't just support ventures. We build alongside them.
              </p>
            </div>

            <div className="space-y-0">
              {[
                {
                  title: 'Equity Partnerships',
                  description: 'We invest creative capital in exchange for equity in ventures we believe in',
                },
                {
                  title: 'Fractional Engagements',
                  description: 'Part-time creative and growth leadership for early-stage companies',
                },
                {
                  title: 'Project-Based',
                  description: 'Launch support, brand systems, and infrastructure setup',
                },
              ].map((model, index) => (
                <div key={index}>
                  {index > 0 && (
                    <div className="h-px bg-[#1f2228] my-10"></div>
                  )}
                  <div className="py-2">
                    <h3 className="text-xl text-white mb-1.5">{model.title}</h3>
                    <p className="text-[#7d8187] text-sm">{model.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Partners */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white tracking-tight mb-16">
            Ideal for:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                title: 'Serial Founders',
                description: 'Building multiple ventures and need scalable creative systems',
              },
              {
                title: 'Studios & Builders',
                description: 'Launching portfolio companies with consistent brand quality',
              },
              {
                title: 'Early-Stage Startups',
                description: 'Pre-seed to Series A companies establishing their brand foundation',
              },
            ].map((partner, index) => (
              <div
                key={index}
                className="p-12 min-h-[280px] border border-[#1f2228] group flex flex-col justify-end items-start"
              >
                <h3 className="text-xl text-white mb-4">{partner.title}</h3>
                <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 border-t border-[#1f2228]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl text-white tracking-tight">
            Building something new?
          </h2>
          <p className="text-xl text-[#7d8187]">
            Let's explore how we can build it together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-colors"
            >
              Start Conversation
            </button>
            <button className="px-8 py-4 rounded-full text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/10 transition-colors">
              View Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}