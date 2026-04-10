import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface AIOperationsProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function AIOperations({ onNavigate }: AIOperationsProps) {
  return (
    <IndustrySubpageTemplate
      category="AI Operations"
      headline="AI That Actually Improves Operations"
      subheadline="Stop theorizing about AI. Start implementing systems that automate workflows, scale teams, and generate pipeline—without replacing your people."
      heroImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="Your operations team is drowning in manual work. Sales reps spend 4 hours a day on data entry instead of selling. Marketing can't scale content without hiring 10 more people. Customer support is buried in repetitive tickets. You know AI can help, but you don't know where to start—and every vendor is selling vaporware. CIELO builds AI systems that solve real operational bottlenecks: lead generation automation, workflow orchestration, intelligent routing, and process optimization. We don't sell AI for AI's sake. We sell outcomes."
      realityText="You're manually enriching leads in spreadsheets because your CRM data is garbage. Sales reps waste hours researching prospects instead of booking meetings. Marketing is stuck repurposing content manually across 12 platforms. Your ops team is building Zapier workflows that break every week. You've tried ChatGPT, but prompts don't scale into systems. Consultants pitch you 'AI transformation roadmaps' that cost $200K and deliver nothing. You need AI that works today, not in 18 months."
      deliverables={[
        { title: "AI Operations Audit", description: "We analyze your workflows, identify bottlenecks, and map where AI can create immediate ROI—lead gen, data enrichment, content production, customer support, reporting automation." },
        { title: "Lead Generation & Enrichment Systems", description: "Automated lead scraping (LinkedIn, Apollo, web scraping), data enrichment (company size, tech stack, funding), CRM sync, AI-powered personalization for outbound at scale." },
        { title: "Content & Marketing Automation", description: "AI content repurposing (blog → social → email), SEO content generation, ad copy testing, image/video generation, campaign workflows that run on autopilot." },
        { title: "Workflow Orchestration & Integration", description: "Custom automation workflows (Make.com, n8n, Zapier), API integrations, intelligent routing (leads, tickets, tasks), notifications and escalations." },
        { title: "AI Model Implementation & Training", description: "Custom GPT models for your domain, fine-tuned AI agents (sales assistants, support bots, research analysts), RAG systems for internal knowledge bases." },
        { title: "Team Training & Documentation", description: "SOPs for AI tools, team onboarding, prompt libraries, ongoing support and iteration as your operations evolve." }
      ]}
      whoThisIsFor="B2B companies scaling operations without headcount, sales teams buried in manual research, marketing teams struggling to produce content at scale, ops leaders who know AI is the answer but don't know where to start"
      timeline="2–6 weeks for first AI systems live"
      investment="$8K–$30K for initial implementation + optional retainer"
      ctaHeadline="Ready to build AI systems that actually improve operations?"
      ctaButtonText="Let's Talk AI Strategy"
      faqs={[
        { question: "Where should we start with AI in operations?", answer: "Reddit AI communities and operations forums consistently recommend: start with the most repetitive, high-volume tasks that kill team productivity. Top candidates: lead enrichment and research (sales teams spend 50%+ of time here), content repurposing (marketing bottleneck), ticket categorization and routing (customer support), reporting automation (ops teams waste hours on manual dashboards). Don't start with 'AI strategy'—start with one painful workflow and prove ROI in 30 days." },
        { question: "What's the difference between using ChatGPT and building AI systems?", answer: "Reddit discussions clarify: ChatGPT is a tool, AI systems are workflows. ChatGPT requires manual prompts every time—doesn't scale. AI systems = automated pipelines where AI is one step in a larger process (scrape leads → enrich with AI → personalize outreach → sync to CRM → trigger sequences). Tools like Make.com, n8n, and custom APIs turn AI from a toy into operational infrastructure. The shift: from 'I use ChatGPT sometimes' to 'AI runs 40% of our operations automatically.'" },
        { question: "How do we know if AI will actually save us money vs. hiring more people?", answer: "Reddit operations threads suggest calculating: (hours saved per week) × (hourly cost of employee) × (52 weeks) vs. AI system cost. Example: if sales reps spend 10 hours/week on lead research, and you have 5 reps at $75/hour fully loaded cost, that's $195K/year. An AI lead enrichment system costs $10K–$20K to build and <$5K/year to run. ROI is obvious. The caveat: AI doesn't replace people—it makes them 3–5x more productive. Use AI to scale output, not cut headcount." },
        { question: "What tools do we need for AI operations?", answer: "Reddit AI operations communities recommend a core stack: Make.com or n8n (workflow automation), OpenAI API or Anthropic Claude (AI models), Airtable or Google Sheets (lightweight databases), Zapier (quick integrations), browser automation tools like Bardeen or Phantombuster (web scraping). Avoid: trying to build everything custom in Python unless you have eng resources. Most operational AI = stitching together APIs and no-code tools. Custom development only when ROI justifies it." },
        { question: "How do we prevent AI from generating garbage outputs in our operations?", answer: "Reddit AI practitioners emphasize: AI without guardrails = chaos. Best practices: validate AI outputs with rules-based checks (if email doesn't contain '@', reject), use structured outputs (JSON schemas, not free-text), implement human-in-the-loop review for high-stakes tasks (contracts, customer communications), monitor quality metrics weekly and retrain models when accuracy drops. The mistake: assuming AI is 'set and forget.' Reality: AI systems need ongoing tuning, testing, and quality control—but still 10x faster than manual work." }
      ]}
      strategist={{
        name: "David Chen",
        title: "AI Operations Strategist",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's build AI systems that run your operations on autopilot.",
        calloutDescription: "We'll audit your workflows, identify automation opportunities, and implement AI systems that save your team 20+ hours/week—starting with lead gen, content production, or whatever bottleneck is killing your growth."
      }}
      seoTitle="AI Operations Consulting & Automation | CIELO Agency"
      seoDescription="AI consulting and implementation for operations teams. Lead generation automation, workflow orchestration, and AI systems that improve operations without replacing people."
      seoKeywords="AI operations, AI consulting, operations automation, AI workflow automation, lead generation AI, AI implementation, business process automation"
      onNavigate={onNavigate}
    />
  );
}