# Meridian Research Static Site

This is a zero-build, zero-install static website for GitHub Pages.

## Use

1. Unzip the files.
2. Drag everything into the root of your GitHub repository.
3. In GitHub, go to **Settings → Pages**.
4. Choose **Deploy from a branch** and select your branch, usually `main`, with the folder set to `/root`.
5. Save.

No npm install. No Next.js build. No workflow required. The site runs directly from `index.html`.

## Files

- `index.html` — complete homepage
- `404.html` — GitHub Pages error page
- `.nojekyll` — prevents Jekyll processing on GitHub Pages
- `assets/styles.css` — full design system and responsive styling
- `assets/main.js` — mobile navigation only
- `assets/mark.svg` — original logo mark
- `assets/og.svg` — original social preview image
- `robots.txt` and `sitemap.xml` — basic search metadata placeholders

## Customise

Change the name, text, sections, and contact email directly in `index.html`. The design uses system fonts and original SVG graphics, so there are no external asset dependencies.
