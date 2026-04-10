import svgPaths from "./svg-tcuqlndjlt";
import imgImage1 from "figma:asset/7047ae2b3693ff38a9096fd1dd276d40e5a786df.png";
import { imgImage, imgGradient } from "./svg-10son";

function Image() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[976px_378px]" data-name="image" style={{ maskImage: `url('${imgImage}')` }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage1} />
      </div>
    </div>
  );
}

function CanvasMaskGroup() {
  return (
    <div className="absolute bottom-[33.86%] left-0 right-0 top-[-33.86%]" data-name="Canvas:mask-group">
      <Image />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute h-[500px] left-[-400px] right-[-400px] top-[-128px]" data-name="Mask Group">
      <div className="absolute h-[500px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0px] mask-size-[100%_500px] right-0 top-0" data-name="Gradient" style={{ maskImage: `url('${imgGradient}')` }} />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[11.25%_2.42%_8.75%_2.17%]" data-name="Group">
      <div className="absolute bottom-[-1.63%] left-0 right-0 top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 66">
          <g filter="url(#filter0_d_514_817)" id="Group">
            <path clipRule="evenodd" d={svgPaths.p33e36f00} fill="url(#paint0_linear_514_817)" fillRule="evenodd" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="65.0417" id="filter0_d_514_817" width="295.754" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.04167" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_514_817" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_514_817" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_514_817" x1="147.877" x2="147.877" y1="0" y2="64.0001">
              <stop stopColor="white" stopOpacity="0.9" />
              <stop offset="1" stopColor="white" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[80px] relative shrink-0 w-[310px]" data-name="SVG">
      <Group />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center min-w-[438.44px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7d8187] text-[20px] text-center text-nowrap whitespace-pre">
        <p className="leading-[28px] mb-0">Do more with Grok.</p>
        <p className="leading-[28px]">
          <span>{`Unlock a `}</span>
          <span className="text-white">SuperGrok</span>
          <span>{` subscription on Grok.com.`}</span>
        </p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Margin">
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="box-border content-stretch flex flex-col items-center min-w-[512px] px-[22.73px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[#7d8187] text-[20px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">
          <span>{`We've just launched `}</span>
          <span className="text-white">SuperGrok Heavy</span>, providing
        </p>
        <p>access to Grok Heavy and much higher rate limits.</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Frame">
      <div className="absolute inset-[18.75%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
            <path d={svgPaths.pbb74a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-2px] overflow-clip size-[16px] top-[4px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="h-[24px] relative shrink-0 w-[12px]" data-name="SVG:margin">
      <Svg1 />
    </div>
  );
}

function Link() {
  return (
    <div className="box-border content-stretch flex gap-[12.01px] items-center justify-center px-[17px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Sign up now</p>
      </div>
      <SvgMargin />
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Link:margin">
      <Link />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[512px] relative shrink-0" data-name="Container">
      <Svg />
      <Margin />
      <Margin1 />
      <LinkMargin />
    </div>
  );
}

function Container3() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-0 py-[24px] relative shrink-0 w-full" data-name="Container">
      <CanvasMaskGroup />
      <div className="absolute bg-gradient-to-r from-[rgba(255,255,255,0)] h-px left-0 opacity-40 right-0 to-[rgba(255,255,255,0)] top-[-128px] via-50% via-[#ffffff]" data-name="Horizontal Divider" />
      <MaskGroup />
      <Container2 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="relative size-full" data-name="Section">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[24px] py-[128px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}