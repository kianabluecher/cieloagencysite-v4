import { ExternalLink, Table } from 'lucide-react';

interface MarketingChannelsPageProps {
  onNavigate: (page: string) => void;
}

export function MarketingChannelsPage({ onNavigate }: MarketingChannelsPageProps) {
  const marketingChannelsUrl = 'https://cieloagency.notion.site/27e3c154dc44803f954ac3843dc522b3?v=27e3c154dc44817cbe92000ca7e38842&pvs=4';

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Notion Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-lg bg-zinc-800/50 border border-zinc-700 flex items-center justify-center">
              <Table size={32} className="text-cyan-400" strokeWidth={1.5} />
            </div>
          </div>
          
          <h2 className="text-center text-zinc-200 mb-3">Marketing Channels Database</h2>
          <p className="text-center text-zinc-500 text-sm mb-6 font-jetbrains">
            View and manage your marketing channels in Notion
          </p>
          
          <a
            href={marketingChannelsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-cyan-600/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-600/30 hover:border-cyan-500/50 transition-all font-jetbrains"
          >
            <ExternalLink size={18} />
            <span>Open Marketing Channels in Notion</span>
          </a>
        </div>
      </div>
    </div>
  );
}