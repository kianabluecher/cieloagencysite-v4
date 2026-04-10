import { ExternalLink, AlertCircle } from 'lucide-react';

interface TemplatesPageProps {
  onNavigate: (page: string) => void;
}

export function TemplatesPage({ onNavigate }: TemplatesPageProps) {
  const embedUrl1 = 'https://docs.google.com/document/d/1PNyZnasyMjMJZCTMzx0sg7vGK_-5axbTXGjJZ5YLL4E/edit?usp=sharing';
  const embedUrl2 = 'https://docs.google.com/document/d/1_VEELOTqdInkQvEiw-NPw3l3g0aNpF7GUXe4vPfIy98/edit?usp=sharing';

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Warning Note */}
      <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-red-950/30 border border-red-500/30 rounded-lg text-red-400">
        <AlertCircle size={18} className="shrink-0" />
        <p className="text-sm font-jetbrains">
          <strong>!</strong> Do not edit, open and duplicate.
        </p>
      </div>

      {/* Two Embeds Side by Side */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* First Embed */}
        <div className="flex flex-col">
          <div className="mb-3">
            <h2 className="font-jetbrains text-sm text-zinc-300">Master Doc Template</h2>
          </div>
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <iframe
              src={embedUrl1}
              className="w-full h-full"
              style={{ minHeight: '400px' }}
              title="Template Document 1"
            />
          </div>
          <div className="mt-3">
            <a
              href={embedUrl1}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600/20 border border-green-500/30 rounded text-green-400 hover:bg-green-600/30 hover:border-green-500/50 transition-all font-jetbrains text-xs"
            >
              <ExternalLink size={14} />
              Open Template 1
            </a>
          </div>
        </div>

        {/* Second Embed */}
        <div className="flex flex-col">
          <div className="mb-3">
            <h2 className="font-jetbrains text-sm text-zinc-300">Role Template</h2>
          </div>
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <iframe
              src={embedUrl2}
              className="w-full h-full"
              style={{ minHeight: '400px' }}
              title="Template Document 2"
            />
          </div>
          <div className="mt-3">
            <a
              href={embedUrl2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600/20 border border-green-500/30 rounded text-green-400 hover:bg-green-600/30 hover:border-green-500/50 transition-all font-jetbrains text-xs"
            >
              <ExternalLink size={14} />
              Open Template 2
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}