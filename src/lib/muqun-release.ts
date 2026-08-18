/**
 * Whether Muqun can be downloaded from the App Store yet.
 *
 * ── REVIEW PASSED. 1.3.0 WENT LIVE 2026-08-17 ───────────────────────────────
 * This is `true`, and that single value renders, together:
 *
 *   - the App Store button in the Muqun page's hero
 *   - the App Store button in that page's download block
 *   - the App Store button in its sticky bar, and the bar's own label
 *   - the "Available now" eyebrow over Muqun on the site's home page
 *     (home-page.tsx, `home.hero.signalLabel`)
 *
 * Nothing else needs editing and no markup moves. Both states are written and
 * translated at all times; this value only chooses which one renders, so the
 * copy for the state that is currently off is still typechecked and still
 * carried in every locale. `copy.review` is therefore not dead code -- it is
 * the other half of a switch, kept ready for the next submission that sits in
 * review, or for a listing pulled at short notice.
 *
 * Note for anyone checking the link from mainland China: the app is not sold
 * in the `cn` storefront, so `apps.apple.com` will answer a CN visitor with its
 * own front page rather than the listing. That is the storefront, not a broken
 * link -- `itunes.apple.com/lookup?id=6793419283&country=us` shows the real
 * state of the listing from anywhere.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * It lives apart from muqun-links.ts on purpose. That file answers "where does
 * this link go"; this one answers "is there anything to link to yet", and only
 * the second question changes on a schedule Apple sets rather than one we do.
 *
 * While this is `false` the page must not render a link to the listing at all
 * -- not a disabled one, not a greyed one. The listing is not public during
 * review, so every such link is a 404 with a coral button around it, and a
 * store link that 404s is worse on launch week than no button.
 *
 * The annotation is deliberate. Without `: boolean` TypeScript narrows the
 * declaration to the literal `false` and rejects the comparison as
 * unintentional, which is exactly backwards for a value whose whole job is to
 * be changed by hand.
 */
export const appStoreAvailable: boolean = true;
