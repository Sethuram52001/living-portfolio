# Design Brief

This file is the design source of truth for `living-portfolio`. Update it when a visual direction, screen behavior, or design constraint becomes settled.

## References

| Source | Link / File | Purpose | Status |
| --- | --- | --- | --- |
| Figma | https://www.figma.com/design/Sj5iHXrzCvcdjrmkRy2rQU/Portfolio?node-id=0-1&t=WyDHyU5RXgCH4J4A-1 | Layout, spacing, component hierarchy, responsive structure | Approved starting reference |
| Google Stitch `design.md` | This file | Design-system brief, tokens, style language | Integrated |
| Desktop screenshot | `docs/design/screens/home-world-map-desktop.png` | Visual QA for desktop Home / World Map direction | Approved reference |
| Mobile screenshot | `docs/design/screens/home-world-map-mobile.png` | Visual QA for mobile Home / World Map direction | Approved reference |
| Desktop screenshot | `docs/design/screens/projects-inventory-desktop.png` | Visual QA for desktop Work / Inventory direction | Approved reference |
| Mobile screenshot | `docs/design/screens/projects-inventory-mobile.png` | Visual QA for mobile Work / Inventory direction | Approved reference |
| Desktop screenshot | `docs/design/screens/experience-timeline-desktop.png.png` | Visual QA for desktop Experience / Timeline direction | Approved reference |
| Mobile screenshot | `docs/design/screens/experience-timeline-mobile.png.png` | Visual QA for mobile Experience / Timeline direction | Approved reference |
| Desktop screenshot | `docs/design/screens/active-quests-desktop.png` | Visual QA for desktop Active Quests direction | Approved reference, light page surface overrides dark export background |
| Mobile screenshot | `docs/design/screens/active-quests-mobile.png` | Visual QA for mobile Active Quests direction | Approved reference, light page surface overrides dark export background |
| Desktop screenshot | `docs/design/screens/skills-tree-desktop.png` | Visual QA for desktop Skills / Mastery Tree direction | Approved reference |
| Mobile screenshot | `docs/design/screens/skills-tree-mobile.png` | Visual QA for mobile Skills / Mastery Tree direction | Approved reference |
| Desktop screenshot | `docs/design/screens/writing-harbour-desktop.png` | Future Writing Harbour direction | Future reference |
| Mobile screenshot | `docs/design/screens/writing-harbour-mobile.png` | Future Writing Harbour direction | Future reference |
| Desktop screenshot | `docs/design/screens/contact-guild-desktop.png` | Future Contact / Social Guild direction | Future reference |
| Mobile screenshot | `docs/design/screens/contact-guild-mobile.png` | Future Contact / Social Guild direction | Future reference |

## Design Source Rules

- Use Figma MCP to inspect Figma frames when a Figma source is provided.
- Use Google Stitch notes in this file as the style-language and token reference.
- Use screenshots/images as visual QA references.
- If Figma and Stitch conflict, Figma controls layout and Stitch controls style language unless the user says otherwise.
- Record any approved deviation here before implementation continues.
- Do not copy generated Stitch code directly into production components.
- Current approved deviation: Active Quests keeps the portfolio's light/grid surface; the dark background in the exported reference is not authoritative.
- Current approved deviation: Design references are inspiration, not one-to-one copy; avoid game-specific labels such as levels, XP, decorative nav initials, or side filter panels when they reduce recruiter clarity.
- Current approved deviation: Prefer straight, horizontally aligned cards over rotated cards unless the rotation serves a specific interaction or layout purpose.
- Current approved deviation: Work uses proof-oriented cards for every item, grouped by current work and completed projects; avoid decorative inventory slots or a separate featured-work sidebar unless it has a clear purpose.
- Current approved deviation: Active Quests uses separate Building, Writing, and Learning lanes with a compact summary stat band instead of one mixed status panel.
- Current approved deviation: Writing uses Medium-style article preview cards with image areas, summaries, and clear read actions; external article links can be added later while internal Field Note routes remain the fallback.
- Current approved deviation: Contact follows the Social Guild reference structure but uses professional copy, practical contact exits, and a profile-image placeholder until a real photo is provided.
- Current approved deviation: Experience follows the updated timeline reference: centered heading, grid-map background, left vertical rail with markers, and large horizontal role cards. Cards should use company, position, summary, Field Notes, and Key Tech rather than separate proof/milestone panels. Do not add a sidebar for this screen unless the design source changes again.
- Current approved deviation: Work, Experience, and Active Quests should favor a shared portfolio-console rhythm: strong page hero, compact stats, one primary focus card, and smaller proof/activity cards. Avoid oversized decorative panels when they do not add meaning.

## Recruiter-Safe Adaptation

The design language may use chunky map, HUD, hard-shadow, and tactile game-board cues, but the portfolio must remain recruiter-safe.

- Keep direct navigation and role clarity professional.
- Pair playful labels with plain-language meaning.
- Avoid copy or interactions that make the site feel like a full game.
- Do not hide important career information behind theme-only interactions.
- Preserve the emotional arc: curious first, confident second.

## Visual Direction

- **Overall feel**: playful, high-contrast, tactile, map-inspired, and memorable.
- **Things to preserve**: chunky rounded surfaces, thick dark borders, hard shadows, grid-map background, zone colors, tactile press states, clear labels.
- **Things to avoid**: full-game mechanics, hidden navigation, excessive novelty, vague theme-only copy, soft blurry elevation, unreadable decorative typography.

## Tokens

### Color Tokens

| Token | Value | Use |
| --- | --- | --- |
| `surface` | `#f9f9ff` | Default page surface |
| `surface-dim` | `#cfdaf2` | Dimmed map or disabled areas |
| `surface-bright` | `#f9f9ff` | Bright surface |
| `surface-container-lowest` | `#ffffff` | Highest contrast container |
| `surface-container-low` | `#f0f3ff` | Low container surface |
| `surface-container` | `#e7eeff` | Standard container surface |
| `surface-container-high` | `#dee8ff` | Raised container surface |
| `surface-container-highest` | `#d8e3fb` | Highest raised container surface |
| `on-surface` | `#111c2d` | Primary text |
| `on-surface-variant` | `#3c4a42` | Secondary text |
| `inverse-surface` | `#263143` | Dark panels |
| `inverse-on-surface` | `#ecf1ff` | Text on dark panels |
| `outline` | `#6c7a71` | Muted outlines |
| `outline-variant` | `#bbcabf` | Disabled/dashed outlines |
| `ink` | `#1e293b` | Heavy border and hard shadow color |
| `primary` | `#006c49` | Deep emerald actions and navigation |
| `primary-container` | `#10b981` | Unlocked/complete zone color |
| `secondary` | `#855300` | Deep amber text/accent |
| `secondary-container` | `#fea619` | In-progress/rare/loot color |
| `tertiary` | `#006591` | Deep sky accent |
| `tertiary-container` | `#23acf1` | Active quest or fluid accent |
| `error` | `#ba1a1a` | Error state |
| `background` | `#f9f9ff` | App background |
| `surface-variant` | `#d8e3fb` | Grid/map surface variant |

### Typography Tokens

| Token | Family | Size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- | --- |
| `display-hero` | Rubik | `48px` | `900` | `1.1` | `-0.02em` |
| `headline-lg` | Rubik | `32px` | `800` | `1.2` | `0` |
| `headline-lg-mobile` | Rubik | `24px` | `800` | `1.2` | `0` |
| `body-md` | Rubik | `16px` | `400` | `1.5` | `0` |
| `label-caps` | Space Grotesk | `12px` | `700` | `1` | `0.1em` |
| `quest-description` | Rubik | `14px` | `500` | `1.4` | `0` |

Rubik is the preferred primary typeface. Space Grotesk is preferred for technical/system labels. Font loading strategy is intentionally deferred.

### Shape, Border, Shadow, And Spacing Tokens

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | `0.25rem` | Small controls |
| `radius-default` | `0.5rem` | Standard chunky-rounded containers |
| `radius-md` | `0.75rem` | Larger cards |
| `radius-lg` | `1rem` | Large panels |
| `radius-xl` | `1.5rem` | Feature surfaces |
| `radius-full` | `9999px` | Pills/circles |
| `space-unit` | `4px` | Base spacing unit |
| `gutter` | `16px` | Grid gutter |
| `margin-mobile` | `20px` | Mobile page margin |
| `margin-desktop` | `40px` | Desktop page margin |
| `card-padding` | `24px` | Standard card padding |
| `border-heavy` | `3px` | Interactive element border |
| `shadow-level-2` | `4px 4px 0 var(--lp-color-ink)` | Active map elements |
| `shadow-level-3` | `8px 8px 0 var(--lp-color-ink)` | Buttons, chips, quest cards |
| `shadow-level-4` | `12px 12px 0 var(--lp-color-ink)` | Modals and large overlays |

## Layout And Spacing

- The World Map uses a grid-map surface and can imply isometric placement.
- Floating zones should maintain breathing room; Stitch recommends at least `64px` of "sea room" between landmasses.
- Desktop overlays can use a grid/sidebar structure.
- Mobile surfaces can use stacked layout and bottom-sheet patterns.
- Overlays and modals should use at least `24px` internal padding.

## Elevation And Interaction

- Prefer hard-shadow elevation over soft blur.
- Level 1: map ground and locked zones; no shadow, flat or recessed.
- Level 2: active/unlocked map elements; `4px` hard shadow.
- Level 3: buttons, chips, quest cards; `8px` hard shadow.
- Level 4: modals/overlays; `12px` hard shadow with backdrop if needed.
- Pressed controls may visually "sink" by reducing/removing the shadow and translating toward the shadow offset.
- Motion should clarify state changes; animation should not become decorative noise.

## Screen Requirements

### Home / World Map

- **Purpose**: introduce the living portfolio and provide the first exploratory map surface.
- **Required content**: living portfolio premise, backend-first role signal, direct navigation, map zones, current status/quest preview.
- **Interaction notes**: zones should be clickable; interactions must not hide practical information.
- **Responsive notes**: desktop may use side quest log/navigation; mobile uses bottom navigation and vertical map flow.

### Work / Inventory

- **Purpose**: show substantial projects as inspectable Items.
- **Required content**: Item proof: problem/motivation, visible artifact, and what was learned/why it mattered.
- **Interaction notes**: cards can open detail routes or panels.
- **Responsive notes**: mobile card grid/list must remain scannable.

### Experience / Milestones

- **Purpose**: present professional backend experience through Career phases and Professional Milestones.
- **Required content**: backend impact, reliability/product proof, internship/full-time phases.
- **Interaction notes**: milestone details should be accessible without map decoding.
- **Responsive notes**: recruiter-readable path must stay obvious.

### Skills / Skill Tree

- **Purpose**: show grouped capabilities as meaningful Skill Nodes.
- **Required content**: backend, systems, AI, frontend breadth, writing/product thinking where relevant.
- **Interaction notes**: node states may show learning/current/completed.
- **Responsive notes**: avoid dense unreadable graphs on mobile.

### Quest Log

- **Purpose**: show current momentum without fixed update cadence.
- **Required content**: Current Quests, Field Notes, learning/building/writing activity.
- **Interaction notes**: can use card or bottom-sheet patterns.
- **Responsive notes**: Stitch suggests full-screen bottom sheet on mobile when needed.

### Writing / Field Notes

- **Purpose**: host writing, learning, reflections, and dev logs.
- **Required content**: index and readable detail pages.
- **Interaction notes**: prioritize readability and shareability over theme.
- **Responsive notes**: standard article flow should stay comfortable on mobile.

### Contact / Social

- **Purpose**: provide practical recruiter and collaborator exits.
- **Required content**: resume, email/contact, GitHub, LinkedIn, social profiles.
- **Interaction notes**: no hidden or puzzle-like contact flow.
- **Responsive notes**: must be reachable quickly from mobile and desktop.

## Component Vocabulary

- **App shell/navigation**: top/bottom/side navigation surfaces that preserve the Direct path.
- **World map surface**: grid-map background and spatial canvas for Zones.
- **Zone node**: circular, hexagonal, island-like, locked/current/completed map marker.
- **Status/unlock card**: large notification card for current status or unlock-style messages.
- **HUD panel**: compact status panel for current building/writing/learning.
- **Quest card**: bordered, hard-shadow card for Current Quests or activity.
- **Item card**: Inventory preview card for projects with proof-oriented summary.
- **Skill node**: Skill Tree node with state and optional links to proof.
- **Action button**: chunky, tactile button with hard shadow/pressed state.
- **Badge/chip**: pill or compact label for status, rarity, category, or state.
- **Detail panel/bottom sheet**: focused detail surface for mobile or overlay contexts.

## Open Questions

- Which Figma frames beyond `node-id=0:1` are approved for Inventory, Experience, Skills, Quest Log, Writing, and Contact?
- Should Rubik and Space Grotesk be self-hosted, loaded through a provider, or replaced with system fonts for v1?
- Which custom icons/assets should be created versus represented with the future functional icon library?
