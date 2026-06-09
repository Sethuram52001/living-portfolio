# Domain Docs

This is a single-context repo.

## Before exploring, read these

- `CONTEXT.md` at the repo root for shared project language.
- `docs/adr/` for architectural decisions that touch the area being changed. ADRs use three-digit numbering, such as `001-living-portfolio-foundation.md`, and should follow `docs/adr/TEMPLATE.md`.
- `docs/prd/` for product requirements and feature scope.

If any of these files are missing or incomplete, proceed with the current task and improve them only when the decision or term is genuinely relevant.

## Use the glossary vocabulary

When naming modules, components, issues, PRDs, tests, or ADRs, prefer the terms defined in `CONTEXT.md`.

If a concept is missing from `CONTEXT.md`, either avoid inventing new language or update the glossary when the term becomes stable.

## Flag ADR conflicts

If an implementation or proposal contradicts an existing ADR, surface that conflict explicitly before proceeding.
