import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface PitchDeckPPMDesignProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function PitchDeckPPMDesign({ onNavigate }: PitchDeckPPMDesignProps) {
  return (
    <IndustrySubpageTemplate
      category="Investor Presentation Design"
      headline="Pitch Deck & PPM Design\nFor Hedge Funds"
      subheadline="You have 30 minutes to convince a pension CIO to allocate $100M. Your strategy is sound. Your track record is strong. But if your pitch deck looks generic—they'll pass."
      heroImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="LPs see 50-100 pitch decks per year and allocate to 5-10 managers. That means 90% of decks get rejected. 88% of LPs cite 'clear strategy articulation' as key allocation factor. 62% say 'confusing pitch deck' is a deal-breaker. CIELO designs hedge fund pitch decks, PPM visuals, and investor factsheets that close allocations by communicating strategy clarity, track record credibility, and operational sophistication in every slide."
      realityText="Your deck has 30 slides of dense text and cluttered charts. LPs see 100 decks per year—yours looks like everyone else's. 62% of LPs say confusing pitch decks are deal-breakers. You have strong performance but weak presentation. Generic design kills allocation conversations before they start. 90% of decks get rejected—don't be in that 90%."
      deliverables={[
        { title: "20-Slide Pitch Deck Framework", description: "Cover, investment summary, strategy deep dive, track record & performance, team & edge, operations, terms & contact" },
        { title: "Custom Visual Design", description: "Institutional-grade design, clear performance charts, strategy diagrams, risk metrics dashboards, team bios" },
        { title: "PPM Visual Design", description: "PPM-compliant charts & graphs, fee structure infographics, liquidity timelines, strategy flowcharts, org charts" },
        { title: "1-Page Fund Factsheets", description: "Strategy summary, track record, PM bio, contact info, PDF-optimized for email distribution" },
        { title: "Investor-Ready Formatting", description: "SEC-compliant, professional typography, mobile-friendly PDFs, editable source files (PPTX/Keynote)" },
        { title: "Performance Attribution Slides", description: "What drove returns (longs, shorts, sectors), case studies, risk-adjusted metrics, benchmark comparisons" }
      ]}
      whoThisIsFor="Hedge funds, family offices, fund-of-funds managers, private equity firms, venture capital funds"
      timeline="Pitch Deck: 4–6 weeks | PPM Visuals: 4 weeks"
      investment="Pitch Deck: $15K-$25K | Factsheet: $5K"
      ctaHeadline="Turn allocation meetings into capital commitments."
      ctaButtonText="Request Pitch Deck Review"
      faqs={[
        { question: "What should be in a hedge fund pitch deck?", answer: "20-slide framework: Slides 1-3 (Cover, Investment Summary, Agenda), 4-7 (Strategy: philosophy, process, portfolio construction, risk management), 8-12 (Track Record: net returns, annual table, risk metrics, attribution, case studies), 13-15 (Team: PM bio, investment team, competitive edge), 16-18 (Operations: service providers, compliance, technology), 19-20 (Terms & Contact)." },
        { question: "How do you explain convexity to non-technical LPs?", answer: "Use analogies + visuals. Bad: 'We trade gamma through delta-hedged straddles.' Good: 'We buy portfolio insurance that appreciates during market dislocations. Like home insurance—small premium yearly, but massive payout if house burns down.' Show chart: small losses in calm markets, large gains during volatility spikes." },
        { question: "How much does a hedge fund pitch deck cost?", answer: "New pitch deck: $15K-$25K (4-6 weeks, 20-30 slides), Deck refresh: $5K-$10K (2-3 weeks), Factsheet: $5K per fund (2 weeks), PPM visuals: $10K-$20K (4 weeks). ROI: If deck helps close 1 additional $50M allocation = $1M/year fees. $25K deck = 40x ROI in year 1." },
        { question: "Should hedge funds use PowerPoint or PDF?", answer: "For LP distribution: PDF (locked, universal, professional). For internal use: PowerPoint or Keynote (editable source file). Workflow: Design in PowerPoint/Keynote → Export to PDF for distribution → Keep source file for updates. PDF ensures formatting stays consistent and can't be edited by recipients." }
      ]}
      strategist={{
        name: "Natalie Blackwood",
        title: "Investor Presentation Strategist",
        image: img210,
        calloutText: "Clarity drives allocation decisions",
        calloutDescription: "I've designed 100+ pitch decks for hedge funds and private equity firms that collectively closed $8B+ in institutional capital commitments."
      }}
      onNavigate={onNavigate}
    />
  );
}
