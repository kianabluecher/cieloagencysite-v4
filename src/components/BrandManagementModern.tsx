import { Check, TrendingUp, Clock, DollarSign, Edit, Layout, MessageSquare, Briefcase } from 'lucide-react';
import { DraggableSlideshow } from './DraggableSlideshow';
import { useEffect, useState, useRef } from 'react';
import slideImage1 from 'figma:asset/e834cdb69e621575e5d6afb2b7ac02ae53981c77.png';
import slideImage2 from 'figma:asset/ca23bc9d0126da8c71957e375371a1a920b5ad11.png';
import slideImage3 from 'figma:asset/c159ad20a8eba2895bee86964b07c89cb155ed47.png';
import slideImage4 from 'figma:asset/257fcfe47ce90ad77dda495b18963e1e9114bd43.png';
import slideImage5 from 'figma:asset/a72dbf73fbb5bc646e1cc07b4e2100d14eca5565.png';
import slideImage6 from 'figma:asset/2dbcaf0e06c19c41a47b3bdde03ab061135020ce.png';

export function BrandManagementModern() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const textSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (textSectionRef.current) {
        const rect = textSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
          const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 1.2 + sectionHeight / 1.5)));
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050505] text-neutral-300">
      {/* Background Ambience */}
      <div className="relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[600px] opacity-50" 
               style={{ background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.2), transparent, transparent)', filter: 'blur(100px)' }}>
          </div>
          <div className="absolute inset-0 opacity-60" 
               style={{ 
                 backgroundSize: '50px 50px',
                 backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                 maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
               }}>
          </div>
        </div>

        {/* Hero Section */}
        <main className="relative z-10 flex flex-col items-center pt-32 pb-20 px-4 text-center max-w-[90rem] mx-auto">
          
          {/* Status Badge */}
          <div className="mb-8 animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-medium text-neutral-300 tracking-wide uppercase">New Client Openings: 2</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="animate-fade-up opacity-0 text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] mb-8" 
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Brand Management &
            </span>
            <span className="block font-serif italic text-neutral-400 opacity-80 font-light">
              Creative Direction
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              for your business.
            </span>
          </h1>

          <p className="animate-fade-up opacity-0 text-base md:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed mb-10 font-light"
             style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            You built an amazing business, but your online presence doesn't reflect that. Every day someone checks you out and walks away.
          </p>
        </main>

        {/* Draggable Slideshow */}
        <div className="py-12">
          <DraggableSlideshow
            images={[
              slideImage4,
              slideImage1,
              slideImage5,
              slideImage3,
              slideImage6,
              slideImage2,
            ]}
          />
        </div>

        {/* The Problem Section */}
        <section ref={textSectionRef} id="problem" className="py-32 px-6 max-w-7xl mx-auto relative border-t border-white/5">
          <div className="max-w-5xl mx-auto space-y-24">
            <div className="space-y-12">
              <div className="text-center mb-12">
                {(() => {
                  const text = "[ THE PROBLEM ]";
                  const chars = text.split('');
                  
                  return (
                    <p className="font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase">
                      {chars.map((char, index) => {
                        const charProgress = index / chars.length * 0.02;
                        const isRevealed = scrollProgress > charProgress;
                        
                        return (
                          <span
                            key={index}
                            style={{
                              color: isRevealed ? '#7d8187' : '#050505',
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </p>
                  );
                })()}
              </div>

              <p className="text-xl md:text-2xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "The problem is simple.";
                  const chars = text.split('');
                  
                  return chars.map((char, index) => {
                    const charProgress = 0.02 + (index / chars.length) * 0.05;
                    const isRevealed = scrollProgress > charProgress;
                    
                    return (
                      <span
                        key={index}
                        style={{
                          color: isRevealed ? '#ffffff' : '#050505',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {char}
                      </span>
                    );
                  });
                })()}
              </p>

              <p className="text-xl md:text-2xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "You built an amazing business. Endless nights, many conversations. Everyone just gets the value once you explain it to them.";
                  const chars = text.split('');
                  const offset = 0.07;
                  
                  return chars.map((char, index) => {
                    const charProgress = offset + (index / chars.length) * 0.15;
                    const isRevealed = scrollProgress > charProgress;
                    
                    return (
                      <span
                        key={index}
                        style={{
                          color: isRevealed ? '#ffffff' : '#050505',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {char}
                      </span>
                    );
                  });
                })()}
              </p>

              <p className="text-xl md:text-2xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "But they should get the value within the first seconds. That brand that everyone talks about, everyone wants to be associated with.";
                  const chars = text.split('');
                  const offset = 0.22;
                  
                  return chars.map((char, index) => {
                    const charProgress = offset + (index / chars.length) * 0.15;
                    const isRevealed = scrollProgress > charProgress;
                    
                    return (
                      <span
                        key={index}
                        style={{
                          color: isRevealed ? '#ffffff' : '#050505',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {char}
                      </span>
                    );
                  });
                })()}
              </p>

              <div className="space-y-12 pt-8">
                <p className="text-xl md:text-2xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
                  {(() => {
                    const text = "But your website? Updated years ago. Your business has grown, people don't see that.";
                    const chars = text.split('');
                    const offset = 0.37;
                    
                    return chars.map((char, index) => {
                      const charProgress = offset + (index / chars.length) * 0.12;
                      const isRevealed = scrollProgress > charProgress;
                      
                      return (
                        <span
                          key={index}
                          style={{
                            color: isRevealed ? '#ffffff' : '#050505',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {char}
                        </span>
                      );
                    });
                  })()}
                </p>

                <p className="text-xl md:text-2xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
                  {(() => {
                    const text = "Your social media? Random posts, no strategy. Your pitch materials? Don't match anything else.";
                    const chars = text.split('');
                    const offset = 0.49;
                    
                    return chars.map((char, index) => {
                      const charProgress = offset + (index / chars.length) * 0.12;
                      const isRevealed = scrollProgress > charProgress;
                      
                      return (
                        <span
                          key={index}
                          style={{
                            color: isRevealed ? '#ffffff' : '#050505',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {char}
                        </span>
                      );
                    });
                  })()}
                </p>

                <p className="text-xl md:text-2xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
                  {(() => {
                    const text = "When someone looks you up, they don't see what you've built. They see chaos.";
                    const chars = text.split('');
                    const offset = 0.61;
                    
                    return chars.map((char, index) => {
                      const charProgress = offset + (index / chars.length) * 0.1;
                      const isRevealed = scrollProgress > charProgress;
                      
                      return (
                        <span
                          key={index}
                          style={{
                            color: isRevealed ? '#ffffff' : '#050505',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {char}
                        </span>
                      );
                    });
                  })()}
                </p>

                <p className="text-xl md:text-2xl tracking-tight text-center leading-relaxed pt-8" style={{ fontWeight: 400 }}>
                  {(() => {
                    const text = "And chaos doesn't close deals.";
                    const chars = text.split('');
                    const offset = 0.71;
                    
                    return chars.map((char, index) => {
                      const charProgress = offset + (index / chars.length) * 0.05;
                      const isRevealed = scrollProgress > charProgress;
                      
                      return (
                        <span
                          key={index}
                          style={{
                            color: isRevealed ? '#ffffff' : '#050505',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {char}
                        </span>
                      );
                    });
                  })()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Speed/Agitation Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl text-white tracking-tight mb-8">
              It's not just ugly. <br /> It's <span className="text-neutral-500 font-serif italic">slow.</span>
            </h2>
            
            <p className="text-neutral-400 max-w-xl mx-auto mb-12">
              Even when you try to fix it, nothing moves. Your designer takes weeks. Your copywriter ghosts. Your developer says "almost done" for the third time.
            </p>

            {/* Speed Visual */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative mb-4">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-red-500/50"></div>
              <div className="absolute top-0 left-0 h-full w-full bg-emerald-500 origin-left animate-pulse"></div>
            </div>
            <div className="flex justify-between w-full text-xs font-mono text-neutral-500 mb-12">
              <span>Traditional Agency</span>
              <span className="text-emerald-500">CIELO Speed</span>
            </div>
            
            <p className="text-lg text-white">
              Speed matters. Your brand can't afford to move slow.
            </p>
          </div>
        </section>

        {/* The Fix - Bento Grid Section */}
        <section id="fix" className="py-20 px-6 max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl text-white tracking-tight mb-4">
                Here's the <span className="font-serif italic opacity-80">fix</span>.
              </h2>
              <p className="text-neutral-400 text-sm md:text-base">Stop managing five different people. Get one team that handles everything.</p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-xs font-mono text-neutral-500 mb-1">TEAM STATUS</div>
              <div className="flex items-center justify-end gap-2 text-emerald-500 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Ready to deploy
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Card 1: Visual Identity */}
            <div className="md:col-span-3 lg:col-span-4 bg-[rgba(20,20,22,0.4)] backdrop-blur-xl border border-white/8 rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white">
                  <Edit size={20} />
                </div>
                <h3 className="text-lg text-white mb-2">Visual Identity</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">We understand your business and translate it into a brand that looks professional.</p>
              </div>
              <div className="absolute right-4 bottom-4 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="text-[10px] font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded bg-black">Logo / Type / Color</div>
              </div>
            </div>

            {/* Card 2: Website & Landing Pages */}
            <div className="md:col-span-3 lg:col-span-8 bg-[rgba(20,20,22,0.4)] backdrop-blur-xl border border-white/8 rounded-3xl p-0 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20" 
                   style={{ 
                     backgroundSize: '50px 50px',
                     backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                     maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                   }}>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-0">
                {/* Abstract UI Mockup */}
                <div className="w-[80%] h-[60%] border border-white/10 bg-[#0F0F11] rounded-lg shadow-2xl overflow-hidden opacity-80 group-hover:scale-105 transition-transform duration-500">
                  <div className="h-6 bg-white/5 border-b border-white/5 flex items-center px-3 gap-1">
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-600"></div>
                  </div>
                  <div className="p-6">
                    <div className="w-1/2 h-4 bg-white/10 rounded mb-4"></div>
                    <div className="w-full h-2 bg-white/5 rounded mb-2"></div>
                    <div className="w-2/3 h-2 bg-white/5 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#050505] to-transparent z-10">
                <h3 className="text-xl text-white mb-2">Website & Landing Pages</h3>
                <p className="text-sm text-neutral-400 max-w-md">We manage every touchpoint. High-converting designs that match your credibility.</p>
              </div>
            </div>

            {/* Card 3: Weekly Content */}
            <div className="md:col-span-6 lg:col-span-6 bg-[rgba(20,20,22,0.4)] backdrop-blur-xl border border-white/8 rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between h-[320px]">
              <div className="relative z-20">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <MessageSquare size={20} />
                  </div>
                  <div className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400">Active</div>
                </div>
                <h3 className="text-xl text-white mb-2">Weekly Content</h3>
                <p className="text-sm text-neutral-400">Social, LinkedIn, everything. Consistent presence everywhere without you lifting a finger.</p>
              </div>
              {/* Visual: Calendar/Post items */}
              <div className="absolute right-0 bottom-0 w-full h-32 flex flex-col gap-2 p-6 opacity-30">
                <div className="w-full h-8 bg-white/10 rounded flex items-center px-3">
                  <div className="w-4 h-4 rounded-full bg-white/20 mr-2"></div>
                  <div className="w-20 h-2 bg-white/20 rounded"></div>
                </div>
                <div className="w-full h-8 bg-white/10 rounded flex items-center px-3">
                  <div className="w-4 h-4 rounded-full bg-white/20 mr-2"></div>
                  <div className="w-20 h-2 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>

            {/* Card 4: Marketing & Decks */}
            <div className="md:col-span-6 lg:col-span-6 bg-[rgba(20,20,22,0.4)] backdrop-blur-xl border border-white/8 rounded-3xl relative overflow-hidden group h-[320px] p-8">
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-lg text-white mb-2">Marketing & Pitch Decks</h3>
                  <p className="text-sm text-neutral-500">Marketing materials and new launches when you need them. Everything stays consistent.</p>
                </div>
              </div>
              <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 rotate-12 opacity-20">
                <div className="w-32 h-40 bg-white border border-neutral-200 rounded-lg shadow-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Needs This & Payoff */}
        <section id="payoff" className="py-24 border-t border-b border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20">
              
              {/* Who Needs This */}
              <div>
                <h2 className="text-sm font-mono text-neutral-500 mb-8 uppercase tracking-widest">Who Needs This</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">Business Owners who are actually good.</strong>
                      <span className="text-neutral-500 text-sm">You have the substance, just not the style.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">Need fast execution, not excuses.</strong>
                      <span className="text-neutral-500 text-sm">We don't ghost. We deliver.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <strong className="block text-white text-sm">Ideal Industries.</strong>
                      <span className="text-neutral-500 text-sm">Financial services, wellness, consulting, luxury businesses.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* The Payoff */}
              <div>
                <h2 className="text-sm font-mono text-emerald-500 mb-8 uppercase tracking-widest">What Changes</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                    <TrendingUp className="w-5 h-5 text-white" />
                    <span className="text-neutral-300 text-sm">Your brand finally looks professional</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-neutral-300 text-sm">Everything gets done fast. No more juggling freelancers.</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-white/5 rounded-xl bg-white/[0.02]">
                    <DollarSign className="w-5 h-5 text-white" />
                    <span className="text-neutral-300 text-sm">Your brand starts making you money.</span>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-xl text-white font-serif italic">
                    "Better meetings. Higher prices. Easier closes."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Big CTA */}
        <footer className="relative pt-32 pb-12 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] pointer-events-none"
               style={{ background: 'radial-gradient(circle at bottom, rgba(99, 102, 241, 0.2), transparent, transparent)' }}>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center mb-24">
              <h2 className="text-4xl md:text-6xl text-white tracking-tight mb-8">
                You run the business. <br />We run the <span className="font-serif italic opacity-80">brand.</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="group relative h-12 px-8 rounded-full bg-white text-black text-sm hover:bg-neutral-200 transition-all overflow-hidden">
                  <span className="relative z-10">Start Now</span>
                </button>
                <button className="h-12 px-8 rounded-full border border-white/10 text-neutral-400 text-sm hover:text-white hover:bg-white/5 transition-all">
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { 
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}} />
    </div>
  );
}