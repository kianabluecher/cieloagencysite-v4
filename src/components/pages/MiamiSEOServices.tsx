import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface MiamiSEOServicesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function MiamiSEOServices({ onNavigate }: MiamiSEOServicesProps) {
  return (
    <IndustrySubpageTemplate
      category="Local SEO Services"
      headline="Miami SEO Services\nFor Brands That Want Leads"
      subheadline="Rank for the searches that matter in Miami—and turn them into booked calls, demos, and deals."
      heroImage="https://images.unsplash.com/photo-1506974210756-8e1b8985d348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="You've paid for 'SEO' before and got reports, not revenue. You rank for random blog topics but not for 'service + Miami' when buyers are ready to act. Competitors with weaker offers show up above you on Google Maps and organic results. CIELO's Miami SEO services get you found for high‑intent searches like 'SEO services Miami' and 'Miami SEO agency' by people ready to talk. We clean up your site structure, content, and local signals so Google sees you as the obvious local choice—and connect rankings directly to form fills, calls, and pipeline."
      realityText="You paid for SEO and got reports, not revenue. You rank for random blog topics, not 'service + Miami' when buyers search. Competitors with weaker offers rank above you on Google Maps and organic. You don't have time to decode algorithms, local packs, schema, and AI Overviews. You need SEO that turns into leads, not vanity rankings."
      deliverables={[
        { title: "Local Search Audit – Where You Stand Now", description: "Review current rankings, content, and Google Business Profile against Miami competitors. Map out all 'service + Miami' and 'near me' terms buyers actually use." },
        { title: "Intent‑Led Content – Pages That Win Buyers", description: "Build or upgrade core pages (home, services, industry pages) around Miami SEO keywords that convert. Create supporting content that answers exact pre-hiring questions." },
        { title: "Ongoing Optimization – Adjust as Market Moves", description: "Monthly tuning of internal links, meta data, local citations, and content depth. Clear reporting on leads and deals influenced by organic search." },
        { title: "Miami SEO Roadmap", description: "Target keywords, page priorities, and technical fixes—all mapped to revenue outcomes, not just rankings." },
        { title: "Google Business Profile Optimization", description: "Citation plan and review strategy tailored to your niche—so you dominate Miami local pack results." },
        { title: "Transparent Monthly Reporting", description: "Plain‑English explanations, clear KPIs, and lead attribution—see what SEO is really worth to your business." }
      ]}
      whoThisIsFor="Service businesses, SaaS, professional firms based in or targeting Miami and South Florida—teams that want transparent SEO with clear KPIs and local authority"
      timeline="SEO Audit: 1 week | Implementation: 3–6 months"
      investment="$5K-$10K/month (ongoing SEO)"
      ctaHeadline="Want Miami search traffic that turns into real leads?"
      ctaButtonText="Schedule SEO Strategy Call"
      faqs={[
        { question: "How long does it take to rank in a competitive city like Miami?", answer: "SEO practitioners on Reddit commonly report 3–6 months to see strong movement in competitive local markets, assuming technical issues are fixed and content matches intent. Sites with some authority may see earlier wins on long‑tails." },
        { question: "Is local SEO really different from 'normal' SEO?", answer: "Yes. Local threads highlight the impact of Google Business Profiles, reviews, NAP consistency, and location signals, which matter far more for 'near me' and city‑based searches than for generic national queries." },
        { question: "Should I invest in SEO or just run Google Ads in Miami?", answer: "Reddit marketers often recommend a hybrid approach: use paid search to test keywords and offers quickly, while SEO builds durable rankings that reduce cost per lead over time. Both channels inform each other when managed well." },
        { question: "How do I know if my SEO agency is actually doing the work?", answer: "The biggest complaint in r/SEO and r/smallbusiness is opaque reporting. At minimum, you should see what was published or changed, what keywords are being tracked, and how many leads came from organic each month." }
      ]}
      strategist={{
        name: "Sofia Martinez",
        title: "Miami SEO Strategist",
        image: img210,
        calloutText: "Local SEO drives revenue, not just rankings",
        calloutDescription: "I've helped 50+ Miami businesses dominate local search—turning Google rankings into $10M+ in pipeline through intent-led content and transparent optimization."
      }}
      onNavigate={onNavigate}
    />
  );
}
