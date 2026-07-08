"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "../common/reveal";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 0.05]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden px-6 py-24 md:min-h-[90vh] md:py-32 lg:px-10"
    >
      <motion.div
        className="pointer-events-none absolute right-[-10%] top-[10%] size-[480px] rounded-full blur-[100px] md:size-[600px]"
        style={{
          y: orbY,
          opacity: orbOpacity,
          background:
            "radial-gradient(circle, var(--app-accent-green) 0%, var(--app-accent-blue) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-3xl"
        style={{ scale: headlineScale, opacity: headlineOpacity }}
      >
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-app-accent-green">
            Backend Engineer
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 text-5xl font-bold leading-[1.08] tracking-tight text-app-foreground md:text-7xl lg:text-[80px]">
            Hi, I&apos;m Sethuram.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-app-muted md:text-2xl md:leading-relaxed">
            Software engineer with 3 years of backend experience designing
            distributed fintech systems across event-driven pipelines,
            IAM/FGAC, billing, reconciliation, credit management, and database
            performance. I care about reliable, scalable, observable systems —
            and I write to sharpen how I understand and explain engineering.
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}
