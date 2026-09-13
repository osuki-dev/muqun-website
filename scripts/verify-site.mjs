import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const locales = ['en','zh-TW','ja','ko','de','fr','es','pt','zh-CN','ru','vi','th'];
let routes = 0;
for (const locale of locales) {
  const prefix = locale === 'en' ? '' : `${locale}/`;
  for (const page of ['','themes/','themes/preview/','support/','privacy/']) {
    const html = readFileSync(`dist/${prefix}${page}index.html`,'utf8');
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
    assert.match(html, /data-theme-mode="system"/);
    assert.ok(html.includes("prefers-color-scheme: dark"));
    assert.match(html, /class="[^"]*theme-menu/);
    assert.equal((html.match(/<h1\b/g)||[]).length, 1);
    for (const target of locales) {
      const href = `/${target === 'en' ? '' : `${target}/`}${page}`;
      assert.ok(html.includes(`href="${href}"`), `${locale}/${page}: missing language destination ${href}`);
    }
    if (!page) {
      assert.equal((html.match(/id="feature-[^"]+"/g)||[]).length, 9);
      assert.ok(html.includes('https://apps.apple.com/app/muqun/id6793419283'));
      assert.ok(html.includes('https://play.google.com/store/apps/details?id=dev.osuki.muqun'));
      assert.match(html,/data-copy/);
      assert.doesNotMatch(html,/<select\b|world-controls|world-poster|pocket-poster|\/pull\/58/);
      assert.ok(html.includes('data-code="curl -fsSL https://muqun.dev/gateway.sh | sh"'));
      for(const id of ['pocket','terminal','connect','anywhere'])assert.ok(html.includes(`id="${id}"`));
    }
    routes++;
  }
}
assert.ok(existsSync('dist/models/pocket-muqun.glb'));
assert.equal(readFileSync('dist/models/pocket-muqun.glb').subarray(0,4).toString(),'glTF');
console.log(`Verified ${routes} localized routes, ${locales.length} feature registries, download links, copy control, system theme and GLB.`);
