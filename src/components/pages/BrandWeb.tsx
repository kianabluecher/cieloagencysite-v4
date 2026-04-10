import { useRef, useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { DraggableSlideshow } from '../DraggableSlideshow';
import { TestimonialSlideshow } from '../TestimonialSlideshow';
import { FeaturedPortfolio } from '../FeaturedPortfolio';
import { RealExperiences } from '../RealExperiences';
import { IndustriesScroll } from '../IndustriesScroll';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import logo1 from 'figma:asset/fb1b0fde222dc3b383d7395c4b9fc43a6db37bcd.png';
import logo2 from 'figma:asset/661ab0f38883658ac215134f7a2580521ca30949.png';
import logo3 from 'figma:asset/a4bc550a23aeaa39674095c933d4dbb7739973d3.png';
import logo4 from 'figma:asset/3acf091f0d2cf1009a76013a38ee85bba600e999.png';
import logo5 from 'figma:asset/21b618833049aaf2f0604595402c6b7d92d120b1.png';
import logo6 from 'figma:asset/88d7ce755633105c90e62d8bfebe92c242bb3099.png';
import offeringDesktop from 'figma:asset/700308635aa6876b747f7a84c309b55e3c8ebf77.png';
import offeringMobile from 'figma:asset/d7d4cb63b69cc2c7e228d55e246f54669cca2077.png';
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
import slideshowImage1 from 'figma:asset/be98b779baafe58a8bee21975cad48444001e608.png';
import slideshowImage2 from 'figma:asset/f0531d3ae1b7a1068a755b0c99217c5e82a7b973.png';
import slideshowImage3 from 'figma:asset/55739d58c8b5b75d67d52626c556a0bb33f8a78e.png';
import slideshowImage4 from 'figma:asset/1f910a4ee5c289b0af76d0eac60408340fa80849.png';
import slideshowImage5 from 'figma:asset/f686a249c1718993a830172e145cd6636a7926ee.png';
import slideshowImage6 from 'figma:asset/0477d4edbfdbd6c8bbe5ef8e3ac9dc1f234f5ca7.png';
import slideshowImage7 from 'figma:asset/663c86d01f88e9c35b4cac984f390d995ba1a75e.png';
import slideshowImage8 from 'figma:asset/283254e6ec2a1498d7cb6220854f1a837b103437.png';
import slideshowImage9 from 'figma:asset/4aa02273dc62a36a2b95403f4dbfe17fd6eef79f.png';
import slideshowImage10 from 'figma:asset/a809e824badf41a97cbcdec8082c9d8412c8b485.png';
import slideshowImage11 from 'figma:asset/ddc482eeed2faca4e5bfafd4618336ee6ddfe182.png';
import slideshowImage12 from 'figma:asset/3ea87e9cdeedcf96c777dd30227795ca5f999be8.png';
import slideshowImage13 from 'figma:asset/a64a032f4bcf60c4bb46cd18d67372ebf6c556bb.png';
import slideshowImage14 from 'figma:asset/5dfc26702f194c28d2b6aa00cdb77fece88f373c.png';
import brandImage1 from 'figma:asset/39b99eb0f13ebdc52ff8d41f4dd7ac83be50f17a.png';
import brandImage2 from 'figma:asset/8f60698e2eba8ab2fc4a33e8e7f3d7b89fb59e7b.png';
import brandImage3 from 'figma:asset/54e9f1c4ba3f22c6cdb2c8f5ffdf3b856a0fae2f.png';
import workflowImage1 from 'figma:asset/e55bd76d0bbef5bdb3cdd2cfee3ed8a5d6e02f28.png';
import workflowImage2 from 'figma:asset/08da4ca1aefa3aef4dc1a28a7e8d05aa8d7835a9.png';
import workflowImage3 from 'figma:asset/e4c45e1ea80cf2f26b6854e7e2b2e3c0d1fe0b80.png';
import workflowImage4 from 'figma:asset/6d66ef6e0a99d44bc87b3fb1cc7c1e16ac10bd87.png';
import scalarNorthMountain from 'figma:asset/554045f310c8f5b61551f303a10fafd7d67db9ec.png';
import acenosStrategy from 'figma:asset/3c0d57ea332182c7192689beda1f03fa2083c46b.png';
import scalarNorthWebsite from 'figma:asset/ee5523ac979bb0f3763a9951b544841714391035.png';
import mastWebsite from 'figma:asset/946a7eecd3f36e5644616ff772864c20a6823748.png';
import aetoliaBrand from 'figma:asset/c5c8b4d724c9695c78142a078b7530a77c26855b.png';
import aetoliaFullIdentity from 'figma:asset/5477e718fd457d9e5428968963429e3401f4328b.png';
import scalarNorthSplit from 'figma:asset/5751461f346bdbf0297a5bf883d381de3ef9edc8.png';
import acenosBrandStrategy from 'figma:asset/d47e3d785b203c3cc782586e14c30c82f7f0c31d.png';
import brandMaintenanceDiagram from 'figma:asset/c0dfbb0a68f4abb44aa9d41e5f4af55d448c3b42.png';
import heroBackground from 'figma:asset/3e5752e2f0a2eb209df784ce4e825165e308c03e.png';

interface BrandWebProps {
  onNavigate: (page: string) => void;
}

function BuiltForCircles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      const startScroll = rect.top - windowHeight;
      const endScroll = rect.top + sectionHeight;
      const totalScroll = windowHeight + sectionHeight;
      const currentScroll = -startScroll;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTransform = (index: number) => {
    if (isMobile) {
      const mobileMovements = [
        { x: 0, y: 60 * scrollProgress },
        { x: 0, y: 0 },
        { x: 0, y: -60 * scrollProgress },
      ];
      const movement = mobileMovements[index];
      return `translate(${movement.x}px, ${movement.y}px)`;
    } else {
      const movements = [
        { x: 40 * scrollProgress, y: 10 * scrollProgress },
        { x: 0, y: 12 * scrollProgress },
        { x: -40 * scrollProgress, y: 10 * scrollProgress },
      ];
      const movement = movements[index];
      return `translate(${movement.x}px, ${movement.y}px)`;
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center overflow-visible px-6 md:px-0 pt-0 md:pt-2 pb-2"
    >
      <div className="text-center mb-24">
        <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
          [ BUILT FOR ]
        </p>
      </div>
      <div className="relative w-full mx-auto flex items-center justify-center">
        <div
          className="absolute transition-transform duration-300 ease-out"
          style={{
            transform: getTransform(0),
            ...(isMobile ? {
              left: '50%',
              marginLeft: '-175px',
              top: '0px',
            } : {
              left: '-80px',
              top: '50%',
              marginTop: '-250px',
            })
          }}
        >
          <div className="relative w-[350px] h-[350px] md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px]">
            <div className="relative w-full h-full rounded-full border border-white/30 flex items-center justify-center">
              <p className="text-white text-center text-xs md:text-base font-['Geist_Mono'] uppercase tracking-wide px-8 md:px-10 leading-relaxed">
                FINANCIAL ADVISORS,
                <br />
                INVESTORS, AND FUNDS
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute transition-transform duration-300 ease-out"
          style={{
            transform: getTransform(1),
            ...(isMobile ? {
              left: '50%',
              marginLeft: '-175px',
              top: '260px',
            } : {
              left: '50%',
              top: '50%',
              marginLeft: '-250px',
              marginTop: '-250px',
            })
          }}
        >
          <div className="relative w-[350px] h-[350px] md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px]">
            <div className="relative w-full h-full rounded-full border border-white/30 flex items-center justify-center">
              <p className="text-white text-center text-xs md:text-base font-['Geist_Mono'] uppercase tracking-wide px-8 md:px-10 leading-relaxed">
                FINTECH, SAAS,
                <br />
                AND PROFESSIONAL FIRMS
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute transition-transform duration-300 ease-out"
          style={{
            transform: getTransform(2),
            ...(isMobile ? {
              left: '50%',
              marginLeft: '-175px',
              top: '520px',
            } : {
              right: '-80px',
              top: '50%',
              marginTop: '-250px',
            })
          }}
        >
          <div className="relative w-[350px] h-[350px] md:w-[480px] md:h-[480px] lg:w-[500px] lg:h-[500px]">
            <div className="relative w-full h-full rounded-full border border-white/30 flex items-center justify-center">
              <p className="text-white text-center text-xs md:text-base font-['Geist_Mono'] uppercase tracking-wide px-8 md:px-10 leading-relaxed">
                B2B FOUNDERS PREPARING
                <br />
                TO SCALE OR RAISE CAPITAL
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-[660px] md:h-[150px]" />
    </div>
  );
}

function LogoSlider() {
  const brands = [
    { name: 'Brand 1', image: logo1 },
    { name: 'Brand 2', image: logo2 },
    { name: 'Brand 3', image: logo3 },
    { name: 'Brand 4', image: logo4 },
    { name: 'Brand 5', image: logo5 },
    { name: 'Brand 6', image: logo6 },
  ];

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="relative overflow-hidden py-8">
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
      
      <div 
        className="flex items-center gap-4 md:gap-5 py-4"
        style={{
          animation: 'brandScroll 20s linear infinite',
        }}
      >
        {duplicatedBrands.map((brand, index) => (
          <div 
            key={`${brand.name}-${index}`}
            className="flex items-center justify-center shrink-0"
          >
            <img 
              src={brand.image} 
              alt={brand.name}
              className="h-20 md:h-28 w-auto opacity-40"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes brandScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}

export function BrandWeb({ onNavigate }: BrandWebProps) {
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

  const deliverables = [
    {
      title: 'Full brand identity & visual system',
      description: 'A complete visual identity system that establishes your brand\'s look, feel, and personality across all touchpoints.',
      items: [
        'Logo design with multiple variations (primary, secondary, icon)',
        'Comprehensive color palette with usage guidelines',
        'Typography system with font pairings and hierarchy',
        'Visual elements library (patterns, textures, iconography)',
        'Brand personality and visual language definition',
        'Application guidelines for digital and print',
      ],
    },
    {
      title: 'Strategic positioning & messaging',
      description: 'Strategic foundations that define how you communicate value and differentiate in your market.',
      items: [
        'Competitive analysis and market positioning',
        'Brand positioning statement and unique value proposition',
        'Core messaging framework and key narratives',
        'Target audience profiles and personas',
        'Brand story and origin narrative',
        'Messaging architecture for different channels',
      ],
    },
    {
      title: 'Custom website (Wix, Webflow, or Framer)',
      description: 'A fully custom, responsive website built on your preferred platform with seamless user experience.',
      items: [
        'Custom website design (desktop, tablet, mobile)',
        'Up to 8-10 pages with strategic content architecture',
        'Interactive elements and micro-animations',
        'CMS setup for easy content management',
        'Form integrations and lead capture',
        'Performance optimization and fast loading speeds',
      ],
    },
    {
      title: 'SEO, copywriting, and performance setup',
      description: 'Professional content and technical optimization to ensure your site ranks well and converts visitors.',
      items: [
        'SEO strategy and keyword research',
        'Professional copywriting for all pages',
        'Meta titles, descriptions, and alt text optimization',
        'Technical SEO implementation (schema, sitemap, robots.txt)',
        'Google Analytics and tracking setup',
        'Conversion optimization and A/B testing recommendations',
      ],
    },
    {
      title: 'Brand guidelines, marketing collateral & pitch',
      description: 'Complete brand assets and templates to maintain consistency as you grow and communicate with stakeholders.',
      items: [
        'Comprehensive brand guidelines document (20-30 pages)',
        'Social media templates and content kit',
        'Pitch deck redesign with brand-aligned templates',
        'Email signature templates for team',
        'Business card designs',
        'Letterhead and presentation templates',
        'Marketing one-pagers and sales collateral',
      ],
    },
  ];

  const addonServices = [
    {
      title: 'Social Media Management',
      items: [
        'LinkedIn Outreach',
        'LinkedIn Organic Content',
        'Twitter/X Management',
        'Instagram Brand Presence',
        'Community Management',
        'Content Calendar & Scheduling',
      ],
    },
    {
      title: 'Content Creation',
      items: [
        'Blog Posts & Articles',
        'Thought Leadership Content',
        'Case Studies',
        'Whitepapers',
        'Industry Reports',
        'Video Scripts',
      ],
    },
    {
      title: 'Email Marketing',
      items: [
        'Newsletter Design & Copy',
        'Campaign Strategy',
        'Automated Sequences',
        'Lead Nurturing',
        'Template Creation',
        'A/B Testing & Optimization',
      ],
    },
    {
      title: 'PR & Media Relations',
      items: [
        'Press Release Writing',
        'Media Outreach',
        'Strategic Placements',
        'Industry Publications',
        'Award Submissions',
        'Crisis Communications',
      ],
    },
    {
      title: 'Growth Strategy',
      items: [
        'Market Positioning',
        'Competitive Analysis',
        'Expansion Planning',
        'Partnership Development',
        'Go-to-Market Strategy',
        'Strategic Consulting',
      ],
    },
    {
      title: 'Analytics & Optimization',
      items: [
        'Performance Tracking',
        'Conversion Rate Optimization',
        'User Behavior Analysis',
        'A/B Testing',
        'Data-Driven Recommendations',
        'Monthly Reporting',
      ],
    },
    {
      title: 'Brand Maintenance',
      items: [
        'Pitch Deck Updates',
        'Marketing Collateral Refresh',
        'Template Creation',
        'Brand Consistency Audits',
        'Asset Library Management',
        'Style Guide Updates',
      ],
    },
    {
      title: 'Website Updates & Maintenance',
      items: [
        'Content Updates',
        'New Page Creation',
        'Feature Additions',
        'Technical Maintenance',
        'Performance Optimization',
        'Security Updates',
      ],
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [expandedAddonIndex, setExpandedAddonIndex] = useState<number | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [email, setEmail] = useState('');
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        {/* Background Image with Gradient Overlay - extends to top */}
        <div className="absolute inset-0 z-0 -top-32">
          <img 
            src={heroBackground} 
            alt="" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay - dissolves to black at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/60 to-neutral-950" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full mb-8">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Brand & Web ]
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl text-white tracking-tight mb-8 mx-auto max-w-4xl">
            Enhance Credibility Across Stakeholders and Improve Deal Flow
          </h1>
          <p className="text-lg md:text-xl text-[#7d8187] leading-relaxed mx-auto max-w-3xl mb-12">
            We create trust-first brand systems for serious businesses delivered fast, without compromise.
          </p>
        </div>
      </section>

      {/* Logo Slider */}
      <LogoSlider />

      {/* Example Work Slideshow */}
      <DraggableSlideshow
        images={[
          slideshowImage1,
          slideshowImage2,
          slideshowImage3,
          slideshowImage4,
          slideshowImage5,
          slideshowImage6,
          slideshowImage7,
          slideshowImage8,
          slideshowImage9,
          slideshowImage10,
          slideshowImage11,
          slideshowImage12,
          slideshowImage13,
          slideshowImage14,
        ]}
      />

      {/* Built For - Overlapping Circles */}
      <section className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          <BuiltForCircles />
        </div>
      </section>

      {/* Standard Text Section - REPLACED THE SCROLLING ANIMATION */}
      <section ref={textSectionRef} className="px-6 py-32 bg-neutral-950">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-24">
            {/* THE PROBLEM Section */}
            <div className="space-y-12 text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed mx-auto" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "In the startup, finance or new technologies industry, perception isn't optional.";
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
              
              <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed mx-auto" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "It's how clients, investors, and partners decide whether to trust you, or move on.";
                  const chars = text.split('');
                  const offset = 0.2;
                  
                  return chars.map((char, index) => {
                    const charProgress = offset + (index / chars.length) * 0.15;
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
              
              <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed mx-auto" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "So what's really going on? Most creative partners don't understand your industry. And that disconnect shows up in the work.";
                  const chars = text.split('');
                  const offset = 0.4;
                  
                  return chars.map((char, index) => {
                    const charProgress = offset + (index / chars.length) * 0.15;
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
              
              <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed mx-auto" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "If your site looks generic, your deck reads vague, or your message feels misaligned... it raises questions you won't get the chance to answer.";
                  const chars = text.split('');
                  const offset = 0.6;
                  
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
            </div>

            {/* THE SOLUTION Section */}
            <div className="space-y-12 border-t border-white/10 pt-24 text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed mx-auto" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "A brand system built for credibility.";
                  const chars = text.split('');
                  const offset = 0.85;
                  
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

              <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed mx-auto" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "We don't just \"design logos.\" We build credibility infrastructures.";
                  const chars = text.split('');
                  const offset = 1.0;
                  
                  return chars.map((char, index) => {
                    const charProgress = offset + (index / chars.length) * 0.15;
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
              
              <p className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed mx-auto" style={{ fontWeight: 400 }}>
                {(() => {
                  const text = "Our process connects strategy (what you say) with design (how you look) and execution (where you show up), ensuring every touchpoint reinforces your authority.";
                  const chars = text.split('');
                  const offset = 1.2;
                  
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
        </div>
      </section>

      {/* Service Flow Diagram */}
      <section className="px-6 py-32 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-8">
              Service Flow
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight max-w-4xl leading-tight">
              CIELO is designed with an intuitive service flow that keeps you focused on what matters
            </h2>
          </div>

          {/* Flow Diagram */}
          <div className="relative w-full overflow-x-auto hide-scrollbar">
            <div className="relative min-w-[1200px] h-[500px] flex items-center justify-center">
              {/* Starting Point - Far Left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <span className="text-white text-sm">Brand & Structure</span>
              </div>

              {/* Main horizontal line - Starting to Left Hub */}
              <svg className="absolute left-[140px] top-1/2 -translate-y-1/2" width="60" height="2">
                <line x1="0" y1="1" x2="60" y2="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>

              {/* Left Hub */}
              <div className="absolute left-[200px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50" />

              {/* Left vertical branches */}
              <svg className="absolute left-[201px] top-[10%]" width="1" height="130">
                <line x1="0" y1="0" x2="0" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <svg className="absolute left-[201px] top-[62%]" width="1" height="130">
                <line x1="0" y1="0" x2="0" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Left branch horizontal connectors */}
              <svg className="absolute left-[200px] top-[10%]" width="120" height="1">
                <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[325px] top-[10%] -translate-y-1/2 text-white/70 text-sm">Visual Identity</span>

              <svg className="absolute left-[200px] top-[28%]" width="120" height="1">
                <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[325px] top-[28%] -translate-y-1/2 text-white/70 text-sm">Messaging</span>

              <svg className="absolute left-[200px] top-[62%]" width="120" height="1">
                <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[325px] top-[62%] -translate-y-1/2 text-white/70 text-sm">Digital Assets</span>

              <svg className="absolute left-[200px] top-[80%]" width="120" height="1">
                <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[325px] top-[80%] -translate-y-1/2 text-white/70 text-sm">Content Library</span>

              {/* Main line - Left Hub to Center-Left Hub */}
              <svg className="absolute left-[200px] top-1/2 -translate-y-1/2" width="180" height="2">
                <line x1="0" y1="1" x2="180" y2="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>

              {/* Center-Left Hub */}
              <div className="absolute left-[380px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50" />

              {/* Center-Left vertical branches */}
              <svg className="absolute left-[381px] top-[35%]" width="1" height="65">
                <line x1="0" y1="0" x2="0" y2="65" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <svg className="absolute left-[381px] top-[50%]" width="1" height="65">
                <line x1="0" y1="0" x2="0" y2="65" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Horizontal connectors for Center-Left Hub */}
              <svg className="absolute left-[380px] top-[35%]" width="90" height="1">
                <line x1="0" y1="0" x2="90" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[475px] top-[35%] -translate-y-1/2 text-white/70 text-sm">Strategy</span>

              <svg className="absolute left-[380px] top-[65%]" width="90" height="1">
                <line x1="0" y1="0" x2="90" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[475px] top-[65%] -translate-y-1/2 text-white/70 text-sm">Analytics</span>

              {/* Main line - Center-Left Hub to Center Hub */}
              <svg className="absolute left-[380px] top-1/2 -translate-y-1/2" width="120" height="2">
                <line x1="0" y1="1" x2="120" y2="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>

              {/* Center Hub */}
              <div className="absolute left-[500px] top-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-[3px]">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-[3px] h-[3px] rounded-full bg-white/50" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Main line - Center Hub to Right Hub */}
              <svg className="absolute left-[500px] top-1/2 -translate-y-1/2" width="180" height="2">
                <line x1="0" y1="1" x2="180" y2="1" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </svg>

              {/* Right Hub */}
              <div className="absolute left-[680px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/50" />

              {/* Right vertical branches */}
              <svg className="absolute left-[681px] top-[5%]" width="1" height="195">
                <line x1="0" y1="0" x2="0" y2="195" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <svg className="absolute left-[681px] top-[50%]" width="1" height="195">
                <line x1="0" y1="0" x2="0" y2="195" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Right branch horizontal connectors */}
              <svg className="absolute left-[680px] top-[5%]" width="130" height="1">
                <line x1="0" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[815px] top-[5%] -translate-y-1/2 text-white/70 text-sm">Web Development</span>

              <svg className="absolute left-[680px] top-[18%]" width="130" height="1">
                <line x1="0" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[815px] top-[18%] -translate-y-1/2 text-white/70 text-sm">LinkedIn Presence</span>

              <svg className="absolute left-[680px] top-[31%]" width="130" height="1">
                <line x1="0" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[815px] top-[31%] -translate-y-1/2 text-white/70 text-sm">Social Media</span>

              <svg className="absolute left-[680px] top-[44%]" width="130" height="1">
                <line x1="0" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[815px] top-[44%] -translate-y-1/2 text-white/70 text-sm">Content Creation</span>

              <svg className="absolute left-[680px] top-[62%]" width="130" height="1">
                <line x1="0" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[815px] top-[62%] -translate-y-1/2 text-white/70 text-sm">Email Marketing</span>

              <svg className="absolute left-[680px] top-[75%]" width="130" height="1">
                <line x1="0" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[815px] top-[75%] -translate-y-1/2 text-white/70 text-sm">PR & Media</span>

              <svg className="absolute left-[680px] top-[88%]" width="130" height="1">
                <line x1="0" y1="0" x2="130" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
              <span className="absolute left-[815px] top-[88%] -translate-y-1/2 text-white/70 text-sm">Growth Strategy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Offering */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-12">
              [ THE SOLUTION ]
            </p>
            <h2 className="text-3xl md:text-5xl text-white tracking-tight mb-6">
              Simple, clear structure.
            </h2>
            <p className="text-2xl md:text-3xl text-white tracking-tight">
              Result = A strong and trustworthy brand.
            </p>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <img 
              src={offeringDesktop} 
              alt="Brand & Web Offerings" 
              className="w-full"
            />
          </div>

          {/* Mobile View */}
          <div className="block md:hidden">
            <img 
              src={offeringMobile} 
              alt="Brand & Web Offerings" 
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Ongoing Support - Add-On Services */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-4xl md:text-5xl text-white tracking-tight mb-6">
                Add-On Services
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Ongoing support to maintain and grow your brand after launch.
              </p>
            </div>
            <div className="md:col-span-8 space-y-2">
              {addonServices.map((service, index) => (
                <div key={index} className="border-b border-white/10">
                  <button
                    onClick={() => setExpandedAddonIndex(expandedAddonIndex === index ? null : index)}
                    className="w-full text-left py-4 flex items-center justify-between group"
                  >
                    <h3 className="text-lg text-white group-hover:text-white/80 transition-colors">
                      {service.title}
                    </h3>
                    <div className="text-[#7d8187] text-xl">
                      {expandedAddonIndex === index ? '−' : '+'}
                    </div>
                  </button>
                  {expandedAddonIndex === index && (
                    <div className="pb-4 pl-6 space-y-2">
                      {service.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7d8187] shrink-0 mt-2" />
                          <p className="text-[#7d8187] text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Plan - 4 Step Grid */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight">
              Workflow plan
            </h2>
            <p className="text-xl text-[#7d8187] max-w-2xl text-[15px]">
              From discovery to launch, we follow a proven 8-week process that delivers exceptional brands and websites, without compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Step 1 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <ImageWithFallback 
                  src={aetoliaFullIdentity}
                  alt="Aetolia Capital Brand Identity"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">01</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Onboarding & Moodboard Delivery</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors mb-6">
                Discovery call, brand exploration, and moodboard creation to establish visual direction and creative alignment.
              </p>
              <button className="px-6 py-2.5 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-xs tracking-[0.1em] uppercase hover:border-white/40 hover:bg-white/5 transition-colors">
                WEEK 1
              </button>
            </div>

            {/* Step 2 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <ImageWithFallback 
                  src={acenosBrandStrategy}
                  alt="Acenos Brand Strategy"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">02</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Wireframes, Design & Strategy</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors mb-6">
                Complete website wireframes, high-fidelity design mockups, and brand identity development with client review.
              </p>
              <button className="px-6 py-2.5 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-xs tracking-[0.1em] uppercase hover:border-white/40 hover:bg-white/5 transition-colors">
                WEEKS 2-3
              </button>
            </div>

            {/* Step 3 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <ImageWithFallback 
                  src={scalarNorthSplit}
                  alt="Scalar North Website Showcase"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">03</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Development Phase</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors mb-6">
                Custom development with responsive design, SEO optimization, and interactive features on your chosen platform.
              </p>
              <button className="px-6 py-2.5 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-xs tracking-[0.1em] uppercase hover:border-white/40 hover:bg-white/5 transition-colors">
                WEEKS 4-6
              </button>
            </div>

            {/* Step 4 */}
            <div className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
              <div className="w-full mb-8">
                <ImageWithFallback 
                  src={mastWebsite}
                  alt="MAST Website Design"
                  className="w-full aspect-[21/9] object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">04</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Testing, QA & Launch</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors mb-6">
                Comprehensive testing, final adjustments, and successful launch with brand guidelines and complete asset library.
              </p>
              <button className="px-6 py-2.5 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-xs tracking-[0.1em] uppercase hover:border-white/40 hover:bg-white/5 transition-colors">
                WEEKS 7-8
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Carousel */}
      <section className="border-t border-[#1f2228]">
        <FeaturedPortfolio />
      </section>

      {/* Real Experiences */}
      <RealExperiences />

      {/* What You Get */}
      <section className="px-6 py-16 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-4xl md:text-5xl text-white tracking-tight">
                What You Get
              </h2>
            </div>
            <div className="md:col-span-8 space-y-2">
              {deliverables.map((deliverable, index) => (
                <div key={index} className="border-b border-white/10">
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full text-left py-4 flex items-center justify-between group"
                  >
                    <h3 className="text-lg text-white group-hover:text-white/80 transition-colors">
                      {deliverable.title}
                    </h3>
                    <div className="text-[#7d8187] text-xl">
                      {expandedIndex === index ? '−' : '+'}
                    </div>
                  </button>
                  {expandedIndex === index && (
                    <div className="pb-4 pl-6 space-y-2">
                      <p className="text-[#7d8187] text-sm">{deliverable.description}</p>
                      {deliverable.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7d8187] shrink-0 mt-2" />
                          <p className="text-[#7d8187] text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
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

      {/* CTA */}
      <section className="relative px-6 py-32 border-t border-[#1f2228] overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Request a custom proposal or download pricing below
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={() => window.open('https://app.apollo.io/#/meet/cieloagency/discovery', '_blank')}
              className="px-8 py-3 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors flex items-center justify-center"
            >
              REQUEST CUSTOM PROPOSAL
            </button>
            <button
              onClick={() => setShowDownloadModal(true)}
              className="px-8 py-3 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-white/40 hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
            >
              DOWNLOAD PRICING
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-8 relative">
            <button
              onClick={() => {
                setShowDownloadModal(false);
                setEmail('');
                setShowDownloadButton(false);
              }}
              className="absolute -top-12 right-0 text-white/60 hover:text-white text-3xl"
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
                          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/brand-web/download`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${publicAnonKey}`,
                            },
                            body: JSON.stringify({ email }),
                          });

                          if (response.ok) {
                            console.log('✅ Email submission successful');
                          } else {
                            console.error('❌ Failed to submit email');
                          }
                        } catch (error) {
                          console.error('❌ Error submitting email:', error);
                        }

                        // Trigger download regardless of email submission success to avoid blocking user
                        const link = document.createElement('a');
                        link.href = 'https://drive.google.com/uc?export=download&id=1JKiafyoJIn1tfH-k5xe5BHk_Tk6-X05I';
                        link.target = '_blank';
                        link.click();
                        
                        // Close modal after initiating download
                        setTimeout(() => {
                          setShowDownloadModal(false);
                          setEmail('');
                          setShowDownloadButton(false);
                        }, 500);
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-colors"
                  >
                    Download
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}