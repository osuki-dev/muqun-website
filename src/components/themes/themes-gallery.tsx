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

import type { ThemesCopy } from '@/i18n/themes';
import { unpackTheme, type ThemePackage } from '@/lib/theme-package';
import {
  loadThemeIndex,
  loadThemePackageBytes,
  themePackageUrl,
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

function loadPackage(entry: ThemeIndexEntry): Promise<ThemePackage> {
  let pending = packages.get(entry.id);
  if (!pending) {
    pending = loadThemePackageBytes(entry).then(unpackTheme);
    // A failed fetch is not cached: the next attempt should be a real one.
    pending.catch(() => packages.delete(entry.id));
    packages.set(entry.id, pending);
  }
  return pending;
}

function usePackage(entry: ThemeIndexEntry | null, wanted: boolean): PackState {
  const [state, setState] = useState<PackState>({ status: 'idle' });
  useEffect(() => {
    if (!entry || !wanted) return;
    let cancelled = false;
    setState({ status: 'loading' });
    loadPackage(entry).then(
      (pack) => !cancelled && setState({ status: 'ready', pack }),
      (error: unknown) =>
        !cancelled && setState({ status: 'failed', message: error instanceof Error ? error.message : String(error) }),
    );
    return () => {
      cancelled = true;
    };
  }, [entry, wanted]);
  return state;
}

function useHash(): [string, (next: string) => void] {
  const [hash, setHash] = useState('');
  useEffect(() => {
    const read = () => setHash(decodeURIComponent(window.location.hash.replace(/^#/, '')));
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);
  const navigate = useCallback((next: string) => {
    if (next) {
      window.location.hash = next;
    } else {
      history.pushState(null, '', window.location.pathname + window.location.search);
      setHash('');
    }
  }, []);
  return [hash, navigate];
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
  const [hash, navigate] = useHash();

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

  if (index.status === 'loading') {
    return (
      <p className="themes-status" role="status">
        {copy.loading}
      </p>
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

  return (
    <div className="themes">
      {selected && (
        <ThemeDetail key={selected.id} entry={selected} locale={locale} copy={copy} onBack={() => navigate('')} />
      )}
      <p className="themes-count mq-mono-label">{copy.count.replace('{count}', String(entries.length))}</p>
      <ul className="themes-grid">
        {entries.map((entry) => (
          <ThemeCard
            key={entry.id}
            entry={entry}
            locale={locale}
            copy={copy}
            current={entry.id === hash}
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
  onOpen,
}: {
  entry: ThemeIndexEntry;
  locale: string;
  copy: ThemesCopy;
  current: boolean;
  onOpen: () => void;
}) {
  const [ref, inView] = useInView<HTMLLIElement>();
  const [asked, setAsked] = useState(false);
  const wanted = inView && (asked || entry.bytes <= AUTO_LOAD_BYTES);
  const pack = usePackage(entry, wanted);

  return (
    <li ref={ref} className="themes-card" aria-current={current ? 'true' : undefined}>
      <div className="themes-card__previews">
        {pack.status === 'ready' ? (
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
            {pack.status === 'loading' && <span>{copy.card.loadingPreview}</span>}
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
          <a href={`#${entry.id}`} onClick={(event) => (event.preventDefault(), onOpen())}>
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
  const pack = usePackage(entry, true);
  const region = useRef<HTMLElement>(null);
  const labels = copy.detail;

  useEffect(() => {
    region.current?.scrollIntoView({ block: 'start' });
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
        <button type="button" className="themes-link themes-link--button" onClick={onBack}>
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
        <a className="themes-link" href={entry.source ?? manifest?.source ?? themeSourceUrl(entry)}>
          {labels.source} ↗
        </a>
      </p>
      <p className="themes-detail__install">{labels.install}</p>

      {pack.status === 'ready' ? (
        <ThemeShowcase pack={pack.pack} copy={copy} />
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
