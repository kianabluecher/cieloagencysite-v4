import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface InitOwnerProps {
  onNavigate: (page: string) => void;
}

export function InitOwner({ onNavigate }: InitOwnerProps) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Auto-run on mount
    initOwner();
  }, []);

  const initOwner = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 Initializing owner user...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/init-owner`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize owner');
      }

      console.log('✅ Owner initialized:', data);
      setResult(data);
      
      if (data.user?.status === 'created') {
        toast.success('Owner user created successfully!');
      } else if (data.user?.status === 'confirmed') {
        toast.success('Owner user email confirmed!');
      } else {
        toast.success('Owner user is ready!');
      }
    } catch (err: any) {
      console.error('❌ Error initializing owner:', err);
      setError(err.message);
      toast.error(err.message || 'Failed to initialize owner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl mb-4">CIELO</h1>
          <h2 className="text-2xl mb-2">Initialize Owner User</h2>
          <p className="text-white/50 text-sm">
            Setting up owner account in Supabase
          </p>
        </div>

        <div className="space-y-6">
          {loading && (
            <div className="bg-white/5 border border-white/10 p-8 rounded-lg flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-white/60" />
              <p className="text-white/60">Creating owner user...</p>
            </div>
          )}

          {!loading && result && (
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-lg space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h3 className="text-green-400 font-medium">Success!</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <p className="text-white/70">{result.message}</p>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded space-y-2">
                  <p className="text-white/50 text-xs uppercase tracking-wide">Owner Credentials</p>
                  <div className="space-y-1">
                    <p><span className="text-white/50">Email:</span> <span className="text-white font-mono">agency@cielo.marketing</span></p>
                    <p><span className="text-white/50">Password:</span> <span className="text-white font-mono">agencycielo765598</span></p>
                  </div>
                  {result.user?.status && (
                    <p className="text-xs text-white/40 mt-2">
                      Status: <span className="text-green-400">{result.user.status}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-red-400 font-medium">Error</h3>
              </div>
              <p className="text-sm text-white/70">{error}</p>
              
              <button
                onClick={initOwner}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2 transition-colors rounded-lg text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && (
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('team-login')}
                className="w-full bg-white hover:bg-white/90 text-neutral-950 py-3 transition-colors rounded-lg font-medium"
              >
                Go to Team Login
              </button>
              
              <button
                onClick={initOwner}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 transition-colors rounded-lg"
              >
                Re-initialize Owner
              </button>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
