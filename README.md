# NECTAR React Website

A one-page React/Vite site made for GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The built site goes into `dist/`.

## Deploy to GitHub Pages

This project includes `.github/workflows/deploy.yml`.

1. Create a GitHub repo.
2. Upload/push these files to the repo.
3. Go to **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Push to the `main` branch.

The Vite config uses `base: './'`, so the site works from a normal GitHub Pages repo URL like:

```text
https://yourname.github.io/your-repo/
```

## Component plan

Current components:

- `Nav.jsx` — pill nav and CTA
- `Hero.jsx` — oversized hero, central product, floating fruit
- `FlavorRail.jsx` — three flavor cards
- `SplitFeature.jsx` — visual/copy section
- `Footer.jsx` — final CTA

Good components to add later:

- Real product image or 3D model replacing the CSS can
- Scroll-based animation section
- Flavor carousel
- Product detail modal
- Video or animated background
- Shopify/buy button integration

## Notes

No image assets are required right now. The whole look is made with CSS gradients, shapes, and React components.
