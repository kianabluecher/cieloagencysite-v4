import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { validateEmail, validateTextField, validateCheckboxArray } from '../../utils/formValidation';
import { SEOHead } from '../SEOHead';
import specialistImage from 'figma:asset/8f2a7a22fd950748341dcb791ae7c147bc4f6fae.png';

interface RequestProposalProps {
  onNavigate: (page: string) => void;
}

export function RequestProposal({ onNavigate }: RequestProposalProps) {
  const [step, setStep] = useState(1);
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
    timeline: '',
    
    // Detailed fields - Brand/Web
    currentWebsite: '',
    competitorWebsites: '',
    designPreferences: '',
    
    // Detailed fields - Marketing
    targetAudience: '',
    marketingGoals: [] as string[],
    currentChannels: '',
    
    // Detailed fields - Content
    contentTypes: [] as string[],
    contentFrequency: '',
    socialPlatforms: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const formTopRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => {
      // @ts-ignore
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return { ...prev, [field]: newArray };
    });
    
    // Clear error
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate first name
    const firstNameValidation = validateTextField(formData.firstName, 'First name', 2, 50);
    if (!firstNameValidation.isValid) errors.firstName = firstNameValidation.error || '';

    // Validate last name
    const lastNameValidation = validateTextField(formData.lastName, 'Last name', 2, 50);
    if (!lastNameValidation.isValid) errors.lastName = lastNameValidation.error || '';

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) errors.email = emailValidation.error || '';

    // Validate company name
    const companyValidation = validateTextField(formData.companyName, 'Company name', 2, 100);
    if (!companyValidation.isValid) errors.companyName = companyValidation.error || '';

    // Validate company size
    if (!formData.companySize) errors.companySize = 'Please select company size';

    // Validate role
    const roleValidation = validateTextField(formData.role, 'Job title/role', 2, 100);
    if (!roleValidation.isValid) errors.role = roleValidation.error || '';

    // Validate services
    const servicesValidation = validateCheckboxArray(formData.services, 'service', 1);
    if (!servicesValidation.isValid) errors.services = servicesValidation.error || '';

    // Validate budget
    if (!formData.budget) errors.budget = 'Please select a budget range';

    // Validate timeline
    if (!formData.timeline) errors.timeline = 'Please select a timeline';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      scrollToTop();
    } else {
      setError('Please fix the errors above before continuing');
      // Scroll to first error
      const firstError = document.querySelector('.text-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleBack = () => {
    setStep(1);
    scrollToTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation for step 2 fields could be added here if needed
    // For now, we'll treat detailed fields as optional or rely on required attributes

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
          body: JSON.stringify({
            ...formData,
            type: 'proposal_request'
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit proposal request');
      }

      const result = await response.json();
      console.log('Proposal request submitted successfully:', result);
      setSubmitted(true);
      scrollToTop();
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setStep(1);
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
          timeline: '',
          currentWebsite: '',
          competitorWebsites: '',
          designPreferences: '',
          targetAudience: '',
          marketingGoals: [],
          currentChannels: '',
          contentTypes: [],
          contentFrequency: '',
          socialPlatforms: [],
        });
      }, 5000);
    } catch (err) {
      console.error('Error submitting proposal request:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit proposal request');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-transparent border border-[#1f2228] text-white placeholder:text-[#7d8187] focus:border-white/30 focus:outline-none transition-colors rounded-md";
  const selectClass = "w-full px-4 py-3 bg-transparent border border-[#1f2228] text-white placeholder:text-[#7d8187] focus:border-white/30 focus:outline-none transition-colors rounded-md [&>option]:bg-black [&>option]:text-[#7d8187]";
  const labelClass = "block text-sm text-[#7d8187] mb-2";
  const sectionTitleClass = "text-xl text-white mb-6 border-b border-[#1f2228] pb-2";
  const errorClass = "text-red-500 text-sm mt-1 flex items-center gap-1";

  // Check which detailed forms to show
  const showBrandWebForm = formData.services.some(s => ['Brand Identity', 'Web Development'].includes(s));
  const showMarketingForm = formData.services.some(s => ['Marketing Strategy', 'Consulting'].includes(s));
  const showContentForm = formData.services.includes('Content Creation');

  return (
    <div className="min-h-screen bg-neutral-950">
      <SEOHead
        title="Request a Proposal | CIELO Agency"
        description="Request a custom proposal for your brand, web, or marketing project."
        url="https://www.cielo.agency/rfp"
      />
      <section className="px-6 pt-32 pb-20" ref={formTopRef}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="inline-block mb-8">
                <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
                  [ REQUEST PROPOSAL ]
                </p>
              </div>

              <h1 className="text-5xl md:text-6xl text-white tracking-tight leading-tight mb-8">
                Request a Proposal
              </h1>

              <p className="text-lg text-[#7d8187] leading-relaxed mb-12">
                Ready to take your brand to the next level? Provide us with some details, and we'll craft a custom proposal tailored to your unique needs and goals.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white mb-2">Our Process:</h3>
                  <ul className="space-y-2 text-[#7d8187]">
                    <li className="flex items-start gap-3">
                      <span className="text-white mt-1">→</span>
                      <span>Initial analysis of your requirements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white mt-1">→</span>
                      <span>Strategic planning & scope definition</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white mt-1">→</span>
                      <span>Detailed proposal presentation</span>
                    </li>
                  </ul>
                </div>

                {/* Got some questions section */}
                <div className="mt-16 pt-12 border-t border-[#1f2228]">
                  <h3 className="text-white text-xl mb-6">Got some questions?</h3>
                  <div className="relative group overflow-hidden rounded-xl bg-[#0a0a0a] border border-[#1f2228]">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img 
                        src={specialistImage}
                        alt="Talk to a specialist"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <a 
                        href="https://app.apollo.io/#/meet/cieloagency/discovery"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between bg-black text-white border border-white/20 px-6 py-4 rounded-full font-['Geist_Mono'] text-sm tracking-wider uppercase hover:bg-neutral-900 transition-colors"
                      >
                        <span>Set a call with a specialist</span>
                        <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
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
                  <h2 className="text-3xl text-white mb-4">Request Received!</h2>
                  <p className="text-[#7d8187]">We're reviewing your information and will send your proposal shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* STEP 1: General Info */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
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
                          placeholder="e.g., CEO, Marketing Director"
                          className={inputClass}
                        />
                        {fieldErrors.role && <p className={errorClass}><AlertCircle size={16} /> {fieldErrors.role}</p>}
                      </div>

                      {/* Services */}
                      <div>
                        <label className={labelClass}>Services Required *</label>
                        <div className="space-y-3 mt-3">
                          {[
                            'Brand Identity',
                            'Web Development',
                            'Marketing Strategy',
                            'Content Creation',
                            'Consulting',
                            'Other'
                          ].map((service) => (
                            <label key={service} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={formData.services.includes(service)}
                                onChange={() => handleCheckboxChange('services', service)}
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
                        <label className={labelClass}>Estimated Budget *</label>
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
                        <label className={labelClass}>Preferred Timeline *</label>
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
                        <label className={labelClass}>Project Overview</label>
                        <textarea
                          name="projectDetails"
                          value={formData.projectDetails}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Briefly describe your project..."
                          className={inputClass}
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-md">
                          {error}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-3 group"
                      >
                        Next
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}

                  {/* STEP 2: Detailed Info */}
                  {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                      
                      <button 
                        type="button" 
                        onClick={handleBack}
                        className="flex items-center gap-2 text-[#7d8187] hover:text-white transition-colors text-sm mb-4"
                      >
                        <ArrowLeft size={14} /> Back to details
                      </button>

                      {/* Brand & Web Form */}
                      {showBrandWebForm && (
                        <div className="space-y-6">
                          <h3 className={sectionTitleClass}>Brand & Web Details</h3>
                          
                          <div>
                            <label className={labelClass}>Current Website URL (if any)</label>
                            <input
                              type="text"
                              name="currentWebsite"
                              value={formData.currentWebsite}
                              onChange={handleInputChange}
                              placeholder="https://..."
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className={labelClass}>Competitor Websites</label>
                            <textarea
                              name="competitorWebsites"
                              value={formData.competitorWebsites}
                              onChange={handleInputChange}
                              rows={2}
                              placeholder="List any competitors we should be aware of..."
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className={labelClass}>Design Preferences</label>
                            <textarea
                              name="designPreferences"
                              value={formData.designPreferences}
                              onChange={handleInputChange}
                              rows={3}
                              placeholder="Describe the look and feel you're aiming for (e.g., minimalist, bold, luxury)..."
                              className={inputClass}
                            />
                          </div>
                        </div>
                      )}

                      {/* Marketing Form */}
                      {showMarketingForm && (
                        <div className="space-y-6">
                          <h3 className={sectionTitleClass}>Marketing & Strategy Details</h3>
                          
                          <div>
                            <label className={labelClass}>Target Audience</label>
                            <textarea
                              name="targetAudience"
                              value={formData.targetAudience}
                              onChange={handleInputChange}
                              rows={2}
                              placeholder="Who are you trying to reach?"
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className={labelClass}>Primary Goals</label>
                            <div className="space-y-3 mt-3">
                              {[
                                'Brand Awareness',
                                'Lead Generation',
                                'Sales / Conversion',
                                'Customer Retention',
                                'Community Building'
                              ].map((goal) => (
                                <label key={goal} className="flex items-center gap-3 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={formData.marketingGoals.includes(goal)}
                                    onChange={() => handleCheckboxChange('marketingGoals', goal)}
                                    className="w-4 h-4 bg-transparent border border-[#1f2228] checked:bg-white checked:border-white focus:outline-none focus:ring-0 cursor-pointer"
                                  />
                                  <span className="text-[#7d8187] group-hover:text-white transition-colors">
                                    {goal}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className={labelClass}>Current Marketing Channels</label>
                            <input
                              type="text"
                              name="currentChannels"
                              value={formData.currentChannels}
                              onChange={handleInputChange}
                              placeholder="e.g., Instagram, Email, Google Ads..."
                              className={inputClass}
                            />
                          </div>
                        </div>
                      )}

                      {/* Content Form */}
                      {showContentForm && (
                        <div className="space-y-6">
                          <h3 className={sectionTitleClass}>Content Creation Details</h3>
                          
                          <div>
                            <label className={labelClass}>Content Types Needed</label>
                            <div className="space-y-3 mt-3">
                              {[
                                'Photography',
                                'Video Production',
                                'Social Media Graphics',
                                'Blog / Copywriting',
                                'UGC'
                              ].map((type) => (
                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={formData.contentTypes.includes(type)}
                                    onChange={() => handleCheckboxChange('contentTypes', type)}
                                    className="w-4 h-4 bg-transparent border border-[#1f2228] checked:bg-white checked:border-white focus:outline-none focus:ring-0 cursor-pointer"
                                  />
                                  <span className="text-[#7d8187] group-hover:text-white transition-colors">
                                    {type}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className={labelClass}>Target Platforms</label>
                            <div className="space-y-3 mt-3">
                              {[
                                'Instagram',
                                'LinkedIn',
                                'TikTok',
                                'YouTube',
                                'Website'
                              ].map((platform) => (
                                <label key={platform} className="flex items-center gap-3 cursor-pointer group">
                                  <input
                                    type="checkbox"
                                    checked={formData.socialPlatforms.includes(platform)}
                                    onChange={() => handleCheckboxChange('socialPlatforms', platform)}
                                    className="w-4 h-4 bg-transparent border border-[#1f2228] checked:bg-white checked:border-white focus:outline-none focus:ring-0 cursor-pointer"
                                  />
                                  <span className="text-[#7d8187] group-hover:text-white transition-colors">
                                    {platform}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-md">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-8 py-4 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending Proposal Request...
                          </>
                        ) : (
                          <>
                            Submit Proposal Request
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  )}

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
