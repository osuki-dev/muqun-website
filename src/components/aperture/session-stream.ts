/**
 * The hero's stream: one real session, ending where the reader comes in.
 *
 * This is the page's argument in machine form. A coding agent works for a
 * while -- reads, greps, edits, runs the tests -- and then stops on a
 * permission prompt, and the last line of the file is the cursor sitting on
 * that prompt with nobody at the desk to answer it. Everything above it is
 * there so the prompt at the bottom reads as an interruption rather than as a
 * screenshot of a menu.
 *
 * The rules are `sample-stream.ts`'s rules, and they are structural rather
 * than stylistic -- see the aperture's own comment for why:
 *
 *   1. ASCII only, and never translated. This array is identical in all eight
 *      locales, because it is the machine talking.
 *   2. Colour by ROLE, never by hex, so one stream is correct under all 32
 *      theme packs.
 *   3. Long lines -- 80 to 110 characters. The device silhouette is a window
 *      cut into this output, and a line has to be long enough to cross both
 *      of its edges. Short lines collapse the field into a ribbon.
 *   4. Around forty of them, so the output runs off the top and the bottom of
 *      the band instead of floating in the middle of it.
 */
import type { StreamLine } from '../types';

export const SESSION_STREAM: readonly StreamLine[] = [
  [
    { t: '$ ', c: 'accent' },
    { t: 'tmux attach -t build      # the gateway is already mirroring this pane to the phone' },
  ],
  [
    {
      t: 'attached to build (48213); 3 clients, 118x34, 8000 lines of scrollback replayed',
      c: 'dim',
    },
  ],
  '',
  [{ t: '$ ', c: 'accent' }, { t: 'claude' }],
  [
    {
      t: 'claude code 2.1.4 | cwd ~/src/muqun | 9 tools | type /help for the command list',
      c: 'dim',
    },
  ],
  '',
  [
    { t: '> ', c: 'accent' },
    { t: 'add a dark mode toggle to Settings, wire it through the theme store, keep tests green' },
  ],
  '',
  [
    { t: '● ', c: 'accent' },
    { t: 'Search(pattern: "ColorMode", path: "src", output_mode: "files_with_matches")' },
  ],
  [
    { t: '  6 files matched: src/state/theme.ts, src/theme/provider.tsx, src/screens/Settings.tsx', c: 'dim' },
  ],
  [{ t: '● ', c: 'accent' }, { t: 'Read(src/state/theme.ts)' }],
  [
    {
      t: '  read 214 lines; ColorMode is resolved from the persisted store, then the media query',
      c: 'dim',
    },
  ],
  [{ t: '● ', c: 'accent' }, { t: 'Read(src/theme/provider.tsx)' }],
  [
    {
      t: '  read 96 lines; the provider re-reads the store on focus, so a toggle has to write both',
      c: 'dim',
    },
  ],
  '',
  [
    {
      t: 'The store already carries "system" | "light" | "dark". Two files change: the resolver',
    },
  ],
  [{ t: 'in src/theme.ts, and the row that renders the control in Settings. Running the tests' }],
  [{ t: 'first, so the diff below is measured against a suite that was green when I started.' }],
  '',
  [{ t: '● ', c: 'accent' }, { t: 'Bash(bun test src/theme src/state --coverage=false)' }],
  [{ t: 'bun test v1.4.0 (45eda514) darwin arm64, 8 workers, 2 directories', c: 'dim' }],
  [
    { t: ' ok ', c: 'ok' },
    { t: 'resolveMode("system") follows the device setting, both ways      [ 0.71ms]' },
  ],
  [
    { t: ' ok ', c: 'ok' },
    { t: 'resolveMode("dark") ignores the device setting entirely          [ 0.44ms]' },
  ],
  [
    { t: ' ok ', c: 'ok' },
    { t: 'the persisted choice survives a cold start of the app            [ 3.902ms]' },
  ],
  [
    { t: '  ! ', c: 'warn' },
    { t: 'skipped: the OS appearance switch needs a physical device' },
  ],
  [{ t: ' 18 pass  1 skip  0 fail  ', c: 'ok' }, { t: '| 27 expect() calls | ran in 812.00ms', c: 'dim' }],
  '',
  [
    {
      t: 'Green. The resolver is the only place that reads the system setting, so the toggle is',
    },
  ],
  [{ t: 'four lines and the Settings row is one. Editing src/theme.ts now.' }],
  '',
  [{ t: '● ', c: 'accent' }, { t: 'Update(src/theme.ts)' }],
  [
    { t: '  12 + ', c: 'ok' },
    { t: 'export type ColorMode = "system" | "light" | "dark";', c: 'ok' },
  ],
  [
    { t: '  13 + ', c: 'ok' },
    { t: 'export function resolveMode(mode: ColorMode): "light" | "dark" {', c: 'ok' },
  ],
  [{ t: '  14 - ', c: 'err' }, { t: '  return "light";', c: 'err' }],
  [
    { t: '  14 + ', c: 'ok' },
    { t: '  return mode === "system" ? systemMode() : mode;', c: 'ok' },
  ],
  '',
  [{ t: 'Claude wants to edit ' }, { t: 'src/theme.ts', c: 'info' }, { t: ' | 4 additions, 1 removal' }],
  '',
  [{ t: 'Do you want to make this edit?' }],
  [{ t: '> 1. Yes', c: 'accent' }],
  [{ t: '  2. Yes, and do not ask again this session', c: 'dim' }],
  [{ t: '  3. No, tell Claude what to do differently', c: 'dim' }],
  '',
  [{ t: 'waiting 00:14 ', c: 'dim' }, { t: '_', c: 'accent' }],
];

/**
 * The same session, cut where the hero's prompt takes over.
 *
 * `SESSION_STREAM` above is the whole thing, prompt included, and the ink
 * band still renders it that way -- as a picture of a session, unreachable,
 * which is what that band is for. The hero does not want a picture of the
 * prompt; it renders the prompt as real controls the reader can answer, so it
 * takes the scrollback and stops.
 *
 * Sliced rather than copied. The two must not drift: the diff a reader
 * approves in the hero is the diff they see running in the band below it, and
 * two hand-maintained copies of a session are two sessions.
 */
export const SESSION_SCROLLBACK = SESSION_STREAM.slice(0, -6);

/** The question, verbatim from the agent. ASCII, never translated. */
export const PROMPT_QUESTION = 'Do you want to make this edit?';

/**
 * The app's three real answers, in the app's real order.
 *
 * Taken from the agent's own prompt rather than reworded for the page: a
 * landing page that shows a control the product does not have is the one
 * kind of wrong that costs trust rather than time.
 */
export const PROMPT_CHOICES = [
  'Yes',
  'Yes, and do not ask again this session',
  'No, tell Claude what to do differently',
] as const;

/**
 * What the agent prints after each answer, in the same order.
 *
 * These are the real consequences, not a flourish. 1 applies the edit and
 * runs the suite the session was already measuring against; 2 does the same
 * and records the standing permission; 3 hands the turn back and says where
 * the reply can be typed from -- which is the one place on the page where
 * the phone and the terminal are shown to be the same composer.
 */
export const PROMPT_REPLIES: readonly (readonly StreamLine[])[] = [
  [
    [{ t: '● ', c: 'accent' }, { t: 'Update(src/theme.ts)' }],
    [{ t: '  applied | 4 additions, 1 removal', c: 'dim' }],
    '',
    [{ t: '● ', c: 'accent' }, { t: 'Bash(bun test src/theme src/state --coverage=false)' }],
    [{ t: '  18 pass  1 skip  0 fail', c: 'ok' }, { t: ' | ran in 812.00ms', c: 'dim' }],
    '',
    [{ t: 'Done. The toggle is wired and Settings has the row.' }],
  ],
  [
    [{ t: '● ', c: 'accent' }, { t: 'Update(src/theme.ts)' }],
    [{ t: '  applied | 4 additions, 1 removal', c: 'dim' }],
    [{ t: '  edits to src/theme.ts will not ask again this session', c: 'dim' }],
    '',
    [{ t: '● ', c: 'accent' }, { t: 'Bash(bun test src/theme src/state --coverage=false)' }],
    [{ t: '  18 pass  1 skip  0 fail', c: 'ok' }, { t: ' | ran in 812.00ms', c: 'dim' }],
    '',
    [{ t: 'Done, and it will not stop on this file again today.' }],
  ],
  [
    [{ t: 'Edit declined. Nothing was written.', c: 'warn' }],
    '',
    [{ t: '> ', c: 'accent' }, { t: '_', c: 'accent' }],
    [
      { t: '  Type the correction here, or from the phone -- it is the same composer.', c: 'dim' },
    ],
  ],
];
