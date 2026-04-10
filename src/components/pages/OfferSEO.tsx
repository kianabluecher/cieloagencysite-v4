import { SEOHead } from '../SEOHead';

interface OfferSEOProps {
  onNavigate: (page: string) => void;
}

export function OfferSEO({ onNavigate }: OfferSEOProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="SEO Offer | CIELO Agency"
        description="SEO service offering from CIELO Agency."
        url="https://www.cielo.agency/offer-seo"
      />
      <iframe 
        src="https://drive.google.com/file/d/1gcVGko2IKSA6g29ZN4XutkIjMXQOxfwK/preview" 
        width="100%" 
        height="100%" 
        allow="autoplay; fullscreen"
        className="w-full h-full border-0"
        title="SEO Offer"
      />
    </div>
  );
}
