import type { StatusHudInput } from "@/lib/content/schemas";

export const statusHud = {
  placeholder: false,
  updatedOn: "2026-07-03",
  building: {
    label: "Building",
    value: "AI code analysis tool placeholder",
    quest: "ai-code-analysis-tool",
  },
  writing: {
    label: "Writing",
    value: "Writing about Go internals, DSA, and backend learning notes",
    fieldNote: "backend-reliability-notes",
  },
  learning: {
    label: "Learning",
    value: "Portfolio content modeling placeholder",
    skills: ["technical-writing", "llms"],
  },
} satisfies StatusHudInput;
