import React from "react";
import { ConsultingCTA } from "./ConsultingCTA";
import { Award, MessageSquare, Shield, Users, ArrowUpRight, Check, ArrowDown } from 'lucide-react';
import { motion } from "motion/react";
import titleBg from "figma:asset/83505d4e5565e4473b6190351d3fc3ab66243d40.png";

// --- Global Styles for New Header ---

const HeaderStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-display { font-family: 'Inter', sans-serif; letter-spacing: -0.03em; }
    .font-mono { font-family: 'Space Grotesk', monospace; }
  `}</style>
);

// --- New Header Section Components ---

function HeaderNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <span className="text-white font-display font-medium text-lg tracking-tight flex items-center gap-2 opacity-0 pointer-events-none">
                CIELO
            </span>
            
            <div className="hidden md:flex items-center gap-8 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span className="hover:text-white transition-colors cursor-pointer">Mission</span>
                <span className="hover:text-white transition-colors cursor-pointer">Systems</span>
                <span className="hover:text-white transition-colors cursor-pointer">Ventures</span>
            </div>
        </div>
    </nav>
  );
}

function NewHero({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        {/* Glow Effect - Subtle fog on left side */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <div className="absolute left-[10%] top-[20%] w-[500px] h-[500px] bg-gradient-to-br from-blue-900/30 via-slate-800/20 to-transparent blur-3xl opacity-60"></div>
            <div className="absolute left-[5%] top-[10%] w-[400px] h-[600px] bg-gradient-to-b from-slate-700/25 via-blue-950/15 to-transparent blur-2xl opacity-50"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col h-full justify-center py-20">
            
            {/* Typography */}
            <h1 className="relative font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-10 select-none">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white font-normal block w-fit"
                >
                    The Next <span className="bg-gradient-to-r from-white via-zinc-400 to-zinc-700 bg-clip-text text-transparent">Frontier</span>
                </motion.span>
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white font-normal block w-fit"
                >
                    of <span className="bg-gradient-to-r from-white via-zinc-400 to-zinc-700 bg-clip-text text-transparent">Enterprise AI</span>
                </motion.span>
            </h1>

            {/* Badge */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
            >
                <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-3 bg-white hover:bg-zinc-200 text-black pl-3 pr-4 py-1.5 rounded-full transition-all duration-300 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] font-medium pt-0.5">Grok 4.1 Fast: Now Available</span>
                    <ArrowUpRight className="w-3 h-3 stroke-[1.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
            </motion.div>
        </div>

        {/* Bottom Navigation Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex justify-between items-end z-20">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80"
            >
                <ArrowDown className="w-5 h-5 stroke-[1] text-zinc-400" />
            </motion.div>

            <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="group flex items-center gap-2 border border-white/10 rounded-full px-5 py-2 hover:bg-white/5 hover:border-white/20 transition-all"
            >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-200 transition-colors pt-0.5">Documentation</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </motion.button>
        </div>
        
        {/* Corner Icon (Star) */}
        <div className="absolute bottom-6 right-6 hidden md:flex z-30">
             <div className="w-10 h-10 bg-[#2b2b2b] rounded flex items-center justify-center border border-white/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#dfff4f]">
                    <path d="M12 2L13.5 9.5L21 8L14.5 13.5L19 20L12 16L5 20L9.5 13.5L3 8L10.5 9.5L12 2Z" fill="currentColor" />
                </svg>
             </div>
        </div>
    </section>
  );
}

function VisualSystemsGrid() {
  return (
    <section className="border-t border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
                
                {/* Card 1 */}
                <div className="group relative p-12 md:p-16 h-[400px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500">
                    <div className="flex-grow flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        <svg width="240" height="60" viewBox="0 0 240 60" className="stroke-white">
                            <motion.line x1="20" y1="30" x2="220" y2="30" strokeWidth="1" className="stroke-white/30" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                            <motion.circle cx="40" cy="30" r="3" className="fill-black stroke-white stroke-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} />
                            <motion.circle cx="100" cy="30" r="3" className="fill-black stroke-white stroke-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} />
                            <motion.rect x="145" y="15" width="30" height="30" rx="2" className="fill-transparent stroke-white stroke-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                            <motion.circle cx="160" cy="30" r="4" className="fill-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                            <motion.circle cx="220" cy="30" r="3" className="fill-black stroke-white/50 stroke-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }} />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-medium text-zinc-200 tracking-tight mb-2 group-hover:text-white transition-colors">Brand incubation</h3>
                        <p className="text-xs font-mono text-zinc-600 leading-relaxed max-w-sm uppercase tracking-wide">Identity systems & market entry strategy.</p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="group relative p-12 md:p-16 h-[400px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500">
                    <div className="flex-grow flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        <svg width="240" height="100" viewBox="0 0 240 100" className="stroke-white">
                            <motion.rect x="110" y="35" width="40" height="25" rx="2" className="fill-transparent stroke-white stroke-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />
                            <motion.circle cx="130" cy="47.5" r="2" className="fill-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />
                            <motion.path d="M75 25 L105 45 M75 40 L105 47.5 M75 55 L105 47.5 M75 70 L105 50" strokeWidth="0.5" className="stroke-white/20 fill-none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 1.5 }} />
                            <motion.path d="M155 47.5 L180 30 M155 47.5 L180 47.5 M155 47.5 L180 65" strokeWidth="0.5" className="stroke-white/20 fill-none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1.5 }} />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-medium text-zinc-200 tracking-tight mb-2 group-hover:text-white transition-colors">Content infrastructure</h3>
                        <p className="text-xs font-mono text-zinc-600 leading-relaxed max-w-sm uppercase tracking-wide">Automated distribution pipelines.</p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="group relative p-12 md:p-16 h-[400px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500 border-b border-white/10 md:border-b-0">
                    <div className="flex-grow flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                         <svg width="240" height="120" viewBox="0 0 240 120" className="stroke-white">
                            <motion.rect x="100" y="10" width="40" height="20" rx="2" className="fill-transparent stroke-white stroke-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />
                            <motion.circle cx="120" cy="20" r="1.5" className="fill-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} />
                            <motion.path d="M120 30 L120 50 M120 50 L60 50 M120 50 L180 50 M60 50 L60 65 M120 50 L120 65 M180 50 L180 65" strokeWidth="0.5" className="stroke-white/30 fill-none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 2 }} />
                            <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                <rect x="40" y="65" width="40" height="16" rx="2" className="fill-transparent stroke-white/40 stroke-1" />
                            </motion.g>
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-medium text-zinc-200 tracking-tight mb-2 group-hover:text-white transition-colors">Fractional Leadership</h3>
                        <p className="text-xs font-mono text-zinc-600 leading-relaxed max-w-sm uppercase tracking-wide">Plug-and-play executive expertise.</p>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="group relative p-12 md:p-16 h-[400px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500">
                    <div className="flex-grow flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        <svg width="240" height="80" viewBox="0 0 240 80" className="stroke-white">
                            <motion.rect x="105" y="30" width="30" height="20" rx="2" className="fill-transparent stroke-white stroke-1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                            <motion.circle cx="120" cy="40" r="2" className="fill-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} />
                            <motion.line x1="135" y1="40" x2="160" y2="40" strokeWidth="0.5" className="stroke-white/30" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.5 }} />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-medium text-zinc-200 tracking-tight mb-2 group-hover:text-white transition-colors">Strategic Equity</h3>
                        <p className="text-xs font-mono text-zinc-600 leading-relaxed max-w-sm uppercase tracking-wide">Shared risk, shared reward structures.</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}

function OperationalEngine() {
  return (
    <section className="py-24 px-6 border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight mb-8">
                Operational engines built for scale.
            </h2>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                    Systems Live
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                    Data Connected
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full"></span>
                    AI Inference
                </div>
            </div>
        </div>
    </section>
  );
}


// --- Existing Components ---

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[11px] text-[#666] tracking-[0.15em] uppercase mb-4">
      [ {children} ]
    </div>
  );
}

function MonoButton({ children, primary = false, onClick }: { children: React.ReactNode, primary?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`
      group relative inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full 
      font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300
      ${primary 
        ? 'bg-white text-black hover:bg-[#E5E5E5]' 
        : 'bg-transparent text-white border border-[#333] hover:border-white hover:bg-white/5'
      }
    `}>
      {children}
      <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

function SplitSection({ 
  title, 
  subtitle, 
  children, 
  buttonText = "Learn More",
  onButtonClick
}: { 
  title: React.ReactNode, 
  subtitle: string, 
  children: React.ReactNode,
  buttonText?: string,
  onButtonClick?: () => void
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-[#222]">
      {/* Left Column: Text Content */}
      <div className="p-10 md:p-20 border-b lg:border-b-0 lg:border-r border-[#222] flex flex-col justify-between min-h-[500px]">
        <div>
          <h2 className="text-4xl md:text-[42px] font-medium leading-[1.1] tracking-[-0.02em] text-white mb-6">
            {title}
          </h2>
          <p className="font-['Helvetica'] font-medium text-[13px] leading-[1.6] text-[#888] max-w-md">
            {subtitle}
          </p>
        </div>
        <div className="mt-12">
          <MonoButton onClick={onButtonClick}>{buttonText}</MonoButton>
        </div>
      </div>

      {/* Right Column: Visual/Interactive Content */}
      <div className="relative bg-[#030303]">
        {children}
      </div>
    </div>
  );
}

function OldServicesGrid() {
  const services = [
    {
      icon: Award,
      title: 'Brand Audits',
      desc: 'Comprehensive analysis and strategic realignment.'
    },
    {
      icon: Users,
      title: 'Leadership Strategy',
      desc: 'Executive positioning and personal brand development.'
    },
    {
      icon: MessageSquare,
      title: 'Communication',
      desc: 'Messaging frameworks and content infrastructure.'
    },
    {
      icon: Shield,
      title: 'Reputation',
      desc: 'Strategic guidance for reputation management.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      {services.map((s, i) => (
        <div key={i} className={`p-10 border-b border-[#222] ${i % 2 === 0 ? 'md:border-r' : ''} hover:bg-[#080808] transition-colors flex flex-col justify-center`}>
          <s.icon size={20} className="text-white mb-4" strokeWidth={1.5} />
          <h3 className="text-lg font-medium text-white mb-2">{s.title}</h3>
          <p className="font-['Helvetica'] font-medium text-[13px] text-[#666] leading-relaxed">
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

function ApproachList() {
   return (
     <div className="flex flex-col h-full">
        {[
          'Strategic Clarity through rigorous auditing',
          'Executive Positioning based on substance',
          'Proactive Reputation Management',
          'Scalable Systems Thinking'
        ].map((item, i) => (
          <div key={i} className="flex-1 flex items-center px-10 border-b last:border-b-0 border-[#222] hover:bg-[#080808] transition-colors group">
             <span className="font-mono text-[10px] text-[#444] mr-6 group-hover:text-white transition-colors">0{i + 1}</span>
             <span className="font-['Helvetica'] font-medium text-[14px] text-[#888] group-hover:text-white transition-colors">{item}</span>
          </div>
        ))}
     </div>
   )
}

function EngagementCards() {
    return (
        <div className="p-10 md:p-20 grid gap-6 h-full content-center">
            {[
                { title: 'Brand Audit', subtitle: '2-3 Weeks', desc: 'Deep dive analysis.' },
                { title: 'Retainer', subtitle: 'Monthly', desc: 'Ongoing strategic support.' },
            ].map((item, i) => (
                <div key={i} className="border border-[#222] rounded-xl p-6 hover:border-[#444] transition-all bg-black">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <span className="font-mono text-[10px] uppercase border border-[#222] px-2 py-1 rounded text-[#666]">{item.subtitle}</span>
                    </div>
                    <p className="font-['Helvetica'] font-medium text-[13px] text-[#666]">{item.desc}</p>
                </div>
            ))}
        </div>
    )
}

export function Consulting({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <HeaderStyles />
      
      {/* New Header Section (Hero + Grid + Ops) */}
      <div className="relative z-10">
          <HeaderNav />
          <NewHero onNavigate={onNavigate} />
          <VisualSystemsGrid />
          <OperationalEngine />
      </div>

      {/* Existing Sections (Split Sections) */}
      <div className="relative z-10">
          <SplitSection 
            title={<span>Strategic <br/> Services</span>}
            subtitle="Core capabilities designed to elevate your market position and ensure your perception matches your reality."
            buttonText="View All Services"
          >
            <OldServicesGrid />
          </SplitSection>

          <SplitSection 
            title={<span>Our <br/> Approach</span>}
            subtitle="Our consulting combines creative direction, growth systems, and operational clarity. We don't just give advice; we build frameworks."
            buttonText="Read Methodology"
          >
            <ApproachList />
          </SplitSection>

          <SplitSection 
             title={<span>Engagement <br/> Models</span>}
             subtitle="Flexible structures designed to fit your organization's needs, from quick strategic audits to long-term partnership."
             buttonText="Discuss Pricing"
             onButtonClick={() => onNavigate('contact')}
          >
              <EngagementCards />
          </SplitSection>
          
          {/* Footer CTA similar to the bottom of the screenshot pages */}
          <ConsultingCTA onNavigate={onNavigate} />
      </div>
    </div>
  );
}