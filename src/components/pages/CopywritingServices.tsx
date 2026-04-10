import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface CopywritingServicesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function CopywritingServices({ onNavigate }: CopywritingServicesProps) {
  return (
    <IndustrySubpageTemplate
      category="Copywriting Services"
      headline="Copywriting That Sells"
      subheadline="Words are the cheapest way to make money. Or lose it."
      heroImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Amateur copy costs you customers every day. Weak headlines, generic value props, and boring CTAs mean visitors read your site and buy from competitors. CIELO delivers conversion copywriting that turns browsers into buyers. Every word earns its place—driving clicks, capturing leads, closing deals."
      realityText="Your website copy sounds like everyone else's. Value proposition is vague. Visitors don't understand what you do. Product descriptions don't sell. Email open rates are abysmal. Sales materials don't close."
      deliverables={[
        { title: "Website Copywriting", description: "Homepage, service pages, about us, product descriptions, landing pages" },
        { title: "Sales Copy", description: "Email sequences, sales letters, landing pages, video scripts, ad copy" },
        { title: "Brand Messaging", description: "Positioning statements, taglines, value propositions, elevator pitches" },
        { title: "Content Copywriting", description: "Blog posts, case studies, white papers, social media content" },
        { title: "Email Marketing Copy", description: "Welcome series, nurture sequences, promotional campaigns, cart abandonment" },
        { title: "Conversion Optimization", description: "A/B test variations, headline testing, CTA refinement, continuous improvement" }
      ]}
      whoThisIsFor="E-commerce brands, SaaS companies, service businesses, B2B companies, coaches and consultants"
      timeline="2–4 weeks"
      investment="Starting at $4K per project"
      ctaHeadline="Stop losing customers to bad copy."
      ctaButtonText="Hire Expert Copywriters"
      faqs={[
        { question: "What's the difference between copywriting and content writing?", answer: "Copywriting drives immediate action (sales, signups, clicks). Content writing educates and builds trust over time. Both are essential but serve different purposes." },
        { question: "Do you write for specific industries?", answer: "Yes. Our copywriters specialize in B2B, SaaS, e-commerce, healthcare, finance, and professional services with deep understanding of each market." },
        { question: "Can you rewrite existing website copy?", answer: "Absolutely. We audit your current copy, identify weak points, and rewrite for clarity, persuasion, and conversion optimization." },
        { question: "Do you provide A/B testing variations?", answer: "Yes. We create multiple headline and CTA variations to test performance and continuously improve conversion rates." }
      ]}
      strategist={{
        name: "Mike Sullivan",
        title: "Conversion Copywriter",
        image: img210,
        calloutText: "Every word either makes or loses money",
        calloutDescription: "I've written copy for 300+ brands that drove millions in revenue through strategic messaging and conversion optimization."
      }}
      onNavigate={onNavigate}
    />
  );
}