import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ThemeAmbientEffect, ThemeColors, ThemeEffects } from '@/lib/theme-package';
import { AmbientCircuitLines } from './ambient-circuit-lines';

type EffectColors = Pick<ThemeColors, 'primary' | 'text' | 'textMuted' | 'warning' | 'info' | 'success'>;

export function AmbientEffect({
  effect,
  intensity = 0.5,
  speed = 1,
  density = 1,
  size = 1,
  palette,
  direction,
  colors,
}: Omit<ThemeEffects, 'ambient'> & { effect: ThemeAmbientEffect; colors: EffectColors }) {
  const overlay = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ width: 390, height: 844 });
  useEffect(() => {
    if (!overlay.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setFrame({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(overlay.current);
    return () => observer.disconnect();
  }, [effect, intensity, density]);
  useEffect(() => {
    const sync = () => overlay.current?.setAttribute('data-paused', String(document.hidden || speed === 0));
    sync();
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [speed, effect, intensity, density]);
  if (effect === 'none' || intensity <= 0 || (effect !== 'bloom' && density <= 0)) return null;
  const fallback =
    effect === 'rain' || effect === 'dust'
      ? colors.textMuted
      : effect === 'particles' || effect === 'bloom'
        ? colors.primary
        : effect === 'embers'
          ? colors.warning
          : colors.text;
  const inks = palette?.length ? palette.map((role) => colors[role]) : [fallback];
  const rate = Math.max(0.01, Math.min(2, speed));
  const count = Math.ceil(
    Math.max(0, Math.min(1, density)) * (effect === 'rain' ? 32 : effect === 'scanlines' ? 10 : 16),
  );
  const scale = Math.max(0.5, Math.min(2, size));
  const heading =
    direction ?? (effect === 'rain' ? 'down-right' : effect === 'snow' || effect === 'particles' ? 'down' : 'up');
  const dx = heading.includes('left') ? -1 : heading.includes('right') ? 1 : 0;
  const dy = heading.includes('up') ? -1 : heading.includes('down') ? 1 : 0;
  const period =
    (effect === 'rain' ? 2 : effect === 'dust' ? 18 : effect === 'embers' ? 12 : effect === 'stars' ? 8 : 16) / rate;
  return (
    <div
      ref={overlay}
      data-paused={speed === 0}
      className={`dm-ambient dm-ambient--${effect}`}
      style={{ opacity: intensity, '--ambient-rate': rate, '--ambient-accent': inks[0] } as CSSProperties}
      aria-hidden="true"
    >
      {effect === 'scanlines' ? (
        <AmbientCircuitLines
          width={frame.width}
          height={frame.height}
          colors={colors}
          count={count}
          size={scale}
          palette={palette?.length ? inks : undefined}
        />
      ) : effect === 'bloom' ? (
        <div
          className="dm-bloom"
          style={{ transform: `scale(${scale})`, '--ambient-secondary': inks[1] ?? inks[0] } as CSSProperties}
        />
      ) : (
        Array.from({ length: count }, (_, i) => {
          const seedX = 0.06 + (((i * 137.5) % 100) / 100) * 0.88;
          const seedY = ((i * 73.1) % 100) / 100;
          const travelX = dx * frame.width;
          const travelY = dy * frame.height;
          const fromX =
            dx && dy
              ? (seedX - (dx > 0 ? 0.5 : -0.5)) * frame.width
              : dx
                ? dx > 0
                  ? -8
                  : frame.width + 8
                : seedX * frame.width;
          const fromY = dy ? (dy > 0 ? -8 : frame.height + 8) : seedY * frame.height;
          const radius = (effect === 'snow' ? 1.2 + (i % 3) * 0.7 : 0.8 + (i % 3) * 0.45) * scale;
          return (
            <span
              key={i}
              className={`dm-effect-track${effect === 'stars' ? ' dm-effect-track--star' : ''}`}
              style={
                {
                  '--from-x': `${effect === 'stars' ? seedX * frame.width : fromX}px`,
                  '--from-y': `${effect === 'stars' ? seedY * frame.height : fromY}px`,
                  '--to-x': `${fromX + travelX}px`,
                  '--to-y': `${fromY + travelY}px`,
                  animationDuration: `${period}s`,
                  animationDelay: `${-seedY * period}s`,
                } as CSSProperties
              }
            >
              <span
                className="dm-mote"
                style={
                  {
                    background: inks[i % inks.length],
                    width: effect === 'rain' ? `${scale}px` : `${radius * 2}px`,
                    height: effect === 'rain' ? `${20 * scale}px` : `${effect === 'particles' ? radius : radius * 2}px`,
                    ['--mote-drift' as string]: `${(4 + (i % 4) * 3) * (effect === 'embers' ? 0.6 : 1)}px`,
                    animationDuration: `${period}s`,
                    animationDelay: `${-seedY * period}s`,
                    ...(effect === 'rain'
                      ? { animation: 'none', transform: `rotate(${(-Math.atan2(dx, dy) * 180) / Math.PI}deg)` }
                      : effect === 'stars'
                        ? { animation: 'none' }
                        : {}),
                  } as CSSProperties
                }
              />
            </span>
          );
        })
      )}
    </div>
  );
}
