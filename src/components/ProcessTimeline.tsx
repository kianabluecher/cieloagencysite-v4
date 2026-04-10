import { useState } from 'react';
import svgPaths1 from '../imports/svg-f7m08r82q3';
import svgPaths2 from '../imports/svg-jk74rcgffb';
import svgPaths3 from '../imports/svg-txxiv38vep';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  graphic?: 'strategy' | 'management' | 'results';
}

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Strategy',
      description: 'We start with deep discovery—understanding your brand, audience, and growth goals to build a foundation that scales.',
      graphic: 'strategy',
    },
    {
      number: '02',
      title: 'Management',
      description: 'Our team handles everything from social media to newsletters, blogs, and creative production—building your presence across all channels.',
      graphic: 'management',
    },
    {
      number: '03',
      title: 'Results',
      description: 'Watch your metrics climb. We deliver measurable growth—higher ROAS, explosive signups, and consistent month-over-month gains.',
      graphic: 'results',
    },
  ];

  return (
    <section className="relative px-6 py-32 overflow-hidden border-t border-[#1f2228]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Content */}
          <div>
            <div className="inline-block px-4 py-2 rounded-full mb-8">
              <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                [ OUR PROCESS ]
              </p>
            </div>

            <h2 className="text-4xl md:text-6xl text-white tracking-tight mb-8">
              How we work
            </h2>

            <p className="text-[#7d8187] text-lg leading-relaxed max-w-xl">
              A powerful brand isn't built through ideas—it's built through execution. 
              We merge strategy, design, and operations so you can move fast without chaos.
            </p>
          </div>

          {/* Right Side - Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[30px] top-8 bottom-8 w-[1px] bg-gradient-to-b from-transparent via-[#1f2228] to-transparent" />

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative group"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Dot Indicator */}
                  <div className="absolute left-0 top-8 flex items-center justify-center">
                    <div className={`
                      w-[60px] h-[60px] rounded-full border transition-all duration-300
                      ${activeStep === index 
                        ? 'border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                        : 'border-[#1f2228] bg-neutral-950'
                      }
                    `}>
                      <div className={`
                        w-3 h-3 rounded-full mx-auto transition-all duration-300
                        ${activeStep === index ? 'bg-white' : 'bg-[#7d8187]'}
                      `} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="ml-[90px] pl-8 pb-8 border-l border-transparent">
                    <div className={`
                      p-8 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden
                      ${activeStep === index 
                        ? 'border-white/30 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.1)]' 
                        : 'border-[#1f2228] bg-transparent'
                      }
                    `}>
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(170,203,220,0.05)] to-transparent pointer-events-none" />
                      
                      {/* Graphic Element */}
                      {step.graphic && (
                        <div className="absolute top-4 right-4 opacity-10">
                          {step.graphic === 'strategy' && (
                            <svg className="w-12 h-12" fill="none" preserveAspectRatio="none" viewBox="0 0 25 23">
                              <path d={svgPaths1.p33ecbf0} fill="url(#paint0_linear_strategy)" />
                              <defs>
                                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_strategy" x1="12.464" x2="12.464" y1="0" y2="22.96">
                                  <stop stopColor="white" />
                                  <stop offset="1" stopColor="#A2CEDE" />
                                </linearGradient>
                              </defs>
                            </svg>
                          )}
                          {step.graphic === 'management' && (
                            <div className="flex gap-2">
                              <svg className="w-6 h-6 rotate-[270deg]" fill="none" viewBox="0 0 12 9">
                                <path d={svgPaths2.p1205680} fill="url(#paint0_linear_mgmt)" />
                                <defs>
                                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_mgmt" x1="12" x2="0" y1="5.625" y2="5.625">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="#A2CEDE" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              <svg className="w-6 h-6 rotate-[270deg] scale-y-[-100%]" fill="none" viewBox="0 0 12 9">
                                <path d={svgPaths2.p1205680} fill="url(#paint0_linear_mgmt2)" />
                                <defs>
                                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_mgmt2" x1="12" x2="0" y1="5.625" y2="5.625">
                                    <stop stopColor="white" />
                                    <stop offset="1" stopColor="#A2CEDE" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>
                          )}
                          {step.graphic === 'results' && (
                            <div className="text-white/20 font-['Geist_Mono'] text-3xl">4.3x</div>
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Step Number */}
                        <div className="font-['Geist_Mono'] text-[#7d8187] text-sm tracking-[1.4px] mb-4">
                          {step.number}
                        </div>

                        {/* Title */}
                        <h3 className={`
                          text-2xl md:text-3xl tracking-tight mb-3 transition-colors duration-300
                          ${activeStep === index ? 'text-white' : 'text-white/80'}
                        `}>
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className={`
                          text-[#7d8187] leading-relaxed transition-colors duration-300
                          ${activeStep === index ? 'text-white/70' : 'text-[#7d8187]'}
                        `}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
