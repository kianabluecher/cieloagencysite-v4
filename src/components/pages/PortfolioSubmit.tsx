import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Loader2, CheckCircle2, Briefcase, Mail, Phone, Building2, Globe, Link2, MessageSquare, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { validateEmail, validatePhone, validateURL, validateTextField } from '../../utils/formValidation';

interface PortfolioSubmitProps {
  onNavigate: (page: string) => void;
}

export function PortfolioSubmit({ onNavigate }: PortfolioSubmitProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    portfolio_url: '',
    website: '',
    message: '',
  });

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate name
    const nameValidation = validateTextField(formData.name, 'Full name', 2, 100);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error || '';
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error || '';
    }

    // Validate phone (optional)
    if (formData.phone.trim()) {
      const phoneValidation = validatePhone(formData.phone, false);
      if (!phoneValidation.isValid) {
        errors.phone = phoneValidation.error || '';
      }
    }

    // Validate company (optional)
    if (formData.company.trim()) {
      const companyValidation = validateTextField(formData.company, 'Company', 2, 100, false);
      if (!companyValidation.isValid) {
        errors.company = companyValidation.error || '';
      }
    }

    // Validate portfolio URL (required)
    const portfolioValidation = validateURL(formData.portfolio_url, true);
    if (!portfolioValidation.isValid) {
      errors.portfolio_url = portfolioValidation.error || '';
    }

    // Validate website (optional)
    if (formData.website.trim()) {
      const websiteValidation = validateURL(formData.website, false);
      if (!websiteValidation.isValid) {
        errors.website = websiteValidation.error || '';
      }
    }

    // Validate message (optional but min length if provided)
    if (formData.message.trim()) {
      const messageValidation = validateTextField(formData.message, 'Message', 10, 1000, false);
      if (!messageValidation.isValid) {
        errors.message = messageValidation.error || '';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/portfolio-submissions/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit portfolio');
      }

      console.log('✅ Portfolio submitted:', data);
      setSubmitted(true);
      toast.success('Portfolio submitted successfully!');
    } catch (error: any) {
      console.error('❌ Error submitting portfolio:', error);
      toast.error(error.message || 'Failed to submit portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
          </div>
          
          <h1 className="text-3xl mb-4">Thank You!</h1>
          <p className="text-white/70 mb-8">
            Your portfolio has been submitted successfully. We'll review it and get back to you soon.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  portfolio_url: '',
                  website: '',
                  message: '',
                });
              }}
              className="w-full bg-white hover:bg-white/90 text-neutral-950 py-3 transition-colors rounded-lg font-medium"
            >
              Submit Another Portfolio
            </button>
            
            <button
              onClick={() => onNavigate('home')}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 transition-colors rounded-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="text-3xl mb-6 hover:opacity-70 transition-opacity"
          >
            CIELO
          </button>
          <h1 className="text-4xl mb-4">Submit Your Portfolio</h1>
          <p className="text-white/60 text-lg">
            Share your work with us and let's explore collaboration opportunities
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="John Doe"
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs text-red-400 mt-1">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Email Address <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="john@example.com"
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs text-red-400 mt-1">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            {fieldErrors.phone && (
              <p className="text-xs text-red-400 mt-1">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                {fieldErrors.phone}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Company/Studio
            </label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="Your Company Name"
              />
            </div>
            {fieldErrors.company && (
              <p className="text-xs text-red-400 mt-1">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                {fieldErrors.company}
              </p>
            )}
          </div>

          {/* Portfolio URL */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Portfolio URL <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="url"
                name="portfolio_url"
                value={formData.portfolio_url}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="https://yourportfolio.com"
              />
            </div>
            <p className="text-xs text-white/40 mt-2">
              Link to Behance, Dribbble, personal website, or PDF
            </p>
            {fieldErrors.portfolio_url && (
              <p className="text-xs text-red-400 mt-1">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                {fieldErrors.portfolio_url}
              </p>
            )}
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Website
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg"
                placeholder="https://yourwebsite.com"
              />
            </div>
            {fieldErrors.website && (
              <p className="text-xs text-red-400 mt-1">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                {fieldErrors.website}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Message
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/30" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white/5 border border-white/10 focus:border-white/30 pl-12 pr-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors rounded-lg resize-none"
                placeholder="Tell us about your work and what you're looking for..."
              />
            </div>
            {fieldErrors.message && (
              <p className="text-xs text-red-400 mt-1">
                <AlertCircle className="inline-block w-4 h-4 mr-1" />
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-white/90 text-neutral-950 py-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg font-medium text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Portfolio</span>
            )}
          </button>

          <p className="text-xs text-white/40 text-center">
            By submitting, you agree to be contacted regarding collaboration opportunities
          </p>
        </form>
      </div>
    </div>
  );
}