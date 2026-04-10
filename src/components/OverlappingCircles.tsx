import { useEffect, useRef, useState } from 'react';

export function OverlappingCircles() {
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

      // Calculate how far the section has scrolled into view
      // 0 = top of section just entering bottom of viewport
      // 1 = bottom of section just leaving top of viewport
      const startScroll = rect.top - windowHeight;
      const endScroll = rect.top + sectionHeight;
      const totalScroll = windowHeight + sectionHeight;
      const currentScroll = -startScroll;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax transforms for circles
  const getTransform = (index: number) => {
    if (isMobile) {
      // On mobile: circles move vertically to overlap more
      const mobileMovements = [
        { x: 0, y: 60 * scrollProgress },   // Top circle moves down
        { x: 0, y: 0 },                     // Center circle stays still
        { x: 0, y: -60 * scrollProgress },  // Bottom circle moves up
      ];
      const movement = mobileMovements[index];
      return `translate(${movement.x}px, ${movement.y}px)`;
    } else {
      // On desktop: circles move together and overlap horizontally
      const movements = [
        { x: 40 * scrollProgress, y: 10 * scrollProgress },  // Left circle moves right and down
        { x: 0, y: 12 * scrollProgress },   // Center circle moves down
        { x: -40 * scrollProgress, y: 10 * scrollProgress },   // Right circle moves left and down
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
      {/* Circles Container - Vertical on mobile, horizontal on desktop */}
      <div className="relative w-full mx-auto flex items-center justify-center">
        {/* First Circle - Top on mobile, Left on desktop */}
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
                SOCIAL MEDIA CONTENT,
                <br />
                DIGITAL PRESENCE & WEB
              </p>
            </div>
          </div>
        </div>

        {/* Center Circle - Middle on mobile and desktop */}
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
                BRANDING
                <br />
                AND POSITIONING
              </p>
            </div>
          </div>
        </div>

        {/* Third Circle - Bottom on mobile, Right on desktop */}
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
                EXECUTION,
                <br />
                MANAGEMENT AND GROWTH
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for mobile vertical layout */}
      <div className="h-[660px] md:h-[150px] lg:h-[150px]" />
    </div>
  );
}