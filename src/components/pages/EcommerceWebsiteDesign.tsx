import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface EcommerceWebsiteDesignProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function EcommerceWebsiteDesign({ onNavigate }: EcommerceWebsiteDesignProps) {
  return (
    <IndustrySubpageTemplate
      category="E-Commerce Website Design"
      headline="E-Commerce Design That Sells"
      subheadline="Pretty stores don't pay the bills. Profitable ones do."
      heroImage="https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most e-commerce brands launch with template stores and wonder why sales stay flat. Product pages that don't convert, checkout flows that leak customers, and mobile experiences that frustrate buyers. CIELO builds e-commerce websites engineered to maximize revenue per visitor. We optimize every touchpoint from first click to final purchase—and beyond."
      realityText="Your Shopify theme looks like 10,000 other stores. Product pages don't communicate value. Cart abandonment rate is 70%+. Mobile checkout is broken. No post-purchase experience drives repeat orders."
      deliverables={[
        {
          title: "Custom E-Commerce Design",
          description: "Shopify, WooCommerce, or custom platform—optimized for your products"
        },
        {
          title: "Product Page Optimization",
          description: "Conversion-focused layouts, benefit-driven copy, trust signals, urgency triggers"
        },
        {
          title: "Checkout Flow Engineering",
          description: "Reduced friction, one-click purchasing, mobile optimization, abandoned cart recovery"
        },
        {
          title: "Email Marketing Integration",
          description: "Welcome series, abandoned cart emails, post-purchase sequences, win-back campaigns"
        },
        {
          title: "Conversion Rate Optimization",
          description: "A/B testing, heat mapping, user behavior analysis, continuous improvement"
        },
        {
          title: "Brand Experience Design",
          description: "Unboxing strategy, packaging design, loyalty programs, referral systems"
        }
      ]}
      whoThisIsFor="DTC brands, product businesses, online retailers, Shopify stores, Amazon sellers going direct"
      timeline="6–8 weeks"
      investment="Starting at $12K"
      ctaHeadline="Build a store that converts browsers into buyers."
      ctaButtonText="Start Your E-Commerce Project"
      faqs={[
        {
          question: "Do you work with Shopify or other platforms?",
          answer: "Yes. We design for Shopify, WooCommerce, BigCommerce, and custom platforms. Each has strengths depending on your product type and business model."
        },
        {
          question: "How do you reduce cart abandonment?",
          answer: "Through checkout optimization, trust signals, progress indicators, guest checkout options, and automated abandoned cart email sequences that recover lost sales."
        },
        {
          question: "Can you help with product photography and content?",
          answer: "Absolutely. We provide art direction for product photography, write benefit-driven product descriptions, and create conversion-focused page layouts."
        },
        {
          question: "What about mobile optimization?",
          answer: "Mobile accounts for 60%+ of e-commerce traffic. We design mobile-first experiences with touch-friendly navigation, fast load times, and streamlined mobile checkout."
        }
      ]}
      strategist={{
        name: "Alex Rivera",
        title: "E-Commerce Conversion Strategist",
        image: img210,
        calloutText: "Revenue per visitor is the ultimate metric",
        calloutDescription: "I've helped DTC brands scale from $100K to $10M+ through strategic e-commerce design and conversion optimization."
      }}
      onNavigate={onNavigate}
    />
  );
}