"use client"
import { useSelector } from "react-redux";
import { createContext, useContext } from "react";

const ThemeContext = createContext<boolean>(false);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );

  return (
    <div className={theme?'dark':''}>
    <ThemeContext.Provider value={theme}>
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {children} 
      </div>
    </ThemeContext.Provider>
    </div>
  );
}
export function useTheme() {
    const theme = useContext(ThemeContext);
    if (theme === undefined) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return theme;
  }
  export default function Theme({ children }: { children: React.ReactNode }) {
  return (
    
    <ThemeProvider>
      {children}
    </ThemeProvider>
    
  );
}
