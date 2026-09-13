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
 * The arrangement is the app's, read from its source rather than invented
 * (branch `feat/custom-theme-packs`):
 *
 *   Home          `app/(drawer)/index.tsx`, `components/pad-server-rail.tsx`
 *   Conversation  `components/pane-chat-view.tsx`, `pane-chat-blocks.tsx`
 *   Terminal      `components/server-terminal-workspace.tsx`
 *   chrome        `components/nav-header.tsx`, `glass-chrome.tsx`,
 *                 `terminal-composer.tsx`, `themed-surface.tsx`,
 *                 `themed-button.tsx`, `theme-artwork.tsx`
 *
 * and so are the rules: which token paints which plane, where each decoration
 * slot is drawn and over which base, that `surfaces.backgroundOpacity` fades
 * coloured planes and never text, that artwork is bounded by the contrast of
 * the labels over it (`theme-render.ts`), that `glass` blurs and `solid` does
 * not, that a `template` icon takes the theme's colour. Words on the screens
 * are fictional session content in the machine register, or the theme's own
 * name; none of it is translated, exactly as the aperture's stream is not.
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

import { cssColor, resolveHomeIdentity, type ThemeMode, type ThemePackage } from '@/lib/theme-package';
import {
  primaryButtonArtwork,
  resolveArtwork,
  resolveThemeMaterial,
  surfaceFill,
  surfaceOpacity,
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

interface Props {
  pack: ThemePackage;
  mode: ThemeMode;
  device: DeviceKind;
  screen: ScreenKind;
  /** Accessible name of the whole picture. */
  label: string;
}

/* --------------------------------------------------------------------------
   Context handed down the tree: everything a plane needs to paint itself.
   -------------------------------------------------------------------------- */

interface Paint {
  pack: ThemePackage;
  mode: ThemeMode;
  width: 'compact' | 'regular';
  colors: ThemePackage['manifest']['variants']['light']['colors'];
  terminal: ThemePackage['manifest']['variants']['light']['terminal'];
  alpha: number;
  /** A coloured plane, faded by the variant's surface opacity. */
  fill: (hex: string) => string;
  /** Artwork for a slot over a base colour, bounded the way the app bounds it. */
  art: (slot: string, base: string | null, fallback?: string) => ResolvedArtwork | null;
}

function paintFor(pack: ThemePackage, mode: ThemeMode, device: DeviceKind): Paint {
  const variant = pack.manifest.variants[mode];
  const alpha = surfaceOpacity(variant.surfaces?.backgroundOpacity);
  const width = device === 'tablet' ? 'regular' : 'compact';
  return {
    pack,
    mode,
    width,
    colors: variant.colors,
    terminal: variant.terminal,
    alpha,
    fill: (hex) => surfaceFill(hex, alpha),
    art: (slot, base, fallback) => resolveArtwork(pack, slot, mode, width, base, alpha, fallback),
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
 * `GlassChrome`: the app's one piece of glass. Solid takes the raised plane;
 * glass takes the iOS 26 tint over a blur of what is underneath; artwork on
 * glass gets an opaque raised backing first, as the app gives it.
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
  const { colors } = paint;
  const art = paint.art(`${surface}.background`, colors.surfaceRaised);
  const material = resolveThemeMaterial(paint.pack.manifest, surface, Boolean(art), paint.alpha);
  const dark = paint.mode === 'dark';
  const background =
    material === 'solid'
      ? paint.fill(colors.surfaceRaised)
      : cssColor(dark ? colors.background : colors.surface, dark ? 0.34 : 0.26);
  return (
    <div
      className={`dm-chrome ${material === 'solid' ? '' : 'dm-chrome--glass'} ${className}`}
      style={{ background, color: colors.text, ...style }}
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

/** A chrome glyph: the pack's icon where it declares one, else the app's own. */
function Glyph({ paint, name, color, fallback }: { paint: Paint; name: string; color: string; fallback: ReactNode }) {
  const icon = paint.pack.manifest.icons?.[name];
  const url = icon ? paint.pack.assets[icon.asset] : undefined;
  if (!icon || !url) return <>{fallback}</>;
  if (icon.render === 'original') return <img className="dm-icon" src={url} alt="" />;
  return (
    <span
      className="dm-icon dm-icon--template"
      style={{ WebkitMaskImage: `url("${url}")`, maskImage: `url("${url}")`, backgroundColor: color }}
    />
  );
}

const Svg = ({ d, size = 20, color, strokeWidth = 2 }: { d: string; size?: number; color: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const ICON = {
  chevronLeft: 'M15 18l-6-6 6-6',
  server: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  terminal: 'M4 4h16v16H4zM8 9l3 3-3 3M13 15h4',
  scan: 'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  panels: 'M3 5h18v14H3zM9 5v14M15 5v14',
  plus: 'M12 5v14M5 12h14',
  arrowUp: 'M12 19V5M5 12l7-7 7 7',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
};

/** The app's own mark, where a theme keeps the default logo. */
function DefaultMark({ paint, size }: { paint: Paint; size: number }) {
  return (
    <span className="dm-mark" style={{ width: size, height: size, background: paint.colors.primary, borderRadius: size * 0.28 }}>
      <Svg d={ICON.terminal} size={size * 0.56} color={paint.colors.onPrimary} strokeWidth={2.2} />
    </span>
  );
}

function Logo({ paint, size }: { paint: Paint; size: number }) {
  const identity = resolveHomeIdentity(paint.pack.manifest);
  const url = identity.logoAsset ? paint.pack.assets[identity.logoAsset] : undefined;
  return url ? <img className="dm-logo" src={url} alt="" style={{ width: size, height: size }} /> : <DefaultMark paint={paint} size={size} />;
}

function Dot({ color, size = 8, filled = true }: { color: string; size?: number; filled?: boolean }) {
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

const SERVERS = [
  { name: 'studio', live: true, panes: [['claude', 'ok'], ['codex', 'busy'], ['nvim', 'idle']] },
  { name: 'build-box', live: false, panes: [['tmux · main', 'idle']] },
] as const;

function ServerCard({ paint, server, radius, padding }: { paint: Paint; server: (typeof SERVERS)[number]; radius: number; padding: number }) {
  const { colors } = paint;
  const status = server.live ? colors.success : colors.textSubtle;
  return (
    <Surface paint={paint} slot="cards.decoration" base={colors.surface} className="dm-card" style={{ borderRadius: radius, padding }}>
      <div className="dm-card__identity">
        <span className="dm-card__avatar" style={{ background: paint.fill(colors.surfaceRaised) }}>
          <Svg d={ICON.server} size={19} color={colors.textMuted} />
        </span>
        <div className="dm-card__copy">
          <span className="dm-card__name" style={{ color: colors.text }}>{server.name}</span>
          <span className="dm-card__status" style={{ color: status }}>
            <Dot color={status} size={7} filled={server.live} />
            {server.live ? 'ONLINE' : 'OFFLINE'}
          </span>
        </div>
      </div>
      <ul className="dm-panes">
        {server.panes.map(([pane, state]) => {
          const light = state === 'ok' ? colors.success : state === 'busy' ? colors.warning : colors.textSubtle;
          return (
            <li key={pane} className="dm-pane">
              <Dot color={light} size={7} />
              <span className="dm-pane__name" style={{ color: colors.text }}>{pane}</span>
              <span className="dm-pane__age" style={{ color: colors.textSubtle }}>{state === 'busy' ? 'running' : '2m'}</span>
            </li>
          );
        })}
      </ul>
    </Surface>
  );
}

function HomeContent({ paint, pad }: { paint: Paint; pad: boolean }) {
  const { colors } = paint;
  const identity = resolveHomeIdentity(paint.pack.manifest);
  const scene = paint.art('home.background', null, 'shell.background');
  const banner = paint.art('home.decoration', null);
  const showBrand = identity.name !== null || identity.showLogo;
  return (
    <div className={`dm-home ${pad ? 'dm-home--pad' : ''}`}>
      {/* The wallpaper: `home.background`, or `shell.background` when the
          theme paints the whole shell and Home along with it, as the app's
          Home screen does. */}
      <Art art={scene} />
      {!pad && (
        <div className="dm-home__bar">
          {(['terminal', 'scan', 'gear'] as const).map((icon) => (
            <span key={icon} className="dm-home__control" style={{ background: paint.fill(colors.surface) }}>
              <Art art={paint.art('navigation.background', colors.surface)} />
              <Svg d={ICON[icon]} size={18} color={colors.text} />
            </span>
          ))}
        </div>
      )}
      <div className="dm-home__list" style={pad ? { maxWidth: 680 } : undefined}>
        {!pad && showBrand && (
          <div className="dm-brand">
            {identity.showLogo && (
              <span className="dm-brand__tile" style={{ background: paint.fill(colors.surfaceRaised) }}>
                <Logo paint={paint} size={32} />
              </span>
            )}
            {identity.name && (
              <span className="dm-brand__copy" style={scene ? { background: paint.fill(colors.background) } : undefined}>
                {scene && <Art art={paint.art('navigation.background', colors.background)} />}
                <span className="dm-brand__name" style={{ color: colors.text }}>{identity.name}</span>
              </span>
            )}
          </div>
        )}
        {banner && (
          <div className="dm-banner">
            <Art art={banner} banner />
          </div>
        )}
        {SERVERS.map((server) => (
          <ServerCard key={server.name} paint={paint} server={server} radius={pad ? 24 : 22} padding={pad ? 18 : 16} />
        ))}
      </div>
    </div>
  );
}

/** `PadServerRail`: the persistent master column on a wide window. */
function Rail({ paint, selected }: { paint: Paint; selected?: string }) {
  const { colors } = paint;
  const identity = resolveHomeIdentity(paint.pack.manifest);
  return (
    <aside className="dm-rail" style={{ width: RAIL_WIDTH, background: paint.fill(colors.surface) }}>
      <Art art={paint.art('navigation.background', colors.surface)} />
      {(identity.name !== null || identity.showLogo) && (
        <div className="dm-rail__brand">
          {identity.showLogo && (
            <span className="dm-rail__tile" style={{ background: paint.fill(colors.surfaceRaised) }}>
              <Logo paint={paint} size={34} />
            </span>
          )}
          {identity.name !== null && (
            <span className="dm-rail__copy">
              <span className="dm-rail__name" style={{ color: colors.text }}>{identity.name}</span>
              <span className="dm-rail__tagline" style={{ color: colors.textMuted }}>Your agents, anywhere.</span>
            </span>
          )}
        </div>
      )}
      <span className="dm-rail__label" style={{ color: colors.textMuted }}>Servers</span>
      {SERVERS.map((server) => (
        <div key={server.name} className="dm-rail__server">
          <span className="dm-rail__row" style={{ color: colors.text }}>
            <Dot color={server.live ? colors.success : colors.textSubtle} size={7} filled={server.live} />
            {server.name}
          </span>
          {server.panes.map(([pane]) => {
            const active = selected === pane;
            return (
              <span
                key={pane}
                className="dm-rail__agent"
                style={{ color: active ? colors.primary : colors.textMuted, background: active ? paint.fill(colors.surfaceRaised) : undefined }}
              >
                {pane}
              </span>
            );
          })}
        </div>
      ))}
      <div className="dm-rail__foot" style={{ color: colors.textMuted }}>
        <span><Svg d={ICON.scan} size={16} color={colors.textMuted} /> Pair a server</span>
        <span><Svg d={ICON.gear} size={16} color={colors.textMuted} /> Settings</span>
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
    <div className="dm-nav" style={{ paddingTop: top + 6 }}>
      <Chrome paint={paint} surface="navigation" className="dm-nav__circle">
        <Glyph paint={paint} name="chrome.back" color={colors.text} fallback={<Svg d={ICON.chevronLeft} size={21} color={colors.text} />} />
      </Chrome>
      <Chrome paint={paint} surface="navigation" className="dm-nav__pill">
        <span className="dm-nav__title" style={{ color: colors.text }}>{title}</span>
      </Chrome>
      <Chrome paint={paint} surface="navigation" className="dm-nav__circle">
        <Svg d={ICON.panels} size={19} color={colors.text} />
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

function Composer({ paint, placeholder, armed }: { paint: Paint; placeholder: string; armed: boolean }) {
  const { colors } = paint;
  const quiet = cssColor(colors.text, 0.06);
  const control = cssColor(colors.text, 0.1);
  return (
    <div className="dm-composer" style={{ background: paint.fill(quiet) }}>
      <span className="dm-composer__control" style={{ background: control }}>
        <Svg d={ICON.plus} size={18} color={colors.text} />
      </span>
      <span className="dm-composer__input" style={{ color: armed ? colors.text : colors.textSubtle }}>{placeholder}</span>
      <span className="dm-composer__control" style={{ background: armed ? colors.primary : control }}>
        <Glyph
          paint={paint}
          name="chrome.send"
          color={armed ? colors.onPrimary : colors.textMuted}
          fallback={<Svg d={ICON.arrowUp} size={18} color={armed ? colors.onPrimary : colors.textMuted} strokeWidth={2.4} />}
        />
      </span>
    </div>
  );
}

function Dock({ paint, pad, bottom, children }: { paint: Paint; pad: boolean; bottom: number; children: ReactNode }) {
  return (
    <div className={`dm-dock-anchor ${pad ? 'dm-dock-anchor--pad' : ''}`}>
      <Chrome paint={paint} surface="composer" className={`dm-dock ${pad ? 'dm-dock--pad' : ''}`} style={{ paddingBottom: pad ? 8 : bottom + 8 }}>
        {children}
      </Chrome>
    </div>
  );
}

/** `ThemedButton` primary: the one control that takes `buttons.primary.background`. */
function PrimaryButton({ paint, children }: { paint: Paint; children: ReactNode }) {
  const { colors } = paint;
  const art = primaryButtonArtwork(paint.pack, paint.mode, paint.width, paint.alpha);
  return (
    <span className="dm-button" style={{ background: paint.fill(colors.primary), color: colors.onPrimary }}>
      <Art art={art} />
      <span className="dm-button__label">{children}</span>
    </span>
  );
}

/* --------------------------------------------------------------------------
   Conversation
   -------------------------------------------------------------------------- */

function ConversationContent({ paint, pad, top, bottom }: { paint: Paint; pad: boolean; top: number; bottom: number }) {
  const { colors } = paint;
  return (
    <div className="dm-workspace">
      <Art art={paint.art('shell.background', null)} />
      <NavHeader paint={paint} title="claude · ~/project" top={top} />
      <div className="dm-chat" style={pad ? { maxWidth: 720 } : undefined}>
        <div className="dm-chat__prompt" style={{ background: paint.fill(cssColor(colors.primary, 0.16)), color: colors.text }}>
          Add a dark variant and keep the terminal readable at 80% opacity.
        </div>
        <p className="dm-chat__text" style={{ color: colors.text }}>
          I read <span className="dm-mono">theme.json</span> and the contrast report. Two pairs set the floor: muted text on the raised surface, and the link colour on the terminal.
        </p>
        <ul className="dm-chat__activity">
          <li style={{ color: colors.textMuted }}><Dot color={colors.success} size={7} /> Read theme.json</li>
          <li style={{ color: colors.textMuted }}><Dot color={colors.success} size={7} /> Ran muqun-theme contrast</li>
          <li style={{ color: colors.textMuted }}><Dot color={colors.warning} size={7} /> Editing variants.dark</li>
        </ul>
        <div className="dm-chat__card" style={{ background: paint.fill(colors.surfaceRaised) }}>
          <span className="dm-chat__card-title" style={{ color: colors.text }}>
            <Svg d={ICON.shield} size={16} color={colors.warning} /> Approval needed
          </span>
          <span className="dm-chat__card-body" style={{ color: colors.textMuted }}>Write src/theme.json · 41 lines</span>
          <span className="dm-chat__card-actions">
            <PrimaryButton paint={paint}>Allow</PrimaryButton>
            <span className="dm-flat" style={{ color: colors.danger }}>Deny</span>
            <span className="dm-flat" style={{ color: colors.textSubtle }}>Always for this session</span>
          </span>
        </div>
        <div className="dm-chat__diff" style={{ borderColor: colors.border, background: paint.fill(colors.surface) }}>
          <span className="dm-mono" style={{ color: colors.textSubtle }}>src/theme.json</span>
          <span className="dm-mono" style={{ background: cssColor(paint.terminal.ansi[1]!, 0.14), color: paint.terminal.ansi[1] }}>- "backgroundOpacity": 1</span>
          <span className="dm-mono" style={{ background: cssColor(paint.terminal.ansi[2]!, 0.14), color: paint.terminal.ansi[2] }}>+ "backgroundOpacity": 0.82</span>
        </div>
      </div>
      <div className="dm-workspace__foot">
        <ConnectionPill paint={paint} />
        <Dock paint={paint} pad={pad} bottom={bottom}>
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
  const fill = cssColor(terminal.background, surfaceOpacity(terminal.backgroundOpacity));
  return (
    <div className="dm-workspace">
      <Art art={paint.art('shell.background', null)} />
      <div className="dm-term" style={{ background: fill, color: fg }}>
        <pre className="dm-term__out" style={{ paddingTop: top + 6 + 46 + 16 }}>
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
          <span style={{ background: cssColor(terminal.selection), color: fg }}>selected text</span>{'\n'}
          {'\n'}
          <span style={{ color: a[2] }}>❯</span> <span className="dm-term__cursor" style={{ background: terminal.cursor }} />
        </pre>
      </div>
      <NavHeader paint={paint} title="studio · claude" top={top} />
      <div className="dm-workspace__foot">
        <ConnectionPill paint={paint} />
        <Dock paint={paint} pad={pad} bottom={bottom}>
          <div className="dm-keys">
            {KEYS.map((key) => (
              <span key={key} className="dm-key" style={{ background: cssColor(colors.text, 0.1), color: colors.text }}>{key}</span>
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

export default function DeviceMock({ pack, mode, device, screen, label }: Props) {
  const spec = DEVICES[device];
  const paint = paintFor(pack, mode, device);
  const [ref, scale] = useScale(spec.width + spec.bezel * 2);
  const pad = device === 'tablet';
  const { colors } = paint;

  const content =
    screen === 'home' ? (
      <HomeContent paint={paint} pad={pad} />
    ) : screen === 'conversation' ? (
      <ConversationContent paint={paint} pad={pad} top={pad ? spec.top : spec.top} bottom={spec.bottom} />
    ) : (
      <TerminalContent paint={paint} pad={pad} top={spec.top} bottom={spec.bottom} />
    );

  return (
    <div
      ref={ref}
      className={`dm dm--${device} dm--${mode}`}
      role="img"
      aria-label={label}
      style={{ aspectRatio: `${spec.width + spec.bezel * 2} / ${spec.height + spec.bezel * 2}` }}
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
          {pad ? (
            <div className="dm-split" style={{ paddingTop: spec.top, paddingBottom: spec.bottom }}>
              <Art art={paint.art('shell.background', null)} />
              <Rail paint={paint} selected={screen === 'home' ? undefined : 'claude'} />
              <div className="dm-split__detail">{content}</div>
            </div>
          ) : (
            <div className="dm-compact" style={{ paddingTop: screen === 'home' ? spec.top : 0 }}>
              {content}
            </div>
          )}
          {device === 'phone' && <span className="dm-island" />}
          <span className="dm-home-indicator" style={{ background: cssColor(colors.text, 0.5) }} />
        </div>
      </div>
    </div>
  );
}
