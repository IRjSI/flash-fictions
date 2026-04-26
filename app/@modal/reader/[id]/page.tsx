"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Share2, Bookmark, Type, Check } from "lucide-react";
import { useWritesStore } from "../../../store/writesStore";
import { useWrites } from "../../../hooks/useWrites";
import { useEffect, useRef, useState } from "react";

export default function ReaderModal() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const writes = useWrites();
  const { selectedWrite, setSelectedWrite, clearSelectedWrite, bookMark, setBookMark, clearBookMark } = useWritesStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync selectedWrite if it's null (e.g. direct load or refresh)
  useEffect(() => {
    if (!selectedWrite && id) {
      const write = writes.find((w) => w.id === id);
      if (write) {
        setSelectedWrite(write);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolled(el.scrollTop > 50);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const close = () => {
    clearSelectedWrite();
    router.push("/");
  };

  const handleShare = async () => {
    const shareData = {
      title: selectedWrite?.title || "Flash Fiction",
      text: `Read this flash fiction: ${selectedWrite?.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  return (
    <AnimatePresence>
      {selectedWrite && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-stone-50 dark:bg-neutral-950 overflow-hidden"
        >
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-neutral-900 dark:bg-neutral-100 origin-left z-[60]"
            style={{ scaleX }}
          />

          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: isScrolled ? 0 : 20, opacity: 1 }}
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${isScrolled ? "bg-stone-50/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800" : ""
              }`}
          >
            <button
              onClick={close}
              className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs uppercase tracking-widest font-sans font-bold">Collection</span>
            </button>

            <div className="flex items-center gap-4">
              <button className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                <Type className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                onClick={() => {
                  if (bookMark?.id === selectedWrite.id) {
                    clearBookMark();
                  } else {
                    setBookMark(selectedWrite);
                  }
                }}
              >
                <Bookmark className="w-5 h-5" fill={bookMark?.id === selectedWrite.id ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors relative"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                {copied && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-neutral-900 text-white px-2 py-1 rounded whitespace-nowrap">
                    Link Copied
                  </span>
                )}
              </button>
            </div>
          </motion.header>

          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto px-6 py-32 sm:py-48"
          >
            <article className="max-w-2xl mx-auto space-y-12">
              <div className="space-y-4 text-center">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs uppercase tracking-[0.4em] text-neutral-400 font-sans font-bold"
                >
                  Flash Fiction
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-6xl font-serif font-bold leading-tight"
                >
                  {selectedWrite.title}
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="prose-serif text-xl sm:text-2xl leading-[1.8] text-neutral-800 dark:text-neutral-200 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black whitespace-pre-line text-justify hyphens-auto"
              >
                {selectedWrite.content}
              </motion.div>

              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-16 mt-16 border-t border-neutral-200 dark:border-neutral-800 text-center space-y-6"
              >
                <p className="text-neutral-400 italic">Fin.</p>
                <button
                  onClick={close}
                  className="px-8 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-sans text-sm uppercase tracking-widest font-bold"
                >
                  Return to Collection
                </button>
              </motion.footer>
            </article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
