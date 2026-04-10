import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface VoidStrategyProps {
  onNavigate: (page: string) => void;
}

export function VoidStrategy({ onNavigate }: VoidStrategyProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('diff');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const slides = [
    {
      src: "https://images.unsplash.com/photo-1629946832022-c327f74956e0?w=2160&q=80",
      title: "DISCOVERY",
      sub: "Weeks 1-2",
      desc: "Stakeholder interviews, customer research, and competitive analysis. Uncovering opportunities to own specific market territory.",
      label: "Phase 1"
    },
    {
      src: "https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=2160&q=80",
      title: "STRATEGY",
      sub: "Weeks 3-4",
      desc: "Defining Brand Purpose, Mission, Values, and Positioning. The strategic framework guiding every brand decision.",
      label: "Phase 2"
    },
    {
      src: "https://images.unsplash.com/photo-1724525647065-f948fc102e68?w=2160&q=80",
      title: "IDENTITY",
      sub: "Weeks 5-8",
      desc: "Translating strategy into visual and verbal systems: Logo, Color, Typography, Visual Language, and Voice.",
      label: "Phase 3"
    },
    {
      src: "https://images.unsplash.com/photo-1557167668-6eb71e76b603?w=2160&q=80",
      title: "GUIDELINES",
      sub: "Weeks 9-10",
      desc: "Comprehensive brand guidelines and core assets (Stationery, Social, Website design system) for consistent execution.",
      label: "Phase 4"
    },
    {
      src: "https://images.unsplash.com/photo-1600897032789-c615ab1b384e?w=2160&q=80",
      title: "LAUNCH",
      sub: "Weeks 11-12",
      desc: "Implementation roadmap, team training, and launch support. We don't just hand off; we ensure successful rollout.",
      label: "Phase 5"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#E6E6E6] font-['Geist'] selection:bg-white selection:text-black overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-5 h-5 border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ left: cursorPos.x, top: cursorPos.y }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{ translateX: '-50%', translateY: '-50%' }}
      />

      {/* Grain Texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fixed Frame Navigation */}
      <nav className="fixed z-50 p-6 md:p-12 flex flex-col w-full h-screen justify-between pointer-events-none">
        <div className="flex justify-between items-start pointer-events-auto mix-blend-difference">
          <div className="group cursor-pointer" onClick={() => onNavigate('home')}>
            <h1 className="text-xs uppercase tracking-[0.4em] transition-all duration-700 group-hover:tracking-[0.6em]">void strategy</h1>
            <span className="text-[10px] opacity-50 font-mono mt-1 block">Brand & Identity — Est. 2024</span>
          </div>
          <div className="flex gap-12">
            <button className="text-[10px] uppercase tracking-[0.3em] hover:line-through decoration-[0.5px]">Work</button>
            <button className="text-[10px] uppercase tracking-[0.3em] hover:line-through decoration-[0.5px]">Process</button>
          </div>
        </div>

        <div className="flex justify-between items-end pointer-events-auto mix-blend-difference">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono opacity-40">Status: Accepting Clients</span>
            <div className="w-24 h-px bg-white/20"></div>
          </div>
          <button className="group flex items-center gap-4" onClick={() => onNavigate('about')}>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">Inquire</span>
            <div className="w-2 h-2 bg-white rounded-full group-hover:scale-[3] transition-transform duration-500 mix-blend-exclusion"></div>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex overflow-hidden w-full h-[120vh] relative items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <motion.img 
            src="https://images.unsplash.com/photo-1759014361901-da620369d9d8?w=3840&q=80" 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125 scale-110"
            animate={{ scale: [1.1, 1.15, 1.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            alt="Void"
          />
        </div>

        <div className="z-10 flex flex-col text-white text-center mix-blend-difference relative items-center">
          <p className="text-[10px] md:text-xs uppercase animate-pulse tracking-[.5em] font-mono mb-8">Turning Businesses Into Brands</p>
          
          <div className="group relative">
            <h2 className="text-[18vw] leading-[0.8] hover:italic transition-all duration-1000 cursor-none select-none font-light italic tracking-tight font-['Cormorant_Garamond']">
              Strategy
            </h2>
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-[.3em] font-mono mt-8 opacity-60">The brutal reality: You are invisible without it.</p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-[10px] uppercase tracking-[0.2em] writing-mode-vertical">
          The Process
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-[#050505] w-full z-10 pt-40 pb-40 relative">
        <div 
          className="absolute top-20 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          <span className="text-[20vw] font-['Cormorant_Garamond'] italic pr-24">Strategic Differentiation — Decision Clarity — Premium Pricing — Customer Loyalty — </span>
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 relative">
          <div className="w-full md:w-[50%] ml-auto mb-40 text-right mix-blend-difference">
            <p className="text-2xl md:text-4xl leading-tight text-[#E6E6E6] font-['Cormorant_Garamond']">
              "Generic branding relegates you to commodity status. Brand strategy transforms you into the <span className="italic text-neutral-500">obvious choice</span>. Without it, you compete on price alone."
            </p>
          </div>

          {/* Reality Card */}
          <div className="relative w-full h-[90vh] mb-40 group cursor-pointer">
            <div className="absolute left-0 top-0 w-[80%] md:w-[60%] h-full z-10 overflow-hidden bg-[#111]">
              <img 
                src="https://images.unsplash.com/photo-1516484411845-e74b77f26b83?w=2560&q=80" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                alt="Reality"
              />
            </div>
            
            <div className="absolute right-[5%] top-[20%] z-20 text-right mix-blend-difference">
              <span className="block text-[10px] tracking-widest font-mono opacity-50 mb-2">THE BRUTAL REALITY</span>
              <h3 className="text-6xl md:text-8xl font-['Cormorant_Garamond'] italic mb-4 group-hover:-translate-x-5 transition-transform duration-700">77% Buy Known</h3>
              <p className="text-xs max-w-[250px] ml-auto leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                77% of consumers buy from brands they recognize. Competitors with strategic branding command 20-30% price premiums.
              </p>
            </div>
          </div>

          {/* Process Slider */}
          <div className="min-h-screen flex w-full mb-40 relative items-center justify-center">
            <div className="relative w-[85vw] md:w-[60vw] lg:w-[32vw] aspect-[3/4] flex flex-col items-center justify-center group perspective-1000">
              {/* Background Cards */}
              <div className="absolute inset-0 w-full h-full bg-[#111] border border-white/5 transform scale-[0.82] -translate-y-16 opacity-30 transition-all duration-1000 ease-out group-hover:-translate-y-20 group-hover:rotate-[-3deg] overflow-hidden pointer-events-none mix-blend-luminosity">
                <img src={slides[2]?.src} className="w-full h-full object-cover grayscale opacity-50" alt="Background" />
              </div>

              <div className="absolute inset-0 w-full h-full bg-[#1a1a1a] border border-white/10 transform scale-[0.90] -translate-y-8 opacity-60 transition-all duration-700 ease-out group-hover:-translate-y-10 group-hover:rotate-[2deg] overflow-hidden shadow-2xl pointer-events-none">
                <img src={slides[1]?.src} className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity" alt="Middle" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              {/* Front Card */}
              <div className="relative w-full h-full bg-[#050505] border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)] z-20 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.01] cursor-pointer">
                <img 
                  src={slides[currentSlide].src}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  alt={slides[currentSlide].title}
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90 opacity-90"></div>

                <div className="absolute top-8 left-8 right-8 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-white/50 tracking-[0.2em] uppercase">{slides[currentSlide].label}</span>
                    <span className="w-8 h-px bg-white/30"></span>
                  </div>
                  <span className="text-[9px] font-mono text-white/50 tracking-[0.2em] uppercase border border-white/10 px-2 py-1 rounded-full backdrop-blur-sm">Process</span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                  <span className="block text-[10px] font-mono text-[#E6E6E6] tracking-[0.3em] uppercase opacity-70 mb-3">{slides[currentSlide].sub}</span>
                  <h3 className="text-5xl md:text-6xl leading-[0.9] text-white tracking-tight font-['Cormorant_Garamond'] italic mb-6">{slides[currentSlide].title}</h3>
                  <div className="h-px w-full bg-white/10 mb-6"></div>
                  <p className="text-sm text-neutral-400 max-w-[240px] leading-relaxed">{slides[currentSlide].desc}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute -bottom-24 w-full flex items-center justify-between gap-8 z-30 px-4">
                <button 
                  onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
                  className="p-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                </button>

                <div className="flex gap-2">
                  {slides.map((_, i) => (
                    <div 
                      key={i}
                      className={`h-0.5 transition-all duration-500 ${i === currentSlide ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-2 bg-white/20'}`}
                    />
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                  className="p-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Horizon Image */}
          <div className="relative w-screen -ml-6 md:-ml-[calc((100vw-100%)/2)] h-[70vh] overflow-hidden group mb-40">
            <img 
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp" 
              className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:brightness-[0.6] group-hover:scale-105 transition-all duration-[2s] ease-linear"
              alt="Horizon"
            />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h3 className="text-white text-4xl md:text-7xl font-['Cormorant_Garamond'] tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-sm group-hover:blur-0">
                TRANSFORMING INDUSTRIES
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="min-h-screen flex overflow-hidden select-none bg-[#050505] pt-32 pb-32 relative items-center justify-center">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/[0.03]"></div>
          <div className="absolute top-0 bottom-0 right-12 w-px bg-white/[0.03]"></div>
          <div className="absolute top-32 bottom-32 left-0 right-0 h-px bg-white/[0.03]"></div>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-['Cormorant_Garamond'] italic text-white/[0.02] tracking-tighter whitespace-nowrap pointer-events-none">
            Impact
          </span>
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center h-full">
          <div className="lg:col-span-5 flex flex-col justify-center h-full relative">
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-white/30"></span>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">Deliverables</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-['Cormorant_Garamond'] italic text-white tracking-tighter leading-[0.9] mb-8">
                What Strategy <span className="text-white/40">Delivers</span>
              </h2>
              <p className="text-sm text-white/60 leading-relaxed max-w-md">
                We do not just design logos. We create decision-making clarity, premium pricing power, and scalable consistency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {['diff', 'clarity', 'value'].map((tab) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`group relative p-5 cursor-pointer transition-all duration-500 overflow-hidden ${
                    activeTab === tab ? 'bg-white/[0.02] border-transparent' : 'bg-transparent border-white/5'
                  } border`}
                >
                  <div className={`absolute left-0 bottom-0 right-0 h-0.5 bg-white transition-all duration-500 ${activeTab === tab ? 'w-full' : 'w-0'}`}></div>
                  <div className={`flex flex-col h-full justify-between relative z-10 gap-3 transition-opacity ${activeTab === tab ? 'opacity-100' : 'opacity-50'}`}>
                    <span className="text-lg font-['Cormorant_Garamond'] italic text-white leading-tight">
                      {tab === 'diff' ? 'Differentiation' : tab === 'clarity' ? 'Clarity' : 'Value'}
                    </span>
                    <p className={`text-[9px] text-white/50 font-mono uppercase tracking-wider transition-opacity ${activeTab === tab ? 'opacity-100' : 'opacity-0'}`}>
                      {tab === 'diff' ? 'defensible territory • market positioning' : 
                       tab === 'clarity' ? 'messaging • target • vision' : 
                       'pricing power • loyalty • retention'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative h-[80vh] w-full flex items-center justify-center lg:justify-end">
            {['diff', 'clarity', 'value'].map((tab, idx) => (
              <div
                key={tab}
                className={`absolute inset-0 w-full h-full flex items-center justify-center lg:justify-end transition-all duration-700 ease-out ${
                  activeTab === tab ? 'opacity-100 z-10 scale-100' : 'opacity-0 pointer-events-none z-0 scale-95'
                }`}
              >
                <div className="relative w-[85%] h-[80%] z-10 group perspective-1000">
                  <div className="absolute inset-0 overflow-hidden shadow-2xl shadow-black/50 transition-transform duration-1000 ease-out group-hover:scale-[1.02] group-hover:rotate-1">
                    <img 
                      src={idx === 0 ? "https://images.unsplash.com/photo-1600897032789-c615ab1b384e?w=1600&q=80" :
                           idx === 1 ? "https://images.unsplash.com/photo-1727883475078-a9d6749faffd?w=1600&q=80" :
                           "https://images.unsplash.com/photo-1630696779947-7e349002cc38?w=1600&q=80"}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-opacity duration-700"
                      alt={tab}
                    />
                    <div className="absolute inset-4 border border-white/10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="absolute -right-20 -bottom-20 w-[40vw] h-[40vw] border-[0.5px] border-white/[0.03] rounded-full pointer-events-none animate-[spin_60s_linear_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#E6E6E6] text-[#050505] min-h-screen relative py-24 px-6 md:px-12 flex flex-col justify-between overflow-hidden">
        <div className="relative z-10 border-b border-black/10 pb-12 mb-12">
          <span className="text-[10px] uppercase tracking-[0.4em]">Services</span>
        </div>

        <div className="flex-grow flex flex-col z-10 relative space-y-8 justify-center">
          {[
            { title: 'Complete Development', subtitle: 'Full Package', desc: 'Full strategy and identity development for startups, rebrands, or businesses scaling to next level.' },
            { title: 'Strategy Only', subtitle: 'Foundation', desc: 'For businesses with existing identity needing strategic clarity, positioning, and messaging framework.' },
            { title: 'Identity Design', subtitle: 'Visuals', desc: 'Visual identity development for businesses with defined strategy. Logo, color, typography, and assets.' },
            { title: 'Brand Refresh', subtitle: 'Modernization', desc: 'Modernizing assets while maintaining equity and recognition.' },
          ].map((service, i) => (
            <div key={i} className="group relative cursor-pointer">
              <h2 className="text-5xl md:text-8xl font-['Cormorant_Garamond'] italic text-black/20 group-hover:text-black transition-colors duration-500 group-hover:translate-x-8 transform ease-out tracking-tight">
                {service.title}<span className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity duration-500"> — {service.subtitle}</span>
              </h2>
              <div className="h-px w-0 group-hover:w-full bg-black mt-4 transition-all duration-700 ease-out opacity-20"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-right pointer-events-none hidden md:block">
                <p className="text-xs font-mono uppercase tracking-widest max-w-xs">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="z-10 text-right pt-24 relative">
          <p className="text-[10px] font-mono opacity-50">SCROLL FOR ROI</p>
        </div>
      </section>

      {/* ROI Section */}
      <section className="min-h-[80vh] flex flex-col md:flex-row group overflow-hidden bg-black w-full border-white/10 border-t relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0a9f881a-4c7f-42c3-bac5-237299109373_3840w.webp" 
            className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-700 ease-out"
            alt="Luxury Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60"></div>
        </div>

        <div className="relative w-full md:w-3/5 h-[50vh] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0a0a]/80 backdrop-blur">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=2160&q=80" 
              className="w-full h-full object-cover grayscale brightness-50 contrast-125 transition-all duration-[3s] ease-out group-hover:scale-105 group-hover:brightness-75 group-hover:grayscale-0"
              alt="Abstract Form"
            />
          </div>
          
          <div className="absolute top-8 left-8 z-20 mix-blend-difference">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono text-white/60 tracking-[0.2em] uppercase">Return_On_Invest</span>
            </div>
            <span className="text-xs font-mono text-white tracking-widest pl-3.5">METRICS</span>
          </div>
        </div>

        <div className="relative w-full md:w-2/5 h-auto md:h-full bg-[#050505]/90 backdrop-blur-md p-8 md:p-16 flex flex-col justify-between z-10">
          <div className="flex flex-col gap-6 pt-8 md:pt-0">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em]">The Investment</span>
            <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] italic text-white leading-[1.1] tracking-tight">
              Why It Pays
            </h2>
          </div>

          <div className="py-12 md:py-0 relative">
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block"></div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs pt-4 pb-4">
              Brand strategy and identity isn't an expense—it's an investment with measurable returns compounding over time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-auto">
            <div>
              <span className="text-[9px] uppercase block text-neutral-600 tracking-widest font-mono mb-2">Growth Rate</span>
              <span className="text-lg italic text-neutral-300 font-['Cormorant_Garamond']">2.4x Faster</span>
            </div>
            <div>
              <span className="text-[9px] uppercase block text-neutral-600 tracking-widest font-mono mb-2">Price Premium</span>
              <span className="text-lg italic text-neutral-300 font-['Cormorant_Garamond']">+30%</span>
            </div>
            <div>
              <span className="text-[9px] uppercase block text-neutral-600 tracking-widest font-mono mb-2">Hiring Cost</span>
              <span className="text-lg italic text-neutral-300 font-['Cormorant_Garamond']">-50%</span>
            </div>
            <div>
              <span className="text-[9px] uppercase block text-neutral-600 tracking-widest font-mono mb-2">Revenue</span>
              <span className="text-lg italic text-neutral-300 font-['Cormorant_Garamond']">+23% Lift</span>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Mirror Section */}
      <section className="min-h-[60vh] flex flex-col overflow-hidden bg-[#050505] pt-20 pb-20 relative items-center justify-center" style={{ perspective: '1000px' }}>
        <div className="z-20 relative text-center">
          <h2 className="text-6xl md:text-9xl cursor-default text-white tracking-tighter font-['Cormorant_Garamond'] mb-4">Investment</h2>
          <p className="text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed">$15k - $150k+</p>
        </div>
        
        <div 
          className="z-10 transform pointer-events-none select-none blur-[1px] opacity-30 mt-[-10px] relative"
          style={{ 
            transform: 'scaleY(-1) rotateX(180deg)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
          }}
        >
          <h2 className="text-6xl md:text-9xl font-['Cormorant_Garamond'] text-white tracking-tighter">Investment</h2>
        </div>

        <motion.div 
          className="w-32 h-32 border border-white/10 rounded-full absolute top-[40%] left-[10%] blur-sm opacity-20"
          animate={{ translateY: [0, -30, 10, 0], rotate: [0, 2, -1, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="w-48 h-48 border border-white/5 rounded-full absolute right-[15%] bottom-[30%] blur-sm opacity-20"
          animate={{ translateY: [0, -30, 10, 0], rotate: [0, 2, -1, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </section>

      {/* FAQ Section */}
      <section className="bg-[#050505] py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em]">Common Questions</span>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "What's the difference between Strategy & Identity?",
                a: "Strategy is the \"why\" and \"how\"—blueprint. Identity is the \"what\"—visuals. Strategy defines your positioning; identity expresses it."
              },
              {
                q: "How long does a project take?",
                a: "Typical timeline is 12-16 weeks for comprehensive projects. Small business branding takes 8-12 weeks. Enterprise projects can take 24+ weeks."
              },
              {
                q: "Can't I just hire a freelance designer?",
                a: "Freelancers excel at execution, agencies at strategy. For $2,000 you get a logo. For strategic growth, you need research, positioning, and a system."
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-white/[0.02] border border-white/5 open:bg-white/[0.05] transition-colors duration-300">
                <summary className="flex items-center justify-between p-6 cursor-pointer">
                  <span className="text-lg font-['Cormorant_Garamond'] italic text-white/80 group-hover:text-white transition-colors">{faq.q}</span>
                  <span className="text-white/50 group-open:rotate-180 transition-transform duration-300">↓</span>
                </summary>
                <div className="px-6 pb-6 text-sm text-neutral-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="min-h-[80vh] flex flex-col overflow-hidden text-center bg-[#050505] relative items-center justify-center">
        <div className="absolute w-[80vw] h-[80vw] border-[0.5px] border-white/5 rounded-full pointer-events-none" style={{ animation: 'spin 40s linear infinite' }}></div>
        <div className="absolute w-[60vw] h-[60vw] border-[0.5px] border-white/5 rounded-full pointer-events-none" style={{ animation: 'spin 30s linear infinite reverse' }}></div>

        <div className="relative z-10 mix-blend-difference">
          <a href="mailto:hello@cielo.agency" className="block group">
            <span className="block text-xs font-mono mb-6 tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">start the process</span>
            <span className="text-6xl md:text-9xl font-['Cormorant_Garamond'] italic text-white group-hover:text-neutral-400 transition-colors duration-700">
              hello@cielo.agency
            </span>
          </a>
        </div>

        <div className="absolute bottom-8 w-full px-8 flex justify-between items-end text-[9px] text-white/20 font-mono uppercase tracking-widest">
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
            <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
          </div>
          <div className="text-right">
            <p>CIELO Agency © 2025</p>
            <p>All Rights Reserved</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
