# AdityaPrasad275.github.io

Personal portfolio site built with React, Vite, and Tailwind CSS. The app lives in `frontend/` and is deployed to GitHub Pages.

## Structure

- `frontend/` - Vite app source
- `.github/workflows/pages.yml` - GitHub Pages deploy workflow

## Local development

```bash
cd frontend
npm install
npm run dev
```

## Production build

```bash
cd frontend
npm run build
```

## Deployment

This repository is configured as a GitHub Pages user site, so the deployed URL is:

`https://adityaprasad275.github.io/`

Pushes to `main` trigger the Pages workflow in GitHub Actions, which installs dependencies, builds `frontend/`, and publishes `frontend/dist`.

Static assets that should be reachable at the site root go in `frontend/public/`.
For example, put the resume at `frontend/public/resume.pdf` and link to it as `/resume.pdf`.
