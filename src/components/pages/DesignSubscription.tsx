import React from "react";
import { ArrowRight, Check, MoveUpRight, Box, Zap, RefreshCw, ChevronRight } from 'lucide-react';
import { motion } from "motion/react";
import imgJi57Ag3HaMoPzUpO2ZO0V93MBqgMp4 from "figma:asset/d29e5e34f231f64dcf35bc47e11b9037117788a4.png";

// --- Components ---

function OverlayShadow() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] bottom-0 right-0 rounded-[1px] shadow-[0px_0px_6px_1px_rgba(255,255,255,0.6)] top-0 w-[1.995px]" data-name="Overlay+Shadow" />;
}

function Variant() {
  return (
    <div className="bg-gradient-to-l from-[rgba(255,255,255,0.6)] h-[0.995px] relative rounded-[2px] shrink-0 to-[rgba(255,255,255,0)] w-full" data-name="Variant 1">
      <OverlayShadow />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col h-[0.995px] items-start justify-center opacity-[0.105] relative w-[109.996px]" data-name="Container">
      <Variant />
    </div>
  );
}

function OverlayShadow1() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] bottom-0 right-0 rounded-[1px] shadow-[0px_0px_6px_1px_rgba(255,255,255,0.6)] top-0 w-[1.278px]" data-name="Overlay+Shadow" />;
}

function Variant1() {
  return (
    <div className="bg-gradient-to-l from-[rgba(255,255,255,0.6)] h-[0.641px] relative rounded-[2px] shrink-0 to-[rgba(255,255,255,0)] w-full" data-name="Variant 1">
      <OverlayShadow1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col h-[0.641px] items-start justify-center opacity-[0.101] relative w-[64.038px]" data-name="Container">
      <Variant1 />
    </div>
  );
}

function ShootingStars() {
  return (
    <div className="absolute inset-0 overflow-clip pointer-events-none" data-name="Shooting Stars">
      <div className="absolute flex h-[43.19px] items-center justify-center left-[592.3px] top-[309.85px] w-[101.932px]"><div className="flex-none rotate-[22.6deg]"><Container1 /></div></div>
      <div className="absolute flex h-[25.201px] items-center justify-center left-[621.47px] top-[350.05px] w-[59.367px]"><div className="flex-none rotate-[22.6deg]"><Container2 /></div></div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-['DM_Mono'] text-[13px] text-[#888888] tracking-widest uppercase mb-6">
      [ {children} ]
    </div>
  );
}

function XButton({ children, primary = false }: { children: React.ReactNode, primary?: boolean }) {
  return (
    <button className={`
      group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full 
      font-['DM_Mono'] text-[13px] uppercase tracking-widest transition-all duration-300
      ${primary 
        ? 'bg-white text-black hover:bg-[#E5E5E5]' 
        : 'bg-transparent text-white border border-[#333] hover:border-white hover:bg-white/5'
      }
    `}>
      {children}
      <MoveUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  );
}

function HeroSection() {
  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white pt-20 border-b border-[#222]">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
             <img alt="" className="absolute h-full w-full object-cover" src={imgJi57Ag3HaMoPzUpO2ZO0V93MBqgMp4} />
        </div>
        
        <ShootingStars />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <SectionLabel>Design Subscription</SectionLabel>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6 mb-10"
            >
                <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tighter">
                    Design that <br/> scales with you.
                </h1>
                <p className="text-[#999] text-[18px] md:text-[20px] max-w-xl mx-auto leading-relaxed">
                    Stop letting potential customers slip through your grasp with mediocre design.
                </p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
               <XButton primary>Get Started</XButton>
            </motion.div>
        </div>
    </div>
  );
}

function CapabilityCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex flex-col gap-4 p-10 border-r border-b border-[#222] hover:bg-[#080808] transition-colors h-[300px]">
      <div className="mb-auto">
        <Icon size={24} strokeWidth={1.5} className="text-white mb-6" />
        <h3 className="text-[20px] font-medium text-white mb-3">{title}</h3>
        <p className="text-[#888888] text-[15px] leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

function HowItWorks() {
    return (
        <div className="w-full bg-black text-white">
            <div className="max-w-[1440px] mx-auto">
                <div className="p-10 border-b border-[#222]">
                    <SectionLabel>Capabilities</SectionLabel>
                    <h2 className="text-4xl font-medium tracking-tight mt-4 mb-2">Models that fit your needs</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 border-l border-[#222]">
                    <CapabilityCard 
                        icon={Box}
                        title="Subscribe & Request"
                        description="Subscribe to one of our plans and start requesting as many designs as you'd like immediately."
                    />
                    <CapabilityCard 
                        icon={Zap}
                        title="Lightning Turnaround"
                        description="Receive your designs within a few business days on average. We work Monday to Friday."
                    />
                    <CapabilityCard 
                        icon={RefreshCw}
                        title="Unlimited Revisions"
                        description="No more paid revisions. We'll revise the designs until you are 100% satisfied."
                    />
                </div>
            </div>
        </div>
    );
}

function PricingCard({ title, price, features, isPro = false }: { title: string, price: string, features: string[], isPro?: boolean }) {
    return (
        <div className={`p-10 md:p-16 border-b border-r border-[#222] flex flex-col justify-between ${isPro ? 'bg-[#050505]' : ''}`}>
            <div>
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-[24px] font-medium text-white mb-2">{title}</h3>
                        <p className="text-[#666] text-sm">Pause or cancel anytime.</p>
                    </div>
                    {isPro && (
                        <span className="px-3 py-1 rounded-full border border-white/20 text-[10px] font-['DM_Mono'] uppercase tracking-wider text-white">
                            Most Popular
                        </span>
                    )}
                </div>
                
                <div className="mb-10">
                    <div className="text-[48px] font-medium text-white tracking-tight">{price}</div>
                    <div className="text-[#666] text-sm mt-1">per month</div>
                </div>

                <div className="space-y-4 mb-12">
                    {features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Check size={16} className="text-white mt-1 shrink-0" strokeWidth={1.5} />
                            <span className="text-[#999] text-[15px]">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            <XButton primary={isPro}>{isPro ? 'Subscribe Pro' : 'Subscribe Standard'}</XButton>
        </div>
    );
}

function Pricing() {
    const standardFeatures = [
        'One request at a time', 
        'Average 48 hours delivery', 
        'Unlimited brands', 
        'Unlimited users'
    ];

    const proFeatures = [
        'Two requests at a time', 
        'Average 24-48 hours delivery', 
        'Priority support', 
        'Slack integration'
    ];

    return (
        <div className="w-full bg-black text-white border-t border-[#222]">
            <div className="max-w-[1440px] mx-auto border-l border-[#222]">
                 <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-10 md:p-16 border-b border-r border-[#222] flex flex-col justify-end">
                        <SectionLabel>Pricing</SectionLabel>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight mt-4">
                            Choose your power.
                        </h2>
                    </div>
                    <div className="hidden md:block border-b border-r border-[#222] bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale"></div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2">
                    <PricingCard 
                        title="Standard" 
                        price="$3,995" 
                        features={standardFeatures} 
                    />
                    <PricingCard 
                        title="Pro" 
                        price="$5,995" 
                        features={proFeatures}
                        isPro
                    />
                 </div>
            </div>
        </div>
    )
}

function FeatureRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col md:flex-row justify-between py-6 border-b border-[#222] gap-2">
            <span className="text-[#666] text-sm font-['DM_Mono'] uppercase tracking-wider">{label}</span>
            <span className="text-white text-lg md:text-xl font-medium">{value}</span>
        </div>
    );
}

function DeepDive() {
    return (
        <div className="w-full bg-black text-white border-t border-[#222] py-24">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-4xl md:text-[48px] font-medium leading-tight tracking-tight mb-8">
                            Deep dive with <br/> Design Subscription
                        </h2>
                        <p className="text-[#999] text-lg leading-relaxed max-w-md">
                            The most powerful version of design services. Now available with a subscription on all platforms.
                        </p>
                        
                        <div className="mt-12">
                             <XButton>Dive Deep</XButton>
                        </div>
                    </div>
                    
                    <div className="border-t border-[#222]">
                        <FeatureRow label="Request Type" value="Unlimited" />
                        <FeatureRow label="Speed" value="Fast" />
                        <FeatureRow label="Quality" value="Premium" />
                        <FeatureRow label="Support" value="Dedicated" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DesignSubscription({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="flex flex-col items-center w-full bg-black min-h-screen overflow-x-hidden text-white font-sans selection:bg-white selection:text-black">
        <HeroSection />
        <HowItWorks />
        <DeepDive />
        <Pricing />
    </div>
  );
}
