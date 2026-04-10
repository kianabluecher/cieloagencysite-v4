import { useState } from 'react';
import { updatePortfolioImages } from '../../utils/update-portfolio-images';

interface PortfolioImageUpdateProps {
  onNavigate?: (page: string) => void;
}

export function PortfolioImageUpdate({ onNavigate }: PortfolioImageUpdateProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      
      const data = await updatePortfolioImages();
      setResult(data);
      
      // Navigate to portfolio after 2 seconds
      setTimeout(() => {
        onNavigate?.('portfolio');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Portfolio Image Update</h1>
          <p className="text-[#7d8187] text-lg">
            Update all portfolio projects to use Supabase Storage URLs
          </p>
        </div>

        <div className="bg-neutral-900 rounded-lg p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">What this does:</h2>
            <ul className="list-disc list-inside text-[#7d8187] space-y-1">
              <li>Updates Welda Club project images</li>
              <li>Updates AI Insiders project images</li>
              <li>Updates Acenos X project images</li>
              <li>Updates Parceros Capital project images</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">New image URLs will be:</h2>
            <code className="block text-xs text-[#7d8187] bg-black p-3 rounded overflow-x-auto">
              https://[project].supabase.co/storage/v1/object/public/portfolio-images/[filename].png
            </code>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Portfolio Images'}
          </button>

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
              <h3 className="text-red-500 font-semibold mb-2">Error</h3>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-green-500/10 border border-green-500 rounded-lg p-4">
              <h3 className="text-green-500 font-semibold mb-2">✅ Success!</h3>
              <p className="text-sm text-green-400 mb-2">
                Portfolio images updated successfully. Redirecting to home...
              </p>
              <pre className="text-xs text-[#7d8187] bg-black p-3 rounded overflow-x-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => onNavigate?.('home')}
            className="text-[#7d8187] hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
