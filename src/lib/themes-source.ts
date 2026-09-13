/**
 * Where the gallery's data comes from. The one file to change if it moves.
 *
 * Two fetches, both from the browser and both from the same base URL:
 *
 *   <base>index.json                 the list, written by `muqun-theme index`
 *   <base>dist/<id>.muqun-theme      one package, read by `theme-package.ts`
 *
 * In production `<base>` is the repository on GitHub's raw host, which sends
 * `Access-Control-Allow-Origin: *` and so can be read from this origin with
 * no server of ours in between. The index carries everything a card needs --
 * name, description, tags, size -- so nothing is unzipped until a preview is
 * actually on screen.
 *
 * ── Local development ────────────────────────────────────────────────────────
 * The repository is private until launch, and a token must never reach the
 * client. So the dev server, and only the dev server, can stand in for the
 * raw host: `scripts/themes-dev-source.mjs` serves `/__muqun-themes/` either
 * from a fixture directory or by proxying to GitHub with a token it reads
 * from the environment. It swaps `__MUQUN_THEMES_DEV_BASE__` in at that point;
 * a production build always defines it `null` and the public base wins.
 * ────────────────────────────────────────────────────────────────────────────
 */
import { themesRawBase, themesSourceBase } from './muqun-links';

declare const __MUQUN_THEMES_DEV_BASE__: string | null;

const base: string = __MUQUN_THEMES_DEV_BASE__ ?? themesRawBase;

/** One row of `index.json`. The optional fields are the manifest's own. */
export interface ThemeIndexEntry {
  id: string;
  name: string;
  version: string;
  author?: string;
  license?: string;
  source?: string;
  description?: string;
  tags?: string[];
  minAppVersion?: string;
  /** Repository-relative, `dist/<id>.muqun-theme`. */
  package: string;
  bytes: number;
  sha256?: string;
  assets?: number;
}

export interface ThemeIndex {
  format: 'muqun-themes-index';
  themes: ThemeIndexEntry[];
}

export class ThemeSourceError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'ThemeSourceError';
  }
}

/**
 * The only path shape a package may have. Checked before a URL is built from
 * it: the index is data from a repository anyone can send a pull request to,
 * and a row that named `../something` must not become a request for it.
 */
const PACKAGE_PATH = /^dist\/[a-z][a-z0-9-]*\.muqun-theme$/;

export function themeIndexUrl(): string {
  return `${base}index.json`;
}

export function themePackageUrl(entry: ThemeIndexEntry): string {
  return `${base}${entry.package}`;
}

/** The theme's authored source in the repository (on `main`), for the "source" link. */
export function themeSourceUrl(entry: ThemeIndexEntry): string {
  return `${themesSourceBase}${entry.id}`;
}

function isEntry(value: unknown): value is ThemeIndexEntry {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'string' &&
    /^[a-z][a-z0-9-]*$/.test(row.id) &&
    typeof row.name === 'string' &&
    typeof row.version === 'string' &&
    typeof row.package === 'string' &&
    PACKAGE_PATH.test(row.package) &&
    row.package === `dist/${row.id}.muqun-theme` &&
    typeof row.bytes === 'number'
  );
}

export async function loadThemeIndex(signal?: AbortSignal): Promise<ThemeIndexEntry[]> {
  const response = await fetch(themeIndexUrl(), { signal, cache: 'no-cache' });
  if (!response.ok) throw new ThemeSourceError(`index.json: HTTP ${response.status}`, response.status);
  const data: unknown = await response.json();
  if (
    typeof data !== 'object' ||
    data === null ||
    (data as ThemeIndex).format !== 'muqun-themes-index' ||
    !Array.isArray((data as ThemeIndex).themes)
  ) {
    throw new ThemeSourceError('index.json is not a muqun-themes-index');
  }
  // Rows that fail the shape are dropped, not fatal: one bad entry should
  // not take the gallery down with it. Sorted by id, as the CLI writes them.
  return (data as ThemeIndex).themes
    .filter(isEntry)
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

export async function loadThemePackageBytes(
  entry: ThemeIndexEntry,
  signal?: AbortSignal,
): Promise<Uint8Array> {
  const response = await fetch(themePackageUrl(entry), { signal });
  if (!response.ok) throw new ThemeSourceError(`${entry.package}: HTTP ${response.status}`, response.status);
  return new Uint8Array(await response.arrayBuffer());
}
