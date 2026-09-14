import type { ChromeCopy } from './types';

/** German. */
export const chrome: ChromeCopy = {
  site: { name: 'Muqun' },
  nav: { home: 'Startseite', themes: 'Themes', support: 'Support', privacy: 'Datenschutz' },
  theme: { light: 'Hell', dark: 'Dunkel', system: 'System' },
  header: { aria: { language: 'Sprache', theme: 'Theme', menu: 'Menü' } },
  footer: { copyright: '© {year} muqun.dev. Alle Rechte vorbehalten.', github: 'GitHub' },
  error: {
    notFound: {
      title: 'Seite nicht gefunden',
      body: 'Die gesuchte Seite ist nicht hier. Vielleicht wurde sie verschoben, oder der Link stimmt nicht.',
    },
    home: 'Zur Startseite',
  },
  privacy: {
    title: 'Datenschutzerklärung',
    lastUpdatedLabel: 'Zuletzt aktualisiert',
  },
};
