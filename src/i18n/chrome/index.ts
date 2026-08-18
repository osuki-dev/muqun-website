import { normalizeSiteLocale, type SiteLocale } from '../../lib/locales';
import { getMuqunCopy } from '../muqun';
import type { ChromeCopy } from './types';

import { chrome as de } from './de';
import { chrome as en } from './en';
import { chrome as es } from './es';
import { chrome as fr } from './fr';
import { chrome as ja } from './ja';
import { chrome as ko } from './ko';
import { chrome as pt } from './pt';
import { chrome as zhTW } from './zh-TW';

const catalogues: Record<SiteLocale, ChromeCopy> = {
  en,
  'zh-TW': zhTW,
  ja,
  ko,
  de,
  fr,
  es,
  pt,
};

export function getChrome(locale?: string | null): ChromeCopy {
  return catalogues[normalizeSiteLocale(locale)];
}

/**
 * The site-wide description: the `<meta name="description">` for any page that
 * has none of its own, which on this site means the 404 and nothing else.
 *
 * Taken from the product page's own meta rather than written again here. This
 * site has one product, so "what is this site" and "what is this app" are the
 * same sentence, and keeping one copy of it in eight languages is one fewer
 * thing to translate twice and let drift.
 */
export function getSiteDescription(locale?: string | null): string {
  return getMuqunCopy(locale).meta.description;
}

export type { ChromeCopy } from './types';
