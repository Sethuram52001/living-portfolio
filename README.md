# Portfolio

[Live site](https://sethuram52001.vercel.app)
<img width="1470" height="725" alt="Screenshot 2026-07-14 at 1 44 23 AM" src="https://github.com/user-attachments/assets/8260e4fd-dcc2-485d-b1fe-7f46e5cc4e3d" />

A content-driven single-page portfolio for Sethuram, rebuilt after more than four
years to give experience, selected projects, technical writing, and current work a
clearer, more modern home.

## What is here now

- A recruiter-friendly scroll through About, Experience, Skills, Selected Work,
  Writing, Current Focus, and Contact.
- Career experience in distributed fintech systems, billing, reconciliation, IAM,
  and backend reliability.
- Selected interactive projects, technical articles, and current experiments.
- Content stored in the repository and validated at build time.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS and Motion
- Zod and Gray Matter for typed, validated portfolio content
- pnpm and Vercel

## Content

Portfolio content lives in [`content/`](content/):

- `home.ts` for section copy and homepage curation
- `site.ts` for identity, navigation, links, and metadata
- `experience/`, `items/`, and `field-notes/` for portfolio records
- `skills.ts` and `highlights/` for capability and positioning content

Run the content validation whenever you change authored data:

```bash
pnpm content:check
```

## Development

```bash
corepack enable
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm typecheck
pnpm lint
pnpm verify
```

## Direction

The current release is intentionally a focused single-page portfolio. A more
exploratory map-style experience may grow from the same content model later, but
only where it improves the story and keeps the path clear for recruiters.

## License

Code is MIT licensed. Content, writing, images, and personal branding are not
licensed for reuse.
