/**
 * Everything the site shows of one parsed theme: for each variant, the device
 * mock-ups (a phone on its three main screens, a tablet on two) and, under
 * them, the token lists. The detail view and the standalone preview route
 * both render exactly this, so a theme looks the same wherever it is opened.
 */
import type { ThemesCopy } from '@/i18n/themes';
import type { ThemeMode, ThemePackage } from '@/lib/theme-package';

import DeviceMock, { type DeviceKind, type ScreenKind } from './device-mock';
import ThemeTokens from './theme-tokens';

interface Props {
  pack: ThemePackage;
  copy: ThemesCopy;
  /** Skip the token lists: the preview route's compact mode. */
  tokens?: boolean;
}

const PHONE_SCREENS: ScreenKind[] = ['home', 'conversation', 'terminal'];
const TABLET_SCREENS: ScreenKind[] = ['home', 'terminal'];

function label(copy: ThemesCopy, pack: ThemePackage, mode: ThemeMode, device: DeviceKind, screen: ScreenKind): string {
  return `${pack.manifest.name} · ${mode === 'light' ? copy.detail.light : copy.detail.dark} · ${copy.screens[device]} · ${copy.screens[screen]}`;
}

export default function ThemeShowcase({ pack, copy, tokens = true }: Props) {
  return (
    <div className="showcase">
      {(['light', 'dark'] as const).map((mode) => (
        <section key={mode} className={`showcase__mode showcase__mode--${mode}`} aria-label={mode === 'light' ? copy.detail.light : copy.detail.dark}>
          <h4 className="showcase__title">
            <span>{mode === 'light' ? copy.detail.light : copy.detail.dark}</span>
            <span className="showcase__id">{mode}</span>
          </h4>

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
      ))}
    </div>
  );
}
