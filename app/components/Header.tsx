"use client"
import { BookText, Moon, Sun, Feather } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

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
    <header className="flex flex-col gap-2 py-6 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between w-full">

        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2.5 rounded-2xl bg-neutral-900 dark:bg-neutral-100 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-neutral-200 dark:shadow-none">
            <Feather className="w-5 h-5 text-white dark:text-neutral-900" />
          </div>
          <div className="flex flex-col">
            <span className="tracking-tight text-2xl font-serif font-semibold select-none leading-none">
              Flaction
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-sans mt-1">
              Flash Fictions
            </span>
          </div>
        </Link>


        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <div className="w-5 h-5" />
            ) : resolvedTheme === "dark" ? (
              <Sun className="w-5 h-5 text-orange-300" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-600" />
            )}
          </button>
          <button
            className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
            aria-label="Collection"
          >
            <BookText className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;