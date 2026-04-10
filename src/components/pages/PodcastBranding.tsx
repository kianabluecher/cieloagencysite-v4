import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface PodcastBrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function PodcastBranding({ onNavigate }: PodcastBrandingProps) {
  return (
    <IndustrySubpageTemplate
      category="Podcast Branding & Monetization"
      headline="Podcast Branding\nThat Prints Money"
      subheadline="Your podcast isn't content. It's leverage."
      heroImage="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2RjYXN0JTIwbWljcm9waG9uZXxlbnwxfHx8fDE3NjA4OTkxOTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      description="Most podcasters chase sponsorships before building positioning. Result? Low CPMs, inconsistent revenue, and a show that feels like work instead of wealth. CIELO flips the model. We transform your podcast into a credibility engine that drives coaching clients, consulting retainers, course sales, and premium sponsorships—by building the brand strategy that makes your show the top of your funnel."
      realityText="You're getting downloads but no revenue. Sponsors ghost you or lowball rates. Your show doesn't position you as the authority, and there's no clear path from listener to customer."
      deliverables={[
        {
          title: "Podcast Brand Identity",
          description: "Show name refinement, logo, cover art, intro/outro scripts that hook attention"
        },
        {
          title: "Positioning Strategy",
          description: "Define your niche, audience, and monetization model (products, services, or premium ads)"
        },
        {
          title: "Monetization Content System",
          description: "Lead magnets, email sequences, course frameworks, sponsorship pitch decks"
        },
        {
          title: "Website + Landing Pages",
          description: "Episode archive, newsletter capture, service offerings optimized for conversion"
        },
        {
          title: "Social Amplification System",
          description: "LinkedIn, Twitter, Instagram templates that turn episodes into evergreen content"
        }
      ]}
      whoThisIsFor="Business podcasters, coaches, consultants, creators scaling beyond ads"
      timeline="3–5 weeks"
      investment="From $10K"
      ctaHeadline="Stop leaving revenue on the table"
      ctaButtonText="Build Your Podcast Brand"
      faqs={[
        {
          question: "How do you help monetize my podcast?",
          answer: "We build positioning and content systems that drive coaching clients, course sales, and premium sponsorships—transforming your podcast from content into a credibility engine."
        },
        {
          question: "What's included in the podcast brand identity?",
          answer: "Show name refinement, logo, cover art, intro/outro scripts, social media templates, and website design—everything you need for a professional podcast presence."
        },
        {
          question: "Can you help me get sponsors?",
          answer: "Yes. We create sponsorship pitch decks and positioning strategies that help you command premium CPMs from relevant brands."
        },
        {
          question: "Do you handle podcast production?",
          answer: "We focus on brand strategy and design. For production, we can connect you with trusted audio partners or work with your existing team."
        },
        {
          question: "How long does a podcast branding project take?",
          answer: "Most projects are completed in 3–5 weeks, including strategy, identity design, website, and monetization framework development."
        }
      ]}
      strategist={{
        name: "Zandra Drysdale",
        title: "Brand Strategist",
        image: img210,
        calloutText: "Turn downloads into dollars",
        calloutDescription: "Get personalized insights on how to monetize your podcast beyond ads. Our strategist will help you build positioning, create product ladders, and design content systems that convert listeners into customers."
      }}
      onNavigate={onNavigate}
    />
  );
}
