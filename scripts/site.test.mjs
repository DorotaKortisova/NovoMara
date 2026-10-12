import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,stat,rm} from 'node:fs/promises';
import {resolve,join,dirname,basename} from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {prepareSite} from './prepare-site.mjs';

test('all 15 English pages retain content, metadata, schema and valid local links without language controls', async () => {
  const output=await mkdtemp(join(tmpdir(),'novomara-pages-'));
  try {
    const pages=await prepareSite(output,{siteUrl:'https://example.com'});
    assert.equal(pages.length,15);
    const titles=new Set();
    for (const page of pages) {
      assert.equal(page.locale,'en');
      const route=page.route;
      const html=await readFile(resolve(output,'.'+route,'index.html'),'utf8');
      assert.match(html,new RegExp(`<html lang="${page.locale}"`));
      assert.equal((html.match(/<h1\b/g)||[]).length,1,route+' has one main heading');
      assert.equal((html.match(/<title>/g)||[]).length,1);
      assert.equal((html.match(/name="description"/g)||[]).length,1);
      assert.match(html,/name="robots" content="index,follow,max-image-preview:large"/);
      assert.ok(html.includes(`rel="canonical" href="https://example.com${route}"`));
      assert.doesNotMatch(html,/hreflang|language-nav|data-language-link|portfolio-i18n|href="\/(?:cs|sk)\//);
      const title=html.match(/<title>(.*?)<\/title>/s)[1];
      assert.ok(!titles.has(page.locale+':'+title),'unique title within a language: '+title); titles.add(page.locale+':'+title);
      JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
      const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
      assert.equal(ids.length,new Set(ids).size,'unique IDs: '+route);
      for (const [,value] of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:#[^"]*)?"/g)) {
        if (value.startsWith('//')) continue;
        const file=value.startsWith('/assets/')?resolve('site','.'+value):resolve(output,'.'+value,'index.html');
        assert.ok((await stat(file)).isFile(),'valid link: '+route+' → '+value);
      }
      if (page.kind==='home') {
        assert.ok(html.indexOf('id="cv"')<html.indexOf('id="contact"'));
        assert.match(html,/href="\/assets\/documents\/2026_CV_novotna.pdf" download=/);
        assert.match(html,/<details class="cv-details">/);
        assert.equal((html.match(/data-project-slide=/g)||[]).length,13);
      } else if (!page.route.includes('history-of-mountain')) assert.match(html,/class="detail-layout"/);
    }
    const house=await readFile(join(output,'projects/house-isb/index.html'),'utf8');
    assert.match(house,/<title>House ISB/);
    assert.match(house,/Near Brno, Czech Republic/);
    const phd=await readFile(join(output,'projects/history-of-mountain-hut-architecture/index.html'),'utf8');
    assert.match(phd,/How do terrain, climate, technology and society/);
    const home=await readFile(join(output,'index.html'),'utf8');
    assert.match(home,/Trenčín, Slovakia/);
    await assert.rejects(stat(join(output,'sk')),{code:'ENOENT'});
    await assert.rejects(stat(join(output,'cs')),{code:'ENOENT'});
    const sitemap=await readFile(join(output,'sitemap.xml'),'utf8');
    assert.equal((sitemap.match(/<loc>/g)||[]).length,15);
    assert.doesNotMatch(sitemap,/hreflang|xhtml:|\/(?:sk|cs)\//);
  } finally {
    const target=resolve(output);
    assert.equal(dirname(target),resolve(tmpdir()));
    assert.ok(basename(target).startsWith('novomara-pages-'));
    await rm(target,{recursive:true,force:true});
  }
});

test('the published CV file is a readable PDF with unchanged source bytes', async () => {
  const pdf=await readFile('site/assets/documents/2026_CV_novotna.pdf');
  assert.ok(pdf.subarray(0,5).equals(Buffer.from('%PDF-')));
  assert.equal(createHash('sha256').update(pdf).digest('hex'),'0babddbc8c1e0af5aec9793ce7460af20b9f1b3831487d6b02881b67e63d6447');
});
