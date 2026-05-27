# Wylo static website

Static single-page website for Wylo. It uses plain HTML, CSS, and JavaScript, so it works on GitHub Pages without npm, build tools, or a backend.

## Files

- `index.html` — page markup
- `styles.css` — full responsive styling
- `script.js` — mobile menu, carousel, reveal animations, and mailto contact form
- `assets/` — generated decorative assets and Wylo mark

## GitHub Pages setup

1. Upload all files in this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set the source to the repository branch and root folder.
4. Save. GitHub Pages will serve `index.html` directly.

## Contact form

The form opens a mail draft to `hello@wylo.studio`. Change that address in `script.js` if needed.
