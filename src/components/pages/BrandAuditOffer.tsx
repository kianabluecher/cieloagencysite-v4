import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { createClient } from '../../utils/supabase/client';
import { usePostHog } from '@posthog/react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface BrandAuditOfferProps {
  onNavigate: (page: string) => void;
}

export function BrandAuditOffer({ onNavigate }: BrandAuditOfferProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const posthog = usePostHog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const supabase = await createClient();
      
      // Track form submission with PostHog
      posthog.capture('brand_audit_offer_form_submitted', {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        company: formData.companyName,
        page: 'lp-brandaudit-offer',
        step: 'offer'
      });

      // Save to database
      const { error } = await supabase
        .from('funnel_submissions')
        .insert({
          funnel_name: 'brand-audit',
          step: 'offer',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          metadata: {
            company_name: formData.companyName,
            source: 'lp-brandaudit-offer',
            page: 'consultation-offer'
          }
        });

      if (error) {
        console.error('Error saving submission:', error);
        posthog.capture('brand_audit_offer_form_error', { error: error.message });
        toast.error('Failed to submit. Please try again.');
        setLoading(false);
        return;
      }

      toast.success('Success! Redirecting...');
      setFormData({ name: '', email: '', phone: '', companyName: '' });
      
      posthog.capture('brand_audit_funnel_step_completed', {
        step: 2,
        next_step: 'strategy'
      });

      // Redirect to strategy page after 1 second
      setTimeout(() => {
        window.location.href = '/lp-brandaudit-strategy';
      }, 1000);
    } catch (err: any) {
      console.error('Submission error:', err);
      posthog.capture('brand_audit_offer_form_exception', { error: err.message });
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const faqs = [
    {
      question: "How long does the brand transformation process take?",
      answer: "Most luxury brand transformations take 60-90 days from audit to full implementation. However, you'll see initial improvements within the first 30 days."
    },
    {
      question: "What makes CIELO different from other agencies?",
      answer: "We specialize exclusively in luxury and high-end brands. Our team has worked with Miami's most prestigious real estate, hospitality, and investment firms, delivering measurable ROI."
    },
    {
      question: "Do you work with startups or only established brands?",
      answer: "We work with both. Whether you're launching a new luxury venture or repositioning an established brand, we create strategies tailored to your specific market position."
    },
    {
      question: "What's included in the free consultation?",
      answer: "Your free consultation includes a comprehensive brand audit, competitive analysis, strategic recommendations, and a custom roadmap for your brand transformation."
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-white py-16 md:py-24 px-6 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            Exclusive Offer
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            How Luxury Real Estate Brands
            <br />
            Generate $50K+ with Strategic
            <br />
            Brand Transformation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join 200+ luxury brands in Miami who are already dominating their markets
          </p>
        </div>
      </section>

      {/* Limited Time Offer - Purple Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-purple-700 py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
              Limited Time Only
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Limited Time Consultation Offer -
              <br />
              Strategy Session (Worth $5,000)
            </h2>
            <p className="text-lg text-purple-100 mb-8">
              Lock in your exclusive consultation slot before they're gone
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl max-w-2xl mx-auto">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                  placeholder="john@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                  placeholder="+1 (305) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                  placeholder="Your Company"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Book Your Free Consultation →'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to receive communications from CIELO Agency
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Why CIELO's Agency Dashboard */}
      <section className="relative bg-white py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
              Why CIELO's Agency Dashboard
              <br />
              Results Other Agencies Can't Match
            </h2>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mb-16">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 md:p-12 shadow-xl">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">C</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">CIELO Dashboard</h3>
                    <p className="text-sm text-gray-500">Real-time Brand Analytics</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Lead Growth', value: '+142%', color: 'text-green-600' },
                    { label: 'Brand Reach', value: '850K', color: 'text-blue-600' },
                    { label: 'Conversion', value: '+58%', color: 'text-purple-600' },
                    { label: 'ROI', value: '3.8x', color: 'text-orange-600' },
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: 'Full-Service Integration',
                description: 'Seamlessly connect your brand, marketing, and content strategy in one unified platform.',
                icon: '🔗'
              },
              {
                title: 'Data-Driven Targeting',
                description: 'Precision audience insights that ensure your luxury brand reaches the right high-net-worth individuals.',
                icon: '🎯'
              },
              {
                title: 'AI-Powered Positioning',
                description: 'Advanced AI tools analyze market trends and competitor positioning to keep you ahead.',
                icon: '🤖'
              },
              {
                title: 'White-Glove Support',
                description: 'Dedicated brand strategists available 24/7 to ensure your transformation stays on track.',
                icon: '👥'
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything Included */}
      <section className="relative bg-gray-50 py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
              Everything Included in Your Brand
              <br />
              Transformation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Comprehensive Strategy',
              'Competitive Analysis',
              'Brand Identity Refresh',
              'Website Optimization',
              'Social Media Strategy',
              'Content Marketing Plan',
              'SEO & Local Search',
              'Email Marketing Automation',
              'Performance Analytics Dashboard',
              'Luxury Market Positioning',
              'Lead Generation Systems',
              'Conversion Rate Optimization',
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-900 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 200+ Luxury Brands */}
      <section className="relative bg-white py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
            Trusted by Industry Leaders
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-12">
            200+ Luxury Brands in Miami are
            <br />
            Already Dominating Their Markets
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                stat: '200+',
                label: 'Luxury Brands',
                description: 'Trust CIELO for their brand transformation'
              },
              {
                stat: '$50K+',
                label: 'Average Revenue Growth',
                description: 'Per client within the first 90 days'
              },
              {
                stat: '142%',
                label: 'Lead Increase',
                description: 'Average across all client portfolios'
              },
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8">
                <div className="text-5xl font-bold text-purple-600 mb-2">{item.stat}</div>
                <div className="text-xl font-bold text-gray-900 mb-2">{item.label}</div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {['Miami Real Estate', 'Luxury Hospitality', 'Investment Firms', 'High-End Retail', 'Private Equity'].map((brand, index) => (
              <div key={index} className="text-xl font-bold text-gray-400">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-purple-700 py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎯</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Guarantee: See Real Results
            <br />
            or We'll Keep Working For Free
          </h2>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto mb-8">
            We're so confident in our process that if you don't see measurable improvements in your brand positioning and lead quality within 60 days, we'll continue working until you do—at no additional cost.
          </p>
          <button
            onClick={() => window.scrollTo({ top: document.querySelector('form')?.offsetTop || 0, behavior: 'smooth' })}
            className="px-12 py-4 bg-white text-purple-600 text-lg font-bold rounded-xl hover:shadow-xl transition-all"
          >
            Claim Your Free Consultation →
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-white py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Everything you need to know about our brand transformation process</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Miami's most successful luxury brands. Book your free consultation today and discover how we can help you dominate your market.
          </p>
          <button
            onClick={() => window.scrollTo({ top: document.querySelector('form')?.offsetTop || 0, behavior: 'smooth' })}
            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-xl hover:shadow-2xl transition-all"
          >
            Book Free Consultation Now →
          </button>
          <p className="text-sm text-gray-500 mt-6">
            Limited slots available • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">© 2025 CIELO Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}