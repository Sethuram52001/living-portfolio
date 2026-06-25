import type { ExperiencePhaseInput } from "@/lib/content/schemas";

export const experiencePhases = [
  {
    slug: "zenstatement",
    company: "ZenStatement",
    position: "SDE 1",
    status: "draft",
    placeholder: true,
    dateRange: {
      start: "2023-06",
      end: "2024-09",
    },
    summary:
      "Backend engineering work across distributed systems, financial workflows, reliability improvements, and production support.",
    fieldNotes: [
      "Reworked brittle requisition flows into a more resilient event-driven architecture using Kafka and the Transactional Outbox Pattern.",
      "Improved reliability for bulk requisition paths by decoupling large requests into individual loan events.",
      "Used observability and query tuning to reduce p99 latency on high-traffic database paths.",
    ],
    keyTech: ["NestJS", "PostgreSQL", "Kafka", "Redis", "New Relic"],
  },
  {
    slug: "shopup",
    company: "ShopUp",
    position: "Software Engineer",
    status: "draft",
    placeholder: true,
    dateRange: {
      start: "2023-06",
      end: "2024-09",
    },
    summary:
      "Production backend ownership across credit, loan, restructuring, and reliability-sensitive financial modules.",
    fieldNotes: [
      "Built core modules for Loan Restructuring and Term Loans, handling complex financial state transitions.",
      "Designed reconciliation and compensating transaction flows to keep distributed services consistent.",
      "Reviewed production changes, authored technical design docs, and helped onboard engineers into complex backend systems.",
    ],
    keyTech: ["NestJS", "PostgreSQL", "Kafka", "TypeScript", "Redis"],
  },
  {
    slug: "shopup-intern",
    company: "ShopUp Intern",
    position: "SDE Intern",
    status: "draft",
    placeholder: true,
    dateRange: {
      start: "2022-12",
      end: "2023-05",
    },
    summary:
      "Internship work on distributed locking, asynchronous document processing, and core loan management modules.",
    fieldNotes: [
      "Implemented Redis-based distributed locking to prevent race conditions in high-traffic APIs.",
      "Built an asynchronous document processing flow with Google Cloud Storage, Cloud Functions, and Pub/Sub callbacks.",
      "Refactored adjustment flows in the Loan Management System to reduce technical debt and improve maintainability.",
    ],
    keyTech: ["NestJS", "PostgreSQL", "Redis", "Google Cloud", "Pub/Sub"],
  },
  {
    slug: "thiagarajar-college-of-engineering",
    company: "Thiagarajar College of Engineering",
    position: "B.E. Computer Science",
    status: "draft",
    placeholder: true,
    dateRange: {
      start: "2019-08",
      end: "2023-05",
    },
    summary:
      "Academic foundation in computer science, algorithms, systems thinking, and early project-building practice.",
    fieldNotes: [
      "Built frontend-heavy college projects that shaped early product and UI instincts.",
      "Practiced algorithms, data structures, and problem-solving through academic work and self-led projects.",
      "Developed the first version of the personal portfolio before this living portfolio rebuild.",
    ],
    keyTech: ["Algorithms", "Data Structures", "React", "JavaScript", "Computer Science"],
  },
] satisfies ExperiencePhaseInput[];
