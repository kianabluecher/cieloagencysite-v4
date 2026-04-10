import { ArrowRight, Shield, Eye, AlertTriangle, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SEOHead } from '../SEOHead';
import { Button } from '../ui/button';
import { useEffect } from 'react';

interface BrandReputationManagementSouthFloridaProps {
  onNavigate: (page: string) => void;
}

export function BrandReputationManagementSouthFlorida({ onNavigate }: BrandReputationManagementSouthFloridaProps) {
  const faqs = [
    {
      question: "Isn't reputation management just SEO suppression?",
      answer: "SEO suppression without authority infrastructure creates temporary results. Strategic reputation management builds genuine credibility that naturally dominates search results while creating business development advantages beyond search rankings."
    },
    {
      question: "What if negative information is factually accurate?",
      answer: "Strategic reputation architecture doesn't hide truth. It provides context, demonstrates growth, and builds current authority that outweighs historical information. The framework creates balanced perception rather than artificial suppression."
    },
    {
      question: "How long does reputation repair take?",
      answer: "Initial results typically appear within 90-120 days. Complete reputation transformation requires 12-18 months for sustainable authority infrastructure. Timeline varies based on damage severity and competitive dynamics."
    },
    {
      question: "How is this different from crisis PR?",
      answer: "Crisis PR addresses acute reputation events. Strategic reputation management builds proactive infrastructure preventing crises and maintaining ongoing business development advantage. One responds to damage. The other prevents it."
    },
    {
      question: "Does reputation work actually impact business development?",
      answer: "Decision-makers research before meetings. Positive search results accelerate trust-building and deal progression. Negative results eliminate opportunities before conversations begin. Reputation infrastructure directly impacts pipeline velocity and close rates."
    },
    {
      question: "How do we measure reputation management success?",
      answer: "Quantitative metrics include search result positioning, sentiment analysis, media placement reach, and traffic to owned properties. Business metrics include deal velocity, partnership success rates, and prevented opportunity loss."
    }
  ];

  const tiers = [
    {
      name: "Tier 1: Reputation Assessment",
      price: "$25K",
      description: "Complete digital footprint audit, vulnerability analysis, threat mapping, strategic recommendations.",
      timeline: "2-3 weeks"
    },
    {
      name: "Tier 2: Authority Infrastructure",
      price: "$95K",
      description: "Assessment plus authority development. Thought leadership creation, media placement, owned property development, initial deployment.",
      timeline: "4-6 months"
    },
    {
      name: "Tier 3: Complete Reputation Program",
      price: "$185K",
      description: "Authority infrastructure plus monitoring and response systems. 24/7 threat detection, rapid response protocols, ongoing content development.",
      timeline: "6-12 months"
    },
    {
      name: "Tier 4: Crisis Response Retainer",
      price: "$45K",
      description: "Immediate response capability for acute reputation threats. Emergency protocols, rapid deployment, media management, legal coordination.",
      timeline: "Ongoing"
    },
    {
      name: "Tier 5: Ongoing Monitoring",
      price: "$8.5K-$15K/month",
      description: "Continuous monitoring, regular authority building, quarterly threat assessment, maintenance of reputation infrastructure.",
      timeline: "Ongoing"
    }
  ];

  const caseStudies = [
    {
      title: "Private Equity Executive",
      challenge: "Managing partner facing Google results dominated by 8-year-old litigation mentions. Negative content blocking board appointments and LP relationships despite case resolution.",
      solution: "Built authority infrastructure through thought leadership, industry contributions, and strategic media placement. Systematic content development establishing expertise narrative.",
      results: [
        { metric: "9 → 1", label: "Negative results in top 20 (14 months)" },
        { metric: "3", label: "New board appointments (previously blocked)" },
        { metric: "$350M", label: "Fund close (previously stalled)" },
        { metric: "Unmeasurable", label: "ROI (career trajectory restored)" }
      ]
    },
    {
      title: "Family Office Principal",
      challenge: "Competitive attack site ranking position 3 for principal's name. Fabricated controversy blocking $47M real estate partnership and causing LP withdrawals.",
      solution: "Authority infrastructure development combined with legal pressure. Multi-channel credibility building while pursuing defamation claims. Strategic content replacing attack narrative.",
      results: [
        { metric: "3 → 17", label: "Attack site position (11 months)" },
        { metric: "$8.2M", label: "AUM recovered (from withdrawals)" },
        { metric: "$22M", label: "Pipeline generated (previously blocked)" },
        { metric: "67:1", label: "ROI ($127K → $8.5M+ measured)" }
      ]
    }
  ];

  useEffect(() => {
    // Add FAQ Schema (JSON-LD) for SEO
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      };

      const scriptId = 'faq-schema-jsonld';
      let scriptElement = document.getElementById(scriptId);
      
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      
      scriptElement.textContent = JSON.stringify(faqSchema);

      // Cleanup
      return () => {
        const element = document.getElementById(scriptId);
        if (element && document.head.contains(element)) {
          document.head.removeChild(element);
        }
      };
    }
  }, [faqs]);

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <SEOHead
        title="Brand Reputation Management South Florida | Executive & Family Office Protection | CIELO Agency"
        description="Protect business value through proactive reputation infrastructure. Systematic reputation architecture for executives, firms, and family offices."
        keywords="reputation management, brand protection, south florida, family office, executive reputation, crisis management, online reputation"
        url="https://www.cielo.agency/brand-reputation-management-south-florida"
      />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -top-32">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1736939666660-d4c776e0532c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXB1dGF0aW9uJTIwYnVzaW5lc3MlMjBleGVjdXRpdmV8ZW58MXx8fHwxNzY2NDQ5MzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Brand Reputation Management" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0A0A0B]/80 to-[#0A0A0B]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="font-['Geist_Mono'] text-cyan-400 text-xs tracking-[2px] uppercase mb-6">
            Brand Reputation Management South Florida
          </p>
          <h1 className="text-5xl md:text-7xl tracking-tight mb-6">
            <span className="block text-white">Protect Business Value</span>
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Through Proactive Reputation Infrastructure
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Systematic reputation architecture that prevents crises, accelerates deals, and maintains institutional credibility. For executives, firms, and family offices where reputation directly impacts business development.
          </p>
        </div>
      </section>

      {/* The Reputation Value Gap */}
      <section className="px-6 py-24 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-8 tracking-tight">The Reputation Value Gap</h2>
          <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
            <p>Search results shape business outcomes before meetings happen.</p>
            <p>A single negative article, litigation mention, or competitor attack can eliminate opportunities, stall deals, and damage relationships built over decades.</p>
            <p>The gap isn't what's true. It's what's visible when someone searches your name.</p>
            <p className="text-white">Without proactive reputation infrastructure, you're vulnerable to attacks, outdated information, and competitive positioning that undermines business development.</p>
          </div>
        </div>
      </section>

      {/* Why Reputation Damage Persists */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-16 tracking-tight text-center">
            Why Reputation Damage Persists Despite Facts
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "Reactive Crisis Response",
                description: "Responding after reputation damage appears gives attackers first-mover advantage. By the time you're defending, perception has already shifted."
              },
              {
                icon: TrendingUp,
                title: "SEO Suppression Without Authority",
                description: "Pushing down negative content without building genuine authority creates temporary fixes. Without credible content replacing negative results, suppression fails."
              },
              {
                icon: Shield,
                title: "Legal Action Limitations",
                description: "Lawsuits against publishers often amplify damage through Streisand effect. Legal remedies rarely remove content and frequently increase visibility."
              },
              {
                icon: Eye,
                title: "Platform Removal Dependency",
                description: "Relying on platforms to remove negative content places reputation control in external hands. Removal requests succeed inconsistently and resolve slowly."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-800 p-8 hover:border-cyan-400/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <item.icon className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-4 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section className="px-6 py-24 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-16 tracking-tight text-center">
            Strategic Reputation Framework
          </h2>
          <div className="space-y-6">
            {[
              {
                phase: "Phase 1: Reputation Audit",
                description: "Complete digital footprint analysis. Map all search results, social mentions, media coverage, and third-party content. Identify vulnerabilities and attack vectors."
              },
              {
                phase: "Phase 2: Authority Infrastructure Development",
                description: "Build credible content ecosystem demonstrating expertise, accomplishments, and institutional credibility. Establish owned media properties ranking for name searches."
              },
              {
                phase: "Phase 3: Monitoring and Rapid Response",
                description: "Install systematic monitoring detecting reputation threats at emergence. Deploy immediate response protocols neutralizing attacks before visibility compounds."
              },
              {
                phase: "Phase 4: Ongoing Maintenance",
                description: "Continuous authority building maintaining positive search dominance. Regular monitoring preventing reputation erosion and maintaining business development advantage."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0A0A0B] border border-zinc-800 p-8 hover:border-cyan-400/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-['Geist_Mono'] text-sm">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-3">{item.phase}</h3>
                    <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-16 tracking-tight text-center">
            Case Studies
          </h2>
          <div className="space-y-12">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 p-12">
                <p className="font-['Geist_Mono'] text-cyan-400 text-xs tracking-[2px] uppercase mb-6">
                  Case Study {idx + 1}
                </p>
                <h3 className="text-3xl md:text-4xl text-white mb-6 tracking-tight">{study.title}</h3>
                
                <div className="mb-8 space-y-4">
                  <p className="text-zinc-300"><span className="text-white">Challenge:</span> {study.challenge}</p>
                  <p className="text-zinc-300"><span className="text-white">Solution:</span> {study.solution}</p>
                </div>

                <div className="border-t border-cyan-400/20 pt-8">
                  <p className="text-cyan-400 text-sm font-['Geist_Mono'] uppercase tracking-wider mb-6">Results</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {study.results.map((result, resultIdx) => (
                      <div key={resultIdx}>
                        <p className="text-3xl text-white mb-2">{result.metric}</p>
                        <p className="text-zinc-400 text-sm">{result.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Framework */}
      <section className="px-6 py-24 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-16 tracking-tight text-center">
            Investment Framework
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier, idx) => (
              <div key={idx} className="bg-[#0A0A0B] border border-zinc-800 p-8 hover:border-cyan-400/30 transition-all">
                <div className="mb-6">
                  <h3 className="text-lg text-white mb-2">{tier.name}</h3>
                  <span className="text-3xl text-cyan-400">{tier.price}</span>
                </div>
                <p className="text-zinc-400 mb-4 leading-relaxed text-sm">{tier.description}</p>
                <p className="text-xs text-zinc-500 font-['Geist_Mono']">Timeline: {tier.timeline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-16 tracking-tight text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-800 p-8">
                <h3 className="text-xl text-white mb-4">{faq.question}</h3>
                <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Standards */}
      <section className="px-6 py-24 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-12 tracking-tight">Corporate Standards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Confidentiality Protocols",
                description: "All reputation engagements conducted under strict confidentiality. Work product protected, sources anonymized, client identities undisclosed."
              },
              {
                title: "Ethical Standards",
                description: "No fake reviews, fabricated content, or deceptive practices. All authority-building based on genuine accomplishments, expertise, and credible third-party validation."
              },
              {
                title: "Specialized Expertise",
                description: "Deep experience managing executive reputation, family office principals, professional services leaders, and high-net-worth individuals."
              },
              {
                title: "Crisis Response Capability",
                description: "24-hour monitoring and rapid response protocols for time-sensitive reputation threats requiring immediate intervention."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0A0A0B] border border-zinc-800 p-6">
                <h3 className="text-white mb-3 text-sm">{item.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6 tracking-tight">
            Protect Your Reputation Before It's Too Late
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Schedule a confidential reputation audit to assess your digital footprint.
          </p>
          <Button
            onClick={() => onNavigate('lets-talk')}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-6 text-lg group"
          >
            Schedule Reputation Audit
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
}