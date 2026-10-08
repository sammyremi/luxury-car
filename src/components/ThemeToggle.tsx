"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Theme"
      className={`relative p-2.5 rounded-full transition-all duration-300 border border-neutral-300/40 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 backdrop-blur-md text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "dark" ? (
          <Sun className="w-4 h-4 text-amber-400 transition-all duration-300 transform rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 text-neutral-700 transition-all duration-300 transform rotate-0 scale-100" />
        )}
      </div>
    </button>
  );
}
