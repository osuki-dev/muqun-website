import type { ChromeCopy } from './types';

/** The source of truth. Every other file here is a translation of this one. */
export const chrome: ChromeCopy = {
  site: { name: 'Muqun' },
  nav: { home: 'Home', support: 'Support', privacy: 'Privacy' },
  theme: { light: 'Light', dark: 'Dark', system: 'System' },
  header: { aria: { language: 'Language', theme: 'Theme', menu: 'Menu' } },
  footer: { copyright: '© {year} osuki.dev. All rights reserved.', github: 'GitHub' },
  error: {
    notFound: {
      title: 'Page not found',
      body: 'The page you asked for is not here. It may have moved, or the link may be wrong.',
    },
    home: 'Go to the home page',
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdatedLabel: 'Last updated',
    sourceNote: 'This policy is published in English. The English text is the authoritative version.',
  },
};
