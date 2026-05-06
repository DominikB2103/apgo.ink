# Tannenhof Mayer Website

A finished static website package for **Tannenhof Mayer**.

## Upload to GitHub Pages

1. Unzip this package.
2. Put all files in the root of your GitHub Pages repository.
3. Commit and push.
4. In GitHub, go to **Settings → Pages** and publish from the root branch/folder you use.

## Change the Discord link

Search for this placeholder in `index.html`:

```html
https://discord.gg/REPLACE-ME
```

Replace it with your real invite link.

## Replace placeholder data

- `assets/js/data/performanceData.js`
- `assets/js/data/allocationData.js`
- `assets/js/data/scenarioData.js`
- `assets/js/data/velocityData.js`

The charts are client-side and require no backend.

## Notes

- The website includes legal/disclosure copy because investment-related websites should be careful with claims.
- All performance metrics are illustrative placeholders.
- No font files are included. Typography loads from Google Fonts with strong local fallbacks.
