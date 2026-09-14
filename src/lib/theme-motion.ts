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

/** Reveal only the visible batch; long pages never wait for an offscreen stagger. */
export function useScrollReveal(root: RefObject<HTMLElement | null>, selector: string, deps: DependencyList): void {
  useLayoutEffect(() => {
    const element = root.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = selector === ':scope' ? [element] : Array.from(element.querySelectorAll<HTMLElement>(selector));
      const pending = new Set(targets);
      gsap.set(targets, { opacity: 0, y: 18 });
      const timelines = new Set<gsap.core.Timeline>();
      const reveal = (batch: HTMLElement[]) => {
        if (!batch.length) return;
        const timeline = gsap.timeline({ defaults: { duration: 0.48, ease: EASE_IN } });
        timelines.add(timeline);
        batch.forEach((target, index) => {
          pending.delete(target);
          observer.unobserve(target);
          timeline.to(target, { opacity: 1, y: 0, clearProps: 'transform,opacity' }, Math.min(index * 0.06, 0.18));
        });
      };
      const observer = new IntersectionObserver((entries) => {
        reveal(entries.filter((entry) => entry.isIntersecting && pending.has(entry.target as HTMLElement)).map((entry) => entry.target as HTMLElement));
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
      targets.forEach((target) => observer.observe(target));
      const onFocus = (event: FocusEvent) => {
        reveal([...pending].filter((target) => target.contains(event.target as Node)));
        timelines.forEach((timeline) => timeline.progress(1));
      };
      element.addEventListener('focusin', onFocus);
      return () => {
        observer.disconnect();
        element.removeEventListener('focusin', onFocus);
        timelines.forEach((timeline) => timeline.kill());
        gsap.set(targets, { clearProps: 'transform,opacity' });
      };
    }, element);
    return () => media.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

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
        duration: 0.32,
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
    gsap.to(element, { opacity: 0, y: 10, duration: 0.22, ease: EASE_OUT, overwrite: true, onComplete: resolve, onInterrupt: resolve });
  });
}
