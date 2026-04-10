import { PricingComparisonTable } from '../PricingComparisonTable';

interface BrandWebPricingProps {
  onNavigate: (page: string) => void;
}

// Dedicated pricing page showing only the pricing comparison table
export function BrandWebPricing({ onNavigate }: BrandWebPricingProps) {
  return (
    <div className="min-h-screen bg-neutral-950 pt-32">
      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-2 rounded-full mb-8">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Brand & Web Pricing ]
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl text-white tracking-tight mb-8 mx-auto max-w-4xl">
            Premium Brand & Web Packages
          </h1>
          <p className="text-2xl text-[#7d8187] leading-relaxed mx-auto max-w-3xl">
            Choose the package that fits your business needs
          </p>
        </div>
      </section>

      {/* Pricing Comparison Table */}
      <div className="w-full flex items-center justify-center py-20">
        <PricingComparisonTable />
      </div>

      {/* CTA Section */}
      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white tracking-tight mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-[#7d8187] mb-10">
            Let's discuss which package is right for your business
          </p>
          <button
            onClick={() => onNavigate('/lets-talk')}
            className="px-8 py-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-['Geist_Mono'] text-sm tracking-[0.1em] uppercase hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
