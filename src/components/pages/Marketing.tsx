import { 
  Menu, 
  ArrowDown, 
  Printer, 
  Megaphone, 
  TrendingUp, 
  Ticket, 
  Compass, 
  Palette, 
  Package, 
  Send, 
  Activity, 
  ArrowLeft, 
  ArrowRight, 
  Rocket, 
  RefreshCw, 
  Calendar, 
  Users 
} from 'lucide-react';
import { useState, useRef } from 'react';

interface MarketingProps {
  onNavigate: (page: string) => void;
}

export function Marketing({ onNavigate }: MarketingProps) {
  const [activeStep, setActiveStep] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const toggleStep = (step: number) => {
    setActiveStep(activeStep === step ? 0 : step);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4d4d4] font-sans antialiased selection:bg-[#334155] selection:text-[#cbd5e1] overflow-x-hidden pt-16">
      {/* Fonts & Styles Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Inter:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@200;300;400;500;600&display=swap');

        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 50;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* Film Grain Overlay */}
      <div className="noise-overlay mix-blend-overlay"></div>

      {/* Hero Section */}
      <header className="relative min-h-[60vh] flex flex-col items-center justify-center pt-20 pb-20 px-4 border-x border-[#1f1f1f] max-w-7xl mx-auto overflow-hidden">
        {/* Abstract Decoration */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-slate-800/10 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl pointer-events-none mix-blend-screen"></div>

        <div className="text-center z-10 space-y-6 max-w-4xl mx-auto">
          <span className="text-[10px] sm:text-xs uppercase text-[#94a3b8] tracking-[0.3em] font-inter opacity-90 border-[#94a3b8]/20 border rounded-full pt-1 pr-3 pb-1 pl-3">
            Marketing, Print & PR
          </span>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[0.9] text-[#f5f5f5] tracking-tighter font-serif-display">
            Creative Beyond<br /> <span className="italic text-[#94a3b8] font-light">Digital.</span>
          </h1>

          <p className="sm:text-base leading-relaxed text-sm font-light text-[#737373] tracking-wide font-manrope max-w-lg mx-auto pt-4">
            From campaigns to collateral, CIELO manages design, print, and performance assets that strengthen your brand identity.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ArrowDown className="w-4 h-4 text-[#737373]" />
        </div>
      </header>

      {/* Filter/Stats Bar */}
      <div className="sticky z-30 top-16 border-y border-[#1f1f1f] bg-[#050505]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between overflow-x-auto scrollbar-hide">
          <div className="flex items-center space-x-8 text-[11px] tracking-wider whitespace-nowrap">
            <button className="text-[#f5f5f5] font-inter border-[#94a3b8] border-b pb-0.5">All Services</button>
            <button className="text-[#737373] hover:text-[#f5f5f5] transition-colors font-inter">Campaigns</button>
            <button className="text-[#737373] hover:text-[#f5f5f5] transition-colors font-inter">Experiential</button>
            <button className="text-[#737373] hover:text-[#f5f5f5] transition-colors font-inter">Ventures</button>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="border-x border-[#1f1f1f] max-w-7xl mx-auto">
        {/* Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y divide-[#1f1f1f] md:divide-y-0">
            
          {/* Item 1: Print Design */}
          <article className="group relative flex flex-col justify-between p-8 h-auto min-h-[320px] border-[#1f1f1f] md:border-r border-b hover:bg-[#0a0a0a] transition-colors duration-700">
            <div className="flex items-start justify-between opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-xs text-[#94a3b8]">01</span>
              <Printer className="w-4 h-4 text-[#737373]" />
            </div>
            <div className="space-y-4 z-10 mt-10">
              <h3 className="text-2xl text-[#f5f5f5] font-manrope font-light pr-4">Print Design</h3>
              <p className="leading-relaxed text-xs font-light text-[#737373] tracking-wide font-inter max-w-sm">
                Brochures, packaging, signage, and marketing collateral designed to reflect your brand standards with tactile precision.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-2 py-1 rounded-sm">Packaging</span>
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-2 py-1 rounded-sm">Signage</span>
              </div>
            </div>
          </article>

          {/* Item 2: PR & Launch */}
          <article className="group relative flex flex-col justify-between p-8 h-auto min-h-[320px] border-[#1f1f1f] border-b hover:bg-[#0a0a0a] transition-colors duration-700">
            <div className="flex items-start justify-between opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-xs text-[#94a3b8]">02</span>
              <Megaphone className="w-4 h-4 text-[#737373]" />
            </div>
            <div className="space-y-4 z-10 mt-10">
              <h3 className="text-2xl text-[#f5f5f5] font-manrope font-light pr-4">PR & Launch</h3>
              <p className="leading-relaxed text-xs font-light text-[#737373] tracking-wide font-inter max-w-sm">
                Strategic media outreach and press kits to position your brand in the right publications. We handle the narrative.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-2 py-1 rounded-sm">Media Kits</span>
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-2 py-1 rounded-sm">Outreach</span>
              </div>
            </div>
          </article>

          {/* Item 3: Ad Campaigns */}
          <article className="group relative flex flex-col justify-between p-8 h-auto min-h-[320px] border-[#1f1f1f] md:border-r border-b hover:bg-[#0a0a0a] transition-colors duration-700">
            <div className="flex items-start justify-between opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-xs text-[#94a3b8]">03</span>
              <TrendingUp className="w-4 h-4 text-[#737373]" />
            </div>
            <div className="space-y-4 z-10 mt-10">
              <h3 className="text-2xl text-[#f5f5f5] font-manrope font-light pr-4">Ad Campaigns</h3>
              <p className="leading-relaxed text-xs font-light text-[#737373] tracking-wide font-inter max-w-sm">
                Growth funnels, landing pages, and performance ads designed for acquisition. Data-driven creative that converts.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-2 py-1 rounded-sm">Growth</span>
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-2 py-1 rounded-sm">A/B Testing</span>
              </div>
            </div>
          </article>

          {/* Item 4: Event Marketing */}
          <article className="group relative flex flex-col justify-between p-8 h-auto min-h-[320px] border-[#1f1f1f] border-b hover:bg-[#0a0a0a] transition-colors duration-700">
            <div className="flex items-start justify-between opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-xs text-[#94a3b8]">04</span>
              <Ticket className="w-4 h-4 text-[#737373]" />
            </div>
            <div className="space-y-4 z-10 mt-10">
              <h3 className="text-2xl text-[#f5f5f5] font-manrope font-light pr-4">Event Marketing</h3>
              <p className="leading-relaxed text-xs font-light text-[#737373] tracking-wide font-inter max-w-sm">
                Offline branding experiences for trade shows and investor presentations. We ensure your physical presence matches your digital.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-2 py-1 rounded-sm">Investor Decks</span>
                <span className="text-[9px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-2 py-1 rounded-sm">Experiential</span>
              </div>
            </div>
          </article>

          {/* Section: Integrated Marketing (The "Philosophy") */}
          <article className="col-span-1 md:col-span-2 relative border-[#1f1f1f] border-b p-10 flex flex-col bg-[#050505]">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-4 bg-[#94a3b8]"></div>
              <span className="font-mono text-[10px] text-[#737373] uppercase tracking-wider">The Methodology</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif-display text-3xl md:text-4xl leading-tight text-[#f5f5f5] mb-6">
                  Bridging the gap between <span className="italic text-[#94a3b8]">brand</span> and <span className="italic text-[#94a3b8]">performance</span>.
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed font-inter">
                  We ensure every piece of creative extends beyond digital boundaries, aligning with strategy to drive measurable results. Consistent execution across all channels.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 text-[11px] font-inter">
                <div className="flex flex-col gap-2">
                  <span className="text-[#f5f5f5] font-medium border-l border-[#1f1f1f] pl-3">Consistency</span>
                  <span className="text-[#525252] pl-3">Unified brand execution across print and digital touchpoints.</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#f5f5f5] font-medium border-l border-[#1f1f1f] pl-3">Performance</span>
                  <span className="text-[#525252] pl-3">Creative designed specifically to convert and acquire.</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#f5f5f5] font-medium border-l border-[#1f1f1f] pl-3">Integration</span>
                  <span className="text-[#525252] pl-3">Seamless offline to online user journey mapping.</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#f5f5f5] font-medium border-l border-[#1f1f1f] pl-3">Reporting</span>
                  <span className="text-[#525252] pl-3">Measurable results with clear attribution tracking.</span>
                </div>
              </div>
            </div>
          </article>

          {/* Section: Interactive Timeline (Accordion) */}
          <article className="col-span-1 md:col-span-2 relative border-[#1f1f1f] border-b p-10 lg:p-16 bg-[#050505]">
            <div className="flex items-center gap-2 mb-10">
              <div className="w-1 h-4 bg-[#94a3b8]"></div>
              <span className="font-mono text-[10px] text-[#737373] uppercase tracking-wider">The Process</span>
            </div>
            
            <h2 className="font-serif-display text-4xl leading-tight text-[#f5f5f5] mb-12">
              A <span className="italic text-[#94a3b8]">5-Step</span> Path to Market Dominance.
            </h2>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Strategy",
                  subtitle: "Deep Dive & Strategy",
                  description: "We conduct in-depth market research, competitive analysis, and stakeholder interviews to form a concrete, measurable strategy that anchors all subsequent creative and performance efforts. This phase concludes with a finalized scope of work and KPI agreement.",
                  icon: Compass,
                  cta: "See Case Study"
                },
                {
                  step: 2,
                  title: "Creative",
                  subtitle: "Design & Creative Assets",
                  description: "Our creative teams develop high-fidelity designs, compelling copywriting, and visual assets, ensuring they are optimized for both tactile print quality and digital conversion across web, social, and ad platforms.",
                  icon: Palette,
                  cta: "View Design Portfolio"
                },
                {
                  step: 3,
                  title: "Production",
                  subtitle: "Execution & Quality Assurance",
                  description: "This is the execution phase, covering everything from managing high-quality print runs for collateral and signage, to final asset slicing and optimization for digital deployment. Quality assurance is paramount here.",
                  icon: Package,
                  cta: "Our Print Partners"
                },
                {
                  step: 4,
                  title: "Launch",
                  subtitle: "Coordinated Deployment",
                  description: "We coordinate the simultaneous launch of all assets, manage ad campaigns across platforms, and execute strategic media and press outreach to maximize immediate brand visibility and impact.",
                  icon: Send,
                  cta: "Launch Checklist"
                },
                {
                  step: 5,
                  title: "Optimize",
                  subtitle: "Analysis & Iteration",
                  description: "Post-launch, we meticulously track performance metrics (KPIs), conduct A/B testing on creative variants, and provide detailed reporting to ensure continuous refinement and superior return on investment (ROI).",
                  icon: Activity,
                  cta: "Access Dashboard"
                }
              ].map((item) => (
                <div key={item.step} className="border-b border-[#1f1f1f]">
                  <button 
                    onClick={() => toggleStep(item.step)}
                    className="w-full flex items-center justify-between py-6 group cursor-pointer hover:bg-[#0a0a0a] transition-colors duration-300"
                  >
                    <h4 className={`text-xl font-manrope font-medium transition-colors duration-300 ${activeStep === item.step ? 'text-[#f5f5f5] font-bold' : 'text-[#525252]'}`}>
                      <span className={`font-mono text-sm mr-4 ${activeStep === item.step ? 'text-[#94a3b8]' : 'text-[#525252]'}`}>0{item.step}.</span> {item.title}
                    </h4>
                    <span className={`text-[#94a3b8] font-cinzel text-xl transform transition-transform duration-500 ${activeStep === item.step ? 'rotate-45' : 'rotate-0'}`}>+</span>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeStep === item.step ? 'max-h-[500px]' : 'max-h-0'}`}>
                    <div className="p-8 pt-0 space-y-6">
                      <span className="w-10 h-10 rounded-full bg-[#171717] flex items-center justify-center text-[#94a3b8] mb-4">
                        <item.icon className="w-5 h-5" />
                      </span>
                      <h3 className="text-2xl text-[#f5f5f5] font-serif-display leading-snug">{item.subtitle}</h3>
                      <p className="text-sm leading-relaxed text-[#737373] font-inter">{item.description}</p>
                      <button className="text-[10px] uppercase tracking-wider text-[#94a3b8] border border-[#1f1f1f] px-4 py-2 rounded-full hover:border-[#94a3b8] transition-colors">
                        {item.cta}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Horizontal Scroll Section: Campaign Types */}
        <section className="border-b border-[#1f1f1f] py-20 relative overflow-hidden bg-[#050505]">
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-[#94a3b8] tracking-widest font-mono">Scope of Work</span>
              <h2 className="text-3xl text-[#f5f5f5] font-serif-display">Campaign Types</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={scrollLeft} className="w-10 h-10 flex items-center justify-center border border-[#1f1f1f] text-[#525252] hover:text-[#f5f5f5] hover:border-[#94a3b8] transition-all rounded-full">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button onClick={scrollRight} className="w-10 h-10 flex items-center justify-center border border-[#1f1f1f] text-[#525252] hover:text-[#f5f5f5] hover:border-[#94a3b8] transition-all rounded-full">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-px overflow-x-auto scrollbar-hide px-6 pb-4 snap-x"
          >
            {[
              {
                icon: Rocket,
                title: "Product Launch",
                desc: "Full-spectrum launch campaigns with digital, print, and PR integration."
              },
              {
                icon: RefreshCw,
                title: "Brand Refresh",
                desc: "Repositioning campaigns across all touchpoints and market channels."
              },
              {
                icon: Calendar,
                title: "Seasonal Campaigns",
                desc: "Time-sensitive promotional campaigns with multi-channel execution."
              },
              {
                icon: Users,
                title: "PR Campaigns",
                desc: "Strategic media outreach and thought leadership positioning."
              },
              // Duplicates for scroll effect
              {
                icon: Rocket,
                title: "Product Launch",
                desc: "Full-spectrum launch campaigns with digital, print, and PR integration."
              }
            ].map((card, i) => (
              <div key={i} className="snap-center shrink-0 w-[280px] h-[360px] bg-[#0a0a0a] border border-[#1f1f1f] p-6 flex flex-col justify-between relative group cursor-pointer hover:border-[#94a3b8]/40 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#171717] flex items-center justify-center mb-4 text-[#94a3b8]">
                  <card.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#f5f5f5] font-manrope">{card.title}</h4>
                  <p className="text-[10px] text-[#737373] mt-2 leading-relaxed">{card.desc}</p>
                </div>
                <div className="w-full h-px bg-[#1f1f1f] mt-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#94a3b8] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="group relative py-32 border-b border-[#1f1f1f] px-6 text-center overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1f1f1f 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }}></div>
          <div className="relative z-10">
            <span className="text-[10px] uppercase text-[#94a3b8] tracking-widest font-mono mb-6 block">Ready to launch?</span>
            <h2 className="text-4xl md:text-5xl text-[#f5f5f5] font-serif-display mb-8">Let's create marketing<br />that moves the needle.</h2>
            
            <button 
              onClick={() => onNavigate('inquiry')}
              className="group/btn relative px-10 py-3.5 bg-transparent overflow-hidden border border-[#1f1f1f] hover:border-[#94a3b8] transition-colors duration-300"
            >
              <span className="text-[10px] uppercase group-hover/btn:text-[#050505] transition-colors text-[#f5f5f5] tracking-[0.2em] font-mono z-10 relative font-medium">Start A Campaign</span>
              <div className="absolute inset-0 bg-[#94a3b8] transform scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-500 ease-out"></div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
