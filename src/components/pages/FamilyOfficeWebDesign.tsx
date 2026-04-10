import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface FamilyOfficeWebDesignProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function FamilyOfficeWebDesign({ onNavigate }: FamilyOfficeWebDesignProps) {
  return (
    <IndustrySubpageTemplate
      category="Web Design & Investor Portals"
      headline="Family Office Web Design & Investor Portals"
      subheadline="Your performance is top-quartile. Your team is world-class. But if your website looks like it was built in 2005—or doesn't exist—sophisticated allocators will question your credibility."
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="The first allocation decision happens on Google. 73% of institutional LPs visit a manager's website before first meeting. 58% cite 'unprofessional website' as a red flag. LPs spend 3 minutes on your site before deciding to engage. CIELO designs investor-facing websites and LP portals for hedge funds, family offices, and fund-of-funds that signal institutional sophistication, operational excellence, and fiduciary trust—turning site visitors into capital allocators."
      realityText="LPs Google you and find an outdated 2012 website or no site at all. Your pitch deck says '$500M AUM' but your website screams 'small boutique.' 58% of LPs cite unprofessional websites as red flags. If you can't build a website, can you manage billions? Your first pitch happens before the first call—and you're losing on Google."
      deliverables={[
        { title: "Institutional-Grade Homepage", description: "Fund name, one-sentence strategy, track record chart, direct CTA, mobile-responsive design" },
        { title: "Strategy & Process Pages", description: "Plain English strategy overview, process diagrams, portfolio construction, competitive edge articulation" },
        { title: "Team & Leadership Bios", description: "PM personal story, track record, personal capital disclosure, team backgrounds, professional headshots" },
        { title: "Password-Protected LP Portal", description: "Secure login (2FA), document library, performance dashboard, news feed, mobile-optimized" },
        { title: "SEO & Mobile Optimization", description: "Google-searchable fund names, mobile-first design (60% of traffic), fast loading, SEC-compliant" },
        { title: "Ongoing Maintenance & Support", description: "Monthly content updates, quarterly thought leadership, bug fixes, security updates, hosting management" }
      ]}
      whoThisIsFor="Hedge funds ($500M-$10B+), family offices (SFOs, MFOs), fund-of-funds managers, private investment firms"
      timeline="Website: 8–12 weeks | LP Portal: +8–12 weeks"
      investment="Website: $50K-$150K | Portal: +$50K-$100K"
      ctaHeadline="Build a website that converts allocations."
      ctaButtonText="Request Website Audit"
      faqs={[
        { question: "What makes a good hedge fund website?", answer: "Must-have pages: Homepage (fund name + strategy + track record + CTA), Strategy (what you do, how, why different), Team (PM bio + backgrounds), Contact (direct email, phone, calendar). Design: clean/professional/institutional, mobile-responsive, fast loading, SEC-compliant. Avoid: generic stock photos, vague messaging, hidden contact info, outdated 2005 design." },
        { question: "How do you design an investor portal for family offices?", answer: "Family offices need: Performance reporting (monthly letters, quarterly reports, annual summaries), Document library (organized by year/quarter with search), Secure login (2FA optional, role-based access), Communication tools (message PM, meeting scheduler, news feed). Design: simple not complex, fast access to critical docs, professional brand reflection, mobile-friendly." },
        { question: "How much does a hedge fund website cost?", answer: "Basic site (5 pages): $25K-$50K, Full site (10+ pages): $50K-$100K, Site + LP Portal: $100K-$200K, Custom platform: $200K+. Timeline: 8-16 weeks. ROI: If website helps close 1 additional $50M allocation = $1M/year in fees. $100K website pays for itself 10x+ over 3 years." },
        { question: "Should hedge funds have a blog or thought leadership section?", answer: "IF you have bandwidth: publish quarterly thought leadership (market outlook, strategy deep-dives, industry trends). IF you don't: don't force it—better no blog than stale blog (last post 2019). Alternative: publish quarterly LP letters publicly with performance redacted. Shows transparency + thought leadership without extra work." }
      ]}
      strategist={{
        name: "Alexander Reeves",
        title: "Investor Portal UX Strategist",
        image: img210,
        calloutText: "First impressions happen on Google",
        calloutDescription: "I've designed 50+ institutional-grade websites and LP portals for hedge funds and family offices that collectively raised $5B+ in new capital."
      }}
      onNavigate={onNavigate}
    />
  );
}