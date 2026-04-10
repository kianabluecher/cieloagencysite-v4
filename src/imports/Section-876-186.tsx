function Container() {
  return (
    <div className="absolute h-px left-[30px] overflow-clip right-[30px] top-0" data-name="Container">
      <div className="absolute border-[#1e2124] border-[1px_0px_0px] border-solid inset-0" data-name="Horizontal Divider" />
    </div>
  );
}

function Tab() {
  return (
    <button className="absolute block cursor-pointer h-[67px] left-0 right-0 top-[2px]" data-name="Tab">
      <div className="absolute bg-[#1e2124] right-0 rounded-[3px] size-[6px] top-1/2 translate-y-[-50%]" data-name="Background" />
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] left-0 text-[#1e2124] text-[18px] text-left top-[34px] translate-y-[-50%] w-[176.47px]" role="button" style={{ fontVariationSettings: "'wdth' 100" }} tabIndex="0">
        <p className="leading-[25px]">Growth Expectations</p>
      </div>
    </button>
  );
}

function Container1() {
  return (
    <div className="absolute h-[67px] left-0 overflow-clip right-0 top-0" data-name="Container">
      <Tab />
      <div className="absolute bottom-0 h-px left-[-100%] right-0" data-name="Horizontal Divider" style={{ backgroundImage: "linear-gradient(90deg, rgba(30, 33, 36, 0.33) 0%, rgba(30, 33, 36, 0.33) 50%, rgb(30, 33, 36) 50%, rgb(30, 33, 36) 100%)" }} />
    </div>
  );
}

function Tab1() {
  return (
    <div className="absolute h-[67px] left-0 right-0 top-[2px]" data-name="Tab">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] left-0 text-[#767676] text-[18px] top-[34px] translate-y-[-50%] w-[240.11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[25px]">Sustainability Commitments</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[67px] left-0 overflow-clip right-0 top-[67px]" data-name="Container">
      <Tab1 />
      <div className="absolute bottom-0 h-px left-[-100%] right-0" data-name="Horizontal Divider" style={{ backgroundImage: "linear-gradient(90deg, rgb(30, 33, 36) 0%, rgb(30, 33, 36) 50%, rgba(30, 33, 36, 0.33) 50%, rgba(30, 33, 36, 0.33) 100%)" }} />
    </div>
  );
}

function Tab2() {
  return (
    <div className="absolute font-['Roboto:Regular',sans-serif] font-normal h-[92px] leading-[0] left-0 right-0 text-[#767676] text-[18px] top-[2px]" data-name="Tab">
      <div className="absolute flex flex-col h-[18px] justify-center left-0 top-[32px] translate-y-[-50%] w-[223.25px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[25px]">{`Supply Chain Disruption &`}</p>
      </div>
      <div className="absolute flex flex-col h-[18px] justify-center left-0 top-[59px] translate-y-[-50%] w-[88.12px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[25px]">Resilience</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[92px] left-0 overflow-clip right-0 top-[134px]" data-name="Container">
      <Tab2 />
      <div className="absolute bottom-0 h-px left-[-100%] right-0" data-name="Horizontal Divider" style={{ backgroundImage: "linear-gradient(90deg, rgb(30, 33, 36) 0%, rgb(30, 33, 36) 50%, rgba(30, 33, 36, 0.33) 50%, rgba(30, 33, 36, 0.33) 100%)" }} />
    </div>
  );
}

function Tab3() {
  return (
    <div className="absolute h-[67px] left-0 right-0 top-[2px]" data-name="Tab">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[18px] justify-center leading-[0] left-0 text-[#767676] text-[18px] top-[34px] translate-y-[-50%] w-[272.17px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[25px]">{`Consumer & Customer Behavior`}</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[67px] left-0 overflow-clip right-0 top-[226px]" data-name="Container">
      <Tab3 />
      <div className="absolute bottom-0 h-px left-[-100%] right-0" data-name="Horizontal Divider" style={{ backgroundImage: "linear-gradient(90deg, rgb(30, 33, 36) 0%, rgb(30, 33, 36) 50%, rgba(30, 33, 36, 0.33) 50%, rgba(30, 33, 36, 0.33) 100%)" }} />
    </div>
  );
}

function Tablist() {
  return (
    <div className="h-[293px] pointer-events-auto sticky top-0" data-name="Tablist">
      <Container1 />
      <Container2 />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Item() {
  return (
    <div className="absolute font-normal h-[22.84px] leading-[0] left-0 right-0 text-[#767676] text-[16px] top-0" data-name="Item">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] h-[16px] justify-center left-0 top-[11px] translate-y-[-50%] w-[283.03px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">Revenue Growth Management (RGM)</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular','Noto_Sans:Regular',sans-serif] h-[22.84px] justify-center right-[654.79px] text-right top-[11.42px] translate-y-[-50%] w-[13.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">↳</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="absolute font-normal h-[22.84px] leading-[0] left-0 right-0 text-[#767676] text-[16px] top-[45.69px]" data-name="Item">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] h-[16px] justify-center left-0 top-[11px] translate-y-[-50%] w-[311.54px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">Pricing Optimization and Dynamic Pricing</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular','Noto_Sans:Regular',sans-serif] h-[22.84px] justify-center right-[654.79px] text-right top-[11.42px] translate-y-[-50%] w-[13.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">↳</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="absolute font-normal h-[22.84px] leading-[0] left-0 right-0 text-[#767676] text-[16px] top-[91.37px]" data-name="Item">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] h-[16px] justify-center left-0 top-[11px] translate-y-[-50%] w-[303.75px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">Spend Visibility and Contribution Margin</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular','Noto_Sans:Regular',sans-serif] h-[22.84px] justify-center right-[654.79px] text-right top-[11.42px] translate-y-[-50%] w-[13.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">↳</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="absolute font-normal h-[45.69px] leading-[0] left-0 right-0 text-[#767676] text-[16px] top-[137.06px]" data-name="Item">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] h-[38.85px] justify-center leading-[22.86px] left-0 top-[22.42px] translate-y-[-50%] w-[575.47px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">Inflation Mitigation (e.g., material replacements, hedging, spot buys, and price</p>
        <p>adjustments)</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular','Noto_Sans:Regular',sans-serif] h-[22.84px] justify-center right-[654.79px] text-right top-[11.42px] translate-y-[-50%] w-[13.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">↳</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="absolute font-normal h-[45.69px] leading-[0] left-0 right-0 text-[#767676] text-[16px] top-[205.59px]" data-name="Item">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] h-[38.85px] justify-center leading-[22.86px] left-0 top-[22.42px] translate-y-[-50%] w-[555.81px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">{`M&A Integration (e.g., enhanced reporting, top-down analysis, alerting, and`}</p>
        <p>traceability)</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular','Noto_Sans:Regular',sans-serif] h-[22.84px] justify-center right-[654.79px] text-right top-[11.42px] translate-y-[-50%] w-[13.08px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">↳</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="absolute h-[283.28px] left-[28px] right-0 top-[74.7px]" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
      <Item4 />
    </div>
  );
}

function Tabpanel() {
  return (
    <div className="absolute h-[357.98px] left-[735px] right-[30px] top-[208.85px]" data-name="Tabpanel">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[26.36px] text-[#1e2124] text-[10px] top-[8px] tracking-[0.5px] translate-y-[-50%] uppercase w-[131.4px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[16px]">Growth Expectations</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[25px] justify-center leading-[0] left-0 text-[#1e2124] text-[18px] top-[36.5px] translate-y-[-50%] w-[536.95px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[25px]">Shift from simply meeting the demand to strategizing for growth.</p>
      </div>
      <List />
    </div>
  );
}

function ItemLink() {
  return (
    <div className="absolute border-[#1e2124] border-[1px_0px_0px] border-solid h-[55.56px] left-0 overflow-clip right-0 top-0" data-name="Item → Link">
      <div className="absolute bg-[#1e2124] bottom-0 h-px left-0 w-[675px]" data-name="Horizontal Divider" />
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] left-0 text-[#1e2124] text-[20px] top-[27.28px] translate-y-[-50%] w-[54.11px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[26px]">Retail</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular','Noto_Sans:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[651.54px] text-[#1e2124] text-[20px] top-[27.28px] translate-y-[-50%] w-[17.66px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[26px]">→</p>
      </div>
    </div>
  );
}

function ItemLink1() {
  return (
    <div className="absolute h-[54.56px] left-0 overflow-clip right-0 top-[54.56px]" data-name="Item → Link">
      <div className="absolute bg-[#1e2124] bottom-[-0.01px] h-px left-0 w-[675px]" data-name="Horizontal Divider" />
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] left-0 text-[#1e2124] text-[20px] top-[27.28px] translate-y-[-50%] w-[126.31px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[26px]">Supply Chain</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular','Noto_Sans:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[651.54px] text-[#1e2124] text-[20px] top-[27.28px] translate-y-[-50%] w-[17.66px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[26px]">→</p>
      </div>
    </div>
  );
}

function ItemLink2() {
  return (
    <div className="absolute h-[54.56px] left-0 overflow-clip right-0 top-[108.13px]" data-name="Item → Link">
      <div className="absolute bg-[#1e2124] bottom-0 h-px left-0 w-[675px]" data-name="Horizontal Divider" />
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] left-0 text-[#1e2124] text-[20px] top-[27.28px] translate-y-[-50%] w-[215.18px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[26px]">Sustainability and ESG</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular','Noto_Sans:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[651.54px] text-[#1e2124] text-[20px] top-[27.28px] translate-y-[-50%] w-[17.66px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[26px]">→</p>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="absolute h-[162.69px] left-[735px] right-[30px] top-[742.83px]" data-name="List">
      <ItemLink />
      <ItemLink1 />
      <ItemLink2 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="relative size-full" data-name="Section">
      <Container />
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] left-[30px] text-[#767676] text-[16px] top-[42px] translate-y-[-50%] uppercase w-[29.87px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[22.86px]">02 /</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[100px] justify-center leading-[50px] left-[30px] text-[#1e2124] text-[50px] top-[128.85px] tracking-[-1px] translate-y-[-50%] w-[535.65px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">Solve your hardest CPG</p>
        <p>business challenges</p>
      </div>
      <div className="absolute h-[696.67001953125px] inset-[208.85px_1087.5px_0_30px] pointer-events-none">
        <Tablist />
      </div>
      <Tabpanel />
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal h-[26px] justify-center leading-[0] left-[735px] text-[#767676] text-[20px] top-[679.83px] translate-y-[-50%] w-[322.65px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[26px]">Learn more about related offerings</p>
      </div>
      <List1 />
    </div>
  );
}