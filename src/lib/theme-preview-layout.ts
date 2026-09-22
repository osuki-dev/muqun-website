export const THEME_PREVIEW_LAYOUTS = ['classic', 'editorial'] as const;

export type ThemePreviewLayout = (typeof THEME_PREVIEW_LAYOUTS)[number];

export const DEFAULT_THEME_PREVIEW_LAYOUT: ThemePreviewLayout = 'classic';

export function isThemePreviewLayout(value: unknown): value is ThemePreviewLayout {
  return value === 'classic' || value === 'editorial';
}

/** Keep preview URLs and future persisted choices safe when a layout is unknown. */
export function normalizeThemePreviewLayout(value: unknown): ThemePreviewLayout {
  return isThemePreviewLayout(value) ? value : DEFAULT_THEME_PREVIEW_LAYOUT;
}
