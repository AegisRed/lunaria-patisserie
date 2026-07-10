import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const matches = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
const local = [...new Set(matches.filter((value) => !/^(?:https?:|mailto:|tel:|#|data:)/.test(value)))];
const missing = [];
for (const reference of local) {
  const clean = reference.replace(/^\.\//, '').split(/[?#]/)[0];
  try { await access(path.join(root, clean)); }
  catch { missing.push(reference); }
}
if (missing.length) {
  console.error(`Missing local assets:\n${missing.map((entry) => `- ${entry}`).join('\n')}`);
  process.exit(1);
}
console.log(`Checked ${local.length} local HTML asset references.`);
