import type { HomeSelectionInput } from "@/lib/content/schemas";

export const homeSelection = {
  selectedWorkSlugs: ["path-visualizer", "sorting-visualizer"],
  currentFocus: {
    building: {
      itemSlug: "ai-code-analysis-tool",
    },
    writing: "latest-draft",
    learning: {
      itemSlug: "system-design-notebook",
    },
  },
} satisfies HomeSelectionInput;
