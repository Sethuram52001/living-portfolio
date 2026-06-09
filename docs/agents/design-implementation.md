# Design Implementation Guide

Use this guide before implementing or changing any user-facing UI.

## Source hierarchy

When design sources exist, follow them in this order:

1. `docs/design/design.md` for product intent, screen requirements, visual rules, and interaction notes.
2. Figma references, inspected through Figma MCP when available, for layout, spacing, component states, and responsive behavior.
3. Google Stitch exports for generated screen direction, component ideas, and visual exploration.
4. Reference images/screenshots for concrete visual targets.
5. Existing implemented components and tokens.

If sources conflict, do not guess. Ask the user which source wins, then record the decision in `docs/design/design.md` or an ADR if it is hard to reverse.

## Expected design inputs

The user may provide any combination of:

- `docs/design/design.md`: the main design brief and implementation notes.
- Figma link, file, frame, component, or exported frames.
- Google Stitch generated screen descriptions, screenshots, or code snippets.
- Images or screenshots for visual reference.
- Notes about what to keep, discard, or reinterpret.

Do not require every input. Use the strongest available source and ask only when a missing detail would materially change the implementation.

## Before implementation

- Read `CONTEXT.md`.
- Read `docs/prd/living-portfolio-requirements.md`.
- Read `docs/prd/technical-requirements.md`.
- Read relevant ADRs in `docs/adr/`.
- Read `docs/design/design.md` if it exists.
- Inspect relevant Figma, Stitch, or image references provided for the target screen.
- If a Figma URL or frame is provided and Figma MCP tools are available, use them before relying on screenshots or manual descriptions.

Before editing UI, summarize:

- the screen or component being implemented,
- the design sources being followed,
- any assumptions,
- any unresolved visual or interaction questions.

## Implementation rules

- Preserve the requirements: curious first, confident second; playful but recruiter-safe.
- Pair thematic labels with clear plain-language meaning.
- Keep direct navigation and important career information obvious.
- Prefer custom local components over generic-looking library UI.
- Use Tailwind for styling and Motion for meaningful transitions.
- Do not introduce theme-only interactions that hide content.
- Do not copy generated code blindly from Google Stitch or Figma exports; translate it into the repo's component and content model.
- Keep visual implementation responsive from the start.

## Fidelity expectations

Match the approved design source closely for:

- layout structure,
- spacing rhythm,
- typography scale,
- color usage,
- component hierarchy,
- interaction states,
- mobile behavior.

Adapt only when necessary for accessibility, responsiveness, SEO, maintainability, or the established project requirements. Call out meaningful adaptations.

## Figma MCP handling

Use Figma MCP as the preferred source for inspecting Figma designs when available.

Use Figma MCP for:

- frame structure and hierarchy,
- measured spacing and alignment,
- typography and color tokens,
- component variants and states,
- responsive frame comparison,
- screenshots for implementation QA.

When using Figma MCP:

- inspect the relevant frame before implementing,
- identify reusable components and design tokens,
- map Figma layers to the repo's custom components instead of reproducing layer names mechanically,
- ask the user when multiple frames conflict or a frame appears exploratory rather than approved,
- record settled decisions in `docs/design/design.md`.

Do not use Figma MCP output as a substitute for the product requirements. Figma determines visual execution; `CONTEXT.md`, PRDs, and ADRs determine product intent and technical constraints.

## QA checklist

Before considering UI work complete:

- Compare the implemented screen against the design sources.
- Verify mobile and desktop layouts.
- Verify text does not overlap or overflow.
- Verify direct navigation remains clear.
- Verify meaningful HTML content exists for SEO-relevant pages.
- Verify animations support state changes rather than distract.
- Run the available quality checks for the project.

## Google Stitch handling

Treat Google Stitch output as direction, not authority.

Use Stitch for:

- design-system notes in `docs/design/design.md`,
- visual exploration,
- layout ideas,
- component inspiration,
- screen-level mood.

Do not rely on Stitch for:

- final architecture,
- final content model,
- accessibility correctness,
- SEO structure,
- production-ready code quality.

When both Stitch and Figma are provided, use Stitch to understand the style language and Figma to implement exact screen structure.
