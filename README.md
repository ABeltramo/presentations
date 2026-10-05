# Presentations

Slides written in Markdown, automatically built with [Marp](https://marp.app/) and deployed to GitHub Pages.

## Adding a presentation

1. Create a folder under `src/` using the path convention `src/<category>/<sub-category>/<topic>/`
2. Add a `slides.md` file with this front matter:

```markdown
---
marp: true
theme: redhat
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
theme: redhat
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

The repository includes three themes:

| Theme | File | Style |
| --- | --- | --- |
| `dark` | `themes/dark.css` | Dark GitHub-style palette |
| `redhat` | `themes/redhat.css` | Navy-purple backgrounds and red accents |
| `asago` | `themes/asago.css` | Navy backgrounds with blue and teal accents |

All local commands and the CI build support these themes.

### asago

The asago logo appears in the top-right corner of every slide.
The CSS embeds a lossless WebP copy of `themes/asago-main-logo-dark.png` for local previews and GitHub Pages.

The asago theme uses these colors from the supplied screenshot:

| Role | Color |
| --- | --- |
| Slide background | `#020617` |
| Card background | `#0D1627` |
| Teal card background | `#071923` |
| Border | `#1E293B` |
| Heading text | `#F8FAFC` |
| Body text | `#94A3B8` |
| Blue accent | `#2D7FF9` |
| Teal accent | `#0DD4A0` |

Set `theme: asago` in the front matter:

```markdown
---
marp: true
theme: asago
title: My asago Presentation
paginate: true
footer: asago — AI Safety And Governance Orchestration
---

# Pipeline Architecture *Key Concerns*

<p class="subtitle">What are your hard deployment requirements?</p>

<div class="columns">
<div class="card">

<span class="label">Hard requirements</span>

### No Deployment Assumptions

- Support multiple deployment environments.

</div>
<div class="card teal">

<span class="label">Decisions needed</span>

### Key Discussion Points

- Define community requirements.

</div>
</div>
```

The theme displays italic text in slide headings as a teal accent without italics.
The `title` class centers a title slide.
The footer is optional.
Red, yellow, and purple supplement the screenshot palette for status messages and syntax tokens.

### Per-deck overrides

Add a `<style>` block to your Markdown:

```markdown
<style>
section { background: #1a1a2e; }
</style>
```

## GitHub Pages setup

After the first push, enable GitHub Pages in **Settings → Pages → Source → GitHub Actions**.
The live index will be at `https://<org>.github.io/<repo>/`.
