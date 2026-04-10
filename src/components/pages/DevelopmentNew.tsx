import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface DevelopmentNewProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function DevelopmentNew({ onNavigate }: DevelopmentNewProps) {
  return (
    <IndustrySubpageTemplate
      category="Development"
      headline="Custom Web Apps & Digital Systems"
      subheadline="React, Next.js, and scalable infrastructure built to grow with your brand."
      heroImage="https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="Template websites look the same because they are the same. Your business runs on spreadsheets, Slack chaos, and manual processes because internal systems are expensive. CIELO builds custom web apps and internal dashboards that actually reflect your operations—not generic workflows. From customer portals to CRM integrations to automation engines, we design systems that scale with you, not against you."
      realityText="You're using Webflow or Wix but need custom logic your template can't handle. Your backend is a patchwork of integrations that break constantly. Internal teams waste hours on manual data entry because you don't have a proper dashboard. You know you need a custom system, but developers quote 6-figure budgets and 6-month timelines."
      deliverables={[
        { title: "Custom Web Applications", description: "React, Next.js, TypeScript apps with modern architecture and scalable infrastructure tailored to your exact needs." },
        { title: "Internal Dashboards & CRMs", description: "Real-time data visualization, team collaboration tools, custom workflow management systems." },
        { title: "API Integrations & Automation", description: "Connect your tech stack—Supabase, Stripe, HubSpot, Make, n8n—without breaking existing systems." },
        { title: "Tech Stack Consultation", description: "We recommend the right tools: Webflow for marketing sites, React for complex apps, Supabase for backends." },
        { title: "Ongoing Support & Iteration", description: "Post-launch maintenance, feature updates, bug fixes, and performance optimization as you scale." }
      ]}
      whoThisIsFor="B2B SaaS teams that need more than templates, agencies managing client portals, startups building MVP dashboards, funded companies scaling infrastructure"
      timeline="2–8 weeks (depending on scope)"
      investment="$8K–$50K"
      ctaHeadline="Ready to build something custom?"
      ctaButtonText="Start Your Project"
      faqs={[
        { question: "Should we use Webflow, Framer, or build custom with React?", answer: "Reddit developers report that Webflow is great for marketing sites and simple CMS needs, Framer for interactive landing pages, but custom React/Next.js is necessary when you need complex logic, user authentication, real-time data, or integrations that templates can't support. We'll recommend the right tool based on your actual needs, not upsell you on over-engineering." },
        { question: "How much does a custom web app really cost?", answer: "Reddit threads consistently show $15K–$50K for a production-ready MVP with backend, $5K–$15K for simpler tools or dashboards. Agencies charging $100K+ are often including months of strategy and enterprise-scale infrastructure. CIELO focuses on lean, functional builds that you can iterate on, not bloated systems you'll never fully use." },
        { question: "What's the difference between Supabase, Firebase, and a custom backend?", answer: "Supabase gives you Postgres, authentication, and real-time APIs instantly—Reddit devs love it for speed and SQL flexibility. Firebase is faster for prototyping but locks you into NoSQL. Custom backends (Node, Python) offer total control but take longer. Most early-stage companies should use Supabase or Firebase and only go custom when scaling becomes an actual issue." },
        { question: "Can you integrate with our existing tools (HubSpot, Stripe, Salesforce)?", answer: "Yes. We build API integrations using Make, n8n, or custom middleware. Reddit automation communities emphasize that 80% of integrations don't need custom code—tools like Make handle most workflows. For the 20% that do, we write clean, maintainable code so you're not stuck with a brittle system." }
      ]}
      strategist={{
        name: "Alex Martinez",
        title: "Lead Developer",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's build the system your business actually needs.",
        calloutDescription: "We'll walk through your workflows, identify bottlenecks, and design a custom solution that saves time and scales with your growth."
      }}
      seoTitle="Custom Web Development & Internal Systems | CIELO Agency"
      seoDescription="Custom web apps, dashboards, and digital systems built with React, Next.js, and Supabase. Scalable infrastructure for B2B SaaS and growing companies."
      seoKeywords="custom web development, React development, Next.js apps, internal dashboards, CRM development, API integrations, Supabase development"
      onNavigate={onNavigate}
    />
  );
}