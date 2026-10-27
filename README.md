# Owoade portfolio

Dark-themed personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX case studies.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where content lives

Everything editable is in `/content`, nothing is hardcoded in components:

- `content/site.json` name, tagline, links, proof strip stats
- `content/skills.json` skill groups and blurbs
- `content/recommendations.json` quotes, only `approved: true` entries render
- `content/work/*.mdx` one case study per file; adding a project is just a new MDX file

## Before publishing

Search the repo for `TODO(owner)` and fill every gap with real data:
metrics, links, dates, quotes (with written permission), GitHub URL, and the
final domain in `content/site.json` (`siteUrl`). Nothing is fabricated;
placeholders are visible on the page until replaced.

## Fonts

Bricolage Grotesque for headings, Inter for body text, JetBrains Mono for
tags and numbers.