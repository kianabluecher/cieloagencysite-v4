import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface GoogleAdsManagementProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function GoogleAdsManagement({ onNavigate }: GoogleAdsManagementProps) {
  return (
    <IndustrySubpageTemplate
      category="Google Ads Management"
      headline="Google Ads That Generate Profit"
      subheadline="Clicks without profit are just expensive hobbies."
      heroImage="https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most businesses waste thousands on Google Ads that drive traffic but not revenue. Poor targeting, weak ad copy, and broken landing pages mean you're funding Google's bottom line—not yours. CIELO manages Google Ads with one metric: return on ad spend. We optimize campaigns for profit, not just clicks."
      realityText="Your Google Ads burn budget without results. Cost per click keeps rising. Conversion rate is abysmal. Previous agency disappeared with your money. You're competing against massive enterprise budgets."
      deliverables={[
        { title: "Google Ads Management", description: "Campaign setup, keyword research, ad group structure, bid strategy" },
        { title: "PPC Management Services", description: "Search ads, display ads, shopping ads, YouTube ads, remarketing" },
        { title: "Landing Page Optimization", description: "Conversion-focused pages that match ad intent and drive action" },
        { title: "Ad Copywriting", description: "Headlines that get clicks, descriptions that convert, A/B testing continuously" },
        { title: "Conversion Tracking", description: "Revenue attribution, goal tracking, analytics integration, ROI reporting" },
        { title: "Ongoing Optimization", description: "Weekly bid adjustments, negative keyword additions, ad performance testing" }
      ]}
      whoThisIsFor="E-commerce stores, service businesses, B2B companies, local businesses, lead generation"
      timeline="Ongoing (monthly management)"
      investment="15% of ad spend (minimum $1.5K/month)"
      ctaHeadline="Stop wasting ad budget. Start making profit."
      ctaButtonText="Launch Google Ads"
      faqs={[
        { question: "What's your management fee structure?", answer: "15% of monthly ad spend with a $1.5K minimum. This ensures we can dedicate proper attention to optimization, testing, and performance improvement." },
        { question: "How do you measure success?", answer: "Return on ad spend (ROAS), cost per acquisition (CPA), conversion rate, and overall profitability—not just clicks or impressions." },
        { question: "Do you provide landing page optimization?", answer: "Yes. We create or optimize landing pages to match ad intent, reduce friction, and maximize conversion rates for profitable campaigns." },
        { question: "How long until we see results?", answer: "Initial campaigns launch within 1-2 weeks. Meaningful optimization and ROAS improvements typically occur within 30-60 days of continuous testing." }
      ]}
      strategist={{
        name: "Brandon Clark",
        title: "PPC & Profit Optimization Specialist",
        image: img210,
        calloutText: "ROAS is the only metric that matters",
        calloutDescription: "I've managed $20M+ in ad spend, turning unprofitable campaigns into 3-5X ROAS profit machines through strategic optimization."
      }}
      onNavigate={onNavigate}
    />
  );
}