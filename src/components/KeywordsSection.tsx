import keywordsBg from 'figma:asset/c771639b3bd6d4fb724a29a5e92449717dad88fe.png';

export function KeywordsSection() {
  const keywords = [
    { text: 'Brand Strategy', top: '8%', left: '12%' },
    { text: 'Social Media', top: '22%', left: '25%' },
    { text: 'Development', top: '32%', left: '18%' },
    { text: 'PR & Media', top: '45%', left: '8%' },
    { text: 'Influencer Marketing', top: '56%', left: '15%' },
    { text: 'Video & Motion', top: '68%', left: '22%' },
    { text: 'Photography', top: '78%', left: '12%' },
    { text: 'Ventures', top: '18%', left: '48%' },
    { text: 'AI Content', top: '28%', left: '58%' },
    { text: 'CGI & 3D', top: '40%', left: '52%' },
    { text: 'Print Collateral', top: '52%', left: '50%' },
    { text: 'Event Branding', top: '62%', left: '56%' },
    { text: 'Email Marketing', top: '72%', left: '48%' },
    { text: 'Packaging Design', top: '15%', left: '78%' },
    { text: 'Consulting', top: '30%', left: '85%' },
    { text: 'Creative Direction', top: '50%', left: '82%' },
    { text: 'Growth Systems', top: '70%', left: '88%' }
  ];

  return (
    <section className="relative px-6 py-48 md:py-64 overflow-hidden bg-neutral-950">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${keywordsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-neutral-950/80" />

      {/* Top Gradient Fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-neutral-950 to-transparent z-[5]" />

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-[5]" />

      {/* Content - Scattered Layout */}
      <div className="relative z-10 max-w-[1800px] mx-auto h-full min-h-[600px]">
        {keywords.map((keyword, index) => (
          <div 
            key={index} 
            className="absolute"
            style={{
              top: keyword.top,
              left: keyword.left,
            }}
          >
            <p className="font-['Geist_Mono'] text-white/40 hover:text-white/80 transition-colors duration-300 text-xs md:text-sm tracking-[2px] uppercase whitespace-nowrap">
              {keyword.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}