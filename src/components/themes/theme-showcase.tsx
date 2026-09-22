/**
 * Everything the site shows of one parsed theme: the device mock-ups (a
 * phone on its three main screens, a tablet on two) and, under them, the
 * token lists. One variant at a time, chosen with a switch that stays in view
 * while the reader scrolls, and that starts on whichever mode the site itself
 * is in. The detail view and the standalone preview route both render exactly
 * this, so a theme looks the same wherever it is opened.
 */
import { useEffect, useId, useRef, useState } from 'react';

import type { ThemesCopy } from '@/i18n/themes';
import { useScrollReveal } from '@/lib/theme-motion';
import {
  previewDeviceVisible,
  readThemePreviewQuery,
  THEME_PREVIEW_DEVICES,
  type ThemePreviewDevice,
} from '@/lib/theme-preview-query';
import { THEME_PREVIEW_LAYOUTS, type ThemePreviewLayout } from '@/lib/theme-preview-layout';
import type { ThemeMode, ThemePackage } from '@/lib/theme-package';

import DeviceMock, { type DeviceKind, type ScreenKind } from './device-mock';
import ThemeTokens from './theme-tokens';

interface Props {
  pack: ThemePackage;
  copy: ThemesCopy;
  /** Skip the token lists: the preview route's compact mode. */
  tokens?: boolean;
}

const MODES: ThemeMode[] = ['light', 'dark'];
const PHONE_SCREENS: ScreenKind[] = ['home', 'conversation', 'terminal'];
const TABLET_SCREENS: ScreenKind[] = ['home', 'terminal'];

function label(
  copy: ThemesCopy,
  pack: ThemePackage,
  mode: ThemeMode,
  device: DeviceKind,
  screen: ScreenKind,
  layout: ThemePreviewLayout,
): string {
  const layoutName = screen === 'home' ? ` · ${layoutNameFor(copy, layout)}` : '';
  return `${pack.manifest.name} · ${modeName(copy, mode)} · ${copy.screens[device]} · ${copy.screens[screen]}${layoutName}`;
}

function modeName(copy: ThemesCopy, mode: ThemeMode): string {
  return mode === 'light' ? copy.detail.light : copy.detail.dark;
}

function layoutNameFor(copy: ThemesCopy, layout: ThemePreviewLayout): string {
  return layout === 'classic' ? copy.screens.classic : copy.screens.editorial;
}

/** The mode the site is showing right now: its explicit choice, else the system's. */
function siteMode(): ThemeMode {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'dark' || chosen === 'light') return chosen;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeShowcase({ pack, copy, tokens = true }: Props) {
  const id = useId();
  const [query] = useState(readThemePreviewQuery);
  const [mode, setMode] = useState<ThemeMode>(() => query.mode ?? 'light');
  const [layout, setLayout] = useState<ThemePreviewLayout>(() => query.layout);
  const [device, setDevice] = useState<ThemePreviewDevice>(() => query.device);
  useEffect(() => {
    if (!query.mode) setMode(siteMode());
  }, [query.mode]);

  const root = useRef<HTMLDivElement>(null);
  useScrollReveal(root, '.showcase__section, .showcase__figure, .tp-section', [device, layout, mode, pack]);

  return (
    <div className="showcase" ref={root}>
      <div className="showcase__switches">
        <div className="showcase__switch showcase__layout-switch" data-layout={layout} role="tablist" aria-label={copy.screens.layout}>
          {THEME_PREVIEW_LAYOUTS.map((candidate) => (
            <button
              key={candidate}
              type="button"
              role="tab"
              id={`${id}-layout-${candidate}`}
              aria-controls={`${id}-panel`}
              tabIndex={layout === candidate ? 0 : -1}
              aria-selected={layout === candidate}
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === 'Home' ? 'classic' : event.key === 'End' ? 'editorial' : candidate === 'classic' ? 'editorial' : 'classic';
                setLayout(next);
                document.getElementById(`${id}-layout-${next}`)?.focus();
              }}
              className={`showcase__tab${layout === candidate ? ' showcase__tab--active' : ''}`}
              onClick={() => setLayout(candidate)}
            >
              {layoutNameFor(copy, candidate)}
            </button>
          ))}
        </div>
        <div className="showcase__switch showcase__device-switch" data-device={device} role="tablist" aria-label={copy.screens.devices}>
          {THEME_PREVIEW_DEVICES.map((candidate, index) => (
            <button
              key={candidate}
              type="button"
              role="tab"
              id={`${id}-device-${candidate}`}
              aria-controls={`${id}-panel`}
              tabIndex={device === candidate ? 0 : -1}
              aria-selected={device === candidate}
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                const next =
                  event.key === 'Home'
                    ? 'all'
                    : event.key === 'End'
                      ? 'tablet'
                      : THEME_PREVIEW_DEVICES[(index + (event.key === 'ArrowRight' ? 1 : -1) + THEME_PREVIEW_DEVICES.length) % THEME_PREVIEW_DEVICES.length]!;
                setDevice(next);
                document.getElementById(`${id}-device-${next}`)?.focus();
              }}
              className={`showcase__tab${device === candidate ? ' showcase__tab--active' : ''}`}
              onClick={() => setDevice(candidate)}
            >
              {candidate === 'all' ? copy.screens.all : candidate === 'phone' ? copy.screens.phone : copy.screens.tablet}
            </button>
          ))}
        </div>
        <div className="showcase__switch" data-mode={mode} role="tablist" aria-label={copy.screens.devices}>
          {MODES.map((candidate) => (
            <button
              key={candidate}
              type="button"
              role="tab"
              id={`${id}-${candidate}`}
              aria-controls={`${id}-panel`}
              tabIndex={mode === candidate ? 0 : -1}
              aria-selected={mode === candidate}
              onKeyDown={(event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === 'Home' ? 'light' : event.key === 'End' ? 'dark' : candidate === 'light' ? 'dark' : 'light';
                setMode(next);
                document.getElementById(`${id}-${next}`)?.focus();
              }}
              className={`showcase__tab${mode === candidate ? ' showcase__tab--active' : ''}`}
              onClick={() => setMode(candidate)}
            >
              {modeName(copy, candidate)}
            </button>
          ))}
        </div>
      </div>

      <section key={`${mode}-${layout}-${device}`} className={`showcase__mode showcase__mode--${mode}`} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${mode}`} tabIndex={0}>
        <h5 className="showcase__section">{copy.screens.devices}</h5>
        {previewDeviceVisible(device, 'phone') && (
          <div className="showcase__phones">
            {PHONE_SCREENS.map((screen) => (
              <figure key={screen} className="showcase__figure">
                <DeviceMock pack={pack} mode={mode} device="phone" screen={screen} layout={layout} label={label(copy, pack, mode, 'phone', screen, layout)} />
                <figcaption className="showcase__caption">{copy.screens.phone} · {copy.screens[screen]}</figcaption>
              </figure>
            ))}
          </div>
        )}
        {previewDeviceVisible(device, 'tablet') && (
          <div className="showcase__tablets">
            {TABLET_SCREENS.map((screen) => (
              <figure key={screen} className="showcase__figure">
                <DeviceMock pack={pack} mode={mode} device="tablet" screen={screen} layout={layout} label={label(copy, pack, mode, 'tablet', screen, layout)} />
                <figcaption className="showcase__caption">{copy.screens.tablet} · {copy.screens[screen]}</figcaption>
              </figure>
            ))}
          </div>
        )}

        {tokens && (
          <>
            <h5 className="showcase__section">{copy.screens.tokens}</h5>
            <ThemeTokens pack={pack} mode={mode} labels={copy.detail} />
          </>
        )}
      </section>
    </div>
  );
}
