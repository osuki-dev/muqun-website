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
  /** Home composition, phones only: the tablet draws one Home for all three. Stage is the default. */
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

function artStyle(art: ResolvedArtwork, banner = false, cover = false): CSSProperties {
  const fit = cover
    ? (art.image.fit === 'cover' ? 'cover' : '100% auto')
    : banner || art.image.fit === 'tile'
      ? 'contain'
      : (art.image.fit ?? 'cover');
  const tile = art.image.fit === 'tile' && !banner && !cover;
  const x = Math.round((art.image.focalPoint?.x ?? 0.5) * 100);
  const y = Math.round((art.image.focalPoint?.y ?? (cover ? 0 : 0.5)) * 100);
  return {
    backgroundImage: `url("${art.url}")`,
    backgroundSize: tile ? 'auto' : fit,
    backgroundRepeat: tile ? 'repeat' : 'no-repeat',
    backgroundPosition: `${x}% ${y}%`,
    opacity: art.opacity,
  };
}

/** `ThemeArtworkLayer`: absolute, non-interactive, no layout footprint. */
function Art({ art, banner = false, cover = false }: { art: ResolvedArtwork | null; banner?: boolean; cover?: boolean }) {
  return art ? <span className="dm-art" style={artStyle(art, banner, cover)} /> : null;
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
  slidersHorizontal: ['M10 5H3', 'M12 19H3', 'M14 3v4', 'M16 17v4', 'M21 12h-9', 'M21 19h-3', 'M21 5h-5', 'M8 12H3'],
  monitor: ['M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8 21h8', 'M12 17v4'],
  bot: ['M12 8V4H8', 'M4 8h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', 'M2 14h2', 'M20 14h2', 'M15 13v2', 'M9 13v2'],
  folder: ['M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'],
  keyboard: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'M6 8h.01', 'M10 8h.01', 'M14 8h.01', 'M18 8h.01', 'M8 12h.01', 'M12 12h.01', 'M16 12h.01', 'M7 16h10'],
  arrowUpDown: ['m21 16-4 4-4-4', 'M17 20V4', 'm3 8 4-4 4 4', 'M7 4v16'],
  layers: ['M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z', 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12', 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17'],
  square: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z'],
  plus: ['M5 12h14', 'M12 5v14'],
  play: ['m6 3 14 9-14 9V3z'],
  fileText: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 9H8', 'M16 13H8', 'M16 17H8'],
  terminalPrompt: ['m4 17 6-6-6-6', 'M12 19h8'],
  refresh: ['M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16', 'M8 16H3v5'],
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

/**
 * `HomeComputerCard` (4.0): the computer as an entry point, not a pane list
 * -- its name and reachability, what the agents on it are doing, and the
 * tasks line with its progress. The panes live in Recent now.
 */
function ServerCard({ paint, server, layout }: { paint: Paint; server: Server; layout: (typeof HOME_LAYOUT)[DeviceKind] }) {
  const { colors } = paint;
  const live = server.reachability === 'live';
  const status = live ? colors.success : colors.textSubtle;
  const working = server.panes.filter((pane) => pane.status === 'working').length;
  const blocked = server.panes.filter((pane) => pane.status === 'blocked').length;
  return (
    <Surface paint={paint} slot="cards.decoration" base={colors.surface} className="dm-card" style={{ borderRadius: layout.cardRadius, padding: layout.cardPadding }}>
      <div className="dm-card__identity">
        <span className="dm-card__avatar" style={{ background: paint.fill(colors.surfaceRaised) }}>
          <Lucide icon={ICON.monitor} size={19} color={colors.textMuted} />
        </span>
        <div className="dm-card__copy">
          <span className="dm-card__name" style={{ color: colors.text }}>{server.name}</span>
          <span className="dm-card__status" style={{ color: status }}>
            <Dot color={status} size={7} filled={server.reachability !== 'unknown'} />
            {REACHABILITY[server.reachability]}
          </span>
        </div>
        <Glyph paint={paint} name="home.arrow" size={16} color={colors.textMuted} fallback={ICON.chevronRight} />
      </div>
      {live ? (
        <div className="dm-card__tasks" style={{ marginTop: layout.listGap - 8 }}>
          <span className="dm-card__tasks-line" style={{ color: colors.textMuted }}>
            <span style={{ color: colors.text, fontWeight: 600 }}>Tasks</span>
            {' · '}
            <span style={{ color: colors.primary }}>{working} working</span>
            {blocked > 0 && (
              <>
                {' · '}
                <span style={{ color: colors.warning }}>{blocked} needs you</span>
              </>
            )}
          </span>
          <span className="dm-card__progress" style={{ background: withAlpha(colors.text, 0.1) }}>
            <span style={{ width: '62%', background: colors.primary }} />
          </span>
          <span className="dm-card__tasks-line" style={{ color: colors.textSubtle }}>
            codex · Dark variant for the cover · Working
          </span>
        </div>
      ) : (
        <span className="dm-card__tasks-line" style={{ color: colors.textSubtle, marginTop: layout.listGap - 8 }}>
          Last known activity · tmux · main
        </span>
      )}
    </Surface>
  );
}

/** `HeaderButton`: a 40pt circle on `surface`, carrying `navigation.background`, a muted 20pt glyph. */
function HeaderButton({
  paint,
  icon,
  name,
  bare = false,
}: {
  paint: Paint;
  icon: string[];
  name?: string;
  bare?: boolean;
}) {
  const { colors } = paint;
  return (
    <span
      className={`dm-home__control${bare ? ' dm-home__control--bare' : ''}`}
      style={bare ? undefined : { background: paint.fill(colors.surface) }}>
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

/**
 * Editorial Home (4.0): the masthead with the mark and the name, the square
 * controls, the artwork, the launch tiles, then Computers, Recent and
 * Connections as the app's sections, and the Home composer dock at the foot
 * (`home-editorial-layout.tsx`). A cover theme draws its title over the
 * artwork with the controls under it and the tiles on the cover.
 */
function HomeEditorialContent({ paint, top, bottom }: { paint: Paint; top: number; bottom: number }) {
  const { colors } = paint;
  const identity = resolveHomeIdentity(paint.manifest);
  const scene = paint.art('home.wallpaper', null, 'shell.wallpaper');
  const banner = paint.homeArtwork;
  const cover = paint.manifest.homePresentation?.header === 'cover' && banner !== null;
  const bareToolbar = paint.manifest.homePresentation?.toolbarBackground === false;
  const coverTitle = identity.name;
  const [coverTitleHeight, setCoverTitleHeight] = useState(0);
  const tools = (
    <div className="dm-editorial__tools">
      {[
        { name: 'chrome.scan', icon: ICON.scanLine },
        { name: 'chrome.settings', icon: ICON.slidersHorizontal },
      ].map((tool) =>
        bareToolbar ? (
          <span key={tool.name} className="dm-square dm-square--bare" style={{ width: 44, height: 44 }}>
            <Glyph paint={paint} name={tool.name} size={20} color={colors.text} fallback={tool.icon} />
          </span>
        ) : (
          <SquareButton key={tool.name} paint={paint} name={tool.name} icon={tool.icon} />
        ),
      )}
    </div>
  );
  const sections = (
    <main className="dm-editorial__main">
      <EditorialSection paint={paint} title="Computers">
        <ServerCard paint={paint} server={SERVERS[0]!} layout={HOME_LAYOUT.phone} />
      </EditorialSection>
      <EditorialSection paint={paint} title="Recent">
        <RecentRows paint={paint} />
      </EditorialSection>
      <EditorialSection paint={paint} title="Connections">
        <ConnectionRows paint={paint} />
      </EditorialSection>
    </main>
  );
  return (
    <div className={`dm-home dm-home--editorial${cover ? ' dm-home--editorial-cover' : ''}`} style={{ background: paint.fill(colors.background) }}>
      <Art art={scene} />
      <div className="dm-editorial__page" style={{ paddingInline: 12, paddingTop: cover ? top + 12 : top + NAV_HEADER_TOP_GAP }}>
        {cover ? (
          <section className="dm-editorial-cover">
            {coverTitle ? <CoverTitle text={coverTitle} color={colors.text} onHeight={setCoverTitleHeight} /> : null}
            <div className="dm-editorial-cover__art" style={{ top: -(top + 12), left: -12, right: -12, bottom: 0 }}>
              <Art art={banner} cover />
            </div>
            <div className="dm-editorial-cover__utilities" style={{ top: coverTitle ? coverTitleHeight + 8 : 16 }}>{tools}</div>
            <div className="dm-editorial-cover__launches">
              <LaunchTiles paint={paint} />
            </div>
          </section>
        ) : (
          <header className="dm-editorial__masthead" style={{ borderColor: colors.border }}>
            <div className="dm-editorial__masthead-top">
              {identity.showBrand && (identity.logo || identity.name) ? (
                <div className="dm-editorial__identity" style={{ color: colors.text }}>
                  {identity.logo ? (
                    <span className="dm-brand__tile dm-brand__tile--small" style={{ background: paint.fill(colors.surfaceRaised) }}>
                      <Logo paint={paint} size={34} className="dm-editorial__identity-logo" />
                    </span>
                  ) : null}
                  {identity.name ? <span className="dm-editorial__identity-name">{identity.name}</span> : null}
                </div>
              ) : (
                <span />
              )}
              {tools}
            </div>
          </header>
        )}
        {!cover && banner ? <div className="dm-editorial__hero"><Art art={banner} /></div> : null}
        {!cover ? <LaunchTiles paint={paint} /> : null}
        {sections}
      </div>
      <HomeComposer paint={paint} agent="OpenCode" pad={false} bottom={bottom} />
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

/**
 * Classic Home (4.0): the circles in the bar, the brand block with the
 * tagline, the artwork, the computer cards as entry points, and the Home
 * composer dock at the foot like every layout since 4.0.
 */
function HomeContent({ paint, pad, top, bottom = 0 }: { paint: Paint; pad: boolean; top: number; bottom?: number }) {
  const { colors } = paint;
  const identity = resolveHomeIdentity(paint.manifest);
  const layout = HOME_LAYOUT[pad ? 'tablet' : 'phone'];
  // The page paints its own plane over the shell's, then its wallpaper:
  // `home.wallpaper`, or `shell.wallpaper` when the theme paints the whole
  // shell and Home along with it.
  const scene = paint.art('home.wallpaper', null, 'shell.wallpaper');
  const hasScene = paint.has('home.wallpaper', 'shell.wallpaper');
  const banner = paint.homeArtwork;
  const cover = paint.manifest.homePresentation?.header === 'cover' && banner !== null;
  const bareToolbar = paint.manifest.homePresentation?.toolbarBackground === false;
  return (
    <div className={`dm-home ${pad ? 'dm-home--pad' : ''}${cover ? ' dm-home--classic-cover' : ''}`} style={{ background: paint.fill(colors.background) }}>
      <Art art={scene} />
      {cover && !pad && (
        <div className="dm-classic-cover__art">
          <Art art={banner} cover />
        </div>
      )}
      {!pad && (
        <div className="dm-home__bar" style={{ paddingTop: top + NAV_HEADER_TOP_GAP }}>
          <HeaderButton paint={paint} icon={ICON.squareTerminal} bare={bareToolbar} />
          <HeaderButton paint={paint} name="chrome.scan" icon={ICON.scanLine} bare={bareToolbar} />
          <HeaderButton paint={paint} name="chrome.settings" icon={ICON.settings} bare={bareToolbar} />
        </div>
      )}
      <div
        className="dm-home__list"
        style={{ paddingInline: layout.gutter, gap: layout.cardGap, maxWidth: layout.maxWidth, paddingTop: pad ? 32 : (cover ? 20 : 10) }}
      >
        {/* The brand block at its `mark` weight -- the screen has servers, so
            the name is the top of a page, not a poster. The mark stands on the
            page with no tile; the name takes a plate only over a wallpaper. */}
        {!pad && identity.showBrand && (
          <div className="dm-brand">
            {identity.logo && (
              <span className="dm-brand__tile" style={{ background: paint.fill(colors.surfaceRaised) }}>
                <Logo paint={paint} size={46} />
              </span>
            )}
            {identity.name && (
              <span className="dm-brand__copy" style={hasScene ? { background: paint.fill(colors.background) } : undefined}>
                {hasScene && <Art art={paint.art('navigation.background', colors.background)} />}
                <span className="dm-brand__name" style={{ color: colors.text }}>{identity.name}</span>
                <span className="dm-brand__tagline" style={{ color: colors.textMuted }}>Your agents, anywhere</span>
              </span>
            )}
          </div>
        )}
        {!cover && <HomeArtwork paint={paint} />}
        {SERVERS.map((server) => (
          <ServerCard key={server.name} paint={paint} server={server} layout={layout} />
        ))}
      </div>
      {!pad && <HomeComposer paint={paint} agent="Codex" pad={false} bottom={bottom} />}
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

/**
 * `NavHeader` (4.0): the back chevron, the title centred, one action on the
 * right, all set straight on the page -- the 3.x glass circles and pill are
 * gone from the workspace.
 */
function NavHeader({ paint, title, top, action }: { paint: Paint; title: string; top: number; action: string[] }) {
  const { colors } = paint;
  return (
    <div className="dm-nav dm-nav--flat" style={{ paddingTop: top + NAV_HEADER_TOP_GAP }}>
      <span className="dm-nav__circle">
        <Glyph paint={paint} name="chrome.back" size={22} color={colors.text} fallback={ICON.chevronLeft} />
      </span>
      <span className="dm-nav__pill">
        <span className="dm-nav__title" style={{ color: colors.text }}>{title}</span>
      </span>
      <span className="dm-nav__circle">
        <Lucide icon={action} size={20} color={colors.text} />
      </span>
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

/** The sessions of this computer as chips over the dock; the open one on `primary`. */
function SessionChips({ paint, chips, icons }: { paint: Paint; chips: string[]; icons?: string[][] }) {
  const { colors } = paint;
  return (
    <div className="dm-chips">
      {chips.map((chip, index) => (
        <span
          key={chip}
          className={`dm-chip${index === 0 ? ' dm-chip--on' : ''}`}
          style={index === 0 ? { background: colors.primary, color: colors.onPrimary } : { color: colors.text }}
        >
          {icons?.[index] && <Lucide icon={icons[index]!} size={15} color={index === 0 ? colors.onPrimary : colors.textMuted} />}
          {chip}
        </span>
      ))}
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

/* --------------------------------------------------------------------------
   Conversation
   -------------------------------------------------------------------------- */

function ConversationContent({ paint, pad, top, bottom }: { paint: Paint; pad: boolean; top: number; bottom: number }) {
  const { colors } = paint;
  const control = withAlpha(colors.text, 0.08);
  return (
    <div className="dm-workspace">
      <NavHeader paint={paint} title="Dark variant for the cover" top={top} action={ICON.plus} />
      <div className="dm-chat" style={pad ? { maxWidth: 720 } : undefined}>
        <div className="dm-chat__user" style={{ borderColor: colors.primary, background: paint.fill(colors.surface) }}>
          <span className="dm-chat__meta"><b style={{ color: colors.primary }}>You</b> <span style={{ color: colors.textMuted }}>2m ago</span></span>
          <span style={{ color: colors.text }}>Add a dark variant and keep the terminal readable at 80% opacity.</span>
        </div>
        <p className="dm-chat__text" style={{ color: colors.text }}>
          I read <span className="dm-mono">theme.json</span> and the contrast report. Two pairs set the floor: muted text on the raised surface, and the link colour on the terminal.
        </p>
        <div className="dm-chat__tools">
          {[
            [ICON.terminalPrompt, 'bash', '42ms'],
            [ICON.fileText, 'read', '53ms'],
          ].map(([icon, name, took]) => (
            <span key={name as string} className="dm-chat__tool" style={{ background: paint.fill(colors.surfaceRaised), color: colors.text }}>
              <Lucide icon={icon as string[]} size={14} color={colors.textMuted} />
              {name as string}
              <span style={{ color: colors.textMuted }}>{took as string}</span>
              <Lucide icon={ICON.chevronDown} size={13} color={colors.textMuted} />
            </span>
          ))}
        </div>
        <div className="dm-chat__card" style={{ background: paint.fill(colors.surfaceRaised) }}>
          <span className="dm-chat__card-title" style={{ color: colors.text }}>
            <Dot color={colors.warning} size={7} /> Edit
            <span className="dm-chat__card-body" style={{ color: colors.textMuted }}>src/theme.json</span>
          </span>
          <div className="dm-chat__diff" style={{ borderColor: colors.border, background: paint.fill(colors.surface) }}>
            <span className="dm-mono" style={{ background: withAlpha(paint.terminal.ansi[1]!, 0.14), color: paint.terminal.ansi[1] }}>- "backgroundOpacity": 1</span>
            <span className="dm-mono" style={{ background: withAlpha(paint.terminal.ansi[2]!, 0.14), color: paint.terminal.ansi[2] }}>+ "backgroundOpacity": 0.82</span>
          </div>
        </div>
        <span className="dm-chat__thinking" style={{ background: paint.fill(colors.surfaceRaised), color: colors.primary }}>
          <span className="dm-chat__dots" aria-hidden="true"><i /><i /><i /></span> Thinking…
        </span>
      </div>
      <div className="dm-workspace__foot">
        <Dock paint={paint} pad={pad} bottom={bottom}>
          <SessionChips paint={paint} chips={['Dark variant for the cover', 'Contrast report']} />
          <div className="dm-controls">
            <span className="dm-control" style={{ background: paint.fill(control) }}>
              <Lucide icon={ICON.layers} size={16} color={colors.text} />
            </span>
            <span className="dm-control" style={{ background: paint.fill(control), color: colors.text }}>
              Model <Lucide icon={ICON.chevronDown} size={14} color={colors.text} />
            </span>
            <span className="dm-control" style={{ background: withAlpha(colors.warning, 0.18), color: colors.warning }}>
              <Lucide icon={ICON.zap} size={14} color={colors.warning} /> Steer
            </span>
            <span className="dm-control" style={{ background: colors.danger, color: colors.onPrimary }}>
              <Lucide icon={ICON.square} size={13} color={colors.onPrimary} /> Stop
            </span>
          </div>
          <Composer paint={paint} placeholder={pad ? 'Send a message, type / for commands, $ for skills, @ for files' : 'Send a message'} armed={false} />
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
      <NavHeader paint={paint} title="studio · claude" top={top} action={ICON.panelsTopLeft} />
      <div className="dm-workspace__foot">
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
   4.0 Home: the composer dock, the square controls, and the Stage
   -------------------------------------------------------------------------- */

/**
 * The 4.0 header control: a rounded square on `surface` with a muted glyph,
 * the shape every Home layout and the tablet rail use since the kit's 2.0.
 * Replaces the 3.x circle on Editorial, Stage and the tablet; Classic keeps
 * its circles.
 */
function SquareButton({ paint, icon, name, size = 44 }: { paint: Paint; icon: string[]; name?: string; size?: number }) {
  const { colors } = paint;
  return (
    <span className="dm-square" style={{ width: size, height: size, background: paint.fill(colors.surface), borderColor: colors.border }}>
      <Art art={paint.art('navigation.background', colors.surface)} />
      {name ? <Glyph paint={paint} name={name} size={20} color={colors.text} fallback={icon} /> : <Lucide icon={icon} size={20} color={colors.text} />}
    </span>
  );
}

/**
 * `HomeComposerDock`: the field every Home layout ends on since 4.0 -- the
 * placeholder names the agent a send would start, the toolbar under it holds
 * Task options (computer, agent, folder, mode and model) and the attach
 * control, and Send sits at the end. On a phone it is the dock at the
 * bottom edge; on the tablet it is a card in the cover column.
 */
function HomeComposer({ paint, agent, pad, bottom = 0 }: { paint: Paint; agent: string; pad: boolean; bottom?: number }) {
  const { colors } = paint;
  return (
    <div className={`dm-hcomposer${pad ? ' dm-hcomposer--pad' : ''}`} style={{ marginBottom: pad ? 0 : bottom + 8 }}>
      <div className="dm-hcomposer__field" style={{ background: paint.fill(colors.surface), borderColor: colors.border, color: colors.textDisabled }}>
        <Art art={paint.art('composer.background', colors.surface)} />
        <span className="dm-hcomposer__placeholder">New conversation with {agent}</span>
        <div className="dm-hcomposer__bar">
          <Glyph paint={paint} name="chrome.attach" size={18} color={colors.textMuted} fallback={ICON.paperclip} />
          <Glyph paint={paint} name="chrome.parameters" size={18} color={colors.textMuted} fallback={ICON.slidersHorizontal} />
          <span className="dm-hcomposer__send">
            <Glyph paint={paint} name="chrome.send" size={20} color={colors.textMuted} fallback={ICON.send} />
          </span>
        </div>
      </div>
    </div>
  );
}

/** `StageAgentRow`: a dot in the agent's state colour, its name, and the word only when it is not idle. */
const STAGE_CHIPS: { name: string; mark: 'working' | 'needs-you' | 'idle' }[] = [
  { name: 'codex', mark: 'working' },
  { name: 'claude', mark: 'needs-you' },
  { name: 'nvim', mark: 'idle' },
];

/** `StageSessionStrip`: the selected computer's sessions as cards, then All sessions. */
const STAGE_SESSIONS = ['Dark variant', 'bun test --watch'];

/**
 * Stage Home, as a flat composition. In the app the theme's artwork is a 3D
 * world that moves with the phone (`home-stage/gpu-stage`); here it is the
 * artwork itself, standing on the foot: the computer HUD at the top, then the
 * subtitle plate in the agent chips' place, the chips, the pull handle, the
 * session strip and the composer dock, each read from `home-stage-layout.tsx`.
 */
function HomeStageContent({ paint, top, bottom }: { paint: Paint; top: number; bottom: number }) {
  const { colors } = paint;
  const scene = paint.art('home.wallpaper', null, 'shell.wallpaper');
  const frost = withAlpha(colors.surfaceRaised, 0.78);
  return (
    <div className="dm-home dm-home--stage" style={{ background: paint.fill(colors.background) }}>
      <Art art={scene} />
      <div className="dm-stage__world">
        <HomeArtwork paint={paint} className="dm-stage__artwork" />
      </div>
      <span className="dm-stage__scrim dm-stage__scrim--top" style={{ height: top + 150, backgroundImage: `linear-gradient(${paint.fill(colors.background)}, ${withAlpha(colors.background, 0)})` }} />
      <span className="dm-stage__scrim dm-stage__scrim--bottom" style={{ backgroundImage: `linear-gradient(${withAlpha(colors.background, 0)}, ${paint.fill(colors.background)} 55%)` }} />
      <div className="dm-stage__top" style={{ paddingTop: top + 10 }}>
        <div className="dm-stage__hud">
          <span className="dm-stage__kicker" style={{ color: colors.primary }}>Computer</span>
          <span className="dm-stage__name" style={{ color: colors.text }}>studio</span>
          <span className="dm-stage__status" style={{ color: colors.text }}>
            <Dot color={colors.primary} size={7} /> Agent working
          </span>
        </div>
        <div className="dm-stage__tools">
          <SquareButton paint={paint} name="chrome.scan" icon={ICON.scanLine} />
          <SquareButton paint={paint} name="chrome.settings" icon={ICON.slidersHorizontal} />
        </div>
      </div>
      <div className="dm-stage__dashes" style={{ top: top + 86 }}>
        <span style={{ width: 30, background: colors.primary }} />
        <span style={{ background: withAlpha(colors.text, 0.32) }} />
      </div>
      <div className="dm-stage__foot">
        <div className="dm-stage__subtitles">
          <span className="dm-stage__plate" style={{ background: frost, color: colors.textMuted }}>
            <b style={{ color: colors.primary }}>Codex</b> · Working&nbsp; Reading <code className="dm-mono" style={{ color: colors.text }}>theme.json</code> and the contrast report
          </span>
        </div>
        <ul className="dm-stage__chips">
          {STAGE_CHIPS.map((chip) => {
            const tone = chip.mark === 'needs-you' ? colors.warning : chip.mark === 'working' ? colors.primary : colors.textMuted;
            return (
              <li key={chip.name} className="dm-stage__chip" style={{ background: frost, color: colors.text }}>
                <Dot color={tone} size={7} />
                {chip.name}
                {chip.mark !== 'idle' && <span style={{ color: tone }}>{chip.mark === 'working' ? 'Working' : 'Needs you'}</span>}
              </li>
            );
          })}
        </ul>
        <div className="dm-stage__handle">
          <span className="dm-grabber" style={{ background: withAlpha(colors.text, 0.3) }} />
          <span style={{ color: colors.warning }}>Needs you</span>
        </div>
        <div className="dm-stage__strip">
          {STAGE_SESSIONS.map((title, index) => (
            <span key={title} className="dm-stage__card" style={{ background: frost, color: colors.text }}>
              <Lucide icon={index === 0 ? ICON.bot : ICON.squareTerminal} size={14} color={index === 0 ? colors.primary : colors.textMuted} />
              {title}
            </span>
          ))}
          <span className="dm-stage__card" style={{ background: frost, color: colors.textMuted }}>All sessions</span>
        </div>
        <HomeComposer paint={paint} agent="Codex" pad={false} bottom={bottom} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   4.0 tablet Home: one composition for every layout
   -------------------------------------------------------------------------- */

interface RecentRow { title: string; agent: string; where: string; status?: { word: string; tone: 'working' | 'running' } }
const RECENT: RecentRow[] = [
  { title: 'Dark variant for the cover', agent: 'Codex', where: 'studio · ~/project', status: { word: 'Working', tone: 'working' } },
  { title: 'Contrast report', agent: 'Codex', where: 'studio · ~/project', status: { word: 'Running', tone: 'running' } },
  { title: 'bun test --watch', agent: 'Terminal', where: 'studio' },
];

function RecentRows({ paint }: { paint: Paint }) {
  const { colors } = paint;
  return (
    <div className="dm-rows" style={{ background: paint.fill(colors.surface), borderColor: colors.border }}>
      {RECENT.map((row, index) => (
        <div key={row.title} className="dm-rows__row dm-rows__row--numbered" style={{ borderColor: colors.border }}>
          <span className="dm-rows__number" style={{ color: colors.primary }}>{String(index + 1).padStart(2, '0')}</span>
          <span className="dm-rows__copy">
            <strong style={{ color: colors.text }}>
              <Lucide icon={row.agent === 'Terminal' ? ICON.squareTerminal : ICON.bot} size={16} color={row.agent === 'Terminal' ? colors.textMuted : colors.primary} />
              {row.title}
            </strong>
            <span style={{ color: colors.textMuted }}>
              {row.agent} · {row.where}
              {row.status && (
                <>
                  {' · '}
                  <Dot color={row.status.tone === 'working' ? colors.primary : colors.info} size={6} />{' '}
                  <span style={{ color: row.status.tone === 'working' ? colors.primary : colors.info }}>{row.status.word}</span>
                </>
              )}
              {' · Seen just now'}
            </span>
          </span>
          <Glyph paint={paint} name="home.arrow" size={16} color={colors.primary} fallback={ICON.chevronRight} />
        </div>
      ))}
    </div>
  );
}

function ConnectionRows({ paint }: { paint: Paint }) {
  const { colors } = paint;
  const rows: [string[], string, string][] = [
    [ICON.monitor, 'studio', 'Online'],
    [ICON.monitor, 'build-box', 'Offline, not answering'],
    [ICON.squareTerminal, 'ops@build-box', 'Saved SSH host'],
  ];
  return (
    <>
      <div className="dm-rows" style={{ background: paint.fill(colors.surface), borderColor: colors.border }}>
        {rows.map(([icon, title, caption]) => (
          <div key={title} className="dm-rows__row" style={{ borderColor: colors.border }}>
            <Lucide icon={icon} size={20} color={colors.primary} />
            <span className="dm-rows__copy">
              <strong style={{ color: colors.text }}>{title}</strong>
              <span style={{ color: colors.textMuted }}>{caption}</span>
            </span>
            <Glyph paint={paint} name="home.arrow" size={16} color={colors.primary} fallback={ICON.chevronRight} />
          </div>
        ))}
      </div>
      <span className="dm-rows__manage" style={{ color: colors.primary }}>
        Manage connections <Lucide icon={ICON.chevronRight} size={14} color={colors.primary} />
      </span>
    </>
  );
}

/** The launch tiles: the default agent on `primary`, a new terminal beside it. */
function LaunchTiles({ paint }: { paint: Paint }) {
  const { colors } = paint;
  return (
    <div className="dm-tiles">
      <span className="dm-tile dm-tile--primary" style={{ background: colors.primary, color: colors.onPrimary }}>
        <Art art={paint.art('buttons.primary.background', colors.primary)} />
        <Lucide icon={ICON.bot} size={18} color={colors.onPrimary} />
        OpenCode
      </span>
      <span className="dm-tile" style={{ background: paint.fill(colors.surface), borderColor: colors.border, color: colors.text }}>
        <Lucide icon={ICON.squareTerminal} size={16} color={colors.primary} />
        New terminal
        <span className="dm-tile__marker" style={{ color: colors.textMuted }}>04</span>
        <Lucide icon={ICON.arrowUpRight} size={16} color={colors.primary} />
      </span>
    </div>
  );
}

/**
 * The tablet's Home, the same on every layout (`home-overview.tsx` draws
 * Stage only on phones; the pad shares Editorial's geometry): the cover
 * column pairs the theme's artwork and name with the launch tiles and the
 * composer, and the work column lists connections and recent work.
 */
function HomePadContent({ paint, top }: { paint: Paint; top: number }) {
  const { colors } = paint;
  const identity = resolveHomeIdentity(paint.manifest);
  const scene = paint.art('home.wallpaper', null, 'shell.wallpaper');
  const [titleHeight, setTitleHeight] = useState(0);
  void titleHeight;
  return (
    <div className="dm-home dm-home--pad dm-pad-home" style={{ background: paint.fill(colors.background), paddingTop: top + 16 }}>
      <Art art={scene} />
      <div className="dm-pad-home__bar">
        {identity.logo ? <Logo paint={paint} size={36} className="dm-pad-home__mark" /> : <span />}
        <div className="dm-pad-home__tools">
          <SquareButton paint={paint} name="chrome.scan" icon={ICON.scanLine} size={48} />
          <SquareButton paint={paint} icon={ICON.squareTerminal} size={48} />
          <SquareButton paint={paint} name="chrome.settings" icon={ICON.slidersHorizontal} size={48} />
        </div>
      </div>
      <div className="dm-pad-home__columns">
        <div className="dm-pad-home__cover">
          <div className="dm-pad-home__art">
            <HomeArtwork paint={paint} className="dm-pad-home__artwork" />
            {identity.name ? <CoverTitle text={identity.name} color={colors.text} onHeight={setTitleHeight} /> : null}
          </div>
          <LaunchTiles paint={paint} />
          <HomeComposer paint={paint} agent="OpenCode" pad />
        </div>
        <div className="dm-pad-home__work">
          <h3 style={{ color: colors.text }}>Connections</h3>
          <ConnectionRows paint={paint} />
          <h3 style={{ color: colors.text }}>Recent</h3>
          <RecentRows paint={paint} />
        </div>
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
      pad ? (
        <HomePadContent paint={paint} top={spec.top} />
      ) : layout === 'stage' ? (
        <HomeStageContent paint={paint} top={spec.top} bottom={spec.bottom} />
      ) : layout === 'editorial' ? (
        <HomeEditorialContent paint={paint} top={spec.top} bottom={spec.bottom} />
      ) : (
        <HomeContent paint={paint} pad={false} top={spec.top} bottom={spec.bottom} />
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
          {pad && screen !== 'home' ? (
            <div className="dm-split" style={{ paddingTop: spec.top + 12, paddingBottom: spec.bottom }}>
              <Rail paint={paint} editorial={layout === 'editorial'} selected={{ server: 'studio', pane: 'claude' }} />
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
