/**
 * The page's scroll behaviour, in one place.
 * =========================================
 *
 * Three things, and they are one module because they are one behaviour: they
 * all need the same number -- where the page is -- at the same moment. Split
 * across three listeners they would each measure it again, and the three
 * answers would disagree by a frame.
 *
 *   1. the header docks and takes an edge once the page has moved
 *   2. each band's content rises as the band arrives
 *   3. the status line marks the window you are in, and draws how far in
 *
 * What is deliberately NOT here is anything that moves the scroll itself. See
 * the note below.
 *
 * ── The one rule that keeps it smooth ───────────────────────────────────────
 * NOTHING IN A PER-FRAME HANDLER MAY READ LAYOUT.
 *
 * `getBoundingClientRect`, `offsetTop`, `scrollHeight` and `getComputedStyle`
 * all force the browser to flush pending style and layout work before they
 * can answer. Called from a scroll handler that runs on every frame -- and
 * with a full-bleed terminal on screen, this page has plenty of layout to
 * flush -- that turns a 60fps scroll into a stutter, and it is the exact
 * mistake the first draft of this file made in `driveStatusLine`: five
 * `getBoundingClientRect()` calls per frame, every frame.
 *
 * So every measurement lives in `measure()`, which runs once at start and
 * again whenever ScrollTrigger refreshes (resize, font load, image load).
 * The handlers below compare cached numbers and write styles. They never ask
 * the browser a question.
 *
 * ── What survives without this file ─────────────────────────────────────────
 * Everything that matters. The status line is real anchors, the bands are
 * plain sections, `scroll-padding` in `base.css` puts an anchor below the
 * header on its own. With the script absent the page scrolls normally and
 * nothing is hidden -- there is no element left at `opacity: 0` waiting for a
 * tween that will not run, which is the usual way a reveal becomes a blank
 * page.
 */
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/*
 * ── Why there is no scroll snapping ─────────────────────────────────────────
 * There was, for one draft: a proximity settle that pulled the scroll onto
 * the nearest band whenever it came to rest near a seam. It worked, and it
 * felt wrong, and the two are not in tension -- they are the same fact.
 *
 * Snapping means the page finishes the reader's gesture for them. However
 * short the tween, there is a moment where the wheel has stopped and the page
 * has not, and the hand reads that as the page stuttering rather than as the
 * page helping. Every site that scrolls the way a product site should --
 * where the scroll is silky and the content simply arrives -- does not do
 * this. The polish is in what moves ON the scroll, not in moving the scroll.
 *
 * Section-at-a-time is still here; it is just addressed rather than imposed.
 * The status line's `0:` .. `4:` are one tweened jump to a section each, and
 * they are the affordance a reader who wants to move a section at a time
 * actually reaches for.
 */

/**
 * The reading line: how far down the viewport "the section I am in" is
 * measured. A third down rather than at the top edge, because the section
 * under the reader's eye is the one they are in, not the one whose last pixel
 * is still on screen.
 */
const READING_LINE = 1 / 3;

/** The cached page geometry. Written by `measure`, read by everything else. */
const geometry = {
  /** Per status-line entry: the scroll range over which it is current. */
  sections: [] as { id: string; from: number; to: number }[],
  /** The header's height plus its breathing room, from the stylesheet. */
  rest: 0,
};

let bands: HTMLElement[] = [];
let sectionEls: HTMLElement[] = [];

/**
 * Every layout read on the page, together, so they happen in one batch
 * instead of scattered through a frame.
 *
 * `scroll-padding-top` is read rather than `--mq-header-height` because it is
 * the resolved pixel value of the token plus its space, and it is the same
 * number the browser itself uses for an `#anchor` -- so a section reached by
 * a click and one reached by scrolling land on the same line.
 */
function measure() {
  const rest = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('scroll-padding-top'),
  );
  geometry.rest = Number.isFinite(rest) ? rest : 0;

  const y = window.scrollY;
  const line = window.innerHeight * READING_LINE;
  geometry.sections = sectionEls.map((el) => {
    const box = el.getBoundingClientRect();
    return { id: el.id, from: box.top + y - line, to: box.bottom + y - line };
  });
}

/**
 * The header. Sticky in the stylesheet -- that part must not depend on
 * JavaScript -- and all this adds is the edge that says the page has moved
 * underneath it.
 *
 * The attribute is only written when it changes. Setting `dataset.docked` to
 * the value it already holds still invalidates style for the element on every
 * frame, which is the cheap kind of waste that is only cheap until it is in a
 * scroll handler.
 */
function dockHeader() {
  const header = document.querySelector<HTMLElement>('[data-page-header]');
  if (!header) return;

  let docked: boolean | null = null;
  const apply = (y: number) => {
    const next = y > 8;
    if (next === docked) return;
    docked = next;
    header.dataset.docked = String(next);
  };

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => apply(self.scroll()),
    onRefresh: (self) => apply(self.scroll()),
  });
}

/**
 * The reveal, and it is the only motion the scroll drives.
 *
 * The band's own children stagger in rather than the band arriving as one
 * slab. That difference is most of the feel: a heading, then its sentence,
 * then the thing that proves it, 70ms apart, reads as the section assembling
 * itself in the order it is meant to be read. The slab version reads as a
 * fade, which is a transition and not an entrance.
 *
 * `once: true` because this is an arrival, not a parallax. A band that
 * replays its entrance every time the reader scrolls back up is a page that
 * will not sit still, and a reader who has scrolled back up is looking for
 * something they already saw.
 *
 * Only `y` and `opacity`. Both are composited, so the whole reveal runs off
 * the main thread; anything that changes the box -- height, margin, scale on
 * a flow element -- relayouts the page on every frame of it, on top of
 * whatever the scroll already costs.
 */
function revealBands() {
  for (const el of bands) {
    // The container, not the band: a band that bleeds to the viewport edge
    // (the aperture, the theme rail) has no container and runs an opening
    // sequence of its own, so the two kinds of motion cannot collide.
    const content = el.querySelector<HTMLElement>(':scope > .mq-container');
    if (!content) continue;

    // Its children, or the container itself when it has only one. `stagger`
    // over a single element is a stagger of nothing, and the extra wrapper it
    // would need is a wrapper for the benefit of an animation.
    const parts = content.children.length > 1 ? Array.from(content.children) : [content];

    gsap.from(parts, {
      opacity: 0,
      y: 18,
      duration: 0.7,
      // Out-eases only. Anything with an in-phase makes the element hesitate
      // before it moves, and a reveal that hesitates is a reveal you notice.
      ease: 'power3.out',
      stagger: 0.07,
      /*
       * `immediateRender: false` and `start: 'top bottom'` are one decision,
       * and getting either half wrong is visible.
       *
       * With `immediateRender` on (the default for a `from` tween carrying a
       * `scrollTrigger`) the start state is written the moment the tween is
       * built -- so every band below the fold sits at `opacity: 0` from load,
       * waiting. That is invisible while you scroll and very visible
       * everywhere else: print the page, screenshot it whole, or land on it
       * with the triggers mis-measured, and five of the seven sections are
       * blank cream. Content that exists only after a scroll event is content
       * that can go missing.
       *
       * Off, the elements are untouched until the trigger fires -- but then
       * the trigger must fire before any of the band can be seen, or its
       * first frame sets visible content to zero and pulls it back. Hence
       * `top bottom`: the exact moment the band's top edge reaches the
       * viewport's bottom edge, when zero pixels of it are on screen.
       *
       * The two together mean the page is never holding hidden content, and
       * the reveal is never seen starting.
       */
      immediateRender: false,
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        once: true,
      },
    });
  }
}

/**
 * The status line's two scroll jobs: which window you are in, and how far
 * through the page you are.
 *
 * Both come off one handler and neither reads the DOM. The ranges were
 * measured in `measure`; all that happens per frame is a number comparison
 * and, when it actually changed, one attribute write.
 */
function driveStatusLine() {
  const bar = document.querySelector<HTMLElement>('[data-statusline]');
  if (!bar) return;

  const links = Array.from(bar.querySelectorAll<HTMLAnchorElement>('a[data-section]'));
  let marked: string | null = null;

  const mark = (id: string | null) => {
    if (id === marked) return;
    marked = id;
    for (const link of links) {
      if (link.dataset.section === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      // A transform on the bar's rule, so the browser composites it instead
      // of laying anything out. See the note on `::before` in StatusLine.
      bar.style.setProperty('--mq-scroll-progress', self.progress.toFixed(4));

      const y = self.scroll();
      let current: string | null = null;
      for (const section of geometry.sections) {
        if (y >= section.from && y < section.to) current = section.id;
        else if (y >= section.to) current = current ?? null;
      }
      if (current === null) {
        // Above the first section, or in a gap between two: the last one
        // whose start has already passed.
        for (const section of geometry.sections) {
          if (y >= section.from) current = section.id;
        }
      }
      mark(current);
    },
  });

  /*
   * The bar's own links, tweened rather than jumped.
   *
   * `scroll-behavior: smooth` would have done this in one line and is
   * deliberately not set -- see the note in `base.css`. Doing it here instead
   * means the travel is the same ease as the settle, and a click that lands
   * mid-settle cancels it instead of racing it.
   */
  for (const link of links) {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const target = document.getElementById(link.dataset.section ?? '');
      if (!target) return;

      event.preventDefault();
      gsap.to(window, {
        duration: 0.6,
        ease: 'power2.inOut',
        scrollTo: { y: target, offsetY: geometry.rest },
        onComplete: () => {
          // The URL still has to change: this is navigation, and a reader who
          // copies the address after clicking `2:themes` must get the themes.
          history.replaceState(null, '', `#${target.id}`);
          // Focus follows the scroll, or the keyboard is still where it was
          // and the next Tab goes somewhere off screen.
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        },
      });
    });
  }
}

function start() {
  bands = Array.from(document.querySelectorAll<HTMLElement>('.mq-band'));
  sectionEls = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-statusline] a[data-section]'))
    .map((link) => document.getElementById(link.dataset.section ?? ''))
    .filter((el): el is HTMLElement => el !== null);

  measure();
  // Every refresh is a resize, a font swap or an image landing -- all of
  // which move the numbers above. ScrollTrigger recomputes its own triggers
  // at the same moment, so the two views of the page stay in step.
  ScrollTrigger.addEventListener('refresh', measure);

  dockHeader();
  driveStatusLine();

  /*
   * The two decorative halves, behind the preference that asks for less of
   * them. `matchMedia` rather than a plain `if`, so a reader who changes the
   * setting with the page open gets the change without a reload -- GSAP
   * reverts everything registered inside the block.
   */
  const motion = gsap.matchMedia();
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    revealBands();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}

/*
 * Fonts land after the first measurement and every band moves. Without this
 * the settle is aiming at where the sections were before the display face
 * arrived.
 */
document.fonts?.ready.then(() => ScrollTrigger.refresh());
