import { useState } from 'react';
import { Target, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import heroImage from 'figma:asset/065329b54364b11ee40b7618a7cf56650c20ac10.png';
import { SEOHead } from '../SEOHead';

interface AdCreativesProps {
  onNavigate: (page: string) => void;
}

export function AdCreatives({ onNavigate }: AdCreativesProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="bg-[#0A0A0B] min-h-screen">
      <SEOHead
        title="Ad Creatives - CIELO Agency"
        description="High-performing ad creatives for Meta, Google, TikTok, and more. Drive conversions with data-backed creative strategy."
        url="https://www.cielo.agency/ad-creatives"
      />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <img 
            src={heroImage}
            alt="Ad Creatives" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/70 via-[#0A0A0B]/50 to-[#0A0A0B]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="inline-block mb-8">
              <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                [ AD CREATIVES ]
              </p>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight leading-[1.1]">
              Creatives that
              <br />
              <span className="text-[#7d8187]">convert</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#b4bac1] leading-relaxed max-w-4xl mx-auto mb-12">
              Data-backed ad creatives optimized for performance across Meta, Google, TikTok, LinkedIn, and more.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('inquiry')}
                className="px-10 py-4 bg-white text-black rounded-full font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-[#f5f5f5] transition-all"
              >
                Get Started
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className="px-10 py-4 border border-white/30 text-white rounded-full font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:border-white transition-all"
              >
                View Work
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: 'Performance-Driven',
                description: 'Every creative is designed to drive measurable results and ROI'
              },
              {
                icon: Sparkles,
                title: 'Platform-Optimized',
                description: 'Native formats and specifications for each advertising platform'
              },
              {
                icon: Zap,
                title: 'Rapid Iteration',
                description: 'Fast turnaround times for A/B testing and optimization'
              },
              {
                icon: TrendingUp,
                title: 'Data-Informed',
                description: 'Creative strategy backed by performance data and insights'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 bg-[#0f0f10] border border-[#1f2228] rounded-2xl hover:border-white/20 transition-all"
                >
                  <Icon className="w-12 h-12 text-white mb-6" strokeWidth={1.5} />
                  <h3 className="text-xl text-white mb-3 font-light">{feature.title}</h3>
                  <p className="text-[#7d8187] leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-32 px-6 lg:px-8 bg-[#0f0f10]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl text-white mb-6 tracking-tight">
              Multi-Platform Expertise
            </h2>
            <p className="text-xl text-[#7d8187] max-w-3xl mx-auto">
              We create high-performing ad creatives for all major advertising platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Meta Ads', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'YouTube Ads', 'Twitter Ads'].map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="aspect-square bg-[#0A0A0B] border border-[#1f2228] rounded-2xl flex items-center justify-center hover:border-white/20 transition-all"
              >
                <p className="text-white font-['Geist_Mono'] text-xs tracking-[1.2px] uppercase text-center px-4">
                  {platform}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Types Section */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl text-white mb-6 tracking-tight">
              Creative Formats
            </h2>
            <p className="text-xl text-[#7d8187] max-w-3xl">
              From static images to motion graphics, we deliver every format you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Static Images',
                items: ['Feed ads', 'Story ads', 'Display ads', 'Carousel ads']
              },
              {
                title: 'Video Ads',
                items: ['Short-form video', 'Story videos', 'Reels & TikToks', 'Video testimonials']
              },
              {
                title: 'Motion Graphics',
                items: ['Animated banners', 'Motion ads', 'GIF ads', 'Kinetic typography']
              },
              {
                title: 'UGC-Style Content',
                items: ['Creator content', 'Testimonial videos', 'Product demos', 'Behind-the-scenes']
              },
              {
                title: 'Interactive Ads',
                items: ['Polls & quizzes', 'Playable ads', 'Collection ads', 'Lead forms']
              },
              {
                title: 'Retargeting Ads',
                items: ['Dynamic product ads', 'Abandoned cart', 'Custom audiences', 'Lookalike campaigns']
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-[#0f0f10] border border-[#1f2228] rounded-2xl hover:border-white/20 transition-all"
              >
                <h3 className="text-2xl text-white mb-6 font-light">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-[#7d8187] flex items-start gap-3">
                      <span className="text-white mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 bg-[#0f0f10]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl text-white mb-8 tracking-tight">
            Ready to scale your ads?
          </h2>
          <p className="text-xl text-[#7d8187] mb-12 leading-relaxed">
            Partner with CIELO to create ad creatives that drive real business results
          </p>
          <button
            onClick={() => onNavigate('inquiry')}
            className="px-12 py-5 bg-white text-black rounded-full font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-[#f5f5f5] transition-all"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
}
