import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface RestaurantBrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function RestaurantBranding({ onNavigate }: RestaurantBrandingProps) {
  return (
    <IndustrySubpageTemplate
      category="Restaurant Branding & Menu Design"
      headline="Restaurant Branding\nThat Fills Tables"
      subheadline="Your menu isn't food. It's your first impression."
      heroImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjA4OTkxOTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      description="Restaurant branding isn't Edison bulbs and pretty fonts. It's building an identity that drives repeat visits, Instagram shares, and word-of-mouth that scales faster than any ad campaign. CIELO creates restaurant brands that work across dine-in, delivery, and social. We design menus, signage, packaging, and digital assets—all built to grow with you from popup to empire."
      realityText="Your brand doesn't match your food quality. Menu design feels amateur or outdated. Social media isn't driving foot traffic. You have no cohesive identity across signage, packaging, and web."
      deliverables={[
        {
          title: "Restaurant Brand Identity",
          description: "Logo, color system, typography, photography direction that tells your story"
        },
        {
          title: "Menu Design",
          description: "Dine-in, takeout, digital (QR-friendly, print-ready, engineered for upsells)"
        },
        {
          title: "Signage & Interior Branding",
          description: "Window decals, interior murals, table tents, bathroom posters"
        },
        {
          title: "Packaging Design",
          description: "To-go boxes, bags, stickers, merchandise that turns customers into brand ambassadors"
        },
        {
          title: "Social Media Templates",
          description: "Instagram story formats, Reels concepts, UGC strategy for virality"
        },
        {
          title: "Website + Online Ordering",
          description: "Mobile-first site with reservation and ordering integration"
        }
      ]}
      whoThisIsFor="New restaurant launches, rebrand projects, multi-location concepts, ghost kitchens, food trucks"
      timeline="4–6 weeks"
      investment="From $8K (startups) | $15K+ (multi-location)"
      ctaHeadline="Your concept deserves a brand that matches"
      ctaButtonText="Build Your Restaurant Brand"
      faqs={[
        {
          question: "Do you design menus that increase sales?",
          answer: "Yes. We engineer menu layouts, psychology, and pricing that drive upsells and maximize revenue per table."
        },
        {
          question: "Can you help with food truck branding?",
          answer: "Absolutely. We create vehicle wraps, menu boards, packaging, and social strategies for mobile food businesses."
        },
        {
          question: "What about multi-location restaurants?",
          answer: "We scale brand systems across multiple locations while maintaining local relevance. Investment starts at $15K+ for multi-location projects."
        },
        {
          question: "Do you handle packaging for delivery?",
          answer: "Yes. We design to-go packaging that protects food quality and turns customers into brand ambassadors."
        },
        {
          question: "How long does restaurant branding take?",
          answer: "4–6 weeks for most projects, including strategy, identity, menu design, signage, and packaging."
        }
      ]}
      strategist={{
        name: "Zandra Drysdale",
        title: "Brand Strategist",
        image: img210,
        calloutText: "From menu to merch",
        calloutDescription: "Get personalized insights on how to build a restaurant brand that drives repeat business and social buzz. Our strategist will help you create cohesive identity across all touchpoints."
      }}
      onNavigate={onNavigate}
    />
  );
}
