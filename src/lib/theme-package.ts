/**
 * Reading a `.muqun-theme` in the browser.
 *
 * A package is a ZIP with a closed shape -- `theme.json` at the root and an
 * optional `assets/` folder of PNG, JPEG or WebP, nothing else -- and this
 * reads exactly that shape and refuses everything else, the same way the
 * app's own importer (`muqun-theme-cli/src/package.ts`) does. The checks are
 * a port of that file: the central directory is walked before a byte is
 * decoded, every path is matched against the allow-list, every size against
 * the format's limits, and every entry against its CRC. What is left out is
 * the app's incremental inflater -- the browser has `DecompressionStream`,
 * and the declared-size check after it catches the same lie.
 *
 * Packs written by the CLI are stored, not deflated (`level: 0`, because the
 * images are already compressed), so for every pack in the gallery today the
 * inflate path is never taken. It is there because the format allows it.
 *
 * The manifest is checked structurally rather than with zod: this page reads
 * colours and draws them, it does not install anything, and shipping a schema
 * library to draw swatches is the wrong trade. The rule from the format
 * still holds -- `colors` and `terminal` are complete or the theme is refused;
 * every other section is optional and read defensively. A theme with no
 * `decoration`, no `icons` and no `materials` is a valid theme.
 */

export const THEME_LIMITS = Object.freeze({
  manifestBytes: 256 * 1024,
  assets: 32,
  assetBytes: 8 * 1024 * 1024,
  packageBytes: 25 * 1024 * 1024,
  extractedBytes: 50 * 1024 * 1024,
});

/** The 17 UI tokens every variant declares. In the order the format lists them. */
export const THEME_COLOR_KEYS = [
  'background',
  'surface',
  'surfaceRaised',
  'border',
  'borderStrong',
  'text',
  'textMuted',
  'textSubtle',
  'textDisabled',
  'primary',
  'onPrimary',
  'primarySubtle',
  'danger',
  'dangerSubtle',
  'success',
  'warning',
  'info',
] as const;
export type ThemeColorKey = (typeof THEME_COLOR_KEYS)[number];
export type ThemeColors = Record<ThemeColorKey, string>;

export interface ThemeTerminal {
  background: string;
  backgroundOpacity?: number;
  foreground: string;
  cursor: string;
  link: string;
  selection: string;
  /** ANSI 0-7 then bright 8-15. */
  ansi: string[];
}

export const THEME_AMBIENT_EFFECTS = ['none', 'rain', 'particles', 'scanlines', 'bloom', 'dust', 'embers', 'snow', 'stars'] as const;
export type ThemeAmbientEffect = (typeof THEME_AMBIENT_EFFECTS)[number];
export const EFFECT_PALETTE_ROLES = ['primary', 'text', 'textMuted', 'info', 'success', 'warning'] as const;
export const EFFECT_DIRECTIONS = ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right'] as const;

export interface ThemeEffects {
  ambient?: ThemeAmbientEffect;
  intensity?: number;
  speed?: number;
  density?: number;
  size?: number;
  palette?: (typeof EFFECT_PALETTE_ROLES)[number][];
  direction?: (typeof EFFECT_DIRECTIONS)[number];
}

export interface ThemeVariant {
  colors: ThemeColors;
  surfaces?: { backgroundOpacity?: number };
  effects?: ThemeEffects;
  terminal: ThemeTerminal;
}

export interface ThemeImage {
  asset: string;
  fit?: 'cover' | 'contain' | 'tile';
  opacity?: number;
  focalPoint?: { x: number; y: number };
}

export interface ThemeSlotImage extends ThemeImage {
  compact?: ThemeImage | null;
  regular?: ThemeImage | null;
}

export type ThemeDecoration = Record<string, ThemeSlotImage | null | undefined>;

export interface ThemeIcon {
  asset: string;
  render?: 'template' | 'original';
}

export type ThemeMode = 'light' | 'dark';

export type HomeArtworkPreference = 'theme' | 'shown' | 'hidden';

export type HomeArtwork = {
  slot: ThemeSlot;
  image: ThemeImage;
};

/**
 * The slots the app draws, in the order they appear on a screen from the back
 * forward. Same list as the app's `THEME_SLOTS`; a pack may name others, and
 * those are shown in the slot list but drawn nowhere.
 */
export const THEME_SLOTS = [
  'shell.wallpaper',
  'home.wallpaper',
  'home.artwork',
  'launch.artwork',
  'navigation.background',
  'composer.background',
  'actions.background',
  'cards.decoration',
  'buttons.primary.background',
  'tabs.background',
  'empty.artwork',
] as const;
export type ThemeSlot = (typeof THEME_SLOTS)[number];

export interface ThemeManifest {
  format: 'muqun-theme';
  schemaVersion: number;
  id: string;
  name: string;
  version: string;
  author?: string;
  license?: string;
  source?: string;
  minAppVersion?: string;
  description?: string;
  tags?: string[];
  preview?: string;
  homePresentation?: {
    header: 'standard' | 'cover';
    toolbarBackground?: boolean;
  };
  effects?: ThemeEffects;
  variants: { light: ThemeVariant; dark: ThemeVariant };
  materials?: Record<string, string | undefined>;
  assets?: Record<string, { path?: string; url?: string; sha256?: string }>;
  decoration?: ThemeDecoration;
  icons?: Record<string, ThemeIcon | null | undefined>;
  variantDecorations?: { light?: ThemeDecoration; dark?: ThemeDecoration };
  homeIdentity?: {
    name?: { mode: 'default' | 'hidden' } | { mode: 'custom'; text: string };
    logo?: { mode: 'default' | 'hidden' } | { mode: 'custom'; asset: string };
    artwork?: { mode: 'default' | 'hidden' };
  };
}

export interface ThemePackage {
  manifest: ThemeManifest;
  /** Asset id -> an object URL for the image, ready for `url()`. */
  assets: Record<string, string>;
}

export class ThemePackageError extends Error {
  constructor(message: string) {
    super(`Invalid theme package: ${message}`);
    this.name = 'ThemePackageError';
  }
}

function invalid(message: string): never {
  throw new ThemePackageError(message);
}

/* --------------------------------------------------------------------------
   ZIP
   -------------------------------------------------------------------------- */

const ASSET_PATH = /^assets\/[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp)$/;

type Entry = {
  name: string;
  size: number;
  compressed: number;
  method: number;
  crc: number;
  offset: number;
};

const crcTable = Uint32Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  return crc >>> 0;
});

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 255]! ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function utf8(bytes: Uint8Array): string {
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

/** Walk the central directory. Nothing is decoded until every entry has passed. */
function readDirectory(bytes: Uint8Array): { entries: Entry[]; directory: number } {
  if (bytes.length > THEME_LIMITS.packageBytes) invalid('package exceeds 25 MiB');
  if (bytes.length < 22) invalid('truncated ZIP');
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const u16 = (offset: number) => view.getUint16(offset, true);
  const u32 = (offset: number) => view.getUint32(offset, true);

  const floor = Math.max(0, bytes.length - 65557);
  let end = bytes.length - 22;
  while (end >= floor && u32(end) !== 0x06054b50) end--;
  if (end < floor || end + 22 + u16(end + 20) !== bytes.length) invalid('missing ZIP directory');

  const count = u16(end + 10);
  const directory = u32(end + 16);
  if (
    u16(end + 4) ||
    u16(end + 6) ||
    u16(end + 8) !== count ||
    count > THEME_LIMITS.assets + 2 ||
    directory + u32(end + 12) !== end
  )
    invalid('unsupported ZIP directory');

  const entries: Entry[] = [];
  const names = new Set<string>();
  let offset = directory;
  let expanded = 0;
  for (let index = 0; index < count; index++) {
    if (offset + 46 > end || u32(offset) !== 0x02014b50) invalid('truncated ZIP entry');
    const nameLength = u16(offset + 28);
    const next = offset + 46 + nameLength + u16(offset + 30) + u16(offset + 32);
    if (next > end) invalid('invalid ZIP entry length');
    const name = utf8(bytes.subarray(offset + 46, offset + 46 + nameLength));
    if (name !== 'theme.json' && name !== 'assets/' && !ASSET_PATH.test(name))
      invalid('unsupported or unsafe path');
    if (names.has(name.toLowerCase())) invalid('duplicate path');
    names.add(name.toLowerCase());
    const flags = u16(offset + 8);
    const method = u16(offset + 10);
    if (flags & ~0x808 || (method !== 0 && method !== 8))
      invalid('encrypted or unsupported entry');
    const size = u32(offset + 24);
    const limit =
      name === 'theme.json'
        ? THEME_LIMITS.manifestBytes
        : name === 'assets/'
          ? 0
          : THEME_LIMITS.assetBytes;
    expanded += size;
    if (size > limit || expanded > THEME_LIMITS.extractedBytes) invalid('expanded size limit');
    entries.push({
      name,
      size,
      compressed: u32(offset + 20),
      crc: u32(offset + 16),
      offset: u32(offset + 42),
      method,
    });
    offset = next;
  }
  if (offset !== end || !names.has('theme.json'))
    invalid('missing theme.json or extra directory bytes');
  return { entries, directory };
}

async function inflateRaw(data: Uint8Array, declared: number): Promise<Uint8Array> {
  const stream = new Blob([data as BlobPart])
    .stream()
    .pipeThrough(new DecompressionStream('deflate-raw'));
  const reader = stream.getReader();
  const output = new Uint8Array(declared);
  let written = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (written + value.length > declared) {
      await reader.cancel();
      invalid('actual expansion exceeds declared size');
    }
    output.set(value, written);
    written += value.length;
  }
  if (written !== declared) invalid('size mismatch');
  return output;
}

async function readFiles(bytes: Uint8Array): Promise<Map<string, Uint8Array>> {
  const { entries, directory } = readDirectory(bytes);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const files = new Map<string, Uint8Array>();
  for (const entry of entries) {
    const { offset } = entry;
    if (offset + 30 > directory || view.getUint32(offset, true) !== 0x04034b50)
      invalid('missing local entry');
    const nameLength = view.getUint16(offset + 26, true);
    const start = offset + 30 + nameLength + view.getUint16(offset + 28, true);
    const end = start + entry.compressed;
    if (end > directory || start > end) invalid('truncated entry data');
    if (utf8(bytes.subarray(offset + 30, offset + 30 + nameLength)) !== entry.name)
      invalid('local entry disagrees with directory');
    const data = bytes.subarray(start, end);
    const output = entry.method === 0 ? data : await inflateRaw(data, entry.size);
    if (output.length !== entry.size || crc32(output) !== entry.crc)
      invalid('size or checksum mismatch');
    files.set(entry.name, output);
  }
  return files;
}

/* --------------------------------------------------------------------------
   Manifest
   -------------------------------------------------------------------------- */

const OPAQUE = /^#[0-9a-fA-F]{6}$/;
const ALPHA = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function readColors(value: unknown, path: string): ThemeColors {
  if (!isRecord(value)) invalid(`${path} is missing`);
  const colors = {} as ThemeColors;
  for (const key of THEME_COLOR_KEYS) {
    const color = value[key];
    const pattern = key === 'primarySubtle' || key === 'dangerSubtle' ? ALPHA : OPAQUE;
    if (!isString(color) || !pattern.test(color)) invalid(`${path}.${key} is not a hex colour`);
    colors[key] = color;
  }
  return colors;
}

function readOpacity(value: unknown): number | undefined {
  return typeof value === 'number' && value >= 0 && value <= 1 ? value : undefined;
}

function readTerminal(value: unknown, path: string): ThemeTerminal {
  if (!isRecord(value)) invalid(`${path} is missing`);
  for (const key of ['background', 'foreground', 'cursor', 'link'] as const) {
    if (!isString(value[key]) || !OPAQUE.test(value[key])) invalid(`${path}.${key} is not a hex colour`);
  }
  if (!isString(value.selection) || !ALPHA.test(value.selection))
    invalid(`${path}.selection is not a hex colour`);
  const ansi = value.ansi;
  if (!Array.isArray(ansi) || ansi.length !== 16 || !ansi.every((c) => isString(c) && OPAQUE.test(c)))
    invalid(`${path}.ansi is not 16 opaque colours`);
  return {
    background: value.background as string,
    backgroundOpacity: readOpacity(value.backgroundOpacity),
    foreground: value.foreground as string,
    cursor: value.cursor as string,
    link: value.link as string,
    selection: value.selection,
    ansi: ansi as string[],
  };
}

function readEffects(value: unknown): ThemeEffects | undefined {
  if (!isRecord(value)) return undefined;
  const ambient =
    typeof value.ambient === 'string' && (THEME_AMBIENT_EFFECTS as readonly string[]).includes(value.ambient)
      ? (value.ambient as ThemeAmbientEffect)
      : undefined;
  const intensity =
    typeof value.intensity === 'number' && Number.isFinite(value.intensity)
      ? Math.max(0, Math.min(1, value.intensity))
      : undefined;
  const speed =
    typeof value.speed === 'number' && Number.isFinite(value.speed) ? Math.max(0, Math.min(2, value.speed)) : undefined;
  const density =
    typeof value.density === 'number' && Number.isFinite(value.density)
      ? Math.max(0, Math.min(1, value.density))
      : undefined;
  const size =
    typeof value.size === 'number' && Number.isFinite(value.size) ? Math.max(0.5, Math.min(2, value.size)) : undefined;
  const palette =
    Array.isArray(value.palette) &&
    value.palette.length >= 1 &&
    value.palette.length <= 4 &&
    value.palette.every((role) => EFFECT_PALETTE_ROLES.includes(role))
      ? (value.palette as ThemeEffects['palette'])
      : undefined;
  const direction = EFFECT_DIRECTIONS.includes(value.direction as never)
    ? (value.direction as ThemeEffects['direction'])
    : undefined;
  if (
    !ambient &&
    intensity === undefined &&
    speed === undefined &&
    density === undefined &&
    size === undefined &&
    !palette &&
    !direction
  )
    return undefined;
  return { ambient, intensity, speed, density, size, palette, direction };
}

function readVariant(value: unknown, path: string): ThemeVariant {
  if (!isRecord(value)) invalid(`${path} is missing`);
  const surfaces = isRecord(value.surfaces)
    ? { backgroundOpacity: readOpacity(value.surfaces.backgroundOpacity) }
    : undefined;
  const effects = readEffects(value.effects);
  return {
    colors: readColors(value.colors, `${path}.colors`),
    surfaces,
    effects,
    terminal: readTerminal(value.terminal, `${path}.terminal`),
  };
}

/**
 * Structural check of the parts this page draws. Everything the app treats as
 * optional is passed through as-is and read defensively by the renderer.
 */
export function parseThemeManifest(text: string): ThemeManifest {
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    invalid('theme.json is not JSON');
  }
  if (!isRecord(input)) invalid('theme.json is not an object');
  if (input.format !== 'muqun-theme') invalid('not a muqun-theme manifest');
  if (typeof input.schemaVersion !== 'number') invalid('schemaVersion is missing');
  for (const key of ['id', 'name', 'version'] as const) {
    if (!isString(input[key])) invalid(`${key} is missing`);
  }
  if (!isRecord(input.variants)) invalid('variants is missing');
  const optionalText = (key: string) => (isString(input[key]) ? input[key] : undefined);
  const tags = Array.isArray(input.tags) ? input.tags.filter(isString) : undefined;
  return {
    ...(input as object),
    format: 'muqun-theme',
    schemaVersion: input.schemaVersion,
    id: input.id as string,
    name: input.name as string,
    version: input.version as string,
    author: optionalText('author'),
    license: optionalText('license'),
    source: optionalText('source'),
    minAppVersion: optionalText('minAppVersion'),
    description: optionalText('description'),
    tags,
    preview: optionalText('preview'),
    effects: readEffects(input.effects),
    variants: {
      light: readVariant(input.variants.light, 'variants.light'),
      dark: readVariant(input.variants.dark, 'variants.dark'),
    },
  } as ThemeManifest;
}

/* --------------------------------------------------------------------------
   Package
   -------------------------------------------------------------------------- */

function mimeFor(path: string): string {
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

/**
 * Bytes in, a manifest and one object URL per declared image out.
 *
 * The URLs are never revoked: a theme that has been opened once stays warm
 * for the rest of the visit, and the page's whole working set is a handful
 * of small images. Revoking on unmount would make every card that scrolls
 * out and back in decode its artwork again.
 */
export async function unpackTheme(bytes: Uint8Array): Promise<ThemePackage> {
  const files = await readFiles(bytes);
  const manifest = parseThemeManifest(utf8(files.get('theme.json')!));
  const assets: Record<string, string> = {};
  const declared = new Set(['theme.json', 'assets/']);
  for (const [id, asset] of Object.entries(manifest.assets ?? {})) {
    if (!isRecord(asset) || !isString(asset.path)) invalid('offline packages must contain their images');
    const content = files.get(asset.path);
    if (!content) invalid('declared image is missing');
    declared.add(asset.path);
    assets[id] = URL.createObjectURL(new Blob([content as BlobPart], { type: mimeFor(asset.path) }));
  }
  if ([...files.keys()].some((name) => !declared.has(name))) invalid('undeclared files');
  return { manifest, assets };
}

/**
 * The image a theme's author chose to stand for it: `preview` names an entry
 * in `assets`. A `preview` that names nothing is an authoring slip the format
 * tolerates and the gallery reads as "no preview", not as an error.
 */
export function themePreviewUrl(pack: ThemePackage): string | undefined {
  const id = pack.manifest.preview;
  return id && Object.hasOwn(pack.assets, id) ? pack.assets[id] : undefined;
}

/* --------------------------------------------------------------------------
   Resolution -- the rules the app applies, ported from its `resolve.ts`
   -------------------------------------------------------------------------- */

/**
 * The image a slot shows in one mode at one width, exactly as the app's
 * `resolveThemeImage` (`src/theme/resolve.ts`) chooses it: undefined inherits
 * from the shared `decoration`, `null` explicitly removes it at that layer,
 * and `fallbackSlot` is consulted only when the slot says nothing at all --
 * a slot the pack removed does not fall through to another one.
 */
export function resolveThemeImage(
  manifest: ThemeManifest,
  slot: string,
  mode: ThemeMode,
  width: 'compact' | 'regular' = 'compact',
  decorationsEnabled = true,
  fallbackSlot?: string,
): ThemeImage | null {
  if (!decorationsEnabled) return null;
  const variant = manifest.variantDecorations?.[mode]?.[slot];
  const shared = manifest.decoration?.[slot];
  let selected = variant === undefined ? shared : variant;
  if (selected === undefined && fallbackSlot) {
    const fallbackVariant = manifest.variantDecorations?.[mode]?.[fallbackSlot];
    selected = fallbackVariant === undefined ? manifest.decoration?.[fallbackSlot] : fallbackVariant;
  }
  if (!selected || !isString(selected.asset)) return null;
  const responsive = selected[width];
  if (responsive !== undefined) return responsive && isString(responsive.asset) ? responsive : null;
  const { compact: _compact, regular: _regular, ...image } = selected;
  return image;
}

/**
 * Resolve Home's illustration with the same author/default and reader override
 * rules as the native app. The browser preview currently has no reader setting,
 * so callers use the default `theme` preference; the other two values keep this
 * pure contract ready for a future preview control without changing slot rules.
 */
export function resolveHomeArtwork({
  manifest,
  mode,
  width,
  preference = 'theme',
  decorationsEnabled = true,
}: {
  manifest: ThemeManifest | undefined;
  mode: ThemeMode;
  width: 'compact' | 'regular';
  preference?: HomeArtworkPreference;
  decorationsEnabled?: boolean;
}): HomeArtwork | null {
  if (!manifest) return null;
  const hero = resolveThemeImage(manifest, 'home.artwork', mode, width, decorationsEnabled);
  const authored = manifest.homeIdentity?.artwork?.mode === 'hidden' ? 'hidden' : 'default';
  const visible = preference === 'theme' ? authored === 'default' && Boolean(hero) : preference === 'shown';
  if (!visible) return null;
  if (hero) return { slot: 'home.artwork', image: hero };
  return null;
}

/** Every slot name the pack mentions anywhere, known ones first and in order. */
export function declaredSlots(manifest: ThemeManifest): string[] {
  const named = new Set<string>();
  for (const layer of [
    manifest.decoration,
    manifest.variantDecorations?.light,
    manifest.variantDecorations?.dark,
  ]) {
    for (const key of Object.keys(layer ?? {})) named.add(key);
  }
  const known = THEME_SLOTS.filter((slot) => named.has(slot));
  const unknown = [...named].filter((slot) => !(THEME_SLOTS as readonly string[]).includes(slot)).sort();
  return [...known, ...unknown];
}

/**
 * What Home says the app is called, and what mark it shows. The app's
 * `resolveHomeIdentity` (`src/theme/resolve.ts`), verbatim.
 *
 * A pack that says nothing gets nothing: with no custom theme (`manifest`
 * absent) Home is the app's own, but once a pack is applied the branding is
 * opt-in -- an undeclared name or logo is hidden, and a pack that wants the
 * app's own back asks by declaring `mode: 'default'`.
 */
export function resolveHomeIdentity(manifest?: ThemeManifest) {
  const name = manifest?.homeIdentity?.name;
  const logo = manifest?.homeIdentity?.logo;
  // Undeclared means hidden for a pack, and means the app's own for no pack.
  const nameHidden = manifest ? name === undefined || name.mode === 'hidden' : false;
  const logoHidden = manifest ? logo === undefined || logo.mode === 'hidden' : false;
  return {
    name: nameHidden ? null : name?.mode === 'custom' ? name.text : 'Muqun',
    logo: logoHidden
      ? null
      : logo?.mode === 'custom'
        ? { mode: 'custom' as const, asset: logo.asset }
        : { mode: 'default' as const },
    showBrand: !nameHidden || !logoHidden,
  };
}

/** `#RRGGBB` or `#RRGGBBAA` to a CSS colour, with an optional extra alpha multiplied in. */
export function cssColor(hex: string, alpha = 1): string {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  const own = hex.length === 9 ? Number.parseInt(hex.slice(7, 9), 16) / 255 : 1;
  const a = Math.max(0, Math.min(1, own * alpha));
  return a >= 1 ? `rgb(${r} ${g} ${b})` : `rgb(${r} ${g} ${b} / ${a.toFixed(3)})`;
}

/**
 * The ambient visual effect (rain, particles, scanlines, bloom) resolved for
 * a theme in one mode, prioritizing variant-specific overrides over global theme settings.
 */
export function resolveThemeEffects(manifest: ThemeManifest, mode: ThemeMode): ThemeEffects | undefined {
  const variantEffects = manifest.variants[mode]?.effects;
  const sharedEffects = manifest.effects;
  const ambient = variantEffects?.ambient ?? sharedEffects?.ambient ?? 'none';
  const intensity = variantEffects?.intensity ?? sharedEffects?.intensity ?? 0.5;
  const speed = variantEffects?.speed ?? sharedEffects?.speed ?? 1;
  if (ambient === 'none') return undefined;
  return {
    ambient,
    intensity,
    speed,
    density: variantEffects?.density ?? sharedEffects?.density,
    size: variantEffects?.size ?? sharedEffects?.size,
    palette: variantEffects?.palette ?? sharedEffects?.palette,
    direction: variantEffects?.direction ?? sharedEffects?.direction,
  };
}
