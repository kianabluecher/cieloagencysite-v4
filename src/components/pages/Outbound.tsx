import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface OutboundProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function Outbound({ onNavigate }: OutboundProps) {
  return (
    <IndustrySubpageTemplate
      category="Outbound"
      headline="Cold Email That Doesn't Feel Cold"
      subheadline="Outbound systems that book meetings, not spam folders—built for B2B sales teams that need pipeline, not just open rates."
      heroImage="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="Your sales team sends 500 cold emails a week and books 2 meetings. Your sequences get flagged as spam because they read like ChatGPT templates. You're buying lead lists from sketchy vendors and burning domain reputation. CIELO builds outbound systems—not just email copy—that personalize at scale, stay out of spam, and actually book qualified meetings. We handle the infrastructure (domains, inboxes, tools) and the creative (messaging, sequences, A/B tests) so your reps focus on closing, not troubleshooting deliverability."
      realityText="You're using Apollo or Instantly but don't understand why deliverability tanked. Your cold emails sound like everyone else's because you're using the same templates. Sales reps spend hours researching prospects manually instead of selling. You know outbound works for competitors, but your team can't crack the formula. You're burning through domains and your IT team is asking why you need 15 Gmail accounts."
      deliverables={[
        { title: "Outbound Infrastructure Setup", description: "Custom domain setup, email warmup, inbox configuration (Google Workspace, Outlook), deliverability monitoring, SPF/DKIM/DMARC records." },
        { title: "Lead List Building & Enrichment", description: "ICP research, lead scraping (Apollo, LinkedIn Sales Navigator), data enrichment (company size, tech stack, funding), segmentation for personalized targeting." },
        { title: "Email Copywriting & Sequences", description: "Personalized cold email templates, multi-step sequences (intro, follow-up, breakup), A/B testing frameworks, subject line optimization." },
        { title: "Tool Integration & Automation", description: "Setup for Instantly, Smartlead, Lemlist, or Apollo; CRM integration (HubSpot, Salesforce); workflow automation for handoff to sales reps." },
        { title: "Performance Tracking & Iteration", description: "Open rates, reply rates, meeting-booked conversion; monthly reporting; ongoing copy testing and list refinement." }
      ]}
      whoThisIsFor="B2B SaaS companies building outbound motion, agencies selling retainers, funded startups needing pipeline fast, sales teams stuck at 1% reply rates"
      timeline="2–4 weeks to launch first campaigns"
      investment="$5K–$20K setup + optional monthly retainer"
      ctaHeadline="Ready to build an outbound engine that books meetings?"
      ctaButtonText="Let's Talk Outbound"
      faqs={[
        { question: "Why do my cold emails keep going to spam?", answer: "Reddit outbound communities identify the top culprits: bad domain reputation (sending too much volume too fast), missing SPF/DKIM/DMARC records, using spam trigger words ('free,' 'guarantee,' 'limited time'), and poor engagement (low reply rates signal spam to ESPs). The fix: warm up domains properly (Instantly, Mailreach), send personalized emails (not mass blasts), and monitor deliverability with tools like GlockApps or Mail Tester." },
        { question: "What's the difference between Instantly, Smartlead, and Lemlist?", answer: "Reddit sales threads show Instantly is cheapest and best for high-volume cold email, Smartlead focuses on multi-inbox deliverability and warmup, Lemlist adds video/image personalization but costs more. Most early-stage teams start with Instantly for cost and scale, then layer in Smartlead if deliverability becomes an issue. Lemlist is for teams prioritizing creative personalization over volume." },
        { question: "How many emails should we send per day per inbox?", answer: "Reddit consensus: 20–40 emails/day per inbox when starting (to build sender reputation), then scale to 50–80 once warmed. Sending 200+ per day per inbox triggers spam filters. The workaround: use 5–10 inboxes in rotation. Tools like Instantly and Smartlead handle rotation automatically." },
        { question: "Should we buy lead lists or build our own?", answer: "Reddit sales communities warn against buying generic lead lists—data is often outdated, emails bounce, and you burn domain reputation fast. Better: scrape leads yourself using Apollo, LinkedIn Sales Navigator, or Phantombuster, then verify emails with NeverBounce or ZeroBounce. Building your own list takes longer but results in higher reply rates and fewer spam complaints." },
        { question: "How do we personalize cold emails at scale?", answer: "Reddit outbound experts recommend using variables (first name, company name, recent funding/news) plus conditional logic (if they raised Series A, mention scaling; if they're hiring, reference team growth). Tools like Instantly and Smartlead support dynamic variables. Avoid generic 'I saw your LinkedIn' openers—everyone uses them. Real personalization = referencing something specific to their business that proves you researched them." }
      ]}
      strategist={{
        name: "Marcus Rivera",
        title: "Outbound Strategist",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's build an outbound system that scales.",
        calloutDescription: "We'll audit your current setup, fix deliverability issues, write sequences that get replies, and build infrastructure so you can scale from 50 to 5,000 emails/day without hitting spam."
      }}
      seoTitle="Cold Email Marketing & Outbound Sales | CIELO Agency"
      seoDescription="Outbound email systems that book meetings, not spam folders. Lead gen, email sequences, deliverability setup, and automation for B2B sales teams."
      seoKeywords="cold email marketing, outbound sales, lead generation, email deliverability, B2B sales outreach, email automation, cold outreach"
      onNavigate={onNavigate}
    />
  );
}