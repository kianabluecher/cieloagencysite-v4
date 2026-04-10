import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface AIDesignBrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function AIDesignBranding({ onNavigate }: AIDesignBrandingProps) {
  return (
    <IndustrySubpageTemplate
      category="AI Design & Branding"
      headline="AI Design and Branding Services That Feel Human"
      subheadline="Use AI design tools to move 10x faster—without ending up with a generic, cookie‑cutter brand."
      heroImage="https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="AI logo generators and AI design tools are great for speed, but everything starts to look the same. Your brand kit came from a template, so it doesn't support serious fundraising, sales, or hiring. CIELO turns AI branding tools into a brand system—not random one‑offs. We give you a clear AI‑assisted brand identity design that feels premium, unique, and on‑strategy. Build guardrails so every AI asset—slides, ads, social, landing pages—stays on‑brand without micro‑managing every file."
      realityText="AI logo generators produce generic outputs. Your brand kit came from a template—it doesn't support fundraising or sales. Internal teams use AI branding tools with no consistency or quality system. You know AI can help, but you don't want your brand to feel cheap or automated. You need strategy before pixels, not random AI experiments."
      deliverables={[
        { title: "Brand Core – Strategy Before Pixels", description: "Clarify positioning, audience, and story so AI outputs follow a real brand foundation. Define non‑negotiables before prompts are written." },
        { title: "AI Identity – Design the System", description: "Create core visual identity: logo system, color, typography, layout rules. Build prompt libraries and reference boards for AI design tools." },
        { title: "Production Engine – Assets on Demand", description: "Use AI branding tools for fast variations (ads, social, decks), with human art direction on the final pass." },
        { title: "Brand Strategy Mini‑Dossier", description: "Positioning, messaging spine, visual direction—the foundation for all AI-generated assets." },
        { title: "AI Design Playbook", description: "Prompt templates, 'do/don't' examples, and rules for tools like Midjourney, DALL·E, and ChatGPT." },
        { title: "20–50 Launch Assets", description: "Social templates, headers, slides, ad variations—ready to deploy immediately with consistent brand identity." }
      ]}
      whoThisIsFor="Startups and SaaS that want to look established, e‑commerce/fintech/B2B brands needing high‑volume visuals, teams experimenting with AI brand identity design"
      timeline="Brand Core: 2 weeks | AI Identity: 3–4 weeks"
      investment="$25K-$50K (full AI brand system)"
      ctaHeadline="Want AI speed without sacrificing originality?"
      ctaButtonText="Request AI Branding Audit"
      faqs={[
        { question: "Can AI branding tools really replace a human designer?", answer: "Reddit designers report that AI gets them about 70–80% of the way there; the missing piece is strategic direction and refinement. AI is powerful for exploration and volume, but brands still need a human to decide what fits the market, positioning, and long‑term story." },
        { question: "Are AI logo generators safe to use for serious brands?", answer: "AI logo generators are fine for early sketches, but Reddit founders often worry about originality, trademark risk, and long‑term scalability. Treat them as idea starters; the final identity should be checked for uniqueness, legibility, and legal risk." },
        { question: "How do we keep visual style consistent when multiple people use AI design tools?", answer: "The most common complaint from agencies and in‑house teams is style drift. A shared style guide for AI—reference images, prompt templates, and 'on‑brand vs off‑brand' examples—dramatically reduces that drift and is repeatedly recommended in AI design threads." },
        { question: "Will AI make our brand look generic?", answer: "That happens when AI is used without strategy. When prompts are anchored in a clear brand narrative and visual rules, AI becomes a force multiplier, not a genericizer. This hybrid approach—human strategy plus AI execution—is exactly what experienced practitioners advocate." }
      ]}
      strategist={{
        name: "Marcus Chen",
        title: "AI Design Strategist",
        image: img210,
        calloutText: "Strategy turns AI into a force multiplier",
        calloutDescription: "I've built 30+ AI-powered brand systems that combine human strategy with machine speed—delivering premium brands at 10x the velocity of traditional agencies."
      }}
      onNavigate={onNavigate}
    />
  );
}