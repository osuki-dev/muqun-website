import type { ChromeCopy } from './types';

/** Spanish. */
export const chrome: ChromeCopy = {
  site: { name: 'Muqun' },
  nav: { home: 'Inicio', support: 'Soporte', privacy: 'Privacidad' },
  theme: { light: 'Claro', dark: 'Oscuro', system: 'Sistema' },
  header: { aria: { language: 'Idioma', theme: 'Tema', menu: 'Menú' } },
  footer: { copyright: '© {year} osuki.dev. Todos los derechos reservados.', github: 'GitHub' },
  error: {
    notFound: {
      title: 'Página no encontrada',
      body: 'La página que buscas no está aquí. Puede haberse movido, o el enlace no es correcto.',
    },
    home: 'Ir al inicio',
  },
  privacy: {
    title: 'Política de privacidad',
    lastUpdatedLabel: 'Última actualización',
    sourceNote: 'Esta política se publica en inglés. El texto en inglés es la versión que prevalece.',
  },
};
