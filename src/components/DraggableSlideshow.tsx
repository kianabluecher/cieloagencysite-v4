import { useState, useRef, useEffect } from 'react';
import { useSequentialLoad } from '../utils/useSequentialLoad';

interface DraggableSlideshowProps {
  images: string[];
  title?: string;
  subtitle?: string;
}

export function DraggableSlideshow({
  images,
  title,
  subtitle,
}: DraggableSlideshowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Duplicate images for seamless infinite scroll - more duplicates for smoother looping
  const duplicatedImages = [...images, ...images, ...images, ...images, ...images];
  
  // Sequential loading with fast stagger for slideshow
  const loadedIndices = useSequentialLoad(duplicatedImages.length, 80);

  useEffect(() => {
    // Start at the middle set of images
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / 5;
      scrollRef.current.scrollLeft = scrollWidth * 2;
      setScrollLeft(scrollWidth * 2);
    }
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    if (isUserInteracting) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current && !isDragging) {
        scrollRef.current.scrollLeft += 1;
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [isUserInteracting, isDragging]);

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
    
    const scrollWidth = scrollRef.current.scrollWidth / 5;
    const currentScroll = scrollRef.current.scrollLeft;

    // If scrolled past the end, loop back
    if (currentScroll >= scrollWidth * 4) {
      scrollRef.current.scrollLeft = scrollWidth * 2;
    }
    // If scrolled before the beginning, loop forward
    else if (currentScroll <= scrollWidth) {
      scrollRef.current.scrollLeft = scrollWidth * 2;
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Removed background gradient for clean white look */}
      
      {title && (
        <div className="relative max-w-7xl mx-auto px-6 mb-12">
          <h3 className="text-2xl md:text-3xl text-white tracking-tight">
            {title}
          </h3>
        </div>
      )}

      {/* Draggable Slideshow Container - Smaller on mobile */}
      <div className="relative h-[280px] md:h-[450px]">
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
                className={`relative shrink-0 group/slide transition-all duration-500 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                draggable={false}
              >
                <div className="relative h-[280px] md:h-[450px] rounded-xl overflow-hidden shadow-2xl hover:shadow-neutral-500/10 transition-all duration-500">
                  {/* Subtle glow effect behind the card */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-neutral-500/0 via-neutral-500/3 to-neutral-500/0 rounded-xl blur-xl opacity-0 group-hover/slide:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative h-full w-full rounded-xl overflow-hidden border border-neutral-200/20">
                    {isLoaded && (
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="h-full w-auto object-cover pointer-events-none select-none transform group-hover/slide:scale-[1.02] transition-transform duration-700"
                        draggable={false}
                      />
                    )}
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-100/10 via-transparent to-transparent opacity-0 group-hover/slide:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                
                {/* Subtle reflection effect */}
                <div className="absolute -bottom-2 left-0 right-0 h-8 bg-gradient-to-b from-white/2 to-transparent rounded-b-xl blur-sm opacity-0 group-hover/slide:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

        {/* Reduced Fade Edges - less gradient intensity */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none z-20" />
      </div>

      {subtitle && (
        <div className="relative max-w-7xl mx-auto px-6 mt-12">
          <p className="text-[#7d8187] text-sm max-w-2xl">{subtitle}</p>
        </div>
      )}
    </section>
  );
}