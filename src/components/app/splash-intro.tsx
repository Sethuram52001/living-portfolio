"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SESSION_KEY = "app-splash-seen";
const nameLetters = "Sethuram".split("");
const LETTER_STAGGER = 0.06;
const LETTER_DURATION = 0.5;
const NAME_START = 0.3;
const SUBTITLE_START = NAME_START + nameLetters.length * LETTER_STAGGER + 0.2;
const HOLD_DURATION = 0.8;
const EXIT_START = SUBTITLE_START + LETTER_DURATION + HOLD_DURATION;
const TOTAL_DURATION = EXIT_START + 0.6;

export function SplashIntro({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (!isMounted) return;
      setShowSplash(!sessionStorage.getItem(SESSION_KEY));
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const dismiss = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(dismiss, TOTAL_DURATION * 1000);
    return () => clearTimeout(timer);
  }, [showSplash, dismiss]);

  if (showSplash === null) {
    return (
      <>
        <div className="invisible">{children}</div>
        <div className="fixed inset-0 z-[100] bg-[#0a0a0a]" />
      </>
    );
  }

  return (
    <>
      {children}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(12px)",
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.button
              type="button"
              onClick={dismiss}
              className="absolute right-6 top-6 rounded-full px-4 py-2 text-xs font-medium text-white/30 transition-colors hover:text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              aria-label="Skip intro"
            >
              Skip
            </motion.button>

            <div className="flex select-none" aria-label="Sethuram">
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
                  initial={{
                    opacity: 0,
                    y: 20,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: LETTER_DURATION,
                    ease: [0.22, 1, 0.36, 1],
                    delay: NAME_START + i * LETTER_STAGGER,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="mt-5 text-sm font-medium tracking-widest uppercase md:text-base"
              style={{ color: "var(--app-accent-green)" }}
              initial={{
                opacity: 0,
                y: 14,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: SUBTITLE_START,
              }}
            >
              Backend Engineer
            </motion.p>

            <motion.div
              className="mt-6 h-px origin-center rounded-full"
              style={{ backgroundColor: "var(--app-accent-green)" }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 0.5 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: SUBTITLE_START + 0.2,
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
