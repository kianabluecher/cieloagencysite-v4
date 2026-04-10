import imgAwgdzAdAgBkzKp5MHBax1CvSrUPng from "figma:asset/71074b6cee4e30f33d3f62dce5f1478bbcdee056.png";
import imgWq7OcJThxH3QhnSivm9SmtIkP0QPng from "figma:asset/64bd10df4f86cbf0b5bc8c50bf577d732c22e1e3.png";
import imgXeWv1YoJrgXifPgyv9P1HG6XBUsPng from "figma:asset/cf2676de16bde52abed83e9f2b78ed0770e5feaf.png";
import imgInRu1OlBHrsR5MU4FPvNsHzKv0Png from "figma:asset/f20d96f19c37b93e31b5416c25ec9d526581a344.png";

function Dot() {
  return <div className="bg-blue-600 rounded-[9999px] shrink-0 size-[8px]" data-name="Dot" />;
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist_Mono:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap text-zinc-900">
        <p className="leading-[14.4px] whitespace-pre">Feedback loops</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Badge">
      <Container />
    </div>
  );
}

function BadgeDot() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[8px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Badge + Dot">
      <Dot />
      <div className="absolute bottom-[-13.08%] left-0 right-0 rounded-[9999px] top-0" data-name="Border">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[9999px]" />
      </div>
      <Badge />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <BadgeDot />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[48px] text-center text-zinc-900 tracking-[-1.2px] w-full">
        <p className="leading-[52.8px]">Chaos to control</p>
      </div>
    </div>
  );
}

function ImproveCollaborationWithYourTeamMembersAndClients() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[672px]" data-name="Improve collaboration with your team members and clients">
      <Heading />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[18px] text-center text-zinc-900 w-full">
        <p className="leading-[27px]">Our tool is designed to help you focus on what really matters.</p>
      </div>
    </div>
  );
}

function OurProjectManagementToolIsDesignedSpecificallyForDesignersWithFeaturesThatCaterToTheUniqueNeedsOfTheIndustry() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[672px]" data-name="Our project management tool is designed specifically for designers, with features that cater to the unique needs of the industry.">
      <Container2 />
    </div>
  );
}

function Centered() {
  return (
    <div className="content-stretch flex flex-col gap-[23.99px] items-center justify-center max-w-[672px] relative shrink-0" data-name="Centered">
      <ImproveCollaborationWithYourTeamMembersAndClients />
      <OurProjectManagementToolIsDesignedSpecificallyForDesignersWithFeaturesThatCaterToTheUniqueNeedsOfTheIndustry />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center overflow-clip relative shrink-0 w-[1152px]" data-name="Header">
      <Container1 />
      <Centered />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-zinc-900 w-full">
        <p className="leading-[15.4px]">Project centralization</p>
      </div>
    </div>
  );
}

function ProjectDashboard() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Project Dashboard">
      <Heading1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex items-start justify-center relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <ProjectDashboard />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist:Regular',_sans-serif] font-normal justify-center leading-[21px] relative shrink-0 text-[14px] text-zinc-600 w-full">
        <p className="mb-0">Centralize all project-related information, enhancing</p>
        <p>oversight and simplifying project management.</p>
      </div>
    </div>
  );
}

function KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Keep track of all your design projects in one place, with real-time updates and progress tracking">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
      <KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking />
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Left">
      <Container3 />
      <Container5 />
    </div>
  );
}

function AwgdzAdAgBkzKp5MHBax1CvSrUPng() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-full" data-name="awgdzAdAgBkzKP5mHBax1CvSrU.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[20px] rounded-tr-[20px]">
        <img alt="" className="absolute h-[185.49%] left-0 max-w-none top-0 w-full" src={imgAwgdzAdAgBkzKp5MHBax1CvSrUPng} />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center rounded-tl-[20px] rounded-tr-[20px]" data-name="Container">
      <AwgdzAdAgBkzKp5MHBax1CvSrUPng />
    </div>
  );
}

function Border() {
  return (
    <div className="absolute inset-0 rounded-tl-[20px] rounded-tr-[20px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-tl-[20px] rounded-tr-[20px]" />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[455px] overflow-clip relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-[390px]" data-name="Image">
      <Container6 />
      <Border />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white bottom-[359.39px] box-border content-stretch flex flex-col items-center justify-between left-0 overflow-clip pb-0 pt-[39px] px-[40px] right-[580px] rounded-[20px] top-0" data-name="Card">
      <Left />
      <div className="absolute inset-0 rounded-[20px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <Image />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-zinc-900 w-full">
        <p className="leading-[15.4px]">Task management</p>
      </div>
    </div>
  );
}

function ProjectDashboard1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Project Dashboard">
      <Heading2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <ProjectDashboard1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist:Regular',_sans-serif] font-normal justify-center leading-[21px] relative shrink-0 text-[14px] text-zinc-600 w-full">
        <p className="mb-0">Keep track of all your design projects in one</p>
        <p>place, with real-time updates and progress.</p>
      </div>
    </div>
  );
}

function KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Keep track of all your design projects in one place, with real-time updates and progress tracking">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
      <KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking1 />
    </div>
  );
}

function Stacked() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Stacked">
      <Container7 />
      <Container9 />
    </div>
  );
}

function Wq7OcJThxH3QhnSivm9SmtIkP0QPng() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="WQ7ocJThxH3qhnSivm9smtIkP0Q.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[8px] rounded-tr-[8px]">
        <img alt="" className="absolute h-[202.38%] left-0 max-w-none top-0 w-full" src={imgWq7OcJThxH3QhnSivm9SmtIkP0QPng} />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center rounded-tl-[8px] rounded-tr-[8px]" data-name="Container">
      <Wq7OcJThxH3QhnSivm9SmtIkP0QPng />
    </div>
  );
}

function Border1() {
  return (
    <div className="absolute inset-0 rounded-tl-[8px] rounded-tr-[8px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[172px] overflow-clip relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-[536px]" data-name="Image">
      <Container10 />
      <Border1 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white bottom-[718.78px] box-border content-stretch flex flex-col items-center justify-between left-[580px] overflow-clip pb-0 pt-[39px] px-[40px] right-0 rounded-[20px] top-0" data-name="Card">
      <Stacked />
      <div className="absolute inset-0 rounded-[20px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <Image1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-zinc-900 w-full">
        <p className="leading-[15.4px]">Robust security</p>
      </div>
    </div>
  );
}

function ProjectDashboard2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Project Dashboard">
      <Heading3 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <ProjectDashboard2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist:Regular',_sans-serif] font-normal justify-center leading-[21px] relative shrink-0 text-[14px] text-zinc-600 w-full">
        <p className="mb-0">Advanced security measures safeguard your data</p>
        <p>from unauthorized access and potential threats.</p>
      </div>
    </div>
  );
}

function KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Keep track of all your design projects in one place, with real-time updates and progress tracking">
      <Container12 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
      <KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking2 />
    </div>
  );
}

function Stacked1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Stacked">
      <Container11 />
      <Container13 />
    </div>
  );
}

function XeWv1YoJrgXifPgyv9P1HG6XBUsPng() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[20px] shrink-0 w-full" data-name="xeWv1YoJRGXifPgyv9P1hG6xBUs.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
        <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[100.22%]" src={imgXeWv1YoJrgXifPgyv9P1HG6XBUsPng} />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center rounded-[20px]" data-name="Container">
      <XeWv1YoJrgXifPgyv9P1HG6XBUsPng />
    </div>
  );
}

function Image2() {
  return (
    <div className="h-[90px] overflow-clip relative rounded-[20px] shrink-0 w-[484px]" data-name="Image">
      <Container14 />
      <div className="absolute inset-0 rounded-[20px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[20px]" />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-white bottom-[359.39px] box-border content-stretch flex flex-col gap-[40px] items-center left-[580px] overflow-clip pb-[116px] pt-[39px] px-[40px] right-0 rounded-[20px] top-[359.39px]" data-name="Card">
      <Stacked1 />
      <Image2 />
      <div className="absolute inset-0 rounded-[20px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[20px]" />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-zinc-900 w-full">
        <p className="leading-[15.4px]">Commitment calendar</p>
      </div>
    </div>
  );
}

function ProjectDashboard3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Project Dashboard">
      <Heading4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <ProjectDashboard3 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist:Regular',_sans-serif] font-normal justify-center leading-[21px] relative shrink-0 text-[14px] text-zinc-600 w-full">
        <p className="mb-0">Visualize all your commitments in one place,</p>
        <p>ensuring no overlaps and perfect scheduling.</p>
      </div>
    </div>
  );
}

function KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Keep track of all your design projects in one place, with real-time updates and progress tracking">
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
      <KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking3 />
    </div>
  );
}

function Stacked2() {
  return (
    <div className="mb-[-5.684e_-13px] relative shrink-0 w-full" data-name="Stacked">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-[40px] pt-[39px] px-[40px] relative w-full">
          <Container15 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Wq7OcJThxH3QhnSivm9SmtIkP0QPng1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="WQ7ocJThxH3qhnSivm9smtIkP0Q.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[8px] rounded-tr-[8px]">
        <img alt="" className="absolute h-[170.23%] left-0 max-w-none top-0 w-full" src={imgWq7OcJThxH3QhnSivm9SmtIkP0QPng} />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center rounded-tl-[8px] rounded-tr-[8px]" data-name="Container">
      <Wq7OcJThxH3QhnSivm9SmtIkP0QPng1 />
    </div>
  );
}

function Border2() {
  return (
    <div className="absolute inset-0 rounded-tl-[8px] rounded-tr-[8px]" data-name="Border">
      <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-tl-[8px] rounded-tr-[8px]" />
    </div>
  );
}

function Image3() {
  return (
    <div className="h-[206px] mb-[-5.684e_-13px] relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-[540px]" data-name="Image">
      <Container18 />
      <Border2 />
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center left-0 overflow-clip right-[580px] rounded-[20px] top-[718.78px]" data-name="Card">
      <Stacked2 />
      <div className="absolute bottom-[0.07%] left-0 right-0 rounded-[20px] top-0" data-name="Border">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[20px]" />
      </div>
      <Image3 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Geist:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-zinc-900 w-full">
        <p className="leading-[15.4px]">Seamless integrations</p>
      </div>
    </div>
  );
}

function ProjectDashboard4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Project Dashboard">
      <Heading5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <ProjectDashboard4 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geist:Regular',_sans-serif] font-normal justify-center leading-[21px] relative shrink-0 text-[14px] text-zinc-600 w-full">
        <p className="mb-0">Connect seamlessly with other tools to create</p>
        <p>a unified workflow and increase efficiency.</p>
      </div>
    </div>
  );
}

function KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Keep track of all your design projects in one place, with real-time updates and progress tracking">
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
      <KeepTrackOfAllYourDesignProjectsInOnePlaceWithRealTimeUpdatesAndProgressTracking4 />
    </div>
  );
}

function Stacked3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Stacked">
      <Container19 />
      <Container21 />
    </div>
  );
}

function InRu1OlBHrsR5MU4FPvNsHzKv0Png() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[20px] shrink-0 w-full" data-name="inRu1olBHrsR5mU4fPVNsHzKv0.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[20px]">
        <img alt="" className="absolute h-full left-[0.06%] max-w-none top-0 w-[99.89%]" src={imgInRu1OlBHrsR5MU4FPvNsHzKv0Png} />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center rounded-[20px]" data-name="Container">
      <InRu1OlBHrsR5MU4FPvNsHzKv0Png />
    </div>
  );
}

function Image4() {
  return (
    <div className="h-[140px] overflow-clip relative rounded-[20px] shrink-0 w-[276px]" data-name="Image">
      <Container22 />
      <div className="absolute inset-0 rounded-[20px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[20px]" />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex flex-col gap-[20px] items-center left-[580px] overflow-clip pb-[86px] pt-[39px] px-[40px] right-0 rounded-[20px] top-[718.78px]" data-name="Card">
      <Stacked3 />
      <Image4 />
      <div className="absolute inset-0 rounded-[20px]" data-name="Border">
        <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-[20px]" />
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="h-[1070.17px] overflow-clip relative shrink-0 w-[1152px]" data-name="Cards">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
    </div>
  );
}

export default function SectionFeature5BentoCards() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[39.99px] items-center justify-center px-0 py-[144px] relative size-full" data-name="Section - Feature 5 Bento Cards">
      <Header />
      <Cards />
    </div>
  );
}