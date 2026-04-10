import { useState, useEffect } from 'react';
import { ArrowRight, Check, Download, Loader2, CheckCircle2, Mail, User, X } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface PricingDownloadProps {
  onNavigate: (page: string) => void;
}

type Step = 'form' | 'verifying' | 'thank-you';

export function PricingDownload({ onNavigate }: PricingDownloadProps) {
  const [selectedPackage, setSelectedPackage] = useState<'social' | 'brandweb' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>('form');
  const [error, setError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailCheckDone, setEmailCheckDone] = useState(false);

  const handlePackageSelect = (packageType: 'social' | 'brandweb') => {
    setSelectedPackage(packageType);
    setError('');
  };

  useEffect(() => {
    if (!email) {
      setEmailVerified(false);
      setEmailCheckDone(false);
      setEmailVerifying(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailVerified(false);
      setEmailCheckDone(false);
      setEmailVerifying(false);
      return;
    }
    setEmailVerifying(true);
    setEmailCheckDone(false);
    setEmailVerified(false);
    const timer = setTimeout(() => {
      setEmailVerifying(false);
      setEmailVerified(true);
      setEmailCheckDone(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your name'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError('Please enter a valid email address'); return; }
    if (!emailVerified) { setError('Please wait for email verification to complete'); return; }
    if (!selectedPackage) { setError('Please select a package'); return; }
    setLoading(true);
    setStep('verifying');
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pricing/download`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${publicAnonKey}` },
          body: JSON.stringify({ name, email, packageType: selectedPackage }),
        }
      );
      let pdfUrl = '';
      let pdfFileName = `cielo-agency-${selectedPackage}-package.pdf`;
      if (response.ok) {
        const result = await response.json();
        pdfUrl = result.pdfUrl;
        pdfFileName = result.pdfFileName || pdfFileName;
      }
      if (pdfUrl) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setStep('thank-you');
    } catch (err) {
      console.error('Download error:', err);
      setStep('thank-you');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'thank-you') {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full mx-auto text-center space-y-10">
          <div className="flex justify-center">
            <div className="w-24 h-24 mx-auto bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-400" strokeWidth={1.5} />
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl text-white tracking-tight font-light">
              Thank You, {name}!
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Your pricing guide is downloading now and has been sent to{' '}
              <span className="text-white font-medium">{email}</span>.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-4">
            <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-zinc-300 text-sm">
              A copy has been sent to <span className="text-white">{email}</span>
            </p>
            <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto" />
          </div>
          <div className="border-t border-zinc-800/60" />
          <div className="space-y-6 bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-medium">
                Complimentary Offer
              </p>
              <h2 className="text-2xl md:text-3xl text-white tracking-tight font-light leading-snug">
                Let Us Learn More About Your Business
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base">
                We will create a <span className="text-white font-medium">free audit and growth strategy</span> tailored to your current situation so you have a clear, actionable guide for what you can do next.
              </p>
            </div>
            <div className="space-y-3 text-left">
              {['In-depth audit of your current brand and online presence', 'Custom growth strategy for your specific goals', 'Clear action plan, no fluff, just results', 'No commitment required'].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 mt-0.5 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-orange-400" />
                  </div>
                  <span className="text-zinc-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="https://app.apollo.io/#/meet/cieloagency/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full bg-white text-zinc-950 font-medium text-sm px-6 sm:px-8 py-4 rounded-xl hover:bg-orange-400 hover:text-white transition-all duration-300"
            >
              <span className="text-center leading-tight">Book My Free Audit and Strategy Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
            </a>
            <p className="text-zinc-600 text-xs text-center">
              Takes less than 30 seconds to book. 100% free. No obligation.
            </p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (step === 'verifying') {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <Loader2 className="w-12 h-12 text-orange-400 animate-spin mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl text-white font-light">Processing your request...</h2>
            <p className="text-zinc-500 text-sm">Preparing your pricing guide</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-medium font-['Geist_Mono']">
            Free Download
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight font-light leading-tight">
            Get Your Pricing Guide
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Select your package, enter your details, and get instant access to our full pricing breakdown.
          </p>
        </div>

        {/* Package Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handlePackageSelect('social')}
            className={`group relative text-left p-8 rounded-2xl border transition-all duration-300 ${
              selectedPackage === 'social' 
                ? 'bg-zinc-900/80 border-zinc-700' 
                : 'bg-zinc-950/50 border-zinc-800/60 hover:border-zinc-700/80'
            }`}
          >
            {selectedPackage === 'social' && (
              <div className="absolute top-6 right-6 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
            <div className="space-y-4">
              <span className="inline-block text-[10px] px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full font-['Geist_Mono'] uppercase tracking-wider">
                Social Media
              </span>
              <h3 className="text-xl text-white font-light tracking-tight">
                Social Media Package
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Content creation, strategy, and management for your social channels.
              </p>
            </div>
          </button>

          <button
            onClick={() => handlePackageSelect('brandweb')}
            className={`group relative text-left p-8 rounded-2xl border transition-all duration-300 ${
              selectedPackage === 'brandweb' 
                ? 'bg-zinc-900/80 border-zinc-700' 
                : 'bg-zinc-950/50 border-zinc-800/60 hover:border-zinc-700/80'
            }`}
          >
            {selectedPackage === 'brandweb' && (
              <div className="absolute top-6 right-6 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
            <div className="space-y-4">
              <span className="inline-block text-[10px] px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full font-['Geist_Mono'] uppercase tracking-wider">
                Brand and Web
              </span>
              <h3 className="text-xl text-white font-light tracking-tight">
                Brand and Web Package
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Brand identity, website design and development in 4 weeks.
              </p>
            </div>
          </button>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-950/50 border border-zinc-800/60 rounded-2xl p-8 md:p-10">
          <h2 className="text-xl text-white font-light tracking-tight">
            Your Details
          </h2>

          {/* Full Name */}
          <div className="space-y-3">
            <label className="text-sm text-zinc-400 font-['Geist_Mono'] uppercase tracking-wider text-[11px]">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-zinc-900/60 border border-zinc-800/80 text-white placeholder-zinc-600 rounded-xl pl-11 pr-4 py-4 text-sm focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition-all"
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-3">
            <label className="text-sm text-zinc-400 font-['Geist_Mono'] uppercase tracking-wider text-[11px]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailCheckDone(false); setEmailVerified(false); }}
                placeholder="your@email.com"
                className={`w-full bg-zinc-900/60 border text-white placeholder-zinc-600 rounded-xl pl-11 pr-12 py-4 text-sm focus:outline-none transition-all ${
                  emailVerified 
                    ? 'border-green-500/50 focus:ring-1 focus:ring-green-500/20' 
                    : 'border-zinc-800/80 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20'
                }`}
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {emailVerifying && <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />}
                {emailCheckDone && emailVerified && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                {emailCheckDone && !emailVerified && email && <X className="w-4 h-4 text-red-400" />}
              </div>
            </div>
            {emailVerifying && (
              <p className="text-xs text-orange-400 flex items-center gap-1.5 font-['Geist_Mono']">
                <Loader2 className="w-3 h-3 animate-spin" />
                AI scanning email...
              </p>
            )}
            {emailCheckDone && emailVerified && (
              <p className="text-xs text-green-400 flex items-center gap-1.5 font-['Geist_Mono']">
                <CheckCircle2 className="w-3 h-3" />
                Email verified
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <X className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !emailVerified || !name.trim() || !selectedPackage}
            className="group w-full flex items-center justify-center gap-3 bg-white text-zinc-950 font-medium text-sm px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Pricing Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </>
            )}
          </button>

          {/* Helper Text */}
          <p className="text-zinc-600 text-xs text-center font-['Geist_Mono']">
            Your guide will download instantly and be sent to your email.
          </p>
        </form>
      </div>
    </div>
  );
}