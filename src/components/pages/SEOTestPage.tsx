import React from 'react';
import { FAQSection } from '../FAQSection';
import { SEOHead } from '../SEOHead';

interface SEOTestPageProps {
  onNavigate: (page: string) => void;
}

export function SEOTestPage({ onNavigate }: SEOTestPageProps) {
  const testFAQs = [
    {
      question: "How do I test if FAQ Schema is working?",
      answer: "View the page source (right-click > View Page Source) and search for 'application/ld+json'. You should see a script tag with '@type': 'FAQPage' containing all your questions and answers."
    },
    {
      question: "How do I validate my FAQ Schema?",
      answer: "Use Google's Rich Results Test at https://search.google.com/test/rich-results. Paste your page URL and it will show if FAQ schema is detected with 0 errors."
    },
    {
      question: "When will FAQ rich snippets appear in Google?",
      answer: "After Google crawls and validates your schema (usually 1-2 weeks), rich snippets may start appearing. However, Google algorithmically decides when to show them based on relevance and quality."
    },
    {
      question: "Can AI crawlers see my FAQs now?",
      answer: "Yes! ChatGPT, Claude, Perplexity, and other AI assistants can now properly index and cite your FAQ content because it's structured with schema.org markup."
    },
    {
      question: "What should I do next?",
      answer: "Test this page with Google Rich Results Test, submit your sitemap to Google Search Console, and monitor performance over the next 2-4 weeks."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <SEOHead
        title="SEO Test Page - FAQ Schema Validation | CIELO Agency"
        description="Test page to validate FAQ Schema implementation and structured data for search engines and AI crawlers."
        keywords="SEO test, FAQ schema, structured data, JSON-LD, rich snippets"
        url="https://www.cielo.agency/seo-test"
      />

      {/* Hero */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6">
            <span className="font-['Geist_Mono'] text-cyan-400 text-xs tracking-[2px] uppercase">
              SEO Test Page
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white tracking-tight mb-6">
            FAQ Schema Test
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            This page demonstrates working FAQ Schema implementation. Use this to validate your structured data.
          </p>
        </div>
      </section>

      {/* Test Instructions */}
      <section className="px-6 py-12 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-white mb-8 tracking-tight">How to Test FAQ Schema</h2>
          
          <div className="space-y-6">
            <div className="bg-[#0A0A0B] border border-cyan-400/20 p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                  <span className="text-cyan-400 font-['Geist_Mono'] text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-xl text-white mb-3">View Page Source</h3>
                  <p className="text-zinc-400 mb-4">Right-click anywhere on this page and select "View Page Source"</p>
                  <div className="bg-zinc-950 p-4 rounded border border-zinc-800 font-['Geist_Mono'] text-sm text-green-400">
                    <code>
                      {'<script type="application/ld+json" id="faq-schema-jsonld">'}
                      <br />
                      {'  { "@context": "https://schema.org", "@type": "FAQPage" ... }'}
                      <br />
                      {'</script>'}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0B] border border-cyan-400/20 p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                  <span className="text-cyan-400 font-['Geist_Mono'] text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-xl text-white mb-3">Google Rich Results Test</h3>
                  <p className="text-zinc-400 mb-4">Validate schema with Google's official tool</p>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-cyan-400 text-black font-medium rounded hover:bg-cyan-300 transition-colors"
                  >
                    Open Rich Results Test →
                  </a>
                  <p className="text-zinc-500 text-sm mt-4">
                    Expected result: "FAQ" rich result detected with 0 errors
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0A0A0B] border border-cyan-400/20 p-8 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                  <span className="text-cyan-400 font-['Geist_Mono'] text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-xl text-white mb-3">Schema.org Validator</h3>
                  <p className="text-zinc-400 mb-4">Additional validation with schema.org official validator</p>
                  <a
                    href="https://validator.schema.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-white/10 text-white border border-white/20 font-medium rounded hover:bg-white/20 transition-colors"
                  >
                    Open Schema Validator →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Schema Output */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-white mb-8 tracking-tight">Expected JSON-LD Output</h2>
          
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 overflow-auto">
            <pre className="text-xs text-green-400 font-['Geist_Mono']">
{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I test if FAQ Schema is working?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "View the page source..."
      }
    },
    {
      "@type": "Question",
      "name": "How do I validate my FAQ Schema?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use Google's Rich Results Test..."
      }
    }
    // ... more questions
  ]
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Test FAQ Section */}
      <FAQSection 
        faqs={testFAQs}
        title="Test FAQ Section"
        subtitle="These FAQs are automatically indexed by search engines and AI crawlers with proper schema markup"
      />

      {/* Status Indicators */}
      <section className="px-6 py-12 bg-zinc-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-white mb-8 tracking-tight">Implementation Status</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { feature: "FAQ Schema (JSON-LD)", status: "✅ Active" },
              { feature: "Organization Schema", status: "✅ Active" },
              { feature: "Service Schema", status: "✅ Active" },
              { feature: "Article Schema", status: "✅ Active" },
              { feature: "Breadcrumb Schema", status: "✅ Active" },
              { feature: "XML Sitemap", status: "✅ Active" },
              { feature: "Robots.txt", status: "✅ Active" },
              { feature: "Clean URLs", status: "✅ Active" },
              { feature: "Meta Tags", status: "✅ Active" },
              { feature: "Open Graph Tags", status: "✅ Active" },
              { feature: "Twitter Cards", status: "✅ Active" },
              { feature: "Canonical URLs", status: "✅ Active" },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0A0A0B] border border-zinc-800 p-6 rounded flex items-center justify-between">
                <span className="text-zinc-300">{item.feature}</span>
                <span className="text-cyan-400 font-['Geist_Mono'] text-sm">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-white mb-8 tracking-tight">Documentation</h2>
          
          <div className="space-y-4">
            <div className="bg-[#0A0A0B] border border-zinc-800 p-6 rounded">
              <h3 className="text-white mb-2">📄 SEO Enhancement Summary</h3>
              <p className="text-zinc-400 text-sm mb-4">Complete overview of all SEO implementations</p>
              <code className="text-cyan-400 font-['Geist_Mono'] text-xs">/SEO_ENHANCEMENT_SUMMARY.md</code>
            </div>

            <div className="bg-[#0A0A0B] border border-zinc-800 p-6 rounded">
              <h3 className="text-white mb-2">📄 FAQ Implementation Guide</h3>
              <p className="text-zinc-400 text-sm mb-4">How to add FAQ Schema to new pages</p>
              <code className="text-cyan-400 font-['Geist_Mono'] text-xs">/SEO_FAQ_IMPLEMENTATION.md</code>
            </div>

            <div className="bg-[#0A0A0B] border border-zinc-800 p-6 rounded">
              <h3 className="text-white mb-2">🔗 XML Sitemap</h3>
              <p className="text-zinc-400 text-sm mb-4">Submit to Google Search Console</p>
              <a 
                href="/sitemap.xml" 
                target="_blank"
                className="text-cyan-400 font-['Geist_Mono'] text-xs hover:underline"
              >
                /sitemap.xml →
              </a>
            </div>

            <div className="bg-[#0A0A0B] border border-zinc-800 p-6 rounded">
              <h3 className="text-white mb-2">🤖 Robots.txt</h3>
              <p className="text-zinc-400 text-sm mb-4">Crawler configuration for search engines and AI</p>
              <a 
                href="/robots.txt" 
                target="_blank"
                className="text-cyan-400 font-['Geist_Mono'] text-xs hover:underline"
              >
                /robots.txt →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl text-white mb-6 tracking-tight">
            Ready to Test Other Pages?
          </h2>
          <p className="text-zinc-400 mb-8">
            Test any page with FAQ sections using Google Rich Results Test
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-4 bg-cyan-400 text-black font-medium rounded hover:bg-cyan-300 transition-colors"
          >
            Back to Homepage
          </button>
        </div>
      </section>
    </div>
  );
}
