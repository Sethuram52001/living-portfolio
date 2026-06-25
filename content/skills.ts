import type { SkillGroupInput } from "@/lib/content/schemas";

export const skillGroups = [
  {
    slug: "backend",
    title: "Backend Engineering",
    summary: "Placeholder group for backend systems and API work.",
    order: 1,
    placeholder: true,
    skills: [
      {
        slug: "backend-systems",
        title: "Backend Systems",
        status: "current",
        summary: "Placeholder backend systems skill node.",
        references: {
          experiences: ["zenstatement"],
          quests: ["ai-code-analysis-tool"],
        },
      },
    ],
  },
  {
    slug: "systems",
    title: "Systems Thinking",
    summary: "Placeholder group for reliability, distributed systems, and observability.",
    order: 2,
    placeholder: true,
    skills: [
      {
        slug: "distributed-systems",
        title: "Distributed Systems",
        status: "learning",
        summary: "Placeholder distributed systems skill node.",
        references: {
          experiences: ["zenstatement"],
        },
      },
    ],
  },
  {
    slug: "ai",
    title: "AI Tooling",
    summary: "Placeholder group for AI-assisted developer tooling.",
    order: 3,
    placeholder: true,
    skills: [
      {
        slug: "ai-code-analysis",
        title: "AI Code Analysis",
        status: "current",
        summary: "Placeholder AI code analysis skill node.",
        references: {
          quests: ["ai-code-analysis-tool"],
        },
      },
    ],
  },
  {
    slug: "algorithms",
    title: "Algorithms",
    summary: "Placeholder group for algorithmic problem solving and visual explainers.",
    order: 4,
    placeholder: true,
    skills: [
      {
        slug: "algorithms",
        title: "Algorithms",
        status: "available",
        summary: "Placeholder algorithms skill node.",
        references: {
          items: ["path-visualizer"],
          zones: ["project-archive"],
        },
      },
    ],
  },
  {
    slug: "frontend-breadth",
    title: "Frontend Breadth",
    summary: "Placeholder group for frontend craft and older project work.",
    order: 5,
    placeholder: true,
    skills: [
      {
        slug: "frontend-breadth",
        title: "Frontend Breadth",
        status: "available",
        summary: "Placeholder frontend breadth skill node.",
        references: {
          items: ["path-visualizer"],
        },
      },
    ],
  },
  {
    slug: "writing-product",
    title: "Writing And Product Thinking",
    summary: "Placeholder group for Field Notes and product judgment.",
    order: 6,
    placeholder: true,
    skills: [
      {
        slug: "technical-writing",
        title: "Technical Writing",
        status: "learning",
        summary: "Placeholder technical writing skill node.",
        references: {
          fieldNotes: ["first-map-notes"],
        },
      },
    ],
  },
] satisfies SkillGroupInput[];
