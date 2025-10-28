import { useContext } from "react";
import { ThemeContext } from "../context/theme-provider";

/**
 * @name useTheme
 * @description Custom hook to consume the theme context, providing the current theme
 * and the function to set/toggle the theme.
 * @returns {object} { theme, setTheme, toggleTheme }
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};