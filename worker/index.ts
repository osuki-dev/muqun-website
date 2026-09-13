/**
 * The only server-side code on muqun.dev, and it exists for three reasons the
 * static files cannot cover: one redirect that must never chain, a set of
 * headers that must be on every response, and the themes API, which reads an
 * R2 bucket that is nowhere else reachable.
 */

interface Env {
  ASSETS: Fetcher;
  /** The `muqun-themes` bucket: `index.json` and `dist/<id>.muqun-theme`. */
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
 * them and mirrors `index.json` and `dist/*.muqun-theme` into the R2 bucket
 * bound here as `THEMES`, at exactly those keys. This route serves that bucket
 * and nothing else -- the key is checked against the one shape it may have
 * before the bucket is asked -- so the gallery on this site, the CLI's `list`
 * and, later, the app all read the same catalogue from the same address, with
 * no GitHub token anywhere and no dependency on the repository's visibility.
 *
 *   GET /api/themes/                       the catalogue (an alias of index.json)
 *   GET /api/themes/index.json             `{ format: "muqun-themes-index", themes: [...] }`
 *   GET /api/themes/dist/<id>.muqun-theme  one package; `package` in the index is this path
 *
 * Answers are put in the edge cache under the same `Cache-Control` the client
 * sees: the index for a minute, because a merged theme should appear soon;
 * a package for an hour, because it only changes on a version bump. ETags are
 * R2's own, so a client that revalidates gets a 304 and no bytes. CORS is open
 * on purpose: the whole point is that other origins can read this.
 */
const THEMES_API = '/api/themes/';
const THEME_DETAIL = /^((?:\/[a-z]{2}(?:-[A-Z]{2})?)?\/themes)\/([a-z][a-z0-9-]*)\/?$/;
/** `index.json`, or a package by its public name; `dist/<id>.muqun-theme` is the bucket key. */
const THEME_KEY = /^(index\.json|(?:dist\/)?[a-z][a-z0-9-]*\.muqun-theme)$/;
const INDEX_MAX_AGE = 60;
const PACKAGE_MAX_AGE = 3600;

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

/** The bucket key a request names, or null when it names nothing this API serves. */
function themeKey(pathname: string): string | null {
  const rest = pathname.slice(THEMES_API.length);
  if (rest === '') return 'index.json';
  if (!THEME_KEY.test(rest)) return null;
  // The public URL is /api/themes/<id>.muqun-theme; the bucket keeps the
  // repository's layout, dist/<id>.muqun-theme, which also still answers.
  return rest === 'index.json' || rest.startsWith('dist/') ? rest : `dist/${rest}`;
}

async function serveTheme(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  key: string,
): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: apiHeaders() });
  if (request.method !== 'GET' && request.method !== 'HEAD') return apiError(405, 'method not allowed');

  const isIndex = key === 'index.json';
  const maxAge = isIndex ? INDEX_MAX_AGE : PACKAGE_MAX_AGE;
  // `s-maxage` is what the edge honours when storing; `max-age` is for the
  // client. Kept separate so the zone's Browser Cache TTL cannot stretch the
  // edge's idea of fresh.
  const cacheControl = `public, max-age=${maxAge}, s-maxage=${maxAge}${isIndex ? ', must-revalidate' : ''}`;
  // One cache entry per key, whatever alias or method reached it.
  const cacheKey = new Request(new URL(THEMES_API + key, request.url).toString(), { method: 'GET' });
  // The Workers edge cache. Astro's DOM typings are in scope for this file
  // too, and their CacheStorage has no `default`, so name the shape here.
  const cache = (caches as CacheStorage & { default: Cache }).default;
  let response = await cache.match(cacheKey);

  if (!response) {
    const object = await env.THEMES.get(key);
    if (!object) return apiError(404, isIndex ? 'no catalogue has been published yet' : 'no such theme');
    const headers = apiHeaders({
      ETag: object.httpEtag,
      'Last-Modified': object.uploaded.toUTCString(),
      'Content-Length': String(object.size),
      'Cache-Control': cacheControl,
      'Content-Type': isIndex ? 'application/json; charset=utf-8' : 'application/zip',
    });
    if (!isIndex) headers.set('Content-Disposition', `attachment; filename="${key.slice('dist/'.length)}"`);
    response = new Response(object.body, { status: 200, headers });
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
  }

  // A response that comes back out of the edge cache carries the zone's
  // Browser Cache TTL in place of the Cache-Control it went in with (the zone
  // says four hours; a merged theme should not take four hours to appear).
  // Headers a Worker returns are not rewritten, so set ours again here.
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', cacheControl);

  const etag = headers.get('ETag');
  if (etag && request.headers.get('If-None-Match') === etag)
    return new Response(null, { status: 304, headers });
  if (request.method === 'HEAD') return new Response(null, { status: 200, headers });
  return new Response(response.body, { status: response.status, headers });
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
      return Response.redirect(new URL(THEMES_API, url).toString(), 301);
    }
    if (url.pathname.startsWith(THEMES_API)) {
      const key = themeKey(url.pathname);
      return key ? serveTheme(request, env, ctx, key) : apiError(404, 'not found');
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
