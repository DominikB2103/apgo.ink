# APGO

APGO is an independent publication for world affairs, economics, technology, history and ideas. APGO Football is a separate product for match analysis, player evaluation and a transparent global ranking model.

The site is deliberately static: it is fast, inexpensive to host, easy to audit and has no database or account system to secure. Content and page structure are generated from a small set of files and deployed through GitHub Pages.

## Local development

Use Node.js 20 or newer. Install the locked development dependencies before running the build and layout checks.

```sh
npm ci
npm run build
npm run check
npm run test:layout
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

Edition number and publication dates live in `content/site.json`. The committed GitHub Actions workflow rebuilds and validates the site on every pull request and on every push to `main`.

## Publishing an article

1. Add the article body as semantic HTML in `content/articles/`.
2. Add its metadata and primary sources to `content/articles.json`.
3. Add a 16:9 WebP hero image to `assets/images/` and write accurate alt text and a provenance caption.
4. Run `npm run build && npm run check && npm run test:layout`.
5. Review the article at desktop and mobile widths before merging.

The generator creates the article page, front page and section cards, RSS entry, sitemap entry, canonical metadata and structured data.

The full editorial, product and release workflow is in [EDITORIAL_PLAYBOOK.md](EDITORIAL_PLAYBOOK.md).

## Editorial architecture

- **APGO Journal:** world affairs, economics, technology, history and ideas.
- **APGO Football:** tournament analysis and, after public testing, player rankings.
- **APGO Projects:** a roadmap for the World Player Index, Open Reference and Systems Atlas.
- **Standards:** primary-source links, visible corrections, labelled analysis and image provenance.
- **Support:** reader funding with no editorial rights attached.

The player index is intentionally marked as in development. Before launch it needs licensed event data, positional baselines, opponent and competition adjustments, backtesting against several seasons, an uncertainty score, a published changelog and a documented appeals/corrections process.

## Repository structure

```text
assets/          CSS, JavaScript and editorial images
content/         Site settings, article metadata, sources and article bodies
templates/       Reusable page templates
scripts/         Build and validation scripts
articles/        Generated Journal article pages
football/        Separate APGO Football product and articles
projects/        Public product roadmap
```

Generated HTML is committed because GitHub Pages serves the repository directly. Edit the source files, then rebuild; do not hand-edit generated pages.

The build gives shared CSS and JavaScript a content fingerprint in every generated URL. That prevents a browser from pairing newly deployed HTML with an older cached layout. The Playwright suite checks the critical pages at desktop, laptop, tablet and phone widths and fails on horizontal overflow or broken article geometry.

## Image policy

Edition 002 uses art-directed generative editorial visuals. Captions identify them as conceptual images, never documentary photographs. Images must not fabricate evidence, impersonate archival material or imply that a depicted scene is a record of an event.
