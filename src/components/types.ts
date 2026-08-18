/**
 * The shapes the design-system components accept.
 *
 * Kept in one file so the content side has a single import for every prop
 * type, and so a rename here is a compile error there rather than a silently
 * ignored attribute.
 */

/** Which voice a band is in. See `layout.css` for what each one means. */
export type BandTone = 'cream' | 'recessed' | 'ink';

export type ContainerWidth = 'default' | 'narrow' | 'wide';

/**
 * One colour role inside terminal output.
 *
 * These are roles, not colours: `ok` resolves to the selected theme pack's
 * ANSI green, `err` to its red, and so on. A stream written once therefore
 * recolours correctly under all 32 packs without being rewritten.
 */
export type StreamTone =
  | 'fg'
  | 'dim'
  | 'accent'
  | 'ok'
  | 'warn'
  | 'err'
  | 'info'
  | 'link';

/** A run of characters sharing one tone. */
export interface StreamSpan {
  /** ASCII. Machine output is never translated. */
  t: string;
  /** Defaults to `fg`. */
  c?: StreamTone;
}

/**
 * A line of machine output. A bare string is the common case and means the
 * whole line is `fg`.
 */
export type StreamLine = string | StreamSpan[];

/** What the app chrome inside the device silhouette says. */
export interface ApertureChrome {
  /** The session name in the app's title bar. ASCII, mono. */
  title?: string;
  /** Right-hand status, e.g. a connection state. ASCII, mono. */
  status?: string;
  /** Accessible name for the coral connection dot. Translated. */
  statusLabel?: string;
}

/** One entry in the docked status-line navigation. */
export interface StatusLineItem {
  /** The digit shown before the colon. Keeps the tmux-status-bar reading. */
  key: string;
  /** The id of the section it scrolls to, without the `#`. */
  id: string;
  /**
   * The visible label. ASCII and untranslated, because the status line is in
   * the machine register -- see the register rule in `tokens.css`.
   */
  label: string;
  /**
   * The translated accessible name, announced instead of `label`. This is
   * how a Korean reader gets a Korean nav without a Korean string ever
   * entering a mono, letter-spaced context.
   */
  srLabel?: string;
}

export interface LocaleOption {
  /** BCP-47 tag, e.g. `zh-TW`. */
  code: string;
  /** The language's name in that language. Never translated into English. */
  label: string;
  href: string;
}

/** How a term in the ledger resolves. Never colour alone. */
export type LedgerVerdict = 'yes' | 'no' | 'note';
