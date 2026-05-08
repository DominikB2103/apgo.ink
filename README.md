# APTO.INK — Next.js static export for GitHub Pages

This is a real Next.js App Router project, not a Vite scaffold. It is configured for GitHub Pages through `output: 'export'`, which turns every route into static HTML/CSS/JS in the `out/` directory during build.

## What is included

- Premium APTO.INK landing page
- Pricing section directly on the home page
- Searchable/filterable demo selection
- Four full demo websites:
  - `/demos/bakery/`
  - `/demos/garage/`
  - `/demos/municipality/`
  - `/demos/clinic/`
- GitHub Actions workflow for Pages deployment
- Static-export-safe image setup
- No Vite files
- No default Safari icon / favicon bundle
- No CNAME file included, because you said you already have that handled

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, select **GitHub Actions**.
5. Push to the `main` branch.
6. The included workflow builds the site with Next.js and deploys the `out/` folder.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Static build

```bash
npm run build
```

Next.js will generate the static site in `out/`.

## Custom domain

You said your domain/CNAME is already handled, so this package does not include a `CNAME` file. If you later want the repo to manage it, add a file named `CNAME` to `public/` with:

```txt
apto.ink
```

## Editing contact details

Update these files:

- `lib/site-data.ts` for email/phone/pricing/demo metadata
- `app/page.tsx` for main landing-page content
- `app/demos/*/page.tsx` for demo website copy
- `app/legal/impressum/page.tsx` for the legal operator information
- `app/legal/privacy/page.tsx` for privacy details

## Important production notes

- The privacy and impressum pages are placeholders. Replace them before using the site commercially.
- Remote image URLs should be reviewed or replaced with local licensed assets for client work.
- If you add server-only Next.js features later, they will not work on GitHub Pages. Keep it static-export compatible.
