/**
 * The gallery's motion, in one place, on GSAP like the rest of the site.
 *
 * Two moves. `useReveal` brings a view in: its parts rise and fade in a short
 * stagger, so a detail, a switched variant or a dropped file reads as one
 * arrival rather than a flash. `leave` takes a view out and resolves when it
 * has gone, so a "back" can finish the motion before the DOM changes under
 * it. Both are no-ops under `prefers-reduced-motion: reduce`; the content is
 * simply there.
 */
import { gsap } from 'gsap';
import { useLayoutEffect, type DependencyList, type RefObject } from 'react';

const EASE_IN = 'power3.out';
const EASE_OUT = 'power2.in';

export function reducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Rise-and-fade the elements matching `selector` inside `root`, staggered,
 * every time `deps` change. Layout effect, so the first frame is already the
 * start of the tween and nothing flashes at full opacity first.
 */
export function useReveal(root: RefObject<HTMLElement | null>, selector: string, deps: DependencyList): void {
  useLayoutEffect(() => {
    const element = root.current;
    if (!element || reducedMotion()) return;
    const context = gsap.context(() => {
      gsap.from(element.querySelectorAll(selector), {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: EASE_IN,
        stagger: { each: 0.05, from: 'start' },
        clearProps: 'transform,opacity',
      });
    }, element);
    return () => context.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Fade-and-drop `element` out; resolves when it is gone (immediately under reduced motion). */
export function leave(element: HTMLElement | null): Promise<void> {
  if (!element || reducedMotion()) return Promise.resolve();
  return new Promise((resolve) => {
    gsap.to(element, { opacity: 0, y: 10, duration: 0.22, ease: EASE_OUT, onComplete: resolve });
  });
}
