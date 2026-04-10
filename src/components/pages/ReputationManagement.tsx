import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { BrandsShowcase } from '../BrandsShowcase';
import { FAQSection } from '../FAQSection';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';

interface ReputationManagementProps {
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

export function ReputationManagement({ onNavigate }: ReputationManagementProps) {
  const faqs = [
    {
      question: "Why does reputation matter for early-stage startups?",
      answer: "Your reputation is your unfair advantage. In a world where investors, customers, and talent Google you before responding to your email, your digital footprint is your first impression. Reputation = trust. Trust = conversions."
    },
    {
      question: "What's included in reputation management?",
      answer: "At CIELO: Audit of current online presence (Google results, social profiles, press mentions), Negative content suppression (push down bad press with positive SEO), Thought leadership campaigns (LinkedIn, guest posts, podcasts), Crisis monitoring and response systems, Review generation and management. We control your narrative."
    },
    {
      question: "How long does it take to fix a damaged reputation?",
      answer: "3–6 months for meaningful movement. Reputation SEO works by creating high-authority positive content that outranks negative results. It's a long game, but the ROI is exponential: investor trust, customer confidence, and talent attraction all improve."
    },
    {
      question: "Can you remove negative reviews or press?",
      answer: "Rarely—but we can bury them. Negative content on third-party sites (Reddit, Glassdoor, news outlets) is nearly impossible to remove. But we can suppress it by flooding Google results with positive, high-authority content. Goal: push negatives to page 2+ where 95% of users never look."
    },
    {
      question: "What's the cost of ignoring reputation management?",
      answer: "Founders who ignore reputation lose: Investor meetings (VCs Google you first), Top talent (candidates research leadership before applying), Sales deals (B2B buyers check your credibility). The cost of inaction >> the cost of proactive reputation management."
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
      <section className="relative px-6 pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -top-32">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXB1dGF0aW9uJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NjQ4NjU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Reputation Management ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Control Your
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Narrative
            </span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-[128px]">
              Your digital footprint is your first impression.
            </p>
          </div>
        </div>
      </section>

      <BrandsShowcase />

      <section className="px-6 py-48 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <p className="text-2xl text-white max-w-3xl mx-auto text-center leading-relaxed font-[Helvetica_Neue]">
            Investors, customers, and talent Google you before responding to your email. Negative press on page 1 kills deals. No presence means no credibility. CIELO builds and protects founder and startup reputations through content strategy, SEO suppression, and proactive narrative control.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight font-[Helvetica_Neue]">
              The Reality
            </h2>
            <p className="text-xl text-[#7d8187] max-w-2xl text-[15px] font-[Helvetica_Neue]">
              Bad press ranks on page 1 of Google. Competitors spread FUD in Reddit threads. Your LinkedIn has 3 posts from 2019. Glassdoor reviews hurt recruiting. Investors find nothing when they research you—or worse, they find the wrong things.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-white mb-12 font-['Helvetica'] tracking-tight">What CIELO Delivers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { title: "Reputation Audit", desc: "Complete analysis of Google results, social profiles, press mentions, review sites, forum discussions" },
              { title: "Negative Content Suppression", desc: "SEO strategy to push negative results to page 2+ where 95% of users never look" },
              { title: "Positive Content Creation", desc: "Thought leadership campaigns (LinkedIn, guest posts, podcasts), press placements, interview features" },
              { title: "Crisis Monitoring & Response", desc: "24/7 monitoring of brand mentions, rapid response protocols, crisis communication strategy" },
              { title: "Review Generation & Management", desc: "Systems to generate positive reviews, respond to negative feedback professionally" },
              { title: "Long-Term Narrative Control", desc: "Ongoing content production that builds authority and pushes down unwanted results" }
            ].map((item, idx) => (
              <div key={idx} className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-['Geist_Mono'] text-white/40 text-sm">0{idx + 1}</span>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>
                <h3 className="text-xl text-white mb-3">{item.title}</h3>
                <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-6 font-['Helvetica'] tracking-tight">Who This Is For</h2>
              <p className="text-[#7d8187] leading-relaxed mb-4">
                Startup founders, executives, public figures, companies post-crisis, brands entering new markets
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-6 font-['Helvetica'] tracking-tight">Timeline & Investment</h2>
              <p className="text-[#7d8187] leading-relaxed mb-4">
                <strong className="text-white">Timeline:</strong> 3–6 months for meaningful movement
              </p>
              <p className="text-[#7d8187] leading-relaxed">
                <strong className="text-white">Investment:</strong> Starting at $5K/month (6-month minimum for reputation repair)
              </p>
            </div>
          </div>
        </div>
      </section>

      <PortfolioPreview onNavigate={onNavigate} />

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
              Control your narrative before someone else does.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('inquiry')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border border-[#7d8187] text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/5 transition-all group"
            >
              Start Reputation Audit
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

      <FAQSection faqs={faqs} />

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
