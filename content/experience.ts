import type { ExperiencePhaseInput } from "@/lib/content/schemas";

export const experiencePhases = [
  {
    slug: "internship-isle",
    title: "Internship Isle",
    plainTitle: "SDE Internship",
    status: "draft",
    placeholder: true,
    dateRange: {
      start: "2022-12",
      end: "2023-05",
    },
    summary: "Placeholder career phase for internship backend engineering work.",
    milestones: [
      {
        slug: "distributed-locking-placeholder",
        title: "Distributed Locking Placeholder",
        status: "draft",
        placeholder: true,
        summary: "Placeholder Professional Milestone for resource contention work.",
        proof: "Placeholder proof statement. Replace with public-safe details later.",
      },
    ],
  },
  {
    slug: "first-production-systems",
    title: "First Production Systems",
    plainTitle: "SDE 1 Backend Work",
    status: "draft",
    placeholder: true,
    dateRange: {
      start: "2023-06",
      end: "2024-09",
    },
    summary: "Placeholder career phase for production backend systems and reliability work.",
    milestones: [
      {
        slug: "event-driven-rearchitecture-placeholder",
        title: "Event-Driven Re-architecture Placeholder",
        status: "draft",
        placeholder: true,
        summary: "Placeholder Professional Milestone for resilient backend architecture work.",
        proof: "Placeholder proof statement. Replace with public-safe details later.",
      },
    ],
  },
] satisfies ExperiencePhaseInput[];
