import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { createClient } from '../../utils/supabase/client';
import { usePostHog } from '@posthog/react';

interface BrandAuditLandingProps {
  onNavigate: (page: string) => void;
}

export function BrandAuditLanding({ onNavigate }: BrandAuditLandingProps) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const posthog = usePostHog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const supabase = await createClient();
      
      // Track form submission with PostHog
      posthog.capture('brand_audit_landing_form_submitted', {
        email: formData.email,
        name: formData.name,
        page: 'lp-brandaudit',
        step: 'landing'
      });

      // Save to database
      const { error } = await supabase
        .from('funnel_submissions')
        .insert({
          funnel_name: 'brand-audit',
          step: 'landing',
          name: formData.name,
          email: formData.email,
          metadata: {
            source: 'lp-brandaudit',
            page: 'video-case-study'
          }
        });

      if (error) {
        console.error('Error saving submission:', error);
        posthog.capture('brand_audit_landing_form_error', { error: error.message });
        toast.error('Failed to submit. Please try again.');
        setLoading(false);
        return;
      }

      toast.success('Success! Redirecting to next step...');
      setFormData({ name: '', email: '' });
      
      posthog.capture('brand_audit_funnel_step_completed', {
        step: 1,
        next_step: 'offer'
      });

      // Redirect to offer page after 1 second
      setTimeout(() => {
        window.location.href = '/lp-brandaudit-offer';
      }, 1000);
    } catch (err: any) {
      console.error('Submission error:', err);
      posthog.capture('brand_audit_landing_form_exception', { error: err.message });
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Video Placeholder */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
              Miami Real Estate Brand Exploded:
              <br />
              <span className="block mt-2">40% Lead Increase in 90 Days</span>
              <span className="block mt-2">(Case Study Video)</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Discover the exact branding strategy that transformed luxury real estate firms into market leaders.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-600">
              Get Free Case Study Access Now:
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 mb-16">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👋</span>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-14 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
              />
            </div>
            
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">✉️</span>
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-14 pr-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-purple-600 text-white text-xl font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">🔐</span>
                <span>Access Case Study</span>
              </div>
              <p className="text-sm font-normal mt-1">100% Free & Confidential</p>
            </button>
          </form>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              {
                quote: "Our luxury brand now attracts high-end clients effortlessly",
                name: "Alex Rodriguez",
                role: "Marketing Director",
              },
              {
                quote: "100% increase in qualified leads within 8 months",
                name: "Maria Santos",
                role: "Hospitality Group",
              },
              {
                quote: "CIELO transformed our brand from overlooked to in-demand",
                name: "James Thompson",
                role: "Investment Manager",
              },
              {
                quote: "Finally, a brand that speaks luxury and delivers results",
                name: "Sarah Martinez",
                role: "Real Estate Broker",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-neutral-50 rounded-2xl p-6 text-center">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-700 mb-4">{testimonial.quote}</p>
                <p className="text-sm font-bold text-black">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-4">
              Trusted by luxury real estate, hospitality, and investment firms across Miami
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-50">
              <div className="text-2xl font-bold text-gray-400">Zillow</div>
              <div className="text-2xl font-bold text-gray-400">Booking</div>
              <div className="text-2xl font-bold text-gray-400">Google</div>
              <div className="text-2xl font-bold text-gray-400">Apple</div>
              <div className="text-2xl font-bold text-gray-400">Airbnb</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Miami Real Estate Brand Exploded:
            <br />
            40% Lead Increase in 90 Days
            <br />
            (Case Study Video)
          </h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-4 bg-purple-600 text-white text-lg font-bold rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🔐</span>
              <span>Access Case Study</span>
            </div>
          </button>
          <p className="text-sm text-gray-600 mt-4">100% Free & Confidential</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-600">© 2025 CIELO Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}