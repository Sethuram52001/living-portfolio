"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { ExperiencePhase } from "@/lib/content/schemas";
import { formatDateRange } from "../common/formatters";
import { Reveal } from "../common/reveal";
import { TimelineDot } from "./experience-timeline-dot";

export function ExperienceSection({ phases }: { phases: ExperiencePhase[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="border-t border-app-border px-6 py-24 md:py-32 lg:px-10"
    >
      <Reveal>
        <p className="text-sm font-medium tracking-wide uppercase text-app-accent-green">
          Experience
        </p>
        <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight text-app-foreground md:text-5xl">
          The journey from learning computer science to shipping production systems.
        </h2>
      </Reveal>

      <div ref={timelineRef} className="relative mt-16 md:mt-20">
        <motion.div
          className="absolute left-[7px] top-3 hidden h-[calc(100%-24px)] w-px origin-top bg-app-accent-green/40 md:left-[208px] md:block"
          style={{ scaleY: lineScaleY }}
          aria-hidden="true"
        />

        <ol className="grid gap-12 md:gap-16">
          {phases.map((phase, index) => (
            <Reveal key={phase.order} delay={index * 0.08}>
              <li className="group relative md:grid md:grid-cols-[180px_1fr] md:gap-14">
                <div className="mb-3 flex items-center gap-3 md:mb-0 md:flex-col md:items-end md:gap-0 md:pt-1">
                  <time className="whitespace-nowrap text-sm font-medium text-app-muted md:text-right">
                    {formatDateRange(phase.dateRange)}
                  </time>
                </div>

                <TimelineDot />

                <div className="rounded-[var(--app-radius-lg)] border border-app-border bg-app-surface-card p-6 shadow-app-xs transition-shadow duration-300 group-hover:shadow-app-md md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase text-app-accent-green">
                        {phase.position}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-app-foreground">
                        {phase.organization}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-app-muted">
                    {phase.summary}
                  </p>

                  <ul className="mt-5 grid gap-2.5">
                    {phase.fieldNotes.map((note) => (
                      <li
                        key={note}
                        className="flex gap-3 text-sm leading-relaxed text-app-muted"
                      >
                        <span
                          className="mt-2 block size-1 shrink-0 rounded-full bg-app-accent-green"
                          aria-hidden="true"
                        />
                        {note}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {phase.keyTech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-app-border bg-app-surface-muted px-3 py-1 text-xs font-medium text-app-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
