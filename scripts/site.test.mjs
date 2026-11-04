import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const home = JSON.parse(read('src/content/pages/home.json'));
const assets = JSON.parse(read('src/config/asset-map.json'));

test('all original schedule entries and content are retained', () => {
  assert.equal(home.schedule.events.length, 8);
  assert.equal(new Set(home.schedule.events.map(e => e.id)).size, 8);
  for (const e of home.schedule.events) for (const key of ['id','day','title','time','location']) assert.ok(e[key]);
  assert.match(home.hero.body, /21 & Over/);
});
test('all 26 local image assets exist with proper static-host extensions', () => {
  assert.equal(Object.keys(assets).length, 26);
  for (const [slot,path] of Object.entries(assets)) {
    assert.ok(slot.startsWith('/airo-assets/'));
    assert.match(path, /^\/media\/[a-zA-Z0-9/_.-]+\.webp$/);
    assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), path);
  }
});
test('navigation remains within repository subpath', () => {
  for (const file of ['src/layouts/parts/Header.tsx','src/layouts/parts/Footer.tsx']) {
    const source=read(file);
    assert.ok(!source.includes("href: '/#"));
    assert.ok(source.includes("href: '#schedule'"));
  }
});
test('contact uses explicit source recipient and makes no server delivery claim', () => {
  assert.equal(JSON.parse(read('src/lib/contact-form.config.json')).forms.contact.overrideEmail,'totalpartykillmiami@gmail.com');
  const source=read('src/components/ContactForm.tsx');
  assert.match(source,/mailto:/);
  assert.match(source,/encodeURIComponent\(body\)/);
  assert.match(source,/nothing has been sent/);
  assert.ok(!/fetch\(|axios|\/api\//.test(source));
});
test('entry omits old platform scripts and preview is not indexed', () => {
  const source=read('index.html');
  assert.ok(!/airo-video|analytics\.js|airo-logo/.test(source));
  assert.match(source,/noindex, follow/);
  assert.match(source,/strict-origin-when-cross-origin/);
});
