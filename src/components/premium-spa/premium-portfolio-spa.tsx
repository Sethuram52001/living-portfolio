"use client";

import Image from "next/image";
import { useRef, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import type { ExternalLink } from "@/config/site";
import { TechIcon } from "@/components/tech-icon";

import type {
  CurrentQuest,
  ExperiencePhase,
  FieldNoteDocument,
  ItemDocument,
  SkillGroup,
  StatusHud,
} from "@/lib/content/schemas";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */

type PremiumPortfolioSpaProps = {
  currentQuests: CurrentQuest[];
  experiencePhases: ExperiencePhase[];
  externalLinks: readonly ExternalLink[];
  fieldNotes: FieldNoteDocument[];
  items: ItemDocument[];
  skillGroups: SkillGroup[];
  statusHud: StatusHud;
};

const selectedWorkSlugs = [
  "path-visualizer",
  "sorting-visualizer",
  "old-portfolio",
] as const;

/* ------------------------------------------------------------------ */
/* Main SPA                                                            */
/* ------------------------------------------------------------------ */

export function PremiumPortfolioSpa({
  currentQuests,
  experiencePhases,
  externalLinks,
  fieldNotes,
  items,
  skillGroups,
  statusHud,
}: PremiumPortfolioSpaProps) {
  const currentQuest = currentQuests.find(
    (quest) => quest.status === "in-progress",
  );
  const currentItemSlugs = useMemo(
    () =>
      new Set(
        currentQuests
          .filter((quest) => quest.status === "in-progress")
          .flatMap((quest) => quest.references.items),
      ),
    [currentQuests],
  );
  const currentItem = items.find((item) => currentItemSlugs.has(item.slug));
  const selectedItems = useMemo(() => {
    return selectedWorkSlugs
      .map((slug) => items.find((item) => item.slug === slug))
      .filter(Boolean) as ItemDocument[];
  }, [items]);

  return (
    <div className="mx-auto max-w-6xl">
      <HeroSection />
      <HighlightsSection />
      <ExperienceSection phases={experiencePhases} />
      <SkillsSection skillGroups={skillGroups} />
      <SelectedWorkSection
        items={selectedItems}
        currentItemSlug={currentItem?.slug}
      />
      <CurrentFocusSection
        currentQuest={currentQuest}
        currentItem={currentItem}
        fieldNotes={fieldNotes}
        items={items}
        statusHud={statusHud}
      />
      <WritingSection fieldNotes={fieldNotes} />
      <ContactSection externalLinks={externalLinks} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared: Scroll-reveal with blur (Apple Vision Pro style)            */
/* ------------------------------------------------------------------ */

function Reveal({
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

function SectionHeader({
  eyebrow,
  title,
  supporting,
}: {
  eyebrow: string;
  title: ReactNode;
  supporting?: string;
}) {
  return (
    <Reveal>
      <p className="text-sm font-medium tracking-wide uppercase text-pm-accent-emerald">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-pm-text md:text-5xl">
        {title}
      </h2>
      {supporting ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pm-text-secondary">
          {supporting}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero / About — scroll-driven Lottie + parallax                   */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: orb shifts down, headline scales subtly
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.6], [0.30, 0.05]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden px-6 py-24 md:min-h-[90vh] md:py-32 lg:px-10"
    >
      {/* Gradient orb — parallax layer */}
      <motion.div
        className="pointer-events-none absolute right-[-10%] top-[10%] size-[480px] rounded-full blur-[100px] md:size-[600px]"
        style={{
          y: orbY,
          opacity: orbOpacity,
          background:
            "radial-gradient(circle, var(--pm-accent-emerald) 0%, var(--pm-accent-blue) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />



      <motion.div
        className="relative z-10 max-w-3xl"
        style={{ scale: headlineScale, opacity: headlineOpacity }}
      >
        {/* Eyebrow */}
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-pm-accent-emerald">
            Backend Engineer
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.1}>
          <h1 className="mt-6 text-5xl font-bold leading-[1.08] tracking-tight text-pm-text md:text-7xl lg:text-[80px]">
            Hi, I&apos;m Sethuram.
          </h1>
        </Reveal>

        {/* Supporting copy */}
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-pm-text-secondary md:text-2xl md:leading-relaxed">
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

/* ------------------------------------------------------------------ */
/* 2. Highlights — accent bar grows on scroll                          */
/* ------------------------------------------------------------------ */

const highlights = [
  {
    title: "Backend systems",
    summary:
      "Event-driven services, transactional boundaries, async workflows, and APIs that stay understandable under pressure.",
    accent: "bg-pm-accent-emerald",
  },
  {
    title: "Production reliability",
    summary:
      "Debugging, observability, data fixes, p99 latency work, and calm ownership when systems misbehave.",
    accent: "bg-pm-accent-blue",
  },
  {
    title: "FinTech engineering",
    summary:
      "Loan workflows, credit systems, reconciliation, compliance-sensitive state transitions, and product constraints.",
    accent: "bg-pm-accent-amber",
  },
  {
    title: "AI developer tooling",
    summary:
      "Current exploration around code analysis, repository context, and AI workflows that support engineering judgment.",
    accent: "bg-pm-accent-emerald",
  },
  {
    title: "Writing and product taste",
    summary:
      "A bias toward explaining tradeoffs clearly, shaping ideas into usable interfaces, and learning in public.",
    accent: "bg-pm-accent-blue",
  },
];

function HighlightCard({
  highlight,
  index,
}: {
  highlight: (typeof highlights)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <Reveal delay={index * 0.06}>
      <article
        ref={ref}
        className="group relative overflow-hidden rounded-[var(--pm-radius-xl)] border border-pm-border bg-pm-surface-elevated p-7 shadow-pm-xs transition duration-300 hover:-translate-y-1 hover:shadow-pm-md"
      >
        <motion.span
          className={`absolute inset-x-0 top-0 h-1 origin-left ${highlight.accent}`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: index * 0.06 + 0.3,
          }}
          aria-hidden="true"
        />
        <h3 className="text-2xl font-semibold tracking-tight text-pm-text">
          {highlight.title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-pm-text-secondary">
          {highlight.summary}
        </p>
      </article>
    </Reveal>
  );
}

function HighlightsSection() {
  return (
    <section
      id="highlights"
      className="border-t border-pm-border px-6 py-24 md:py-32 lg:px-10"
    >
      <SectionHeader
        eyebrow="Highlights"
        title={
          <>
            Get the signal fast.{" "}
            <span className="text-pm-text-secondary">
              Then decide what to explore.
            </span>
          </>
        }
        supporting="This homepage keeps the portfolio compact: what I am good at, what I have worked on, what I am building now, and where to reach me."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {highlights.map((highlight, index) => (
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

/* ------------------------------------------------------------------ */
/* 3. Experience — scroll-driven timeline draw                         */
/* ------------------------------------------------------------------ */

function ExperienceSection({ phases }: { phases: ExperiencePhase[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"],
  });

  // Line draws from 0 to full height as you scroll
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="border-t border-pm-border px-6 py-24 md:py-32 lg:px-10"
    >
      <Reveal>
        <p className="text-sm font-medium tracking-wide uppercase text-pm-accent-emerald">
          Experience
        </p>
        <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight text-pm-text md:text-5xl">
          Production systems,{" "}
          <span className="text-pm-text-secondary">
            fintech workflows, and the path&nbsp;into backend work.
          </span>
        </h2>
      </Reveal>

      <div ref={timelineRef} className="relative mt-16 md:mt-20">
        {/* Scroll-driven vertical line */}
        <motion.div
          className="absolute left-[7px] top-3 hidden h-[calc(100%-24px)] w-px origin-top bg-pm-accent-emerald/40 md:left-[208px] md:block"
          style={{ scaleY: lineScaleY }}
          aria-hidden="true"
        />

        <ol className="grid gap-12 md:gap-16">
          {phases.map((phase, index) => (
            <Reveal key={phase.slug} delay={index * 0.08}>
              <li className="group relative md:grid md:grid-cols-[180px_1fr] md:gap-14">
                {/* Date column */}
                <div className="mb-3 flex items-center gap-3 md:mb-0 md:flex-col md:items-end md:gap-0 md:pt-1">
                  <time className="whitespace-nowrap text-sm font-medium text-pm-text-secondary md:text-right">
                    {formatDateRange(phase.dateRange)}
                  </time>
                </div>

                {/* Timeline dot — pulses on entry */}
                <TimelineDot />

                {/* Content card */}
                <div className="rounded-[var(--pm-radius-lg)] border border-pm-border bg-pm-surface-elevated p-6 shadow-pm-xs transition-shadow duration-300 group-hover:shadow-pm-md md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase text-pm-accent-emerald">
                        {phase.position}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-pm-text">
                        {phase.company}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-pm-text-secondary">
                    {phase.summary}
                  </p>

                  <ul className="mt-5 grid gap-2.5">
                    {phase.fieldNotes.map((note) => (
                      <li
                        key={note}
                        className="flex gap-3 text-sm leading-relaxed text-pm-text-secondary"
                      >
                        <span
                          className="mt-2 block size-1 shrink-0 rounded-full bg-pm-accent-emerald"
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
                        className="rounded-full border border-pm-border bg-pm-surface-alt px-3 py-1 text-xs font-medium text-pm-text-secondary"
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

function TimelineDot() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div
      ref={ref}
      className="absolute left-[202px] top-[6px] hidden md:block"
      aria-hidden="true"
    >
      <div className="relative flex size-3 items-center justify-center">
        <span className="absolute size-3 rounded-full border-2 border-pm-accent-emerald bg-pm-surface" />
        {/* Pulse ring on entry */}
        <motion.span
          className="absolute size-3 rounded-full bg-pm-accent-emerald/30"
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

/* ------------------------------------------------------------------ */
/* 4. Skills — Lottie + staggered icon float-up                        */
/* ------------------------------------------------------------------ */

function SkillsSection({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const visibleGroups = [...skillGroups]
    .sort((left, right) => left.order - right.order)
    .slice(0, 6);

  return (
    <section
      id="skills"
      className="relative border-t border-pm-border px-6 py-24 md:py-32 lg:px-10"
    >


      <div className="relative z-10">
        <SectionHeader
          eyebrow="Toolkit"
          title={
            <>
              A backend core,{" "}
              <span className="text-pm-text-secondary">
                with enough breadth to build the full surface.
              </span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleGroups.map((group, index) => (
            <Reveal key={group.slug} delay={index * 0.05}>
              <article className="rounded-[var(--pm-radius-xl)] border border-pm-border bg-pm-surface-elevated p-6 shadow-pm-xs transition duration-300 hover:-translate-y-1 hover:shadow-pm-md">
                <div className="flex min-h-36 flex-col">
                  <h3 className="text-xl font-semibold tracking-tight text-pm-text">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pm-text-secondary">
                    {group.summary}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    {group.skills.slice(0, 6).map((skill, skillIndex) => (
                      <SkillIcon
                        key={skill.slug}
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
      title={`${skill.title}: ${skill.summary}`}
      aria-label={`${skill.title}: ${skill.summary}`}
      className="group/icon relative flex size-11 items-center justify-center rounded-full border border-pm-border bg-pm-surface-alt text-pm-text-secondary transition duration-200 hover:scale-105 hover:bg-pm-surface-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pm-accent-emerald"
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
      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-3 hidden w-64 -translate-x-1/2 rounded-2xl border border-pm-border bg-pm-text px-4 py-3 text-left text-xs leading-relaxed text-pm-surface shadow-pm-lg group-hover/icon:block group-focus-visible/icon:block">
        <span className="block font-semibold">{skill.title}</span>
        <span className="mt-1 block text-pm-surface/75">
          {skill.summary}
        </span>
      </span>
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Selected Work                                                    */
/* ------------------------------------------------------------------ */

function SelectedWorkSection({
  items,
  currentItemSlug,
}: {
  items: ItemDocument[];
  currentItemSlug: string | undefined;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToProject(index: number) {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>(
      `[data-project-index="${index}"]`,
    );

    if (!scroller || !card) return;

    scroller.scrollTo({
      left: card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }

  function handleProjectScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-project-index]"),
    );
    const nextIndex = cards.reduce(
      (closest, card, index) => {
        const distance = Math.abs(card.offsetLeft - scroller.scrollLeft);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;

    setActiveIndex(nextIndex);
  }

  return (
    <section
      id="work"
      className="overflow-hidden border-t border-pm-border py-24 md:py-32"
    >
      <div className="px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Selected work"
            title={
              <>
                Project highlights,{" "}
                <span className="text-pm-text-secondary">
                  curated like a product tour.
                </span>
              </>
            }
            supporting="Each card is one proof point: current AI tooling, backend API work, realtime systems, visual algorithms, and architecture writing."
          />

          <Reveal>
            <div
              className="hidden items-center gap-3 md:flex"
              aria-label="Project carousel controls"
            >
              <button
                type="button"
                className="flex size-11 items-center justify-center rounded-full border border-pm-border bg-pm-surface-elevated text-pm-text transition hover:bg-pm-text hover:text-pm-surface disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-pm-surface-elevated disabled:hover:text-pm-text"
                onClick={() => scrollToProject(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous project"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="flex size-11 items-center justify-center rounded-full border border-pm-border bg-pm-surface-elevated text-pm-text transition hover:bg-pm-text hover:text-pm-surface disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-pm-surface-elevated disabled:hover:text-pm-text"
                onClick={() => scrollToProject(activeIndex + 1)}
                disabled={activeIndex === items.length - 1}
                aria-label="Next project"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] lg:px-10 [&::-webkit-scrollbar]:hidden"
        onScroll={handleProjectScroll}
        aria-label="Selected project highlights"
      >
        {items.map((item, index) => (
          <ProjectHighlightCard
            key={item.slug}
            item={item}
            index={index}
            isCurrent={item.slug === currentItemSlug}
          />
        ))}
      </div>

      <div className="px-6 lg:px-10">
        <div className="mt-4 flex items-center gap-2" aria-label="Project slide position">
          {items.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className={[
                "h-1.5 rounded-full transition-all",
                activeIndex === index
                  ? "w-10 bg-pm-text"
                  : "w-5 bg-pm-border-strong hover:bg-pm-text-secondary",
              ].join(" ")}
              onClick={() => scrollToProject(index)}
              aria-label={`Show ${item.title}`}
              aria-current={activeIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectHighlightCard({
  item,
  index,
  isCurrent,
}: {
  item: ItemDocument;
  index: number;
  isCurrent: boolean;
}) {
  const sourceHref = getProjectSourceHref(item);
  const cardClassName = [
    "group/card flex min-h-[500px] min-w-[calc(100vw-3rem)] snap-start flex-col overflow-hidden rounded-[2rem] border p-3 shadow-pm-sm transition duration-300 md:min-w-[660px] lg:min-w-[760px]",
    sourceHref
      ? "cursor-pointer hover:shadow-pm-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pm-accent-emerald"
      : "cursor-default",
    isCurrent
      ? "border-pm-accent-emerald/35 bg-pm-accent-emerald-subtle"
      : "border-pm-border bg-pm-surface-elevated",
  ].join(" ");

  const content = (
    <>
      <div className="relative h-48 overflow-hidden rounded-[1.35rem] bg-pm-surface-alt md:h-64 lg:h-80 xl:h-[360px]">
        {item.previewImage ? (
          <Image
            src={item.previewImage}
            alt={`${item.title} project preview`}
            fill
            sizes="(min-width: 1024px) 760px, (min-width: 768px) 660px, calc(100vw - 3rem)"
            className="object-cover transition duration-700 group-hover/card:scale-[1.03]"
            priority={index === 0}
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm font-medium text-pm-text-tertiary">
            Preview coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-3 pt-5 md:px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={[
              "rounded-full px-3 py-1 text-xs font-semibold",
              isCurrent
                ? "bg-pm-accent-emerald text-white"
                : "bg-pm-surface-alt text-pm-text-secondary",
            ].join(" ")}
          >
            {isCurrent ? "In progress" : "Completed"}
          </span>
          <span className="text-xs font-medium text-pm-text-tertiary">
            {sourceHref ? "Open source" : "Source coming soon"}
          </span>
        </div>

        <h3 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-pm-text">
          {item.title}
        </h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-pm-text-secondary">
          {item.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-pm-border bg-pm-surface-alt px-3 py-1 text-xs font-medium text-pm-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto border-t border-pm-border pt-4">
          <p className="text-xs font-semibold tracking-wider uppercase text-pm-text-tertiary">
            Why it matters
          </p>
          <p className="mt-2 text-sm leading-relaxed text-pm-text-secondary">
            {item.proof.mattered}
          </p>
        </div>
      </div>
    </>
  );

  if (!sourceHref) {
    return (
      <motion.article
        data-project-index={index}
        className={cardClassName}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.article>
    );
  }

  return (
    <motion.a
      data-project-index={index}
      href={sourceHref}
      target="_blank"
      rel="noreferrer"
      className={cardClassName}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`Open source for ${item.title}`}
    >
      {content}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Current Focus — dark highlight cards                             */
/* ------------------------------------------------------------------ */

type CurrentFocusCard = {
  actionLabel: string;
  category: "Building" | "Writing" | "Learning";
  detail: string;
  href?: string;
  summary: string;
  title: string;
};

function CurrentFocusSection({
  currentQuest,
  currentItem,
  fieldNotes,
  items,
  statusHud,
}: {
  currentQuest: CurrentQuest | undefined;
  currentItem: ItemDocument | undefined;
  fieldNotes: FieldNoteDocument[];
  items: ItemDocument[];
  statusHud: StatusHud;
}) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const writingNote =
    fieldNotes.find((note) => note.slug === statusHud.writing.fieldNote) ??
    [...fieldNotes].sort((left, right) => right.date.localeCompare(left.date))[0];
  const learningItem = items.find((item) => item.slug === "system-design-notebook");
  const cards: CurrentFocusCard[] = [
    {
      actionLabel: currentItem ? "Open source" : "Source coming soon",
      category: "Building",
      detail: currentQuest?.summary ?? statusHud.building.value,
      href: currentItem ? getProjectSourceHref(currentItem) : undefined,
      summary:
        currentItem?.proof.motivation ??
        "Current build focus across backend systems and AI tooling.",
      title: currentQuest?.title ?? currentItem?.title ?? statusHud.building.value,
    },
    {
      actionLabel: writingNote?.externalUrl ? "Read note" : "Draft note",
      category: "Writing",
      detail: statusHud.writing.value,
      href: writingNote?.externalUrl,
      summary:
        writingNote?.summary ??
        "Short field notes that capture what is being built, learned, and refined.",
      title: writingNote?.title ?? statusHud.writing.value,
    },
    {
      actionLabel: learningItem ? "Open repo" : "Repo coming soon",
      category: "Learning",
      detail: statusHud.learning.value,
      href: learningItem ? getProjectSourceHref(learningItem) : undefined,
      summary:
        learningItem?.proof.motivation ??
        "System design learning captured as reusable backend notes and architecture references.",
      title: learningItem?.title ?? "System Design Notebook",
    },
  ];

  function scrollToCard(index: number) {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>(
      `[data-current-focus-index="${index}"]`,
    );

    if (!scroller || !card) return;

    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft,
      behavior: "smooth",
    });
    setActiveIndex(index);
  }

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cardElements = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-current-focus-index]"),
    );
    const nextIndex = cardElements.reduce(
      (closest, card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
        const distance = Math.abs(cardCenter - scrollerCenter);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;

    setActiveIndex(nextIndex);
  }

  return (
    <section
      id="current-build"
      className="border-t border-pm-border px-6 py-24 md:py-32 lg:px-10"
    >
      <div ref={stickyRef}>
        <div className="relative overflow-hidden rounded-[2rem] bg-pm-text text-pm-surface shadow-pm-lg">


          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-medium tracking-wide uppercase text-pm-accent-emerald">
                  Currently
                </p>
                <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                  Building, writing, and learning in public.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pm-surface/65">
                  A compact pulse of what is moving right now, without turning
                  the portfolio into a status dashboard.
                </p>
              </div>

              <div className="flex items-center gap-2" aria-label="Current focus position">
                {cards.map((card, index) => (
                  <button
                    key={card.category}
                    type="button"
                    className={[
                      "h-1.5 rounded-full transition-all",
                      activeIndex === index
                        ? "w-10 bg-pm-surface"
                        : "w-5 bg-pm-surface/25 hover:bg-pm-surface/50",
                    ].join(" ")}
                    onClick={() => scrollToCard(index)}
                    aria-label={`Show ${card.category}`}
                    aria-current={activeIndex === index ? "true" : undefined}
                  />
                ))}
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc((100%-min(78vw,520px))/2)] pb-2 [scrollbar-width:none] md:px-[calc((100%-520px)/2)] [&::-webkit-scrollbar]:hidden"
              onScroll={handleScroll}
              aria-label="Current focus highlights"
            >
              {cards.map((card, index) => (
                <CurrentFocusCardView
                  key={card.category}
                  card={card}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CurrentFocusCardView({
  card,
  index,
}: {
  card: CurrentFocusCard;
  index: number;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-pm-accent-emerald px-3 py-1 text-xs font-semibold text-white">
          {card.category}
        </span>
        <span className="text-xs font-semibold text-pm-surface/45">
          {card.actionLabel}
        </span>
      </div>
      <h3 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-pm-surface">
        {card.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-pm-surface/65">
        {card.summary}
      </p>
      <div className="mt-auto border-t border-white/10 pt-5">
        <p className="text-xs font-semibold tracking-wider uppercase text-pm-surface/40">
          Focus
        </p>
        <p className="mt-2 text-sm leading-relaxed text-pm-surface/65">
          {card.detail}
        </p>
      </div>
    </>
  );

  const className =
    "flex min-h-[360px] min-w-[68vw] snap-center flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-pm-sm transition duration-300 md:min-w-[520px]";

  if (!card.href) {
    return (
      <motion.article
        data-current-focus-index={index}
        className={className}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.article>
    );
  }

  return (
    <motion.a
      data-current-focus-index={index}
      href={card.href}
      target="_blank"
      rel="noreferrer"
      className={`${className} hover:-translate-y-1 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pm-accent-emerald`}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`${card.actionLabel}: ${card.title}`}
    >
      {content}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Writing — Lottie accent                                          */
/* ------------------------------------------------------------------ */

function WritingSection({ fieldNotes }: { fieldNotes: FieldNoteDocument[] }) {
  const selectedNotes = useMemo(
    () =>
      [...fieldNotes]
        .sort((left, right) => right.date.localeCompare(left.date))
        .slice(0, 3),
    [fieldNotes],
  );

  return (
    <section
      id="writing"
      className="relative border-t border-pm-border px-6 py-24 md:py-32 lg:px-10"
    >


      <div className="relative z-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Writing"
            title={
              <>
                Field notes from the build.{" "}
                <span className="text-pm-text-secondary">
                  Technical, personal, and still evolving.
                </span>
              </>
            }
          />
          <Reveal>
            <a
              href="https://medium.com/@sethuram52001"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-pm-text px-5 py-2.5 text-sm font-medium text-pm-surface transition-opacity hover:opacity-80"
            >
              Find more on Medium
              <ExternalArrow />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {selectedNotes.map((note, index) => (
            <Reveal key={note.slug} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-[var(--pm-radius-xl)] border border-pm-border bg-pm-surface-elevated p-6 shadow-pm-xs">
                <div className="flex items-center justify-between gap-3 text-xs font-medium text-pm-text-tertiary">
                  <time>{formatDate(note.date)}</time>
                  <span className="capitalize">{note.category}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold tracking-tight text-pm-text">
                  {note.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-pm-text-secondary">
                  {note.summary}
                </p>
                {note.externalUrl ? (
                  <a
                    href={note.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex text-sm font-semibold text-pm-text transition-opacity hover:opacity-70"
                  >
                    Read note
                    <ExternalArrow />
                  </a>
                ) : (
                  <span className="mt-6 inline-flex text-sm font-semibold text-pm-text-tertiary">
                    Draft note
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Contact — compact split: links left, ID badge right              */
/* ------------------------------------------------------------------ */

type ContactChannel = {
  link: ExternalLink;
  title: string;
  actionLabel: string;
  icon: "document" | "linkedin" | "github";
};

function ContactSection({
  externalLinks,
}: {
  externalLinks: readonly ExternalLink[];
}) {
  const officialEmail = getExternalLink(externalLinks, "Email");
  const resume = getExternalLink(externalLinks, "Resume");
  const linkedIn = getExternalLink(externalLinks, "LinkedIn");
  const github = getExternalLink(externalLinks, "GitHub");

  const secondaryChannels = (
    [
      resume
        ? {
            link: resume,
            title: "Resume",
            actionLabel: "View resume",
            icon: "document" as const,
          }
        : null,
      linkedIn
        ? {
            link: linkedIn,
            title: "LinkedIn",
            actionLabel: "View profile",
            icon: "linkedin" as const,
          }
        : null,
      github
        ? {
            link: github,
            title: "GitHub",
            actionLabel: "View profile",
            icon: "github" as const,
          }
        : null,
    ] satisfies Array<ContactChannel | null>
  ).filter(Boolean) as ContactChannel[];

  return (
    <section
      id="contact"
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 border-t border-pm-border bg-pm-surface-alt"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20 lg:px-10">
        <Reveal blur={false}>
          <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-pm-md">
            <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-12 lg:p-12">
              <div>
                <p className="text-sm font-semibold text-pm-text-secondary">
                  Contact
                </p>
                <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight text-pm-text md:text-5xl">
                  Open to what&apos;s next.
                </h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-pm-text-secondary">
                  Open to backend roles, thoughtful product teams, and dev
                  collaborations — email is the best place to start.
                </p>

                {officialEmail ? (
                  <a
                    href={officialEmail.href}
                    className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#0071e3] px-6 text-[17px] font-medium text-white transition hover:bg-[#0077ed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0071e3]"
                  >
                    Email Sethuram
                  </a>
                ) : null}

                {secondaryChannels.length > 0 ? (
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {secondaryChannels.map((channel) => (
                      <ContactCompactLink key={channel.title} channel={channel} />
                    ))}
                  </div>
                ) : null}
              </div>

              <aside className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none lg:justify-self-end">
                <div className="group relative overflow-hidden rounded-[1.5rem] border border-pm-border bg-white shadow-pm-sm transition duration-300 hover:shadow-pm-md">
                  <div className="absolute left-1/2 top-3.5 z-20 h-2 w-10 -translate-x-1/2 rounded-full border border-black/5 bg-black/15 shadow-inner" />

                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-pm-surface-alt">
                    <Image
                      src="/profile/sethuram-contact.webp"
                      alt="Sethuram S V"
                      fill
                      sizes="(min-width: 1024px) 300px, 280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{ objectPosition: "50% 32%" }}
                    />
                  </div>

                  <div className="border-t border-pm-border px-5 py-5 text-center">
                    <p className="text-xl font-semibold tracking-tight text-pm-text">
                      Sethuram S V
                    </p>
                    <p className="mt-1 text-sm font-medium text-pm-text-secondary">
                      Backend Engineer
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCompactLink({ channel }: { channel: ContactChannel }) {
  return (
    <a
      href={channel.link.href}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-[5.5rem] flex-col justify-between rounded-[1rem] border border-pm-border bg-pm-surface-alt/70 p-4 transition duration-200 hover:border-pm-border-strong hover:bg-white hover:shadow-pm-xs"
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full bg-white text-pm-text shadow-pm-xs">
        <ContactChannelIcon icon={channel.icon} className="size-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-pm-text">
          {channel.title}
        </span>
        <span className="mt-1 inline-flex items-center gap-0.5 text-[13px] font-medium text-[#0066cc] group-hover:underline">
          {channel.actionLabel}
          <ChevronRight className="size-3.5" />
        </span>
      </span>
    </a>
  );
}

function ContactChannelIcon({
  icon,
  className,
}: {
  icon: ContactChannel["icon"];
  className?: string;
}) {
  switch (icon) {
    case "document":
      return <DocumentIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "github":
      return <GitHubIcon className={className} />;
  }
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 16 16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2.75h5.25L15 6.5v10.75H6z" />
      <path d="M11.25 2.75V6.5H15" />
      <path d="M8.25 10.25h4.5M8.25 13h3.25" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12m1.78 13.02H3.54V9H7.1zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 .5a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.82 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5" />
    </svg>
  );
}

function ExternalArrow({ className = "ml-2 inline size-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 14 14"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M1 13L13 1M13 1H4M13 1v9" />
    </svg>
  );
}

function getProjectSourceHref(item: ItemDocument) {
  const explicitSource = item.links.find((link) =>
    /source|github/i.test(link.label),
  );

  if (explicitSource) {
    return explicitSource.href;
  }

  if (item.artifact.type === "source") {
    return item.artifact.href;
  }

  return undefined;
}

function getExternalLink(
  links: readonly ExternalLink[],
  label: string,
): ExternalLink | undefined {
  return links.find((link) => link.label === label && !link.placeholder);
}

function formatDateRange(dateRange: ExperiencePhase["dateRange"]) {
  return `${formatMonth(dateRange.start)} — ${
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
