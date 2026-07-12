"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { HighlightsDocument } from "@/lib/content/schemas";
import { Reveal } from "../common/reveal";
import { SectionHeader } from "../common/section-header";

type Highlight = HighlightsDocument["highlights"][number];

const accentClassNames = {
  amber: "bg-app-accent-amber",
  blue: "bg-app-accent-blue",
  emerald: "bg-app-accent-green",
  orange: "bg-app-accent-orange",
  red: "bg-app-accent-red",
} satisfies Record<Highlight["accent"], string>;

function HighlightCard({
  highlight,
  index,
}: {
  highlight: Highlight;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <Reveal delay={index * 0.06}>
      <article
        ref={ref}
        className="group relative overflow-hidden rounded-[var(--app-radius-xl)] border border-app-border bg-app-surface-card p-7 shadow-app-xs transition duration-300 hover:-translate-y-1 hover:shadow-app-md"
      >
        <motion.span
          className={`absolute inset-x-0 top-0 h-1 origin-left ${accentClassNames[highlight.accent]}`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.06 + 0.3,
          }}
          aria-hidden="true"
        />
        <h3 className="text-2xl font-semibold tracking-tight text-app-foreground">
          {highlight.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-app-muted">
          {highlight.summary}
        </p>
      </article>
    </Reveal>
  );
}

export function HighlightsSection({
  content,
}: {
  content: HighlightsDocument;
}) {
  return (
    <section
      id="highlights"
      className="border-t border-app-border px-6 py-24 md:py-32 lg:px-10"
    >
      <SectionHeader
        eyebrow="Highlights"
        title={
          <>
            {content.title}{" "}
            <span className="text-app-muted">
              {content.mutedTitle}
            </span>
          </>
        }
        supporting={content.supporting}
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {content.highlights.map((highlight, index) => (
          <HighlightCard
            key={highlight.title}
            highlight={highlight}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
