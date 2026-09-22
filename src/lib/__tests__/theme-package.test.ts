import { describe, expect, test } from 'bun:test';

import {
  declaredSlots,
  parseThemeManifest,
  resolveHomeArtwork,
  resolveThemeEffects,
  type ThemeManifest,
} from '../theme-package';
import { resolveArtwork, themeArtwork } from '../theme-render';

const colors = {
  background: '#111111',
  surface: '#222222',
  surfaceRaised: '#333333',
  border: '#444444',
  borderStrong: '#555555',
  text: '#FFFFFF',
  textMuted: '#EEEEEE',
  textSubtle: '#DDDDDD',
  textDisabled: '#CCCCCC',
  primary: '#FF0000',
  onPrimary: '#FFFFFF',
  primarySubtle: '#FF000033',
  danger: '#FF1111',
  dangerSubtle: '#FF111133',
  success: '#00FF00',
  warning: '#FFFF00',
  info: '#0000FF',
};

const terminal = {
  background: '#111111',
  foreground: '#FFFFFF',
  cursor: '#FFFFFF',
  link: '#FFFFFF',
  selection: '#FFFFFF33',
  ansi: Array.from({ length: 16 }, () => '#FFFFFF'),
};

function manifest(overrides: Partial<ThemeManifest> = {}): ThemeManifest {
  return {
    format: 'muqun-theme',
    schemaVersion: 1,
    id: 'fixture',
    name: 'Fixture',
    version: '1.0.0',
    variants: {
      light: { colors, terminal },
      dark: { colors, terminal },
    },
    ...overrides,
  };
}

describe('Home artwork resolution', () => {
  test('uses the authored artwork and its regular override by width', () => {
    const theme = manifest({
      decoration: {
        'home.artwork': {
          asset: 'compact-hero',
          fit: 'contain',
          regular: { asset: 'regular-hero', fit: 'contain' },
        },
      },
      homeIdentity: { artwork: { mode: 'default' } },
    });

    expect(resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'compact' })).toEqual({
      slot: 'home.artwork',
      image: { asset: 'compact-hero', fit: 'contain' },
    });
    expect(resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'regular' })).toEqual({
      slot: 'home.artwork',
      image: { asset: 'regular-hero', fit: 'contain' },
    });
  });

  test('keeps authored focal point and opacity on the home artwork', () => {
    const theme = manifest({
      decoration: {
        'home.artwork': {
          asset: 'hero',
          opacity: 0.37,
          focalPoint: { x: 0.2, y: 0.8 },
        },
      },
    });
    const resolved = resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'compact' });
    expect(resolved?.image).toEqual({
      asset: 'hero',
      opacity: 0.37,
      focalPoint: { x: 0.2, y: 0.8 },
    });
    expect(
      resolveArtwork({ manifest: theme, assets: { hero: '/hero.png' } }, theme, 'home.artwork', 'light', 'compact', null, 0.2)
        ?.opacity,
    ).toBe(0.37);
  });

  test('honours the authored hidden switch and explicit reader overrides', () => {
    const theme = manifest({
      decoration: { 'home.artwork': { asset: 'hero' } },
      homeIdentity: { artwork: { mode: 'hidden' } },
    });

    expect(resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'compact' })).toBeNull();
    expect(resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'compact', preference: 'shown' })).toEqual({
      slot: 'home.artwork',
      image: { asset: 'hero' },
    });
    expect(resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'compact', preference: 'hidden' })).toBeNull();
  });

  test('does not borrow empty-state art for Home', () => {
    const theme = manifest({ decoration: { 'emptyState.illustration': { asset: 'empty' } } });

    expect(resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'compact' })).toBeNull();
    expect(resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'compact', preference: 'shown' })).toBeNull();
  });

  test('disabled decorations and missing assets resolve to no artwork', () => {
    const theme = manifest({ decoration: { 'home.artwork': { asset: 'hero' } } });

    expect(resolveHomeArtwork({ manifest: theme, mode: 'light', width: 'compact', decorationsEnabled: false })).toBeNull();
    expect(themeArtwork({ manifest: theme, assets: {} }, theme, 'home.artwork', 'light', 'compact')).toBeNull();
  });
});

test('declared slots keep home.artwork in the app order', () => {
  const theme = manifest({ decoration: { 'home.artwork': { asset: 'hero' } } });
  expect(declaredSlots(theme)).toEqual(['home.artwork']);
});

describe('Theme effects resolution', () => {
  test('parses and resolves shared and variant-level effects', () => {
    const raw = JSON.stringify({
      format: 'muqun-theme',
      schemaVersion: 1,
      id: 'neon-city',
      name: 'Neon City',
      version: '1.0.0',
      effects: { ambient: 'scanlines', intensity: 0.4 },
      variants: {
        light: { colors, terminal },
        dark: {
          colors,
          terminal,
          effects: { ambient: 'rain', intensity: 0.8 },
        },
      },
    });

    const parsed = parseThemeManifest(raw);
    expect(parsed.effects).toEqual({ ambient: 'scanlines', intensity: 0.4 });
    expect(parsed.variants.dark.effects).toEqual({ ambient: 'rain', intensity: 0.8 });

    // Light falls back to shared effects
    expect(resolveThemeEffects(parsed, 'light')).toEqual({ ambient: 'scanlines', intensity: 0.4 });
    // Dark uses variant override
    expect(resolveThemeEffects(parsed, 'dark')).toEqual({ ambient: 'rain', intensity: 0.8 });
  });

  test('resolves to undefined when ambient effect is none or unspecified', () => {
    const theme = manifest();
    expect(resolveThemeEffects(theme, 'light')).toBeUndefined();
    expect(resolveThemeEffects(theme, 'dark')).toBeUndefined();

    const noneTheme = manifest({ effects: { ambient: 'none' } });
    expect(resolveThemeEffects(noneTheme, 'light')).toBeUndefined();
  });
});

