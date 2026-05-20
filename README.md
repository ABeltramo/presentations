# Presentations

Slides written in Markdown, automatically built with [Marp](https://marp.app/) and deployed to GitHub Pages.

## Adding a presentation

1. Create a folder under `src/` using the path convention `src/<category>/<sub-category>/<topic>/`
2. Add a `slides.md` file with this front matter:

```markdown
---
marp: true
theme: dark
title: Your Presentation Title
paginate: true
---
```

3. Separate slides with `---`
4. Put images in an `img/` subfolder next to `slides.md`
5. Push to `main` — GitHub Actions builds and deploys automatically

## Slide syntax

```markdown
---
marp: true
theme: dark
title: My Talk
paginate: true
---

<!-- _class: title -->
# Title Slide
Subtitle text here

---

## Second slide

Content goes here. Use `##` to start each new slide.

- Bullet one
- Bullet two

> Blockquote renders with a red left border

![Description](./img/screenshot.png)
```

### Two-column layout

Use raw HTML (enabled via `--html`):

```html
<div class="columns">
<div>

Left column content

</div>
<div>

Right column content

</div>
</div>
```

## Local development

```bash
npm install

# Watch mode — rebuilds on save, open http://localhost:8080
npm run preview

# One-shot build to dist/
npm run build
```

## Theme

The shared theme lives in `themes/dark.css`. It uses a dark GitHub-style palette. To customise per-deck, add `style` blocks directly in your Markdown:

```markdown
<style>
section { background: #1a1a2e; }
</style>
```

## GitHub Pages setup

After the first push, enable GitHub Pages in **Settings → Pages → Source → GitHub Actions**.
The live index will be at `https://<org>.github.io/<repo>/`.
