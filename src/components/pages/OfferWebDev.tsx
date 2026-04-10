import { SEOHead } from '../SEOHead';

interface OfferWebDevProps {
  onNavigate: (page: string) => void;
}

export function OfferWebDev({ onNavigate }: OfferWebDevProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="Web Development Offer | CIELO Agency"
        description="Web development service offering from CIELO Agency."
        url="https://www.cielo.agency/offer-webdev"
      />
      <iframe 
        src="https://drive.google.com/file/d/1JKiafyoJIn1tfH-k5xe5BHk_Tk6-X05I/preview" 
        width="100%" 
        height="100%" 
        allow="autoplay; fullscreen"
        className="w-full h-full border-0"
        title="Web Development Offer"
      />
    </div>
  );
}
