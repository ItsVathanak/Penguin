import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';
import type { Note } from '../types';

const DB_KEY = 'penguin-notes-data';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load notes from DB on startup
  useEffect(() => {
    get(DB_KEY).then((data) => {
      if (data) {
        setNotes(data);
        // Automatically select the first note if available
        if (data.length > 0) setActiveNoteId(data[0].id);
      } else {
        // If no data, create a welcome note
        createNote(); 
      }
      setIsLoaded(true);
    });
  }, []);

  // 2. Save to DB whenever 'notes' changes
  // We debounce this slightly to avoid hammering the DB
  useEffect(() => {
    if (!isLoaded) return;
    const timeoutId = setTimeout(() => {
      set(DB_KEY, notes);
    }, 500); // Save 500ms after last change
    return () => clearTimeout(timeoutId);
  }, [notes, isLoaded]);

  // --- ACTIONS ---

  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(), // Generates a unique ID like "550e8400-e29b..."
      title: 'Untitled Note',
      content: '# New Note',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    // Add to top of list
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id); // Switch to the new note immediately
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click from selecting the note while deleting it

    setNotes((prev) => prev.filter((n) => n.id !== id));
    
    // If we deleted the active note, switch to another one
    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  };

  const updateNote = (id: string, newContent: string) => {
    setNotes((prevNotes) => 
      prevNotes.map((note) => {
        if (note.id === id) {
          // If the first line starts with #, use it as the title
          const firstLine = newContent.split('\n')[0].replace(/^#+\s/, '');
          
          return {
            ...note,
            content: newContent,
            title: firstLine || 'Untitled Note', // Update title dynamically
            updatedAt: Date.now()
          };
        }
        return note;
      })
    );
  };

  // Helper to get the actual object of the active note
  const activeNote = notes.find((n) => n.id === activeNoteId);

  return {
    notes,
    activeNote,
    activeNoteId,
    setActiveNoteId,
    createNote,
    deleteNote,
    updateNote,
    isLoaded
  };
}