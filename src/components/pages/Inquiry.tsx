import { useState } from 'react';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { validateEmail, validateTextField, validateCheckboxArray } from '../../utils/formValidation';

interface InquiryProps {
  onNavigate: (page: string) => void;
}

export function Inquiry({ onNavigate }: InquiryProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companySize: '',
    role: '',
    services: [] as string[],
    budget: '',
    projectDetails: '',
    timeline: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate first name
    const firstNameValidation = validateTextField(formData.firstName, 'First name', 2, 50);
    if (!firstNameValidation.isValid) {
      errors.firstName = firstNameValidation.error || '';
    }

    // Validate last name
    const lastNameValidation = validateTextField(formData.lastName, 'Last name', 2, 50);
    if (!lastNameValidation.isValid) {
      errors.lastName = lastNameValidation.error || '';
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error || '';
    }

    // Validate company name
    const companyValidation = validateTextField(formData.companyName, 'Company name', 2, 100);
    if (!companyValidation.isValid) {
      errors.companyName = companyValidation.error || '';
    }

    // Validate company size
    if (!formData.companySize) {
      errors.companySize = 'Please select company size';
    }

    // Validate role
    const roleValidation = validateTextField(formData.role, 'Job title/role', 2, 100);
    if (!roleValidation.isValid) {
      errors.role = roleValidation.error || '';
    }

    // Validate services
    const servicesValidation = validateCheckboxArray(formData.services, 'service', 1);
    if (!servicesValidation.isValid) {
      errors.services = servicesValidation.error || '';
    }

    // Validate budget
    if (!formData.budget) {
      errors.budget = 'Please select a budget range';
    }

    // Validate timeline
    if (!formData.timeline) {
      errors.timeline = 'Please select a timeline';
    }

    // Project details are optional, but if provided, should be at least 10 characters
    if (formData.projectDetails && formData.projectDetails.trim().length > 0) {
      const detailsValidation = validateTextField(formData.projectDetails, 'Project details', 10, 1000, false);
      if (!detailsValidation.isValid) {
        errors.projectDetails = detailsValidation.error || '';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
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
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit inquiry');
      }

      const result = await response.json();
      console.log('Inquiry submitted successfully:', result);
      setSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          companyName: '',
          companySize: '',
          role: '',
          services: [],
          budget: '',
          projectDetails: '',
          timeline: ''
        });
      }, 3000);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-transparent border border-[#1f2228] text-white placeholder:text-[#7d8187] focus:border-white/30 focus:outline-none transition-colors rounded-md";
  const selectClass = "w-full px-4 py-3 bg-transparent border border-[#1f2228] text-white placeholder:text-[#7d8187] focus:border-white/30 focus:outline-none transition-colors rounded-md [&>option]:bg-black [&>option]:text-[#7d8187]";
  const labelClass = "block text-sm text-[#7d8187] mb-2";
  const errorClass = "text-red-500 text-sm mt-1 flex items-center gap-1";

  return (
    <div className="min-h-screen bg-neutral-950">
      <section className="px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="inline-block mb-8">
                <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                  [ PROJECT INQUIRY ]
                </p>
              </div>

              <h1 className="text-5xl md:text-6xl text-white tracking-tight leading-tight mb-8">
                Start Your Project
              </h1>

              <p className="text-lg text-[#7d8187] leading-relaxed mb-12">
                Are you ready to build a credible brand that moves fast? Fill out the form, and a member of our team will be in touch shortly to discuss your project.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white mb-2">What to expect:</h3>
                  <ul className="space-y-2 text-[#7d8187]">
                    <li className="flex items-start gap-3">
                      <span className="text-white mt-1">→</span>
                      <span>Response within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white mt-1">→</span>
                      <span>Discovery call to understand your needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white mt-1">→</span>
                      <span>Custom proposal tailored to your goals</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-[#0a0a0a] border border-[#1f2228] rounded-2xl p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-3xl text-white mb-4">Thank you!</h2>
                  <p className="text-[#7d8187]">We've received your inquiry and will be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your first name"
                        className={inputClass}
                      />
                      {fieldErrors.firstName && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.firstName}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your last name"
                        className={inputClass}
                      />
                      {fieldErrors.lastName && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email */}
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

                  {/* Company Name */}
                  <div>
                    <label className={labelClass}>Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      autoComplete="organization"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your company name"
                      className={inputClass}
                    />
                    {fieldErrors.companyName && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.companyName}</p>}
                  </div>

                  {/* Company Size */}
                  <div>
                    <label className={labelClass}>Company Size *</label>
                    <select
                      name="companySize"
                      autoComplete="off"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      required
                      className={`${selectClass} ${!formData.companySize ? 'text-[#7d8187]' : 'text-white'}`}
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                    {fieldErrors.companySize && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.companySize}</p>}
                  </div>

                  {/* Job Title/Role */}
                  <div>
                    <label className={labelClass}>Job Title/Role *</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., CEO, Marketing Director, Product Manager"
                      className={inputClass}
                    />
                    {fieldErrors.role && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.role}</p>}
                  </div>

                  {/* Services */}
                  <div>
                    <label className={labelClass}>Which services are you interested in? *</label>
                    <div className="space-y-3 mt-3">
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
                          <span className="text-[#7d8187] group-hover:text-white transition-colors">
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>
                    {fieldErrors.services && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.services}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className={labelClass}>Approximate Project Budget *</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className={`${selectClass} ${!formData.budget ? 'text-[#7d8187]' : 'text-white'}`}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-10k">Under $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                    {fieldErrors.budget && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.budget}</p>}
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className={labelClass}>Expected Timeline *</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                      className={`${selectClass} ${!formData.timeline ? 'text-[#7d8187]' : 'text-white'}`}
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP / Immediate</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {fieldErrors.timeline && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.timeline}</p>}
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className={labelClass}>Tell us about your project</label>
                    <textarea
                      name="projectDetails"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Share your goals, challenges, and what you're looking to accomplish..."
                      className={inputClass}
                    />
                    {fieldErrors.projectDetails && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.projectDetails}</p>}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-md">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-[#7d8187] text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}