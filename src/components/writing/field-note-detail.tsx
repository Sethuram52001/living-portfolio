import Link from "next/link";
import type { FieldNoteDocument } from "@/lib/content/schemas";
import { MarkdownBody } from "@/components/writing/markdown-body";

type FieldNoteDetailProps = {
  note: FieldNoteDocument;
};

export function FieldNoteDetail({ note }: FieldNoteDetailProps) {
  return (
    <article className="mx-auto grid max-w-4xl gap-8">
      <Link
        href="/writing"
        className="w-fit rounded-lp border-2 border-lp-ink bg-lp-surface-container-lowest px-3 py-2 font-mono text-xs font-black uppercase tracking-[0.08em] text-lp-on-surface transition hover:bg-lp-primary-container"
      >
        Back to writing
      </Link>

      <header className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-6 shadow-lp-level-3 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-secondary">
              Field Note
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-lp-on-surface lg:text-6xl">
              {note.title}
            </h1>
          </div>
          {note.placeholder ? (
            <span className="rounded-lp border-2 border-lp-ink bg-lp-secondary-container px-3 py-1 font-mono text-xs font-black uppercase text-lp-on-surface">
              Draft placeholder
            </span>
          ) : null}
        </div>

        <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-lp-on-surface-variant">
          {note.summary}
        </p>
        <p className="mt-5 font-mono text-sm font-black uppercase tracking-[0.08em] text-lp-on-surface-variant">
          {formatDate(note.date)}
        </p>
      </header>

      <section className="rounded-lp-xl border-[3px] border-lp-ink bg-lp-surface-container-lowest p-6 shadow-lp-level-2 lg:p-8">
        <MarkdownBody body={note.body} />
      </section>
    </article>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00.000Z`));
}
