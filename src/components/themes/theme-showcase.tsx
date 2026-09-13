/**
 * Everything the site shows of one parsed theme: the device mock-ups (a
 * phone on its three main screens, a tablet on two) and, under them, the
 * token lists. One variant at a time, chosen with a switch that stays in view
 * while the reader scrolls, and that starts on whichever mode the site itself
 * is in. The detail view and the standalone preview route both render exactly
 * this, so a theme looks the same wherever it is opened.
 */
import { useEffect, useRef, useState } from 'react';

import type { ThemesCopy } from '@/i18n/themes';
import { useReveal } from '@/lib/theme-motion';
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

function label(copy: ThemesCopy, pack: ThemePackage, mode: ThemeMode, device: DeviceKind, screen: ScreenKind): string {
  return `${pack.manifest.name} · ${modeName(copy, mode)} · ${copy.screens[device]} · ${copy.screens[screen]}`;
}

function modeName(copy: ThemesCopy, mode: ThemeMode): string {
  return mode === 'light' ? copy.detail.light : copy.detail.dark;
}

/** The mode the site is showing right now: its explicit choice, else the system's. */
function siteMode(): ThemeMode {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'dark' || chosen === 'light') return chosen;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeShowcase({ pack, copy, tokens = true }: Props) {
  const [mode, setMode] = useState<ThemeMode>('light');
  useEffect(() => setMode(siteMode()), []);

  // A switched variant arrives figure by figure rather than all at once.
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, '.showcase__figure, .showcase__section, .tokens', [mode, pack]);

  return (
    <div className="showcase" ref={root}>
      <div className="showcase__switch" role="tablist" aria-label={copy.screens.devices}>
        {MODES.map((candidate) => (
          <button
            key={candidate}
            type="button"
            role="tab"
            aria-selected={mode === candidate}
            className={`showcase__tab${mode === candidate ? ' showcase__tab--active' : ''}`}
            onClick={() => setMode(candidate)}
          >
            <span>{modeName(copy, candidate)}</span>
            <span className="showcase__id">{candidate}</span>
          </button>
        ))}
      </div>

      <section key={mode} className={`showcase__mode showcase__mode--${mode}`} role="tabpanel" aria-label={modeName(copy, mode)}>
        <h5 className="showcase__section">{copy.screens.devices}</h5>
        <div className="showcase__phones">
          {PHONE_SCREENS.map((screen) => (
            <figure key={screen} className="showcase__figure">
              <DeviceMock pack={pack} mode={mode} device="phone" screen={screen} label={label(copy, pack, mode, 'phone', screen)} />
              <figcaption className="showcase__caption">{copy.screens.phone} · {copy.screens[screen]}</figcaption>
            </figure>
          ))}
        </div>
        <div className="showcase__tablets">
          {TABLET_SCREENS.map((screen) => (
            <figure key={screen} className="showcase__figure">
              <DeviceMock pack={pack} mode={mode} device="tablet" screen={screen} label={label(copy, pack, mode, 'tablet', screen)} />
              <figcaption className="showcase__caption">{copy.screens.tablet} · {copy.screens[screen]}</figcaption>
            </figure>
          ))}
        </div>

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
