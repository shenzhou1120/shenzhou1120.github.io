# Academic research website

Quarto source for a research portfolio focused on multimodal Earth observation and spatiotemporal representation learning.

## Local preview

Install [Quarto](https://quarto.org/docs/get-started/), then run:

```bash
quarto preview
```

Use `quarto render` for a production build. Generated files are written to `_site/`.

## Deployment

Pushes to `main` are rendered and deployed to GitHub Pages by the workflow in `.github/workflows/publish.yml`.

The public site is available at [https://shenzhou1120.github.io](https://shenzhou1120.github.io).

When a final CV PDF or additional research resources become publicly available, add them under `assets/` and expose their links in the relevant page.
