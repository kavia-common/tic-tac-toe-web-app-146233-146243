This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Ocean Tic Tac Toe (Frontend)

A modern, ocean-themed Tic Tac Toe game with smooth transitions and a minimalist design.

### Features
- 3x3 board with accessible, focusable cells (aria labels for screen readers)
- Player turns (X/O), win/draw detection
- Winning line highlight
- Scoreboard for the current session
- Controls: New Round (keeps score) and Reset Game (clears score)
- Ocean Professional theme (blue and amber accents), subtle shadows, rounded corners, gradient background

### Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

No backend is required; all logic runs client-side.

### Notes
- Styling uses Tailwind CSS (already configured in this repo).
- Environment variables listed in `.env` are respected by Next.js if set, but this app does not require them.
