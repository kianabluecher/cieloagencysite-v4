import { Sparkles } from 'lucide-react';
import heroImage from 'figma:asset/e74826ef601ca6a16c112b25e97e0fb99aa22c55.png';

interface DiscoveryLandingProps {
  onNavigate: (page: string) => void;
}

export function DiscoveryLanding({ onNavigate }: DiscoveryLandingProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* EXIT Button - Top Left */}
      <div className="absolute top-8 left-8 z-50">
        <button 
          onClick={() => onNavigate('home')}
          className="text-white font-['Geist_Mono'] text-xs tracking-[2px] uppercase hover:text-zinc-400 transition-colors duration-300"
        >
          EXIT
        </button>
      </div>

      {/* NEW CTA SECTION */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch h-full">
            
            {/* Left: Rounded Image Card */}
            <div className="relative h-[600px] lg:h-[650px] overflow-hidden rounded-[40px] group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <img 
                src={heroImage} 
                alt="Abstract Cloud Portal" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-end py-16 px-8 md:px-12">
                {/* 3 Steps at Bottom */}
                <div className="w-full max-w-md space-y-4">
                  {/* Step 1 */}
                  <div className="bg-zinc-800/80 backdrop-blur-sm px-6 py-4 border border-white/10">
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      <span className="font-['Geist_Mono'] text-white/50 text-xs mr-2">STEP 1:</span>
                      What is your business great at?
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-zinc-800/80 backdrop-blur-sm px-6 py-4 border border-white/10">
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      <span className="font-['Geist_Mono'] text-white/50 text-xs mr-2">STEP 2:</span>
                      Our specialists review, research and strategize
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-zinc-800/80 backdrop-blur-sm px-6 py-4 border border-white/10">
                    <p className="text-white/90 text-sm md:text-base leading-relaxed">
                      <span className="font-['Geist_Mono'] text-white/50 text-xs mr-2">STEP 3:</span>
                      Receive full audit, brand building & growth strategy + full plan within 24 - 48h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content Card */}
            <div className="relative h-[600px] lg:h-[650px] bg-zinc-900/20 border border-white/5 rounded-[40px] p-12 md:p-16 flex flex-col justify-between overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none"></div>

              {/* Top Icon */}
              <div className="relative z-10">
                <Sparkles size={48} className="text-white" strokeWidth={1.5} />
              </div>

              {/* Main Content */}
              <div className="relative z-10 max-w-lg">
                <h2 className="text-4xl md:text-5xl tracking-tight leading-[1.15] mb-6 text-white" style={{ fontWeight: 400 }}>
                  Build Enterprise Value & Brands
                </h2>
                <p className="text-zinc-400 font-['Geist_Mono'] text-xs md:text-sm leading-relaxed mb-10 max-w-sm">
                  <span className="text-white">FREE Business Audit</span>, How to position your brand, build reputation & grow. Delivered by our specialists with over 15+ years of experience, generated 10M+ in Value
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => onNavigate('discovery')}
                    className="px-8 py-4 bg-black border border-white text-white font-['Geist_Mono'] text-xs tracking-[2px] uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    GET A FREE CUSTOM AUDIT <span className="text-zinc-400">(VALUE $650)</span>
                  </button>
                </div>
              </div>

              {/* Footer Text */}
              <div className="relative z-10">
                <span className="text-zinc-600 font-['Geist_Mono'] text-[10px] uppercase tracking-widest">cielo.community</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}