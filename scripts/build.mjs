import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { prepareSite } from './prepare-site.mjs';

const workspace = resolve('.');
const source = resolve(workspace, 'site');
const destination = resolve(workspace, 'dist');
const preview = process.env.PREVIEW_BASE_PATH !== undefined;
const previewPath = (process.env.PREVIEW_BASE_PATH || '').replace(/\/$/, '');
if (previewPath && (!/^\/[a-z\d._-]+(?:\/[a-z\d._-]+)*$/i.test(previewPath) ||
    previewPath.split('/').some(segment => segment === '.' || segment === '..'))) {
  throw new Error('PREVIEW_BASE_PATH must be empty or a root-relative repository path, such as /NovoMara.');
}
// Delete only this workspace's named build folder; authoring files stay in site/.
if (dirname(destination) !== workspace || basename(destination) !== 'dist' || destination === source) {
  throw new Error('Refusing to clean a build destination outside this workspace.');
}
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await cp(resolve(source, 'assets'), resolve(destination, 'assets'), { recursive: true });
// Regenerate current pages rather than copying obsolete generated HTML from site/.
const pages = await prepareSite(destination, { siteUrl: preview ? '' : process.env.SITE_URL });
if (previewPath) {
  for (const page of pages) {
    const file = resolve(destination, '.' + page.route, 'index.html');
    const html = await readFile(file, 'utf8');
    await writeFile(file, html.replace(/\b(href|src|action)="\/(?!\/)([^"]*)"/g,
      (_, attribute, path) => `${attribute}="${previewPath}/${path}"`), 'utf8');
  }
}
await writeFile(resolve(destination, '.nojekyll'), '', 'utf8');
async function countFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const counts = await Promise.all(entries.map(entry => entry.isDirectory() ? countFiles(resolve(path, entry.name)) : 1));
  return counts.reduce((a, b) => a + b, 0);
}
console.log(`Static site ready in dist (${await countFiles(destination)} files).`);
