import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react'; // Icons
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {

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
    
  return (
    <nav className="h-14 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between px-4">
      
      {/* Logo Area */}
      <Link to="/" className="flex items-center gap-2 font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-600 transition-colors">
        <span className='font-display'>Penguin</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <Link to="/editor" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-600 transition-colors">
          <FileText size={18} />
          <span>Editor</span>
        </Link>

        {/* split */}
        <h1 className='text-black dark:text-white transition-colors'> | </h1>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

    </nav>
  );
}

