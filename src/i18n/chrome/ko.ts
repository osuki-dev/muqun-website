import type { ChromeCopy } from './types';

/** Korean. The app keeps the name Muqun here. */
export const chrome: ChromeCopy = {
  site: { name: 'Muqun' },
  nav: { home: '홈', themes: '테마', support: '지원', privacy: '개인정보' },
  theme: { light: '라이트', dark: '다크', system: '시스템' },
  header: { aria: { language: '언어', theme: '테마', menu: '메뉴' } },
  footer: { copyright: '© {year} muqun.dev. All rights reserved.', github: 'GitHub' },
  error: {
    notFound: {
      title: '페이지를 찾을 수 없습니다',
      body: '찾으시는 페이지가 여기에 없습니다. 옮겨졌거나 링크가 잘못되었을 수 있습니다.',
    },
    home: '홈으로 가기',
  },
  privacy: {
    title: '개인정보 처리방침',
    lastUpdatedLabel: '최종 업데이트',
  },
};
