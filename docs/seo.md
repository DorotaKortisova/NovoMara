# Search setup

The portfolio has 15 English static HTML pages: home, the flagship PhD project and thirteen Research/Practice project pages. The user's latest instruction supersedes the earlier multilingual direction. Language selectors, translated routes, localization dictionaries and language alternates are removed. Official project names, published paper titles and citations retain their original names. Projects have normal crawlable links and work without a JavaScript-only routing system.

## Subjects and regional context

The page content and structured data cover mountain huts and tourism, architectural history, twentieth-century modernism, heritage preservation, climate adaptation, adaptive reuse, conferences, exhibition design, housing, apartment and house renovation, interiors, student accommodation and public space. Regional statements use the supplied projects: High/Low Tatras, Demänovská dolina, Bratislava, Malacky and Trenčín in Slovakia; House ISB near Brno in Czechia; field studies in France, Switzerland and Sri Lanka. The later supplied CV also documents academic exchange in the USA, Switzerland, Israel and India. The site does not invent offices, regulated qualifications, project locations, clients or service-area guarantees.

This regional context remains in English page content and SEO. Equivalent Slovak/Czech native-language search coverage is not claimed. Person.knowsLanguage preserves source-supported CV language skills; it does not describe translated website versions.

The user removed the added standalone regional-promotion paragraphs from the hero and Contact. Regional context continues through factual project descriptions, locations and the CV; page metadata and structured data are preserved.

Each page has a descriptive title, a source-grounded description, social preview metadata and JSON-LD. The homepage identifies a Person, WebSite and ProfilePage; project pages describe a CreativeWork, WebPage and BreadcrumbList. Contribution is represented without assigning sole authorship of collaborative work. Public project credits remain visible. This follows Google's advice to keep titles descriptive and consistent with the page language, and to make structured data describe the visible page. See [title guidance](https://developers.google.com/search/docs/appearance/title-link) and [structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

## Public domain and indexing

The user has not chosen a domain. `content/seo-config.json` therefore keeps `siteUrl` empty. Local/pre-deployment output has `noindex,follow`, no fabricated canonical or sharing URLs, and no placeholder sitemap. This is preparation for publication; localhost is not a publicly indexed website.

When the public domain is chosen, set `siteUrl` to its HTTPS origin in that configuration, or provide the `SITE_URL` build environment variable. Then run `npm run build`. A configured build emits self-referencing canonical URLs, absolute social-image URLs, an XML sitemap of all 15 English pages, an accompanying `robots.txt` sitemap URL, and `index,follow,max-image-preview:large`. It emits no hreflang or language alternates. Fragment-only chapters do not become sitemap pages. Google's [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) explains discovery and submission.

Publication, domain verification and Search Console submission have not been performed. After deployment, verify the chosen property and submit its real sitemap; inspect important URLs and measure search performance. No ranking, traffic or rich-result outcome has been established by local checks.

## Editing and validation

- Edit English portfolio content in `site/index.html` and the flagship source page. Edit the CV fragment in `content/cv.html`.
- `scripts/prepare-site.mjs` generates the other English project pages, inserts the managed SEO head, and adds the CV before Contact. Do not hand-edit generated project pages.
- Run `npm run prepare` to refresh local output; `npm run dev` prepares before starting the server. `npm run build` recreates `dist/` from current assets and generated pages using the configured origin; it excludes retired generated source HTML and removes obsolete output assets.
- Run `npm test` for origin/preview safeguards, English-only output without language controls or alternates, valid JSON-LD, all 15 page links/assets, one main heading, unique metadata, CV placement, unchanged download bytes, repeat-build cleanup and repository-path approval links.

The [GitHub approval preview](approval-preview.md) deliberately forces `siteUrl` empty whenever `PREVIEW_BASE_PATH` is supplied, including an empty path. This keeps review deployments noindex even if a real production origin is later configured. It adds the GitHub repository path to local links and assets without changing authoring HTML. Remove the preview override from the deployment workflow when publishing an approved production site.

The CV is the user's original four-page `2026_CV_novotna.pdf`, dated May 2026, copied unchanged to `site/assets/documents/`. Its collapsible English web version groups all the main source areas into readable sections; it is an editorial adaptation rather than a literal transcription. Dates and activities are explicitly tied to that source version, including its listed July 2026 conference activity. The English PDF and web content are preserved by the latest language change.
