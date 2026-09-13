# Deploying muqun.dev

The site is static. `astro build` writes `dist/`, and a small Worker sits in
front of it for one redirect and the security headers. There is no origin
server, no container, and nothing to keep alive.

```sh
bun install --frozen-lockfile
bun run build          # -> dist/
bun run deploy         # astro build && wrangler deploy
```

`bun run preview` runs `wrangler dev`, which serves the built assets through
the real Worker — use it to check `/gateway.sh` and the headers, because
`astro dev` does not run the Worker at all.

Test `/gateway.sh` with a browser-style HTML request as well as ordinary curl.
Cloudflare Static Assets routes `Accept: text/html` differently; the
`assets.run_worker_first` setting in `wrangler.jsonc` is what keeps browser
navigations from bypassing the redirect Worker and landing on the static 404.

## Cloudflare Workers Builds

Connect the repository and set **one** build variable, under
Settings → Build → Build Variables and Secrets:

```
BUN_VERSION = 1.4.2
```

Build command `bun run build`, output directory `dist`. Cloudflare resolves
`BUN_VERSION` against the versions published on npm, so it must be a released
Bun; `packageManager` in `package.json` records the same version, and
`bun.lock` is written by it. Keep the three in step when upgrading Bun.

## Domain

`muqun.dev` is registered on Cloudflare, so the zone and certificate are
already in the same account. Add the routes in the dashboard, or uncomment the
`routes` block in `wrangler.jsonc` once the zone id is known.

## The themes API and its bucket

`/api/themes/` is served by the Worker from the R2 bucket `muqun-themes`,
bound as `THEMES` in `wrangler.jsonc`. The bucket is filled by the
`osuki-dev/muqun-themes` repository: after every merge its Build workflow
packs the sources and mirrors `index.json`, `dist/*.muqun-theme` and the
preview images under `dist/previews/` into the bucket at those exact keys
(`.github/workflows/build.yml` there). Nothing in this repository writes to
it, and the site needs no token to read it; the binding is the credential.

The routes, all with open CORS, an `ETag` and `304` on `If-None-Match`, and
JSON `{ "error": "…" }` bodies on failure:

| Route | Answer |
| --- | --- |
| `GET /api/themes/` | the catalogue, an alias of `index.json` |
| `GET /api/themes/index.json` | `{ "format": "muqun-themes-index", "themes": [...] }`, as the CLI wrote it |
| `GET /api/themes/?page=N&per_page=M&q=text` | one page of the catalogue, below |
| `GET /api/themes/<id>` | one row of the catalogue, with `url` and `previewUrl` added; `404` when absent |
| `GET /api/themes/<id>.muqun-theme` | the package (`dist/<id>.muqun-theme` also answers) |
| `GET /api/themes/previews/<id>.<webp\|png\|jpg>` | its preview image (`dist/previews/…` also answers) |

Any of `page`, `per_page` or `q` turns the catalogue into a page. `q` is a
case-insensitive substring over id, name, author, description and tags — the
same rule as `muqun-theme list --search`. `per_page` defaults to 20 and is
capped at 100; `page` defaults to 1, and a page past the end is `200` with an
empty `themes` and the right `pages`. A malformed `page` or `per_page` is a
`400`. Rows come sorted by id and each carries absolute addresses built from
the request's origin — `url` always, `previewUrl` only when the theme ships a
preview:

```json
{
  "format": "muqun-themes-page",
  "total": 12, "matched": 3, "page": 1, "pages": 1, "perPage": 20,
  "themes": [
    { "id": "grand-voyage", "name": "Grand Voyage", "version": "1.0.0", "package": "dist/grand-voyage.muqun-theme",
      "preview": "dist/previews/grand-voyage.webp", "bytes": 1048576,
      "url": "https://muqun.dev/api/themes/grand-voyage.muqun-theme",
      "previewUrl": "https://muqun.dev/api/themes/previews/grand-voyage.webp" }
  ]
}
```

`GET /api/themes/<id>` returns that same row object on its own.

The bucket needs no public URL and no custom domain. The Worker is the only
reader, adds the CORS and cache headers, and puts answers in the edge cache
(the index for a minute, packages and previews for an hour). A page or a
single row is sliced from the cached index on each request rather than cached
per query; its `Cache-Control` is the index's and its `ETag` is the index's
plus the query, so it revalidates the same way. `wrangler dev` binds a local,
empty simulation of the bucket, so the gallery is empty under `bun run
preview`; use `bun run dev:fixture` to see it populated, or fill the local
simulation from the fixture:

```sh
bunx wrangler r2 object put muqun-themes/index.json --local --file fixtures/themes/index.json
bunx wrangler r2 object put muqun-themes/dist/sample.muqun-theme --local --file fixtures/themes/dist/sample.muqun-theme
bunx wrangler r2 object put muqun-themes/dist/previews/sample.png --local --file fixtures/themes/dist/previews/sample.png
```

## What the Worker is for

Three things, all in `worker/index.ts`:

- **`/api/themes/`** — the themes catalogue and packages, above.

- **`/gateway.sh`** — a 302 straight to the installer on GitHub. The same file
  is published at `osuki.dev/muqun/gateway.sh`, which keeps its own direct
  302. Neither redirects to the other: a cross-domain hop inside a pipeline
  that ends in `sh` means the reader is trusting a domain they never typed.
- **Security headers** on every response, including the static assets. HSTS
  and `nosniff` are not optional on a domain that serves a shell installer.
