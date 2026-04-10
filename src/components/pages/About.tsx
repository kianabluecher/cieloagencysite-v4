import { ArrowRight, MapPin } from 'lucide-react';
import { GlobalConnection3D } from '../GlobalConnection3D';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import img26 from "figma:asset/a6166bceabea14e3e0f01416350b7f1f7fc5d76f.png";
import img27 from "figma:asset/d23ca8d8409fc454a9cf0f1e4737be19d9c45964.png";
import img28 from "figma:asset/2b5c6273b86f27e8f5aa434f0c6cc7b3d26c57d4.png";
import img29 from "figma:asset/61421c170abd05c3cb0c71f7215cd67d401067ca.png";
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";
import img211 from "figma:asset/f6f542d01a2dabb5b3aaba662025dae394f4b383.png";
import img212 from "figma:asset/3f2cf83b142408821fbe7d0608109ebdd83481f5.png";
import img220 from "figma:asset/28de67f58ed2752a8653f9ab37085d89498364d8.png";
import img222 from "figma:asset/8584f88f390f3d0ba9bd467e12055ef54fefd30d.png";
import img221 from "figma:asset/34235b78ddcec77afa2fbe9d4d1483acafb0db85.png";
import img223 from "figma:asset/8cdd4aa0d8b4fb9be31546822638beffa9d70a52.png";
import img213 from "figma:asset/38e143108cd1c04b747fa4287cdb509bb112a5bc.png";
import img214 from "figma:asset/4672c96cd7ff6d76a1a358460a9b0799791a0cff.png";
import img215 from "figma:asset/ee7de827e029f02e711f3478d1c00f8a7a823542.png";
import img216 from "figma:asset/fb43ff7c2e14690d2d98f5c4d4ee71ece079d176.png";
import img217 from "figma:asset/831fbb0cbf29de524f9de52d0324f4aed305ce2b.png";
import img218 from "figma:asset/966f200e7742f2c18d4be242ee949472883e7706.png";
import img219 from "figma:asset/f9613908e8e0f7f072907cbd73fbdcdd43e9ab08.png";
import img224 from "figma:asset/b666e5e41b33102cb0f244e227156da53db18901.png";
import img225 from "figma:asset/f1baecee6240a5f8f7ddfc00518f8f666166bf0d.png";
import img226 from "figma:asset/ad1829d3292a46b793bd79dcf266692a84caa0f0.png";
import imgKristy from "figma:asset/ec88088efc3fa9e640490beef6b5fcf9cfb10ec5.png";
import imgElle from "figma:asset/8d0b3f96fce600839290b06b9f01a1237b02e08e.png";
import imgNancy from "figma:asset/7f5a462c91d5b9d6c7f2ec661d3332bb76b24f03.png";

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const missionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let velocity = 0;
    let animationFrame: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      setIsDragging(true);
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      velocity = 0;
      cancelAnimationFrame(animationFrame);
    };

    const handleMouseLeave = () => {
      isDown = false;
      setIsDragging(false);
      slider.classList.remove('active');
      applyMomentum();
    };

    const handleMouseUp = () => {
      isDown = false;
      setIsDragging(false);
      slider.classList.remove('active');
      applyMomentum();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      const newScrollLeft = scrollLeft - walk;
      slider.scrollLeft = newScrollLeft;
      velocity = walk;
    };

    const applyMomentum = () => {
      if (Math.abs(velocity) > 0.5) {
        slider.scrollLeft -= velocity;
        velocity *= 0.95;
        animationFrame = requestAnimationFrame(applyMomentum);
      }
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Scroll animation for mission statement
  useEffect(() => {
    const handleScroll = () => {
      if (missionRef.current) {
        const rect = missionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        
        if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
          // More delayed effect - increased denominator for slower reveal
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
    <div className="bg-neutral-950">
      {/* Mission Statement with Scroll Effect */}
      <section ref={missionRef} className="relative h-[300vh]">
        {/* Sticky container that holds both glow and text */}
        <div className="sticky top-0 h-screen flex items-center justify-center px-6 overflow-hidden border-b border-[#1f2228]">
          {/* Top Glow Effect - Light shining down */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none -translate-y-64 z-0">
            {/* Brightest center - white */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-white/50 rounded-full blur-[120px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-white/30 rounded-full blur-[130px]" />
            {/* Middle layer - soft white/blue */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-200/10 rounded-full blur-[140px]" />
            {/* Outer layer - subtle gradient fading out */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-900/5 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-snug font-['Helvetica_Neue',Helvetica,Arial,sans-serif]" style={{ fontWeight: 400 }}>
                <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-snug font-['Helvetica_Neue',Helvetica,Arial,sans-serif] mb-6" style={{ fontWeight: 400 }}>
                  {(() => {
                    const text = "We build brands for the future.";
                    const chars = text.split('');
                    
                    return chars.map((char, index) => {
                      const charProgress = (index / chars.length) * 0.15;
                      const isRevealed = scrollProgress > charProgress;
                      
                      return (
                        <span
                          key={index}
                          style={{
                            color: isRevealed ? '#ffffff' : '#15171a',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {char}
                        </span>
                      );
                    });
                  })()}
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-snug font-['Helvetica_Neue',Helvetica,Arial,sans-serif] mb-6" style={{ fontWeight: 400 }}>
                  {(() => {
                    const text = "A global team and the full creative backend & brand management for innovation-driven, next-generation companies.";
                    const chars = text.split('');
                    const offset = 0.15;
                    
                    return chars.map((char, index) => {
                      const charProgress = offset + (index / chars.length) * 0.2;
                      const isRevealed = scrollProgress > charProgress;
                      
                      return (
                        <span
                          key={index}
                          style={{
                            color: isRevealed ? '#7d8187' : '#15171a',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {char}
                        </span>
                      );
                    });
                  })()}
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-snug font-['Helvetica_Neue',Helvetica,Arial,sans-serif] mb-6" style={{ fontWeight: 400 }}>
                  {(() => {
                    const text = "We move at founder speed to build credibility, scale trust, and drive brand growth worldwide.";
                    const chars = text.split('');
                    const offset = 0.35;
                    
                    return chars.map((char, index) => {
                      const charProgress = offset + (index / chars.length) * 0.2;
                      const isRevealed = scrollProgress > charProgress;
                      
                      return (
                        <span
                          key={index}
                          style={{
                            color: isRevealed ? '#7d8187' : '#15171a',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {char}
                        </span>
                      );
                    });
                  })()}
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-snug font-['Helvetica_Neue',Helvetica,Arial,sans-serif]" style={{ fontWeight: 400 }}>
                  {(() => {
                    const text = "In our philosophy, competition fades into insignificance. We view our work as part of an infinite game, where the goal isn't to outdo others but to continually elevate the industry as a whole.";
                    const chars = text.split('');
                    const offset = 0.55;
                    
                    return chars.map((char, index) => {
                      const charProgress = offset + (index / chars.length) * 0.3;
                      const isRevealed = scrollProgress > charProgress;
                      
                      return (
                        <span
                          key={index}
                          style={{
                            color: isRevealed ? '#7d8187' : '#15171a',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {char}
                        </span>
                      );
                    });
                  })()}
                </p>
              </h2>
            </div>
          </div>
        </div>
      </section>



      {/* Team Section */}
      <section className="border-b border-[#1f2228]">
        <div className="max-w-7xl mx-auto px-8 py-32">
          {/* Management Team */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 rounded-full mb-8">
                <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                  [ OUR TEAM ]
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12 max-w-6xl ml-auto">
              {/* Kiana Bluecher */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img26} alt="Kiana Bluecher" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Kiana Bluecher</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Founder / M. Director
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Leading CIELO's strategic vision and client partnerships. Over 8 years building brands that move fast and make an impact.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    kiana@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>

              {/* Adam Habona */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img27} alt="Adam Habona" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Adam Habona</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Head of Marketing
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Drives growth strategies and campaign execution. Expert in digital marketing, brand positioning, and scaling businesses.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    adam@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>

              {/* Ankit Mittal */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img28} alt="Ankit Mittal" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Ankit Mittal</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Operations Manager
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Ensures seamless project delivery and team coordination. Masters operational excellence with precision and efficiency.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    ankit@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Dubai</span>
                  </div>
                </div>
              </div>

              {/* Sara Batool */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img29} alt="Sara Batool" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Sara Batool</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Head of Social Media
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Crafts compelling social narratives and community engagement. Specialized in content strategy and brand storytelling.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    sara@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Dubai</span>
                  </div>
                </div>
              </div>

              {/* Kristy */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={imgKristy} alt="Kristy Jones" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Kristy Jones</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Brand Strategist
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Develops comprehensive brand identities and positioning strategies. Transforms business goals into cohesive brand experiences.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    kristy@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>

              {/* Kaila Carpenter */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img211} alt="Kaila Carpenter" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Kaila Carpenter</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Head of Partnerships
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Builds strategic alliances and client relationships. Expert at fostering long-term partnerships that drive mutual growth.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    kaila@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>

              {/* New Team Member 1 */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img224} alt="Edgar Shvets" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Edgar Shvets</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Senior Designer
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Edgar leads the creative vision for projects, acting as the team's go-to expert for innovative design solutions. His leadership drives the team's artistic direction and ensures cohesive, impactful outcomes.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    edgar@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>

              {/* New Team Member 2 */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img225} alt="Jacob Reeves" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Jacob Reeves</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Paid Media
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Jacob serves as the team's performance specialist, working closely with clients to develop strategies that align with their specific needs and objectives. His expertise drives performance and helps clients achieve their goals effectively.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    jacob@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>

              {/* New Team Member 3 */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img226} alt="Ana Clara Viana" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Ana Clara Viana</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Account Manager
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Ana oversees client accounts, ensuring their goals are met while maintaining open and proactive communication. She also explores potential partnerships, identifying opportunities that align with both the client's and our agency's objectives.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    ana@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>

              {/* Nancy */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={imgNancy} alt="Nancy Rauf" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Nancy Rauf</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Creative Specialist
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Brings creative concepts to life with innovative solutions and attention to detail. Specializes in visual storytelling and brand expression.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    nancy@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Dubai</span>
                  </div>
                </div>
              </div>

              {/* Zandra Drysdale */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={img210} alt="Zandra Drysdale" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white mb-1">Zandra Drysdale</p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Brand Strategist
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Develops comprehensive brand identities and positioning strategies. Transforms business goals into cohesive brand experiences.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    zandra@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>

              {/* Elle */}
              <div className="text-left space-y-4">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                  <img src={imgElle} alt="Elle" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white">Elle</p>
                    <span className="font-['Geist_Mono'] text-[#FF8C00] text-xs tracking-wider">[ OUR AI ASSISTANT ]</span>
                  </div>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                    Content Strategist
                  </p>
                  <p className="text-[#7d8187] text-sm leading-relaxed mb-3">
                    Crafts compelling content strategies that resonate with audiences. Expert in creating narratives that drive engagement and brand loyalty.
                  </p>
                  <p className="font-['Geist_Mono'] text-[#7d8187] text-xs mb-2">
                    elle@cielo.marketing
                  </p>
                  <div className="flex items-center gap-2 text-[#7d8187] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Miami, FL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creative Team - Scrolling */}
          <div>
            <style>{`
              @keyframes teamScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
            
            <div className="mb-12">
              <h3 className="text-2xl text-white text-center mb-4">Creative Team</h3>
              <p className="text-[#7d8187] text-center font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase">
                + 20 Consultants & Partners for Enterprise Web & Brand
              </p>
            </div>
            
            <div className="relative overflow-hidden">
              {/* Left Gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none z-10" />
              
              {/* Right Gradient */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none z-10" />
              
              <div className="overflow-hidden">
                <div 
                  className="flex gap-8 pb-4" 
                  style={{ 
                    animation: isDragging ? 'none' : 'teamScroll 30s linear infinite'
                  }}
                >
                {/* First set */}
                <div className="flex gap-8 flex-shrink-0">
                  {/* Kim Tan */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img212} alt="Kim Tan" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Kim Tan</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Executive Assistant</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">kim@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Evelyn Gonzales */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img220} alt="Evelyn Gonzales" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Evelyn Gonzales</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Account & Relations</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">evelyn@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Loveline M. */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img222} alt="Loveline M." className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Loveline M.</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Community Manager</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">loveline@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Raphael Schwarz */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img213} alt="Raphael Schwarz" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Raphael Schwarz</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Paid Media</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">raphael@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Andres Garcia */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img214} alt="Andres Garcia" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Andres Garcia</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Photo & Video</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">andres@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Alina Buhaienko */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img215} alt="Alina Buhaienko" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Alina Buhaienko</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Content & Reels</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">alina@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Cris Moreno */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img216} alt="Cris Moreno" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Cris Moreno</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Head Designer</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">cris@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Saymon C. de Giorgio */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img217} alt="Saymon C. de Giorgio" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Saymon de Giorgio</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Video Editor</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">saymon@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Jinwoo Park */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img218} alt="Jinwoo Park" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Jinwoo Park</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Design & UI</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">jinwoo@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Akash M. */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img219} alt="Akash M." className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Akash M.</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Developer</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">akash@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Leo Gaitan */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img221} alt="Leo Gaitan" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Leo Gaitan</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Design Intern</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">leo@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Kateryna Tovstyha */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img223} alt="Kateryna Tovstyha" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Kateryna Tovstyha</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Social Media Intern</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">kateryna@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Second set - duplicate for seamless loop */}
                <div className="flex gap-8 flex-shrink-0">
                  {/* Kim Tan */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img212} alt="Kim Tan" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Kim Tan</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Executive Assistant</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">kim@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Evelyn Gonzales */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img220} alt="Evelyn Gonzales" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Evelyn Gonzales</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Account & Relations</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">evelyn@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Loveline M. */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img222} alt="Loveline M." className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Loveline M.</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Community Manager</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">loveline@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Raphael Schwarz */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img213} alt="Raphael Schwarz" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Raphael Schwarz</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Paid Media</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">raphael@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Andres Garcia */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img214} alt="Andres Garcia" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Andres Garcia</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Photo & Video</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">andres@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Alina Buhaienko */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img215} alt="Alina Buhaienko" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Alina Buhaienko</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Content & Reels</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">alina@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Cris Moreno */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img216} alt="Cris Moreno" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Cris Moreno</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Head Designer</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">cris@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Saymon C. de Giorgio */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img217} alt="Saymon C. de Giorgio" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Saymon de Giorgio</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Video Editor</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">saymon@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Jinwoo Park */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img218} alt="Jinwoo Park" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Jinwoo Park</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Design & UI</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">jinwoo@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Akash M. */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img219} alt="Akash M." className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Akash M.</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Developer</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">akash@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>

                  {/* Leo Gaitan */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img221} alt="Leo Gaitan" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Leo Gaitan</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Design Intern</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">leo@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Miami, FL</span>
                      </div>
                    </div>
                  </div>

                  {/* Kateryna Tovstyha */}
                  <div className="w-56 flex-shrink-0">
                    <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 mb-4">
                      <img src={img223} alt="Kateryna Tovstyha" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <p className="text-white">Kateryna Tovstyha</p>
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        <p className="text-[#7d8187]">Social Media Intern</p>
                      </div>
                      <p className="text-[#7d8187] text-sm">kateryna@cielo.marketing</p>
                      <div className="flex items-center justify-center gap-1 text-[#7d8187] text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>Dubai</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Connection 3D */}
      <GlobalConnection3D />

      {/* CTA Section */}
      <section className="relative px-6 py-32 border-b border-[#1f2228] overflow-hidden">
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        
        {/* Animated Gradient Background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            background: 'linear-gradient(-45deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899)',
            backgroundSize: '200% 200%',
            animation: 'gradient 8s ease infinite'
          }}
        />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl text-white tracking-tight leading-tight">
            That was it about us, now let's learn about you
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('discovery')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-all group"
            >
              Set a Free Discovery Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}