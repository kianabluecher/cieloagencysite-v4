import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  image?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  variant?: 'dark' | 'light';
}

export function TestimonialsCarousel({ testimonials, variant = 'dark' }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const isDark = variant === 'dark';

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className={`rounded-2xl p-8 md:p-12 ${
                isDark 
                  ? 'bg-gradient-to-br from-[#1a5f9f] via-[#2873b8] to-[#4b93d4]' 
                  : 'bg-white border border-zinc-200'
              }`}>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1 space-y-6">
                    <div className={`font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase ${
                      isDark ? 'text-white/60' : 'text-zinc-500'
                    }`}>
                      {testimonial.company}
                    </div>
                    <p className={`text-xl md:text-2xl leading-relaxed ${
                      isDark ? 'text-white' : 'text-zinc-900'
                    }`}>
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className={`${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        {testimonial.author}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-white/70' : 'text-zinc-600'}`}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  {testimonial.image && (
                    <div className="w-full md:w-80 h-80 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? isDark ? 'w-8 bg-white' : 'w-8 bg-zinc-900'
                  : isDark ? 'w-2 bg-white/30' : 'w-2 bg-zinc-300'
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className={`p-2 rounded-full transition-colors ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className={`p-2 rounded-full transition-colors ${
              isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
