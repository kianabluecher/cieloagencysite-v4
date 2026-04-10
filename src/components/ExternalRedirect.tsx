import { useEffect } from 'react';

interface ExternalRedirectProps {
  to: string;
}

export function ExternalRedirect({ to }: ExternalRedirectProps) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/60 font-['Geist_Mono'] text-sm">Redirecting...</p>
      </div>
    </div>
  );
}
