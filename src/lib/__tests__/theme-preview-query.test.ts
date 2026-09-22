import { describe, expect, test } from 'bun:test';

import {
  parseThemePreviewQuery,
  previewDeviceVisible,
} from '../theme-preview-query';

describe('theme preview query selection', () => {
  test('accepts the bounded CLI selection and keeps unrelated parameters out of state', () => {
    expect(parseThemePreviewQuery('?source=theme.zip&refresh=0&layout=editorial&device=tablet&mode=dark')).toEqual({
      layout: 'editorial',
      device: 'tablet',
      mode: 'dark',
    });
    expect(previewDeviceVisible('tablet', 'tablet')).toBe(true);
    expect(previewDeviceVisible('tablet', 'phone')).toBe(false);
  });

  test('falls back safely for missing or invalid optional parameters', () => {
    expect(parseThemePreviewQuery('?layout=magazine&device=watch&mode=sepia')).toEqual({
      layout: 'classic',
      device: 'all',
      mode: undefined,
    });
    expect(parseThemePreviewQuery('')).toEqual({
      layout: 'classic',
      device: 'all',
      mode: undefined,
    });
    expect(previewDeviceVisible('all', 'phone')).toBe(true);
    expect(previewDeviceVisible('all', 'tablet')).toBe(true);
  });
});
