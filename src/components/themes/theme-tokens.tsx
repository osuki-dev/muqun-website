/**
 * One variant's tokens, listed: every colour by name with its hex, the
 * terminal palette, and the decoration slots and icons the pack resolves in
 * this mode. The secondary section under the device mock-ups -- what the
 * pictures are made of, for a reader who wants to know which value to change.
 */
import type { ReactNode } from 'react';

import type { ThemesCopy } from '@/i18n/themes';
import {
  cssColor,
  declaredSlots,
  resolveThemeImage,
  type ThemeColorKey,
  type ThemeImage,
  type ThemeMode,
  type ThemePackage,
} from '@/lib/theme-package';

interface Props {
  pack: ThemePackage;
  mode: ThemeMode;
  labels: ThemesCopy['detail'];
}

const SURFACE_KEYS: ThemeColorKey[] = ['background', 'surface', 'surfaceRaised', 'border', 'borderStrong'];
const TEXT_KEYS: ThemeColorKey[] = ['text', 'textMuted', 'textSubtle', 'textDisabled'];
const ACCENT_KEYS: ThemeColorKey[] = ['primary', 'onPrimary', 'primarySubtle', 'danger', 'dangerSubtle', 'success', 'warning', 'info'];

function artStyle(url: string, image: ThemeImage) {
  const fit = image.fit ?? 'cover';
  return {
    backgroundImage: `url("${url}")`,
    backgroundSize: fit === 'tile' ? 'auto' : fit,
    backgroundRepeat: fit === 'tile' ? 'repeat' : 'no-repeat',
    backgroundPosition: `${Math.round((image.focalPoint?.x ?? 0.5) * 100)}% ${Math.round((image.focalPoint?.y ?? 0.5) * 100)}%`,
    opacity: image.opacity ?? 1,
  };
}

function Swatch({ name, value, on }: { name: string; value: string; on: string }) {
  return (
    <li className="tp-swatch">
      <span className="tp-swatch__chip" style={{ background: cssColor(value), borderColor: on }} aria-hidden="true" />
      <span className="tp-swatch__name">{name}</span>
      <span className="tp-swatch__hex">{value.toUpperCase()}</span>
    </li>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="tp-section">
      <h5 className="tp-section__title">{title}</h5>
      {children}
    </section>
  );
}

export default function ThemeTokens({ pack, mode, labels }: Props) {
  const { manifest } = pack;
  const variant = manifest.variants[mode];
  const { colors, terminal } = variant;

  const slots = declaredSlots(manifest)
    .map((slot) => ({ slot, image: resolveThemeImage(manifest, slot, mode, 'compact') }))
    .filter((entry): entry is { slot: string; image: ThemeImage } => Boolean(entry.image && pack.assets[entry.image.asset]));
  const icons = Object.entries(manifest.icons ?? {}).filter(([, icon]) => icon && pack.assets[icon.asset]);

  return (
    <div className="tp-detail">
      <Section title={labels.surfaces}>
        <ul className="tp-swatches">
          {SURFACE_KEYS.map((key) => <Swatch key={key} name={key} value={colors[key]} on={colors.borderStrong} />)}
        </ul>
        {variant.surfaces?.backgroundOpacity !== undefined && (
          <p className="tp-note">{labels.surfaceOpacity} <span className="tp-mono">{variant.surfaces.backgroundOpacity}</span></p>
        )}
      </Section>

      <Section title={labels.text}>
        <ul className="tp-text-samples" style={{ background: colors.surface, borderColor: colors.border }}>
          {TEXT_KEYS.map((key) => (
            <li key={key} className="tp-text-sample" style={{ color: colors[key] }}>
              <span>{key}</span>
              <span className="tp-swatch__hex">{colors[key].toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={labels.accents}>
        <ul className="tp-swatches">
          {ACCENT_KEYS.map((key) => <Swatch key={key} name={key} value={colors[key]} on={colors.borderStrong} />)}
        </ul>
      </Section>

      <Section title={labels.terminal}>
        <ul className="tp-swatches">
          {(['background', 'foreground', 'cursor', 'link', 'selection'] as const).map((key) => (
            <Swatch key={key} name={key} value={terminal[key]} on={colors.borderStrong} />
          ))}
        </ul>
        {terminal.backgroundOpacity !== undefined && (
          <p className="tp-note">{labels.terminalOpacity} <span className="tp-mono">{terminal.backgroundOpacity}</span></p>
        )}
        <h6 className="tp-section__sub">{labels.ansi}</h6>
        <ul className="tp-ansi-list" style={{ background: terminal.background }}>
          {terminal.ansi.map((color, index) => (
            <li key={index} className="tp-ansi-list__item" style={{ color }}>
              <span className="tp-ansi-list__chip" style={{ background: color }} aria-hidden="true" />
              <span className="tp-mono">{String(index).padStart(2, '0')} {color.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={labels.decorations}>
        {slots.length === 0 ? (
          <p className="tp-note">{labels.noArtwork}</p>
        ) : (
          <ul className="tp-slots">
            {slots.map(({ slot, image }) => (
              <li key={slot} className="tp-slot">
                <span className="tp-slot__thumb" style={{ background: colors.surface }}>
                  <span className="tp-slot__art" style={artStyle(pack.assets[image.asset]!, image)} />
                </span>
                <span className="tp-slot__name">{slot}</span>
                <span className="tp-slot__meta">
                  {image.asset} · {image.fit ?? 'cover'}{image.opacity !== undefined ? ` · ${image.opacity}` : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {icons.length > 0 && (
        <Section title={labels.icons}>
          <ul className="tp-slots">
            {icons.map(([name, icon]) => {
              const url = pack.assets[icon!.asset]!;
              const template = (icon!.render ?? 'template') === 'template';
              return (
                <li key={name} className="tp-slot">
                  <span className="tp-slot__thumb" style={{ background: colors.surface, borderColor: colors.border }}>
                    {template ? (
                      <span
                        className="tp-slot__glyph"
                        style={{ WebkitMaskImage: `url("${url}")`, maskImage: `url("${url}")`, backgroundColor: colors.text }}
                      />
                    ) : (
                      <img className="tp-slot__glyph" src={url} alt="" />
                    )}
                  </span>
                  <span className="tp-slot__name">{name}</span>
                  <span className="tp-slot__meta">{icon!.asset} · {icon!.render ?? 'template'}</span>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </div>
  );
}
