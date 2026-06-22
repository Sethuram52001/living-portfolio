import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FieldNoteDetail } from "@/components/writing/field-note-detail";
import { loadFieldNotes } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

type FieldNotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return loadFieldNotes().map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: FieldNotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = loadFieldNotes().find((candidate) => candidate.slug === slug);

  if (!note) {
    return createPageMetadata({
      title: "Field Note",
      description: "Field Note not found.",
      path: "/writing",
    });
  }

  return createPageMetadata({
    title: note.title,
    description: note.summary,
    path: `/writing/${note.slug}`,
    type: "article",
    publishedTime: note.date,
    noIndex: note.status !== "published" || note.placeholder,
  });
}

export default async function FieldNotePage({ params }: FieldNotePageProps) {
  const { slug } = await params;
  const note = loadFieldNotes().find((candidate) => candidate.slug === slug);

  if (!note) {
    notFound();
  }

  return <FieldNoteDetail note={note} />;
}
