import type { SkillGroupInput } from "@/lib/content/schemas";

export const skillGroups = [
  {
    slug: "backend",
    title: "Backend Engineering",
    summary: "Runtime, API, and service-building tools I use for backend work.",
    order: 1,
    placeholder: true,
    skills: [
      {
        slug: "node-js",
        title: "Node.js",
        status: "current",
        summary: "JavaScript runtime commonly used for backend services, CLIs, APIs, and event-driven tooling.",
        references: {
          items: ["ai-code-analysis-tool", "expense-tracker-api", "realtime-chat-service"],
          quests: ["ai-code-analysis-tool"],
        },
      },
      {
        slug: "nestjs",
        title: "NestJS",
        status: "completed",
        summary: "Opinionated Node.js framework for structured backend APIs, dependency injection, and service modules.",
        references: {
          items: ["expense-tracker-api"],
          experiences: ["zenstatement", "shopup-intern"],
        },
      },
      {
        slug: "postgresql",
        title: "PostgreSQL",
        status: "completed",
        summary: "Relational database used for transactional systems, indexing, constraints, and query-heavy product workflows.",
        references: {
          items: ["expense-tracker-api", "system-design-notebook"],
          experiences: ["zenstatement", "shopup", "shopup-intern"],
        },
      },
    ],
  },
  {
    slug: "systems",
    title: "Systems Thinking",
    summary: "Tools and patterns for async work, reliability, and production behavior.",
    order: 2,
    placeholder: true,
    skills: [
      {
        slug: "kafka",
        title: "Kafka",
        status: "completed",
        summary: "Distributed event streaming platform used for queues, async workflows, and reliable service communication.",
        references: {
          items: ["realtime-chat-service", "system-design-notebook"],
          experiences: ["zenstatement"],
        },
      },
      {
        slug: "redis",
        title: "Redis",
        status: "completed",
        summary: "In-memory data store often used for caching, locks, queues, rate limits, and fast shared state.",
        references: {
          items: ["realtime-chat-service"],
          experiences: ["shopup-intern"],
        },
      },
    ],
  },
  {
    slug: "ai",
    title: "AI Tooling",
    summary: "Current exploration around source-grounded AI developer tools.",
    order: 3,
    placeholder: true,
    skills: [
      {
        slug: "ai-tooling",
        title: "AI Tooling",
        status: "current",
        summary: "Developer tooling that combines repository context, static analysis, and LLM assistance without hiding engineering judgment.",
        references: {
          items: ["ai-code-analysis-tool"],
          quests: ["ai-code-analysis-tool"],
          fieldNotes: ["ai-tooling-notes"],
        },
      },
      {
        slug: "python",
        title: "Python",
        status: "available",
        summary: "General-purpose language useful for scripting, automation, data processing, and AI-adjacent experiments.",
        references: {
          fieldNotes: ["ai-tooling-notes"],
        },
      },
    ],
  },
  {
    slug: "frontend",
    title: "Frontend Breadth",
    summary: "Frontend tools used for older projects and portfolio-facing product surfaces.",
    order: 4,
    placeholder: true,
    skills: [
      {
        slug: "react",
        title: "React",
        status: "completed",
        summary: "UI library for building interactive product surfaces, component systems, and stateful browser experiences.",
        references: {
          items: ["path-visualizer", "sorting-visualizer", "kanban-board", "reading-space", "chess-opening-trainer"],
        },
      },
      {
        slug: "typescript",
        title: "TypeScript",
        status: "current",
        summary: "Typed JavaScript used to make frontend and Node.js code safer, clearer, and easier to refactor.",
        references: {
          items: ["ai-code-analysis-tool", "path-visualizer", "chess-opening-trainer"],
        },
      },
    ],
  },
  {
    slug: "algorithms",
    title: "Algorithms",
    summary: "Problem-solving and visual explanation work from algorithm-heavy projects.",
    order: 5,
    placeholder: true,
    skills: [
      {
        slug: "algorithms",
        title: "Algorithms",
        status: "available",
        summary: "Core problem-solving patterns for graphs, sorting, traversal, and reasoning about performance.",
        references: {
          items: ["path-visualizer", "sorting-visualizer"],
          zones: ["project-archive"],
        },
      },
    ],
  },
  {
    slug: "writing-product",
    title: "Writing And Product Thinking",
    summary: "Technical explanation, product judgment, and clear engineering communication.",
    order: 6,
    placeholder: true,
    skills: [
      {
        slug: "technical-writing",
        title: "Technical Writing",
        status: "learning",
        summary: "Turning implementation details, tradeoffs, and lessons into notes that other engineers can understand.",
        references: {
          fieldNotes: ["first-map-notes", "backend-reliability-notes", "system-design-notes"],
          items: ["reading-space", "system-design-notebook"],
        },
      },
    ],
  },
] satisfies SkillGroupInput[];
