import image_517920a22d65ec67dc9b1e78785f8c3169a4021a from 'figma:asset/517920a22d65ec67dc9b1e78785f8c3169a4021a.png';
import { Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ampersandLogo from 'figma:asset/4f790fe38beee097f52e079a0683c186ca8ef345.png';
import porscheLogo from 'figma:asset/77279cbd7d728fe39a1d199e3381b872f8276bf5.png';
import hiLogo from 'figma:asset/224a6e520241b2de4e522cc9cf1301d7ab99fb0f.png';

export function TrustBadge() {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-950 relative z-30">
          <img
            src={image_517920a22d65ec67dc9b1e78785f8c3169a4021a}
            alt="Client logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-950 relative z-20 -ml-3">
          <img
            src={porscheLogo}
            alt="Client logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-950 relative z-10 -ml-3">
          <img
            src={hiLogo}
            alt="Client logo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Trust Text Section */}
      <div className="flex flex-col gap-1 items-start">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-white text-white"
            />
          ))}
        </div>
        <p className="font-['Geist_Mono'] text-[#7d8187] text-[10px] tracking-wide uppercase leading-tight text-left">
          Trusted by 138+ leading
          <br />
          companies
        </p>
      </div>
    </div>
  );
}