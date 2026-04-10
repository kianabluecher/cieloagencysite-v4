import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface EmailMarketingAutomationProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function EmailMarketingAutomation({ onNavigate }: EmailMarketingAutomationProps) {
  return (
    <IndustrySubpageTemplate
      category="Email Marketing Services"
      headline="Email Marketing That Prints Money"
      subheadline="Email isn't dead. Your email strategy is."
      heroImage="https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Email delivers $42 for every $1 spent—when done right. But most businesses send random newsletters nobody reads while their list goes cold. CIELO builds email marketing systems that nurture leads, close sales, and drive repeat purchases—automatically."
      realityText="Your email list sits unused. Open rates are below 15%. Subscribers unsubscribe faster than you add them. No automation sequences. Sales emails feel pushy. Your list doesn't make money."
      deliverables={[
        { title: "Email Marketing Strategy", description: "List segmentation, funnel design, frequency planning, content calendars" },
        { title: "Automation Sequences", description: "Welcome series, lead nurture, abandoned cart, post-purchase, win-back campaigns" },
        { title: "Email Copywriting", description: "Subject lines that get opened, body copy that drives clicks, CTAs that convert" },
        { title: "Template Design", description: "Mobile-optimized templates, branded design, A/B test variations" },
        { title: "List Growth Strategy", description: "Lead magnet creation, landing pages, pop-ups, referral programs" },
        { title: "Analytics & Optimization", description: "Open rate tracking, click-through optimization, revenue attribution, list health" }
      ]}
      whoThisIsFor="E-commerce stores, SaaS companies, course creators, service businesses, B2B companies"
      timeline="Ongoing (monthly retainer)"
      investment="Starting at $2K/month"
      ctaHeadline="Turn your list into a revenue machine."
      ctaButtonText="Start Email Marketing"
      faqs={[
        { question: "What platforms do you work with?", answer: "Klaviyo, Mailchimp, ConvertKit, ActiveCampaign, HubSpot, and most major ESP platforms with automation capabilities." },
        { question: "How do you improve email deliverability?", answer: "List hygiene, proper authentication (SPF, DKIM, DMARC), engagement-based segmentation, and following best practices to maintain sender reputation." },
        { question: "What's included in automation sequences?", answer: "Welcome series, lead nurture, abandoned cart recovery, post-purchase, win-back campaigns, birthday/anniversary emails, and re-engagement flows." },
        { question: "How do you measure email ROI?", answer: "Revenue attribution, conversion tracking, engagement metrics, list growth rate, and customer lifetime value analysis tied directly to email campaigns." }
      ]}
      strategist={{
        name: "Lauren White",
        title: "Email Marketing Automation Specialist",
        image: img210,
        calloutText: "Your list is your most valuable asset",
        calloutDescription: "I've built email systems for 150+ brands that generated $10M+ in automated revenue through strategic segmentation and optimization."
      }}
      onNavigate={onNavigate}
    />
  );
}