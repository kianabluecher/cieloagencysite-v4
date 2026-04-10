export function LoadingSpinner() {
  return (
    <div className="relative w-32 h-32">
      <style>{`
        @keyframes rotate-outer {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-inner {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .circle-outer {
          animation: rotate-outer 2s linear infinite;
        }

        .circle-inner {
          animation: rotate-inner 1.5s linear infinite;
        }
      `}</style>

      {/* Outer circle */}
      <div className="absolute inset-0 circle-outer">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="100 183"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="white"
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Inner circle */}
      <div className="absolute inset-4 circle-inner">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
            strokeDasharray="80 203"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="white"
            opacity="0.6"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 0,0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/60 text-sm tracking-wider">analyzing</span>
      </div>
    </div>
  );
}
