"use client"
import { BookDashed, MenuSquareIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
      {/* Left: Logo / Title */}
      <div className="flex items-center gap-3 group">
        <div className="p-2 rounded-xl bg-neutral-200/70 dark:bg-neutral-800/70 group-hover:scale-105 transition-transform">
          <BookDashed className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
        </div>
        <span className="tracking-wide text-xl font-medium select-none">
          Flaction
        </span>
      </div>
      
      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-neutral-200/70 dark:bg-neutral-800/70 hover:scale-105 active:scale-95 transition-transform"
          aria-label="Toggle theme"
        >
          {!mounted ? (
            <div className="w-5 h-5" />
          ) : resolvedTheme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-neutral-700" />
          )}
        </button>
        <button 
          className="p-2 rounded-xl bg-neutral-200/70 dark:bg-neutral-800/70 hover:scale-105 active:scale-95 transition-transform"
          aria-label="Open menu"
        >
          <MenuSquareIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
        </button>
      </div>
    </header>
  );
}

export default Header;