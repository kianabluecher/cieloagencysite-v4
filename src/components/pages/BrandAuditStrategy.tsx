import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { Check, ChevronDown, ChevronUp, Shield, Clock, Star } from 'lucide-react';

interface BrandAuditStrategyProps {
  onNavigate: (page: string) => void;
}

export function BrandAuditStrategy({ onNavigate }: BrandAuditStrategyProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleScheduleCall = () => {
    window.open('https://app.apollo.io/#/meet/cieloagency/discovery', '_blank');
  };

  const handleClaimOffer = () => {
    toast.success('Redirecting to secure checkout...');
    // Add payment link here when ready
  };

  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Real Estate Broker",
      rating: 5,
      text: "CIELO transformed our brand completely. We went from being just another agency to the go-to luxury brand in Miami. Our leads increased 140% in just 3 months!"
    },
    {
      name: "James Thompson",
      role: "Investment Manager",
      text: "The strategic approach CIELO brought to our brand positioning was exactly what we needed. Professional, results-driven, and worth every penny."
    },
    {
      name: "Maria Santos",
      role: "Hospitality Group Owner",
      rating: 5,
      text: "Finally, a branding agency that understands luxury markets. Our booking inquiries doubled, and our brand now commands premium pricing."
    },
    {
      name: "Alex Rodriguez",
      role: "Marketing Director",
      text: "Working with CIELO was the best investment we made this year. Their dashboard shows real-time results, and the ROI has been phenomenal."
    },
    {
      name: "Jennifer Lee",
      role: "Startup Founder",
      rating: 5,
      text: "From concept to execution, CIELO delivered beyond expectations. Our brand now stands out in a crowded market."
    },
    {
      name: "David Park",
      role: "Restaurant Owner",
      text: "The attention to detail and strategic thinking made all the difference. We're now attracting the high-end clientele we always wanted."
    },
  ];

  const faqs = [
    {
      question: "What's included in the Strategy Session?",
      answer: "Your strategy session includes a comprehensive brand audit, competitive analysis, market positioning recommendations, and a custom 90-day transformation roadmap tailored to your specific business goals."
    },
    {
      question: "How long does the brand transformation take?",
      answer: "Most clients see initial results within 30 days and complete transformation within 60-90 days. However, the timeline can be adjusted based on your specific needs and goals."
    },
    {
      question: "What if I'm not satisfied with the results?",
      answer: "We offer a 30-day complete satisfaction guarantee. If you're not happy with the strategic direction and initial results, we'll refund your investment and continue working until you're satisfied."
    },
    {
      question: "Do you work with businesses outside of Miami?",
      answer: "While we specialize in Miami luxury markets, we work with premium brands nationwide. Our strategies are tailored to your specific market and target audience, regardless of location."
    },
    {
      question: "How quickly can we get started with the transformation?",
      answer: "We can start immediately after your strategy session. Most clients begin seeing implementation within 48-72 hours of their consultation call."
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white py-12 md:py-16 px-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
            ✓ Your Information Has Been Received
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Transform Your Brand Into a
            <br />
            <span className="text-purple-600">Miami Market Leader</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Congratulations! You're one step closer to dominating your market. Our team will review your information and reach out within 24 hours to schedule your complimentary strategy session.
          </p>
        </div>
      </section>

      {/* Limited Time Offer Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-4">
                <Clock className="w-4 h-4" />
                For A Limited Time Only
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Exclusive Strategy Session
              </h2>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div>
                  <div className="text-gray-400 line-through text-2xl">$997</div>
                  <div className="text-sm text-gray-500">Regular Price</div>
                </div>
                <div className="text-5xl font-bold text-purple-600">$497</div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
                <div className="text-lg font-semibold text-purple-900 mb-3">
                  What You'll Get:
                </div>
                <ul className="space-y-3 text-left">
                  {[
                    'Comprehensive Brand Audit (Worth $1,500)',
                    'Competitive Analysis Report',
                    'Custom 90-Day Transformation Roadmap',
                    'Market Positioning Strategy',
                    'Revenue Growth Projections',
                    'Exclusive Access to CIELO Dashboard',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleClaimOffer}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all mb-4"
              >
                CLAIM YOUR STRATEGY SESSION NOW →
              </button>

              <button
                onClick={handleScheduleCall}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-lg font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Schedule Your Consultation Call
              </button>

              <div className="flex items-center justify-center gap-6 mt-6 opacity-60">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" alt="Visa" className="h-8 grayscale" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8 grayscale" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 grayscale" />
                <div className="text-gray-400 font-semibold">Stripe</div>
              </div>
            </div>
          </div>

          {/* Alternative Offer */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-8 md:p-10 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Start Your Transformation Today
              </h3>
              <p className="text-lg text-purple-100 mb-6">
                Get started with our foundational brand assessment for only
              </p>
              <div className="text-5xl font-bold mb-6">$97</div>
              <button
                onClick={handleClaimOffer}
                className="px-12 py-4 bg-white text-purple-600 text-lg font-bold rounded-xl hover:shadow-2xl transition-all"
              >
                Get Started For $97
              </button>
              <p className="text-sm text-purple-200 mt-4">
                Upgrade to full strategy session anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section className="relative bg-white py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
              Proven Results,
              <br />
              Satisfied Clients
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See what luxury brands are saying about their transformation with CIELO Agency
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            30-Day Complete Satisfaction
            <br />
            Guarantee
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            We're so confident in our brand transformation process that we offer a complete satisfaction guarantee. If you're not seeing real, measurable improvements in your brand positioning, lead quality, and market presence within 30 days, we'll refund your investment and continue working with you until you achieve the results you deserve.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: '🎯', text: 'Results-Driven Approach' },
              { icon: '💯', text: '100% Satisfaction Promise' },
              { icon: '🚀', text: 'Risk-Free Investment' },
            ].map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-4xl mb-3">{item.icon}</div>
                <div className="text-white font-semibold">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-white py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Common Questions,
              <br />
              <span className="text-purple-600">Clear Answers</span>
            </h2>
            <p className="text-gray-600">Everything you need to know about getting started</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
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
      <section className="relative bg-gradient-to-br from-purple-600 to-purple-700 py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Brand
            <br />
            Transformation?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Don't wait. The sooner you start, the sooner you'll see results. Claim your exclusive strategy session now.
          </p>
          <button
            onClick={handleClaimOffer}
            className="px-12 py-4 bg-white text-purple-600 text-lg font-bold rounded-xl hover:shadow-2xl transition-all"
          >
            Claim Your Strategy Session →
          </button>
          <p className="text-sm text-purple-200 mt-6">
            Limited slots available • 30-day money-back guarantee
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