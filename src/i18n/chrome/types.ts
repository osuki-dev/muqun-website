/**
 * Everything on this site that is not the product story: the header, the
 * footer, the theme and language controls, the 404, and the two lines of
 * furniture around the privacy policy.
 *
 * The old company site kept these in `src/i18n/locales/*.json` — ten files,
 * 287 KB, every one of them imported by an i18next config that shipped the lot
 * to the browser on every page. Muqun's chrome uses about fifteen of those
 * keys. This is those fifteen, typed, read at build time and never sent
 * anywhere. There is no i18next here and no runtime `t()`: eight objects and a
 * lookup do the same job, and a missing key is a compile error instead of a
 * string that renders as its own dotted path.
 *
 * Interpolation is by hand and there is exactly one placeholder in the whole
 * catalogue — `{year}` in `footer.copyright`. Keep the braces and the spelling;
 * put it wherever the sentence needs it in this language.
 *
 * `site.name` follows the same naming rule as `../muqun/types.ts`:
 *   - zh-TW  -> 牧群
 *   - ja     -> 牧群
 *   - all others -> Muqun
 *
 * Deliberately absent, and not an oversight:
 *
 *   - `error.serverError`. The old site ran a Node adapter and could render its
 *     own 500. This one is a directory of files behind Cloudflare's asset
 *     binding; there is no origin left to fail, and a 5xx here comes from
 *     Cloudflare's own edge, which will never reach for a page of ours. A
 *     translated 500 page that can never be served is a promise the deploy
 *     cannot keep.
 *   - anything about text direction. `ar` is not one of the eight, so every
 *     language on this site runs left to right.
 */

export interface ChromeCopy {
  site: {
    /** The wordmark, and the suffix on every page title. */
    name: string;
  };
  /** The header's links. This site has three pages. */
  nav: {
    home: string;
    support: string;
    privacy: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
  header: {
    /**
     * Accessible names for the three controls that are icons. Each is the only
     * name its control has, so none of them is optional.
     */
    aria: {
      language: string;
      theme: string;
      menu: string;
    };
  };
  footer: {
    /** Takes `{year}`. */
    copyright: string;
    github: string;
  };
  error: {
    notFound: {
      title: string;
      body: string;
    };
    /** The one way out of the 404. */
    home: string;
  };
  /**
   * The frame around the privacy policy, whose body stays in English.
   *
   * The policy is the document Apple and Google review and the one a reader
   * takes a dispute to, so it has one authoritative text rather than eight that
   * can drift apart at a clause. `sourceNote` says so, in the reader's own
   * language, at the top of the page — which is the part that must not be in
   * English, because it is the part explaining why the rest is.
   */
  privacy: {
    title: string;
    lastUpdatedLabel: string;
    sourceNote: string;
  };
}
