import { ArrowRight, Check } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SEOHead } from '../SEOHead';
import { Button } from '../ui/button';

interface FintechBrandStrategyMiamiProps {
  onNavigate: (page: string) => void;
}

export function FintechBrandStrategyMiami({ onNavigate }: FintechBrandStrategyMiamiProps) {
  const faqs = [
    {
      question: "How does brand positioning impact FinTech sales cycles?",
      answer: "Enterprise buyers complete 67% of vendor evaluation before sales contact. Without institutional-grade brand presence during this research phase, you're eliminated before conversations begin. Strategic positioning places credibility signals where procurement committees conduct pre-sales diligence."
    },
    {
      question: "Our product is superior to competitors. Why do we need brand work?",
      answer: "Product superiority becomes relevant only after you've passed institutional credibility thresholds. Enterprise buyers use brand signals to determine which vendors warrant technical evaluation. Without passing the credibility filter, product capabilities never enter consideration."
    },
    {
      question: "Should we wait until after Series B to focus on brand positioning?",
      answer: "Pre-Series B positioning accelerates fundraising and enterprise traction simultaneously. Investors evaluate brand infrastructure as indicator of enterprise sales capability. Companies positioning before capital raises close funding faster and at higher valuations."
    },
    {
      question: "How do we maintain innovation positioning while building institutional credibility?",
      answer: "Strategic positioning balances technical innovation with institutional stability signals. The framework demonstrates cutting-edge capabilities within compliant, credible infrastructure rather than choosing between innovation and credibility."
    },
    {
      question: "Does Miami-based positioning limit national enterprise opportunities?",
      answer: "Miami's position as Latin American financial hub and growing FinTech center provides geographic credibility. Strategic positioning leverages Miami's financial infrastructure reputation while maintaining national enterprise market reach."
    },
    {
      question: "How do we compete against enterprise brands with larger marketing budgets?",
      answer: "Strategic positioning focuses resources on high-value credibility signals rather than distributed brand awareness. Systematic authority-building in targeted channels creates institutional credibility without matching enterprise marketing spend."
    }
  ];

  const tiers = [
    {
      name: "Tier 1: Strategic Positioning",
      price: "$85K",
      description: "Complete enterprise brand positioning. Institutional credibility architecture, messaging framework, authority-building roadmap.",
      timeline: "8-12 weeks"
    },
    {
      name: "Tier 2: Full Brand Development",
      price: "$185K",
      description: "Strategic positioning plus execution. Complete brand infrastructure, thought leadership development, sales integration.",
      timeline: "4-6 months"
    },
    {
      name: "Tier 3: Market Authority Program",
      price: "$285K",
      description: "Full brand development plus systematic visibility deployment. Multi-channel authority establishment, ongoing content, sales acceleration.",
      timeline: "6-12 months"
    },
    {
      name: "Tier 4: Ongoing Strategic Advisory",
      price: "$18K-$28K/month",
      description: "Continuous positioning optimization, market intelligence, competitive response, quarterly strategy refinement.",
      timeline: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <SEOHead
        title="FinTech Brand Strategy Miami | Enterprise Credibility & Sales Acceleration | CIELO Agency"
        description="Close enterprise deals faster with institutional-grade brand infrastructure. Strategic brand positioning for FinTech companies competing in institutional markets."
        keywords="fintech branding, enterprise brand strategy, institutional credibility, miami fintech, sales acceleration, brand positioning"
        url="https://www.cielo.agency/fintech-brand-strategy-miami"
      />

      {/* Hero */}
      <section className="relative px-6 pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 -top-32">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1707075891545-41b982930351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwZmluYW5jZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY2NDQ5MzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="FinTech Brand Strategy" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0A0A0B]/80 to-[#0A0A0B]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="font-['Geist_Mono'] text-cyan-400 text-xs tracking-[2px] uppercase mb-6">
            FinTech Brand Strategy Miami
          </p>
          <h1 className="text-5xl md:text-7xl tracking-tight mb-6">
            <span className="block text-white">Close Enterprise Deals Faster</span>
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              With Institutional-Grade Brand Infrastructure
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Strategic brand positioning that transforms technical capabilities into enterprise credibility. For FinTech companies competing in institutional markets.
          </p>
        </div>
      </section>

      {/* The FinTech Brand Gap */}
      <section className="px-6 py-24 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-8 tracking-tight">The FinTech Brand Gap</h2>
          <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
            <p>Your product works. Your team is exceptional. But enterprise deals stall at executive review.</p>
            <p>The gap isn't technical. It's perceptual.</p>
            <p>Banks, investment firms, and institutional buyers require brand signals that confirm you're stable, compliant, and credible before they'll consider your capabilities.</p>
            <p className="text-white">Without institutional-grade brand infrastructure, you're competing on features while losing on trust.</p>
          </div>
        </div>
      </section>

      {/* Why Traditional FinTech Marketing Fails */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-16 tracking-tight text-center">
            Why Traditional FinTech Marketing Fails in Enterprise Sales
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Product-Led Positioning",
                description: "Feature lists and technical specs don't answer the CFO's primary question: \"Is this company going to exist in three years?\""
              },
              {
                title: "Consumer Marketing Tactics",
                description: "Growth hacking, viral content, and conversion optimization don't translate to procurement committees reviewing 18-month implementation cycles."
              },
              {
                title: "Generic B2B Messaging",
                description: "\"Innovative solutions\" and \"cutting-edge technology\" are invisible in markets where regulatory compliance and institutional credibility determine vendor selection."
              },
              {
                title: "Reactive Brand Development",
                description: "Building credibility after the sales conversation has started costs deals. Enterprise buyers require visible authority before initial contact."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-800 p-8 hover:border-cyan-400/30 transition-all group">
                <h3 className="text-xl text-white mb-4 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section className="px-6 py-24 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-16 tracking-tight text-center">
            Strategic Brand Positioning Framework
          </h2>
          <div className="space-y-6">
            {[
              {
                phase: "Phase 1: Enterprise Positioning Calibration",
                description: "Audit current brand perception against institutional buyer requirements. Map credibility gaps preventing enterprise penetration."
              },
              {
                phase: "Phase 2: Institutional Brand Development",
                description: "Build compliance-focused messaging, authority-demonstrating content architecture, and credibility signals institutional buyers require."
              },
              {
                phase: "Phase 3: Market Authority Establishment",
                description: "Deploy systematic visibility across channels where enterprise decision-makers conduct pre-sales research."
              },
              {
                phase: "Phase 4: Sales Acceleration Integration",
                description: "Install brand assets directly into sales process, shortening cycles and increasing deal sizes through institutional credibility."
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

      {/* Case Study */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 p-12">
            <p className="font-['Geist_Mono'] text-cyan-400 text-xs tracking-[2px] uppercase mb-6">
              Case Study
            </p>
            <h2 className="text-3xl md:text-4xl text-white mb-6 tracking-tight">Payment Processing Platform</h2>
            
            <div className="mb-8">
              <p className="text-zinc-300 mb-4"><span className="text-white">Challenge:</span> Series B payment processing company with superior fraud detection couldn't penetrate enterprise banking despite product superiority.</p>
              <p className="text-zinc-300 mb-4"><span className="text-white">Solution:</span> Rebuilt brand positioning around regulatory compliance and institutional-grade infrastructure. Developed thought leadership demonstrating banking industry expertise.</p>
            </div>

            <div className="border-t border-cyan-400/20 pt-8">
              <p className="text-cyan-400 text-sm font-['Geist_Mono'] uppercase tracking-wider mb-6">Results</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl text-white mb-2">$12M → $31M</p>
                  <p className="text-zinc-400 text-sm">ARR Growth (18 months)</p>
                </div>
                <div>
                  <p className="text-4xl text-white mb-2">14mo → 5.9mo</p>
                  <p className="text-zinc-400 text-sm">Sales Cycle (58% reduction)</p>
                </div>
                <div>
                  <p className="text-4xl text-white mb-2">$47K → $868K</p>
                  <p className="text-zinc-400 text-sm">Average Deal Size (1,843% increase)</p>
                </div>
                <div>
                  <p className="text-4xl text-cyan-400 mb-2">131:1 ROI</p>
                  <p className="text-zinc-400 text-sm">$237K investment → $31.1M revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Framework */}
      <section className="px-6 py-24 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-white mb-16 tracking-tight text-center">
            Investment Framework
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tiers.map((tier, idx) => (
              <div key={idx} className="bg-[#0A0A0B] border border-zinc-800 p-8 hover:border-cyan-400/30 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-xl text-white">{tier.name}</h3>
                  <span className="text-2xl text-cyan-400">{tier.price}</span>
                </div>
                <p className="text-zinc-400 mb-4 leading-relaxed">{tier.description}</p>
                <p className="text-sm text-zinc-500 font-['Geist_Mono']">Timeline: {tier.timeline}</p>
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
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Regulatory Compliance Integration",
                description: "Brand development incorporating SEC, FINRA, CFPB compliance requirements for financial services marketing."
              },
              {
                title: "Specialized FinTech Expertise",
                description: "Deep experience positioning payment processing, lending, wealth management, and banking technology companies for institutional markets."
              },
              {
                title: "Strategic Partnership Network",
                description: "Established relationships with financial services legal counsel, compliance advisors, and industry analysts informing compliant brand strategy."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#0A0A0B] border border-zinc-800 p-6">
                <h3 className="text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6 tracking-tight">
            Ready to Accelerate Enterprise Sales?
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Schedule a discovery call to discuss your enterprise positioning strategy.
          </p>
          <Button
            onClick={() => onNavigate('lets-talk')}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-6 text-lg group"
          >
            Book Strategy Call
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
}
