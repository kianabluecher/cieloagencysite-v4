import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface BrandDesignProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function BrandDesign({ onNavigate }: BrandDesignProps) {
  return (
    <IndustrySubpageTemplate
      category="Brand Design"
      headline="Brand Strategy & Visual Identity"
      subheadline="Strategic positioning, competitive differentiation, and visual systems built for scale—logos, messaging, and guidelines that work across every touchpoint."
      heroImage="https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="Your brand lacks strategic foundation. Your positioning is unclear, your messaging is generic, and your visual identity came from Fiverr. Competitors can't tell what makes you different. Your brand colors are random hex codes with no system. Different teams use different fonts because there's no style guide. Investors, customers, and partners judge your brand in 3 seconds—and right now, you're failing the test. CIELO builds brand strategy and identity systems that don't just look good—they communicate clear positioning, create competitive differentiation, and scale with your business. From seed stage to Series B, your brand should communicate credibility and strategic clarity, not chaos."
      realityText="You haven't defined your brand positioning—you describe what you do, not why you're different. Your messaging sounds like every competitor ('innovative solutions,' 'world-class service'). You're using a generic logo template that 50 other companies also use. Your brand colors don't work together and fail accessibility standards. There's no cohesive visual system—every designer interprets your brand differently. Your pitch deck, website, and social media look like three different companies. You know branding matters, but you've been 'making it work' with freelancers and DIY tools for too long."
      deliverables={[
        { title: "Brand Strategy & Positioning", description: "Competitive analysis, positioning framework, brand differentiation strategy, target audience definition, value proposition articulation, messaging pillars and brand voice guidelines." },
        { title: "Logo System & Visual Identity", description: "Primary logo, logo variations (horizontal, stacked, icon), color palette (primary, secondary, neutrals), typography system, and usage guidelines anchored in strategic positioning." },
        { title: "Brand Messaging & Voice", description: "Core messaging framework, tagline development, brand story narrative, elevator pitch, key differentiators, tone of voice guidelines for all communications." },
        { title: "Brand Style Guide", description: "Complete visual and verbal standards: logo usage rules, color specifications (RGB, CMYK, Hex, Pantone), typography hierarchy, messaging dos and don'ts, spacing and layout grids." },
        { title: "Core Brand Assets", description: "Business cards, letterhead, email signatures, social media templates, presentation templates, one-pagers, brand pattern library—all reflecting strategic positioning." },
        { title: "Digital Brand Kit", description: "Website design system (components, UI elements), social media brand templates (Instagram, LinkedIn, Twitter), ad templates, email header designs." }
      ]}
      whoThisIsFor="Startups raising funding and need strategic brand positioning, rebrands fixing inconsistent or unclear identities, B2B companies competing on brand perception and differentiation, agencies and consultancies selling premium services"
      timeline="5–10 weeks for full strategy and identity system"
      investment="$15K–$45K"
      ctaHeadline="Ready to build a brand with real strategic foundation?"
      ctaButtonText="Start Your Brand Strategy"
      faqs={[
        { question: "What's the difference between brand strategy and brand identity?", answer: "Reddit branding communities consistently clarify: brand strategy = the positioning, differentiation, and messaging foundation (what you stand for, who you're for, why you're different). Brand identity = the visual execution (logo, colors, typography). Most startups skip strategy and jump to design—then wonder why their brand feels generic. Strategy comes first, identity follows. You can't design a distinctive brand without clear strategic positioning." },
        { question: "How do we know if our brand positioning is working?", answer: "Reddit startup and marketing threads suggest testing: can you clearly articulate your differentiation in one sentence? Do prospects immediately understand what makes you different? Are you attracting your ideal customers (not just any customers)? Do sales conversations focus on value vs. price? Weak positioning = 'we're like X but better' or listing features. Strong positioning = owning a clear category, audience, or approach that competitors can't easily replicate." },
        { question: "Should we rebrand or just refresh our current identity?", answer: "Reddit branding discussions recommend: refresh when your core positioning works but visual execution feels outdated (update colors, modernize typography, clean up logo). Rebrand when your positioning is wrong, limits growth (e.g., you've pivoted), or creates negative associations. Rebrand examples: company name change, major pivot, merger/acquisition, repositioning for new market. Refresh examples: modernization, expanding into premium market, better digital execution without strategy change." },
        { question: "How much should a startup spend on brand strategy and design?", answer: "Reddit startup threads show wide variance: $500–$2K for DIY/Fiverr (high risk of generic output, no strategy), $10K–$25K for mid-tier agencies with strategic foundation, $30K–$75K+ for full-service branding with deep positioning work. The consensus: invest proportional to your stage. Pre-seed can start lean, but Series A+ companies need professional strategy and systems—investors and enterprise customers judge you on brand clarity and credibility." },
        { question: "What's the ROI of investing in brand strategy?", answer: "Reddit marketing and founder communities emphasize intangible but critical returns: stronger pricing power (premium positioning = higher prices), faster sales cycles (clear differentiation = less explaining), better talent attraction (strong brands recruit easier), increased investor confidence (credible brands raise easier). Quantifiable examples: startups with strong brand positioning report 20–40% shorter sales cycles, 15–30% higher close rates, and ability to charge 25–50% premium vs. generic competitors. Brand isn't expense—it's competitive infrastructure." }
      ]}
      strategist={{
        name: "Mia Rodriguez",
        title: "Brand Design Director",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's build a visual identity that works as hard as you do.",
        calloutDescription: "We'll audit your current brand (or lack thereof), define your visual direction, and create a scalable system that grows with your business—not against it."
      }}
      seoTitle="Brand Design & Identity Services | CIELO Agency"
      seoDescription="Professional brand design and visual identity systems. Logo design, brand guidelines, and scalable visual systems for startups and growing companies."
      seoKeywords="brand design, brand identity, logo design, visual identity, brand guidelines, brand style guide, startup branding, corporate identity"
      onNavigate={onNavigate}
    />
  );
}