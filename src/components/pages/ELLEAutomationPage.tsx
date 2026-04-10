import React, { useState, useRef } from 'react';
import { projectId } from '../../utils/supabase/info';
import { Copy, Check, Zap, Mail, MessageSquare, FileText, ArrowRight, Activity, Terminal, Upload, Trash2, Plus, Save, Settings, Database, Brain } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';

interface ELLEAutomationPageProps {
  onNavigate: (page: string) => void;
}

interface Trigger {
  id: string;
  condition: string;
  action: string;
  active: boolean;
}

interface KnowledgeFile {
  id: string;
  name: string;
  size: string;
  status: 'indexed' | 'processing' | 'error';
  type: string;
}

export function ELLEAutomationPage({ onNavigate }: ELLEAutomationPageProps) {
  const [copied, setCopied] = useState(false);
  const webhookUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/api/elle-email-webhook`;
  const [activeTab, setActiveTab] = useState<'context' | 'logic'>('context');
  
  // Simulated State for "Builder" experience
  const [systemInstructions, setSystemInstructions] = useState(`You are Kiana, Manager at CIELO Agency.
Objective: Respond to inbound messages with warmth, clarity, and realness.
Format: Text — 1 to 3 short, casual sentences. Feel like you're texting a peer you respect.

Voice Rules:
- Brevity: 30 to 80 words max.
- Structure: Front-load the ask, add context after. Use contractions.
- Allowed: "Hope you're doing well", "Quick 15-minute call?", "Let's do that".
- Blocked: "I trust this finds you well", "Per my previous", "Please advise".`);

  const [triggers, setTriggers] = useState<Trigger[]>([
    { id: '1', condition: 'Incoming email body contains "proposal" or "scope"', action: 'Activate Proposal Agent', active: true },
    { id: '2', condition: 'Incoming email body contains "quote" or "price"', action: 'Activate Quote Agent', active: true },
    { id: '3', condition: 'Incoming email subject contains "urgent" or "error"', action: 'Forward to Technical Support (Ankit)', active: true },
    { id: '4', condition: 'Default / No specific intent matched', action: 'General Reply (Kiana)', active: true },
  ]);

  const [knowledgeFiles, setKnowledgeFiles] = useState<KnowledgeFile[]>([
    { id: '1', name: 'cielo_brand_guidelines_2024.pdf', size: '2.4 MB', status: 'indexed', type: 'PDF' },
    { id: '2', name: 'service_pricing_matrix.csv', size: '156 KB', status: 'indexed', type: 'CSV' },
    { id: '3', name: 'past_proposals_archive.txt', size: '450 KB', status: 'indexed', type: 'TXT' },
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    toast.success('Webhook URL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      
      // Simulate processing time
      setTimeout(() => {
        const newFiles = Array.from(files).map((file, idx) => ({
          id: `new-${Date.now()}-${idx}`,
          name: file.name,
          size: formatBytes(file.size),
          status: 'indexed' as const, // Simulate instant vectorization
          type: file.name.split('.').pop()?.toUpperCase() || 'FILE'
        }));
        
        setKnowledgeFiles(prev => [...newFiles, ...prev]);
        setIsUploading(false);
        toast.success(`Successfully vectorized ${files.length} file(s)`);
      }, 1500);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const handleDeleteFile = (id: string) => {
    setKnowledgeFiles(prev => prev.filter(f => f.id !== id));
    toast.success('File removed from knowledge base');
  };

  const handleSaveLogic = () => {
    toast.success('Agent logic and triggers updated');
  };

  return (
    <div className="flex-1 bg-[#0A0A0B] min-h-screen text-white p-4 md:p-8 md:pl-20 pt-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-light mb-2 flex items-center gap-3">
              ELLE <span className="text-zinc-500 text-lg font-normal">( CIELO Agent )</span>
            </h1>
            <p className="text-zinc-500">Autonomous workflow system with RAG-powered context awareness.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-500 uppercase tracking-wide">System Active</span>
            </div>
          </div>
        </div>

        {/* Webhook Configuration Card */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <Zap className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-lg font-medium">Webhook Endpoint</h2>
              <p className="text-sm text-zinc-500">Entry point for inbound email events</p>
            </div>
          </div>
          
          <div className="relative group max-w-2xl">
            <div className="w-full bg-black/40 border border-zinc-800 rounded-lg p-4 font-mono text-sm text-zinc-300 break-all pr-12">
              {webhookUrl}
            </div>
            <button 
              onClick={handleCopy}
              className="absolute right-2 top-2 p-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Navigation/Tabs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-zinc-800/50">
                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Configuration</h3>
              </div>
              <div className="p-2">
                <button
                  onClick={() => setActiveTab('context')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors mb-1 ${
                    activeTab === 'context' 
                      ? 'bg-zinc-800 text-white' 
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                  }`}
                >
                  <Database size={18} />
                  <div>
                    <div className="font-medium">Knowledge Base</div>
                    <div className="text-xs opacity-70">Manage vector context</div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('logic')}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeTab === 'logic' 
                      ? 'bg-zinc-800 text-white' 
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                  }`}
                >
                  <Brain size={18} />
                  <div>
                    <div className="font-medium">Instructions & Triggers</div>
                    <div className="text-xs opacity-70">Define agent behavior</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Stats / Info */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">System Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 text-sm">Vectors Indexed</span>
                  <span className="text-zinc-200 text-sm font-mono">1,248</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 text-sm">Avg. Response Time</span>
                  <span className="text-zinc-200 text-sm font-mono">3.2s</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                  <span className="text-zinc-500 text-sm">Model</span>
                  <span className="text-zinc-200 text-sm font-mono">GPT-4o</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-zinc-500 text-sm">Last Training</span>
                  <span className="text-zinc-200 text-sm font-mono">Just now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === 'context' ? (
                <motion.div
                  key="context"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Upload Area */}
                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-light mb-1">Knowledge Context</h2>
                        <p className="text-zinc-500 text-sm">Upload documents to train the agent's RAG system.</p>
                      </div>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2"
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                          <Upload size={16} />
                        )}
                        Upload Context
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        multiple 
                        onChange={handleFileUpload}
                      />
                    </div>

                    <div 
                      className="border-2 border-dashed border-zinc-800 rounded-lg p-8 text-center hover:border-zinc-700 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-500">
                        <Upload size={24} />
                      </div>
                      <p className="text-zinc-300 font-medium mb-1">Click or drag files to upload</p>
                      <p className="text-zinc-500 text-xs">Support for PDF, TXT, CSV, DOCX, MD (Max 10MB)</p>
                    </div>
                  </div>

                  {/* File List */}
                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
                    <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Indexed Knowledge ({knowledgeFiles.length})</h3>
                    <div className="space-y-2">
                      {knowledgeFiles.length === 0 ? (
                        <div className="text-center py-8 text-zinc-600 italic">No context files uploaded yet.</div>
                      ) : (
                        knowledgeFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800 rounded-lg group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-xs font-mono text-zinc-500 border border-zinc-800">
                                {file.type}
                              </div>
                              <div>
                                <div className="text-sm text-zinc-200 font-medium">{file.name}</div>
                                <div className="text-xs text-zinc-500">{file.size} • Processed</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1.5 text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                <Check size={10} />
                                Active
                              </span>
                              <button 
                                onClick={() => handleDeleteFile(file.id)}
                                className="p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="logic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Instructions */}
                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-light mb-1">Agent Instructions</h2>
                        <p className="text-zinc-500 text-sm">Define the core persona and behavioral guidelines.</p>
                      </div>
                      <button 
                        onClick={handleSaveLogic}
                        className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    </div>
                    
                    <textarea
                      value={systemInstructions}
                      onChange={(e) => setSystemInstructions(e.target.value)}
                      className="w-full h-64 bg-zinc-950/50 border border-zinc-800 rounded-lg p-4 text-sm font-mono text-zinc-300 focus:outline-none focus:border-zinc-600 resize-none leading-relaxed"
                      placeholder="Enter system prompts here..."
                    />
                  </div>

                  {/* Triggers */}
                  <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-light mb-1">Triggers & Actions</h2>
                        <p className="text-zinc-500 text-sm">Define "If This Then That" logic for email routing.</p>
                      </div>
                      <button className="px-3 py-1.5 border border-zinc-700 text-zinc-300 rounded-lg text-xs font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2">
                        <Plus size={14} />
                        Add Rule
                      </button>
                    </div>

                    <div className="space-y-3">
                      {triggers.map((trigger) => (
                        <div key={trigger.id} className="p-4 bg-zinc-950/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="mt-1 p-1.5 bg-zinc-900 rounded text-zinc-500">
                              <Activity size={16} />
                            </div>
                            <div className="flex-1 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1 block">If (Condition)</label>
                                  <input 
                                    type="text" 
                                    value={trigger.condition}
                                    readOnly // Editable in a real app
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-1 block">Then (Action)</label>
                                  <input 
                                    type="text" 
                                    value={trigger.action}
                                    readOnly // Editable in a real app
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                               <div className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${trigger.active ? 'bg-emerald-500/20' : 'bg-zinc-700'}`}>
                                 <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${trigger.active ? 'translate-x-4 bg-emerald-500' : 'translate-x-0'}`} />
                               </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
