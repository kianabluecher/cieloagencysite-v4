import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface SocialMediaMarketingAgencyProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function SocialMediaMarketingAgency({ onNavigate }: SocialMediaMarketingAgencyProps) {
  return (
    <IndustrySubpageTemplate
      category="Social Media Marketing"
      headline="Social Media That\nActually Sells"
      subheadline="Posting content isn't a strategy. Converting followers is."
      heroImage="https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most businesses treat social media like a megaphone—broadcasting messages nobody wants to hear. Meanwhile, competitors with strategic content turn followers into customers daily. CIELO manages social media with one goal: revenue. We create content that builds trust, drives engagement, and converts audiences into paying customers."
      realityText="Your posts get zero engagement. Follower count doesn't translate to revenue. You're posting for posting's sake. No content strategy or conversion plan. Algorithm changes kill your reach overnight."
      deliverables={[
        { title: "Social Media Strategy", description: "Platform selection, content pillars, posting frequency, growth tactics" },
        { title: "Content Creation", description: "Professional graphics, video editing, copywriting, hashtag research" },
        { title: "Community Management", description: "Comment responses, DM handling, reputation monitoring, crisis management" },
        { title: "Paid Social Advertising", description: "Targeted campaigns, lookalike audiences, retargeting, conversion optimization" },
        { title: "Influencer Partnerships", description: "Collaboration strategy, creator outreach, campaign management, ROI tracking" },
        { title: "Analytics & Optimization", description: "Engagement metrics, conversion tracking, A/B testing, monthly reporting" }
      ]}
      whoThisIsFor="E-commerce brands, service businesses, personal brands, B2B companies, local businesses"
      timeline="Ongoing (monthly retainer)"
      investment="Starting at $2.5K/month"
      ctaHeadline="Turn followers into customers."
      ctaButtonText="Start Social Management"
      faqs={[
        { question: "Which platforms do you manage?", answer: "Instagram, Facebook, LinkedIn, TikTok, Twitter/X, YouTube, and Pinterest. We recommend platform selection based on where your ideal customers spend time." },
        { question: "How do you measure social media ROI?", answer: "We track engagement, website traffic, lead generation, and revenue attribution through UTM tracking, conversion pixels, and platform analytics." },
        { question: "Do you create all content in-house?", answer: "Yes. Our team includes graphic designers, videographers, copywriters, and social media strategists who create custom content aligned with your brand." },
        { question: "Can you manage paid social advertising too?", answer: "Absolutely. We run targeted campaigns on Facebook, Instagram, LinkedIn, and TikTok with conversion-focused optimization and ROI tracking." }
      ]}
      strategist={{
        name: "Taylor Brooks",
        title: "Social Media Revenue Strategist",
        image: img210,
        calloutText: "Engagement means nothing without conversions",
        calloutDescription: "I've built social strategies for 200+ brands that turn followers into customers through content that actually drives revenue."
      }}
      onNavigate={onNavigate}
    />
  );
}
