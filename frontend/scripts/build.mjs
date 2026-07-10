import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(scriptDir, '..');
const projectDir = path.resolve(frontendDir, '..');
const sourceDir = path.join(frontendDir, 'src');
const targets = [path.join(frontendDir, 'dist'), path.join(projectDir, 'docs')];

await cp(path.join(sourceDir, 'data', 'products.json'), path.join(projectDir, 'backend', 'app', 'catalog.json'));

for (const target of targets) {
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });
  await cp(sourceDir, target, { recursive: true });
  await writeFile(path.join(target, '.nojekyll'), '', 'utf8');
}
console.log(`Synchronized backend catalog and built storefront into:\n${targets.map((target) => `- ${target}`).join('\n')}`);
