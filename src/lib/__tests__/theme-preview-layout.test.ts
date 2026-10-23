import { describe, expect, test } from 'bun:test';

import {
  DEFAULT_THEME_PREVIEW_LAYOUT,
  isThemePreviewLayout,
  normalizeThemePreviewLayout,
  THEME_PREVIEW_LAYOUTS,
} from '../theme-preview-layout';

describe('theme preview layouts', () => {
  test('defaults to Stage, the layout 4.0 installs with', () => {
    expect(DEFAULT_THEME_PREVIEW_LAYOUT).toBe('stage');
    expect(normalizeThemePreviewLayout(undefined)).toBe('stage');
    expect(normalizeThemePreviewLayout('future-layout')).toBe('stage');
    expect(THEME_PREVIEW_LAYOUTS).toEqual(['stage', 'classic', 'editorial']);
  });

  test('accepts only the layouts the preview actually renders', () => {
    expect(isThemePreviewLayout('stage')).toBe(true);
    expect(isThemePreviewLayout('classic')).toBe(true);
    expect(isThemePreviewLayout('editorial')).toBe(true);
    expect(isThemePreviewLayout('studio')).toBe(false);
    expect(isThemePreviewLayout(null)).toBe(false);
  });
});
