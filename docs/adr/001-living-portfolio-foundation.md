# Living portfolio foundation

## Status

Accepted

## Context

`living-portfolio` needs to be memorable and exploratory without becoming a full game or hiding important career information. It also needs to avoid the previous maintenance pain of manually entering content into Firestore, while keeping SEO, direct navigation, and future extensibility intact.

## Decision

We will build `living-portfolio` as a content-driven, static-first Next.js portfolio.

The initial public release will use a focused single-page app shell as the primary
visitor experience. It will present Sethuram's introduction, experience, skills,
selected work, writing, current focus, and contact paths in a clear scrollable
sequence. The existing World Map and related multi-page surfaces remain a preserved
exploration path while the single-page experience is refined and released.

Core content will live in the repo. Narrative content such as Field Notes and detailed Item write-ups will use MDX, while structured content such as zones, skills, status, navigation, and Quest metadata will use typed data files with strong validation.

The first version will use progressive interactivity: content-first pages with tasteful React product surfaces, meaningful Motion animations, and simple CSS transitions for small hover/focus states. Styling will use Tailwind CSS with custom local components. Functional UI icons can come from a standard React icon library, while themed markers, badges, zone symbols, and brand-like assets can be custom.

Core pages should be generated static-first for simplicity, speed, reliability, and SEO, while avoiding choices that block future Next.js server capabilities such as CMS revalidation, contact forms, API routes, or dynamic activity. Deployment should remain portable, with Vercel as the likely first host. Core screenshots, icons, and share images should live in the repo unless asset size or delivery needs justify cloud storage later.

The broader product direction remains a multi-page, game-inspired portfolio world. A
future version may grow the preserved World Map into connected zones for experience,
inventory, skills, active quests, writing, and other career phases. That version may
introduce richer spatial navigation, progression-like interactions, and more
distinctive thematic surfaces, but the theme must continue to use plain-language
pairing and preserve a recruiter path. The future world is an extension of the same
content model, not a replacement that requires rewriting the current app shell.

The package manager will be pnpm.

## Consequences

This keeps the initial release simple, versioned, SEO-ready, and agent-friendly. It avoids requiring a backend, database, CMS, analytics provider, or full browser automation suite for the first public version.

The single-page release gives the portfolio a stable public foundation while keeping
the larger creative ambition alive. Future multi-page work can be developed as a
separate evolution of the World Map and content model, allowing experiments with
game-like navigation without destabilising the release surface.

This also means content updates require commits for now, and richer dashboard editing is intentionally deferred until a headless CMS is worth the added complexity.

The v1 quality bar is lightweight but real: typecheck, lint, build, content validation, focused content/schema tests where useful, and manual browser QA. Playwright and analytics are deferred until the site has stable flows and a public version where those tools add enough value.
