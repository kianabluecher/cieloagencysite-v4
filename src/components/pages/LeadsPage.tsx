import { ExternalLink, FileSpreadsheet } from 'lucide-react';

interface LeadsPageProps {
  onNavigate: (page: string) => void;
}

export function LeadsPage({ onNavigate }: LeadsPageProps) {
  const embedUrl = 'https://docs.google.com/spreadsheets/d/1G6bNfJs_uA57RU4HOknlWy_KxXvKYvM9i48Ftat90w0/edit?usp=sharing';

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Embedded iframe */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          style={{ minHeight: 'calc(100vh - 120px)' }}
          title="Leads Spreadsheet"
        />
      </div>
      
      {/* Button below iframe */}
      <div className="mt-4">
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600/20 border border-green-500/30 rounded text-green-400 hover:bg-green-600/30 hover:border-green-500/50 transition-all font-jetbrains text-xs"
        >
          <ExternalLink size={14} />
          Open in Google Sheets
        </a>
      </div>
    </div>
  );
}