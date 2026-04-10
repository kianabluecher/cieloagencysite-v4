import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Download, Search, FileText, Terminal, Cpu, Upload, Code, Eye, Copy, Check, Trash2, FileCode, Plus } from 'lucide-react';
import { motion } from "motion/react";
import { toast } from 'sonner';

// CIELO Assets (Keep existing imports just in case, though we might replace some visual representations)
import brandStructureImg from "figma:asset/61253d0a0165b6e4377c669a0c71aa7edfca7ecf.png";
// Venn diagram is now CSS-based, but we keep the import if needed for fallback or other uses.
import vennDiagramImg from "figma:asset/a6356efacf4c11b44c71da9c7be3c18bd0605a71.png";

interface CodeSnippet {
  id: string;
  code: string;
  type: 'html' | 'css';
  addedAt: Date;
}

// --- Styles from the provided HTML & Existing Styles ---
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@300;500;700&display=swap');

    :root {
        --font-sans: 'Inter', 'Space Grotesk', sans-serif;
        --font-mono: 'JetBrains Mono', monospace;
    }

    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
    .font-jetbrains { font-family: 'JetBrains Mono', monospace; }

    /* Scrollbar styling */
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-track { background: #000; }
    .custom-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 0px; }
    .custom-scroll::-webkit-scrollbar-thumb:hover { background: #555; }

    .section-divider {
      width: 100%;
      height: 1px;
      background: #27272a;
      margin: 4rem 0;
    }
    
    .section-header {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.65rem;
      color: #71717a;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin-bottom: 2rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #27272a;
    }

    /* X.AI Grid Specifics */
    .x-grid-container {
        display: grid;
        grid-template-columns: 1fr;
        border: 1px solid #27272a;
        position: relative;
    }
    @media (min-width: 768px) {
        .x-grid-container {
            grid-template-columns: 1fr 1fr;
        }
    }
    .x-grid-item {
        padding: 3rem;
        border-bottom: 1px solid #27272a;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 320px;
        background: #000;
        transition: background-color 0.3s ease;
    }
    .x-grid-item:hover {
        background: #050505;
    }
    @media (min-width: 768px) {
        .x-grid-item {
            border-right: 1px solid #27272a;
            border-bottom: 1px solid #27272a;
        }
        .x-grid-item:nth-child(2n) {
            border-right: none;
        }
        .x-grid-item:nth-last-child(-n+2) {
            border-bottom: none;
        }
    }

    /* Corner anchors */
    .anchor-dot {
        position: absolute;
        width: 6px;
        height: 6px;
        background: #ffffff;
        z-index: 10;
        transform: translate(-50%, -50%);
    }
    .anchor-dot-tl { top: 0; left: 0; }
    .anchor-dot-tc { top: 0; left: 50%; }
    .anchor-dot-tr { top: 0; right: -3px; }
    .anchor-dot-cl { top: 50%; left: 0; }
    .anchor-dot-cc { top: 50%; left: 50%; }
    .anchor-dot-cr { top: 50%; right: -3px; }
    .anchor-dot-bl { bottom: -3px; left: 0; }
    .anchor-dot-bc { bottom: -3px; left: 50%; }
    .anchor-dot-br { bottom: -3px; right: -3px; }

    /* Chart Styles */
    .chart-card {
      background: #000;
      border: 1px solid #27272a;
      padding: 24px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s;
    }
    .chart-card:hover { border-color: #52525b; }

    /* Buttons */
    .btn-x {
        border: 1px solid #27272a;
        color: #a1a1aa;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        padding: 0.5rem 1rem;
        transition: all 0.2s;
        background: transparent;
        cursor: pointer;
    }
    .btn-x:hover {
        color: #fff;
        border-color: #fff;
        background: #000;
    }

    /* Kinetic Styles */
    .card {
      background: #000;
      border: 1px solid #27272a;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 160px;
      position: relative;
      transition: border-color 0.3s;
    }
    .card:hover { border-color: #444; }

    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes radar { 
        0% { transform: scale(1); opacity: 0.8; } 
        100% { transform: scale(2); opacity: 0; } 
    }
    @keyframes ring-dash { 
        0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; } 
        50% { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; } 
        100% { stroke-dasharray: 90, 200; stroke-dashoffset: -124px; } 
    }
    
    .grid-box {
      background: #000;
      border: 1px solid #27272a;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s;
    }
    .grid-box:hover { border-color: #fff; }
  `}</style>
);

// --- Helper: Chart Renderer ---
const ChartSection = () => {
  const lineChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const donutChartRef = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(0);

  const randomizeData = () => {
    setTrigger(t => t + 1);
  };

  useEffect(() => {
    const COLORS = {
      bg: '#000000',
      grid: '#27272a',
      white: '#ffffff',
      grey: '#52525b',
      accent: '#ffffff' 
    };

    const map = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => 
      (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

    const createSVG = (width: number, height: number) => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      return svg;
    };

    const getBezierPath = (points: {x: number, y: number}[]) => {
        let d = `M ${points[0].x},${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const cp1x = prev.x + (curr.x - prev.x) * 0.5;
            const cp1y = prev.y;
            const cp2x = curr.x - (curr.x - prev.x) * 0.5;
            const cp2y = curr.y;
            d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
        }
        return d;
    };

    const drawLine = (container: HTMLDivElement) => {
        container.innerHTML = '';
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const svg = createSVG(width, height);
        const padding = 20;

        // Grid
        for(let i=0; i<5; i++) {
            const y = map(i, 0, 4, height - padding, padding);
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "0");
            line.setAttribute("y1", y.toString());
            line.setAttribute("x2", width.toString());
            line.setAttribute("y2", y.toString());
            line.setAttribute("class", "grid-line");
            line.setAttribute("stroke", COLORS.grid);
            svg.appendChild(line);
        }

        const drawPath = (data: number[], color: string) => {
            const points = data.map((val, i) => ({
                x: map(i, 0, data.length - 1, 0, width),
                y: map(val, 0, 100, height - padding, padding)
            }));
            const d = getBezierPath(points);
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            path.setAttribute("fill", "none");
            path.setAttribute("stroke", color);
            path.setAttribute("stroke-width", "1.5");
            svg.appendChild(path);
            
            // Dots
            points.forEach((p, i) => {
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", p.x.toString());
                circle.setAttribute("cy", p.y.toString());
                circle.setAttribute("r", "2");
                circle.setAttribute("fill", "#000");
                circle.setAttribute("stroke", color);
                circle.setAttribute("stroke-width", "1.5");
                svg.appendChild(circle);
            });
        };

        const rArr = Array.from({length: 10}, () => Math.floor(Math.random() * 70) + 20);
        drawPath(rArr, COLORS.white);
        container.appendChild(svg);
    };

    const drawBar = (container: HTMLDivElement) => {
        container.innerHTML = '';
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const svg = createSVG(width, height);
        const data = Array.from({length: 8}, () => Math.floor(Math.random() * 70) + 20);
        const barWidth = (width / data.length) * 0.6;
        const spacing = (width / data.length);

        data.forEach((val, i) => {
            const h = map(val, 0, 100, 0, height);
            const x = (i * spacing) + (spacing/2) - (barWidth/2);
            const y = height - h;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x.toString());
            rect.setAttribute("y", y.toString());
            rect.setAttribute("width", barWidth.toString());
            rect.setAttribute("height", h.toString());
            rect.setAttribute("fill", i === data.length - 1 ? COLORS.white : COLORS.grey);
            svg.appendChild(rect);
        });
        container.appendChild(svg);
    };

    const drawDonut = (container: HTMLDivElement) => {
        container.innerHTML = '';
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        const svg = createSVG(width, height);
        const data = [30, 20, 50];
        const total = 100;
        let currentAngle = 0;
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(width, height) / 2 - 10;
        const colors = [COLORS.grey, '#333', COLORS.white];

        data.forEach((val, i) => {
            const sliceAngle = (val / total) * 2 * Math.PI;
            const x1 = cx + radius * Math.cos(currentAngle);
            const y1 = cy + radius * Math.sin(currentAngle);
            const x2 = cx + radius * Math.cos(currentAngle + sliceAngle);
            const y2 = cy + radius * Math.sin(currentAngle + sliceAngle);
            const largeArc = sliceAngle > Math.PI ? 1 : 0;
            const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            path.setAttribute("fill", colors[i]);
            path.setAttribute("stroke", COLORS.bg);
            path.setAttribute("stroke-width", "2");
            svg.appendChild(path);
            currentAngle += sliceAngle;
        });
        
        const hole = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        hole.setAttribute("cx", cx.toString());
        hole.setAttribute("cy", cy.toString());
        hole.setAttribute("r", (radius * 0.6).toString());
        hole.setAttribute("fill", COLORS.bg);
        svg.appendChild(hole);

        container.appendChild(svg);
    };

    if (lineChartRef.current) drawLine(lineChartRef.current);
    if (barChartRef.current) drawBar(barChartRef.current);
    if (donutChartRef.current) drawDonut(donutChartRef.current);

  }, [trigger]);

  return (
    <div className="space-y-6">
       <header className="mb-8 flex justify-between items-end">
          <div>
              <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">Metrics & Analytics</h1>
              <p className="text-zinc-500 text-sm">Realtime data processing visualization.</p>
          </div>
          <button onClick={randomizeData} className="btn-x">
              <RefreshCw size={12} className="inline mr-2" /> REFRESH DATA
          </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-zinc-800 bg-black">
          <div className="chart-card col-span-1 md:col-span-2 !border-0 !border-b md:!border-r border-zinc-800">
              <div className="flex justify-between mb-6">
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Revenue Stream</h3>
              </div>
              <div ref={lineChartRef} className="h-64 w-full"></div>
          </div>
          <div className="chart-card !border-0 !border-b border-zinc-800">
              <div className="flex justify-between mb-6">
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Latency</h3>
              </div>
              <div ref={barChartRef} className="h-64 w-full"></div>
          </div>
          <div className="chart-card !border-0 !border-b md:border-b-0 md:border-r border-zinc-800">
              <div className="flex justify-between mb-6">
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Resources</h3>
              </div>
              <div ref={donutChartRef} className="h-48 w-full"></div>
          </div>
          <div className="chart-card !border-0">
             {/* Placeholder for another chart if needed, or keep as filler */}
              <div className="flex justify-between mb-6">
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-widest">System Load</h3>
              </div>
              <div className="h-48 w-full flex items-center justify-center text-zinc-700 text-xs font-mono">
                  [ OFFLINE ]
              </div>
          </div>
      </div>
    </div>
  );
};

// --- Canvas Fog Component ---
const NexusFog = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.parentElement?.offsetWidth || 0;
        let height = canvas.parentElement?.offsetHeight || 0;
        
        const resize = () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
            }
        };
        window.addEventListener('resize', resize);
        resize();

        // Adjusted for Monochrome/White
        const blobs = [
            { x: Math.random() * width, y: Math.random() * height, r: Math.min(width, height) * 0.6, vx: 0.2, vy: 0.1, color: 'rgba(255, 255, 255, 0.05)' },
            { x: Math.random() * width, y: Math.random() * height, r: Math.min(width, height) * 0.6, vx: -0.1, vy: 0.2, color: 'rgba(100, 100, 100, 0.05)' },
        ];

        let animationId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            blobs.forEach(b => {
                b.x += b.vx;
                b.y += b.vy;
                if(b.x < -b.r || b.x > width + b.r) b.vx *= -1;
                if(b.y < -b.r || b.y > height + b.r) b.vy *= -1;
                
                const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
                gradient.addColorStop(0, b.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
            });
            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 w-full h-full" />;
};

export function BrandGuidelinesContent({ section }: { section?: string }) {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [codeInput, setCodeInput] = useState('');
  const [combinedCSS, setCombinedCSS] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const detectCodeType = (code: string): 'html' | 'css' => {
    return code.includes('<') || code.includes('/>') ? 'html' : 'css';
  };

  const addSnippet = (code: string) => {
    if (!code.trim()) {
      toast.error('Please enter some code');
      return;
    }

    const newSnippet: CodeSnippet = {
      id: Date.now().toString(),
      code: code.trim(),
      type: detectCodeType(code),
      addedAt: new Date(),
    };

    setSnippets([...snippets, newSnippet]);
    setCodeInput('');
    toast.success('Snippet added to preview');
    setTimeout(() => updateCSSConsole(), 100);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      addSnippet(text);
    } catch (err) {
      toast.error('Failed to read file');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter(s => s.id !== id));
    toast.success('Snippet removed');
    setTimeout(() => updateCSSConsole(), 100);
  };

  const updateCSSConsole = () => {
    // Extract all CSS from snippets
    let combined = '';
    
    snippets.forEach(snippet => {
      if (snippet.type === 'css') {
        combined += snippet.code + '\n\n';
      } else if (snippet.type === 'html') {
        // Extract CSS from <style> tags
        const styleMatches = snippet.code.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
        if (styleMatches) {
          styleMatches.forEach(match => {
            const cssContent = match.replace(/<\/?style[^>]*>/gi, '');
            combined += cssContent + '\n\n';
          });
        }
      }
    });

    setCombinedCSS(combined.trim());
  };
  
  // Auto-scroll to section if provided
  useEffect(() => {
      if (section) {
          const el = document.getElementById(section);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
  }, [section]);

  useEffect(() => {
    updateCSSConsole();
  }, [snippets]);

  return (
    <div className="relative w-full bg-black min-h-screen text-zinc-200 overflow-hidden selection:bg-white selection:text-black font-sans">
      <Styles />
      <div className="noise fixed top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none z-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+')]"></div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10">
        
        {/* ========================================================================
             CSS/HTML SNIPPET BUILDER
        ======================================================================== */}
        <section className="w-full mb-32">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-4">CSS Snippet Builder</h2>
            <p className="text-zinc-500 text-lg max-w-2xl font-light">
              Add and preview HTML/CSS snippets with hover-to-copy functionality. Combined CSS console at the bottom.
            </p>
          </div>

          {/* Code Input */}
          <div className="bg-black border border-zinc-800 p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Code size={20} className="text-zinc-400" />
                <h3 className="text-xl text-white tracking-tight font-jetbrains">CUSTOM HTML / CSS</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-800 text-zinc-300 font-jetbrains text-xs tracking-wider hover:border-zinc-600 hover:text-white transition-all"
                >
                  <Upload size={16} />
                  UPLOAD FILE
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".html,.css,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => addSnippet(codeInput)}
                  className="flex items-center gap-2 px-6 py-2 bg-white text-black font-jetbrains text-xs tracking-wider hover:bg-zinc-200 transition-all"
                >
                  <Plus size={16} />
                  ADD TO PAGE
                </button>
              </div>
            </div>

            <textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Paste HTML or CSS snippet here..."
              rows={8}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-jetbrains text-sm"
            />
          </div>

          {/* Preview Area */}
          <div className="bg-black border border-zinc-800 p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Eye size={20} className="text-zinc-400" />
                <h3 className="text-xl text-white tracking-tight font-jetbrains">PREVIEW</h3>
              </div>
              <span className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 font-jetbrains">
                {snippets.length} SNIPPET{snippets.length !== 1 ? 'S' : ''}
              </span>
            </div>

            <div className="border border-dashed border-zinc-800 min-h-[400px] p-6">
              {snippets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <FileCode size={64} className="text-zinc-800 mb-4" />
                  <p className="text-zinc-600 text-sm font-jetbrains">NO SNIPPETS ADDED YET</p>
                  <p className="text-zinc-700 text-xs mt-2 font-jetbrains">[ ADD CODE TO SEE PREVIEW ]</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {snippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="relative group bg-zinc-900/50 border border-zinc-800 p-8 hover:border-zinc-600 transition-all"
                    >
                      {/* Snippet Type Badge */}
                      <div className="absolute top-4 right-4 z-30">
                        <span className={`text-xs px-2 py-1 font-jetbrains tracking-wider ${
                          snippet.type === 'html'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        }`}>
                          {snippet.type.toUpperCase()}
                        </span>
                      </div>

                      {/* Hover Overlay with Actions */}
                      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3 z-40 rounded-lg">
                        <button
                          onClick={() => copyToClipboard(snippet.code, snippet.id)}
                          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-jetbrains text-xs tracking-wider hover:bg-zinc-200 transition-all"
                        >
                          {copiedId === snippet.id ? (
                            <>
                              <Check size={16} />
                              COPIED!
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              COPY CODE
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => deleteSnippet(snippet.id)}
                          className="flex items-center gap-2 px-6 py-3 border border-zinc-600 text-zinc-300 font-jetbrains text-xs tracking-wider hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={16} />
                          DELETE
                        </button>
                      </div>

                      {/* Rendered Content - This shows the actual visual output */}
                      <div 
                        className="snippet-rendered-content relative z-10"
                        dangerouslySetInnerHTML={{ __html: snippet.code }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CSS Console */}
          <div className="bg-black border border-zinc-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Terminal size={20} className="text-zinc-400" />
                <h3 className="text-xl text-white tracking-tight font-jetbrains">CSS CONSOLE (COMBINED)</h3>
              </div>
              
              {combinedCSS && (
                <button
                  onClick={() => copyToClipboard(combinedCSS, 'console')}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-800 text-zinc-300 font-jetbrains text-xs tracking-wider hover:border-zinc-600 hover:text-white transition-all"
                >
                  {copiedId === 'console' ? (
                    <>
                      <Check size={14} />
                      COPIED
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      COPY ALL
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 min-h-[400px] max-h-[500px] overflow-auto custom-scroll">
              {combinedCSS ? (
                <pre className="p-6 text-green-400 font-jetbrains text-xs leading-relaxed whitespace-pre-wrap">
                  {combinedCSS}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <Terminal size={64} className="text-zinc-800 mb-4" />
                  <p className="text-zinc-600 text-sm font-jetbrains">NO CSS DETECTED</p>
                  <p className="text-zinc-700 text-xs mt-2 font-jetbrains">[ ADD SNIPPETS WITH CSS TO SEE OUTPUT ]</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="section-divider"></div>
        
        {/* ========================================================================
             SECTION 1: CAPABILITIES (GRID SYSTEM)
        ======================================================================== */}
        <section id="section-icon-system" className="w-full mb-32">
             <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter mb-4">Research & Analysis</h2>
                <p className="text-zinc-500 text-lg max-w-2xl font-light">
                    Leverage the power of base Grok models. Key features include:
                </p>
            </div>

            <div className="x-grid-container">
                <div className="anchor-dot anchor-dot-tl"></div>
                <div className="anchor-dot anchor-dot-tc hidden md:block"></div>
                <div className="anchor-dot anchor-dot-tr"></div>
                <div className="anchor-dot anchor-dot-cl hidden md:block"></div>
                <div className="anchor-dot anchor-dot-cc hidden md:block"></div>
                <div className="anchor-dot anchor-dot-cr hidden md:block"></div>
                <div className="anchor-dot anchor-dot-bl"></div>
                <div className="anchor-dot anchor-dot-bc hidden md:block"></div>
                <div className="anchor-dot anchor-dot-br"></div>

                <div className="x-grid-item group">
                    <div className="mb-8">
                        <Search className="text-white w-8 h-8 mb-6 stroke-[1.5]" />
                        <h3 className="text-xl font-medium text-white mb-4">Search Tools</h3>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            Harness realtime X and internet search for fast, comprehensive insights into current events and trends.
                        </p>
                    </div>
                </div>

                <div className="x-grid-item group">
                    <div className="mb-8">
                        <FileText className="text-white w-8 h-8 mb-6 stroke-[1.5]" />
                        <h3 className="text-xl font-medium text-white mb-4">Files Search</h3>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            Intelligently search and retrieve relevant documents from your uploaded files, with citations.
                        </p>
                    </div>
                </div>

                <div className="x-grid-item group">
                    <div className="mb-8">
                        <Terminal className="text-white w-8 h-8 mb-6 stroke-[1.5]" />
                        <h3 className="text-xl font-medium text-white mb-4">Code Execution</h3>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            Execute Python code in a secure sandbox to analyze data and run simulations.
                        </p>
                    </div>
                </div>

                <div className="x-grid-item group">
                    <div className="mb-8">
                        <Cpu className="text-white w-8 h-8 mb-6 stroke-[1.5]" />
                        <h3 className="text-xl font-medium text-white mb-4">MCP Tools</h3>
                        <p className="text-zinc-400 font-light leading-relaxed">
                            Connect seamlessly to external MCP servers, enabling access to powerful custom third-party tools.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <div className="section-divider"></div>

        {/* ========================================================================
             SECTION 2: AXIS // DATA VISUALIZATION
        ======================================================================== */}
        <section id="section-axis-visuals" className="w-full mb-24">
            <div className="section-header">SECTION 2: AXIS // VISUALIZATION ENGINE</div>
            <ChartSection />
        </section>

        <div className="section-divider"></div>

        {/* ========================================================================
             SECTION 3: KINETIC // INTERACTION LIBRARY
        ======================================================================== */}
        <section id="section-kinetic-library" className="w-full mb-24">
            <div className="section-header">SECTION 3: KINETIC // INTERACTION STATES</div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border border-zinc-800 bg-black">
                {/* Processing */}
                <div className="card !border-0 !border-r !border-b border-zinc-800 p-8 flex flex-col items-center justify-center gap-4 h-40">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="animate-[spin_1s_linear_infinite]">
                        <circle cx="20" cy="20" r="16" stroke="#222" strokeWidth="2" fill="none"></circle>
                        <circle cx="20" cy="20" r="16" stroke="#fff" strokeWidth="2" fill="none" strokeDasharray="100" strokeDashoffset="60" strokeLinecap="round"></circle>
                    </svg>
                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Processing</span>
                </div>
                
                {/* Await */}
                <div className="card !border-0 !border-r !border-b border-zinc-800 p-8 flex flex-col items-center justify-center gap-4 h-40">
                     <svg width="40" height="40" viewBox="0 0 40 40">
                        <circle cx="10" cy="20" r="2" fill="white">
                            <animate attributeName="cy" values="20;15;20" dur="0.6s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="20" cy="20" r="2" fill="white">
                            <animate attributeName="cy" values="20;15;20" dur="0.6s" begin="0.1s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="30" cy="20" r="2" fill="white">
                            <animate attributeName="cy" values="20;15;20" dur="0.6s" begin="0.2s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Await</span>
                </div>
                 
                {/* Broadcast */}
                <div className="card !border-0 !border-r !border-b border-zinc-800 p-8 flex flex-col items-center justify-center gap-4 h-40">
                    <div className="relative flex items-center justify-center w-12 h-12">
                        <span className="absolute w-2 h-2 bg-white rounded-full z-10"></span>
                        <span className="absolute w-full h-full border border-white rounded-full opacity-0 animate-[radar_2s_infinite]"></span>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Broadcast</span>
                </div>

                {/* Analyzing */}
                <div className="card !border-0 !border-r !border-b border-zinc-800 p-8 flex flex-col items-center justify-center gap-4 h-40">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="stroke-white stroke-2 strokeLinecap-round">
                        <line x1="12" y1="15" x2="12" y2="25"><animate attributeName="y1" values="15;10;15" dur="0.6s" repeatCount="indefinite" /><animate attributeName="y2" values="25;30;25" dur="0.6s" repeatCount="indefinite" /></line>
                        <line x1="20" y1="15" x2="20" y2="25"><animate attributeName="y1" values="15;10;15" dur="0.6s" begin="0.1s" repeatCount="indefinite" /><animate attributeName="y2" values="25;30;25" dur="0.6s" begin="0.1s" repeatCount="indefinite" /></line>
                        <line x1="28" y1="15" x2="28" y2="25"><animate attributeName="y1" values="15;10;15" dur="0.6s" begin="0.2s" repeatCount="indefinite" /><animate attributeName="y2" values="25;30;25" dur="0.6s" begin="0.2s" repeatCount="indefinite" /></line>
                    </svg>
                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Analyzing</span>
                </div>
                
                {/* Syncing */}
                <div className="card !border-0 !border-b border-zinc-800 p-8 flex flex-col items-center justify-center gap-4 h-40">
                    <svg className="w-10 h-10 animate-[spin_2s_linear_infinite]" viewBox="25 25 50 50">
                        <circle cx="50" cy="50" r="20" fill="none" stroke="#222" strokeWidth="2"></circle>
                        <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{animation: 'ring-dash 1.5s ease-in-out infinite'}}></circle>
                    </svg>
                    <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">Syncing</span>
                </div>
            </div>
        </section>

        <div className="section-divider"></div>

        {/* ========================================================================
             SECTION 4: CIELO ASSETS // TYPOGRAPHY SYSTEM
        ======================================================================== */}
        <section id="section-onyx-assets" className="w-full mb-24">
            <div className="section-header">SECTION 4: CIELO // TYPOGRAPHY SYSTEM</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
                
                {/* Sans Serif Column */}
                <div className="bg-black p-8 md:p-12">
                    <div className="flex justify-between items-start mb-12">
                        <span className="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded">SANS SERIF</span>
                        <span className="text-xs text-zinc-500">Inter / Space Grotesk</span>
                    </div>
                    
                    <div className="mb-16">
                        <div className="text-[120px] leading-none font-medium tracking-tighter text-white mb-4 font-sans">Aa</div>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                            The primary typeface used for UI elements, headings, and body text. Optimized for legibility at all sizes with a clean, geometric structure.
                        </p>
                    </div>

                    <div className="space-y-6 font-sans">
                        <div>
                            <div className="text-4xl font-semibold text-white tracking-tight mb-2">The quick brown fox</div>
                            <div className="text-xs text-zinc-600 font-mono">Semibold 36px</div>
                        </div>
                        <div>
                            <div className="text-2xl font-medium text-white tracking-tight mb-2">Jumps over the lazy dog</div>
                            <div className="text-xs text-zinc-600 font-mono">Medium 24px</div>
                        </div>
                        <div>
                            <div className="text-base font-normal text-zinc-300 mb-2">Pack my box with five dozen liquor jugs.</div>
                            <div className="text-xs text-zinc-600 font-mono">Regular 16px</div>
                        </div>
                    </div>
                </div>

                {/* Monospace Column */}
                <div className="bg-black p-8 md:p-12">
                    <div className="flex justify-between items-start mb-12">
                        <span className="text-xs font-mono text-zinc-500 border border-zinc-800 px-2 py-1 rounded">MONOSPACE</span>
                        <span className="text-xs text-zinc-500 font-jetbrains">JetBrains Mono</span>
                    </div>

                    <div className="mb-16">
                        <div className="text-[120px] leading-none font-jetbrains font-medium tracking-tighter text-white mb-4">Ii</div>
                        <p className="text-zinc-400 text-sm font-jetbrains leading-relaxed max-w-sm">
                            Used for code blocks, data visualization labels, technical specifications, and system status indicators.
                        </p>
                    </div>

                    <div className="space-y-6 font-jetbrains">
                        <div>
                            <div className="text-2xl font-bold text-white mb-2">function init() {'{'}</div>
                            <div className="text-xs text-zinc-600">Bold 24px</div>
                        </div>
                        <div>
                            <div className="text-lg font-medium text-white mb-2">const scale = 1.0;</div>
                            <div className="text-xs text-zinc-600">Medium 18px</div>
                        </div>
                        <div>
                            <div className="text-sm font-normal text-zinc-300 mb-2">return data.filter(x ={'>'} x.id);</div>
                            <div className="text-xs text-zinc-600">Regular 14px</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Original Interactive Elements (Buttons) - Kept but styled to match */}
            <div className="mt-8 p-8 bg-[#000] border border-zinc-800">
                 <div className="mb-8">
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2 font-sans">Interactive Elements</h3>
                    <p className="text-xs font-jetbrains text-zinc-500 uppercase tracking-wide">Primary & Secondary Actions</p>
                </div>
                 <div className="flex flex-col gap-4">
                    {/* 1. Recommended Pill */}
                    <button className="group relative px-6 py-2.5 bg-[#052e16] text-[#4ade80] font-jetbrains text-xs font-bold tracking-widest rounded-full flex items-center justify-center gap-2 hover:bg-[#064e23] transition-colors w-fit">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#4ade80]"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        RECOMMENDED
                    </button>

                    {/* 2. Download Details Pill */}
                    <button className="group relative px-6 py-3 bg-white text-black font-jetbrains text-sm tracking-wider rounded-full flex items-center justify-center gap-3 hover:bg-zinc-200 transition-colors w-full sm:w-auto">
                        DOWNLOAD DETAILS
                        <Download size={16} className="stroke-[1.5]" />
                    </button>

                    {/* 3. Documentation Outline */}
                    <button className="group relative px-6 py-3 bg-transparent border border-zinc-800 text-zinc-300 font-jetbrains text-xs tracking-[0.2em] rounded-full flex items-center justify-between hover:border-zinc-600 hover:text-white transition-all w-full sm:w-auto">
                        <span>DOCUMENTATION</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 transition-opacity ml-4"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </button>

                    {/* 4. Services Bracket Tag */}
                    <div className="flex items-center justify-center pt-2 w-full sm:w-auto">
                         <span className="font-jetbrains text-zinc-500 text-xs tracking-widest uppercase group-hover:text-zinc-300 transition-colors cursor-default">
                            [ SERVICES ]
                         </span>
                    </div>
                </div>
            </div>
        </section>

        <div className="section-divider"></div>

        {/* ========================================================================
             SECTION 5: STRATEGIC POSITIONING (VENN)
        ======================================================================== */}
        <section id="section-onyx-ui" className="w-full mb-32">
             <div className="section-header">SECTION 5: TARGET DEMOGRAPHICS</div>
             
             <div className="relative w-full h-[600px] md:h-[500px] bg-black border border-zinc-800 overflow-hidden flex items-center justify-center">
                
                {/* Header Label */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20">
                    <span className="font-jetbrains text-zinc-500 tracking-[0.2em] text-xs">[ BUILT FOR ]</span>
                </div>

                {/* VENN DIAGRAM CONTAINER */}
                <div className="relative w-full h-full flex items-center justify-center scale-75 md:scale-90 lg:scale-100">
                    
                    {/* Left Circle */}
                    <div className="absolute md:left-[50%] md:-translate-x-[65%] md:top-1/2 md:-translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-zinc-700/60 flex items-center justify-center text-center p-8 z-10 transition-colors hover:border-zinc-500 hover:bg-zinc-900/10">
                        <div className="font-jetbrains text-white text-sm md:text-base leading-relaxed tracking-wider">
                            FINANCIAL ADVISORS,<br/>
                            INVESTORS, AND FUNDS
                        </div>
                    </div>

                    {/* Right Circle */}
                    <div className="absolute md:left-[50%] md:-translate-x-[35%] md:top-1/2 md:-translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-zinc-700/60 flex items-center justify-center text-center p-8 z-10 transition-colors hover:border-zinc-500 hover:bg-zinc-900/10">
                        <div className="font-jetbrains text-white text-sm md:text-base leading-relaxed tracking-wider">
                            B2B FOUNDERS PREPARING<br/>
                            TO SCALE OR RAISE CAPITAL
                        </div>
                    </div>

                    {/* Center Circle (Top Layer visual priority but middle logically) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-zinc-700/60 flex items-center justify-center text-center p-8 z-20 pointer-events-none">
                        <div className="font-jetbrains text-white text-sm md:text-base leading-relaxed tracking-wider bg-black/60 backdrop-blur-sm px-4 py-2 border border-zinc-800/50 rounded-lg pointer-events-auto">
                            FINTECH, SAAS,<br/>
                            AND PROFESSIONAL FIRMS
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <div className="section-divider"></div>

        {/* ========================================================================
             SECTION 6: NUCLEUS // CENTRAL INTELLIGENCE
        ======================================================================== */}
        <section id="section-nexus-pro" className="w-full mb-32">
             <div className="section-header">SECTION 6: NUCLEUS // PURE INTELLIGENCE</div>
             
             <div className="relative bg-black overflow-hidden border border-zinc-800 rounded-none h-[600px]">
                 <NexusFog />
                 
                 {/* Overlay UI */}
                 <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                     <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 font-sans">
                        Pure Intelligence
                     </h1>
                     <p className="text-zinc-500 max-w-lg mx-auto text-lg mb-8 font-light">
                        Connect to the world's most powerful knowledge engine.
                     </p>
                     <div className="flex gap-4">
                        <button className="px-8 py-3 bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors">
                            Start Research
                        </button>
                        <button className="px-8 py-3 border border-zinc-800 text-white font-medium text-sm hover:bg-zinc-900 transition-colors">
                            Documentation
                        </button>
                     </div>
                 </div>
             </div>
        </section>

      </div>
    </div>
  );
};