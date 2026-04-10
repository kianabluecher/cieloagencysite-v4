import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7`;

export function PortfolioImagesFix() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateImages = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch(`${BASE_URL}/portfolio/update-images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to update images');
      }

      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error updating images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReInitialize = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      // First, let's try to initialize the portfolio
      const response = await fetch(`${BASE_URL}/portfolio/init`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to initialize');
      }

      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error initializing:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch(`${BASE_URL}/portfolio/projects`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      }).catch(err => {
        // Silent catch for network errors - Edge Function may not be deployed
        throw new Error('Edge Function not responding. Please deploy the function first.');
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to fetch projects');
      }

      setResult({ projects: data.projects, count: data.projects?.length || 0 });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      // Only log in dev mode, suppress in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching projects:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-8">Portfolio Images Fix</h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-neutral-400">
            Use these tools to diagnose and fix portfolio image issues:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleFetchProjects}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-800 disabled:text-neutral-500 rounded transition-colors"
            >
              {loading ? 'Loading...' : 'Check Projects'}
            </button>
            
            <button
              onClick={handleUpdateImages}
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-neutral-800 disabled:text-neutral-500 rounded transition-colors"
            >
              {loading ? 'Loading...' : 'Update Images'}
            </button>
            
            <button
              onClick={handleReInitialize}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-800 disabled:text-neutral-500 rounded transition-colors"
            >
              {loading ? 'Loading...' : 'Re-Initialize'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-6 bg-red-900/20 border border-red-500 rounded mb-8">
            <h3 className="text-red-400 mb-2">Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-6 bg-neutral-900 rounded">
            <h3 className="text-green-400 mb-4">Result</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
            
            {result.projects && (
              <div className="mt-8">
                <h4 className="text-xl mb-4">Project Images Preview:</h4>
                <div className="space-y-6">
                  {result.projects.map((project: any) => (
                    <div key={project.id} className="border border-neutral-800 p-4 rounded">
                      <h5 className="text-lg mb-2">{project.title}</h5>
                      <div className="space-y-2 text-sm">
                        <p><strong>Featured Image:</strong> {project.featured_image || 'None'}</p>
                        <p><strong>Thumbnail:</strong> {project.thumbnail || 'None'}</p>
                        <p><strong>Images Array:</strong> {project.images?.length || 0} images</p>
                        <p><strong>Gallery Images:</strong> {project.gallery_images?.length || 0} images</p>
                        
                        {project.featured_image && (
                          <div className="mt-4">
                            <p className="mb-2"><strong>Featured Image Preview:</strong></p>
                            <img 
                              src={project.featured_image} 
                              alt={project.title}
                              className="max-w-md rounded"
                              onError={(e) => {
                                e.currentTarget.src = '';
                                e.currentTarget.alt = 'Failed to load';
                                e.currentTarget.className = 'max-w-md rounded border border-red-500 p-4 bg-red-900/20';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 p-6 bg-neutral-900 rounded">
          <h3 className="text-xl mb-4">Expected Image URLs</h3>
          <p className="text-neutral-400 mb-4">
            Images should be stored in Supabase Storage under the "portfolio-images" bucket with these filenames:
          </p>
          <ul className="space-y-2 text-sm text-neutral-500">
            <li>• Welda Club.png</li>
            <li>• AI Insiders.png</li>
            <li>• Acenos X.png</li>
            <li>• Parceros Capital.png</li>
          </ul>
          <p className="text-neutral-400 mt-4">
            Expected URL format: <br/>
            <code className="text-green-400 text-xs">
              https://{projectId}.supabase.co/storage/v1/object/public/portfolio-images/[filename].png
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}