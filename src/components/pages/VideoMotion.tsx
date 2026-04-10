import { ImageWithFallback } from '../figma/ImageWithFallback';
import { PortfolioPreview } from '../PortfolioPreview';
import { FAQSection } from '../FAQSection';
import { videoMotionFAQs } from '../../utils/faq-data';

interface VideoMotionProps {
  onNavigate: (page: string) => void;
}

export function VideoMotion({ onNavigate }: VideoMotionProps) {
  return (
    <div className="min-h-screen bg-neutral-950">
      <section className="relative px-6 pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -top-32">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1673767297196-ce9739933932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW98ZW58MXx8fHwxNzYwODMyNDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/60 to-neutral-950"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col h-full justify-between">
          <div className="inline-block mb-12">
            <p className="font-['Geist_Mono'] text-[#7d8187] text-xs tracking-[1.4px] uppercase">
              [ Video & Motion Design ]
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-auto">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              In a world of infinite scroll,
            </span>
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              we make them stop
            </span>
          </h1>

          <div className="flex justify-end mt-8">
            <p className="text-[#7d8187] max-w-md text-right leading-relaxed text-[12px] mt-8">
              3 seconds to hook. 30 seconds to convert. We've mastered the formula.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-white mb-12">What We Produce</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { title: 'Reels that go viral (and drive traffic)', description: 'Short-form video optimized for maximum engagement' },
              { title: 'YouTube content that builds authority', description: 'Long-form videos that establish thought leadership' },
              { title: 'Product demos that close deals', description: 'Compelling demonstrations that showcase value' },
            ].map((item, index) => (
              <div key={index} className="p-12 min-h-[280px] border border-[#1f2228] group flex flex-col justify-end items-start">
                <h3 className="text-xl text-white mb-4">{item.title}</h3>
                <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-[#1f2228]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
            <h2 className="text-4xl md:text-5xl text-white tracking-tight">Our Edge</h2>
            <p className="text-xl text-[#7d8187] max-w-2xl text-[15px]">
              In-house studio in Miami. 24-hour turnaround for social. Drone capabilities. 4K/8K production. AI-enhanced editing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              { title: 'Concept Development', description: 'Strategic video planning aligned with your marketing goals and audience insights.' },
              { title: 'Production', description: 'Full-service video production with professional crew, equipment, and studio access.' },
              { title: 'Motion Graphics', description: 'Eye-catching animations and visual effects that enhance your message.' },
              { title: 'Editing & Delivery', description: 'Professional post-production with color grading, sound design, and format optimization.' },
            ].map((item, index) => (
              <div key={index} className="group border border-[#1f2228] p-8 min-h-[500px] flex flex-col justify-end items-start">
                <div className="w-full mb-8">
                  <ImageWithFallback 
                    src={[
                      "https://images.unsplash.com/photo-1758873271321-4d6b3526ef42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhdGVneSUyMHBsYW5uaW5nJTIwbWVldGluZ3xlbnwxfHx8fDE3NjA4OTkyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                      "https://images.unsplash.com/photo-1616412875447-096e932d893c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjBzdHVkaW98ZW58MXx8fHwxNzYwODk5MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                      "https://images.unsplash.com/photo-1760450076498-dcb2e15bb66b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGRldmVsb3BtZW50JTIwZGVzaWdufGVufDF8fHx8MTc2MDg5OTIwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                      "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NjA4NzE2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    ][index]}
                    alt={item.title}
                    className="w-full aspect-[21/9] object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-['Geist_Mono'] text-white/40 text-sm">0{index + 1}</span>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>
                <h3 className="text-xl text-white mb-3">{item.title}</h3>
                <p className="text-[#7d8187] group-hover:text-white leading-relaxed transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <PortfolioPreview onNavigate={onNavigate} />

      <section className="relative px-6 py-32 border-t border-[#1f2228] overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            Ready to create video that converts?
          </h2>
          <p className="text-2xl text-[#7d8187]">Let's produce content that stops the scroll.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button onClick={() => onNavigate('about')} className="px-8 py-3 rounded-full bg-white text-neutral-950 font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:bg-white/90 transition-colors">
              GET QUOTE
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 text-white font-['Geist_Mono'] text-sm tracking-[2px] uppercase hover:border-white/40 hover:bg-white/5 transition-colors flex items-center justify-center gap-3">
              SET A CALL
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={videoMotionFAQs} />
    </div>
  );
}