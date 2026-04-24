# Project Webpage

Minimal static project page, inspired by
[convexsplatting.github.io](https://convexsplatting.github.io/) and the
Nerfies / DreamFusion template.

## Structure

```
.
├── index.html                  # Main page — all text uses *_PLACEHOLDER tokens
├── static/
│   ├── css/index.css           # Styles
│   ├── images/                 # Placeholder SVGs (replace with your own assets)
│   │   ├── favicon.svg
│   │   ├── teaser_placeholder.svg
│   │   ├── pipeline_placeholder.svg
│   │   ├── result_1_placeholder.svg …
│   │   └── comparison_placeholder.svg
│   ├── videos/                 # Put your teaser/results video here
│   └── pdfs/                   # Put your report PDF here
├── .nojekyll                   # Tells GitHub Pages to skip Jekyll
└── README.md
```

## How to fill in content

Open `index.html` and search for `PLACEHOLDER`. Every token that ends with
`_PLACEHOLDER` is meant to be replaced with your real content (title, authors,
abstract paragraph, captions, links, metrics, BibTeX fields, etc.).

For images/videos, either:
- replace the placeholder files in `static/images/` / `static/videos/` with
  files of the same name, **or**
- edit the `src="..."` attribute in `index.html` to point to your new file.

## Preview locally

```bash
cd project_webpage
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `my-project-page`).
2. From this directory, push the files:
   ```bash
   git init
   git add .
   git commit -m "Initial project page"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source** = `Deploy from a branch`, **Branch** = `main` / `(root)`, then Save.
4. Wait ~1 min. Your page will be live at
   `https://<YOUR_USERNAME>.github.io/<REPO>/`.

> The `.nojekyll` file ensures GitHub Pages serves files under `static/` as-is
> (otherwise Jekyll ignores folders starting with `_`).
