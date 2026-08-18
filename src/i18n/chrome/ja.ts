import type { ChromeCopy } from './types';

/** Japanese. The app is called 牧群（ぼくぐん）; the wordmark is 牧群. */
export const chrome: ChromeCopy = {
  site: { name: '牧群' },
  nav: { home: 'ホーム', support: 'サポート', privacy: 'プライバシー' },
  theme: { light: 'ライト', dark: 'ダーク', system: 'システム設定' },
  header: { aria: { language: '言語', theme: 'テーマ', menu: 'メニュー' } },
  footer: { copyright: '© {year} osuki.dev。すべての権利を保有します。', github: 'GitHub' },
  error: {
    notFound: {
      title: 'ページが見つかりません',
      body: 'お探しのページはここにありません。移動したか、リンクが間違っている可能性があります。',
    },
    home: 'ホームへ戻る',
  },
  privacy: {
    title: 'プライバシーポリシー',
    lastUpdatedLabel: '最終更新',
    sourceNote: '本ポリシーは英語で公開しています。解釈に相違がある場合は英語版が優先されます。',
  },
};
