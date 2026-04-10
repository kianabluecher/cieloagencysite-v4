import { SEOHead } from '../SEOHead';

interface LaunchProps {
  onNavigate: (page: string) => void;
}

export function Launch({ onNavigate }: LaunchProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="Launch | CIELO Agency"
        description="Launch your brand with CIELO Agency."
        url="https://www.cielo.agency/launch"
      />
      <iframe 
        src="https://drive.google.com/file/d/1T5hvdsb0vLWJINE9GJLz3SIa6Q6Ktgyb/preview" 
        width="100%" 
        height="100%" 
        allow="autoplay; fullscreen"
        className="w-full h-full border-0"
        title="Launch Video"
      />
    </div>
  );
}
