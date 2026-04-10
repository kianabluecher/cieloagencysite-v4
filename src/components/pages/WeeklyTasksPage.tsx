import { ExternalLink, FileText } from 'lucide-react';

interface WeeklyTasksPageProps {
  onNavigate: (page: string) => void;
}

export function WeeklyTasksPage({ onNavigate }: WeeklyTasksPageProps) {
  const documentId = '1454ftLwdiuDotqMl38467rYjEn4kpbQODUuIZNEvBCU';
  const embedUrl = `https://docs.google.com/document/d/${documentId}/preview`;
  const editUrl = `https://docs.google.com/document/d/${documentId}/edit?usp=sharing`;

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Embedded iframe */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          style={{ minHeight: 'calc(100vh - 180px)' }}
          title="Weekly Team Tasks"
        />
      </div>
      
      {/* Button below iframe */}
      <div className="mt-4">
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-600/20 border border-sky-500/30 rounded text-sky-400 hover:bg-sky-600/30 hover:border-sky-500/50 transition-all font-jetbrains text-xs"
        >
          <ExternalLink size={14} />
          Open in Google Docs
        </a>
      </div>
    </div>
  );
}