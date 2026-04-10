import React, { useEffect, useRef } from "react";
import imgImage1 from "figma:asset/7047ae2b3693ff38a9096fd1dd276d40e5a786df.png";
import { imgImage, imgGradient } from "./imports/svg-10son";
import svgPaths from "./imports/svg-tcuqlndjlt";

// --- Particle Animation Component ---

function ParticleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = 50;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedY: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        // Move particle up
        p.y -= p.speedY;

        // Reset if out of bounds
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
}


// --- CTA Components ---

function Image() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[976px_378px]" data-name="image" style={{ maskImage: `url('${imgImage}')`, WebkitMaskImage: `url('${imgImage}')` }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-blue-900/20 to-purple-900/20">
         {/* Replaced static image with Particle Animation + subtle gradient backing */}
         <div className="absolute inset-0 opacity-30">
             <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover opacity-50" src={imgImage1} />
         </div>
         <ParticleAnimation />
      </div>
    </div>
  );
}

function CanvasMaskGroup() {
  return (
    <div className="absolute bottom-[33.86%] left-0 right-0 top-[-33.86%]" data-name="Canvas:mask-group">
      <Image />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute h-[500px] left-[-400px] right-[-400px] top-[-128px]" data-name="Mask Group">
      <div className="absolute h-[500px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0px] mask-size-[100%_500px] right-0 top-0" data-name="Gradient" style={{ maskImage: `url('${imgGradient}')`, WebkitMaskImage: `url('${imgGradient}')` }} />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[11.25%_2.42%_8.75%_2.17%] flex items-center justify-center" data-name="Group">
      <div className="absolute bottom-[-1.63%] left-0 right-0 top-0 flex items-center justify-center">
         {/* Logo Removed as requested */}
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[80px] md:h-[120px] relative shrink-0 w-full max-w-[600px] flex justify-center" data-name="SVG">
      <Group />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center min-w-[300px] md:min-w-[438.44px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#7d8187] text-[20px] text-center whitespace-pre-wrap">
        <p className="leading-[28px] mb-0">Build the future with CIELO.</p>
        <p className="leading-[28px] mt-2 md:mt-0">
          <span>{`Unlock `}</span>
          <span className="text-white">Strategic Intelligence</span>
          <span>{` for your enterprise.`}</span>
        </p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Margin">
      <Container />
    </div>
  );
}

function Container1() {
  return (
    <div className="box-border content-stretch flex flex-col items-center max-w-[600px] px-[22.73px] py-0 relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Helvetica:Regular',sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[#7d8187] text-[16px] md:text-[20px] text-center whitespace-pre-wrap">
        <p className="mb-0">
          <span>{`We've just launched `}</span>
          <span className="text-white">Cielo Systems</span>, providing
        </p>
        <p>enterprise-grade AI infrastructure and strategic consulting.</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Margin">
      <Container1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Frame">
      <div className="absolute inset-[18.75%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
            <path d={svgPaths.pbb74a00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute content-stretch flex flex-col items-center justify-center left-[-2px] overflow-clip size-[16px] top-[4px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="h-[24px] relative shrink-0 w-[12px]" data-name="SVG:margin">
      <Svg1 />
    </div>
  );
}

function Link({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="box-border content-stretch flex gap-[12.01px] items-center justify-center px-[24px] py-[12px] relative rounded-[9999px] shrink-0 hover:bg-white/10 transition-colors cursor-pointer group" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.25)] border-solid inset-0 pointer-events-none rounded-[9999px] group-hover:border-white/50 transition-colors" />
      <div className="flex flex-col font-mono font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white tracking-[1.4px] uppercase">
        <p className="leading-[20px] whitespace-pre">Get Started</p>
      </div>
      <SvgMargin />
    </button>
  );
}

function LinkMargin({ onClick }: { onClick?: () => void }) {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[32px] px-0 relative shrink-0" data-name="Link:margin">
      <Link onClick={onClick} />
    </div>
  );
}

function Container2({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[600px] relative shrink-0 z-10" data-name="Container">
      <Svg />
      <Margin />
      <Margin1 />
      <LinkMargin onClick={() => onNavigate?.('contact')} />
    </div>
  );
}

function Container3({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-0 py-[24px] relative shrink-0 w-full" data-name="Container">
      <CanvasMaskGroup />
      <div className="absolute bg-gradient-to-r from-[rgba(255,255,255,0)] h-px left-0 opacity-40 right-0 to-[rgba(255,255,255,0)] top-[-128px] via-50% via-[#ffffff]" data-name="Horizontal Divider" />
      <MaskGroup />
      <Container2 onNavigate={onNavigate} />
    </div>
  );
}

export function ConsultingCTA({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="relative w-full border-t border-[#222] bg-black overflow-hidden" data-name="Section">
      <div className="w-full">
        <div className="box-border content-stretch flex flex-col items-center px-[24px] py-[128px] relative w-full">
          <Container3 onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
