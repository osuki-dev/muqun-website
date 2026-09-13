/**
 * Preview a `.muqun-theme` file from the reader's own disk.
 *
 * The file is unzipped and drawn in the browser; nothing is uploaded. This is
 * the fastest look an author gets at their work: pack it, drop it here, and
 * see exactly what the gallery would show, before anything is submitted.
 */
import { useCallback, useEffect, useRef, useState, type DragEvent } from 'react';

import type { ThemesCopy } from '@/i18n/themes';
import { useReveal } from '@/lib/theme-motion';
import { THEME_LIMITS, unpackTheme, type ThemePackage } from '@/lib/theme-package';

import ThemeShowcase from './theme-showcase';

interface Props {
  copy: ThemesCopy;
}

type State =
  | { status: 'idle' }
  | { status: 'reading' }
  | { status: 'ready'; pack: ThemePackage; name: string }
  | { status: 'failed'; message: string };

function release(pack: ThemePackage | undefined): void {
  for (const url of Object.values(pack?.assets ?? {})) URL.revokeObjectURL(url);
}

export default function ThemeDropzone({ copy }: Props) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const current = useRef<ThemePackage | undefined>(undefined);

  useEffect(() => () => release(current.current), []);

  const result = useRef<HTMLElement>(null);
  useReveal(result, '.themes-local__head', [state.status === 'ready' ? state.name : '']);

  const open = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      release(current.current);
      current.current = undefined;
      if (file.size > THEME_LIMITS.packageBytes) {
        setState({ status: 'failed', message: copy.local.failed });
        return;
      }
      setState({ status: 'reading' });
      try {
        const pack = await unpackTheme(new Uint8Array(await file.arrayBuffer()));
        current.current = pack;
        setState({ status: 'ready', pack, name: file.name });
      } catch (error) {
        setState({ status: 'failed', message: error instanceof Error ? error.message : String(error) });
      }
    },
    [copy.local.failed],
  );

  const onDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setOver(false);
    void open(event.dataTransfer.files[0]);
  };

  const clear = () => {
    release(current.current);
    current.current = undefined;
    if (input.current) input.current.value = '';
    setState({ status: 'idle' });
  };

  return (
    <div className="themes-local">
      <label
        className={`themes-local__zone${over ? ' themes-local__zone--over' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
      >
        <input
          ref={input}
          type="file"
          accept=".muqun-theme,application/zip"
          className="themes-local__input"
          onChange={(event) => void open(event.target.files?.[0])}
        />
        <span className="themes-button themes-button--primary">{copy.local.pick}</span>
        <span className="themes-local__hint">{copy.local.drop}</span>
      </label>

      {state.status === 'reading' && (
        <p className="themes-status" role="status">
          {copy.local.reading}
        </p>
      )}
      {state.status === 'failed' && (
        <p className="themes-status" role="status">
          {copy.local.failed} <span className="tp-mono">{state.message}</span>
        </p>
      )}
      {state.status === 'ready' && (
        <section ref={result} className="themes-local__result" aria-label={state.pack.manifest.name}>
          <header className="themes-local__head">
            <div>
              <h3 className="themes-local__name">{state.pack.manifest.name}</h3>
              <p className="themes-local__file tp-mono">
                {state.name} · {state.pack.manifest.id} · v{state.pack.manifest.version}
              </p>
            </div>
            <button type="button" className="themes-button" onClick={clear}>
              {copy.local.clear}
            </button>
          </header>
          <ThemeShowcase pack={state.pack} copy={copy} />
        </section>
      )}
    </div>
  );
}
