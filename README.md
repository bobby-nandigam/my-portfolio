# my-portfolio

Personal portfolio of **Bobby Nandigam** — Software Engineer (Backend Systems · ML Engineering · Cloud Infrastructure).

An art-directed, engineering-notebook / blueprint aesthetic: editorial typography, restrained cobalt accent, hand-drawn system diagrams, and interactive technical case studies.

## Tech

- [Next.js 16](https://nextjs.org) (App Router, static export)
- TypeScript
- Tailwind CSS v4
- No animation library — CSS + IntersectionObserver, with `prefers-reduced-motion` support

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export to ./out
```

## Deploy

Pushes to `main` are built and published to GitHub Pages by
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

Live: https://bobby-nandigam.github.io/my-portfolio/

## Notes

- Add your CV at `public/resume.pdf` (the Resume / Download links point there).
- Social links live in `src/lib/content.ts`.
