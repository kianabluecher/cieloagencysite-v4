import { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Plus, X, Download, ExternalLink, Calendar, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { validateEmail, validateURL, validateTextField } from '../../utils/formValidation';
import brandPositioningImage from 'figma:asset/e7e1bbde15bd0c5396f2b5fb8a3a06b2acea2371.png';
import socialMediaImage from 'figma:asset/6ab0e151b7620a766532be50659157e9bd9e422c.png';
import gtmStrategyImage from 'figma:asset/413ea813b98bea5bc59fc12209522f1ea9a12274.png';
import leadGenImage from 'figma:asset/d60bc7cc23bf1020e9fbfcf12c0fd7fe8c5cf677.png';
import portfolioImage1 from 'figma:asset/0f1eaad1850e1b1f0620b03648341e02298f7bbc.png';
import portfolioImage2 from 'figma:asset/0477d4edbfdbd6c8bbe5ef8e3ac9dc1f234f5ca7.png';
import portfolioImage3 from 'figma:asset/1f910a4ee5c289b0af76d0eac60408340fa80849.png';

interface BrandAuditProps {
  onNavigate: (page: string) => void;
}

type FocusArea = 'brand-positioning' | 'gtm-strategy' | 'social-media' | 'lead-gen' | '';

export function BrandAudit({ onNavigate }: BrandAuditProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    focusArea: '' as FocusArea,
    companyName: '',
    industry: '',
    website: '',
    targetAudience: '',
    currentChallenges: '',
    competitors: '',
    uniqueValue: '',
    goals: '',
    currentEfforts: '',
    email: '',
  });

  const totalSteps = 9; // Focus + 5 questions + Goals Selection + Email + Results

  // Validate current step
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.focusArea) {
          newErrors.focusArea = 'Please select a focus area';
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
        const websiteValidation = validateURL(formData.website, true);
        if (!websiteValidation.isValid) {
          newErrors.website = websiteValidation.error || '';
        }
        break;
      case 5:
        const audienceValidation = validateTextField(formData.targetAudience, 'Target audience', 10, 500);
        if (!audienceValidation.isValid) {
          newErrors.targetAudience = audienceValidation.error || '';
        }
        break;
      case 6:
        if (!formData.goals) {
          newErrors.goals = 'Please select at least one goal';
        }
        break;
      case 7:
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) {
          newErrors.email = emailValidation.error || '';
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

  const handleFocusSelect = (focus: FocusArea) => {
    setFormData({ ...formData, focusArea: focus });
    handleNext();
  };

  const handleSubmit = async () => {
    // Final validation before submission
    if (!validateCurrentStep()) {
      return;
    }

    setLoading(true);
    
    try {
      // Determine which endpoint to use based on focus area
      let endpoint = '';
      let submissionData: any = {
        email: formData.email,
        company_name: formData.companyName,
        website: formData.website,
        industry: formData.industry,
      };

      // Map form data to the correct table structure based on focus area
      switch (formData.focusArea) {
        case 'brand-positioning':
          // DIY Brand → Credible Brand
          endpoint = '/forms/diy-brand/submit';
          submissionData = {
            ...submissionData,
            target_audience: formData.targetAudience,
            brand_challenges: formData.currentChallenges ? [formData.currentChallenges] : [],
            competitors: formData.competitors ? formData.competitors.split(',').map(c => c.trim()) : [],
            unique_value_proposition: formData.uniqueValue,
            primary_goals: formData.goals ? [formData.goals] : [],
            current_brand_assessment: 'DIY', // Default assessment
          };
          break;

        case 'gtm-strategy':
          // GTM Strategy & Funnel
          endpoint = '/forms/gtm-strategy/submit';
          submissionData = {
            ...submissionData,
            target_market: formData.targetAudience,
            gtm_challenges: formData.currentChallenges ? [formData.currentChallenges] : [],
            competitor_analysis: formData.competitors,
            primary_objectives: formData.goals ? [formData.goals] : [],
            business_stage: 'Growing', // Default stage
            current_channels: formData.currentEfforts ? [formData.currentEfforts] : [],
          };
          break;

        case 'social-media':
          // Social Media Copy & Calendar
          endpoint = '/forms/social-media/submit';
          submissionData = {
            ...submissionData,
            target_audience_social: formData.targetAudience,
            content_challenges: formData.currentChallenges ? [formData.currentChallenges] : [],
            competitor_examples: formData.competitors,
            social_media_goals: formData.goals ? [formData.goals] : [],
            active_platforms: formData.currentEfforts ? formData.currentEfforts.split(',').map(p => p.trim()) : [],
          };
          break;

        case 'lead-gen':
          // How to Sell & Offer (Sales/Lead Gen)
          endpoint = '/forms/sales-offer/submit';
          submissionData = {
            ...submissionData,
            target_customer: formData.targetAudience,
            sales_challenges: formData.currentChallenges ? [formData.currentChallenges] : [],
            competitor_offers: formData.competitors,
            offer_goals: formData.goals ? [formData.goals] : [],
            product_service_description: formData.uniqueValue || '',
            lead_sources: formData.currentEfforts ? formData.currentEfforts.split(',').map(s => s.trim()) : [],
          };
          break;

        default:
          throw new Error('Please select a focus area');
      }

      // Submit to the new table endpoint
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Error submitting form:', error);
        
        // Handle duplicate submission error
        if (response.status === 409) {
          alert('You have already submitted this form. Only one submission per business is allowed.');
          return;
        }
        
        throw new Error(error.error || 'Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
      // Generate a basic audit result message
      const auditMessage = generateAuditMessage(formData.focusArea, formData.companyName);
      setAuditResult(auditMessage);
      setStep(8); // Results page
    } catch (error) {
      console.error('Error submitting audit:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate audit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate audit message
  const generateAuditMessage = (focusArea: FocusArea, companyName: string): string => {
    const messages = {
      'brand-positioning': `Thank you for submitting your brand audit request, ${companyName}! Our team will analyze your brand positioning, competitive landscape, and unique value proposition. You'll receive a comprehensive brand analysis within 24-48 hours via email.`,
      'gtm-strategy': `Thank you for submitting your GTM strategy audit, ${companyName}! We'll review your go-to-market approach, funnel performance, and channel effectiveness. Expect detailed recommendations within 24-48 hours.`,
      'social-media': `Thank you for submitting your social media audit, ${companyName}! We'll create a custom content strategy and 30-day posting calendar tailored to your brand. Check your email within 24-48 hours for your personalized plan.`,
      'lead-gen': `Thank you for submitting your lead generation audit, ${companyName}! Our team will analyze your sales process, offer positioning, and conversion strategy. You'll receive actionable recommendations within 24-48 hours.`,
    };
    
    return messages[focusArea] || `Thank you for your submission, ${companyName}! We'll be in touch soon.`;
  };

  const getFocusTitle = () => {
    switch (formData.focusArea) {
      case 'brand-positioning':
        return 'Brand & Positioning Audit';
      case 'gtm-strategy':
        return 'GTM Strategy & Funnel Audit';
      case 'social-media':
        return 'Social Media Copy & Calendar Audit';
      case 'lead-gen':
        return 'Lead Generation Audit';
      default:
        return '5 Minute Brand Audit';
    }
  };

  const getQuoteForStep = () => {
    const quotes = [
      { text: "Most founders skip the unsexy work: clarity. We build brands that actually say something.", author: "CIELO Strategy Team" },
      { text: "Your industry doesn't define your brand. Your story does. Own it or someone else will write it for you.", author: "CIELO Brand Team" },
      { text: "Competitors copy features. We build moats through positioning. That's the difference between noise and legacy.", author: "CIELO Growth Team" },
      { text: "Knowing your audience isn't research. It's obsession. We make brands people choose, not tolerate.", author: "CIELO Creative Team" },
      { text: "Every challenge is a positioning opportunity. We turn founder problems into market advantages.", author: "CIELO Strategy Team" },
      { text: "If you're competing on price, you've already lost. We help you own the category instead.", author: "CIELO Brand Team" },
      { text: "Your unique value isn't what you think it is. It's what your customer can't live without. We find that.", author: "CIELO Growth Team" },
      { text: "Goals without systems are wishes. We build brands with momentum, not just vision boards.", author: "CIELO Strategy Team" },
      { text: "What you're doing now isn't working because it's generic. We make you unforgettable.", author: "CIELO Creative Team" },
      { text: "Brand isn't your logo. It's the feeling people get when they hear your name. We engineer that feeling.", author: "CIELO Brand Team" },
      { text: "Stop selling features. Start selling transformation. That's how you win attention.", author: "CIELO Growth Team" },
      { text: "Your website isn't a brochure. It's a conversion machine. We build engines, not decorations.", author: "CIELO Development Team" },
      { text: "Most brands whisper. We make you roar. Loudly. Strategically. Profitably.", author: "CIELO Creative Team" },
      { text: "Good branding makes you look professional. Great branding makes you irreplaceable.", author: "CIELO Strategy Team" },
      { text: "The market doesn't reward the best product. It rewards the best positioned product.", author: "CIELO Brand Team" },
      { text: "Clarity is currency. Confusion is expensive. We eliminate both doubt and guesswork.", author: "CIELO Strategy Team" },
      { text: "Your competitors are boring. Be bold. Be different. Be remembered.", author: "CIELO Creative Team" },
      { text: "Founders who win don't have better ideas. They have better execution and better brands.", author: "CIELO Growth Team" },
      { text: "Stop hoping customers find you. Build a brand they can't ignore.", author: "CIELO Marketing Team" },
      { text: "Your story is your moat. Most founders leave it untold. We make it unforgettable.", author: "CIELO Brand Team" },
      { text: "Fast isn't reckless. It's strategic. We help founders move at the speed of opportunity.", author: "CIELO Strategy Team" },
      { text: "Marketing is expensive. A strong brand is an investment that compounds daily.", author: "CIELO Growth Team" },
      { text: "Don't build a company. Build a movement. We show you how.", author: "CIELO Creative Team" },
      { text: "Category creation beats competition every time. Let's create yours.", author: "CIELO Strategy Team" },
      { text: "Your audience doesn't need another option. They need the only option. That's positioning.", author: "CIELO Brand Team" },
      { text: "Viral isn't luck. It's psychology, timing, and craft. We engineer all three.", author: "CIELO Social Team" },
      { text: "Every touchpoint is a brand moment. We make sure each one counts.", author: "CIELO Creative Team" },
      { text: "Scaling without clarity is chaos. We build foundations that support growth.", author: "CIELO Strategy Team" },
      { text: "Good design is invisible. Great design is unforgettable. We create the latter.", author: "CIELO Design Team" },
      { text: "Most brands blend in. We make you the category of one.", author: "CIELO Brand Team" },
      { text: "Being first doesn't matter if no one remembers you. We make you memorable.", author: "CIELO Creative Team" },
      { text: "Founders don't fail from bad ideas. They fail from invisible brands.", author: "CIELO Growth Team" },
      { text: "Your vibe attracts your tribe. We help you broadcast the right frequency.", author: "CIELO Social Team" },
      { text: "Attention is the new currency. We help you earn it, keep it, and convert it.", author: "CIELO Marketing Team" },
      { text: "Stop playing it safe. Safe is forgettable. Bold is bankable.", author: "CIELO Strategy Team" },
      { text: "Brand consistency isn't boring. It's how you build trust at scale.", author: "CIELO Brand Team" },
      { text: "Your content should educate, entertain, or inspire. Ideally all three. We make that happen.", author: "CIELO Content Team" },
      { text: "Launches don't fail from lack of product. They fail from lack of story.", author: "CIELO Creative Team" },
      { text: "Good branding tells. Great branding sells. Legendary branding compels.", author: "CIELO Growth Team" },
      { text: "Your brand promise is only as strong as your ability to deliver it. We bridge that gap.", author: "CIELO Strategy Team" },
      { text: "Trends fade. Timeless brands endure. We build for legacy, not likes.", author: "CIELO Brand Team" },
      { text: "Every market is crowded. Every market has space for something remarkable. Be that.", author: "CIELO Creative Team" },
      { text: "Founders think they need more traffic. What they need is more trust. We build both.", author: "CIELO Marketing Team" },
      { text: "A confused customer never buys. Crystal clear messaging converts. We create clarity.", author: "CIELO Strategy Team" },
      { text: "Your brand isn't what you say it is. It's what your customers say it is. We align both.", author: "CIELO Brand Team" },
      { text: "Great brands don't chase audiences. They attract believers. We turn customers into evangelists.", author: "CIELO Growth Team" },
      { text: "Speed without direction is chaos. We give founders velocity with vision.", author: "CIELO Strategy Team" },
      { text: "Sameness is the enemy of success. Differentiation is your superpower.", author: "CIELO Creative Team" },
      { text: "Your competition is noise. You need to be signal. We amplify what matters.", author: "CIELO Marketing Team" },
      { text: "Building in public is powerful. Building with purpose is unstoppable.", author: "CIELO Social Team" },
    ];
    
    // Only show quote on every second question (steps 3, 5, 7, 9)
    if (step >= 2 && step <= 10 && step % 2 === 1) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    }
    return null;
  };

  const renderStep = () => {
    // Step 1: Choose Focus Area
    if (step === 1) {
      return (
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs text-red-400/70 mb-3 tracking-wide" style={{ fontFamily: 'Geist Mono, monospace' }}>
              [ only one submission per business / user ]
            </p>
            <h1 className="text-4xl md:text-5xl text-white tracking-tight">
              5min, everything you need.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <button
              onClick={() => handleFocusSelect('brand-positioning')}
              className="group p-6 bg-[#0a0a0a] hover:bg-white/[0.02] border border-white/10 transition-all text-left flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10">
                <img src={brandPositioningImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1.5">
                  DIY Brand &gt; Credible brand
                </h3>
                <p className="text-sm text-white/50">
                  Analyze your brand identity and market differentiation
                </p>
              </div>
            </button>

            <button
              onClick={() => handleFocusSelect('gtm-strategy')}
              className="group p-6 bg-[#0a0a0a] hover:bg-white/[0.02] border border-white/10 transition-all text-left flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10">
                <img src={gtmStrategyImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1.5">
                  GTM Strategy & Funnel
                </h3>
                <p className="text-sm text-white/50">
                  Review your go-to-market and conversion funnel
                </p>
              </div>
            </button>

            <button
              onClick={() => handleFocusSelect('social-media')}
              className="group p-6 bg-[#0a0a0a] hover:bg-white/[0.02] border border-white/10 transition-all text-left flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10">
                <img src={socialMediaImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1.5">
                  Social Media Copy & Calendar
                </h3>
                <p className="text-sm text-white/50">
                  Get insights on content strategy and posting schedule
                </p>
              </div>
            </button>

            <button
              onClick={() => handleFocusSelect('lead-gen')}
              className="group p-6 bg-[#0a0a0a] hover:bg-white/[0.02] border border-white/10 transition-all text-left flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10">
                <img src={leadGenImage} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1.5">
                  How to sell & offer
                </h3>
                <p className="text-sm text-white/50">
                  Design market-ready offers, audit sales flow & build GTM packages
                </p>
              </div>
            </button>
          </div>
        </div>
      );
    }

    // Step 2: Company Name
    if (step === 2) {
      const quote = getQuoteForStep();
      return (
        <div className="space-y-8 animate-fadeIn">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
              What's your company name?
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
                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
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
              disabled={!canProceed()}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
          
          {quote && (
            <div className="text-center max-w-2xl mx-auto mt-12 pt-8 border-t border-white/5">
              <p className="text-white/40 italic text-sm">
                "{quote.text}"
              </p>
              <p className="text-white/30 text-xs mt-2">— {quote.author}</p>
            </div>
          )}
        </div>
      );
    }

    // Step 3: Industry
    if (step === 3) {
      const quote = getQuoteForStep();
      return (
        <div className="space-y-8 animate-fadeIn">
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
                <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
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
              disabled={!canProceed()}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
          
          {quote && (
            <div className="text-center max-w-2xl mx-auto mt-12 pt-8 border-t border-white/5">
              <p className="text-white/40 italic text-sm">
                "{quote.text}"
              </p>
              <p className="text-white/30 text-xs mt-2">— {quote.author}</p>
            </div>
          )}
        </div>
      );
    }

    // Step 4: Website
    if (step === 4) {
      const quote = getQuoteForStep();
      return (
        <div className="space-y-8 animate-fadeIn">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
              What's your website?
            </h2>
            <div className="space-y-4">
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://yourwebsite.com"
                className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl"
                autoFocus
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website}</p>
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
              disabled={!canProceed()}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
          
          {quote && (
            <div className="text-center max-w-2xl mx-auto mt-12 pt-8 border-t border-white/5">
              <p className="text-white/40 italic text-sm">
                "{quote.text}"
              </p>
              <p className="text-white/30 text-xs mt-2">— {quote.author}</p>
            </div>
          )}
        </div>
      );
    }

    // Step 5: Target Audience
    if (step === 5) {
      const quote = getQuoteForStep();
      return (
        <div className="space-y-8 animate-fadeIn">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Who is your target audience?
            </h2>
            <div className="space-y-4">
              <textarea
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                rows={5}
                placeholder="Describe your ideal customer..."
                className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl resize-none"
                autoFocus
              />
              {errors.targetAudience && (
                <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>
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
              disabled={!canProceed()}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
          
          {quote && (
            <div className="text-center max-w-2xl mx-auto mt-12 pt-8 border-t border-white/5">
              <p className="text-white/40 italic text-sm">
                "{quote.text}"
              </p>
              <p className="text-white/30 text-xs mt-2">— {quote.author}</p>
            </div>
          )}
        </div>
      );
    }

    // Step 6: Main Goals (Selection)
    if (step === 6) {
      const quote = getQuoteForStep();
      const goalOptions = [
        'Increase brand awareness',
        'Generate more leads',
        'Improve conversion rates',
        'Launch a new product/service',
        'Enter new markets',
        'Build thought leadership',
        'Grow social media presence',
        'Improve customer retention'
      ];
      
      return (
        <div className="space-y-8 animate-fadeIn">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
              What are your main goals?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
              {goalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => setFormData({ ...formData, goals: goal })}
                  className={`p-4 text-left rounded-xl transition-all ${
                    formData.goals === goal
                      ? 'bg-white text-black border-2 border-white'
                      : 'bg-black/30 text-white border border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="text-sm">{goal}</span>
                </button>
              ))}
            </div>
            {errors.goals && (
              <p className="text-red-500 text-sm mt-1">{errors.goals}</p>
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
              disabled={!canProceed()}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
          
          {quote && (
            <div className="text-center max-w-2xl mx-auto mt-12 pt-8 border-t border-white/5">
              <p className="text-white/40 italic text-sm">
                "{quote.text}"
              </p>
              <p className="text-white/30 text-xs mt-2">— {quote.author}</p>
            </div>
          )}
        </div>
      );
    }

    // Step 7: Email
    if (step === 7) {
      const quote = getQuoteForStep();
      return (
        <div className="space-y-8 animate-fadeIn">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Enter your email
            </h2>
            <div className="space-y-4">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full bg-black/30 border border-white/10 focus:border-white/30 px-6 py-5 text-lg text-white placeholder:text-white/40 outline-none transition-colors rounded-xl"
                autoFocus
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {!loading && (
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
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full font-['Geist_Mono'] text-sm tracking-[2px] uppercase transition-all duration-300 inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Generate Audit
                <ArrowRight size={16} />
              </button>
            </div>
          )}
          
          {quote && (
            <div className="text-center max-w-2xl mx-auto mt-12 pt-8 border-t border-white/5">
              <p className="text-white/40 italic text-sm">
                "{quote.text}"
              </p>
              <p className="text-white/30 text-xs mt-2">— {quote.author}</p>
            </div>
          )}
        </div>
      );
    }

    // Step 8: Results
    if (step === 8) {
      return (
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span className="text-xs text-white/60 uppercase tracking-wider">AI Analysis Complete</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-white mb-2">{getFocusTitle()} for {formData.companyName}</h2>
            <p className="text-white/50">Sent to {formData.email}</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8">
            <div className="prose prose-invert max-w-none">
              <div 
                className="text-white/70 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ 
                  __html: auditResult
                    .replace(/###\s*/g, '')
                    .replace(/\*\*/g, '')
                    .replace(/\n/g, '<br />') 
                }}
              />
            </div>
          </div>

          {/* Action Containers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {/* Train with GTM Agent */}
            <a
              href="https://chatgpt.com/g/g-6882e5fd56e88191a96f63eb150ee89e-idea-gtm-funnel"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gradient-to-br from-emerald-600/20 to-emerald-700/10 hover:from-emerald-600/30 hover:to-emerald-700/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl p-6 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white">Train with GTM Agent</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Dive deeper with our AI-powered GTM strategy assistant to refine your funnel and positioning.
              </p>
              <div className="absolute top-3 right-3">
                <ArrowRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>

            {/* Download Your Audit */}
            <button
              onClick={() => {
                // Create a downloadable version of the audit
                const blob = new Blob([auditResult], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${formData.companyName}-${formData.focusArea}-audit.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-blue-700/10 hover:from-blue-600/30 hover:to-blue-700/20 border border-blue-500/30 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white">Download Your Audit</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Save a copy of your personalized audit report to reference and share with your team.
              </p>
              <div className="absolute top-3 right-3">
                <Download className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>

            {/* Book Free Consultation */}
            <button
              onClick={() => onNavigate('inquiry')}
              className="group relative overflow-hidden bg-gradient-to-br from-orange-600/20 to-orange-700/10 hover:from-orange-600/30 hover:to-orange-700/20 border border-orange-500/30 hover:border-orange-500/50 rounded-xl p-6 transition-all duration-300 text-left"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-white">Schedule Meeting</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Book a free consultation with one of our specialists to dive deeper into your results.
              </p>
              <div className="absolute top-3 right-3">
                <Calendar className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/5">
            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  focusArea: '',
                  companyName: '',
                  industry: '',
                  website: '',
                  targetAudience: '',
                  currentChallenges: '',
                  competitors: '',
                  uniqueValue: '',
                  goals: '',
                  currentEfforts: '',
                  email: '',
                });
                setAuditResult('');
              }}
              className="flex-1 px-8 py-3 bg-transparent hover:bg-white/5 border border-white/10 text-white/60 hover:text-white transition-all text-sm"
            >
              Free Consultation Call and Advanced Audit
            </button>
          </div>
        </div>
      );
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.focusArea !== '';
      case 2:
        return formData.companyName.trim() !== '';
      case 3:
        return formData.industry.trim() !== '';
      case 4:
        return true; // Website is optional
      case 5:
        return formData.targetAudience.trim() !== '';
      case 6:
        return formData.goals.trim() !== '';
      case 7:
        return formData.email.trim() !== '' && formData.email.includes('@');
      default:
        return false;
    }
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-2 border-white/20 animate-spin" style={{ animationDuration: '3s' }}></div>
            <div className="absolute inset-2 border-2 border-white/40 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-white/60 text-sm tracking-wider">thinking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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

      <div className="min-h-screen flex flex-col">
        {/* X button - absolute top left */}
        <button
          onClick={() => onNavigate('home')}
          className="absolute top-6 left-6 text-white/40 hover:text-white/60 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        {step > 1 && step < 8 && (
          <div className="px-6 pt-20">
            <div className="max-w-2xl mx-auto">
              <div className="h-1 bg-white/5 overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 transition-all duration-500"
                  style={{ width: `${((step - 1) / 6) * 100}%` }}
                />
              </div>
              <div className="text-center mt-4 text-xs text-white/40 uppercase tracking-wider">
                Step {step - 1} of 6
              </div>
            </div>
          </div>
        )}
        
        {/* Spacing for first step */}
        {step === 1 && (
          <div className="pt-20" />
        )}

        {/* Content */}
        <div className="flex-1 px-6 py-16 flex items-center justify-center">
          <div className="max-w-3xl mx-auto w-full">
            {renderStep()}
          </div>
        </div>

        {step === 8 && (
          <div className="px-6 py-8">
            <div className="max-w-2xl mx-auto text-center text-xs text-white/40">
              <p>Want to implement these strategies? Let's talk.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}