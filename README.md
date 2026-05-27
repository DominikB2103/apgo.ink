# Wylo — GitHub Pages website

Static landing page for **Wylo**, built for GitHub Pages with no database and no package installation.

## Files

- `index.html` — main site
- `styles.css` — full visual system and responsive styling
- `script.js` — vanilla JavaScript interactions, animations, tabs, contact email composer
- `404.html` — fallback page for GitHub Pages
- `CNAME` — points the GitHub Pages custom domain to `apo.ink`
- `assets/wylo-mark.svg` — Wylo logo mark
- `assets/og-image.png` — social preview image
- `asset-prompts.md` — optional prompts for future generated image assets
- `robots.txt` and `sitemap.xml` — basic SEO files

## Deploy on GitHub Pages

1. Upload these files to the root of the GitHub repository.
2. Go to repository **Settings → Pages**.
3. Set the source to the branch and root folder you use for the site.
4. The `CNAME` file already contains `apo.ink`.

## Contact form

The contact form uses `mailto:` because GitHub Pages has no backend/database. Change this line in `script.js` when the official inbox is ready:

```js
const CONTACT_EMAIL = "hello@apo.ink";
```

## Design direction

The site is intentionally premium and motion-rich without relying on immature trends like heavy glassmorphism, orbit/space visuals, cyberpunk neon, or generic startup gradients. It uses custom static components, cinematic motion, responsive layouts, and vanilla JavaScript.
