import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface ProfessionalWebsiteDesignProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function ProfessionalWebsiteDesign({ onNavigate }: ProfessionalWebsiteDesignProps) {
  return (
    <IndustrySubpageTemplate
      category="Professional Website Design"
      headline="Website Design That\nActually Converts"
      subheadline="Your website isn't a digital brochure. It's a revenue machine."
      heroImage="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most businesses treat websites like online business cards—pretty but pointless. Meanwhile, competitors with conversion-optimized sites capture leads while you sleep. CIELO builds professional websites engineered for one thing: turning visitors into customers. Every page, every button, every word drives action."
      realityText="Your website looks dated. Mobile experience is broken. Forms don't work. Load time kills conversions. Visitors bounce before they scroll. Your site costs you money every day."
      deliverables={[
        {
          title: "Custom Website Design",
          description: "Mobile-first, responsive, modern aesthetic that reflects your brand"
        },
        {
          title: "Conversion Architecture",
          description: "Strategic page flow, CTA placement, friction reduction, form optimization"
        },
        {
          title: "Content Strategy",
          description: "SEO-optimized copywriting, service pages, about us, case studies, blog setup"
        },
        {
          title: "Technical Excellence",
          description: "Fast load times, secure hosting, analytics integration, CRM connection"
        },
        {
          title: "Lead Capture System",
          description: "Contact forms, chat integration, email automation, booking calendars"
        },
        {
          title: "Ongoing Support",
          description: "Monthly updates, security patches, content changes, performance monitoring"
        }
      ]}
      whoThisIsFor="Service businesses, professional services, B2B companies, consultants, agencies"
      timeline="5–7 weeks"
      investment="Starting at $8K"
      ctaHeadline="Build a website that works as hard as you do."
      ctaButtonText="Start Your Website Project"
      faqs={[
        {
          question: "What's the difference between a website and a revenue machine?",
          answer: "A revenue machine is designed with conversion architecture—strategic page flows, optimized CTAs, and friction-free forms that guide visitors toward becoming customers. Most websites are just digital brochures."
        },
        {
          question: "Do you provide hosting and ongoing maintenance?",
          answer: "Yes. We offer secure hosting, monthly updates, security patches, and performance monitoring to ensure your site stays fast, secure, and converting."
        },
        {
          question: "How do you optimize for conversions?",
          answer: "We use data-driven design: strategic CTA placement, minimal friction forms, fast load times, mobile optimization, trust signals, and clear value propositions on every page."
        },
        {
          question: "Can you integrate with my existing tools?",
          answer: "Absolutely. We integrate with CRMs, email marketing platforms, booking systems, payment processors, and analytics tools to create a seamless workflow."
        }
      ]}
      strategist={{
        name: "David Park",
        title: "Conversion-Focused Web Designer",
        image: img210,
        calloutText: "Conversion rate is the only metric that matters",
        calloutDescription: "I've helped 200+ businesses turn their websites from digital brochures into lead-generating revenue machines."
      }}
      onNavigate={onNavigate}
    />
  );
}
