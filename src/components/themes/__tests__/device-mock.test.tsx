import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, test } from 'bun:test';

import DeviceMock from '../device-mock';
import { resolveHomeIdentity, type ThemeColors, type ThemeManifest, type ThemePackage } from '@/lib/theme-package';

const colors: ThemeColors = {
  background: '#151515',
  surface: '#202020',
  surfaceRaised: '#2b2b2b',
  border: '#454545',
  borderStrong: '#666666',
  text: '#f5f5f5',
  textMuted: '#b5b5b5',
  textSubtle: '#858585',
  textDisabled: '#555555',
  primary: '#d77a61',
  onPrimary: '#1a100d',
  primarySubtle: '#40251f',
  danger: '#d05050',
  dangerSubtle: '#3d1e1e',
  success: '#70b77d',
  warning: '#dcae58',
  info: '#6d9fd1',
};

const terminal = {
  background: '#101010',
  foreground: '#f5f5f5',
  cursor: '#d77a61',
  link: '#6d9fd1',
  selection: '#454545',
  ansi: Array.from({ length: 16 }, () => '#f5f5f5'),
};

function previewPackage(
  identity: ThemeManifest['homeIdentity'] = {
    name: { mode: 'custom', text: 'Muqun Lab' },
    logo: { mode: 'default' },
  },
): ThemePackage {
  const variant = { colors, terminal };
  return {
    manifest: {
      format: 'muqun-theme',
      schemaVersion: 1,
      id: 'editorial-contract',
      name: 'Editorial Contract',
      version: '1.0.0',
      homeIdentity: identity,
      decoration: {
        'home.artwork': { asset: 'artwork' },
      },
      variants: { light: variant, dark: variant },
    },
    assets: {
      brand: 'https://example.com/brand.png',
      artwork: 'https://example.com/artwork.png',
    },
  };
}

function renderEditorial(pack = previewPackage()) {
  return renderToStaticMarkup(
    <DeviceMock
      pack={pack}
      mode="light"
      device="phone"
      screen="home"
      layout="editorial"
      label="Editorial Home preview"
    />,
  );
}

describe('editorial Home preview contract', () => {
  test('uses App launch and attention vocabulary without inventing a request payload', () => {
    const markup = renderEditorial();

    expect(markup).toContain('dm-home--editorial');
    expect(markup).not.toContain('dm-home--editorial-actions-wide');
    expect(markup).toContain('dm-editorial-cover__rail-wrap');
    expect(markup).toContain('studio');
    expect(markup).toContain('dm-editorial__target');
    expect(markup).toContain('dm-editorial__launch-grid');
    expect(markup).toContain('dm-editorial__launch-primary');
    expect(markup).toContain('dm-editorial__launch-secondary');
    expect(markup).toContain('dm-editorial__launch-header');
    expect(markup.match(/dm-editorial__launch-header/g)).toHaveLength(5);
    expect(markup.match(/dm-editorial__row-number/g)).toHaveLength(3);
    expect(markup.match(/dm-editorial__section-head/g)).toHaveLength(2);
    expect(markup).toContain('OpenCode');
    expect(markup).toContain('New session');
    expect(markup).toContain('Sessions');
    expect(markup).toContain('Terminal');
    expect(markup).toContain('New terminal');
    expect(markup).toContain('SSH hosts');
    expect(markup).not.toContain('SSH connection');
    expect(markup).toContain('3 requests last observed');
    expect(markup).toContain('Last checked recently');
    expect(markup).toContain('Open to check the current state');
    expect(markup).toContain('Manage connections');
    expect(markup).toContain('Saved SSH host');
    expect(markup).toContain('Offline, not answering');
    expect(markup).not.toContain('REACHABLE');
    expect(markup).not.toContain('Write to src/theme.json?');
    expect(markup).not.toContain('dm-editorial__controls');
    expect(markup).not.toContain('PAIR A GATEWAY');
    expect(markup).not.toContain('OPEN');
    expect(markup).not.toContain('dm-home__bar');
    expect(markup).not.toContain('HOME / EDITORIAL');
    expect(markup.indexOf('dm-editorial__target')).toBeLessThan(markup.indexOf('dm-editorial__identity'));
    expect(markup.indexOf('dm-editorial__launches')).toBeLessThan(markup.indexOf('dm-editorial__grid'));
    expect(markup).toContain('dm-editorial__masthead-action');
    expect(markup.indexOf('dm-banner')).toBeLessThan(markup.indexOf('dm-editorial__masthead'));
  });

  test('renders the default identity mark and keeps custom identity resolution aligned', () => {
    expect(renderEditorial()).toContain('/muqun-mark.png');
    expect(
      resolveHomeIdentity({
        ...previewPackage().manifest,
        homeIdentity: {
          name: { mode: 'custom', text: 'Custom Lab' },
          logo: { mode: 'custom', asset: 'brand' },
        },
      }),
    ).toEqual({
      name: 'Custom Lab',
      logo: { mode: 'custom', asset: 'brand' },
      showBrand: true,
    });
  });

  test('renders the cover preset with a native title, decoration foreground and bare toolbar', () => {
    const pack = previewPackage({
      name: { mode: 'custom', text: 'RIBBON REVERIE' },
      logo: { mode: 'hidden' },
    });
    pack.manifest.homePresentation = { header: 'cover', toolbarBackground: false };
    const markup = renderEditorial(pack);

    expect(markup).toContain('dm-home--editorial-cover');
    expect(markup).toContain('dm-editorial-cover__art');
    expect(markup).toContain('dm-editorial-cover__launches');
    expect(markup).toContain('dm-editorial-cover__rail');
    expect(markup).toContain('dm-editorial-cover__edge--right');
    expect(markup).not.toContain('dm-editorial-cover__edge--left');
    expect(markup).toContain('RIBBON REVERIE');
    expect(markup.match(/dm-home__control--bare/g)).toHaveLength(2);
    expect(markup).not.toContain('dm-editorial__identity');
  });

  test('keeps untitled cover utilities at the App offset', () => {
    const pack = previewPackage({
      name: { mode: 'hidden' },
      logo: { mode: 'hidden' },
    });
    pack.manifest.homePresentation = { header: 'cover', toolbarBackground: true };
    const markup = renderEditorial(pack);

    expect(markup).not.toContain('Editorial Contract</h2>');
    expect(markup).toContain('dm-editorial-cover__utilities" style="top:16px"');
    expect(markup).not.toContain('dm-home__control--bare');
  });
});

describe('shared Home artwork contract', () => {
  test('Classic renders the unified foreground once', () => {
    const markup = renderToStaticMarkup(
      <DeviceMock
        pack={previewPackage()}
        mode="light"
        device="phone"
        screen="home"
        layout="classic"
        label="Classic Home preview"
      />,
    );

    expect(markup.match(/dm-home__hero/g)).toHaveLength(1);
    expect(markup).not.toContain('dm-banner');
  });
});

describe('ambient effect preview contract', () => {
  test('renders ambient effect overlay when declared in manifest', () => {
    const pack = previewPackage();
    pack.manifest.effects = { ambient: 'rain', intensity: 0.7 };

    const markup = renderToStaticMarkup(
      <DeviceMock
        pack={pack}
        mode="light"
        device="phone"
        screen="home"
        label="Rain ambient preview"
      />,
    );

    expect(markup).toContain('dm-ambient--rain');
    expect(markup).toContain('dm-rain__streak');
  });

  test('does not render ambient effect when none or absent', () => {
    const pack = previewPackage();
    const markup = renderToStaticMarkup(
      <DeviceMock
        pack={pack}
        mode="light"
        device="phone"
        screen="home"
        label="No ambient preview"
      />,
    );

    expect(markup).not.toContain('dm-ambient');
  });
});

