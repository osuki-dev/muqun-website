import { describe, expect, test } from 'bun:test';

import {
  DEFAULT_THEME_PREVIEW_LAYOUT,
  isThemePreviewLayout,
  normalizeThemePreviewLayout,
  THEME_PREVIEW_LAYOUTS,
} from '../theme-preview-layout';

describe('theme preview layouts', () => {
  test('keeps Classic as the compatibility default', () => {
    expect(DEFAULT_THEME_PREVIEW_LAYOUT).toBe('classic');
    expect(normalizeThemePreviewLayout(undefined)).toBe('classic');
    expect(normalizeThemePreviewLayout('future-layout')).toBe('classic');
    expect(THEME_PREVIEW_LAYOUTS).toEqual(['classic', 'editorial']);
  });

  test('accepts only the layouts the preview actually renders', () => {
    expect(isThemePreviewLayout('classic')).toBe(true);
    expect(isThemePreviewLayout('editorial')).toBe(true);
    expect(isThemePreviewLayout('studio')).toBe(false);
    expect(isThemePreviewLayout(null)).toBe(false);
  });
});
