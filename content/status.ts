import type { StatusHudInput } from "@/lib/content/schemas";

export const statusHud = {
  placeholder: true,
  updatedOn: "2026-06-15",
  building: {
    label: "Building",
    value: "AI code analysis tool placeholder",
    quest: "ai-code-analysis-tool",
  },
  writing: {
    label: "Writing",
    value: "Living portfolio field notes placeholder",
    fieldNote: "first-map-notes",
  },
  learning: {
    label: "Learning",
    value: "Portfolio content modeling placeholder",
    skills: ["technical-writing", "ai-tooling"],
  },
} satisfies StatusHudInput;
