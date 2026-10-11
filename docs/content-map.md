# Portfolio content map

Content map for the first local English website, based on the user's selected project groups and the current 40-page Affinity export. The implementation is in `site/`; the site has not been deployed.

## Decisions received

- Use English for the first version.
- Draft landing copy from the supplied context, to be adjusted together later.
- Treat the PhD research as one main project with its own page.
- Use the five other selected projects in the requested slideshow order.
- Preserve the portfolio's visual character while adapting readability and interaction to the web.
- Keep Alps/Rockies and USA national-park research outside the first version.
- Group the reflections under the main mountain architecture project, including the page 23 lecture/discourse material as related work.
- Use the six embedded COOL Nouveau visuals from page 24, with explicit user approval, because matching originals are absent from `Images.zip`.

## Website structure

| Position | Website content | Source pages | Presentation |
|---|---|---|---|
| 1 | Landing: Mária Novotná | 1, plus selected supplied project material | An introduction, entry to the PhD project, and entry to selected projects. |
| 2 | History of Mountain Hut Architecture | 2–17, 23, 39–40 | A featured introduction on the landing page and one dedicated project page. |
| 3 | The Valley | 18–21 | First selected-project slide; nested research spreads and Jasná. |
| 4 | Modernism Revisited 2026 | 22 | Second selected-project slide. |
| 5 | COOL Nouveau | 24 | Third selected-project slide. |
| 6 | Visitors centre Demänovská dolina | 25 | Fourth selected-project slide. |
| 7 | Revitalization of a public square | 26 | Fifth selected-project slide. |

The landing page is implemented at `/`. The slideshow sits in its `#selected-projects` section after the PhD feature at `#research`. A persistent list of five project selectors makes each project directly reachable without advancing through every slide.

The slash-separated line `Mountain Solitudes / FAD / Innovation in architecture of 20th century in Slovakia` stays with the PhD project. `FAD / SAV / Pre Dolinu / Fulbright visiting research` stays with The Valley. These lines do not create additional top-level projects.

## Main project: History of Mountain Hut Architecture

Implemented route: `/projects/history-of-mountain-hut-architecture/`, from `site/projects/history-of-mountain-hut-architecture/index.html`.

| Chapter | Source material |
|---|---|
| Research overview | Page 2: supplied overview, research question, methodology, findings and outcomes. |
| History, mapping and periodisation | Pages 3–6: architectural analysis, hut locations, timeline and ownership; pages 39–40: additional diagrams. |
| Téry Hut | Pages 7–10: case-study overview, historical and architectural analysis, contemporary condition. |
| Contemporary Reflections | Pages 11–13: Hut under Mt. Rysy and Lodge Silesian House / Sliezsky dom. Source spelling of Reflections/Reflexions varies. |
| Architecture in the Mountains | Pages 14–17: comparative construction, roofs, façades, materials, spatial layout and prefabrication. |
| Reflections on Architecture | Page 23: lecture/discourse project; the title cell uses the singular `Reflection`. Grouped here following the user's explicit content decision; retain its own supplied dates, roles, credits and affiliation. |
| Publications and research outcomes | Four supplied research-publication titles and DOI links are included. |

The dedicated page has links to history and mapping, Téry Hut, Contemporary Reflections, Architecture in the Mountains, Reflections on Architecture, and publications. It includes a return to the portfolio. Project dates remain separate from the historical period studied, and the supplied project/affiliation line is secondary to the readable title.

Page 40's chart remains in the source inventory but is omitted from the website imagery because its current rendering contains a large black diagonal band. The first version uses selected supplied archive drawings and photographs for the other chapters; it does not reproduce the defective page 4 or page 8 renders. Missing charts and archival imagery stay recorded in the asset map.

## The Valley

Core source pages 18–21 comprise the overview, Held Captive by the Tourism Industry, Taming of the wild, and Jasná. This is one project.

Pages 37–38 show Alps/Rockies comparison and USA national-park research, dated 2024–25. The user has decided to keep these separate and outside the first version.

## Selected-project layout

At widths of at least 900px and heights of at least 580px, selected projects use a compact notebook frame within the available viewport. One image is shown at a time, with thumbnail selectors beneath it and the project information alongside it. Full project copy and metadata remain in a scrollable details area; supplied credits can be expanded.

Mobile and shorter windows show all images for the active project in the normal reading flow. Project text, metadata and credits remain real HTML. Linked project images open in an image viewer, with direct image links as the fallback.

Images use automatic dimensions, retain their natural aspect ratios and only scale down to fit. The same limits apply to the desktop gallery, thumbnails and image viewer, including the smaller COOL Nouveau visuals.

The first version uses one slide per project, each with selected imagery, concise source-grounded text, metadata and supplied credits. Collaborative teams and contributions remain available under expandable credits. The six COOL Nouveau images are approved embedded visuals from the current Affinity export; other site imagery comes from selected supplied archive assets.

Future selected-project routes are recorded in `project-map.json`. Their `detailPath` remains null, and the current site has no `More` links to unbuilt pages.

## Visual direction

Observed source characteristics: white backgrounds, black sans-serif text, substantial empty space, thin table rules, structured research metadata, large photographs, architectural drawings and occasional color within the work itself.

The revised styling uses warm paper tones, muted ink, thin rules, small monospace labels, sans-serif text and selected italic serif emphasis. Spacing and responsive layouts adapt the dense print columns for reading. Styles use the built-in Arial/Helvetica, Courier New and Georgia/Times New Roman font stacks; the supplied source font files remain inventoried separately.

Implemented slideshow behavior includes manual Previous/Next buttons, current project and count, direct title selection, left/right keyboard navigation, touch swipes in the image area, screen-reader announcements and project hash links. The compact desktop image gallery adds thumbnail selection and an image count. It does not advance automatically. Focus is restored when a project or image change would hide the focused content. The site also has a skip link, visible keyboard focus, mobile navigation and reduced-motion styling. These choices follow [W3C WAI carousel guidance](https://www.w3.org/WAI/tutorials/carousels/).

## Draft landing copy

The following editable editorial copy is authorized by the user and implemented on the landing page. It is not quoted from the source or a new biographical claim.

**Name:** Mária Novotná

**Heading:** Architecture, research & landscapes.

**Introduction:** A selection of research into mountain architecture and tourism, alongside exhibitions, collaborative projects and public-space design.

**Navigation labels:** Explore the research · Selected projects

The current source cover reads `research & projects`, with `portfolio` and `Mária Novotná`. That wording remains in the website wordmark. The implemented opening uses `uvod.webp`, optimized from the supplied `uvod.jpg` collage; that image choice is editorial and does not imply it appeared on the source cover.

## Content held for a later decision

| Source pages | Content | Current status |
|---|---|---|
| 28–29 | Flaine / Sri Lanka and Capanna Cristallina field studies | Reserve outside the first version unless the user expands the selection. |
| 30 | Vladimír Dedeček — interpretation of his architecture | Reserve. |
| 31 | Residential buildings | Reserve. |
| 32 | Apartment 7-3-to-4 | Reserve. |
| 33 | House ISB | Reserve. |
| 34 | Alaš | Reserve. |
| 35 | Dormitory | Reserve. |
| 37–38 | Alps/Rockies comparison and USA national parks | Separate and outside the first version, by user decision. |
| 27, 36 | Closing/separator pages | No independent website project. |

## Local development and assets

Run `npm run dev` from the repository to serve `site/` at `http://127.0.0.1:4317/`. `npm run build` copies the static website into ignored `dist/`; `npm run preview` serves that build at the same default address. The scripts use Node.js built-ins and have no package dependencies.

The supplied image archive has 63 visual assets, plus four font files in the separate font archive. Originals remain in ignored `.source/` staging. The first web asset set contains 34 WebP files: 28 selected archive assets and six individually extracted, approved COOL Nouveau images from export page 24. The WebP conversion preserves aspect ratio, does not crop or enlarge the source, and limits the maximum edge to 2,000 pixels. Some supplied PDF drawings use a rendered first page as their conversion input.

Asset provenance and dimensions are recorded in `.source/web-assets-manifest.json`. The COOL extraction is previewed in `.source/contact-sheets/cool-approved-embedded.jpg`. Its images retain the embedded source resolution; matching higher-resolution originals are still absent from `Images.zip`. Other missing originals have not been replaced with embedded substitutes.

No contact address, biography or social profile is supplied on the current cover, so the site omits placeholder contact details. Supplied project credits and publication links are included; later copy review can refine their presentation while preserving their source references.
