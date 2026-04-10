import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface InfluencerMarketingAgencyProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function InfluencerMarketingAgency({ onNavigate }: InfluencerMarketingAgencyProps) {
  return (
    <IndustrySubpageTemplate
      category="Influencer Marketing"
      headline="Influencer Marketing That Drives Sales"
      subheadline="Influencers build trust faster than ads ever will."
      heroImage="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="While your competitors pay for ads that get ignored, smart brands leverage influencer partnerships to reach engaged audiences who actually convert. CIELO manages influencer marketing campaigns that drive measurable revenue—not just engagement vanity metrics."
      realityText="You're unsure how to find the right influencers. Previous partnerships delivered views but no sales. Influencer rates seem arbitrary. No clear ROI tracking. Competitors dominate influencer partnerships in your niche."
      deliverables={[
        { title: "Influencer Strategy", description: "Platform selection, influencer tier planning, campaign objectives, budget allocation" },
        { title: "Creator Discovery & Vetting", description: "Audience analysis, engagement quality, brand alignment, rate negotiation" },
        { title: "Partnership Management", description: "Contract negotiation, content approval, timeline management, relationship building" },
        { title: "Campaign Execution", description: "Brief creation, content review, posting schedule, cross-promotion planning" },
        { title: "Performance Tracking", description: "Sales attribution, engagement metrics, ROI analysis, creator scorecards" },
        { title: "Long-Term Programs", description: "Ambassador programs, affiliate partnerships, ongoing creator relationships" }
      ]}
      whoThisIsFor="E-commerce brands, beauty/fashion brands, tech products, food/beverage, lifestyle brands"
      timeline="Ongoing (campaign or retainer basis)"
      investment="Starting at $5K setup + 15% of creator fees"
      ctaHeadline="Partner with creators who drive sales."
      ctaButtonText="Launch Influencer Campaign"
      faqs={[
        { question: "How do you find the right influencers?", answer: "We analyze audience demographics, engagement quality, brand alignment, previous partnership performance, and rate competitiveness to identify ideal creators." },
        { question: "What's the ROI of influencer marketing?", answer: "When properly tracked with affiliate links, UTM codes, and discount codes, influencer campaigns typically deliver 3-5X ROAS for product-based brands." },
        { question: "Do you manage micro or macro influencers?", answer: "Both. Micro-influencers (10K-100K) often deliver higher engagement and ROI. Macro-influencers provide brand awareness. We recommend based on goals." },
        { question: "How do you handle contracts and payments?", answer: "We negotiate rates, manage contracts, handle payments, ensure deliverables, and protect your brand through proper legal agreements and content rights." }
      ]}
      strategist={{
        name: "Sophia Reynolds",
        title: "Influencer Marketing & Partnerships Director",
        image: img210,
        calloutText: "Trust converts better than ads",
        calloutDescription: "I've managed 500+ influencer partnerships that drove $15M+ in trackable revenue through strategic creator selection and performance optimization."
      }}
      onNavigate={onNavigate}
    />
  );
}