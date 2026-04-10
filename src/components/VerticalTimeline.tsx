import { useState, useEffect, useRef } from 'react';

interface TimelineStep {
  step: string;
  title: 'Research + Company Analysis' | 'Build the Brand System' | 'Launch + Brand Management' | 'Performance + Expansion';
  description: string;
}

const steps: TimelineStep[] = [
  {
    step: '01',
    title: 'Research + Company Analysis',
    description: 'Deep dive on the business, market, competitors, audience, and current brand perception. Outcome: clear positioning, messaging, and a credibility plan.',
  },
  {
    step: '02',
    title: 'Build the Brand System',
    description: 'Create everything needed to look established: brand identity, creative direction, guidelines, full website setup, and core collateral (decks, templates, sales assets).',
  },
  {
    step: '03',
    title: 'Launch + Brand Management',
    description: 'Launch the new presence and run execution across all channels: content, social, email, landing pages, web updates, and ongoing design support to drive consistent growth.',
  },
  {
    step: '04',
    title: 'Performance + Expansion',
    description: 'Optimize results and scale what works: signature campaigns, performance marketing assets, PR and partnerships, new channels, and any growth lever your business needs next.',
  },
];

export function VerticalTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const lastVisibleStepRef = useRef<number>(0);

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Update the highest visible step
            if (entry.isIntersecting) {
              lastVisibleStepRef.current = Math.max(lastVisibleStepRef.current, index);
            }
          });

          // Find the highest currently intersecting step
          const intersectingSteps = stepRefs.current
            .map((ref, idx) => ({ ref, idx }))
            .filter(({ ref }) => {
              if (!ref) return false;
              const rect = ref.getBoundingClientRect();
              const windowHeight = window.innerHeight;
              return rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
            });

          const targetStep = intersectingSteps.length > 0 
            ? Math.max(...intersectingSteps.map(s => s.idx))
            : 0;

          // Clear any existing timeouts
          timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
          timeoutsRef.current = [];

          // Determine animation direction
          const isScrollingDown = targetStep > activeStep;
          const isScrollingUp = targetStep < activeStep;

          if (isScrollingDown) {
            // Scrolling down - activate steps sequentially
            for (let i = activeStep + 1; i <= targetStep; i++) {
              const delay = (i - activeStep) * 200;
              const timeout = setTimeout(() => {
                setActiveStep(i);
              }, delay);
              timeoutsRef.current.push(timeout);
            }
          } else if (isScrollingUp) {
            // Scrolling up - deactivate steps sequentially in reverse
            const stepsToDeactivate = activeStep - targetStep;
            for (let i = 0; i < stepsToDeactivate; i++) {
              const timeout = setTimeout(() => {
                setActiveStep(prev => Math.max(0, prev - 1));
              }, i * 200);
              timeoutsRef.current.push(timeout);
            }
          }
        },
        {
          threshold: 0.4,
          rootMargin: '-20% 0px -40% 0px',
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      // Clean up observers
      observers.forEach((observer, index) => {
        if (observer && stepRefs.current[index]) {
          observer.unobserve(stepRefs.current[index]!);
        }
      });
      // Clean up timeouts
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [activeStep]);

  return (
    <div className="relative">
      {/* 3D Funnel Effect - Wide at top, narrow at bottom */}
      <div className="absolute left-0 top-0 bottom-0 -translate-x-1/2 pointer-events-none">
        {/* Top ellipse (extra wide) */}
        <svg className="absolute top-0 left-1/2 -translate-x-1/2" width="520" height="90" viewBox="0 0 520 90">
          <ellipse cx="260" cy="45" rx="258" ry="43" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <ellipse cx="260" cy="45" rx="230" ry="38" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <ellipse cx="260" cy="45" rx="200" ry="32" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <ellipse cx="260" cy="45" rx="170" ry="26" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
          <ellipse cx="260" cy="45" rx="140" ry="20" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
        </svg>
        
        {/* Funnel edges - angled lines */}
        <svg className="absolute left-1/2 -translate-x-1/2 top-10 bottom-6" width="520" height="100%" preserveAspectRatio="none" viewBox="0 0 520 1000">
          {/* Left edge */}
          <line x1="2" y1="0" x2="50" y2="1000" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="25" y1="0" x2="55" y2="1000" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="50" y1="0" x2="60" y2="1000" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <line x1="75" y1="0" x2="65" y2="1000" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
          
          {/* Right edge */}
          <line x1="518" y1="0" x2="470" y2="1000" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="495" y1="0" x2="465" y2="1000" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="470" y1="0" x2="460" y2="1000" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <line x1="445" y1="0" x2="455" y2="1000" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
        </svg>
        
        {/* Bottom ellipse (smaller) */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" width="140" height="45" viewBox="0 0 140 45">
          <ellipse cx="70" cy="22" rx="68" ry="21" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <ellipse cx="70" cy="22" rx="58" ry="17" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <ellipse cx="70" cy="22" rx="48" ry="14" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Vertical Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1f2228]" />

      {/* Timeline Steps */}
      <div className="space-y-0">
        {steps.map((item, index) => (
          <div 
            key={item.step} 
            className="relative"
            ref={(el) => (stepRefs.current[index] = el)}
          >
            {/* Dot Marker */}
            <div className="absolute left-0 top-6 -translate-x-1/2 z-10">
              <button
                onClick={() => setActiveStep(index)}
                className="group relative"
              >
                {/* Outer box - always visible with subtle pulse, gets brighter on hover */}
                <div className={`absolute -inset-2 border rounded-full animate-pulse transition-all duration-300 ${
                  activeStep === index 
                    ? 'border-white/50 group-hover:border-white/80' 
                    : 'border-white/20 group-hover:border-white/60'
                }`} />
                
                {/* Dot */}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ease-out ${
                    index < activeStep
                      ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)] group-hover:bg-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]'
                      : index === activeStep
                      ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.9)]'
                      : 'bg-white/20 group-hover:bg-white/50 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                  }`}
                />
              </button>

              {/* Vertical connector to content */}
              {activeStep === index && (
                <div className="absolute top-1 left-1 w-px h-6 bg-gradient-to-b from-white/50 to-transparent" />
              )}
            </div>

            {/* Step Label (on the left side of the line) */}
            <div className="absolute left-0 top-6 -translate-x-full pr-6">
              <p
                className={`font-['Geist_Mono'] text-[10px] tracking-wider transition-all duration-500 ease-out ${
                  index <= activeStep ? 'text-white' : 'text-[#7d8187]/50'
                }`}
              >
                STEP {item.step}
              </p>
            </div>

            {/* Content Area */}
            <div className="pl-12 pb-16">
              <div
                className={`transition-all duration-500 ease-out ${
                  index <= activeStep
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-20 translate-x-6'
                }`}
              >
                {/* Date/Step Number */}
                <div className="mb-3">
                  <p
                    className={`font-['Geist_Mono'] text-xs tracking-wider transition-all duration-500 ease-out ${
                      index <= activeStep ? 'text-[#7d8187]' : 'text-[#7d8187]/20'
                    }`}
                  >
                    {item.step}
                  </p>
                </div>

                {/* Title */}
                <h3
                  className={`text-2xl md:text-3xl tracking-tight mb-3 transition-all duration-500 ease-out ${
                    index <= activeStep ? 'text-white' : 'text-white/20'
                  }`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed max-w-xl transition-all duration-500 ease-out ${
                    index <= activeStep ? 'text-[#5a5d63]' : 'text-[#7d8187]/20'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}