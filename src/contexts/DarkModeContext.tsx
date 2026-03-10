"use client";

/**
 * Dark Mode Context
 * 
 * This context provides dark mode functionality throughout the application.
 * It handles:
 * - Dark mode state management
 * - User preference persistence in localStorage
 * - System preference detection
 * - CSS class manipulation for theme switching
 */

import { createContext, useContext, useEffect, useState } from 'react';

// Type definition for dark mode context value
type DarkModeContextType = {
  isDarkMode: boolean;        // Current dark mode state
  toggleDarkMode: () => void; // Function to toggle dark mode
};

// Create the context with undefined default value
const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

/**
 * Dark Mode Provider Component
 * 
 * Wraps the application and provides dark mode functionality to all child components.
 * Handles initialization, preference loading, and theme application.
 */
export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  // State to track dark mode status
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Initialize dark mode preference on component mount
   * Checks localStorage first, then falls back to system preference
   */
  useEffect(() => {
    // Check if user has previously set a preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      // Use saved preference
      setIsDarkMode(savedTheme === 'true');
    } else {
      // Check system preference as fallback
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  /**
   * Apply theme changes to the document and save preference
   * This effect runs whenever the dark mode state changes
   */
  useEffect(() => {
    // Apply theme to document root element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save user preference to localStorage for persistence
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  /**
   * Toggle dark mode on/off
   * Switches the current state to the opposite value
   */
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Provide the dark mode context value to children
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

/**
 * Custom hook to use dark mode context
 * 
 * Provides easy access to dark mode state and toggle function.
 * Throws an error if used outside of DarkModeProvider.
 * 
 * @returns {DarkModeContextType} Dark mode context value
 */
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}
