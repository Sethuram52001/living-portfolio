import type { HomeSelectionInput } from "@/lib/content/schemas";

export const homeSelection = {
  selectedWorkSlugs: ["path-visualizer", "sorting-visualizer"],
  currentFocus: {
    building: {
      itemSlug: "codelens",
    },
    writing: "latest-draft",
    learning: {
      itemSlug: "system-design-compendium",
    },
  },
} satisfies HomeSelectionInput;
