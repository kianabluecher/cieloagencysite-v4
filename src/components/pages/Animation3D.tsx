import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface Animation3DProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function Animation3D({ onNavigate }: Animation3DProps) {
  return (
    <IndustrySubpageTemplate
      category="Animation & 3D"
      headline="Motion That Moves Markets"
      subheadline="3D product renders, brand animations, explainer videos, and motion graphics that stop the scroll and close deals."
      splineUrl="https://prod.spline.design/R1rImXQzqj4KebaS/scene.splinecode"
      description="Your product demo is a boring screen recording. Your social content doesn't stand out. Competitors use CGI product shots that look better than your real photography. Investors scroll past static pitch decks. CIELO creates motion design and 3D assets that command attention—product animations for launches, explainer videos that simplify complex ideas, and photorealistic renders that make physical products look flawless before manufacturing. Stop blending in with static content when your competitors are moving in 3D."
      realityText="You're still using stock photos when you could have custom 3D renders. Your product demos are static PDFs that don't explain how things work. Social media algorithms prioritize video, but you're posting flat graphics. You hired a cheap animator on Fiverr and got generic templates. You know motion and 3D matter, but you don't know where to start or what's worth the investment."
      deliverables={[
        { title: "3D Product Rendering & Visualization", description: "Photorealistic product renders for marketing, packaging mockups, exploded views showing internal components, 360° spin animations, lifestyle scene compositions." },
        { title: "Brand & Logo Animation", description: "Animated logo reveals (intro/outro for videos), brand motion guidelines (how your logo moves), loading animations, app onboarding animations, social media stingers." },
        { title: "Explainer & Demo Videos", description: "Animated product demos (show how your product works), SaaS feature explainers, process animations (visualize workflows), comparison videos, investor pitch animations." },
        { title: "Motion Graphics & Social Content", description: "Animated social media ads (Instagram, TikTok, LinkedIn), kinetic typography videos, data visualization animations, infographic animations, GIF libraries." },
        { title: "3D Environments & Scenes", description: "Virtual showrooms and event spaces, architectural visualization (real estate, interiors), concept environments for branding, VR/AR-ready 3D assets." }
      ]}
      whoThisIsFor="Product companies launching physical goods, SaaS brands explaining complex features, e-commerce brands competing on visual quality, investor-ready startups needing dynamic pitch materials, social-first brands needing scroll-stopping content"
      timeline="2–6 weeks depending on complexity"
      investment="$8K–$40K"
      ctaHeadline="Ready to bring your brand to life?"
      ctaButtonText="Let's Create Motion"
      faqs={[
        { question: "What's the difference between 3D rendering and traditional photography?", answer: "Reddit design threads highlight the advantages: 3D rendering allows unlimited angles and variations without reshoots, perfect lighting and environments every time, ability to show products before they're manufactured (critical for crowdfunding and pre-orders), easy updates (change colors, materials, backgrounds instantly), and cost-effective for complex setups (no studio rental, props, or travel). Traditional photography is better for authentic lifestyle shots and organic textures. Many brands use both: 3D for product specs and marketing, photography for emotional storytelling." },
        { question: "Do we need 3D animation or motion graphics?", answer: "Reddit animator communities clarify: 3D animation involves modeling and animating objects in three-dimensional space (product spins, walkthroughs, character animation). Motion graphics are 2D animated designs (typography, icons, data viz, transitions). Choose 3D for: physical products, architectural visualization, complex mechanical demos. Choose motion graphics for: explainer videos, social ads, data storytelling, brand animations. Many projects combine both: 3D product in 2D motion graphics composition." },
        { question: "How long does animation actually take?", answer: "Reddit production discussions reveal realistic timelines: simple logo animation (1–2 weeks), 30-second explainer video (3–4 weeks), 3D product render (1–3 weeks depending on complexity), full product animation with scenes (4–8 weeks). The bottlenecks: revisions (especially if feedback is vague), asset delays (CAD files, brand guidelines, scripts), rendering time for complex 3D scenes. Agencies that seem 'slow' are often waiting on client inputs—clear briefs and fast approvals accelerate timelines." },
        { question: "What file formats should we receive for animation deliverables?", answer: "Reddit post-production communities emphasize: video exports in multiple formats (MP4 for web/social, MOV with alpha channel for overlays, WebM for optimized web playback), source files (After Effects projects, Cinema 4D/Blender files for future edits), individual render passes (allows color grading and compositing adjustments), vertical and square versions for social media, GIF exports for lightweight uses. Avoid: only receiving final videos without source files—you'll need to pay again for any changes." },
        { question: "Is animation worth the cost compared to static design?", answer: "Reddit marketing analysis shows measurable lift: animated social ads see 2–3x higher engagement than static, product demo videos increase conversion rates by 20–80% (especially for complex products), 3D renders reduce product photography costs long-term (no reshoots for new colors/variants), motion content gets prioritized by algorithms (Instagram Reels, TikTok, LinkedIn video). The ROI depends on distribution—animation is high-leverage if you're running paid ads, posting consistently on social, or presenting to investors. Low-leverage if you're only using it on a rarely-visited page." }
      ]}
      strategist={{
        name: "Lucas Martinez",
        title: "Animation & 3D Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's turn your static brand into motion.",
        calloutDescription: "We'll storyboard your concept, model your products in 3D, and create animations that work across every channel—from investor decks to Instagram Reels."
      }}
      seoTitle="Animation & 3D Rendering Services | CIELO Agency"
      seoDescription="3D product rendering, brand animation, explainer videos, and motion graphics. Professional animation services for startups and growing companies."
      seoKeywords="3D animation, product rendering, motion graphics, explainer videos, 3D visualization, brand animation, product animation, CGI"
      onNavigate={onNavigate}
    />
  );
}