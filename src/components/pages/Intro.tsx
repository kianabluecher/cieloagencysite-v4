import { SEOHead } from '../SEOHead';

interface IntroProps {
  onNavigate: (page: string) => void;
}

export function Intro({ onNavigate }: IntroProps) {
  return (
    <div className="h-screen w-screen bg-black overflow-hidden">
      <SEOHead
        title="Intro | CIELO Agency"
        description="Introduction to CIELO Agency."
        url="https://www.cielo.agency/intro"
      />
      <iframe 
        src="https://drive.google.com/file/d/1xe_r4qOGseTgBI_wYXrejnxyPQH4qN7h/preview" 
        width="100%" 
        height="100%" 
        allow="autoplay; fullscreen"
        className="w-full h-full border-0"
        title="Intro Video"
      />
    </div>
  );
}
