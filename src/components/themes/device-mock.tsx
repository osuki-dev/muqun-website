/**
 * A Muqun screen, on a device, in a theme.
 *
 * One renderer for every place a theme is pictured -- the gallery card, the
 * detail view, the standalone preview route -- so the picture cannot drift
 * between them. It takes a parsed package, a variant, a device and a screen,
 * and draws the app's arrangement at the device's logical size (points, as
 * React Native lays them out), then scales the whole thing to the width it
 * is given. Nothing inside is interactive; the device is one `role="img"`.
 *
 * The arrangement is the app's, read from its source rather than invented:
 *
 *   shell         `components/app-drawer.tsx`
 *   Home          `app/(drawer)/index.tsx`, `lib/responsive-layout.ts`,
 *                 `components/server-agent-rows.tsx`, `pad-server-rail.tsx`
 *   Conversation  `components/pane-chat-view.tsx`, `pane-chat-blocks.tsx`,
 *                 `approval-banner.tsx`
 *   Terminal      `components/server-terminal-workspace.tsx`
 *   chrome        `components/nav-header.tsx`, `glass-chrome.tsx`,
 *                 `terminal-composer.tsx`, `themed-surface.tsx`,
 *                 `theme-artwork.tsx`, `theme-icon.tsx`
 *
 * and so are the rules: which token paints which plane, where each decoration
 * slot is drawn and over which base, that `surfaces.backgroundOpacity` fades
 * coloured planes and never text and is first raised to the pack's own
 * readability floor, that artwork is bounded by the contrast of the labels
 * over it (`theme-render.ts`), that `glass` blurs and `solid` does not, that
 * a `template` icon takes the theme's colour, and that the only glyphs a pack
 * may replace are `chrome.back`, `chrome.send` and `chrome.attach` -- every
 * other icon is the app's own (lucide, at the app's sizes). Words on the screens are
 * fictional session content in the machine register, or the theme's own
 * name; none of it is translated, exactly as the aperture's stream is not.
 */
import { AmbientEffect } from './ambient-effect';
export { AmbientEffect } from './ambient-effect';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

import {
  resolveHomeArtwork,
  resolveHomeIdentity,
  resolveThemeEffects,
  type ThemeEffects,
  type ThemeManifest,
  type ThemeMode,
  type ThemePackage,
} from '@/lib/theme-package';
import { DEFAULT_THEME_PREVIEW_LAYOUT, type ThemePreviewLayout } from '@/lib/theme-preview-layout';
import {
  effectiveThemeManifest,
  jointArtworkOpacity,
  resolveArtwork,
  resolveArtworkOpacity,
  resolveThemeMaterial,
  surfaceFill,
  surfaceOpacity,
  themeArtwork,
  withAlpha,
  type ResolvedArtwork,
  type ThemeSurfaceRole,
} from '@/lib/theme-render';

export type DeviceKind = 'phone' | 'tablet';
export type ScreenKind = 'home' | 'conversation' | 'terminal';

/** Logical sizes in points. The phone is a 6.1" iPhone; the tablet an 11" iPad, landscape. */
export const DEVICES: Record<DeviceKind, { width: number; height: number; radius: number; bezel: number; top: number; bottom: number }> = {
  phone: { width: 390, height: 844, radius: 54, bezel: 12, top: 54, bottom: 34 },
  tablet: { width: 1180, height: 820, radius: 36, bezel: 18, top: 24, bottom: 20 },
};

/** `PAD_RAIL_*` from the app's `responsive-layout.ts`. */
const RAIL_WIDTH = Math.min(288, Math.max(232, DEVICES.tablet.width * 0.25));
/** `constants/nav-header.ts`: the gap between the safe area and any header's controls. */
const NAV_HEADER_TOP_GAP = 10;
/** The app's brand mark, which `homeIdentity.logo: default` shows (`assets/images/loading-mark.png`). */
const BRAND_MARK = '/muqun-mark.png';

/**
 * `homeServerListLayout()` from `responsive-layout.ts`, for the two windows
 * the mock-ups picture: a phone showing two servers, and a pad.
 */
const HOME_LAYOUT = {
  phone: { gutter: 18, maxWidth: undefined, cardGap: 24, cardPadding: 14, cardRadius: 20, listGap: 22, rowMinHeight: 34 },
  tablet: { gutter: 32, maxWidth: 680, cardGap: 24, cardPadding: 22, cardRadius: 24, listGap: 30, rowMinHeight: 44 },
} as const;

interface Props {
  pack: ThemePackage;
  mode: ThemeMode;
  device: DeviceKind;
  screen: ScreenKind;
  /** Home composition only; Classic remains the default for all callers. */
  layout?: ThemePreviewLayout;
  /** Accessible name of the whole picture. */
  label: string;
}

/* --------------------------------------------------------------------------
   Context handed down the tree: everything a plane needs to paint itself.
   -------------------------------------------------------------------------- */

interface Paint {
  pack: ThemePackage;
  /** The manifest as the app installs it: the author's opacities raised to the readability floor. */
  manifest: ThemeManifest;
  mode: ThemeMode;
  width: 'compact' | 'regular';
  colors: ThemeManifest['variants']['light']['colors'];
  terminal: ThemeManifest['variants']['light']['terminal'];
  alpha: number;
  effects?: ThemeEffects;
  /** A coloured plane, faded by the variant's surface opacity (`useSurfaceBackground`). */
  fill: (color: string) => string;
  /** Artwork for a slot over a base colour, bounded the way the app bounds it. */
  art: (slot: string, base: string | null, fallback?: string) => ResolvedArtwork | null;
  /** Whether a slot names an image the package carries (`useHasThemeArtwork`). */
  has: (slot: string, fallback?: string) => boolean;
  /** Home's own illustration, after author preference and asset resolution. */
  homeArtwork: ResolvedArtwork | null;
}

function paintFor(pack: ThemePackage, mode: ThemeMode, device: DeviceKind): Paint {
  const manifest = effectiveThemeManifest(pack.manifest);
  const variant = manifest.variants[mode];
  const alpha = surfaceOpacity(variant.surfaces?.backgroundOpacity);
  const width = device === 'tablet' ? 'regular' : 'compact';
  const homeArtwork = resolveHomeArtwork({ manifest, mode, width });
  const effects = resolveThemeEffects(manifest, mode);
  return {
    pack,
    manifest,
    mode,
    width,
    colors: variant.colors,
    terminal: variant.terminal,
    alpha,
    effects,
    fill: (color) => surfaceFill(color, alpha),
    art: (slot, base, fallback) => resolveArtwork(pack, manifest, slot, mode, width, base, alpha, fallback),
    has: (slot, fallback) => Boolean(themeArtwork(pack, manifest, slot, mode, width, fallback)),
    homeArtwork: homeArtwork
      ? resolveArtwork(pack, manifest, homeArtwork.slot, mode, width, null, alpha)
      : null,
  };
}

/* --------------------------------------------------------------------------
   Building blocks
   -------------------------------------------------------------------------- */

function artStyle(art: ResolvedArtwork, banner = false): CSSProperties {
  const fit = banner || art.image.fit === 'tile' ? 'contain' : (art.image.fit ?? 'cover');
  const tile = art.image.fit === 'tile' && !banner;
  const x = Math.round((art.image.focalPoint?.x ?? 0.5) * 100);
  const y = Math.round((art.image.focalPoint?.y ?? 0.5) * 100);
  return {
    backgroundImage: `url("${art.url}")`,
    backgroundSize: tile ? 'auto' : fit,
    backgroundRepeat: tile ? 'repeat' : 'no-repeat',
    backgroundPosition: `${x}% ${y}%`,
    opacity: art.opacity,
  };
}

/** `ThemeArtworkLayer`: absolute, non-interactive, no layout footprint. */
function Art({ art, banner = false }: { art: ResolvedArtwork | null; banner?: boolean }) {
  return art ? <span className="dm-art" style={artStyle(art, banner)} /> : null;
}

/**
 * Visual ambient overlay for device mockups (rain, particles, scanlines, bloom),
 * matching the native Skia ambient shader effects in the app.
 */
/**
 * Home's illustration is content rather than wallpaper. Use an image element
 * here so a decode failure removes the whole wrapper and leaves no empty band.
 */
function HomeArtwork({
  paint,
  className = 'dm-home__hero',
  onFailure,
}: {
  paint: Paint;
  className?: string;
  onFailure?: () => void;
}) {
  const hero = paint.homeArtwork;
  const [failed, setFailed] = useState<string | null>(null);
  const [foreground, setForeground] = useState<string | null>(null);
  if (!hero || failed === hero.url) return null;
  const objectPosition = `${Math.round((hero.image.focalPoint?.x ?? 0.5) * 100)}% ${Math.round((hero.image.focalPoint?.y ?? 0.5) * 100)}%`;
  return (
    <div className={`${className}${foreground === hero.url ? ' dm-home-artwork--foreground' : ''}`}>
      <img
        src={hero.url}
        crossOrigin="anonymous"
        alt=""
        onLoad={(event) => {
          const image = event.currentTarget;
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 8;
            canvas.height = 1;
            const context = canvas.getContext('2d', { willReadFrequently: true });
            if (!context) return;
            const points = [[0, 0], [0.5, 0], [1, 0], [1, 0.5], [1, 1], [0.5, 1], [0, 1], [0, 0.5]];
            points.forEach(([x, y], index) => context.drawImage(image, Math.round(x * (image.naturalWidth - 1)), Math.round(y * (image.naturalHeight - 1)), 1, 1, index, 0, 1, 1));
            const rgba = context.getImageData(0, 0, 8, 1).data;
            const transparent = points.filter((_, index) => rgba[index * 4 + 3] < 32).length >= 2;
            setForeground(transparent ? hero.url : null);
          } catch {
            // Cross-origin images without CORS retain the opaque-art treatment.
          }
        }}
        style={{ opacity: hero.opacity, objectPosition }}
        onError={() => {
          setFailed(hero.url);
          onFailure?.();
        }}
      />
    </div>
  );
}

/**
 * `GlassChrome`: the app's one piece of glass. A translucent surface
 * preference forces solid (native glass has its own fill and would hide the
 * authored alpha); otherwise the material is `resolveThemeMaterial`'s, with
 * `auto` drawn as the iOS 26 glass the app shows -- the platform tint over a
 * blur of what is underneath. Solid takes the raised plane. Artwork on glass
 * gets an opaque raised backing first, as the app gives it, and every piece
 * of chrome on a faded pack takes a hairline in `border` so it keeps a shape.
 */
function Chrome({
  paint,
  surface,
  className,
  style,
  children,
}: {
  paint: Paint;
  surface: ThemeSurfaceRole;
  className: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const { colors, manifest, alpha } = paint;
  const slot = `${surface}.background`;
  const image = themeArtwork(paint.pack, manifest, slot, paint.mode, paint.width);
  const material = alpha < 1 ? 'solid' : resolveThemeMaterial(manifest, surface, Boolean(image), true);
  const dark = paint.mode === 'dark';
  const background =
    material === 'solid'
      ? paint.fill(colors.surfaceRaised)
      : withAlpha(dark ? colors.background : colors.surface, dark ? 0.34 : 0.26);
  const limit = image ? jointArtworkOpacity(resolveArtworkOpacity(colors), alpha, image.image.opacity ?? 1) : 0;
  const art = image && limit > 0 ? { ...image, opacity: limit } : null;
  return (
    <div
      className={`dm-chrome ${material === 'solid' ? '' : 'dm-chrome--glass'} ${className}`}
      style={{ background, color: colors.text, boxShadow: alpha < 1 ? `inset 0 0 0 1px ${colors.border}` : undefined, ...style }}
    >
      {art && (
        <span className="dm-art-backing" style={material === 'glass' ? { background: colors.surfaceRaised } : undefined}>
          <Art art={art} />
        </span>
      )}
      {children}
    </div>
  );
}

/** `ThemedSurface`: a coloured plane with a slot's artwork bounded over it. */
function Surface({
  paint,
  slot,
  base,
  className,
  style,
  children,
}: {
  paint: Paint;
  slot: string;
  base: string;
  className: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div className={`dm-surface ${className}`} style={{ background: paint.fill(base), ...style }}>
      <Art art={paint.art(slot, base)} />
      {children}
    </div>
  );
}

/**
 * `ThemeIcon`: a chrome glyph the pack may have replaced -- `chrome.back`,
 * `chrome.send`, `chrome.attach`, `home.arrow` etc. -- else the app's
 * own lucide drawing, same size, same colour, same place.
 */
function Glyph({ paint, name, size, color, fallback }: { paint: Paint; name: string; size: number; color: string; fallback: string[] }) {
  const icon = paint.manifest.icons?.[name];
  const url = icon ? paint.pack.assets[icon.asset] : undefined;
  if (!icon || !url) return <Lucide icon={fallback} size={size} color={color} />;
  if (icon.render === 'original') return <img className="dm-icon" src={url} alt="" style={{ width: size, height: size }} />;
  return (
    <span
      className="dm-icon dm-icon--template"
      style={{ width: size, height: size, WebkitMaskImage: `url("${url}")`, maskImage: `url("${url}")`, backgroundColor: color }}
    />
  );
}

/** A lucide icon (the app's `lucide-react-native` 1.28), as path data on a 24-grid. */
const Lucide = ({ icon, size, color, strokeWidth = 2 }: { icon: string[]; size: number; color: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {icon.map((d) => <path key={d} d={d} />)}
  </svg>
);
const ICON = {
  chevronLeft: ['m15 18-6-6 6-6'],
  chevronRight: ['m9 18 6-6-6-6'],
  chevronDown: ['m6 9 6 6 6-6'],
  arrowUpRight: ['M7 17 17 7', 'M7 7h10v10'],
  send: ['M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z', 'm21.854 2.147-10.94 10.939'],
  server: ['M4 2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z', 'M4 14h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z', 'M6 6h.01', 'M6 18h.01'],
  squareTerminal: ['m7 11 2-2-2-2', 'M11 13h4', 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z'],
  link: ['M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.14 1.14', 'M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.14-1.14'],
  scanLine: ['M3 7V5a2 2 0 0 1 2-2h2', 'M17 3h2a2 2 0 0 1 2 2v2', 'M21 17v2a2 2 0 0 1-2 2h-2', 'M7 21H5a2 2 0 0 1-2-2v-2', 'M7 12h10'],
  settings: ['M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915', 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'],
  panelsTopLeft: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M3 9h18', 'M9 21V9'],
  paperclip: ['m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551'],
  zap: ['M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z'],
  shieldAlert: ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'M12 8v4', 'M12 16h.01'],
  check: ['M20 6 9 17l-5-5'],
  checkCheck: ['M18 6 7 17l-5-5', 'm22 10-7.5 7.5L13 16'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
};

/**
 * The mark Home shows: the pack's own where `homeIdentity.logo` is `custom`,
 * the app's brand mark where it is `default` (and where a custom asset is not
 * in the package, the same fallback the app takes when the file fails).
 */
function Logo({ paint, size, className }: { paint: Paint; size: number; className?: string }) {
  const identity = resolveHomeIdentity(paint.manifest);
  if (!identity.logo) return null;
  const url = (identity.logo.mode === 'custom' && paint.pack.assets[identity.logo.asset]) || BRAND_MARK;
  return <img className={`dm-logo ${className ?? ''}`} src={url} alt="" style={{ width: size, height: size }} />;
}

/** `StatusDot`: filled means the app has evidence, hollow means it has not asked. */
function Dot({ color, size = 7, filled = true }: { color: string; size?: number; filled?: boolean }) {
  return (
    <span
      className="dm-dot"
      style={{ width: size, height: size, background: filled ? color : 'transparent', boxShadow: filled ? undefined : `inset 0 0 0 1.5px ${color}` }}
    />
  );
}

/* --------------------------------------------------------------------------
   Home
   -------------------------------------------------------------------------- */

type Reachability = 'live' | 'offline' | 'unknown';
type PaneStatus = 'working' | 'blocked' | 'done' | 'idle';
interface Pane { name: string; cwd?: string; status: PaneStatus }
interface Server { name: string; reachability: Reachability; panes: Pane[] }

const SERVERS: Server[] = [
  {
    name: 'studio',
    reachability: 'live',
    panes: [
      { name: 'claude', cwd: '~/project', status: 'working' },
      { name: 'codex', cwd: '~/project/api', status: 'blocked' },
      { name: 'nvim', status: 'idle' },
    ],
  },
  { name: 'build-box', reachability: 'offline', panes: [{ name: 'tmux · main', status: 'idle' }] },
];

/** `reachabilityLabel` from `i18n/labels.ts`. */
const REACHABILITY = { live: 'ONLINE', offline: 'OFFLINE', unknown: 'NOT CONNECTED' } as const;

/**
 * `ServerAgentRows`: a name, a caption where there is something to say, and a
 * chevron. No dot: the app took the per-pane light away and kept only the
 * server's own. `blocked` is the one status that still earns a word, and it
 * is said only while the statuses are current (the server is reachable).
 */
function PaneRows({ paint, server, selected, compact, minHeight, style }: { paint: Paint; server: Server; selected?: string; compact: boolean; minHeight: number; style?: CSSProperties }) {
  const { colors } = paint;
  const current = server.reachability === 'live';
  return (
    <ul className={`dm-panes ${compact ? 'dm-panes--compact' : ''}`} style={style}>
      {server.panes.map((pane) => {
        const active = selected === pane.name;
        const blocked = current && pane.status === 'blocked';
        const caption = blocked ? 'Blocked' : compact ? undefined : pane.cwd;
        return (
          <li key={pane.name} className="dm-pane" style={{ minHeight }}>
            <span className="dm-pane__copy">
              <span className="dm-pane__name" style={{ color: active ? colors.primary : colors.text, fontWeight: active ? 600 : undefined }}>{pane.name}</span>
              {caption && <span className="dm-pane__caption" style={{ color: blocked ? colors.warning : colors.textSubtle }}>{caption}</span>}
            </span>
            <Glyph paint={paint} name="home.arrow" size={15} color={active ? colors.primary : colors.textMuted} fallback={ICON.chevronRight} />
          </li>
        );
      })}
    </ul>
  );
}

function ServerCard({ paint, server, layout }: { paint: Paint; server: Server; layout: (typeof HOME_LAYOUT)[DeviceKind] }) {
  const { colors } = paint;
  const status = server.reachability === 'live' ? colors.success : colors.textSubtle;
  return (
    <Surface paint={paint} slot="cards.decoration" base={colors.surface} className="dm-card" style={{ borderRadius: layout.cardRadius, padding: layout.cardPadding }}>
      <div className="dm-card__identity">
        <span className="dm-card__avatar" style={{ background: paint.fill(colors.surfaceRaised) }}>
          <Lucide icon={ICON.server} size={19} color={colors.textMuted} />
        </span>
        <div className="dm-card__copy">
          <span className="dm-card__name" style={{ color: colors.text }}>{server.name}</span>
          <span className="dm-card__status" style={{ color: status }}>
            <Dot color={status} size={7} filled={server.reachability !== 'unknown'} />
            {REACHABILITY[server.reachability]}
          </span>
        </div>
      </div>
      <PaneRows paint={paint} server={server} compact={false} minHeight={layout.rowMinHeight} style={{ marginTop: layout.listGap }} />
    </Surface>
  );
}

/** `HeaderButton`: a 40pt circle on `surface`, carrying `navigation.background`, a muted 20pt glyph. */
function HeaderButton({
  paint,
  icon,
  name,
  editorial = false,
  bare = false,
}: {
  paint: Paint;
  icon: string[];
  name?: string;
  editorial?: boolean;
  bare?: boolean;
}) {
  const { colors } = paint;
  return (
    <span
      className={`dm-home__control${editorial ? ' dm-home__control--editorial' : ''}${bare ? ' dm-home__control--bare' : ''}`}
      style={bare ? undefined : { background: paint.fill(colors.surface), borderColor: editorial ? colors.borderStrong : undefined }}>
      {!bare ? <Art art={paint.art('navigation.background', colors.surface)} /> : null}
      {name ? (
        <Glyph paint={paint} name={name} size={20} color={colors.textMuted} fallback={icon} />
      ) : (
        <Lucide icon={icon} size={20} color={colors.textMuted} />
      )}
    </span>
  );
}

function EditorialSection({ paint, title, children }: { paint: Paint; title: string; children: ReactNode }) {
  return (
    <section className="dm-editorial__section" style={{ borderColor: paint.colors.border }}>
      <div className="dm-editorial__section-head" style={{ borderColor: paint.colors.border }}>
        <h3
          style={{
            color: paint.colors.text,
            ...(paint.homeArtwork || paint.has('shell.wallpaper')
              ? {
                  background: paint.fill(paint.colors.surface),
                  padding: '4px 8px',
                  borderRadius: 4,
                }
              : {}),
          }}
        >
          {title}
        </h3>
      </div>
      <div className="dm-editorial__section-body">{children}</div>
    </section>
  );
}

function EditorialTarget({ paint }: { paint: Paint }) {
  const { colors } = paint;
  return (
    <div className="dm-editorial__target" style={{ background: paint.fill(colors.surface), borderColor: colors.borderStrong }}>
      <span className="dm-editorial__target-copy"><strong style={{ color: colors.text }}>studio</strong></span>
      <Lucide icon={ICON.chevronDown} size={16} color={colors.primary} />
    </div>
  );
}

function EditorialLaunches({ paint, rail = false }: { paint: Paint; rail?: boolean }) {
  const { colors } = paint;
  const tile = ({ title, caption, icon, marker, primary = false, compact = false }: {
    title: string;
    caption?: string;
    icon: string[];
    marker: string;
    primary?: boolean;
    compact?: boolean;
  }) => {
    const ink = primary ? colors.onPrimary : colors.text;
    return (
      <div
        className={`dm-editorial__launch${primary ? ' dm-editorial__launch--primary' : ''}${compact ? ' dm-editorial__launch--compact' : ''}`}
        style={{ background: primary ? colors.primary : paint.fill(colors.surface), borderColor: primary ? colors.primary : colors.borderStrong }}>
        <div className="dm-editorial__launch-header">
          <Lucide icon={icon} size={compact ? 16 : 22} color={ink} />
          <span className="dm-editorial__launch-marker" style={{ color: primary ? ink : colors.textMuted }}>{marker}</span>
        </div>
        <strong style={{ color: ink }}>{title}</strong>
        {caption ? <span style={{ color: primary ? ink : colors.textMuted }}>{caption}</span> : null}
        <Lucide icon={ICON.arrowUpRight} size={18} color={ink} />
      </div>
    );
  };
  const cards = (
    <div className="dm-editorial__launch-grid">
      <div className="dm-editorial__launch-primary">
        {tile({ title: 'OpenCode', caption: 'New session', icon: ICON.panelsTopLeft, marker: '01', primary: true })}
      </div>
      <div className="dm-editorial__launch-stack">
        {tile({ title: 'Sessions', icon: ICON.panelsTopLeft, marker: '02', compact: true })}
        {tile({ title: 'Terminal', icon: ICON.squareTerminal, marker: '03', compact: true })}
      </div>
      <div className="dm-editorial__launch-secondary">
        {tile({ title: 'New terminal', icon: ICON.squareTerminal, marker: '04' })}
        {tile({ title: 'SSH', caption: 'SSH hosts', icon: ICON.link, marker: '05' })}
      </div>
    </div>
  );
  if (rail) return <CoverLaunchRail paint={paint}>{cards}</CoverLaunchRail>;
  return (
    <div className="dm-editorial__launches">
      <CoverLaunchRail paint={paint}>{cards}</CoverLaunchRail>
    </div>
  );
}

function CoverLaunchRail({ paint, children }: { paint: Paint; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: true });
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const measure = () => setEdges({
      left: element.scrollLeft > 1,
      right: element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="dm-editorial-cover__rail-wrap">
      <div ref={rail} className="dm-editorial-cover__rail" onScroll={() => {
        const element = rail.current;
        if (element) setEdges({
          left: element.scrollLeft > 1,
          right: element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
        });
      }}>{children}</div>
      {edges.left ? <span className="dm-editorial-cover__edge dm-editorial-cover__edge--left" style={{ backgroundColor: paint.colors.background }} /> : null}
      {edges.right ? <span className="dm-editorial-cover__edge dm-editorial-cover__edge--right" style={{ backgroundColor: paint.colors.background }} /> : null}
    </div>
  );
}

function EditorialRecent({ paint }: { paint: Paint }) {
  const { colors } = paint;
  const rows = [
    ['claude · ~/project', 'OpenCode session', 'studio'],
    ['bun test --watch', 'Terminal', 'studio'],
    ['ops@build-box', 'SSH host', 'saved host'],
  ];
  return (
    <div className="dm-editorial__rows">
      {rows.map(([title, kind, context], index) => (
        <div
          key={title}
          className="dm-editorial__row"
          style={{ background: paint.fill(colors.surface), borderColor: colors.border }}
        >
          <span className="dm-editorial__row-number" style={{ color: colors.primary }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="dm-editorial__row-copy">
            <strong style={{ color: colors.text }}>{title}</strong>
            <span style={{ color: colors.textMuted }}>{kind} · {context}</span>
          </span>
          <Glyph paint={paint} name="home.arrow" size={16} color={colors.primary} fallback={ICON.chevronRight} />
        </div>
      ))}
    </div>
  );
}

function EditorialConnections({ paint }: { paint: Paint }) {
  const { colors } = paint;
  return (
    <div className="dm-editorial__rows">
      <div className="dm-editorial__row" style={{ background: paint.fill(colors.surface), borderColor: colors.border }}>
        <Lucide icon={ICON.server} size={20} color={colors.primary} />
        <span className="dm-editorial__row-copy">
          <strong style={{ color: colors.text }}>studio</strong>
          <span style={{ color: colors.textMuted }}>Online</span>
        </span>
        <Glyph paint={paint} name="home.arrow" size={16} color={colors.textMuted} fallback={ICON.chevronRight} />
      </div>
      <div className="dm-editorial__row" style={{ background: paint.fill(colors.surface), borderColor: colors.border }}>
        <Lucide icon={ICON.server} size={20} color={colors.primary} />
        <span className="dm-editorial__row-copy">
          <strong style={{ color: colors.text }}>build-box</strong>
          <span style={{ color: colors.textMuted }}>Offline, not answering</span>
        </span>
        <Glyph paint={paint} name="home.arrow" size={16} color={colors.textMuted} fallback={ICON.chevronRight} />
      </div>
      <div className="dm-editorial__row" style={{ background: paint.fill(colors.surface), borderColor: colors.border }}>
        <Lucide icon={ICON.link} size={20} color={colors.primary} />
        <span className="dm-editorial__row-copy">
          <strong style={{ color: colors.text }}>ops@build-box</strong>
          <span style={{ color: colors.textMuted }}>Saved SSH host</span>
        </span>
        <Glyph paint={paint} name="home.arrow" size={16} color={colors.textMuted} fallback={ICON.chevronRight} />
      </div>
      <div className="dm-editorial__manage">
        <span style={{ color: colors.primary }}>Manage connections</span>
        <Glyph paint={paint} name="home.arrow" size={16} color={colors.primary} fallback={ICON.chevronRight} />
      </div>
    </div>
  );
}

function HomeEditorialContent({ paint, pad, top, logicalWidth }: { paint: Paint; pad: boolean; top: number; logicalWidth: number }) {
  const { colors } = paint;
  const identity = resolveHomeIdentity(paint.manifest);
  const scene = paint.art('home.wallpaper', null, 'shell.wallpaper');
  const banner = paint.homeArtwork;
  const cover = paint.manifest.homePresentation?.header === 'cover' && banner !== null;
  const bareToolbar = paint.manifest.homePresentation?.toolbarBackground === false;
  const coverTitle = identity.name;
  const [coverTitleHeight, setCoverTitleHeight] = useState(0);
  const gutter = logicalWidth >= 752 ? 24 : 12;
  const innerWidth = Math.max(0, logicalWidth - gutter * 2);
  const actionsWide = innerWidth >= 560;
  const coverSplit = cover && logicalWidth >= 752;
  const homeClassName = [
    'dm-home',
    'dm-home--editorial',
    cover ? 'dm-home--editorial-cover' : '',
    coverSplit ? 'dm-home--editorial-cover-split' : '',
    pad ? 'dm-home--pad' : '',
    actionsWide ? 'dm-home--editorial-actions-wide' : '',
  ].filter(Boolean).join(' ');
  const headerActions = (
    <>
      <HeaderButton paint={paint} name="chrome.scan" icon={ICON.scanLine} editorial bare={bareToolbar} />
      <HeaderButton paint={paint} name="chrome.settings" icon={ICON.settings} editorial bare={bareToolbar} />
    </>
  );
  return (
    <div className={homeClassName} style={{ background: paint.fill(colors.background) }}>
      <Art art={scene} />
      <div
        className="dm-editorial__page"
        style={{
          paddingInline: pad ? 24 : 12,
          paddingTop: cover ? (pad ? 12 : top + 12) : pad ? 24 : top + NAV_HEADER_TOP_GAP,
        }}
      >
        {cover ? (
          <section className="dm-editorial-cover">
            {coverTitle ? <CoverTitle text={coverTitle} color={colors.text} onHeight={setCoverTitleHeight} /> : null}
            <div className="dm-editorial-cover__art">
              <Art art={banner} />
            </div>
            <div className="dm-editorial-cover__utilities" style={{ top: coverTitle ? coverTitleHeight + 8 : 16 }}>{headerActions}</div>
            <div className="dm-editorial-cover__launches">
              <EditorialLaunches paint={paint} rail />
            </div>
          </section>
        ) : null}
        <header className="dm-editorial__masthead" style={{ borderColor: colors.border }}>
          {!cover && banner ? (
            <>
              <div className="dm-editorial__masthead-top">
                <EditorialTarget paint={paint} />
                <div className="dm-editorial__masthead-actions dm-editorial__masthead-actions--inline">{headerActions}</div>
              </div>
              {identity.showBrand && (identity.logo || identity.name) ? (
                <div className="dm-editorial__identity" style={{ color: colors.textMuted }}>
                  {identity.logo ? <Logo paint={paint} size={44} className="dm-editorial__identity-logo" /> : null}
                  {identity.name ? <span>{identity.name}</span> : null}
                </div>
              ) : null}
            </>
          ) : null}
          {!cover && !banner ? (
            <>
              <div className="dm-editorial__masthead-top">
                <EditorialTarget paint={paint} />
                <div className="dm-editorial__masthead-actions dm-editorial__masthead-actions--inline">{headerActions}</div>
              </div>
              {identity.showBrand && (identity.logo || identity.name) ? (
                <div className="dm-editorial__identity dm-editorial__identity--compact" style={{ color: colors.textMuted }}>
                  {identity.logo ? <Logo paint={paint} size={44} className="dm-editorial__identity-logo" /> : null}
                  {identity.name ? <span>{identity.name}</span> : null}
                </div>
              ) : null}
            </>
          ) : null}
        </header>
        {!cover && banner ? <div className="dm-editorial__hero"><Art art={banner} /></div> : null}
        {!cover ? <EditorialLaunches paint={paint} /> : null}
        <div className="dm-editorial__grid">
          <main className="dm-editorial__main">
            <EditorialSection paint={paint} title="Continue">
              <EditorialRecent paint={paint} />
            </EditorialSection>
            {!pad && (
              <EditorialSection paint={paint} title="Connections">
                <EditorialConnections paint={paint} />
              </EditorialSection>
            )}
          </main>
          {pad && <aside className="dm-editorial__aside">
            <EditorialSection paint={paint} title="Connections">
              <EditorialConnections paint={paint} />
            </EditorialSection>
          </aside>}
        </div>
      </div>
    </div>
  );
}

/** Fit the native cover title from its rendered glyph width, as RN does after measuring text. */
function CoverTitle({ text, color, onHeight }: { text: string; color: string; onHeight: (height: number) => void }) {
  const title = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const element = title.current;
    const container = element?.parentElement;
    if (!element || !container) return;
    const measure = () => {
      const naturalWidth = element.scrollWidth * (100 / fontSize);
      const widthFit = naturalWidth > 0 ? (container.clientWidth / naturalWidth) * 100 : 100;
      const sizeCap = container.clientWidth * 0.48;
      const next = Math.round(Math.max(16, Math.min(100, widthFit, sizeCap)) * 100) / 100;
      setFontSize((current) => (current === next ? current : next));
      onHeight(element.getBoundingClientRect().height);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [fontSize, onHeight, text]);

  return (
    <h2 ref={title} style={{ color, fontSize, lineHeight: 1.08 }}>
      {text}
    </h2>
  );
}

function HomeContent({ paint, pad, top }: { paint: Paint; pad: boolean; top: number }) {
  const { colors } = paint;
  const identity = resolveHomeIdentity(paint.manifest);
  const layout = HOME_LAYOUT[pad ? 'tablet' : 'phone'];
  // The page paints its own plane over the shell's, then its wallpaper:
  // `home.wallpaper`, or `shell.wallpaper` when the theme paints the whole
  // shell and Home along with it.
  const scene = paint.art('home.wallpaper', null, 'shell.wallpaper');
  const hasScene = paint.has('home.wallpaper', 'shell.wallpaper');
  return (
    <div className={`dm-home ${pad ? 'dm-home--pad' : ''}`} style={{ background: paint.fill(colors.background) }}>
      <Art art={scene} />
      {!pad && (
        <div className="dm-home__bar" style={{ paddingTop: top + NAV_HEADER_TOP_GAP }}>
          <HeaderButton paint={paint} icon={ICON.squareTerminal} />
          <HeaderButton paint={paint} name="chrome.scan" icon={ICON.scanLine} />
          <HeaderButton paint={paint} name="chrome.settings" icon={ICON.settings} />
        </div>
      )}
      <div
        className="dm-home__list"
        style={{ paddingInline: layout.gutter, gap: layout.cardGap, maxWidth: layout.maxWidth, paddingTop: pad ? 32 : 10 }}
      >
        {/* The brand block at its `mark` weight -- the screen has servers, so
            the name is the top of a page, not a poster. The mark stands on the
            page with no tile; the name takes a plate only over a wallpaper. */}
        {!pad && identity.showBrand && (
          <div className="dm-brand">
            <Logo paint={paint} size={46} />
            {identity.name && (
              <span className="dm-brand__copy" style={hasScene ? { background: paint.fill(colors.background) } : undefined}>
                {hasScene && <Art art={paint.art('navigation.background', colors.background)} />}
                <span className="dm-brand__name" style={{ color: colors.text }}>{identity.name}</span>
              </span>
            )}
          </div>
        )}
        <HomeArtwork paint={paint} />
        {SERVERS.map((server) => (
          <ServerCard key={server.name} paint={paint} server={server} layout={layout} />
        ))}
      </div>
    </div>
  );
}

/** `PadServerRail`: the persistent master column on a wide window. */
function Rail({ paint, selected, editorial = false }: { paint: Paint; selected?: { server: string; pane: string }; editorial?: boolean }) {
  const { colors } = paint;
  const identity = resolveHomeIdentity(paint.manifest);
  return (
    <aside className={`dm-rail${editorial ? ' dm-rail--editorial' : ''}`} style={{ width: RAIL_WIDTH, background: paint.fill(colors.surface) }}>
      <Art art={paint.art('navigation.background', colors.surface)} />
      {identity.showBrand && (
        <div className="dm-rail__brand">
          {identity.logo && (
            <span className="dm-rail__tile" style={{ background: paint.fill(colors.surfaceRaised) }}>
              <Logo paint={paint} size={34} />
            </span>
          )}
          {identity.name !== null && (
            <span className="dm-rail__copy">
              <span className="dm-rail__name" style={{ color: colors.text }}>{identity.name}</span>
              {!editorial ? <span className="dm-rail__tagline" style={{ color: colors.textMuted }}>Your agents, anywhere.</span> : null}
            </span>
          )}
        </div>
      )}
      <span className="dm-rail__label" style={{ color: colors.textMuted }}>Servers</span>
      <div className="dm-rail__groups">
        {SERVERS.map((server) => {
          const status = server.reachability === 'live' ? colors.success : colors.textSubtle;
          const current = selected?.server === server.name;
          return (
            <div key={server.name} className="dm-rail__group">
              <div className="dm-rail__pill" style={current ? { background: paint.fill(colors.primarySubtle) } : undefined}>
                <span className="dm-rail__icon" style={{ background: paint.fill(colors.surfaceRaised) }}>
                  <Lucide icon={ICON.server} size={17} color={colors.textMuted} />
                </span>
                <span className="dm-rail__server">
                  <span className="dm-rail__server-name" style={{ color: colors.text }}>{server.name}</span>
                  <span className="dm-rail__reach" style={{ color: status }}>
                    <Dot color={status} size={7} filled={server.reachability !== 'unknown'} />
                    {REACHABILITY[server.reachability]}
                  </span>
                </span>
              </div>
              <PaneRows paint={paint} server={server} selected={current ? selected?.pane : undefined} compact minHeight={34} />
            </div>
          );
        })}
      </div>
      {/* Three glyphs, not three explained rows: the rail has servers in it. */}
      <div className="dm-rail__actions">
        {[
          { name: 'chrome.scan', icon: ICON.scanLine },
          { name: undefined, icon: ICON.squareTerminal },
          { name: 'chrome.settings', icon: ICON.settings },
        ].map((item, index) => (
          <span key={index} className="dm-rail__action" style={{ background: paint.fill(colors.background) }}>
            {item.name ? (
              <Glyph paint={paint} name={item.name} size={18} color={colors.textMuted} fallback={item.icon} />
            ) : (
              <Lucide icon={item.icon} size={18} color={colors.textMuted} />
            )}
          </span>
        ))}
      </div>
    </aside>
  );
}

/* --------------------------------------------------------------------------
   Workspace chrome shared by the conversation and the terminal
   -------------------------------------------------------------------------- */

function NavHeader({ paint, title, top }: { paint: Paint; title: string; top: number }) {
  const { colors } = paint;
  return (
    <div className="dm-nav" style={{ paddingTop: top + NAV_HEADER_TOP_GAP }}>
      <Chrome paint={paint} surface="navigation" className="dm-nav__circle">
        <Glyph paint={paint} name="chrome.back" size={21} color={colors.text} fallback={ICON.chevronLeft} />
      </Chrome>
      <Chrome paint={paint} surface="navigation" className="dm-nav__pill">
        <span className="dm-nav__title" style={{ color: colors.text }}>{title}</span>
      </Chrome>
      <Chrome paint={paint} surface="navigation" className="dm-nav__circle">
        <Lucide icon={ICON.panelsTopLeft} size={18} color={colors.text} />
      </Chrome>
    </div>
  );
}

function ConnectionPill({ paint }: { paint: Paint }) {
  const { colors } = paint;
  return (
    <div className="dm-pill-anchor">
      <Chrome paint={paint} surface="actions" className="dm-pill">
        <Dot color={colors.success} size={7} />
        <span style={{ color: colors.text }}>Connected</span>
      </Chrome>
    </div>
  );
}

/**
 * `TerminalComposer`: the faint field, the gateway's paperclip in front of it,
 * and Send. Rest fills are `text` at the chrome-control alphas; the armed
 * fill is `primary` and carries `buttons.primary.background`, bounded against
 * the glyph colours the way `ThemedSurfaceArtwork` bounds it.
 */
function Composer({ paint, placeholder, armed }: { paint: Paint; placeholder: string; armed: boolean }) {
  const { colors } = paint;
  const quiet = withAlpha(colors.text, 0.06);
  const control = withAlpha(colors.text, 0.1);
  return (
    <div className="dm-composer" style={{ background: paint.fill(quiet) }}>
      <span className="dm-composer__control" style={{ background: paint.fill(control) }}>
        <Glyph paint={paint} name="chrome.attach" size={17} color={colors.primary} fallback={ICON.paperclip} />
      </span>
      <span className="dm-composer__input" style={{ color: armed ? colors.text : colors.textDisabled }}>{placeholder}</span>
      <span className="dm-composer__control" style={{ background: paint.fill(armed ? colors.primary : control) }}>
        {armed && <Art art={paint.art('buttons.primary.background', colors.primary)} />}
        <Glyph paint={paint} name="chrome.send" size={18} color={armed ? colors.onPrimary : colors.textMuted} fallback={ICON.send} />
      </span>
    </div>
  );
}

function Dock({ paint, pad, bottom, children }: { paint: Paint; pad: boolean; bottom: number; children: ReactNode }) {
  return (
    <div className={`dm-dock-anchor ${pad ? 'dm-dock-anchor--pad' : ''}`}>
      <Chrome paint={paint} surface="composer" className={`dm-dock ${pad ? 'dm-dock--pad' : ''}`} style={{ paddingBottom: pad ? 12 : bottom + 8 }}>
        {children}
      </Chrome>
    </div>
  );
}

/**
 * `ApprovalBanner`: the agent's question, inside the dock above the composer.
 * A raised card; a shield in `warning`; the options as flat rows whose glyph
 * is `primary`, or `danger` for a refusal.
 */
function ApprovalBanner({ paint }: { paint: Paint }) {
  const { colors } = paint;
  const options: [string[], string, boolean][] = [
    [ICON.check, 'Yes', false],
    [ICON.checkCheck, 'Yes, and don’t ask again this session', false],
    [ICON.x, 'No', true],
  ];
  return (
    <div className="dm-approval" style={{ background: paint.fill(colors.surfaceRaised) }}>
      <div className="dm-approval__head">
        <Lucide icon={ICON.shieldAlert} size={16} color={colors.warning} />
        <span className="dm-approval__copy">
          <span className="dm-approval__prompt" style={{ color: colors.text }}>Allow Write to src/theme.json?</span>
          <span className="dm-approval__context" style={{ color: colors.textMuted }}>41 lines · variants.dark.surfaces</span>
        </span>
      </div>
      {options.map(([icon, label, deny]) => (
        <span key={label} className="dm-approval__option">
          <Lucide icon={icon} size={16} color={deny ? colors.danger : colors.primary} />
          <span style={{ color: colors.text }}>{label}</span>
        </span>
      ))}
      <span className="dm-approval__hint" style={{ color: colors.textSubtle }}>esc to cancel</span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Conversation
   -------------------------------------------------------------------------- */

function ConversationContent({ paint, pad, top, bottom }: { paint: Paint; pad: boolean; top: number; bottom: number }) {
  const { colors } = paint;
  return (
    <div className="dm-workspace">
      <NavHeader paint={paint} title="claude · ~/project" top={top} />
      <div className="dm-chat" style={pad ? { maxWidth: 720 } : undefined}>
        <div className="dm-chat__prompt" style={{ background: paint.fill(withAlpha(colors.primary, 0.16)), color: colors.text }}>
          Add a dark variant and keep the terminal readable at 80% opacity.
        </div>
        <p className="dm-chat__text" style={{ color: colors.text }}>
          I read <span className="dm-mono">theme.json</span> and the contrast report. Two pairs set the floor: muted text on the raised surface, and the link colour on the terminal.
        </p>
        <ul className="dm-chat__activity">
          <li style={{ color: colors.textMuted }}><Dot color={colors.success} size={7} /> Read theme.json</li>
          <li style={{ color: colors.textMuted }}><Dot color={colors.success} size={7} /> Ran muqun-theme contrast</li>
        </ul>
        <div className="dm-chat__card" style={{ background: paint.fill(colors.surfaceRaised) }}>
          <span className="dm-chat__card-title" style={{ color: colors.text }}>
            <Dot color={colors.warning} size={7} /> Edit
            <span className="dm-chat__card-body" style={{ color: colors.textMuted }}>src/theme.json</span>
          </span>
        </div>
        <div className="dm-chat__diff" style={{ borderColor: colors.border, background: paint.fill(colors.surface) }}>
          <span className="dm-mono" style={{ color: colors.textMuted }}>src/theme.json</span>
          <span className="dm-mono" style={{ background: withAlpha(paint.terminal.ansi[1]!, 0.14), color: paint.terminal.ansi[1] }}>- "backgroundOpacity": 1</span>
          <span className="dm-mono" style={{ background: withAlpha(paint.terminal.ansi[2]!, 0.14), color: paint.terminal.ansi[2] }}>+ "backgroundOpacity": 0.82</span>
        </div>
      </div>
      <div className="dm-workspace__foot">
        <ConnectionPill paint={paint} />
        <Dock paint={paint} pad={pad} bottom={bottom}>
          <ApprovalBanner paint={paint} />
          <Composer paint={paint} placeholder="Message claude…" armed={false} />
        </Dock>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Terminal
   -------------------------------------------------------------------------- */

const KEYS = ['esc', 'tab', 'ctrl', '↑', '↓', '⌘'];

function TerminalContent({ paint, pad, top, bottom }: { paint: Paint; pad: boolean; top: number; bottom: number }) {
  const { colors, terminal } = paint;
  const a = terminal.ansi;
  const fg = terminal.foreground;
  // `terminalBackgroundFill`: the pane's own colour at its (clamped) opacity.
  const fill = withAlpha(terminal.background, surfaceOpacity(terminal.backgroundOpacity));
  const key = paint.fill(withAlpha(colors.text, 0.1));
  return (
    <div className="dm-workspace">
      <div className="dm-term" style={{ background: fill, color: fg }}>
        <pre className="dm-term__out" style={{ paddingTop: top + NAV_HEADER_TOP_GAP + 46 + 16 }}>
          <span style={{ color: a[2] }}>❯</span> bun test{'\n'}
          <span style={{ color: a[8] }}>bun test v1.4.2 (linux x64)</span>{'\n'}
          {'\n'}
          <span style={{ color: a[2] }}>✓</span> schema.test.ts <span style={{ color: a[8] }}>(12)</span>{'\n'}
          <span style={{ color: a[2] }}>✓</span> package.test.ts <span style={{ color: a[8] }}>(8)</span>{'\n'}
          <span style={{ color: a[1] }}>✗</span> opacity.test.ts <span style={{ color: a[8] }}>›</span> floor{'\n'}
          {'  '}<span style={{ color: a[3] }}>expected</span> 0.82 <span style={{ color: a[3] }}>to be</span> 0.80{'\n'}
          {'\n'}
          <span style={{ color: a[2] }}> 20 pass</span> <span style={{ color: a[1] }}> 1 fail</span>{'\n'}
          {'\n'}
          <span style={{ color: a[2] }}>❯</span> git diff --stat{'\n'}
          {' src/theme.json | 4 '}<span style={{ color: a[2] }}>++</span><span style={{ color: a[1] }}>--</span>{'\n'}
          {'\n'}
          <span style={{ color: a[2] }}>❯</span> open <span style={{ color: terminal.link, textDecoration: 'underline' }}>https://muqun.dev/themes/</span>{'\n'}
          <span style={{ color: a[8] }}># palette</span>{'\n'}
          {a.slice(0, 8).map((color, i) => <span key={i} style={{ color }}>{'▇▇ '}</span>)}{'\n'}
          {a.slice(8).map((color, i) => <span key={i} style={{ color }}>{'▇▇ '}</span>)}{'\n'}
          <span style={{ color: a[5] }}>{String(a.length).padStart(2, '0')}</span> colours ·{' '}
          <span style={{ background: terminal.selection, color: fg }}>selected text</span>{'\n'}
          {'\n'}
          <span style={{ color: a[2] }}>❯</span> <span className="dm-term__cursor" style={{ background: terminal.cursor }} />
        </pre>
      </div>
      <NavHeader paint={paint} title="studio · claude" top={top} />
      <div className="dm-workspace__foot">
        <ConnectionPill paint={paint} />
        <Dock paint={paint} pad={pad} bottom={bottom}>
          <div className="dm-keys">
            <span className="dm-key dm-key--entry" style={{ background: key }}>
              <Lucide icon={ICON.zap} size={16} color={colors.primary} />
            </span>
            {KEYS.map((label) => (
              <span key={label} className="dm-key" style={{ background: key, color: colors.text }}>{label}</span>
            ))}
          </div>
          <Composer paint={paint} placeholder="bun test --watch" armed />
        </Dock>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   The device
   -------------------------------------------------------------------------- */

function useScale(logicalWidth: number): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setScale(node.clientWidth / logicalWidth);
    measure();
    if (!('ResizeObserver' in window)) return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [logicalWidth]);
  return [ref, scale];
}

export default function DeviceMock({ pack, mode, device, screen, layout = DEFAULT_THEME_PREVIEW_LAYOUT, label }: Props) {
  const spec = DEVICES[device];
  const paint = paintFor(pack, mode, device);
  const [ref, scale] = useScale(spec.width + spec.bezel * 2);
  const pad = device === 'tablet';
  const { colors } = paint;

  const content =
    screen === 'home' ? (
      layout === 'editorial' ? (
        <HomeEditorialContent paint={paint} pad={pad} top={spec.top} logicalWidth={pad ? spec.width - RAIL_WIDTH - 36 : spec.width} />
      ) : (
        <HomeContent paint={paint} pad={pad} top={spec.top} />
      )
    ) : screen === 'conversation' ? (
      <ConversationContent paint={paint} pad={pad} top={spec.top} bottom={spec.bottom} />
    ) : (
      <TerminalContent paint={paint} pad={pad} top={spec.top} bottom={spec.bottom} />
    );

  return (
    <div
      ref={ref}
      className={`dm dm--${device} dm--${mode}`}
      role="img"
      aria-label={label}
      style={{
        aspectRatio: `${spec.width + spec.bezel * 2} / ${spec.height + spec.bezel * 2}`,
        // Clip the wrapper to the same scaled silhouette as the device shell.
        borderRadius: `${((spec.radius + spec.bezel) / (spec.width + spec.bezel * 2)) * 100}% / ${((spec.radius + spec.bezel) / (spec.height + spec.bezel * 2)) * 100}%`,
      }}
    >
      <div
        className="dm-device"
        aria-hidden="true"
        style={{
          width: spec.width + spec.bezel * 2,
          height: spec.height + spec.bezel * 2,
          padding: spec.bezel,
          borderRadius: spec.radius + spec.bezel,
          transform: `scale(${scale})`,
          visibility: scale > 0 ? 'visible' : 'hidden',
        }}
      >
        <div
          className="dm-screen"
          style={{
            width: spec.width,
            height: spec.height,
            borderRadius: spec.radius,
            background: paint.fill(colors.background),
            color: colors.text,
            colorScheme: mode,
          }}
        >
          {/* `AppDrawer`'s shell: the app's plane and `shell.wallpaper`, once,
              under Home and the workspace alike, on both form factors. */}
          <Art art={paint.art('shell.wallpaper', null)} />
          {paint.effects?.ambient && paint.effects.ambient !== 'none' && (
            <AmbientEffect
              effect={paint.effects.ambient}
              intensity={paint.effects.intensity}
              speed={paint.effects.speed}
              density={paint.effects.density}
              size={paint.effects.size}
              palette={paint.effects.palette}
              direction={paint.effects.direction}
              colors={colors}
            />
          )}
          {pad ? (
            <div className="dm-split" style={{ paddingTop: spec.top + 12, paddingBottom: spec.bottom }}>
              <Rail paint={paint} editorial={layout === 'editorial'} selected={screen === 'home' ? undefined : { server: 'studio', pane: 'claude' }} />
              <div className="dm-split__detail">{content}</div>
            </div>
          ) : (
            <div className="dm-compact">{content}</div>
          )}
          {device === 'phone' && <span className="dm-island" />}
          <span className="dm-home-indicator" style={{ background: withAlpha(colors.text, 0.5) }} />
        </div>
      </div>
    </div>
  );
}
