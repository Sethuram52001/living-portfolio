# V1 Milestone Map

This map divides v1 into small, reviewable milestones. Each milestone should be planned separately before implementation. Do not treat this as an implementation plan.

## Milestone 0: Project Foundation

**Goal**: Create the working app foundation without building portfolio features yet.

**Includes**:

- Next.js + TypeScript + pnpm scaffold.
- Tailwind CSS setup.
- Motion dependency setup.
- Basic app shell placeholder.
- Verification scripts for typecheck, lint, build, and content validation placeholders.

**Review focus**:

- Project structure feels clean.
- Tooling matches ADR 001.
- No premature UI/product decisions.

## Milestone 1: Design Source Integration

**Goal**: Establish the visual source of truth before building screens.

**Includes**:

- Add approved Google Stitch `design.md` content into `docs/design/design.md`.
- Connect Figma references and identify approved frames.
- Extract first-pass design tokens: colors, typography, border, radius, shadow, spacing.
- Define the initial custom component vocabulary.

**Review focus**:

- Figma, Stitch, and screenshots are aligned.
- Visual direction is clear enough to implement.
- Open design questions are explicit.

## Milestone 2: Content Model And Seed Content

**Goal**: Define the repo content model before rendering real pages.

**Includes**:

- Schemas for Items, Zones, Skills, Current Quests, Field Notes, Experience, and Status HUD.
- MDX structure for narrative content.
- Typed data structure for structured content.
- Seed placeholder content for every required surface.
- Validation for required fields, especially Item proof.

**Review focus**:

- Content can represent the requirements cleanly.
- Incomplete content fails early where it should.
- No Firestore/database-style manual content workflow.

## Milestone 3: App Shell And Direct Path

**Goal**: Make the site understandable before the map metaphor gets rich.

**Includes**:

- Global layout.
- Navigation.
- SEO metadata baseline.
- Direct path links for Work, Experience, Skills, Quest Log, Writing, Contact, Resume/Social.
- Mobile-first layout behavior.

**Review focus**:

- Recruiter path is obvious.
- Navigation is clear without decoding the theme.
- The site already feels usable, even before advanced visuals.

## Milestone 4: Home And World Map V1

**Goal**: Build the first meaningful version of the Home / World Map.

**Includes**:

- Living portfolio premise.
- Backend-first role signal.
- World Map zones as clickable career/content areas.
- Current Camp or Status HUD preview.
- Plain-language pairing for playful labels.
- Light Motion transitions.

**Review focus**:

- Curious first, confident second.
- Map is playful but recruiter-safe.
- Important content is not hidden behind gameplay.

## Milestone 5: Work / Inventory

**Goal**: Build the project exploration surface.

**Includes**:

- Inventory grid/list.
- Item cards.
- Item detail route or detail panel.
- Required Item proof presentation: motivation, visible artifact, learned/why it mattered.
- Links to source/demo where available.

**Review focus**:

- Projects feel inspectable, not just decorative.
- Older frontend-heavy projects do not overpower backend positioning.
- The Inventory is curated proof, not a dumping ground.

## Milestone 6: Experience / Milestones

**Goal**: Present professional backend experience as part of the living map.

**Includes**:

- Career phase structure.
- Professional Milestone presentation.
- Recruiter-readable experience path.
- Map integration without turning experience into resume paste.

**Review focus**:

- Backend role signal is clear.
- Professional proof is credible and scannable.
- Experience feels integrated with the World Map, not detached.

## Milestone 7: Quest Log And Status HUD

**Goal**: Show current momentum without promising a fixed update cadence.

**Includes**:

- Current Quests.
- Status HUD.
- Dated activity entries.
- Support for building, writing, learning, and experiments.

**Review focus**:

- Site feels alive but not maintenance-heavy.
- Unfinished work is clearly represented as unfinished.
- The AI code analysis tool can fit here before becoming an Inventory Item.

## Milestone 8: Skills / Skill Tree

**Goal**: Present skills as meaningful grouped capabilities.

**Includes**:

- Skill groups.
- Skill Nodes.
- Basic progression/learning/completed states.
- Links from skills to Items, Milestones, Field Notes, or Current Quests where available.

**Review focus**:

- Skills support the story instead of becoming a generic checklist.
- Backend-first identity remains clear.
- Skill Tree is readable without gameplay knowledge.

## Milestone 9: Writing / Field Notes

**Goal**: Add the writing and thinking surface.

**Includes**:

- Field Notes index.
- Field Note detail pages.
- MDX rendering.
- SEO metadata for writing pages.

**Review focus**:

- Writing supports active momentum.
- Sparse content still feels honest.
- Pages are readable and shareable.

## Milestone 10: Contact, Social, Resume, And SEO Polish

**Goal**: Make the practical end of the portfolio complete.

**Includes**:

- Contact/social surface.
- Resume link.
- Open Graph metadata.
- Sitemap and robots metadata.
- Route-level titles and descriptions.
- Basic accessibility pass.

**Review focus**:

- Recruiters can complete their task quickly.
- Pages are shareable and indexable.
- Practical information is never buried.

## Milestone 11: Visual QA And V1 Readiness

**Goal**: Tighten the full experience before public launch.

**Includes**:

- Compare implemented pages against Figma/Stitch/screenshots.
- Mobile and desktop QA.
- Text overflow/overlap checks.
- Animation restraint pass.
- Build/lint/typecheck/content validation.
- Final content completeness review.

**Review focus**:

- The site feels memorable and credible.
- The requirements PRD is satisfied.
- V1 is ready to share without needing every future idea.

## Deferred Until After V1

- Headless CMS.
- Backend/database.
- Contact form.
- Analytics.
- Playwright automation.
- Rich map pan/zoom or game-like movement.
- Large external media pipeline.
- Advanced personalization or dynamic activity.

