/** Public read-only views of the two product prefixes in the shared release bucket. */
type Product = 'desktop' | 'gateway';
const gatewayBinary = /^muqun-gateway-(?:aarch64|x86_64)-(?:apple-darwin|unknown-linux-musl)$/;

function archiveContentType(product: Product, version: string, archive: string): string | null {
  if (product === 'gateway') return gatewayBinary.test(archive) ? 'application/octet-stream' : null;
  if (archive === 'muqun-desktop-linux-x86_64.tar.gz') return 'application/gzip';
  if (archive === `muqun-desktop-${version}-macos-arm64.zip`) return 'application/zip';
  return null;
}

const versionPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-preview\.([1-9]\d*))?$/;

function jsonError(status: number, message: string, headers: Headers): Response {
  headers.set('Cache-Control', 'no-store');
  return Response.json({ error: message }, { status, headers });
}

async function desktopArchiveMetadata(
  request: Request, bucket: R2Bucket, headers: Headers, tag: string, version: string, archive: string,
): Promise<Response> {
  const object = await bucket.get(`desktop/releases/${tag}/manifest.json`);
  if (!object) return jsonError(404, 'release manifest not found', headers);
  if (object.size > 64 * 1024) throw new Error('oversized release manifest');
  const manifest = await object.json<{ tag?: unknown; version?: unknown; channel?: unknown; assets?: unknown }>();
  const channel = version.includes('-preview.') ? 'preview' : 'stable';
  if (manifest?.tag !== tag || manifest.version !== version || manifest.channel !== channel || !Array.isArray(manifest.assets)) {
    throw new Error('invalid release manifest');
  }
  const fields: string[] = [];
  for (const name of [archive, archive + '.sha256']) {
    const entries = manifest.assets.filter(entry => entry?.name === name);
    const entry = entries[0];
    const limit = name === archive ? 512 * 1024 ** 2 : 1024;
    if (entries.length !== 1 || !Number.isSafeInteger(entry.size) || entry.size < 1 || entry.size > limit ||
        typeof entry.sha256 !== 'string' || entry.sha256.length !== 64 || !/^[a-f0-9]+$/.test(entry.sha256)) {
      throw new Error('invalid release asset');
    }
    fields.push(String(entry.size), entry.sha256);
  }
  const body = fields.join(' ') + '\n';
  const etag = `"${object.etag}-${archive}"`;
  headers.set('ETag', etag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  if (request.headers.get('If-None-Match') === etag) return new Response(null, { status: 304, headers });
  headers.set('Content-Type', 'text/plain; charset=utf-8');
  headers.set('Content-Length', String(body.length));
  return new Response(request.method === 'HEAD' ? null : body, { headers });
}

export async function serveRelease(product: Product, request: Request, bucket: R2Bucket, headers: Headers): Promise<Response> {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    headers.set('Allow', 'GET, HEAD, OPTIONS');
    return jsonError(405, 'method not allowed', headers);
  }
  const path = new URL(request.url).pathname.slice(`/api/releases/${product}/`.length);
  const head = request.method === 'HEAD';
  try {
    const plainVersion = path === 'stable/version' || path === 'preview/version';
    const channel = plainVersion ? path.split('/')[0] : path;
    if (channel === 'stable' || channel === 'preview') {
      const object = await bucket.get(`${product}/channels/${channel}.json`);
      let version: string | null = null;
      if (object) {
        // A misplaced or malformed pointer is a failed check, never an empty channel.
        const pointer = await object.json<{ channel?: unknown; version?: unknown }>();
        const match = typeof pointer?.version === 'string' && versionPattern.exec(pointer.version);
        if (pointer?.channel !== channel || !match || match[0] !== pointer.version || Boolean(match[4]) !== (channel === 'preview')) {
          throw new Error('invalid release pointer');
        }
        version = match[0];
        headers.set('ETag', object.httpEtag);
      }
      if (plainVersion && !version) return jsonError(404, 'channel has no published release', headers);
      headers.set('Content-Type', plainVersion ? 'text/plain; charset=utf-8' : 'application/json; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=60, must-revalidate');
      if (object && request.headers.get('If-None-Match') === object.httpEtag) {
        return new Response(null, { status: 304, headers });
      }
      const body = plainVersion ? `${version}\n` : JSON.stringify({ channel, version });
      return new Response(head ? null : body, { headers });
    }

    const [tag, filename, ...extra] = path.split('/');
    const prefix = product === 'desktop' ? 'desktop-v' : 'v';
    const version = tag?.startsWith(prefix) ? tag.slice(prefix.length) : '';
    if (extra.length || !filename || !versionPattern.test(version)) return jsonError(404, 'not found', headers);
    if (product === 'desktop' && filename.endsWith('.metadata')) {
      const archive = filename.slice(0, -'.metadata'.length);
      if (!archiveContentType(product, version, archive)) return jsonError(404, 'not found', headers);
      return await desktopArchiveMetadata(request, bucket, headers, tag, version, archive);
    }
    const archive = filename.replace(/\.sha256$/, '');
    const manifest = filename === 'manifest.json';
    const archiveType = archiveContentType(product, version, archive);
    if (!manifest && !archiveType) return jsonError(404, 'not found', headers);

    const key = `${product}/releases/${tag}/${filename}`;
    const object = head ? await bucket.head(key) : await bucket.get(key);
    if (!object) return jsonError(404, 'release object not found', headers);
    headers.set('ETag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    if (request.headers.get('If-None-Match') === object.httpEtag) return new Response(null, { status: 304, headers });
    headers.set('Content-Type', manifest ? 'application/json; charset=utf-8' :
      filename.endsWith('.sha256') ? 'text/plain; charset=utf-8' :
      archiveType!);
    headers.set('Content-Length', String(object.size));
    if (!manifest) headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    return new Response('body' in object ? (object as R2ObjectBody).body : null, { headers });
  } catch {
    return jsonError(502, 'release metadata or storage unavailable', headers);
  }
}
