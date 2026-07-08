"use client";

import Image from "next/image";
import { useMemo } from "react";
import type { FieldNoteDocument } from "@/lib/content/schemas";
import { formatDate } from "../common/formatters";
import { ExternalArrow } from "../common/icons";
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
  const dotLabels = selectedNotes.map((note) => note.title);

  return (
    <section
      id="writing"
      className="relative border-t border-app-border px-6 py-24 md:py-32 lg:px-10"
    >
      <div className="relative z-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
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
          <Reveal>
            <a
              href="https://medium.com/@sethuram52001"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-app-foreground px-5 py-2.5 text-sm font-medium text-app-background transition-opacity hover:opacity-80"
            >
              Find more on Medium
              <ExternalArrow />
            </a>
          </Reveal>
        </div>

        <ScrollSnapCarousel
          autoPlay={false}
          ariaLabel="Selected writing previews"
          controlsLabel="Writing slide position"
          dotLabels={dotLabels}
          itemClassName="min-w-[calc(100vw-3rem)] snap-center md:min-w-[420px] lg:min-w-[460px]"
          scrollerClassName="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {selectedNotes.map((note, index) => (
            <Reveal key={note.externalUrl ?? note.title} delay={index * 0.06}>
              <WritingNoteCard note={note} eager={index === 0} />
            </Reveal>
          ))}
        </ScrollSnapCarousel>
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
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 420px, calc(100vw - 3rem)"
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
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-app-subtle">
          <time>{formatDate(note.date)}</time>
          <span>{note.category}</span>
        </div>
        <h3 className="mt-6 text-xl font-semibold tracking-tight text-app-foreground">
          {note.title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-app-muted">
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
