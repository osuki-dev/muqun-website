/**
 * The catalogue's derived answers -- a page of it, one entry of it -- as pure
 * functions over a parsed `index.json`. `index.ts` owns the bucket, the edge
 * cache and the headers; this file owns only the rules, so they can be run
 * from a script with no Worker around them (`bun some-check.ts`).
 *
 * The search rule is the CLI's, `muqun-theme list --search` in its
 * `catalog.ts`: a case-insensitive substring over id, name, author,
 * description and tags. The gallery's search box applies the same rule in
 * the browser, so the three agree on what "matches" means.
 */

/** The only shape an id has; a request segment that fails it is not a lookup. */
export const THEME_ID = /^[a-z][a-z0-9-]*$/;

/**
 * What `preview` in an index row may name: the cover the themes repository's
 * CI publishes beside the package, in any of the spellings that name it.
 *
 * `muqun-theme build` writes the repository-relative `dist/previews/<id>.<ext>`.
 * The contract the app reads describes the same file as an absolute `https`
 * URL on the catalogue's own base, and resolves a relative
 * `previews/<id>.<ext>` against that base to the same address. One file, three
 * spellings, so all three are read here; anything else is read as "no
 * preview", never as a path, because the index is data from a repository
 * anyone can send a pull request to.
 *
 * The capture is the public file name, and it is the only part that survives:
 * the address a client is handed is rebuilt from it under this request's own
 * origin (`describeEntry`), so an absolute value naming some other host cannot
 * become a request for that host. It is a name in our own bucket, or it is
 * nothing.
 */
export const PREVIEW_PATH = /^(?:dist\/)?previews\/([a-z][a-z0-9-]*\.(?:webp|png|jpe?g))$/;
/** The same file spelled as an absolute URL: the path it must have under this API. */
export const PREVIEW_URL_PATH = /^\/api\/themes\/(?:dist\/)?previews\/([a-z][a-z0-9-]*\.(?:webp|png|jpe?g))$/;
/** A bound on the field before anything parses it, the same one the app applies. */
export const MAX_PREVIEW_LENGTH = 2048;

export const DEFAULT_PER_PAGE = 20;
export const MAX_PER_PAGE = 100;

/** One row of `index.json`, as far as this API reads it. Everything else passes through. */
export interface IndexEntry {
  id: string;
  name?: string;
  author?: string;
  description?: string;
  tags?: string[];
  preview?: string;
  [key: string]: unknown;
}

/** A row with the two addresses a client would otherwise have to build itself. */
export type DescribedEntry = IndexEntry & { url: string; previewUrl?: string };

export interface PageQuery {
  page: number;
  perPage: number;
  /** Trimmed, as typed; the comparison lower-cases both sides. */
  q: string;
}

export interface CataloguePage {
  format: 'muqun-themes-page';
  /** Rows in the index. */
  total: number;
  /** Rows the search matched, before paging. */
  matched: number;
  page: number;
  pages: number;
  perPage: number;
  themes: DescribedEntry[];
}

/** Any of the three parameters, even empty, asks for a page rather than the file. */
export function isPageRequest(params: URLSearchParams): boolean {
  return params.has('page') || params.has('per_page') || params.has('q');
}

function positiveInteger(value: string | null, fallback: number): number | undefined {
  if (value === null || value === '') return fallback;
  return /^[1-9][0-9]{0,8}$/.test(value) ? Number(value) : undefined;
}

/** `page` and `per_page` default when absent, and are refused rather than guessed when malformed. */
export function parsePageQuery(params: URLSearchParams): PageQuery | { error: string } {
  const page = positiveInteger(params.get('page'), 1);
  if (page === undefined) return { error: 'page must be a positive integer' };
  const perPage = positiveInteger(params.get('per_page'), DEFAULT_PER_PAGE);
  if (perPage === undefined) return { error: 'per_page must be a positive integer' };
  return { page, perPage: Math.min(perPage, MAX_PER_PAGE), q: (params.get('q') ?? '').trim() };
}

/**
 * The rows of a parsed `index.json`, sorted by id. A row without a usable id
 * is dropped rather than fatal: it could not be addressed anyway, and one bad
 * row should not take the catalogue down. Not an index at all is `null`.
 */
export function indexRows(data: unknown): IndexEntry[] | null {
  if (typeof data !== 'object' || data === null) return null;
  const index = data as { format?: unknown; themes?: unknown };
  if (index.format !== 'muqun-themes-index' || !Array.isArray(index.themes)) return null;
  return (index.themes as unknown[])
    .filter(
      (row): row is IndexEntry =>
        typeof row === 'object' && row !== null && typeof (row as IndexEntry).id === 'string' && THEME_ID.test((row as IndexEntry).id),
    )
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

const haystack = (entry: IndexEntry): string =>
  [entry.id, entry.name, entry.author, entry.description, ...(Array.isArray(entry.tags) ? entry.tags : [])]
    .filter((part): part is string => typeof part === 'string')
    .join('\n')
    .toLowerCase();

/** The public file name a row's `preview` points at, or nothing. */
export function previewFile(entry: IndexEntry): string | undefined {
  const value = entry.preview;
  if (typeof value !== 'string' || value.length > MAX_PREVIEW_LENGTH) return undefined;
  let absolute: URL | null = null;
  try {
    absolute = new URL(value);
  } catch {
    // Parsing failed because there is no scheme, which is what a
    // repository-relative path looks like. Read it as one.
  }
  if (!absolute) return PREVIEW_PATH.exec(value)?.[1];
  return absolute.protocol === 'https:' ? PREVIEW_URL_PATH.exec(absolute.pathname)?.[1] : undefined;
}

/**
 * A row plus its absolute addresses under `<origin>/api/themes/`. `url` is
 * always there; `previewUrl` only when the row names a preview the API would
 * actually serve.
 */
export function describeEntry(entry: IndexEntry, origin: string): DescribedEntry {
  const file = previewFile(entry);
  return {
    ...entry,
    url: `${origin}/api/themes/${entry.id}.muqun-theme`,
    ...(file ? { previewUrl: `${origin}/api/themes/previews/${file}` } : {}),
  };
}

/** A page past the end is an empty page with the right `pages`, not an error. */
export function selectPage(rows: IndexEntry[], query: PageQuery, origin: string): CataloguePage {
  const needle = query.q.toLowerCase();
  const matched = needle ? rows.filter((row) => haystack(row).includes(needle)) : rows;
  const pages = Math.max(1, Math.ceil(matched.length / query.perPage));
  const start = (query.page - 1) * query.perPage;
  return {
    format: 'muqun-themes-page',
    total: rows.length,
    matched: matched.length,
    page: query.page,
    pages,
    perPage: query.perPage,
    themes: matched.slice(start, start + query.perPage).map((row) => describeEntry(row, origin)),
  };
}

/**
 * A short, bounded token for one query, for the ETag of its page: FNV-1a over
 * the three parameters. The ETag's job is only to tell one body from another
 * at the same URL, and the index's own ETag already covers the part that can
 * change there; this keeps two different queries from sharing a tag without
 * writing an arbitrarily long `q` into a header.
 */
export function queryTag(query: PageQuery): string {
  const text = `${query.page}\n${query.perPage}\n${query.q}`;
  let hash = 0x811c9dc5;
  for (const byte of new TextEncoder().encode(text)) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `p${hash.toString(16).padStart(8, '0')}`;
}
