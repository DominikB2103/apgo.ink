# Meridian Review — static research editorial site

A serious, restrained research-publication website designed for GitHub Pages. The design direction is editorial, typographic, and institutional: print-like hierarchy, dense but readable spacing, quiet color, and original SVG/CSS visuals instead of third-party image dependencies.

## Stack

- Next.js static export
- React and TypeScript
- Custom CSS design system
- Original inline SVG and CSS figures
- GitHub Actions deployment to GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static build

```bash
npm run build
```

The exported static site is written to `out/`.

## Deploy to GitHub Pages

1. Create a GitHub repository and push these files to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Push to `main`; the included workflow builds and publishes the static `out/` folder.

The `next.config.mjs` file automatically sets a base path for project pages such as:

```text
https://username.github.io/repository-name/
```

For a user or organization site such as `username.github.io`, no project base path is applied.

## Customize the content

Edit these files:

- `data/content.ts` — issue title, article cards, departments, and metrics.
- `app/page.tsx` — section order and page structure.
- `app/globals.css` — visual system, spacing, color, and typography.
- `public/mark.svg` — site mark and favicon.

## Design notes

- No decorative stock photos are required.
- The layout avoids casual microcopy and playful visual motifs.
- Figures are generated from original SVG/CSS so the site remains portable, static, and legally clean.
- The site uses no database, no API routes, no server rendering requirement, and no tracking scripts.
