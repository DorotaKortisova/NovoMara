import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { renderSeo, writeDiscovery } from './seo.mjs';

const basic = { title: 'Mária Novotná — architecture and research', description: 'A portfolio of architecture and historical research.', image: '/assets/images/uvod.webp', imageAlt: 'Architecture and mountain landscapes.' };
const siteUrl = 'https://example.com';
const graphFrom = (html) => JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
const canonicalFrom = (html) => html.match(/<link rel="canonical" href="([^"]+)"/)[1];
async function cleanTemp(directory) {
  const target=resolve(directory);
  assert.equal(dirname(target),resolve(tmpdir()));
  assert.ok(basename(target).startsWith('novomara-seo-'));
  await rm(target,{recursive:true,force:true});
}

test('rejects invalid, local, private and non-origin deployment addresses', () => {
  const invalid = ['http://example.com', 'https://localhost', 'https://portfolio.local', 'https://intranet',
    'https://127.0.0.1', 'https://10.2.3.4', 'https://172.16.1.1', 'https://192.168.1.8', 'https://169.254.4.8',
    'https://[::1]', 'https://[fd00::1]', 'https://2130706433', 'https://user:password@example.com',
    'https://example.com/portfolio/', 'https://example.com/?mode=preview', 'https://example.com/#work', 'not a URL'];
  invalid.forEach((origin) => assert.throws(() => renderSeo({ ...basic, siteUrl: origin }), /siteUrl/));
});

test('unconfigured preview has no invented canonical or sharing URL', () => {
  const html = renderSeo({ ...basic, siteUrl: '' });
  assert.match(html, /name="robots" content="noindex,follow"/);
  assert.doesNotMatch(html, /rel="canonical"|hreflang=|property="og:url"|property="og:image"|name="twitter:image"/);
  const graph = graphFrom(html);
  assert.deepEqual(graph['@graph'].map((node) => node['@type']), ['Person', 'WebSite', 'ProfilePage']);
  assert.equal(graph['@graph'][2].inLanguage, 'en');
  assert.ok(graph['@graph'].every((node) => !node.url));
});

test('English pages retain self canonicals, social previews and schema without language alternates', () => {
  const routes = ['/', '/projects/history-of-mountain-hut-architecture/'];
  const pages = routes.map(route => renderSeo({...basic, siteUrl, route}));
  assert.equal(new Set(pages.map(canonicalFrom)).size,2);
  pages.forEach((html,index) => {
    assert.equal(canonicalFrom(html),siteUrl+routes[index]);
    assert.match(html,/property="og:image" content="https:\/\/example.com\/assets\/images\/uvod.webp"/);
    assert.doesNotMatch(html,/hreflang|og:locale:alternate/);
    const graph=graphFrom(html)['@graph'];
    assert.equal(graph.find(node=>node['@type']==='WebSite').inLanguage,'en');
    assert.deepEqual(graph.find(node=>node['@type']==='Person').knowsLanguage,['sk','en','cs']);
  });
  for (const locale of ['sk','cs']) {
    assert.throws(()=>renderSeo({...basic,siteUrl,locale}),/English-only/);
    assert.throws(()=>renderSeo({...basic,siteUrl,route:`/${locale}/`}),/removed language version/);
  }
});

test('JSON-LD and HTML escape hostile text without losing regional source facts', () => {
  const name = 'Alaš "proposal" </script><script>alert(1)</script> & heritage';
  const html = renderSeo({ ...basic, siteUrl, route: '/projects/alas/', title: name,
    project: { name, topics: ['Conservation', 'Adaptation'], location: 'Stratená', roles: ['Architect'], team: ['Mária Novotná', 'A collaborator'], sourceUrls: ['https://doi.org/10.30682/aa2310r'] } });
  assert.equal((html.match(/<script /g) || []).length, 1);
  assert.match(html, /&lt;\/script&gt;/);
  const graph = graphFrom(html)['@graph'];
  const work = graph.find((node) => node['@type'] === 'CreativeWork');
  assert.equal(work.name, name);
  assert.equal(work.spatialCoverage.name, 'Stratená');
  assert.deepEqual(work.about.map((topic) => topic.name), ['Conservation', 'Adaptation']);
  assert.equal(work.author, undefined);
  assert.equal(work.contributor.length, 2);
  assert.equal(work.contributor[0]['@type'], 'Role');
  assert.equal(work.contributor[1].name, 'A collaborator');
  assert.deepEqual(work.citation, ['https://doi.org/10.30682/aa2310r']);
  assert.ok(graph.find((node) => node['@type'] === 'BreadcrumbList'));
});

test('public discovery includes unique English pages and a real sitemap URL', async () => {
  const outputDir = await mkdtemp(join(tmpdir(), 'novomara-seo-'));
  try {
    const routes = [{route:'/'},{route:'/projects/alas/'},{route:'/projects/alas/'}];
    const result = await writeDiscovery({ outputDir, routes, siteUrl });
    assert.equal(result.routeCount, 2);
    assert.equal(result.sitemapWritten, true);
    const sitemap = await readFile(join(outputDir, 'sitemap.xml'), 'utf8');
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    assert.equal(urls.length, 2);
    assert.equal(new Set(urls).size, 2);
    assert.ok(urls.includes(siteUrl + '/projects/alas/'));
    assert.ok(urls.every((url) => !new URL(url).hash && !new URL(url).search));
    assert.doesNotMatch(sitemap, /hreflang|xhtml:|\/(?:sk|cs)\//);
    assert.match(await readFile(join(outputDir, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/example.com\/sitemap.xml/);
    await assert.rejects(writeDiscovery({ outputDir, routes: [{ route: '/#research' }], siteUrl }), /without queries or fragments/);
    await assert.rejects(writeDiscovery({outputDir,routes:[{route:'/sk/projects/alas/'}],siteUrl}),/removed language version/);
  } finally { await cleanTemp(outputDir); }
});

test('preview discovery removes a stale production sitemap without blocking noindex discovery', async () => {
  const outputDir = await mkdtemp(join(tmpdir(), 'novomara-seo-preview-'));
  try {
    await writeFile(join(outputDir, 'sitemap.xml'), 'old public sitemap');
    const result = await writeDiscovery({ outputDir, routes: [{ route: '/' }], siteUrl: '' });
    assert.equal(result.sitemapWritten, false);
    await assert.rejects(stat(join(outputDir, 'sitemap.xml')), { code: 'ENOENT' });
    assert.equal(await readFile(join(outputDir, 'robots.txt'), 'utf8'), 'User-agent: *\nAllow: /\n');
  } finally { await cleanTemp(outputDir); }
});
