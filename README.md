# F1 2026 Telemetry Hub 🏎️

A high-end, immersive "Scrollytelling" information hub for the Formula 1 2026 season. Built using Next.js, Framer Motion, and Tailwind CSS. The core goal is to provide a scroll-linked narrative that features interactive components such as an exploded car view, a horizontal parallax driver grid, circuit mapping, and live-style standings.

## Features
- **Scrollytelling Experience:** 240-frame sequence scroll-driven background.
- **Interactive UI:** Exploded 3D-like car anatomy breakdown.
- **Personalization:** Client-side persistence for favoriting drivers and teams.
- **Historical Hall of Champions:** Comprehensive WDC history data and driver career milestones.
- **Live Social Feed:** Integrated team paddock social media updates using oEmbed.
- **Performance Optimized:** Advanced lazy-loading and dynamic imports.

## Getting Started

First, run the development server on the dedicated port for this project (Port 3001):

```bash
npm run dev -- -p 3001
# or
yarn dev -p 3001
# or
pnpm dev -p 3001
# or
bun dev -p 3001
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS & Custom CSS
- **Animations:** Framer Motion & GSAP
- **Data:** Static JSON mapping & Context API

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
