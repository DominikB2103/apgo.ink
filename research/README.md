# Meridian Research Static Website

A serious editorial research website designed for GitHub Pages with no build step.

## Deploy

1. Unzip this package.
2. Drag all files into the root of your GitHub repository.
3. In GitHub, open **Settings → Pages**.
4. Set the source to your main branch and `/root`.
5. Save.

No npm install. No Next.js build. No bundler. No server. No GitHub Actions required.

## Pages

- `index.html` — homepage with editorial hero, intelligence ledger, publication highlights, data room, and research areas.
- `publications.html` — searchable and filterable publication archive.
- `programmes.html` — programme portfolio and research matrix.
- `observatory.html` — static observatory dashboard with signals, tables, map, and desk notes.
- `methodology.html` — evidence grading, review protocol, uncertainty language, and corrections.
- `about.html` — institutional profile, governance, standards, and contact.
- `404.html` — GitHub Pages fallback page.

## Customisation

- Edit text directly in the HTML files.
- Replace placeholder email addresses in `index.html` and `about.html`.
- Update `sitemap.xml` with your production domain.
- Edit colours and typography in `assets/styles.css`.
- All visuals are local SVG/CSS assets.

## Files

```text
assets/
  field-map.svg
  main.js
  mark.svg
  og.svg
  styles.css
.nojekyll
404.html
about.html
index.html
methodology.html
observatory.html
programmes.html
publications.html
robots.txt
sitemap.xml
```
