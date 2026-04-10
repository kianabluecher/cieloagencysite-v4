import { Check, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Moodboard2Props {
  onNavigate: (page: string) => void;
}

export function Moodboard2({ onNavigate }: Moodboard2Props) {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [specialistDomain, setSpecialistDomain] = useState('');
  const [experience, setExperience] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [preferredApproach, setPreferredApproach] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleCompleteSubmission = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/consulting-specialist/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            name,
            specialist_domain: specialistDomain,
            experience,
            linkedin_url: linkedinUrl,
            preferred_approach: preferredApproach,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Error submitting Consulting Specialist signup:', error);
        alert('Failed to submit. Please try again.');
        return;
      }

      console.log('✅ Consulting Specialist signup submitted successfully');
      
      // Close modal and reset form
      setShowSignupModal(false);
      setSignupStep(1);
      setEmail('');
      setName('');
      setSpecialistDomain('');
      setExperience('');
      setLinkedinUrl('');
      setPreferredApproach('');
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="relative w-full max-w-lg bg-[#0A0A0B] rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          {/* Header Bar */}
          <div className="bg-black/50 backdrop-blur-sm px-8 py-4 rounded-t-3xl border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-cyan-400 tracking-wider font-['Geist_Mono'] text-sm">CIELO</div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/50 font-['Geist_Mono']">Step {signupStep} / 3</div>
                <button 
                  onClick={() => {
                    setShowSignupModal(false);
                    setSignupStep(1);
                    setEmail('');
                    setName('');
                    setSpecialistDomain('');
                    setExperience('');
                    setLinkedinUrl('');
                    setPreferredApproach('');
                  }}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={18} className="text-white/50" />
                </button>
              </div>
            </div>
          </div>

          {signupStep === 1 ? (
            // Step 1: Email & Name
            <div className="p-12">
              <div className="mb-8">
                <h1 className="text-4xl mb-4 text-white font-light">Join CIELO Collective</h1>
                <p className="text-white/60 mb-1">
                  Become a specialist consultant in our boutique network.
                </p>
                <p className="text-white/60">
                  Flexible income, steady clients, shared infrastructure.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
                />
                
                <button
                  onClick={() => setSignupStep(2)}
                  className="w-full py-3.5 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-['Geist_Mono'] text-sm tracking-wider"
                >
                  CONTINUE
                </button>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  '5-20 billable hours per week',
                  'Choose self-managed or EA-managed outreach',
                  'Competitive hourly rates + steady client flow',
                  'Autonomy in delivery, CIELO handles admin'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={16} className="text-cyan-400 mt-0.5 shrink-0" strokeWidth={3} />
                    <p className="text-sm text-white/70">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : signupStep === 2 ? (
            // Step 2: Specialist Details
            <div className="p-12">
              <div className="mb-8">
                <h1 className="text-4xl mb-4 text-white font-light">Your Expertise</h1>
                <p className="text-white/60">
                  Tell us about your specialist domain and experience.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm text-white/70 mb-2 font-['Geist_Mono']">Specialist Domain</label>
                  <div className="space-y-2">
                    {[
                      { value: 'growth-marketing', label: 'Growth & Marketing' },
                      { value: 'revenue-sales-ops', label: 'Revenue & Sales Ops' },
                      { value: 'product-strategy', label: 'Product & Strategy' },
                      { value: 'operations-finance', label: 'Operations & Finance' },
                      { value: 'tech-automation', label: 'Tech & Automation' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSpecialistDomain(option.value)}
                        className={`w-full px-4 py-3 border rounded-lg text-left transition-all ${
                          specialistDomain === option.value
                            ? 'border-cyan-400 bg-cyan-400/10'
                            : 'border-white/20 hover:border-white/30 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            specialistDomain === option.value
                              ? 'border-cyan-400 bg-cyan-400'
                              : 'border-white/30'
                          }`}>
                            {specialistDomain === option.value && (
                              <div className="w-2 h-2 rounded-full bg-black"></div>
                            )}
                          </div>
                          <span className="text-sm text-white">{option.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2 font-['Geist_Mono']">Years of Experience</label>
                  <input
                    type="text"
                    placeholder="e.g., 7+ years"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/70 mb-2 font-['Geist_Mono']">LinkedIn Profile</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSignupStep(1)}
                  className="px-8 py-3.5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setSignupStep(3)}
                  className="flex-1 py-3.5 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-['Geist_Mono'] text-sm tracking-wider"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          ) : (
            // Step 3: Business Development Approach
            <div className="p-12">
              <div className="mb-8">
                <h1 className="text-4xl mb-4 text-white font-light">Choose Your Approach</h1>
                <p className="text-white/60">
                  How would you prefer to handle business development?
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <button
                  onClick={() => setPreferredApproach('self-managed')}
                  className={`w-full p-6 border rounded-xl text-left transition-all ${
                    preferredApproach === 'self-managed'
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-white/20 hover:border-white/30 bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      preferredApproach === 'self-managed'
                        ? 'border-cyan-400 bg-cyan-400'
                        : 'border-white/30'
                    }`}>
                      {preferredApproach === 'self-managed' && (
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-2 font-medium">Self-Managed Outreach</h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Run a simple LinkedIn routine yourself (30-45 min/day). We provide qualified leads, message templates, and tracking tools.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPreferredApproach('ea-managed')}
                  className={`w-full p-6 border rounded-xl text-left transition-all ${
                    preferredApproach === 'ea-managed'
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-white/20 hover:border-white/30 bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      preferredApproach === 'ea-managed'
                        ? 'border-cyan-400 bg-cyan-400'
                        : 'border-white/30'
                    }`}>
                      {preferredApproach === 'ea-managed' && (
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white mb-2 font-medium">EA-Managed Outreach</h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Our EA team handles LinkedIn outreach using your profile. You focus purely on consulting and closing warm leads.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSignupStep(2)}
                  className="px-8 py-3.5 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteSubmission}
                  disabled={isSubmitting || !preferredApproach}
                  className="flex-1 py-3.5 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-['Geist_Mono'] text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
                </button>
              </div>

              <p className="text-xs text-white/40 leading-relaxed mt-4">
                After submission, our team will review your application and reach out within 48 hours to discuss next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    )}

    <div className="min-h-screen bg-[#0A0A0B]">

      {/* Hero Section with Dark Gradient */}
      <section className="relative px-4 md:px-6 pt-32 pb-20">
        <div className="relative w-full max-w-[1400px] mx-auto">
          {/* Dark Gradient Background Container */}
          <div className="relative bg-gradient-to-b from-black/50 via-[#1a1a1f] to-cyan-500/10 rounded-[40px] px-8 md:px-16 py-20 md:py-32 overflow-hidden shadow-2xl border border-white/10">
            {/* Grain texture */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              {/* Badge above title */}
              <button className="inline-flex items-center gap-2 bg-cyan-400/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors">
                <span className="text-sm text-cyan-400 font-['Geist_Mono'] tracking-wider">BOUTIQUE CONSULTING COLLECTIVE</span>
              </button>

              <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight bg-gradient-to-br from-white via-white/90 to-cyan-400 bg-clip-text text-transparent" style={{ fontWeight: 500 }}>
                Join Our Network of Senior Specialists
              </h1>
              
              <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
                Combine high-impact consulting work with strategic business development.<br />
                Flexible income, steady clients, shared infrastructure.
              </p>

              <button 
                onClick={() => setShowSignupModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition-colors shadow-lg font-['Geist_Mono'] text-sm tracking-wider"
              >
                APPLY NOW
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/50 font-['Geist_Mono']">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 8L7.5 9.5L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>5-20 hrs/week • Competitive rates • Autonomy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="px-6 py-20 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-center">
            <p className="text-lg text-white/70 leading-relaxed font-light">
              CIELO is building a network of 5 specialists who combine high-impact consulting with business development.
            </p>
            
            <p className="text-lg text-white/70 leading-relaxed font-light">
              You're not a traditional SDR. You're a consultant and business representative who drives revenue through expertise and relationships.
            </p>

            <div className="pt-8">
              <p className="text-2xl text-white font-light">
                Deliver strategic work <span className="text-white/40">{'>'}</span> Build your network <span className="text-white/40">{'>'}</span> Scale your income, <span className="italic text-cyan-400">on your terms.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Benefits */}
      <section className="bg-[#0A0A0B] w-full pt-24 pr-6 pb-24 pl-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex mb-10 gap-x-2 gap-y-2 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            <span className="text-xs font-['Geist_Mono'] font-medium text-white/50 uppercase tracking-wide">The CIELO Difference</span>
          </div>

          {/* Two Card Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: Consulting First */}
            <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-10 md:p-12 relative overflow-hidden border border-white/10 hover:border-cyan-400/30 transition-all duration-500 flex flex-col justify-between min-h-[500px]">
              <div className="relative z-10">
                <span className="text-cyan-400 font-['Geist_Mono'] text-[10px] uppercase tracking-widest font-bold mb-6 block">Primary Focus</span>
                <h3 className="text-4xl font-light text-white tracking-tight mb-6">High-Impact Consulting</h3>
                <p className="leading-relaxed text-sm text-white/60 max-w-sm">
                  5-20 billable hours per week delivering strategic work in your domain. You own delivery, we handle contracts, invoicing, and coordination.
                </p>
              </div>

              {/* Decorative dots */}
              <div className="absolute bottom-[-50px] right-[-50px] w-[300px] h-[300px] pointer-events-none">
                <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
                <div className="absolute top-40 left-40 w-2 h-2 bg-cyan-400/20 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-60 left-60 w-2 h-2 bg-cyan-400/10 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>

            {/* Card 2: Choose Your Approach */}
            <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-10 md:p-12 relative overflow-hidden border border-white/10 hover:border-cyan-400/30 transition-all duration-500 flex flex-col min-h-[500px]">
              <div className="relative z-10 mb-12">
                <span className="text-cyan-400 font-['Geist_Mono'] text-[10px] uppercase tracking-widest font-bold mb-6 block">Flexibility</span>
                <h3 className="text-4xl font-light text-white tracking-tight mb-6">Two Business Models</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                  Choose between self-managed LinkedIn outreach (30-45 min/day) or EA-managed approach while you focus purely on consulting.
                </p>
              </div>

              {/* Custom Process List */}
              <div className="relative flex-1 flex flex-col justify-end">
                <div className="space-y-3">
                  {/* Option 1 */}
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span className="text-sm text-white/80">Self-Managed Outreach</span>
                    </div>
                    <span className="text-sm text-cyan-400 font-['Geist_Mono']">A</span>
                  </div>

                  {/* Option 2 */}
                  <div className="flex bg-white/5 border-white/10 border rounded-2xl pt-4 pr-4 pb-4 pl-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span className="text-sm text-white/80">EA Team Handles It</span>
                    </div>
                    <span className="text-sm text-cyan-400 font-['Geist_Mono']">B</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Domains */}
      <section className="px-6 py-32 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-white mb-4 font-light">
              Your Specialist Area
            </h2>
            <p className="text-white/60 text-lg">Choose where you're strongest</p>
          </div>

          {/* Domains Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Growth & Marketing',
                description: 'Demand gen, content, paid acquisition, positioning'
              },
              {
                title: 'Revenue & Sales Ops',
                description: 'Sales process, pipeline, CRM, forecasting'
              },
              {
                title: 'Product & Strategy',
                description: 'PMF, roadmaps, pricing, GTM'
              },
              {
                title: 'Operations & Finance',
                description: 'Modeling, unit economics, processes, fundraising'
              },
              {
                title: 'Tech & Automation',
                description: 'Workflows, AI, martech, integrations'
              },
              {
                title: 'Multiple Domains',
                description: 'Cross-functional expertise across areas'
              }
            ].map((domain, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl text-white mb-3 font-light">{domain.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{domain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-32 bg-[#0A0A0B]">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-white mb-4 font-light">
              A Simple, Clear Process
            </h2>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-8 flex flex-col border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
              <div className="mb-6">
                <span className="text-cyan-400 font-['Geist_Mono'] text-xs tracking-wider">STEP 01</span>
                <h3 className="text-2xl text-white mt-3 mb-4 font-light">Apply & Interview</h3>
                <p className="text-white/60 leading-relaxed">
                  Submit your application, share your expertise, and have a conversation with our team about fit and expectations.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-8 flex flex-col border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
              <div className="mb-6">
                <span className="text-cyan-400 font-['Geist_Mono'] text-xs tracking-wider">STEP 02</span>
                <h3 className="text-2xl text-white mt-3 mb-4 font-light">Onboarding & Setup</h3>
                <p className="text-white/60 leading-relaxed">
                  Choose your business model (self-managed or EA-managed outreach), set up your profile, and get qualified lead lists.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-8 flex flex-col border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
              <div className="mb-6">
                <span className="text-cyan-400 font-['Geist_Mono'] text-xs tracking-wider">STEP 03</span>
                <h3 className="text-2xl text-white mt-3 mb-4 font-light">Start Consulting</h3>
                <p className="text-white/60 leading-relaxed">
                  Begin taking discovery calls, delivering strategic work, and building relationships with high-value clients.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-[40px] p-8 flex flex-col border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
              <div className="mb-6">
                <span className="text-cyan-400 font-['Geist_Mono'] text-xs tracking-wider">STEP 04</span>
                <h3 className="text-2xl text-white mt-3 mb-4 font-light">Scale Your Impact</h3>
                <p className="text-white/60 leading-relaxed">
                  Grow your billable hours, expand your network, and leverage cross-referrals within the CIELO collective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="px-6 py-32 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-white mb-6 font-light">What Success Looks Like</h2>
            <p className="text-white/60 text-lg">Dual focus: consulting quality + business development</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Consulting Metrics */}
            <div>
              <h3 className="text-cyan-400 font-['Geist_Mono'] text-xs tracking-wider mb-6">CONSULTING (PRIMARY)</h3>
              <div className="space-y-4">
                {[
                  '5-20 billable hours/week',
                  'High-quality deliverables',
                  'Client satisfaction & impact',
                  'Measurable results for clients'
                ].map((metric, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={16} className="text-cyan-400 mt-0.5 shrink-0" strokeWidth={3} />
                    <p className="text-white/80">{metric}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BD Metrics */}
            <div>
              <h3 className="text-cyan-400 font-['Geist_Mono'] text-xs tracking-wider mb-6">BUSINESS DEVELOPMENT (SUPPORTING)</h3>
              <div className="space-y-4">
                {[
                  '2-4 warm conversations/week',
                  '2-3 qualified opportunities/month',
                  'Steady network growth',
                  'Cross-referrals within collective'
                ].map((metric, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={16} className="text-cyan-400 mt-0.5 shrink-0" strokeWidth={3} />
                    <p className="text-white/80">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl text-white mb-6 font-light">
            Ready to Join?
          </h2>
          <p className="text-xl text-white/60 mb-10 leading-relaxed">
            Apply now to become part of CIELO's boutique consulting collective.
          </p>
          <button 
            onClick={() => setShowSignupModal(true)}
            className="inline-flex items-center gap-2 px-10 py-5 bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition-colors shadow-lg font-['Geist_Mono'] text-sm tracking-wider"
          >
            APPLY NOW
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <p className="text-white/40 text-sm mt-8">
            Limited to 5 specialists across all domains
          </p>
        </div>
      </section>

    </div>
    </>
  );
}
