# Tannenhof Mayer — Static Website

This is a finished static website for **Tannenhof Mayer**. It is designed to be uploaded directly to GitHub Pages or any static web host.

## Files

- `index.html` — the full landing page
- `styles.css` — all visual design, layout, animation, and responsive styling
- `script.js` — animated graphs, counters, navigation, interactions, and Discord placeholder logic
- `assets/` — favicon, logo mark, and social preview card
- `.nojekyll` — keeps GitHub Pages from processing the site with Jekyll

## How to publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder, not the folder itself.
3. Go to **Settings → Pages**.
4. Set the source to your main branch and `/root`.
5. Save. GitHub will provide the live Pages URL.

## How to add the Discord link

Open `script.js` and replace:

```js
const DISCORD_URL = "#";
```

with your real invite link, for example:

```js
const DISCORD_URL = "https://discord.gg/your-invite";
```

## Notes

- All graph data is illustrative sample data and can be replaced inside `script.js`.
- The legal disclaimer in the footer is intentionally conservative because the site discusses investment activity and future community ownership.
- No build step is required.
