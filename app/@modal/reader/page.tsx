"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useWritesStore } from "../../store/writesStore";

export default function ReaderModal() {
  const router = useRouter();
  const { selectedWrite } = useWritesStore();

  const close = () => router.back();

  if (!selectedWrite) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={close} // clicking background closes modal
      >
        <motion.article
          onClick={(e) => e.stopPropagation()} // prevent background click
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-3xl mx-auto px-8 py-12 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          <button
            onClick={close}
            className="absolute top-6 left-6 flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>

          <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center leading-snug">
            {selectedWrite.title}
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed text-justify selection:bg-neutral-800/80 selection:text-white whitespace-pre-line">
            {selectedWrite.content}
          </p>
        </motion.article>
      </motion.div>
    </AnimatePresence>
  );
}
