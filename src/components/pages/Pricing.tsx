import { useState, useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { validateEmail } from '../../utils/formValidation';
import { SEOHead } from '../SEOHead';
import { motion, AnimatePresence } from 'motion/react';

interface PricingProps {
  onNavigate: (page: string) => void;
}

interface PlanOption {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: string[];
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
}

export function Pricing({ onNavigate }: PricingProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formTopRef = useRef<HTMLDivElement>(null);
  const [auditSelected, setAuditSelected] = useState(false);

  // Audit Package
  const auditPackage = {
    id: 'audit',
    name: 'Initial Audit Package',
    description: 'Comprehensive brand and marketing audit to identify opportunities',
    price: 1500,
    period: 'one-time',
    features: [
      'Brand Identity Audit',
      'Website & UX Analysis',
      'Competitor Research',
      'Market Positioning Review',
      'Actionable Recommendations Report',
      '60-min Strategy Session',
    ]
  };

  const plans: PlanOption[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Our most affordable plan to get you started',
      price: 2500,
      period: 'month',
      features: [
        'Brand Identity Basics',
        'Logo Design (2 concepts)',
        'Color Palette & Typography',
        'Brand Guidelines (PDF)',
        '2 Social Media Templates',
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Our most popular plan with more features',
      price: 5000,
      period: 'month',
      features: [
        'Complete Brand Identity',
        'Logo Design (3 concepts)',
        'Full Brand Guidelines',
        'Website Design (5 pages)',
        'Social Media Kit (10 templates)',
        'Email Marketing Template',
        'Priority Support',
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Our best plan with all the features',
      price: 10000,
      period: 'month',
      features: [
        'Everything in Professional',
        'Website Development (10 pages)',
        'Custom Web Application',
        'Marketing Strategy & Consulting',
        'Content Creation (Weekly)',
        'SEO & Analytics Setup',
        'Dedicated Account Manager',
        '24/7 Priority Support',
      ]
    }
  ];

  const addOns: AddOn[] = [
    {
      id: 'reporting',
      name: 'Reporting & Analytics Add-On',
      description: 'Access detailed reports directly from your client portal',
      price: 500,
      period: 'month'
    },
    {
      id: 'content-extra',
      name: 'Extra Content Package',
      description: 'Additional social media content & blog posts (weekly)',
      price: 1000,
      period: 'month'
    },
    {
      id: 'video-production',
      name: 'Video Production',
      description: 'Professional video content for social media & web',
      price: 2000,
      period: 'month'
    },
    {
      id: 'consulting-hours',
      name: 'Additional Consulting Hours',
      description: '10 extra hours of strategic consulting per month',
      price: 1500,
      period: 'month'
    }
  ];

  const calculateTotal = (): number => {
    // If audit is selected, return audit price
    if (auditSelected) {
      return auditPackage.price;
    }
    
    const plan = plans.find(p => p.id === selectedPlan);
    const planPrice = plan ? plan.price : 0;
    const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    return planPrice + addOnsPrice;
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!selectedPlan) {
      setError('Please select a plan');
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error || 'Invalid email');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the client agreement');
      return;
    }

    setLoading(true);

    try {
      const selectedPlanData = plans.find(p => p.id === selectedPlan);
      const selectedAddOnsData = addOns.filter(a => selectedAddOns.includes(a.id));

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pricing-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          email,
          plan: selectedPlanData,
          addOns: selectedAddOnsData,
          total: calculateTotal(),
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit pricing request');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSelectedPlan('');
        setSelectedAddOns([]);
        setEmail('');
        setAgreedToTerms(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting pricing request:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit pricing request');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-transparent border border-[#1f2228] text-white placeholder:text-[#7d8187] focus:border-white/30 focus:outline-none transition-colors rounded-md";

  return (
    <div className="min-h-screen bg-[#0A0A0B] font-sans flex">
      <SEOHead
        title="Pricing | CIELO Agency"
        description="Choose the perfect plan for your brand and business needs."
        url="https://www.cielo.agency/pricing"
      />
      
      {/* Left Column - Main Content */}
      <div className="flex-1 px-6 pt-32 pb-20" ref={formTopRef}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block mb-8">
              <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                [ PRICING ]
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl text-white tracking-tight leading-tight mb-8">
              Choose Your Plan
            </h1>
            <p className="text-lg text-[#7d8187] leading-relaxed max-w-2xl">
              Select a plan that fits your needs. All plans include our core services with flexible add-ons to customize your experience.
            </p>
          </div>

          <div className="space-y-8">
            {/* Initial Audit Package */}
            <div>
              <h2 className="text-2xl text-white mb-6 font-light">Initial Audit Package</h2>
              <motion.button
                onClick={() => {
                  setAuditSelected(!auditSelected);
                  if (!auditSelected) {
                    setSelectedPlan('audit');
                    setSelectedAddOns([]);
                  } else {
                    setSelectedPlan('');
                  }
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative w-full text-left p-8 rounded-xl border-2 transition-all ${
                  auditSelected
                    ? 'border-white bg-white/5'
                    : 'border-[#1f2228] bg-[#0a0a0a] hover:border-white/30'
                }`}
              >
                {/* Checkmark Circle - Always visible */}
                <div className={`absolute top-6 right-6 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  auditSelected
                    ? 'bg-white'
                    : 'border-2 border-[#3f4248] bg-transparent'
                }`}>
                  {auditSelected && <Check size={16} className="text-black" />}
                </div>
                <div className="flex items-start justify-between pr-12">
                  <div className="flex-1">
                    <h3 className="text-2xl text-white mb-3 font-normal">{auditPackage.name}</h3>
                    <p className="text-base text-[#7d8187] mb-6 font-light">{auditPackage.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl text-white font-light">${auditPackage.price.toLocaleString()}</span>
                      <span className="text-[#7d8187] ml-2">/ {auditPackage.period}</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {auditPackage.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-[#7d8187] flex items-start gap-2">
                          <Check size={16} className="text-white shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Conditional rendering: Hide everything else if audit is selected */}
            {!auditSelected && (
              <>
                {/* Pick a Plan */}
                <div id="pick-plan">
                  <h2 className="text-2xl text-white mb-6 font-light">Pick a plan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((plan) => (
                      <motion.button
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative text-left p-6 rounded-xl border-2 transition-all ${
                          selectedPlan === plan.id
                            ? 'border-white bg-white/5'
                            : 'border-[#1f2228] bg-[#0a0a0a] hover:border-white/30'
                        }`}
                      >
                        {/* Checkmark Circle - Always visible */}
                        <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedPlan === plan.id
                            ? 'bg-white'
                            : 'border-2 border-[#3f4248] bg-transparent'
                        }`}>
                          {selectedPlan === plan.id && <Check size={16} className="text-black" />}
                        </div>
                        <h3 className="text-xl text-white mb-2 font-normal">{plan.name}</h3>
                        <p className="text-sm text-[#7d8187] mb-4 min-h-[40px] font-light">{plan.description}</p>
                        <div className="mb-4">
                          <span className="text-3xl text-white font-light">${plan.price.toLocaleString()}</span>
                          <span className="text-[#7d8187] ml-2">/ {plan.period}</span>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-sm text-[#7d8187] flex items-start gap-2">
                              <Check size={16} className="text-white shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Select Add-ons */}
                <div>
                  <div className="flex items-baseline gap-3 mb-6">
                    <h2 className="text-2xl text-white">Select an add-on</h2>
                    <span className="text-sm text-[#7d8187]">optional</span>
                  </div>
                  <div className="space-y-3">
                    {addOns.map((addOn) => (
                      <motion.button
                        key={addOn.id}
                        onClick={() => handleAddOnToggle(addOn.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`relative w-full text-left p-6 rounded-xl border-2 transition-all ${
                          selectedAddOns.includes(addOn.id)
                            ? 'border-white bg-white/5'
                            : 'border-[#1f2228] bg-[#0a0a0a] hover:border-white/30'
                        }`}
                      >
                        {/* Checkmark Circle - Always visible */}
                        <div className={`absolute top-6 right-6 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedAddOns.includes(addOn.id)
                            ? 'bg-white'
                            : 'border-2 border-[#3f4248] bg-transparent'
                        }`}>
                          {selectedAddOns.includes(addOn.id) && <Check size={16} className="text-black" />}
                        </div>
                        <div className="flex items-start justify-between pr-8">
                          <div className="flex-1">
                            <h3 className="text-lg text-white mb-2">{addOn.name}</h3>
                            <p className="text-sm text-[#7d8187] mb-3">{addOn.description}</p>
                            <div>
                              <span className="text-xl text-white font-light">${addOn.price.toLocaleString()}</span>
                              <span className="text-[#7d8187] ml-2">/ {addOn.period}</span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <h2 className="text-2xl text-white mb-6">Email</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={inputClass}
                required
              />
              <p className="text-sm text-[#7d8187] mt-2">
                Already have an account? <button className="text-white hover:underline">Sign in here</button>
              </p>
            </div>

            {/* Client Agreement */}
            <div>
              <h2 className="text-2xl text-white mb-6">Client agreement</h2>
              <div className="bg-[#0a0a0a] border border-[#1f2228] rounded-xl p-6 max-h-64 overflow-y-auto">
                <p className="text-sm text-[#7d8187] leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in augue lacus. Cras nec neque ultrices turpis gravida rhoncus suscipit sit amet leo. Maecenas ultrices dolor vulputate massa mattis venenatis. Proin vitae dui vel justo rutrum elementum eu quis neque. Aenean vitae laoreet neque. Vestibulum faucibus vestibulum nibh bibendum iaculis, diam efficitur sit. Nulla id magna nec odio rutrum convallis. Suspendisse efficitur laoreet condimentum. Duis hendrerit malesuada pellentesque nulla lobortis ultricies. Fusce id ultricies libero. Proin tempus malesuada odio vitae sagittis.
                </p>
                <p className="text-sm text-[#7d8187] leading-relaxed">
                  Vestibulum neque est, gravida quis felis in, elementum posuere felis. Phasellus porta nibh vel enim luctus. et, porta mauris bibendum. Nunc in efficitur metus. Maecenas aliquam risus eget neque accumsan, vehicula posuere eros vehicula. Nulla diam nisl, pharetra quis turpis eget, morsus auctor mauris. Suspendisse fugiat, tortor condimentum faucibus mollis, magna ullamcorper dignissim felis, sit posuere ante lectus nec purus. Phasellus malesuada vel tellus nec volutpat. Phasellus finibus nibh quis diam cursus tincidunt. Donec non ipsum
                </p>
              </div>
              <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 bg-transparent border border-[#1f2228] checked:bg-white checked:border-white focus:outline-none focus:ring-0 cursor-pointer"
                />
                <span className="text-sm text-[#7d8187] group-hover:text-white transition-colors">
                  Please e-sign this agreement
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Progress & Summary (Full Height) */}
      <div className="w-full lg:w-[420px] bg-[#f5f5f0] h-screen overflow-y-auto sticky top-0">
        <div className="p-8 pb-20">
          {/* Progress Steps */}
          <div className="mb-12">
            <p className="text-xs text-[#7d7d7d] font-medium tracking-wider uppercase mb-4">
              STEP {selectedPlan ? (email ? (agreedToTerms ? 'FOUR' : 'THREE') : 'TWO') : 'ONE'}
            </p>
            <h2 className="text-3xl text-[#0a0a0a] mb-8 font-light">
              {!selectedPlan && 'Select your plan'}
              {selectedPlan && !email && 'Choose add-ons'}
              {selectedPlan && email && !agreedToTerms && 'Review agreement'}
              {selectedPlan && email && agreedToTerms && 'Complete purchase'}
            </h2>
            
            {/* Step Indicators */}
            <div className="space-y-6">
              {/* Step 1 - Select Plan */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  selectedPlan 
                    ? 'bg-[#0a0a0a] text-white' 
                    : 'bg-[#0a0a0a] text-white'
                }`}>
                  {selectedPlan ? <Check size={20} /> : '1'}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className={`text-base mb-1 ${
                    selectedPlan ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]'
                  }`}>
                    Select a plan
                  </h3>
                  <p className="text-sm text-[#7d7d7d]">~2 MIN</p>
                </div>
              </div>

              {/* Step 2 - Choose Add-ons */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  email
                    ? 'bg-[#0a0a0a] text-white'
                    : selectedPlan
                    ? 'bg-[#0a0a0a] text-white'
                    : 'bg-[#e5e5e0] text-[#7d7d7d]'
                }`}>
                  {email ? <Check size={20} /> : '2'}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className={`text-base mb-1 ${
                    selectedPlan ? 'text-[#0a0a0a]' : 'text-[#a5a5a0]'
                  }`}>
                    Choose add-ons (optional)
                  </h3>
                  <p className="text-sm text-[#7d7d7d]">~1 MIN</p>
                </div>
              </div>

              {/* Step 3 - Enter Email */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  agreedToTerms
                    ? 'bg-[#0a0a0a] text-white'
                    : email
                    ? 'bg-[#0a0a0a] text-white'
                    : 'bg-[#e5e5e0] text-[#7d7d7d]'
                }`}>
                  {agreedToTerms ? <Check size={20} /> : '3'}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className={`text-base mb-1 ${
                    email ? 'text-[#0a0a0a]' : 'text-[#a5a5a0]'
                  }`}>
                    Enter your email
                  </h3>
                  <p className="text-sm text-[#7d7d7d]">~1 MIN</p>
                </div>
              </div>

              {/* Step 4 - Review & Agree */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  agreedToTerms
                    ? 'bg-[#0a0a0a] text-white'
                    : 'bg-[#e5e5e0] text-[#7d7d7d]'
                }`}>
                  {agreedToTerms ? <Check size={20} /> : '4'}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className={`text-base mb-1 ${
                    agreedToTerms ? 'text-[#0a0a0a]' : 'text-[#a5a5a0]'
                  }`}>
                    Review & agree to terms
                  </h3>
                  <p className="text-sm text-[#7d7d7d]">~2 MIN</p>
                </div>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-[#d5d5d0] my-8"></div>

          {/* Summary Section */}
          <AnimatePresence mode="wait">
            {selectedPlan ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h3 className="text-lg text-[#0a0a0a] font-medium mb-4">Order Summary</h3>
                
                {/* Selected Plan */}
                {auditSelected ? (
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-[#0a0a0a] font-normal">{auditPackage.name}</h4>
                        <p className="text-sm text-[#7d7d7d]\">Qty: 1</p>
                      </div>
                      <p className="text-[#0a0a0a] font-medium">${auditPackage.price.toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {(() => {
                      const plan = plans.find(p => p.id === selectedPlan);
                      return plan ? (
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-[#0a0a0a] font-normal">{plan.name}</h4>
                              <p className="text-sm text-[#7d7d7d]\">Qty: 1</p>
                            </div>
                            <p className="text-[#0a0a0a] font-medium">${plan.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </>
                )}

                {/* Selected Add-ons */}
                {selectedAddOns.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-[#d5d5d0]">
                    {selectedAddOns.map(addOnId => {
                      const addOn = addOns.find(a => a.id === addOnId);
                      return addOn ? (
                        <div key={addOn.id} className="flex items-start justify-between">
                          <div>
                            <h4 className="text-[#0a0a0a] text-sm">{addOn.name}</h4>
                            <p className="text-xs text-[#7d7d7d]">Qty: 1</p>
                          </div>
                          <p className="text-[#0a0a0a] text-sm font-medium">${addOn.price.toLocaleString()}</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Total */}
                <div className="pt-6 border-t border-[#d5d5d0]">
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <h4 className="text-[#0a0a0a] text-lg font-medium">Total</h4>
                      <p className="text-xs text-[#7d7d7d]">USD</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl text-[#0a0a0a] font-light">${calculateTotal().toLocaleString()}</p>
                      <p className="text-sm text-[#7d7d7d]">per month</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || !email || !agreedToTerms}
                  className="w-full mt-6 px-6 py-4 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Processing...'
                  ) : submitted ? (
                    <>
                      <Check size={20} />
                      Request Sent!
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <p className="text-[#7d7d7d] text-sm">Select a plan to see your order summary</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Section */}
          <div className="mt-12 pt-8 border-t border-[#d5d5d0]">
            <div className="space-y-6">
              <div>
                <h4 className="text-[#0a0a0a] mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Need help choosing?
                </h4>
                <button 
                  onClick={() => window.open('https://app.apollo.io/#/meet/cieloagency/discovery', '_blank')}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Schedule a consultation
                </button>
              </div>
              
              <div>
                <h4 className="text-[#0a0a0a] mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Have questions?
                </h4>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Contact our team
                </button>
              </div>
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-12 pt-8 border-t border-[#d5d5d0]">
            <p className="text-xs text-[#7d7d7d] leading-relaxed">
              By continuing, you agree to CIELO Agency's terms of service. All plans are billed monthly and can be cancelled anytime. Custom enterprise solutions available upon request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}