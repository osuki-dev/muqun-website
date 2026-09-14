/** Site languages; keep astro.config.mjs in sync. English uses unprefixed URLs. */
export const siteLanguages = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'th', label: 'ไทย' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
] as const;

export type SiteLocale = (typeof siteLanguages)[number]['code'];

export const defaultLocale: SiteLocale = 'en';

export const siteLocaleCodes: readonly SiteLocale[] = siteLanguages.map((language) => language.code);

/** The locales that carry a prefix. What every `[...lang]` route enumerates. */
export const prefixedLocaleCodes: readonly SiteLocale[] = siteLocaleCodes.filter(
  (code) => code !== defaultLocale,
);

const localePattern = new RegExp(`^/(${siteLocaleCodes.join('|')})(/|$)`);

export function isSiteLocale(value?: string | null): value is SiteLocale {
  return typeof value === 'string' && (siteLocaleCodes as readonly string[]).includes(value);
}

/** Anything unrecognised — including `undefined` — reads as English. */
export function normalizeSiteLocale(locale?: string | null): SiteLocale {
  return isSiteLocale(locale) ? locale : defaultLocale;
}

/**
 * A path with its language segment stripped and its shape made canonical:
 * one leading slash, no trailing one, no doubles.
 *
 * Used to compare "which page is this" across locales — the language switcher
 * needs the current page in another language, and that is this plus
 * `localizedPath`.
 */
export function normalizeSitePath(rawPath?: string | null): string {
  if (!rawPath) return '/';

  const pathOnly = rawPath.split(/[?#]/)[0] || '/';
  const withLeadingSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  const withoutLocale = withLeadingSlash.replace(localePattern, '/');
  const deduped = withoutLocale.replace(/\/+/g, '/');
  const trimmed = deduped.length > 1 ? deduped.replace(/\/+$/, '') : deduped;
  return trimmed || '/';
}

/**
 * The same page, in one language, written the way every other link on this site
 * writes it.
 *
 * Always with a trailing slash, because `astro.config.mjs` sets
 * `trailingSlash: 'always'` and a link without one is a redirect at best. The
 * locale home was the case that used to get this wrong on the old site: it
 * produced `/ja` while the page beside it produced `/ja/support/`, so the
 * switcher was the only thing on the site linking to the unslashed form.
 */
export function localizedPath(path?: string | null, locale?: string | null): string {
  const normalized = normalizeSitePath(path);
  const withTrailingSlash = normalized === '/' ? '/' : `${normalized}/`;
  const normalizedLocale = normalizeSiteLocale(locale);
  if (normalizedLocale === defaultLocale) return withTrailingSlash;
  return withTrailingSlash === '/'
    ? `/${normalizedLocale}/`
    : `/${normalizedLocale}${withTrailingSlash}`;
}

/** Whether `path` is the page being read, or an ancestor of it. */
export function isActivePath(path?: string | null, current?: string | null): boolean {
  const normalizedPath = normalizeSitePath(path);
  const normalizedCurrent = normalizeSitePath(current);

  if (normalizedPath === '/') return normalizedCurrent === '/';

  return (
    normalizedCurrent === normalizedPath || normalizedCurrent.startsWith(`${normalizedPath}/`)
  );
}
