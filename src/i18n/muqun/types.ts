/**
 * The shape of Muqun's page copy, one object per locale.
 *
 * This deliberately lives outside src/i18n/locales/*.json. Those files are all
 * imported by src/i18n/config.ts, which means every string in them is bundled
 * into the client for every page on the site. Muqun's copy is only ever needed
 * while server-rendering two pages, so keeping it here costs a visitor nothing.
 *
 * The page has one reader -- someone whose agent stalled on a permission prompt
 * while they were away from the desk -- and one outcome, so it runs pain,
 * answer, four pillars, setup, delight, promise, download, and nothing else.
 * Every block is at most two sentences and one picture. If a sentence here is
 * not doing one of those jobs, it should not be here at all.
 *
 * Nothing here may describe a capability the app does not ship. The list of
 * what it does ship is src/lib/release-notes.ts and docs/store/2.0/ in the app
 * repo; where the app has its own word for something -- ONLINE, AGENT,
 * DIRECTORY, the three answers on the approval push -- these files use that
 * word, taken from the app's own catalogue rather than translated afresh.
 *
 * Naming rule, fixed across locales:
 *   - zh-TW  -> 牧群
 *   - ja     -> 牧群（ぼくぐん）
 *   - all others -> Muqun
 * "Herdr", "tmux", "Tailscale", "Gateway", "Osuki" and shell commands are
 * product names and are never translated. Neither are the theme pack names.
 *
 * A handful of strings carry a `{placeholder}`, marked on the field below. The
 * page substitutes a product name into them; keep the braces and the spelling,
 * and put them wherever the sentence needs them in this language.
 */

export interface MuqunTitled {
  title: string;
  body: string;
}

export interface MuqunCopy {
  meta: {
    title: string;
    description: string;
  };
  /** Block 1 -- the pain, split: a blocked terminal beside the phone. */
  hero: {
    paneLabel: string;
    paneState: string;
    /** Mono, above the headline. Reads like a pane's own status line. */
    eyebrow: string;
    heading: string;
    sub: string;
    appStore: string;
    googlePlay: string;
    /** Sits above the install command. */
    installLabel: string;
    copyLabel: string;
    copiedLabel: string;
    /** What the drawn terminal is showing, for anyone who cannot see it. */
    terminalAlt: string;
    deviceAlt: string;
    /** Accessible name of the play control laid over the hero phone. */
    videoPlayLabel: string;
    /** Runtime, shown on the play control. Digits stay digits. */
    videoLength: string;
    /**
     * The blocked prompt in the hero.
     *
     * Only the strings a reader reads as language are here. The question, the
     * three answers and everything the agent prints after one is chosen are
     * machine output: ASCII, identical in all eight locales, and they live in
     * `src/components/aperture/session-stream.ts` with the rest of the
     * session. See the register rule in `tokens.css`.
     */
    promptLegend: string;
    /** The keyboard hint under the pane. Shown only once the script runs. */
    promptHint: string;
    /** What the whole pane is showing, for anyone who cannot see it. */
    promptCaption: string;
  };
  /**
   * Block 2 -- approve, watch, send, dispatch. One line and one proof each.
   *
   * The four things the app is for, in the order someone meets them: the
   * prompt reaches you, you can see what is happening, you can hand the agent
   * something, you can start the next job. Every line here names a capability
   * that ships today; if the app cannot do it, it does not belong in this list.
   *
   * `alt` describes a screenshot where the proof is one, and the drawing where
   * it is drawn -- see the composition note on the section in the page. Either
   * way it describes what is actually on screen. `send` currently has no proof
   * and is folded into `dispatch`, so its `alt` is unread; it is kept because
   * the capture it describes is expected back.
   */
  pillars: {
    paneLabel: string;
    items: { pane: string; state: string; title: string; line: string; alt: string }[];
    /** Labels inside the drawn "new task" card. The app's own, never invented. */
    dispatchAgent: string;
    dispatchFolder: string;
    dispatchPrompt: string;
    dispatchSend: string;
  };
  /**
   * Block 2b -- how it feels in the hand, at the foot of the same pane.
   *
   * The pillars above answer "what would I use this for". A reader who is
   * already sold on that then asks the question this block answers: is it any
   * good to actually hold. Six sentences of "you can" is a brochure; a list of
   * gestures with the reason each one is the way it is, is a tool.
   *
   * WHAT MAY GO IN THIS LIST
   * The same gate as `pillars`, and it is worth restating because this block
   * invites small true-sounding details: every line here is a thing a reader
   * can do on the phone today, read out of the app's own source, not out of a
   * design document and not out of the store listing -- the live App Store
   * description is a release behind and says "Five theme packs" while the
   * registry ships thirty-two, so it is evidence of nothing.
   *
   * Each item is one gesture and one sentence. `gesture` is the thing the hand
   * does and it sets in the machine register, so keep it to a couple of words;
   * `line` is why it was worth building. If a line needs a second sentence it
   * is either two items or not an item.
   */
  craft: {
    paneLabel: string;
    /** Sits beside the heading. A category, not a claim. */
    paneNote: string;
    heading: string;
    lead: string;
    /**
     * `gesture` is the terse label in the left column -- "two fingers",
     * "long-press", "@". Where a language has no short form of the hand
     * movement, name the result instead; a five-word gesture column wraps and
     * stops being a column.
     *
     * It is translated, so it is set proportional and never takes the mono
     * uppercase treatment the eyebrows have, however much a key column invites
     * it. That register is for ASCII the machine wrote -- see the note on
     * `SectionHeading`, and the reason it exists is Korean.
     */
    items: { gesture: string; line: string }[];
  };
  /** Block 3 -- the conversion block. One command, one panel, one scan. */
  setup: {
    paneLabel: string;
    paneNote: string;
    heading: string;
    lead: string;
    steps: MuqunTitled[];
    /** Offered beside the install command, with the paged variant of it. */
    inspectLead: string;
    /**
     * The escape hatch under step 2, for when the panel did not appear.
     *
     * The install script opens the pairing panel itself on a first run, so this
     * is the uncommon path -- but it is the one that loses installs, because
     * someone staring at a terminal with no QR and nothing to type simply
     * stops. `panelFallbackAfter` covers the already-paired case, where the
     * panel is open but showing its manager rather than a code.
     */
    panelFallbackLabel: string;
    panelFallbackBody: string;
    panelFallbackAfter: string;
    panelCopyLabel: string;
    /** Accessible name on the copy button for the download-read-run trio. */
    inspectCopyLabel: string;
    /** The word the app's own server card shows once it is connected. */
    onlineLabel: string;
    qrPanelAlt: string;
    onlinePanelAlt: string;
    /**
     * The other screen, in the reader's other hand.
     *
     * Steps 2 and 3 draw the machine — the pairing panel, the server card —
     * and these two describe the phone captures beside them: what Muqun shows
     * with nothing paired yet, and what it shows a second later.
     */
    pairPhoneAlt: string;
    panelsPhoneAlt: string;
    /** Three short facts. Requirements, not features. */
    requirements: string[];
    tailscaleBefore: string;
    tailscaleLink: string;
    tailscaleAfter: string;
    updatingLabel: string;
    updatingBody: string;
    openSourceBefore: string;
    openSourceLink: string;
  };
  /**
   * What stands where the App Store button stands, while the app is in review.
   *
   * Rendered only when src/lib/muqun-release.ts reads 'in-review'. It is a
   * status, not a control: the page draws it in the same voice it draws a pane
   * that is waiting on someone, because that is exactly what it is. Nothing in
   * here may read like a button -- no "coming soon", no "notify me", nothing
   * that invites a press that goes nowhere.
   */
  review: {
    /** The status line itself. Short: it also has to fit the sticky bar. */
    status: string;
    /** One sentence under the buttons. Says where the link will appear. */
    note: string;
  };
  /**
   * Block 4 -- the theme rail. Nothing else.
   *
   * The intro film is not here: it is the hero's phone, where someone deciding
   * whether to read on can press it. There is also deliberately no showcase of
   * the eight languages the app speaks:
   * the visitor is already reading this page in their own, which is the only
   * proof of that worth anything, and a wall of the same screen in eight
   * scripts moves nobody closer to installing.
   *
   * No locale states how many theme packs there are. The registry
   * (`src/constants/theme-packs.ts` in the app) has grown every release and the
   * number was already wrong on this page twice; the rail below the copy shows
   * five of them, so the copy says "five of these" and lets the registry be as
   * long as it likes.
   */
  delight: {
    paneLabel: string;
    paneNote: string;
    heading: string;
    line: string;
    /** Takes {pack}, one theme pack's name. Never translate the name itself. */
    themeAlt: string;
  };
  /** Block 5 -- facts, no adjectives. */
  promise: {
    paneLabel: string;
    lines: string[];
    link: string;
    /**
     * The second way out of this block: where a feature gets asked for and a
     * bug gets reported. It belongs beside the privacy policy because the two
     * answer the same question from opposite ends -- what this app will never
     * do with you, and what it will keep doing for you.
     */
    feedbackLink: string;
  };
  /** Block 6 -- the tagline and the two ways to start. */
  footer: {
    heading: string;
    appStore: string;
    googlePlay: string;
    installLabel: string;
    support: string;
  };
  /** The support page, which is reference material and not part of the pitch. */
  support: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    heading: string;
    lead: string;
    emailCta: string;
    issueCta: string;
    contactBefore: string;
    contactAfter: string;
    networkEyebrow: string;
    networkHeading: string;
    networkBadge: string;
    networkBody: string;
    networkLink: string;
    checksHeading: string;
    topics: MuqunTitled[];
    safetyHeading: string;
    safetyBody: string;
    safetyLink: string;
  };
}
