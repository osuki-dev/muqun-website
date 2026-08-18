import type { ChromeCopy } from './types';

/** French. */
export const chrome: ChromeCopy = {
  site: { name: 'Muqun' },
  nav: { home: 'Accueil', support: 'Support', privacy: 'Confidentialité' },
  theme: { light: 'Clair', dark: 'Sombre', system: 'Système' },
  header: { aria: { language: 'Langue', theme: 'Thème', menu: 'Menu' } },
  footer: { copyright: '© {year} osuki.dev. Tous droits réservés.', github: 'GitHub' },
  error: {
    notFound: {
      title: 'Page introuvable',
      body: "La page demandée n'est pas ici. Elle a peut-être été déplacée, ou le lien est incorrect.",
    },
    home: "Aller à l'accueil",
  },
  privacy: {
    title: 'Politique de confidentialité',
    lastUpdatedLabel: 'Dernière mise à jour',
    sourceNote: 'Cette politique est publiée en anglais. Le texte anglais fait foi.',
  },
};
