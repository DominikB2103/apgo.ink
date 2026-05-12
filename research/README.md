# Meridian Research Static Site

A zero-build, zero-install editorial research website for GitHub Pages. It is intentionally serious, typographic, restrained, and publication-oriented.

## Use

1. Unzip the files.
2. Drag everything into the root of your GitHub repository.
3. In GitHub, go to **Settings → Pages**.
4. Choose **Deploy from a branch** and select your branch, usually `main`, with the folder set to `/root`.
5. Save.

No npm install. No Next.js build. No workflow required. The site runs directly from static files.

## Pages

- `index.html` — publication-style homepage
- `publications.html` — filterable archive of dossiers, memos, field notes, data reviews, and letters
- `programmes.html` — research programme portfolio
- `observatory.html` — static signal dashboard with local SVG visual asset
- `about.html` — purpose, standards, governance, process, and contact
- `404.html` — GitHub Pages error page

## Assets

- `assets/styles.css` — complete responsive design system
- `assets/main.js` — mobile navigation and publication filtering
- `assets/mark.svg` — original logo mark
- `assets/og.svg` — original social preview image
- `assets/field-map.svg` — original abstract map visual
- `.nojekyll` — prevents Jekyll processing on GitHub Pages
- `robots.txt` and `sitemap.xml` — basic search metadata placeholders

## Customise

Edit the HTML files directly. Replace names, publication titles, emails, and placeholder metrics with your own real information. The design uses system fonts and original SVG graphics, so there are no external asset dependencies.

## Important

The included institution name, metrics, publications, and contact emails are template copy. Replace them before publishing a real organisation.
