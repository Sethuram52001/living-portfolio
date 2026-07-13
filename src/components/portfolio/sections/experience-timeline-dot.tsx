"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function TimelineDot() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div
      ref={ref}
      className="absolute left-[202px] top-[6px] hidden md:block"
      aria-hidden="true"
    >
      <div className="relative flex size-3 items-center justify-center">
        <span className="absolute size-3 rounded-full border-2 border-app-accent-green bg-app-background" />
        <motion.span
          className="absolute size-3 rounded-full bg-app-accent-green/30"
          initial={{ scale: 1, opacity: 0 }}
          animate={
            isInView
              ? { scale: [1, 2.5, 3], opacity: [0.5, 0.2, 0] }
              : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
