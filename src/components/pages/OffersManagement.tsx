import { useState } from 'react';
import { ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

interface OffersManagementProps {
  onNavigate: (page: string) => void;
}

export function OffersManagement({ onNavigate }: OffersManagementProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const spreadsheetId = '1iCOzJgVur17ZXNjYWuwGFu-QvblZLqwVWLm47Ztozug';
  const embedUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing&widget=true&headers=false&rm=minimal`;
  const directUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing`;

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-[#333333] bg-[#111111] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-white mb-1">Offers Management</h1>
            <p className="text-[#888888] text-sm">
              Manage and track all client offers and proposals
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] text-white transition-colors text-sm"
            >
              <ExternalLink size={16} />
              Open in Google Sheets
            </a>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] text-white transition-colors text-sm"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>
        </div>
      </div>

      {/* Spreadsheet Embed */}
      <div className={`flex-1 relative ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0A0A0A]' : ''}`}>
        {isFullscreen && (
          <div className="absolute top-0 left-0 right-0 bg-[#111111] border-b border-[#333333] px-6 py-3 flex items-center justify-between z-10">
            <h2 className="text-white">Offers Management - Fullscreen</h2>
            <button
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] text-white transition-colors text-sm"
            >
              <Minimize2 size={16} />
              Exit Fullscreen
            </button>
          </div>
        )}
        
        <div className={`w-full h-full ${isFullscreen ? 'pt-14' : ''}`} style={{ minHeight: isFullscreen ? '100vh' : '3000px' }}>
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            title="CIELO Offers Spreadsheet"
            allowFullScreen
          />
        </div>
      </div>

      {/* Helper Text */}
      {!isFullscreen && (
        <div className="flex-shrink-0 border-t border-[#333333] bg-[#111111] px-6 py-3">
          <div className="flex items-start gap-3 text-xs text-[#888888]">
            <div className="flex-1">
              <p>
                <strong className="text-[#A6E0FF]">Tip:</strong> You can edit the spreadsheet directly here, or click "Open in Google Sheets" for the full editing experience.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#666666]">
              <span>•</span>
              <span>Live updates</span>
              <span>•</span>
              <span>Auto-sync</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}