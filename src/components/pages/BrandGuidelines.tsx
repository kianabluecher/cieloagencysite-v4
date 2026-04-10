import { useState, useRef, useEffect } from 'react';
import { Upload, Code, Eye, Copy, Check, Trash2, FileCode, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CodeSnippet {
  id: string;
  code: string;
  type: 'html' | 'css';
  addedAt: Date;
}

interface BrandGuidelinesProps {
  onNavigate?: (page: string) => void;
}

export function BrandGuidelines({ onNavigate }: BrandGuidelinesProps) {
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
    updateCSSConsole();
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
    updateCSSConsole();
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

  useEffect(() => {
    updateCSSConsole();
  }, [snippets]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Brand Guidelines</h1>
        <p className="text-zinc-400">Add and preview HTML/CSS snippets for your brand assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Code Input Section */}
        <div className="lg:col-span-2">
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Code size={20} className="text-zinc-400" />
                <h3 className="text-lg text-white">Custom HTML / CSS</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-300 text-sm transition-all"
                >
                  <Upload size={16} />
                  Upload File
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
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-400 rounded-xl text-sm transition-all"
                >
                  <Plus size={16} />
                  Add to Page
                </button>
              </div>
            </div>

            <textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Paste HTML or CSS snippet here..."
              rows={8}
              className="w-full px-4 py-3 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 resize-none transition-all font-mono text-sm"
            />
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Eye size={20} className="text-zinc-400" />
            <h3 className="text-lg text-white">Preview</h3>
            <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-lg">
              {snippets.length} snippet{snippets.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="border border-dashed border-white/10 rounded-xl min-h-[400px] p-4 bg-black/10">
            {snippets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <FileCode size={48} className="text-zinc-700 mb-4" />
                <p className="text-zinc-500 text-sm">No snippets added yet</p>
                <p className="text-zinc-600 text-xs mt-1">Add code to see preview here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {snippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className="relative group bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all"
                  >
                    {/* Snippet Type Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        snippet.type === 'html'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {snippet.type.toUpperCase()}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 z-20">
                      <button
                        onClick={() => copyToClipboard(snippet.code, snippet.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-400 rounded-lg transition-all"
                      >
                        {copiedId === snippet.id ? (
                          <>
                            <Check size={16} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copy Code
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => deleteSnippet(snippet.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>

                    {/* Rendered Content */}
                    <div 
                      className="snippet-content pt-8"
                      dangerouslySetInnerHTML={{ __html: snippet.code }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CSS Console */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileCode size={20} className="text-zinc-400" />
              <h3 className="text-lg text-white">CSS Console (Combined)</h3>
            </div>
            
            {combinedCSS && (
              <button
                onClick={() => copyToClipboard(combinedCSS, 'console')}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-zinc-300 text-xs transition-all"
              >
                {copiedId === 'console' ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy All
                  </>
                )}
              </button>
            )}
          </div>

          <div className="bg-black/40 border border-white/5 rounded-xl min-h-[400px] max-h-[400px] overflow-auto">
            {combinedCSS ? (
              <pre className="p-4 text-green-400 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                {combinedCSS}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <Code size={48} className="text-zinc-700 mb-4" />
                <p className="text-zinc-500 text-sm">No CSS detected</p>
                <p className="text-zinc-600 text-xs mt-1">Add snippets with CSS to see it here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6">
        <h3 className="text-white mb-3">💡 Tips</h3>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-0.5">•</span>
            <span>Paste HTML with inline <code className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">&lt;style&gt;</code> tags or pure CSS code</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-0.5">•</span>
            <span>Hover over snippets in the preview to copy or delete them</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-0.5">•</span>
            <span>The CSS Console shows all extracted CSS from your snippets combined</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-0.5">•</span>
            <span>Upload files directly using the Upload button</span>
          </li>
        </ul>
      </div>
    </div>
  );
}