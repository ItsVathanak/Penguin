import { useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

// The key we use to find our data in the browser's database
const DB_KEY = 'penguin-draft-content';

export function useAutoSave() {
  const [content, setContent] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Load data when the app starts
  useEffect(() => {
    get(DB_KEY).then((storedContent) => {
      if (storedContent) {
        setContent(storedContent);
      } else {
        // Default text if nothing is saved yet
        setContent('# Welcome to Penguin 🐧\nStart typing...');
      }
      setIsLoaded(true);
    });
  }, []);

  // 2. Auto-save when content changes (Debounced)
  useEffect(() => {
    if (!isLoaded) return; 

    setIsSaving(true);
    
    // Set a timer: "Wait 800ms, then save"
    const timeoutId = setTimeout(() => {
      set(DB_KEY, content).then(() => {
        setIsSaving(false);
      });
    }, 800);

    // If the user types again before 800ms, cancel the previous timer
    return () => clearTimeout(timeoutId);
  }, [content, isLoaded]);

  return { content, setContent, isLoaded, isSaving };
}