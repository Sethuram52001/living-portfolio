"use client";

import { motion } from "motion/react";
import type { FieldNoteDocument, ItemDocument } from "@/lib/content/schemas";
import { getProjectSourceHref } from "../common/links";

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
      detail: buildingItem.motive ?? "Exploring a more understandable way to work with unfamiliar codebases.",
      href: getProjectSourceHref(buildingItem),
      summary: buildingItem.summary,
      title: buildingItem.title,
    },
    {
      category: "Writing",
      detail: writingNote.motive ?? "Developing the next field note.",
      href: writingNote.externalUrl,
      summary: writingNote.summary,
      title: writingNote.title,
    },
    {
      category: "Learning",
      detail: learningItem.motive ?? "Exploring system design through focused exercises and implementation.",
      href: getProjectSourceHref(learningItem),
      summary: learningItem.summary,
      title: learningItem.title,
    },
  ];
  return (
    <section
      id="current-build"
      className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-x-clip bg-black px-6 py-24 text-white md:py-32 lg:px-10"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-app-accent-green uppercase">
            Currently
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.04] tracking-tight md:text-5xl lg:text-6xl">
            What&apos;s taking shape.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/55">
            A view into the projects and ideas I&apos;m actively building,
            exploring, and refining.
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <CurrentFocusCardView key={card.category} card={card} />
        ))}
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
          Motive
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          {card.detail}
        </p>
        {card.href ? (
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition-colors group-hover:text-app-accent-green">
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
    "group flex min-h-[32rem] w-full flex-col rounded-3xl border border-white/[0.06] bg-[#1d1d1f] p-6 shadow-app-sm transition duration-300 hover:border-white/15 sm:min-h-[30rem] sm:p-8 lg:min-h-[26rem] lg:p-10";

  if (!card.href) {
    return (
      <motion.article
        data-current-focus-card
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
      data-current-focus-card
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
