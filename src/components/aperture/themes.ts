/**
 * Theme packs, at build time only.
 *
 * `theme-packs.json` is extracted from the app's own registry
 * (`muqun/src/constants/theme-packs.ts` plus the two developer-pack modules)
 * so the names and hexes on the website are the ones the app ships, not a
 * hand-copied approximation that drifts a release later. Re-extract it when
 * the registry changes; the JSON is 37KB and never reaches the browser --
 * only the handful of packs a page actually names are turned into CSS.
 *
 * The 32 packs are data, not a gallery. The themes section reuses the same
 * aperture and recolours it in place, so what ships to the client is one set
 * of custom-property overrides per pack: about 200 bytes each.
 */
import packsJson from './theme-packs.json';

export interface TerminalTokens {
  background: string;
  foreground: string;
  cursor: string;
  link: string;
  selection: string;
  /** ANSI 0-7 then bright 8-15. */
  ansi: string[];
}

export interface ThemePack {
  id: string;
  label: string;
  /** Where the hexes came from, so the next person can re-check them. */
  source: string;
  lightName: string;
  darkName: string;
  light: TerminalTokens;
  dark: TerminalTokens;
}

export type TerminalVariant = 'light' | 'dark';

const PACKS = packsJson as ThemePack[];

const BY_ID = new Map(PACKS.map((pack) => [pack.id, pack]));

export const ALL_PACK_IDS = PACKS.map((pack) => pack.id);

/**
 * A short rail reads; a rail of 32 is a dropdown wearing a costume. These
 * eight are the ones whose casts differ enough to be told apart at a glance
 * on a dark terminal: warm, cold, high-contrast, low-contrast, and Muqun's
 * own default first.
 */
export const DEFAULT_RAIL_IDS = [
  'osuki',
  'tokyo-night',
  'gruvbox',
  'catppuccin',
  'everforest',
  'rose-pine',
  'nightfox',
  'kanagawa',
];

export function getPack(id: string): ThemePack {
  const pack = BY_ID.get(id);
  if (!pack) {
    throw new Error(
      `Unknown theme pack "${id}". Known ids: ${ALL_PACK_IDS.join(', ')}`,
    );
  }
  return pack;
}

export function getPacks(ids: readonly string[]): ThemePack[] {
  return ids.map(getPack);
}

/**
 * The stream is written once with colour *roles* -- `ok`, `err`, `warn` --
 * and each pack resolves them. That is what lets one piece of output
 * recolour correctly under all 32 packs without being rewritten per theme.
 *
 * Dark variants take the bright ANSI row (8-15) and light variants the
 * normal row (0-7), because that is what each row was mixed to be legible
 * on. Reading `ok` off ANSI 2 on a dark background is how themes end up
 * with unreadable green.
 */
function roleVars(term: TerminalTokens, variant: TerminalVariant): Record<string, string> {
  const bright = variant === 'dark';
  const at = (normal: number) => term.ansi[bright ? normal + 8 : normal] ?? term.foreground;

  return {
    '--mq-term-bg': term.background,
    '--mq-term-fg': term.foreground,
    '--mq-term-cursor': term.cursor,
    '--mq-term-link': term.link,
    '--mq-term-selection': term.selection,
    '--mq-term-dim': term.ansi[bright ? 8 : 7] ?? term.foreground,
    '--mq-term-err': at(1),
    '--mq-term-ok': at(2),
    '--mq-term-warn': at(3),
    '--mq-term-info': at(4),
    '--mq-term-accent': term.cursor,
  };
}

export function packVars(
  pack: ThemePack,
  variant: TerminalVariant = 'dark',
): Record<string, string> {
  return roleVars(variant === 'dark' ? pack.dark : pack.light, variant);
}

function declarations(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([name, value]) => `${name}:${value}`)
    .join(';');
}

/**
 * Every rule one aperture needs, generated at build time.
 *
 * The base rule carries the pack that is checked on load, and then one rule
 * per pack keyed off `:has(<that pack's radio>:checked)`. Selecting a theme
 * is therefore a selector match and a custom property -- no JavaScript, no
 * class toggling, no hydration, and no chance of the page moving while the
 * terminal recolours. The radios are real radios, so arrow keys work because
 * the platform makes them work.
 *
 * The base rule has to be a RULE and not an inline `style` on the element,
 * which is the one non-obvious thing here. An inline style beats every
 * stylesheet declaration that is not `!important`, so putting the default
 * pack in `style="..."` leaves the rail visibly selecting a theme that never
 * arrives. As a rule it is specificity (1,0,0), the `:has()` variants are
 * higher, and the override lands.
 */
export function apertureCss(
  scope: string,
  initial: ThemePack,
  packs: readonly ThemePack[] = [],
  variant: TerminalVariant = 'dark',
): string {
  const base = `#${scope}{${declarations(packVars(initial, variant))}}`;
  const variants = packs.map(
    (pack) =>
      `#${scope}:has(#${scope}-${pack.id}:checked){${declarations(packVars(pack, variant))}}`,
  );
  return [base, ...variants].join('\n');
}
