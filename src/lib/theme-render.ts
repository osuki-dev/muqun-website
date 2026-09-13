/**
 * The app's rendering rules for a theme, ported so the mock-ups obey them.
 *
 * Each function here is a port of the app's own (`src/theme/*`, `src/lib/color.ts`
 * and the components that read them), kept pure and small so the website can
 * draw a theme the way the app would without carrying the app's runtime:
 *
 *   surfaceFill              `surface-background.ts`  background-only alpha
 *   withAlpha                `lib/color.ts`           a token at a fraction of itself
 *   contrastRatio            `contrast.ts`
 *   themeOpacityPolicy       `opacity-policy.ts`      the readability floor
 *   clampThemeOpacity                                 ...applied to a manifest
 *   jointArtworkOpacity                               art over a translucent plane
 *   safeArtworkOpacity       `artwork-contrast.ts`    how opaque artwork may be
 *   resolveArtworkOpacity                             ...over shared chrome
 *   surfaceArtworkOpacity    `themed-surface.tsx`     ...over a named base
 *   resolveThemeMaterial     `material.ts`            solid / glass / auto
 *   effectiveThemeManifest   `repository.ts`          what the app installs
 *
 * The clamp matters more than it looks: the app never draws a pack at the
 * author's `backgroundOpacity` when that would leave a label unreadable, it
 * raises the value to the floor first (`effectiveThemeManifest`, and the app's
 * own `CustomThemePreview` does the same before drawing). So the mock-ups draw
 * the clamped manifest too, which is what the pack looks like on a phone.
 */
import {
  resolveThemeImage,
  type ThemeColors,
  type ThemeImage,
  type ThemeManifest,
  type ThemeMode,
  type ThemePackage,
  type ThemeVariant,
} from './theme-package';

/* --------------------------------------------------------------------------
   surface-background.ts
   -------------------------------------------------------------------------- */

/** Background-only colour arithmetic. Never apply this to text, icons or artwork. */
export function surfaceOpacity(value?: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1 ? value : 1;
}

/**
 * Combine an authored colour alpha with the variant's surface alpha exactly
 * once. Takes `#RRGGBB`, `#RRGGBBAA` and `rgb()`/`rgba()` -- the composer's
 * faint fills are `withAlpha()` strings, and they fade like every other plane.
 */
export function surfaceFill(color: string, opacity: number): string {
  const alpha = surfaceOpacity(opacity);
  if (alpha === 1 || color === 'transparent') return color;
  const hex = /^#([\da-f]{6})([\da-f]{2})?$/i.exec(color);
  if (hex) {
    const rgb = [0, 2, 4].map((offset) => Number.parseInt(hex[1]!.slice(offset, offset + 2), 16));
    const authored = hex[2] ? Number.parseInt(hex[2], 16) / 255 : 1;
    return `rgba(${rgb.join(', ')}, ${authored * alpha})`;
  }
  const rgb = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i.exec(color);
  if (!rgb) return color;
  const channelValues = rgb.slice(1, 4).map(Number);
  const authored = rgb[4] === undefined ? 1 : Number(rgb[4]);
  if (channelValues.some((value) => !Number.isFinite(value) || value < 0 || value > 255) || authored < 0 || authored > 1)
    return color;
  return `rgba(${channelValues.join(', ')}, ${authored * alpha})`;
}

/* --------------------------------------------------------------------------
   lib/color.ts
   -------------------------------------------------------------------------- */

/** The colour at `alpha`, given a `#rrggbb` token; anything else is returned untouched. */
export function withAlpha(color: string, alpha: number): string {
  const hex = color.match(/^#([0-9a-f]{6})$/i)?.[1];
  if (!hex) return color;
  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/* --------------------------------------------------------------------------
   contrast.ts
   -------------------------------------------------------------------------- */

function rgb(hex: string): number[] {
  return [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
}

function luminance(channels: number[]): number {
  const linear = channels.map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
}

/** Input is an opaque colour already checked by the manifest reader. */
export function contrastRatio(foreground: string, background: string): number {
  const a = luminance(rgb(foreground));
  const b = luminance(rgb(background));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/* --------------------------------------------------------------------------
   opacity-policy.ts
   -------------------------------------------------------------------------- */

export type OpacityIssue = { path: string; ratio: number; required: number };
type Pair = { path: string; ink: string; base: string; required: number; overlay?: string };

/** Bound every alpha from floor through 1, not just one sample. Optional
 * semantic tints are painted over a normal surface; both paints use the global
 * alpha. Their channel polynomials can have interior extrema, included here.
 * Independent channel bounds are conservative when extrema differ by channel. */
function minimumContrast(pair: Pair, floor: number): number {
  const base = rgb(pair.base);
  const overlay = pair.overlay ? rgb(pair.overlay) : base;
  const tint = pair.overlay ? (pair.overlay.length === 9 ? Number.parseInt(pair.overlay.slice(7), 16) / 255 : 1) : 0;
  const low: number[] = [];
  const high: number[] = [];
  for (let channel = 0; channel < 3; channel++) {
    const bounds: number[] = [];
    for (const under of [0, 1]) {
      const b = base[channel]! - under + tint * (overlay[channel]! - under);
      const c = -tint * (base[channel]! - under);
      const samples = [floor, 1];
      if (c !== 0) {
        const turning = -b / (2 * c);
        if (turning > floor && turning < 1) samples.push(turning);
      }
      bounds.push(...samples.map((alpha) => under + b * alpha + c * alpha * alpha));
    }
    low.push(Math.max(0, Math.min(...bounds)));
    high.push(Math.min(1, Math.max(...bounds)));
  }
  const ink = luminance(rgb(pair.ink));
  const closest = Math.max(luminance(low), Math.min(luminance(high), ink));
  return (Math.max(ink, closest) + 0.05) / (Math.min(ink, closest) + 0.05);
}

function policy(pairs: Pair[]) {
  const baselineIssues: OpacityIssue[] = pairs.flatMap((pair) => {
    const ratio = minimumContrast(pair, 1);
    return !Number.isFinite(ratio) || ratio < pair.required ? [{ path: pair.path, ratio, required: pair.required }] : [];
  });
  const explain = () =>
    pairs
      .map((pair) => ({ path: pair.path, required: pair.required, floor: pairFloor(pair) }))
      .sort((a, b) => b.floor - a.floor);
  // A theme with baseline failures needs this most of all, so it comes back on
  // both paths rather than only on the one that got as far as a search.
  if (baselineIssues.length) return { minimum: 1, baselineIssues, explain };
  const safe = (alpha: number) => pairs.every((pair) => minimumContrast(pair, alpha) >= pair.required);
  let low = 0;
  let high = 1;
  for (let i = 0; i < 48; i++) {
    const middle = (low + high) / 2;
    if (safe(middle)) high = middle;
    else low = middle;
  }
  return {
    minimum: Math.min(1, Math.ceil(high * 100) / 100),
    baselineIssues,
    /** The floor each pair would impose on its own, worst first. */
    explain,
  };
}

/** The lowest alpha at which one pair still meets its ratio. */
function pairFloor(pair: Pair): number {
  if (minimumContrast(pair, 1) < pair.required) return 1;
  let low = 0;
  let high = 1;
  for (let i = 0; i < 48; i++) {
    const middle = (low + high) / 2;
    if (minimumContrast(pair, middle) >= pair.required) high = middle;
    else low = middle;
  }
  return Math.min(1, Math.ceil(high * 100) / 100);
}

/** Declared label/chrome pairings only; disabled text, arbitrary terminal ANSI
 * combinations and content-supplied colors are not a universal contrast claim. */
function calculateThemeOpacityPolicy(variant: ThemeVariant) {
  const { colors, terminal } = variant;
  const surfaces = ['background', 'surface', 'surfaceRaised'] as const;
  const surfacePairs: Pair[] = [];
  for (const base of surfaces) {
    for (const ink of ['text', 'textMuted', 'textSubtle'] as const)
      surfacePairs.push({ path: `colors.${ink}/${base}`, ink: colors[ink], base: colors[base], required: 4.5 });
    for (const ink of ['primary', 'danger', 'info', 'success', 'warning'] as const)
      surfacePairs.push({ path: `colors.${ink}/${base}`, ink: colors[ink], base: colors[base], required: 3 });
    // Selected command labels and error chips use these authored tints over
    // their enclosing normal surface, not over an invented opaque tint.
    for (const [ink, overlay] of [
      ['primary', 'primarySubtle'],
      ['danger', 'dangerSubtle'],
    ] as const)
      surfacePairs.push({
        path: `colors.${ink}/${overlay}/${base}`,
        ink: colors[ink],
        base: colors[base],
        overlay: colors[overlay],
        required: 4.5,
      });
  }
  surfacePairs.push({ path: 'colors.onPrimary/primary', ink: colors.onPrimary, base: colors.primary, required: 4.5 });
  const terminalPairs: Pair[] = (['foreground', 'link', 'cursor'] as const).map((key) => ({
    path: `terminal.${key}/background`,
    ink: terminal[key],
    base: terminal.background,
    required: key === 'cursor' ? 3 : 4.5,
  }));
  const ansiIssues: OpacityIssue[] = [];
  terminal.ansi.forEach((ink, index) => {
    const ratio = contrastRatio(ink, terminal.background);
    const path = `terminal.ansi.${index}/background`;
    if (ratio < 4.5) ansiIssues.push({ path, ratio, required: 4.5 });
    else terminalPairs.push({ path, ink, base: terminal.background, required: 4.5 });
  });
  return { surface: policy(surfacePairs), terminal: policy(terminalPairs), ansiIssues };
}

const policyCache = new Map<string, ReturnType<typeof calculateThemeOpacityPolicy>>();

/** Slider changes do not change color mathematics. Bound the shared cache so
 * repeated preview/compile renders reuse the proof without retaining packs. */
export function themeOpacityPolicy(variant: ThemeVariant) {
  const { terminal } = variant;
  const key = JSON.stringify([
    variant.colors,
    terminal.background,
    terminal.foreground,
    terminal.cursor,
    terminal.link,
    terminal.ansi,
  ]);
  const cached = policyCache.get(key);
  if (cached) return cached;
  const result = calculateThemeOpacityPolicy(variant);
  if (policyCache.size >= 32) policyCache.delete(policyCache.keys().next().value!);
  policyCache.set(key, result);
  return result;
}

function cloneThemeData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** Shared slider controls both modes, so both use the same conservative floor.
 * Preserve omitted defaults and never change the author's original manifest. */
export function clampThemeOpacity(input: ThemeManifest): ThemeManifest {
  const manifest = cloneThemeData(input);
  const policies = [themeOpacityPolicy(manifest.variants.light), themeOpacityPolicy(manifest.variants.dark)];
  const surface = Math.max(...policies.map((value) => value.surface.minimum));
  const terminal = Math.max(...policies.map((value) => value.terminal.minimum));
  for (const variant of Object.values(manifest.variants)) {
    if (variant.surfaces?.backgroundOpacity !== undefined)
      variant.surfaces.backgroundOpacity = Math.max(surface, variant.surfaces.backgroundOpacity);
    if (variant.terminal.backgroundOpacity !== undefined)
      variant.terminal.backgroundOpacity = Math.max(terminal, variant.terminal.backgroundOpacity);
  }
  return manifest;
}

/** Artwork above translucent paint consumes the same contrast budget. Compute
 * opaqueMaximum with requested=1; never reuse an already-clamped art request. */
export function jointArtworkOpacity(opaqueMaximum: number, baseAlpha: number, requested = 1): number {
  if (![opaqueMaximum, baseAlpha, requested].every(Number.isFinite) || baseAlpha <= 0) return 0;
  const maximum = Math.max(0, Math.min(1, opaqueMaximum));
  const base = Math.min(1, baseAlpha);
  return Math.min(Math.max(0, Math.min(1, requested)), Math.max(0, 1 - (1 - maximum) / base));
}

/* --------------------------------------------------------------------------
   repository.ts
   -------------------------------------------------------------------------- */

const effective = new WeakMap<ThemeManifest, ThemeManifest>();

/**
 * The manifest the app draws: the author's opacities raised to the contrast
 * floor (`effectiveThemeManifest` in the app's `repository.ts`, without the
 * owner's slider on top, which a gallery has no reader for). Memoised per
 * parsed manifest: the floor is a search over every text/surface pair.
 */
export function effectiveThemeManifest(manifest: ThemeManifest): ThemeManifest {
  let clamped = effective.get(manifest);
  if (!clamped) {
    clamped = clampThemeOpacity(manifest);
    effective.set(manifest, clamped);
  }
  return clamped;
}

/* --------------------------------------------------------------------------
   artwork-contrast.ts
   -------------------------------------------------------------------------- */

function channels(hex: string): number[] | null {
  return /^#[\da-f]{6}$/i.test(hex) ? [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16) / 255) : null;
}

type Ink = { color: string; minimum: number };

/**
 * Bound arbitrary sRGB artwork over an opaque base. The possible background
 * luminances form a continuous interval between black and white composites.
 * The worst contrast is at the closest point to the ink, including an interior
 * point (ratio 1), not necessarily at either endpoint. Intervals are nested as
 * opacity increases, making binary search safe. This is not a glass/blur bound.
 */
export function safeArtworkOpacity(base: string, inks: readonly Ink[], requested = 1): number {
  if (!Number.isFinite(requested) || requested <= 0 || inks.length === 0) return 0;
  const background = channels(base);
  const foregrounds = inks.map(({ color, minimum }) => ({ rgb: channels(color), minimum }));
  if (!background || foregrounds.some(({ rgb, minimum }) => !rgb || !Number.isFinite(minimum) || minimum < 1))
    return 0;
  const values = foregrounds.map(({ rgb, minimum }) => ({ value: luminance(rgb!), minimum }));
  const safe = (opacity: number) => {
    const low = luminance(background.map((c) => c * (1 - opacity)));
    const high = luminance(background.map((c) => c * (1 - opacity) + opacity));
    return values.every(({ value, minimum }) => {
      const closest = Math.max(low, Math.min(high, value));
      return (Math.max(value, closest) + 0.05) / (Math.min(value, closest) + 0.05) >= minimum;
    });
  };
  if (!safe(0)) return 0;
  let low = 0;
  let high = Math.min(1, requested);
  if (safe(high)) return high;
  for (let iteration = 0; iteration < 48; iteration++) {
    const middle = (low + high) / 2;
    if (safe(middle)) low = middle;
    else high = middle;
  }
  return low;
}

/** Every normal label and semantic icon shared chrome draws. */
const CHROME_INKS = (colors: ThemeColors): Ink[] => [
  ...(['text', 'textMuted', 'textSubtle'] as const).map((key) => ({ color: colors[key], minimum: 4.5 })),
  ...(['primary', 'danger', 'info', 'success', 'warning'] as const).map((key) => ({ color: colors[key], minimum: 3 })),
];

/** Preserve every normal label and semantic icon drawn by shared chrome (over `surfaceRaised`). */
export function resolveArtworkOpacity(colors: ThemeColors, requested = 1): number {
  return safeArtworkOpacity(colors.surfaceRaised, CHROME_INKS(colors), requested);
}

/**
 * The same bound over a named base: what `ThemedSurfaceArtwork`
 * (`themed-surface.tsx`) computes for a card, a header button or the armed
 * send button, whose plane is not the raised one.
 */
export function surfaceArtworkOpacity(colors: ThemeColors, baseColor: string, requested = 1): number {
  return safeArtworkOpacity(baseColor, CHROME_INKS(colors), requested);
}

/* --------------------------------------------------------------------------
   material.ts
   -------------------------------------------------------------------------- */

export type ThemeMaterial = 'auto' | 'solid' | 'glass';
export type ThemeSurfaceRole = 'navigation' | 'composer' | 'actions';

/** Resolve only the current surface, never disable every material for unrelated artwork. */
export function resolveThemeMaterial(
  manifest: ThemeManifest | undefined,
  surface: ThemeSurfaceRole,
  hasImage: boolean,
  glassAvailable: boolean,
): ThemeMaterial {
  const requested = manifest?.materials?.[surface] ?? manifest?.materials?.default ?? 'auto';
  if (requested === 'solid') return 'solid';
  if (requested === 'glass') return glassAvailable ? 'glass' : 'solid';
  return hasImage ? 'solid' : 'auto';
}

/* --------------------------------------------------------------------------
   The slots, resolved for a mock-up
   -------------------------------------------------------------------------- */

/** One resolved slot: the image, its URL, and how opaque the app would let it be. */
export interface ResolvedArtwork {
  image: ThemeImage;
  url: string;
  opacity: number;
}

/**
 * The image a slot names in this mode and width, with its URL -- or `null`
 * when the slot is empty or its asset is not in the package. This is the
 * app's `hasImage` question, asked before any contrast bound: a slot whose
 * picture is bounded down to nothing still counts as decorated when the
 * chrome chooses its material.
 */
export function themeArtwork(
  pack: ThemePackage,
  manifest: ThemeManifest,
  slot: string,
  mode: ThemeMode,
  width: 'compact' | 'regular',
  fallbackSlot?: string,
): { image: ThemeImage; url: string } | null {
  const image = resolveThemeImage(manifest, slot, mode, width, true, fallbackSlot);
  if (!image) return null;
  const url = pack.assets[image.asset];
  return url ? { image, url } : null;
}

/**
 * The artwork a slot shows over `base` in this mode, already bounded the way
 * `ThemedSurfaceArtwork` / `GlassChrome` bound it: never past the point where
 * the chrome's own labels stop reading, and less again over a faded plane.
 * `null` when the slot is empty, its asset is missing, or nothing may show.
 */
export function resolveArtwork(
  pack: ThemePackage,
  manifest: ThemeManifest,
  slot: string,
  mode: ThemeMode,
  width: 'compact' | 'regular',
  base: string | null,
  surfaceAlpha: number,
  fallbackSlot?: string,
): ResolvedArtwork | null {
  const found = themeArtwork(pack, manifest, slot, mode, width, fallbackSlot);
  if (!found) return null;
  const { image, url } = found;
  // Wallpaper and the banner (`base === null`) are `ThemeArtwork` with no
  // limit: they sit under everything, and every surface above paints its own plane.
  const opacity =
    base === null
      ? (image.opacity ?? 1)
      : jointArtworkOpacity(surfaceArtworkOpacity(manifest.variants[mode].colors, base), surfaceAlpha, image.opacity ?? 1);
  if (opacity <= 0) return null;
  return { image, url, opacity };
}
