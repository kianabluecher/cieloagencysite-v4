export function ParticleGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base Gradient Background */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse 900px 500px at 20% 30%, rgba(42, 63, 95, 0.35) 0%, rgba(26, 35, 50, 0.2) 40%, transparent 70%)',
        }}
      />
      
      {/* Secondary Gradient */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse 700px 400px at 80% 20%, rgba(30, 45, 61, 0.3) 0%, rgba(15, 20, 25, 0.15) 50%, transparent 75%)',
        }}
      />

      {/* Subtle Overlay Glow */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 1200px 600px at 50% 40%, rgba(155, 181, 212, 0.08) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
