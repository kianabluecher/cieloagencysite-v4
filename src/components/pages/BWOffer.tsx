import { SEOHead } from '../SEOHead';

interface BWOfferProps {
  onNavigate: (page: string) => void;
}

export function BWOffer({ onNavigate }: BWOfferProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="Brand & Web Offer | CIELO Agency"
        description="Brand & Web comprehensive service offering."
        url="https://www.cielo.agency/bw-offer"
      />
      <iframe 
        src="https://drive.google.com/file/d/1jyLucDdW6yv_55UX9uMcObX2SQrWIFY2/preview" 
        width="100%" 
        height="100%" 
        allow="autoplay; fullscreen"
        className="w-full h-full border-0"
        title="Brand & Web Offer"
      />
    </div>
  );
}
