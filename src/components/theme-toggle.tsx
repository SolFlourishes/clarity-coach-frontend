import React from 'react';
import { useTheme } from "../hooks/use-theme";

/**
 * @name ThemeToggle
 * @description A button component to switch between light and dark themes.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full font-bold text-xl transition duration-300 hover:scale-110"
      style={{ 
          backgroundColor: 'var(--color-surface)', 
          color: 'var(--color-text)' // Uses dynamic text color from global CSS
      }}
      aria-label="Toggle theme"
    >
      {/* Display the opposite icon of the current theme */}
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}