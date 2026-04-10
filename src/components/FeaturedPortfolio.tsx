import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import rockHillImage from 'figma:asset/a88fa71660939c456d8b25e1191b515eeb6737f3.png';
import whitestoneImage from 'figma:asset/8fea8a212781eed1a41f227cafc149a3292624dd.png';
import bikeImage from 'figma:asset/28a2eb3af4477562e05780bbc38dd8c25eb938ec.png';
import parcerosImage from 'figma:asset/2ab01c5c5d19bbab257ddce4b4cb857fb7e24b18.png';

const portfolioItems = [
  {
    id: 1,
    title: 'Rock Hill Capital',
    category: 'Brand Identity & Web Development',
    image: rockHillImage,
  },
  {
    id: 2,
    title: 'Whitestone & Co',
    category: 'Investment Fund Website',
    image: whitestoneImage,
  },
  {
    id: 3,
    title: 'Vanbike',
    category: 'E-Commerce & Web Design',
    image: bikeImage,
  },
  {
    id: 4,
    title: 'Parceros Capital',
    category: 'Real Estate Investment Platform',
    image: parcerosImage,
  },
];

export function FeaturedPortfolio() {
  return (
    <section className="px-3 py-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Portfolio Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/11] mb-4">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Text Below - No Overlay */}
              <div>
                <h3 className="text-white text-base mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm">
                  {item.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}