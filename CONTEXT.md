# Living Portfolio

This project is a living career map: a personal portfolio that shows Sethuram's projects, skills, writing, current work, and career phases through a map-like interface.

## Language

**Living portfolio**:
The whole site as an active, updateable representation of Sethuram's career and current work.
_Avoid_: Static portfolio, resume site

**World Map**:
The homepage and primary navigation surface where visitors discover career phases as map zones.
_Avoid_: Landing page, home screen

**Recruiter-safe map**:
A World Map that uses spatial and playful cues while keeping content obvious, accessible, and understandable to hiring-oriented visitors.
_Avoid_: Required gameplay, puzzle navigation

**Progressive interactivity**:
The technical posture that v1 should be content-first with tasteful interaction, while leaving room for richer map behavior later.
_Avoid_: Full game engine v1, static-only site

**Meaningful motion**:
Animation that clarifies navigation, state change, selection, or liveliness without becoming decorative noise.
_Avoid_: Animation for its own sake

**React product surface**:
An interactive portfolio area that benefits from React-style components, state, transitions, and reusable UI patterns.
_Avoid_: Static content block

**Custom UI component**:
A locally owned component that expresses the portfolio's visual language, such as map nodes, item cards, HUD panels, badges, and outlined controls.
_Avoid_: Generic library component as final UI

**Plain-language pairing**:
The rule that playful labels should be paired with clear meaning so visitors understand the content without decoding the theme.
_Avoid_: Theme-only labels

**Zone**:
A mapped career area or phase, such as Algorithm Forest, Frontend Arcane, Systems Dungeon, or Writing Harbor.
_Avoid_: Section, category, page group

**Current Camp**:
The part of the World Map that shows what Sethuram is actively building, writing, or learning now.
_Avoid_: Status section, now page

**Inventory**:
The project collection surface where projects are treated as inspectable items.
_Avoid_: Projects page, portfolio grid

**Experience**:
The surface for career phases and Professional Milestones, especially backend engineering work and internships.
_Avoid_: Resume page when referring to the domain surface

**Item**:
A single project in the Inventory, with metadata, links, story, tech stack, and screenshots.
_Avoid_: Project card when referring to the domain concept

**Item proof**:
The minimum evidence required for an Item: a problem or motivation, a visible artifact, and a short story explaining what Sethuram learned or why it mattered.
_Avoid_: Case study requirements

**Unfinished work boundary**:
Current Quests, Field Notes, and learning Skill Nodes may be unfinished; Inventory Items and Professional Milestones should represent real, inspectable, completed proof.
_Avoid_: Everything as a project

**Skill Tree**:
The skills surface where technical and creative capabilities are grouped and shown as progression.
_Avoid_: Skills list

**Skill Node**:
A single capability in the Skill Tree, optionally connected to projects, writing, or milestones.
_Avoid_: Skill badge

**Quest Log**:
The activity surface for current work, learning, writing, experiments, and completed milestones.
_Avoid_: Blog feed, changelog, activity page

**Current Quest**:
An in-progress effort that shows what Sethuram is actively building, writing, learning, or experimenting with.
_Avoid_: Todo, task

**Field Note**:
A piece of writing, learning, reflection, or dev-log material that captures thinking in progress.
_Avoid_: Blog post when referring to the domain concept

**Status HUD**:
A compact persistent widget that summarizes current building, writing, and learning.
_Avoid_: Sidebar, banner

**Milestone**:
A completed career or project event worth preserving in the Quest Log or a Zone.
_Avoid_: Update, entry

**Professional Milestone**:
A work-history achievement inside a Career phase that proves backend engineering impact, reliability work, product delivery, or engineering leadership.
_Avoid_: Resume bullet, job duty

**Career phase**:
A meaningful period in Sethuram's journey, such as college builds, internship work, first production systems, or current work.
_Avoid_: Timeline period

**Craft evaluator**:
A visitor who can judge engineering taste, product thinking, learning trajectory, and the quality of shipped work.
_Avoid_: Generic visitor

**Recruiter path**:
The fast, low-friction route through the site that lets recruiters understand Sethuram's profile without needing to explore every interactive layer.
_Avoid_: Recruiter mode, plain resume mode

**Role signal**:
The fast impression that Sethuram is primarily a backend engineer, with light AI and frontend breadth.
_Avoid_: Frontend-first positioning

**Thoughtful builder**:
The primary impression the site should create: Sethuram turns ideas into polished, usable, well-considered things.
_Avoid_: Coder, developer profile

**Curious then confident**:
The intended emotional arc: visitors should first feel invited to explore, then feel confident that Sethuram is a serious backend engineer and thoughtful builder.
_Avoid_: Confusing novelty, style over substance

**Portfolio success**:
A successful visit leaves someone understanding who Sethuram is, what kind of engineer he is, what he has built, what he is currently exploring, and how to contact him, while remembering the site afterward.
_Avoid_: Traffic-only success, novelty-only success

**Active momentum**:
The sense that Sethuram is currently building, writing, learning, and experimenting rather than presenting only old work.
_Avoid_: Activity for its own sake, stale updates

**Honest freshness**:
The site shows dated current work and recent activity without promising a fixed update cadence.
_Avoid_: Daily updates, weekly commitment

**Repo content**:
Portfolio content stored as files in the repository and updated through commits before any future CMS is introduced.
_Avoid_: Manual database entry

**Narrative content**:
Long-form or story-shaped content best authored in MDX, such as Field Notes and detailed Item write-ups.
_Avoid_: Data blob

**Structured content**:
Portfolio content best represented as typed data, such as zones, skills, status, navigation, and lightweight Quest metadata.
_Avoid_: Prose-only content

**Static-first**:
The deployment posture where core portfolio pages are generated from repo content at build time while preserving a path to server capabilities later.
_Avoid_: Runtime dependency for core pages

**SEO-ready page**:
A route that has meaningful HTML content, metadata, share previews, and readable structure without requiring a visitor or crawler to play through interactions.
_Avoid_: Client-only content

**Primary journey**:
The preferred visitor path: explore Sethuram's work, notice the current journey, then contact or view resume details when ready.
_Avoid_: Single CTA funnel

**Explore path**:
The richer route through the portfolio using the World Map, Inventory, Skill Tree, Quest Log, and other thematic surfaces.
_Avoid_: Hidden navigation

**Direct path**:
The straightforward route through the portfolio for visitors who need quick access to work, experience, resume, contact, and role fit.
_Avoid_: Fallback experience, boring mode

**Home**:
The natural entry point that explains this is a living portfolio, invites visitors to explore, and offers direct access to details, contact, and social profiles.
_Avoid_: Splash screen, game start screen
