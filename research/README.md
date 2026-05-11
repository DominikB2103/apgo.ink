# Research microsite

This folder is a completely independent `/research` homepage. It does not inherit the previous apgo.ink typography, layout, neon/glass treatment, or animation language.

## Files

```txt
research/
  index.html
  styles.css
  app.js
  README.md
  data/
    records.js
  assets/
    botanical-plate.svg
    field-map.svg
    human-study.svg
    specimen-seal.svg
```

## Design direction

- Editorial, serious, academic, human, and nature-oriented.
- Black-and-white typographic foundation with restrained natural color from photography and botanical illustrations.
- No glass panels, no neon gradients, no scroll-triggered fade-ins.
- Large reading-first typography using open web fonts.
- Nature-inspired imagery, paper texture, topographic diagrams, and human-scale illustration.

## How to add work

Edit `data/records.js` and add objects to `window.RESEARCH_RECORDS`.

```js
window.RESEARCH_RECORDS = [
  {
    id: "first-paper",
    kind: "paper",
    title: "Title of the work",
    date: "2026-05-11",
    status: "draft",
    field: "Mathematics",
    abstract: "One clear sentence explaining the work.",
    tags: ["proof", "model", "systems"],
    url: "./papers/first-paper.pdf"
  }
];
```

Accepted `kind` values:

- `paper`
- `theorem`
- `discovery`
- `invention`
- `writing`
- `news`

## Image and media sources

Original local SVGs in `assets/` were generated for this page.

Remote nature photographs are loaded from Unsplash image CDN URLs in `styles.css`:

- Misty mountain / forest hero: `photo-1470071459604-3b5ec3a7fe05`
- Forest canopy statement image: `photo-1441974231531-c6227db76b6e`
- Leaf image: `photo-1501004318641-b39e6451bec6`
- Water / landscape image: `photo-1500530855697-b586d89ba3ee`

Unsplash states that its images can be used for free for commercial and non-commercial purposes without permission, with attribution appreciated. Check each image yourself before final commercial publication if you need formal provenance records.

## Fonts

The page imports open web fonts from Google Fonts:

- Newsreader
- Source Serif 4
- IBM Plex Sans
- IBM Plex Mono

You can replace the import in `index.html` with self-hosted font files later if you want the page to work without external font requests.
