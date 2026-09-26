# Shenzhou Liu — Academic Website

Personal academic website for Shenzhou Liu, built with the [PRISM](https://github.com/xyjoey/PRISM) template using Next.js, TypeScript, and Tailwind CSS.

## Local development

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
```

The static site is exported to `out/`.

## Content

- `content/config.toml` — profile, social links, navigation, and site settings
- `content/about.toml` and `content/bio.md` — homepage content
- `content/research.toml` — research themes and expandable research narratives
- `content/publications.bib` — publication list
- `content/cv.md` — web CV
- `public/assets/` — profile image and research figures

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and deploys `out/` to GitHub Pages.
