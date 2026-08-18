/**
 * The eight languages this site speaks, and the two things every page needs to
 * do with them: normalise one, and build a path in one.
 *
 * The list is the app's list. Muqun ships eight locales, so the site ships
 * eight; the old company site carried ten because it also carried a blog and a
 * template catalogue that had picked up `ar` and `it` along the way. Dropping
 * `ar` also drops the only right-to-left language, which is why nothing here or
 * anywhere else on this site carries direction-switching machinery: there is
 * one direction, and adding the machinery back is cheaper than maintaining it
 * unused. If a ninth language arrives, it is added here **and** in
 * `astro.config.mjs`, which is the other half of the same fact.
 *
 * `en` is the unprefixed locale (`prefixDefaultLocale: false`), so an English
 * URL has no language segment at all. Everything else carries its tag.
 */

export const siteLanguages = [
  { code: 'en', label: 'English' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
] as const;

export type SiteLocale = (typeof siteLanguages)[number]['code'];

export const defaultLocale: SiteLocale = 'en';

export const siteLocaleCodes: readonly SiteLocale[] = siteLanguages.map((language) => language.code);

/** The seven that carry a prefix. What every `[...lang]` route enumerates. */
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
