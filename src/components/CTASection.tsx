import { ArrowUpRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="px-6 py-32 border-t border-[#1f2228]">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-6xl text-white tracking-tight">
          Ready to join our portfolio?
        </h2>
        <p className="text-xl text-[#7d8187]">
          Let's build something exceptional together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-8 py-4 rounded-full border border-[rgba(255,255,255,0.3)] text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white hover:text-neutral-950 transition-all flex items-center gap-3 justify-center">
            Set a Call
            <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 rounded-full text-white font-['Geist_Mono'] text-sm tracking-[1.4px] uppercase hover:bg-white/10 transition-colors">
            Schedule Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
