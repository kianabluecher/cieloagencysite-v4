import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Transition } from 'motion/react';
import { Play, Pause, RotateCcw, Upload } from 'lucide-react';

// Default images using some assets available in the project
import brandImage1 from 'figma:asset/af5fca3e6807fbf28e3850b4fc5961982ff5cdf1.png';
import brandImage2 from 'figma:asset/299af783af902148ba824a548b81751ca59b830f.png';
import brandImage3 from 'figma:asset/f927c2b3aaf486b214be5c9d6320919046df44b0.png';
import workflowImage1 from 'figma:asset/4704816e72d86395b0645ed1a2da23e2331bb05b.png';
import workflowImage2 from 'figma:asset/049b41e0222b3638c3d4d3d13398e7655adf61b6.png';

const INITIAL_IMAGES = [
  brandImage1,
  brandImage2,
  brandImage3,
  workflowImage1,
  workflowImage2,
];

const TRANSITION: Transition = {
  duration: 2.2,
  ease: [0.43, 0.13, 0.23, 0.96], // Custom smooth ease
};

export function GlassCarousel() {
  const [images, setImages] = useState<string[]>(INITIAL_IMAGES);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate active index (0 to N-1) based on scroll index
  // We use absolute value and modulo to handle negative scroll indices if implemented,
  // but here we primarily increment.
  const activeIndex = ((scrollIndex % images.length) + images.length) % images.length;

  // Auto-play logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setScrollIndex((prev) => prev + 1);
      }, 2500 + 1500); // Wait time (2.5s) + Transition time (1.5s) approx? 
      // Prompt says: "Interval: Pause for 2.5s between slides".
      // Usually this means 2.5s delay AFTER animation.
      // If animation is 1.5s, total cycle is 4s.
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const handleReset = () => {
    setScrollIndex(0);
    setIsPlaying(true);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Revoke old URLs if they were object URLs (simple check if blob:)
      images.forEach(url => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });

      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(newImages);
      setScrollIndex(0);
      setIsPlaying(true);
    }
  };

  // Render a window of items centered around the scrollIndex
  // We want to show enough items to fill the screen width or the container.
  // Let's render 3 items to the left and 3 to the right, plus the center.
  // Total 7 items visible (or partially visible).
  const VISIBLE_RANGE = 3; 
  
  // We create an array of relative indices: [-3, -2, -1, 0, 1, 2, 3]
  // Then we map them to absolute indices based on scrollIndex.
  const range = Array.from({ length: VISIBLE_RANGE * 2 + 1 }, (_, i) => i - VISIBLE_RANGE);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
      
      {/* Full-screen Background */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeIndex} // Key changes with active image
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "linear" }} // Smooth crossfade
          className="absolute inset-0 z-0"
        >
          {/* Blurred Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-60 scale-110"
            style={{ backgroundImage: `url(${images[activeIndex]})` }}
          />
          {/* Dimming Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Carousel Container */}
      <div className="relative z-10 w-[min(100%,90vw)] flex items-center justify-center h-[80%]" style={{ perspective: '2000px' }}>
        {/* 
          We use a layout where items are positioned absolutely or in a flex container 
          that shifts. For an infinite smooth scroll where the center item is larger,
          it's often easier to position items absolutely based on their distance from the center.
        */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {range.map((offset) => {
            const index = scrollIndex + offset;
            // Wrap index to get the actual image
            const imageIndex = ((index % images.length) + images.length) % images.length;
            const image = images[imageIndex];
            
            const isCenter = offset === 0;
            
            // Calculate 3D transforms
            const rotateY = offset * -25; // Rotate side cards
            const translateZ = isCenter ? 200 : -100 * Math.abs(offset); // Bring center forward
            
            return (
              <motion.div
                key={index} // Use absolute index as key to ensure smooth movement
                layout
                initial={false}
                animate={{
                  x: `${offset * 110}%`, // 110% spacing
                  scale: isCenter ? 3 : 1,
                  rotateY: rotateY,
                  z: translateZ,
                  zIndex: isCenter ? 10 : 10 - Math.abs(offset),
                  opacity: 1 - Math.abs(offset) * 0.35,
                  filter: isCenter ? 'blur(0px)' : `blur(${Math.abs(offset) * 1.5}px)`,
                }}
                transition={TRANSITION}
                className="absolute w-[20%] aspect-video origin-center"
                style={{ 
                  transformStyle: 'preserve-3d',
                  boxShadow: isCenter 
                    ? '0 50px 100px -20px rgba(0, 0, 0, 0.8), 0 30px 60px -30px rgba(0, 0, 0, 0.6)' 
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                 {/* Image Container with specific Border Radius */}
                 <div 
                   className="w-full h-full overflow-hidden bg-neutral-800"
                   style={{ 
                     borderRadius: '8px',
                     transformStyle: 'preserve-3d',
                   }}
                   ref={(el) => {
                     if (el) {
                        // Dynamic radius calculation - reduced to 8%
                        const height = el.offsetHeight;
                        el.style.borderRadius = `${height * 0.08}px`;
                     }
                   }}
                 >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                 </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Active Index Indicator (Optional but helpful) */}
      <div className="relative z-20 mt-6 flex gap-2">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              idx === activeIndex ? 'bg-white w-6' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

    </div>
  );
}