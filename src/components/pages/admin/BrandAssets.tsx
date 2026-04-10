export function BrandAssets() {
  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl text-white mb-2 tracking-tight">
          Brand Assets
        </h1>
        <p className="text-zinc-500 text-sm">
          Access brand guidelines, web assets, and documentation
        </p>
      </div>

      {/* Embedded Google Drive Folder */}
      <div className="bg-black border border-zinc-800 rounded-md overflow-hidden">
        <div className="relative w-full" style={{ height: 'calc(100vh - 240px)', minHeight: '600px' }}>
          <iframe
            src="https://drive.google.com/embeddedfolderview?id=0AL-j0T0bk-kZUk9PVA#grid"
            className="w-full h-full border-0"
          />
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-4 text-center">
        <p className="text-zinc-600 text-xs">
          All brand assets, guidelines, and project documentation in one place
        </p>
      </div>
    </div>
  );
}
