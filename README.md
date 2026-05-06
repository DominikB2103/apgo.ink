# Tannenhof Mayer — GitHub Pages Static Website

A finished static website for **Tannenhof Mayer** with institutional typography, serious editorial copy, interactive canvas charts, strategy tabs, scenario controls, and an allocation slider. No build step or server is required.

## Files

- `index.html` — complete page markup
- `styles.css` — all design, layout, responsiveness, and animation
- `script.js` — chart drawing, tabs, sliders, navigation, and Discord placeholder logic
- `assets/` — SVG brand mark, favicon, social preview, and media illustration
- `.nojekyll` — keeps GitHub Pages from processing the site

## Publish

1. Create or open your GitHub repository.
2. Upload the contents of this folder to the root of the repository.
3. Go to **Settings → Pages**.
4. Set the source to your main branch and `/root`.
5. Save and open the Pages URL once GitHub finishes publishing.

## Add the Discord link

Open `script.js` and replace:

```js
const DISCORD_URL = "#";
```

with your real invite:

```js
const DISCORD_URL = "https://discord.gg/your-invite";
```

## Edit the sample data

The charts use illustrative arrays in `script.js`:

- `heroData`
- `scenarios`

Replace those values with your preferred sample series or manually updated data.

## Important

The footer includes a conservative investment disclaimer. Keep it unless you replace it with professional legal wording.
