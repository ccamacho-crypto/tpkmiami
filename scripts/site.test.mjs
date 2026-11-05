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
test('contact uses requested recipient and Web3Forms with honest acceptance messaging', () => {
  const config = JSON.parse(read('src/lib/contact-form.config.json')).forms.contact;
  assert.equal(config.overrideEmail,'totalpartykillmiami@gmail.com');
  assert.equal(config.provider,'Web3Forms');
  assert.match(config.accessKey,/^[a-f0-9-]{36}$/);
  const source=read('src/components/ContactForm.tsx');
  assert.match(source,/mailto:/);
  assert.match(source,/https:\/\/api.web3forms.com\/submit/);
  assert.match(source,/!response.ok \|\| result.success !== true/);
  assert.match(source,/Submission accepted by our email service/);
  assert.match(source,/inFlight.current/);
  assert.match(source,/controller.abort\(\)/);
  assert.ok(!source.includes('window.location.href'));
});
test('entry omits old platform scripts and preview is not indexed', () => {
  const source=read('index.html');
  assert.ok(!/airo-video|analytics\.js|airo-logo/.test(source));
  assert.match(source,/noindex, follow/);
  assert.match(source,/strict-origin-when-cross-origin/);
});

test('Shopify section sits directly before Photos and is linked in both navs', () => {
  const page = read('src/pages/index.tsx');
  assert.match(page, /import ShopSection from/);
  assert.match(page, /<ShopSection \/>\s*\{\/\*[\s═]*PHOTOS[\s═]*\*\/\}\s*<section\s+id="photos"/);
  for (const file of ['src/layouts/parts/Header.tsx', 'src/layouts/parts/Footer.tsx']) {
    assert.match(read(file), /label: 'Shop', href: '#shop'/);
  }
});

test('Shopify preview keeps checkout on the exact store and handles failure honestly', () => {
  const source = read('src/components/ShopSection.tsx');
  assert.match(source, /const STORE = 'https:\/\/tpkmiami\.myshopify\.com'/);
  assert.match(source, /id="shop"/);
  assert.match(source, /products\.json\?limit=12/);
  assert.match(source, /credentials: 'omit'/);
  assert.match(source, /controller\.abort\(\)/);
  assert.match(source, /Retry product preview/);
  assert.match(source, /rel="noopener noreferrer"/);
  assert.match(source, /url\.hostname === 'cdn\.shopify\.com'/);
  assert.ok(!/dangerouslySetInnerHTML|<iframe|accessToken|access_key/.test(source));
});

test('favicon uses the supplied logo asset under the correct Pages base path', () => {
  assert.match(read('index.html'), /type="image\/svg\+xml" href="%BASE_URL%favicon-tpk.svg"/);
  assert.match(read('public/favicon-tpk.svg'), /data:image\/png;base64,/);
});
