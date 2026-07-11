"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TechIcon } from "@/components/tech-icon";
import type { SkillGroup } from "@/lib/content/schemas";
import { Reveal } from "../common/reveal";
import { SectionHeader } from "../common/section-header";

export function SkillsSection({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const visibleGroups = [...skillGroups]
    .sort((left, right) => left.order - right.order)
    .slice(0, 6);

  return (
    <section
      id="skills"
      className="relative border-t border-app-border px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="relative z-10">
        <SectionHeader
          eyebrow="Toolkit"
          title={
            <>
              A backend core,{" "}
              <span className="text-app-muted">
                with enough breadth to build the full surface.
              </span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:auto-rows-[17rem] md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group, index) => (
            <Reveal
              key={group.title}
              className="relative z-0 h-full hover:z-20 focus-within:z-20"
              delay={index * 0.05}
            >
              <article className="flex h-full min-h-[17rem] flex-col rounded-[var(--app-radius-xl)] border border-app-border bg-app-surface-card p-6 shadow-app-xs transition duration-300 hover:-translate-y-1 hover:shadow-app-md md:min-h-0">
                <div className="flex h-full flex-col">
                  <h3 className="text-xl font-semibold tracking-tight text-app-foreground">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-app-muted">
                    {group.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    {group.skills.map((skill, skillIndex) => (
                      <SkillIcon
                        key={skill.title}
                        skill={skill}
                        delay={index * 0.05 + skillIndex * 0.04}
                      />
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillIcon({
  skill,
  delay,
}: {
  skill: SkillGroup["skills"][number];
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px 0px" });

  return (
    <motion.span
      ref={ref}
      aria-label={`${skill.title}: ${skill.summary}`}
      className="group/icon relative flex size-11 items-center justify-center rounded-full border border-app-border bg-app-surface-muted text-app-muted transition duration-200 hover:scale-105 hover:bg-app-surface-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-accent-green"
      tabIndex={0}
      initial={{ opacity: 0, y: 12, rotate: -8 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: 0 }
          : { opacity: 0, y: 12, rotate: -8 }
      }
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      <TechIcon label={skill.title} className="size-5" />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 hidden w-64 -translate-x-1/2 rounded-2xl border border-app-border bg-app-foreground px-4 py-3 text-left text-xs leading-relaxed text-app-background shadow-app-lg group-hover/icon:block group-focus-visible/icon:block">
        <span className="block font-semibold">{skill.title}</span>
        <span className="mt-1 block text-app-background/75">
          {skill.summary}
        </span>
      </span>
    </motion.span>
  );
}
