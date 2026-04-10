import { useState, useEffect } from 'react';
import { FileSpreadsheet, Link2, Unlink, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface GoogleSheetsConnectProps {
  accessToken: string;
}

export function GoogleSheetsConnect({ accessToken }: GoogleSheetsConnectProps) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/google-sheets/status`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setConnected(data.connected);
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setConnecting(true);

      // Get OAuth URL
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/google-sheets/connect`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Origin': window.location.origin,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to initiate OAuth');
      }

      const { authUrl, redirectUri } = await response.json();

      // Open OAuth popup
      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        authUrl,
        'Google Sheets Authorization',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Listen for OAuth callback
      const handleMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === 'google-sheets-oauth-callback') {
          const { code, error } = event.data;

          if (error) {
            toast.error(`Authorization failed: ${error}`);
            setConnecting(false);
            return;
          }

          if (code) {
            // Exchange code for tokens
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

              if (!callbackResponse.ok) {
                const errorData = await callbackResponse.json();
                throw new Error(errorData.error || 'Failed to connect');
              }

              toast.success('Google Sheets connected successfully!');
              setConnected(true);
              await checkConnectionStatus();
            } catch (error) {
              console.error('Callback error:', error);
              toast.error(error instanceof Error ? error.message : 'Connection failed');
            }
          }

          setConnecting(false);
          window.removeEventListener('message', handleMessage);
          popup?.close();
        }
      };

      window.addEventListener('message', handleMessage);

      // Check if popup was closed
      const checkPopupClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkPopupClosed);
          setConnecting(false);
          window.removeEventListener('message', handleMessage);
        }
      }, 500);
    } catch (error) {
      console.error('Error connecting Google Sheets:', error);
      toast.error('Failed to initiate connection');
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setConnecting(true);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/auth/google-sheets/disconnect`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to disconnect');
      }

      toast.success('Google Sheets disconnected');
      setConnected(false);
      await checkConnectionStatus();
    } catch (error) {
      console.error('Error disconnecting Google Sheets:', error);
      toast.error('Failed to disconnect');
    } finally {
      setConnecting(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 bg-zinc-900/50 border-zinc-800">
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="w-5 h-5 text-zinc-400" />
          <div className="flex-1">
            <h3 className="text-white">Google Sheets Integration</h3>
            <p className="text-sm text-zinc-400 mt-1">Loading...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-zinc-900/50 border-zinc-800">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white">Google Sheets Integration</h3>
            {connected ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-zinc-500" />
            )}
          </div>
          
          <p className="text-sm text-zinc-400 mb-4">
            {connected
              ? 'Form submissions are automatically synced to your Google Sheet'
              : 'Connect to sync form submissions to Google Sheets'}
          </p>

          <div className="flex gap-2">
            {connected ? (
              <Button
                onClick={handleDisconnect}
                disabled={connecting}
                variant="outline"
                size="sm"
                className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
              >
                <Unlink className="w-4 h-4 mr-2" />
                {connecting ? 'Disconnecting...' : 'Disconnect'}
              </Button>
            ) : (
              <Button
                onClick={handleConnect}
                disabled={connecting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                size="sm"
              >
                <Link2 className="w-4 h-4 mr-2" />
                {connecting ? 'Connecting...' : 'Connect Google Sheets'}
              </Button>
            )}
          </div>

          {!connected && (
            <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <p className="text-xs text-zinc-400">
                <strong className="text-zinc-300">Setup Required:</strong>
              </p>
              <ol className="text-xs text-zinc-400 mt-2 space-y-1 ml-4 list-decimal">
                <li>Update Google OAuth settings with redirect URI</li>
                <li>Create spreadsheet with tabs: "Let's Talk", "Brand & Web", "Social Media", "Moodboard"</li>
                <li>Add column headers (A: Timestamp, B: Email, etc.)</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}