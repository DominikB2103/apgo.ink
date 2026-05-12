# Theoria Research Archive

A static, editorial research website prepared for GitHub Pages. It uses only HTML, CSS, and vanilla JavaScript. There is no build step, no package manager, and no external dependency.

## Deploy to GitHub Pages

1. Upload every file in this folder to your repository root.
2. Keep `.nojekyll` in the root so GitHub Pages serves underscored folders such as `documents/_template`.
3. In GitHub, open **Settings → Pages** and publish from the branch/root you uploaded to.

## Add a new document

1. Duplicate `documents/_template/`.
2. Rename the copied folder, for example `documents/my-new-note/`.
3. Edit `documents/my-new-note/index.html`.
4. Open `assets/js/site.js` and add a new object to the `archiveItems` array:

```js
{
  title: "My new note",
  section: "Discoveries",
  type: "Research Note",
  date: "2026-05-12",
  url: "documents/my-new-note/",
  tags: ["analysis", "example"],
  excerpt: "One concise preview sentence for search results."
}
```

## Design notes

- Typography is intentionally restrained and system-font based for reliability.
- Figures are local SVG, so the site does not depend on third-party image hosting.
- The archive search and theorem carousel are static JavaScript components.
- The CSS is shared by the landing page and document pages.
