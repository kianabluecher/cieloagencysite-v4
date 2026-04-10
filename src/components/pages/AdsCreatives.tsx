import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';

interface AdsCreativesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function AdsCreatives({ onNavigate }: AdsCreativesProps) {
  return (
    <IndustrySubpageTemplate
      category="Ads & Creatives"
      headline="Ads That Actually Convert & Scale"
      subheadline="Meta ads, TikTok ads, and creative testing built on data from 10,000+ winning campaigns—unique concepts, rapid iteration, and research-based systems that improve ROAS."
      heroImage="https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      description="Your ad creatives look professional but don't convert. You're testing 3 variations instead of 30. Your creative team doesn't understand performance marketing, and your performance team can't create thumb-stopping creative. You're burning $20K/month on ads with declining ROAS because your creative has plateaued. Competitors are scaling while you're stuck re-running the same angles. CIELO builds ad creative systems powered by proprietary research from analyzing 10,000+ winning ads across Meta, TikTok, and YouTube. We don't just make pretty ads—we build creative testing engines that identify winning hooks, iterate at scale, and produce campaigns that actually move metrics."
      realityText="You're running the same 5 ad creatives for months because your team is too slow to test new concepts. Your creative approval process takes 2 weeks, so you miss trends. You hire expensive video editors who don't understand direct response principles—beautiful ads that don't sell. Your media buyers keep asking for 'more creatives' but you don't have a system to produce them. You know creative is the bottleneck to scaling ad spend, but you don't know how to fix it. Your competitors are testing 50+ variations per month while you're testing 5."
      deliverables={[
        { title: "Creative Strategy & Research", description: "Analysis of top-performing ads in your niche (Meta Ads Library, TikTok Creative Center), competitive creative audit, winning hooks and angles identification, creative testing roadmap based on our internal database of 10,000+ winning campaigns." },
        { title: "Ad Creative Production", description: "Meta static ads (carousel, single image), Meta video ads (15s, 30s, 60s), TikTok-style UGC video ads, YouTube video ads, display ads, landing page creative concepts—all built for direct response performance." },
        { title: "Rapid Creative Testing System", description: "High-volume creative production (20–50 variations per month), structured testing framework (hooks, offers, formats), creative rotation schedules, winner identification and iteration process." },
        { title: "Performance Creative Optimization", description: "Weekly creative performance analysis, hook and thumbnail A/B testing, CTA and offer testing, creative fatigue monitoring, refresh and iteration based on data signals." },
        { title: "Unique Campaign Concepts", description: "Original campaign angles that competitors aren't running, trend integration (memes, cultural moments, platform-native formats), influencer and UGC-style creative, brand-safe performance creative that doesn't look like ads." },
        { title: "Creative Templates & Playbooks", description: "Editable creative templates (Figma, Canva), ad copywriting formulas and swipe files, creative brief templates, internal team training on performance creative principles." }
      ]}
      whoThisIsFor="DTC brands scaling paid social spend, performance marketers stuck with stale creative, e-commerce companies with declining ROAS, agencies managing creative for multiple clients, B2B companies running Meta or LinkedIn ads"
      timeline="2–4 weeks for first creative batch, ongoing production recommended"
      investment="$5K–$20K/month for creative production + testing"
      ctaHeadline="Ready to build a creative testing system that scales ad spend?"
      ctaButtonText="Let's Build Your Creative Engine"
      faqs={[
        { question: "How many ad creatives should we be testing per month?", answer: "Reddit performance marketing communities and Meta Ads experts consistently recommend: brands spending <$10K/month should test 10–15 new creatives monthly, $10K–$50K/month should test 20–30 creatives, $50K+ spend should test 50+ creatives. The rule: creative is the #1 lever for scaling. If you're not testing at least 15–20 new concepts per month, you're leaving money on the table. High-performing brands refresh creative every 7–14 days to combat ad fatigue." },
        { question: "What makes an ad creative actually convert vs. just look good?", answer: "Reddit media buyers and creative strategists emphasize: winning ads = strong hook in first 3 seconds (pattern interrupt, bold claim, relatable problem), clear value proposition (not features—outcomes), social proof or credibility signal, specific CTA, platform-native format (looks like organic content, not an ad). Beautiful brand-focused ads often flop because they prioritize aesthetics over direct response principles. Ugly ads with strong hooks often outperform 'polished' creative." },
        { question: "Should we use UGC-style ads or professionally produced content?", answer: "Reddit ad communities and case studies show: UGC-style (user-generated content) ads consistently outperform polished brand ads on Meta and TikTok—they feel authentic, don't trigger 'ad blindness,' and build trust faster. The mistake: overly scripted UGC that feels fake. The win: real testimonials, founder-led videos, customer stories, iPhone-shot demos. Reserve high-production content for brand awareness or top-of-funnel YouTube. For conversion campaigns, test UGC first." },
        { question: "How do we know when to kill an ad creative vs. keep testing it?", answer: "Reddit performance marketers recommend clear metrics: if an ad doesn't hit target CTR or CPA within first $500–$1,000 spend, kill it. If CTR drops >30% week-over-week, it's fatigued—pause and refresh. If CPA creeps up but creative still has decent CTR, test new landing pages or offers. Don't fall in love with creative—let data decide. Top advertisers kill 60–70% of new creatives within first week and double down on the 30% that work." },
        { question: "What's the best way to scale winning ad creatives without killing performance?", answer: "Reddit ad scaling discussions emphasize: don't just increase budget on one winning ad—create variations (new hooks, different thumbnails, alternate CTAs). Use the 'creative refresh' method: keep the core concept but change opening 3 seconds, background music, or CTA. Launch winning creative into new audiences or placements. Avoid: running same exact ad for months—it will fatigue and CPA will spike. Winning ads have 30–60 day lifespan on average; plan refresh cycles accordingly." }
      ]}
      strategist={{
        name: "Jordan Martinez",
        title: "Performance Creative Director",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's build a creative system that keeps your ads fresh and your ROAS climbing.",
        calloutDescription: "We'll analyze your top competitors, identify winning ad angles from our database of 10,000+ campaigns, and launch a creative testing engine that produces 20–50 variations per month—so you never run out of fresh creative."
      }}
      seoTitle="Ad Creative Production & Testing | CIELO Agency"
      seoDescription="Meta ads, TikTok ads, and performance creative built on data from 10,000+ winning campaigns. Creative testing systems that improve ROAS and scale ad spend."
      seoKeywords="ad creatives, meta ads, facebook ads, tiktok ads, performance creative, creative testing, ad production, UGC ads, direct response creative"
      onNavigate={onNavigate}
    />
  );
}