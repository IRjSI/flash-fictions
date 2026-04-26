"use client";

import Link from "next/link";
import { useWritesStore } from "../store/writesStore";
import { useWrites } from "../hooks/useWrites";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function Content() {
  const writes = useWrites();
  const { setSelectedWrite } = useWritesStore();

  const getReadingTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / 200);
    return time === 1 ? "1 min read" : `${time} min read`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
    >
      {writes.map((write, key) => (
        <motion.div variants={item} key={key}>
          <Link
            href={`/reader/${write.id}`}
            onClick={() => setSelectedWrite(write)}
            className="group relative p-8 rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 
                       bg-white/40 dark:bg-neutral-900/30 backdrop-blur-xl 
                       hover:bg-white/60 dark:hover:bg-neutral-900/50
                       hover:shadow-2xl hover:shadow-neutral-200/50 dark:hover:shadow-none
                       hover:-translate-y-1 transition-all duration-500 cursor-pointer block h-full"
          >
            <div className="flex flex-col h-full justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    {getReadingTime(write.content)}
                  </div>
                </div>
                <h2 className="text-2xl font-serif font-semibold group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors leading-tight">
                  {write.title}
                </h2>
                <p className="text-sm line-clamp-3 text-neutral-500 dark:text-neutral-400 leading-relaxed italic">
                  {write.content.trim().slice(0, 150)}...
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                  Read Story
                  <span className="w-8 h-[1px] bg-neutral-300 dark:bg-neutral-700 group-hover:w-12 transition-all"></span>
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.main>
  );
}

