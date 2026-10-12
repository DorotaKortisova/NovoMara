# Approval preview through GitHub

The Git remote is `https://github.com/DorotaKortisova/NovoMara.git`. The current review branch is `codex/start`. The prepared workflow is `.github/workflows/approval-preview.yml`; it runs the tests, produces a fresh `dist/` and publishes that artifact through GitHub Pages.

## First deployment

1. In the [repository's Pages settings](https://github.com/DorotaKortisova/NovoMara/settings/pages), select **GitHub Actions** under **Build and deployment → Source**. Pages must be available for the repository and account plan.
2. Commit all intended source changes, including `.github/workflows/approval-preview.yml`, `scripts/build.test.mjs`, `content/`, project pages and the CV document. Keep ignored `.source/`, `dist/` and `output/` out of the commit.
3. Push `codex/start` to `origin`.
4. Open the [Actions tab](https://github.com/DorotaKortisova/NovoMara/actions) and check the **Approval preview** run. Both its build and deploy jobs must succeed. The deployment job reports the real website URL.
5. Open the deployed link on desktop and phone and share it with the reviewer. Test a direct project URL, an image viewer and the CV download.

The expected project-site URL is `https://dorotakortisova.github.io/NovoMara/`. This is a planned URL, not a confirmation of an existing deployment. GitHub Pages provides its own hostname, so a purchased domain is unnecessary for this approval stage. GitHub's instructions cover [publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [custom Actions workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

GitHub Pages is available for public repositories on GitHub Free and for private repositories on eligible paid plans. The preview website is publicly accessible; `noindex` is an indexing instruction, not access control. See [GitHub Pages availability and project URLs](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

If the `github-pages` environment restricts deployments to a different branch, configure its allowed deployment branch as `codex/start` for this preview. The workflow intentionally publishes only pushes to the current review branch; update that branch trigger if the review moves elsewhere.

## Build behavior

The build verifies its cleanup target is the named `dist/` directory inside its working directory. It clears that output, copies only current `site/assets/`, and generates the current 15 pages plus discovery files. Old generated HTML remaining in `site/` cannot re-enter the published output. Removed assets disappear on the next build. Authoring source files and the original CV remain intact.

The Pages workflow passes the repository base path supplied by `actions/configure-pages` as `PREVIEW_BASE_PATH`. The build prefixes root-relative navigation, image and download URLs with this path. Supplying the variable also forces noindex and omits production canonical/social URLs and the sitemap, even when production domain configuration exists.

## Local equivalent

In PowerShell, while the normal development server stays on port 4317:

```powershell
$env:PREVIEW_BASE_PATH = '/NovoMara'
npm run build
$env:PORT = '4320'
npm run preview
```

Open `http://127.0.0.1:4320/NovoMara/`. To return to a normal root-path build, remove `PREVIEW_BASE_PATH` from that terminal environment and rebuild. The preview server uses the same variable to mount the output at the repository path.

## After approval

Choose the final domain and hosting. Set the public HTTPS origin in `content/seo-config.json`. Switch the publishing workflow to a normal build by removing `PREVIEW_BASE_PATH` and the forced empty `SITE_URL` setting; configure the approved production domain on the host. That build will use the production origin to enable indexing and emit canonical URLs and the sitemap. The approval workflow deliberately keeps its preview rules until explicitly changed.
