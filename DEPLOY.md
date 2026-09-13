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
packs the sources and mirrors `index.json` and `dist/*.muqun-theme` into the
bucket at those exact keys (`.github/workflows/build.yml` there). Nothing in
this repository writes to it, and the site needs no token to read it; the
binding is the credential.

The bucket needs no public URL and no custom domain. The Worker is the only
reader, adds the CORS and cache headers, and puts answers in the edge cache
(the index for a minute, packages for an hour). `wrangler dev` binds a local,
empty simulation of the bucket, so the gallery is empty under `bun run
preview`; use `bun run dev:fixture` to see it populated.

## What the Worker is for

Three things, all in `worker/index.ts`:

- **`/api/themes/`** — the themes catalogue and packages, above.

- **`/gateway.sh`** — a 302 straight to the installer on GitHub. The same file
  is published at `osuki.dev/muqun/gateway.sh`, which keeps its own direct
  302. Neither redirects to the other: a cross-domain hop inside a pipeline
  that ends in `sh` means the reader is trusting a domain they never typed.
- **Security headers** on every response, including the static assets. HSTS
  and `nosniff` are not optional on a domain that serves a shell installer.
