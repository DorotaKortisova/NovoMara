# Portfolio source content audit

This content classification follows the user's latest approved Research and Practice hierarchy, using the existing 40-page Affinity export as its source. No fresh Affinity export was obtained for this expansion. The website is in English. The user has authorized editable landing copy; factual claims must still remain grounded in the supplied material.

## Source status

- Current source: `.source/portfolio/2026 architrekt research practise.pdf`, exported from the current Affinity document, with 40 pages. Page numbers throughout this audit refer to this export.
- Its extracted text is stored as `.source/portfolio/text/page-01.txt` through `page-40.txt`; its rendered previews are `.source/portfolio/pages/page-01.jpg` through `page-40.jpg`. The text is PDF text extraction rather than the older OCR.
- The current page order and project classification on pages 1–27 match the earlier 27-page preview set in the parent workspace. Current typography and rendering differ. Current pages 28–40 provide additional material absent from that earlier set.
- All current pages were visually inspected via contact sheets or full-page previews; pages 28–40 were each inspected at full-page size. The older 27 pages were also previously inspected individually for comparison. This verifies the classification, not the currency of external event information or every bibliographic/name detail.
- The user's specified `C:\Users\mariu\Desktop\Maria\PORTFOLIO\Images.zip` remains the intended original image source. This audit does not assign or move those image assets. Current PDF images contain visible resolution/rendering problems, so prefer available originals. The latest source-addition task authorizes reuse of embedded visuals from pages 28–35 where originals are unavailable, in addition to the earlier COOL Nouveau approval for page 24. Preserve source resolution and exclude defective placeholders.
- PDF text extraction can lose text, diacritics and ligatures. Source text also contains editorial inconsistencies and apparently clipped paragraphs. Proofread against the current Affinity document before publication. Original portfolio classification relies on that export rather than earlier website files or prior groupings in the workspace.
- For the later home publications and contact additions, the user supplied the reference website at `http://localhost:4321/#research`. Its newer saved source in the parent workspace, `tmp/main-sync/src/pages/index.astro` and `tmp/main-sync/src/scripts/site.js`, supplies the publication citations and contact email. The portrait was supplied separately as `site/assets/images/IMG_0208.jpg`. Following this reference does not establish a new independent bibliographic verification.

## Agreed website hierarchy

| Website position | Project | Current source pages | Treatment |
|---|---|---|---|
| First view | Landing page | 1, with selected project imagery | Use the provided name and portfolio identity with editable English landing copy authorized by the user. Do not invent contact details or biographical facts. |
| Main project | History of Mountain Hut Architecture | 2–17, 23, 39–40 | One flagship PhD project with its own page; the mountain-hut sections and related reflection/discourse material belong inside it. Page 23's placement follows user steering; page 40 needs a source/rendering check. |
| Research 1 | The Valley | 18–21 | One Research slide, encompassing both research texts and Jasná imagery. |
| Research 2 | Modernism Revisited 2026 | 22 | One Research slide. |
| Research 3 | COOL Nouveau | 24 | One Research slide. |
| Research 4 | Flaine / Sri Lanka | 28 | Field-study project included by the latest scope approval. |
| Research 5 | Capanna Cristallina | 29 | Field-study project included by the latest scope approval. |
| Research 6 | Vladimír Dedeček — interpretation of his architecture | 30 | Research/publication collaboration included by the latest scope approval. |
| Research 7 | Residential buildings | 31 | Research/publication project included by the latest scope approval. |
| Practice 1 | Visitors centre Demänovská dolina | 25 | Moved from the original selected-project slideshow to Practice. |
| Practice 2 | Revitalization of a public square | 26 | Moved from the original selected-project slideshow to Practice. |
| Practice 3 | Apartment 7-3-to-4 | 32 | Renovation/layout proposal included by the latest scope approval. |
| Practice 4 | House ISB | 33 | House renovation included by the latest scope approval. |
| Practice 5 | Alaš | 34 | Conservation/renovation proposal included by the latest scope approval. |
| Practice 6 | Dormitory | 35 | Interior adaptation included by the latest scope approval. |
| Home publications | Selected publications | Related outcomes on 2, 7, 11, 18; citations from the user-referenced website | Four publication rows after Practice, at `#publications`. |
| Home contact | Contact | Later user-supplied reference | “Continue the conversation” heading and email draft form at `#contact`, after publications. |
| Flagship subsection | Reflection on Architecture / Reflections on Architecture | 23 | Place within the mountain architecture project as related reflection/discourse material, following the user's instruction that the reflections remain part of that project. Keep its own source topic and metadata distinct from Contemporary Reflections on pages 11–13. |
| Outside first version | Alps/Rockies comparison and USA national parks | 37–38 | Keep as separate research material, outside the first version, following the user's explicit steering. |

The original five-project selection is preserved as decision history, superseded by the user's approval to include pages 28–35 and organize all included projects into Research and Practice. Research retains `#selected-projects` for compatibility; Practice follows at `#practice`. Visitors centre and Public square appear only in Practice. The flagship remains intact, and only pages 37–38 remain excluded project content by the earlier explicit decision. Future separate pages are planned for the carousel projects, with `detailPath` still null; do not show a functional-looking “More” button until a destination exists.

## Later supplied home content

The implemented home publication list follows the newer saved reference website: The Taming of the Wild (2025, DOI `10.31261/FLPI.2025.10.16`); Tatras Phoenix: Architecture of Restoration in the Alpine Environment of the High Tatras (2023, DOI `10.30682/aa2310r`); Alpine Huts: Architectural Innovations and Development in the High Tatras in the Second Half of the 20th Century (2023, DOI `10.2478/alfa-2023-0005`); and The Mountain Lodge Téry Hut: Innovations in Alpine-Zone Architecture (2022, DOI `10.31577/archandurb.2022.56.1-2.10`). These outcomes also appear in the portfolio export on pages 18, 11, 2 and 7 respectively. The home list and its citation wording follow the supplied reference. Its four entries remain unchanged by the user's latest restoration of the separate PhD publication list.

The contact section contains the “Continue the conversation” heading and email draft form addressed to `maria.novotna27@gmail.com`, without a separate name or direct email link under the heading. The email was absent from the original cover and comes from the reference's newer saved script. The later user-supplied `site/assets/images/IMG_0208.jpg` appears as a small circular portrait beside Mária's name in both page footers, separately from the portfolio-derived image set. The circle crops only its display; the source JPEG is unchanged and other project images retain natural proportions.

The form prepares an encoded `mailto` draft from name, email and message and opens the user's email application. It has no backend, automatic sending or storage. Headers on both site pages link to the home publications and contact sections.

## Flagship project: pages 2–17, 23 and 39–40

The user identifies the main project as the PhD thesis. The current source also supports grouping the full mountain-hut sequence under that umbrella: the recurring footer on pages 3–6, 8–10, 12–13, 15–17 and 39–40 says `Mountain Solitudes / FAD / Innovation in architecture of 20th century in Slovakia`; page 3 explicitly says the work is an integral part of the PhD project; page 14 lists `PhD thesis` as its outcome.

The user later clarified that “the reflections are still part of the mountain architecture project.” For the website, this also places page 23's Reflection(s) on Architecture within the flagship as related reflection/discourse material. The source page concerns a lecture/publication series; it does not itself carry the mountain-hut project footer. This is a user-requested website placement, not evidence that the lecture series is formally a PhD thesis component or a mountain-hut restoration study.

Treat `History of Mountain Hut Architecture` as the project title and `Mountain Solitudes / FAD / Innovation in architecture of 20th century in Slovakia` as the supplied project/affiliation line. The slash-separated line is not four independent projects.

| Internal section | Pages | Source evidence and content |
|---|---|---|
| Research overview | 2 | Main title; historical research; Western Carpathians; scale, period, affiliation, outcomes, research question, hypothesis, methodology, key conflict, conclusion and keywords. |
| Architectural analysis | 3 | Comparisons of realized and unrealized architectural projects with drawings, elevations, plans and axonometrics; explicit PhD connection. |
| Mapping hut locations in periods | 4 | Map and six historical periods; location and contour legend. |
| Periodisation | 5 | Historical timeline and explanation of the periods. |
| Ownership of the huts | 6 | Ownership timeline with collective, private and public categories. |
| Téry Hut: case study overview | 7 | Historical/biographical analysis, research question, publication outcome and method; hut dated 1899 in its metadata. |
| Téry Hut: historical analysis | 8 | Design/construction account. The earlier preview showed an archival postcard here; the current rendered export shows a beige image block. Obtain the original image from the approved image source rather than copying this render. |
| Téry Hut: architectural analysis | 9 | Plans, exploded construction diagram and material/technology account. |
| Téry Hut: 2022 | 10 | Contemporary photograph and plans. The top `2022` caption is not a separate project. |
| Contemporary Reflections: overview | 11 | Two hut photographs; restoration study, research metadata and publication outcome. The source title here uses `Contemporary Reflexions`. |
| Hut under Mt. Rysy | 12 | Renovation discussion, historical elevations and landscape photograph; footer says `Contemporary Reflections`. |
| Lodge Silesian House / Sliezsky dom | 13 | Modernist renovation discussion, landscape photograph, elevation and plan; footer retains `Contemporary Reflections`. |
| Architecture in the Mountains: comparative overview | 14 | Comparative wall/structural details across the huts; outcome explicitly `PhD thesis`. |
| Roof, façade, materials, snow, sun | 15 | Comparative building sections, roof and façade explanations, weather/context photographs. |
| Spatial layout | 16 | Comparative plans and operational layout explanation. |
| Prefabrication | 17 | Archival construction imagery, structural drawing, conceptual collage and explanatory text. |
| Related reflections and discourse | 23 | Lecture/publication series titled `Reflection on Architecture` in the title cell and `Reflections on Architecture` in the body/posters; `2020–2024`, Bratislava, Faculty of Architecture and Design STU. Include within the flagship by user instruction while retaining the source topic and its own roles/outcomes. |
| Additional periodisation diagram | 39 | Explicit History title and flagship affiliation. A 77-hut research set is divided into professionally/unprofessionally built and destroyed/transformed/still-original categories. Integrate with the historical-analysis/periodisation section rather than adding a separate project. |
| Additional historical chart | 40 | Explicit History title and flagship affiliation; periods and timeline chart. A broad black diagonal band obscures much of the current rendered page. Keep the classification, but reserve use of the graphic until the source/rendering issue is resolved. |

Project dates differ from the historical period researched. The source uses project date `2020–2025` for History and Architecture in the Mountains, `2020–2022` for Téry Hut and `2022–2024` for Contemporary Reflections. Historical metadata includes `1873–2010` (History), `1899` / `19th/20th century` (Téry), `21th century` as printed (Contemporary Reflections), and `1899–2004` / `1873–2020` (Architecture in the Mountains). The last historical period in the History graphics extends to 2020 even where the header says 2010. Keep the source dates distinct; reconcile this endpoint discrepancy during the later detailed-copy pass.

The latest authorized page organization preserves the source classifications above while giving them a clearer web hierarchy. A compact `#overview` header combines title, a shorter public research question, metadata and landscape photograph; the formal source question and methods remain under a native expandable control. Seven sticky contents links lead to that Overview header (`#overview`) and the six sections History (`#history`), Case studies (`#case-studies`), Comparative analysis (`#architecture-in-the-mountains`), Findings (`#findings`), Related discourse (`#reflections-on-architecture`) and Selected publications (`#publications`). All 14 existing project images remain, with the footer avatar counted separately; no source assets were changed by this reorganization.

Case studies contain Téry Hut (`#tery-hut`, pages 7–10) and the Contemporary Reflections restoration group (`#contemporary-reflections`, pages 11–13). The group retains its 2022–2024 research period and contains distinct Hut under Mt. Rysy (`#rysy-hut`) and Sliezsky dom (`#sliezsky-dom`) subsections. The research period does not establish renovation dates; the historical Rysy drawing remains labeled 1933. Comparative analysis pairs figures with three topics: form and structure, spatial layout, and materials and prefabrication.

The three Findings are concise adaptations of complete source conclusions on pages 2, 11 and 14–17: terrain and climate shape adaptive architectural form; isolation affects prefabrication and operational layout; restoration negotiates resilience, heritage and tourism while retaining environmental logic. These are source-grounded editorial summaries, not new scientific findings or a completion of clipped source passages. Material names and figure captions must remain traceable to supplied text and drawings.

The smaller Related discourse section shows the lecture series' distinct 2020–2024 period and retains its Bratislava location, Faculty of Architecture and Design STU affiliation, Henrieta Moravčíková's director credit and Mária's coordinator, teaching-assistant and co-editor contributions under the native expandable “Roles, dates & credits.” Its placement under the project remains a user-requested grouping, not a formal thesis association.

The user's latest instruction supersedes the earlier removal and restores the dedicated Selected publications section after Related discourse, with label `05 / Research outcomes` and a seventh local contents link. It contains the original four outcomes: both Alpine Huts studies from page 2 (`10.2478/alfa-2022-0002`, `10.2478/alfa-2023-0005`), The Mountain Lodge Téry Hut from page 7 (`10.31577/archandurb.2022.56.1-2.10`) and Tatras Phoenix from page 11 (`10.30682/aa2310r`). The global header still links to the unchanged home list, and “Continue to research projects” returns to home Research. Source bibliographic facts and proofreading caveats remain intact.

## The Valley: pages 18–21

The user's affiliation line matches the current footer: `FAD / SAV / Pre Dolinu / Fulbright visiting research`. The date field is `2020–2025`, while the studied period is `1930–2020`.

| Internal section | Page | Source evidence and content |
|---|---|---|
| Research overview | 18 | `The Valley`; landscape/mountain urbanism; Low Tatras; historical research; research metadata; three landscape photographs; two research outcomes. |
| Held Captive by the Tourism Industry | 19 | Publication discussion, publication cover and four comparative development maps; footer explicitly retains `The Valley`. |
| Taming of the wild | 20 | Landscape research text, historical plans, historical/contemporary imagery and quoted development figures; footer retains `The Valley`. |
| Jasná | 21 | Four photographs of development; footer retains `The Valley` and the same affiliation/date. |

`Jasná`, `Held Captive by the Tourism Industry` and `Taming of the wild` remain internal sections of The Valley in Research, rather than additional carousel projects. The exact research-publication titles and bibliographic details need a separate proofreading pass before publication. The page 20 transport/accommodation/ski-ticket figures are source statements without a clear observation date in this spread; do not promote them as verified current facts.

## Original selected-project metadata

These are facts present in the current export, retained for classification rather than publication-ready copy.

| Project | Page | Period / location / scale | Provided content fields |
|---|---|---|---|
| Modernism Revisited 2026 | 22 | `2025–2026`; `Trenčín, Slovakia`; international conference | Affiliation, outcomes/events, about, scientific/executive boards, roles, links. |
| COOL Nouveau | 24 | `2022`; `Bratislava`; international interacademic collaboration | Affiliation, exhibition outcomes, about, team, roles, links. |
| Visitors centre Demänovská dolina | 25 | `2023`; `Low Tatras, SK`; competition, architecture, landscape | `office n/a`; `second place`; about, team, roles, link. |
| Revitalization of a public square | 26 | `2018–2024`; `Malacky, SK`; competition, urbanism, architecture, realisation | `office n/a`; `first place, partial realisation`; about, team, roles, links. |

Use `office n/a` as a missing-affiliation marker in the source data. It does not identify an office name and should not become a prominent website label.

## Expanded source material and landing wording

- Page 1 is the cover. Its current visible wording is `Mária Novotná`, `research & projects`, and `portfolio`. These words support the landing composition. The user has authorized editable English landing copy derived from the provided portfolio topics. The older preview used uppercase and a different condensed display treatment; the current export uses lowercase/title-case wording with a plain sans serif.
- Page 23 presents a lecture/publication series. Its title cell is `Reflection on Architecture`, whereas the posters and body say `Reflections on Architecture`. It lists `2020–2024`, Bratislava, Faculty of Architecture and Design STU, video lectures and publication for each lecture series. Its source topic differs from the hut restoration study `Contemporary Reflections` on pages 11–13, but both are placed inside the mountain architecture project's website page following user steering. Page 23 is not an additional slideshow project.
- Pages 27 and 36 are closing/divider pages. Page 27 says portfolio/name; page 36 says `last page •` and the name. They do not provide a biography, email or telephone.

| Additional page | Visible title or subject | Provided date/content | Classification for this request |
|---|---|---|---|
| 28 | Flaine, Alps, France / Sri Lanka | `2016–21`; two photographs; research tags for modern alpine architecture and tropical modernism | Included as one Research project by latest approval. |
| 29 | Capanna Cristalina, Alps, Switzerland | `2022`; landscape/hut photograph and research tags | Included in Research with editorial label `Capanna Cristallina`; no explicit thesis association on this page, so it remains separate from the flagship. |
| 30 | Vladimír Dedeček – interpretation of his architecture | `2015–2017`; publication collaboration, interpretive text, book image and architectural drawings; citations also list publications in 2017 and 2018 | Included as a Research/publication collaboration. Exact bibliographic wording still needs proofreading; do not invent Mária's specific contribution. |
| 31 | Residential buildings | `2021`; Bratislava housing article/research, publication spread and cover | Included as a Research/publication project. |
| 32 | Apartment 7-3-to-4 | `2022`; original/proposed plans, photographs, rendering and layout explanation; tags include freelance renovation | Included in Practice. Bratislava is the text's housing context, without a separate location field. Do not infer completion or a team from the footer. |
| 33 | House ISB | `2020`; rural terraced house near Brno; renovation plans, photographs and design explanation; freelance tag | Included in Practice. A black patch and large cyan block are visible in the rendered page; exclude these defective placeholders. |
| 34 | Alaš | `2017`; `Stratena` in the text; conservation/renovation proposal, existing photographs and proposal images; freelance tag | Included in Practice. Retain proposal language for the lightweight insertion and shelter use; do not imply a completed restoration. |
| 35 | Dormitory | `2024`; former office floor transformed into student co-living place; plan and images; interior/renovation/adaptation tags | Included in Practice. No location or team is supplied. |
| 37 | `comparation.alps.rockie mountains` as printed | `2024–25`; alpine development and North American ski/forest imagery; mountain urbanism/landscape planning/architecture tags | Separate research material, outside the first version by user instruction. |
| 38 | National parks of USA | `2024–25`; four photographs and the same research tags | Separate research material, outside the first version by user instruction. |
| 39–40 | History of Mountain Hut Architecture | `2020–2025` and exact flagship affiliation; research diagrams | Already classified as additional flagship material, not out-of-scope projects. |

The latest approval adds pages 28–31 to Research and pages 32–35 to Practice, superseding their former reserved status. Page 23 stays inside the flagship by user instruction, and pages 39–40 retain their flagship classification. Pages 37–38 remain separate from The Valley and the flagship and outside the website.

Available originals include the confirmed page-32 interior rendering `PDFsam_merge 73.tif`. Files `PDFsam_merge 74.tif` through `77.tif` belong to the House ISB visual family but remain candidate page associations. The website uses the clean `74.tif` garden rendering alongside clear source plans, avoiding the defective flat cyan image. The garden rendering is visually consistent with the source photographs and plans; unavailable source-link metadata prevents promoting it to a verified original association.

The expansion adds 20 WebP derivatives from pages 28–35, bringing the site to 54 WebP images plus the separately supplied footer JPEG. Their provenance is recorded in `.source/additional-web-assets-manifest.json`, with `.source/contact-sheets/additional-projects.jpg` as the preview. The original 34-image `.source/web-assets-manifest.json` remains unchanged, and the original archive still contains 63 assets. Other missing standalone imagery uses authorized individual embedded visuals or isolated source drawing groups with actual resolution and provenance recorded. Rendering defects and low-resolution visuals remain source-quality issues, rather than evidence of completed source repair.

## Copy and source notes for a later pass

1. Use the user-supplied `History of Mountain Hut Architecture` as the public flagship title. The exact formal thesis title can be added later if supplied; it is not needed to start implementation.
2. `Contemporary Reflexions` on page 11 and `Contemporary Reflections` on pages 12–13 are a source inconsistency. Use `Contemporary Reflections` as the consistent English editorial label.
3. `Lodge Silesian House` is the visible page-13 heading; its paragraph/drawing uses `Sliezsky dom`. Retain both names in the source data without claiming a different building identity.
4. Page 23 singular `Reflection on Architecture` differs from plural `Reflections on Architecture` in its own body/posters. Preserve that source discrepancy in the audit; use the body/poster form `Reflections on Architecture` as the editorial label for its related discourse subsection. Inclusion inside the flagship is already settled by user steering.
5. `Modernism Revisited 2026` is explicit on page 22. The source lists a colloquium on 28–31 October 2025 in Trenčianske Teplice and a conference on 21–23 October 2026 in Trenčín. These supplied dates can remain source metadata. Only publishing a claim about current event status calls for current verification; do not infer that the conference has taken place.
6. Prefer the current PDF text extraction to legacy OCR. The older OCR misread Téry's Hut `(1899)` as `1599`, while the current text correctly extracts `1899`. Current extraction still contains encoding/ligature errors on pages 19 and 30–31, and some source wording is misspelled. Copy names, citations, DOI strings and URLs from the verified document and proofread them.
7. The source table's `period` and footer `date` often represent different concepts, as above. Avoid date summaries that erase that distinction.
8. Some current text appears clipped: page 2 ends its main paragraph at `architectural solutions more strongly`, page 9 at `important example of early`, and page 12 at `determine both construction`. Current page 22 also clips some links printed in the earlier preview. Use concise source-grounded copy from complete passages when implementation starts; reserve the clipped paragraphs for proofreading rather than completing them from inference.
9. Current rendering shows black map patches on page 4, a beige block where page 8's archival image belongs, highly pixelated embedded images on pages 22 and 25, and the large black diagonal band on page 40. These observations do not establish whether the problem is export settings, PDF content, or the renderer. They are reasons to rely on `Images.zip` and check affected charts in Affinity before use.

## Copy questions for a later pass

- Proofread exact publication titles, author names, DOI strings and external URLs when detailed research/publication copy is prepared.
- Reconcile the historical endpoint discrepancy and recover the complete clipped paragraphs if that detail is needed.
- Contact details are now supplied through the user's referenced website, and the contact section is implemented. Any further biography or social profiles still require supplied content.

English first, editable landing copy, `History of Mountain Hut Architecture` as the flagship title, inclusion of reflections inside that project, and exclusion of pages 37–38 are settled. The latest Research and Practice organization, inclusion of pages 28–35, dedicated PhD page and source-inspired slideshows are authorized. This audit supports concise source-grounded implementation from the existing export; later proofreading does not block that phase.
