import { readFileSync } from 'node:fs';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { isIP } from 'node:net';
import { resolve } from 'node:path';

const configPath = new URL('../content/seo-config.json', import.meta.url);
const copy = {
  ogLocale: 'en_US', home: 'Portfolio', job: 'Architect and researcher',
  topics: ['Architecture', 'Mountain hut architecture', 'Architectural research', 'Architectural heritage', 'Modernism', 'Adaptive reuse', 'Climate adaptation', 'Exhibition design', 'Housing', 'Interior design', 'Urbanism', 'Public-space design'],
};
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const jsonText = (value) => JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`);

function configuredOrigin(explicit) {
  if (explicit !== undefined) return explicit;
  if (process.env.SITE_URL !== undefined) return process.env.SITE_URL;
  try { return JSON.parse(readFileSync(configPath, 'utf8')).siteUrl ?? ''; }
  catch (error) {
    if (error.code === 'ENOENT') return '';
    throw new Error(`Cannot read SEO configuration: ${error.message}`);
  }
}

function publicOrigin(explicit) {
  const configured = configuredOrigin(explicit);
  if (typeof configured !== 'string') throw new TypeError('siteUrl must be a public HTTPS origin or an empty string.');
  const value = configured.trim();
  if (!value) return '';
  let url;
  try { url = new URL(value); }
  catch { throw new Error('siteUrl must be a valid public HTTPS origin.'); }
  const hostname = url.hostname.toLowerCase();
  const labels = hostname.split('.');
  const reserved = /(?:^|\.)(?:localhost|local|internal|intranet|test|invalid|example|onion|home|lan)$/;
  if (!/^https:\/\//i.test(value) || url.protocol !== 'https:' || url.username || url.password ||
      url.pathname !== '/' || value.includes('?') || value.includes('#') || isIP(hostname) ||
      hostname.startsWith('[') || labels.length < 2 || reserved.test(hostname) ||
      !labels.every((label) => label.length <= 63 && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label)) ||
      !/^(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/i.test(labels.at(-1))) {
    throw new Error('siteUrl must contain only a public HTTPS domain origin; local/private hosts, IP literals, credentials, paths, queries and fragments are not supported.');
  }
  return url.origin;
}

function neutralRoute(route = '/') {
  if (typeof route !== 'string' || !/^\/(?!\/)/.test(route) || /[?#\\\u0000-\u0020]/.test(route)) {
    throw new Error('SEO routes must be root-relative page paths without queries or fragments.');
  }
  let decoded;
  try { decoded = decodeURIComponent(route); }
  catch { throw new Error('SEO route contains invalid URL encoding.'); }
  if (/[\\\u0000-\u0020]/.test(decoded) || decoded.split('/').some((part) => part === '.' || part === '..')) {
    throw new Error('SEO route contains invalid path segments.');
  }
  if (/^\/(?:sk|cs)(?:\/|$)/.test(decoded)) throw new Error('SEO routes must reference the English portfolio, not a removed language version.');
  return route.endsWith('/') ? route : `${route}/`;
}

function localizedRoute(route, locale) {
  if (locale !== 'en') throw new Error(`Unsupported SEO locale: ${locale}; the portfolio is English-only.`);
  return neutralRoute(route);
}

function externalUrl(value) {
  if (typeof value !== 'string') return undefined;
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

function imageUrl(image, origin) {
  if (!image || !origin) return undefined;
  if (typeof image !== 'string' || !image.startsWith('/') || image.startsWith('//') || /[?#\\\u0000-\u0020]/.test(image)) {
    throw new Error('SEO images must be root-relative asset paths without queries or fragments.');
  }
  return new URL(image, origin).href;
}

const asArray = (value) => value === undefined || value === null ? [] : Array.isArray(value) ? value : [value];
const strings = (value) => [...new Set(asArray(value).filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim()))];

function structuredData({ locale, route, title, description, image, kind, project = {}, origin }) {
  const canonical = origin ? `${origin}${route}` : undefined;
  const identifier = (fragment) => `${canonical || ''}#${fragment}`;
  const personId = `${origin || ''}/#person`.replace(/^\/#/, '#');
  const websiteId = `${origin || ''}/#website`.replace(/^\/#/, '#');
  const homeUrl = origin ? `${origin}${localizedRoute('/', locale)}` : undefined;
  const website = { '@type': 'WebSite', '@id': websiteId, name: 'Mária Novotná', ...(origin && { url: `${origin}/` }), inLanguage: 'en', publisher: { '@id': personId } };
  const person = { '@type': 'Person', '@id': personId, name: 'Mária Novotná', alternateName: 'Maria Novotna', jobTitle: copy.job, knowsAbout: copy.topics, knowsLanguage: ['sk','en','cs'], ...(origin && { url: `${origin}/` }) };
  const commonPage = { name: title, description, inLanguage: locale, ...(canonical && { url: canonical }), ...(image && { image }), isPartOf: { '@id': websiteId } };
  if (kind === 'home') {
    return { '@context': 'https://schema.org', '@graph': [person, website, { '@type': 'ProfilePage', '@id': identifier('profilepage'), ...commonPage, mainEntity: { '@id': personId } }] };
  }

  const workId = identifier('creativework');
  const pageId = identifier('webpage');
  const roles = strings(project.roles);
  const personContribution = roles.length ? { '@type': 'Role', roleName: roles.join(' / '), contributor: { '@id': personId } } : { '@id': personId };
  const contributors = [...asArray(project.team), ...asArray(project.contributors)].flatMap((entry) => {
    const name = typeof entry === 'string' ? entry : entry?.name;
    if (!name || name.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() === 'maria novotna') return [];
    const contributor = { '@type': 'Person', name, ...(externalUrl(entry?.url) && { url: externalUrl(entry.url) }) };
    const role = strings(entry?.roles ?? entry?.role);
    return [role.length ? { '@type': 'Role', roleName: role.join(' / '), contributor } : contributor];
  });
  const topics = strings(project.topics);
  const citations = strings(project.sourceUrls).map(externalUrl).filter(Boolean);
  const location = typeof project.location === 'string' ? project.location.trim() : project.location?.name;
  const work = {
    '@type': 'CreativeWork', '@id': workId, name: project.name || title, description, inLanguage: locale,
    ...(canonical && { url: canonical }), ...(image && { image }),
    ...(topics.length && { about: topics.map((name) => ({ '@type': 'Thing', name })), keywords: topics.join(', ') }),
    ...(location && { spatialCoverage: { '@type': 'Place', name: location } }),
    ...(citations.length && { citation: citations }),
    contributor: [personContribution, ...contributors], mainEntityOfPage: { '@id': pageId },
  };
  const breadcrumbId = identifier('breadcrumbs');
  const breadcrumbs = {
    '@type': 'BreadcrumbList', '@id': breadcrumbId,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: copy.home, ...(homeUrl && { item: homeUrl }) },
      { '@type': 'ListItem', position: 2, name: project.name || title, ...(canonical && { item: canonical }) },
    ],
  };
  return { '@context': 'https://schema.org', '@graph': [person, website, work, { '@type': 'WebPage', '@id': pageId, ...commonPage, mainEntity: { '@id': workId }, breadcrumb: { '@id': breadcrumbId } }, breadcrumbs] };
}

/** Render one replaceable head block for an English portfolio page. */
export function renderSeo({ locale = 'en', route = '/', title, description, image, imageAlt = '', kind, project, siteUrl } = {}) {
  const origin = publicOrigin(siteUrl);
  const path = localizedRoute(route, locale);
  const pageKind = kind || (neutralRoute(path) === '/' ? 'home' : 'project');
  if (!['home', 'project'].includes(pageKind)) throw new Error(`Unsupported SEO page kind: ${pageKind}`);
  if (!title || !description) throw new Error('SEO pages require a title and description.');
  const canonical = origin ? `${origin}${path}` : undefined;
  const socialImage = imageUrl(image, origin);
  const tag = (attribute, name, content) => `<meta ${attribute}="${escapeHtml(name)}" content="${escapeHtml(content)}">`;
  const lines = [
    '<!-- SEO:START -->',
    `<title>${escapeHtml(title)}</title>`,
    tag('name', 'description', description),
    tag('name', 'robots', origin ? 'index,follow,max-image-preview:large' : 'noindex,follow'),
  ];
  if (canonical) {
    lines.push(`<link rel="canonical" href="${escapeHtml(canonical)}">`);
  }
  lines.push(tag('property', 'og:site_name', 'Mária Novotná'), tag('property', 'og:title', title), tag('property', 'og:description', description),
    tag('property', 'og:type', pageKind === 'home' ? 'website' : 'article'), tag('property', 'og:locale', copy.ogLocale));
  if (canonical) lines.push(tag('property', 'og:url', canonical));
  if (socialImage) lines.push(tag('property', 'og:image', socialImage), tag('property', 'og:image:alt', imageAlt));
  lines.push(tag('name', 'twitter:card', socialImage ? 'summary_large_image' : 'summary'), tag('name', 'twitter:title', title), tag('name', 'twitter:description', description));
  if (socialImage) lines.push(tag('name', 'twitter:image', socialImage), tag('name', 'twitter:image:alt', imageAlt));
  const graph = structuredData({ locale, route: path, title, description, image: socialImage, kind: pageKind, project, origin });
  lines.push(`<script type="application/ld+json">${jsonText(graph)}</script>`, '<!-- SEO:END -->');
  return lines.join('\n');
}

/** Write discovery files only for actual page routes; an unconfigured preview has no sitemap. */
export async function writeDiscovery({ outputDir, routes = [], siteUrl } = {}) {
  if (!outputDir) throw new Error('Discovery outputDir is required.');
  const origin = publicOrigin(siteUrl);
  const directory = resolve(outputDir);
  await mkdir(directory, { recursive: true });
  const pages = new Map();
  routes.forEach(({ locale = 'en', route = '/' }) => {
    const path = localizedRoute(route, locale);
    pages.set(path, { route: path });
  });
  const sitemapPath = resolve(directory, 'sitemap.xml');
  if (!origin) {
    await writeFile(resolve(directory, 'robots.txt'), 'User-agent: *\nAllow: /\n', 'utf8');
    try { await unlink(sitemapPath); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    return { siteUrl: '', routeCount: pages.size, sitemapWritten: false };
  }
  const entries = [...pages.values()].sort((a, b) => a.route.localeCompare(b.route)).map((page) =>
    ['  <url>', `    <loc>${escapeHtml(`${origin}${page.route}`)}</loc>`, '  </url>'].join('\n'));
  const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...entries, '</urlset>', ''].join('\n');
  await writeFile(sitemapPath, sitemap, 'utf8');
  await writeFile(resolve(directory, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, 'utf8');
  return { siteUrl: origin, routeCount: pages.size, sitemapWritten: true };
}
