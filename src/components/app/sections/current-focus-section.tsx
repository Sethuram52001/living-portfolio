"use client";

import { motion } from "motion/react";
import type { FieldNoteDocument, ItemDocument } from "@/lib/content/schemas";
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
  buildingItem,
  learningItem,
  writingNote,
}: {
  buildingItem: ItemDocument;
  learningItem: ItemDocument;
  writingNote: FieldNoteDocument;
}) {
  const cards: CurrentFocusCard[] = [
    {
      category: "Building",
      detail: buildingItem.summary,
      href: getProjectSourceHref(buildingItem),
      summary: buildingItem.proof.motivation,
      title: buildingItem.title,
    },
    {
      category: "Writing",
      detail: "Latest draft field note.",
      href: writingNote.externalUrl,
      summary: writingNote.summary,
      title: writingNote.title,
    },
    {
      category: "Learning",
      detail: learningItem.summary,
      href: getProjectSourceHref(learningItem),
      summary: learningItem.proof.motivation,
      title: learningItem.title,
    },
  ];
  const slides = cards.map((card) => ({
    id: card.category,
    label: card.category,
    content: <CurrentFocusCardView card={card} />,
  }));

  return (
    <section
      id="current-build"
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-x-clip bg-black px-6 py-24 text-white md:py-32 lg:px-10"
    >
      <div
        className="pointer-events-none absolute -left-40 -top-40 size-[520px] rounded-full bg-cyan-400/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 size-[520px] rounded-full bg-amber-400/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-[0.18em] text-white/45 uppercase">
            Currently
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.04] tracking-tight md:text-5xl lg:text-6xl">
            Building, writing, and learning in public.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55">
            A compact pulse of what is moving right now, without turning the
            portfolio into a status dashboard.
          </p>
        </div>
      </div>

      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <ScrollSnapCarousel
          ariaLabel="Current focus highlights"
          controlsLabel="Current focus position"
          layout="focus"
          slides={slides}
        />
      </div>
    </section>
  );
}

function getCurrentFocusTone(category: CurrentFocusCard["category"]) {
  switch (category) {
    case "Building":
      return "bg-cyan-400";
    case "Writing":
      return "bg-amber-400";
    case "Learning":
      return "bg-app-accent-green";
  }
}

function CurrentFocusCardView({ card }: { card: CurrentFocusCard }) {
  const toneClassName = getCurrentFocusTone(card.category);
  const content = (
    <>
      <div className="flex items-center gap-2">
        <span
          className={`block size-1.5 rounded-full ${toneClassName}`}
          aria-hidden="true"
        />
        <span className="text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
          {card.category}
        </span>
      </div>
      <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white">
        {card.title}
      </h3>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
        {card.summary}
      </p>
      <div className="mt-auto pt-8">
        <p className="text-xs font-medium tracking-[0.18em] text-white/40 uppercase">
          Focus
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          {card.detail}
        </p>
        {card.href ? (
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition group-hover:text-white">
            Open
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        ) : null}
      </div>
    </>
  );

  const className =
    "group flex h-96 w-full flex-col rounded-3xl border border-white/[0.06] bg-[#1d1d1f] p-8 shadow-app-sm transition duration-300 hover:border-white/15 lg:h-[25rem] lg:p-10";

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
      className={`${className} hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
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
