/**
 * Where the gallery's data comes from. The one file to change if it moves.
 *
 * Three fetches, all from the browser and all from the same base URL:
 *
 *   <base>index.json                 the list, written by `muqun-theme build`
 *   <base>dist/<id>.muqun-theme      one package, read by `theme-package.ts`
 *   <base>dist/previews/<id>.<ext>   a theme's preview image, when the index names one
 *
 * In production `<base>` is this site's own `/api/themes/`: the Worker in
 * `worker/index.ts` serves an R2 bucket that the themes repository's CI
 * fills after every merge. Same origin, so no CORS, no GitHub token, and no
 * dependency on whether that repository is public. The CLI's `list` and the
 * app read the same address, so there is one catalogue, not one per reader.
 * The index carries everything a card needs -- name, description, tags,
 * size -- so nothing is unzipped until a preview is actually on screen.
 *
 * ── Local development ────────────────────────────────────────────────────────
 * `astro dev` does not run the Worker, so a relative `/api/themes/` would hit
 * nothing. With no configuration, dev reads the production API. Otherwise
 * `scripts/themes-dev-source.mjs` serves `/__muqun-themes/` from a fixture
 * directory or by proxying GitHub with a token it reads from the environment,
 * and swaps `__MUQUN_THEMES_DEV_BASE__` in; a production build always defines
 * it `null`.
 * ────────────────────────────────────────────────────────────────────────────
 */
import { themesApiBase, themesSourceBase } from './muqun-links';

declare const __MUQUN_THEMES_DEV_BASE__: string | null;

const base: string = __MUQUN_THEMES_DEV_BASE__ ?? themesApiBase;

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
  /**
   * Repository-relative, `dist/previews/<id>.<webp|png|jpg>`: the author's
   * preview, copied out of the package at build time so a card can show it
   * without downloading the package. Absent for a theme that ships none.
   */
  preview?: string;
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
/** Same rule for a preview. The capture is the file name the API serves it under. */
const PREVIEW_PATH = /^dist\/previews\/([a-z][a-z0-9-]*\.(?:webp|png|jpe?g))$/;

export function themeIndexUrl(): string {
  return `${base}index.json`;
}

export function themePackageUrl(entry: ThemeIndexEntry): string {
  // The API serves a package by its public name, without the repository's
  // dist/ prefix; a dev source (fixture or raw host) keeps the repository
  // layout, so there the `package` path is the URL.
  return __MUQUN_THEMES_DEV_BASE__ ? `${base}${entry.package}` : `${base}${entry.id}.muqun-theme`;
}

/**
 * The preview image the index names for a theme, or nothing. Same two forms
 * as the package: `<base>previews/<file>` from the API, the repository's
 * `dist/previews/<file>` from a dev source.
 */
export function themePreviewUrl(entry: ThemeIndexEntry): string | undefined {
  const file = entry.preview ? PREVIEW_PATH.exec(entry.preview)?.[1] : undefined;
  if (!file) return undefined;
  return __MUQUN_THEMES_DEV_BASE__ ? `${base}${entry.preview}` : `${base}previews/${file}`;
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
  // not take the gallery down with it. A `preview` that is not the one path
  // shape a preview has is dropped from its row the same way -- the card then
  // draws the theme from its package, as it would for a theme with none.
  // Sorted by id, as the CLI writes them.
  return (data as ThemeIndex).themes
    .filter(isEntry)
    .map((entry) => {
      if (entry.preview === undefined || (typeof entry.preview === 'string' && PREVIEW_PATH.test(entry.preview)))
        return entry;
      const { preview: _preview, ...rest } = entry;
      return rest;
    })
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
