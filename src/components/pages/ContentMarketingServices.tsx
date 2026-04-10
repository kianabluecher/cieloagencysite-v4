import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface ContentMarketingServicesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function ContentMarketingServices({ onNavigate }: ContentMarketingServicesProps) {
  return (
    <IndustrySubpageTemplate
      category="Content Marketing"
      headline="Content Marketing That Converts"
      subheadline="Content without strategy is just expensive blogging."
      heroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most businesses create content randomly—blog posts that nobody reads, videos that don't convert, social posts that disappear. You need content engineered to attract, engage, and convert. CIELO provides content marketing services that drive pipeline. We create content assets that generate leads, nurture prospects, and close deals."
      realityText="Your blog gets zero traffic. Content creation feels like a time sink. No clear ROI on content spend. Previous content agencies delivered quantity, not quality. Your sales team doesn't use your content."
      deliverables={[
        { title: "Content Strategy Development", description: "Audience research, topic mapping, funnel alignment, distribution planning" },
        { title: "Content Creation Services", description: "Blog posts, white papers, case studies, e-books, video scripts, infographics" },
        { title: "SEO Content Writing", description: "Keyword optimization, semantic SEO, internal linking, conversion-focused copy" },
        { title: "Content Distribution", description: "Email marketing, social amplification, paid promotion, syndication partnerships" },
        { title: "Lead Generation Assets", description: "Gated content, lead magnets, calculators, assessments, webinars" },
        { title: "Content Performance Analytics", description: "Traffic metrics, engagement rates, lead attribution, ROI tracking" }
      ]}
      whoThisIsFor="B2B companies, SaaS platforms, consulting firms, professional services, thought leaders"
      timeline="Ongoing (monthly retainer)"
      investment="Starting at $3K/month"
      ctaHeadline="Create content that generates revenue."
      ctaButtonText="Build Your Content Engine"
      faqs={[
        { question: "How do you measure content marketing ROI?", answer: "We track traffic, engagement, lead generation, pipeline contribution, and revenue attribution through analytics, CRM integration, and attribution modeling." },
        { question: "What types of content do you create?", answer: "Blog posts, white papers, case studies, e-books, video scripts, infographics, webinars, email sequences, social content, and sales enablement materials." },
        { question: "Do you handle content distribution?", answer: "Yes. We create content AND distribute it through email, social media, paid promotion, and syndication partnerships to maximize reach and impact." },
        { question: "Can you repurpose existing content?", answer: "Absolutely. We audit your content library and repurpose high-performing pieces into multiple formats to maximize ROI on existing investments." }
      ]}
      strategist={{
        name: "Rachel Kim",
        title: "Content Marketing Strategist",
        image: img210,
        calloutText: "Content builds trust, trust drives revenue",
        calloutDescription: "I've built content engines for 100+ B2B companies that generate qualified leads and accelerate sales cycles."
      }}
      onNavigate={onNavigate}
    />
  );
}