/**
 * A stand-in for the themes repository, for `astro dev` only.
 *
 * The gallery reads `osuki-dev/muqun-themes` from GitHub's raw host, in the
 * browser (see `src/lib/themes-source.ts`). Until that repository is public
 * the raw host answers 404 to anyone without a token, and a token is exactly
 * the thing that must never be built into the client. This plugin is the
 * seam: while the dev server runs, `/__muqun-themes/<path>` answers in the
 * raw host's place, and the client is pointed at it through one compile-time
 * constant. A production build never mounts the middleware and always defines
 * the constant `null`, so nothing here can reach a deploy.
 *
 * Two sources, chosen by environment (put them in `.env`, see `.env.example`):
 *
 *   MUQUN_THEMES_FIXTURE=fixtures/themes
 *       Serve files from a directory. `fixtures/themes` in this repository
 *       holds an `index.json` and one packed theme, so the page renders with
 *       no network at all.
 *
 *   MUQUN_THEMES_TOKEN=github_pat_…
 *       Proxy to the raw host with `Authorization: Bearer <token>`, which is
 *       how a fine-grained token with read access to the private repository
 *       sees its contents. The token is read here, on the server, and goes
 *       out only to GitHub.
 *
 * Fixture wins when both are set. Neither set: the plugin does nothing and
 * dev behaves like production, including the 404 while the repo is private.
 *
 * Which repository and ref the proxy reads is the same pair the client
 * reads -- `PUBLIC_MUQUN_THEMES_REPO` / `PUBLIC_MUQUN_THEMES_REF`, resolved
 * by `src/lib/themes-repo.ts` -- so the two cannot point at different places.
 */
import { createReadStream, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { loadEnv } from 'vite';

import { themesRepoConfig } from '../src/lib/themes-repo.ts';

const DEV_BASE = '/__muqun-themes/';

const TYPES = {
  '.json': 'application/json; charset=utf-8',
  '.muqun-theme': 'application/zip',
  // `dist/previews/<id>.<ext>`, the preview images the index names.
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};

function contentType(path) {
  for (const [extension, type] of Object.entries(TYPES)) {
    if (path.endsWith(extension)) return type;
  }
  return 'application/octet-stream';
}

/** @returns {import('vite').Plugin} */
export function muqunThemesDevSource() {
  /** Filled in by `config`, which is the first hook to know the mode and root. */
  let settings = { fixture: '', token: '', rawBase: '' };

  return {
    name: 'muqun-themes-dev-source',

    config(config, { command, mode }) {
      // `.env` is not in `process.env` while the config loads; Vite's own
      // loader reads it the way the rest of the build will. The process
      // environment still wins, so `MUQUN_THEMES_FIXTURE=… bun run dev` works.
      const env = { ...loadEnv(mode, config.root ?? process.cwd(), ''), ...process.env };
      settings = {
        fixture: env.MUQUN_THEMES_FIXTURE?.trim() ?? '',
        token: env.MUQUN_THEMES_TOKEN?.trim() ?? '',
        rawBase: themesRepoConfig(env).rawBase,
      };
      const local = command === 'serve' && Boolean(settings.fixture || settings.token);
      return {
        define: { __MUQUN_THEMES_DEV_BASE__: JSON.stringify(local ? DEV_BASE : null) },
      };
    },

    configureServer(server) {
      const { fixture, token, rawBase } = settings;
      if (!fixture && !token) return;
      const root = fixture ? resolve(server.config.root, fixture) : null;
      server.config.logger.info(
        root
          ? `  muqun themes: serving ${DEV_BASE} from ${root}`
          : `  muqun themes: proxying ${DEV_BASE} to ${rawBase} with a token`,
      );

      server.middlewares.use(DEV_BASE, async (req, res, next) => {
        // Connect strips the mount prefix; what is left is the repo path.
        const path = decodeURIComponent((req.url ?? '/').split('?')[0]).replace(/^\/+/, '');
        if (!path || path.includes('..') || path.includes('\\')) return next();

        try {
          if (root) {
            const file = resolve(root, path);
            if (!file.startsWith(root + sep) || !statSync(file, { throwIfNoEntry: false })?.isFile()) {
              res.statusCode = 404;
              return res.end('not found');
            }
            res.setHeader('Content-Type', contentType(file));
            res.setHeader('Cache-Control', 'no-store');
            return createReadStream(file).pipe(res);
          }

          const upstream = await fetch(rawBase + path, {
            headers: { Authorization: `Bearer ${token}` },
          });
          res.statusCode = upstream.status;
          res.setHeader('Content-Type', contentType(path));
          res.setHeader('Cache-Control', 'no-store');
          res.end(Buffer.from(await upstream.arrayBuffer()));
        } catch (error) {
          next(error);
        }
      });
    },
  };
}
