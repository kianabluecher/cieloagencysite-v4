import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { FeaturedWork } from '../FeaturedWork';
import { ImageSlideshow } from '../ImageSlideshow';
import { ParticleGradient } from '../ParticleGradient';
import { BrandsShowcase } from '../BrandsShowcase';
import { VerticalTimeline } from '../VerticalTimeline';
import { TrustBadge } from '../TrustBadge';
import { KeywordsSection } from '../KeywordsSection';
import { ServicesGrid } from '../ServicesGrid';
import heroBg from 'figma:asset/aa31cd96ccbff96e6edfe2bd37e99104aa943b45.png';
import whiteHouseLogo from 'figma:asset/6612dbb672696e33b6b0c9b1322cf727c64b9f12.png';

interface HomeProps {
  onNavigate: (page: string, projectId?: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [heroButtonHovered, setHeroButtonHovered] = useState(false);

  const services = [
    {
      title: 'Brand & Web',
      description: 'Full brand identity, positioning, and custom websites built for trust and conversion.',
      page: 'brand-web',
    },
    {
      title: 'Social Media',
      description: 'Strategy-backed content execution and growth management for scaling founders.',
      page: 'social-media',
    },
    {
      title: 'Ventures',
      description: 'Creative infrastructure and brand incubation for builders launching new companies.',
      page: 'ventures',
    },
    {
      title: 'Custom Development',
      description: 'Websites, dashboards, and digital systems built to scale with your brand.',
      page: 'development',
    },
    {
      title: 'Consulting',
      description: 'Brand strategy, reputation management, and leadership positioning for executives.',
      page: 'consulting',
    },
    {
      title: 'Marketing & PR',
      description: 'Integrated campaigns, print design, and performance assets that strengthen your brand.',
      page: 'marketing',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-8 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-neutral-950/70 bg-[rgb(10,10,10)]" />

        {/* White House Logo - Right Bottom */}
        <div className="absolute bottom-8 right-8 z-20">
          <img 
            src={whiteHouseLogo} 
            alt="The White House Washington" 
            className="w-32 md:w-40 lg:w-48 opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full mt-20">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto mt-20 space-y-10">
            <TrustBadge />

            <h1 className="md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.1] text-[48px] font-[Helvetica_Neue]">
              Building and managing credible brands.
            </h1>

            <p className="md:text-lg text-[#7d8187] max-w-2xl leading-relaxed font-[Helvetica]">
              Build trust from day one with customers, partners, and stakeholders so you become a brand people want to buy from and a business people want to be associated with.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onNavigate('quote')}
                className="px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-colors"
              >
                Download Pricing
              </button>
              <a
                href="https://app.apollo.io/#/meet/managed-meetings/cieloagency/r7h-tyg-3bs/cielo-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full border border-[rgba(255,255,255,0.3)] text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white hover:text-neutral-950 transition-all flex items-center justify-center gap-3"
              >
                Set a Call
                <ArrowUpRight size={20} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <BrandsShowcase />

      {/* Services Grid */}
      <ServicesGrid onNavigate={onNavigate} />

      {/* Featured Work */}
      <FeaturedWork 
        onProjectClick={(projectId) => onNavigate('portfolio-detail', projectId)}
        onNavigate={onNavigate}
      />

      {/* Keywords Section */}
      <KeywordsSection />

      {/* Image Slideshow */}
      <ImageSlideshow 
        title="Build polished outputs with widgets that come with pixel perfect design, interactivity and motion out of the box."
        subtitle="Zoom in, highlight, or isolate key elements and never lose sight of what matters"
      />

      {/* Process Section */}
      <section className="px-6 py-32 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full">
                <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                  [ Our Process ]
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl text-white tracking-tight">
                How we work
              </h2>
              <p className="text-sm text-[#7d8187] leading-relaxed">
                A powerful brand isn't built through ideas, it's built through execution. We merge strategy, design, and operations so you can move fast without chaos.
              </p>
            </div>

            <div className="relative">
              <VerticalTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-80 md:py-96 border-t border-[#1f2228] overflow-hidden">
        {/* Base Gradient Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div 
            className="w-[800px] h-[800px] rounded-lg"
            style={{
              background: 'radial-gradient(circle at center, rgba(71, 85, 105, 0.3) 0%, rgba(51, 65, 85, 0.2) 40%, transparent 70%)',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl text-white tracking-tight">
            Let's build something great together
          </h2>
          <div className="relative inline-block">
            {/* Pulsing Gradient Waves - Always visible, stronger on hover */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`absolute animate-pulse-wave-gradient transition-all duration-500 ${
                    buttonHovered ? 'opacity-100' : 'opacity-10'
                  }`}
                  style={{
                    width: buttonHovered ? '180%' : '120%',
                    height: buttonHovered ? '180%' : '120%',
                    borderRadius: '9999px',
                    background: buttonHovered 
                      ? 'radial-gradient(ellipse, rgba(251, 207, 232, 0.7) 0%, rgba(147, 197, 253, 0.6) 15%, rgba(100, 116, 139, 0.5) 35%, rgba(71, 85, 105, 0.35) 55%, rgba(51, 65, 85, 0.2) 70%, transparent 85%)'
                      : 'radial-gradient(ellipse, rgba(251, 207, 232, 0.4) 0%, rgba(147, 197, 253, 0.35) 25%, rgba(100, 116, 139, 0.25) 50%, rgba(71, 85, 105, 0.15) 70%, transparent 85%)',
                    animationDelay: `${index * 0.7}s`,
                    animationDuration: buttonHovered ? '3.5s' : '3s',
                    filter: buttonHovered ? 'blur(24px)' : 'blur(16px)',
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => onNavigate('discovery')}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              className={`px-8 py-2.5 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-3 relative z-10 border backdrop-blur-md ${
                buttonHovered 
                  ? 'bg-white/15 text-white border-white/50' 
                  : 'bg-white/[0.02] text-white/70 border-white/15'
              }`}
              style={buttonHovered ? {
                boxShadow: '0 0 35px rgba(255, 255, 255, 0.4), 0 0 65px rgba(147, 197, 253, 0.35), 0 0 90px rgba(100, 116, 139, 0.25), inset 0 0 20px rgba(255, 255, 255, 0.12)'
              } : {
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.05), 0 0 15px rgba(147, 197, 253, 0.03), inset 0 0 6px rgba(255, 255, 255, 0.02)'
              }}
            >
              Discovery
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}