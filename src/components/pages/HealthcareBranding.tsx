import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { BrandsShowcase } from '../BrandsShowcase';
import { FAQSection } from '../FAQSection';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';

interface HealthcareBrandingProps {
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

export function HealthcareBranding({ onNavigate }: HealthcareBrandingProps) {
  const faqs = [
    {
      question: "Why do healthcare brands struggle with messaging?",
      answer: "Complexity + regulation = confusion. Most healthcare brands try to say everything (clinical efficacy, cost savings, patient outcomes, regulatory compliance) and end up saying nothing. CIELO builds messaging hierarchies that prioritize clarity for each audience."
    },
    {
      question: "Can you help with patient-facing and B2B healthcare branding?",
      answer: "Yes. Healthcare brands often need dual identities: B2C (patients): empathetic, simple, trust-driven. B2B (providers, payers): data-driven, credible, ROI-focused. We build brands that work across both."
    },
    {
      question: "What's the typical cost for healthcare branding?",
      answer: "$20K–$60K depending on scope: Brand strategy + identity $20K–$35K, Full brand + website + content system $40K–$60K. ROI: Faster patient acquisition, stronger investor decks, better provider partnerships."
    },
    {
      question: "Do you work with digital health startups or only established healthcare brands?",
      answer: "Both. We've worked with telehealth platforms, medical device startups, healthtech SaaS, and established hospital systems. Our approach scales to your stage and market."
    },
    {
      question: "Can CIELO create patient education content that's actually engaging?",
      answer: "Absolutely. Most patient content is dense, jargon-heavy, and boring. We create clear, visual, empathetic content that educates without overwhelming. Think: explainer videos, infographics, FAQ pages optimized for Google's AI Overviews."
    }
  ];

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const supabase = await createClient();
      const { data, error} = await supabase
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
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbHxlbnwxfHx8fDE3NjQ4NjU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Healthcare Branding Agency ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Healthcare Branding
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              That Builds Trust
            </span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-[128px]">
              Patients choose providers they understand and trust.
            </p>
          </div>
        </div>
      </section>

      <BrandsShowcase />

      <section className="px-6 py-48 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <p className="text-2xl text-white max-w-3xl mx-auto text-center leading-relaxed font-[Helvetica_Neue]">
            Healthcare brands face a unique challenge: complex products, skeptical audiences, heavy regulation. CIELO creates healthcare brands that are clear, credible, and compassionate—communicating clinical excellence without overwhelming patients.
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
              Your messaging is full of medical jargon nobody understands. Patient-facing content looks like textbooks. B2B materials don't communicate ROI. Regulatory constraints make everything sound robotic. Competitors with better branding win patients and partnerships.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-white mb-12 font-['Helvetica'] tracking-tight">What CIELO Delivers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { title: "Healthcare Brand Strategy", desc: "Patient journey mapping, messaging hierarchy for multiple audiences (patients, providers, payers)" },
              { title: "Dual-Identity Systems", desc: "B2C branding (empathetic, simple, trust-driven) + B2B branding (data-driven, credible, ROI-focused)" },
              { title: "Visual Identity", desc: "Logo, color, typography that's clinical yet human, professional yet approachable" },
              { title: "Patient Education Content", desc: "Clear explainer videos, infographics, FAQ pages optimized for Google's AI Overviews" },
              { title: "Provider Marketing Materials", desc: "Clinical one-pagers, case studies with outcomes data, partnership presentations" },
              { title: "Regulatory-Compliant Messaging", desc: "Navigate FDA, HIPAA, state regulations while maintaining human, engaging communication" }
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
                Digital health startups, telehealth platforms, medical device companies, hospital systems, healthtech SaaS
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl text-white mb-6 font-['Helvetica'] tracking-tight">Timeline & Investment</h2>
              <p className="text-[#7d8187] leading-relaxed mb-4">
                <strong className="text-white">Timeline:</strong> 6–8 weeks
              </p>
              <p className="text-[#7d8187] leading-relaxed">
                <strong className="text-white">Investment:</strong> Starting at $20K (brand strategy + identity), $40K–$60K (full brand + website + content)
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
              Build healthcare brands patients and providers trust.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('inquiry')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border border-[#7d8187] text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/5 transition-all group"
            >
              Launch Healthcare Brand
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
