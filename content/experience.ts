import type { ExperiencePhaseInput } from "@/lib/content/schemas";

export const experiencePhases = [
  {
    slug: "zenstatement",
    company: "ZenStatement",
    position: "Software Development Engineer",
    status: "published",
    placeholder: false,
    dateRange: {
      start: "2024-09",
      end: "2026-04",
    },
    summary:
      "Backend ownership across identity, billing, financial reporting, and AI-assisted reconciliation systems for a multi-tenant finance platform.",
    fieldNotes: [
      "Designed and built a custom IAM service with multi-tenant isolation and fine-grained access control across 50+ sub-tenants and 150+ users.",
      "Built a high-throughput billing engine using asynchronous batch aggregation, eliminating database lock contention and reducing job execution time by 40%.",
      "Optimized billing calculations for files averaging 500k+ records, reducing P95 latency from 5s to under 1s through New Relic-guided indexing and query restructuring.",
      "Developed high-precision invoicing, credit, and multi-currency reporting engines with a client-configurable rule engine across 3 currencies.",
      "Built an AI-powered reconciliation prototype with Google ADK, FastAPI, and Celery, cutting prototype cycles from 2 weeks to 3 days.",
    ],
    keyTech: ["Go", "PostgreSQL", "Google ADK", "FastAPI", "Celery", "Redis", "AWS", "Python"],
  },
  {
    slug: "shopup",
    company: "ShopUp",
    position: "Software Development Engineer",
    status: "published",
    placeholder: false,
    dateRange: {
      start: "2023-06",
      end: "2024-09",
    },
    summary:
      "Production backend ownership across credit systems, loan workflows, event-driven requisition processing, and reliability-sensitive financial operations.",
    fieldNotes: [
      "Designed a resilient event-driven requisition system using Kafka and the Transactional Outbox Pattern, guaranteeing at-least-once delivery across 100+ concurrent requests.",
      "Built cross-service reconciliation, retries, and compensating transactions to detect state divergence and maintain 100% data integrity across distributed services.",
      "Designed the core distribution algorithm for GBMS and built Loan Restructuring and Term Loan modules for complex financial state transitions across 1,000+ merchants.",
      "Reduced p99 latency by 10% on high-traffic tables through New Relic telemetry, strategic indexing, and query refactoring.",
      "Raised quality standards with 98%+ unit coverage, E2E suites, 100+ code reviews, technical design docs, and mentoring for new engineers.",
    ],
    keyTech: ["NestJS", "PostgreSQL", "Node.js", "Redis", "Kafka", "GCP", "New Relic"],
  },
  {
    slug: "shopup-intern",
    company: "ShopUp Intern",
    position: "Software Development Engineer Intern",
    status: "published",
    placeholder: false,
    dateRange: {
      start: "2022-12",
      end: "2023-05",
    },
    summary:
      "Internship work across distributed locking, asynchronous KYC document processing, and core Loan Management System modules.",
    fieldNotes: [
      "Implemented Redis Redlock across distributed APIs, eliminating critical race conditions and preventing duplicate writes during peak traffic surges.",
      "Built a KYC document processing pipeline with Google Cloud Storage and Cloud Functions, using webhook-based asynchronous callbacks to achieve 100% delivery.",
      "Developed core LMS modules and refactored complex adjustment flows, reducing production bugs by 20% for new product configurations.",
    ],
    keyTech: ["NestJS", "PostgreSQL", "Node.js", "Express.js", "Redis", "GCP"],
  },
  {
    slug: "thiagarajar-college-of-engineering",
    company: "Thiagarajar College of Engineering",
    position: "Bachelor of Engineering, Computer Science",
    status: "draft",
    placeholder: true,
    dateRange: {
      start: "2019-08",
      end: "2023-05",
    },
    summary:
      "Computer Science foundation with a 9.36 CGPA, strong frontend project work, DSA practice, and early full-stack and AI exploration.",
    fieldNotes: [
      "Spent most of college building frontend-heavy projects, which shaped early instincts around UI, product flow, and practical web development.",
      "Practiced data structures and algorithms seriously, implemented projects around those topics, and wrote learning blogs to explain the concepts back to others.",
      "Started learning full-stack development through the MERN stack while strengthening computer science fundamentals across operating systems, DBMS, and networks.",
      "Explored AI on the side as a parallel curiosity while building a broader engineering foundation.",
    ],
    keyTech: [
      "Problem Solving",
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "MERN Stack",
      "AI Fundamentals",
    ],
  },
] satisfies ExperiencePhaseInput[];
