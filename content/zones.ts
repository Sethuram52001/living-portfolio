import type { ZoneInput } from "@/lib/content/schemas";

export const zones = [
  {
    slug: "current-camp",
    title: "Current Camp",
    plainTitle: "Current work",
    status: "current",
    summary: "Placeholder zone for active building, writing, and learning.",
    surface: "home",
    order: 1,
    placeholder: true,
    links: {
      quest: "ai-code-analysis-tool",
    },
  },
  {
    slug: "systems-dungeon",
    title: "Systems Dungeon",
    plainTitle: "Backend systems",
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
    slug: "algorithm-forest",
    title: "Algorithm Forest",
    plainTitle: "Algorithms and problem solving",
    status: "available",
    summary: "Placeholder zone for algorithmic projects and visualizations.",
    surface: "work",
    order: 3,
    placeholder: true,
    links: {
      item: "path-visualizer",
    },
  },
] satisfies ZoneInput[];
