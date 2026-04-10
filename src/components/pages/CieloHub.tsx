interface CieloHubProps {
  onNavigate: (page: string) => void;
}

export function CieloHub({ onNavigate }: CieloHubProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl tracking-tight mb-2">
            CIELO Hub
          </h1>
          <p className="text-zinc-500 text-sm">
            Strategy - Brand & Web Assets
          </p>
        </div>

        {/* Main Content Area */}
        <div className="bg-black border border-zinc-800 rounded-md overflow-hidden">
          {/* Section Header */}
          <div className="border-b border-zinc-800 p-6">
            <h2 className="text-xl mb-1">Brand & Web Assets</h2>
            <p className="text-zinc-500 text-sm">
              Access brand guidelines, web assets, and documentation
            </p>
          </div>

          {/* Embedded Google Drive Folder */}
          <div className="relative w-full" style={{ height: '90vh' }}>
            <iframe
              src="https://drive.google.com/embeddedfolderview?id=0AL-j0T0bk-kZUk9PVA#grid"
              className="w-full h-full border-0"
              style={{ minHeight: '700px' }}
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-zinc-600 text-sm">
            Access all brand assets, guidelines, and project documentation
          </p>
        </div>
      </div>
    </div>
  );
}