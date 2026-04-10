import { ExternalLink, GitBranch } from 'lucide-react';

interface PipelinePageProps {
  onNavigate: (page: string) => void;
}

export function PipelinePage({ onNavigate }: PipelinePageProps) {
  const embedUrl = 'https://manage.wix.com/dashboard/5fe1c560-0be6-4542-996f-374ca034c1d9/pipelines?referralInfo=search';

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Embedded iframe */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          style={{ minHeight: 'calc(100vh - 120px)', transform: 'scale(0.9)', transformOrigin: 'top left', width: '111%', height: '111%' }}
          title="Wix Pipeline"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
      
      {/* Button below iframe */}
      <div className="mt-4">
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-600/20 border border-orange-500/30 rounded text-orange-400 hover:bg-orange-600/30 hover:border-orange-500/50 transition-all font-jetbrains text-xs"
        >
          <ExternalLink size={14} />
          Open in Wix
        </a>
      </div>
    </div>
  );
}