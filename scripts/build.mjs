import { cp, mkdir, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('site');
const destination = resolve('dist');
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
async function countFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const counts = await Promise.all(entries.map(entry => entry.isDirectory() ? countFiles(resolve(path, entry.name)) : 1));
  return counts.reduce((a, b) => a + b, 0);
}
console.log(`Static site ready in dist (${await countFiles(destination)} files).`);
