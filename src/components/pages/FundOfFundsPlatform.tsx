import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface FundOfFundsPlatformProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function FundOfFundsPlatform({ onNavigate }: FundOfFundsPlatformProps) {
  return (
    <IndustrySubpageTemplate
      category="Fund-of-Funds Branding"
      headline="Fund-of-Funds & Family Office Platform Branding"
      subheadline="You curate best-in-class hedge fund managers and build diversified portfolios—but if your brand doesn't communicate institutional rigor and conflict-free selection, investors will question your value-add."
      heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="The fund-of-funds industry faces commoditization and fee pressure as LPs ask 'why pay two layers of fees when I can invest directly?' CIELO helps FoF managers, multi-family offices, and family office platforms build brands that signal fiduciary duty, manager access, and capital preservation—justifying fees through clear value-add positioning."
      realityText="Your FoF offers 'access to top-tier managers' and 'professional due diligence'—but so does everyone else. Generic positioning means AUM decline, fee compression from 1/10 to 0.5/5, talent drain, and LPs going direct. Your brand doesn't answer: why should I pay you to select managers I could access directly?"
      deliverables={[
        { title: "Traditional Fund-of-Funds Positioning", description: "Curated access narrative, institutional due diligence infrastructure, diversification expertise messaging" },
        { title: "Master-Feeder Navigator Architecture", description: "Global capital/local efficiency framework, tax optimization messaging, cross-border compliance branding" },
        { title: "Family Office Alpha Platform", description: "Quiet power brands for quiet capital, discreet access positioning, conflict-free selection emphasis" },
        { title: "Fund-of-One Custom Mandate", description: "Bespoke portfolio architecture, total customization messaging, dedicated team positioning" },
        { title: "Manager Selection & DD Process", description: "Transparent criteria, ODD/IDD infrastructure showcase, crisis alpha track record" },
        { title: "Investor Portal & Reporting", description: "Password-protected LP portal, manager updates, performance reporting, K-1 distribution" }
      ]}
      whoThisIsFor="Fund-of-funds managers, multi-family offices, family office platforms, FoF-of-one providers, hedge fund allocators"
      timeline="10–14 weeks"
      investment="Starting at $75K"
      ctaHeadline="Position your FoF platform to attract sticky family office capital."
      ctaButtonText="Schedule Platform Strategy Call"
      faqs={[
        { question: "How do you justify two layers of fees?", answer: "We position FoFs by emphasizing value-add: manager access (closed funds, allocation rights), diversification ($10M minimum vs $100M+ direct), institutional due diligence (10-person team), and crisis alpha (2-3% outperformance during 2008, 2020 through dynamic rebalancing)." },
        { question: "How do FoFs differentiate from multi-strategy funds?", answer: "FoFs invest in external managers (two fee layers, quarterly liquidity), while multi-strat platforms hire internal PMs (one fee layer, higher transparency). We position FoFs for smaller allocators ($100M-$500M) seeking diversification without high minimums." },
        { question: "What fund names work for family office platforms?", answer: "Family office platforms need names signaling institutional credibility, generational focus ('Heritage', 'Legacy', 'Dynasty'), and discreet sophistication. We test names for SEO-friendliness, LP persona fit, and trademark clearance." },
        { question: "How do you position a FoF for international families?", answer: "International families need tax expertise (FATCA, CRS compliance), currency management (hedged share classes), regulatory compliance (AIFMD, MAS, SFC), and global custody. We emphasize 'global families, local expertise' positioning." }
      ]}
      strategist={{
        name: "Jonathan Pierce",
        title: "FoF & Family Office Platform Strategist",
        image: img210,
        calloutText: "Value-add justifies fees",
        calloutDescription: "I've positioned 20+ fund-of-funds platforms that retained sticky capital through strategic brand architecture emphasizing manager access and institutional due diligence."
      }}
      onNavigate={onNavigate}
    />
  );
}