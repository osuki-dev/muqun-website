import type { ChromeCopy } from './types';

/** Portuguese. */
export const chrome: ChromeCopy = {
  site: { name: 'Muqun' },
  nav: { home: 'Início', support: 'Suporte', privacy: 'Privacidade' },
  theme: { light: 'Claro', dark: 'Escuro', system: 'Sistema' },
  header: { aria: { language: 'Idioma', theme: 'Tema', menu: 'Menu' } },
  footer: { copyright: '© {year} osuki.dev. Todos os direitos reservados.', github: 'GitHub' },
  error: {
    notFound: {
      title: 'Página não encontrada',
      body: 'A página que procuras não está aqui. Pode ter mudado de sítio, ou o link está errado.',
    },
    home: 'Ir para o início',
  },
  privacy: {
    title: 'Política de privacidade',
    lastUpdatedLabel: 'Última atualização',
    sourceNote: 'Esta política é publicada em inglês. O texto em inglês é a versão que prevalece.',
  },
};
