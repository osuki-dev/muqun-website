/**
 * The product page's OpenCode chapter, one object per locale, in the
 * arrangement `world.ts` and `gateway-help.ts` use: a single file, typed
 * against `SiteLocale`, so a language with no entry here is a build error
 * rather than a page that quietly serves English.
 *
 * Every locale currently points at the same English object, for the reason
 * given at length in `user-guide.ts`: an alias is a findable "not translated
 * yet", and twelve identical English blocks are not.
 *
 * Kept out of `world.ts` deliberately. That file is the page's narration and
 * is fully translated; this is a block that is not, and mixing the two would
 * put an untranslated string inside the one table a translator reads
 * top to bottom.
 *
 * Nothing here may describe a capability the app does not ship. `facts` is
 * checked against the app tree, not against the pitch: there is no sign-in
 * anywhere in Muqun, permissions really are answerable from the lock screen,
 * and the diffs in the tool cards are the real ones.
 */
import type { SiteLocale } from '@/lib/locales';

export interface OpencodeHome {
  /** Mono, ASCII, untranslated. Follows the page's `NN / LABEL` eyebrows. */
  eyebrow: string;
  heading: string;
  body: string;
  /** Three to five. One sentence each. */
  facts: readonly string[];
  /** Points at `/support/#opencode`. */
  link: string;
}

const en: OpencodeHome = {
  eyebrow: 'OPENCODE',
  heading: 'Your OpenCode agent, on the phone.',
  body: 'Muqun has a screen built for OpenCode rather than a terminal with an agent in it. Sessions you can switch between, tool calls you can actually read, and the moment it stops to ask you something arriving as a tap rather than a cursor blinking on a machine you are not sitting at.',
  facts: [
    'Sessions per workspace, with the subagents a task spawned indented underneath it.',
    'Tool cards carrying the real diff, the same way the Changes viewer draws it.',
    'Permission prompts and questions answered from the phone — Allow, Always allow, Deny.',
    'Long tool calls detach to the background; compaction keeps a long session going.',
    'No sign-in, and no API key in the app. Bring your own OpenCode; it stays on your machine.',
  ],
  link: 'How the agent screen works',
};

// TODO(i18n): English until translated
export const opencodeHome: Record<SiteLocale, OpencodeHome> = {
  en,
  'zh-CN': en,
  'zh-TW': en,
  ja: en,
  ko: en,
  th: en,
  vi: en,
  de: en,
  fr: en,
  es: en,
  pt: en,
  ru: en,
};
