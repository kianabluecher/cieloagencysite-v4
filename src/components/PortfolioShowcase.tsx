import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Layout } from 'lucide-react';

interface PortfolioShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function PortfolioShowcase({
  title = "Build polished outputs with widgets that come with pixel perfect design, interactivity and motion out of the box.",
  subtitle = "Zoom in, highlight, or isolate key elements and never lose sight of what matters",
}: PortfolioShowcaseProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: 'Revenue Dashboard',
      type: 'Analytics & Reporting',
      gradient: 'from-violet-600/30 via-purple-500/20 to-transparent',
      icon: Sparkles,
      features: ['Real-time metrics', 'Custom widgets', 'Interactive charts', 'Export ready'],
    },
    {
      title: 'Brand Guidelines',
      type: 'Design Systems',
      gradient: 'from-blue-600/30 via-cyan-500/20 to-transparent',
      icon: Layout,
      features: ['Typography scales', 'Color systems', 'Component library', 'Usage examples'],
    },
    {
      title: 'Growth Automation',
      type: 'Performance Tools',
      gradient: 'from-emerald-600/30 via-green-500/20 to-transparent',
      icon: Zap,
      features: ['Workflow automation', 'Data integration', 'Smart triggers', 'Analytics'],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Mouse drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Scroll wheel handler
  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    containerRef.current.scrollLeft += e.deltaY;
  };

  const current = slides[currentSlide];
  const Icon = current.icon;

  return (
    <section className="relative px-6 py-32 overflow-hidden border-t border-[#1f2228]">
      <div className="max-w-7xl mx-auto">
        {/* Category Badge */}
        <div className="inline-block px-4 py-2 rounded-full mb-8">
          <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
            [ Portfolio ]
          </p>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl text-white tracking-tight max-w-4xl mb-20">
          {title}
        </h2>

        {/* Showcase Area */}
        <div className="relative">
          <div 
            ref={containerRef}
            className="relative overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide"
            style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
          >
            <div className="flex gap-6 pb-4">
              {slides.map((slide, index) => {
                const Icon = slide.icon;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[600px] h-[600px] rounded-2xl border border-[#1f2228] overflow-hidden hover:border-[rgba(255,255,255,0.25)] transition-all select-none"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.03),transparent)]" />
                    </div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="h-full w-full" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                      }} />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                      <div className="w-20 h-20 rounded-2xl border border-white/20 flex items-center justify-center mb-8 bg-white/5 backdrop-blur-sm">
                        <Icon size={40} className="text-white" />
                      </div>
                      
                      <span className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-4">
                        {slide.type}
                      </span>
                      
                      <h3 className="text-5xl md:text-6xl text-white tracking-tight mb-8">
                        {slide.title}
                      </h3>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-4 mt-8">
                        {slide.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="px-6 py-3 rounded-lg border border-white/10 bg-black/20 backdrop-blur-sm"
                          >
                            <span className="text-white/80 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <p className="text-[#7d8187] text-sm max-w-2xl">{subtitle}</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (containerRef.current) {
                    containerRef.current.scrollLeft -= 600;
                  }
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="text-white" size={20} />
              </button>
              <button
                onClick={() => {
                  if (containerRef.current) {
                    containerRef.current.scrollLeft += 600;
                  }
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Scroll Right"
              >
                <ChevronRight className="text-white" size={20} />
              </button>
            </div>
          </div>

          {/* Hint Text */}
          <div className="flex justify-center mt-8">
            <p className="text-[#7d8187] text-xs font-['Geist_Mono'] tracking-wider uppercase">
              Drag to scroll
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
