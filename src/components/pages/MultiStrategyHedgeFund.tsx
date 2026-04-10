import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface MultiStrategyHedgeFundProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function MultiStrategyHedgeFund({ onNavigate }: MultiStrategyHedgeFundProps) {
  return (
    <IndustrySubpageTemplate
      category="Hedge Fund Branding"
      headline="Multi-Strategy Hedge Fund\nBranding That Attracts Capital"
      subheadline="Your fund operates across equity long/short, global macro, credit arbitrage, and derivatives—but if your brand doesn't tell that story with clarity and authority, sophisticated allocators will walk."
      heroImage="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Multi-strategy, adaptive alpha, and global macro hedge funds face a unique branding paradox: you need to communicate discipline and focus while showcasing diversification and flexibility. CIELO helps build investor-facing brands that signal flexibility without chaos, sophistication without opacity, and track record without arrogance—positioning your fund for institutional capital and UHNW family office allocations."
      realityText="Your fund operates across multiple strategies but your brand looks like every other 'flexible alpha' vehicle. Complex portfolios with zero narrative clarity mean investors don't trust you, and your visuals scream generic hedge fund energy. Meanwhile, you're competing for the same allocators with no differentiation."
      deliverables={[
        { title: "Adaptive Alpha Fund Positioning", description: "Disciplined opportunism narrative, risk-managed flexibility messaging, process-driven alpha communication" },
        { title: "Multi-Strategy Mosaic Architecture", description: "Curated alpha portfolio framework, manager diversification structure, unified risk oversight branding" },
        { title: "Global Macro Signal Identity", description: "Top-down navigator positioning, systematic + discretionary blend, crisis alpha emphasis" },
        { title: "Convexity Opportunities Branding", description: "Downside protection with upside optionality, non-linear returns communication, asymmetric payoff visualization" },
        { title: "Family Office Positioning", description: "Generational wealth focus, manager accessibility emphasis, conflict-free selection messaging" },
        { title: "Institutional Collateral Suite", description: "Pitch decks, factsheets, investor portals, PPM-friendly visuals, website design" }
      ]}
      whoThisIsFor="Multi-strategy funds, adaptive alpha vehicles, global macro funds, convexity opportunity funds, family office platforms"
      timeline="8–12 weeks"
      investment="Starting at $50K"
      ctaHeadline="Position your multi-strategy fund for institutional and family office capital."
      ctaButtonText="Schedule Brand Strategy Call"
      faqs={[
        { question: "How do you name a multi-strategy fund for family offices?", answer: "Family offices prefer names that signal institutional credibility ('Heritage', 'Legacy', 'Dynasty'), generational focus, and manager discipline ('Navigator', 'Alpha', 'Opportunities'). We test names against search volume, trademark availability, and investor perception." },
        { question: "What's the difference between multi-strat and fund-of-funds?", answer: "Multi-strategy funds have one platform with multiple internal PMs/strategies under one roof (2/20 fees, one layer). Fund-of-funds invest in multiple external hedge funds (1/10 + underlying fees, two layers). We position multi-strat for large allocators seeking direct PM access." },
        { question: "How do you brand a hedge fund that changes strategies?", answer: "Brand the process, not the strategy. We emphasize 'disciplined opportunism'—systematic process for asset class selection with defined risk guardrails, showing track record comes from process discipline." },
        { question: "How do family offices vet adaptive alpha managers?", answer: "Family offices care about manager character, downside focus, accessibility, and alignment more than institutional ODD. We build founder-led brand narratives featuring personal story, capital at risk, direct contact options, and succession planning." }
      ]}
      strategist={{
        name: "Robert Sterling",
        title: "Hedge Fund Brand Strategist",
        image: img210,
        calloutText: "Strategy before design. Always.",
        calloutDescription: "I've positioned 40+ hedge funds that raised $5B+ in institutional capital through strategic brand architecture and investor-focused messaging."
      }}
      onNavigate={onNavigate}
    />
  );
}
