"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.97,
        filter: blur ? "blur(6px)" : "blur(0px)",
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : {
              opacity: 0,
              y: 30,
              scale: 0.97,
              filter: blur ? "blur(6px)" : "blur(0px)",
            }
      }
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
