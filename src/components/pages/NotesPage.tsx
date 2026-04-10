import { useState, useEffect, useRef } from 'react';
import { StickyNote, Save, Trash2, Clock, MoreHorizontal, Download, Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { projectId } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface Note {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  updatedAt: string;
}

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeNote = notes.find(n => n.id === activeNoteId);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (activeNote && (activeNote.content || activeNote.title !== 'Untitled')) {
        saveNotes(true);
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [activeNote]);

  const loadNotes = async () => {
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return;
      }

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/notes`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(data);
        if (data.length > 0) {
          setActiveNoteId(data[0].id);
        }
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async (isAutoSave = false) => {
    setSaving(true);
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        if (!isAutoSave) {
          toast.error('Please sign in');
        }
        return;
      }

      const accessToken = session.access_token;
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/notes`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes }),
      });

      if (!response.ok) {
        throw new Error('Failed to save notes');
      }

      setLastSaved(new Date());
      if (!isAutoSave) {
        toast.success('Notes saved');
      }
    } catch (error) {
      console.error('Error saving notes:', error);
      if (!isAutoSave) {
        toast.error('Failed to save notes');
      }
    } finally {
      setSaving(false);
    }
  };

  const createNewNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title: 'Untitled',
      content: '',
      createdDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
  };

  const closeNote = (noteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const noteIndex = notes.findIndex(n => n.id === noteId);
    const newNotes = notes.filter(n => n.id !== noteId);
    setNotes(newNotes);
    
    if (activeNoteId === noteId) {
      if (newNotes.length > 0) {
        // Switch to adjacent note
        const newActiveIndex = Math.min(noteIndex, newNotes.length - 1);
        setActiveNoteId(newNotes[newActiveIndex].id);
      } else {
        setActiveNoteId(null);
      }
    }
  };

  const clearNotes = () => {
    if (confirm('Are you sure you want to delete all notes?')) {
      setNotes([]);
      setActiveNoteId(null);
      saveNotes(false);
      toast.success('All notes deleted');
    }
    setShowMenu(false);
  };

  const getRelativeTime = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 5) return 'Just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const downloadAsPDF = async () => {
    if (!activeNote) return;
    
    try {
      toast.loading('Generating PDF...');
      
      // Dynamic import of html2pdf
      const html2pdf = (await import('html2pdf.js@0.10.2')).default;
      
      // Create a temporary container with content
      const element = document.createElement('div');
      element.style.padding = '40px';
      element.style.backgroundColor = 'white';
      element.style.color = '#000';
      element.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      element.innerHTML = `
        <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 8px; color: #000;">${activeNote.title}</h1>
        <p style="font-size: 12px; color: #666; margin-bottom: 32px;">${formatDate(new Date(activeNote.createdDate))}</p>
        <div style="font-size: 14px; line-height: 1.75; white-space: pre-wrap; color: #333;">${activeNote.content}</div>
      `;
      
      const opt = {
        margin: 1,
        filename: `${activeNote.title.replace(/[^a-z0-9]/gi, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(element).save();
      toast.dismiss();
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.dismiss();
      toast.error('Failed to generate PDF');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-300">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-zinc-800/30">
        <div className="max-w-4xl mx-auto px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <StickyNote className="w-4 h-4" />
            <span className="hidden sm:inline">Personal Notes</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Save Status */}
            {lastSaved && (
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">{saving ? 'Saving...' : getRelativeTime(lastSaved)}</span>
              </div>
            )}

            {/* Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-zinc-800/50 rounded-md transition-colors text-zinc-500 hover:text-zinc-300"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1 z-20">
                  <button
                    onClick={() => {
                      saveNotes(false);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Now
                  </button>
                  <button
                    onClick={clearNotes}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-800 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All Notes
                  </button>
                  <button
                    onClick={downloadAsPDF}
                    className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="sticky top-[57px] z-10 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-zinc-800/20">
        <div className="flex items-center overflow-x-auto hide-scrollbar">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`
                group flex items-center gap-2 px-4 py-2.5 text-sm border-r border-zinc-800/30 
                transition-all hover:bg-zinc-800/30 min-w-[140px] max-w-[200px]
                ${activeNoteId === note.id 
                  ? 'bg-zinc-800/40 text-zinc-100' 
                  : 'text-zinc-500 hover:text-zinc-300'
                }
              `}
            >
              <span className="truncate flex-1 text-left">
                {note.title || 'Untitled'}
              </span>
              <button
                onClick={(e) => closeNote(note.id, e)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-zinc-700/50 rounded"
              >
                <X className="w-3 h-3" />
              </button>
            </button>
          ))}
          
          {/* New Note Button */}
          <button
            onClick={createNewNote}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30 transition-all"
            title="New note"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-8 pt-16 pb-32">
        {/* Title */}
        <input
          ref={titleInputRef}
          type="text"
          value={activeNote ? activeNote.title : 'Untitled'}
          onChange={(e) => {
            if (activeNote) {
              setNotes(notes.map(n => n.id === activeNote.id ? { ...n, title: e.target.value } : n));
            }
          }}
          placeholder="Untitled"
          className="w-full bg-transparent text-white text-5xl mb-2 border-none outline-none placeholder-zinc-700 font-semibold"
          spellCheck={false}
        />

        {/* Date */}
        <div className="text-sm text-zinc-600 mb-8 flex items-center gap-2">
          {activeNote ? formatDate(new Date(activeNote.createdDate)) : ''}
        </div>

        {/* Editor */}
        <textarea
          value={activeNote ? activeNote.content : ''}
          onChange={(e) => {
            if (activeNote) {
              setNotes(notes.map(n => n.id === activeNote.id ? { ...n, content: e.target.value } : n));
            }
          }}
          placeholder="Start writing..."
          className="w-full min-h-[calc(100vh-400px)] bg-transparent text-zinc-300 text-base leading-relaxed resize-none border-none outline-none placeholder-zinc-700 font-normal"
          spellCheck={false}
          style={{
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.75',
            letterSpacing: '-0.011em'
          }}
        />
      </div>

      {/* Subtle gradient at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />
    </div>
  );
}