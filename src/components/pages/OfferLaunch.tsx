import { SEOHead } from '../SEOHead';

interface OfferLaunchProps {
  onNavigate: (page: string) => void;
}

export function OfferLaunch({ onNavigate }: OfferLaunchProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="Offer Launch | CIELO Agency"
        description="Discover our launch offerings and strategic packages."
        url="https://www.cielo.agency/offer-launch"
      />
      <iframe 
        src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/deck/umxnFeFfqFwUXbAbu4tsN5&hide-ui=1" 
        width="100%" 
        height="100%" 
        allowFullScreen
        className="w-full h-full border-0"
        title="Offer Launch Presentation"
      />
    </div>
  );
}