/**
 * Where this site's own files sit under `public/`, named once.
 *
 * The company site kept everything under `public/muqun/` because it had other
 * products to keep out of the way of. Here the whole site is Muqun, so the
 * segment came off — which means every path that used to read `/muqun/shots/…`
 * now reads `/shots/…`, and that rename is exactly the kind of thing that gets
 * done in four files and missed in the fifth. It is done in this one.
 *
 * `src/lib/muqun-shots.ts` beside this is the generated manifest — what exists
 * and at what size. This is where it lives. The two are separate because one is
 * rewritten by a script and the other is written by hand.
 */
import { MUQUN_SHOTS, type MuqunShotBase } from './muqun-shots';

/** The card every link to this site unfurls into. */
export const ogImage = '/og-muqun.png';

/** The 20-second Muqun film, loaded only after pressing play, and muted until unmuted. */
export const introVideoSrc = '/video/muqun-intro.mp4?v=4-editorial';
export const introVideoPoster = '/video/muqun-intro-poster.webp?v=4-editorial';
export const introVideoPortraitSrc = '/video/muqun-intro-portrait.mp4?v=4-editorial';
export const introVideoPortraitPoster = '/video/muqun-intro-portrait-poster.webp?v=4-editorial';

/**
 * Whether a name built at runtime is a capture that actually exists.
 *
 * For the one case the manifest's type cannot cover on its own: a page that
 * derives a shot name from another list -- the theme rail derives
 * `theme-${pack.id}` from the pack table -- has a `string`, and the honest
 * ways to turn that into a `MuqunShotBase` are this or a cast. A cast would
 * be checked by nobody and would render an `<img>` pointing at a 404; this
 * hands the caller a decision to make, and both callers so far make it by
 * failing the build.
 *
 * The dark half is the one probed because every rail on this site is dark;
 * the generator only writes a base name when it has both, so either proves
 * the pair.
 */
export function isShot(name: string): name is MuqunShotBase {
  return `${name}-dark` in MUQUN_SHOTS;
}

/**
 * One screenshot, in one of the app's two modes, in both formats.
 *
 * Width and height come from the manifest rather than from the caller, because
 * they are facts about the files rather than choices about the layout. Without
 * them the page reflows as each phone loads, which on a page that is mostly
 * phones is the whole layout moving.
 */
export function shotSources(name: MuqunShotBase, mode: 'light' | 'dark') {
  const file = `${name}-${mode}` as keyof typeof MUQUN_SHOTS;
  const { width, height } = MUQUN_SHOTS[file];
  return {
    avif: `/shots/${file}.avif`,
    webp: `/shots/${file}.webp`,
    width,
    height,
  };
}
