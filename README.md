# Gradepair

**Unit tests for your AI feature, built for PMs, not engineers.**

Gradepair lets product people compare prompt A vs B on plain-language test cases, grade outputs pass/fail with notes, and see regressions before ship. Stage 4 adds the full demo workflow with **sample data only** (no live model calls).

## Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS v4 — design tokens in `src/app/globals.css` (`@theme` + `gp` spacing/radius namespace)
- Zustand + `localStorage` for edits and grades
- Motion for React (subtle transitions; `prefers-reduced-motion` respected)

## Getting started

```bash
npm install
npm run dev
```

- `/` → redirects to **`/projects`**
- **`/dev/kitchen-sink`** — token/component checker (Stage 3)

```bash
npm run build
npm run lint
```

## Routes (Stage 4)

| Route | Screen |
|-------|--------|
| `/projects` | Project list |
| `/projects/[id]/cases` | Test case editor |
| `/projects/[id]/prompts` | Prompt A vs B (equal-height cards) |
| `/projects/[id]/compare` | Comparison + grading (`j`/`k`, `1`–`4` shortcuts) |
| `/projects/[id]/report` | Summary & regression report |

Demo seed data lives in `src/data/` (`SEED_PROJECTS`). The **Hinglish notifications** project is intentionally empty for the empty-state flow.

## Project status

**Stage 4: product screens** — All six flows above, local persistence, honest demo banner. Live API runs and auth are out of scope.

## License

Private portfolio project — Om Raje, 2026.