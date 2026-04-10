import { useState } from 'react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Activity, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export function EdgeFunctionDiagnostic() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [deploymentIssue, setDeploymentIssue] = useState(false);

  const addResult = (test: string, status: 'success' | 'error' | 'warning', message: string, details?: any) => {
    setResults(prev => [...prev, { test, status, message, details, timestamp: new Date().toISOString() }]);
  };

  const runDiagnostics = async () => {
    setTesting(true);
    setResults([]);

    // Test 1: Health Check
    try {
      addResult('Health Check', 'success', 'Testing Edge Function health endpoint...', null);
      const healthUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/health`;
      
      const healthRes = await fetch(healthUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (healthRes.ok) {
        const data = await healthRes.json();
        addResult('Health Check', 'success', `✅ Edge Function is ONLINE`, data);
      } else {
        addResult('Health Check', 'error', `❌ Health check failed: ${healthRes.status}`, await healthRes.text());
      }
    } catch (error: any) {
      addResult('Health Check', 'error', `❌ Edge Function is OFFLINE or unreachable`, error.message);
    }

    // Test 2: CORS Test
    try {
      addResult('CORS Test', 'success', 'Testing CORS headers...', null);
      const healthUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/health`;
      
      const corsRes = await fetch(healthUrl, {
        method: 'OPTIONS',
      });

      addResult('CORS Test', 'success', `✅ CORS configured: ${corsRes.status}`, {
        'access-control-allow-origin': corsRes.headers.get('access-control-allow-origin'),
        'access-control-allow-methods': corsRes.headers.get('access-control-allow-methods'),
      });
    } catch (error: any) {
      addResult('CORS Test', 'error', `❌ CORS test failed`, error.message);
    }

    // Test 3: Auth Check
    try {
      addResult('Auth Test', 'success', 'Testing authentication...', null);
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        addResult('Auth Test', 'success', `✅ Authenticated as ${session.user.email}`, {
          userId: session.user.id,
          email: session.user.email
        });
      } else {
        addResult('Auth Test', 'error', '❌ Not authenticated', 'Please sign in');
      }
    } catch (error: any) {
      addResult('Auth Test', 'error', `❌ Auth test failed`, error.message);
    }

    // Test 4: Jira Endpoint Test
    try {
      addResult('Jira Endpoint', 'success', 'Testing Jira credentials endpoint...', null);
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        addResult('Jira Endpoint', 'error', '❌ Cannot test - not authenticated', 'Sign in first');
      } else {
        const jiraUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/admin/jira/dashboard`;
        
        const jiraRes = await fetch(jiraUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        });

        if (jiraRes.ok) {
          const data = await jiraRes.json();
          addResult('Jira Endpoint', 'success', `✅ Jira endpoint working!`, data);
        } else {
          const errorData = await jiraRes.json().catch(() => ({ error: 'Could not parse error' }));
          addResult('Jira Endpoint', 'error', `❌ Jira endpoint error: ${jiraRes.status}`, errorData);
        }
      }
    } catch (error: any) {
      addResult('Jira Endpoint', 'error', `❌ Jira endpoint test failed`, error.message);
    }

    // Test 5: Direct Jira API Test
    try {
      addResult('Direct Jira API', 'success', 'Testing direct Jira API call...', null);
      
      const domain = 'cieloagency';
      const email = 'agency@cielo.marketing';
      const apiToken = 'ATATT3xFfGF0ZoOuwKPW_rjBrh-tU0y_jURJbypl75E-mTfeBABLMHJyiZ6i_OvNEULYUvrSncCd6Zw5f8CAj56oBx6VjsLuC5kpp4xJfiZV8ZnyEHw0Dl_C9IKG9bBV_AzlkqX94tIdnenXsGl26sXYwqzAv3_kH4sxivz3zSEHzvBSNQvldyU=F0A03DBF';
      
      const auth = btoa(`${email}:${apiToken}`);
      const jiraDirectUrl = `https://${domain}.atlassian.net/rest/api/3/myself`;
      
      const directRes = await fetch(jiraDirectUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (directRes.ok) {
        const data = await directRes.json();
        addResult('Direct Jira API', 'success', `✅ Direct Jira API works! User: ${data.displayName}`, data);
      } else {
        addResult('Direct Jira API', 'error', `❌ Direct Jira API failed: ${directRes.status}`, await directRes.text());
      }
    } catch (error: any) {
      addResult('Direct Jira API', 'error', `❌ Direct Jira API test failed`, error.message);
    }

    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-white mb-2">Edge Function Diagnostics</h1>
          <p className="text-zinc-400">Comprehensive system health check</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
          <h2 className="text-xl text-white mb-4">Environment Info</h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Project ID:</span>
              <span className="text-white">{projectId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Supabase URL:</span>
              <span className="text-white">https://{projectId}.supabase.co</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Edge Function:</span>
              <span className="text-white">make-server-27c238f7</span>
            </div>
          </div>
        </div>

        <Button
          onClick={runDiagnostics}
          disabled={testing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6"
        >
          {testing ? (
            <>
              <Activity className="w-4 h-4 mr-2 animate-spin" />
              Running Diagnostics...
            </>
          ) : (
            <>
              <Activity className="w-4 h-4 mr-2" />
              Run All Diagnostics
            </>
          )}
        </Button>

        {results.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-xl text-white mb-4">Test Results</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`border p-4 ${
                    result.status === 'success'
                      ? 'bg-green-950/20 border-green-800/30'
                      : 'bg-red-950/20 border-red-800/30'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    {result.status === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white">{result.test}</h3>
                        <span className="text-xs text-zinc-500 font-mono">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className={result.status === 'success' ? 'text-green-300' : 'text-red-300'}>
                        {result.message}
                      </p>
                      {result.details && (
                        <pre className="mt-2 p-3 bg-black/50 text-xs text-zinc-400 overflow-x-auto">
                          {typeof result.details === 'string'
                            ? result.details
                            : JSON.stringify(result.details, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && results[0]?.status === 'error' && results[0]?.test === 'Health Check' && (
          <div className="mt-6 bg-amber-950/20 border border-amber-800/30 p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-amber-400 mb-2">Edge Function Deployment Required</h3>
                <p className="text-amber-200/70 text-sm mb-3">
                  The Edge Function is not responding. This means it either:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-amber-200/70 mb-3">
                  <li>Has not been deployed yet</li>
                  <li>Failed to deploy due to a syntax error</li>
                  <li>Is currently restarting</li>
                </ul>
                <p className="text-amber-200/70 text-sm">
                  Please redeploy the Edge Function from the Supabase Dashboard, or wait a few moments and try again.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}