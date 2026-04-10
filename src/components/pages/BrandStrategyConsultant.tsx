import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface BrandStrategyConsultantProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function BrandStrategyConsultant({ onNavigate }: BrandStrategyConsultantProps) {
  return (
    <IndustrySubpageTemplate
      category="Brand Strategy Consulting"
      headline="Brand Strategy That Drives Growth"
      subheadline="Strategy before design. Always."
      heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most businesses jump straight to logos and colors without clarifying who they are, who they serve, and why anyone should care. The result? Pretty brands that don't differentiate or drive revenue. CIELO provides brand strategy consulting that defines your position, sharpens your message, and creates competitive advantage before any design begins."
      realityText="Your messaging confuses prospects. You blend in with competitors. No clear differentiation. Sales team struggles to articulate value. Marketing spend delivers mediocre results. You're stuck competing on price."
      deliverables={[
        { title: "Brand Strategy Development", description: "Market analysis, competitive positioning, audience segmentation" },
        { title: "Brand Positioning Workshop", description: "Facilitated sessions to define unique value, key differentiators, brand promise" },
        { title: "Messaging Framework", description: "Elevator pitch, value propositions, benefit statements, objection handling" },
        { title: "Brand Architecture", description: "Product/service naming, portfolio organization, brand relationships" },
        { title: "Go-to-Market Strategy", description: "Launch planning, channel selection, campaign strategy, success metrics" },
        { title: "Brand Guidelines", description: "Strategic documentation that guides all future marketing and design decisions" }
      ]}
      whoThisIsFor="Startups pre-launch, companies rebranding, businesses plateauing, organizations post-merger"
      timeline="4–6 weeks"
      investment="Starting at $15K"
      ctaHeadline="Define strategy. Then build brand."
      ctaButtonText="Book Strategy Session"
      faqs={[
        { question: "What's the difference between brand strategy and design?", answer: "Strategy defines WHO you are, WHO you serve, and WHY you matter. Design visualizes that strategy. Strategy must come first." },
        { question: "Do you provide implementation support?", answer: "Yes. We can execute the strategy through design, website development, content creation, and marketing campaigns—or hand off to your team." },
        { question: "How do you facilitate positioning workshops?", answer: "In-person or virtual sessions with leadership to define target audience, competitive differentiation, value proposition, and brand promise through structured frameworks." },
        { question: "Can strategy help with pricing and positioning?", answer: "Absolutely. Brand strategy directly informs pricing strategy, market positioning, and competitive differentiation that justify premium pricing." }
      ]}
      strategist={{
        name: "Victoria Hayes",
        title: "Brand Strategy & Positioning Expert",
        image: img210,
        calloutText: "Clarity drives every business decision",
        calloutDescription: "I've defined brand strategy for 100+ companies that turned confusion into competitive advantage and plateaued growth into momentum."
      }}
      onNavigate={onNavigate}
    />
  );
}