import type { Metadata } from "next";
import { WritingHarbour } from "@/components/writing/writing-harbour";
import { getRequiredRouteByHref } from "@/config/site";
import { loadFieldNotes } from "@/lib/content/loaders";
import { createPageMetadata } from "@/lib/site/metadata";

const route = getRequiredRouteByHref("/writing");

export const metadata: Metadata = createPageMetadata({
  title: route.title,
  description: route.description,
  path: route.href,
});

export default function WritingPage() {
  const notes = loadFieldNotes();

  return <WritingHarbour notes={notes} />;
}
