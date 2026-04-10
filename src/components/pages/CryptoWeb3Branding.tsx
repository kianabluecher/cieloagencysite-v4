import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface CryptoWeb3BrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function CryptoWeb3Branding({ onNavigate }: CryptoWeb3BrandingProps) {
  return (
    <IndustrySubpageTemplate
      category="Crypto & Web3 Branding"
      headline="Crypto Branding That Builds Trust"
      subheadline="You're not building a token. You're building credibility."
      heroImage="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG8lMjBibG9ja2NoYWlufGVufDF8fHx8MTc2MDg5OTE5NHww&ixlib=rb-4.1.0&q=80&w=1080"
      description="While competitors drown in Discord noise and meme coin aesthetics, your Web3 project needs a brand that converts skeptics into believers—and VCs into investors. The blockchain space rewards clarity. CIELO builds crypto brands that bridge technical innovation with narrative power—positioning your project for community growth, institutional backing, and market staying power."
      realityText="Your brand looks like every other token launch. Complex tech with zero narrative clarity means your community doesn't trust you, and investors don't get you. Meanwhile, your visuals scream 2017 ICO energy."
      deliverables={[
        {
          title: "Brand Strategy + Positioning",
          description: "Clarify your mission, define your audience (retail vs. institutional), build a narrative that scales beyond speculation"
        },
        {
          title: "Visual Identity System",
          description: "Logo, color system, typography, Discord/Twitter assets that signal legitimacy"
        },
        {
          title: "Community-First Content Strategy",
          description: "Governance messaging, roadmap storytelling, AMA frameworks that build trust"
        },
        {
          title: "VC-Ready Pitch Decks",
          description: "Investment narratives that explain tokenomics without drowning in jargon"
        },
        {
          title: "Launch Assets",
          description: "Whitepaper design, website, social templates engineered for virality"
        }
      ]}
      whoThisIsFor="DeFi protocols, NFT platforms, blockchain infrastructure, Web3 gaming, DAO tooling"
      timeline="4–6 weeks"
      investment="From $15K"
      ctaHeadline="Ready to build credibility in Web3?"
      ctaButtonText="Book a Strategy Call"
      faqs={[
        {
          question: "How long does a crypto branding project take?",
          answer: "Most projects are completed in 4–6 weeks, from initial strategy to final deliverables. Timeline includes brand positioning, visual identity, community assets, and pitch deck development."
        },
        {
          question: "Do you understand tokenomics and Web3 mechanics?",
          answer: "Yes. Our team has worked with DeFi protocols, NFT platforms, and blockchain infrastructure projects. We understand the technical nuances and translate them into clear, compelling narratives."
        },
        {
          question: "Can you help with our whitepaper design?",
          answer: "Absolutely. We design whitepapers that balance technical depth with visual clarity—making complex concepts accessible to both retail and institutional audiences."
        },
        {
          question: "What's included in the VC-ready pitch deck?",
          answer: "Investment narrative, tokenomics visualization, roadmap presentation, team credentials, competitive analysis, and financial projections—all designed to convert skeptical VCs into believers."
        },
        {
          question: "Do you create Discord and Twitter assets?",
          answer: "Yes. We create complete social asset kits including Discord server graphics, Twitter banners, announcement templates, and community governance materials."
        }
      ]}
      strategist={{
        name: "Zandra Drysdale",
        title: "Brand Strategist",
        image: img210,
        calloutText: "Position your project for the next bull run",
        calloutDescription: "Get personalized insights on how to position your Web3 project for community trust and institutional investment. Our strategist will help you clarify your narrative, define your audience, and create a brand that scales beyond speculation."
      }}
      onNavigate={onNavigate}
    />
  );
}