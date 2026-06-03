# Pedro Coelho — Portfolio

Personal portfolio of Pedro Coelho (offensive security · dev · applied AI). A
single-page React app with an editorial, dark aesthetic, deployed to GitHub
Pages under the `/portfolio/` base path.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router 7.

## Architecture

One continuous SPA surface rather than separate pages:

- **`src/pages/Home.tsx`** — hero + a tabbed "works" grid. The three tabs
  (`project` / `code` / `text`) are driven by the URL hash (`/#code`) and
  rendered as an ARIA tablist.
- **`src/pages/DetailSection.tsx`** — an entry's detail view. It renders through
  Home's `<Outlet/>` as a nested route (`/:category/:slug`), so the hero never
  unmounts and the detail unfolds inline beneath the grid. Code-split via
  `React.lazy`, so its (large) data module loads only when a detail is opened.
- **`src/components/`** — `HeroWeb` (animated constellation canvas),
  `VisualCard`, `PosterShell`, `Footer`.

### Content data

All content lives in plain TypeScript modules under `src/data/`:

- `projects.ts`, `code.ts`, `texts.ts` — the cards for each tab.
- `detail.ts` — the full detail content (blocks: paragraphs, lists, code,
  images, video) keyed by slug.
- `contact.ts` — email / phone / WhatsApp.

To add an entry: add a card to the relevant tab file and a matching `slug`
entry in `detail.ts`. Drop assets in `public/img/<slug>/`.

## Scripts

- `npm run dev` — dev server
- `npm run build` — type-check + production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — ESLint

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages. The workflow copies `index.html` to
`404.html` so client-side detail routes resolve on direct hits. The Vite `base`
is `/portfolio/`.
