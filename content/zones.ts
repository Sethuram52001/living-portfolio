import type { ZoneInput } from "@/lib/content/schemas";

export const zones = [
  {
    slug: "current-camp",
    title: "Active Quests",
    plainTitle: "Active work",
    status: "current",
    summary: "Placeholder zone for active quests across building, writing, and learning.",
    surface: "home",
    order: 1,
    placeholder: true,
    links: {
      quest: "ai-code-analysis-tool",
    },
  },
  {
    slug: "production-systems",
    title: "Production Systems",
    plainTitle: "Backend experience",
    status: "available",
    summary: "Placeholder zone for backend, distributed systems, and reliability proof.",
    surface: "experience",
    order: 2,
    placeholder: true,
    links: {
      experience: "first-production-systems",
    },
  },
  {
    slug: "project-archive",
    title: "Project Archive",
    plainTitle: "Selected work",
    status: "available",
    summary: "Placeholder zone for selected projects and inspectable work.",
    surface: "work",
    order: 3,
    placeholder: true,
    links: {
      item: "path-visualizer",
    },
  },
  {
    slug: "writing-harbour",
    title: "Writing Harbour",
    plainTitle: "Field notes",
    status: "available",
    summary: "Placeholder zone for writing, learning notes, and dev logs.",
    surface: "writing",
    order: 4,
    placeholder: true,
    links: {
      fieldNote: "first-map-notes",
    },
  },
  {
    slug: "skill-tree",
    title: "Skill Tree",
    plainTitle: "Capabilities",
    status: "available",
    summary: "Placeholder zone for grouped backend, systems, AI, and writing capabilities.",
    surface: "skills",
    order: 5,
    placeholder: true,
    links: {},
  },
] satisfies ZoneInput[];
