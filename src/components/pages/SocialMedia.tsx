import { useState, useEffect, useRef } from 'react';
import { Brain, Target, TrendingUp, Cpu, ArrowUpRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import heroImage from 'figma:asset/065329b54364b11ee40b7618a7cf56650c20ac10.png';
import { DraggableSlideshow } from '../DraggableSlideshow';
import { IndustriesScroll } from '../IndustriesScroll';
import { TestimonialSlideshow } from '../TestimonialSlideshow';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import ctaImage1 from 'figma:asset/de7a2be995fb5993aa3d9ae2178616e0bb77ed38.png';
import ctaImage2 from 'figma:asset/b72b93f7c525266f61bcb9df9ec77f3051d24777.png';
import ctaImage3 from 'figma:asset/8e23726acfbc3cab59b5a3320f7e06f9caf5c6d3.png';
import ctaImage4 from 'figma:asset/4b0919d6d9a433652010c66adcdb1c4f9e0151f0.png';
import ctaImage5 from 'figma:asset/bee1ef4fe595a7417543bd48c2fc415cf3f13a96.png';
import slideImage1 from 'figma:asset/e834cdb69e621575e5d6afb2b7ac02ae53981c77.png';
import slideImage2 from 'figma:asset/ca23bc9d0126da8c71957e375371a1a920b5ad11.png';
import slideImage3 from 'figma:asset/c159ad20a8eba2895bee86964b07c89cb155ed47.png';
import slideImage4 from 'figma:asset/257fcfe47ce90ad77dda495b18963e1e9114bd43.png';
import slideImage5 from 'figma:asset/a72dbf73fbb5bc646e1cc07b4e2100d14eca5565.png';
import slideImage6 from 'figma:asset/2dbcaf0e06c19c41a47b3bdde03ab061135020ce.png';
import processImage1 from 'figma:asset/79f8127ab702b67474a438e34debbb5184e562b2.png';
import processImage2 from 'figma:asset/ce6a89106bbcacc66d5b7ef0014ecd3ee01eb899.png';
import processImage3 from 'figma:asset/8d58ba98e223ad4dd198409196e30cc38571c3ef.png';
import processImage4 from 'figma:asset/611b4af9107d00f8cb081f8daf455e8a3e311988.png';
import processImage5 from 'figma:asset/e6cd57d918c71c34ea3fbb07f27a5476777ba64a.png';
import processImage6 from 'figma:asset/78e51a61d83b1d637c585324450a6f449c6845e8.png';
import testimonial1 from 'figma:asset/ddf83294279cfe8096153436c061b4dc42396654.png';
import testimonial2 from 'figma:asset/8b7c37d31d601b65ed3752b404c4cfaf5e6ea5e6.png';
import testimonial3 from 'figma:asset/4abfe953bf56366d226ba0165f9307f04ce7fc35.png';
import testimonial4 from 'figma:asset/ce5f62968a5b3f84556c7c1fd7b3fa45f63ae65f.png';
import testimonial5 from 'figma:asset/bc1c4920eda8d7dde731866e248a233fa2f21102.png';
import testimonial6 from 'figma:asset/2c920610e0d55c3784e392fbdbca2b6d1b2e1327.png';
import testimonial7 from 'figma:asset/0f3ded31bd4fd25d463cb8fa5bff48cba2bf75fe.png';
import testimonial8 from 'figma:asset/748ceae8749212dac1d2fac2b786f9030c9a53fb.png';
import testimonial9 from 'figma:asset/327d9f7a777342593d22acfae7d8018f982aea55.png';
import testimonial10 from 'figma:asset/5857b76116b41ba8d53e7b60a9e981609e1ab8f0.png';
import testimonial11 from 'figma:asset/af941fb68130ecb47b6139cbbbabb7bd7fcb759b.png';

interface SocialMediaProps {
  onNavigate: (page: string) => void;
}

export function SocialMedia({ onNavigate }: SocialMediaProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [email, setEmail] = useState('');
  const [showDownloadButton, setShowDownloadButton] = useState(false);
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
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };
  
  const features = [
    {
      icon: Brain,
      title: 'Strategy That Leads',
      description: 'Monthly brand sessions, content pillars, GTM focus.',
    },
    {
      icon: Target,
      title: 'Full Creative Execution',
      description: 'Reels, carousels, LinkedIn, email, and ad copy.',
    },
    {
      icon: TrendingUp,
      title: 'Growth-Focused Management',
      description: 'Weekly optimization, channel expansion.',
    },
    {
      icon: Cpu,
      title: 'AI-Enhanced Systems',
      description: 'Dashboards, automations, reporting.',
    },
  ];

  const benefits = [
    'Execution without bottlenecks',
    'Consultative partnership, not task-taking',
    'Smart creative that drives results',
    'Weekly and monthly reporting',
  ];

  const channels = [
    { name: 'LinkedIn', description: 'Professional content strategy, thought leadership posts, article writing & engagement management', angle: 0 },
    { name: 'Instagram', description: 'Visual storytelling, reels production, carousel design & influencer collaborations', angle: 40 },
    { name: 'YouTube', description: 'Video scripting, thumbnail design, SEO optimization & audience growth strategies', angle: 80 },
    { name: 'Publications', description: 'Press releases, media outreach, editorial placements & industry features', angle: 120 },
    { name: 'Webinar', description: 'Webinar scripting, production, editing & marketing', angle: 160 },
    { name: 'Podcast', description: 'Podcast strategy, recording setup, post-production & distribution', angle: 200 },
    { name: 'Pinterest', description: 'Pin design, board curation, seasonal campaigns & visual SEO', angle: 240 },
    { name: 'Ad Creatives', description: 'Paid ad design, A/B testing, conversion-focused copywriting & campaign optimization', angle: 280 },
    { name: 'AI Content', description: 'AI-powered content generation, automated workflows & performance analytics', angle: 320 },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image with Gradient Blend */}
        <div className="absolute inset-0 -top-32">
          <img 
            src={heroImage} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay blending to dark grey at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Social Media ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <motion.span 
              className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {['B', 'u', 'i', 'l', 't', ' ', 't', 'o', ' ', 's', 'c', 'a', 'l', 'e', ' ', 'y', 'o', 'u', 'r'].map((char, i) => (
                <motion.span
                  key={`char1-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05, delay: i * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.95 }}
            >
              {['c', 'r', 'e', 'd', 'i', 'b', 'i', 'l', 'i', 't', 'y', ',', ' ', 'n', 'o', 't', ' ', 'j', 'u', 's', 't', ' ', 'p', 'o', 's', 't'].map((char, i) => (
                <motion.span
                  key={`char2-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05, delay: 1 + i * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-8">
              Strategy-backed content creation, execution, and growth management for founders and brands that move fast.
            </p>
          </div>
        </div>
      </section>

      {/* Draggable Slideshow */}
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

      {/* Scrolling Text Animation */}
      <section ref={textSectionRef} className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Line 1 */}
            <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
              {(() => {
                const text = "What if you could have one stable team?";
                const chars = text.split('');
                
                return chars.map((char, index) => {
                  const charProgress = (index / chars.length) * 0.15;
                  const isRevealed = scrollProgress > charProgress;
                  
                  return (
                    <span
                      key={index}
                      style={{
                        color: isRevealed ? '#ffffff' : '#2a2e33',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {char}
                    </span>
                  );
                });
              })()}
            </p>

            {/* Line 2 */}
            <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
              {(() => {
                const text = "One team, that leads creative direction, all social media content, multi channel content, production, print, webinar, ...";
                const chars = text.split('');
                const offset = 0.2;
                
                return chars.map((char, index) => {
                  const charProgress = offset + (index / chars.length) * 0.2;
                  const isRevealed = scrollProgress > charProgress;
                  
                  return (
                    <span
                      key={index}
                      style={{
                        color: isRevealed ? '#ffffff' : '#2a2e33',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {char}
                    </span>
                  );
                });
              })()}
            </p>

            {/* Line 3 */}
            <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
              {(() => {
                const text = "just everything?";
                const chars = text.split('');
                const offset = 0.45;
                
                return chars.map((char, index) => {
                  const charProgress = offset + (index / chars.length) * 0.1;
                  const isRevealed = scrollProgress > charProgress;
                  
                  return (
                    <span
                      key={index}
                      style={{
                        color: isRevealed ? '#ffffff' : '#2a2e33',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {char}
                    </span>
                  );
                });
              })()}
            </p>

            {/* Line 4 */}
            <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight text-center leading-relaxed" style={{ fontWeight: 400 }}>
              {(() => {
                const text = "Managing your brand across all channels, on & offline, one team for everything.";
                const chars = text.split('');
                const offset = 0.6;
                
                return chars.map((char, index) => {
                  const charProgress = offset + (index / chars.length) * 0.25;
                  const isRevealed = scrollProgress > charProgress;
                  
                  return (
                    <span
                      key={index}
                      style={{
                        color: isRevealed ? '#ffffff' : '#2a2e33',
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
      </section>

      {/* Built For */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-white mb-12">Built For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                title: 'Founders scaling fast',
                description: 'You need consistent content without the overhead',
              },
              {
                title: 'Overloaded brand teams',
                description: 'Your team needs creative support and strategic direction',
              },
              {
                title: 'Serial operators',
                description: 'Managing multiple ventures and need systems that scale',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-12 min-h-[280px] border border-[#1f2228] group flex flex-col justify-end items-start"
              >
                <h3 className="text-xl text-white mb-4">{item.title}</h3>
                <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process - 4 Step Grid */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight">
              Our Process
            </h2>
            <p className="text-xl text-[#7d8187] max-w-2xl text-[15px]">
              From strategy to execution, we follow a proven process that ensures your social media presence scales with your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Step 1 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <img 
                  src={processImage1}
                  alt="Strategy & Discovery"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">01</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Strategy & Discovery</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors mb-6">
                Deep dive into your brand, audience, and goals. We identify content pillars and create a strategic roadmap for growth.
              </p>
              <button className="px-6 py-2.5 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-xs tracking-[0.1em] uppercase hover:border-white/40 hover:bg-white/5 transition-colors">
                BRAND REFINEMENT
              </button>
            </div>

            {/* Step 2 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <img 
                  src={processImage2}
                  alt="Content Creation"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">02</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Content Creation</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                We produce high-quality content across all formats—reels, carousels, stories, and posts—designed to engage and convert.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <img 
                  src={processImage3}
                  alt="Brand Development"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">03</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Brand Development</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Crafting cohesive visual identities and brand guidelines that ensure consistency across all touchpoints.
              </p>
            </div>

            {/* Step 4 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <img 
                  src={processImage4}
                  alt="Execution & Management"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">04</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Execution & Management</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Consistent posting, community engagement, and real-time optimization across all your social media channels.
              </p>
            </div>

            {/* Step 5 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <img 
                  src={processImage5}
                  alt="Content Planning"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">05</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Content Planning</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Strategic content calendar management and scheduling to ensure consistent, timely delivery across all platforms.
              </p>
            </div>

            {/* Step 6 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <img 
                  src={processImage6}
                  alt="Performance Tracking"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">06</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Performance Tracking</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Real-time monitoring and detailed analytics to measure engagement, reach, and ROI across all campaigns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Label */}
      <section className="px-6 pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase text-center">
            [ INDUSTRIES WE WORK WITH ]
          </p>
        </div>
      </section>

      {/* Industries Scroll */}
      <IndustriesScroll />

      {/* Multi-Channel Management */}
      <section className="px-12 py-32 border-t border-[#1f2228] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              Multi-Channel Management & Content Production
            </h2>
            <p className="text-xl text-[#7d8187] max-w-3xl mx-auto">
              Reproduce your content across every platform that matters. One strategy, infinite reach.
            </p>
          </div>

          {/* Radial Flow Chart Graphic */}
          <div className="relative w-full h-[700px] flex items-center justify-center">
            {/* Background Concentric Circles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <circle cx="50%" cy="50%" r="100" fill="none" stroke="#2a2d35" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="150" fill="none" stroke="#2a2d35" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="200" fill="none" stroke="#2a2d35" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="250" fill="none" stroke="#2a2d35" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50%" cy="50%" r="300" fill="none" stroke="#2a2d35" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Radial Lines and Dots */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 700">
              <defs>
                {/* Define gradient for lines */}
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#3a3d45', stopOpacity: 0.5 }} />
                  <stop offset="100%" style={{ stopColor: '#3a3d45', stopOpacity: 1 }} />
                </linearGradient>
                {/* Glow filter for light blue dots */}
                <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Channel 1: LinkedIn - 0° (Top) */}
              <line x1="400" y1="350" x2="400" y2="50" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="400" cy="230" r="4" fill="#ffffff" />
              <circle cx="400" cy="150" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              <circle cx="400" cy="90" r="4" fill="#64748b" />
              
              {/* Channel 2: Instagram - 33° */}
              <line x1="400" y1="350" x2="562" y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="495" cy="255" r="4" fill="#64748b" />
              <circle cx="535" cy="165" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              <circle cx="555" cy="120" r="4" fill="#ffffff" />
              
              {/* Channel 3: Newsletter - 66° */}
              <line x1="400" y1="350" x2="661" y2="189" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="555" cy="295" r="4" fill="#ffffff" />
              <circle cx="615" cy="235" r="4" fill="#64748b" />
              <circle cx="650" cy="205" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              
              {/* Channel 4: YouTube - 98° */}
              <line x1="400" y1="350" x2="691" y2="304" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="570" cy="340" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              <circle cx="635" cy="325" r="4" fill="#ffffff" />
              <circle cx="675" cy="315" r="4" fill="#64748b" />
              
              {/* Channel 5: Publications - 131° */}
              <line x1="400" y1="350" x2="651" y2="511" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="540" cy="450" r="4" fill="#64748b" />
              <circle cx="600" cy="485" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              <circle cx="635" cy="500" r="4" fill="#ffffff" />
              
              {/* Channel 6: Print & Collateral - 164° */}
              <line x1="400" y1="350" x2="478" y2="640" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="428" cy="510" r="4" fill="#ffffff" />
              <circle cx="455" cy="585" r="4" fill="#64748b" />
              <circle cx="470" cy="625" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              
              {/* Channel 7: Webinar - 196° */}
              <line x1="400" y1="350" x2="322" y2="640" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="372" cy="510" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              <circle cx="345" cy="585" r="4" fill="#ffffff" />
              <circle cx="330" cy="625" r="4" fill="#64748b" />
              
              {/* Channel 8: Podcast - 229° */}
              <line x1="400" y1="350" x2="149" y2="511" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="260" cy="450" r="4" fill="#64748b" />
              <circle cx="200" cy="485" r="4" fill="#ffffff" />
              <circle cx="165" cy="500" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              
              {/* Channel 9: Pinterest - 262° */}
              <line x1="400" y1="350" x2="109" y2="304" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="230" cy="340" r="4" fill="#ffffff" />
              <circle cx="165" cy="325" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              <circle cx="125" cy="315" r="4" fill="#64748b" />
              
              {/* Channel 10: Ad Creatives - 295° */}
              <line x1="400" y1="350" x2="139" y2="189" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="245" cy="295" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
              <circle cx="185" cy="235" r="4" fill="#64748b" />
              <circle cx="150" cy="205" r="4" fill="#ffffff" />
              
              {/* Channel 11: AI Content - 327° */}
              <line x1="400" y1="350" x2="238" y2="100" stroke="url(#lineGradient)" strokeWidth="1.5" />
              <circle cx="305" cy="255" r="4" fill="#64748b" />
              <circle cx="265" cy="165" r="4" fill="#ffffff" />
              <circle cx="245" cy="120" r="4" fill="#cbd5e1" filter="url(#glowBlue)" />
            </svg>

            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-44 h-44 rounded-full border-2 border-neutral-600 bg-neutral-950 flex items-center justify-center">
                <span className="font-['Geist_Mono'] text-neutral-400 text-[13px] tracking-wider text-center leading-tight">
                  [ BRAND &<br />CONTENT ]
                </span>
              </div>
            </div>

            {/* Channel Pills Positioned Radially with Tooltips */}
            <TooltipProvider delayDuration={200}>
              {/* LinkedIn - 0° (Top) */}
              <div className="absolute" style={{ top: '50px', left: '50%', transform: 'translateX(-50%)' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      LinkedIn
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Professional content strategy, thought leadership posts, article writing & engagement management</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Instagram - 33° */}
              <div className="absolute" style={{ top: '70px', right: '145px' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      Instagram
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Visual storytelling, reels production, carousel design & influencer collaborations</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Newsletter - 66° */}
              <div className="absolute" style={{ top: '145px', right: '60px' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      Newsletter
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Email campaigns, subscriber growth strategies, automated sequences & engagement analytics</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* YouTube - 98° */}
              <div className="absolute" style={{ top: '265px', right: '30px' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      YouTube
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Video scripting, thumbnail design, SEO optimization & audience growth strategies</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Publications - 131° */}
              <div className="absolute" style={{ bottom: '115px', right: '70px' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      Publications
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Press releases, media outreach, editorial placements & industry features</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Print & Collateral - 164° */}
              <div className="absolute" style={{ bottom: '25px', right: '54%' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      Print & Collateral
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Business cards, brochures, packaging design, event materials & branded merchandise</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Webinar - 196° */}
              <div className="absolute" style={{ bottom: '25px', left: '54%' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      Webinar
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Webinar scripting, production, editing & marketing</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Podcast - 229° */}
              <div className="absolute" style={{ bottom: '115px', left: '70px' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      Podcast
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Podcast strategy, recording setup, post-production & distribution</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Pinterest - 262° */}
              <div className="absolute" style={{ top: '265px', left: '30px' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      Pinterest
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Pin design, board curation, seasonal campaigns & visual SEO</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Ad Creatives - 295° */}
              <div className="absolute" style={{ top: '145px', left: '60px' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      Ad Creatives
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">Paid ad design, A/B testing, conversion-focused copywriting & campaign optimization</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* AI Content - 327° */}
              <div className="absolute" style={{ top: '70px', left: '145px' }}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="px-5 py-2.5 rounded-full border border-[#60a5fa]/30 bg-neutral-950 text-white font-['Geist_Mono'] text-xs uppercase tracking-wide whitespace-nowrap hover:border-[#60a5fa] hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all cursor-pointer">
                      AI Content
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 border-[#60a5fa]/50 text-white">
                    <p className="text-sm">AI-powered content generation, automated workflows & performance analytics</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
        </div>
      </section>

      {/* Testimonial Slideshows */}
      <section className="py-16 border-t border-[#1f2228] bg-neutral-950">
        <div className="space-y-6">
          {/* First row - scrolls left */}
          <TestimonialSlideshow
            images={[testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6, testimonial7, testimonial8, testimonial9, testimonial10, testimonial11]}
            direction="left"
            speed={30}
          />
          
          {/* Second row - scrolls right */}
          <TestimonialSlideshow
            images={[testimonial11, testimonial10, testimonial9, testimonial8, testimonial7, testimonial6, testimonial5, testimonial4, testimonial3, testimonial2, testimonial1]}
            direction="right"
            speed={35}
          />
        </div>
      </section>

      {/* Why It Works */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-white mb-12">Why It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-12 min-h-[250px] border border-[#1f2228] group flex items-center justify-center"
              >
                <p className="text-xl text-white text-center">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Large Section with Floating Images */}
      <section 
        className="relative px-6 py-64 border-t border-[#1f2228] overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Dot Pattern Background - Only behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className="w-[800px] h-[400px]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(125, 129, 135, 0.15) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)',
            }}
          />
        </div>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Yoga Image - Top Left */}
          <img
            src={ctaImage1}
            alt=""
            className="absolute top-[5%] left-[8%] w-32 h-32 md:w-48 md:h-48 md:left-[5%] object-contain transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            }}
          />
          
          {/* Cycling Image - Top Right */}
          <img
            src={ctaImage2}
            alt=""
            className="absolute top-[8%] right-[8%] w-28 h-36 md:w-36 md:h-44 md:right-[2%] object-contain transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * -10}px)`,
            }}
          />

          {/* Plant/Agave Image - Bottom Left */}
          <img
            src={ctaImage3}
            alt=""
            className="absolute bottom-[5%] left-[8%] w-28 h-28 md:w-40 md:h-40 md:left-[3%] object-contain transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * 18}px)`,
            }}
          />

          {/* Cocktail Image - Bottom Right */}
          <img
            src={ctaImage4}
            alt=""
            className="absolute bottom-[2%] right-[8%] w-28 h-36 md:w-40 md:h-48 md:right-[2%] object-cover rounded-lg transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * 15}px)`,
            }}
          />

          {/* Tennis Player Image - Middle Left */}
          <img
            src={ctaImage5}
            alt=""
            className="absolute top-[45%] left-[8%] md:left-[1%] -translate-y-1/2 w-24 h-36 md:w-36 md:h-48 object-cover rounded-lg transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * 12}px)`,
            }}
          />
        </div>

        {/* Center Text Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Ready to scale your content?
          </h2>
          <p className="text-2xl text-[#7d8187]">
            Let's build your brand engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-3 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors"
            >
              REQUEST CUSTOM PROPOSAL
            </button>
            <button 
              onClick={() => setShowDownloadModal(true)}
              className="px-8 py-3 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-white/40 hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
            >
              DOWNLOAD PRICING
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-8">
            <button
              onClick={() => {
                setShowDownloadModal(false);
                setEmail('');
                setShowDownloadButton(false);
              }}
              className="absolute top-8 right-8 text-white/60 hover:text-white text-2xl"
            >
              ×
            </button>
            
            {!showDownloadButton ? (
              <>
                <h3 className="text-3xl text-white text-center mb-8">Enter your email to download</h3>
                <div className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 bg-black border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
                  />
                  <button
                    onClick={async () => {
                      if (email) {
                        try {
                          // Call API to save submission and send email notification
                          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/social-media/download`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${publicAnonKey}`,
                            },
                            body: JSON.stringify({ email }),
                          });

                          if (response.ok) {
                            console.log('✅ Email submission successful');
                            setShowDownloadButton(true);
                          } else {
                            console.error('❌ Failed to submit email');
                            // Still show download button even if email fails
                            setShowDownloadButton(true);
                          }
                        } catch (error) {
                          console.error('❌ Error submitting email:', error);
                          // Still show download button even if there's an error
                          setShowDownloadButton(true);
                        }
                      }
                    }}
                    className="w-full px-8 py-4 bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-3xl text-white text-center mb-8">Download your PDF</h3>
                <button
                  onClick={() => {
                    // Download from Google Drive with direct download link
                    const link = document.createElement('a');
                    link.href = 'https://drive.google.com/uc?export=download&id=1z-3a7HriGf6PMTB1CZC8h6JRTyGkVFuy';
                    link.target = '_blank';
                    link.click();
                    
                    // Close modal after initiating download
                    setTimeout(() => {
                      setShowDownloadModal(false);
                      setEmail('');
                      setShowDownloadButton(false);
                    }, 500);
                  }}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-colors"
                >
                  Download PDF
                  <Download className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}