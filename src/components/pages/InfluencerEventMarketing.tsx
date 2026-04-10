import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface InfluencerEventMarketingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function InfluencerEventMarketing({ onNavigate }: InfluencerEventMarketingProps) {
  return (
    <IndustrySubpageTemplate
      category="Influencer & Event Marketing"
      headline="Influencer Campaigns & Event Activations"
      subheadline="Creator partnerships and event experiences that build brand awareness, not just impressions."
      heroImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="You're paying micro-influencers $500 per post and getting zero trackable conversions. Your event booth at conferences looks like everyone else's. Influencer campaigns feel transactional—creators post once and disappear. Event activations don't generate buzz because there's no reason for attendees to stop and engage. CIELO builds integrated influencer and event strategies—not one-off posts or generic booths. We find creators who actually align with your brand, design event experiences people want to share, and track everything so you know what's working."
      realityText="You're working with influencers based on follower count, not engagement or audience fit. Event budgets get spent on flashy booth designs that don't drive leads. Influencer content is obviously sponsored and gets ignored. You can't tie influencer spend to pipeline or revenue. Event activations feel like afterthoughts—no clear CTA, no memorable experience, no follow-up system. You know influencer and event marketing work for competitors, but you haven't cracked the formula."
      deliverables={[
        { title: "Influencer Strategy & Sourcing", description: "Audience analysis, creator vetting (engagement rates, audience demographics, brand alignment), outreach scripts, contract negotiation, and relationship management." },
        { title: "Campaign Creative Direction", description: "Content briefs for creators, brand guidelines for influencer posts, approval workflows, and creative review to ensure on-brand execution." },
        { title: "Event Experience Design", description: "Trade show booth concepts, interactive activations, branded photo ops, swag strategy, and on-site staffing coordination." },
        { title: "Content Production & Amplification", description: "Event photography/videography, influencer content repurposing for ads and social, paid amplification of top-performing creator content." },
        { title: "Performance Tracking & Reporting", description: "Influencer engagement metrics, event lead capture, attribution modeling, ROI analysis, and monthly performance reports." }
      ]}
      whoThisIsFor="Consumer brands launching products, DTC e-commerce companies scaling awareness, B2B SaaS attending conferences, funded startups with event budgets, lifestyle and hospitality brands"
      timeline="4–8 weeks for campaign rollout"
      investment="$10K–$40K + influencer fees & event costs"
      ctaHeadline="Ready to build influencer and event campaigns that convert?"
      ctaButtonText="Let's Launch Your Campaign"
      faqs={[
        { question: "How do we find influencers who actually fit our brand?", answer: "Reddit marketing communities warn against picking influencers solely by follower count—engagement rate, audience demographics, and content style matter more. Tools like HypeAuditor, Modash, and AspireIQ help vet creators, but manual research (reading comments, checking past brand partnerships, audience authenticity) is critical. Micro-influencers (10K–100K followers) often deliver better ROI than mega-influencers because audiences trust them more and rates are lower." },
        { question: "What's a fair rate to pay influencers?", answer: "Reddit influencer threads show wide variance: $100–$500 for micro-influencers (10K–50K), $500–$2K for mid-tier (50K–500K), $5K+ for macro (500K+). Rates depend on platform (Instagram costs more than TikTok), deliverables (stories vs. feed posts), and exclusivity. Common mistake: overpaying for reach without vetting engagement quality. Benchmark: $100 per 10K followers for a single post, adjusted for engagement rate." },
        { question: "How do we track ROI on influencer marketing?", answer: "Reddit marketing communities identify the tracking challenge: attribution is messy. Best practices: unique discount codes per creator, UTM links for trackable traffic, affiliate partnerships for commission-based deals, brand lift surveys to measure awareness. Most influencer campaigns don't drive immediate conversions—they build awareness and trust over time. Track engagement (saves, shares, comments) as leading indicators, conversions as lagging indicators." },
        { question: "What makes a trade show booth actually generate leads?", answer: "Reddit event marketing threads emphasize: interactive experiences (demos, games, giveaways requiring badge scans), clear value propositions visible from 20 feet away, trained booth staff who engage (not sit on phones), and immediate follow-up systems. The biggest mistake: beautiful booths with no lead capture mechanism. Winning formula: compelling reason to stop + easy way to engage + structured follow-up process." },
        { question: "Should we do gifting or paid partnerships with influencers?", answer: "Reddit consensus: gifting works for product discovery and micro-influencers (they post organically if they like it), but paid partnerships guarantee content and give you creative control. Hybrid approach: start with gifting to test creator fit, then convert top performers to paid ambassadors. Avoid: mass gifting with no follow-up, expecting free posts from established creators, one-off payments with no ongoing relationship." }
      ]}
      strategist={{
        name: "Taylor Morgan",
        title: "Event & Influencer Strategist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's build campaigns that create real brand moments.",
        calloutDescription: "We'll audit your current influencer and event strategy, identify what's working (and what's burning budget), and design integrated campaigns that drive awareness and conversions."
      }}
      seoTitle="Influencer & Event Marketing Services | CIELO Agency"
      seoDescription="Influencer campaigns and event activations that build brand awareness and drive conversions. Creator partnerships, trade show experiences, and performance tracking."
      seoKeywords="influencer marketing, event marketing, trade show booth design, creator partnerships, influencer campaigns, event activations, brand experiences"
      onNavigate={onNavigate}
    />
  );
}