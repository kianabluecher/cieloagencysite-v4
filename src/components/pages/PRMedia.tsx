import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { BrandsShowcase } from '../BrandsShowcase';
import { FAQSection } from '../FAQSection';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface PRMediaProps {
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

export function PRMedia({ onNavigate }: PRMediaProps) {
  const faqs = [
    {
      question: "How long does it take to get media coverage?",
      answer: "Timeline varies by publication and news cycle, but most clients see their first placement within 30-60 days. Tier-1 publications like Forbes or TechCrunch typically take 60-90 days as they have longer editorial calendars."
    },
    {
      question: "Do you guarantee placements?",
      answer: "We don't guarantee specific placements, but we do guarantee strategic pitching to relevant journalists. Our 87% pitch-to-placement rate speaks to our effectiveness."
    },
    {
      question: "Which publications do you have relationships with?",
      answer: "We maintain active relationships with editors at Bloomberg, Forbes, TechCrunch, Business Insider, Inc., Fast Company, and 100+ other tier-1 and tier-2 publications across industries."
    },
    {
      question: "What makes your PR approach different?",
      answer: "Most agencies blast generic pitches to hundreds of journalists. We craft targeted, newsworthy angles and pitch them to specific journalists we know personally—resulting in higher placement rates and better coverage."
    },
    {
      question: "Can you help with crisis management?",
      answer: "Yes. We provide 24/7 crisis communication support including rapid response strategies, media training for sensitive topics, and proactive reputation management."
    },
    {
      question: "Do I need to be available for interviews?",
      answer: "Yes, but we prepare you thoroughly. We provide media training, talking points, Q&A prep, and mock interviews so you're confident and on-message for every appearance."
    }
  ];

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dynamic-pages/pr-media`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.page && data.page.downloadLink) {
            setDownloadLink(data.page.downloadLink);
          }
        }
      } catch (error) {
        console.error('Error fetching dynamic page data:', error);
      }
    };

    fetchPageData();
  }, []);

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
            src="https://images.unsplash.com/photo-1709377583121-576ad11b3849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzcyUyMGNvbmZlcmVuY2UlMjBtZWRpYXxlbnwxfHx8fDE3NjA4OTkxOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay blending to dark grey at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ PR & Media Relations ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Your story in the
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              headlines that matter
            </span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[16px] mt-[128px]">
              Bloomberg. Forbes. TechCrunch. We don't just pitch — we get you published.
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
            Strategic press positioning, direct relationships with tier-1 journalists, and story angles that cut through the noise—turning your brand into the expert publications want to feature.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight font-[Helvetica_Neue]">
              Our Approach
            </h2>
            <p className="text-xl text-[#7d8187] max-w-2xl text-[15px] font-[Helvetica_Neue]">
              Most PR agencies send 100 pitches and pray. We craft 10 strategic angles that editors actually want.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Step 1 */}
            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">01</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Strategic Positioning</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                We analyze your brand, identify newsworthy angles, and craft compelling narratives that resonate with media outlets.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">02</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Media Outreach</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Direct pitches to tier-1 journalists we know personally, with follow-up that's persistent but never pushy.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">03</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Media Training</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Preparation for interviews, talking points development, and coaching to ensure you nail every appearance.
              </p>
            </div>

            {/* Step 4 */}
            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">04</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Coverage Amplification</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Maximize the value of every placement through social amplification, content repurposing, and strategic distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-white mb-12 font-['Helvetica'] tracking-tight">Results</h2>
          
          {/* Stats Grid - 3 Column */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#1f2228] bg-black max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="relative p-8 md:border-r border-[#1f2228] group hover:bg-white/[0.02] transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <div className="w-5 h-5 border border-white/20"></div>
                <span className="text-xs text-gray-700 font-mono">01</span>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-white tracking-tighter mb-2">87%</div>
                <div className="text-xs font-medium tracking-widest text-[#7d8187] uppercase">Pitch-to-placement rate</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative p-8 md:border-r border-[#1f2228] group hover:bg-white/[0.02] transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <div className="w-5 h-5 border border-white/20"></div>
                <span className="text-xs text-gray-700 font-mono">02</span>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-white tracking-tighter mb-2">5 features</div>
                <div className="text-xs font-medium tracking-widest text-[#7d8187] uppercase">Average in 90 days</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative p-8 group hover:bg-white/[0.02] transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <div className="w-5 h-5 border border-white/20"></div>
                <span className="text-xs text-gray-700 font-mono">03</span>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-white tracking-tighter mb-2">$500K+</div>
                <div className="text-xs font-medium tracking-widest text-[#7d8187] uppercase">Earned media value per campaign</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist & Insight */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: PR Specialist */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full md:w-2/3 lg:w-full max-w-md overflow-hidden border border-[#1f2228]">
                <img
                  src={img210}
                  alt="Zandra Drysdale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl text-white mb-2">Zandra Drysdale</h3>
                <p className="text-[#7d8187] font-['Geist_Mono'] text-sm tracking-[1px] uppercase">Brand Strategist</p>
              </div>
            </div>

            {/* Right Column: Insight & CTA */}
            <div className="flex flex-col justify-center gap-8">
              <div className="aspect-video w-full overflow-hidden border border-[#1f2228]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1554941829-1a16e65a02b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpYSUyMGludGVydmlldyUyMG1pY3JvcGhvbmUlMjBwcmVzc3xlbnwxfHx8fDE3NjQ4NjU0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Media Interview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-3xl text-white leading-tight">
                  "The most effective PR isn't about shouting the loudest. It's about whispering the right story into the right ear at the exact right moment."
                </h3>
                <p className="text-[#7d8187] leading-relaxed">
                  Our team maintains daily contact with editors at top-tier publications. We don't just send press releases; we shape industry conversations. When you work with us, you're not buying a service—you're gaining a partner who champions your narrative in the global marketplace.
                </p>
                <div className="pt-4">
                   <button className="px-8 py-3 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-white/40 hover:bg-white/5 transition-colors flex items-center gap-3 w-fit">
                    SCHEDULE CALL WITH ZANDRA
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PortfolioPreview onNavigate={onNavigate} />

      {/* CTA - Exact from Brand & Web */}
      <section className="relative px-6 py-48 border-t border-b border-[#1f2228] overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 animate-gradient" />
        </div>
        <style>{`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 8s ease infinite;
          }
        `}</style>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl text-white tracking-tight leading-tight">
            <span className="bg-gradient-to-br from-white from-60% to-[#7d8187] bg-clip-text text-transparent">
              Ready to get featured in the headlines that matter?
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('inquiry')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border border-[#7d8187] text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/5 transition-all group"
            >
              Discovery Call
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            {downloadLink ? (
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-all group"
              >
                Download Information
                <Download className="w-4 h-4" />
              </a>
            ) : (
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-all group"
              >
                Download Information
                <Download className="w-4 h-4" />
              </button>
            )}
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
              {blogPosts.map((post, index) => (
                <button
                  key={post.id}
                  onClick={() => onNavigate('blog', post.slug)}
                  className="group border border-[#1f2228] p-8 min-h-[400px] flex flex-col justify-between items-start hover:bg-white/[0.02] transition-colors text-left"
                >
                  {/* Featured Image */}
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
                    {/* Category */}
                    {post.category && (
                      <span className="inline-block px-3 py-1 mb-4 text-[10px] font-['Geist_Mono'] tracking-[1.2px] uppercase border border-[#1f2228] text-[#7d8187]">
                        {post.category}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl text-white mb-3 group-hover:text-white/80 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-[#7d8187] leading-relaxed text-sm line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Footer */}
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

      {/* Call with Strategist Section */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Image */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full max-w-sm mx-auto md:mx-0 overflow-hidden border border-[#1f2228] rounded-lg">
                <img
                  src={img210}
                  alt="Zandra Drysdale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl text-white mb-1">Zandra Drysdale</h3>
                <p className="text-[#7d8187] font-['Geist_Mono'] text-sm tracking-[1px] uppercase">Brand Strategist</p>
              </div>
            </div>

            {/* Right: Text & Button */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl text-white mb-3">
                  Let's discuss your media strategy
                </h3>
                <p className="text-[#7d8187] leading-relaxed">
                  Get personalized insights on how to position your brand for tier-1 media coverage. Our strategist will analyze your story, identify newsworthy angles, and create a custom roadmap for your PR success.
                </p>
              </div>
              <button
                onClick={() => onNavigate('inquiry')}
                className="px-8 py-4 bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-all flex items-center gap-3 group"
              >
                Schedule a free call with our strategist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}