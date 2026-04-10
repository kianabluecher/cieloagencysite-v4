import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface OnlineCoachingBrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function OnlineCoachingBranding({ onNavigate }: OnlineCoachingBrandingProps) {
  return (
    <IndustrySubpageTemplate
      category="Online Coaching Branding"
      headline="Coaching Brands\nThat Convert Scrollers"
      subheadline="Coaching isn't a side hustle. It's a scalable business—if you brand it like one."
      heroImage="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FjaGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MDg5OTE5NHww&ixlib=rb-4.1.0&q=80&w=1080"
      description="Most coaches launch with scattered messaging, DIY Canva logos, and zero positioning. Result? You blend in. You undercharge. You burn out. CIELO builds coaching brands that signal authority—not amateur hour. We clarify your niche, create visual systems that scream expertise, and build content engines that turn social posts into booked calendars."
      realityText="Your brand doesn't reflect your expertise. You're attracting tire-kickers, not serious clients. Your messaging is inconsistent across platforms. You have no scalable system for content or sales."
      deliverables={[
        {
          title: "Coaching Brand Identity",
          description: "Logo, color palette, typography, headshot direction that positions you as premium"
        },
        {
          title: "Niche Positioning Strategy",
          description: "Define your ICA (ideal client avatar), unique methodology, pricing architecture"
        },
        {
          title: "Lead Generation System",
          description: "Lead magnets, email sequences, discovery call scripts, testimonial frameworks"
        },
        {
          title: "Website + Funnel Design",
          description: "Landing pages, course hosting, payment integration, booking automation"
        },
        {
          title: "Social Media Content Engine",
          description: "Platform-specific templates (Instagram, LinkedIn, TikTok) tied to your offers"
        },
        {
          title: "Signature Framework Development",
          description: "Proprietary method naming, visual diagrams, course curriculum structure"
        }
      ]}
      whoThisIsFor="Business coaches, health coaches, life coaches, consultants productizing knowledge"
      timeline="3–5 weeks"
      investment="From $8K"
      ctaHeadline="Build authority. Book clients. Scale revenue."
      ctaButtonText="Launch Your Coaching Brand"
      faqs={[
        {
          question: "How do you help coaches scale revenue?",
          answer: "We build positioning and content systems that attract premium clients, not tire-kickers. This includes niche clarity, pricing frameworks, and lead generation automation."
        },
        {
          question: "What's included in the coaching brand?",
          answer: "Logo, color system, headshot direction, website with funnel integration, social content templates, signature framework development, and sales collateral."
        },
        {
          question: "Can you help me define my niche?",
          answer: "Yes. We work with you to clarify your ideal client avatar, unique methodology, and positioning that commands premium pricing."
        },
        {
          question: "Do you create my signature framework?",
          answer: "Absolutely. We develop proprietary method naming, visual diagrams, and course curriculum structure that differentiates you from generic coaches."
        },
        {
          question: "How long does coaching branding take?",
          answer: "3–5 weeks for most projects, including strategy, identity, website, and content system development."
        }
      ]}
      strategist={{
        name: "Zandra Drysdale",
        title: "Brand Strategist",
        image: img210,
        calloutText: "From underpriced to premium",
        calloutDescription: "Get personalized insights on how to position yourself as a premium coach. Our strategist will help you clarify your niche, build authority systems, and create funnels that convert."
      }}
      onNavigate={onNavigate}
    />
  );
}
