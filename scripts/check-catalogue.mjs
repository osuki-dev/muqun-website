/**
 * The catalogue's rules, run without a Worker: `bun run check:catalogue`.
 *
 * `worker/themes-catalogue.ts` is pure functions over a parsed `index.json`
 * precisely so they can be checked from a script, and this is that script. It
 * covers the part of the API that is decided by data someone else publishes --
 * the rows of the index -- and in particular `preview`, which is optional, is
 * written by a repository anyone can send a pull request to, and becomes an
 * address both the gallery and the app fetch.
 *
 * It also reads `fixtures/themes/index.json`, so a fixture naming a cover it
 * does not ship fails here rather than showing a broken image under
 * `bun run dev:fixture`.
 *
 * `.mjs`, like the other scripts, to stay out of `astro check`: it imports a
 * TypeScript module, which Bun resolves and transpiles on the way in.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

import { describeEntry, indexRows, previewFile, selectPage } from '../worker/themes-catalogue.ts';

const ORIGIN = 'https://muqun.dev';
const row = (preview) => (preview === undefined ? { id: 'voyage' } : { id: 'voyage', preview });

// The spellings one published cover has. All of them name the same file, and
// only that file name survives: the address handed out is rebuilt under the
// request's own origin.
for (const spelling of [
  'dist/previews/voyage.webp',
  'previews/voyage.webp',
  'https://muqun.dev/api/themes/previews/voyage.webp',
  'https://muqun.dev/api/themes/dist/previews/voyage.webp',
]) {
  assert.equal(previewFile(row(spelling)), 'voyage.webp', `should resolve: ${spelling}`);
}
for (const extension of ['png', 'jpg', 'jpeg']) {
  assert.equal(previewFile(row(`dist/previews/voyage.${extension}`)), `voyage.${extension}`);
}

// Everything else is "no preview", never a path: not another host, another
// route, another file type, a traversal, a scheme, or an empty string.
for (const refused of [
  '',
  'dist/previews/../../etc/passwd',
  'dist/previews/voyage.svg',
  'dist/voyage.muqun-theme',
  '/api/themes/previews/voyage.webp',
  'http://muqun.dev/api/themes/previews/voyage.webp',
  'https://example.com/previews/voyage.webp',
  'https://muqun.dev/previews/voyage.webp',
  `https://muqun.dev/api/themes/previews/${'v'.repeat(2100)}.webp`,
  'data:image/webp;base64,AAAA',
  42,
  null,
]) {
  assert.equal(previewFile(row(refused)), undefined, `should be refused: ${String(refused)}`);
}
assert.equal(previewFile(row(undefined)), undefined);

// `previewUrl` is there only when the row names a cover this API would serve,
// and absent -- not null, not empty -- when it does not. The row itself passes
// through untouched.
const described = describeEntry(row('dist/previews/voyage.webp'), ORIGIN);
assert.equal(described.url, `${ORIGIN}/api/themes/voyage.muqun-theme`);
assert.equal(described.previewUrl, `${ORIGIN}/api/themes/previews/voyage.webp`);
assert.equal(described.preview, 'dist/previews/voyage.webp');
assert.ok(!('previewUrl' in describeEntry(row(undefined), ORIGIN)));
assert.ok(!('previewUrl' in describeEntry(row('https://example.com/x.webp'), ORIGIN)));

// The fixture: a real index, and every cover it names is a file it ships.
const rows = indexRows(JSON.parse(readFileSync('fixtures/themes/index.json', 'utf8')));
assert.ok(rows && rows.length > 0, 'fixtures/themes/index.json is not a muqun-themes-index');
for (const entry of rows) {
  assert.ok(
    existsSync(`fixtures/themes/dist/${entry.id}.muqun-theme`),
    `fixtures: ${entry.id} names a package it does not ship`,
  );
  if (entry.preview === undefined) continue;
  const file = previewFile(entry);
  assert.ok(file, `fixtures: ${entry.id} has a preview this API would not serve: ${String(entry.preview)}`);
  assert.ok(
    existsSync(`fixtures/themes/dist/previews/${file}`),
    `fixtures: ${entry.id} names the cover dist/previews/${file}, which the fixture does not ship`,
  );
}

// A page is those rows with those addresses, sorted by id.
const page = selectPage(rows, { page: 1, perPage: 20, q: '' }, ORIGIN);
assert.equal(page.format, 'muqun-themes-page');
assert.equal(page.total, rows.length);
assert.deepEqual(
  page.themes.map((entry) => entry.id),
  [...rows.map((entry) => entry.id)].sort(),
);

const covered = rows.filter((entry) => previewFile(entry) !== undefined).length;
console.log(`Catalogue rules hold: ${rows.length} fixture row(s), ${covered} with a preview cover.`);
