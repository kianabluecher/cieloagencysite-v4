import { useState } from 'react';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { validateEmail, validateTextField, validateCheckboxArray } from '../../utils/formValidation';
import quoteImage from 'figma:asset/59c90a6aefd58ab4aebd8ddaf1eb00a26871e0d9.png';

interface SignupProps {
  onNavigate: (page: string) => void;
}

export function Signup({ onNavigate }: SignupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    services: [] as string[],
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
    // Clear services error when user selects a service
    if (fieldErrors.services) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.services;
        return newErrors;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate name
    const nameValidation = validateTextField(formData.name, 'Name', 2, 100);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error || '';
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error || '';
    }

    // Validate company (optional but if provided, should be valid)
    if (formData.company && formData.company.trim().length > 0) {
      const companyValidation = validateTextField(formData.company, 'Company', 2, 200, false);
      if (!companyValidation.isValid) {
        errors.company = companyValidation.error || '';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate services
    const servicesValidation = validateCheckboxArray(formData.services, 'service', 1);
    if (!servicesValidation.isValid) {
      errors.services = servicesValidation.error || '';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep1()) {
      setError('Please fix the errors above before continuing');
      return;
    }

    setError('');
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate step 2 before submission
    if (!validateStep2()) {
      setError('Please fix the errors above before submitting');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/inquiry/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ ...formData, type: 'signup' }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit signup request');
      }

      const result = await response.json();
      console.log('Signup request submitted successfully:', result);
      setSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setStep(1);
        setFormData({
          name: '',
          email: '',
          company: '',
          services: [],
          notes: ''
        });
      }, 3000);
    } catch (err) {
      console.error('Error submitting signup request:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit signup request');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-transparent border border-[#1f2228] text-white placeholder:text-[#7d8187] focus:border-white/30 focus:outline-none transition-colors rounded-md";
  const labelClass = "block text-sm text-[#7d8187] mb-2";
  const errorClass = "text-red-500 text-sm mt-1 flex items-center gap-1";

  return (
    <div className="h-screen bg-neutral-950 overflow-hidden flex items-center">
      <section className="w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Title, Subtitle & Form */}
            <div>
              <div className="inline-block mb-4">
                <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                  [ SIGN UP ]
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl text-white tracking-tight leading-tight mb-4 font-[Helvetica_Neue]">
                Pick and Choose Agency & Brand Management Services
              </h1>

              <p className="text-base text-[#7d8187] leading-relaxed mb-6 font-[Helvetica_Neue]">
                Tell us about your needs and we'll create a customized plan. Choose from our full range of agency and design services to build your perfect solution.
              </p>

              {/* Form */}
              <div className="bg-[#0a0a0a] border border-[#1f2228] rounded-2xl p-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl text-white mb-4">Thank you!</h2>
                    <p className="text-[#7d8187]">We've received your signup request and will be in touch shortly.</p>
                  </div>
                ) : (
                  <>
                    {step === 1 ? (
                      <form onSubmit={handleStep1Submit} className="space-y-4">
                        <div>
                          <label className={labelClass}>Name *</label>
                          <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your name"
                            className={inputClass}
                          />
                          {fieldErrors.name && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.name}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@company.com"
                            className={inputClass}
                          />
                          {fieldErrors.email && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.email}</p>}
                        </div>

                        <div>
                          <label className={labelClass}>Company</label>
                          <input
                            type="text"
                            name="company"
                            autoComplete="organization"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your company name"
                            className={inputClass}
                          />
                          {fieldErrors.company && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.company}</p>}
                        </div>

                        {error && (
                          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-md">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full px-8 py-3 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-3 group font-[DM_Mono]"
                        >
                          Continue
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleFinalSubmit} className="space-y-4">
                        {/* Services */}
                        <div>
                          <label className={labelClass}>Select Services *</label>
                          <div className="space-y-2 mt-2">
                            {[
                              'Brand & Web',
                              'Social Media',
                              'Ventures',
                              'Custom Development',
                              'Consulting',
                              'Marketing & PR'
                            ].map((service) => (
                              <label key={service} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={formData.services.includes(service)}
                                  onChange={() => handleCheckboxChange(service)}
                                  className="w-4 h-4 bg-transparent border border-[#1f2228] checked:bg-white checked:border-white focus:outline-none focus:ring-0 cursor-pointer"
                                />
                                <span className="text-[#7d8187] group-hover:text-white transition-colors text-sm">
                                  {service}
                                </span>
                              </label>
                            ))}
                          </div>
                          {fieldErrors.services && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.services}</p>}
                        </div>

                        {/* Notes */}
                        <div>
                          <label className={labelClass}>Additional Notes</label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Tell us more about your needs..."
                            className={inputClass}
                          />
                        </div>

                        {error && (
                          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-md">
                            {error}
                          </div>
                        )}

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-6 py-3 rounded-full border border-[#1f2228] text-[#7d8187] font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-white/30 hover:text-white transition-colors"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loading ? (
                              <>
                                <Loader2 size={16} className="animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Sign Up
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-xs text-[#7d8187] text-center">
                          By submitting this form, you agree to our privacy policy and terms of service.
                        </p>
                      </form>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex items-center justify-center">
              <img 
                src={quoteImage} 
                alt="A New Agency Model Has Arrived - Get Quotes within 24h or choose right from our services list" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}