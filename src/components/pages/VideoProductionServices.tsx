import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface VideoProductionServicesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function VideoProductionServices({ onNavigate }: VideoProductionServicesProps) {
  return (
    <IndustrySubpageTemplate
      category="Video Production Services"
      headline="Video Production\nThat Drives Results"
      subheadline="Video isn't optional anymore. It's essential."
      heroImage="https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Businesses that leverage video grow revenue 49% faster than those that don't. But amateur videos with poor production quality hurt your brand more than they help. CIELO produces professional video content designed for conversion—not just views. We create videos that educate, engage, and drive action."
      realityText="Your iPhone videos look amateur. No clear video strategy. Production quality hurts credibility. YouTube channel has 47 subscribers (all employees). Videos don't drive leads or sales."
      deliverables={[
        { title: "Video Production Services", description: "Concept development, scriptwriting, filming, editing, post-production" },
        { title: "Branded Content Creation", description: "Company overviews, founder stories, culture videos, recruitment content" },
        { title: "Product & Service Videos", description: "Demos, tutorials, explainers, testimonials, case studies" },
        { title: "Social Media Video", description: "Instagram Reels, TikTok content, YouTube Shorts, LinkedIn videos" },
        { title: "Video Marketing Strategy", description: "Distribution planning, SEO optimization, paid promotion, conversion tracking" },
        { title: "Ongoing Video Content", description: "Monthly retainer for consistent video output across all platforms" }
      ]}
      whoThisIsFor="B2B companies, SaaS platforms, e-commerce brands, professional services, training companies"
      timeline="4–6 weeks"
      investment="Starting at $8K per video project"
      ctaHeadline="Build video content that converts."
      ctaButtonText="Start Video Production"
      faqs={[
        { question: "What's included in video production?", answer: "Full-service production: concept development, scriptwriting, on-location filming, professional editing, motion graphics, sound design, and final delivery in all formats." },
        { question: "Do you provide video marketing strategy?", answer: "Yes. We develop distribution strategies, optimize for SEO, create paid promotion plans, and track conversion metrics to ensure videos drive business results." },
        { question: "Can you create short-form social content?", answer: "Absolutely. We produce Instagram Reels, TikTok videos, YouTube Shorts, and LinkedIn content optimized for each platform's algorithm and audience." },
        { question: "Do you offer ongoing video content retainers?", answer: "Yes. Monthly retainers ensure consistent video output for brand awareness, product launches, social media, and sales enablement." }
      ]}
      strategist={{
        name: "Jordan Lee",
        title: "Video Marketing Strategist",
        image: img210,
        calloutText: "Video builds trust faster than any other medium",
        calloutDescription: "I've produced 500+ videos for brands that drove millions in pipeline through strategic storytelling and conversion-focused production."
      }}
      onNavigate={onNavigate}
    />
  );
}
