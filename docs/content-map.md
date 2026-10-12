# Portfolio content map

Content map for the local English-only website, based on the user's approved Research and Practice grouping and the existing 40-page Affinity export. It has 15 pages and no language options. No fresh Affinity export was obtained for the expanded scope. The implementation is in `site/`; the site has not been deployed.

## Decisions received

- English remains the sole website language by the user's latest instruction, superseding the earlier multilingual direction. Source-supported Slovak, Czech and international subjects and places remain part of its English content and SEO.
- Draft landing copy from the supplied context, to be adjusted together later.
- Treat the PhD research as one main project with its own page.
- The initial five-project slideshow order is historical. The user's latest approval supersedes that selection with separate Research and Practice sections and includes source pages 28–35.
- Preserve the portfolio's visual character while adapting readability and interaction to the web.
- Keep Alps/Rockies and USA national-park research outside the first version.
- Group the reflections under the main mountain architecture project, including the page 23 lecture/discourse material as related work.
- Use the six embedded COOL Nouveau visuals from page 24, with explicit user approval, because matching originals are absent from `Images.zip`.
- The latest source-addition task also authorizes embedded visuals from pages 28–35 when archive originals are unavailable; retain source-resolution and rendering caveats.
- Add home publications and contact sections following the user's referenced website at `http://localhost:4321/#research`, using its newer saved source. Display the user-supplied `IMG_0208.jpg` portrait as a circular avatar beside Mária's name in both page footers.

## Website structure

| Position | Website content | Source pages | Presentation |
|---|---|---|---|
| 1 | Landing: Mária Novotná | 1, plus selected supplied project material | An introduction and entries to the PhD project, Research and Practice. |
| 2 | History of Mountain Hut Architecture | 2–17, 23, 39–40 | A featured introduction on the landing page and one dedicated project page. |
| 3 | Research | 18–22, 24, 28–31 | Seven projects in a manual slideshow at `#selected-projects`. |
| 4 | Practice | 25–26, 32–35 | Six projects in a separate manual slideshow at `#practice`. |
| 5 | Selected publications | Related outcomes on 2, 7, 11, 18; citation presentation from the user-referenced website | Four linked publication rows at `#publications`. |
| 6 | CV | User-supplied May 2026 four-page CV | PDF download and collapsible web adaptation at `#cv`, before Contact. |
| 7 | Contact | User-referenced website; absent from the original cover | “Continue the conversation” heading and email draft form at `#contact`. |

The landing page is implemented at `/`. After the PhD feature at `#research`, the Research slideshow keeps `#selected-projects` for link compatibility. Practice follows at `#practice`, then `#publications`, `#cv` and `#contact`. Each slideshow has direct project selectors and independent Previous/Next controls. Headers on both pages link to the home sections.

| Research order | Project | Source pages |
|---|---|---|
| 1 | The Valley | 18–21 |
| 2 | Modernism Revisited 2026 | 22 |
| 3 | COOL Nouveau | 24 |
| 4 | Flaine / Sri Lanka | 28 |
| 5 | Capanna Cristallina | 29 |
| 6 | Vladimír Dedeček — interpretation of his architecture | 30 |
| 7 | Residential buildings | 31 |

| Practice order | Project | Source pages |
|---|---|---|
| 1 | Visitors centre Demänovská dolina | 25 |
| 2 | Revitalization of a public square | 26 |
| 3 | Apartment 7-3-to-4 | 32 |
| 4 | House ISB | 33 |
| 5 | Alaš | 34 |
| 6 | Dormitory | 35 |

Visitors centre and Public square are moved into Practice, without duplicate entries in Research. The flagship and its chapters remain intact.

The slash-separated line `Mountain Solitudes / FAD / Innovation in architecture of 20th century in Slovakia` stays with the PhD project. `FAD / SAV / Pre Dolinu / Fulbright visiting research` stays with The Valley. These lines do not create additional top-level projects.

## Main project: History of Mountain Hut Architecture

Implemented route: `/projects/history-of-mountain-hut-architecture/`, from `site/projects/history-of-mountain-hut-architecture/index.html`.

| Page section / anchor | Source material and hierarchy |
|---|---|
| Overview / `#overview` | Compact header with title, short public question and metadata from page 2, with the landscape photograph alongside the introduction. The full source question and methods are expandable; project period and historical study dates remain distinct. |
| History / `#history` | Pages 3–6: architectural analysis, hut locations, periodisation and ownership; pages 39–40 retain their source classification as related historical diagrams. |
| Case studies / `#case-studies` | Contains Téry Hut at `#tery-hut` (pages 7–10) and the Contemporary Reflections restoration group at `#contemporary-reflections` (pages 11–13). The latter retains nested `#rysy-hut` and `#sliezsky-dom` subsections. |
| Comparative analysis / `#architecture-in-the-mountains` | Pages 14–17, organized into three image/text groups: form and structure; spatial layout; materials and prefabrication. |
| Findings / `#findings` | Three concise editorial adaptations of complete source conclusions on pages 2, 11 and 14–17: environment shapes form; isolation shapes construction and use; restoration preserves environmental logic. |
| Related discourse / `#reflections-on-architecture` | A smaller section for the page-23 lecture/publication series, with its 2020–2024 period visible and its affiliation, director and Mária's contributions under the native expandable “Roles, dates & credits.” It stays under this project by user instruction without implying it is formally a thesis component. |
| Selected publications / `#publications` | Restored after Related discourse by the user's latest instruction, under `05 / Research outcomes`. Four publication outcomes from source pages 2, 7 and 11. |

Sticky responsive contents provide seven links: Overview, History, Case studies, Comparative analysis, Findings, Related discourse and Selected publications. Téry Hut and the two Contemporary Reflections buildings retain direct nested anchors. Building dates, historical drawing dates and research periods remain distinct: Téry's 1899 building date differs from its 2020–2022 research, and the restoration group's 2022–2024 period does not date each renovation. The 1933 Rysy drawing retains its source caption.

The seven targets are the `#overview` header and the six following sections. The dedicated page loads `site/assets/research.css` alongside the shared styles, scoped through `phd-document` and `phd-page`. All 14 existing project images remain in the reorganized page, alongside the separate footer avatar; the asset set is unchanged.

The earlier removal of the dedicated Selected publications section is superseded by the user's latest instruction to restore its original four entries: the Alpine Huts first-half study (`10.2478/alfa-2022-0002`), the second-half study (`10.2478/alfa-2023-0005`), the Téry Hut study (`10.31577/archandurb.2022.56.1-2.10`) and Tatras Phoenix (`10.30682/aa2310r`). The sticky contents link targets this page's `#publications`; the global header still links to the unchanged four-entry home list. “Continue to research projects” returns to the home Research section. The supplied project/affiliation line remains secondary to the readable title. Captions and material descriptions stay grounded in the supplied source.

Page 40's chart remains in the source inventory but is omitted from the website imagery because its current rendering contains a large black diagonal band. The first version uses selected supplied archive drawings and photographs for the other chapters; it does not reproduce the defective page 4 or page 8 renders. Missing charts and archival imagery stay recorded in the asset map.

## The Valley

Core source pages 18–21 comprise the overview, Held Captive by the Tourism Industry, Taming of the wild, and Jasná. This is one project.

Pages 37–38 show Alps/Rockies comparison and USA national-park research, dated 2024–25. The user has decided to keep these separate and outside the first version.

## Research and Practice layout

At widths of at least 900px and heights of at least 580px, both project slideshows use a compact notebook frame within the available viewport. One image is shown at a time, with thumbnail selectors beneath it and the project information alongside it. Full project copy and metadata remain in a scrollable details area; supplied credits can be expanded.

Mobile and shorter windows show all images for the active project in the normal reading flow. Project text, metadata and credits remain real HTML. Linked project images open in an image viewer, with direct image links as the fallback.

Images use automatic dimensions, retain their natural aspect ratios and only scale down to fit. The same limits apply to the desktop gallery, thumbnails and image viewer, including the smaller COOL Nouveau visuals.

Each project uses one slide with selected imagery, concise source-grounded text, metadata and supplied credits. Collaborative teams and contributions remain available under expandable credits. Project imagery uses available archive originals and authorized embedded visuals from export page 24 and pages 28–35. The footer portrait was supplied separately by the user.

All thirteen separate Research/Practice routes are implemented in English and recorded in schema version 3 of `project-map.json`. Crawlable project selectors retain their slideshow behavior with JavaScript; View project links lead to full pages. Together with home and the flagship, these make 15 English pages. The latest instruction removes translated routes and language switching.

## Home publications and contact

The home publication list follows the newer saved version of the user's reference website in the parent workspace, `tmp/main-sync/src/pages/index.astro`. Its four entries remain unchanged by the restoration of the separate PhD publication list.

The home section uses a compact heading with natural wrapping and tighter responsive spacing while preserving all four complete publication entries and citations.

| Year | Publication | Link |
|---|---|---|
| 2025 | The Taming of the Wild | `https://doi.org/10.31261/FLPI.2025.10.16` |
| 2023 | Tatras Phoenix: Architecture of Restoration in the Alpine Environment of the High Tatras | `https://doi.org/10.30682/aa2310r` |
| 2023 | Alpine Huts: Architectural Innovations and Development in the High Tatras in the Second Half of the 20th Century | `https://doi.org/10.2478/alfa-2023-0005` |
| 2022 | The Mountain Lodge Téry Hut: Innovations in Alpine-Zone Architecture | `https://doi.org/10.31577/archandurb.2022.56.1-2.10` |

The displayed citations follow that supplied reference; this addition does not constitute independent bibliographic verification. The portfolio export also records these publication outcomes on pages 2, 7, 11 and 18.

Contact follows publications with the “Continue the conversation” heading and email draft form. Its recipient is `maria.novotna27@gmail.com`, without a separate name or direct email link under the heading. The email comes from the reference's newer saved interaction script, `tmp/main-sync/src/scripts/site.js`; it was absent from the original portfolio cover.

The user-supplied `site/assets/images/IMG_0208.jpg` appears as a small circular portrait beside Mária's name in both page footers. Only its display is cropped; the JPEG remains unchanged, and project images retain their natural proportions.

The contact form accepts name, email and message, validates required fields and prepares an encoded `mailto` draft. It opens the user's email application and has no backend, automatic sending or storage.

## Visual direction

Observed source characteristics: white backgrounds, black sans-serif text, substantial empty space, thin table rules, structured research metadata, large photographs, architectural drawings and occasional color within the work itself.

The revised styling uses warm paper tones, muted ink and thin rules. Typography uses Arial/Helvetica for body text and form inputs, Courier New for the header/footer name and typewriter-style navigation, labels, captions and small controls, and Georgia/Times New Roman for selected italic emphasis. Header and footer names share a regular 16px monospace style with natural letter spacing. Spacing and responsive layouts adapt the dense print columns for reading; the supplied source font files remain inventoried separately.

Implemented slideshow behavior includes manual Previous/Next buttons, current project and count, direct title selection, left/right keyboard navigation, touch swipes in the image area, screen-reader announcements and project hash links. The compact desktop image gallery adds thumbnail selection and an image count. It does not advance automatically. Focus is restored when a project or image change would hide the focused content. The site also has a skip link, visible keyboard focus, mobile navigation and reduced-motion styling. These choices follow [W3C WAI carousel guidance](https://www.w3.org/WAI/tutorials/carousels/).

## Draft landing copy

The following editable editorial copy is authorized by the user and implemented on the landing page. It is not quoted from the source or a new biographical claim.

**Name:** Mária Novotná

**Heading:** Architecture, research & landscapes.

**Introduction:** Architectural research and design by Mária Novotná, connecting mountain architecture, modernist heritage and landscape with exhibitions, housing, interiors and public space.

The original landing actions were **Explore the research · Selected projects**. The expanded organization provides separate Research and Practice entries while keeping the existing Research anchor compatible.

The current source cover reads `research & projects`, with `portfolio` and `Mária Novotná`. That wording remains in the website wordmark. The implemented opening uses `uvod.webp`, optimized from the supplied `uvod.jpg` collage; that image choice is editorial and does not imply it appeared on the source cover.

## Reserved content

| Source pages | Content | Current status |
|---|---|---|
| 37–38 | Alps/Rockies comparison and USA national parks | Separate and outside the first version, by user decision. |
| 27, 36 | Closing/separator pages | No independent website project. |

## Local development and assets

Run `npm run dev` from the repository to serve `site/` at `http://127.0.0.1:4317/`. `npm run build` recreates ignored `dist/` from the current assets and 15 generated pages, removing stale output without copying retired HTML from `site/`. `npm run preview` serves that build at the same default address. The scripts use Node.js built-ins and have no package dependencies. The [GitHub approval-preview workflow](approval-preview.md) supports the repository subpath and forces noindex while the final domain awaits approval.

The supplied image archive has 63 visual assets, plus four font files in the separate font archive. Originals remain in ignored `.source/` staging. The site now contains 54 WebP files plus the separate user-supplied `IMG_0208.jpg` footer portrait. The original 34 WebP files comprise 28 selected archive assets and six individually extracted, approved COOL Nouveau images from export page 24. The expanded sections add 20 visuals from pages 28–35. Conversion preserves aspect ratio, does not enlarge source imagery, and limits the maximum edge to 2,000 pixels. Some supplied PDF drawings use a rendered first page as their conversion input.

The original `.source/web-assets-manifest.json` remains unchanged. Expanded asset provenance and dimensions are recorded separately in `.source/additional-web-assets-manifest.json`, with a preview at `.source/contact-sheets/additional-projects.jpg`; the JPEG portrait is separate from both manifests. The COOL extraction is previewed in `.source/contact-sheets/cool-approved-embedded.jpg`. Embedded additions are authorized by the latest source-addition task and retain their source resolution.

House ISB uses the clean garden rendering from `PDFsam_merge 74.tif` and clear source plans instead of the defective flat cyan visual. The garden image is visually consistent with the source photographs and plans but remains a candidate association because source-link metadata is unavailable. Missing higher-resolution originals and other export defects remain source-quality issues.

No contact address, biography or social profile is supplied on the current cover. The implemented contact section uses the email supplied later through the user's reference website; the separately supplied portrait appears in the footers. Supplied project credits and publication links are included; later copy review can refine their presentation while preserving their source references.

## SEO and CV additions

The latest instruction keeps all 15 pages in English, with source-grounded regional context, distinct metadata and structured data. The earlier multilingual direction is superseded; translated pages, language controls, hreflang and language alternates are removed. The public domain is undecided; [SEO setup](seo.md) records configuration, preview noindex and production canonical/sitemap behavior. Regional relevance remains grounded in the supplied projects and CV, without claiming equivalent Slovak/Czech native-language search coverage.

The later editorial cleanup removes the added standalone regional-promotion paragraphs from the hero and Contact. The main introduction, factual project locations and copy, CV, metadata and structured data remain unchanged.

The user supplied `C:/Users/mariu/Desktop/Maria/2026_CV_novotna.pdf` and requested a CV section before Contact. The original English four-page PDF is copied unchanged to the public document assets. The initially collapsed English web version at `#cv` covers the profile, education, research, teaching, practice, funding, projects, academic activities, competitions, publications, methods, skills, memberships and interests. It keeps the May 2026 source date; published titles remain in their original language. Source-supported language skills remain CV facts, including Person.knowsLanguage structured data, rather than website language options.
