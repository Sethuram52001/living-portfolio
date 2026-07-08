"use client";

import { useMemo, useRef } from "react";
import { motion } from "motion/react";
import type {
  CurrentQuest,
  FieldNoteDocument,
  ItemDocument,
  StatusHud,
} from "@/lib/content/schemas";
import { getProjectSourceHref } from "../common/links";
import { ScrollSnapCarousel } from "../common/scroll-snap-carousel";

type CurrentFocusCard = {
  category: "Building" | "Writing" | "Learning";
  detail: string;
  href?: string;
  summary: string;
  title: string;
};

export function CurrentFocusSection({
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
  const writingNote = [...fieldNotes]
    .filter((note) => note.status === "draft")
    .sort((left, right) => right.date.localeCompare(left.date))[0];
  const learningItem = items.find(
    (item) => item.slug === "system-design-notebook",
  );
  const cards: CurrentFocusCard[] = useMemo(
    () => [
      {
        category: "Building",
        detail: currentQuest?.summary ?? statusHud.building.value,
        href: currentItem ? getProjectSourceHref(currentItem) : undefined,
        summary:
          currentItem?.proof.motivation ??
          "Current build focus across backend systems and AI tooling.",
        title:
          currentQuest?.title ?? currentItem?.title ?? statusHud.building.value,
      },
      {
        category: "Writing",
        detail: statusHud.writing.value,
        href: writingNote?.externalUrl,
        summary:
          writingNote?.summary ??
          "Short field notes that capture what is being built, learned, and refined.",
        title: writingNote?.title ?? statusHud.writing.value,
      },
      {
        category: "Learning",
        detail: statusHud.learning.value,
        href: learningItem ? getProjectSourceHref(learningItem) : undefined,
        summary:
          learningItem?.proof.motivation ??
          "System design learning captured as reusable backend notes and architecture references.",
        title: learningItem?.title ?? "System Design Notebook",
      },
    ],
    [currentItem, currentQuest, learningItem, statusHud, writingNote],
  );
  const dotLabels = cards.map((card) => card.category);

  return (
    <section
      id="current-build"
      className="border-t border-app-border px-6 py-24 md:py-32 lg:px-10"
    >
      <div ref={stickyRef}>
        <div className="relative overflow-hidden rounded-[2rem] bg-app-foreground text-app-background shadow-app-lg">
          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-medium tracking-wide uppercase text-app-accent-green">
                  Currently
                </p>
                <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                  Building, writing, and learning in public.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-app-background/65">
                  A compact pulse of what is moving right now, without turning
                  the portfolio into a status dashboard.
                </p>
              </div>
            </div>

            <ScrollSnapCarousel
              autoPlay={false}
              ariaLabel="Current focus highlights"
              controlsLabel="Current focus position"
              controlsVariant="dark"
              dotLabels={dotLabels}
              itemClassName="min-w-[68vw] snap-center md:min-w-[520px]"
              scrollerClassName="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[calc((100%-min(78vw,520px))/2)] pb-2 [scrollbar-width:none] md:px-[calc((100%-520px)/2)] [&::-webkit-scrollbar]:hidden"
            >
              {cards.map((card) => (
                <CurrentFocusCardView key={card.category} card={card} />
              ))}
            </ScrollSnapCarousel>
          </div>
        </div>
      </div>
    </section>
  );
}

function CurrentFocusCardView({ card }: { card: CurrentFocusCard }) {
  const content = (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-app-accent-green px-3 py-1 text-xs font-semibold text-white">
          {card.category}
        </span>
      </div>
      <h3 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-app-background">
        {card.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-app-background/65">
        {card.summary}
      </p>
      <div className="mt-auto border-t border-white/10 pt-5">
        <p className="text-xs font-semibold tracking-wider uppercase text-app-background/40">
          Focus
        </p>
        <p className="mt-2 text-sm leading-relaxed text-app-background/65">
          {card.detail}
        </p>
      </div>
    </>
  );

  const className =
    "flex min-h-[360px] w-full flex-col rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-app-sm transition duration-300";

  if (!card.href) {
    return (
      <motion.article
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
      href={card.href}
      target="_blank"
      rel="noreferrer"
      className={`${className} hover:-translate-y-1 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-accent-green`}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`Open ${card.title}`}
    >
      {content}
    </motion.a>
  );
}
