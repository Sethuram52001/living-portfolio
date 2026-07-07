import type { SkillGroupInput } from "@/lib/content/schemas";

export const skillGroups = [
  {
    slug: "backend",
    title: "Backend",
    summary: "Languages, runtimes, and frameworks I use to build backend services and APIs.",
    order: 1,
    placeholder: false,
    skills: [
      {
        slug: "go",
        title: "Go",
        status: "current",
        summary: "Compiled language used for reliable backend services, APIs, and systems-oriented tooling.",
        references: {
          experiences: ["zenstatement"],
        },
      },
      {
        slug: "javascript",
        title: "JavaScript",
        status: "completed",
        summary: "Core web language used across frontend work, Node.js services, and scripting.",
        references: {
          items: ["path-visualizer", "sorting-visualizer"],
        },
      },
      {
        slug: "typescript",
        title: "TypeScript",
        status: "current",
        summary: "Typed JavaScript used to make frontend and backend code safer, clearer, and easier to refactor.",
        references: {
          items: ["ai-code-analysis-tool", "path-visualizer"],
        },
      },
      {
        slug: "node-js",
        title: "Node.js",
        status: "current",
        summary: "JavaScript runtime commonly used for backend services, CLIs, APIs, and event-driven tooling.",
        references: {
          items: ["ai-code-analysis-tool"],
          quests: ["ai-code-analysis-tool"],
        },
      },
      {
        slug: "express-js",
        title: "Express.js",
        status: "completed",
        summary: "Minimal Node.js framework for building HTTP APIs and service endpoints.",
        references: {
          experiences: ["shopup-intern"],
        },
      },
      {
        slug: "nestjs",
        title: "NestJS",
        status: "completed",
        summary: "Opinionated Node.js framework for structured backend APIs, dependency injection, and service modules.",
        references: {
          experiences: ["zenstatement", "shopup", "shopup-intern"],
        },
      },
      {
        slug: "java",
        title: "Java",
        status: "available",
        summary: "Object-oriented language used for computer science fundamentals, backend concepts, and DSA practice.",
        references: {
          experiences: ["thiagarajar-college-of-engineering"],
        },
      },
      {
        slug: "python",
        title: "Python",
        status: "available",
        summary: "General-purpose language useful for scripting, automation, FastAPI services, and AI-adjacent experiments.",
        references: {
          experiences: ["zenstatement"],
          fieldNotes: ["ai-tooling-notes"],
        },
      },
      {
        slug: "sql",
        title: "SQL",
        status: "completed",
        summary: "Query language for relational data modeling, reporting, optimization, and transactional workflows.",
        references: {
          experiences: ["zenstatement", "shopup", "shopup-intern"],
        },
      },
    ],
  },
  {
    slug: "frontend",
    title: "Frontend",
    summary: "Frontend foundations and frameworks from college projects, portfolio work, and product surfaces.",
    order: 2,
    placeholder: false,
    skills: [
      {
        slug: "html",
        title: "HTML",
        status: "completed",
        summary: "Markup foundation for accessible, semantic web interfaces.",
        references: {
          experiences: ["thiagarajar-college-of-engineering"],
        },
      },
      {
        slug: "css",
        title: "CSS",
        status: "completed",
        summary: "Styling language for layout, responsive design, animation, and polished browser interfaces.",
        references: {
          experiences: ["thiagarajar-college-of-engineering"],
        },
      },
      {
        slug: "react",
        title: "React.js",
        status: "completed",
        summary: "UI library for building interactive product surfaces, component systems, and stateful browser experiences.",
        references: {
          items: ["path-visualizer", "sorting-visualizer"],
        },
      },
      {
        slug: "next-js",
        title: "Next.js",
        status: "current",
        summary: "React framework used for static-first, SEO-friendly, production-ready web experiences.",
        references: {
          items: ["system-design-notebook"],
        },
      },
    ],
  },
  {
    slug: "database",
    title: "Database",
    summary: "Storage and object-store tools used across transactional, cached, and document-processing workflows.",
    order: 3,
    placeholder: false,
    skills: [
      {
        slug: "postgresql",
        title: "PostgreSQL",
        status: "completed",
        summary: "Relational database used for transactional systems, indexing, constraints, and query-heavy product workflows.",
        references: {
          items: ["system-design-notebook"],
          experiences: ["zenstatement", "shopup", "shopup-intern"],
        },
      },
      {
        slug: "redis",
        title: "Redis",
        status: "completed",
        summary: "In-memory data store often used for caching, locks, queues, pub/sub, rate limits, and fast shared state.",
        references: {
          experiences: ["shopup", "shopup-intern"],
        },
      },
      {
        slug: "s3",
        title: "S3",
        status: "available",
        summary: "AWS object storage used for durable file, document, and asset storage.",
        references: {
          experiences: ["zenstatement"],
        },
      },
      {
        slug: "gcs",
        title: "GCS",
        status: "completed",
        summary: "Google Cloud object storage used for document processing and KYC verification pipelines.",
        references: {
          experiences: ["shopup-intern"],
        },
      },
    ],
  },
  {
    slug: "messaging-async-infra",
    title: "Messaging And Async Infra",
    summary: "Messaging and asynchronous integration patterns for decoupled backend workflows.",
    order: 4,
    placeholder: false,
    skills: [
      {
        slug: "kafka",
        title: "Kafka",
        status: "completed",
        summary: "Distributed event streaming platform used for async workflows and reliable service communication.",
        references: {
          items: ["system-design-notebook"],
          experiences: ["shopup"],
        },
      },
      {
        slug: "redis-pub-sub",
        title: "Redis Pub/Sub",
        status: "available",
        summary: "Redis messaging pattern for lightweight publish-subscribe communication between services or workers.",
        references: {},
      },
      {
        slug: "webhooks",
        title: "Webhooks",
        status: "completed",
        summary: "HTTP callback pattern used for asynchronous third-party or cross-service event delivery.",
        references: {
          experiences: ["shopup-intern"],
        },
      },
      {
        slug: "async-processing",
        title: "Async Processing",
        status: "completed",
        summary: "Background and event-driven processing used to decouple slow work from user-facing request paths.",
        references: {
          experiences: ["zenstatement", "shopup", "shopup-intern"],
        },
      },
    ],
  },
  {
    slug: "cloud-infra",
    title: "Cloud And Infra",
    summary: "Cloud platforms, deployment primitives, and engineering workflow tools.",
    order: 5,
    placeholder: false,
    skills: [
      {
        slug: "aws",
        title: "AWS",
        status: "available",
        summary: "Cloud platform used for backend infrastructure, storage, and production service building blocks.",
        references: {
          experiences: ["zenstatement"],
        },
      },
      {
        slug: "gcp",
        title: "GCP",
        status: "completed",
        summary: "Google Cloud platform used for storage, functions, and production backend integrations.",
        references: {
          experiences: ["shopup", "shopup-intern"],
        },
      },
      {
        slug: "cloud-functions",
        title: "Cloud Functions",
        status: "completed",
        summary: "Serverless functions used for event-driven document processing and asynchronous callbacks.",
        references: {
          experiences: ["shopup-intern"],
        },
      },
      {
        slug: "docker",
        title: "Docker",
        status: "available",
        summary: "Container tooling for packaging services and making local and deployment environments more consistent.",
        references: {
          items: ["ai-code-analysis-tool"],
        },
      },
      {
        slug: "git",
        title: "Git",
        status: "completed",
        summary: "Version control tool used for collaboration, code review, and maintaining project history.",
        references: {
          experiences: ["zenstatement", "shopup"],
        },
      },
    ],
  },
  {
    slug: "system-design",
    title: "System Design",
    summary: "Distributed-system design patterns and reliability concepts used in production backend work.",
    order: 6,
    placeholder: false,
    skills: [
      {
        slug: "event-driven-architecture",
        title: "Event-Driven Architecture",
        status: "completed",
        summary: "Service design approach where systems communicate through events to improve decoupling and resilience.",
        references: {
          experiences: ["shopup"],
        },
      },
      {
        slug: "transactional-outbox",
        title: "Transactional Outbox",
        status: "completed",
        summary: "Pattern for reliably publishing events after database writes without losing state changes.",
        references: {
          experiences: ["shopup"],
        },
      },
      {
        slug: "distributed-locking",
        title: "Distributed Locking",
        status: "completed",
        summary: "Coordination pattern used to prevent duplicate work and race conditions across distributed services.",
        references: {
          experiences: ["shopup-intern"],
        },
      },
      {
        slug: "eventual-consistency",
        title: "Eventual Consistency",
        status: "completed",
        summary: "Distributed-system model where services converge to a correct state through events, retries, and reconciliation.",
        references: {
          experiences: ["shopup"],
        },
      },
      {
        slug: "reconciliation-systems",
        title: "Reconciliation Systems",
        status: "completed",
        summary: "Systems that detect and repair state divergence across services or financial workflows.",
        references: {
          experiences: ["zenstatement", "shopup"],
        },
      },
      {
        slug: "retry-compensation-flows",
        title: "Retry And Compensation Flows",
        status: "completed",
        summary: "Reliability patterns for recovering failed distributed workflows while preserving business correctness.",
        references: {
          experiences: ["shopup"],
        },
      },
    ],
  },
  {
    slug: "ai-tooling",
    title: "AI Tooling",
    summary: "AI-assisted developer tools and local/agentic workflows I am exploring or using.",
    order: 7,
    placeholder: false,
    skills: [
      {
        slug: "google-adk",
        title: "Google ADK",
        status: "completed",
        summary: "Google agent development kit used for prototyping AI-assisted reconciliation workflows.",
        references: {
          experiences: ["zenstatement"],
        },
      },
      {
        slug: "llms",
        title: "LLMs",
        status: "current",
        summary: "Large language models used for AI-assisted development, analysis, and workflow prototyping.",
        references: {
          items: ["ai-code-analysis-tool"],
          quests: ["ai-code-analysis-tool"],
        },
      },
      {
        slug: "claude",
        title: "Claude",
        status: "current",
        summary: "AI coding and reasoning assistant used for writing, planning, and software exploration.",
        references: {
          items: ["ai-code-analysis-tool"],
        },
      },
      {
        slug: "codex",
        title: "Codex",
        status: "current",
        summary: "AI coding agent used for repository-aware implementation, refactoring, and technical planning.",
        references: {
          items: ["ai-code-analysis-tool"],
        },
      },
      {
        slug: "cursor",
        title: "Cursor",
        status: "available",
        summary: "AI-first editor used for code navigation, assisted edits, and development workflows.",
        references: {
          items: ["ai-code-analysis-tool"],
        },
      },
      {
        slug: "ollama",
        title: "Ollama",
        status: "available",
        summary: "Local model runtime used for experimenting with local LLM workflows.",
        references: {
          items: ["ai-code-analysis-tool"],
        },
      },
    ],
  },
  {
    slug: "computer-fundamentals",
    title: "Computer Fundamentals",
    summary: "Computer science foundations and communication skills built through college, practice, and writing.",
    order: 8,
    placeholder: false,
    skills: [
      {
        slug: "data-structures",
        title: "Data Structures",
        status: "completed",
        summary: "Core structures for organizing data and reasoning about performance in algorithms and systems.",
        references: {
          items: ["path-visualizer", "sorting-visualizer"],
          fieldNotes: ["redis-locking-notes", "pathfinding-algorithms"],
          experiences: ["thiagarajar-college-of-engineering"],
        },
      },
      {
        slug: "algorithms",
        title: "Algorithms",
        status: "completed",
        summary: "Problem-solving techniques for graphs, sorting, traversal, range queries, and performance reasoning.",
        references: {
          items: ["path-visualizer", "sorting-visualizer"],
          experiences: ["thiagarajar-college-of-engineering"],
        },
      },
      {
        slug: "operating-systems",
        title: "Operating Systems",
        status: "completed",
        summary: "Computer science foundation around processes, memory, concurrency, and system-level behavior.",
        references: {
          experiences: ["thiagarajar-college-of-engineering"],
        },
      },
      {
        slug: "dbms",
        title: "DBMS",
        status: "completed",
        summary: "Database fundamentals covering relational models, transactions, indexing, and query behavior.",
        references: {
          experiences: ["thiagarajar-college-of-engineering"],
        },
      },
      {
        slug: "computer-networks",
        title: "Computer Networks",
        status: "completed",
        summary: "Networking fundamentals behind distributed systems, APIs, protocols, and service communication.",
        references: {
          experiences: ["thiagarajar-college-of-engineering"],
        },
      },
      {
        slug: "technical-writing",
        title: "Technical Writing",
        status: "current",
        summary: "Explaining engineering concepts, DSA topics, and implementation tradeoffs through clear writing.",
        references: {
          fieldNotes: ["backend-reliability-notes", "pathfinding-algorithms", "redis-locking-notes"],
          items: ["system-design-notebook"],
        },
      },
    ],
  },
] satisfies SkillGroupInput[];
