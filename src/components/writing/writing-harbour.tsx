import type { CSSProperties } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import type { FieldNoteDocument } from "@/lib/content/schemas";

type WritingHarbourProps = {
  notes: FieldNoteDocument[];
};

const mediumUrl = "https://medium.com/@sethuram52001";

export function WritingHarbour({ notes }: WritingHarbourProps) {
  const selectedNotes = [...notes]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <section className="grid gap-12">
      <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-4xl">
          <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-secondary">
            Field notes
          </p>
          <h1 className="mt-3 text-[52px] font-black uppercase leading-none text-lp-on-surface md:text-[88px]">
            Writing Harbour
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
            Selected writing and build notes. Published entries open the original
            article; draft notes stay visible as a small preview of what may ship
            later.
          </p>
        </div>

        <a
          className="inline-flex w-fit items-center gap-3 rounded-lp border-[3px] border-lp-ink bg-lp-secondary-container px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.08em] text-lp-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          href={mediumUrl}
          rel="noreferrer"
          target="_blank"
        >
          Find more on Medium
          <ArrowTopRightOnSquareIcon className="size-4" />
        </a>
      </header>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {selectedNotes.map((note) => (
          <FieldNoteCard key={note.slug} note={note} />
        ))}
      </div>
    </section>
  );
}

function FieldNoteCard({ note }: { note: FieldNoteDocument }) {
  const isPublishedExternally = Boolean(note.externalUrl);
  const previewStyle = note.previewImage
    ? ({ backgroundImage: `url(${note.previewImage})` } satisfies CSSProperties)
    : undefined;

  const content = (
    <article
      className={[
        "flex h-full flex-col overflow-hidden rounded-lp-md border-[3px] border-lp-ink bg-lp-surface-container-lowest shadow-lp-level-3 transition",
        isPublishedExternally
          ? "group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-lp-level-2"
          : "opacity-70 grayscale-[30%]",
      ].join(" ")}
    >
      <div
        className="relative min-h-52 border-b-[3px] border-lp-ink bg-cover bg-center"
        style={previewStyle}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.34),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(254,166,25,0.32),transparent_24%),linear-gradient(135deg,var(--lp-color-surface-container-high),var(--lp-color-surface-container-lowest))]" />
        {note.previewImage ? <div className="absolute inset-0 bg-lp-ink/20" /> : null}
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3">
          <span className="rounded-lp border-[3px] border-lp-ink bg-lp-surface-container-lowest px-3 py-2 font-mono text-[11px] font-black uppercase tracking-[0.08em] text-lp-on-surface shadow-lp-level-2">
            {formatDate(note.date)}
          </span>
          <span className="rounded-lp border-[3px] border-lp-ink bg-lp-secondary-container px-3 py-2 font-mono text-[11px] font-black uppercase tracking-[0.08em] text-lp-on-surface shadow-lp-level-2">
            {isPublishedExternally ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h2 className="text-2xl font-black leading-tight text-lp-on-surface">
          {note.title}
        </h2>
        <p className="text-sm font-bold leading-6 text-lp-on-surface-variant">
          {note.summary}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {note.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container px-3 py-2 font-mono text-[11px] font-black uppercase text-lp-on-surface-variant"
            >
              {topic}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 border-t-[3px] border-lp-ink pt-4 font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-primary">
          {isPublishedExternally ? "Open Article" : "Draft Preview"}
          <ArrowTopRightOnSquareIcon className="size-4" />
        </span>
      </div>
    </article>
  );

  if (!isPublishedExternally) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <a href={note.externalUrl} className="group block" target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
