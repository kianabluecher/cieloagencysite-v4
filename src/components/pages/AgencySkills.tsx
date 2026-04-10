import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { usePostHog } from '@posthog/react';
import { TestimonialSlideshow } from '../TestimonialSlideshow';
import sliderImage1 from 'figma:asset/d88d381820ce4ca5ce1928529797120b27c3001b.png';
import sliderImage2 from 'figma:asset/ad7d40d325c0b40d73a68f89d248ec9f0a6e5559.png';
import sliderImage3 from 'figma:asset/86963a06a42b6f628963bb8c62acdfc651bfc794.png';
import auditImage from 'figma:asset/8df34ed2a8bc5408c8a0ee02d593563246720806.png';

interface AgencySkillsProps {
  onNavigate: (page: string) => void;
}

export function AgencySkills({ onNavigate }: AgencySkillsProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const posthog = usePostHog();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    try {
      // Track form submission with PostHog
      posthog.capture('agency_skills_download_submitted', {
        email: email,
        page: 'agency-skills'
      });

      // Submit to try.cielo.agency backend
      const response = await fetch('https://try.cielo.agency/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Submission error:', errorText);
        posthog.capture('agency_skills_download_error', { error: errorText });
        toast.error('Failed to submit. Please try again.');
        setLoading(false);
        return;
      }

      toast.success('Success! Opening skills repository...');
      
      // Redirect to thank you page
      navigate('/agency-skills/thank-you');
      
      posthog.capture('agency_skills_download_completed', {
        email: email
      });

    } catch (err: any) {
      console.error('Submission error:', err);
      posthog.capture('agency_skills_download_exception', { error: err.message });
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
              Download Our Agency Skills
            </h1>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-8">
              Get access to the exact Claude AI skills we use for our consulting & client projects. Open-source and ready to use.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Enter Your Email Below:
            </h2>
          </div>

          {/* Preview Image - Above Form */}
          <div className="max-w-lg mx-auto mb-8">
            <img 
              src={auditImage} 
              alt="Agency Skills Preview" 
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* Custom Email Form */}
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto mb-16">
            <div className="relative mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">✉️</span>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-4 py-5 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-lg placeholder-zinc-500 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-6 bg-white text-[#0A0A0B] text-xl font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">📥</span>
                <span>{loading ? 'Processing...' : 'Download Agency Skills'}</span>
              </div>
              <p className="text-sm font-normal mt-1 opacity-80">100% Free & Open Source</p>
            </button>
          </form>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "🎯",
                title: "Battle-Tested",
                description: "Used in real agency work and client projects"
              },
              {
                icon: "🔓",
                title: "Open Source",
                description: "Free to use and modify for your needs"
              },
              {
                icon: "⚡",
                title: "Production Ready",
                description: "Immediately integrate into your workflow"
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-zinc-400">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              {
                quote: "These skills transformed our AI implementation process",
                name: "David Chen",
                role: "CTO, Tech Startup",
              },
              {
                quote: "Saved us weeks of development time",
                name: "Lisa Park",
                role: "Product Manager",
              },
              {
                quote: "Exactly what we needed for enterprise AI",
                name: "Michael Torres",
                role: "Innovation Lead",
              },
              {
                quote: "CIELO's skills are industry-leading",
                name: "Emma Watson",
                role: "AI Consultant",
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
              Trusted by AI teams and agencies worldwide
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap opacity-50">
              <div className="text-2xl font-bold text-zinc-600">OpenAI</div>
              <div className="text-2xl font-bold text-zinc-600">Anthropic</div>
              <div className="text-2xl font-bold text-zinc-600">Google</div>
              <div className="text-2xl font-bold text-zinc-600">Microsoft</div>
              <div className="text-2xl font-bold text-zinc-600">AWS</div>
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
              <span className="text-3xl">📥</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            Download Our Agency Skills
          </h2>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-4 bg-white text-[#0A0A0B] text-lg font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">📥</span>
              <span>Get Access Now</span>
            </div>
          </button>
          <p className="text-sm text-zinc-500 mt-4">100% Free & Open Source</p>
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