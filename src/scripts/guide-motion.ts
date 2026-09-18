/**
 * GSAP ScrollTrigger & Timeline choreographies for the Muqun Support & User Guide page.
 *
 * Provides:
 * 1. Hero entrance timeline on initial page load (badge, heading, lead, action buttons, chapter deck cards).
 * 2. Chapter pane bar timelines (dot pulse, rule line expansion, tag and meta slide-in).
 * 3. Section headings and card grids with bidirectional ScrollTrigger reverse animations.
 * 4. Respects `prefers-reduced-motion` to keep the page accessible.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initGuideMotion(): void {
  const hero = document.querySelector<HTMLElement>('.mq-guide-hero');
  if (!hero) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // 1. Hero entrance timeline
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    heroTl
      .from('.mq-guide-badge', {
        y: -14,
        opacity: 0,
        scale: 0.94,
        duration: 0.5,
        ease: 'back.out(1.5)',
      })
      .from(
        '.mq-guide-hero__title',
        {
          y: 26,
          opacity: 0,
          duration: 0.65,
        },
        '-=0.3'
      )
      .from(
        '.mq-guide-hero__lead',
        {
          y: 18,
          opacity: 0,
          duration: 0.55,
        },
        '-=0.35'
      )
      .from(
        '.mq-guide-hero__actions > *',
        {
          y: 16,
          opacity: 0,
          scale: 0.96,
          stagger: 0.08,
          duration: 0.45,
          ease: 'back.out(1.4)',
        },
        '-=0.3'
      )
      .from(
        '.mq-guide-deck__bar',
        {
          opacity: 0,
          x: -12,
          duration: 0.4,
        },
        '-=0.2'
      )
      .from(
        '.mq-deck-card',
        {
          y: 24,
          opacity: 0,
          scale: 0.97,
          stagger: 0.06,
          duration: 0.55,
          ease: 'power2.out',
        },
        '-=0.25'
      );

    // 2. Chapter Pane Bars & Section Headings (ScrollTrigger with Reverse animation)
    document.querySelectorAll<HTMLElement>('.mq-guide-pane-bar').forEach((bar) => {
      const dot = bar.querySelector<HTMLElement>('.mq-guide-pane-bar__dot');
      const tag = bar.querySelector<HTMLElement>('.mq-guide-pane-bar__tag');
      const rule = bar.querySelector<HTMLElement>('.mq-guide-pane-bar__rule');
      const meta = bar.querySelector<HTMLElement>('.mq-guide-pane-bar__meta');
      const container = bar.closest<HTMLElement>('.mq-container');
      const heading = container?.querySelector<HTMLElement>('.mq-section-heading');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bar,
          start: 'top 88%',
          end: 'bottom 10%',
          toggleActions: 'play reverse play reverse',
        },
      });

      if (dot) {
        tl.from(dot, { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)' });
      }
      if (tag) {
        tl.from(tag, { x: -16, opacity: 0, duration: 0.45, ease: 'power2.out' }, '-=0.25');
      }
      if (rule) {
        tl.from(
          rule,
          { scaleX: 0, transformOrigin: 'left center', duration: 0.55, ease: 'power3.out' },
          '-=0.3'
        );
      }
      if (meta) {
        tl.from(meta, { x: 16, opacity: 0, duration: 0.45, ease: 'power2.out' }, '-=0.4');
      }
      if (heading) {
        tl.from(heading, { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35');
      }
    });

    // 3. Pre-flight checklist box
    document.querySelectorAll<HTMLElement>('.mq-guide-preflight').forEach((el) => {
      const items = el.querySelectorAll('.mq-fact-list > li');
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        })
        .from(el, { y: 26, opacity: 0, duration: 0.55, ease: 'power2.out' })
        .from(
          items,
          {
            x: -14,
            opacity: 0,
            stagger: 0.07,
            duration: 0.45,
            ease: 'power2.out',
          },
          '-=0.3'
        );
    });

    // 4. Sequential Step blocks
    document.querySelectorAll<HTMLElement>('.mq-guide-steps-wrap').forEach((wrap) => {
      const steps = wrap.querySelectorAll('.mq-step');
      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top 85%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        })
        .from(steps, {
          y: 24,
          opacity: 0,
          stagger: 0.12,
          duration: 0.55,
          ease: 'power2.out',
        });
    });

    // 5. Tips Grid
    document.querySelectorAll<HTMLElement>('.mq-guide-tips-grid').forEach((grid) => {
      const cards = grid.querySelectorAll('.mq-guide-tip-card');
      gsap
        .timeline({
          scrollTrigger: {
            trigger: grid,
            start: 'top 86%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        })
        .from(cards, {
          y: 22,
          opacity: 0,
          scale: 0.98,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        });
    });

    // 6. Network Card
    document.querySelectorAll<HTMLElement>('.mq-guide-network-card').forEach((card) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        })
        .from(card, {
          y: 24,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.out',
        });
    });

    // 7. Terminal Split Layout (Cards + DeviceShot)
    document.querySelectorAll<HTMLElement>('.mq-guide-split').forEach((split) => {
      const cards = split.querySelectorAll('.mq-guide-card');
      const shot = split.querySelector('.mq-shot-frame');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: split,
          start: 'top 84%',
          end: 'bottom 12%',
          toggleActions: 'play reverse play reverse',
        },
      });

      tl.from(cards, {
        y: 22,
        opacity: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: 'power2.out',
      });

      if (shot) {
        tl.from(
          shot,
          {
            y: 32,
            x: 18,
            scale: 0.95,
            opacity: 0,
            duration: 0.7,
            ease: 'back.out(1.2)',
          },
          '-=0.45'
        );
      }
    });

    // 8. OpenCode Security Claim & Guarantees
    document
      .querySelectorAll<HTMLElement>('.mq-guide-security-claim, .mq-guide-guarantee')
      .forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          })
          .from(el, {
            y: 24,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.out',
          });
      });

    // 9. Config keys matrix table
    document.querySelectorAll<HTMLElement>('.mq-guide-keys-matrix').forEach((matrix) => {
      const rows = matrix.querySelectorAll('.mq-key-row');
      gsap
        .timeline({
          scrollTrigger: {
            trigger: matrix,
            start: 'top 85%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        })
        .from(matrix, { y: 24, opacity: 0, duration: 0.5, ease: 'power2.out' })
        .from(
          rows,
          {
            x: -12,
            opacity: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: 'power1.out',
          },
          '-=0.25'
        );
    });

    // 10. Generic Chapter Card Grids (Modes, Ports, Quick Checks)
    document.querySelectorAll<HTMLElement>('.mq-band .mq-grid').forEach((grid) => {
      const cards = grid.querySelectorAll('.mq-mode-card, .mq-port-card, .mq-guide-card');
      if (cards.length === 0) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: grid,
            start: 'top 86%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        })
        .from(cards, {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
        });
    });

    // 11. Manager Keymap Grid
    document.querySelectorAll<HTMLElement>('.mq-manager-keymap').forEach((keymap) => {
      const items = keymap.querySelectorAll('.mq-manager-keymap__item');
      gsap
        .timeline({
          scrollTrigger: {
            trigger: keymap,
            start: 'top 86%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        })
        .from(items, {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.45,
          ease: 'power2.out',
        });
    });

    // 12. Contact Card & Safety Panel
    document
      .querySelectorAll<HTMLElement>('.mq-guide-contact-card, .mq-guide-safety-panel')
      .forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          })
          .from(el, {
            y: 24,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.out',
          });
      });
  });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGuideMotion);
} else {
  initGuideMotion();
}
