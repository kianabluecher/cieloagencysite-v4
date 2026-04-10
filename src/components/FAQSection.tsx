import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  pageUrl?: string; // Optional: specific page URL for the FAQ schema
}

export function FAQSection({ faqs, title = "Frequently Asked Questions", subtitle, pageUrl }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Add FAQ Schema (JSON-LD) for SEO
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    // Create FAQ schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    // Add schema to document head
    const scriptId = 'faq-schema-jsonld';
    let scriptElement = document.getElementById(scriptId);
    
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    
    scriptElement.textContent = JSON.stringify(faqSchema);

    // Cleanup function
    return () => {
      const element = document.getElementById(scriptId);
      if (element) {
        document.head.removeChild(element);
      }
    };
  }, [faqs]);

  return (
    <section className="relative bg-neutral-950 px-6 py-20 overflow-hidden">
      {/* Grain/Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Two-Column Layout - Title Left, Questions Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 px-6">
          {/* Left Column - Title */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <p className="text-neutral-500 text-sm tracking-[0.5px] uppercase mb-6 font-['Geist_Mono']">
                FAQ /
              </p>
              <h2 className="text-3xl md:text-4xl text-white leading-tight tracking-tight font-['Helvetica']">
                {title}
              </h2>
              {subtitle && (
                <p className="text-neutral-400 text-base mt-4 font-['Helvetica']">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Collapsible Questions */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border-b transition-all ${
                    index === 0 ? "border-t" : ""
                  } ${
                    activeIndex === index
                      ? "border-neutral-700"
                      : "border-neutral-800"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                    className="w-full text-left py-6 flex items-start justify-between gap-4"
                  >
                    <span
                      className={`text-lg transition-colors font-['Helvetica'] ${
                        activeIndex === index
                          ? "text-white"
                          : "text-neutral-400"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-transform mt-1 ${
                        activeIndex === index
                          ? "rotate-90 text-white"
                          : "text-neutral-600"
                      }`}
                    />
                  </button>
                  
                  {/* Collapsible Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeIndex === index
                        ? "max-h-96 opacity-100 pb-6"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-neutral-400 text-base leading-relaxed font-['Helvetica'] pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}