export function IndustriesSection() {
  const industries = [
    "FinTech",
    "SaaS",
    "E-commerce",
    "Healthcare",
    "Real Estate",
    "Professional Services",
    "Tech Startups",
    "Investment Funds"
  ];

  return (
    <section className="px-6 py-32 border-t border-[#1f2228]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl text-white tracking-tight mb-16 text-center">
          Industries We Serve
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="p-8 border border-[#1f2228] rounded-lg text-center hover:border-[rgba(255,255,255,0.25)] transition-colors"
            >
              <p className="text-white text-lg">{industry}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
