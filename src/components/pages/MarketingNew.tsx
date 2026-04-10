import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface MarketingNewProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function MarketingNew({ onNavigate }: MarketingNewProps) {
  return (
    <IndustrySubpageTemplate
      category="Marketing"
      headline="Marketing Beyond Digital Ads"
      subheadline="Campaigns, print collateral, PR, and performance assets that strengthen your brand identity."
      heroImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="Digital ads are saturated. Your team runs 10 campaigns across 5 platforms and can't tell which one actually drives revenue. Print and physical collateral feel 'old school,' but your investors, clients, and trade show booths still need them. CIELO builds integrated marketing systems—digital, print, PR, and events—designed to work together, not compete for budget. We don't just launch campaigns; we build engines that compound."
      realityText="You're spending $20K/month on Meta and Google ads but can't connect them to actual revenue. Your pitch deck, one-pagers, and event materials were designed by five different freelancers and nothing matches. PR outreach gets ignored because your story isn't differentiated. You know marketing should be strategic, but you're stuck in tactical firefighting mode."
      deliverables={[
        { title: "Integrated Campaign Strategy", description: "Multi-channel campaigns (digital, print, PR, events) with unified messaging and clear KPIs." },
        { title: "Print & Physical Collateral", description: "Pitch decks, one-pagers, brochures, event materials, packaging—designed to match your digital brand." },
        { title: "PR & Media Outreach", description: "Press release writing, media kit creation, journalist outreach, and earned media strategy for product launches and funding announcements." },
        { title: "Performance Marketing Assets", description: "Ad creatives, landing pages, email sequences optimized for conversion, not just impressions." },
        { title: "Event & Trade Show Support", description: "Booth design, signage, branded swag, presentation templates for conferences and investor meetings." }
      ]}
      whoThisIsFor="B2B companies launching new products, funded startups preparing for Series A, event-heavy industries (finance, real estate, hospitality), brands tired of mismatched marketing materials"
      timeline="4–8 weeks for full campaign rollout"
      investment="$12K–$40K"
      ctaHeadline="Ready to build a marketing engine that compounds?"
      ctaButtonText="Let's Build Your Campaign"
      faqs={[
        { question: "Is print marketing still relevant in 2025?", answer: "Reddit marketing threads consistently show that high-touch B2B sales, investor meetings, and trade shows still heavily rely on physical materials. A well-designed pitch deck, one-pager, or branded brochure signals professionalism and permanence in a way PDFs and digital ads don't. Print isn't dead—it's just strategic, not mass-market." },
        { question: "How do we measure ROI on PR and brand marketing?", answer: "Attribution is hard, and Reddit marketers acknowledge that brand campaigns don't convert like performance ads. The goal is pipeline influence, not last-click revenue. Track: media mentions, inbound inquiries from press coverage, brand search volume, and sales team feedback on prospect awareness. If your competitors are in TechCrunch and you're not, that's a measurable gap." },
        { question: "Should we hire an agency or build marketing in-house?", answer: "Reddit startup communities suggest agencies for speed and expertise in specific channels (SEO, paid ads, PR), in-house for long-term brand ownership and iteration. Most companies do both: agency for launches and specialized work, in-house for ongoing execution. CIELO works as a strategic partner—we build systems your team can run, not dependency loops." },
        { question: "What's the difference between marketing and brand strategy?", answer: "Brand strategy is the foundation: positioning, messaging, visual identity. Marketing is execution: campaigns, ads, content. Reddit branding discussions emphasize that trying to market without clear brand strategy leads to inconsistent messaging and wasted budget. CIELO starts with strategy, then executes—so your marketing actually compounds instead of starting from zero every quarter." }
      ]}
      strategist={{
        name: "Sarah Chen",
        title: "Marketing Strategist",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's turn marketing spend into brand equity.",
        calloutDescription: "We'll audit your current campaigns, identify what's working (and what's burning budget), and build a cohesive marketing system that scales."
      }}
      seoTitle="Marketing & PR Services | CIELO Agency"
      seoDescription="Integrated marketing campaigns, print collateral, PR outreach, and performance assets. Marketing strategy that builds brand equity, not just impressions."
      seoKeywords="marketing services, PR agency, print collateral, integrated campaigns, performance marketing, event marketing, brand marketing"
      onNavigate={onNavigate}
    />
  );
}