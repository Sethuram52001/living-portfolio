import type { SkillGroupInput } from "@/lib/content/schemas";

export const skillGroups = [
  {
    title: "Backend",
    summary: "Languages and frameworks for building APIs, services, background jobs, and server-side systems.",
    order: 1,
    skills: [
      {
        title: "Go",
        summary: "Compiled language for efficient services and systems programming.",
      },
      {
        title: "JavaScript",
        summary: "Language for web applications, services, and tooling.",
      },
      {
        title: "TypeScript",
        summary: "JavaScript with static types for safer application development.",
      },
      {
        title: "Node.js",
        summary: "JavaScript runtime for servers, CLIs, and automation.",
      },
      {
        title: "Express.js",
        summary: "Minimal framework for HTTP APIs and web services.",
      },
      {
        title: "NestJS",
        summary: "Structured framework for scalable Node.js applications.",
      },
      {
        title: "Python",
        summary: "General-purpose language for automation, data, and AI applications.",
      },
      {
        title: "SQL",
        summary: "Language for querying and managing relational data.",
      },
    ],
  },
  {
    title: "Frontend",
    summary: "Web technologies for building responsive interfaces and supporting end-to-end product development.",
    order: 2,
    skills: [
      {
        title: "HTML",
        summary: "Markup language for semantic, accessible web pages.",
      },
      {
        title: "CSS",
        summary: "Styling language for layout, responsive design, and animation.",
      },
      {
        title: "React.js",
        summary: "Library for building interactive component-based interfaces.",
      },
      {
        title: "Next.js",
        summary: "React framework for fast, SEO-friendly web applications.",
      },
    ],
  },
  {
    title: "Data & Storage",
    summary: "Databases, caches, and object storage for reliable persistence, fast access, and scalable data workflows.",
    order: 3,
    skills: [
      {
        title: "PostgreSQL",
        summary: "Relational database for transactions, indexing, and query optimization.",
      },
      {
        title: "Redis",
        summary: "In-memory store for caching, coordination, and fast shared state.",
      },
      {
        title: "S3",
        summary: "Object storage service for files, assets, and documents.",
      },
      {
        title: "GCS",
        summary: "Cloud object storage for files, assets, and documents.",
      },
    ],
  },
  {
    title: "Messaging & Async Systems",
    summary: "Messaging tools and asynchronous patterns for decoupled workflows, background processing, and resilient communication.",
    order: 4,
    skills: [
      {
        title: "Kafka",
        summary: "Event streaming platform for asynchronous service communication.",
      },
      {
        title: "Redis Pub/Sub",
        summary: "Lightweight publish-subscribe messaging through Redis.",
      },
      {
        title: "Webhooks",
        summary: "HTTP callbacks for event-driven system integration.",
      },
      {
        title: "Async Processing",
        summary: "Background execution for long-running and non-blocking work.",
      },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    summary: "Cloud platforms and infrastructure tooling for deployment, containerization, serverless workloads, and delivery workflows.",
    order: 5,
    skills: [
      {
        title: "AWS",
        summary: "Cloud platform for infrastructure, compute, and storage.",
      },
      {
        title: "GCP",
        summary: "Cloud platform for managed services and serverless workloads.",
      },
      {
        title: "Cloud Functions",
        summary: "Serverless functions triggered by events and HTTP requests.",
      },
      {
        title: "Docker",
        summary: "Containers for consistent development and deployment environments.",
      },
      {
        title: "Git",
        summary: "Version control for collaboration and change history.",
      },
    ],
  },
  {
    title: "System Design Patterns",
    summary: "Patterns for building reliable distributed systems with clear consistency, concurrency, recovery, and scaling strategies.",
    order: 6,
    skills: [
      {
        title: "Event-Driven Architecture",
        summary: "Systems that communicate through events instead of direct coupling.",
      },
      {
        title: "Transactional Outbox",
        summary: "Reliable event publication alongside database transactions.",
      },
      {
        title: "Distributed Locking",
        summary: "Coordination pattern for preventing concurrent duplicate work.",
      },
      {
        title: "Eventual Consistency",
        summary: "Model where distributed services converge on a consistent state.",
      },
      {
        title: "Retry And Compensation Flows",
        summary: "Recovery patterns for failed multi-step distributed workflows.",
      },
    ],
  },
  {
    title: "AI Tooling",
    summary: "Tools and models for AI-assisted development and local experimentation.",
    order: 7,
    skills: [
      {
        title: "Google ADK",
        summary: "Framework for building agentic AI applications.",
      },
      {
        title: "LLMs",
        summary: "Language models for reasoning, generation, and automation.",
      },
      {
        title: "Claude",
        summary: "AI assistant for reasoning, writing, and coding.",
      },
      {
        title: "Codex",
        summary: "Repository-aware coding agent for implementation and planning.",
      },
      {
        title: "Cursor",
        summary: "AI-first editor for code navigation and assisted changes.",
      },
      {
        title: "Ollama",
        summary: "Local runtime for running and testing language models.",
      },
    ],
  },
  {
    title: "Computer Fundamentals",
    summary: "Core computer science concepts and technical communication.",
    order: 8,
    skills: [
      {
        title: "Data Structures",
        summary: "Ways to organize data for efficient operations.",
      },
      {
        title: "Algorithms",
        summary: "Methods for solving problems efficiently and correctly.",
      },
      {
        title: "Operating Systems",
        summary: "Foundations of processes, memory, concurrency, and scheduling.",
      },
      {
        title: "DBMS",
        summary: "Fundamentals of relational models, transactions, and indexing.",
      },
      {
        title: "Computer Networks",
        summary: "Foundations of protocols, APIs, and distributed communication.",
      },
      {
        title: "Technical Writing",
        summary: "Clear writing about engineering concepts and tradeoffs.",
      },
    ],
  },
] satisfies SkillGroupInput[];
