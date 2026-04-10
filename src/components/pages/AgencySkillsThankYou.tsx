import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AgencySkillsThankYouProps {
  onNavigate: (page: string) => void;
}

export function AgencySkillsThankYou({ onNavigate }: AgencySkillsThankYouProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Open GitHub repository immediately
    window.open('https://github.com/kianabluecher/open-claude-skills', '_blank');
    
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8 inline-block">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          You're All Set!
        </h1>

        <p className="text-xl text-zinc-300 mb-4">
          We've just opened the GitHub repository in a new tab.
        </p>

        <p className="text-lg text-zinc-400 mb-8">
          Check your email for the download link and access instructions.
        </p>

        {/* Manual Link */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <p className="text-sm text-zinc-500 mb-4">Repository didn't open? Click below:</p>
          <a
            href="https://github.com/kianabluecher/open-claude-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-white text-[#0A0A0B] text-lg font-bold rounded-xl hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">📥</span>
              <span>Open Repository</span>
            </div>
          </a>
        </div>

        {/* Auto-redirect notice */}
        <p className="text-sm text-zinc-600">
          Redirecting to homepage in a few seconds...
        </p>
      </div>
    </div>
  );
}
