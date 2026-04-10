import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface FAQItem {
  question: string;
  items: string[];
}

const faqData: FAQItem[] = [
  {
    question: "Application Process",
    items: [
      "Submit your application through our careers portal",
      "Initial screening call with our talent team (15-30 minutes)",
      "Portfolio/work review and technical assessment",
      "Team interview with department leads and potential colleagues",
      "Final culture fit conversation with leadership",
    ],
  },
  {
    question: "Work Environment",
    items: [
      "100% remote-first with flexible hours",
      "Async-first communication culture",
      "Collaborative tools: Slack, Notion, Figma, Linear",
      "Regular team sync meetings and optional co-working sessions",
      "Annual team retreats and virtual social events",
    ],
  },
  {
    question: "Growth & Development",
    items: [
      "Learning budget for courses, conferences, and certifications",
      "Mentorship programs with senior team members",
      "Cross-functional project opportunities",
      "Regular performance reviews and career development planning",
      "Access to industry-leading tools and resources",
    ],
  },
  {
    question: "Compensation & Benefits",
    items: [
      "Competitive salary based on experience and market rates",
      "Performance-based bonuses and incentives",
      "Flexible PTO policy with encouraged time off",
      "Health and wellness benefits (where applicable)",
      "Equipment budget for home office setup",
    ],
  },
];

export function JobsFAQ() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative bg-black px-6 py-32 overflow-hidden">
      {/* Grain/Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-24">
          <p className="text-zinc-500 text-sm tracking-[0.5px] uppercase mb-6">
            03 /
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight max-w-3xl">
            Frequently Asked
            <br />
            Questions
          </h2>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column - Tab List */}
          <div className="lg:col-span-5">
            <div className="space-y-0 sticky top-8">
              {faqData.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left py-6 border-b transition-all ${
                    index === 0 ? "border-t" : ""
                  } ${
                    activeTab === index
                      ? "border-white/20"
                      : "border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`text-lg transition-colors ${
                        activeTab === index
                          ? "text-white"
                          : "text-zinc-500"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        activeTab === index
                          ? "bg-white scale-100"
                          : "bg-zinc-700 scale-75"
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Tab Content */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              {/* Tab Title */}
              <div>
                <p className="text-zinc-500 text-[10px] tracking-[0.5px] uppercase mb-3">
                  {faqData[activeTab].question}
                </p>
                <h3 className="text-lg text-white">
                  Everything you need to know about{" "}
                  {faqData[activeTab].question.toLowerCase()}.
                </h3>
              </div>

              {/* Items List */}
              <div className="space-y-0">
                {faqData[activeTab].items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 py-4 border-b border-white/5 last:border-b-0"
                  >
                    <ChevronRight
                      size={16}
                      className="text-zinc-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-zinc-400 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}