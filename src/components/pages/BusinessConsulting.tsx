import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface BusinessConsultingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function BusinessConsulting({ onNavigate }: BusinessConsultingProps) {
  return (
    <IndustrySubpageTemplate
      category="Business Consulting"
      headline="Business Consulting That Drives Revenue"
      subheadline="Strategy without execution is just planning theater."
      heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most consultants deliver beautiful PowerPoints that sit in drawers. Your business needs consulting that identifies opportunities, solves problems, and drives measurable growth. CIELO provides hands-on business consulting focused on revenue, profit, and scale—not just recommendations."
      realityText="Your growth has plateaued. Previous consultants delivered reports you never implemented. No clear path to next revenue milestone. Operations don't support scale. Profitability is eroding despite revenue growth."
      deliverables={[
        { title: "Growth Strategy Development", description: "Revenue modeling, market expansion, pricing optimization, channel strategy" },
        { title: "Business Model Consulting", description: "Product-market fit validation, unit economics, customer acquisition strategy" },
        { title: "Operational Excellence", description: "Process optimization, team structure, technology stack, scalability planning" },
        { title: "Financial Strategy", description: "Profitability analysis, cash flow management, funding strategy, exit planning" },
        { title: "Marketing & Sales Alignment", description: "Funnel optimization, conversion strategy, customer retention, LTV maximization" },
        { title: "Implementation Support", description: "Hands-on execution guidance, milestone tracking, accountability, results measurement" }
      ]}
      whoThisIsFor="Small business owners, startup founders, growth-stage companies, family businesses scaling"
      timeline="3-12 months (retainer-based)"
      investment="Starting at $5K/month"
      ctaHeadline="Stop planning. Start growing."
      ctaButtonText="Book Consulting Engagement"
      faqs={[
        { question: "What makes CIELO consulting different?", answer: "We don't just deliver recommendations—we help implement them. Hands-on support, accountability, and execution focus drive actual results." },
        { question: "What industries do you consult for?", answer: "Service businesses, e-commerce, SaaS, professional services, and local businesses with proven business models looking to scale profitably." },
        { question: "Do you work with early-stage startups?", answer: "Yes, but we focus on startups with product-market fit looking to scale. Pre-product startups need different advisory support." },
        { question: "How do you measure consulting success?", answer: "Revenue growth, profit improvement, operational efficiency gains, and achievement of specific KPIs defined during engagement kickoff." }
      ]}
      strategist={{
        name: "Robert Chen",
        title: "Business Growth & Operations Consultant",
        image: img210,
        calloutText: "Execution beats strategy every time",
        calloutDescription: "I've consulted with 80+ businesses that scaled from $1M to $10M+ through operational excellence and strategic growth initiatives."
      }}
      onNavigate={onNavigate}
    />
  );
}