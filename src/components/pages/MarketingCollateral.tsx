import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface MarketingCollateralProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function MarketingCollateral({ onNavigate }: MarketingCollateralProps) {
  return (
    <IndustrySubpageTemplate
      category="Marketing Collateral"
      headline="Print & Digital Assets That Close Deals"
      subheadline="Pitch decks, one-pagers, brochures, and event materials designed to convert prospects into customers."
      heroImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="Your sales team sends the same tired PDF deck that looks like every other B2B company. Prospects glance at your one-pager for 8 seconds and forget it exists. Trade show booths blend into the background because your signage doesn't communicate anything. CIELO builds marketing collateral that does the work—pitch decks that tell a story, one-pagers that get saved, brochures that get shared. We don't design pretty files; we design assets that move deals forward."
      realityText="Your pitch deck is 40 slides of feature lists with no narrative arc. One-pagers are walls of text that nobody reads. Event materials were designed by five different freelancers in five different styles. Sales reps avoid using company templates because they're ugly or off-brand. You know first impressions matter, but your collateral screams 'we don't have it together.'"
      deliverables={[
        { title: "Investor & Sales Pitch Decks", description: "Story-driven presentations with clear narrative structure, visual hierarchy, data visualization, and on-brand design—built for fundraising, sales, and partnership pitches." },
        { title: "One-Pagers & Leave-Behinds", description: "Single-page summaries optimized for quick scanning: product overview, case studies, comparison sheets, event handouts." },
        { title: "Brochures & Print Materials", description: "Multi-page catalogs, service guides, capabilities decks, printed brochures for high-touch sales and investor meetings." },
        { title: "Event & Trade Show Collateral", description: "Booth signage, banners, table displays, branded swag, presentation templates for conferences and expos." },
        { title: "Sales Enablement Templates", description: "Editable PowerPoint/Keynote templates, proposal frameworks, case study layouts—so your team can create on-brand materials without waiting on design." }
      ]}
      whoThisIsFor="B2B sales teams closing enterprise deals, startups fundraising Series A/B, companies attending trade shows and conferences, agencies pitching high-value clients"
      timeline="3–6 weeks for full suite"
      investment="$8K–$25K"
      ctaHeadline="Ready to build collateral that closes deals?"
      ctaButtonText="Let's Design Your Materials"
      faqs={[
        { question: "What's the difference between a pitch deck for investors vs. sales?", answer: "Reddit startup communities consistently distinguish: investor decks focus on vision, market size, traction, and team—goal is to get the next meeting. Sales decks focus on pain points, solutions, ROI, and proof—goal is to close the deal. Investor decks are narrative-driven; sales decks are benefit-driven. Using the same deck for both contexts is a common mistake that dilutes effectiveness." },
        { question: "How many slides should a pitch deck be?", answer: "Reddit consensus for investor decks: 10–15 slides for the pitch, 20–30 with appendix. For sales decks: 8–12 slides for discovery calls, 15–20 for formal presentations. The rule: fewer slides with clear messaging beats 40-slide feature dumps. If you can't explain your value in 10 slides, the problem isn't slide count—it's clarity." },
        { question: "Should we design our own templates or hire a designer?", answer: "Reddit design threads show DIY templates from Canva or Google Slides work for internal updates, but high-stakes materials (fundraising, enterprise sales, major partnerships) benefit massively from professional design. The ROI: a well-designed pitch deck can mean the difference between a $2M raise and getting passed over. Investors and buyers judge credibility partly on presentation quality—it signals operational maturity." },
        { question: "What file formats should we deliver collateral in?", answer: "Reddit marketing communities recommend: PDFs for final distribution (universal, no formatting issues), PowerPoint/Keynote for editable templates (so teams can update), high-res PNGs for print (signage, brochures). Avoid sharing editable files externally—fonts break, layouts shift. Always send PDFs to prospects and investors unless they specifically request source files." },
        { question: "How do we keep marketing materials on-brand when multiple people create them?", answer: "The most common complaint from in-house teams: brand drift when reps build their own decks. Reddit branding discussions emphasize template systems with locked master slides, style guides with do/don't examples, and periodic brand audits. CIELO builds editable template libraries with guardrails—teams get flexibility without breaking visual consistency." }
      ]}
      strategist={{
        name: "Jordan Lee",
        title: "Brand Designer",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's build collateral that actually gets used.",
        calloutDescription: "We'll audit your current materials, identify what's working (and what's not), and design a system that your sales and marketing teams will actually want to use."
      }}
      seoTitle="Marketing Collateral & Pitch Deck Design | CIELO Agency"
      seoDescription="Pitch decks, one-pagers, brochures, and event materials that close deals. Professional marketing collateral design for B2B sales and investor presentations."
      seoKeywords="marketing collateral, pitch deck design, sales materials, investor pitch deck, one-pager design, trade show materials, event collateral"
      onNavigate={onNavigate}
    />
  );
}