import svgPaths from "./svg-ruxnnh5eqx";

function Frame3() {
  return (
    <div className="absolute bg-black h-[70px] left-[65px] rounded-[20px] top-[593px] w-[294px]">
      <p className="absolute font-['Helvetica_Neue:Regular',_sans-serif] leading-[1.2] left-1/2 not-italic text-[28px] text-center text-white top-[calc(50%-17px)] tracking-[-0.56px] translate-x-[-50%] w-[294px]">Starting at $XX,XXX</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute h-[41px] left-[calc(50%+0.5px)] rounded-[20px] top-[452px] translate-x-[-50%] w-[247px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="absolute flex flex-col font-['DM_Mono:Regular',_sans-serif] justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[18px] text-black text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%] uppercase">
        <p className="leading-[1.4] whitespace-pre">Full Brand Identity</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute h-[41px] left-[calc(50%+0.5px)] rounded-[20px] top-[505px] translate-x-[-50%] w-[247px]">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.5)] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="absolute flex flex-col font-['DM_Mono:Regular',_sans-serif] justify-center leading-[0] left-[calc(50%+0.5px)] not-italic text-[18px] text-black text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%] uppercase">
        <p className="leading-[1.4] whitespace-pre">5-10 Page Website</p>
      </div>
    </div>
  );
}

function Star() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="star">
          <mask height="20" id="mask0_68_168" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_68_168)">
            <path d={svgPaths.p1bf65e00} fill="var(--fill-0, black)" id="star_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#08bf7d] box-border content-stretch flex gap-[5.308px] h-[46px] items-center left-[calc(50%+0.385px)] px-[21.231px] py-[7.077px] rounded-[106.154px] top-[22px] translate-x-[-50%]">
      <Star />
      <div className="flex flex-col font-['Helvetica_Neue:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-center text-nowrap uppercase">
        <p className="leading-[14.862px] whitespace-pre">RECOMMENDED</p>
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="relative size-full">
      <p className="absolute font-['Helvetica_Neue:Regular',_sans-serif] leading-[1.2] left-1/2 not-italic text-[36px] text-black text-center top-[121px] tracking-[-0.72px] translate-x-[-50%] w-[320px]">{`Brand Development & Launch`}</p>
      <Frame3 />
      <p className="absolute font-['Helvetica_Neue:Regular',_sans-serif] leading-[1.5] left-1/2 not-italic opacity-60 text-[20px] text-black text-center top-[231px] tracking-[-0.4px] translate-x-[-50%] w-[294px]">Comprehensive brand identity and multi-page website for established businesses.</p>
      <Frame1 />
      <Frame2 />
      <Frame />
    </div>
  );
}