import svgPaths from "./svg-c0s107dilb";

function Group() {
  return (
    <div className="absolute inset-[33.59%_10.14%_33.66%_10.16%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 8">
        <g id="Group">
          <path d={svgPaths.p65e6300} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative size-[22px]" data-name="SVG">
      <Group />
    </div>
  );
}

export default function Frame28016() {
  return (
    <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.08)] relative rounded-[120px] size-full">
      <div aria-hidden="true" className="absolute border border-[#484d54] border-solid inset-0 pointer-events-none rounded-[120px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[6px] items-center px-[24px] py-[8px] relative size-full">
          <div className="flex flex-col font-['Helvetica_Neue:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white uppercase">
            <p className="leading-[16.8px] whitespace-pre">GET Free Branding Consultation</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <Svg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}