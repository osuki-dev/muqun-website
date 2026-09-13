/**
 * The app's rendering rules for a theme, ported so the mock-ups obey them.
 *
 * Each function here is a port of the app's own (branch
 * `feat/custom-theme-packs`, `src/theme/*` and the components that read it),
 * kept pure and small so the website can draw a theme the way the app would
 * without carrying the app's runtime:
 *
 *   surfaceFill          `surface-background.ts`   background-only alpha
 *   safeArtworkOpacity   `artwork-contrast.ts`     how opaque artwork may be
 *   resolveArtworkOpacity                          ...over shared chrome
 *   jointArtworkOpacity  `opacity-policy.ts`       ...over a translucent plane
 *   resolveThemeMaterial `material.ts`             solid / glass / auto
 *
 * What is deliberately NOT ported is `clampThemeOpacity`, the contrast floor
 * that raises an author's `backgroundOpacity` until every label still reads.
 * That is a search over every text/surface pair and belongs to the app and
 * the CLI (`muqun-theme contrast`); the preview shows what the author wrote.
 */
import { cssColor, resolveThemeImage, type ThemeColors, type ThemeImage, type ThemeManifest, type ThemeMode, type ThemePackage } from './theme-package';

/** Background-only colour arithmetic. Never apply this to text, icons or artwork. */
export function surfaceOpacity(value?: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1 ? value : 1;
}

/** Combine an authored colour alpha with the variant's surface alpha exactly once. */
export function surfaceFill(color: string, opacity: number): string {
  return cssColor(color, surfaceOpacity(opacity));
}

function channels(hex: string): number[] | null {
  return /^#[\da-f]{6}$/i.test(hex)
    ? [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16) / 255)
    : null;
}

function luminance(rgb: number[]): number {
  const linear = rgb.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
}

type Ink = { color: string; minimum: number };

/**
 * The highest opacity at which arbitrary artwork over `base` still leaves
 * every `ink` legible at its minimum ratio. Binary search, as in the app.
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

const CHROME_INKS = (colors: ThemeColors): Ink[] => [
  ...(['text', 'textMuted', 'textSubtle'] as const).map((key) => ({ color: colors[key], minimum: 4.5 })),
  ...(['primary', 'danger', 'info', 'success', 'warning'] as const).map((key) => ({
    color: colors[key],
    minimum: 3,
  })),
];

/** Preserve every normal label and semantic icon drawn by shared chrome over `base`. */
export function resolveArtworkOpacity(colors: ThemeColors, base = colors.surfaceRaised, requested = 1): number {
  return safeArtworkOpacity(base, CHROME_INKS(colors), requested);
}

/** Artwork above translucent paint consumes the same contrast budget. */
export function jointArtworkOpacity(opaqueMaximum: number, baseAlpha: number, requested = 1): number {
  if (![opaqueMaximum, baseAlpha, requested].every(Number.isFinite) || baseAlpha <= 0) return 0;
  const maximum = Math.max(0, Math.min(1, opaqueMaximum));
  const base = Math.min(1, baseAlpha);
  return Math.min(Math.max(0, Math.min(1, requested)), Math.max(0, 1 - (1 - maximum) / base));
}

export type ThemeMaterial = 'auto' | 'solid' | 'glass';
export type ThemeSurfaceRole = 'navigation' | 'composer' | 'actions';

/**
 * Which material a piece of chrome takes. `auto` is the platform's own glass
 * unless the slot carries artwork, in which case it goes solid so the picture
 * is not blurred away. A translucent surface preference forces solid too:
 * native glass has its own fill and would hide the authored alpha.
 */
export function resolveThemeMaterial(
  manifest: ThemeManifest,
  surface: ThemeSurfaceRole,
  hasImage: boolean,
  surfaceAlpha: number,
): ThemeMaterial {
  if (surfaceAlpha < 1) return 'solid';
  const requested = manifest.materials?.[surface] ?? manifest.materials?.default ?? 'auto';
  if (requested === 'solid') return 'solid';
  if (requested === 'glass') return 'glass';
  return hasImage ? 'solid' : 'auto';
}

/** One resolved slot: the image, its URL, and how opaque the app would let it be. */
export interface ResolvedArtwork {
  image: ThemeImage;
  url: string;
  opacity: number;
}

/**
 * The artwork a slot shows over `base` in this mode, already bounded the way
 * `ThemedSurfaceArtwork` / `GlassChrome` bound it: never past the point where
 * the chrome's own labels stop reading, and less again over a faded plane.
 * `null` when the slot is empty, its asset is missing, or nothing may show.
 */
export function resolveArtwork(
  pack: ThemePackage,
  slot: string,
  mode: ThemeMode,
  width: 'compact' | 'regular',
  base: string | null,
  surfaceAlpha: number,
  fallbackSlot?: string,
): ResolvedArtwork | null {
  let image = resolveThemeImage(pack.manifest, slot, mode, width);
  if (!image && fallbackSlot) image = resolveThemeImage(pack.manifest, fallbackSlot, mode, width);
  if (!image) return null;
  const url = pack.assets[image.asset];
  if (!url) return null;
  // Wallpaper (`base === null`) sits under everything and is not bounded:
  // every surface above it paints its own plane.
  const opacity =
    base === null
      ? (image.opacity ?? 1)
      : jointArtworkOpacity(
          resolveArtworkOpacity(pack.manifest.variants[mode].colors, base),
          surfaceAlpha,
          image.opacity ?? 1,
        );
  if (opacity <= 0) return null;
  return { image, url, opacity };
}

/** The label-safe opacity for artwork behind a primary button, as `ThemedButton` computes it. */
export function primaryButtonArtwork(
  pack: ThemePackage,
  mode: ThemeMode,
  width: 'compact' | 'regular',
  surfaceAlpha: number,
): ResolvedArtwork | null {
  const image = resolveThemeImage(pack.manifest, 'buttons.primary.background', mode, width);
  if (!image) return null;
  const url = pack.assets[image.asset];
  if (!url) return null;
  const { colors } = pack.manifest.variants[mode];
  const opacity = jointArtworkOpacity(
    safeArtworkOpacity(colors.primary, [{ color: colors.onPrimary, minimum: 4.5 }]),
    surfaceAlpha,
    image.opacity ?? 1,
  );
  return opacity > 0 ? { image, url, opacity } : null;
}
