import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { renderSeo, writeDiscovery } from './seo.mjs';

const sourceRoot = resolve('site');
const decodeHtml = value => value.replace(/&(?:amp|lt|gt|quot|apos|#39|#\d+|#x[\da-f]+);/gi, entity => {
  const named = {'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&#39;':"'"};
  if (named[entity.toLowerCase()]) return named[entity.toLowerCase()];
  return String.fromCodePoint(parseInt(entity.slice(entity[2].toLowerCase() === 'x' ? 3 : 2, -1), entity[2].toLowerCase() === 'x' ? 16 : 10));
});
const plain = html => decodeHtml(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
const cleanManaged = html => html.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, '')
  .replace(/<!-- LANG:START -->[\s\S]*?<!-- LANG:END -->/g, '')
  .replace(/\s*<script type="application\/json" id="portfolio-i18n">[\s\S]*?<\/script>/g, '');
const pageCopy = {
  homeTitle:'Mária Novotná | Architecture, Heritage & Research',
  homeDescription:'Architecture and research by Mária Novotná: mountain heritage, modernism, exhibitions, housing, interiors and public space in Slovakia, Czechia and beyond.',
  phdTitle:'Mountain Hut Architecture & Heritage | Mária Novotná',
  phdDescription:'Mountain hut architecture in Slovakia’s High Tatras and Western Carpathians: history, Téry Hut, Rysy, Sliezsky dom, restoration and comparative research.',
};

function assemble(html, metadata, siteUrl) {
  html = cleanManaged(html);
  html = html.replace(/<title>[\s\S]*?<\/title>\s*/g, '').replace(/<meta name="description"[^>]*>\s*/g, '');
  html = html.replace('</head>', renderSeo({...metadata,siteUrl})+'\n</head>');
  return html;
}

function projectSource(article, header, footer, group) {
  const mediaStart = article.indexOf('<div class="project-media">');
  const infoStart = article.indexOf('<div class="project-info">');
  const media = article.slice(mediaStart,infoStart).trim().replaceAll('project-media-grid project-gallery-stage','detail-gallery');
  const info = article.slice(infoStart,article.lastIndexOf('</article>')).replace(/<p class="project-detail-link">[\s\S]*?<\/p>/g,'')
    .replace(/<p class="project-scroll-hint"[^>]*><\/p>/g,'').replaceAll('project-info-header','detail-header')
    .replaceAll('project-info','detail-info').replaceAll('project-details-scroll','detail-text')
    .replace(/<h3 class="project-title"/,'<h1 class="project-title"').replace(/(<h1 class="project-title"[\s\S]*?)<\/h3>/,'$1</h1>')
    .replace(/(<div class="overview">)<h4>([\s\S]*?)<\/h4>/,'$1<h2>$2</h2>');
  const back = group === 'research' ? 'Back to research' : 'Back to practice';
  const anchor = group === 'research' ? 'selected-projects' : 'practice';
  return `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/assets/styles.css"><script type="module" src="/assets/portfolio.js"></script></head><body id="top" class="project-detail-page"><a class="skip-link" href="#main">Skip to content</a>${header}<main id="main" class="project-document"><nav class="project-breadcrumbs" aria-label="Portfolio"><a href="/">Portfolio</a><span aria-hidden="true"> / </span><a href="/#${anchor}">${group==='research'?'Research':'Practice'}</a></nav><article class="detail-layout">${info}${media}</article><p class="project-return"><a class="button" href="/#${anchor}">${back} <span aria-hidden="true">↗</span></a></p></main>${footer}</body></html>`;
}

/** Prepare the English portfolio, project pages and source-grounded SEO. */
export async function prepareSite(outputDir = sourceRoot, {siteUrl} = {}) {
  const directory = resolve(outputDir);
  let home = cleanManaged(await readFile(resolve(sourceRoot,'index.html'),'utf8'));
  home = home.replace(/<button type="button" data-project-select="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g, (_,slug,label) => `<a href="/projects/${slug}/" data-project-select="${slug}">${label}</a>`);
  try {
    const cv = await readFile(resolve('content/cv.html'),'utf8');
    home = home.replace(/<!-- CV:START -->[\s\S]*?<!-- CV:END -->\s*/g,'');
    home = home.replace('<section id="contact"','<!-- CV:START -->'+cv+'<!-- CV:END -->\n    <section id="contact"');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const phd = cleanManaged(await readFile(resolve(sourceRoot,'projects/history-of-mountain-hut-architecture/index.html'),'utf8'));
  const header = home.match(/<header class="site-header">[\s\S]*?<\/header>/)[0].replace(/href="#(research|practice|publications|cv|contact)"/g,'href="/#$1"');
  const footer = home.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)[0];
  const articles = [...home.matchAll(/<article class="project-sheet" data-project-slide="([^"]+)"[\s\S]*?<\/article>/g)].map(match=>({slug:match[1],html:match[0],group:home.indexOf(match[0]) < home.indexOf('<section id="practice"')?'research':'practice'}));
  const routes=[];
    const pages = [
      {html:home,route:'/',kind:'home',title:pageCopy.homeTitle,description:pageCopy.homeDescription,image:'/assets/images/uvod.webp',imageAlt:'An architectural collage bringing mountain landscapes and buildings into one composition.'},
      {html:phd,route:'/projects/history-of-mountain-hut-architecture/',kind:'project',title:pageCopy.phdTitle,description:pageCopy.phdDescription,image:'/assets/images/mountain-landscape.webp',imageAlt:'High Tatras mountain landscape, with steep rock formations and alpine terrain.',project:{name:pageCopy.phdTitle.split(' | ')[0],topics:['Mountain Hut Architecture','Historical research','Restoration case study','Materials & prefabrication'],location:'Western Carpathians',sourceUrls:['https://doi.org/10.2478/alfa-2022-0002','https://doi.org/10.2478/alfa-2023-0005','https://doi.org/10.31577/archandurb.2022.56.1-2.10','https://doi.org/10.30682/aa2310r']}}
    ];
    for (const {slug,html,group} of articles) {
      const name = plain(html.match(/<h3 class="project-title"[^>]*>([\s\S]*?)<\/h3>/)[1]);
      const summary = plain(html.match(/<div class="overview">[\s\S]*?<p>([\s\S]*?)<\/p>/)[1]);
      const topic = plain(html.match(/<p class="eyebrow">([\s\S]*?)<\/p>/)[1]);
      const location = html.match(/<dt>(?:Location|Place|Places)<\/dt><dd>(.*?)<\/dd>/);
      const image = html.match(/<img src="([^"]+)"[^>]*alt="([^"]*)"/);
      pages.push({html:projectSource(html,header,footer,group),route:`/projects/${slug}/`,kind:'project',title:`${name} — ${topic.split(' / ').at(-1)} | Mária Novotná`,description:summary,image:image[1],imageAlt:decodeHtml(image[2]),project:{name,topics:topic.split(' / '),...(location && {location:plain(location[1])})}});
    }
    for (const {html,...metadata} of pages) {
      const page={...metadata,locale:'en'};
      const file=resolve(directory,'.'+page.route,'index.html');
      await mkdir(dirname(file),{recursive:true});
      await writeFile(file,assemble(html,page,siteUrl),'utf8');
      routes.push(page);
    }
  await writeDiscovery({outputDir:directory,routes,siteUrl});
  console.log(`Prepared ${routes.length} English portfolio pages.`);
  return routes;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await prepareSite(process.argv[2] || sourceRoot);
