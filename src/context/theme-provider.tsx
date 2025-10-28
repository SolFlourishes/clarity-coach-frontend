import { createContext, useState, useEffect, useCallback, ReactNode } from "react";

// Define the shape of the context data
interface ThemeContextProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// 1. Create the Context
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark';
  storageKey?: string;
}

/**
 * @name ThemeProvider
 * @description Provides the theme state (light/dark) to the entire application.
 * It manages the theme application on the document element and saves preference to local storage.
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  
  // 2. State management
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem(storageKey) as "light" | "dark") || defaultTheme
  );

  // 3. Effect to apply theme class
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Clear previous theme and apply current theme
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Save theme for next session
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // 4. Toggle function (Memoized for performance)
  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }, []);

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}