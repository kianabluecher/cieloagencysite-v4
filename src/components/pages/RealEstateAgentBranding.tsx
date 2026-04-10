import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface RealEstateAgentBrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function RealEstateAgentBranding({ onNavigate }: RealEstateAgentBrandingProps) {
  return (
    <IndustrySubpageTemplate
      category="Real Estate Agent Branding"
      headline="Agent Branding\nThat Sells You"
      subheadline="You're not selling homes. You're selling trust."
      heroImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaG91c2V8ZW58MXx8fHwxNzYwODk5MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
      description="In a market flooded with Zillow ads and templated bios, agents who win have personal brands that scream expertise, local authority, and human connection. CIELO builds agent brands that turn Instagram posts into client referrals and open houses into lifelong relationships. We position you as the market expert—not just another door-opener."
      realityText="Your brand looks generic. Social media feels like shouting into the void. Referrals are inconsistent. You're competing on price, not positioning."
      deliverables={[
        {
          title: "Agent Brand Identity",
          description: "Personal logo, color palette, photography direction, tone of voice that differentiates"
        },
        {
          title: "Neighborhood Positioning",
          description: "Own a zip code, become THE name buyers and sellers think of first"
        },
        {
          title: "Social Media Content System",
          description: "Instagram, Facebook, LinkedIn templates (listing reveals, market insights, testimonials)"
        },
        {
          title: "Client Referral Kit",
          description: "Thank-you cards, referral incentives, case study templates that generate word-of-mouth"
        },
        {
          title: "Website + Lead Capture",
          description: "Personal site with IDX integration, automated email follow-up"
        }
      ]}
      whoThisIsFor="Residential agents, luxury realtors, team leaders, brokerages scaling personal brands"
      timeline="2–4 weeks"
      investment="From $8K"
      ctaHeadline="Own your market. Build your brand."
      ctaButtonText="Start Your Agent Brand"
      faqs={[
        {
          question: "How do you help real estate agents stand out?",
          answer: "We create personal brands that position you as the local market expert—not just another agent. This includes unique visual identity, neighborhood positioning strategy, and social content systems."
        },
        {
          question: "What's included in the agent brand identity?",
          answer: "Personal logo, color palette, photography direction, social media templates, client referral materials, and website with IDX integration."
        },
        {
          question: "Can you help me dominate a specific neighborhood?",
          answer: "Yes. We create positioning strategies that help you own a zip code and become THE name buyers and sellers think of first in that area."
        },
        {
          question: "Do you provide social media content?",
          answer: "We provide templates and strategies for Instagram, Facebook, and LinkedIn—including listing reveals, market insights, and testimonial formats."
        },
        {
          question: "How long does an agent branding project take?",
          answer: "Most projects are completed in 2–4 weeks, including strategy, identity design, social templates, and website development."
        }
      ]}
      strategist={{
        name: "Zandra Drysdale",
        title: "Brand Strategist",
        image: img210,
        calloutText: "Become the go-to name",
        calloutDescription: "Get personalized insights on how to position yourself as the market expert in your area. Our strategist will help you own your neighborhood, build referral systems, and create social content that drives business."
      }}
      onNavigate={onNavigate}
    />
  );
}
