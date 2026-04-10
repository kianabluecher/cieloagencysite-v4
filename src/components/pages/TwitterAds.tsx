import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import heroImage from 'figma:asset/08fd2bb097f3989f099fe22edb34c2f778182e2e.png';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface TwitterAdsProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function TwitterAds({ onNavigate }: TwitterAdsProps) {
  return (
    <IndustrySubpageTemplate
      category="Twitter (X) Ads Management"
      headline="X Ads That Spark\nConversations & Conversions"
      subheadline="Turn trending topics into revenue streams with high-intent targeting."
      heroImage={heroImage}
      description="X (formerly Twitter) is where news breaks and cultural conversations happen. It's an untapped goldmine for B2B and high-growth brands. We manage your X Ads to reach decision-makers, influencers, and engaged communities directly, turning real-time engagement into measurable ROI."
      realityText="Most brands ignore X or burn budget on low-quality engagement. Targeting is tricky, and the platform moves fast. Without a strategy, your ads get lost in the feed or attract the wrong attention."
      deliverables={[
        { title: "Campaign Strategy", description: "Objective-based planning to align with your business goals" },
        { title: "Audience Targeting", description: "Precision targeting using keywords, handle lookalikes, and interests" },
        { title: "Ad Creative & Copy", description: "Native-style creatives and copy that stop the scroll and drive action" },
        { title: "Real-time Optimization", description: "Daily adjustments to bid strategies and targeting based on performance" },
        { title: "Conversion Tracking", description: "Pixel setup and event tracking to measure true ROI" },
        { title: "Performance Reporting", description: "Detailed weekly breakdowns of spend, clicks, and conversions" }
      ]}
      whoThisIsFor="B2B SaaS, Tech Companies, Finance, Crypto/Web3, News/Media, Personal Brands"
      timeline="Ongoing (monthly management)"
      investment="15% of ad spend (minimum $1.5K/month)"
      ctaHeadline="Dominate the conversation on X."
      ctaButtonText="Launch X Ads"
      faqs={[
        { question: "Why advertise on X (Twitter)?", answer: "X offers unique access to real-time conversations and high-net-worth audiences that aren't as active on other platforms. It's especially powerful for B2B, tech, and finance sectors." },
        { question: "What is the minimum budget?", answer: "We recommend a minimum ad spend of $3,000/month to gather sufficient data and optimize effectively, plus our management fee." },
        { question: "Can you target followers of competitors?", answer: "Yes, X allows for 'follower lookalike' targeting, which is one of the most effective ways to reach audiences similar to your competitors' followers." },
        { question: "How do you measure success?", answer: "We focus on your specific KPIs: Cost Per Acquisition (CPA), Return on Ad Spend (ROAS), and lead quality, not just vanity metrics like likes or retweets." }
      ]}
      strategist={{
        name: "Brandon Clark",
        title: "Paid Social & Growth Specialist",
        image: img210,
        calloutText: "Capture attention where it matters most.",
        calloutDescription: "I've helped brands scale from zero to millions in revenue by leveraging the unique conversational nature of Twitter/X ads."
      }}
      seoTitle="Twitter (X) Ads Management | CIELO Agency"
      seoDescription="Expert Twitter (X) Ads management services. We target high-intent audiences and drive conversions with data-backed strategies for B2B and growth brands."
      seoKeywords="twitter ads, x ads, twitter advertising agency, paid social media, b2b advertising, twitter marketing"
      seoImage={heroImage}
      onNavigate={onNavigate}
    />
  );
}
