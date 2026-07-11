---
name: JanConnect AI web port
description: Notes for porting/extending the JanConnect AI app (artifacts/web) that was ported from a standalone Vite/Tailwind-v3/react-router-dom app into this workspace's react-vite scaffold (Tailwind v4, wouter by default).
---

- The scaffold ships `wouter` by default, but this app's original code was written against `react-router-dom` v7 (BrowserRouter, nested `<Route>`, `useNavigate`, `NavLink`, `Outlet`-based layouts). Rather than rewrite routing, `react-router-dom` was added as an extra dependency and the original routing code kept as-is.
  **Why:** user required exact preservation of existing behavior/structure; rewriting routing risked subtle regressions for no benefit.
  **How to apply:** if further pages/routes are added to this app, keep using react-router-dom conventions already in `App.tsx`, don't introduce wouter alongside it.

- `react-leaflet` v4 requires React 18; this workspace pins React 19 (Expo requirement). Used `react-leaflet@5` + `leaflet@^1.9` instead, which supports React 19.
  **Why:** v4's peer deps don't satisfy the workspace's pinned React 19.
  **How to apply:** any future Leaflet map work in this workspace should use react-leaflet v5+.

- The scaffold's `index.css` uses Tailwind v4 CSS-first config (`@theme inline` mapping `--color-x: hsl(var(--x))`). When porting a Tailwind v3 app's theme (plain `:root`/`.dark` HSL variables + `tailwind.config.js` extend.colors), just carry over the HSL variable values and any extra semantic colors (e.g. success/warning/info) into new `--color-*` entries in `@theme inline` — no `tailwind.config.js` needed in v4.
  **Why:** v4 has no JS config file by default; utility classes like `bg-success` only get generated if `--color-success` exists in `@theme inline`.
