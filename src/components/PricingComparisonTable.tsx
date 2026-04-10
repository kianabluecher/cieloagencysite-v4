import { CheckCircle, Star, Plus } from 'lucide-react';

export function PricingComparisonTable() {
  const starterFeatures = [
    'Strategy & Needs Discovery',
    'Main + Up to 3 Sub Pages',
    'Developed on Wix Studio or Wordpress',
    'Wireframe + Content & Copy Guidance',
    'Responsive Web Design (Mobile + Desktop)',
    'Simple Digital Brand Improvement & Kit',
    'Basic Animations + Scroll Effects',
    'SEO-Friendly Structure (meta tags, headers)',
    'CMS + Blog Setup',
    'Built-In Lead Forms & Flow',
    { text: 'Ongoing Support & Hosting available ( starting at $75 p/m )', highlight: true }
  ];

  const advancedFeatures = [
    'Strategic Web Funnel Mapping & Marketing Approach',
    'Main + Up to 5 Sub Pages',
    'Developed on Webflow',
    'Responsive Web Design (Mobile + Desktop)',
    'Digital & Social Media Kit ( LinkedIn & Facebook Header, .. )',
    'Premium Animations + Microinteractions or Motions',
    'Full SEO Setup (Speed, Tags, Schema, Indexing)',
    'Full Brand Development & Redesign ( Logo, Brand Guide )',
    'One Pitch Deck / Presentation redesign',
    'Webflow CMS + Blog Setup',
    'Policy Pages Included',
    'Built-In Lead Forms',
    { text: 'Ongoing Support & Hosting available ( starting at $75 p/m )', highlight: true }
  ];

  return (
    <section className="relative px-6 py-20 bg-[#060d17] overflow-hidden">
      {/* Gradient Background Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1000px] opacity-30 pointer-events-none">
        <div 
          className="absolute inset-0 blur-[120px] rounded-full" 
          style={{
            background: 'radial-gradient(circle, rgba(160, 187, 197, 0.4) 0%, rgba(160, 187, 197, 0.2) 50%, transparent 100%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl text-white/90 tracking-tight capitalize mb-2">
              Simple, Direct Offering.
            </h2>
          </div>
          
          {/* Plus Icons */}
          <div className="hidden lg:flex gap-4">
            <Plus className="w-7 h-7 text-white/60" />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Starter Web Launch */}
          <div className="relative group">
            {/* Glass Border Effect */}
            <div className="absolute inset-0 rounded-[20px] p-[2px] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-sm">
              <div className="absolute inset-[2px] bg-white rounded-[18px]" />
            </div>
            
            {/* Card Content */}
            <div className="relative bg-white rounded-[20px] p-8 md:p-10">
              <h3 className="text-2xl md:text-[32px] font-medium text-black capitalize tracking-tight mb-2">
                Starter Web Launch
              </h3>
              <p className="text-black/50 text-sm md:text-base mb-6">
                Refresh your current Website and Branding.
              </p>
              
              <div className="text-4xl md:text-[40px] font-medium text-black tracking-tight mb-8">
                $7,500
              </div>

              <div className="border-t border-black/10 pt-6">
                <p className="text-black/50 text-sm md:text-base mb-6">
                  Available Features:
                </p>
                
                <div className="space-y-4">
                  {starterFeatures.map((feature, index) => {
                    const isHighlight = typeof feature === 'object';
                    const text = isHighlight ? feature.text : feature;
                    
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isHighlight ? 'text-[#1c7052]' : 'text-black'}`} />
                        <p className={`text-sm md:text-[15.5px] leading-relaxed ${isHighlight ? 'text-[#1c7052]' : 'text-black'}`}>
                          {text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Brand & Web Setup */}
          <div className="relative group">
            {/* Recommended Badge */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
              <div className="bg-[#002607] px-6 py-2 rounded-full flex items-center gap-2 border border-[#96FFA9]/20">
                <Star className="w-5 h-5 text-[#96FFA9] fill-[#96FFA9]" />
                <span className="text-[#96FFA9] text-sm font-medium uppercase tracking-wide">
                  RECOMMENDED
                </span>
              </div>
            </div>

            {/* Glass Border Effect with Green Tint */}
            <div className="absolute inset-0 rounded-[20px] p-[2px] bg-gradient-to-b from-[#96FFA9]/30 to-[#96FFA9]/10 backdrop-blur-sm">
              <div className="absolute inset-[2px] bg-white rounded-[18px]" />
            </div>
            
            {/* Card Content */}
            <div className="relative bg-white rounded-[20px] p-8 md:p-10">
              <h3 className="text-2xl md:text-[32px] font-medium text-black capitalize tracking-tight mb-2">
                Advanced Brand & Web Setup
              </h3>
              <p className="text-black/50 text-sm md:text-base mb-6 leading-relaxed">
                Fully Developed Website and Brand Identity custom to your business.
              </p>
              
              <div className="text-4xl md:text-[40px] font-medium text-black tracking-tight mb-8">
                $9,500
              </div>

              <div className="border-t border-black/10 pt-6">
                <p className="text-black/50 text-sm md:text-base mb-6">
                  Available Features:
                </p>
                
                <div className="space-y-4">
                  {advancedFeatures.map((feature, index) => {
                    const isHighlight = typeof feature === 'object';
                    const text = isHighlight ? feature.text : feature;
                    
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isHighlight ? 'text-[#1c7052]' : 'text-black'}`} />
                        <p className={`text-sm md:text-[15.5px] leading-relaxed ${isHighlight ? 'text-[#1c7052]' : 'text-black'}`}>
                          {text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}