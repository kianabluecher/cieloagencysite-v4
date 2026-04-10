import { useEffect } from 'react';

export function GoogleSheetsCallback() {
  useEffect(() => {
    // Extract the authorization code or error from URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    // Send message to parent window (admin dashboard)
    if (window.opener) {
      window.opener.postMessage(
        {
          type: 'google-sheets-oauth-callback',
          code,
          error,
        },
        window.location.origin
      );
    }

    // Close the popup after a short delay
    setTimeout(() => {
      window.close();
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4"></div>
        <p className="text-white">Completing authorization...</p>
        <p className="text-zinc-400 text-sm mt-2">This window will close automatically</p>
      </div>
    </div>
  );
}
