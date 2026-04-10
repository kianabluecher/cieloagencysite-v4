import svgPaths from "./svg-ik5f6f6fzp";
import imgImage1 from "figma:asset/7047ae2b3693ff38a9096fd1dd276d40e5a786df.png";
import imgBackground from "figma:asset/cece1d2a9a3e03dc5af6face1c0cf2002f0bcaab.png";
import imgBackground1 from "figma:asset/0a6c754884a6cc8ff912afdbb7878ce88cec567b.png";
import imgBackground2 from "figma:asset/4ef59f71a33fac323f063715a946b269bed4d698.png";
import imgImage2 from "figma:asset/61e63c3ccf196b63ad689909771d2214039fca12.png";
import { imgVector, imgVector1, imgImage, imgGradient } from "./svg-vsy3n";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.5)] w-full">
        <p className="leading-[24px]">What do you want to know?</p>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-neutral-950 h-[120px] relative rounded-[24px] shadow-[0px_0px_0px_2px_#71717a] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-auto size-full">
        <div className="box-border content-stretch flex flex-col h-[120px] items-start pl-[16px] pr-[64px] py-[20px] relative w-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p31836600} fill="var(--fill-0, #0A0A0A)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ButtonSubmitAQueryToGrok() {
  return (
    <div className="bg-white box-border content-stretch flex items-center justify-center opacity-50 p-[11px] relative rounded-[9999px] shrink-0" data-name="Button - Submit a query to Grok">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      <Svg />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bottom-[10px] content-stretch flex items-center right-[10px] w-[38px]" data-name="Container">
      <ButtonSubmitAQueryToGrok />
    </div>
  );
}

function Form() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Form">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col items-start p-px relative w-full">
          <Textarea />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[768px] relative shrink-0 w-[768px]" data-name="Container">
      <Form />
    </div>
  );
}

function Container3() {
  return (
    <div className="box-border content-stretch flex items-end justify-center pb-0 pt-[196px] px-0 relative shrink-0 w-full" data-name="Container">
      <Container2 />
    </div>
  );
}

function Margin() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px pb-0 pt-[160px] px-0 relative shrink-0 w-full z-[2]" data-name="Margin">
      <Container3 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p3bdc9b80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-0 py-[8px] relative shrink-0" data-name="Container">
      <Svg1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start max-w-[672px] min-w-[512px] pl-0 pr-[25.62px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">
        <p className="mb-0">Grok 4 is the most intelligent model in the world. Available now to</p>
        <p>SuperGrok and Premium+ subscribers, as well as our API.</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Read announcement</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[17px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-end relative shrink-0" data-name="Container">
      <Link />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[48px] items-end relative shrink-0" data-name="Container">
      <Container5 />
      <Container7 />
    </div>
  );
}

function Container9() {
  return (
    <div className="box-border content-stretch flex items-end justify-between min-h-[160px] pb-[40px] pt-[72px] px-0 relative shrink-0 w-full z-[1]" data-name="Container">
      <Container4 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col isolate items-start px-[24px] py-0 relative size-full">
          <Margin />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute h-[640px] left-0 right-0 top-0" data-name="HorizontalBorder">
      <div className="box-border content-stretch flex flex-col items-start justify-center overflow-clip pb-[2px] pt-0 px-0 relative rounded-[inherit] size-full">
        <Container10 />
      </div>
      <div aria-hidden="true" className="absolute border-[#1f2228] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">[</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Products</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">]</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <div className="basis-0 flex flex-col font-['Helvetica:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[48px] text-white tracking-[-1.2px]">
        <p className="leading-[48px]">AI for all humanity</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function LinkHeading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link → Heading 3">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Grok</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#7d8187] text-[16px] w-full">
        <p className="mb-0">Grok is your cosmic guide, now</p>
        <p className="mb-0">accessible on grok.com, iOS, and</p>
        <p className="mb-0">Android. Explore the universe with</p>
        <p>AI.</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start max-w-[384px] min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <LinkHeading3 />
      <Container17 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col h-[204.05px] items-start justify-center max-w-[384px] pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container18 />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[0.17%_1.02%_-23.37%_29.34%]" data-name="Mask group">
      <div className="absolute inset-[-0.02%_0.88%_-23.63%_28.98%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[1.086px_0.383px] mask-size-[208.47px_255.197px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 210 257">
          <path d={svgPaths.p16694780} fill="url(#paint0_linear_1_442)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_442" x1="105.323" x2="105.323" y1="0.381183" y2="255.578">
              <stop stopColor="white" />
              <stop offset="0.802422" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MaskGroup1() {
  return (
    <div className="absolute bottom-[-37.5%] contents left-0 right-[27.56%] top-[16.23%]" data-name="Mask group">
      <div className="absolute inset-[15.97%_27.2%_-37.7%_-0.14%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[0.438px_0.539px] mask-size-[216.867px_251.188px]" data-name="Vector" style={{ maskImage: `url('${imgVector1}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 219 253">
          <path d={svgPaths.pc3db800} fill="url(#paint0_linear_1_464)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_464" x1="108.869" x2="108.869" y1="0.539354" y2="251.726">
              <stop stopColor="white" />
              <stop offset="0.802422" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute bottom-[-37.5%] contents left-0 right-[1.02%] top-[0.17%]" data-name="Group">
      <MaskGroup />
      <MaskGroup1 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="h-[207.127px] opacity-40 relative shrink-0 w-full" data-name="SVG">
      <Group2 />
    </div>
  );
}

function Container19() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start mb-[-27.02px] min-h-px min-w-px opacity-75 relative shrink-0 w-[299.38px]" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[12px]" data-name="Frame">
      <div className="absolute inset-[18.75%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d={svgPaths.p22ba0780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-2px] overflow-clip size-[12px] top-[4px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="h-[20px] relative shrink-0 w-[8px]" data-name="SVG:margin">
      <Svg3 />
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[15px] py-[7px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Use now</p>
      </div>
      <SvgMargin />
    </div>
  );
}

function Container20() {
  return (
    <div className="box-border content-stretch flex items-center justify-center mb-[-27.02px] relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function Container21() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-end min-h-px min-w-px pb-[27.02px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col h-[214.11px] items-start justify-center relative shrink-0 w-full" data-name="Margin">
      <Container21 />
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="mr-[-1px] relative self-stretch shrink-0 w-[325.33px]" data-name="VerticalBorder">
      <div className="box-border content-stretch flex flex-col gap-[40px] h-full items-start justify-center overflow-clip pl-[33px] pr-[32px] py-[32px] relative rounded-[inherit] w-[325.33px]">
        <Margin1 />
        <Margin2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#1f2228] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function LinkHeading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link → Heading 3">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">API</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#7d8187] text-[16px] w-full">
        <p className="mb-0">Supercharge your applications</p>
        <p className="mb-0">{`with Grok's enhanced speed,`}</p>
        <p className="mb-0">precision, and multilingual</p>
        <p>capabilities.</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start max-w-[384px] min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <LinkHeading4 />
      <Container22 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col h-[163.59px] items-start justify-center max-w-[384px] pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container23 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[0.43%_0.31%_-9.5%_0.45%]" data-name="Group">
      <div className="absolute inset-[0.43%_0.31%_-9.18%_0.45%]" data-name="Vector">
        <div className="absolute inset-[-0.12%_-0.1%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 261 224">
            <path d={svgPaths.pd510a80} id="Vector" stroke="url(#paint0_linear_1_473)" strokeWidth="0.535507" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_473" x1="130.67" x2="130.67" y1="0.732247" y2="223.725">
                <stop stopColor="white" />
                <stop offset="0.8" stopColor="#0A0A0A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[3.44%_93.37%_91.76%_3.31%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 10">
          <path d={svgPaths.p2db2a080} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[3.88%_7.57%_92.19%_83.21%]" data-name="Vector">
        <div className="absolute inset-[-3.33%_-1.11%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 10">
            <path d={svgPaths.p29f83200} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="0.535507" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[3.88%_2.65%_92.19%_94.27%]" data-name="Vector">
        <div className="absolute inset-[-3.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d={svgPaths.p12ad9fc0} id="Vector" stroke="var(--stroke-0, white)" strokeWidth="0.535507" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[11.03%_81.96%_-9.5%_18.04%]" data-name="Vector">
        <div className="absolute bottom-0 left-[-0.27px] right-[-0.27px] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 202">
            <path d="M1 0V201.431" id="Vector" stroke="url(#paint0_linear_1_459)" strokeWidth="0.535507" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_459" x1="nan" x2="nan" y1="nan" y2="nan">
                <stop stopColor="white" />
                <stop offset="0.8" stopColor="#0A0A0A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[11.15%_0.31%_88.85%_0.45%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 260 2">
            <path d="M259.341 1L0 1.00005" id="Vector" stroke="var(--stroke-0, white)" strokeWidth="0.535507" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="h-[204.564px] opacity-40 relative shrink-0 w-full" data-name="SVG">
      <Group3 />
    </div>
  );
}

function Container24() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px opacity-75 relative shrink-0 w-full" data-name="Container">
      <Svg4 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[12px]" data-name="Frame">
      <div className="absolute inset-[18.75%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d={svgPaths.p22ba0780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-2px] overflow-clip size-[12px] top-[4px]" data-name="SVG">
      <Frame1 />
    </div>
  );
}

function SvgMargin1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[8px]" data-name="SVG:margin">
      <Svg5 />
    </div>
  );
}

function Button1() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[15px] py-[7px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Build now</p>
      </div>
      <SvgMargin1 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Button1 />
    </div>
  );
}

function Container26() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[0.01px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col h-[254.56px] items-start justify-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container26 />
    </div>
  );
}

function VerticalBorder1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="VerticalBorder">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start justify-center pl-[33px] pr-[32px] py-[32px] relative size-full">
          <Margin3 />
          <Margin4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#1f2228] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Margin5() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center mr-[-1px] relative self-stretch shrink-0 w-[326.33px]" data-name="Margin">
      <VerticalBorder1 />
    </div>
  );
}

function LinkHeading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link → Heading 3">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[28px]">Developer Docs</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#7d8187] text-[16px] w-full">
        <p className="mb-0">Learn how to quickly install Grok at</p>
        <p className="mb-0">the heart of your applications and</p>
        <p className="mb-0">explore guides covering common</p>
        <p>use cases.</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start max-w-[384px] min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <LinkHeading5 />
      <Container27 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="box-border content-stretch flex flex-col h-[156px] items-start justify-center max-w-[384px] pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container28 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[7.85%_9.56%_-1.31%_2.1%]" data-name="Group">
      <div className="absolute inset-[7.85%_9.56%_-1.31%_2.1%]" data-name="Vector">
        <div className="absolute inset-[-0.14%_-0.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 233 193">
            <path d={svgPaths.p1ee74b00} fill="var(--fill-0, #0A0A0A)" id="Vector" stroke="url(#paint0_linear_1_446)" strokeWidth="0.534432" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_446" x1="116.437" x2="116.437" y1="3.13773" y2="193.395">
                <stop stopColor="white" />
                <stop offset="0.8" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[25.57%_19.26%_74.43%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.7" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[35.51%_19.26%_64.49%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.6" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.45%_19.26%_54.55%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.5" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[55.39%_19.26%_44.61%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.4" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[65.33%_19.26%_34.67%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.3" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[75.27%_19.26%_24.73%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.2" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[85.21%_19.26%_14.79%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.1" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="absolute h-[204.153px] left-[12.24%] right-[-12.24%] top-[-32px]" data-name="SVG">
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[7.85%_9.56%_-1.31%_2.1%]" data-name="Group">
      <div className="absolute inset-[7.85%_9.56%_-1.31%_2.1%]" data-name="Vector">
        <div className="absolute inset-[-0.14%_-0.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 233 193">
            <path d={svgPaths.p1ee74b00} fill="var(--fill-0, #0A0A0A)" id="Vector" stroke="url(#paint0_linear_1_446)" strokeWidth="0.534432" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_446" x1="116.437" x2="116.437" y1="3.13773" y2="193.395">
                <stop stopColor="white" />
                <stop offset="0.8" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[25.57%_19.26%_74.43%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.7" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[35.51%_19.26%_64.49%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.6" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.45%_19.26%_54.55%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.5" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[55.39%_19.26%_44.61%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.4" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[65.33%_19.26%_34.67%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.3" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[75.27%_19.26%_24.73%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.2" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[85.21%_19.26%_14.79%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.1" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="absolute h-[204.153px] left-[6.12%] right-[-6.12%] top-[-16px]" data-name="SVG">
      <Group5 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[7.85%_9.56%_-1.31%_2.1%]" data-name="Group">
      <div className="absolute inset-[7.85%_9.56%_-1.31%_2.1%]" data-name="Vector">
        <div className="absolute inset-[-0.14%_-0.12%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 233 193">
            <path d={svgPaths.p1ee74b00} fill="var(--fill-0, #0A0A0A)" id="Vector" stroke="url(#paint0_linear_1_446)" strokeWidth="0.534432" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_446" x1="116.437" x2="116.437" y1="3.13773" y2="193.395">
                <stop stopColor="white" />
                <stop offset="0.8" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute inset-[25.57%_19.26%_74.43%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.7" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[35.51%_19.26%_64.49%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.6" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.45%_19.26%_54.55%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.5" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[55.39%_19.26%_44.61%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.4" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[65.33%_19.26%_34.67%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.3" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[75.27%_19.26%_24.73%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.2" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[85.21%_19.26%_14.79%_11.38%]" data-name="Vector">
        <div className="absolute bottom-[-0.27px] left-0 right-0 top-[-0.27px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 182 2">
            <path d="M0 1H181.265" id="Vector" stroke="var(--stroke-0, white)" strokeOpacity="0.1" strokeWidth="0.534432" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="h-[204.153px] relative shrink-0 w-full" data-name="SVG">
      <Group6 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-40 relative shrink-0 w-full" data-name="Container">
      <Svg6 />
      <Svg7 />
      <Svg8 />
    </div>
  );
}

function Container30() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start min-h-px min-w-px opacity-75 pb-0 pt-[8px] px-0 relative shrink-0 w-full" data-name="Container">
      <Container29 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[12px]" data-name="Frame">
      <div className="absolute inset-[18.75%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d={svgPaths.p22ba0780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-2px] overflow-clip size-[12px] top-[4px]" data-name="SVG">
      <Frame2 />
    </div>
  );
}

function SvgMargin2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[8px]" data-name="SVG:margin">
      <Svg9 />
    </div>
  );
}

function Button2() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[15px] py-[7px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Learn more</p>
      </div>
      <SvgMargin2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Button2 />
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[8.527e_-14px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="box-border content-stretch flex flex-col h-[262.16px] items-start justify-center pb-0 pt-[16px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container32 />
    </div>
  );
}

function VerticalBorder2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="VerticalBorder">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[40px] items-start justify-center pl-[33px] pr-[32px] py-[32px] relative size-full">
          <Margin6 />
          <Margin7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#1f2228] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Margin8() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-center mr-[-1px] relative self-stretch shrink-0 w-[326.34px]" data-name="Margin">
      <VerticalBorder2 />
    </div>
  );
}

function Container33() {
  return (
    <div className="box-border content-stretch flex items-start justify-center pl-0 pr-px py-0 relative shrink-0 w-full" data-name="Container">
      <VerticalBorder />
      <Margin5 />
      <Margin8 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[128px] items-start left-0 px-[24px] py-0 right-0 top-[768px]" data-name="Section">
      <Container16 />
      <Container33 />
    </div>
  );
}

function Container34() {
  return <div className="shrink-0 size-[1000px]" data-name="Container" />;
}

function Container35() {
  return (
    <div className="box-border content-stretch flex flex-col items-start min-w-[417.47px] px-0 py-[8px] relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-l flex flex-col font-['Helvetica:Regular',_sans-serif] from-[#7d8187] justify-center leading-[0] not-italic relative shrink-0 text-[80px] text-nowrap to-[#ffffff] tracking-[-2px]" style={{ WebkitTextFillColor: "transparent" }}>
        <p className="leading-[80px] whitespace-pre">Understand</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex items-start max-w-inherit pl-[50px] pr-[508.53px] py-0 relative w-full">
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-0 py-[8px] relative self-stretch shrink-0" data-name="Container">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['Helvetica:Regular',_sans-serif] from-[#7d8187] justify-center leading-[0] not-italic relative shrink-0 text-[80px] text-nowrap to-[#ffffff] tracking-[-2px]" style={{ WebkitTextFillColor: "transparent" }}>
        <p className="leading-[80px] whitespace-pre">The Universe</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-end max-w-inherit size-full">
        <div className="box-border content-stretch flex items-start justify-end max-w-inherit pl-[462.14px] pr-[50px] py-0 relative w-full">
          <Container37 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[2.19%_24px] items-start justify-center" data-name="Container">
      <Container36 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute box-border content-stretch flex items-start justify-center left-0 overflow-clip pb-[96px] pt-0 px-0 right-0 top-[1662.16px]" data-name="Container">
      <Container34 />
      <Container39 />
    </div>
  );
}

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

function MaskGroup2() {
  return (
    <div className="absolute h-[500px] left-[-400px] right-[-400px] top-[-128px]" data-name="Mask Group">
      <div className="absolute h-[500px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0px] mask-size-[100%_500px] right-0 top-0" data-name="Gradient" style={{ maskImage: `url('${imgGradient}')` }} />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[11.25%_2.42%_8.75%_2.17%]" data-name="Group">
      <div className="absolute bottom-[-1.63%] left-0 right-0 top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 66">
          <g filter="url(#filter0_d_1_456)" id="Group">
            <path clipRule="evenodd" d={svgPaths.p33e36f00} fill="url(#paint0_linear_1_456)" fillRule="evenodd" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="65.0417" id="filter0_d_1_456" width="295.754" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1.04167" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_456" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_456" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_456" x1="147.877" x2="147.877" y1="0" y2="64.0001">
              <stop stopColor="white" stopOpacity="0.9" />
              <stop offset="1" stopColor="white" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Svg10() {
  return (
    <div className="h-[80px] relative shrink-0 w-[310px]" data-name="SVG">
      <Group7 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-center min-w-[438.44px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7d8187] text-[20px] text-center text-nowrap whitespace-pre">
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

function Margin9() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Margin">
      <Container41 />
    </div>
  );
}

function Container42() {
  return (
    <div className="box-border content-stretch flex flex-col items-center min-w-[512px] px-[22.73px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[#7d8187] text-[20px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">
          <span>{`We've just launched `}</span>
          <span className="text-white">SuperGrok Heavy</span>, providing
        </p>
        <p>access to Grok Heavy and much higher rate limits.</p>
      </div>
    </div>
  );
}

function Margin10() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Margin">
      <Container42 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Frame">
      <div className="absolute inset-[18.75%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d="M1 11L11 1M11 1H3.5M11 1V8.5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg11() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-2px] overflow-clip size-[16px] top-[4px]" data-name="SVG">
      <Frame3 />
    </div>
  );
}

function SvgMargin3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[12px]" data-name="SVG:margin">
      <Svg11 />
    </div>
  );
}

function Link1() {
  return (
    <div className="box-border content-stretch flex gap-[12.01px] items-center justify-center px-[17px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Sign up now</p>
      </div>
      <SvgMargin3 />
    </div>
  );
}

function LinkMargin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Link:margin">
      <Link1 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[512px] relative shrink-0" data-name="Container">
      <Svg10 />
      <Margin9 />
      <Margin10 />
      <LinkMargin />
    </div>
  );
}

function Container44() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-0 py-[24px] relative shrink-0 w-full" data-name="Container">
      <CanvasMaskGroup />
      <div className="absolute bg-gradient-to-r from-[rgba(255,255,255,0)] h-px left-0 opacity-40 right-0 to-[rgba(255,255,255,0)] top-[-128px] via-50% via-[#ffffff]" data-name="Horizontal Divider" />
      <MaskGroup2 />
      <Container43 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 overflow-clip px-[24px] py-[128px] right-0 top-[2758.16px]" data-name="Section">
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">[</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Blog</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">]</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Container46 />
      <Container47 />
    </div>
  );
}

function Link2() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[17px] py-[9px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Explore more</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Link2 />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex items-end relative shrink-0" data-name="Container">
      <Container49 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-nowrap text-white tracking-[-1.2px]">
        <p className="leading-[48px] whitespace-pre">Latest news</p>
      </div>
      <Container50 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container51 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[24px]">July 09, 2025</p>
      </div>
    </div>
  );
}

function LinkHeading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link → Heading 3">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[24px]">Grok 4</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#7d8187] text-[16px] w-full">
        <p className="mb-0">Grok 4 is the most intelligent model in the world. It</p>
        <p className="mb-0">includes native tool use and real-time search integration,</p>
        <p className="mb-0">and is available now to SuperGrok and Premium+</p>
        <p className="mb-0">subscribers, as well as through the xAI API. We are also</p>
        <p className="mb-0">introducing a new SuperGrok Heavy tier with access</p>
        <p>to Grok 4 Heavy - the most powerful version of Grok 4.</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <LinkHeading6 />
      <Container54 />
    </div>
  );
}

function Container56() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[3px] pt-[5px] px-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[12px] text-nowrap tracking-[1.2px] uppercase">
        <p className="leading-[16px] whitespace-pre">grok</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[15px] py-[7px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Read</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Button3 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Margin11() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container58 />
    </div>
  );
}

function Container59() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <Container55 />
      <Margin11 />
    </div>
  );
}

function Container60() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[48px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container53 />
      <Container59 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="bg-neutral-950 content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[29.648px] text-nowrap text-white tracking-[-0.9px] uppercase">
        <p className="leading-[36px] whitespace-pre">Grok 4</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-neutral-950 box-border content-stretch flex items-start px-[12px] py-[8px] relative shrink-0" data-name="Background">
      <Heading2 />
    </div>
  );
}

function Container61() {
  return (
    <div className="basis-0 content-stretch flex grow h-full items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Background />
    </div>
  );
}

function Background1() {
  return (
    <div className="content-stretch flex items-center justify-center min-h-[290px] relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#0c0c0b] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-11.09%] max-w-none top-0 w-[111.09%]" src={imgBackground} />
        </div>
      </div>
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Container61 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Background1 />
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="box-border content-stretch flex gap-[48px] items-start justify-center min-h-[443px] pb-[64px] pt-[65px] px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#1f2228] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container60 />
      <Container62 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder1 />
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[24px]">February 19, 2025</p>
      </div>
    </div>
  );
}

function LinkHeading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link → Heading 3">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[24px]">Grok 3 Beta — The Age of Reasoning Agents</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#7d8187] text-[16px] w-full">
        <p className="mb-0">We are thrilled to unveil an early preview of Grok 3,</p>
        <p className="mb-0">our most advanced model yet, blending superior</p>
        <p>reasoning with extensive pretraining knowledge.</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <LinkHeading7 />
      <Container65 />
    </div>
  );
}

function Container67() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[3px] pt-[5px] px-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[12px] text-nowrap tracking-[1.2px] uppercase">
        <p className="leading-[16px] whitespace-pre">grok</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[15px] py-[7px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Read</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Button4 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Container68 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container69 />
    </div>
  );
}

function Container70() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <Container66 />
      <Margin12 />
    </div>
  );
}

function Container71() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[48px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container64 />
      <Container70 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="bg-neutral-950 content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[29.648px] text-nowrap text-white tracking-[-0.9px] uppercase">
        <p className="leading-[36px] whitespace-pre">Grok 3</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-neutral-950 box-border content-stretch flex items-start px-[12px] py-[8px] relative shrink-0" data-name="Background">
      <Heading3 />
    </div>
  );
}

function Container72() {
  return (
    <div className="basis-0 content-stretch flex grow h-full items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Background2 />
    </div>
  );
}

function Background3() {
  return (
    <div className="content-stretch flex items-center justify-center min-h-[290px] relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#0c0c0b] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-11.09%] max-w-none top-0 w-[111.09%]" src={imgBackground1} />
        </div>
      </div>
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Container72 />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Background3 />
    </div>
  );
}

function HorizontalBorder2() {
  return (
    <div className="box-border content-stretch flex gap-[48px] items-start justify-center pb-[64px] pt-[65px] px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#1f2228] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container71 />
      <Container73 />
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder2 />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[12px] tracking-[1.2px] uppercase w-full">
        <p className="leading-[24px]">December 23, 2024</p>
      </div>
    </div>
  );
}

function LinkHeading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Link → Heading 3">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
        <p className="leading-[24px]">xAI raises $6B Series C</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[#7d8187] text-[16px] w-full">
        <p className="mb-0">We are partnering with A16Z, Blackrock, Fidelity Management</p>
        <p className="mb-0">{`& Research Company, Kingdom Holdings, Lightspeed,`}</p>
        <p className="mb-0">MGX, Morgan Stanley, OIA, QIA, Sequoia Capital,</p>
        <p>Valor Equity Partners and Vy Capital, amongst others.</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[16px] grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <LinkHeading8 />
      <Container76 />
    </div>
  );
}

function Container78() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-[3px] pt-[5px] px-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[12px] text-nowrap tracking-[1.2px] uppercase">
        <p className="leading-[16px] whitespace-pre">company</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[15px] py-[7px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Read</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Button5 />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container78 />
      <Container79 />
    </div>
  );
}

function Margin13() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Margin">
      <Container80 />
    </div>
  );
}

function Container81() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <Container77 />
      <Margin13 />
    </div>
  );
}

function Container82() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[48px] grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container75 />
      <Container81 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="bg-neutral-950 content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Heading 2">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[27.891px] text-nowrap text-white tracking-[-0.9px] uppercase">
        <p className="leading-[36px] whitespace-pre">Series C</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-neutral-950 box-border content-stretch flex items-start px-[12px] py-[8px] relative shrink-0" data-name="Background">
      <Heading4 />
    </div>
  );
}

function Container83() {
  return (
    <div className="basis-0 content-stretch flex grow h-full items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Background4 />
    </div>
  );
}

function Background5() {
  return (
    <div className="content-stretch flex items-center justify-center min-h-[290px] relative shrink-0 w-full" data-name="Background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#0c0c0b] inset-0" />
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-full left-[-11.09%] max-w-none top-0 w-[111.09%]" src={imgBackground2} />
        </div>
      </div>
      <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
        <Container83 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Background5 />
    </div>
  );
}

function HorizontalBorder3() {
  return (
    <div className="box-border content-stretch flex gap-[48px] items-start justify-center pb-[64px] pt-[65px] px-0 relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#1f2228] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container82 />
      <Container84 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <HorizontalBorder3 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container63 />
      <Container74 />
      <Container85 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[128px] items-start left-0 px-[24px] py-0 right-0 top-[3520.16px]" data-name="Section">
      <Container52 />
      <Container86 />
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 right-0 top-px" data-name="Container">
      <div className="h-[756px] relative shrink-0 w-full" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-50.61%] max-w-none top-0 w-[201.22%]" src={imgImage2} />
        </div>
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-0 py-[2px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[20px]">Try Grok On</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Web</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link3 />
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">iOS</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link4 />
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Android</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link5 />
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Grok on X</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link6 />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Container88 />
      <Container89 />
      <Container90 />
      <Container91 />
      <Container92 />
    </div>
  );
}

function Container94() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container93 />
    </div>
  );
}

function Container95() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-0 py-[2px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[20px]">Products</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Grok</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link7 />
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">API</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link8 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Container95 />
      <Container96 />
      <Container97 />
    </div>
  );
}

function Container99() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container98 />
    </div>
  );
}

function Container100() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-0 py-[2px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[20px]">Company</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Company</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link9 />
    </div>
  );
}

function Link10() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Careers</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link10 />
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Contact</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link11 />
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">News</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link12 />
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Container100 />
      <Container101 />
      <Container102 />
      <Container103 />
      <Container104 />
    </div>
  );
}

function Container106() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container105 />
    </div>
  );
}

function Container107() {
  return (
    <div className="box-border content-stretch flex flex-col items-start px-0 py-[2px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#7d8187] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[20px]">Resources</p>
      </div>
    </div>
  );
}

function Link13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Documentation</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link13 />
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Privacy policy</p>
      </div>
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link14 />
    </div>
  );
}

function Link15() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Security</p>
      </div>
    </div>
  );
}

function Container110() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link15 />
    </div>
  );
}

function Link16() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Legal</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link16 />
    </div>
  );
}

function Link17() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Helvetica:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Status</p>
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link17 />
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Container107 />
      <Container108 />
      <Container109 />
      <Container110 />
      <Container111 />
      <Container112 />
    </div>
  );
}

function Container114() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative self-stretch shrink-0" data-name="Container">
      <Container113 />
    </div>
  );
}

function Section3() {
  return (
    <div className="content-stretch flex gap-[64px] items-start justify-center relative shrink-0 w-full" data-name="Section">
      <Container94 />
      <Container99 />
      <Container106 />
      <Container114 />
    </div>
  );
}

function HorizontalBorder4() {
  return (
    <div className="absolute left-0 right-0 top-[5173.16px]" data-name="HorizontalBorder">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip pb-[384px] pt-[129px] px-[24px] relative rounded-[inherit] w-full">
        <Container87 />
        <Section3 />
      </div>
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(31,34,40,0.5)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Html() {
  return <div className="absolute bg-white h-[8px] left-0 right-0 top-0" data-name="Html" />;
}

function Iframe() {
  return (
    <div className="absolute left-0 overflow-clip size-px top-0" data-name="Iframe">
      <Html />
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="SVG">
          <path d={svgPaths.p20124100} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function LinkXAiHomepage() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link - xAI Homepage">
      <Svg12 />
    </div>
  );
}

function Link18() {
  return (
    <div className="box-border content-stretch flex items-start px-[12px] py-[4px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Grok</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Item">
      <Link18 />
    </div>
  );
}

function Link19() {
  return (
    <div className="box-border content-stretch flex items-start px-[12px] py-[4px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">API</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Item">
      <Link19 />
    </div>
  );
}

function Link20() {
  return (
    <div className="box-border content-stretch flex items-start px-[12px] py-[4px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Company</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Item">
      <Link20 />
    </div>
  );
}

function Link21() {
  return (
    <div className="box-border content-stretch flex items-start px-[12px] py-[4px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Colossus</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Item">
      <Link21 />
    </div>
  );
}

function Link22() {
  return (
    <div className="box-border content-stretch flex items-start px-[12px] py-[4px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Careers</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Item">
      <Link22 />
    </div>
  );
}

function Link23() {
  return (
    <div className="box-border content-stretch flex items-start px-[12px] py-[4px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-[rgba(255,255,255,0.5)] text-nowrap tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">News</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Item">
      <Link23 />
    </div>
  );
}

function List() {
  return (
    <div className="absolute content-stretch flex gap-[16px] items-start left-[12px] right-[0.41px] top-[-2px]" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
      <Item5 />
    </div>
  );
}

function ListMargin() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="List:margin">
      <List />
    </div>
  );
}

function Link24() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-[17px] py-[9px] relative rounded-[9999px] self-stretch shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Try Grok</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="box-border content-stretch flex items-start pl-0 pr-[8px] py-0 relative shrink-0" data-name="Container">
      <Link24 />
    </div>
  );
}

function Nav() {
  return (
    <div className="box-border content-stretch flex h-[80px] items-center justify-between px-0 py-[16px] relative shrink-0 w-full" data-name="Nav">
      <LinkXAiHomepage />
      <ListMargin />
      <Container115 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 px-[24px] py-0 top-0 w-[1024px]" data-name="Header">
      <Nav />
    </div>
  );
}

export default function Component1024WLight() {
  return (
    <div className="relative size-full" data-name="1024w light" style={{ backgroundImage: "linear-gradient(90deg, rgb(10, 10, 10) 0%, rgb(10, 10, 10) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Header />
      <HorizontalBorder />
      <Section />
      <Container40 />
      <Section1 />
      <Section2 />
      <HorizontalBorder4 />
      <Iframe />
    </div>
  );
}