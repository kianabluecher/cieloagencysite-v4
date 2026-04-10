export function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Businesses Served"
    },
    {
      number: "$2M+",
      label: "Monthly Ad Spend Managed"
    },
    {
      number: "25+",
      label: "Countries Worldwide"
    }
  ];

  return (
    <section className="px-6 py-32 border-t border-[#1f2228]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl md:text-7xl text-white mb-4">
                {stat.number}
              </div>
              <p className="text-xl text-[#7d8187]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}