import { useEffect, useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { FAQSection } from '../FAQSection';
import { ArrowRight, Globe, Layers, Terminal, CheckCircle2, Check, CandlestickChart, Wallet, History, Settings2, Coins, Banknote, Gem, MessageSquare, Calendar } from 'lucide-react';
import dashboardImage from 'figma:asset/33921b43d8a6c5e9f92d0491154af6f888b5689a.png';
import icpImage from 'figma:asset/d491e869fe4d6cd4929c049cacf4ed1f5e61adc6.png';
import leadsImage from 'figma:asset/9588e968299be22ecf1783cb625f6f72768ffb11.png';
import calendarImage from 'figma:asset/6f906cfc52f581bfc83a8aa4a4fe1e7e456001f5.png';

interface LeadGenProps {
  onNavigate: (page: string) => void;
}

export function LeadGen({ onNavigate }: LeadGenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const faqs = [
    {
      question: "How does your lead generation system work?",
      answer: "We use AI-powered targeting across multiple channels to identify and engage high-intent prospects for your business. Our system qualifies leads in real-time and delivers only sales-ready opportunities."
    },
    {
      question: "What's your average cost per qualified lead?",
      answer: "Cost varies by industry and target audience, but most clients see $50-150 per qualified lead. Enterprise B2B typically runs higher, while B2C e-commerce is more affordable."
    },
    {
      question: "Do you guarantee a specific number of leads?",
      answer: "We guarantee minimum lead volumes based on your package tier. Most clients exceed minimums by 40-60% within the first 90 days as we optimize campaigns."
    },
    {
      question: "How quickly can we start seeing results?",
      answer: "Initial lead flow typically begins within 14 days of campaign launch. Full optimization and consistent volume occurs by day 30-45."
    },
    {
      question: "What makes your approach different from other agencies?",
      answer: "We combine AI-driven targeting with human qualification. Every lead is verified before delivery, and we provide real-time dashboards showing source, intent signals, and engagement history."
    }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(34, 211, 238, 0.2)');
    gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

    const dataPoints = [
      { x: 0, y: 180 },
      { x: canvas.width * 0.1, y: 165 },
      { x: canvas.width * 0.2, y: 172 },
      { x: canvas.width * 0.3, y: 155 },
      { x: canvas.width * 0.4, y: 160 },
      { x: canvas.width * 0.5, y: 145 },
      { x: canvas.width * 0.6, y: 135 },
      { x: canvas.width * 0.7, y: 140 },
      { x: canvas.width * 0.8, y: 132 },
      { x: canvas.width * 0.9, y: 125 },
      { x: canvas.width, y: 122 }
    ];

    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
    
    for (let i = 1; i < dataPoints.length; i++) {
      const xc = (dataPoints[i].x + dataPoints[i - 1].x) / 2;
      const yc = (dataPoints[i].y + dataPoints[i - 1].y) / 2;
      ctx.quadraticCurveTo(dataPoints[i - 1].x, dataPoints[i - 1].y, xc, yc);
    }
    ctx.stroke();

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Custom Styles for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flow-custom {
          to { stroke-dashoffset: -1000; }
        }
        .animate-flow-custom {
          stroke-dasharray: 10, 10;
          animation: flow-custom 20s linear infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .glow-dot {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        @keyframes radar-scan {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .radar-sweep {
          background: conic-gradient(
            from 180deg at 50% 50%,
            transparent 0deg,
            transparent 200deg,
            rgba(120, 130, 140, 0.05) 240deg,
            rgba(120, 130, 140, 0.3) 360deg
          );
        }
        .mask-radar-bottom {
          mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 85%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 85%);
        }
        .glass-surface {
          background: rgba(10, 15, 30, 0.65);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .glass-top-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(148, 163, 184, 0.6) 50%, transparent 100%);
          box-shadow: 0 0 15px rgba(148, 163, 184, 0.4);
          z-index: 10;
        }
        @keyframes centerCirclePulse {
          0% { opacity: 0; transform: scale(0.4); }
          10% { opacity: 0.9; transform: scale(1); }
          40% { opacity: 0.9; transform: scale(1.02); }
          60% { opacity: 0; transform: scale(1.2); }
          100% { opacity: 0; transform: scale(1.2); }
        }
        .center-circle {
          animation: centerCirclePulse 5s ease-out infinite;
        }
        .center-circle--2 { animation-delay: 0.12s; }
        .center-circle--3 { animation-delay: 0.24s; }
        @keyframes centerRayX {
          0%, 45% { opacity: 0; transform: scaleX(0); }
          60% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes centerRayY {
          0%, 45% { opacity: 0; transform: scaleY(0); }
          60% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 1; transform: scaleY(1); }
        }
        .center-ray-horizontal {
          height: 1px;
          animation: centerRayX 5s ease-out infinite;
        }
        .center-ray-vertical {
          width: 1px;
          animation: centerRayY 5s ease-out infinite;
        }
        .center-ray-left { transform-origin: right center; }
        .center-ray-right { transform-origin: left center; }
        .center-ray-top { transform-origin: center bottom; }
        .center-ray-bottom { transform-origin: center top; }
      `}} />

      {/* Hero with Radar */}
      <section className="relative overflow-hidden min-h-[1100px] pt-32 pb-44">
        {/* Background Effects */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950/80 to-transparent blur-[80px]"></div>
        </div>

        {/* RADAR BACKGROUND */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] z-0 pointer-events-none mask-radar-bottom select-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Sweep Scanner */}
            <div className="absolute inset-0 w-full h-full rounded-full" style={{ animation: 'radar-scan 8s linear infinite' }}>
              <div className="radar-sweep w-full h-full rounded-full"></div>
              <div className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-gradient-to-b from-slate-300 via-slate-400 to-transparent origin-bottom -translate-x-1/2 shadow-[0_0_30px_rgba(148,163,184,0.6)]"></div>
            </div>

            {/* Outer Rings */}
            <div className="absolute w-[98%] h-[98%] rounded-full border border-dashed border-slate-500/10 opacity-30" style={{ animation: 'spin-slow 120s linear infinite' }}></div>
            <div className="absolute w-[80%] h-[80%] rounded-full border border-slate-500/10 opacity-60"></div>
            <div className="absolute w-[72%] h-[72%] rounded-full border border-slate-500/5"></div>

            {/* Grid Lines */}
            <div className="absolute w-full h-full opacity-10">
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-400"></div>
              <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-400"></div>
              <div className="absolute top-[14.6%] left-[14.6%] w-[70.8%] h-[70.8%] border border-slate-400 rounded-full"></div>
            </div>

            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] flex items-center justify-center">
              <div className="absolute inset-0 bg-slate-500/10 blur-xl rounded-full animate-pulse"></div>
              <div className="w-[60%] h-[60%] border border-slate-400/30 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-300 rounded-full shadow-[0_0_10px_rgb(148,163,184)]"></div>
              </div>
            </div>

            {/* Data Points */}
            <div className="absolute top-[20%] left-[75%] w-32 h-8 flex items-center gap-2 text-slate-500/50 text-[10px] font-mono animate-pulse">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
              LEAD_FLOW
            </div>
            <div className="absolute bottom-[40%] left-[25%] w-32 h-8 flex items-center gap-2 text-slate-500/50 text-[10px] font-mono animate-pulse" style={{ animationDelay: '0.7s' }}>
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
              QUALIFYING
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col max-w-7xl z-10 mr-auto ml-auto pr-6 pl-6 relative items-center">
          {/* Text */}
          <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-500/20 bg-slate-950/20 px-4 py-1.5 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(148,163,184,0.1)]">
              <div className="h-1.5 w-1.5 animate-pulse bg-slate-400 rounded-full"></div>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-300">
                AI-Powered Lead Generation
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl tracking-tight leading-none mb-6">
              <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Generate $500K+ Pipeline While Building
              </span>
              <span className="block bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-transparent">
                Category Authority
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
              We position your brand, refine your message, and deliver qualified meetings—on autopilot.
            </p>
          </div>

          {/* Glass Dashboard */}
          <div className="w-full max-w-6xl z-20 mt-[-20px] relative" style={{ perspective: '1000px' }}>
            <div className="glass-surface border-x overflow-hidden transition-all duration-500 bg-zinc-900/95 border-white/20 rounded-t-2xl border-b relative backdrop-blur-md shadow-2xl">
              <div className="glass-top-border"></div>

              {/* Header Bar */}
              <div className="z-20 flex bg-black/20 border-white/5 border-b pt-4 pr-6 pb-4 pl-6 relative items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40"></div>
                  </div>
                  <div className="h-4 w-px bg-white/10 mx-2"></div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-white">Lead Dashboard</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-400">+247% Growth</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/40 border border-slate-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></div>
                    <span className="text-[10px] font-semibold text-slate-300 tracking-wide">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="z-20 flex h-[500px] relative overflow-hidden">
                <img 
                  src={dashboardImage} 
                  alt="Lead Generation Dashboard" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-10 left-0 right-0 h-20 bg-slate-500/10 blur-[50px] pointer-events-none z-0"></div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-black/70 to-black z-[15]"></div>
      </section>

      {/* Integration Flow */}
      <section className="overflow-visible max-w-7xl mr-auto ml-auto pt-24 pr-6 pb-64 pl-6 relative">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-40"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 text-center mb-20">
          <h2 className="text-4xl tracking-tight text-white sm:text-5xl">
            Multi Aspect Brand Growth
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            Comprehensive strategy covering all critical growth levers for your business.
          </p>
        </div>

        {/* Flow Visualization */}
        <div className="max-w-5xl mr-auto ml-auto relative">
          {/* Provider Grid */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 z-10 mb-20 relative">
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <span className="text-slate-400 group-hover:text-white">Brand Growth</span>
            </div>
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <span className="text-slate-400 group-hover:text-white">Messaging</span>
            </div>
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <span className="text-slate-400 group-hover:text-white">Offer & ICP</span>
            </div>
            <div className="group flex transition-all duration-300 hover:bg-white/[0.02] hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden bg-[#0B0C10] w-full h-24 border-white/5 border relative items-center justify-center">
              <span className="text-slate-400 group-hover:text-white">Outreach & Bookings</span>
            </div>
          </div>

          {/* Central Hub */}
          <div className="flex mt-32 z-20 relative justify-center">
            <div className="flex relative items-center justify-center">
              <div className="absolute -top-32 h-32 w-[2px] bg-gradient-to-b from-transparent via-blue-500/50 to-blue-500 shadow-[0_0_20px_#3b82f6]"></div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-neutral-950 shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-blue-500/30">
                <div className="absolute inset-[-10px] rounded-full border border-blue-500/20 border-dashed" style={{ animation: 'spin-slow 10s linear infinite' }}></div>
                <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl animate-pulse"></div>
                <div className="relative z-10 animate-pulse">
                  <Layers className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assets/Features Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-32">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-700/40 bg-slate-900/30 backdrop-blur-sm mb-8">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Lead Types
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-6">
              Qualified Across Industries
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              B2B, B2C, Enterprise, or SMB—we deliver leads that convert.
            </p>
          </div>

          {/* Center Hub with Icons */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-1/2 left-[-50%] right-[-50%] h-[1px] bg-gradient-to-r from-transparent via-slate-700/30 to-transparent -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-[-50%] bottom-[-50%] w-[1px] bg-gradient-to-b from-transparent via-slate-700/30 to-transparent -translate-x-1/2"></div>

            {/* Center Hub */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative w-[140px] h-[140px] flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full"></div>
                <div className="flex bg-blue-600 w-20 h-20 rounded-full ring-neutral-950 ring-4 relative shadow-[0_0_40px_rgba(37,99,235,0.65)] items-center justify-center">
                  <Globe className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-32">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#0B0C10] border border-slate-700/40 flex items-center justify-center mb-6 group-hover:border-slate-600/60 transition-all duration-300">
                  <CandlestickChart className="w-7 h-7 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                <p className="text-sm text-slate-300 max-w-[240px]">
                  B2B Enterprise
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#0B0C10] border border-slate-700/40 flex items-center justify-center mb-6 group-hover:border-slate-600/60 transition-all duration-300">
                  <Coins className="w-7 h-7 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                <p className="text-sm text-slate-300 max-w-[240px]">
                  E-Commerce
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#0B0C10] border border-slate-700/40 flex items-center justify-center mb-6 group-hover:border-slate-600/60 transition-all duration-300">
                  <Banknote className="w-7 h-7 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                <p className="text-sm text-slate-300 max-w-[240px]">
                  Professional Services
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-[#0B0C10] border border-slate-700/40 flex items-center justify-center mb-6 group-hover:border-slate-600/60 transition-all duration-300">
                  <Gem className="w-7 h-7 text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
                <p className="text-sm text-slate-300 max-w-[240px]">
                  SaaS & Tech
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Scroll Container - Contains the 3 overlapping cards */}
      <div className="relative">
        {/* Developer/Code Section */}
        <section className="sticky top-0 pt-24 pr-24 pb-24 pl-24 z-10">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a]" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-700/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-2 z-10 relative">
              <div className="md:p-16 flex flex-col z-10 pt-12 pr-12 pb-12 pl-12 justify-center">
                <div className="mb-6 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  <Terminal className="w-6 h-6 text-slate-400" />
                </div>
                <h2 className="text-3xl tracking-tight text-white sm:text-4xl">
                  Built for Scale.{' '}
                  <span className="bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 bg-clip-text text-transparent">
                    Real-time API.
                  </span>
                </h2>
                <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                  <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                    Access your lead data programmatically. Our API delivers qualified leads with full attribution and intent signals.
                  </p>
                  <ul className="mt-10 space-y-4">
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>Real-time webhooks</span>
                    </li>
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>CRM integrations</span>
                    </li>
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>Custom scoring models</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="min-h-[500px] lg:border-t-0 lg:border-l bg-black/40 border-white/5 border-t relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] max-w-2xl">
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img 
                      src={icpImage} 
                      alt="Ideal Customer Personas" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Review Section */}
        <section className="sticky top-0 pt-24 pr-24 pb-24 pl-24 z-20">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a]" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-700/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-2 z-10 relative">
              <div className="min-h-[500px] lg:border-t-0 lg:border-r bg-black/40 border-white/5 border-b lg:border-b-0 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] max-w-2xl">
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img 
                      src={leadsImage} 
                      alt="Lead Review Dashboard" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="md:p-16 flex flex-col z-10 pt-12 pr-12 pb-12 pl-12 justify-center">
                <div className="mb-6 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  <MessageSquare className="w-6 h-6 text-slate-400" />
                </div>
                <h2 className="text-3xl tracking-tight text-white sm:text-4xl">
                  Review New Leads{' '}
                  <span className="bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 bg-clip-text text-transparent">
                    in Dashboard.
                  </span>
                </h2>
                <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                  <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                    Our Account Managers reply in your company style and based on your values and what information you provided us.
                  </p>
                  <ul className="mt-10 space-y-4">
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>Brand-aligned responses</span>
                    </li>
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>Value-driven messaging</span>
                    </li>
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>Custom communication style</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Meetings Section */}
        <section className="sticky top-0 border-b border-white/5 pt-24 pr-24 pb-24 pl-24 z-30">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1a1a1a]" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-700/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-2 z-10 relative">
              <div className="md:p-16 flex flex-col z-10 pt-12 pr-12 pb-12 pl-12 justify-center">
                <div className="mb-6 h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  <Calendar className="w-6 h-6 text-slate-400" />
                </div>
                <h2 className="text-3xl tracking-tight text-white sm:text-4xl">
                  See Meetings{' '}
                  <span className="bg-gradient-to-r from-slate-700 via-slate-500 to-slate-400 bg-clip-text text-transparent">
                    in Your Calendar.
                  </span>
                </h2>
                <div className="space-y-6 text-lg text-zinc-400 leading-relaxed">
                  <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                    We keep track of leads, follow up, engage and book. You just see them on your calendar!
                  </p>
                  <ul className="mt-10 space-y-4">
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>Automated lead tracking</span>
                    </li>
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>Smart follow-up sequences</span>
                    </li>
                    <li className="flex items-center gap-3 text-base text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-slate-400" />
                      <span>Direct calendar integration</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="min-h-[500px] lg:border-t-0 lg:border-l bg-black/40 border-white/5 border-t relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[90%] max-w-2xl">
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img 
                      src={calendarImage} 
                      alt="Calendar with Scheduled Meetings" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacer to allow sticky sections to scroll away */}
        <div className="h-screen"></div>
      </div>

      {/* Pricing Section - Normal Scroll */}
      <section className="pt-24 pb-24 relative bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl tracking-tight text-white mb-6">
              Investment Packages
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Choose the right program for your growth stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Add-on */}
            <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.05)] p-10 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg text-white">Add-On</h3>
                <p className="text-xs text-gray-600">For Existing CIELO Clients</p>
              </div>
              <div className="text-3xl text-white mb-10">
                $1,500<span className="text-sm text-gray-600">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Brand positioning audit
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Messaging refinement
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  50 qualified leads/mo
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Basic outreach sequences
                </li>
              </ul>
              
              <button 
                onClick={() => onNavigate('about')}
                className="w-full block text-center py-3.5 border border-[rgba(255,255,255,0.08)] text-sm text-white hover:bg-[rgba(255,255,255,0.06)] transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Standalone */}
            <div className="bg-[#0a0a0a] border border-white/15 p-10 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-white"></div>
              <div className="mb-6">
                <h3 className="text-lg text-white">Standalone</h3>
                <p className="text-xs text-gray-600">Full Pipeline Program</p>
              </div>
              <div className="text-3xl text-white mb-10">
                $4,500<span className="text-sm text-gray-600">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Complete brand & ICP workshop
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Offer positioning & messaging
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  200 qualified leads/mo
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Multi-channel outreach
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  15-20 booked meetings/mo
                </li>
              </ul>
              
              <button 
                onClick={() => onNavigate('about')}
                className="w-full block text-center py-3.5 bg-white text-sm text-black hover:bg-gray-200 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Premium */}
            <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.05)] p-10 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg text-white">Premium</h3>
                <p className="text-xs text-gray-600">Scale & Authority</p>
              </div>
              <div className="text-3xl text-white mb-10">
                $8,500<span className="text-sm text-gray-600">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Category leadership strategy
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Authority content creation
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  500+ qualified leads/mo
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Omnichannel campaigns
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  40-50 booked meetings/mo
                </li>
                <li className="text-sm text-gray-400 flex gap-3">
                  <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" /> 
                  Dedicated account team
                </li>
              </ul>
              
              <button 
                onClick={() => onNavigate('about')}
                className="w-full block text-center py-3.5 border border-[rgba(255,255,255,0.08)] text-sm text-white hover:bg-[rgba(255,255,255,0.06)] transition-all"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <PortfolioPreview onNavigate={onNavigate} />

      {/* CTA */}
      <section className="relative px-6 py-32 border-t border-[#1f2228] overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Ready to scale your pipeline?
          </h2>
          <p className="text-2xl text-[#7d8187]">
            Let's generate qualified leads for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-3 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors"
            >
              GET QUOTE
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-white/40 hover:bg-white/5 transition-colors flex items-center justify-center gap-3">
              SCHEDULE DEMO
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </div>
  );
}