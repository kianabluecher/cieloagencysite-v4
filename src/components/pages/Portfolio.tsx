import { WorkGallery } from '../WorkGallery';
import { StatsSection } from '../StatsSection';
import { IndustriesSection } from '../IndustriesSection';
import { CTASection } from '../CTASection';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioProps {
  onNavigate: (page: string, projectId?: string) => void;
}

export function Portfolio({ onNavigate }: PortfolioProps) {
  const handleProjectClick = (projectId: string) => {
    onNavigate('portfolio-detail', projectId);
  };

  return (
    <div className="min-h-screen bg-black pt-32">
      {/* Work Gallery */}
      <WorkGallery 
        onProjectClick={handleProjectClick}
      />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Industries Section */}
      <IndustriesSection />
      
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}