"use client";

import Link from "next/link";
import { useWritesStore } from "../store/writesStore";
import { useWrites } from "../hooks/useWrites";

export default function Content() {
  const writes = useWrites();
  const { setSelectedWrite } = useWritesStore();

  return (
    <main className="space-y-8 w-full">
      {writes.map((write, key) => (
        <Link
          href="/reader"
          key={key}
          onClick={() => setSelectedWrite(write)}
          className="group p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 
                     bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md 
                     shadow-sm hover:shadow-lg hover:-translate-y-1 
                     transition-all duration-300 cursor-pointer block"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {write.title}
          </h2>
          <p className="text-[15px] truncate overflow-hidden whitespace-nowrap text-neutral-700 dark:text-neutral-300">
            {write.content}
          </p>
        </Link>
      ))}
    </main>
  );
}
