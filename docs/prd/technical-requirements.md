# PRD: Technical Requirements

## Summary

The technical foundation should support a memorable living portfolio while staying simple enough to maintain. The site should begin static-first with repo content, preserve a path to server capabilities later, and keep SEO as a first-class requirement.

## Decisions So Far

- Content starts as repo content, not a database or CMS.
- A headless CMS can be added later if dashboard-based updates become worth the complexity.
- Narrative content should use MDX; structured content should use typed data files.
- Styling should use Tailwind CSS with custom portfolio components.
- Meaningful UI animation should use Motion, with simple CSS transitions for small states.
- Interaction should be progressive: content-first and tasteful in v1, richer map behavior later.
- The application framework is Next.js.
- Core pages should be static-first while preserving a path to future server capabilities.
- v1 should not require a backend or database for core portfolio behavior.
- Deployment should remain portable, with Vercel as the likely first host.
- Core media should live in the repo unless size or delivery needs justify external storage.
- Content should be strongly validated so incomplete or malformed public content fails early.
- Quality checks should be lightweight but real for v1, with Playwright deferred until UI flows need browser automation.
- Use a mixed icon approach: library icons for functional UI, custom assets for themed identity.
- Analytics should be deferred until after the first public version.
- Package management should use pnpm.

## Content Format Requirements

- Field Notes and detailed Item write-ups should be authorable as MDX.
- Field Note rendering starts with a limited Markdown-compatible subset of MDX body content: paragraphs, headings, lists, links, and inline code. Rich MDX components, tables, code fences, and embedded media should be added only when the renderer is upgraded.
- Zones, skills, Status HUD data, navigation, and lightweight Quest metadata should be typed structured content.
- The content model should avoid manual database entry for v1.
- The content model should be easy for agents and humans to update through normal commits.
- Content schemas should enforce required fields for public surfaces.
- Inventory Item content should enforce the agreed Item proof requirements.

## UI System Requirements

- The UI should be built from local custom components that express the living portfolio visual language.
- Tailwind CSS should be used for styling speed and consistency.
- Motion should be the default tool for meaningful component transitions, selected states, panels, toasts, and map-like movement.
- CSS transitions are acceptable for simple hover, focus, and color changes.
- Functional UI icons should use a standard React icon library where practical.
- Themed map markers, badges, zone symbols, and brand-like assets can be custom.
- Generic component libraries should not define the final look.
- Accessible primitives may be introduced later for dialogs, tooltips, menus, or complex controls when useful.

## SEO Requirements

- Each major surface should have a real route.
- Each substantial Item, Field Note, and meaningful Experience page should be linkable when it has enough content.
- Pages should render meaningful HTML content, not only client-side or canvas content.
- Each route should have title, description, canonical URL, and share metadata.
- The site should provide sitemap and robots metadata.
- Content hierarchy should use readable headings, links, and text structure.
- The World Map should enhance discovery, not be the only way crawlers or visitors find content.

## Backend Requirements

- v1 core portfolio behavior should not require a database.
- v1 core portfolio behavior should not require custom API routes.
- Contact can start as links rather than a custom form.
- Future backend needs may include CMS revalidation, contact forms, analytics, newsletter capture, or dynamic activity.

## Deployment Requirements

- Avoid unnecessary hosting-specific behavior in v1.
- Keep the app compatible with straightforward static or Next.js deployment.
- Prefer a workflow that supports preview deployments.
- Vercel is the likely first host, but the architecture should not depend on Vercel-only features for core behavior.

## Media Requirements

- Core screenshots, icons, and share images should be stored in the repo for v1.
- Large videos or unusually heavy assets may use cloud/external storage later.
- Core presentation should not depend on fragile third-party image URLs.

## Quality Requirements

- Typecheck, lint, build, and content validation should be part of the normal verification path.
- Add focused tests around content parsing or schemas where useful.
- Manually QA key routes and mobile layouts during v1 development.
- Defer Playwright until there are stable UI flows worth automating.

## Analytics Requirements

- Do not require analytics for v1.
- Keep the app compatible with adding privacy-friendly analytics later.
- Do not let analytics provider choice shape core architecture.

## Tooling Requirements

- Use pnpm as the package manager.
- Prefer scripts that make verification obvious: typecheck, lint, build, content validation, and tests where present.
