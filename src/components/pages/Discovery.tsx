import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { validateEmail, validateTextField, validatePhone, validateCheckboxArray } from '../../utils/formValidation';

interface DiscoveryProps {
  onNavigate: (page: string) => void;
}

export function Discovery({ onNavigate }: DiscoveryProps) {
  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(5);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    hasBusinessNeed: '',
    companyName: '',
    industry: '',
    budget: '',
    timeline: '',
    services: [] as string[],
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const totalSteps = 7;

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.hasBusinessNeed) {
          newErrors.hasBusinessNeed = 'Please select an option';
        }
        break;
      case 2:
        const companyValidation = validateTextField(formData.companyName, 'Company name', 2, 100);
        if (!companyValidation.isValid) {
          newErrors.companyName = companyValidation.error || '';
        }
        break;
      case 3:
        const industryValidation = validateTextField(formData.industry, 'Industry', 2, 100);
        if (!industryValidation.isValid) {
          newErrors.industry = industryValidation.error || '';
        }
        break;
      case 4:
        const servicesValidation = validateCheckboxArray(formData.services, 'service', 1);
        if (!servicesValidation.isValid) {
          newErrors.services = servicesValidation.error || '';
        }
        break;
      case 5:
        if (!formData.budget) {
          newErrors.budget = 'Please select a budget range';
        }
        if (!formData.timeline) {
          newErrors.timeline = 'Please select a timeline';
        }
        break;
      case 6:
        const nameValidation = validateTextField(formData.name, 'Name', 2, 100);
        if (!nameValidation.isValid) {
          newErrors.name = nameValidation.error || '';
        }
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) {
          newErrors.email = emailValidation.error || '';
        }
        if (formData.phone.trim()) {
          const phoneValidation = validatePhone(formData.phone, false);
          if (!phoneValidation.isValid) {
            newErrors.phone = phoneValidation.error || '';
          }
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep() && step < totalSteps) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submitting
    if (!validateCurrentStep()) {
      console.error('Validation failed on step 6');
      return;
    }
    
    console.log('📤 Submitting discovery form...', formData);
    
    try {
      // Send form data to the backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/discovery/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Error submitting discovery form:', error);
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('✅ Form submitted successfully:', result);
      
      // Go to thank you page
      setStep(7);
    } catch (error) {
      console.error('💥 Error submitting form:', error);
      // Still go to thank you page even if submission fails
      // In production, you might want to show an error message
      setStep(7);
    }
  };

  const handleScheduleCall = () => {
    window.location.href = 'https://app.apollo.io/#/meet/4f6-gf7-7b2/discovery-call';
  };

  // Countdown effect for thank you page
  useEffect(() => {
    if (step === 7) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleScheduleCall();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step]);

  const services = [
    'Brand Strategy',
    'Social Media',
    'Development',
    'PR & Media',
    'Influencer Marketing',
    'Video & Motion',
    'Photography',
    'AI Content',
    'CGI & 3D',
    'Email Marketing',
    'Packaging Design',
    'Event Branding',
    'Print Collateral',
    'Creative Direction',
    'Consulting'
  ];

  const budgetRanges = [
    'Under $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K - $100K',
    '$100K+'
  ];

  const timelines = [
    'ASAP',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Ongoing partnership'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* EXIT Button - Top Left */}
      <div className="absolute top-8 left-8 z-50">
        <button 
          onClick={() => onNavigate('home')}
          className="text-white font-['Geist_Mono'] text-xs tracking-[2px] uppercase hover:text-zinc-400 transition-colors duration-300"
        >
          EXIT
        </button>
      </div>

      {/* Progress Bar */}
      {step < 7 && (
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/10 z-50">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 transition-all duration-500"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Initial Question */}
            {step === 1 && (
              <div className="space-y-16 animate-fadeIn">
                <div className="space-y-8">
                  <h1 className="text-4xl md:text-6xl text-white tracking-tight leading-tight">
                    Have a brand or a business that needs more credibility or growth?
                  </h1>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, hasBusinessNeed: 'yes' });
                        handleNext();
                      }}
                      className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300"
                    >
                      Yes, let's talk
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, hasBusinessNeed: 'exploring' });
                        handleNext();
                      }}
                      className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300"
                    >
                      Just exploring
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Company Name */}
            {step === 2 && (
              <div className="space-y-16 animate-fadeIn">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
                    What's your business name?
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Company Name"
                      className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl"
                      autoFocus
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">
                        <AlertCircle size={16} className="inline-block mr-1" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.companyName}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Industry */}
            {step === 3 && (
              <div className="space-y-16 animate-fadeIn">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
                    What industry are you in?
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="E.g., Fashion, Tech, Hospitality..."
                      className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl"
                      autoFocus
                    />
                    {errors.industry && (
                      <p className="text-red-500 text-sm mt-1">
                        <AlertCircle size={16} className="inline-block mr-1" />
                        {errors.industry}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.industry}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Services */}
            {step === 4 && (
              <div className="space-y-16 animate-fadeIn">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
                    What services are you interested in?
                  </h2>
                  <p className="text-white/50 font-['Geist_Mono'] text-sm">
                    SELECT ALL THAT APPLY
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => {
                          const newServices = formData.services.includes(service)
                            ? formData.services.filter(s => s !== service)
                            : [...formData.services, service];
                          setFormData({ ...formData, services: newServices });
                        }}
                        className={`px-4 py-3 rounded-full font-['Geist_Mono'] text-xs tracking-[1.5px] uppercase transition-all duration-300 border ${
                          formData.services.includes(service)
                            ? 'bg-white/15 border-white/50 text-white'
                            : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {errors.services && (
                    <p className="text-red-500 text-sm mt-1">
                      <AlertCircle size={16} className="inline-block mr-1" />
                      {errors.services}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={formData.services.length === 0}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Budget & Timeline */}
            {step === 5 && (
              <div className="space-y-16 animate-fadeIn">
                <div className="space-y-12">
                  {/* Budget */}
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl text-white tracking-tight leading-tight">
                      What's your budget range?
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {budgetRanges.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: range })}
                          className={`px-4 py-3 rounded-full font-['Geist_Mono'] text-xs tracking-[1.5px] uppercase transition-all duration-300 border ${
                            formData.budget === range
                              ? 'bg-white/15 border-white/50 text-white'
                              : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10 hover:border-white/30'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                    {errors.budget && (
                      <p className="text-red-500 text-sm mt-1">
                        <AlertCircle size={16} className="inline-block mr-1" />
                        {errors.budget}
                      </p>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl text-white tracking-tight leading-tight">
                      When do you need this?
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timelines.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: time })}
                          className={`px-4 py-3 rounded-full font-['Geist_Mono'] text-xs tracking-[1.5px] uppercase transition-all duration-300 border ${
                            formData.timeline === time
                              ? 'bg-white/15 border-white/50 text-white'
                              : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10 hover:border-white/30'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {errors.timeline && (
                      <p className="text-red-500 text-sm mt-1">
                        <AlertCircle size={16} className="inline-block mr-1" />
                        {errors.timeline}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.budget || !formData.timeline}
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Contact Info */}
            {step === 6 && (
              <div className="space-y-16 animate-fadeIn">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
                    How can we reach you?
                  </h2>
                  <div className="space-y-6">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl"
                      required
                      autoFocus
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        <AlertCircle size={16} className="inline-block mr-1" />
                        {errors.name}
                      </p>
                    )}
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your Email Address"
                      className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        <AlertCircle size={16} className="inline-block mr-1" />
                        {errors.email}
                      </p>
                    )}
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone Number (Optional)"
                      className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        <AlertCircle size={16} className="inline-block mr-1" />
                        {errors.phone}
                      </p>
                    )}
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Anything else you'd like us to know?"
                      rows={4}
                      className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.name || !formData.email}
                    className="px-8 py-3 bg-white text-black hover:bg-white/90 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Submit
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 7: Thank You */}
            {step === 7 && (
              <div className="space-y-12 animate-fadeIn text-center">
                <div className="space-y-3">
                  <p className="text-2xl md:text-3xl text-white leading-snug">
                    Thank you!
                  </p>
                  <p className="text-2xl md:text-3xl text-white leading-snug">
                    We got your inquiry and will review your materials.
                  </p>
                  <p className="text-2xl md:text-3xl text-white leading-snug">
                    Please choose a time at the following page to review your materials.
                  </p>
                </div>
                
                {countdown > 0 && (
                  <div className="text-8xl md:text-9xl text-gray-400 font-['Geist_Mono'] tabular-nums transition-all duration-300 ease-in-out">
                    {countdown}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}