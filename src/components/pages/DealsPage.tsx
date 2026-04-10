import { ExternalLink, AlertCircle, Target } from 'lucide-react';
import { Button } from '../ui/button';

interface DealsPageProps {
  onNavigate: (page: string) => void;
}

export function DealsPage({ onNavigate }: DealsPageProps) {
  const embedUrl = 'https://app.apollo.io/#/deals';

  return (
    <div className="p-6 space-y-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1 font-mono flex items-center gap-2">
            <Target size={28} className="text-orange-400" />
            Deals
          </h1>
          <p className="text-zinc-400 text-sm font-jetbrains">Apollo.io Deals Management</p>
        </div>
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-500/40 transition-all font-jetbrains text-sm"
        >
          <ExternalLink size={16} />
          Open Apollo.io
        </a>
      </div>

      {/* Authentication Notice */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-orange-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-orange-400 text-sm font-jetbrains mb-2">
              <strong>Authentication Required</strong>
            </p>
            <p className="text-zinc-400 text-xs font-jetbrains mb-3">
              Apollo.io requires you to sign in before viewing deals. Click the button above to open Apollo.io in a new tab and sign in with your credentials.
            </p>
            <div className="flex flex-col gap-2 text-xs text-zinc-500 font-jetbrains">
              <p>📋 <strong>Steps:</strong></p>
              <ol className="list-decimal list-inside pl-4 space-y-1">
                <li>Click "Open Apollo.io" button above</li>
                <li>Sign in with your Apollo.io account</li>
                <li>Navigate to the Deals section</li>
                <li>Keep that tab open alongside this dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Link */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto">
            <Target size={32} className="text-orange-400" />
          </div>
          <h3 className="text-xl text-white font-mono">Apollo.io Deals</h3>
          <p className="text-zinc-400 text-sm font-jetbrains">
            External authentication is required to access Apollo.io. Use the button below to open the platform in a new window.
          </p>
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0">
              <ExternalLink size={16} className="mr-2" />
              Launch Apollo.io Deals
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}