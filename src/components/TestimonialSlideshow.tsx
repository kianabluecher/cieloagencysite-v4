import { useEffect, useRef } from 'react';

interface TestimonialSlideshowProps {
  images: string[];
  direction?: 'left' | 'right';
  speed?: number;
  height?: number;
}

export function TestimonialSlideshow({ images, direction = 'left', speed = 30, height = 96 }: TestimonialSlideshowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = direction === 'left' ? 0 : scrollContainer.scrollWidth / 2;

    const scroll = () => {
      if (direction === 'left') {
        scrollPosition += speed / 60;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
      } else {
        scrollPosition -= speed / 60;
        if (scrollPosition <= 0) {
          scrollPosition = scrollContainer.scrollWidth / 2;
        }
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [direction, speed]);

  return (
    <div className="relative overflow-hidden">
      {/* Left gradient fade to black */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      
      {/* Right gradient fade to black */}
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Duplicate images for seamless loop */}
        {[...images, ...images].map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0"
          >
            <img
              src={image}
              alt=""
              className={`h-${height} w-auto object-contain rounded-lg`}
              style={{ height: `${height * 4}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}