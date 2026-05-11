# Research microsite folder

This folder is intentionally standalone and not visually affiliated with the main site.

## Files

- `index.html` — the research homepage.
- `styles.css` — complete visual system for the research page.
- `app.js` — search, filters, command console, scroll progress, reveal animation, and card tilt.
- `data/records.js` — add papers, theorems, discoveries, inventions, writings, and news items here.
- `assets/*.svg` — original SVG media generated for this page.

## Add a record

Open `data/records.js` and place objects inside `window.RESEARCH_RECORDS`:

```js
window.RESEARCH_RECORDS = [
  {
    title: "Title of the work",
    type: "paper",
    year: "2026",
    status: "draft",
    abstract: "One precise paragraph describing the work.",
    tags: ["logic", "systems"],
    href: "./papers/title.pdf"
  }
];
```

Accepted `type` values:

- `paper`
- `theorem`
- `discovery`
- `invention`
- `writing`
- `news`

Accepted `status` values are flexible, but the design expects labels like `draft`, `review`, `published`, or `sealed`.
