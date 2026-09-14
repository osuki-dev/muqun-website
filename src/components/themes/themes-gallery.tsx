/**
 * The gallery: the index as cards, one theme opened at a time.
 *
 * Fetching happens here and nowhere else in the tree. The index is read once
 * on mount; a package is read the first time its preview is needed -- when
 * its card scrolls into view, or when it is opened -- and kept for the rest
 * of the visit in a module-level cache, so the detail view of a theme whose
 * card was already drawn costs nothing.
 *
 * Which theme is open is the URL fragment, `#grand-voyage`. That makes a
 * detail view a link someone can send, keeps back/forward working, and means
 * the page has no routing of its own: the browser's is enough.
 *
 * ── Why a card does not always fetch on sight ───────────────────────────────
 * A package may be 25 MiB. A gallery that downloads thirty of those because
 * the reader scrolled past them is a gallery that is unusable on a phone,
 * which is the device Muqun is for. So a card fetches unasked only under
 * `AUTO_LOAD_BYTES`; above it, the card shows the size and a button, and the
 * reader decides. The index carries `bytes` precisely so this decision can be
 * made without a request.
 * ────────────────────────────────────────────────────────────────────────────
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import type { ThemesCopy } from '@/i18n/themes';
import { leave, reducedMotion, useReveal, useScrollReveal } from '@/lib/theme-motion';
import { themePreviewUrl as packagePreviewUrl, unpackTheme, type ThemePackage } from '@/lib/theme-package';
import {
  loadThemeIndex,
  loadThemePackageBytes,
  themePackageUrl,
  themePreviewUrl,
  themeSourceUrl,
  type ThemeIndexEntry,
} from '@/lib/themes-source';

import DeviceMock from './device-mock';
import ThemeShowcase from './theme-showcase';

interface Props {
  locale: string;
  copy: ThemesCopy;
  repoUrl: string;
}

const AUTO_LOAD_BYTES = 4 * 1024 * 1024;

type IndexState =
  | { status: 'loading' }
  | { status: 'ready'; entries: ThemeIndexEntry[] }
  | { status: 'failed'; message: string };

type PackState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; pack: ThemePackage }
  | { status: 'failed'; message: string };

const packages = new Map<string, Promise<ThemePackage>>();

/**
 * ── Two downloads at a time ─────────────────────────────────────────────────
 * Seven cards in view, each fetching a 1.5-4 MB package at once, share the
 * link seven ways and all sit on "Reading the package…" for as long as the
 * slowest one; measured on a slow connection that was 10-25 s per card. Two
 * at a time, first come first served, and the first cards are drawn while
 * the rest are still queued. The map above stays the dedupe layer: a card
 * never asks twice, and the detail view of a card that already loaded costs
 * nothing. Cards whose preview the index names never come here at all.
 *
 * Only the fetch holds a slot; unpacking is CPU work and does not queue.
 * `urgent` puts a request at the front: the detail view asks for one package
 * the reader has just chosen, and it should not wait behind cards that have
 * scrolled away.
 * ────────────────────────────────────────────────────────────────────────────
 */
const PACKAGE_DOWNLOADS = 2;
let downloading = 0;
const queue: (() => void)[] = [];

function acquireDownload(urgent: boolean): Promise<void> {
  if (downloading < PACKAGE_DOWNLOADS) {
    downloading++;
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const start = () => {
      downloading++;
      resolve();
    };
    if (urgent) queue.unshift(start);
    else queue.push(start);
  });
}

function releaseDownload(): void {
  downloading--;
  queue.shift()?.();
}

async function fetchPackage(entry: ThemeIndexEntry, urgent: boolean): Promise<ThemePackage> {
  await acquireDownload(urgent);
  let bytes: Uint8Array;
  try {
    bytes = await loadThemePackageBytes(entry);
  } finally {
    releaseDownload();
  }
  return unpackTheme(bytes);
}

function loadPackage(entry: ThemeIndexEntry, urgent = false): Promise<ThemePackage> {
  let pending = packages.get(entry.id);
  if (!pending) {
    pending = fetchPackage(entry, urgent);
    // A failed fetch is not cached: the next attempt should be a real one.
    pending.catch(() => packages.delete(entry.id));
    packages.set(entry.id, pending);
  }
  return pending;
}

function usePackage(entry: ThemeIndexEntry | null, wanted: boolean, urgent = false): PackState {
  const [state, setState] = useState<PackState>({ status: 'idle' });
  useEffect(() => {
    if (!entry || !wanted) return;
    let cancelled = false;
    setState({ status: 'loading' });
    loadPackage(entry, urgent).then(
      (pack) => !cancelled && setState({ status: 'ready', pack }),
      (error: unknown) =>
        !cancelled && setState({ status: 'failed', message: error instanceof Error ? error.message : String(error) }),
    );
    return () => {
      cancelled = true;
    };
  }, [entry, wanted, urgent]);
  return state;
}

/**
 * Which theme is open is the path: `/themes/<id>/`, under whatever locale
 * prefix the page has. The Worker serves the gallery page for any such path,
 * so a detail link works cold; here it is read from the URL on load and on
 * back/forward, and written with `pushState` when a card is opened. An old
 * `#<id>` link still opens the theme, and is rewritten to its path.
 */
const THEME_ID = /^[a-z][a-z0-9-]*$/;
const THEME_PATH = /^((?:\/[a-z]{2}(?:-[A-Z]{2})?)?\/themes)(?:\/([a-z][a-z0-9-]*))?\/?$/;

function readRoute(): { base: string; id: string } {
  const match = THEME_PATH.exec(window.location.pathname);
  const base = match?.[1] ?? '/themes';
  const fromPath = match?.[2] ?? '';
  const fromHash = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  return { base, id: fromPath || (THEME_ID.test(fromHash) ? fromHash : '') };
}

function useRoute(): [string, (next: string) => void, string] {
  const [route, setRoute] = useState({ base: '/themes', id: '' });
  useEffect(() => {
    const read = () => {
      const next = readRoute();
      if (next.id && window.location.hash) history.replaceState(null, '', `${next.base}/${next.id}/`);
      setRoute(next);
    };
    read();
    window.addEventListener('popstate', read);
    window.addEventListener('hashchange', read);
    return () => {
      window.removeEventListener('popstate', read);
      window.removeEventListener('hashchange', read);
    };
  }, []);
  const navigate = useCallback(
    (id: string) => {
      const leaving = route.id;
      history.pushState(null, '', id ? `${route.base}/${id}/` : `${route.base}/`);
      flushSync(() => setRoute((current) => ({ ...current, id })));
      if (!id && leaving) {
        // Back lands on the card that was open, not on the top of the list.
        const card = document.querySelector(`.themes-card[data-theme-id="${leaving}"]`);
        card?.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' });
        card?.querySelector<HTMLAnchorElement>('.themes-card__name a')?.focus({ preventScroll: true });
      }
    },
    [route.base, route.id],
  );
  return [route.id, navigate, route.base];
}

/**
 * The package's address, onto the clipboard. Absolute, whatever the page's
 * own base is, because it is meant to be pasted somewhere else -- a chat, a
 * terminal, the app's import field once that exists.
 */
function CopyLinkButton({ url, label, done }: { url: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(new URL(url, window.location.href).href);
      setCopied(true);
    } catch {
      // Clipboard access refused: the download link beside it still carries the address.
    }
  };
  return (
    <button type="button" className="themes-button" onClick={() => void copy()} aria-live="polite">
      {copied ? done : label}
    </button>
  );
}

function useInView<T extends Element>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);
  return [ref, inView];
}

function formatBytes(bytes: number, locale: string): string {
  const mega = bytes >= 1_000_000;
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: mega ? 'megabyte' : 'kilobyte',
    maximumFractionDigits: mega ? 1 : 0,
  }).format(mega ? bytes / 1_000_000 : bytes / 1_000);
}

export default function ThemesGallery({ locale, copy, repoUrl }: Props) {
  const [index, setIndex] = useState<IndexState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [hash, navigate, base] = useRoute();

  useEffect(() => {
    const controller = new AbortController();
    setIndex({ status: 'loading' });
    loadThemeIndex(controller.signal).then(
      (entries) => setIndex({ status: 'ready', entries }),
      (error: unknown) => {
        if (controller.signal.aborted) return;
        setIndex({ status: 'failed', message: error instanceof Error ? error.message : String(error) });
      },
    );
    return () => controller.abort();
  }, [attempt]);

  const entries = index.status === 'ready' ? index.entries : [];
  const selected = useMemo(() => entries.find((entry) => entry.id === hash) ?? null, [entries, hash]);

  // The same search `muqun-theme list --search` does: a case-insensitive
  // substring over id, name, author, description and tags.
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      needle
        ? entries.filter((entry) =>
            [entry.id, entry.name, entry.author, entry.description, ...(entry.tags ?? [])]
              .filter((part): part is string => typeof part === 'string')
              .join('\n')
              .toLowerCase()
              .includes(needle),
          )
        : entries,
    [entries, needle],
  );

  if (index.status === 'loading') {
    return (
      <div className="themes-loading" aria-busy="true">
        <p className="themes-status" role="status">{copy.loading}</p>
        <div className="themes-grid" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => <div key={index} className="themes-loading__card" />)}
        </div>
      </div>
    );
  }

  if (index.status === 'failed') {
    return (
      <div className="themes-status" role="status">
        <p>{copy.failed}</p>
        <p className="themes-status__detail tp-mono">{index.message}</p>
        <p className="themes-status__actions">
          <button type="button" className="themes-button" onClick={() => setAttempt((n) => n + 1)}>
            {copy.retry}
          </button>
          <a className="themes-link" href={repoUrl}>
            {copy.repoCta} ↗
          </a>
        </p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="themes-status" role="status">
        <p>{copy.empty}</p>
        <p className="themes-status__actions">
          <a className="themes-link" href={repoUrl}>
            {copy.repoCta} ↗
          </a>
        </p>
      </div>
    );
  }

  // One theme open is its own page: the list waits behind "All themes" and
  // comes back scrolled to the card that was opened.
  if (selected) {
    return (
      <div className="themes">
        <ThemeDetail key={selected.id} entry={selected} locale={locale} copy={copy} onBack={() => navigate('')} />
      </div>
    );
  }

  return (
    <div className="themes">
      <div className="themes-toolbar">
        <p className="themes-count mq-mono-label" role="status" aria-live="polite">{copy.count.replace('{count}', String(visible.length))}</p>
        <input
          type="search"
          className="themes-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={copy.search}
          aria-label={copy.search}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      {visible.length === 0 && (
        <p className="themes-status" role="status">
          {copy.noMatch.replace('{query}', query.trim())}
        </p>
      )}
      <ul className="themes-grid">
        {visible.map((entry) => (
          <ThemeCard
            key={entry.id}
            entry={entry}
            locale={locale}
            copy={copy}
            current={entry.id === hash}
            href={`${base}/${entry.id}/`}
            onOpen={() => navigate(entry.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function ThemeCard({
  entry,
  locale,
  copy,
  current,
  href,
  onOpen,
}: {
  entry: ThemeIndexEntry;
  locale: string;
  copy: ThemesCopy;
  current: boolean;
  href: string;
  onOpen: () => void;
}) {
  const [ref, inView] = useInView<HTMLLIElement>();
  useScrollReveal(ref, ':scope', [entry.id]);
  const [asked, setAsked] = useState(false);
  // The index names the author's preview when the theme ships one, and then
  // the card needs no package at all: the image is one small request, and
  // the package waits until the theme is opened. A preview the index named
  // but the API could not serve falls back to the package, as for a theme
  // with none.
  const [imageFailed, setImageFailed] = useState(false);
  const indexPreview = imageFailed ? undefined : themePreviewUrl(entry);
  const wanted = !indexPreview && inView && (asked || entry.bytes <= AUTO_LOAD_BYTES);
  const pack = usePackage(entry, wanted);
  // An author's own picture stands in for the two phones when the pack ships one.
  const preview = indexPreview ?? (pack.status === 'ready' ? packagePreviewUrl(pack.pack) : undefined);

  return (
    <li ref={ref} className="themes-card" data-theme-id={entry.id} aria-current={current ? 'true' : undefined}>
      <div className={`themes-card__previews${preview ? ' themes-card__previews--image' : ''}`}>
        {preview ? (
          <img
            className="themes-card__preview"
            src={preview}
            alt={entry.name}
            loading="lazy"
            decoding="async"
            onError={indexPreview ? () => setImageFailed(true) : undefined}
          />
        ) : pack.status === 'ready' ? (
          (['light', 'dark'] as const).map((mode) => (
            <DeviceMock
              key={mode}
              pack={pack.pack}
              mode={mode}
              device="phone"
              screen="home"
              label={`${entry.name} · ${mode === 'light' ? copy.detail.light : copy.detail.dark} · ${copy.screens.phone} · ${copy.screens.home}`}
            />
          ))
        ) : (
          <div className="themes-card__placeholder">
            {pack.status === 'loading' && (
              // With the size: a wait that says "4 MB" reads as expected, not stuck.
              <span>
                {copy.card.loadingPreview} · {formatBytes(entry.bytes, locale)}
              </span>
            )}
            {pack.status === 'failed' && <span>{copy.card.previewFailed}</span>}
            {pack.status === 'idle' && !wanted && inView && (
              <button type="button" className="themes-button" onClick={() => setAsked(true)}>
                {copy.card.loadPreview.replace('{size}', formatBytes(entry.bytes, locale))}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="themes-card__body">
        <h3 className="themes-card__name">
          <a href={href} onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            onOpen();
          }}>
            {entry.name}
          </a>
        </h3>
        <p className="themes-card__meta tp-mono">
          {entry.id} · v{entry.version}
          {entry.author ? ` · ${entry.author}` : ''}
        </p>
        {entry.description && <p className="themes-card__description">{entry.description}</p>}
        {entry.tags && entry.tags.length > 0 && (
          <ul className="themes-tags">
            {entry.tags.map((tag) => (
              <li key={tag} className="themes-tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <p className="themes-card__actions">
          <button type="button" className="themes-button themes-button--primary" onClick={onOpen}>
            {copy.card.preview}
          </button>
          <a className="themes-link" href={themePackageUrl(entry)} download={`${entry.id}.muqun-theme`}>
            {copy.card.download} · {formatBytes(entry.bytes, locale)}
          </a>
        </p>
      </div>
    </li>
  );
}

/**
 * The picture a theme's author ships as its `preview`, whole, before the
 * mock-ups the site draws itself. Renders nothing for a pack without one.
 */
function AuthorPreview({ pack, name, caption }: { pack: ThemePackage; name: string; caption: string }) {
  const src = packagePreviewUrl(pack);
  const figure = useRef<HTMLElement>(null);
  useReveal(figure, ':scope > *', [src]);
  if (!src) return null;
  return (
    <figure ref={figure} className="themes-detail__preview">
      <img src={src} alt={name} decoding="async" />
      <figcaption className="showcase__caption">{caption}</figcaption>
    </figure>
  );
}

function ThemeDetail({
  entry,
  locale,
  copy,
  onBack,
}: {
  entry: ThemeIndexEntry;
  locale: string;
  copy: ThemesCopy;
  onBack: () => void;
}) {
  // Urgent: the reader chose this one, so it goes ahead of queued card loads.
  const pack = usePackage(entry, true, true);
  const region = useRef<HTMLElement>(null);
  // In: the header's parts and the variant switch rise in. Out: the whole
  // view fades before the list takes its place.
  useReveal(region, '.themes-detail__back, .themes-detail__head > *, .themes-detail__actions, .showcase__switch', [entry.id]);
  const back = () => void leave(region.current).then(onBack);
  const labels = copy.detail;

  useEffect(() => {
    region.current?.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
    region.current?.focus({ preventScroll: true });
  }, [entry.id]);

  const manifest = pack.status === 'ready' ? pack.pack.manifest : null;
  const facts: [string, string | undefined][] = [
    [labels.version, entry.version],
    [labels.author, entry.author ?? manifest?.author],
    [labels.license, entry.license ?? manifest?.license],
    [labels.minApp, entry.minAppVersion ?? manifest?.minAppVersion],
    [labels.size, formatBytes(entry.bytes, locale)],
    [labels.assets, entry.assets !== undefined ? String(entry.assets) : undefined],
  ];
  const tags = entry.tags ?? manifest?.tags ?? [];

  return (
    <section ref={region} className="themes-detail" tabIndex={-1} aria-labelledby="themes-detail-title">
      <p className="themes-detail__back">
        <button type="button" className="themes-link themes-link--button" onClick={back}>
          ← {labels.back}
        </button>
      </p>
      <header className="themes-detail__head">
        <div>
          <h3 id="themes-detail-title" className="themes-detail__name">
            {entry.name}
          </h3>
          <p className="themes-detail__id tp-mono">{entry.id}</p>
          {(entry.description ?? manifest?.description) && (
            <p className="themes-detail__description">{entry.description ?? manifest?.description}</p>
          )}
          {tags.length > 0 && (
            <ul className="themes-tags">
              {tags.map((tag) => (
                <li key={tag} className="themes-tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        <dl className="themes-facts">
          {facts.map(([label, value]) =>
            value ? (
              <div key={label} className="themes-facts__row">
                <dt>{label}</dt>
                <dd className="tp-mono">{value}</dd>
              </div>
            ) : null,
          )}
        </dl>
      </header>

      <p className="themes-detail__actions">
        <a className="themes-button themes-button--primary" href={themePackageUrl(entry)} download={`${entry.id}.muqun-theme`}>
          {labels.download}
        </a>
        <CopyLinkButton url={themePackageUrl(entry)} label={labels.copyLink} done={labels.copied} />
        <a className="themes-link" href={entry.source ?? manifest?.source ?? themeSourceUrl(entry)}>
          {labels.source} ↗
        </a>
      </p>
      <p className="themes-detail__install">{labels.install}</p>

      {pack.status === 'ready' ? (
        <>
          <AuthorPreview pack={pack.pack} name={entry.name} caption={labels.authorPreview} />
          <ThemeShowcase pack={pack.pack} copy={copy} />
        </>
      ) : (
        <p className="themes-status" role="status">
          {pack.status === 'failed' ? (
            <>
              {copy.card.previewFailed} <span className="tp-mono">{pack.message}</span>
            </>
          ) : (
            copy.card.loadingPreview
          )}
        </p>
      )}
    </section>
  );
}
