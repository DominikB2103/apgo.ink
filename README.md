# apgo.ink — Tannenhof Mayer website rehaul

A static, GitHub Pages-ready website for **apgo.ink**, the public surface of **Tannenhof Mayer**.

## Design direction

- Monochromatic editorial base: black, warm white, fine borders, serif headlines.
- Minimalist UI with neo-brutalist cards: hard outlines, visible structure, tactile shadows.
- Organic shapes: irregular blobs/orbits used as capital-system motifs.
- Tiny color accents only: lime, violet, amber, coral, cyan used for status dots, labels, metrics, and interactions.
- No backend, no build step, no server requirement.

## Files

```txt
.
├── index.html
├── 404.html
├── CNAME
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
└── assets
    ├── css/styles.css
    ├── js/main.js
    └── img
        ├── favicon.svg
        ├── mark.svg
        ├── og-image.png
        └── organic-blob.svg
```

## Deploy to GitHub Pages

1. Unzip this package.
2. Copy every file into the root of your GitHub Pages repository.
3. Commit and push to the branch used by Pages, usually `main`.
4. In GitHub: **Settings → Pages → Build and deployment → Deploy from branch → main / root**.
5. Point your domain DNS to GitHub Pages. The included `CNAME` already contains `apgo.ink`.

## Customize quickly

- Contact email: search for `hello@apgo.ink` in `index.html`.
- Site copy: edit the content sections in `index.html`.
- Accent colors: edit CSS variables at the top of `assets/css/styles.css`.
- Social preview image: replace `assets/img/og-image.png`.
- Domain: edit `CNAME`, `sitemap.xml`, and the canonical/Open Graph URLs in `index.html`.

## Important note

The footer includes a finance disclaimer because the organisation is described as investment-related. Keep it unless legal counsel gives you replacement wording.
