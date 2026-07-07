import type { CurrentQuestInput } from "@/lib/content/schemas";

export const currentQuests = [
  {
    slug: "ai-code-analysis-tool",
    title: "AI Code Analysis Tool",
    status: "in-progress",
    placeholder: true,
    summary: "Placeholder Current Quest for an AI-assisted code analysis tool.",
    startedOn: "2026-06-15",
    focus: ["building", "learning"],
    links: [],
    references: {
      skills: ["llms", "codex", "node-js", "typescript"],
      items: ["ai-code-analysis-tool"],
    },
  },
] satisfies CurrentQuestInput[];
