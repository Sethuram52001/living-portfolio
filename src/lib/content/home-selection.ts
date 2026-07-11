import type { FieldNoteDocument, HomeSelection, ItemDocument } from "./schemas";

export class HomeSelectionError extends Error {}

export type ResolvedHomeSelection = {
  selectedWork: ItemDocument[];
  currentFocus: {
    building: ItemDocument;
    learning: ItemDocument;
    writing: FieldNoteDocument;
  };
};

export function resolveHomeSelection({
  fieldNotes,
  homeSelection,
  items,
}: {
  fieldNotes: FieldNoteDocument[];
  homeSelection: HomeSelection;
  items: ItemDocument[];
}): ResolvedHomeSelection {
  const findItem = (slug: string, label: string) => {
    const item = items.find((candidate) => candidate.slug === slug);

    if (!item) {
      throw new HomeSelectionError(`${label} references missing Item "${slug}".`);
    }

    return item;
  };

  const selectedWork = homeSelection.selectedWorkSlugs.map((slug) =>
    findItem(slug, "Selected Work"),
  );

  const writing =
    homeSelection.currentFocus.writing === "latest-draft"
      ? [...fieldNotes]
          .filter((note) => note.status === "draft")
          .sort((left, right) => right.date.localeCompare(left.date))[0]
      : undefined;

  if (!writing) {
    throw new HomeSelectionError(
      "Writing focus requires at least one draft Field Note.",
    );
  }

  return {
    selectedWork,
    currentFocus: {
      building: findItem(
        homeSelection.currentFocus.building.itemSlug,
        "Building focus",
      ),
      learning: findItem(
        homeSelection.currentFocus.learning.itemSlug,
        "Learning focus",
      ),
      writing,
    },
  };
}
