import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface StartupBrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function StartupBranding({ onNavigate }: StartupBrandingProps) {
  return (
    <IndustrySubpageTemplate
      category="Startup Branding"
      headline="Startup Branding That\nAttracts Capital"
      subheadline="VCs fund brands, not just ideas."
      heroImage="https://images.unsplash.com/photo-1559136555-9303baea8ebd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Your pitch deck might be brilliant, but if your brand looks like a weekend hackathon project, investors question your execution ability. Startup branding signals whether you're serious. CIELO builds tech startup brands designed to raise capital, recruit talent, and win early customers—all before your product is perfect."
      realityText="Your brand looks like every other tech startup. No differentiation in crowded market. Talent rejects offers for better-branded companies. Investors don't take you seriously. Customer acquisition costs are astronomical."
      deliverables={[
        { title: "Startup Brand Strategy", description: "Market positioning, competitive differentiation, narrative development" },
        { title: "Tech Startup Branding", description: "Modern identity system, product UI consistency, developer-friendly assets" },
        { title: "Pitch Deck Design", description: "Investor-ready presentations that communicate vision clearly" },
        { title: "Website Design", description: "Product-led website with waitlist capture, demo requests, investor information" },
        { title: "Product Launch Strategy", description: "Beta launch materials, press kit, social campaigns, community building" },
        { title: "Growth Marketing Foundation", description: "Content strategy, SEO foundation, demand generation systems" }
      ]}
      whoThisIsFor="Pre-seed startups, seed-stage companies, tech founders, SaaS platforms, product companies"
      timeline="5–7 weeks"
      investment="Starting at $12K"
      ctaHeadline="Build a brand investors fund."
      ctaButtonText="Launch Startup Brand"
      faqs={[
        { question: "When should startups invest in branding?", answer: "Before fundraising, hiring, or customer acquisition. A strong brand reduces CAC, attracts talent, and signals execution ability to investors." },
        { question: "What's included in the pitch deck design?", answer: "Investor narrative, problem/solution framing, market opportunity, business model, team credentials, financial projections—all designed for clarity and impact." },
        { question: "Do you understand startup fundraising?", answer: "Yes. We've worked with 100+ startups through seed to Series B, understanding what VCs look for in brand presentation and market positioning." },
        { question: "Can you help with product launch?", answer: "Absolutely. We create launch strategies including beta campaigns, Product Hunt launches, press kits, social campaigns, and community building tactics." }
      ]}
      strategist={{
        name: "Alex Chen",
        title: "Startup Brand & Growth Strategist",
        image: img210,
        calloutText: "Brand is execution signal",
        calloutDescription: "I've helped 80+ startups raise $200M+ through strategic branding that signals execution ability and market understanding."
      }}
      onNavigate={onNavigate}
    />
  );
}
