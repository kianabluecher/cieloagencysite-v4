import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { BrandsShowcase } from '../BrandsShowcase';
import { FAQSection } from '../FAQSection';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import pitchDeckCover from 'figma:asset/58cf27cc59963914bf07a7e763f59a90754cc143.png';

interface PitchDeckDesignProps {
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

export function PitchDeckDesign({ onNavigate }: PitchDeckDesignProps) {
  const faqs = [
    {
      question: "What makes a pitch deck actually work?",
      answer: "Clarity + story + design. From analyzing 82+ decks on Reddit: Investors spend 3 minutes on your deck. 74/82 decks were too wordy. 70/82 were missing clear financials. 66/82 had messy, inconsistent slides. Rule: One idea per slide. No walls of text. Visuals > bullet points."
    },
    {
      question: "How many slides should a pitch deck be?",
      answer: "10–12 slides max. Classic structure: (1) Cover (company + tagline), (2) Problem, (3) Solution, (4) Product demo/visual, (5) Market size, (6) Business model, (7) Traction, (8) Competitive landscape, (9) Team, (10) Ask (funding, terms), (11) Appendix (optional: financials, case studies). Shorter = sharper."
    },
    {
      question: "Should I design my pitch deck myself or hire a designer?",
      answer: "If you're raising $500K+, hire a pro. DIY decks scream 'early amateur' and cost you credibility. A well-designed deck doesn't guarantee funding—but a bad one guarantees rejection. Investors judge execution speed and attention to detail. Your deck is proof."
    },
    {
      question: "What's the biggest pitch deck mistake founders make?",
      answer: "Burying the lede. Investors don't read—they skim. If your problem, solution, and traction aren't instantly clear in the first 3 slides, you've lost them. Lead with the biggest, boldest proof point (revenue, user growth, partnerships). Then justify it."
    },
    {
      question: "Can a great pitch deck actually close funding?",
      answer: "A great deck opens doors. Your pitch closes the deal. The deck gets you the meeting. Then your narrative, team credibility, and market insight seal it. But without a killer deck, you never get in the room. Think of it as your visual sales collateral for investors."
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
        <div className="absolute inset-0 -top-32">
          <ImageWithFallback 
            src={pitchDeckCover}
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Pitch Deck Design Services ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Pitch Decks That
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Get Funded
            </span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-[128px]">
              Investors spend 3 minutes on your deck. Make them count.
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
            74% of startup decks are too wordy. 70% are missing clear financials. 66% have messy, inconsistent slides. CIELO designs investor-ready pitch decks that communicate your story with clarity, data visualization that builds confidence, and design that signals execution ability.
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
              Your deck has 30 slides of dense bullet points. No clear narrative arc. Financials buried on slide 23. Inconsistent fonts and colors. Investors skim, get confused, and pass. Your idea never gets a fair hearing.
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
              <h3 className="text-xl text-white mb-3">Pitch Deck Design</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                10–12 slide structure optimized for investor attention spans and decision-making patterns
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">02</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Data Visualization</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Transform spreadsheets into compelling charts, graphs, and infographics that tell stories
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">03</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Narrative Architecture</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Problem → Solution → Market → Traction → Team → Ask flow that builds momentum
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">04</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Slide-by-Slide Optimization</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                One idea per slide, visual &gt; text, clear takeaways that survive skimming
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">05</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Version Management</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Full deck (for deep dives), summary deck (for emails), one-pager, appendix materials
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">06</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Presentation Coaching</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                How to present your deck, handle Q&A, control the room
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
                Pre-seed founders, seed-stage startups, Series A+ companies raising growth rounds, accelerator participants
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-6 font-['Helvetica'] tracking-tight">Timeline & Investment</h2>
              <p className="text-[#7d8187] leading-relaxed mb-4">
                <strong className="text-white">Timeline:</strong> 2–3 weeks
              </p>
              <p className="text-[#7d8187] leading-relaxed">
                <strong className="text-white">Investment:</strong> Starting at $5K (deck design only), $8K–$12K (deck + coaching + materials)
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
              Design a deck that opens investor doors.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('inquiry')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border border-[#7d8187] text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/5 transition-all group"
            >
              Start Pitch Deck Project
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