import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { BrandsShowcase } from '../BrandsShowcase';
import { FAQSection } from '../FAQSection';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';

interface InvestorBrandingProps {
  onNavigate: (page: string, slug?: string) => void;
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  featured_image?: string;
  author?: string;
  read_time?: number;
}

export function InvestorBranding({ onNavigate }: InvestorBrandingProps) {
  const faqs = [
    {
      question: "Do investors actually care about your brand visuals?",
      answer: "Yes — but not how you think. Investors don't care about 'pretty logos.' They care about clarity. A polished brand signals three things that matter: operational maturity, market positioning, and scalability potential. Sloppy visuals = sloppy execution. Clean brand = focused founder."
    },
    {
      question: "How much should a startup spend on branding?",
      answer: "Industry benchmarks: <$1MM ARR spend $2.5K–$7K for core identity. $1MM–$5MM ARR allocate 5% of revenue for brand + content systems. $5MM+ ARR invest 10% for full-scale positioning and campaigns. CIELO delivers mid-to-high tier work at transparent pricing."
    },
    {
      question: "What's a 'minimum viable brand' (MVB)?",
      answer: "Your brand scaffolding — enough to look legit, flexible enough to evolve. Includes: logo system, color palette, 2–3 fonts, pitch deck template, basic brand guidelines. It's your fundraising brand that gets you to Series A."
    },
    {
      question: "When should a startup invest in branding?",
      answer: "Before you pitch. Your deck, your site, your outreach — it all reflects brand. Investors, customers, and hires judge you in seconds. Scattered messaging or DIY visuals cost you trust before you open your mouth. Branding isn't vanity. It's strategic infrastructure."
    },
    {
      question: "Can branding actually increase my startup's valuation?",
      answer: "Absolutely. Research shows solid branding can add $10M–$20M to a $100M valuation. Why? Brand equity = market perception. Strong brands signal product quality, customer loyalty, and competitive moat. Investors pay for future revenue. Brand is the multiplier."
    }
  ];

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching blog posts:', error);
      } else {
        setBlogPosts(data || []);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image with Gradient Blend */}
        <div className="absolute inset-0 -top-32">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1556155092-490a1ba16284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXRjaCUyMGRlY2slMjBpbnZlc3RvcnxlbnwxfHx8fDE3NjQ4NjU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Investor Branding for Startups ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Branding That Closes
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Funding Rounds
            </span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-[128px]">
              Investors fund execution. Your brand proves it.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <BrandsShowcase />

      {/* Built For */}
      <section className="px-6 py-48 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <p className="text-2xl text-white max-w-3xl mx-auto text-center leading-relaxed font-[Helvetica_Neue]">
            Pre-seed and seed investors see hundreds of decks monthly. The ones that get funded don't just have strong metrics—they look like they've already won. CIELO builds investor-ready brands that communicate credibility, scalability, and market positioning before you speak a word.
          </p>
        </div>
      </section>

      {/* The Reality */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight font-[Helvetica_Neue]">
              The Reality
            </h2>
            <p className="text-xl text-[#7d8187] max-w-2xl text-[15px] font-[Helvetica_Neue]">
              Your DIY brand undermines your pitch. Investors question your execution ability based on your deck design. You're competing against founders with polished brands and clear positioning. Your logo looks like a weekend project.
            </p>
          </div>
        </div>
      </section>

      {/* What CIELO Delivers */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-white mb-12 font-['Helvetica'] tracking-tight">What CIELO Delivers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">01</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Investor Brand Strategy</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Positioning that signals market opportunity, competitive advantage, scalability potential
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">02</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Pitch-Ready Visual Identity</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Logo system, color palette, typography that communicates professionalism and maturity
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">03</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Pitch Deck Design</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Investor-optimized presentation structure, data visualization, narrative flow
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">04</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Fundraising Collateral</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                One-pagers, executive summaries, email templates, follow-up materials
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">05</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Minimum Viable Brand (MVB)</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Core identity package built for speed: logo, guidelines, pitch assets, website template
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">06</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Brand Equity Framework</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Documentation showing how brand adds $10M–$20M to perceived valuation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-6 font-['Helvetica'] tracking-tight">Who This Is For</h2>
              <p className="text-[#7d8187] leading-relaxed mb-4">
                Pre-seed startups, seed-stage companies, founders preparing to raise, teams rebranding for Series A
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-6 font-['Helvetica'] tracking-tight">Timeline & Investment</h2>
              <p className="text-[#7d8187] leading-relaxed mb-4">
                <strong className="text-white">Timeline:</strong> 3–4 weeks (MVB), 6–8 weeks (full rebrand)
              </p>
              <p className="text-[#7d8187] leading-relaxed">
                <strong className="text-white">Investment:</strong> Starting at $5K (MVB), $15K–$25K (full investor brand package)
              </p>
            </div>
          </div>
        </div>
      </section>

      <PortfolioPreview onNavigate={onNavigate} />

      {/* CTA */}
      <section className="relative px-6 py-48 border-t border-b border-[#1f2228] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 animate-gradient" />
        </div>
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 8s ease infinite;
          }
        `}</style>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl text-white tracking-tight leading-tight">
            <span className="bg-gradient-to-br from-white from-60% to-[#7d8187] bg-clip-text text-transparent">
              Build a brand that raises capital.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('inquiry')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border border-[#7d8187] text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/5 transition-all group"
            >
              Book Investor Brand Strategy
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-all group"
            >
              Download Information
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Recommended Blogs Section */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl text-white tracking-tight">
              Our Tips & Recent News
            </h2>
            <button
              onClick={() => onNavigate('blog')}
              className="flex items-center gap-2 text-[#7d8187] hover:text-white transition-colors font-['Geist_Mono'] text-xs tracking-[1.2px] uppercase"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {blogPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => onNavigate('blog', post.slug)}
                  className="group border border-[#1f2228] p-8 min-h-[400px] flex flex-col justify-between items-start hover:bg-white/[0.02] transition-colors text-left"
                >
                  {post.featured_image && (
                    <div className="w-full aspect-video mb-6 overflow-hidden border border-[#1f2228]">
                      <ImageWithFallback
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex-1">
                    {post.category && (
                      <span className="inline-block px-3 py-1 mb-4 text-[10px] font-['Geist_Mono'] tracking-[1.2px] uppercase border border-[#1f2228] text-[#7d8187]">
                        {post.category}
                      </span>
                    )}

                    <h3 className="text-xl text-white mb-3 group-hover:text-white/80 transition-colors">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-[#7d8187] leading-relaxed text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between w-full mt-6 pt-6 border-t border-[#1f2228]">
                    <div className="flex items-center gap-4 text-xs text-[#7d8187] font-['Geist_Mono']">
                      {post.read_time && <span>{post.read_time} min read</span>}
                      {post.created_at && (
                        <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#7d8187] group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#7d8187] text-sm">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
