import Component1024WLight from '../../imports/1024WLight-1708-4430';
import { SEOHead } from '../SEOHead';
import { SmStartHeader } from './SmStartHeader';
import { SmStartFooter } from './SmStartFooter';

interface SmStartProps {
  onNavigate: (page: string) => void;
}

export function SmStart({ onNavigate }: SmStartProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEOHead
        title="Social Media Start | CIELO Agency"
        description="Start your social media journey with CIELO Agency's comprehensive social media management solutions."
        url="https://www.cielo.agency/sm-start"
      />
      
      {/* CIELO Header - Fixed white header, always visible */}
      <SmStartHeader onNavigate={onNavigate} />
      
      {/* Main Content - Figma Import - Add top padding for fixed header and flex-grow to push footer down */}
      <main className="w-full pt-[73px] flex-grow">
        <Component1024WLight />
      </main>
      
      {/* CIELO Footer - Pushed to bottom */}
      <SmStartFooter onNavigate={onNavigate} />
    </div>
  );
}