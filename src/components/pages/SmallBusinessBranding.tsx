import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface SmallBusinessBrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function SmallBusinessBranding({ onNavigate }: SmallBusinessBrandingProps) {
  return (
    <IndustrySubpageTemplate
      category="Small Business Branding"
      headline="Small Business Branding\nThat Looks Big"
      subheadline="Small budget. Big impact."
      heroImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most small businesses launch with DIY logos and generic templates, then wonder why customers choose established competitors. You don't need a Fortune 500 budget to build a Fortune 500 brand. CIELO creates complete brand identity packages for small businesses that want to compete with credibility—not just price. We deliver professional branding that signals expertise from day one."
      realityText="Your DIY brand screams 'startup on a shoestring.' Customers question your credibility before you open your mouth. You're competing with established businesses that look the part. Your Canva logo won't cut it."
      deliverables={[
        {
          title: "Complete Brand Identity Package",
          description: "Logo system, color palette, typography, brand style guide documentation"
        },
        {
          title: "Business Essentials",
          description: "Business cards, letterhead, email signature, social media profile kits"
        },
        {
          title: "Digital Assets",
          description: "Website design, landing pages, email templates, presentation decks"
        },
        {
          title: "Marketing Collateral",
          description: "Brochures, flyers, banners, signage design, vehicle wraps"
        },
        {
          title: "Social Media Branding",
          description: "Profile graphics, post templates, story highlights, cover images"
        },
        {
          title: "Brand Guidelines Document",
          description: "20-page style guide with usage rules, dos/don'ts, color codes"
        }
      ]}
      whoThisIsFor="Startups, local businesses, solo practitioners, family businesses, new franchisees"
      timeline="3–4 weeks"
      investment="Starting at $6K"
      ctaHeadline="Stop looking small. Start looking serious."
      ctaButtonText="Get Your Brand Package"
      faqs={[
        {
          question: "What's included in the complete brand identity package?",
          answer: "You get everything needed to launch professionally: logo system, color palette, typography selections, business cards, letterhead, email signature, social media kits, website design, and a comprehensive brand style guide."
        },
        {
          question: "How long does it take to complete?",
          answer: "Most small business branding projects are completed in 3-4 weeks from kickoff to final delivery. This includes strategy, design iterations, revisions, and final file preparation."
        },
        {
          question: "Can I use the brand assets for print and digital?",
          answer: "Absolutely. All assets are delivered in multiple formats optimized for both print (high-resolution PDFs, vector files) and digital use (web-optimized PNGs, SVGs)."
        },
        {
          question: "Do you provide ongoing brand support?",
          answer: "Yes. After launch, we offer monthly retainer options for ongoing design support, marketing materials, and brand evolution as your business grows."
        }
      ]}
      strategist={{
        name: "Maria Chen",
        title: "Small Business Brand Strategist",
        image: img210,
        calloutText: "Professional branding levels the playing field",
        calloutDescription: "I've helped 100+ small businesses compete with established brands through strategic identity design that builds instant credibility."
      }}
      onNavigate={onNavigate}
    />
  );
}
