import { Check, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { FAQSection } from '../FAQSection';
import { rapidDeliveryFAQs } from '../../utils/faq-data';
import { useState } from 'react';
import { DraggableSlideshow } from '../DraggableSlideshow';
import ctaImage1 from 'figma:asset/de7a2be995fb5993aa3d9ae2178616e0bb77ed38.png';
import ctaImage2 from 'figma:asset/b72b93f7c525266f61bcb9df9ec77f3051d24777.png';
import ctaImage3 from 'figma:asset/8e23726acfbc3cab59b5a3320f7e06f9caf5c6d3.png';
import ctaImage4 from 'figma:asset/4b0919d6d9a433652010c66adcdb1c4f9e0151f0.png';
import ctaImage5 from 'figma:asset/bee1ef4fe595a7417543bd48c2fc415cf3f13a96.png';
import svgPaths from '../../imports/svg-ruxnnh5eqx';
import slideImage1 from 'figma:asset/e834cdb69e621575e5d6afb2b7ac02ae53981c77.png';
import slideImage2 from 'figma:asset/ca23bc9d0126da8c71957e375371a1a920b5ad11.png';
import slideImage3 from 'figma:asset/c159ad20a8eba2895bee86964b07c89cb155ed47.png';
import slideImage4 from 'figma:asset/257fcfe47ce90ad77dda495b18963e1e9114bd43.png';
import slideImage5 from 'figma:asset/a72dbf73fbb5bc646e1cc07b4e2100d14eca5565.png';
import slideImage6 from 'figma:asset/2dbcaf0e06c19c41a47b3bdde03ab061135020ce.png';
import collageImage1 from 'figma:asset/ffdb039dbe0b498dcffc2af2d827fe7d969ef1f3.png';
import collageImage2 from 'figma:asset/c3d7961f7b0645bd73bb84a8f554ef95f5bd4211.png';
import collageImage3 from 'figma:asset/123e2e28935288d2a9c6cad4f148237f12d6b6ba.png';
import collageImage4 from 'figma:asset/221f4bb3f1111d00394c80e794abf288d2773320.png';
import collageImage5 from 'figma:asset/d511048b3f5deea33ac5f71b09ecea817046ddaa.png';
import collageImage6 from 'figma:asset/e649646f6db1e3f62bf5dd7a7423dc766627f020.png';
import collageImage7 from 'figma:asset/716c184b3d785fa466fbc801c80ce0c27f2d3c63.png';
import collageImage8 from 'figma:asset/6dd37e33b693743ff48e5521896158737b8fb10b.png';
import deliverableImage1 from 'figma:asset/b9e345ec421b58a1d76a4ff1b3b25dbafa50813e.png';
import deliverableImage2 from 'figma:asset/5abfdf27d0f229758c9acc179c6def3bb3bb2b63.png';
import deliverableImage3 from 'figma:asset/5d2033302d8f311e6f565f2d62113a60ea4e4e48.png';

interface RapidDeliveryProps {
  onNavigate: (page: string) => void;
}

export function RapidDelivery({ onNavigate }: RapidDeliveryProps) {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [moodboardFocus, setMoodboardFocus] = useState('');
  const [goal, setGoal] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePosition({ x, y });
  };

  const handleCompletePurchase = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/rapid-delivery/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            company_name: companyName,
            moodboard_focus: moodboardFocus,
            goal,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Error submitting Rapid Delivery signup:', error);
        alert('Failed to submit. Please try again.');
        return;
      }

      console.log('✅ Rapid Delivery signup submitted successfully');
      
      // Close modal and reset form
      setShowSignupModal(false);
      setSignupStep(1);
      setEmail('');
      setCompanyName('');
      setMoodboardFocus('');
      setGoal('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    {/* Signup Modal */}
    {showSignupModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="bg-neutral-950 px-8 py-4 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="text-white tracking-wider">cielo</div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-neutral-400">Step {signupStep} / 3</div>
                <button 
                  onClick={() => {
                    setShowSignupModal(false);
                    setSignupStep(1);
                    setEmail('');
                    setCompanyName('');
                    setMoodboardFocus('');
                    setGoal('');
                  }}
                  className="p-1.5 hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <X size={18} className="text-neutral-400" />
                </button>
              </div>
            </div>
          </div>

          {signupStep === 1 ? (
            // Step 1: Email signup
            <div className="p-12">
              <div className="mb-8">
                <h1 className="text-4xl mb-4" style={{ fontWeight: 400 }}>Rapid Delivery</h1>
                <p className="text-neutral-600 mb-1">
                  Get your brand direction in 48 hours or less.
                </p>
                <p className="text-neutral-600">
                  Moodboard package for $150 with no hidden fees.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                />
                
                <button
                  onClick={() => setSignupStep(2)}
                  className="w-full py-3.5 bg-neutral-950 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Get Started
                </button>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  '1 - 2 Moodboards incl visual direction',
                  'Design / Branding Mockups how your updated brand could look',
                  'Wireframe or Social Media Posts Examples',
                  'Proposed Implementation & Launch Strategy'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={16} className="text-neutral-950 mt-0.5 shrink-0" strokeWidth={3} />
                    <p className="text-sm text-neutral-700">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 text-xs text-neutral-400">
                <a href="#" className="hover:text-neutral-600">Privacy Policy</a>
                <a href="#" className="hover:text-neutral-600">Terms of Service</a>
              </div>
            </div>
          ) : signupStep === 2 ? (
            // Step 2: Company Details
            <div className="p-12">
              <div className="mb-8">
                <h1 className="text-4xl mb-4" style={{ fontWeight: 400 }}>Tell us about your project</h1>
                <p className="text-neutral-600">
                  Help us understand your needs so we can create the perfect moodboard for you.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm text-neutral-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-700 mb-3">Focus of Moodboard</label>
                  <div className="space-y-2">
                    {[
                      { value: 'logo-brand', label: 'Logo / Brand Identity' },
                      { value: 'social-digital', label: 'Social Media & Digital Presence' },
                      { value: 'website', label: 'Website Design' },
                      { value: 'all', label: 'A Bit of All' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setMoodboardFocus(option.value)}
                        className={`w-full px-4 py-3 border rounded-lg text-left transition-all ${
                          moodboardFocus === option.value
                            ? 'border-neutral-900 bg-neutral-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            moodboardFocus === option.value
                              ? 'border-neutral-900 bg-neutral-900'
                              : 'border-neutral-300'
                          }`}>
                            {moodboardFocus === option.value && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-sm">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-neutral-700 mb-2">Project Goal</label>
                  <textarea
                    placeholder="What are you trying to achieve with this project?"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSignupStep(1)}
                  className="px-8 py-3.5 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setSignupStep(3)}
                  className="flex-1 py-3.5 bg-neutral-950 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          ) : (
            // Step 3: Payment
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Payment Form */}
              <div className="p-8 border-r border-neutral-100">
                <div className="mb-6">
                  <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                    By confirming below, I acknowledge that I have read, understand, and agree to CIELO's Terms of Service and Privacy Policy.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm mb-2">Card</label>
                    <div className="flex gap-2 mb-3">
                      <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[8px]">AMEX</div>
                      <div className="w-8 h-6 bg-blue-800 rounded flex items-center justify-center text-white text-[8px]">VISA</div>
                      <div className="w-8 h-6 bg-red-600 rounded-full flex items-center justify-center"></div>
                      <div className="w-8 h-6 bg-neutral-200 rounded text-[8px] flex items-center justify-center">DISC</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-neutral-600 mb-2">Card number</label>
                    <input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-neutral-600 mb-2">Expiration date</label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-neutral-600 mb-2">CVC</label>
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900">Have a promo code?</a>
                </div>

                <button
                  onClick={handleCompletePurchase}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-neutral-950 text-white rounded-lg hover:bg-neutral-800 transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                </button>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  After purchase, our team will reach out within 24 hours to kickstart your project. You'll receive your moodboard and brand direction within 48 hours.
                </p>
              </div>

              {/* Right: Order Summary */}
              <div className="p-8 bg-neutral-50">
                <h3 className="text-sm mb-6">Order summary</h3>
                
                <div className="mb-8">
                  <div className="w-20 h-24 mx-auto mb-4 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 flex items-center justify-center">
                      <div className="text-white text-2xl">C</div>
                    </div>
                  </div>
                  
                  <h4 className="text-sm mb-2">Moodboard Package (48h)</h4>
                  <p className="text-xs text-neutral-600">
                    Visual direction, brand mockups, wireframes and launch strategy.
                  </p>
                </div>

                <div className="space-y-3 border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span>$150</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-3">
                    <span className="text-sm">Total</span>
                    <span className="text-lg">$150</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    <div className="min-h-screen bg-white">

      {/* Hero Section with Gradient Background */}
      <section className="relative px-4 md:px-6 pt-32 pb-20">
        <div className="relative w-full max-w-[1400px] mx-auto">
          {/* Gradient Background Container */}
          <div className="relative bg-gradient-to-b from-white via-[#f0f4ff] to-[#60a5fa]/30 rounded-[40px] px-8 md:px-16 py-20 md:py-32 overflow-hidden shadow-xl">
            {/* Optional: Subtle pattern overlay */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.15) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              {/* Button above title */}
              <button className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-sm border border-neutral-200/50 hover:bg-white transition-colors">
                <span className="text-sm text-neutral-700 font-medium">Full Creative Direction</span>
              </button>

              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight bg-gradient-to-br from-neutral-950 via-neutral-700 to-neutral-400 bg-clip-text text-transparent" style={{ fontWeight: 500 }}>
                Brand Revamp & Social Posts in 24 - 48h
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Brand moodboards, logo concepts & social media mockups.<br />
                Strategic visual direction delivered fast.
              </p>

              <button 
                onClick={() => setShowSignupModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-950 text-white rounded-full hover:bg-neutral-800 transition-colors shadow-lg"
              >
                Get started now
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-neutral-500">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 8L7.5 9.5L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Only $150 • 48h Delivery • No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Draggable Slideshow with white gradient on sides */}
      <section className="pb-12 bg-white relative">
        {/* White gradient on left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        {/* White gradient on right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        <DraggableSlideshow
          images={[
            slideImage4,
            slideImage1,
            slideImage5,
            slideImage3,
            slideImage6,
            slideImage2,
          ]}
        />
      </section>

      {/* Single platform, all-in-one */}
      <section className="bg-[#FCFAF9] w-full pt-24 pr-6 pb-24 pl-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex mb-10 gap-x-2 gap-y-2 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
            <span className="text-xs font-mono font-medium text-gray-500 uppercase tracking-wide">Single platform, all-in-one</span>
          </div>

          {/* Two Card Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: Trust / Globe */}
            <div className="bg-white rounded-[40px] p-10 md:p-12 relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100 flex flex-col justify-between min-h-[500px]">
              <div className="relative z-10">
                <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-6 block">Acceptance</span>
                <h3 className="text-4xl font-medium text-black tracking-tight mb-6">A new brand.</h3>
                <p className="leading-relaxed text-sm text-gray-500 max-w-sm">
                  We adhere to the highest legal standards and rely on experienced experts to ensure you stay secure and compliant with regulatory requirements.
                </p>
              </div>

              {/* Custom Globe Graphic */}
              <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow globe-wireframe">
                  <style>{`
                    @keyframes spin-slow {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                    .animate-spin-slow {
                      animation: spin-slow 20s linear infinite;
                    }
                    .globe-wireframe ellipse,
                    .globe-wireframe path {
                      stroke: rgba(59, 130, 246, 0.2);
                      stroke-width: 1;
                      fill: none;
                    }
                  `}</style>
                  <ellipse cx="100" cy="100" rx="90" ry="90"></ellipse>
                  <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(0 100 100)"></ellipse>
                  <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(45 100 100)"></ellipse>
                  <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(90 100 100)"></ellipse>
                  <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(135 100 100)"></ellipse>
                  <path d="M100 10 A 90 90 0 0 1 100 190" fill="none"></path>
                  <path d="M100 10 A 90 90 0 0 0 100 190" fill="none"></path>
                  <circle cx="50" cy="130" r="3" fill="#3b82f6" className="animate-pulse" style={{ opacity: 1 }}></circle>
                  <circle cx="150" cy="70" r="3" fill="#3b82f6" className="animate-pulse delay-300" style={{ opacity: 1, animationDelay: '300ms' }}></circle>
                </svg>
              </div>
            </div>

            {/* Card 2: Transparency / Pricing List */}
            <div className="bg-white rounded-[40px] p-10 md:p-12 relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100 flex flex-col min-h-[500px]">
              <div className="relative z-10 mb-12">
                <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-6 block">Transparency</span>
                <h3 className="text-4xl font-medium text-black tracking-tight mb-6">12 - 48h ( that's it )</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                  No additional fees or unexpected charges. Choose your preferred payment method, including cryptocurrency.
                </p>
              </div>

              {/* Custom Process/Pricing Graphic */}
              <div className="relative flex-1 flex flex-col justify-end">
                <div className="space-y-3">
                  {/* Avatar floating */}
                  <div className="absolute -top-12 left-0 w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-md z-20 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="bg-gray-50 w-full h-full" />
                  </div>

                  {/* List Item 1 */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transform translate-x-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">Questionnaire</span>
                    </div>
                    <span className="text-sm text-gray-900 font-mono">01</span>
                  </div>

                  {/* List Item 2 */}
                  <div className="flex transform bg-white border-gray-100 border rounded-2xl pt-4 pr-4 pb-4 pl-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] translate-x-8 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">Account Manager gets in contact</span>
                    </div>
                    <span className="text-sm text-gray-900 font-mono">02</span>
                  </div>

                  {/* List Item 3 */}
                  <div className="flex transform bg-white border-gray-100 border rounded-2xl pt-4 pr-4 pb-4 pl-4 shadow-[0_8px_16px_rgba(0,0,0,0.04)] translate-x-12 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-sm text-gray-600">Team starts brainstorming & designing</span>
                    </div>
                    <span className="text-sm text-gray-900 font-mono">03</span>
                  </div>

                  {/* List Item 4 (Faded) */}
                  <div className="flex transform bg-gray-50 opacity-60 border-gray-100 border rounded-2xl pt-4 pr-4 pb-4 pl-4 translate-x-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      <span className="text-sm text-gray-500">Full Moodboard, Brand Refinement, Social Posts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-center">
            <p className="text-lg text-neutral-700 leading-relaxed font-['Helvetica'] font-medium">
              Instead of waiting weeks of back and forth, multiple calls with agencies or different people, we cut this short.
            </p>
            
            <p className="text-lg text-neutral-700 leading-relaxed font-['Helvetica'] font-medium">
              A clear direction, cleaned up design, wireframe or even a couple social media posts. We transform your brand to where it needs to be.
            </p>

            <div className="pt-8">
              <p className="text-2xl text-neutral-950 font-['Helvetica'] font-medium">
                A simple questionnaire <span className="text-neutral-400">{'>'}</span> sent to us <span className="text-neutral-400">{'>'}</span> finished designs in 24 - 48h, <span className="italic">that's it!</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          {/* Pricing Card - Figma Style */}
          <div className="relative bg-white rounded-[40px] border-[3px] border-[#08bf7d] w-full max-w-[424px] h-[693px] p-0 shadow-xl">
            {/* Recommended Badge */}
            <div className="absolute top-[22px] left-1/2 -translate-x-1/2 bg-[#08bf7d] flex items-center gap-[5px] px-[21px] py-[7px] rounded-full h-[46px]">
              <div className="w-5 h-5 shrink-0">
                <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                  <path 
                    d={svgPaths.p1bf65e00} 
                    fill="black"
                  />
                </svg>
              </div>
              <p className="font-['Helvetica_Neue'] text-[14px] font-medium text-black uppercase leading-[14.862px] text-nowrap">RECOMMENDED</p>
            </div>

            {/* Title */}
            <p className="absolute top-[121px] left-1/2 -translate-x-1/2 w-[320px] font-['Helvetica_Neue'] text-[36px] text-black text-center leading-[1.2] tracking-[-0.72px] not-italic">
              Moodboard &<br />Rapid Delivery
            </p>

            {/* Description */}
            <p className="absolute top-[231px] left-1/2 -translate-x-1/2 w-[294px] font-['Helvetica_Neue'] text-[20px] text-black text-center opacity-60 leading-[1.5] tracking-[-0.4px] not-italic">
              Quick brand direction with visual moodboards and implementation strategy in 48 hours.
            </p>

            {/* Feature Pills */}
            <div className="absolute top-[362px] left-1/2 -translate-x-1/2 w-[247px] h-[41px] rounded-[20px] border border-[rgba(0,0,0,0.5)]">
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['DM_Mono'] text-[18px] text-black text-center uppercase leading-[1.4] whitespace-nowrap not-italic">
                Visual Direction
              </p>
            </div>

            <div className="absolute top-[415px] left-1/2 -translate-x-1/2 w-[247px] h-[41px] rounded-[20px] border border-[rgba(0,0,0,0.5)]">
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['DM_Mono'] text-[18px] text-black text-center uppercase leading-[1.4] whitespace-nowrap not-italic">
                Brand Mockups
              </p>
            </div>

            {/* Price Button */}
            <button 
              onClick={() => setShowSignupModal(true)}
              className="absolute top-[503px] left-[65px] w-[294px] h-[70px] bg-black rounded-[20px] hover:bg-neutral-800 transition-colors"
            >
              <p className="font-['Helvetica_Neue'] text-[28px] text-white text-center leading-[1.2] tracking-[-0.56px] not-italic">
                Starting at $150
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section - Custom Process Cards */}
      <section className="px-6 py-32 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-neutral-950 mb-4">
              A Uniquely Simple Process.
            </h2>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 - Place Order */}
            <div className="bg-white rounded-[40px] p-8 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100">
              {/* Custom UI Mockup - Booking */}
              <div className="relative bg-gradient-to-br from-[#f8faff] via-white to-[#f0f4ff] rounded-3xl p-8 mb-8 min-h-[280px] flex items-center justify-center overflow-hidden">
                {/* Subtle stars background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-8 left-12 w-1 h-1 bg-[#60a5fa] rounded-full"></div>
                  <div className="absolute top-16 right-16 w-1 h-1 bg-[#60a5fa] rounded-full"></div>
                  <div className="absolute bottom-12 left-20 w-1 h-1 bg-[#60a5fa] rounded-full"></div>
                  <div className="absolute bottom-20 right-12 w-1 h-1 bg-[#60a5fa] rounded-full"></div>
                </div>
                
                <div className="relative w-full max-w-xs">
                  {/* Floating Card */}
                  <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 transform -rotate-1">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-neutral-950 font-medium">Select a time</span>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
                        </div>
                      </div>
                      
                      {/* Time slots */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-center text-xs text-neutral-950">10:00</div>
                          <div className="flex-1 bg-neutral-950 rounded-lg p-2 text-center text-xs text-white">11:00</div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-center text-xs text-neutral-950">14:00</div>
                          <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-center text-xs text-neutral-950">15:00</div>
                        </div>
                      </div>
                      
                      {/* Calendar Preview */}
                      <div className="pt-3 border-t border-neutral-100">
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: 21 }).map((_, i) => (
                            <div 
                              key={i}
                              className={`aspect-square rounded-sm flex items-center justify-center text-[10px] ${
                                i === 8 ? 'bg-neutral-950 text-white' : 
                                i === 15 ? 'bg-neutral-200 text-neutral-950' : 
                                'text-neutral-400'
                              }`}
                            >
                              {i + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating send icon */}
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-neutral-950 rounded-full shadow-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step Badge */}
              <div className="w-12 h-12 rounded-full bg-[#60a5fa] text-white flex items-center justify-center text-xl mb-4">
                1
              </div>

              {/* Content */}
              <h3 className="text-xl text-neutral-950 mb-3">
                Place the order here or book a call
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Choose one of our packages or schedule a free call if you'd like more information.
              </p>
            </div>

            {/* Step 2 - Fill Form */}
            <div className="bg-white rounded-[40px] p-8 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100">
              {/* Custom UI Mockup - Form */}
              <div className="relative bg-gradient-to-br from-[#f8faff] via-white to-[#f0f4ff] rounded-3xl p-8 mb-8 min-h-[280px] flex items-center justify-center overflow-hidden">
                {/* Subtle stars background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-16 w-1 h-1 bg-[#60a5fa] rounded-full"></div>
                  <div className="absolute top-20 right-12 w-1 h-1 bg-[#60a5fa] rounded-full"></div>
                  <div className="absolute bottom-16 left-12 w-1 h-1 bg-[#60a5fa] rounded-full"></div>
                  <div className="absolute bottom-10 right-20 w-1 h-1 bg-[#60a5fa] rounded-full"></div>
                </div>
                
                <div className="relative w-full max-w-xs">
                  {/* Floating Card */}
                  <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 transform rotate-1">
                    <div className="space-y-4">
                      <div className="text-xs text-neutral-950 font-medium mb-3">Brand Questionnaire</div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <div className="w-4 h-4 rounded border-2 border-neutral-950 flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-neutral-950">Company overview</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <div className="w-4 h-4 rounded border-2 border-neutral-950 flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-neutral-950">Target audience</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <div className="w-4 h-4 rounded border-2 border-neutral-300"></div>
                          </div>
                          <div>
                            <div className="text-xs text-neutral-400">Design preferences</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating icon */}
                  <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-neutral-950 rounded-full shadow-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step Badge */}
              <div className="w-12 h-12 rounded-full bg-[#60a5fa] text-white flex items-center justify-center text-xl mb-4">
                2
              </div>

              {/* Content */}
              <h3 className="text-xl text-neutral-950 mb-3">
                Fill in our quick form
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                After placing your order, you'll receive a short form with questions about your company and your vision for the brand.
              </p>
            </div>

            {/* Step 3 - Design Process */}
            <div className="bg-white rounded-[40px] p-8 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100">
              {/* Custom UI Mockup - Layered Design */}
              <div className="relative bg-gradient-to-br from-[#f8faff] via-white to-[#f0f4ff] rounded-3xl p-8 mb-8 min-h-[280px] flex items-center justify-center overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: 'linear-gradient(to right, #60a5fa 1px, transparent 1px), linear-gradient(to bottom, #60a5fa 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                
                <div className="relative">
                  {/* Isometric stacked layers */}
                  <div className="relative" style={{ perspective: '800px' }}>
                    {/* Bottom layers (faded) */}
                    <div className="absolute" style={{ transform: 'rotateX(45deg) translateZ(-40px)', opacity: 0.2 }}>
                      <div className="w-48 h-32 bg-neutral-800 rounded-xl border-2 border-neutral-900"></div>
                    </div>
                    <div className="absolute" style={{ transform: 'rotateX(45deg) translateZ(-20px)', opacity: 0.4 }}>
                      <div className="w-48 h-32 bg-neutral-700 rounded-xl border-2 border-neutral-800"></div>
                    </div>
                    
                    {/* Top layer (active) */}
                    <div className="relative" style={{ transform: 'rotateX(45deg)' }}>
                      <div className="w-48 h-32 bg-white rounded-xl border-2 border-neutral-200 shadow-2xl p-4">
                        {/* Content bars */}
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded bg-neutral-950"></div>
                            <div className="flex-1 h-3 bg-neutral-200 rounded"></div>
                          </div>
                          <div className="flex gap-2 pl-2">
                            <div className="flex-1 h-2 bg-neutral-200 rounded"></div>
                          </div>
                          <div className="flex gap-2 pl-2">
                            <div className="w-16 h-16 bg-neutral-950 rounded-lg"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Labels */}
                  <div className="absolute -left-16 top-8 text-[10px] text-neutral-950 space-y-3 font-medium">
                    <div>BRAND</div>
                    <div>DESIGN</div>
                    <div>CONTENT</div>
                    <div>STRATEGY</div>
                    <div className="text-neutral-400">ASSETS</div>
                  </div>
                  
                  <div className="absolute -right-20 top-4 text-[10px] text-neutral-950 text-right space-y-2 font-medium">
                    <div>VISUAL</div>
                    <div>IDENTITY</div>
                    <div className="mt-3">BRAND</div>
                    <div>GUIDELINES</div>
                    <div className="mt-3 text-neutral-400">48H DELIVERY</div>
                  </div>
                </div>
              </div>

              {/* Step Badge */}
              <div className="w-12 h-12 rounded-full bg-[#60a5fa] text-white flex items-center justify-center text-xl mb-4">
                3
              </div>

              {/* Content */}
              <h3 className="text-xl text-neutral-950 mb-3">
                Our expert designer crafts your brand kit
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Once the form is submitted, our designers will begin working immediately to craft a unique brand kit tailored to your vision, delivered within 48 hours.
              </p>
            </div>

            {/* Step 4 - Connected Flow */}
            <div className="bg-white rounded-[40px] p-8 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-500 border border-gray-100">
              {/* Custom UI Mockup - Flow Diagram */}
              <div className="relative bg-gradient-to-br from-[#f8faff] via-white to-[#f0f4ff] rounded-3xl p-10 mb-8 min-h-[280px] flex items-center justify-center overflow-hidden">
                {/* Connection lines background */}
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
                  <path d="M 80 80 Q 150 50 220 80" stroke="#60a5fa" strokeWidth="2" fill="none" />
                  <path d="M 220 80 Q 290 110 360 80" stroke="#60a5fa" strokeWidth="2" fill="none" />
                  <circle cx="220" cy="140" r="2" fill="#60a5fa" />
                  <circle cx="220" cy="40" r="2" fill="#60a5fa" />
                </svg>
                
                <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 py-4">
                  {/* Top row - Purpose and Explore */}
                  <div className="flex items-center justify-center gap-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 px-4 py-2 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                      <span className="text-xs text-neutral-950">Purpose</span>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 px-4 py-2 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                      </svg>
                      <span className="text-xs text-neutral-950">Explore</span>
                    </div>
                  </div>
                  
                  {/* Middle row - Core circle */}
                  <div className="w-16 h-16 bg-neutral-950 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-white text-xl">C</span>
                  </div>
                  
                  {/* Bottom row - Online and 24 hours */}
                  <div className="flex items-center justify-center gap-6">
                    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 px-4 py-2 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M12 1v6m0 6v6"/>
                        <path d="M1 12h6m6 0h6"/>
                      </svg>
                      <span className="text-xs text-neutral-950">Online</span>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 px-4 py-2 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span className="text-xs text-neutral-950">24 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Badge */}
              <div className="w-12 h-12 rounded-full bg-[#60a5fa] text-white flex items-center justify-center text-xl mb-4">
                4
              </div>

              {/* Content */}
              <h3 className="text-xl text-neutral-950 mb-3">
                Approve or ask for changes, without limits
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                You can review and approve the brand kit, or request revisions if needed. Revisions apply to one of the existing concepts with unlimited iterations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-neutral-950 tracking-tight mb-16">
            We guide you to what you need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                title: 'Brand Mockups',
                description: 'Curated design assets and visual templates, refined for your brand.',
              },
              {
                title: 'Full Development',
                description: 'Further development across websites, apps, and digital platforms.',
              },
              {
                title: 'Strategy Sessions',
                description: 'Ask follow-up questions about your brand to our creative team.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-12 min-h-[280px] border border-neutral-200 group flex flex-col justify-end items-start bg-white hover:bg-neutral-50 transition-colors"
              >
                <h3 className="text-xl text-neutral-950 mb-4">{item.title}</h3>
                <p className="text-neutral-500 group-hover:text-neutral-950 leading-relaxed transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Package Showcase Section */}
      <section className="px-6 py-32 pb-0 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Visual Card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#4a6fa5] via-[#5b7db0] to-[#8fa3bf] rounded-3xl p-12 shadow-2xl aspect-[4/3] flex flex-col justify-between">
                <div>
                  <div className="text-white/70 text-sm mb-2 uppercase tracking-wider">Rapid Delivery</div>
                  <h3 className="text-3xl text-white mb-6">Moodboard Package</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-white/90 text-sm mb-2">Get started with</div>
                    <div className="text-5xl text-white">$150</div>
                    <div className="text-white/70 text-sm mt-2">/48 hour delivery</div>
                  </div>
                  
                  <div className="text-white/50 text-xs leading-relaxed">
                    One-time payment • No subscriptions
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div>
              <p className="text-sm text-neutral-500 mb-3 uppercase tracking-wide">What could cost you $1,500 is $150</p>
              <h2 className="text-4xl md:text-5xl text-neutral-950 mb-8">
                Rapid Delivery<br />Package
              </h2>
              
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Your package includes one comprehensive creative direction session, covering 100+ brand elements in a single collection
              </p>

              <div className="space-y-4 mb-12">
                {[
                  'One session, one deliverable for your visual direction',
                  '100+ design references and visual cues',
                  'A personalized plan that evolves with you',
                  'Get your brand guidelines and track your growth over a lifetime'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={20} className="text-[#60a5fa] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <p className="text-neutral-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setShowSignupModal(true)}
                  className="w-full px-8 py-4 rounded-full bg-neutral-950 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-neutral-800 transition-colors"
                >
                  Start Now
                </button>
                
                <div className="flex items-center justify-center gap-6 text-xs text-neutral-400 pt-2">
                  <div className="flex items-center gap-2">
                    <Check size={14} strokeWidth={2.5} />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} strokeWidth={2.5} />
                    <span>Results in a week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Large Section with Floating Images */}
      <section 
        className="relative px-6 pt-32 pb-32 bg-white overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Gradient Container with rounded corners */}
        <div className="max-w-7xl mx-auto relative rounded-[60px] overflow-hidden py-48 min-h-[720px] flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, #f5f5f7 0%, #e8e8f0 25%, #e0e0f5 50%, #d8d8f0 75%, #e8e8f5 100%)',
        }}>
          {/* Dot Pattern Background - Only behind text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div 
              className="w-[800px] h-[400px]"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(100, 100, 130, 0.08) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)',
                WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent)',
              }}
            />
          </div>

          {/* Floating Images */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Yoga Image - Top Left */}
            <img
              src={ctaImage1}
              alt=""
              className="absolute top-[10%] left-[5%] w-48 h-48 object-contain transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
              }}
            />
            
            {/* Cycling Image - Top Right */}
            <img
              src={ctaImage2}
              alt=""
              className="absolute top-[12%] right-[2%] w-36 h-44 object-contain transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * -10}px)`,
              }}
            />

            {/* Plant/Agave Image - Bottom Left */}
            <img
              src={ctaImage3}
              alt=""
              className="absolute bottom-[10%] left-[3%] w-40 h-40 object-contain transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * 18}px)`,
              }}
            />

            {/* Cocktail Image - Bottom Right */}
            <img
              src={ctaImage4}
              alt=""
              className="absolute bottom-[8%] right-[2%] w-40 h-48 object-cover rounded-lg transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * 15}px)`,
              }}
            />

            {/* Tennis Player Image - Middle Left */}
            <img
              src={ctaImage5}
              alt=""
              className="absolute top-[45%] left-[1%] -translate-y-1/2 w-36 h-48 object-cover rounded-lg transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * 12}px)`,
              }}
            />
          </div>

          {/* Center Text Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-950 tracking-tight leading-tight">
              Ready to scale your content?
            </h2>
            <p className="text-2xl text-neutral-500">
              Let's build your brand engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                onClick={() => onNavigate('about')}
                className="px-8 py-3 rounded-full bg-neutral-950 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-neutral-800 transition-colors"
              >
                QUOTE
              </button>
              <button className="px-8 py-3 rounded-full border border-neutral-300 text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-neutral-950 hover:bg-white/50 transition-colors flex items-center justify-center gap-3">
                SET A CALL
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <FAQSection 
            title="Frequently Asked Questions"
            subtitle="Have questions about our Rapid Delivery service? Find answers here."
            faqs={rapidDeliveryFAQs}
          />
        </div>
      </section>
    </div>
    </>
  );
}
