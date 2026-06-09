# living-portfolio Agent Guide

## Project posture

This repo is a fresh build for Sethuram's living career map portfolio. Do not assume behavior, styling, or architecture from the old portfolio unless the user explicitly asks to reference it.

Before substantial architecture, feature, or content decisions:

- Read `CONTEXT.md` for project language.
- Read relevant ADRs under `docs/adr/`.
- For new feature scope, create or update a PRD using `docs/prd/TEMPLATE.md`.
- For hard-to-reverse decisions, add a short ADR.

Before implementing or changing user-facing UI:

- Read `docs/agents/design-implementation.md`.
- Follow available design sources before improvising visual direction.
- Use the Figma MCP tools when a Figma link or frame is provided and the tools are available.
- Ask for missing design input when the answer would materially change layout, interaction, or visual fidelity.

## Agent skills

### Issue tracker

Issues and PRDs are tracked in GitHub Issues for `Sethuram52001/living-portfolio`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default Matt Pocock triage labels for now. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repo: one root `CONTEXT.md` and root `docs/adr/`. See `docs/agents/domain.md`.

### Design implementation

UI work must follow the design-source workflow in `docs/agents/design-implementation.md`.
