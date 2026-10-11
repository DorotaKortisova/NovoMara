# NovoMara

Website remake of Mária Novotná's supplied architecture and research portfolio.

Current branch: `codex/start`. Work is local in this checkout, also opened in VS Code.

## First local website

The first English version is implemented as a static website in `site/`. It includes an editable landing page, the dedicated [History of Mountain Hut Architecture page](site/projects/history-of-mountain-hut-architecture/index.html), and a manual slideshow for the five selected projects. The site remains local; deployment has not started.

With Node.js and npm available, run these commands from this checkout:

```powershell
npm run dev
```

Open [the local portfolio](http://127.0.0.1:4317/) or [the mountain research page](http://127.0.0.1:4317/projects/history-of-mountain-hut-architecture/). The server binds to the local computer. Set `PORT` if another port is needed.

```powershell
npm run build
npm run preview
```

`build` copies the static site to ignored `dist/`; `preview` serves that copy at the same default address. Run one server at a time on a given port. There are no package dependencies to install. The direct equivalents are `node scripts/serve.mjs`, `node scripts/build.mjs`, and `node scripts/serve.mjs dist`.

## Presentation and interaction

The revised styling uses warm paper tones, thin rules, monospace labels, sans-serif text and selected italic serif emphasis. Typography uses the built-in Arial/Helvetica, Courier New and Georgia/Times New Roman font stacks.

At widths of at least 900px and heights of at least 580px, selected projects use a compact notebook frame: one image with thumbnail selectors beside the project information. Full project copy remains in a scrollable details area, with expandable credits. Mobile and shorter windows show all images for the active project in the normal reading flow.

Every image retains its natural aspect ratio and only scales down to fit its available space, including thumbnails and the image viewer. Small COOL Nouveau visuals retain their intrinsic size limits. Project selection stays manual, with direct selectors, keyboard controls and touch gestures.

## Editing and content references

- Landing and selected-project copy: [site/index.html](site/index.html).
- Research chapters: [dedicated project page](site/projects/history-of-mountain-hut-architecture/index.html).
- Shared presentation: [styles](site/assets/styles.css) and [interaction script](site/assets/portfolio.js).
- Web images: `site/assets/images/`.

- [Content map and website direction](docs/content-map.md)
- [Detailed source audit](docs/source-content-audit.md)
- [Project structure](docs/project-map.json)
- [Original asset mapping](docs/asset-map.json)

The content documents preserve the approved scope, source page references, project order and assets still held outside the first version. Future separate pages for the five selected projects remain planned; their `More` links will be added when those pages exist.

## Sources

The source folder is `C:\Users\mariu\Desktop\Maria\PORTFOLIO`. The open Affinity document was exported locally for inspection as `.source/portfolio/2026 architrekt research practise.pdf` (40 pages). Its extracted text and rendered page previews are kept beside it.

Original `Images.zip` assets are extracted to `.source/images`; `Fonts.zip` to `.source/fonts`. Source archives on the Desktop are preserved. Inventories and contact sheets are under `.source/`. These working sources are ignored by Git. Selected archive assets have been optimized into WebP files under `site/assets/images/`.

COOL Nouveau's six images were absent from `Images.zip`. With the user's approval, the embedded visuals on page 24 of the current Affinity export were extracted individually and saved as `cool-1.webp` through `cool-6.webp`; the site does not use a full-page screenshot. Their source resolution and aspect ratios are preserved. Asset provenance is recorded locally in `.source/web-assets-manifest.json`, with an approved-image contact sheet at `.source/contact-sheets/cool-approved-embedded.jpg`.

Content comes from the supplied portfolio, with page references recorded in the audit. Landing wording is an authorized editable draft, and project summaries are concise adaptations of the source. Contact details are omitted because none were supplied. Other missing originals remain recorded in the asset map; additional material stays outside the first version as agreed.
