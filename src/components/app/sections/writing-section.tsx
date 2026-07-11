"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { FieldNoteDocument } from "@/lib/content/schemas";
import { formatDate } from "../common/formatters";
import { MediumIcon } from "../common/icons";
import { Reveal } from "../common/reveal";
import { ScrollSnapCarousel } from "../common/scroll-snap-carousel";
import { SectionHeader } from "../common/section-header";

export function WritingSection({
  fieldNotes,
}: {
  fieldNotes: FieldNoteDocument[];
}) {
  const selectedNotes = useMemo(
    () =>
      [...fieldNotes]
        .filter((note) => note.status === "published")
        .sort((left, right) => right.date.localeCompare(left.date))
        .slice(0, 4),
    [fieldNotes],
  );
  const slides = selectedNotes.map((note, index) => ({
    id: note.externalUrl ?? note.title,
    label: note.title,
    content: (
      <Reveal className="h-full" delay={index * 0.06}>
        <WritingNoteCard note={note} eager={index === 0} />
      </Reveal>
    ),
  }));

  return (
    <section
      id="writing"
      className="relative border-t border-app-border py-24 md:py-32"
    >
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <SectionHeader
            eyebrow="Writing"
            title={
              <>
                Field notes from the build.{" "}
                <span className="text-app-muted">
                  Technical, personal, and still evolving.
                </span>
              </>
            }
          />
        </div>

        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <ScrollSnapCarousel
            ariaLabel="Selected writing previews"
            controlsLabel="Writing slide position"
            layout="writing"
            slides={slides}
          />
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <a
              href="https://medium.com/@sethuram52001"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-14 items-center justify-between gap-3 rounded-full border border-app-border-strong bg-app-surface-card px-4 py-2 text-sm font-semibold text-app-foreground shadow-app-xs transition duration-200 hover:-translate-y-0.5 hover:shadow-app-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-foreground"
            >
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-black text-white">
                <MediumIcon className="size-4" />
              </span>
              Read more on Medium
              <span className="text-app-subtle transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WritingNoteCard({
  eager,
  note,
}: {
  eager: boolean;
  note: FieldNoteDocument;
}) {
  const className =
    "group/writing flex h-full flex-col overflow-hidden rounded-[var(--app-radius-xl)] border border-app-border bg-app-surface-card shadow-app-xs transition duration-200";
  const content = (
    <>
      <div className="relative aspect-[1.85/1] overflow-hidden bg-app-surface-muted">
        {note.previewImage ? (
          <Image
            src={note.previewImage}
            alt={`${note.title} article preview`}
            fill
            sizes="(min-width: 1280px) calc((100vw - 112px) / 3), (min-width: 1024px) 460px, (min-width: 768px) 420px, calc(100vw - 4rem)"
            className="object-cover transition duration-700 group-hover/writing:scale-[1.03]"
            loading={eager ? "eager" : "lazy"}
          />
        ) : (
          <div className="flex size-full items-end bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.20),transparent_34%),linear-gradient(135deg,#f8fafc,#e2e8f0)] p-5">
            <span className="text-xs font-semibold tracking-wide text-app-subtle uppercase">
              Article preview
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6 xl:p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-app-subtle">
          <time>{formatDate(note.date)}</time>
          <span>{note.category}</span>
        </div>
        <h3 className="mt-6 h-[5.25rem] line-clamp-3 text-xl font-semibold tracking-tight text-app-foreground">
          {note.title}
        </h3>
        <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-app-muted">
          {note.summary}
        </p>
      </div>
    </>
  );

  if (!note.externalUrl) {
    return <article className={className}>{content}</article>;
  }

  return (
    <a
      href={note.externalUrl}
      target="_blank"
      rel="noreferrer"
      className={`${className} hover:-translate-y-1 hover:shadow-app-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-app-accent-green`}
      aria-label={`Read ${note.title}`}
    >
      {content}
    </a>
  );
}
