# Living portfolio foundation

## Status

Accepted

## Context

`living-portfolio` needs to be memorable and exploratory without becoming a full game or hiding important career information. It also needs to avoid the previous maintenance pain of manually entering content into Firestore, while keeping SEO, direct navigation, and future extensibility intact.

## Decision

We will build `living-portfolio` as a content-driven, static-first Next.js portfolio.

Core content will live in the repo. Narrative content such as Field Notes and detailed Item write-ups will use MDX, while structured content such as zones, skills, status, navigation, and Quest metadata will use typed data files with strong validation.

The first version will use progressive interactivity: content-first pages with tasteful React product surfaces, meaningful Motion animations, and simple CSS transitions for small hover/focus states. Styling will use Tailwind CSS with custom local components. Functional UI icons can come from a standard React icon library, while themed markers, badges, zone symbols, and brand-like assets can be custom.

Core pages should be generated static-first for simplicity, speed, reliability, and SEO, while avoiding choices that block future Next.js server capabilities such as CMS revalidation, contact forms, API routes, or dynamic activity. Deployment should remain portable, with Vercel as the likely first host. Core screenshots, icons, and share images should live in the repo unless asset size or delivery needs justify cloud storage later.

The package manager will be pnpm.

## Consequences

This keeps v1 simple, versioned, SEO-ready, and agent-friendly. It avoids requiring a backend, database, CMS, analytics provider, or full browser automation suite for the first public version.

This also means content updates require commits for now, and richer dashboard editing is intentionally deferred until a headless CMS is worth the added complexity.

The v1 quality bar is lightweight but real: typecheck, lint, build, content validation, focused content/schema tests where useful, and manual browser QA. Playwright and analytics are deferred until the site has stable flows and a public version where those tools add enough value.
