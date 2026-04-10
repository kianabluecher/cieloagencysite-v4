import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface SEOServicesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function SEOServices({ onNavigate }: SEOServicesProps) {
  return (
    <IndustrySubpageTemplate
      category="SEO Services"
      headline="SEO That Ranks\nand Converts"
      subheadline="Page 2 of Google is where dreams go to die."
      heroImage="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most SEO agencies promise rankings but deliver traffic that doesn't convert. You need SEO that drives qualified visitors who actually become customers—not just vanity metrics. CIELO provides SEO services focused on revenue, not rankings. We optimize for keywords that your ideal customers actually search—and convert them when they arrive."
      realityText="Your website ranks for keywords nobody searches. Traffic comes but doesn't convert. Previous SEO agencies disappeared after taking your money. Competitors dominate your local market. Google penalties tanked your rankings."
      deliverables={[
        { title: "SEO Strategy & Audit", description: "Technical audit, keyword research, competitive analysis, opportunity mapping" },
        { title: "On-Page Optimization", description: "Content optimization, meta tags, header structure, internal linking, schema markup" },
        { title: "Technical SEO", description: "Site speed, mobile optimization, crawl errors, XML sitemaps, robots.txt" },
        { title: "Content Marketing", description: "SEO blog strategy, pillar content, topic clusters, link-worthy assets" },
        { title: "Link Building", description: "White-hat backlinks, guest posting, digital PR, broken link recovery" },
        { title: "Local SEO Services", description: "Google Business optimization, local citations, review generation, map rankings" }
      ]}
      whoThisIsFor="Local businesses, service providers, e-commerce stores, B2B companies, multi-location businesses"
      timeline="Results in 3-6 months (ongoing service)"
      investment="Starting at $2K/month"
      ctaHeadline="Stop hiding on page 2. Start dominating page 1."
      ctaButtonText="Launch SEO Campaign"
      faqs={[
        { question: "How long until we see SEO results?", answer: "Initial improvements appear within 30-60 days. Significant rankings and traffic growth typically occur within 3-6 months with ongoing optimization." },
        { question: "What's included in the SEO audit?", answer: "Technical analysis, keyword opportunities, competitive research, on-page issues, backlink profile review, and prioritized action plan." },
        { question: "Do you guarantee #1 rankings?", answer: "No reputable SEO agency guarantees rankings. We focus on ranking for keywords that drive revenue, not vanity positions for irrelevant terms." },
        { question: "How do you approach local SEO?", answer: "Google Business Profile optimization, local citation building, review generation, location-specific content, and map pack rankings." }
      ]}
      strategist={{
        name: "Chris Anderson",
        title: "SEO & Revenue Strategist",
        image: img210,
        calloutText: "Rankings without revenue are worthless",
        calloutDescription: "I've helped 250+ businesses dominate their markets through strategic SEO that drives qualified traffic and measurable revenue."
      }}
      onNavigate={onNavigate}
    />
  );
}
