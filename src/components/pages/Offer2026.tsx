import { SEOHead } from '../SEOHead';

interface Offer2026Props {
  onNavigate: (page: string) => void;
}

export function Offer2026({ onNavigate }: Offer2026Props) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="The Next Frontier of Enterprise AI | CIELO Agency"
        description="Partial Creative Direction & Strategic Consulting from CIELO Agency."
        url="https://www.cielo.agency/offer-2026"
      />
      <iframe 
        src="https://drive.google.com/file/d/17U81aa0_QKNuQcaRr6vBAWjqSqVUGJsD/preview" 
        width="100%" 
        height="100%" 
        allow="autoplay; fullscreen"
        className="w-full h-full border-0"
        title="The Next Frontier of Enterprise AI"
      />
    </div>
  );
}