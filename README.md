# Venturenix LAB Memory Game

A React memory card matching game built with Vite + React (pure JavaScript).

## Features

- 12 cards (6 unique pairs) with local animal images
- 600ms CSS 3D flip animation (cubic-bezier easing)
- Match/no-match logic with counters:
  - 成功配對次數 (Successful matches)
  - 嘗試配對次數 (Total attempts)
- Glassmorphism UI design
- Background: `#0F172A` | Main color: `#10B981` (emerald green)
- Poppins (title) + Inter (body) fonts
- 3×4 responsive grid layout
- New game button shuffles cards instantly
- Preloads all images on mount

## Tech Stack

- Vite + React (pure JavaScript, no TypeScript)
- CSS only (no extra UI libraries)
- Local images in `public/img/`

## Setup

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```
