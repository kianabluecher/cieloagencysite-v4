import { Code2, Database, Layout, Zap, ArrowRight, ArrowUpRight, Cpu, ArrowLeft, Disc, Lock, Menu } from 'lucide-react';
import { CRMDashboard } from '../CRMDashboard';
import { useEffect, useRef } from 'react';

interface DevelopmentProps {
  onNavigate: (page: string) => void;
}

export function Development({ onNavigate }: DevelopmentProps) {
  const scanlineRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollPlatforms = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280; // Width of card (260px) + gap (20px)
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-400 antialiased selection:bg-slate-800 selection:text-sky-200 overflow-x-hidden">
      {/* Noise Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-[#111] to-transparent pointer-events-none opacity-40 z-0" />

      {/* Hero Section with Light Beam Effect */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#050508' }}>
        {/* Light Beam Effect - Smooth triangular glow from right */}
        <div className="absolute right-0 top-0 w-full h-full pointer-events-none">
          {/* Outermost soft glow layer */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, transparent 35%, rgba(25, 35, 55, 0.06) 55%, rgba(50, 75, 110, 0.15) 75%, rgba(90, 130, 180, 0.35) 90%, rgba(150, 190, 230, 0.6) 98%, rgba(200, 225, 250, 0.75) 100%)',
              clipPath: 'polygon(25% 50%, 100% 15%, 100% 85%)',
              filter: 'blur(120px)',
            }}
          />
          {/* Second layer - medium spread */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(40, 60, 90, 0.1) 65%, rgba(80, 115, 165, 0.3) 80%, rgba(130, 170, 215, 0.55) 92%, rgba(180, 210, 245, 0.85) 99%, rgba(230, 240, 255, 0.95) 100%)',
              clipPath: 'polygon(35% 50%, 100% 22%, 100% 78%)',
              filter: 'blur(80px)',
            }}
          />
          {/* Third layer - tighter core */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, transparent 55%, rgba(70, 105, 150, 0.2) 72%, rgba(110, 150, 200, 0.5) 85%, rgba(160, 195, 235, 0.8) 95%, rgba(210, 230, 250, 0.95) 99%, rgba(245, 250, 255, 1) 100%)',
              clipPath: 'polygon(45% 50%, 100% 30%, 100% 70%)',
              filter: 'blur(60px)',
            }}
          />
          {/* Central bright beam */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, transparent 65%, rgba(120, 155, 205, 0.3) 80%, rgba(170, 200, 235, 0.7) 90%, rgba(215, 235, 250, 0.95) 97%, rgba(255, 255, 255, 1) 100%)',
              clipPath: 'polygon(55% 50%, 100% 38%, 100% 62%)',
              filter: 'blur(35px)',
            }}
          />
          {/* Bright light source */}
          <div 
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              right: '-2%',
              width: '400px',
              height: '150px',
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.95) 0%, rgba(245, 250, 255, 0.9) 15%, rgba(220, 235, 250, 0.75) 35%, rgba(180, 210, 240, 0.5) 55%, rgba(130, 170, 215, 0.25) 75%, transparent 100%)',
              filter: 'blur(40px)',
            }}
          />
          {/* Ultra-bright core point */}
          <div 
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              right: '0%',
              width: '200px',
              height: '80px',
              background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 1) 0%, rgba(250, 252, 255, 0.95) 25%, rgba(230, 242, 255, 0.8) 50%, rgba(200, 220, 245, 0.4) 75%, transparent 100%)',
              filter: 'blur(20px)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto w-full h-full flex items-end pb-16">
          <div className="max-w-2xl">
            <div className="mb-6">
              <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[2px] uppercase">
                {'{ OUR MISSION }'}
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white/90 tracking-tight leading-[1.15] mb-6">
              Websites, Dashboards, and Digital Systems That Scale
            </h1>
            <p className="text-lg md:text-xl text-[#7d8187] leading-relaxed max-w-2xl">
              We design and develop high-performance websites and internal systems built to grow with your brand.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky z-40 top-0 border-y border-white/[0.06] bg-[#050505]/80 backdrop-blur-lg">
        <div className="max-w-[1400px] mx-auto px-6 h-10 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-6 text-[11px] tracking-wide whitespace-nowrap">
            <button className="text-slate-100 border-b border-sky-500/50 pb-0.5 font-medium">Overview</button>
            <button className="text-slate-500 hover:text-slate-300 transition-colors">Stack</button>
            <button className="text-slate-500 hover:text-slate-300 transition-colors">Process</button>
            <button className="text-slate-500 hover:text-slate-300 transition-colors">Pricing</button>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-['DM_Mono'] text-slate-600">
            <span>[REACT]</span>
            <div className="h-2 w-px bg-white/10" />
            <span>[SUPABASE]</span>
            <div className="h-2 w-px bg-white/10" />
            <span className="text-sky-500/80">LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="border-x border-white/[0.06] max-w-[1400px] mx-auto bg-[#080808]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Item 1: Custom Development */}
          <article className="group relative flex flex-col justify-between p-8 h-[440px] border-b border-white/[0.06] lg:border-r hover:bg-[#0a0a0a] transition-colors duration-500">
            <div className="flex items-start justify-between">
              <span className="font-['DM_Mono'] text-[10px] text-sky-900 bg-sky-900/10 px-1.5 py-0.5 rounded border border-sky-900/20">[01]</span>
              <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
            </div>
            <div className="space-y-4 z-10">
              <h3 className="text-2xl text-slate-100 font-normal tracking-tight">Custom Web Apps</h3>
              <p className="text-sm font-light text-slate-500 leading-relaxed">
                React, Next.js, and TypeScript applications built with modern architecture and scalable infrastructure.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </article>

          {/* Item 2: Visual Gradient */}
          <article className="group relative h-[440px] border-b border-white/[0.06] lg:border-r overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#0f172a_0%,_#000000_100%)] opacity-80" />
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-sky-500/20 rounded-full blur-[60px] group-hover:bg-sky-400/30 transition-colors duration-700" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase text-sky-200 tracking-wider font-['DM_Mono']">[AUTOMATION]</span>
                </div>
                <h3 className="text-xl text-white font-medium tracking-tight mb-1">Workflow Integration</h3>
                <p className="text-xs text-slate-400 font-light">Make, n8n, Zapier setup.</p>
              </div>
            </div>
          </article>

          {/* Item 3: Performance Benchmark */}
          <article className="group relative h-[440px] border-b border-white/[0.06] bg-[#050505] flex flex-col">
            <div className="flex h-14 border-b border-white/[0.06] px-6 items-center justify-between bg-[#080808]">
              <h3 className="text-[10px] text-slate-400 tracking-widest uppercase font-['DM_Mono']">[PERFORMANCE]</h3>
              <div className="flex gap-1.5">
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <div className="w-1 h-1 rounded-full bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.8)]" />
              </div>
            </div>
            
            <div className="flex-grow flex flex-col font-sans p-8 justify-center space-y-8">
              {/* Comparison Row 1 */}
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-wide text-slate-500">
                  <span>Template Site</span>
                  <span>CIELO Build</span>
                </div>
                <div className="relative h-1 w-full bg-slate-800/50 rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-[35%] bg-slate-700 rounded-full" />
                  <div className="absolute left-[37%] top-0 h-full w-[63%] bg-sky-900 rounded-full">
                    <div className="absolute right-0 top-0 h-full w-full bg-sky-500/50 blur-[2px]" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 font-['DM_Mono']">
                  <span>Limited</span>
                  <span className="text-sky-200">Custom Logic</span>
                </div>
              </div>

              {/* Comparison Row 2 - Load Speed */}
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-wide text-slate-500">
                  <span>Load Time</span>
                </div>
                <div className="flex gap-1 h-6 items-end">
                  <div className="flex-1 h-[20%] bg-sky-500/20 border border-sky-500/30 rounded-sm relative group/bar">
                    <span className="absolute -top-5 left-0 text-[9px] font-['DM_Mono'] text-sky-200 opacity-0 group-hover/bar:opacity-100 transition-opacity">0.8s</span>
                  </div>
                  <div className="flex-1 h-[85%] bg-slate-800 border border-slate-700 rounded-sm relative group/bar">
                    <span className="absolute -top-5 left-0 text-[9px] font-['DM_Mono'] text-slate-500 opacity-0 group-hover/bar:opacity-100 transition-opacity">3.2s</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Item 4: Tech Stack */}
          <article className="group relative h-[440px] border-b border-white/[0.06] lg:border-r lg:border-b-0 p-8 flex flex-col bg-[#080808] hover:bg-[#0a0a0a] transition-colors">
            <div className="mb-auto">
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-4 h-4 text-sky-700" />
                <span className="font-['DM_Mono'] text-[10px] text-slate-500 uppercase tracking-wider">[TECH_STACK]</span>
              </div>
              <div className="text-2xl text-slate-200 tracking-tight font-light">
                Modern tools for modern products.
              </div>
            </div>
            <div className="space-y-0 font-['DM_Mono'] text-[11px]">
              <div className="flex items-center justify-between py-3 border-t border-white/[0.06] text-slate-500 group-hover:text-slate-400 transition-colors">
                <span>Frontend</span>
                <span className="text-sky-200">React + TS</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-white/[0.06] text-slate-500 group-hover:text-slate-400 transition-colors">
                <span>Backend</span>
                <span>Supabase</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-white/[0.06] text-slate-500 group-hover:text-slate-400 transition-colors">
                <span>Deployment</span>
                <span>Edge Functions</span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-white/[0.06] text-slate-500 group-hover:text-slate-400 transition-colors">
                <span>Automation</span>
                <span>Make / n8n</span>
              </div>
            </div>
          </article>

          {/* Item 5: Dashboard Visualization */}
          <article className="group relative h-[440px] border-b border-white/[0.06] lg:border-r lg:border-b-0 overflow-hidden bg-[#050505]">
            {/* Grid Pattern */}
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            {/* Scanline */}
            <div className="absolute w-full h-[100px] z-10 bg-gradient-to-b from-transparent via-sky-400/[0.03] to-transparent opacity-10 pointer-events-none animate-[scanline_10s_linear_infinite]" style={{ bottom: '100%' }} />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              {/* Animated Waveform simulation */}
              <div className="flex items-center gap-1 h-12 mb-8">
                <div className="w-1 bg-slate-700 h-4 animate-[pulse_1s_ease-in-out_infinite]" />
                <div className="w-1 bg-slate-600 h-8 animate-[pulse_1.2s_ease-in-out_infinite]" />
                <div className="w-1 bg-sky-800 h-6 animate-[pulse_0.8s_ease-in-out_infinite]" />
                <div className="w-1 bg-sky-500 h-10 animate-[pulse_1.5s_ease-in-out_infinite]" />
                <div className="w-1 bg-sky-400 h-5 animate-[pulse_1.1s_ease-in-out_infinite]" />
                <div className="w-1 bg-slate-600 h-7 animate-[pulse_0.9s_ease-in-out_infinite]" />
              </div>

              <h3 className="text-base text-slate-200 tracking-wide font-medium">Live Dashboard</h3>
              <button className="mt-4 px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-['DM_Mono'] text-slate-400 hover:text-white hover:border-white/20 transition-all bg-[#080808]">
                [VIEW_DEMO]
              </button>
            </div>
          </article>

          {/* Item 6: CTA */}
          <article className="group relative h-[440px] p-8 flex flex-col justify-center items-center bg-[#050505] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] to-[#0f172a] opacity-80" />
            
            <div className="relative z-10 text-center w-full max-w-[240px]">
              <h3 className="text-3xl text-white tracking-tight font-medium mb-2">Start Building</h3>
              <p className="text-xs text-slate-500 font-normal mb-8 leading-relaxed">
                Custom solutions tailored to your business requirements and growth trajectory.
              </p>
              
              <button 
                onClick={() => onNavigate('inquiry')}
                className="w-full relative py-3 bg-white text-black overflow-hidden rounded-md group/btn transition-transform active:scale-95"
              >
                <span className="text-[11px] uppercase font-bold tracking-widest relative z-10 group-hover/btn:text-black transition-colors">Initialize</span>
                <div className="absolute inset-0 bg-sky-200 transform scale-x-0 origin-left group-hover/btn:scale-x-100 transition-transform duration-300 ease-out" />
              </button>
            </div>
          </article>
        </div>

        {/* See it in Action - Dashboard Section */}
        <section className="border-b border-white/[0.06] py-16 relative bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            {/* Centered heading in DM Mono with brackets */}
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase text-sky-700 font-['DM_Mono'] tracking-wider block mb-3">[LIVE_SYSTEMS]</span>
              <h2 className="font-['DM_Mono'] text-3xl md:text-4xl text-white tracking-tight">
                [ See it in action ]
              </h2>
            </div>
            
            {/* Dashboard Display */}
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-sky-500/15 via-sky-400/8 to-transparent rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
              
              {/* Double frame */}
              <div className="relative border border-sky-500/30 rounded-lg p-1 bg-[#050505]/50 backdrop-blur-sm">
                <div className="border border-sky-400/20 rounded-lg overflow-hidden bg-[#080808]/80">
                  <div className="p-4">
                    <CRMDashboard />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional System Examples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: Code2, label: 'API Integration', desc: 'Real-time data sync' },
                { icon: Database, label: 'Database Systems', desc: 'Scalable architecture' },
                { icon: Zap, label: 'Automation', desc: 'Workflow optimization' }
              ].map((item, idx) => (
                <div key={idx} className="relative group/card">
                  <div className="absolute -inset-1 bg-gradient-to-br from-sky-500/10 via-sky-400/5 to-transparent rounded-lg blur-sm group-hover/card:blur-md transition-all duration-300" />
                  <div className="relative border border-sky-500/20 rounded-lg p-1 bg-[#050505]/50 backdrop-blur-sm">
                    <div className="border border-sky-400/10 rounded-lg bg-[#080808]/80 p-6 min-h-[160px] flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 mb-3 rounded-full border-2 border-sky-400/30 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-sky-400/50" />
                      </div>
                      <h4 className="text-sm font-medium text-slate-200 mb-1">{item.label}</h4>
                      <p className="text-[10px] text-slate-500 font-['DM_Mono']">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Horizontal Scroll */}
        <section className="border-b border-white/[0.06] py-20 relative bg-[#050505]">
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <div className="max-w-[1400px] mx-auto px-6 mb-10 flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-[10px] uppercase text-sky-700 font-['DM_Mono'] tracking-wider">[PLATFORMS]</span>
              <h2 className="text-2xl text-white tracking-tight font-medium">Build Options</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scrollPlatforms('left')} className="w-8 h-8 flex items-center justify-center border border-white/[0.06] text-slate-500 hover:text-white hover:border-white/20 transition-all rounded bg-[#0a0a0a]">
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => scrollPlatforms('right')} className="w-8 h-8 flex items-center justify-center border border-white/[0.06] text-slate-500 hover:text-white hover:border-white/20 transition-all rounded bg-[#0a0a0a]">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} ref={scrollContainerRef}>
            {[
              { title: 'Webflow', desc: 'No-code CMS', color: 'from-slate-800' },
              { title: 'React + Next.js', desc: 'Full custom', color: 'from-sky-950', icon: true },
              { title: 'Framer', desc: 'Interactive sites', color: 'from-slate-800' },
              { title: 'Supabase', desc: 'Backend as service', color: 'from-sky-950' },
              { title: 'Custom Stack', desc: 'Enterprise scale', color: 'from-black', locked: false }
            ].map((platform, idx) => (
              <div key={idx} className="snap-center shrink-0 w-[260px] h-[320px] bg-[#0a0a0a] border border-white/[0.06] p-1 flex flex-col relative group cursor-pointer hover:border-sky-500/30 transition-all rounded-lg hover:shadow-[0_0_20px_-10px_rgba(14,165,233,0.2)]">
                <div className={`flex-1 bg-[#111] rounded-md relative overflow-hidden mb-3`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} to-black opacity-${platform.icon ? '40' : '50'}`} />
                  {platform.icon && (
                    <div className="absolute top-4 right-4">
                      <Code2 className="w-4 h-4 text-sky-700" />
                    </div>
                  )}
                  {platform.locked === false ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 bg-slate-500 rounded-full" />
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="px-3 pb-3">
                  <h4 className="text-sm font-medium text-slate-200">{platform.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-slate-600 font-['DM_Mono']">{platform.desc}</p>
                    <div className={`w-1.5 h-1.5 rounded-full ${platform.icon ? 'bg-sky-500/20' : 'bg-slate-500/20'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="bg-[#050505] py-24 px-6 md:px-12 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1400px] mx-auto">
            <div>
              <h3 className="font-medium text-lg mb-2 text-white">Ready to build?</h3>
              <p className="text-xs text-slate-500 max-w-sm mb-8 leading-relaxed">
                Let's discuss your project requirements and create a custom solution that scales with your business.
              </p>
              
              <button
                onClick={() => onNavigate('inquiry')}
                className="bg-white text-black text-[10px] font-bold uppercase rounded px-6 py-3 hover:bg-slate-200 transition-colors"
              >
                Start Project
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-[11px] text-slate-500 font-sans tracking-wide">
              <div className="space-y-3">
                <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-[9px]">Services</h4>
                <a href="#" className="block hover:text-sky-300 transition-colors">Web Apps</a>
                <a href="#" className="block hover:text-sky-300 transition-colors">Dashboards</a>
                <a href="#" className="block hover:text-sky-300 transition-colors">Automation</a>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-[9px]">Stack</h4>
                <a href="#" className="block hover:text-sky-300 transition-colors">React</a>
                <a href="#" className="block hover:text-sky-300 transition-colors">Supabase</a>
                <a href="#" className="block hover:text-sky-300 transition-colors">Webflow</a>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-[9px]">Company</h4>
                <button onClick={() => onNavigate('about')} className="block hover:text-sky-300 transition-colors text-left">About</button>
                <button onClick={() => onNavigate('portfolio')} className="block hover:text-sky-300 transition-colors text-left">Work</button>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-wider text-slate-600 font-['DM_Mono'] max-w-[1400px] mx-auto">
            <span>© 2024 CIELO AGENCY</span>
            <span className="md:mt-0 mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes scanline {
          0% { bottom: 100%; }
          100% { bottom: -100px; }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}