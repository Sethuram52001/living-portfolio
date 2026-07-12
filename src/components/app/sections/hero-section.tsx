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
      className="relative left-1/2 flex min-h-[85vh] w-screen -translate-x-1/2 flex-col justify-center overflow-hidden py-24 md:min-h-[90vh] md:py-32"
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
        className="relative z-10 mx-auto w-full max-w-6xl px-6 lg:px-10"
        style={{ scale: headlineScale, opacity: headlineOpacity }}
      >
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-sm font-medium tracking-wide uppercase text-app-accent-green">
              About
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl font-bold leading-[1.08] tracking-tight text-app-foreground md:text-7xl lg:text-[80px]">
              Hi, I&apos;m Sethuram.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 max-w-2xl space-y-5 text-xl leading-relaxed text-app-muted md:text-2xl md:leading-relaxed">
              <p>
                I&apos;m a software engineer with over three years of experience
                building reliable distributed systems in fintech. I&apos;ve worked
                on scalable microservices across credit management, billing,
                reconciliation, and IAM with fine-grained access control.
              </p>
              <p>
                Beyond building systems, I love problem-solving and technical
                writing. I enjoy breaking down complex engineering ideas, from
                system design patterns to language internals, because I believe
                explaining something clearly is one of the best ways to truly
                understand it.
              </p>
            </div>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
