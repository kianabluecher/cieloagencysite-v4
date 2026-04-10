import { ImageWithFallback } from './figma/ImageWithFallback';
import { PortfolioPreview } from './PortfolioPreview';
import { BrandsShowcase } from './BrandsShowcase';
import { FAQSection } from './FAQSection';
import { TestimonialSlideshow } from './TestimonialSlideshow';
import { SEOHead } from './SEOHead';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
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

interface Deliverable {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Strategist {
  name: string;
  title: string;
  image: string;
  calloutText: string;
  calloutDescription: string;
}

interface IndustrySubpageTemplateProps {
  // Hero Section
  category: string;
  headline: string;
  subheadline: string;
  heroImage?: string;
  splineUrl?: string;
  
  // Description Section
  description: string;
  
  // Reality & Solution
  realityText: string;
  deliverables: Deliverable[];
  
  // Who This Is For (optional)
  whoThisIsFor?: string;
  
  // Timeline & Investment
  timeline: string;
  investment: string;
  
  // CTA Section
  ctaHeadline: string;
  ctaButtonText: string;
  
  // FAQ Section
  faqs: FAQ[];
  
  // Strategist Section
  strategist: Strategist;
  
  // SEO (optional - will use defaults if not provided)
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  seoImage?: string;
  
  // Navigation
  onNavigate: (page: string, slug?: string) => void;
}

export function IndustrySubpageTemplate({
  category,
  headline,
  subheadline,
  heroImage,
  splineUrl,
  description,
  realityText,
  deliverables,
  whoThisIsFor,
  timeline,
  investment,
  ctaHeadline,
  ctaButtonText,
  faqs,
  strategist,
  seoTitle,
  seoDescription,
  seoKeywords,
  seoImage,
  onNavigate
}: IndustrySubpageTemplateProps) {
  // Generate SEO values from props
  const pageTitle = seoTitle || `${headline?.replace('\\n', ' ') || 'CIELO Agency'} | CIELO Agency`;
  const pageDescription = seoDescription || description?.substring(0, 160) || '';
  const pageKeywords = seoKeywords || `${category?.toLowerCase() || 'marketing'}, branding, marketing, CIELO Agency`;
  const pageImage = seoImage || heroImage;
  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.cielo.agency/';

  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  useEffect(() => {
    // Load Spline viewer script if splineUrl is provided
    if (splineUrl && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.68/build/spline-viewer.js';
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [splineUrl]);

  useEffect(() => {
    const fetchPageData = async () => {
      const slug = typeof window !== 'undefined' ? window.location.pathname.replace(/^\//, '') : '';
      if (!slug) return;

      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/dynamic-pages/${slug}`,
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

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* SEO Meta Tags */}
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        image={pageImage}
        url={pageUrl}
        type="website"
      />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -top-32">
          {splineUrl ? (
            <>
              <div className="w-full h-full">
                <spline-viewer url={splineUrl} className="w-full h-full"></spline-viewer>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/40 to-neutral-950"></div>
            </>
          ) : (
            <>
              <ImageWithFallback 
                src={heroImage}
                alt="Hero background" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
            </>
          )}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ {category} ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto max-w-4xl">
            {headline.split('\n').map((line, i) => (
              <span key={i} className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                {line}
              </span>
            ))}
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[16px] mt-[128px]">
              {subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <BrandsShowcase />

      {/* Description */}
      <section className="px-6 py-48 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <p className="text-2xl text-white max-w-3xl mx-auto text-center leading-relaxed font-[Helvetica_Neue]">
            {description}
          </p>
        </div>
      </section>

      {/* The Reality & Solution */}
      <section className="px-6 py-16 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* The Reality */}
            <div>
              <div className="mb-8">
                <span className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                  Problem
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl text-white tracking-tight font-['Helvetica_Neue'] mb-6">
                The Reality
              </h2>
              <p className="text-base text-[#7d8187] leading-relaxed font-['Helvetica_Neue']">
                {realityText}
              </p>
            </div>

            {/* What CIELO Delivers */}
            <div>
              <div className="mb-8">
                <span className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                  What We Do
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl text-white tracking-tight font-['Helvetica_Neue'] mb-8">
                What CIELO Delivers
              </h2>
              
              {/* Structured Deliverables List */}
              <div className="space-y-0">
                {deliverables.map((item, index) => (
                  <div key={index} className="border-t border-[#1f2228] py-6 group hover:bg-white/[0.01] transition-all duration-300">
                    <div className="flex gap-6 items-start">
                      {/* Number */}
                      <div className="flex-shrink-0">
                        <span className="font-['Geist_Mono'] text-[#3d3d3d] text-sm">
                          {String(index + 1).padStart(2, '0')}.
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 space-y-1.5">
                        <h3 className="text-white text-base font-medium font-['Helvetica_Neue']">
                          {item.title}
                        </h3>
                        <p className="text-[#7d8187] text-sm leading-relaxed font-['Helvetica_Neue']">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For (Optional) */}
      {whoThisIsFor && (
        <section className="px-6 py-20 border-t border-[#1f2228]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-white mb-12 font-['Helvetica'] tracking-tight">Who This Is For</h2>
            <p className="text-xl text-[#7d8187]">
              {whoThisIsFor}
            </p>
          </div>
        </section>
      )}

      {/* Investment & Timeline */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#1f2228] bg-black max-w-5xl mx-auto">
            <div className="relative p-8 md:border-r border-[#1f2228] group hover:bg-white/[0.02] transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <div className="w-5 h-5 border border-white/20"></div>
                <span className="text-xs text-gray-700 font-mono">01</span>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-white tracking-tighter mb-2">{timeline}</div>
                <div className="text-xs font-medium tracking-widest text-[#7d8187] uppercase">Timeline</div>
              </div>
            </div>

            <div className="relative p-8 group hover:bg-white/[0.02] transition-colors duration-500">
              <div className="flex justify-between items-start mb-12">
                <div className="w-5 h-5 border border-white/20"></div>
                <span className="text-xs text-gray-700 font-mono">02</span>
              </div>
              <div>
                <div className="text-3xl md:text-4xl text-white tracking-tighter mb-2">{investment}</div>
                <div className="text-xs font-medium tracking-widest text-[#7d8187] uppercase">Investment</div>
              </div>
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
              {ctaHeadline}
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.apollo.io/#/meet/cieloagency/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border border-[#7d8187] text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/5 transition-all group"
            >
              {ctaButtonText}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            {downloadLink && (
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-all group"
              >
                Download Information
                <Download className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Call with Strategist Section */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Image */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full max-w-sm mx-auto md:mx-0 overflow-hidden border border-[#1f2228] rounded-lg">
                <img
                  src={strategist.image}
                  alt={strategist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl text-white mb-1">{strategist.name}</h3>
                <p className="text-[#7d8187] font-['Geist_Mono'] text-sm tracking-[1px] uppercase">{strategist.title}</p>
              </div>
            </div>

            {/* Right: Text & Button */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl text-white mb-3">
                  {strategist.calloutText}
                </h3>
                <p className="text-[#7d8187] leading-relaxed">
                  {strategist.calloutDescription}
                </p>
              </div>
              <a
                href="https://app.apollo.io/#/meet/cieloagency/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/90 transition-all flex items-center gap-3 group"
              >
                Schedule a free call with our strategist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Slideshows */}
      <section className="py-16 border-t border-[#1f2228] bg-neutral-950">
        <div className="space-y-6">
          <TestimonialSlideshow
            images={[testimonial1, testimonial2, testimonial3, testimonial4, testimonial5, testimonial6, testimonial7, testimonial8, testimonial9, testimonial10, testimonial11]}
            direction="left"
            speed={30}
            height={64}
          />
          <TestimonialSlideshow
            images={[testimonial11, testimonial10, testimonial9, testimonial8, testimonial7, testimonial6, testimonial5, testimonial4, testimonial3, testimonial2, testimonial1]}
            direction="right"
            speed={35}
            height={64}
          />
        </div>
      </section>
    </div>
  );
}