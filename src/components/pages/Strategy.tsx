import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface StrategyProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function Strategy({ onNavigate }: StrategyProps) {
  return (
    <IndustrySubpageTemplate
      category="Strategy"
      headline="Strategy Before Execution"
      subheadline="Brand positioning, messaging frameworks, and reputation management that clarify what you stand for—before you waste budget on tactics."
      heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="You're launching campaigns without clear positioning. Your messaging changes every quarter because no one agrees on what the brand actually stands for. Competitors tell a clearer story than you do. Negative reviews or press coverage hurt your reputation, and you have no system to manage it. CIELO builds brand strategy first—positioning, messaging, competitive differentiation—so every dollar you spend on marketing actually compounds. We don't guess; we research, define, and document the strategy your entire company can rally behind."
      realityText="Your sales team, marketing team, and founders describe your company differently. You've pivoted three times, and your brand still reflects the old positioning. Customers don't understand what makes you different from competitors. Google search results show old negative press or outdated information. You're spending on ads, content, and PR, but none of it feels cohesive because there's no underlying strategy. You know you need clarity, but 'strategy' feels abstract and expensive."
      deliverables={[
        { title: "Brand Positioning & Strategy", description: "Target audience definition, competitive analysis, unique value proposition, brand personality and tone of voice, positioning statement and messaging pillars." },
        { title: "Messaging Framework", description: "Core messaging hierarchy (tagline, elevator pitch, boilerplate), audience-specific messaging (investors, customers, press, recruits), objection handling and competitive differentiation talking points." },
        { title: "Brand Narrative & Storytelling", description: "Origin story, mission/vision articulation, customer success frameworks, founder and leadership positioning, case study and testimonial strategy." },
        { title: "Reputation Audit & Management", description: "Google search analysis (brand mentions, reviews, press coverage), competitor reputation comparison, crisis communication playbook, review response templates, media monitoring setup." },
        { title: "Strategic Brand Guidelines", description: "Brand strategy dossier (internal document), executive messaging training, PR and media kit templates, brand governance and approval workflows." }
      ]}
      whoThisIsFor="Startups preparing to raise funding, companies rebranding or pivoting, leadership teams with no alignment on messaging, brands dealing with reputation issues, B2B companies struggling to differentiate"
      timeline="3–6 weeks for full strategy development"
      investment="$12K–$40K"
      ctaHeadline="Ready to build a strategy that aligns your entire company?"
      ctaButtonText="Let's Define Your Strategy"
      faqs={[
        { question: "What's the difference between brand strategy and marketing strategy?", answer: "Reddit marketing communities clarify: brand strategy defines who you are (positioning, values, differentiation), marketing strategy defines how you grow (channels, campaigns, tactics). Brand strategy is the foundation; marketing strategy is execution. Common mistake: jumping into marketing tactics (ads, content, social) without clear brand strategy—resulting in inconsistent messaging and wasted budget. Strategy first, tactics second." },
        { question: "How do we know if we need brand strategy or just better execution?", answer: "Reddit startup threads identify the symptoms of missing strategy: teams disagree on target audience, messaging changes constantly, sales decks tell different stories, customers don't understand your differentiation, rebrands happen reactively instead of strategically. If your execution is inconsistent or ineffective, the root cause is usually lack of strategic clarity. Fix the foundation before scaling tactics." },
        { question: "Can we do brand strategy in-house or do we need an agency?", answer: "Reddit consensus: internal teams know the business deeply but often lack objectivity and structured frameworks. Agencies bring external perspective, competitive benchmarking, and proven methodologies. Hybrid approach works well: agency leads strategy development (research, workshops, frameworks), internal team owns ongoing execution and iteration. DIY strategy works for very early-stage startups; funded companies benefit from professional facilitation." },
        { question: "How do we manage negative reviews or bad press?", answer: "Reddit reputation management threads emphasize: respond quickly and professionally (ignoring makes it worse), acknowledge the issue without being defensive, offer resolution privately (move the conversation offline), use positive content to outrank negative results (SEO, PR, owned media). For serious reputation crises: legal review before responding, crisis communication plan, media training for spokespeople. Most damage comes from poor or delayed responses, not the original issue." },
        { question: "What's the ROI of brand strategy?", answer: "Reddit business communities acknowledge brand strategy is hard to attribute directly, but the downstream impact is measurable: higher conversion rates (clear messaging reduces friction), better talent attraction (strong employer brand), easier fundraising (investors back clear narratives), premium pricing power (differentiated brands command higher prices). Companies without strategy waste budget on conflicting tactics; companies with strategy see compounding returns because every initiative reinforces the same positioning." }
      ]}
      strategist={{
        name: "David Chen",
        title: "Brand Strategist",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's clarify your brand before you spend another dollar.",
        calloutDescription: "We'll run workshops with your leadership team, audit your competitive landscape, and build a strategy that aligns everyone—from founders to marketing to sales."
      }}
      seoTitle="Brand Strategy & Reputation Management | CIELO Agency"
      seoDescription="Brand strategy, positioning, messaging frameworks, and reputation management. Strategic clarity before execution for startups and growing companies."
      seoKeywords="brand strategy, brand positioning, messaging framework, reputation management, brand consulting, strategic branding, brand development"
      onNavigate={onNavigate}
    />
  );
}