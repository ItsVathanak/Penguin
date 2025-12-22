import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Moon, Sun, Download} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Note } from '../types';


interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string, e: React.MouseEvent) => void;
}

export default function Sidebar({ notes, activeNoteId, onSelectNote, onCreateNote, onDeleteNote }: SidebarProps) {
  
  // Helper to format date
  const formatDate = (ms: number) => new Date(ms).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  
  // Initialize state based on localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('penguin-theme');
      // If user has saved preference, use it
      if (saved) return saved === 'dark';
      // Otherwise use system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply the class to the HTML tag whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('penguin-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('penguin-theme', 'light');
    }
  }, [darkMode]);

  // Find the active note based on activeNoteId
  const activeNote = notes.find(note => note.id === activeNoteId);

  // Download logic
  const handleDownload = () => {
    if (!activeNote) return;

    const filename = `${activeNote.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'untitled'}.md`;

    const blob = new Blob([activeNote.content], { type: 'text/markdown' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    // clean link
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <aside className="w-64 h-screen bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-600 transition-colors">
            <Home size={18} />
            <span>Home</span>
        </Link>
      </div>

        {/* Buttons area */}
        <div className='p-4'>
            {/* New note button */}
            <div className="p-4">
                <button 
                    onClick={onCreateNote}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium shadow-sm"
                >
                    <Plus size={18} />
                    New Note
                </button>
            </div>

            {/* Download button */}
            <div className='p-4'>
                <button
                    onClick={handleDownload}
                    disabled={!activeNote}
                    className={`
                        w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors font-medium border
                        ${activeNote
                            ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600' 
                            : 'bg-gray-100 dark:bg-gray-800 border-transparent text-gray-400 cursor-not-allowed'}
                    `}
                    title={activeNote ? "Download this note" : "Select a note to download"}
                >
                    <Download size={18} />
                    Download Note
                </button>
            </div>
            
        </div>
      

      {/* NOTES LIST */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 pb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                Your Notes
            </h3>
            
            <div className="space-y-1">
                {notes.map((note) => (
                    <div 
                        key={note.id}
                        onClick={() => onSelectNote(note.id)}
                        className={`
                            group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                            ${activeNoteId === note.id 
                                ? 'bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600' 
                                : 'hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent'}
                        `}
                    >
                        <div className="flex-1 overflow-hidden">
                            <h4 className={`text-sm font-medium truncate ${activeNoteId === note.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}`}>
                                {note.title || 'Untitled'}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {formatDate(note.updatedAt)}
                            </p>
                        </div>
                        
                        <button 
                            onClick={(e) => onDeleteNote(note.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                            title="Delete note"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Footer with theme toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
}