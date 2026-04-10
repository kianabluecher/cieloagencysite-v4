import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface DigitalMarketingSmallBusinessProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function DigitalMarketingSmallBusiness({ onNavigate }: DigitalMarketingSmallBusinessProps) {
  return (
    <IndustrySubpageTemplate
      category="Digital Marketing for Small Business"
      headline="Digital Marketing That Drives Revenue"
      subheadline="Marketing without results is just noise."
      heroImage="https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Small businesses waste thousands on Facebook ads, SEO promises, and social media 'experts' who deliver vanity metrics instead of revenue. You need marketing that pays for itself. CIELO provides complete digital marketing services designed for small business ROI. We focus on channels and tactics that drive measurable revenue—not likes and impressions."
      realityText="Your marketing budget disappears into black holes. Agencies promise results but deliver reports. No clear attribution between spend and revenue. Previous agencies ghosted you mid-contract."
      deliverables={[
        { title: "Digital Marketing Strategy", description: "Channel selection, budget allocation, campaign planning, KPI definition" },
        { title: "Search Engine Optimization", description: "Local SEO, Google My Business, citation building, review management" },
        { title: "Paid Advertising Management", description: "Google Ads, Facebook Ads, LinkedIn Ads with profit-focused optimization" },
        { title: "Content Marketing", description: "Blog strategy, email campaigns, lead magnets, nurture sequences" },
        { title: "Social Media Management", description: "Platform strategy, content creation, community engagement, organic growth" },
        { title: "Analytics & Reporting", description: "Revenue attribution, conversion tracking, monthly strategy calls, ROI dashboards" }
      ]}
      whoThisIsFor="Local businesses, service providers, retail shops, professional practices, franchises"
      timeline="Ongoing (monthly retainer)"
      investment="Starting at $3K/month"
      ctaHeadline="Stop wasting budget. Start making money."
      ctaButtonText="Book Strategy Call"
      faqs={[
        { question: "How do you ensure ROI?", answer: "We focus exclusively on channels with direct revenue attribution—paid search, SEO, email marketing—and track every dollar spent to revenue generated." },
        { question: "What's included in the monthly retainer?", answer: "Strategy, campaign management, content creation, social media, SEO, analytics, monthly reporting, and weekly communication." },
        { question: "Do you work with small budgets?", answer: "Yes. We specialize in maximizing small business budgets through smart channel selection and efficient campaign management." },
        { question: "How long until we see results?", answer: "Paid ads deliver results within weeks. SEO and content marketing build momentum over 3-6 months. We set realistic timelines based on your goals and budget." }
      ]}
      strategist={{
        name: "Jennifer Adams",
        title: "Small Business Marketing Strategist",
        image: img210,
        calloutText: "ROI is the only metric that matters",
        calloutDescription: "I've helped 150+ small businesses generate measurable revenue through strategic, budget-conscious digital marketing."
      }}
      onNavigate={onNavigate}
    />
  );
}