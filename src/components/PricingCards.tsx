import { Star, ArrowUpRight } from 'lucide-react';
import ratedGreatBadge from 'figma:asset/ac684ff9738add550059c7d9ed701d72d0c52b20.png';

interface PricingCardsProps {
  onNavigate?: (page: string) => void;
}

export function PricingCards({ onNavigate }: PricingCardsProps) {
  const pricingTiers = [
    {
      badge: { text: 'YOUR BRAND QUALITY MANAGED', color: 'bg-[#e6e6e6] text-black' },
      title: 'Content Management',
      description: 'Perfect for: Startups, SaaS, Financial firms ( LinkedIn )',
      features: [
        'DESIGN, CAPTIONS, STRATEGY',
        '10 POSTS + 8 STORIES',
        '2 - 3 SOCIAL CHANNELS'
      ],
      price: 'Starting at $1,000'
    },
    {
      badge: { text: 'RECOMMENDED FOR SCALING BRANDS', color: 'bg-[#e6e6e6] text-black' },
      title: 'Social Growth',
      description: 'Ideal for: Wellness brands, Med spas, lifestyle eCom.',
      features: [
        { text: 'AI VISUALS + ANALYTICS', hasIcon: true },
        '12 POSTS, 2 REELS, 8 STORIES',
        '4 - 5 SOCIAL CHANNELS',
        'SOCIAL MEDIA GROWTH INCL'
      ],
      price: 'Starting at $1,800'
    },
    {
      badge: { text: 'RECOMMENDED FOR MULTI LOCATION OR VENTURES', color: 'bg-[#08bf7d] text-black' },
      title: 'Brand & Market Growth',
      description: 'Built for: legacy brands, public figures, multi ventures.',
      features: [
        'META ADS',
        'INFLUENCER MANAGEMENT',
        { text: '12 POSTS, 6 REELS, 10 AI IMAGES', hasIcon: true },
        'UNLIMITED CHANNELS, NEWSLETTER & BLOG',
        'PRINT & COLLATERAL',
        'SOCIAL MEDIA ENGAGEMENT & GROWTH',
        'GROWTH & CONSULTING SESSIONS'
      ],
      price: 'Starting at $5,000 +'
    }
  ];

  return (
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row gap-8 md:gap-8 justify-center items-center md:items-start pt-6 px-0 md:px-2">
        {pricingTiers.map((tier, index) => (
          <div
            key={index}
            className={`relative border border-black/10 rounded-[30px] p-4 pt-8 md:p-6 md:pt-10 bg-white flex flex-col items-center w-full ${index === 2 ? 'max-w-[380px] md:w-[400px] md:max-w-[400px]' : 'max-w-[370px] md:w-[360px] md:max-w-[360px]'}`}
          >
            {/* Badge - Overlapping the border */}
            <div className={`absolute -top-[18px] left-1/2 -translate-x-1/2 ${tier.badge.color} px-2.5 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1.5 justify-center`}>
              <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-wide whitespace-nowrap" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
                {tier.badge.text}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-center mb-1.5 md:mb-2 max-w-[280px] md:max-w-[220px]" style={{ 
              fontSize: '24px', 
              lineHeight: '1.2', 
              letterSpacing: '-0.72px',
              fontFamily: 'Helvetica Neue, sans-serif'
            }}>
              {tier.title}
            </h3>

            {/* Description */}
            <p className="text-center text-black/60 mb-4 md:mb-6 max-w-[280px] md:max-w-[220px]" style={{
              fontSize: '13px',
              lineHeight: '1.4',
              letterSpacing: '-0.4px',
              fontFamily: 'Helvetica Neue, sans-serif'
            }}>
              {tier.description}
            </p>

            {/* Features - Single Column */}
            <div className="flex flex-col gap-1.5 md:gap-2 mb-4 md:mb-6 items-center w-full">
              {tier.features.map((feature, featureIndex) => {
                const isObject = typeof feature === 'object' && feature !== null;
                const featureText = isObject ? feature.text : feature;
                const hasIcon = isObject && feature.hasIcon;

                return (
                  <div
                    key={featureIndex}
                    className="border border-black/50 rounded-full px-2.5 md:px-3 py-1 md:py-1.5 flex items-center gap-1.5 md:gap-2 justify-center whitespace-nowrap"
                  >
                    {hasIcon && (
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 flex-shrink-0">
                        <svg className="w-full h-full" fill="none" viewBox="0 0 15 15">
                          <defs>
                            <linearGradient id={`gradient-${index}-${featureIndex}`} x1="6.46824" y1="2.40385" x2="6.46824" y2="14.7115" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#20A7EB" />
                              <stop offset="1" stopColor="white" />
                            </linearGradient>
                            <linearGradient id={`gradient2-${index}-${featureIndex}`} x1="12.355" y1="0.289213" x2="12.355" y2="4.90324" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#20A7EB" />
                              <stop offset="1" stopColor="white" />
                            </linearGradient>
                          </defs>
                          <path d="M7.16211 2.40385C6.93555 2.40385 6.7168 2.49329 6.55469 2.65329L0.347656 8.84848C0.0234375 9.17175 0.015625 9.69714 0.328125 10.0298C0.648438 10.3548 1.16602 10.3625 1.49023 10.0392L7.16211 4.38252L10.0078 7.22021C10.332 7.54348 10.8574 7.54348 11.1816 7.22021C11.5059 6.89694 11.5059 6.37156 11.1816 6.04829L7.76953 2.65329C7.60742 2.49329 7.38867 2.40385 7.16211 2.40385ZM12.9395 0.289213C12.5449 0.289213 12.2363 0.597671 12.2363 0.99213V3.78444L13.6426 2.38252V0.99213C13.6426 0.597671 13.334 0.289213 12.9395 0.289213ZM0.703125 11.3509C0.308594 11.3509 0 11.6594 0 12.0538V14.0173C0 14.4118 0.308594 14.7202 0.703125 14.7202H13.6426C14.0371 14.7202 14.3457 14.4118 14.3457 14.0173V12.0538C14.3457 11.6594 14.0371 11.3509 13.6426 11.3509H0.703125Z" fill={`url(#gradient-${index}-${featureIndex})`} />
                          <path d="M14.3379 2.38249L12.9316 3.78441L14.3379 2.38249ZM12.9316 0.992119V3.78441V0.992119Z" fill={`url(#gradient2-${index}-${featureIndex})`} />
                        </svg>
                      </div>
                    )}
                    <span className="text-black uppercase text-[10px] md:text-[12px]" style={{
                      fontFamily: 'DM Mono, monospace',
                      letterSpacing: '0.02em'
                    }}>
                      {featureText}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price Button */}
            <button 
              onClick={() => onNavigate?.('inquiry')}
              className="bg-black text-white rounded-full px-4 md:px-6 py-2 md:py-3 mx-auto block border border-transparent hover:bg-white hover:text-neutral-500 hover:border-neutral-300 transition-all duration-500 ease-in-out group relative overflow-hidden cursor-pointer whitespace-nowrap"
            >
              <span 
                className="group-hover:opacity-0 transition-opacity duration-500 ease-in-out text-[16px] md:text-[20px]"
                style={{
                  lineHeight: '1.2',
                  letterSpacing: '-0.56px',
                  fontFamily: 'Helvetica Neue, sans-serif'
                }}
              >
                {tier.price}
              </span>
              <span 
                className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out text-neutral-500 text-[12px] md:text-[14px]"
                style={{
                  lineHeight: '1.2',
                  letterSpacing: '0.1em',
                  fontFamily: 'Geist Mono, monospace'
                }}
              >
                INQUIRE
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Rated Great Badge */}
      <div className="absolute bottom-0 left-0 w-[110px] h-[120px] hidden md:block">
        <img src={ratedGreatBadge} alt="Rated Great" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}
