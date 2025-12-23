import { useRef, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Sidebar from '../components/Sidebar'
import { useNotes } from '../hooks/useNotes'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Editor() {
  const { 
    notes, 
    activeNote, 
    activeNoteId, 
    setActiveNoteId, 
    createNote, 
    deleteNote, 
    updateNote, 
    isLoaded 
  } = useNotes();

  // Refs for synchronized scrolling
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isScrollingSyncRef = useRef(false);

  // Synchronized scroll handler
  const handleEditorScroll = useCallback(() => {
    if (isScrollingSyncRef.current) return;
    if (!editorRef.current || !previewRef.current) return;

    isScrollingSyncRef.current = true;
    
    const editor = editorRef.current;
    const preview = previewRef.current;
    
    // Calculate scroll percentage
    const scrollPercent = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
    
    // Apply to preview
    preview.scrollTop = scrollPercent * (preview.scrollHeight - preview.clientHeight);
    
    requestAnimationFrame(() => {
      isScrollingSyncRef.current = false;
    });
  }, []);

  const handlePreviewScroll = useCallback(() => {
    if (isScrollingSyncRef.current) return;
    if (!editorRef.current || !previewRef.current) return;

    isScrollingSyncRef.current = true;
    
    const editor = editorRef.current;
    const preview = previewRef.current;
    
    // Calculate scroll percentage
    const scrollPercent = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
    
    // Apply to editor
    editor.scrollTop = scrollPercent * (editor.scrollHeight - editor.clientHeight);
    
    requestAnimationFrame(() => {
      isScrollingSyncRef.current = false;
    });
  }, []);

  if (!isLoaded) return <div className="flex h-screen items-center justify-center">Loading your workspace...</div>;

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      
      {/* 1. SIDEBAR with Real Data */}
      <Sidebar 
        notes={notes}
        activeNoteId={activeNoteId}
        onSelectNote={setActiveNoteId}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
      />

      {/* 2. EDITOR WORKSPACE */}
      <div className="flex-1 flex h-full min-w-0 overflow-hidden">
        
        {/* Check for active note */}
        {activeNote ? (
            <>
                {/* INPUT */}
                <section className="w-1/2 min-w-0 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Input
                    </h2>
                    <span className="text-xs text-gray-400">
                        {/* Show simple "Saved" text (in real apps we'd check saving state) */}
                        Auto-saving
                    </span>
                  </div>

                  <textarea 
                    ref={editorRef}
                    className="flex-1 w-full p-6 resize-none outline-none bg-transparent text-gray-800 dark:text-gray-100 font-mono text-sm leading-relaxed overflow-auto break-words whitespace-pre-wrap"
                    value={activeNote.content}
                    onChange={(e) => updateNote(activeNote.id, e.target.value)}
                    onScroll={handleEditorScroll}
                    placeholder="Type your markdown here..."
                    autoFocus
                  />
                </section>

                {/* PREVIEW */}
                <section className="w-1/2 min-w-0 flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                     <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Preview
                    </h2>
                  </div>

                  <div 
                    ref={previewRef}
                    className="flex-1 p-6 overflow-auto prose dark:prose-invert max-w-none break-words [overflow-wrap:anywhere]"
                    onScroll={handlePreviewScroll}
                  >
                     <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code(props) {
                            const { children, className, node, ref, ...rest } = props;
                            const match = /language-(\w+)/.exec(className || '');
      
                            return match ? (
                              // If it's a code block (has a language), use the highlighter
                              <SyntaxHighlighter
                                PreTag="div"
                                language={match[1]}
                                style={vscDarkPlus}
                                customStyle={{ background: 'transparent', fontSize: '0.9em' }}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code {...rest} className={className}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {activeNote.content}
                      </ReactMarkdown>
                  </div>
                </section>
            </>
        ) : (
            // EMPTY STATE (No note selected)
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <p className="text-lg mb-4">Select a note to view</p>
                <button 
                    onClick={createNote} 
                    className="text-blue-600 hover:underline"
                >
                    Create a new note
                </button>
            </div>
        )}

      </div>
    </div>
  )
}