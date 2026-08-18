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

## Cloudflare Workers Builds

Connect the repository and set **one** build variable, under
Settings → Build → Build Variables and Secrets:

```
BUN_VERSION = 1.3.14
```

Build command `bun run build`, output directory `dist`.

### Why 1.3.14, when the maintainers run 1.4

This is the part that looks wrong and is not.

`bun --version` on a maintainer's machine says `1.4.0-canary.1`. That build
comes from Bun's own rolling canary channel; **there is no 1.4 release on npm
at all** — the latest published version is 1.3.14, and the `canary` dist-tag
stops at a 1.3.13 build. Cloudflare resolves `BUN_VERSION` against published
versions, so `1.4.0` is not a value it can install.

That would be a footnote except for the lockfile. Bun 1.4 writes
`"lockfileVersion": 2`, and 1.3.14 cannot read it:

```
error: Unknown lockfile version
error: lockfile had changes, but lockfile is frozen
```

So `bun.lock` here is deliberately written by **1.3.14**, at
`lockfileVersion: 1`, which both versions read. A maintainer on canary can run
`bun install` normally; what they must not do is let a newer Bun rewrite the
lockfile and commit it, because the next deploy then fails at dependency
install with the error above. `packageManager` in `package.json` records the
version this file belongs to.

The build image's default is Bun 1.2.15, which is older still and fails the
same way, so leaving `BUN_VERSION` unset is not an option either.

## Domain

`muqun.dev` is registered on Cloudflare, so the zone and certificate are
already in the same account. Add the routes in the dashboard, or uncomment the
`routes` block in `wrangler.jsonc` once the zone id is known.

## What the Worker is for

Two things, both in `worker/index.ts`:

- **`/gateway.sh`** — a 302 straight to the installer on GitHub. The same file
  is published at `osuki.dev/muqun/gateway.sh`, which keeps its own direct
  302. Neither redirects to the other: a cross-domain hop inside a pipeline
  that ends in `sh` means the reader is trusting a domain they never typed.
- **Security headers** on every response, including the static assets. HSTS
  and `nosniff` are not optional on a domain that serves a shell installer.
