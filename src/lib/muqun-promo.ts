/**
 * Whether the store buttons carry their limited-time promo tip.
 *
 * The hero and download buttons read `data-tip` from the locale copy, and the
 * CSS in `styles/world.css` only draws a bubble when that attribute is
 * present. This value decides at build time whether the attribute is rendered
 * at all, so turning the promo off leaves two plain store buttons with no
 * hidden strings in the markup.
 *
 * Opt-in on purpose: the default (unset, empty, or anything but an explicit
 * truthy value) is `false`, so a build that forgot the variable can never
 * advertise a promo that is not running.
 *
 *   PUBLIC_MUQUN_STORE_PROMO=1   # show the iOS / Android promo tips
 *
 * `PUBLIC_` because the decision is baked into the prerendered HTML — it is
 * visible to every visitor by design, and nothing secret. Truthy values are
 * `1`, `true`, `yes`, and `on` (case-insensitive); everything else is off.
 */

function readPromoFlag(env: Record<string, string | boolean | undefined>): boolean {
  const raw = env['PUBLIC_MUQUN_STORE_PROMO'];
  if (typeof raw === 'boolean') return raw;
  if (typeof raw !== 'string') return false;
  return ['1', 'true', 'yes', 'on'].includes(raw.trim().toLowerCase());
}

export const storePromoActive: boolean = readPromoFlag(import.meta.env);
