"use client";

import type { ReactNode } from "react";
import { AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import type { ExperiencePhase } from "@/lib/content/schemas";
import { TimelineGlyph } from "./timeline-glyph";

type ExperienceTimelineProps = {
  phases: ExperiencePhase[];
};

const markerTones = [
  "bg-lp-primary-container text-lp-inverse-on-surface",
  "bg-lp-tertiary-container text-lp-inverse-on-surface",
  "bg-lp-secondary-container text-lp-inverse-on-surface",
] as const;

export function ExperienceTimeline({ phases }: ExperienceTimelineProps) {
  return (
    <section className="mx-auto w-full max-w-[768px]">
      <header className="grid gap-4 pb-8 md:pb-9">
        <div className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-x-4 md:gap-x-5">
          <TimelineGlyph />
          <h1 className="max-w-[210px] text-[24px] font-black uppercase leading-[1.2] tracking-[-0.05em] text-lp-primary md:max-w-none md:text-[48px] md:leading-[1.1] md:tracking-[-0.02em]">
            Career Timeline
          </h1>
        </div>
        <p className="max-w-[520px] text-sm font-medium leading-[1.4] text-lp-on-surface-variant md:max-w-none">
          A chronological record of professional milestones and academic
          achievements.
        </p>
      </header>

      <ol className="relative grid gap-10 pl-12 before:absolute before:left-[14px] before:top-8 before:h-[calc(100%-2rem)] before:w-1 before:bg-lp-ink md:pl-16">
        {phases.map((phase, index) => (
          <li key={phase.slug} className="relative" id={phase.slug}>
            <TimelineMarker phase={phase} index={index} />
            <ExperiencePhaseCard phase={phase} index={index} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function TimelineMarker({
  phase,
  index,
}: {
  phase: ExperiencePhase;
  index: number;
}) {
  const tone = markerTones[index % markerTones.length];
  const Icon = isEducationPhase(phase) ? AcademicCapIcon : BriefcaseIcon;

  return (
    <motion.span
      className={[
        "absolute -left-12 top-6 z-10 grid size-8 place-items-center rounded-full border-[3px] border-lp-ink font-mono text-xs font-black uppercase leading-none shadow-lp-level-2 md:-left-16",
        tone,
      ].join(" ")}
      whileHover={{ x: 2, y: 2 }}
      whileTap={{ x: 4, y: 4 }}
      aria-hidden="true"
    >
      <Icon className="size-4" />
    </motion.span>
  );
}

function ExperiencePhaseCard({
  phase,
  index,
}: {
  phase: ExperiencePhase;
  index: number;
}) {
  return (
    <motion.article
      className="group rounded-lp-md border-[3px] border-lp-ink bg-lp-surface p-5 shadow-lp-level-3 transition-shadow hover:shadow-lp-level-2 md:p-6"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ x: 2, y: 2 }}
      whileTap={{ x: 4, y: 4 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <div className="grid gap-6">
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <RoleBadge index={index}>{phase.position}</RoleBadge>
            <time className="font-mono text-xs font-bold uppercase leading-none tracking-[0.1em] text-lp-on-surface-variant">
              {formatDateRange(phase.dateRange)}
            </time>
          </div>

          <div className="grid gap-3">
            <h2 className="text-2xl font-extrabold leading-tight text-lp-on-surface md:text-[32px] md:leading-[1.2]">
              {phase.company}
            </h2>
            <p className="text-sm leading-5 text-lp-on-surface md:text-base md:leading-6">
              {phase.summary}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <TimelinePanel title="Field Notes">
            <ul className="grid gap-2">
              {phase.fieldNotes.map((note) => (
                <li
                  key={note}
                  className="grid grid-cols-[10px_minmax(0,1fr)] gap-2 text-sm leading-5 text-lp-on-surface-variant"
                >
                  <span
                    className="mt-2 size-1.5 rounded-full bg-lp-primary"
                    aria-hidden="true"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </TimelinePanel>

          <TimelinePanel title="Key Tech">
            <div className="flex flex-wrap gap-2">
              {phase.keyTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border-2 border-lp-ink bg-lp-surface-container-lowest px-2 py-1 font-mono text-[10px] font-bold uppercase leading-none tracking-[0.08em] text-lp-on-surface"
                >
                  {tech}
                </span>
              ))}
            </div>
          </TimelinePanel>
        </div>
      </div>
    </motion.article>
  );
}

function RoleBadge({
  children,
  index,
}: {
  children: string;
  index: number;
}) {
  const tone =
    index % 3 === 1
      ? "bg-lp-tertiary-container text-lp-tertiary"
      : index % 3 === 2
        ? "bg-lp-secondary-container text-lp-secondary"
        : "bg-lp-primary-container text-lp-primary";

  return (
    <span
      className={[
        "inline-flex max-w-full rounded-md border-[3px] border-lp-ink px-2 py-1 font-mono text-xs font-bold uppercase leading-none tracking-[0.1em] shadow-lp-level-2",
        tone,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function TimelinePanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lp border-[3px] border-lp-ink bg-lp-surface-container-low p-4 shadow-lp-level-2">
      <h3 className="mb-3 font-mono text-xs font-bold uppercase leading-none tracking-[0.08em] text-lp-on-surface">
        {title}
      </h3>
      {children}
    </section>
  );
}

function formatDateRange(dateRange: ExperiencePhase["dateRange"]) {
  return `${formatMonth(dateRange.start)} - ${
    dateRange.end ? formatMonth(dateRange.end) : "Present"
  }`;
}

function formatMonth(month: string) {
  const [year, monthIndex] = month.split("-");
  const date = new Date(Number(year), Number(monthIndex) - 1);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function isEducationPhase(phase: ExperiencePhase) {
  const educationSignal = `${phase.position} ${phase.company}`.toLowerCase();

  return (
    educationSignal.includes("college") ||
    educationSignal.includes("degree") ||
    educationSignal.includes("computer science")
  );
}
