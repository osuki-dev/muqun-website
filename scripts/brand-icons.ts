/**
 * The site's icons, cut from the app's own launcher icon.
 *
 * The app icon that appears on a reader's home screen a minute after they
 * leave this site has to be the icon in the tab and on the share card, so
 * nothing here is drawn: every file is the app's compiled default icon
 * (`assets/icons/<catalog default directory>/icon.png` in the app repository,
 * Neon in 4.0) resized, masked or keyed.
 *
 *   bun scripts/brand-icons.ts                      # sibling checkout ../app
 *   MUQUN_APP_ICON=/path/to/icon.png bun scripts/brand-icons.ts
 *
 * Written into `public/`:
 *
 *   favicon-{16,32,48}.png        light tabs: the full-bleed tile, platform radius
 *   favicon-dark-{16,32,48}.png   dark tabs: the mark alone, ink keyed out
 *   favicon.ico                   the three light sizes, PNG-compressed entries
 *   apple-touch-icon.png          180, opaque; iOS applies its own mask
 *   app-icon-512.png              the icon itself, for the OG card and the themes mock
 *   muqun-mark.png                128, the rounded tile the app uses as its in-app mark
 *
 * `BaseLayout.astro` swaps the light and dark tab icons on the page theme.
 * After running this, render the share card: see `scripts/og-card.html`.
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/** Default: a sibling `app` checkout of the repository. */
const source =
  process.env.MUQUN_APP_ICON ??
  resolve(here, "../../app/assets/icons/mint/icon.png");
const out = (name: string) => resolve(here, "../public", name);

/** iOS's superellipse is close enough to this radius at tab sizes. */
const TILE_RADIUS = 0.2237;

/** The ink the Neon artwork sits on; `catalog.json` `light`/`dark` for the default entry. */
const INK = { r: 12, g: 16, b: 30 };

const base = sharp(source).removeAlpha();
const { width, height } = await base.metadata();
if (!width || !height || width !== height)
  throw new Error(`${source}: expected a square icon`);

async function opaque(size: number) {
  return base
    .clone()
    .resize(size, size, { kernel: "lanczos3" })
    .png()
    .toBuffer();
}

async function tile(size: number) {
  const r = Math.round(size * TILE_RADIUS);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}"/></svg>`,
  );
  return sharp(await opaque(size))
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

/**
 * The mark without its ground: alpha from each pixel's distance to the ink,
 * so the glow around the ribbons keeps a soft edge instead of a keyed fringe.
 * Keyed at full size, resized afterwards.
 */
async function mark(size: number) {
  const { data, info } = await base
    .clone()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, o = 0; i < data.length; i += info.channels, o += 4) {
    const r = data[i],
      g = data[i + 1],
      b = data[i + 2];
    const distance = Math.max(
      Math.abs(r - INK.r),
      Math.abs(g - INK.g),
      Math.abs(b - INK.b),
    );
    const alpha = Math.max(
      0,
      Math.min(255, Math.round(((distance - 6) * 255) / 40)),
    );
    rgba[o] = r;
    rgba[o + 1] = g;
    rgba[o + 2] = b;
    rgba[o + 3] = alpha;
  }
  return sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .resize(size, size, { kernel: "lanczos3" })
    .png()
    .toBuffer();
}

/** An .ico is a directory of images; PNG entries have been valid since Vista. */
function ico(entries: { size: number; png: Buffer }[]) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const directory = Buffer.alloc(16 * entries.length);
  let offset = header.length + directory.length;
  entries.forEach(({ size, png }, index) => {
    const at = index * 16;
    directory.writeUInt8(size >= 256 ? 0 : size, at);
    directory.writeUInt8(size >= 256 ? 0 : size, at + 1);
    directory.writeUInt8(0, at + 2);
    directory.writeUInt8(0, at + 3);
    directory.writeUInt16LE(1, at + 4);
    directory.writeUInt16LE(32, at + 6);
    directory.writeUInt32LE(png.length, at + 8);
    directory.writeUInt32LE(offset, at + 12);
    offset += png.length;
  });
  return Buffer.concat([
    header,
    directory,
    ...entries.map((entry) => entry.png),
  ]);
}

const favicons = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, png: await tile(size) })),
);
for (const { size, png } of favicons)
  await writeFile(out(`favicon-${size}.png`), png);
for (const size of [16, 32, 48])
  await writeFile(out(`favicon-dark-${size}.png`), await mark(size));
await writeFile(out("favicon.ico"), ico(favicons));
await writeFile(out("apple-touch-icon.png"), await opaque(180));
await writeFile(out("app-icon-512.png"), await opaque(512));
await writeFile(out("muqun-mark.png"), await tile(128));

console.log(`Wrote the site icons from ${source}`);
