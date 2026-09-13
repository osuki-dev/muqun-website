/**
 * A theme from an arbitrary URL, for the standalone preview route.
 *
 * Two shapes, told apart by the address:
 *
 *   https://host/path/theme.muqun-theme     a packed theme; one request
 *   https://host/path/                      a source folder: `theme.json`
 *                                           beside `assets/`, one request each
 *
 * The second is what `muqun-theme preview` will serve from a working copy,
 * so the page re-reads it on a timer. Every load returns a fingerprint of
 * the bytes it saw; when the caller passes the previous one back and nothing
 * has changed, the load answers `null` and the picture is left alone --
 * which is what keeps a 2-second poll from re-decoding fourteen images a
 * minute for a theme nobody is editing.
 *
 * Requests are cross-origin by definition, so the server has to allow them
 * (`Access-Control-Allow-Origin`). The CLI's own server will; a random file
 * host may not, and that failure is reported as what it is.
 */
import { parseThemeManifest, unpackTheme, type ThemePackage } from './theme-package';

export interface LoadedTheme {
  pack: ThemePackage;
  kind: 'package' | 'folder';
  /** Changes whenever any byte the theme is made of changes. */
  fingerprint: string;
}

export class ThemeSourceUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ThemeSourceUrlError';
  }
}

export function parseSourceUrl(value: string | null): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value, window.location.href);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : null;
  } catch {
    return null;
  }
}

async function digest(parts: (Uint8Array | string)[]): Promise<string> {
  const encoder = new TextEncoder();
  const chunks = parts.map((part) => (typeof part === 'string' ? encoder.encode(part) : part));
  const total = chunks.reduce((sum, chunk) => sum + chunk.length + 1, 0);
  const joined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.length + 1;
  }
  if (globalThis.crypto?.subtle) {
    const hash = await crypto.subtle.digest('SHA-256', joined);
    return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  // No SubtleCrypto (an insecure origin). Length plus a coarse checksum is
  // enough to notice an edit; it is not a security boundary.
  let sum = 0;
  for (const byte of joined) sum = (sum * 31 + byte) >>> 0;
  return `${joined.length}:${sum.toString(16)}`;
}

async function fetchBytes(url: URL, signal?: AbortSignal): Promise<Uint8Array> {
  const response = await fetch(url, { signal, cache: 'no-cache', mode: 'cors' });
  if (!response.ok) throw new ThemeSourceUrlError(`${url.pathname.split('/').pop()}: HTTP ${response.status}`);
  return new Uint8Array(await response.arrayBuffer());
}

function mimeFor(path: string): string {
  if (path.endsWith('.png')) return 'image/png';
  if (path.endsWith('.webp')) return 'image/webp';
  return 'image/jpeg';
}

export async function loadThemeFromUrl(
  source: URL,
  previous?: string,
  signal?: AbortSignal,
): Promise<LoadedTheme | null> {
  if (source.pathname.endsWith('.muqun-theme')) {
    const bytes = await fetchBytes(source, signal);
    const fingerprint = await digest([bytes]);
    if (fingerprint === previous) return null;
    return { pack: await unpackTheme(bytes), kind: 'package', fingerprint };
  }

  const base = new URL(source.href.endsWith('/') ? source.href : `${source.href}/`);
  const manifestResponse = await fetch(new URL('theme.json', base), { signal, cache: 'no-cache', mode: 'cors' });
  if (!manifestResponse.ok) throw new ThemeSourceUrlError(`theme.json: HTTP ${manifestResponse.status}`);
  const text = await manifestResponse.text();
  const manifest = parseThemeManifest(text);

  const files = await Promise.all(
    Object.entries(manifest.assets ?? {}).map(async ([id, asset]) => {
      const location = asset.path
        ? new URL(asset.path, base)
        : asset.url
          ? new URL(asset.url)
          : null;
      if (!location) throw new ThemeSourceUrlError(`asset ${id} has neither path nor url`);
      return { id, path: asset.path ?? location.pathname, bytes: await fetchBytes(location, signal) };
    }),
  );

  const fingerprint = await digest([text, ...files.map((file) => file.bytes)]);
  if (fingerprint === previous) return null;

  const assets: Record<string, string> = {};
  for (const file of files) {
    assets[file.id] = URL.createObjectURL(new Blob([file.bytes as BlobPart], { type: mimeFor(file.path) }));
  }
  return { pack: { manifest, assets }, kind: 'folder', fingerprint };
}

/** Free the object URLs of a theme that is no longer shown. */
export function releaseTheme(theme: LoadedTheme | null | undefined): void {
  for (const url of Object.values(theme?.pack.assets ?? {})) URL.revokeObjectURL(url);
}
