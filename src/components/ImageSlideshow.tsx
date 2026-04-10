import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import image1 from 'figma:asset/c96d274ca61af51c7fe84a71e6bb7fa14ec611f8.png';
import image2 from 'figma:asset/cc44cf8bf75900bf6991d9ef09e8c4c6777f4b89.png';
import image3 from 'figma:asset/35f3caac6ef3e264f7072e353160c85a6125e64a.png';
import image4 from 'figma:asset/4a4a284c08c4e6597692602869d74834a28d749d.png';
import image5 from 'figma:asset/889e624eeede5a73236ef970c77c776d999a2acb.png';
import image6 from 'figma:asset/e656401accc4939813a72509d008e2c0e1adf9f7.png';
import image7 from 'figma:asset/dd0fc05adde4811bf2ff889aa7c2b7ee0ebf7b68.png';
import image8 from 'figma:asset/fe815705a0483bf62f823e9ee7ff782f4bef8cc0.png';
import image9 from 'figma:asset/f6ff9c532e19e902e940f6e528a6a72b29780fa2.png';

interface ImageSlideshowProps {
  title?: string;
  subtitle?: string;
}

export function ImageSlideshow({
  title = "Build polished outputs with widgets that come with pixel perfect design, interactivity and motion out of the box.",
  subtitle = "Zoom in, highlight, or isolate key elements and never lose sight of what matters",
}: ImageSlideshowProps) {
  // Example showcase images - duplicated for infinite scroll
  const slides = [
    {
      id: 1,
      url: image1,
      alt: 'Impact Investing Brand Design',
    },
    {
      id: 2,
      url: image2,
      alt: 'Weld Brand Campaign',
    },
    {
      id: 3,
      url: image3,
      alt: 'Luxe Membership Card Design',
    },
    {
      id: 4,
      url: image4,
      alt: 'MAST Legal Branding',
    },
    {
      id: 5,
      url: image5,
      alt: 'Sustainable Credit Partners Brand',
    },
    {
      id: 6,
      url: image6,
      alt: 'AI NOT STOCK Campaign',
    },
    {
      id: 7,
      url: image7,
      alt: 'Parceros Capital Web Design',
    },
    {
      id: 8,
      url: image8,
      alt: 'MAST Brand Experience',
    },
    {
      id: 9,
      url: image9,
      alt: 'Mobile App UI Design',
    },
  ];

  // Duplicate slides for seamless loop
  const duplicatedSlides = [...slides, ...slides, ...slides];

  // State for manual control
  const [isHoveringArrow, setIsHoveringArrow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-32 overflow-hidden border-t border-[#1f2228]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Category Badge */}
        <div className="inline-block px-4 py-2 rounded-full mb-8">
          <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
            [ Portfolio ]
          </p>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl text-white tracking-tight max-w-4xl mb-20">
          Design &lt; Full Backend Brand Growth. <br />You get creative direction + fast execution + <br />a structured system that keeps the brand moving, and people noticing.
        </h2>
      </div>

      {/* Slideshow Container - Full Width */}
      <div 
        className="relative h-[350px] md:h-[450px]" 
        ref={containerRef}
      >
        {/* Continuous Scroll Track */}
        <div 
          className="flex gap-6 h-full items-center transition-all duration-500"
          style={{
            animation: isHoveringArrow ? 'slideshow 12s linear infinite' : 'slideshow 20s linear infinite',
            willChange: 'transform',
          }}
        >
          {duplicatedSlides.map((slide, index) => (
            <div
              key={`${slide.id}-${index}`}
              className="relative shrink-0 h-full"
            >
              <div className="relative h-full rounded-lg overflow-hidden">
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="h-full w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  style={{ contentVisibility: 'auto' }}
                />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Fade Edges - Fully extend to screen edges */}
        <div className="absolute left-0 top-0 bottom-0 w-48 md:w-96 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-48 md:w-96 bg-gradient-to-l from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none z-20" />

        {/* Navigation Buttons */}
        <button
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Previous"
          onMouseEnter={() => setIsHoveringArrow(true)}
          onMouseLeave={() => setIsHoveringArrow(false)}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Next"
          onMouseEnter={() => setIsHoveringArrow(true)}
          onMouseLeave={() => setIsHoveringArrow(false)}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Subtitle */}
        <div className="mt-12">
          <p className="text-[#7d8187] text-sm max-w-2xl">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}