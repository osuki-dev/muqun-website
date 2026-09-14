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

### `preview` in an index row

An index entry **may** carry `preview`, and an entry with one looks like this:

```json
{
  "id": "grand-voyage",
  "name": "Grand Voyage",
  "version": "1.0.0",
  "package": "dist/grand-voyage.muqun-theme",
  "preview": "dist/previews/grand-voyage.webp",
  "bytes": 1048576,
  "sha256": "…",
  "assets": 15
}
```

It is the theme's cover: the image the pack's manifest names as its `preview`
asset, copied out of the package by `muqun-theme build` and published beside
it under `dist/previews/`, so a list can show a theme before downloading it.
Same picture, same pixels, 1024×640 (8:5), in whatever format the pack ships
it — WebP or PNG; nothing re-encodes it on the way out. Around 100 KB is the
publishing guideline, not a limit anything here enforces. A pack without a
cover simply has no `preview` key — never `null`, never `""`.

One field is worth writing down because it looks like a pack field and is not.
**`preview` in an index entry is an address; `preview` in a manifest is an
asset id.** The manifest's names an image inside the pack, which is where the
cover belongs: it travels with the theme, it is covered by the package's own
limits and hashes, and it is what an offline install has. The index's
addresses a copy of that same image, published beside the package, so a list
can show a theme before downloading 25 MiB of it.

The address must resolve, against the catalogue's own base, to a URL on that
base — the rule `package` already follows, and for the same reason: an entry
naming another host would be the catalogue asking a reader to fetch from a
place they never chose. Three spellings do that and are all accepted, because
the CLI writes the first and the app's contract describes the second:

- `dist/previews/<id>.<ext>` — the repository-relative path `muqun-theme build`
  writes, and the bucket key the file is mirrored to;
- `https://muqun.dev/api/themes/previews/<id>.<ext>` — the same file, absolute;
- `previews/<id>.<ext>` — the same file, relative to `/api/themes/`.

Anything else is read as "no preview" rather than as a path. Only the file
name survives parsing: `previewUrl`, and the `<img>` the gallery draws, are
rebuilt from it against the request's own origin, so a row naming another host
cannot become a request for that host. A row whose `preview` is refused still
lists — the card falls back to unpacking the package for its cover, exactly as
it does for a theme that ships none.

`bun run check:catalogue` runs those rules with no Worker around them
(`worker/themes-catalogue.ts` is pure functions for that reason) and checks
that every cover `fixtures/themes/index.json` names is a file the fixture
ships.

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
