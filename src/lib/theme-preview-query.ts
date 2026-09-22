import type { ThemeMode } from './theme-package';
import { normalizeThemePreviewLayout, type ThemePreviewLayout } from './theme-preview-layout';

export const THEME_PREVIEW_DEVICES = ['all', 'phone', 'tablet'] as const;

export type ThemePreviewDevice = (typeof THEME_PREVIEW_DEVICES)[number];

export interface ThemePreviewQuery {
  layout: ThemePreviewLayout;
  /** `all` preserves the existing gallery/dropzone rendering when omitted. */
  device: ThemePreviewDevice;
  /** Omitted mode follows the site's current light/dark preference. */
  mode?: ThemeMode;
}

export function isThemePreviewDevice(value: unknown): value is Exclude<ThemePreviewDevice, 'all'> {
  return value === 'phone' || value === 'tablet';
}

export function isThemePreviewMode(value: unknown): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

/** Parse only the bounded preview controls; unrelated query parameters pass through untouched. */
export function parseThemePreviewQuery(search = ''): ThemePreviewQuery {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const device = params.get('device');
  const mode = params.get('mode');
  return {
    layout: normalizeThemePreviewLayout(params.get('layout')),
    device: isThemePreviewDevice(device) ? device : 'all',
    mode: isThemePreviewMode(mode) ? mode : undefined,
  };
}

export function readThemePreviewQuery(): ThemePreviewQuery {
  return parseThemePreviewQuery(typeof window === 'undefined' ? '' : window.location.search);
}

export function previewDeviceVisible(device: ThemePreviewDevice, candidate: Exclude<ThemePreviewDevice, 'all'>): boolean {
  return device === 'all' || device === candidate;
}
