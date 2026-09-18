import type { SiteLocale } from '@/lib/locales';
import type { UserGuide } from './types';
import { en } from './en';
import { zhCN } from './zh-CN';
import { zhTW } from './zh-TW';
import { ja } from './ja';
import { ko } from './ko';
import { th } from './th';
import { vi } from './vi';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
import { pt } from './pt';
import { ru } from './ru';

export const userGuide: Record<SiteLocale, UserGuide> = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ja,
  ko,
  th,
  vi,
  de,
  fr,
  es,
  pt,
  ru,
};

export * from './types';
export { en, zhCN, zhTW, ja, ko, th, vi, de, fr, es, pt, ru };
