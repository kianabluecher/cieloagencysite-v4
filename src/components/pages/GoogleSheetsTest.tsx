import { useState } from 'react';
import { Button } from '../ui/button';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';

export function GoogleSheetsTest() {
  const [logs, setLogs] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(`[GoogleSheets Test] ${message}`);
  };

  const checkAuth = async () => {
    addLog('🔍 Checking authentication...');
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        addLog(`❌ Auth error: ${error.message}`);
        return;
      }

      if (!session) {
        addLog('❌ No active session - please sign in first');
        return;
      }

      const token = session.access_token;
      setAccessToken(token);
      addLog(`✅ Authenticated as: ${session.user.email}`);
      addLog(`✅ User role: ${session.user.user_metadata?.role || 'none'}`);
      addLog(`✅ Access token obtained (${token.substring(0, 20)}...)`);
    } catch (error) {
      addLog(`❌ Exception: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const checkEnvVars = () => {
    addLog('🔍 Checking environment variables...');
    addLog(`✅ Project ID: ${projectId}`);
    addLog(`✅ Public Anon Key: ${publicAnonKey.substring(0, 30)}...`);
  };

  const checkOAuthCredentials = async () => {
    if (!accessToken) {
      addLog('❌ No access token - run Check Auth first');
      return;
    }

    addLog('🔍 Checking OAuth credentials on server...');
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/google-sheets/debug-credentials`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      addLog(`📊 Response: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      addLog(`❌ Exception: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const checkStatus = async () => {
    if (!accessToken) {
      addLog('❌ No access token - run Check Auth first');
      return;
    }

    addLog('🔍 Checking Google Sheets connection status...');
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/google-sheets/status`;
      addLog(`📡 Fetching: ${url}`);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      addLog(`📊 Response status: ${response.status}`);
      const data = await response.json();
      addLog(`📊 Response data: ${JSON.stringify(data)}`);

      if (response.ok) {
        addLog(data.connected ? '✅ Google Sheets IS connected' : '⚠️ Google Sheets NOT connected');
      } else {
        addLog(`❌ Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      addLog(`❌ Exception: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testConnect = async () => {
    if (!accessToken) {
      addLog('❌ No access token - run Check Auth first');
      return;
    }

    addLog('🔍 Testing OAuth connect endpoint...');
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/google-sheets/connect`;
      addLog(`📡 Fetching: ${url}`);
      addLog(`📡 Origin: ${window.location.origin}`);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Origin': window.location.origin,
        },
      });

      addLog(`📊 Response status: ${response.status}`);
      const data = await response.json();
      addLog(`📊 Response data: ${JSON.stringify(data, null, 2)}`);

      if (response.ok) {
        addLog('✅ OAuth URL generated successfully');
        addLog(`📋 Auth URL: ${data.authUrl}`);
        addLog(`📋 Redirect URI: ${data.redirectUri}`);
        
        // Check if redirect URI matches what user added to Google
        const expectedUri = `https://${projectId}.supabase.co/api/google-sheets-callback`;
        if (data.redirectUri === expectedUri) {
          addLog(`✅ Redirect URI matches expected: ${expectedUri}`);
        } else {
          addLog(`⚠️ Redirect URI MISMATCH!`);
          addLog(`   Expected: ${expectedUri}`);
          addLog(`   Got: ${data.redirectUri}`);
        }
      } else {
        addLog(`❌ Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      addLog(`❌ Exception: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testCallbackRoute = () => {
    addLog('🔍 Testing callback route...');
    const callbackUrl = `${window.location.origin}/api/google-sheets-callback?code=test123`;
    addLog(`📋 Callback URL: ${callbackUrl}`);
    addLog('💡 Opening in new tab (check if route works)...');
    window.open(callbackUrl, '_blank');
  };

  const testFullFlow = async () => {
    if (!accessToken) {
      addLog('❌ No access token - run Check Auth first');
      return;
    }

    addLog('🚀 Starting full OAuth flow...');
    try {
      // Step 1: Get OAuth URL
      const connectUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/google-sheets/connect`;
      const response = await fetch(connectUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Origin': window.location.origin,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        addLog(`❌ Failed to get OAuth URL: ${error.error}`);
        return;
      }

      const { authUrl, redirectUri } = await response.json();
      addLog(`✅ OAuth URL obtained`);
      addLog(`📋 Redirect URI: ${redirectUri}`);

      // Step 2: Open popup
      addLog('🪟 Opening OAuth popup...');
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        authUrl,
        'Google Sheets Authorization',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        addLog('❌ Popup blocked! Please allow popups for this site');
        return;
      }

      addLog('✅ Popup opened successfully');

      // Step 3: Listen for callback
      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
          addLog(`⚠️ Message from wrong origin: ${event.origin}`);
          return;
        }

        addLog(`📨 Received message: ${JSON.stringify(event.data)}`);

        if (event.data.type === 'google-sheets-oauth-callback') {
          const { code, error } = event.data;

          if (error) {
            addLog(`❌ OAuth error: ${error}`);
            return;
          }

          if (code) {
            addLog(`✅ Authorization code received: ${code.substring(0, 20)}...`);

            // Step 4: Exchange code for tokens
            addLog('🔄 Exchanging code for tokens...');
            try {
              const callbackResponse = await fetch(
                `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/google-sheets/callback`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify({ code, redirectUri }),
                }
              );

              addLog(`📊 Callback response status: ${callbackResponse.status}`);
              const callbackData = await callbackResponse.json();
              addLog(`📊 Callback response: ${JSON.stringify(callbackData)}`);

              if (callbackResponse.ok) {
                addLog('✅✅✅ SUCCESS! Google Sheets connected!');
              } else {
                addLog(`❌ Token exchange failed: ${callbackData.error}`);
                addLog(`   Details: ${callbackData.details || 'none'}`);
              }
            } catch (error) {
              addLog(`❌ Exception during token exchange: ${error instanceof Error ? error.message : String(error)}`);
            }
          }

          window.removeEventListener('message', handleMessage);
          popup.close();
        }
      };

      window.addEventListener('message', handleMessage);

      // Monitor popup
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          addLog('⚠️ Popup was closed');
          window.removeEventListener('message', handleMessage);
        }
      }, 500);

    } catch (error) {
      addLog(`❌ Exception: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-2">Google Sheets OAuth - Diagnostic Test</h1>
        <p className="text-zinc-400 mb-8">
          This page helps diagnose Google Sheets OAuth connection issues
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button onClick={checkEnvVars} className="bg-blue-600 hover:bg-blue-700">
            1. Check Environment
          </Button>
          <Button onClick={checkAuth} className="bg-blue-600 hover:bg-blue-700">
            2. Check Authentication
          </Button>
          <Button onClick={checkStatus} className="bg-purple-600 hover:bg-purple-700" disabled={!accessToken}>
            3. Check Connection Status
          </Button>
          <Button onClick={testConnect} className="bg-purple-600 hover:bg-purple-700" disabled={!accessToken}>
            4. Test Connect Endpoint
          </Button>
          <Button onClick={testCallbackRoute} className="bg-orange-600 hover:bg-orange-700">
            5. Test Callback Route
          </Button>
          <Button onClick={testFullFlow} className="bg-emerald-600 hover:bg-emerald-700" disabled={!accessToken}>
            6. 🚀 Run Full OAuth Flow
          </Button>
          <Button onClick={checkOAuthCredentials} className="bg-gray-600 hover:bg-gray-700" disabled={!accessToken}>
            7. Check OAuth Credentials
          </Button>
        </div>

        <div className="flex gap-4 mb-4">
          <Button onClick={clearLogs} variant="outline" className="bg-zinc-800 border-zinc-700">
            Clear Logs
          </Button>
          {accessToken && (
            <span className="text-sm text-emerald-400 flex items-center">
              ✅ Authenticated
            </span>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
          <div className="text-zinc-400 mb-2">Console Output:</div>
          {logs.length === 0 ? (
            <div className="text-zinc-600">No logs yet. Click a button above to start testing.</div>
          ) : (
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className={`${
                  log.includes('❌') ? 'text-red-400' :
                  log.includes('✅') ? 'text-emerald-400' :
                  log.includes('⚠️') ? 'text-yellow-400' :
                  log.includes('🔍') ? 'text-blue-400' :
                  'text-zinc-300'
                }`}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
          <h3 className="text-lg mb-2">Expected Configuration:</h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-zinc-400">Project ID:</span>{' '}
              <code className="text-emerald-400">{projectId}</code>
            </div>
            <div>
              <span className="text-zinc-400">Required Google OAuth Redirect URI:</span>{' '}
              <code className="text-emerald-400">https://cielo.agency/api/google-sheets-callback</code>
            </div>
            <div>
              <span className="text-zinc-400">Spreadsheet ID:</span>{' '}
              <code className="text-emerald-400">1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE</code>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-700">
              <span className="text-emerald-400 text-xs">✅ Redirect URI is now configured in Google Cloud Console</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}