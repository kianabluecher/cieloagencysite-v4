import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { createClient } from '../../utils/supabase/client';
import { usePostHog } from '@posthog/react';
import { TestimonialSlideshow } from '../TestimonialSlideshow';
import sliderImage1 from 'figma:asset/d88d381820ce4ca5ce1928529797120b27c3001b.png';
import sliderImage2 from 'figma:asset/ad7d40d325c0b40d73a68f89d248ec9f0a6e5559.png';
import sliderImage3 from 'figma:asset/86963a06a42b6f628963bb8c62acdfc651bfc794.png';

interface FreebieGPTProps {
  onNavigate: (page: string) => void;
}

export function FreebieGPT({ onNavigate }: FreebieGPTProps) {
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
      posthog.capture('freebie_gpt_form_submitted', {
        email: formData.email,
        name: formData.name,
        page: 'freebie-gpt',
        step: 'landing'
      });

      // Save to database
      const { error } = await supabase
        .from('funnel_submissions')
        .insert({
          funnel_name: 'freebie-gpt',
          step: 'landing',
          name: formData.name,
          email: formData.email,
          metadata: {
            source: 'freebie-gpt',
            page: 'video-case-study'
          }
        });

      if (error) {
        console.error('Error saving submission:', error);
        posthog.capture('freebie_gpt_form_error', { error: error.message });
        toast.error('Failed to submit. Please try again.');
        setLoading(false);
        return;
      }

      toast.success('Success! Redirecting to next step...');
      setFormData({ name: '', email: '' });
      
      posthog.capture('freebie_gpt_funnel_step_completed', {
        step: 1,
        next_step: 'offer'
      });

      // Redirect to offer page after 1 second
      setTimeout(() => {
        window.location.href = '/lp-brandaudit-offer';
      }, 1000);
    } catch (err: any) {
      console.error('Submission error:', err);
      posthog.capture('freebie_gpt_form_exception', { error: err.message });
      toast.error('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8 leading-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Get access to our $100,000 prompt generator GPT
            </h1>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-8">
              The most advanced AI prompt engineering system designed for enterprise teams.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Enter Your Details Below:
            </h2>
          </div>

          {/* Form */}
          <div className="max-w-lg mx-auto mb-16 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
            <iframe
              src="https://try.cielo.agency/gpt-form"
              className="w-full h-[500px] border-0 rounded-xl"
              title="GPT Access Form"
              style={{
                colorScheme: 'dark',
                background: '#0A0A0B',
              }}
            />
          </div>

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
              <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center">
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
                <p className="text-sm text-zinc-400 mb-4">{testimonial.quote}</p>
                <p className="text-sm font-bold text-white">{testimonial.name}</p>
                <p className="text-xs text-zinc-500">{testimonial.role}</p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="text-center mb-8">
            <p className="text-sm text-zinc-500 mb-4">
              Trusted by luxury real estate, hospitality, and investment firms across Miami
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-50">
              <div className="text-2xl font-bold text-zinc-600">Zillow</div>
              <div className="text-2xl font-bold text-zinc-600">Booking</div>
              <div className="text-2xl font-bold text-zinc-600">Google</div>
              <div className="text-2xl font-bold text-zinc-600">Apple</div>
              <div className="text-2xl font-bold text-zinc-600">Airbnb</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliders Section */}
      <section className="py-16 bg-zinc-950 border-t border-zinc-800">
        <div className="space-y-6">
          {/* First slider - scrolls right */}
          <TestimonialSlideshow
            images={[sliderImage1, sliderImage2, sliderImage3, sliderImage1, sliderImage2, sliderImage3]}
            direction="right"
            speed={30}
            height={150}
          />
          
          {/* Second slider - scrolls left */}
          <TestimonialSlideshow
            images={[sliderImage3, sliderImage2, sliderImage1, sliderImage3, sliderImage2, sliderImage1]}
            direction="left"
            speed={35}
            height={150}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-zinc-950 border-t border-zinc-800 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-[#0A0A0B] ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Get access to our $100,000 prompt generator GPT
          </h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-4 bg-white text-[#0A0A0B] text-lg font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🔐</span>
              <span>Get Access Now</span>
            </div>
          </button>
          <p className="text-sm text-zinc-500 mt-4">100% Free & Confidential</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0B] py-8 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-zinc-600">© 2025 CIELO Agency. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}