import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface HedgeFundReputationManagementProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function HedgeFundReputationManagement({ onNavigate }: HedgeFundReputationManagementProps) {
  return (
    <IndustrySubpageTemplate
      category="Reputation Management"
      headline="Hedge Fund Reputation Management"
      subheadline="One bad headline. One disgruntled LP. One Google result that lingers for years. In private capital, reputation isn't just brand—it's your ability to raise capital."
      heroImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="In private capital, reputation = access to capital. 68% of institutional LPs cite 'manager reputation' as a top-3 screening factor. One negative Google result can kill an allocation before the first call. CIELO helps hedge funds, family offices, and investment firms build, protect, and restore reputations through proactive PR strategy, online reputation monitoring, crisis management, and narrative control—so LPs trust you with billions."
      realityText="Your fund has top-quartile performance but one negative Google result ranks #2. A disgruntled LP posts on investor forums. A -12% drawdown triggers panic with no proactive communication. Reputation damage is expensive and slow to repair—$300M in redemptions, 18 months to recover. You need a system before crisis hits."
      deliverables={[
        { title: "Proactive Reputation Building", description: "Thought leadership strategy, LinkedIn content, industry publications, speaking engagements, PR & media relations" },
        { title: "Online Reputation Monitoring", description: "Google search tracking, social media & forum monitoring, SEO optimization, real-time alerts" },
        { title: "Crisis Management & Response", description: "24-hour crisis assessment, communication strategy, LP letters, press statements, narrative control" },
        { title: "Reputation Restoration", description: "Damage assessment, LP surveys, content strategy, capital raising restart, 6-12 month rebuild plan" },
        { title: "Google SEO Suppression", description: "Push down negative results, optimize positive assets, create ranking content, legal takedown coordination" },
        { title: "LP Communication Playbook", description: "Quarterly letters, performance attribution, proactive updates, crisis communication templates" }
      ]}
      whoThisIsFor="Hedge funds ($500M-$10B+), family offices (SFOs, MFOs), fund-of-funds managers, private investment firms"
      timeline="Crisis: 24 hours | Restoration: 6–12 months"
      investment="Monitoring: $5K-$10K/mo | Crisis: $50K-$150K"
      ctaHeadline="Protect your reputation before it's too late."
      ctaButtonText="Schedule Reputation Audit"
      faqs={[
        { question: "How do hedge funds manage online reputation?", answer: "LPs Google you before every meeting. Google yourself: '[Your name] hedge fund', '[Fund name] review'. What should rank: your website, LinkedIn, positive press. What shouldn't: negative press, forum complaints. Fix broken results by creating positive content, optimizing existing assets, and using legal options when applicable. Monitor ongoing with Google Alerts and quarterly audits." },
        { question: "What's the best way to handle negative press for a fund?", answer: "Respond fast (within 24 hours), be transparent but not defensive (acknowledge truth, take accountability, show action), don't amplify negative press (no public fights). Good response: 'We had a challenging quarter due to [reasons]. We've [actions taken]. We're committed to transparency.' Bad response: 'The article is inaccurate. We will pursue legal action.'" },
        { question: "How do family offices vet fund managers' reputations?", answer: "Family offices check: Google searches, backchannel references (other family offices, industry contacts), litigation searches (PACER, regulatory filings), and social media. What kills deals: negative Google results, bad references, regulatory issues, personal scandals. What helps: clean Google, good references, stable personal life, industry credibility." },
        { question: "How much does reputation management cost for hedge funds?", answer: "Proactive building: $25K-$50K/quarter, Online monitoring: $5K-$10K/month, Crisis response: $50K-$150K per crisis, Reputation restoration: $100K-$250K (6-12 months). ROI: $2B fund with 15% redemption = $300M outflow = $6M+ in lost fees. Spend $200K/year to avoid $20M+ in losses = 100x ROI." }
      ]}
      strategist={{
        name: "Victoria Chen",
        title: "Private Capital Reputation Strategist",
        image: img210,
        calloutText: "Reputation drives allocation decisions",
        calloutDescription: "I've managed 40+ hedge fund reputation crises, protecting $10B+ in AUM through strategic crisis communications and proactive reputation building."
      }}
      onNavigate={onNavigate}
    />
  );
}