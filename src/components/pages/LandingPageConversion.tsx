import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface LandingPageConversionProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function LandingPageConversion({ onNavigate }: LandingPageConversionProps) {
  return (
    <IndustrySubpageTemplate
      category="Landing Page Design"
      headline="Landing Pages Built to Convert"
      subheadline="Traffic without conversions is just expensive entertainment."
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="You're running ads, sending emails, posting on social—but your landing pages leak money. Poor design, weak copy, and zero conversion strategy mean visitors bounce before they buy. CIELO designs landing pages with one metric in mind: conversion rate. We engineer every element to guide visitors toward action, turning paid traffic into profitable customers."
      realityText="Your landing page looks like your homepage (mistake #1). No clear value proposition. Too many distractions. Forms are too long. Load time kills mobile traffic. Conversion rate sits below 2%."
      deliverables={[
        {
          title: "High-Converting Landing Page Design",
          description: "Singular focus, distraction-free layouts, mobile-optimized"
        },
        {
          title: "Conversion Copywriting",
          description: "Headlines that hook, benefits that sell, CTAs that drive action"
        },
        {
          title: "A/B Testing Strategy",
          description: "Multiple design variations, headline tests, CTA experiments, data-driven decisions"
        },
        {
          title: "Form Optimization",
          description: "Minimal friction, multi-step forms, conditional logic, auto-fill enabled"
        },
        {
          title: "Trust Elements",
          description: "Social proof, testimonials, guarantees, security badges, media mentions"
        },
        {
          title: "Technical Setup",
          description: "Fast hosting, tracking pixels, analytics, heat mapping, lead routing"
        }
      ]}
      whoThisIsFor="Digital marketers, SaaS companies, course creators, lead generation businesses, PPC advertisers"
      timeline="2–3 weeks"
      investment="Starting at $3K per landing page"
      ctaHeadline="Stop paying for traffic that doesn't convert."
      ctaButtonText="Build High-Converting Pages"
      faqs={[
        {
          question: "What's the average conversion rate improvement?",
          answer: "Most clients see 2-3x improvement in conversion rates within the first month. We've helped landing pages go from 1.5% to 5%+ conversion rates through strategic design and copywriting."
        },
        {
          question: "Do you provide A/B testing?",
          answer: "Yes. We create multiple variations to test headlines, CTAs, layouts, and offers. Continuous testing drives ongoing conversion improvements."
        },
        {
          question: "How do you optimize forms for conversions?",
          answer: "We use multi-step forms, conditional logic, minimal required fields, auto-fill, progress indicators, and mobile optimization to reduce friction and increase completions."
        },
        {
          question: "Can you integrate with my ad platforms?",
          answer: "Absolutely. We set up tracking pixels, conversion events, and analytics for Google Ads, Facebook Ads, LinkedIn Ads, and other platforms for proper attribution."
        }
      ]}
      strategist={{
        name: "Sarah Mitchell",
        title: "Conversion Rate Optimization Specialist",
        image: img210,
        calloutText: "Every element exists to drive one action",
        calloutDescription: "I've optimized 500+ landing pages, turning underperforming campaigns into profit machines through data-driven design."
      }}
      onNavigate={onNavigate}
    />
  );
}