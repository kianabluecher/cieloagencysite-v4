import { motion } from 'motion/react';
import clutchLogo from 'figma:asset/85b3958643a66648be600c4b7bd7c66233bd71e0.png';

const testimonials = [
  {
    id: 1,
    name: 'Anthony Smith',
    title: 'Founder, The 4 Color',
    quote: '"The communication and ability to take feedback were incredible. I felt like my vision was not only met but exceeded. I can\'t think of anything I would have changed about the project."',
    avatar: 't4c',
    bgColor: '#A8C5C0',
  },
  {
    id: 2,
    name: 'Kangni Guo',
    title: 'Executive Manager Ascendant',
    quote: '"What impressed us most about this company was their exceptional creativity and ability to deeply understand our brand vision. Their innovative approach to branding set them apart."',
    avatar: '✈️',
    bgColor: '#1B1464',
  },
  {
    id: 3,
    name: 'Aaron Von Kr',
    title: 'Founder, Modhaus',
    quote: '"Gec & fluminous deliv beyond my expectatio document, and more."',
    avatar: '🌲',
    bgColor: '#E86425',
  },
];

export function RealExperiences() {
  return (
    <section className="px-6 py-24 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-[44px] leading-[1.1] font-normal text-white max-w-xl">
            Real Experiences from<br />
            Brands We've Transformed
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              {/* Avatar */}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white text-xl font-bold"
                style={{ backgroundColor: testimonial.bgColor }}
              >
                {testimonial.avatar}
              </div>

              {/* Name & Title */}
              <h3 className="text-white text-lg font-medium mb-1">
                {testimonial.name}
              </h3>
              <p className="text-white/60 text-sm mb-4">
                {testimonial.title}
              </p>

              {/* Quote */}
              <p className="text-white/70 text-[15px] leading-relaxed">
                {testimonial.quote}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Clutch Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="text-white/60 text-base">Reviewed on</span>
        </motion.div>
      </div>
    </section>
  );
}