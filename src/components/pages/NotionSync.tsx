import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { syncFromNotion } from '../../utils/portfolio-api';
import { Header } from '../Header';

interface NotionSyncProps {
  onNavigate?: (page: string) => void;
}

export function NotionSync({ onNavigate }: NotionSyncProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const exampleJson = {
    id: "example-project",
    title: "Example Project",
    client: "Example Client",
    date: "2025",
    category: "Branding & Design",
    description: "This is an example project description from Notion.",
    media: [
      { url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0", alt: "Example image 1" },
      { url: "https://images.unsplash.com/photo-1557804506-669a67965ba0", alt: "Example image 2" }
    ],
    cover: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    link: "https://example.com",
    tags: ["Example", "Test", "Demo"],
    status: "Completed",
    featured: true
  };

  const handleSync = async () => {
    try {
      setLoading(true);
      setError('');
      setResult(null);

      const data = JSON.parse(jsonInput);
      const syncedProject = await syncFromNotion(data);
      setResult(syncedProject);
    } catch (err: any) {
      setError(err.message || 'Failed to sync project');
      console.error('Sync error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadExample = () => {
    setJsonInput(JSON.stringify(exampleJson, null, 2));
    setError('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header onNavigate={onNavigate} />
      
      <div className="px-6 py-32">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => onNavigate?.('portfolio')}
            className="flex items-center gap-2 text-[#7d8187] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-['Geist_Mono'] text-xs tracking-[1.4px] uppercase">Back to Portfolio</span>
          </button>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl text-white tracking-tight mb-4">
              Notion Sync Tester
            </h1>
            <p className="text-[#7d8187] text-lg">
              Test manual portfolio sync from Notion-formatted JSON
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-8">
            <h2 className="text-xl text-white mb-4">How to use:</h2>
            <ol className="space-y-2 text-[#b4b4b4] list-decimal list-inside">
              <li>Paste Notion-formatted JSON below (or click "Load Example")</li>
              <li>Click "Sync to Supabase"</li>
              <li>Check the result to verify sync was successful</li>
              <li>Navigate to Portfolio page to see the new project</li>
            </ol>
          </div>

          {/* JSON Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-[#7d8187] font-['Geist_Mono'] uppercase tracking-wider">
                Notion JSON Data
              </label>
              <button
                onClick={loadExample}
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Load Example
              </button>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your Notion project JSON here..."
              className="w-full h-96 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 text-sm font-mono text-[#b4b4b4] resize-none focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Sync Button */}
          <button
            onClick={handleSync}
            disabled={loading || !jsonInput}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-[#2a2a2a] disabled:text-[#7d8187] text-black font-medium rounded-lg transition-colors mb-8"
          >
            {loading ? 'Syncing...' : 'Sync to Supabase'}
          </button>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
              <h3 className="text-red-400 mb-2">Error</h3>
              <p className="text-red-300 text-sm font-mono">{error}</p>
            </div>
          )}

          {/* Success Result */}
          {result && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
              <h3 className="text-emerald-400 text-lg mb-4">✓ Sync Successful!</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#b4b4b4]">
                  <span className="text-white">Project ID:</span> {result.id}
                </p>
                <p className="text-[#b4b4b4]">
                  <span className="text-white">Title:</span> {result.title}
                </p>
                <p className="text-[#b4b4b4]">
                  <span className="text-white">Category:</span> {result.category}
                </p>
                {result.status && (
                  <p className="text-[#b4b4b4]">
                    <span className="text-white">Status:</span> {result.status}
                  </p>
                )}
                {result.updatedAt && (
                  <p className="text-[#b4b4b4]">
                    <span className="text-white">Last Updated:</span> {new Date(result.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-emerald-500/20">
                <p className="text-xs text-[#7d8187] font-['Geist_Mono'] uppercase tracking-wider mb-3">
                  Full Response
                </p>
                <pre className="bg-black/50 rounded p-4 text-xs text-emerald-300 overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Webhook Info */}
          <div className="mt-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-white text-lg mb-4">Webhook Endpoints</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-[#7d8187] font-['Geist_Mono'] uppercase tracking-wider mb-2">
                  Manual Sync Endpoint
                </p>
                <code className="block bg-black/50 rounded p-3 text-sm text-emerald-400 overflow-x-auto">
                  POST /make-server-27c238f7/portfolio/sync-notion
                </code>
              </div>
              <div>
                <p className="text-xs text-[#7d8187] font-['Geist_Mono'] uppercase tracking-wider mb-2">
                  Notion Webhook Endpoint (Make.com/Zapier)
                </p>
                <code className="block bg-black/50 rounded p-3 text-sm text-emerald-400 overflow-x-auto">
                  POST /make-server-27c238f7/portfolio/notion-webhook
                </code>
              </div>
            </div>
            <p className="text-sm text-[#7d8187] mt-4">
              See <code className="text-emerald-400">/guidelines/NOTION_INTEGRATION.md</code> for full setup instructions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
