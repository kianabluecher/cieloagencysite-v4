import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface FamilyOfficeBrandingAgencyProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function FamilyOfficeBrandingAgency({ onNavigate }: FamilyOfficeBrandingAgencyProps) {
  return (
    <IndustrySubpageTemplate
      category="Private Capital Branding"
      headline="Family Office Branding Agency For Discreet Capital"
      subheadline="Your family office manages billions. Your hedge fund delivers alpha. But if your brand doesn't signal institutional credibility and fiduciary integrity, sophisticated investors won't trust you with their capital."
      heroImage="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Traditional branding agencies don't understand private capital—they treat you like a B2C brand and can't speak your language. CIELO builds brands for family offices, hedge funds, and fund-of-funds that attract institutional allocators, retain UHNW investors, and position you as the go-to partner for generational wealth management. We deliver strategic positioning, investor narratives, and capital-raising messaging—not just logos."
      realityText="You have billions in AUM but your brand looks like a generic wealth manager. Most agencies don't understand Sharpe ratios, drawdowns, or Cayman structures. You get a logo and color palette—but no strategic positioning, no investor narrative, no capital-raising messaging. Meanwhile, $4.5 trillion in UHNW capital seeks managers who look credible."
      deliverables={[
        { title: "Fund Naming & Brand Architecture", description: "Strategic naming for hedge funds and family office platforms, trademark clearance, SEO-friendly options, product line architecture" },
        { title: "Visual Identity & Brand Guidelines", description: "Institutional-grade logo design, understated color palettes, typography systems, 50-page brand playbook" },
        { title: "Investor-Facing Collateral", description: "Pitch decks (20-30 slides), factsheets, PPM visuals, DDQ responses formatted for institutional LPs" },
        { title: "Website & Investor Portal", description: "Public website with strategy/team/contact pages, password-protected LP portal with reporting and document library" },
        { title: "Family Office Positioning Strategy", description: "LP persona research, messaging frameworks for SFOs vs MFOs, content strategy, reputation management" },
        { title: "Launch & Team Training", description: "Brand rollout support, team training on brand assets, ongoing quarterly check-ins and content updates" }
      ]}
      whoThisIsFor="Single family offices (SFOs), multi-family offices (MFOs), hedge funds, fund-of-funds managers, private investment firms"
      timeline="12–16 weeks"
      investment="Starting at $120K (full brand build)"
      ctaHeadline="Build a brand that attracts capital to your family office or fund."
      ctaButtonText="Schedule Brand Strategy Call"
      faqs={[
        { question: "How much does it cost to brand a hedge fund?", answer: "$50K-$250K for complete hedge fund brand (name, visual identity, pitch deck, factsheets, website). Fund naming: $25K-$50K, visual identity: $25K-$50K, pitch deck: $15K-$25K, website: $50K-$150K. ROI: If a strong brand helps you raise $50M faster or defend fee structure (2/20 vs 1.5/15), the investment pays for itself 10x+ over 3-5 years." },
        { question: "What's the best way to name a family office fund?", answer: "Signal generational focus ('Heritage', 'Legacy', 'Dynasty'), institutional credibility (avoid overly personal names), SEO-friendliness (Google-searchable terms), and ensure trademark clearance. Good: 'Heritage Family Capital Platform'. Bad: 'Smith Family Office' (too personal, not scalable)." },
        { question: "How do you position a fund for UHNW investors vs institutions?", answer: "UHNW investors care about downside protection, personal relationships, and direct PM access—lead with trust and alignment. Institutions care about process, repeatability, and track record—lead with systematic approach and DDQs. We create dual messaging tracks for both audiences." },
        { question: "How do you brand a hedge fund that's just launching?", answer: "Brand the team, not the track record. Emphasize team pedigree (where PM worked before), founder story (why you started, what's your edge), and seed capital (anchor LPs as social proof, PM personal capital shows alignment). Position around expertise and network, not historical performance." }
      ]}
      strategist={{
        name: "Marcus Davenport",
        title: "Private Capital Brand Strategist",
        image: img210,
        calloutText: "Institutional credibility drives allocation decisions",
        calloutDescription: "I've positioned 60+ family offices and hedge funds that collectively raised $7B+ through strategic brand architecture designed for private capital markets."
      }}
      onNavigate={onNavigate}
    />
  );
}