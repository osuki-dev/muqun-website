import { normalizeSiteLocale } from '../../lib/locales';
import type { MuqunCopy } from './types';

import { copy as de } from './de';
import { copy as en } from './en';
import { copy as es } from './es';
import { copy as fr } from './fr';
import { copy as ja } from './ja';
import { copy as ko } from './ko';
import { copy as pt } from './pt';
import { copy as zhTW } from './zh-TW';

/**
 * Keyed by `SiteLocale` rather than `string`, so a language in
 * `src/lib/locales.ts` with no file here is a build error rather than a page
 * that quietly serves English. The old site typed this `Record<string, …>` and
 * carried two locales the app does not ship.
 */
const copies: Record<import('../../lib/locales').SiteLocale, MuqunCopy> = {
  en,
  'zh-TW': zhTW,
  ja,
  ko,
  de,
  fr,
  es,
  pt,
};

/**
 * Muqun's copy for a locale, falling back to English for anything unknown.
 *
 * Every page on this site prerenders, so all eight of these are read at build
 * time and none of them reaches the browser.
 */
export function getMuqunCopy(locale?: string | null): MuqunCopy {
  return copies[normalizeSiteLocale(locale)];
}

export type { MuqunCopy } from './types';
