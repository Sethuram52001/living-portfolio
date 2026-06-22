import Link from "next/link";
import type { FieldNoteDocument } from "@/lib/content/schemas";

type WritingHarbourProps = {
  notes: FieldNoteDocument[];
};

export function WritingHarbour({ notes }: WritingHarbourProps) {
  const draftCount = notes.filter((note) => note.status === "draft").length;

  return (
    <section className="grid gap-8">
      <header className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
        <div>
          <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-secondary">
            Field Notes
          </p>
          <h1 className="mt-3 text-5xl font-black uppercase leading-none text-lp-primary lg:text-6xl">
            Writing
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
            Notes, essays, and dev logs from the things I am building and learning.
            Drafts stay marked until they become public writing.
          </p>
        </div>

        <aside className="rounded-lp-lg border-[3px] border-lp-ink bg-lp-surface-container-highest p-5 shadow-lp-level-2">
          <p className="font-mono text-xs font-black uppercase tracking-[0.12em] text-lp-on-surface-variant">
            Notes
          </p>
          <p className="mt-2 text-4xl font-black text-lp-on-surface">
            {notes.length}
          </p>
          <p className="mt-2 text-sm font-bold leading-6 text-lp-on-surface-variant">
            {draftCount > 0
              ? `${draftCount} draft placeholder${draftCount === 1 ? "" : "s"}`
              : "Public writing ready"}
          </p>
        </aside>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {notes.map((note) => (
          <FieldNoteCard key={note.slug} note={note} />
        ))}
      </div>
    </section>
  );
}

function FieldNoteCard({ note }: { note: FieldNoteDocument }) {
  return (
    <article className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-5 shadow-lp-level-3 lg:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.1em] text-lp-tertiary">
            {formatDate(note.date)}
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-lp-on-surface">
            {note.title}
          </h2>
        </div>
        {note.placeholder ? (
          <span className="rounded-lp border-2 border-lp-ink bg-lp-secondary-container px-3 py-1 font-mono text-xs font-black uppercase text-lp-on-surface">
            Draft
          </span>
        ) : null}
      </div>

      <p className="mt-4 text-base font-bold leading-7 text-lp-on-surface-variant">
        {note.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {note.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-lp border-2 border-lp-outline-variant bg-lp-surface-container px-3 py-2 font-mono text-xs font-black uppercase text-lp-on-surface-variant"
          >
            #{topic}
          </span>
        ))}
      </div>

      <Link
        href={`/writing/${note.slug}`}
        className="mt-6 inline-flex rounded-lp border-[3px] border-lp-ink bg-lp-primary px-5 py-3 text-sm font-black uppercase text-lp-inverse-on-surface shadow-lp-level-2 transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        Read note
      </Link>
    </article>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
