# NovoMara

Website remake of Mária Novotná's supplied architecture and research portfolio.

Current branch: `codex/start`. Work is local in this checkout, also opened in VS Code.

## First local website

The portfolio is implemented as an English-only static website in `site/`, with 15 pages and no language selector. It includes an editable landing page, the dedicated [History of Mountain Hut Architecture page](site/projects/history-of-mountain-hut-architecture/index.html), separate manual Research and Practice slideshows, thirteen individual project pages, and home publications, downloadable/collapsible CV and contact sections. Research has seven projects; Practice has six, including the four projects from source pages 32–35. The site remains local; deployment has not started.

With Node.js and npm available, run these commands from this checkout:

```powershell
npm run dev
```

Open [the local portfolio](http://127.0.0.1:4317/) or [the mountain research page](http://127.0.0.1:4317/projects/history-of-mountain-hut-architecture/). The server binds to the local computer. Set `PORT` if another port is needed.

```powershell
npm run build
npm run preview
```

`build` recreates ignored `dist/`, copies the current assets and regenerates all 15 English pages and SEO. Obsolete generated source pages are excluded from the build; source files remain intact. `preview` serves that build at the same default address. Run one server at a time on a given port. There are no package dependencies to install. The direct equivalents are `node scripts/serve.mjs`, `node scripts/build.mjs`, and `node scripts/serve.mjs dist`.

## GitHub approval preview

The prepared [approval workflow](.github/workflows/approval-preview.yml) tests, builds and deploys GitHub Pages on pushes to `codex/start`. Enable **Settings → Pages → Source → GitHub Actions** in the existing GitHub repository, then commit and push the changes. The expected approval URL is `https://dorotakortisova.github.io/NovoMara/`; it is not live until a successful deployment. It needs no custom domain. The build supports the repository path for navigation, project pages, images and the CV download, and explicitly retains `noindex` for this approval version. The link is public, with indexing discouraged by its page metadata. See [approval-preview setup](docs/approval-preview.md) for the steps and a local equivalent.

## Presentation and interaction

The revised styling uses warm paper tones and thin rules. Arial/Helvetica provides body text; Courier New provides the header/footer name and typewriter-style navigation, labels, captions and small controls; Georgia/Times New Roman provides selected italic emphasis. The name uses a regular 16px weight with natural letter spacing. These built-in font stacks deliver no font files to visitors.

The PhD page opens with a compact overview combining its title, short public research question, metadata and landscape photograph; the full source question and methods are expandable. Sticky contents provide seven links: Overview, History, Case studies, Comparative analysis, Findings, Related discourse and Selected publications. Case studies retain Téry Hut and the Contemporary Reflections group, with separate Rysy and Sliezsky dom subsections. Comparisons are organized around form and structure, spatial layout, and materials and prefabrication. Three concise source-grounded findings precede a smaller related lecture-series section with its visible period and expandable roles, dates and credits. All 14 existing project images are preserved; the footer avatar is separate. The user's latest instruction restores the dedicated four-publication list after Related discourse; the home list is unchanged.

At widths of at least 900px and heights of at least 580px, both project slideshows use a compact notebook frame: one image with thumbnail selectors beside the project information. Full project copy remains in a scrollable details area, with expandable credits. Mobile and shorter windows show all images for the active project in the normal reading flow.

Project images retain their natural aspect ratios and only scale down to fit their available space, including thumbnails and the image viewer. Small COOL Nouveau visuals retain their intrinsic size limits. The footer portrait uses a circular display crop; its source image is unchanged. Project selection stays manual, with direct selectors, keyboard controls and touch gestures.

After the flagship feature, Research retains the `#selected-projects` anchor for existing links; Practice follows at `#practice`. The home `#publications` section follows Practice and lists four publications from the user's referenced website: The Taming of the Wild (2025), Tatras Phoenix (2023), Alpine Huts on the second half of the twentieth century (2023), and the Téry Hut study (2022). The `#cv` section follows publications with the original four-page May 2026 PDF and a collapsible web adaptation. The following `#contact` section contains the “Continue the conversation” heading and an email draft form addressed to `maria.novotna27@gmail.com`; the temporary test recipient has been removed. The recipient is not displayed as a direct contact link. The form opens the user's email application through `mailto`; it has no backend, automatic sending or storage. Headers on both pages link to the home sections. A small circular portrait from `IMG_0208.jpg` appears beside Mária's name in both page footers.

## Editing and content references

- Landing, Research, Practice, publication and contact copy: [site/index.html](site/index.html).
- Research chapters: [dedicated project page](site/projects/history-of-mountain-hut-architecture/index.html).
- Shared presentation: [styles](site/assets/styles.css) and [interaction script](site/assets/portfolio.js).
- PhD-page presentation: [research styles](site/assets/research.css), loaded only on the dedicated page.
- Web images: `site/assets/images/`.
- CV web content: `content/cv.html`; original download: `site/assets/documents/2026_CV_novotna.pdf`.
- Public-origin configuration: `content/seo-config.json`.
- [SEO setup, generation and domain activation](docs/seo.md).

Run `npm run prepare` after edits to refresh local project pages, and `npm test` for the SEO/link/download checks. The domain is undecided: previews stay noindex and canonical/sitemap output activates when a public HTTPS origin is configured. Page metadata, structured data and source-grounded Slovak, Czech and international regional context remain. No deployment or Search Console submission has been performed.

- [Content map and website direction](docs/content-map.md)
- [Detailed source audit](docs/source-content-audit.md)
- [Project structure](docs/project-map.json)
- [Original asset mapping](docs/asset-map.json)
- [Website and CV font licensing review](docs/licensing-review.md)

The content documents preserve source references and decision history. The expanded selection supersedes the original five-project selection: pages 28–31 join Research, pages 32–35 join Practice, and Visitors centre and Public square move to Practice without duplicates. Only pages 37–38 remain reserved by the earlier explicit exclusion. All thirteen Research/Practice projects have separate English pages and crawlable selectors plus View project links. The user's latest English-only instruction supersedes the earlier multilingual direction; language controls, translated routes and language alternates are removed while the CV and technical SEO remain.

## Sources

The source folder is `C:\Users\mariu\Desktop\Maria\PORTFOLIO`. The previously exported Affinity document is kept locally as `.source/portfolio/2026 architrekt research practise.pdf` (40 pages), with extracted text and rendered previews beside it. The expanded Research and Practice content uses this existing export; no fresh Affinity export was obtained for the additions.

Original `Images.zip` assets are extracted to `.source/images`; `Fonts.zip` to `.source/fonts`. Source archives on the Desktop are preserved. Inventories and contact sheets are under `.source/`. These working sources are ignored by Git. Selected archive assets have been optimized into WebP files under `site/assets/images/`.

The site contains 54 WebP images plus the user-supplied `site/assets/images/IMG_0208.jpg` footer portrait. The original 34-image provenance manifest remains unchanged at `.source/web-assets-manifest.json`. The 20 additions from pages 28–35 are recorded separately in `.source/additional-web-assets-manifest.json` and previewed in `.source/contact-sheets/additional-projects.jpg`. The portrait remains separate from the portfolio archive and both WebP manifests.

COOL Nouveau's six images were absent from `Images.zip`. With the user's approval, the embedded visuals on page 24 of the current Affinity export were extracted individually and saved as `cool-1.webp` through `cool-6.webp`; the site does not use a full-page screenshot. Their source resolution and aspect ratios are preserved. Asset provenance is recorded locally in `.source/web-assets-manifest.json`, with an approved-image contact sheet at `.source/contact-sheets/cool-approved-embedded.jpg`.

The latest source-addition task also authorizes using embedded visuals from pages 28–35 where originals are unavailable. The House ISB gallery uses the clean garden rendering from `PDFsam_merge 74.tif` alongside clear source plans, avoiding the defective flat cyan visual. Its visual association remains a candidate because source-link metadata is unavailable. Low-resolution embedded visuals and unresolved source defects remain recorded for later replacement.

Portfolio content comes from the supplied portfolio, with page references recorded in the audit. Landing wording is an authorized editable draft, and project summaries are concise adaptations of the source. The original cover supplied no contact details; the user later provided the reference website at `http://localhost:4321/#research`. Its newer saved source in the parent workspace, `tmp/main-sync/src/pages/index.astro` and `tmp/main-sync/src/scripts/site.js`, supplies the home publication citations and contact email. These additions follow that reference without claiming a new independent bibliographic verification. Missing originals remain recorded in the asset map; Alps/Rockies and USA national-park research stay outside the website as agreed.
