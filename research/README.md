# APGO Research Archive

Zero-build static research archive interface for GitHub Pages.

## Deploy

1. Delete the old site files from the repository.
2. Drag these files into the repository root.
3. Commit and push.
4. In GitHub Pages, publish from the repository root.

No npm, no build step, no workflow, no external images.

## Add real research records

Edit `assets/research-index.json`. It is intentionally empty now.

Expected shape:

```json
[
  {
    "title": "...",
    "authors": "...",
    "date": "2026-05-12",
    "type": "paper",
    "abstract": "...",
    "keywords": ["..."]
  }
]
```
