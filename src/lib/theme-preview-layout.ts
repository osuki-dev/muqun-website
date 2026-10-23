/**
 * The Home compositions the device mock can draw, in the order the switch
 * offers them. Stage is first and the default because it is what 4.0 installs
 * with and what most readers see; the other two are the app's own
 * alternatives, in its picker's order.
 */
export const THEME_PREVIEW_LAYOUTS = ['stage', 'classic', 'editorial'] as const;

export type ThemePreviewLayout = (typeof THEME_PREVIEW_LAYOUTS)[number];

export const DEFAULT_THEME_PREVIEW_LAYOUT: ThemePreviewLayout = 'stage';

export function isThemePreviewLayout(value: unknown): value is ThemePreviewLayout {
  return value === 'stage' || value === 'classic' || value === 'editorial';
}

/** Keep preview URLs and future persisted choices safe when a layout is unknown. */
export function normalizeThemePreviewLayout(value: unknown): ThemePreviewLayout {
  return isThemePreviewLayout(value) ? value : DEFAULT_THEME_PREVIEW_LAYOUT;
}
