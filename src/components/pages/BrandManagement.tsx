import { useState } from 'react';
import { Brain, Target, TrendingUp, Cpu } from 'lucide-react';
import heroImage from 'figma:asset/065329b54364b11ee40b7618a7cf56650c20ac10.png';
import { BrandManagementModern } from '../BrandManagementModern';
import { TestimonialSlideshow } from '../TestimonialSlideshow';
import { PricingCards } from '../PricingCards';
import ctaImage1 from 'figma:asset/de7a2be995fb5993aa3d9ae2178616e0bb77ed38.png';
import ctaImage2 from 'figma:asset/b72b93f7c525266f61bcb9df9ec77f3051d24777.png';
import ctaImage3 from 'figma:asset/8e23726acfbc3cab59b5a3320f7e06f9caf5c6d3.png';
import testimonial1 from 'figma:asset/ddf83294279cfe8096153436c061b4dc42396654.png';
import testimonial2 from 'figma:asset/8b7c37d31d601b65ed3752b404c4cfaf5e6ea5e6.png';
import testimonial3 from 'figma:asset/4abfe953bf56366d226ba0165f9307f04ce7fc35.png';
import testimonial4 from 'figma:asset/ce5f62968a5b3f84556c7c1fd7b3fa45f63ae65f.png';
import testimonial5 from 'figma:asset/bc1c4920eda8d7dde731866e248a233fa2f21102.png';
import testimonial6 from 'figma:asset/2c920610e0d55c3784e392fbdbca2b6d1b2e1327.png';
import testimonial7 from 'figma:asset/0f3ded31bd4fd25d463cb8fa5bff48cba2bf75fe.png';
import testimonial8 from 'figma:asset/748ceae8749212dac1d2fac2b786f9030c9a53fb.png';
import testimonial9 from 'figma:asset/327d9f7a777342593d22acfae7d8018f982aea55.png';
import testimonial10 from 'figma:asset/5857b76116b41ba8d53e7b60a9e981609e1ab8f0.png';
import testimonial11 from 'figma:asset/af941fb68130ecb47b6139cbbbabb7bd7fcb759b.png';

interface BrandManagementProps {
  onNavigate: (page: string) => void;
}

export function BrandManagement({ onNavigate }: BrandManagementProps) {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image with Gradient Blend */}
        <div className="absolute inset-0 -top-32">
          <img 
            src={heroImage} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay blending to dark grey at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Brand Management & Creative Direction ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Brand Management &
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Creative Direction for your business
            </span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-8">
              You built an amazing business, but your online presence doesn't reflect that. Stop managing five different people. Get one team that handles everything.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Brand Management Section */}
      <BrandManagementModern />

      {/* Problem Statement */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-6 tracking-tight">
              YOU BUILT AN AMAZING BUSINESS,<br />BUT YOUR ONLINE PRESENCE DOESN'T REFLECT THAT.
            </h2>
            <p className="text-xl text-[#7d8187]">
              Every day someone checks you out and walks away.<br />Here's why.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* The Problem */}
            <div className="space-y-6">
              <h3 className="text-2xl text-white">THE PROBLEM IS SIMPLE</h3>
              <div className="space-y-4 text-[#7d8187] leading-relaxed">
                <p>
                  You built an amazing business, product, endless nights, many many conversations. Everyone just gets the value once you explain it to them. But they should get the value you have within the first seconds. That brand that everyone talks about, everyone wants to be associate with.
                </p>
                <p>
                  But your website? Updated years ago. Your business has grown, people don't see that.
                </p>
                <p>
                  Your social media? Random posts, no strategy.
                </p>
                <p>
                  Your pitch materials? Don't match anything else.
                </p>
                <p>
                  When someone looks you up, they don't see what you've built. They see chaos.
                </p>
                <p className="text-white">
                  And chaos doesn't close deals.
                </p>
              </div>
            </div>

            {/* It's Not Just Ugly */}
            <div className="space-y-6">
              <h3 className="text-2xl text-white">IT'S NOT JUST UGLY. IT'S SLOW.</h3>
              <div className="space-y-4 text-[#7d8187] leading-relaxed">
                <p>
                  Even when you try to fix it, nothing moves.
                </p>
                <p>
                  Your designer takes weeks. Your copywriter ghosts. Your developer says "almost done" for the third time.
                </p>
                <p>
                  You're stuck waiting while competitors who look better (even if they're not) win the deals.
                </p>
                <p className="text-white">
                  Speed matters. Your brand can't afford to move slow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Fix */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl text-white mb-8 tracking-tight">HERE'S THE FIX</h2>
            <p className="text-xl text-[#7d8187] mb-8 leading-relaxed">
              Stop managing five different people. Get one team that handles everything.<br />
              We understand your business. We translate it into a brand that looks professional. Then we manage every touchpoint — fast.
            </p>
            
            <h3 className="text-2xl text-white mb-6">What we handle:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                'Your entire visual identity',
                'Website and all landing pages',
                'Weekly content (social, LinkedIn, everything)',
                'Marketing materials and pitch decks',
                'New launches when you need them',
                'Everything stays consistent'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border border-[#1f2228] rounded-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-2"></div>
                  <p className="text-[#7d8187]">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-2xl text-white text-center py-8">
              You run the business. We run the brand.
            </p>
          </div>
        </div>
      </section>

      {/* Who Needs This */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-12 tracking-tight">WHO NEEDS THIS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl text-white mb-6">Business owners who:</h3>
              <div className="space-y-4">
                {[
                  'Are actually good at what they do',
                  "Don't have time to manage creatives",
                  'Need fast execution, not excuses',
                  'Want their brand to match their credibility'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-[#7d8187]">
                    <div className="w-2 h-2 rounded-full bg-[#60a5fa]"></div>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-[#7d8187] text-lg leading-relaxed">
                Works for: financial services, wellness, consulting, luxury businesses, anyone who needs to look serious.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Changes */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-12 tracking-tight">WHAT CHANGES</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Your brand finally looks professional',
              'Everything gets done fast',
              'No more juggling freelancers',
              'Consistent presence everywhere',
              'People understand your value immediately'
            ].map((item, index) => (
              <div 
                key={index}
                className="p-8 border border-[#1f2228] rounded-lg hover:border-[#60a5fa]/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#60a5fa] text-xl">✓</span>
                  <p className="text-white text-lg">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Payoff */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl text-white mb-8 tracking-tight">THE PAYOFF</h2>
          <p className="text-2xl md:text-3xl text-white mb-4">
            Better meetings. Higher prices. Easier closes.
          </p>
          <p className="text-xl text-[#7d8187] max-w-2xl mx-auto">
            Your brand stops costing you money. It starts making you money.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-4xl text-white">What Our Clients Say</h2>
          </div>
        </div>
        <TestimonialSlideshow
          images={[
            testimonial1,
            testimonial2,
            testimonial3,
            testimonial4,
            testimonial5,
            testimonial6,
            testimonial7,
            testimonial8,
            testimonial9,
            testimonial10,
            testimonial11,
          ]}
        />
      </section>

      {/* Pricing */}
      <section className="px-6 py-24 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-[#7d8187] max-w-3xl mx-auto">
              Choose the plan that fits your needs. All plans include unlimited revisions and fast turnaround.
            </p>
          </div>
          <PricingCards onNavigate={onNavigate} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                image: ctaImage2,
                label: 'Get Started',
                title: 'Brand Audit',
                description: 'Get a free analysis of your current brand presence',
                action: () => onNavigate('brand-audit'),
              },
              {
                image: ctaImage3,
                label: 'Book a Call',
                title: 'Discovery Call',
                description: 'Let\'s discuss how we can transform your brand',
                action: () => onNavigate('discovery'),
              },
              {
                image: ctaImage1,
                label: 'See Our Work',
                title: 'Portfolio',
                description: 'Explore our recent brand transformations',
                action: () => onNavigate('portfolio'),
              },
            ].map((cta, index) => (
              <button
                key={index}
                onClick={cta.action}
                className="group relative overflow-hidden rounded-2xl border border-[#1f2228] hover:border-white/20 transition-all"
              >
                <div className="aspect-[4/5] relative">
                  <img
                    src={cta.image}
                    alt={cta.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase mb-3">
                      {cta.label}
                    </p>
                    <h3 className="text-2xl text-white mb-2">{cta.title}</h3>
                    <p className="text-[#7d8187] text-sm">{cta.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}