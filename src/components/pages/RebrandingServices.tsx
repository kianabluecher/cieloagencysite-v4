import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface RebrandingServicesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function RebrandingServices({ onNavigate }: RebrandingServicesProps) {
  return (
    <IndustrySubpageTemplate
      category="Rebranding Services"
      headline="Rebranding That\nRepositions"
      subheadline="Your brand is holding you back. Time to evolve."
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most companies rebrand because they've outgrown their identity. But rebranding without strategy is just expensive redecoration. You need a rebrand that repositions you for growth. CIELO guides complete rebrand transformations—from strategy through launch—ensuring your new brand drives business results, not just aesthetic upgrades."
      realityText="Your current brand feels dated. You've evolved but your identity hasn't. Competitors look more credible. You're attracting the wrong customers. Your team is embarrassed by brand materials."
      deliverables={[
        { title: "Rebrand Strategy", description: "Market analysis, competitive audit, positioning workshop, messaging framework" },
        { title: "Visual Identity Redesign", description: "Logo evolution, color system, typography, photography style, brand guidelines" },
        { title: "Brand Refresh Execution", description: "Website redesign, collateral updates, signage, packaging, apparel" },
        { title: "Internal Launch Strategy", description: "Employee communication, training materials, rollout timeline" },
        { title: "External Rollout Plan", description: "Press release, social announcement, customer communication, launch campaign" },
        { title: "Asset Migration", description: "Old brand retirement, file organization, vendor notification, trademark filing" }
      ]}
      whoThisIsFor="Established companies, acquired businesses, merged organizations, companies pivoting markets"
      timeline="8–12 weeks"
      investment="Starting at $18K"
      ctaHeadline="Outgrow your old brand. Build what's next."
      ctaButtonText="Launch Rebrand Project"
      faqs={[
        { question: "How do we know if we need a rebrand?", answer: "Signs include: dated visual identity, misalignment with current offerings, merger/acquisition, market repositioning, or inability to attract ideal customers." },
        { question: "What's the difference between a rebrand and a refresh?", answer: "A refresh updates visual elements while maintaining core identity. A rebrand repositions strategy, messaging, and identity for a new market position." },
        { question: "How do you manage the transition?", answer: "Phased rollout with internal launch first, then external. We create transition plans, customer communication, and vendor coordination for seamless execution." },
        { question: "Can we keep elements of our current brand?", answer: "Yes. Many rebrands evolve logos and visual systems rather than starting from scratch. We assess what's working and what needs change." }
      ]}
      strategist={{
        name: "Samuel Martinez",
        title: "Brand Evolution Strategist",
        image: img210,
        calloutText: "Evolution beats revolution",
        calloutDescription: "I've guided 50+ companies through successful rebrands that repositioned them for growth without losing brand equity."
      }}
      onNavigate={onNavigate}
    />
  );
}
