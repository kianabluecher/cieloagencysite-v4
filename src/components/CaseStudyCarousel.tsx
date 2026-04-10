import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import londonImage from 'figma:asset/dd0fc05adde4811bf2ff889aa7c2b7ee0ebf7b68.png';
import manilaImage from 'figma:asset/257fcfe47ce90ad77dda495b18963e1e9114bd43.png';
import osloImage from 'figma:asset/dd62e1da47798d75844a303c115a69e24311ebbe.png';

interface CaseStudy {
  location: string;
  company: string;
  tag?: string;
  subtitle?: string;
  description: string;
  metrics: { label: string; value: string; icon: any }[];
  image: string;
}

interface CaseStudyCarouselProps {
  title?: string;
  subtitle?: string;
}

export function CaseStudyCarousel({
  title = "Featured Work",
  subtitle = "Real results for real businesses",
}: CaseStudyCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const caseStudies: CaseStudy[] = [
    {
      location: 'London',
      company: 'Raven Company Inc',
      subtitle: 'Premium brand transformation and digital excellence.',
      description: 'Streamlined operations, reducing costs by 50% with our automation solutions and strategic brand positioning.',
      metrics: [
        { label: 'Conversion Rate', value: '25%', icon: TrendingUp },
        { label: 'Reduced CPA', value: '50%', icon: DollarSign },
      ],
      image: londonImage,
    },
    {
      location: 'Manila',
      company: 'Gotham Wonder',
      tag: 'FRESH',
      subtitle: 'Digital presence that drives measurable growth.',
      description: 'Boosted customer engagement with a digital presence and targeted campaigns that drove measurable growth.',
      metrics: [
        { label: 'Traffic Increase', value: '60%', icon: Users },
        { label: 'Sales Growth', value: '35%', icon: TrendingUp },
      ],
      image: manilaImage,
    },
    {
      location: 'Oslo',
      company: 'Sling Interactive Tech',
      subtitle: 'Comprehensive brand overhaul and market expansion.',
      description: 'Expanded market reach, targeting new demographics with a data-driven strategy and comprehensive brand overhaul.',
      metrics: [
        { label: 'Market Share', value: '20%', icon: TrendingUp },
        { label: 'Revenue Growth', value: '45%', icon: DollarSign },
      ],
      image: osloImage,
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = x - startX;
    
    // If dragged more than 50px, trigger slide change
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        prev();
      } else {
        next();
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Scroll wheel handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (Math.abs(e.deltaY) > 10) {
      if (e.deltaY > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  return (
    <section className="px-6 py-32 border-t border-[#1f2228]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-block px-4 py-2 rounded-full mb-6">
              <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                [ Case Studies ]
              </p>
            </div>
            <h2 className="text-4xl md:text-6xl text-white tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-xl text-[#7d8187]">{subtitle}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="text-white" size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="text-white" size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
        >
          {caseStudies.map((study, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + caseStudies.length) % caseStudies.length;
            const isNext = index === (currentIndex + 1) % caseStudies.length;
            
            return (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95 hidden md:block'
                }`}
              >
                <div className="relative h-[520px] rounded-2xl overflow-hidden border border-[#1f2228] hover:border-[rgba(255,255,255,0.25)] transition-all group">
                  {/* Image Background */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${study.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40" />
                    {/* Black gradient from top */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-4xl text-white tracking-tight">{study.location}</h3>
                        {study.tag && (
                          <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-['Geist_Mono'] tracking-wider">
                            {study.tag}
                          </span>
                        )}
                      </div>
                      {study.subtitle && (
                        <p className="text-[#a0a0a0] text-sm">{study.subtitle}</p>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="space-y-4">
                      {study.metrics.map((metric, idx) => {
                        const Icon = metric.icon;
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10"
                          >
                            <div className="flex items-center gap-3">
                              <Icon size={20} className="text-white/70" />
                              <span className="text-white/80 text-sm">{metric.label}</span>
                            </div>
                            <span className="text-2xl text-white">{metric.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicators and View Full Portfolio Link */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex-1"></div>
          <div className="flex justify-center gap-2">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-end">
            <a 
              href="/portfolio" 
              className="flex items-center gap-2 text-[#7d8187] text-sm hover:text-white transition-colors group"
            >
              <span>view full portfolio</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
