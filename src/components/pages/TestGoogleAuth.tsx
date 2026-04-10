import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner@2.0.3';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface TestGoogleAuthProps {
  onNavigate: (page: string) => void;
}

export function TestGoogleAuth({ onNavigate }: TestGoogleAuthProps) {
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const testGoogleOAuth = async () => {
    setLoading(true);
    setTestResults(null);

    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      console.log('🔍 Testing Google OAuth configuration...');
      
      // Test 1: Check if we can create the OAuth URL
      const results: any = {
        configCheck: { status: 'pending', message: '' },
        oauthURLCreation: { status: 'pending', message: '' },
        redirectSetup: { status: 'pending', message: '' },
      };

      // Check Supabase config
      results.configCheck = {
        status: 'success',
        message: `Project ID: ${projectId}`,
      };

      // Try to create OAuth sign-in
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/team-dashboard`,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        });

        if (error) {
          results.oauthURLCreation = {
            status: 'error',
            message: `Error: ${error.message}`,
          };
        } else {
          results.oauthURLCreation = {
            status: 'success',
            message: 'OAuth URL created successfully! Redirecting...',
            url: data?.url,
          };
          
          // If successful, the redirect will happen automatically
          // But we'll show the results first
        }
      } catch (err: any) {
        results.oauthURLCreation = {
          status: 'error',
          message: `Exception: ${err.message}`,
        };
      }

      // Check redirect configuration
      const currentOrigin = window.location.origin;
      results.redirectSetup = {
        status: 'info',
        message: `Redirect URL: ${currentOrigin}/team-dashboard`,
        note: 'Make sure this URL is added to your Supabase Redirect URLs',
      };

      setTestResults(results);
      toast.success('Test completed - check results below');
    } catch (error: any) {
      console.error('Test error:', error);
      toast.error(error.message || 'Test failed');
      setTestResults({
        generalError: {
          status: 'error',
          message: error.message,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleActualGoogleSignIn = async () => {
    setLoading(true);
    
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/team-dashboard`,
        },
      });

      if (error) {
        throw error;
      }

      // The redirect happens automatically
      toast.success('Redirecting to Google...');
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      toast.error(err.message || 'Failed to initiate Google sign-in');
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'info':
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 border-green-500/30';
      case 'error':
        return 'bg-red-500/10 border-red-500/30';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30';
      default:
        return 'bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-white mb-2">Google OAuth Test</h1>
          <p className="text-zinc-400">
            Test Google sign-in configuration for CIELO Agency
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6">
          {/* Configuration Info */}
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
            <h3 className="text-sm uppercase tracking-wider text-zinc-400 mb-3">Configuration</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Project ID:</span>
                <span className="font-mono text-white">{projectId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Redirect URL:</span>
                <span className="font-mono text-white text-xs">{window.location.origin}/team-dashboard</span>
              </div>
            </div>
          </div>

          {/* Test Button */}
          <button
            onClick={testGoogleOAuth}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Run OAuth Configuration Test'
            )}
          </button>

          {/* Actual Sign-In Button */}
          <button
            onClick={handleActualGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-zinc-200 text-black rounded-lg px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Actually Sign In with Google
              </>
            )}
          </button>

          {/* Test Results */}
          {testResults && (
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-wider text-zinc-400">Test Results</h3>
              {Object.entries(testResults).map(([key, result]: [string, any]) => (
                <div
                  key={key}
                  className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-start gap-3">
                    {getStatusIcon(result.status)}
                    <div className="flex-1">
                      <h4 className="font-medium mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-sm text-zinc-300">{result.message}</p>
                      {result.note && (
                        <p className="text-xs text-zinc-400 mt-2">ℹ️ {result.note}</p>
                      )}
                      {result.url && (
                        <p className="text-xs text-zinc-500 mt-2 font-mono break-all">
                          URL: {result.url}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Setup Instructions */}
          <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
            <h3 className="text-sm uppercase tracking-wider text-zinc-400 mb-3">
              Setup Checklist
            </h3>
            <div className="space-y-2 text-sm text-zinc-300">
              <div className="flex items-start gap-2">
                <span>1.</span>
                <span>Go to Supabase Dashboard → Authentication → Providers</span>
              </div>
              <div className="flex items-start gap-2">
                <span>2.</span>
                <span>Enable Google provider</span>
              </div>
              <div className="flex items-start gap-2">
                <span>3.</span>
                <span>Add this to Redirect URLs: <code className="bg-zinc-900 px-2 py-0.5 rounded text-xs">{window.location.origin}/**</code></span>
              </div>
              <div className="flex items-start gap-2">
                <span>4.</span>
                <span>Save changes and test above</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('team-login')}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-4 py-2 transition-colors"
            >
              Go to Team Login
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-4 py-2 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
