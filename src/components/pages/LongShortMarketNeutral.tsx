import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface LongShortMarketNeutralProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function LongShortMarketNeutral({ onNavigate }: LongShortMarketNeutralProps) {
  return (
    <IndustrySubpageTemplate
      category="Equity Hedge Fund Branding"
      headline="Long/Short & Market Neutral\nFund Branding"
      subheadline="Your fund delivers uncorrelated alpha through disciplined equity selection—but if your brand doesn't communicate risk management and repeatable process, allocators will pass."
      heroImage="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Over 2,000 US-based long/short funds compete for institutional capital—and most sound identical. CIELO helps long/short equity, market neutral, and 130/30 funds build investor-facing brands that signal discipline over opportunism, transparency over complexity, and track record over hype. We position equity hedge funds for capital raising success through strategic brand architecture."
      realityText="Every fund says 'we go long quality, short garbage' and 'disciplined stock selection with risk management.' LPs can't tell you apart. Fee pressure intensifies. Allocations go to brand-name platforms while you struggle with weak positioning and generic messaging."
      deliverables={[
        { title: "Directional Long-Short Positioning", description: "Beta-plus-alpha narrative, concentrated conviction messaging, downside discipline communication" },
        { title: "Balanced Long-Short Architecture", description: "Risk-managed alpha framework, Sharpe ratio focus, low correlation positioning" },
        { title: "Market Neutral Edge Branding", description: "Pure alpha extraction narrative, zero beta messaging, portfolio diversifier positioning" },
        { title: "Sector Long-Short Identity", description: "Deep sector expertise communication, specialist edge messaging, network access emphasis" },
        { title: "130/30 Enhanced Equity Positioning", description: "Equity-plus narrative, alpha overlay messaging, institutional infrastructure branding" },
        { title: "Investor-Facing Collateral", description: "Pitch decks, factsheets, founder-centric websites, track record visualization" }
      ]}
      whoThisIsFor="Long/short equity funds, market neutral funds, 130/30 funds, sector-focused equity funds, equity hedge fund managers"
      timeline="6–10 weeks"
      investment="Starting at $40K"
      ctaHeadline="Build a brand that raises capital for your equity fund."
      ctaButtonText="Schedule Strategy Call"
      faqs={[
        { question: "How do you brand a long/short fund for family offices?", answer: "Family offices care about founder trust, downside protection, direct access, and manager alignment more than institutional metrics. We create founder-led brands emphasizing personal story, capital at risk, risk-first messaging, and direct contact options." },
        { question: "How do market neutral funds position vs long-only?", answer: "Market neutral funds position as portfolio diversifiers, not equity replacements. We emphasize uncorrelated alpha (0-0.3 correlation), volatility-adjusted returns, and 'portfolio shock absorber' messaging rather than competing on absolute returns." },
        { question: "How do 130/30 funds differentiate from long-only?", answer: "130/30 funds offer same equity exposure (100% net) plus 1-2% alpha from shorts. We position as 'enhanced equity'—same upside, better returns, with short alpha as additional performance driver with no additional risk." },
        { question: "What makes a good equity hedge fund website?", answer: "Founder-centric homepage, clear strategy explanation in plain English, risk transparency (max drawdown, Sharpe, correlation), track record visualization, and easy direct contact—not generic stock photos or vague messaging." }
      ]}
      strategist={{
        name: "Catherine Wong",
        title: "Equity Hedge Fund Positioning Expert",
        image: img210,
        calloutText: "Differentiation drives allocation decisions",
        calloutDescription: "I've helped 50+ long/short equity funds stand out in crowded markets through strategic positioning and founder-led brand narratives."
      }}
      onNavigate={onNavigate}
    />
  );
}
