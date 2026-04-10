interface PortfolioEmbedProps {
  onNavigate: (page: string, projectId?: string) => void;
}

export function PortfolioEmbed({ onNavigate }: PortfolioEmbedProps) {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-24 h-screen w-full">
        <iframe
          src="https://try.cielo.agency/portfolio-collections/ourwork"
          className="w-full h-full border-0"
          title="Portfolio"
        />
      </div>
    </div>
  );
}
