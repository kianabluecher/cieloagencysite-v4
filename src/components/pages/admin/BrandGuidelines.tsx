import React from "react";
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { motion } from "motion/react";
import titleBg from "figma:asset/83505d4e5565e4473b6190351d3fc3ab66243d40.png";
import brandStructureImg from "figma:asset/61253d0a0165b6e4377c669a0c71aa7edfca7ecf.png";
import vennDiagramImg from "figma:asset/a6356efacf4c11b44c71da9c7be3c18bd0605a71.png";

// --- Global Styles (Copied from Consulting.tsx) ---
const HeaderStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    .font-display { font-family: 'Inter', sans-serif; letter-spacing: -0.03em; }
    .font-mono { font-family: 'Space Grotesk', monospace; }
  `}</style>
);

// --- Header Nav (Copied from Consulting.tsx) ---
function HeaderNav({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            <span onClick={() => onNavigate('home')} className="text-white font-display font-medium text-lg tracking-tight flex items-center gap-2 cursor-pointer">
                CIELO
            </span>
            
            <div className="hidden md:flex items-center gap-8 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">Home</span>
                <span onClick={() => onNavigate('team-dashboard')} className="hover:text-white transition-colors cursor-pointer">Dashboard</span>
                <span className="text-white">Brand & Structure</span>
            </div>
        </div>
    </nav>
  );
}

// --- Hero Section ---
function BrandHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-black">
        {/* Glow Effect */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <div className="absolute right-[-10%] top-[-10%] bottom-[-10%] w-[70%] bg-[radial-gradient(circle_at_right_center,_var(--tw-gradient-stops))] from-zinc-100 via-amber-900/40 to-black/0 opacity-80 blur-xl mix-blend-screen"></div>
            <div className="absolute right-0 top-[20%] w-[40%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-orange-500/10 to-transparent blur-3xl mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col h-full justify-center py-20 mt-[-40px]">
            
            {/* Image behind title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[1200px] pointer-events-none opacity-60 mix-blend-screen">
                 <img src={titleBg} alt="" className="w-full h-auto object-cover" />
            </div>

            {/* Typography */}
            <h1 className="relative font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-10 select-none">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent font-normal block w-fit"
                >
                    Brand
                </motion.span>
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-gradient-to-r from-white via-zinc-400 to-zinc-700 bg-clip-text text-transparent font-normal block w-fit"
                >
                    & Structure
                </motion.span>
            </h1>
            
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-white/20"></div>
                <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase">Internal Documentation</p>
            </div>
        </div>

        {/* Bottom Arrow */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex justify-between items-end z-20">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80"
            >
                <ArrowDown className="w-5 h-5 stroke-[1] text-zinc-400" />
            </motion.div>
        </div>
    </section>
  );
}

// --- Structure Diagram Section ---
function StructureDiagram() {
    return (
        <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Operational Architecture</h2>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Systems Integration Map</p>
                </div>
                
                <div className="w-full flex justify-center bg-black/50 rounded-xl overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full"
                    >
                        <img 
                            src={brandStructureImg} 
                            alt="Brand & Structure Diagram" 
                            className="w-full h-auto object-contain max-h-[80vh]"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// --- Venn Diagram Section ---
function MarketPositioning() {
    return (
        <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Target Market</h2>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Strategic Positioning</p>
                </div>

                <div className="w-full flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-5xl"
                    >
                         <img 
                            src={vennDiagramImg} 
                            alt="Market Positioning Venn Diagram" 
                            className="w-full h-auto object-contain opacity-90"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// --- Grid System ---
function BrandGrid() {
  return (
    <section className="border-t border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-b border-white/10">
                
                {/* Card 1 */}
                <div className="group relative p-12 h-[300px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500">
                    <div>
                        <h3 className="text-xl font-display font-medium text-zinc-200 tracking-tight mb-2 group-hover:text-white transition-colors">Typography</h3>
                        <p className="text-xs font-mono text-zinc-600 leading-relaxed max-w-sm uppercase tracking-wide">Inter & Space Grotesk</p>
                    </div>
                     <div className="flex flex-col gap-2 mt-8">
                        <span className="font-display text-4xl text-white">Aa</span>
                        <span className="font-mono text-2xl text-zinc-400">Aa</span>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="group relative p-12 h-[300px] flex flex-col justify-between hover:bg-white/[0.02] transition-colors duration-500">
                    <div>
                        <h3 className="text-xl font-display font-medium text-zinc-200 tracking-tight mb-2 group-hover:text-white transition-colors">Color Palette</h3>
                        <p className="text-xs font-mono text-zinc-600 leading-relaxed max-w-sm uppercase tracking-wide">Monochrome & Warm Accents</p>
                    </div>
                     <div className="flex gap-4 mt-8">
                        <div className="w-12 h-12 bg-white border border-white/20 rounded-full"></div>
                        <div className="w-12 h-12 bg-zinc-500 border border-white/20 rounded-full"></div>
                        <div className="w-12 h-12 bg-black border border-white/20 rounded-full"></div>
                        <div className="w-12 h-12 bg-orange-500 border border-white/20 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)]"></div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}

// --- Main Component ---
export function BrandGuidelines({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      <HeaderStyles />
      
      <HeaderNav onNavigate={onNavigate} />
      
      <BrandHero />
      
      <StructureDiagram />
      
      <MarketPositioning />
      
      <BrandGrid />
      
      {/* Footer area */}
      <div className="border-t border-[#222] py-20 text-center px-6 bg-black">
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
              Confidential • For Internal Use Only
          </p>
      </div>
    </div>
  );
}
