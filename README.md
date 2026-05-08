# APTO.INK — Next.js web studio site

This is the rebuilt APTO.INK site as a real Next.js App Router project. The public website is written as a business-facing sales site, not a technical explanation page.

## What is included

- Main landing page for APTO.INK
- Direct example directory at `/demos/`
- Four complete industry example websites:
  - `/demos/bakery/`
  - `/demos/garage/`
  - `/demos/municipality/`
  - `/demos/clinic/`
- Pricing section on the main page
- Swiss SME sales positioning
- Legal placeholder pages
- Custom CSS visual system
- Framer Motion + GSAP + lucide-react
- No Vite
- No CNAME file
- No default framework favicon bundle

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The project uses Next.js static export via `output: 'export'`, so the production files are generated in `out/`.

## Deploying from GitHub

The included workflow in `.github/workflows/deploy.yml` builds the project and deploys the generated `out/` directory. In the repository settings, set Pages source to **GitHub Actions**.

## Custom domain

No `CNAME` file is included because you said your domain setup already exists. Add your own `CNAME` file only if your repository needs it.

## Replace before real launch

- Replace placeholder email/phone in `lib/site-data.ts`
- Replace Impressum and privacy placeholders with real legal details
- Replace stock imagery with client photos when available
- Update `public/sitemap.xml` if the domain or routes change
