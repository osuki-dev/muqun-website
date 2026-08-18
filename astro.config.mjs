// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

/**
 * Static output, on purpose.
 *
 * The old site ran `output: 'server'` with a Node adapter, and the only thing
 * on this half of it that needed a server was `/gateway.sh` -- one 302. That
 * lives in `worker/index.ts` now, so every page here prerenders and the whole
 * site is a directory of files on Cloudflare's edge. No adapter, no container,
 * no origin to keep alive.
 *
 * `prefixDefaultLocale: false` means English is served unprefixed (`/`) and the
 * other seven carry their tag (`/ja/`). `fallbackType: 'rewrite'` keeps the
 * locale in the URL when a page has no translation yet, rather than bouncing
 * the reader to English and losing their place.
 *
 * Deliberately no `i18n.fallback` map: on the old site that prerendered a
 * locale x locale cross product of a docs tree and produced hundreds of phantom
 * pages. The worker does the fallback instead, where it costs nothing.
 */
export default defineConfig({
  site: 'https://muqun.dev',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-TW', 'ja', 'ko', 'de', 'fr', 'es', 'pt'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    // One stylesheet inlined rather than fetched: the whole of this site's CSS
    // is smaller than the round trip that would fetch it.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
