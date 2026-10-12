import test from 'node:test';
import assert from 'node:assert/strict';
import {cp, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile} from 'node:fs/promises';
import {basename, dirname, join, resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const execute = promisify(execFile);
const buildScript = resolve('scripts/build.mjs');

async function fixture(run) {
  const directory = await mkdtemp(join(tmpdir(), 'novomara-build-'));
  try {
    await cp(resolve('site'), join(directory, 'site'), {recursive: true});
    await cp(resolve('content'), join(directory, 'content'), {recursive: true});
    const env = {...process.env, SITE_URL: ''};
    delete env.PREVIEW_BASE_PATH;
    await run(directory, env);
  } finally {
    const target = resolve(directory);
    assert.equal(dirname(target), resolve(tmpdir()));
    assert.ok(basename(target).startsWith('novomara-build-'));
    await rm(target, {recursive: true, force: true});
  }
}

async function files(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? files(join(directory, entry.name)) : [join(directory, entry.name)]))).flat();
}

test('rebuild removes retired pages and assets without copying stale source HTML or changing authoring files', async () => {
  await fixture(async (directory, env) => {
    const home = join(directory, 'site/index.html');
    const original = await readFile(home);
    const retiredSource = join(directory, 'site/sk/index.html');
    await mkdir(dirname(retiredSource), {recursive: true});
    await writeFile(retiredSource, 'Retired source translation');
    const retiredOutput = join(directory, 'dist/projects/retired/index.html');
    await mkdir(dirname(retiredOutput), {recursive: true});
    await writeFile(retiredOutput, 'Retired output project');
    const oldAsset = join(directory, 'site/assets/old-build-probe.txt');
    await writeFile(oldAsset, 'Temporary source asset');

    await execute(process.execPath, [buildScript], {cwd: directory, env});
    await assert.rejects(stat(retiredOutput), {code: 'ENOENT'});
    await assert.rejects(stat(join(directory, 'dist/sk')), {code: 'ENOENT'});
    assert.ok((await stat(join(directory, 'dist/assets/old-build-probe.txt'))).isFile());
    assert.equal((await files(join(directory, 'dist'))).filter(file => file.endsWith('.html')).length, 15);

    await rm(oldAsset);
    await mkdir(dirname(retiredOutput), {recursive: true});
    await writeFile(retiredOutput, 'A stale page between builds');
    await execute(process.execPath, [buildScript], {cwd: directory, env});
    await assert.rejects(stat(retiredOutput), {code: 'ENOENT'});
    await assert.rejects(stat(join(directory, 'dist/assets/old-build-probe.txt')), {code: 'ENOENT'});
    assert.deepEqual(await readFile(home), original);
    assert.equal(await readFile(retiredSource, 'utf8'), 'Retired source translation');
    assert.deepEqual(await readFile(join(directory, 'dist/assets/documents/2026_CV_novotna.pdf')),
      await readFile(join(directory, 'site/assets/documents/2026_CV_novotna.pdf')));
  });
});

test('GitHub approval preview prefixes every local URL and remains noindex even with a configured production origin', async () => {
  await fixture(async (directory, env) => {
    await execute(process.execPath, [buildScript], {
      cwd: directory, env: {...env, SITE_URL: 'https://example.com', PREVIEW_BASE_PATH: '/NovoMara/'},
    });
    const htmlFiles = (await files(join(directory, 'dist'))).filter(file => file.endsWith('.html'));
    assert.equal(htmlFiles.length, 15);
    for (const file of htmlFiles) {
      const html = await readFile(file, 'utf8');
      assert.match(html, /name="robots" content="noindex,follow"/);
      assert.doesNotMatch(html, /rel="canonical"|property="og:url"/);
      for (const [, url] of html.matchAll(/(?:href|src|action)="(\/[^\"]*)"/g)) {
        assert.ok(url.startsWith('/NovoMara/'), file + ' → ' + url);
        const relative = url.slice('/NovoMara/'.length).split('#')[0];
        const target = resolve(directory, 'dist', relative, ...(relative.endsWith('/') || !relative ? ['index.html'] : []));
        assert.ok((await stat(target)).isFile(), file + ' has an existing preview target: ' + url);
      }
    }
    const home = await readFile(join(directory, 'dist/index.html'), 'utf8');
    assert.match(home, /href="\/NovoMara\/assets\/documents\/2026_CV_novotna.pdf" download=/);
    assert.match(home, /action="mailto:maria.novotna27@gmail.com"/);
    await assert.rejects(stat(join(directory, 'dist/sitemap.xml')), {code: 'ENOENT'});
    assert.ok((await stat(join(directory, 'dist/.nojekyll'))).isFile());
  });
});
