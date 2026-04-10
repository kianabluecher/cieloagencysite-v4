import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { BrandsShowcase } from '../BrandsShowcase';
import { FAQSection } from '../FAQSection';
import { cgiCampaignsFAQs } from '../../utils/faq-data';

interface CGICampaignsProps {
  onNavigate: (page: string) => void;
}

export function CGICampaigns({ onNavigate }: CGICampaignsProps) {
  return (
    <div className="min-h-screen bg-neutral-950">
      <section className="relative px-6 pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -top-32">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1634900404354-c587e0be192e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlcmluZyUyMGRpZ2l0YWx8ZW58MXx8fHwxNzYwODk5MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">[ CGI & 3D Campaigns ]</p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Reality is overrated.</span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">CGI campaigns that convert</span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-8">
              Scroll-stopping CGI that drives real business results. From concept to TikTok fame in 30 days.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <BrandsShowcase />

      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-white mb-12">What We Create</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { title: 'Viral CGI campaigns', description: 'Scroll-stopping 3D content designed for maximum social impact' },
              { title: '3D product visualization', description: 'Photorealistic renders that showcase products in impossible ways' },
              { title: 'AR try-on experiences', description: 'Interactive augmented reality for customer engagement' },
            ].map((item, index) => (
              <div key={index} className="p-12 min-h-[280px] border border-[#1f2228] group flex flex-col justify-end items-start">
                <h3 className="text-xl text-white mb-4">{item.title}</h3>
                <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight">Results</h2>
            <p className="text-xl text-[#7d8187] max-w-2xl text-[15px]">
              Average 10M+ organic impressions. 300% increase in product interest. Content that lives forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { title: 'Concept Development', description: 'Creating viral-worthy CGI concepts that align with your brand and marketing goals.' },
              { title: '3D Modeling & Rendering', description: 'Photorealistic 3D creation with attention to every detail and texture.' },
              { title: 'Animation & Motion', description: 'Dynamic animations optimized for social media and maximum engagement.' },
              { title: 'Campaign Deployment', description: 'Strategic rollout across platforms with amplification and performance tracking.' },
            ].map((item, index) => (
              <div key={index} className="group border border-[#1f2228] p-8 min-h-[280px] flex flex-col justify-end items-start">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-['Geist_Mono'] text-white/40 text-sm">0{index + 1}</span>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>
                <h3 className="text-xl text-white mb-3">{item.title}</h3>
                <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <PortfolioPreview onNavigate={onNavigate} />

      <section className="relative px-6 py-32 border-t border-[#1f2228] overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">Ready to go viral?</h2>
          <p className="text-2xl text-[#7d8187]">Let's create CGI that breaks the internet.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button onClick={() => onNavigate('inquiry')} className="px-8 py-3 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors">GET QUOTE</button>
            <button onClick={() => onNavigate('inquiry')} className="px-8 py-3 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-white/40 hover:bg-white/5 transition-colors flex items-center justify-center gap-3">SET A CALL<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={cgiCampaignsFAQs} />
    </div>
  );
}