import { lazy, Suspense } from 'react';

// Lazy load GlobalConnection to prevent Three.js from loading multiple times during hot reload
const GlobalConnectionLazy = lazy(() => 
  import('./GlobalConnection').then(module => ({
    default: module.GlobalConnection
  }))
);

export function GlobalConnectionWrapper() {
  return (
    <Suspense fallback={
      <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center">
        <div className="text-[#FF8C00]">Loading 3D Globe...</div>
      </div>
    }>
      <GlobalConnectionLazy />
    </Suspense>
  );
}
