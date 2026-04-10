import { useState, useEffect, useRef } from 'react';
import { useSequentialLoad } from '../utils/useSequentialLoad';
import sustainableCredit from 'figma:asset/889e624eeede5a73236ef970c77c776d999a2acb.png';
import mastLegal from 'figma:asset/4a4a284c08c4e6597692602869d74834a28d749d.png';
import portfolioImage1 from 'figma:asset/f5a00a97b78dd390039f12d0ebe7beaea23626cb.png';
import portfolioImage2 from 'figma:asset/de7a2be995fb5993aa3d9ae2178616e0bb77ed38.png';
import portfolioImage3 from 'figma:asset/558cce532186e50c532e0ab6ccda7a555b1237f1.png';
import portfolioImage4 from 'figma:asset/248e1e8c3cee5f005c6ae06ae5f2668165c1544b.png';
import mezcalTequila from 'figma:asset/291f3e0593b4d292522a70d11d3977c51df2a464.png';
import portfolioImage6 from 'figma:asset/9186936c1dec3675326e3919db84f1be7e0cca4f.png';
import recoverFaster from 'figma:asset/a92365d5807be518840ba7c3328de879544a9d34.png';
import portfolioImage7 from 'figma:asset/21d704d082f04f6c941098a0abad0599efa03c58.png';
import portfolioImage8 from 'figma:asset/272f3c502abb9398ce96d663999c33a46f673607.png';
import portfolioImage9 from 'figma:asset/3c7ade12f182f6f2dc0faa07627e0ee1f4b1d41b.png';

interface PortfolioPreviewProps {
  onNavigate: (page: string, projectId?: string) => void;
}

// Static portfolio images
const portfolioImages = [
  sustainableCredit,
  mastLegal,
  portfolioImage1, 
  portfolioImage2, 
  portfolioImage3,
  mezcalTequila,
  portfolioImage4,
  recoverFaster,
  portfolioImage6,
  portfolioImage7,
  portfolioImage8,
  portfolioImage9
];

export function PortfolioPreview({ onNavigate }: PortfolioPreviewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);
  
  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...portfolioImages, ...portfolioImages, ...portfolioImages];
  
  // Sequential loading for smoother experience
  const loadedIndices = useSequentialLoad(duplicatedImages.length, 100);

  useEffect(() => {
    // Start at the middle set of images
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = scrollWidth;
      setScrollLeft(scrollWidth);
    }
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const autoScroll = () => {
      if (!scrollRef.current || isDragging || isUserInteracting) return;
      scrollRef.current.scrollLeft += 1; // Scroll 1px at a time
    };

    // Start auto-scroll interval (60fps for smooth animation)
    autoScrollRef.current = window.setInterval(autoScroll, 16);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isDragging, isUserInteracting]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsUserInteracting(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    // Resume auto-scroll after a delay when mouse leaves
    setTimeout(() => setIsUserInteracting(false), 2000);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-scroll after a delay when user stops dragging
    setTimeout(() => setIsUserInteracting(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply for faster scroll
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle infinite scroll loop
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const scrollWidth = scrollRef.current.scrollWidth / 3;
    const currentScroll = scrollRef.current.scrollLeft;

    // If scrolled past the end, loop back
    if (currentScroll >= scrollWidth * 2) {
      scrollRef.current.scrollLeft = scrollWidth;
    }
    // If scrolled before the beginning, loop forward
    else if (currentScroll <= 0) {
      scrollRef.current.scrollLeft = scrollWidth;
    }
  };

  return (
    <section className="relative py-20 overflow-hidden border-t border-[#1f2228]">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h3 className="text-2xl md:text-3xl text-white tracking-tight">
          Some of our recent work
        </h3>
      </div>

      {/* Draggable Slideshow Container */}
      <div className="relative h-[400px] md:h-[450px]">
        <div
          ref={scrollRef}
          className={`flex gap-6 h-full items-center overflow-x-scroll scrollbar-hide ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth',
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
        >
          {duplicatedImages.map((image, index) => {
            const isLoaded = loadedIndices.has(index);
            
            return (
              <div
                key={index}
                className={`relative shrink-0 transition-all duration-500 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                draggable={false}
              >
                <div className="relative h-[400px] md:h-[450px] rounded-lg overflow-hidden">
                  {isLoaded && (
                    <img
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      className="h-full w-auto object-cover pointer-events-none select-none"
                      draggable={false}
                    />
                  )}
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 via-black/5 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-48 md:w-96 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-48 md:w-96 bg-gradient-to-l from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none z-20" />
      </div>

      {/* View Portfolio Button */}
      <div className="max-w-7xl mx-auto px-6 mt-12 flex justify-end">
        <button
          onClick={() => onNavigate('portfolio')}
          className="group flex items-center gap-3 text-[#7d8187] hover:text-white transition-colors"
        >
          <span className="text-xl">view portfolio</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}