import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface LogoDesignServicesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function LogoDesignServices({ onNavigate }: LogoDesignServicesProps) {
  return (
    <IndustrySubpageTemplate
      category="Logo Design Services"
      headline="Logo Design\nThat Lasts"
      subheadline="Your logo isn't art. It's your business signature."
      heroImage="https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Most businesses treat logo design as a quick checkbox—resulting in forgettable marks that need replacing within two years. Your logo is the foundation of your visual identity. Get it right. CIELO designs logos built for longevity—marks that work across every application, from business cards to billboards."
      realityText="Your current logo looks dated or amateurish. DIY logo from Fiverr hurts credibility. Your mark doesn't scale (works at large sizes, fails when small). Colors are inconsistent. No versatility for different applications."
      deliverables={[
        { title: "Logo Design Services", description: "Multiple concepts, revision rounds, final selection, refinement" },
        { title: "Complete Logo System", description: "Primary mark, secondary marks, icon version, text-only version" },
        { title: "Color Variations", description: "Full color, black, white, single-color, reversed versions" },
        { title: "Application Guidelines", description: "Usage rules, minimum sizes, clear space, what NOT to do" },
        { title: "File Deliverables", description: "Vector files (AI, EPS), web formats (PNG, SVG), print files (PDF), style guide" },
        { title: "Trademark Support", description: "Pre-design trademark search guidance, USPTO filing preparation" }
      ]}
      whoThisIsFor="Startups, rebrands, new products, small businesses, personal brands, nonprofits"
      timeline="2–4 weeks"
      investment="Starting at $3K"
      ctaHeadline="Design a logo you'll never outgrow."
      ctaButtonText="Start Logo Project"
      faqs={[
        { question: "What's included in the logo design process?", answer: "Discovery, concept development (3-5 directions), revision rounds, final refinement, complete file package, and brand guidelines for proper usage." },
        { question: "How many logo concepts do we receive?", answer: "We present 3-5 distinct concepts based on your brand strategy. This provides options without overwhelming decision-making." },
        { question: "Do you provide trademark search?", answer: "We conduct preliminary searches to avoid obvious conflicts, but recommend professional trademark attorney review before final filing." },
        { question: "What file formats will we receive?", answer: "Vector files (AI, EPS, PDF) for print, web formats (PNG, SVG) for digital, and complete brand style guide documenting proper usage." }
      ]}
      strategist={{
        name: "Nina Patel",
        title: "Brand Identity Designer",
        image: img210,
        calloutText: "A logo must work everywhere",
        calloutDescription: "I've designed 200+ logos that stood the test of time—marks that scale, adapt, and represent brands with timeless professionalism."
      }}
      onNavigate={onNavigate}
    />
  );
}
