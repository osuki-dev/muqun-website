import type { ChromeCopy } from './types';

/** Traditional Chinese (Taiwan). The app is called 牧群 here. */
export const chrome: ChromeCopy = {
  site: { name: '牧群' },
  nav: { home: '首頁', support: '支援', privacy: '隱私' },
  theme: { light: '淺色', dark: '深色', system: '跟隨系統' },
  header: { aria: { language: '語言', theme: '主題', menu: '選單' } },
  footer: { copyright: '© {year} osuki.dev. 版權所有。', github: 'GitHub' },
  error: {
    notFound: {
      title: '找不到頁面',
      body: '你要找的頁面不在這裡。它可能已經搬走，或是連結有誤。',
    },
    home: '回到首頁',
  },
  privacy: {
    title: '隱私權政策',
    lastUpdatedLabel: '最後更新',
    sourceNote: '本政策以英文發布，如有疑義，以英文版本為準。',
  },
};
