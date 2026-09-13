/**
 * The only server-side code on muqun.dev, and it exists for three reasons the
 * static files cannot cover: one redirect that must never chain, a set of
 * headers that must be on every response, and the themes API, which reads an
 * R2 bucket that is nowhere else reachable.
 */
import {
  THEME_ID,
  describeEntry,
  indexRows,
  isPageRequest,
  parsePageQuery,
  queryTag,
  selectPage,
  type IndexEntry,
  type PageQuery,
} from './themes-catalogue';

interface Env {
  ASSETS: Fetcher;
  /** The `muqun-themes` bucket: `index.json`, `dist/<id>.muqun-theme` and `dist/previews/<id>.<ext>`. */
  THEMES: R2Bucket;
}

/**
 * Where `curl -fsSL https://muqun.dev/gateway.sh | sh` actually goes.
 *
 * This is the canonical published address. `osuki.dev/muqun/gateway.sh` stays
 * alive for the Play listing and for anyone who already has it, and it keeps
 * its own direct 302 to the same file.
 *
 * Two addresses, each **one hop** to the same GitHub raw URL. Neither redirects
 * to the other, and that is the whole point: a cross-domain redirect in the
 * middle of a pipeline that ends in `sh` means the reader is trusting a second
 * domain they never typed. One hop, one place to audit, either way in.
 */
const GATEWAY_INSTALL_SCRIPT =
  'https://raw.githubusercontent.com/osuki-dev/muqun-gateway/main/install.sh';

/**
 * Sent on every response, including the assets.
 *
 * `/gateway.sh` makes this domain a code-execution path for anyone who trusts
 * it, which is the whole reason HSTS and `nosniff` are not optional here. The
 * rest are the ordinary floor.
 */
const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

/**
 * The themes API: `/api/themes/`.
 *
 * Sources live in `osuki-dev/muqun-themes`; after every merge its CI packs
 * them and mirrors `index.json`, `dist/*.muqun-theme` and the preview images
 * under `dist/previews/` into the R2 bucket bound here as `THEMES`, at
 * exactly those keys. This route serves that bucket and nothing else -- a key
 * is checked against the shapes it may have before the bucket is asked, and a
 * query string never becomes one -- so the gallery on this site, the CLI's
 * `list` and, later, the app all read the same catalogue from the same
 * address, with no GitHub token anywhere and no dependency on the
 * repository's visibility.
 *
 *   GET /api/themes/                       the catalogue (an alias of index.json)
 *   GET /api/themes/index.json             `{ format: "muqun-themes-index", themes: [...] }`
 *   GET /api/themes/?page=N&per_page=M&q=  one page of it, searched and with absolute
 *                                          `url`/`previewUrl` on every row:
 *                                          `{ format: "muqun-themes-page", total, matched,
 *                                             page, pages, perPage, themes: [...] }`
 *   GET /api/themes/<id>                   one row of the catalogue, with `url`/`previewUrl`
 *   GET /api/themes/<id>.muqun-theme       one package; `dist/<id>.muqun-theme` also answers
 *   GET /api/themes/previews/<id>.<ext>    its preview image (webp, png, jpg); `dist/previews/…` too
 *
 * Answers are put in the edge cache under the same `Cache-Control` the client
 * sees: the index for a minute, because a merged theme should appear soon;
 * a package or a preview for an hour, because they only change on a version
 * bump. ETags are R2's own, so a client that revalidates gets a 304 and no
 * bytes. A page or a single row is computed from the cached index on every
 * request rather than cached per query -- it is a slice of one small JSON
 * file, and its ETag is the index's plus the query, so revalidation works
 * there too. CORS is open on purpose: the whole point is that other origins
 * can read this.
 */
const THEMES_API = '/api/themes/';
const THEME_DETAIL = /^((?:\/[a-z]{2}(?:-[A-Z]{2})?)?\/themes)\/([a-z][a-z0-9-]*)\/?$/;
/**
 * `index.json`, a package or a preview by its public name; `dist/…` is the
 * bucket key and answers as well. A bare id is not a key -- see `themeRoute`.
 */
const THEME_KEY =
  /^(index\.json|(?:dist\/)?[a-z][a-z0-9-]*\.muqun-theme|(?:dist\/)?previews\/[a-z][a-z0-9-]*\.(?:webp|png|jpe?g))$/;
const INDEX_MAX_AGE = 60;
const PACKAGE_MAX_AGE = 3600;

const PREVIEW_TYPES: Record<string, string> = {
  webp: 'image/webp',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
};

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'If-None-Match',
  'Access-Control-Expose-Headers': 'ETag, Content-Length, Last-Modified',
  'Access-Control-Max-Age': '86400',
};

function apiHeaders(extra: Record<string, string> = {}): Headers {
  return new Headers({ ...SECURITY_HEADERS, ...CORS_HEADERS, ...extra });
}

function apiError(status: number, error: string): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: apiHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }),
  });
}

/** The bucket key a path names, or null when it names no object this API serves. */
function themeKey(pathname: string): string | null {
  const rest = pathname.slice(THEMES_API.length);
  if (rest === '') return 'index.json';
  if (!THEME_KEY.test(rest)) return null;
  // The public URLs are /api/themes/<id>.muqun-theme and
  // /api/themes/previews/<id>.<ext>; the bucket keeps the repository's
  // layout under dist/, which also still answers.
  return rest === 'index.json' || rest.startsWith('dist/') ? rest : `dist/${rest}`;
}

type ThemeRoute =
  | { kind: 'object'; key: string }
  | { kind: 'page'; query: PageQuery | { error: string } }
  | { kind: 'entry'; id: string };

/**
 * What a request under `/api/themes/` asks for. Only the path decides which
 * object may be read; the query string chooses between the index file and a
 * page of it, and is otherwise ignored.
 */
function themeRoute(url: URL): ThemeRoute | null {
  const rest = url.pathname.slice(THEMES_API.length);
  if (rest === '' && isPageRequest(url.searchParams)) return { kind: 'page', query: parsePageQuery(url.searchParams) };
  const key = themeKey(url.pathname);
  if (key) return { kind: 'object', key };
  return THEME_ID.test(rest) ? { kind: 'entry', id: rest } : null;
}

type ObjectKind = 'index' | 'package' | 'preview';

function objectKind(key: string): ObjectKind {
  return key === 'index.json' ? 'index' : key.startsWith('dist/previews/') ? 'preview' : 'package';
}

/**
 * `s-maxage` is what the edge honours when storing; `max-age` is for the
 * client. Kept separate so the zone's Browser Cache TTL cannot stretch the
 * edge's idea of fresh. Everything derived from the index shares its policy.
 */
function cacheControlFor(kind: ObjectKind): string {
  const maxAge = kind === 'index' ? INDEX_MAX_AGE : PACKAGE_MAX_AGE;
  return `public, max-age=${maxAge}, s-maxage=${maxAge}${kind === 'index' ? ', must-revalidate' : ''}`;
}

/**
 * One object, from the edge cache or, once, from the bucket. Null when the
 * bucket has no such key. The response's body has not been read.
 */
async function cachedObject(request: Request, env: Env, ctx: ExecutionContext, key: string): Promise<Response | null> {
  const kind = objectKind(key);
  // One cache entry per key, whatever alias or method reached it.
  const cacheKey = new Request(new URL(THEMES_API + key, request.url).toString(), { method: 'GET' });
  // The Workers edge cache. Astro's DOM typings are in scope for this file
  // too, and their CacheStorage has no `default`, so name the shape here.
  const cache = (caches as CacheStorage & { default: Cache }).default;
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const object = await env.THEMES.get(key);
  if (!object) return null;
  const file = key.slice(key.lastIndexOf('/') + 1);
  const headers = apiHeaders({
    ETag: object.httpEtag,
    'Last-Modified': object.uploaded.toUTCString(),
    'Content-Length': String(object.size),
    'Cache-Control': cacheControlFor(kind),
    'Content-Type':
      kind === 'index'
        ? 'application/json; charset=utf-8'
        : kind === 'preview'
          ? (PREVIEW_TYPES[file.slice(file.lastIndexOf('.') + 1)] ?? 'application/octet-stream')
          : 'application/zip',
  });
  if (kind === 'package') headers.set('Content-Disposition', `attachment; filename="${file}"`);
  const response = new Response(object.body, { status: 200, headers });
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

/**
 * The last step of every successful answer: the client's `Cache-Control`
 * set again, a 304 for a matching `If-None-Match`, and no body for HEAD.
 *
 * Set again because a response that comes back out of the edge cache carries
 * the zone's Browser Cache TTL in place of the Cache-Control it went in with
 * (the zone says four hours; a merged theme should not take four hours to
 * appear). Headers a Worker returns are not rewritten.
 */
function finish(request: Request, headers: Headers, body: BodyInit | null, cacheControl: string): Response {
  headers.set('Cache-Control', cacheControl);
  const etag = headers.get('ETag');
  if (etag && request.headers.get('If-None-Match') === etag) return new Response(null, { status: 304, headers });
  if (request.method === 'HEAD') return new Response(null, { status: 200, headers });
  return new Response(body, { status: 200, headers });
}

async function serveObject(request: Request, env: Env, ctx: ExecutionContext, key: string): Promise<Response> {
  const kind = objectKind(key);
  const response = await cachedObject(request, env, ctx, key);
  if (!response) {
    return apiError(
      404,
      kind === 'index' ? 'no catalogue has been published yet' : kind === 'preview' ? 'no such preview' : 'no such theme',
    );
  }
  return finish(request, new Headers(response.headers), response.body, cacheControlFor(kind));
}

/**
 * The parsed catalogue and the ETag it came with, through the same cache the
 * file itself is served from. A Response instead when there is nothing to
 * parse: no index yet, or one that is not an index.
 */
async function readIndex(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<{ rows: IndexEntry[]; etag: string | null } | Response> {
  const response = await cachedObject(request, env, ctx, 'index.json');
  if (!response) return apiError(404, 'no catalogue has been published yet');
  let rows: IndexEntry[] | null = null;
  try {
    rows = indexRows(await response.json());
  } catch {
    // Not JSON: same answer as the wrong shape, below.
  }
  if (!rows) return apiError(502, 'the published catalogue is not a muqun-themes-index');
  return { rows, etag: response.headers.get('ETag') };
}

/**
 * An ETag for something computed from the index: the index's own tag with a
 * suffix naming what was computed. Changes exactly when the index does, so
 * the client's `If-None-Match` round trip is as cheap as for the file.
 */
function derivedEtag(indexEtag: string | null, suffix: string): string | null {
  if (!indexEtag) return null;
  return `"${indexEtag.replace(/^W\//, '').replace(/^"|"$/g, '')}.${suffix}"`;
}

function serveJson(request: Request, body: unknown, etag: string | null): Response {
  const headers = apiHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  if (etag) headers.set('ETag', etag);
  return finish(request, headers, JSON.stringify(body), cacheControlFor('index'));
}

async function servePage(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  query: PageQuery | { error: string },
): Promise<Response> {
  if ('error' in query) return apiError(400, query.error);
  const index = await readIndex(request, env, ctx);
  if (index instanceof Response) return index;
  const page = selectPage(index.rows, query, new URL(request.url).origin);
  return serveJson(request, page, derivedEtag(index.etag, queryTag(query)));
}

async function serveEntry(request: Request, env: Env, ctx: ExecutionContext, id: string): Promise<Response> {
  const index = await readIndex(request, env, ctx);
  if (index instanceof Response) return index;
  const row = index.rows.find((entry) => entry.id === id);
  if (!row) return apiError(404, 'no such theme');
  return serveJson(request, describeEntry(row, new URL(request.url).origin), derivedEtag(index.etag, id));
}

async function serveThemesApi(request: Request, env: Env, ctx: ExecutionContext, url: URL): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: apiHeaders() });
  if (request.method !== 'GET' && request.method !== 'HEAD') return apiError(405, 'method not allowed');
  const route = themeRoute(url);
  if (!route) return apiError(404, 'not found');
  switch (route.kind) {
    case 'object':
      return serveObject(request, env, ctx, route.key);
    case 'page':
      return servePage(request, env, ctx, route.query);
    case 'entry':
      return serveEntry(request, env, ctx, route.id);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/gateway.sh') {
      return new Response(null, {
        status: 302,
        headers: { Location: GATEWAY_INSTALL_SCRIPT, ...SECURITY_HEADERS },
      });
    }

    if (url.pathname === '/api/themes') {
      // The query survives the slash: `/api/themes?page=2` is a page request.
      const target = new URL(THEMES_API, url);
      target.search = url.search;
      return Response.redirect(target.toString(), 301);
    }
    if (url.pathname.startsWith(THEMES_API)) {
      return serveThemesApi(request, env, ctx, url);
    }

    // `/themes/<id>/`, in any locale, is the gallery page with that theme
    // open. The page is static and the theme list is not, so the same file
    // answers for every id and the page reads the id from its own path.
    const detail = THEME_DETAIL.exec(url.pathname);
    const asset =
      detail && detail[2] !== 'preview'
        ? await env.ASSETS.fetch(new Request(new URL(`${detail[1]}/`, url).toString(), request))
        : await env.ASSETS.fetch(request);
    const response = asset;
    // A new Response, because the one the asset binding hands back has
    // immutable headers.
    const headers = new Headers(response.headers);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(name, value);
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
