# Licensing review

Reviewed on 12 October 2026. Scope: the 15-page static website, its code, templates, UI symbols, font delivery and downloadable CV. Images are excluded following the user's instruction; the user confirms the remaining supplied image material is owned or cleared. Existing image credits remain in place.

## Website implementation

| Item | Evidence | Result |
|---|---|---|
| Templates and themes | Plain HTML, two local CSS files and one local JavaScript file; no vendored theme, template package or third-party attribution notice found. | No additional template licence requirement identified in the inspected files. |
| JavaScript and build dependencies | `package.json` has no dependencies or development dependencies. Build, generation, server and test scripts import only Node built-ins and local modules. | No third-party package notice or licence obligation identified for the static website. |
| Fonts delivered to visitors | CSS uses `Arial, Helvetica, sans-serif`, `"Courier New", monospace` and `Georgia, "Times New Roman", serif`. Courier New was restored for labels and small controls after the review. No font files, `@font-face`, CSS imports, Google Fonts or other font service appears in `site/` or the current `dist/`. | No font files are delivered by the website. An additional webfont distribution licence is not needed for the current CSS font-stack approach. |
| UI symbols | Arrows, the CV plus sign and menu text are text characters. No external icon pack or icon font is loaded. | No icon-library licence obligation identified. |
| Browser loads | All 15 pages load only `/assets/styles.css`, `/assets/research.css` where applicable, and `/assets/portfolio.js`. No external executable scripts or stylesheets were found. | No CDN library or widget licence obligation identified. |
| Source font archive | Source fonts remain in ignored `.source/` working material. The build copies `site/assets/` and regenerates the current pages. | Source font files are outside the published website. |

Microsoft explicitly permits specifying its Windows fonts in CSS font stacks; the fonts are used on the visitor's device. Its rules distinguish this from hosting or redistributing font files. See the [Microsoft font redistribution FAQ, Web section](https://learn.microsoft.com/en-us/typography/fonts/font-faq#web).

These results identify what the inspected implementation includes; they do not establish that every line of code is incapable of resemblance to other code or that system fonts are public domain.

The subsequently added approval workflow uses GitHub's official Actions for CI and deployment. Those actions run on GitHub's build machines under their own repository licences; their implementation is outside the static website artifact. No frontend package, icon library or hosted font was added by the preview setup.

## Downloadable CV

The original `site/assets/documents/2026_CV_novotna.pdf` is unchanged. Its metadata identifies Apple Pages and macOS Quartz as the authoring/export tools. It contains six embedded TrueType subsets: Cambria Bold, Cambria Regular, Cambria Italic, Calibri, Times Roman and Times Italic.

This is document font embedding, which has different rules from webfont hosting. Microsoft permits embedding its supplied fonts in documents when the authoring software and font licence allow it. Other suppliers' terms apply to their fonts. See the [Microsoft document-embedding guidance](https://learn.microsoft.com/en-us/typography/fonts/font-faq#document-embedding) and [Apple software licence agreements](https://www.apple.com/legal/sla/).

The embedded subsets do not retain an OS/2 embedding-permission table or useful licence-name records. The PDF therefore cannot establish the original font acquisition licence. No infringement or extra fee is established by that absence. The remaining qualification is that the CV must have been created using legitimately licensed fonts with document embedding permitted. No standalone font files were extracted for website use.

## Conclusion

No added paid template, webfont, icon pack or third-party frontend-library licence was identified for the website implementation. The CV's original font installation/licence is the only unresolved font-provenance detail in this review. Image ownership and image-licence compliance are outside the agreed scope.
