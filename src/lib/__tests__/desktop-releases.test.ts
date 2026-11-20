import { expect, test } from 'bun:test';
import worker from '../../../worker/index';

const base = 'https://muqun.dev/api/releases/desktop/';
const tag = 'desktop-v1.4.3-preview.7';

function fixture(files: Record<string, string>, productUrl = base) {
  const bucket = {
    async head(key: string) {
      if (!Object.hasOwn(files, key)) return null;
      return { size: new TextEncoder().encode(files[key]).length, httpEtag: '"fixture"' };
    },
    async get(key: string) {
      const info = await this.head(key);
      return info && { ...info, body: new Response(files[key]).body, json: () => JSON.parse(files[key]) };
    },
  };
  return (path: string, init?: RequestInit) => worker.fetch(
    new Request(productUrl + path, init), { THEMES: bucket } as unknown as Parameters<typeof worker.fetch>[1],
    {} as ExecutionContext,
  );
}

test('empty channels, missing storage, and wrong-channel metadata have distinct results', async () => {
  const request = fixture({
    'desktop/channels/preview.json': JSON.stringify({ channel: 'preview', version: '1.4.3' }),
  });
  expect(await (await request('stable')).json() as {channel: string; version: string | null}).toEqual({ channel: 'stable', version: null });
  expect((await request('preview')).status).toBe(502);
  expect((await request('nightly')).status).toBe(404);
  expect((await request('stable', { method: 'POST' })).status).toBe(405);
  const brokenStorage = await worker.fetch(new Request(base + 'stable'),
    { THEMES: { get: async () => { throw new Error('R2 unavailable'); } } } as unknown as Parameters<typeof worker.fetch>[1],
    {} as ExecutionContext);
  expect(brokenStorage.status).toBe(502);
});

test('installer can resolve the channel, pinned manifest, archive and matching checksum from the shared bucket', async () => {
  const channel = { channel: 'preview', version: '1.4.3-preview.7' };
  const archive = 'muqun-desktop-linux-x86_64.tar.gz';
  const payload = 'desktop-fixture';
  const sha256 = new Bun.CryptoHasher('sha256').update(payload).digest('hex');
  const manifest = { ...channel, tag, assets: [{ name: archive, size: payload.length, sha256 }] };
  const request = fixture({
    'desktop/channels/preview.json': JSON.stringify(channel),
    [`desktop/releases/${tag}/manifest.json`]: JSON.stringify(manifest),
    [`desktop/releases/${tag}/${archive}`]: payload,
    [`desktop/releases/${tag}/${archive}.sha256`]: sha256 + '  ' + archive,
    [`desktop/releases/${tag}/secrets.json`]: 'hidden',
  });
  const latest = await (await request('preview')).json() as typeof channel;
  const pinned = await (await request(`desktop-v${latest.version}/manifest.json`)).json() as typeof manifest;
  const url = `${pinned.tag}/${pinned.assets[0].name}`;
  const binary = await request(url);
  expect(binary.status).toBe(200);
  expect(binary.headers.get('Content-Type')).toBe('application/gzip');
  expect(new Bun.CryptoHasher('sha256').update(await binary.arrayBuffer()).digest('hex')).toBe(pinned.assets[0].sha256);
  expect((await (await request(url + '.sha256')).text()).split(' ')[0]).toBe(sha256);
  const head = await request(url, { method: 'HEAD' });
  expect(head.headers.get('Content-Length')).toBe(String(payload.length));
  expect(await head.text()).toBe('');
  expect((await request(url, { headers: { 'If-None-Match': head.headers.get('ETag')! } })).status).toBe(304);
  expect((await request(`${tag}/secrets.json`)).status).toBe(404);
  expect((await request(`${tag}/muqun-desktop-1.3.0-macos-arm64.zip`)).status).toBe(404);
});

test('Gateway channels resolve independently and expose only Gateway release objects', async () => {
  const archive = 'muqun-gateway-aarch64-apple-darwin';
  const version = '1.4.3-preview.7';
  const gateway = fixture({
    'desktop/channels/stable.json': JSON.stringify({ channel: 'stable', version: '1.4.3' }),
    'gateway/channels/preview.json': JSON.stringify({ channel: 'preview', version }),
    [`gateway/releases/v${version}/${archive}`]: 'binary',
    [`gateway/releases/v${version}/${archive}.sha256`]: 'checksum',
    [`gateway/releases/v${version}/muqun-desktop-linux-x86_64.tar.gz`]: 'wrong product',
  }, 'https://muqun.dev/api/releases/gateway/');
  expect((await gateway('stable/version')).status).toBe(404);
  expect(await (await gateway('preview/version')).text()).toBe(version + '\n');
  const pointer = await (await gateway('preview')).json() as { channel: string; version: string };
  expect(pointer).toEqual({ channel: 'preview', version });
  const binary = await gateway(`v${version}/${archive}`);
  expect(binary.headers.get('Content-Type')).toBe('application/octet-stream');
  expect(await binary.text()).toBe('binary');
  expect(await (await gateway(`v${version}/${archive}.sha256`)).text()).toBe('checksum');
  expect((await gateway(`v${version}/muqun-desktop-linux-x86_64.tar.gz`)).status).toBe(404);
});
