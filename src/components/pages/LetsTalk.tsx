import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { validateEmail, validateTextField } from '../../utils/formValidation';
import { motion } from 'motion/react';
import portfolioImage1 from 'figma:asset/0f1eaad1850e1b1f0620b03648341e02298f7bbc.png';
import portfolioImage2 from 'figma:asset/0477d4edbfdbd6c8bbe5ef8e3ac9dc1f234f5ca7.png';
import portfolioImage3 from 'figma:asset/1f910a4ee5c289b0af76d0eac60408340fa80849.png';

interface LetsTalkProps {
  onNavigate: (page: string) => void;
}

type ServiceOption = 'brand-web' | 'social-media' | 'consulting' | 'ai-content' | 'other' | '';

export function LetsTalk({ onNavigate }: LetsTalkProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    services: [] as ServiceOption[],
  });

  // Validate Step 1 (Name + Email)
  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const nameValidation = validateTextField(formData.name, 'Name', 2, 100);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error || '';
    }
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error || '';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 2 (Company + Services)
  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const companyValidation = validateTextField(formData.companyName, 'Company name', 2, 100);
    if (!companyValidation.isValid) {
      newErrors.companyName = companyValidation.error || '';
    }
    
    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/lets-talk`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company_name: formData.companyName,
            services: formData.services,
            submitted_at: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      // Move to thank you page
      setStep(3);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (service: ServiceOption) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const serviceOptions = [
    { value: 'brand-web' as ServiceOption, label: 'Brand & Web', description: 'Brand identity, web design, and development' },
    { value: 'social-media' as ServiceOption, label: 'Social Media', description: 'Content strategy, management, and growth' },
    { value: 'consulting' as ServiceOption, label: 'Consulting', description: 'Strategic guidance and business planning' },
    { value: 'ai-content' as ServiceOption, label: 'AI Content', description: 'AI-powered content creation and automation' },
    { value: 'other' as ServiceOption, label: 'Other', description: 'Custom solutions and special projects' },
  ];

  // Thank you page (Step 3)
  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8 py-12 max-w-2xl"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500"
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl text-white tracking-tight">
              Thank you!
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              We're excited to connect with you. You'll be redirected to schedule your discovery call in a moment...
            </p>
          </div>

          {/* Auto-redirect after 3 seconds */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            className="h-1 bg-green-500 max-w-md mx-auto rounded-full"
            onAnimationComplete={() => {
              window.open('https://app.apollo.io/#/meet/managed-meetings/cieloagency/r7h-tyg-3bs/cielo-discovery', '_blank');
            }}
          />

          <p className="text-white/40 uppercase tracking-[0.3em] text-[9px]" style={{ fontFamily: 'DM Mono, monospace' }}>
            Redirecting in 3 seconds...
          </p>

          {/* Manual redirect button */}
          <div className="pt-8">
            <a
              href="https://app.apollo.io/#/meet/managed-meetings/cieloagency/r7h-tyg-3bs/cielo-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white uppercase tracking-[0.3em] transition-all group text-[10px]"
              style={{ fontFamily: 'DM Mono, monospace' }}
            >
              Schedule Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* EXIT button */}
      <button
        onClick={() => onNavigate('home')}
        className="absolute top-6 left-6 z-50 text-white/80 hover:text-white uppercase tracking-[0.3em] text-[10px] transition-colors"
        style={{ fontFamily: 'DM Mono, monospace' }}
      >
        EXIT
      </button>

      {/* Split Screen Layout */}
      <div className="min-h-screen grid lg:grid-cols-2 gap-0">
        {/* Left Side - Portfolio Images */}
        <div className="relative bg-black overflow-hidden flex items-center justify-center p-8">
          <div className="grid grid-cols-1 gap-6 w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src={portfolioImage1}
                alt="Portfolio 1"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src={portfolioImage2}
                alt="Portfolio 2"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src={portfolioImage3}
                alt="Portfolio 3"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-purple-900/20 p-12 lg:p-16 flex items-center justify-center">
          <div className="relative z-10 max-w-lg w-full">
            {/* Step 1: Name + Email */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl text-white leading-tight">
                    Let's get to know you
                  </h1>
                  <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'DM Mono, monospace' }}>
                    <span className="text-white">FREE Business Audit.</span> How to position your brand, build reputation & grow. Delivered by our specialists with over 15+ years of experience, generated 100M+ in Value
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* First Name Input */}
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[0px] text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-all"
                      autoFocus
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[0px] text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-all"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleNext}
                    disabled={!formData.name || !formData.email}
                    className="w-full py-4 bg-white hover:bg-white/90 text-black uppercase tracking-[0.3em] text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                    style={{ fontFamily: 'DM Mono, monospace' }}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Footer Text */}
                <p className="text-white/30 text-[9px] uppercase tracking-wider text-center" style={{ fontFamily: 'DM Mono, monospace' }}>
                  STEP 1 OF 2
                </p>
              </motion.div>
            )}

            {/* Step 2: Company Name + Services */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl lg:text-6xl text-white leading-tight">
                    One last thing
                  </h1>
                  <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: 'DM Mono, monospace' }}>
                    We'll have a look at your business & information provided beforehand so we can dive right into!
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Company Name Input */}
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="ACME Corporation"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none transition-all"
                      autoFocus
                    />
                    {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName}</p>}
                  </div>

                  {/* Services Selection */}
                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>
                      Services Interested In
                    </label>
                    <div className="space-y-2">
                      {serviceOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleService(option.value)}
                          className={`w-full p-3 border rounded-lg transition-all text-left text-sm flex items-center justify-between ${
                            formData.services.includes(option.value)
                              ? 'border-white/30 bg-white/10'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <span className="text-white/90">{option.label}</span>
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              formData.services.includes(option.value)
                                ? 'border-white bg-white'
                                : 'border-white/30'
                            }`}
                          >
                            {formData.services.includes(option.value) && (
                              <Check className="w-3 h-3 text-black" strokeWidth={3} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.services && <p className="text-red-400 text-xs mt-1">{errors.services}</p>}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleBack}
                      className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white uppercase tracking-[0.3em] text-xs transition-all flex items-center gap-3 group"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 py-4 bg-white hover:bg-white/90 text-black uppercase tracking-[0.3em] text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                      style={{ fontFamily: 'DM Mono, monospace' }}
                    >
                      {loading ? 'Submitting...' : 'Get a Free Custom Audit (Value $650)'}
                    </button>
                  </div>
                </div>

                {/* Footer Text */}
                <p className="text-white/30 text-[9px] uppercase tracking-wider text-center" style={{ fontFamily: 'DM Mono, monospace' }}>
                  STEP 2 OF 2
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}