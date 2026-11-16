# Gradepair

**Unit tests for your AI feature, built for PMs, not engineers.**

Gradepair is a portfolio product for comparing two prompt versions (A vs B) on plain-language test cases, grading outputs pass/fail with notes, and surfacing regressions before ship. It is aimed at product people—not eval engineers running YAML, traces, or SDKs.

## Stack

- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) v4 with design tokens from Figma
- [Motion](https://motion.dev/) for React (subtle, `prefers-reduced-motion` aware)
- Fonts: Bricolage Grotesque, Hanken Grotesk, Geist Mono, Caveat (`next/font/google`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page is a **kitchen sink** that shows tokens, typography, and base UI components.

```bash
npm run build
npm run lint
```

## Project status

**Stage 3: foundations** — App scaffold, semantic colour/spacing/radius tokens, base components, app shell sidebar, typed sample data (`src/data/sample.ts`). Full product screens (compare table, run flow, settings) are not built yet.

## Sample data

`src/data/sample.ts` defines the fictional **AdsGPT ad-copy assistant** project and six cases used in the Figma comparison screen. Marked as sample/demo data only.

## License

Private portfolio project — Om Raje, 2026.