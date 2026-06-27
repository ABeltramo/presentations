# AGENTS.md

Instructions for AI agents working in this repository.

## What this repo is

A collection of presentations written in Markdown and built to HTML with [Marp](https://marp.app/). GitHub Actions publishes them to GitHub Pages on every push to `main`.

## Directory layout

```
src/<category>/<sub-category>/<topic>/slides.md   # presentation source
src/<category>/<sub-category>/<topic>/img/        # images referenced by slides.md
themes/dark.css                                    # shared Marp theme
.github/workflows/build.yml                       # CI: build + deploy
```

## Adding a presentation

1. Create `src/<path>/slides.md` with this front matter:
   ```yaml
   ---
   marp: true
   theme: redhat
   title: Your Title
   paginate: true
   ---
   ```
2. Separate slides with `---`
3. Place images in `img/` next to `slides.md` and reference them as `./img/filename`

## Build

```bash
npm install
npm run build    # outputs to dist/ (gitignored)
npm run preview  # live server at http://localhost:8080
```

## Theme

- The shared theme is `themes/dark.css`. Modify it to change the look globally.
- Per-deck overrides go in a `<style>` block inside the `.md` file.
- Syntax highlighting uses highlight.js token classes (`.hljs-keyword`, `.hljs-string`, etc.) defined in the theme.
- Two-column layouts use `<div class="columns">` / `<div class="columns-wide">` (HTML is enabled via `--html`).

## CI

The workflow in `.github/workflows/build.yml`:
1. Runs `npm run build` (Marp converts all `src/**/*.md` → `dist/`)
2. Copies non-Markdown assets from `src/` to `dist/`
3. Auto-generates `dist/index.html` listing all built decks
4. Deploys `dist/` to GitHub Pages

No manual updates needed when adding or removing presentations.
