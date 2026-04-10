import svgPaths from "../imports/svg-b8iior2zbs";

interface ServicesGridProps {
  onNavigate: (page: string) => void;
}

function Group() {
  return (
    <div className="absolute inset-[0_0_-23.37%_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 321.985 322">
        <g id="Group">
          <path d={svgPaths.p18cb3870} fill="var(--fill-0, #3F4147)" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeWidth="0.6" />
          <path d={svgPaths.p3cf7ba00} fill="var(--fill-0, #3F4147)" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeWidth="0.6" />
          <path d={svgPaths.p2b374a00} fill="var(--fill-0, #3F4147)" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeWidth="0.6" />
          <path d={svgPaths.p17bda100} fill="var(--fill-0, #3F4147)" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeWidth="0.6" />
        </g>
      </svg>
    </div>
  );
}

function Frame({ className }: { className?: string }) {
  return (
    <div className={`relative shrink-0 size-[14px] ${className}`} data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Frame">
          <path d="M3.33594 8H12.6693" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p287e9400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[41.39%_10.3%_1.34%_10.29%] scale-75" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 323.977 255.999">
        <g id="Group" opacity="0.5">
          <g id="Union">
            <mask fill="white" id="path-1-inside-1_1931_394">
              <path d={svgPaths.p8116d00} />
            </mask>
            <path d={svgPaths.p8116d00} fill="var(--fill-0, #3F4147)" />
            <path d={svgPaths.p1c17a700} fill="var(--stroke-0, #0A0A0A)" mask="url(#path-1-inside-1_1931_394)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[41.39%_16.09%_-13.65%_16.08%] scale-75" data-name="Group">
      <div className="absolute inset-[-0.45%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 278.596 325.885">
          <g id="Group">
            <path clipRule="evenodd" d={svgPaths.p4302180} fillRule="evenodd" id="Vector" stroke="var(--stroke-0, #7C7F87)" strokeWidth="2.5" />
            <path clipRule="evenodd" d={svgPaths.p38339f40} fillRule="evenodd" id="Vector_2" stroke="var(--stroke-0, #7C7F87)" strokeWidth="2.5" />
            <path clipRule="evenodd" d={svgPaths.p28319800} fillRule="evenodd" id="Vector_3" stroke="var(--stroke-0, #7C7F87)" strokeWidth="2.5" />
            <path clipRule="evenodd" d={svgPaths.p24835580} fillRule="evenodd" id="Vector_4" stroke="var(--stroke-0, #7C7F87)" strokeWidth="2.5" />
            <path clipRule="evenodd" d={svgPaths.p195e9240} fillRule="evenodd" id="Vector_5" stroke="var(--stroke-0, #7C7F87)" strokeWidth="2.5" />
            <path d={svgPaths.p24e90666} id="Vector_6" stroke="var(--stroke-0, #7C7F87)" strokeLinecap="square" strokeWidth="2.5" />
            <path d={svgPaths.p2661da00} id="Vector_7" stroke="var(--stroke-0, #7C7F87)" strokeLinecap="square" strokeWidth="2.5" />
            <path clipRule="evenodd" d={svgPaths.pbc22280} fillRule="evenodd" id="Vector_8" stroke="var(--stroke-0, #7C7F87)" strokeWidth="2.5" />
            <path d="M138.453 125.288V78.4278" id="Vector_9" stroke="var(--stroke-0, #7C7F87)" strokeLinecap="square" strokeWidth="2.5" />
            <path d="M138.453 249.132V202.272" id="Vector_10" stroke="var(--stroke-0, #7C7F87)" strokeLinecap="square" strokeWidth="2.5" />
            <path d={svgPaths.p157f0600} id="Vector_11" stroke="var(--stroke-0, #7C7F87)" strokeLinecap="square" strokeWidth="2.5" />
            <path d={svgPaths.p3662a600} id="Vector_12" stroke="var(--stroke-0, #7C7F87)" strokeLinecap="square" strokeWidth="2.5" />
            <path clipRule="evenodd" d={svgPaths.p1e771400} fillRule="evenodd" id="Vector_13" stroke="var(--stroke-0, #7C7F87)" strokeWidth="2.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function ServicesGrid({ onNavigate }: ServicesGridProps) {
  return (
    <div className="bg-[#0a0a0a] relative w-full overflow-hidden py-24">
      <div className="max-w-6xl mx-auto px-12">
        {/* Header */}
        <div className="mb-12">
          <p className="font-['JetBrains_Mono'] font-normal leading-[normal] text-[#7d8187] text-[10px] mb-4 tracking-[-0.18px]">[ SERVICES ]</p>
          <p className="font-['Helvetica_Neue'] leading-[normal] not-italic text-[44px] text-white tracking-[-0.9px]">What we build</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {/* Brand & Web */}
          <div className="relative h-[400px] overflow-clip cursor-pointer group border-b border-r border-[#3f4147]" onClick={() => onNavigate('brand-web')}>
            <div className="absolute bg-[#0a0a0a] h-full w-full group-hover:bg-gradient-to-b group-hover:from-[#191e26] group-hover:to-[#0a0a0a] group-hover:to-[44.966%] transition-[background] duration-500 ease-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-[#7c7f87] transition-opacity duration-500 ease-out pointer-events-none" />
            
            {/* Corner dots */}
            <div className="absolute bg-white left-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white left-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

            <div className="absolute h-[240px] left-[35px] opacity-50 overflow-clip top-[155px] w-[290px] scale-75">
              <Group />
            </div>
            <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[rgba(10,10,10,0)] h-[165px] left-1/2 to-[#0a0a0a] to-[79.167%] top-[235px] w-[90%]" />
            <p className="absolute font-['Helvetica_Neue'] leading-[normal] left-[26px] not-italic text-[18px] text-white top-[32px] tracking-[-0.3px]">{`Brand & Web`}</p>
            <div className="absolute font-['Helvetica_Neue'] leading-[22px] left-[26px] not-italic text-[#6d7277] text-[14px] top-[62px] tracking-[-0.24px] whitespace-nowrap group-hover:text-white transition-colors duration-500 ease-out">
              <p className="mb-0">{`Full brand identity, positioning, and custom `}</p>
              <p>websites built for trust and conversion.</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate('brand-web'); }}
              className="-translate-x-1/2 absolute content-stretch flex gap-[3px] items-center justify-center left-[calc(50%-0.5px)] px-[16px] py-[8px] rounded-[80px] top-[320px] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div aria-hidden="true" className="absolute border border-[#3f4147] border-solid inset-0 pointer-events-none rounded-[80px]" />
              <p className="font-['JetBrains_Mono'] font-normal leading-[normal] relative shrink-0 text-[11px] text-white tracking-[-0.18px]">LEARN MORE</p>
              <Frame />
            </button>
          </div>

          {/* Social Media */}
          <div className="relative h-[400px] overflow-clip cursor-pointer group border-b border-r border-[#3f4147]" onClick={() => onNavigate('social-media')}>
            <div className="absolute bg-[#0a0a0a] h-full w-full group-hover:bg-gradient-to-b group-hover:from-[#191e26] group-hover:to-[#0a0a0a] group-hover:to-[44.966%] transition-[background] duration-500 ease-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-[#7c7f87] transition-opacity duration-500 ease-out pointer-events-none" />
            
            <div className="absolute bg-white left-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white left-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

            <p className="absolute font-['Helvetica_Neue'] leading-[normal] left-[26px] not-italic text-[18px] text-white top-[32px] tracking-[-0.3px]">Social Media</p>
            <div className="absolute font-['Helvetica_Neue'] leading-[22px] left-[26px] right-[26px] not-italic text-[#6d7277] text-[14px] top-[62px] tracking-[-0.24px] group-hover:text-white transition-colors duration-500 ease-out">
              <p className="mb-0">{`Strategy-backed content execution and growth`}</p>
              <p>management for scaling founders.</p>
            </div>
            <div className="-translate-x-1/2 absolute bottom-[-7.61%] left-[calc(50%-0.5px)] top-[41.61%] w-[250px] scale-75">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 288 295">
                <path d={svgPaths.pfae0700} fill="var(--fill-0, #3F4147)" opacity="0.5" />
              </svg>
            </div>
            <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[rgba(10,10,10,0)] h-[175px] left-[calc(50%+0.5px)] opacity-50 to-[#0a0a0a] to-[79.167%] top-[225px] w-[90%]" />
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate('social-media'); }}
              className="-translate-x-1/2 absolute content-stretch flex gap-[3px] items-center justify-center left-1/2 px-[16px] py-[8px] rounded-[80px] top-[325px] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div aria-hidden="true" className="absolute border border-[#3f4147] border-solid inset-0 pointer-events-none rounded-[80px]" />
              <p className="font-['JetBrains_Mono'] font-normal leading-[normal] relative shrink-0 text-[11px] text-white tracking-[-0.18px]">LEARN MORE</p>
              <Frame />
            </button>
          </div>

          {/* Ventures */}
          <div className="relative h-[400px] overflow-clip cursor-pointer group border-b lg:border-r-0 border-r border-[#3f4147]" onClick={() => onNavigate('ventures')}>
            <div className="absolute bg-[#0a0a0a] h-full w-full group-hover:bg-gradient-to-b group-hover:from-[#191e26] group-hover:to-[#0a0a0a] group-hover:to-[44.966%] transition-[background] duration-500 ease-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-[#7c7f87] transition-opacity duration-500 ease-out pointer-events-none" />
            
            <div className="absolute bg-white left-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white left-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

            <div className="-translate-x-1/2 absolute bottom-[-9.93%] left-[calc(50%-0.84px)] top-[41.5%] w-[195px] scale-75">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 226.321 305.904">
                <path d={svgPaths.p30bf4c0} fill="var(--fill-0, #3F4147)" opacity="0.5" />
              </svg>
            </div>
            <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[rgba(10,10,10,0)] h-[175px] left-1/2 to-[#0a0a0a] to-[79.167%] top-[225px] w-[90%]" />
            <p className="absolute font-['Helvetica_Neue'] leading-[normal] left-[26px] not-italic text-[18px] text-white top-[32px] tracking-[-0.3px]">Ventures</p>
            <div className="absolute font-['Helvetica_Neue'] leading-[22px] left-[26px] not-italic text-[#6d7277] text-[14px] top-[62px] tracking-[-0.24px] whitespace-nowrap group-hover:text-white transition-colors duration-500 ease-out">
              <p className="mb-0">{`Creative infrastructure and brand incubation for `}</p>
              <p>builders launching new companies.</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate('ventures'); }}
              className="absolute content-stretch flex gap-[3px] items-center justify-center left-[115px] px-[16px] py-[8px] rounded-[80px] top-[320px] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div aria-hidden="true" className="absolute border border-[#3f4147] border-solid inset-0 pointer-events-none rounded-[80px]" />
              <p className="font-['JetBrains_Mono'] font-normal leading-[normal] relative shrink-0 text-[11px] text-white tracking-[-0.18px]">LEARN MORE</p>
              <Frame />
            </button>
          </div>

          {/* Custom Development */}
          <div className="relative h-[400px] overflow-clip cursor-pointer group border-b border-r border-[#3f4147] md:border-b-0" onClick={() => onNavigate('development')}>
            <div className="absolute bg-[#0a0a0a] h-full w-full group-hover:bg-gradient-to-b group-hover:from-[#191e26] group-hover:to-[#0a0a0a] group-hover:to-[44.966%] transition-[background] duration-500 ease-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-[#7c7f87] transition-opacity duration-500 ease-out pointer-events-none" />
            
            <div className="absolute bg-white left-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white left-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

            <Group1 />
            <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[rgba(10,10,10,0)] h-[190px] left-1/2 to-[#0a0a0a] to-[79.167%] top-[210px] w-[90%]" />
            <p className="absolute font-['Helvetica_Neue'] leading-[normal] left-[26px] not-italic text-[18px] text-white top-[32px] tracking-[-0.3px]">Custom Development</p>
            <p className="absolute font-['Helvetica_Neue'] leading-[22px] left-[26px] not-italic text-[#6d7277] text-[14px] top-[62px] tracking-[-0.24px] w-[280px] whitespace-pre-wrap group-hover:text-white transition-colors duration-500 ease-out">Websites, dashboards, and digital systems built to scale with your brand.</p>
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate('development'); }}
              className="absolute content-stretch flex gap-[3px] items-center justify-center left-[115px] px-[16px] py-[8px] rounded-[80px] top-[320px] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div aria-hidden="true" className="absolute border border-[#3f4147] border-solid inset-0 pointer-events-none rounded-[80px]" />
              <p className="font-['JetBrains_Mono'] font-normal leading-[normal] relative shrink-0 text-[11px] text-white tracking-[-0.18px]">LEARN MORE</p>
              <Frame />
            </button>
          </div>

          {/* Consulting */}
          <div className="relative h-[400px] overflow-clip cursor-pointer group border-b border-r border-[#3f4147] md:border-b-0" onClick={() => onNavigate('consulting')}>
            <div className="absolute bg-[#0a0a0a] h-full w-full group-hover:bg-gradient-to-b group-hover:from-[#191e26] group-hover:to-[#0a0a0a] group-hover:to-[44.966%] transition-[background] duration-500 ease-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-[#7c7f87] transition-opacity duration-500 ease-out pointer-events-none" />
            
            <div className="absolute bg-white left-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white left-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

            <Group2 />
            <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[rgba(10,10,10,0)] h-[175px] left-[calc(50%+0.5px)] to-[#0a0a0a] to-[79.167%] top-[225px] w-[90%]" />
            <p className="absolute font-['Helvetica_Neue'] leading-[normal] left-[26px] not-italic text-[18px] text-white top-[32px] tracking-[-0.3px]">Consulting</p>
            <div className="absolute font-['Helvetica_Neue'] leading-[22px] left-[26px] not-italic text-[#6d7277] text-[14px] top-[62px] tracking-[-0.24px] whitespace-nowrap group-hover:text-white transition-colors duration-500 ease-out">
              <p className="mb-0">{`Brand strategy, reputation management, and `}</p>
              <p>leadership positioning for executives.</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate('consulting'); }}
              className="-translate-x-1/2 absolute content-stretch flex gap-[3px] items-center justify-center left-1/2 px-[16px] py-[8px] rounded-[80px] top-[320px] hover:bg-white/5 transition-colors duration-500 ease-out cursor-pointer"
            >
              <div aria-hidden="true" className="absolute border border-[#3f4147] border-solid inset-0 pointer-events-none rounded-[80px]" />
              <p className="font-['JetBrains_Mono'] font-normal leading-[normal] relative shrink-0 text-[11px] text-white tracking-[-0.18px]">LEARN MORE</p>
              <Frame />
            </button>
          </div>

          {/* Marketing & PR */}
          <div className="relative h-[400px] overflow-clip cursor-pointer group border-b lg:border-r-0 md:border-b-0 border-r border-[#3f4147]" onClick={() => onNavigate('marketing')}>
            <div className="absolute bg-[#0a0a0a] h-full w-full group-hover:bg-gradient-to-b group-hover:from-[#191e26] group-hover:to-[#0a0a0a] group-hover:to-[44.966%] transition-[background] duration-500 ease-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-[#7c7f87] transition-opacity duration-500 ease-out pointer-events-none" />
            
            <div className="absolute bg-white left-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] top-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white left-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
            <div className="absolute bg-white right-px size-[6px] bottom-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

            <div className="-translate-x-1/2 absolute bottom-[-2.91%] left-1/2 top-[41.39%] w-[225px] scale-75">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 266 275">
                <g opacity="0.5">
                  <mask fill="white" id="path-1-inside-1_1931_388">
                    <path d={svgPaths.p2388e280} />
                  </mask>
                  <path d={svgPaths.p2388e280} fill="var(--fill-0, #3F4147)" mask="url(#path-1-inside-1_1931_388)" stroke="var(--stroke-0, #0A0A0A)" strokeWidth="0.8" />
                </g>
              </svg>
            </div>
            <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[rgba(10,10,10,0)] h-[190px] left-1/2 to-[#0a0a0a] to-[79.167%] top-[210px] w-[90%]" />
            <p className="absolute font-['Helvetica_Neue'] leading-[normal] left-[26px] not-italic text-[18px] text-white top-[32px] tracking-[-0.3px]">{`Marketing & PR`}</p>
            <div className="absolute font-['Helvetica_Neue'] leading-[22px] left-[26px] not-italic text-[#6d7277] text-[14px] top-[62px] tracking-[-0.24px] whitespace-nowrap group-hover:text-white transition-colors duration-500 ease-out">
              <p className="mb-0">{`Integrated campaigns, print design, and `}</p>
              <p>performance assets that strengthen your brand.</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onNavigate('marketing'); }}
              className="absolute content-stretch flex gap-[3px] items-center justify-center left-[115px] px-[16px] py-[8px] rounded-[80px] top-[320px] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div aria-hidden="true" className="absolute border border-[#3f4147] border-solid inset-0 pointer-events-none rounded-[80px]" />
              <p className="font-['JetBrains_Mono'] font-normal leading-[normal] relative shrink-0 text-[11px] text-white tracking-[-0.18px]">LEARN MORE</p>
              <Frame />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}