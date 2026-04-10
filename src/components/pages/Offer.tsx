import { SEOHead } from '../SEOHead';

interface OfferProps {
  onNavigate: (page: string) => void;
}

export function Offer({ onNavigate }: OfferProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="Offer | CIELO Agency"
        description="Explore our comprehensive service offerings and packages."
        url="https://www.cielo.agency/offer"
      />
      <iframe 
        src="https://drive.google.com/file/d/1TGTKjy0Bd29bUXXTEn7iyJkq7th0lOY8/preview" 
        width="100%" 
        height="100%" 
        allow="autoplay; fullscreen"
        className="w-full h-full border-0"
        title="Offer Video"
      />
    </div>
  );
}
