interface IndustriesScrollProps {
  compact?: boolean;
}

export function IndustriesScroll({ compact }: IndustriesScrollProps) {
  const industriesRow1 = [
    'Med Spa',
    'Architects',
    'Startups',
    'E-Commerce',
    'Real Estate',
    'SaaS',
    'Fitness & Wellness',
    'Hospitality',
    'Legal Services',
  ];

  const industriesRow2 = [
    'Fintech',
    'Health Tech',
    'Fashion & Beauty',
    'Food & Beverage',
    'Interior Design',
    'Consulting',
    'Technology',
    'Marketing Agencies',
    'Investment Firms',
  ];

  // Duplicate industries for seamless infinite scroll
  const duplicatedRow1 = [...industriesRow1, ...industriesRow1, ...industriesRow1];
  const duplicatedRow2 = [...industriesRow2, ...industriesRow2, ...industriesRow2];

  return (
    <section className={`${compact ? 'pb-0' : 'pb-16 md:pb-32'} overflow-hidden`}>
      <div className={`flex flex-col justify-center ${compact ? 'min-h-[150px]' : 'min-h-[200px] md:min-h-[300px]'}`}>
        <div className="space-y-4 px-6 md:px-0 md:space-y-6">
          {/* First Row - Scrolling Right to Left */}
          <div className="relative">
            {/* Grey gradients on both ends */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none z-10" />
            
            {/* Scrolling container */}
            <div 
              className="flex items-center gap-3"
              style={{
                animation: 'industryScrollLeft 40s linear infinite',
              }}
            >
              {duplicatedRow1.map((industry, index) => (
                <button
                  key={`row1-${industry}-${index}`}
                  className="px-6 py-3 border border-[#1f2228] rounded-full text-white font-['Geist_Mono'] text-sm tracking-wide uppercase whitespace-nowrap shrink-0 hover:border-white/40 transition-colors"
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Second Row - Scrolling Left to Right */}
          <div className="relative">
            {/* Grey gradients on both ends */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none z-10" />
            
            {/* Scrolling container */}
            <div 
              className="flex items-center gap-3"
              style={{
                animation: 'industryScrollRight 40s linear infinite',
              }}
            >
              {duplicatedRow2.map((industry, index) => (
                <button
                  key={`row2-${industry}-${index}`}
                  className="px-6 py-3 border border-[#1f2228] rounded-full text-white font-['Geist_Mono'] text-sm tracking-wide uppercase whitespace-nowrap shrink-0 hover:border-white/40 transition-colors"
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes industryScrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes industryScrollRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
