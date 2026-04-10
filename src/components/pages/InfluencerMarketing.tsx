import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { BrandsShowcase } from '../BrandsShowcase';
import { FAQSection } from '../FAQSection';
import { useState, useEffect, useRef } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useSequentialLoad } from '../../utils/useSequentialLoad';
import gradientImage from 'figma:asset/c3989c843be0633f0ffa6ac28de69385d59e0f6d.png';
import heroImage from 'figma:asset/6b381b584774972902344f11922c7ee740a3621a.png';
import influencerWork1 from 'figma:asset/b64be276de761ec5193b30114e55756054a6dcee.png';
import influencerWork2 from 'figma:asset/2bd78fd04143170d08177b0e9665ad5486bd6083.png';
import influencerWork3 from 'figma:asset/949ad76adea82d4f5c89fc1eaba81b1eac7c733d.png';

interface InfluencerMarketingProps {
  onNavigate: (page: string) => void;
}

export function InfluencerMarketing({ onNavigate }: InfluencerMarketingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    focus: '',
  });

  // Slideshow state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);

  // Influencer work images
  const influencerWorkImages = [influencerWork1, influencerWork2, influencerWork3];
  const duplicatedImages = [...influencerWorkImages, ...influencerWorkImages, ...influencerWorkImages];
  const loadedIndices = useSequentialLoad(duplicatedImages.length, 100);

  useEffect(() => {
    // Start at the middle set of images
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = scrollWidth;
      setScrollLeft(scrollWidth);
    }
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const autoScroll = () => {
      if (!scrollRef.current || isDragging || isUserInteracting) return;
      scrollRef.current.scrollLeft += 1;
    };

    autoScrollRef.current = window.setInterval(autoScroll, 16);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isDragging, isUserInteracting]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsUserInteracting(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setTimeout(() => setIsUserInteracting(false), 2000);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsUserInteracting(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const scrollWidth = scrollRef.current.scrollWidth / 3;
    const currentScroll = scrollRef.current.scrollLeft;

    if (currentScroll >= scrollWidth * 2) {
      scrollRef.current.scrollLeft = scrollWidth;
    } else if (currentScroll <= 0) {
      scrollRef.current.scrollLeft = scrollWidth;
    }
  };

  const faqs = [
    {
      question: "How do you select influencers for my brand?",
      answer: "We use data-driven analysis to match your brand with influencers based on audience demographics, engagement rates, brand alignment, and content quality—not just follower count."
    },
    {
      question: "What's the typical ROI for influencer campaigns?",
      answer: "Most clients see 3-5x ROI on influencer campaigns. Results vary by industry and campaign goals, but we track everything from engagement to conversions to prove impact."
    },
    {
      question: "Do you handle contract negotiations?",
      answer: "Yes. We manage all negotiations, contracts, deliverables tracking, and payments—ensuring fair rates and protecting both parties throughout the campaign."
    },
    {
      question: "Can we work with micro-influencers?",
      answer: "Absolutely. Micro-influencers (10K-100K followers) often deliver better engagement rates and ROI than mega-influencers, especially for niche brands."
    },
    {
      question: "How do you measure campaign success?",
      answer: "We track reach, engagement, click-through rates, conversions, and brand sentiment. You'll receive detailed reports showing exactly how each influencer performed."
    }
  ];

  const handleGetQuote = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://api.supabase.co/rest/v1/projects/${projectId}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': publicAnonKey,
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          type: 'quote',
          details: 'Influencer Marketing',
          formData: formData
        })
      });
      const data = await response.json();
      if (data.id) {
        setSubmitSuccess(true);
        onNavigate('about');
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -top-32">
          <ImageWithFallback 
            src={heroImage}
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Influencer Marketing ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Influencer campaigns
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              that drive sales
            </span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-8">
              We match you with creators who actually move product. Then we manage everything.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <BrandsShowcase />

      {/* What You Get */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-white mb-12">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                title: 'Vetted creators who align with your brand DNA',
                description: 'Hand-picked influencers that match your values and audience',
              },
              {
                title: 'Campaign strategy built for conversion',
                description: 'Not just likes — campaigns designed to drive real revenue',
              },
              {
                title: 'Full creator management & briefing',
                description: 'We handle everything so you can focus on your business',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-12 min-h-[280px] border border-[#1f2228] group flex flex-col justify-end items-start"
              >
                <h3 className="text-xl text-white mb-4">{item.title}</h3>
                <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight">
              Our Network
            </h2>
            <p className="text-xl text-[#7d8187] max-w-2xl text-[15px]">
              10K+ vetted creators globally. Micro to mega influencer tiers. B2B thought leaders included. Average 12% conversion rate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">01</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Creator Vetting</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                We analyze engagement rates, audience demographics, and brand alignment to find perfect matches.
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">02</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Campaign Development</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Strategic campaign planning with clear KPIs, creative briefs, and conversion-focused messaging.
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">03</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Content Management</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Full creator briefing, content approval workflows, and rights management for repurposing.
              </p>
            </div>

            <div className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-['Geist_Mono'] text-white/40 text-sm">04</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
              <h3 className="text-xl text-white mb-3">Performance Tracking</h3>
              <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">
                Real-time analytics on engagement, conversions, and ROI — not just vanity metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <PortfolioPreview onNavigate={onNavigate} />

      {/* CTA */}
      <section className="relative px-6 py-32 border-t border-[#1f2228] overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Ready to work with creators?
          </h2>
          <p className="text-2xl text-[#7d8187]">
            Let's build campaigns that convert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={handleGetQuote}
              className="px-8 py-3 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'GET QUOTE'}
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-white/40 hover:bg-white/5 transition-colors flex items-center justify-center gap-3">
              SET A CALL
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 py-24 border-t border-[#1f2228]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950">
            {/* Left Side: Visual with Gradient Image */}
            <div className="relative p-16 lg:p-20 flex flex-col justify-between min-h-[600px] overflow-hidden">
              {/* Background with Pure CSS Gradient */}
              <div className="absolute inset-0 bg-[#061828]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15),transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,165,233,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(56,189,248,0.12),transparent_60%)]"></div>
              </div>

              <div className="relative z-10 space-y-4">
                <h2 className="text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]">
                  Get Started <br /> with Us
                </h2>
                <p className="text-neutral-400 text-sm max-w-xs leading-relaxed">
                  Share your brand details and we'll connect you with the perfect influencers.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-3 mt-12">
                {/* Step 1 */}
                <div className="bg-white rounded-xl p-4 flex flex-col justify-between h-32 text-black transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                    1
                  </div>
                  <span className="text-[13px] font-semibold leading-snug">Tell us about<br />your brand</span>
                </div>
                {/* Step 2 */}
                <div className="bg-emerald-900/10 border border-emerald-500/10 rounded-xl p-4 flex flex-col justify-between h-32 text-emerald-100/50 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-white/40 text-[10px] font-bold flex items-center justify-center">
                    2
                  </div>
                  <span className="text-[13px] font-medium leading-snug">Receive custom<br />strategy</span>
                </div>
                {/* Step 3 */}
                <div className="bg-emerald-900/10 border border-emerald-500/10 rounded-xl p-4 flex flex-col justify-between h-32 text-emerald-100/50 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-6 h-6 rounded-full bg-white/5 text-white/40 text-[10px] font-bold flex items-center justify-center">
                    3
                  </div>
                  <span className="text-[13px] font-medium leading-snug">Launch your<br />campaign</span>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-10 lg:p-14 flex flex-col justify-center bg-black border-l border-neutral-800">
              {submitSuccess ? (
                <div className="text-center py-12">
                  <p className="text-xl text-white mb-4">Thank you for your inquiry!</p>
                  <p className="text-neutral-400 mb-6">We'll have a look and prepare your strategy, please set a time to talk</p>
                  <button
                    onClick={() => onNavigate('lets-talk')}
                    className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg text-sm hover:bg-neutral-200 transition-colors"
                  >
                    Let's talk more about your brand!
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);

                    try {
                      const response = await fetch(
                        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/submit-influencer-inquiry`,
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${publicAnonKey}`,
                          },
                          body: JSON.stringify({
                            ...formData,
                            submission_time: new Date().toISOString(),
                          }),
                        }
                      );

                      if (response.ok) {
                        setSubmitSuccess(true);
                        setFormData({ name: '', email: '', company: '', focus: '' });
                      } else {
                        alert('Failed to submit. Please try again.');
                      }
                    } catch (error) {
                      console.error('Error submitting form:', error);
                      alert('Failed to submit. Please try again.');
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-5"
                >
                  <div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Name"
                      className="w-full bg-neutral-900/40 border border-white/60 px-4 py-4 text-sm text-white placeholder-white font-['Helvetica'] focus:outline-none focus:border-white/60 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="Email"
                      className="w-full bg-neutral-900/40 border border-white/60 px-4 py-4 text-sm text-white placeholder-white font-['Helvetica'] focus:outline-none focus:border-white/60 transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      placeholder="Company"
                      className="w-full bg-neutral-900/40 border border-white/60 px-4 py-4 text-sm text-white placeholder-white font-['Helvetica'] focus:outline-none focus:border-white/60 transition-colors"
                    />
                  </div>

                  <div>
                    <select
                      value={formData.focus}
                      onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                      required
                      className="w-full bg-neutral-900/40 border border-white/60 px-4 py-4 text-sm text-white font-['Helvetica'] focus:outline-none focus:border-white/60 transition-colors"
                    >
                      <option value="" className="bg-neutral-950">Select Focus</option>
                      <option value="Grow social presence through influencer marketing" className="bg-neutral-950">
                        Grow social presence through influencer marketing
                      </option>
                      <option value="Drive sales" className="bg-neutral-950">
                        Drive sales
                      </option>
                      <option value="Internal influencer department buildout" className="bg-neutral-950">
                        Internal influencer department buildout
                      </option>
                      <option value="Influencer partnership management" className="bg-neutral-950">
                        Influencer partnership management
                      </option>
                      <option value="Campaign strategy and execution" className="bg-neutral-950">
                        Campaign strategy and execution
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-semibold rounded-lg py-2.5 text-xs hover:bg-neutral-200 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </button>

                  <p className="text-center text-[11px] text-neutral-500 mt-6">
                    We'll respond within 24 hours
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Influencer Work Slideshow */}
      <section className="relative py-20 overflow-hidden border-t border-[#1f2228]">
        {/* Draggable Slideshow Container */}
        <div className="relative h-[400px] md:h-[450px]">
          <div
            ref={scrollRef}
            className={`flex gap-6 h-full items-center overflow-x-scroll scrollbar-hide ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollBehavior: isDragging ? 'auto' : 'smooth',
            }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
          >
            {duplicatedImages.map((image, index) => {
              const isLoaded = loadedIndices.has(index);
              
              return (
                <div
                  key={index}
                  className={`relative shrink-0 transition-all duration-500 ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  draggable={false}
                >
                  <div className="relative h-[400px] md:h-[450px] rounded-lg overflow-hidden">
                    {isLoaded && (
                      <img
                        src={image}
                        alt={`Influencer Work ${index + 1}`}
                        className="h-full w-auto object-cover pointer-events-none select-none"
                        draggable={false}
                      />
                    )}
                    
                    {/* Subtle gradient overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 via-black/5 to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-48 md:w-96 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-48 md:w-96 bg-gradient-to-l from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none z-20" />
        </div>
      </section>
    </div>
  );
}