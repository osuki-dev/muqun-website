/**
 * The standalone preview: one theme from a URL, drawn as the gallery draws it.
 *
 * `?source=` names the theme -- a `.muqun-theme` file or a folder holding
 * `theme.json` and `assets/` -- and `?refresh=` how often, in seconds, to
 * look for changes (default 2; `0` turns it off). Built for the CLI's
 * `muqun-theme preview`, which will serve a working copy on localhost and open
 * this address; nothing here knows about the CLI, only about a URL.
 *
 * Polling re-reads the source but only re-renders when the bytes differ
 * (`theme-source-url.ts` fingerprints them), and stands down while the tab is
 * hidden. Object URLs of a replaced theme are revoked once the new one is on
 * screen, so a long editing session does not accumulate images.
 */
import { useEffect, useRef, useState } from 'react';

import type { ThemesCopy } from '@/i18n/themes';
import { loadThemeFromUrl, parseSourceUrl, releaseTheme, type LoadedTheme } from '@/lib/theme-source-url';

import ThemeShowcase from './theme-showcase';

interface Props {
  locale: string;
  copy: ThemesCopy;
}

type State =
  | { status: 'idle' }
  | { status: 'no-source' }
  | { status: 'loading' }
  | { status: 'ready'; theme: LoadedTheme; updatedAt: Date; error?: string }
  | { status: 'failed'; message: string };

const DEFAULT_REFRESH_SECONDS = 2;

export default function ThemePreviewer({ locale, copy }: Props) {
  const [source, setSource] = useState<URL | null>(null);
  const [refresh, setRefresh] = useState(DEFAULT_REFRESH_SECONDS);
  const [state, setState] = useState<State>({ status: 'idle' });
  const current = useRef<LoadedTheme | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = parseSourceUrl(params.get('source'));
    const seconds = Number(params.get('refresh'));
    if (Number.isFinite(seconds) && seconds >= 0 && params.has('refresh')) setRefresh(seconds);
    setSource(url);
    setState(url ? { status: 'loading' } : { status: 'no-source' });
  }, []);

  useEffect(() => {
    if (!source) return;
    let cancelled = false;
    const controller = new AbortController();

    const load = async () => {
      if (busy.current || document.hidden) return;
      busy.current = true;
      try {
        const loaded = await loadThemeFromUrl(source, current.current?.fingerprint, controller.signal);
        if (cancelled || !loaded) return;
        const previous = current.current;
        current.current = loaded;
        setState({ status: 'ready', theme: loaded, updatedAt: new Date() });
        // After the swap has rendered, not before: revoking the old URLs
        // while they are still on screen blanks the pictures for a frame.
        setTimeout(() => releaseTheme(previous), 1000);
      } catch (error) {
        if (cancelled || controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : String(error);
        setState((prior) =>
          prior.status === 'ready' ? { ...prior, error: message } : { status: 'failed', message },
        );
      } finally {
        busy.current = false;
      }
    };

    void load();
    const timer = refresh > 0 ? window.setInterval(load, refresh * 1000) : undefined;
    return () => {
      cancelled = true;
      controller.abort();
      if (timer) window.clearInterval(timer);
    };
  }, [source, refresh]);

  const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="previewer">
      <dl className="previewer__facts">
        <div className="previewer__row">
          <dt>{copy.preview.source}</dt>
          <dd className="tp-mono">{source ? source.href : '—'}</dd>
        </div>
        {state.status === 'ready' && (
          <div className="previewer__row">
            <dt>{copy.preview.updated}</dt>
            <dd className="tp-mono">
              {time.format(state.updatedAt)} · {state.theme.pack.manifest.name} v{state.theme.pack.manifest.version}
              {state.error && <span className="previewer__error"> · {state.error}</span>}
            </dd>
          </div>
        )}
      </dl>
      {source && (
        <label className="previewer__refresh">
          <input
            type="checkbox"
            checked={refresh > 0}
            onChange={(event) => setRefresh(event.target.checked ? DEFAULT_REFRESH_SECONDS : 0)}
          />
          <span>{copy.preview.refresh}</span>
        </label>
      )}

      {state.status === 'no-source' && (
        <p className="themes-status" role="status">
          {copy.preview.noSource}
        </p>
      )}
      {state.status === 'loading' && (
        <p className="themes-status" role="status">
          {copy.preview.loading}
        </p>
      )}
      {state.status === 'failed' && (
        <div className="themes-status" role="status">
          <p>{copy.preview.failed}</p>
          <p className="themes-status__detail tp-mono">{state.message}</p>
        </div>
      )}
      {state.status === 'ready' && <ThemeShowcase pack={state.theme.pack} copy={copy} />}
    </div>
  );
}
