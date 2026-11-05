# Shopify integration and favicon

Shop is a separate section immediately above Photos, with desktop/mobile/footer navigation links. Current products load from https://tpkmiami.myshopify.com/products.json?limit=12 and store currency from /meta.json. The public read-only feed needs no key and omits credentials. Images use Shopify's CDN. Up to 12 products refresh on page load; an already-open tab is not continuously refreshed.

Product cards open the matching Shopify product page in a new tab. Customers choose size/variant, add to cart and check out there. This is an on-page product preview plus Shopify checkout handoff, not an iframe, embedded cart or custom payment flow. Final pricing, availability, shipping and taxes remain Shopify's responsibility. A direct Shop all link and retry remain available during feed errors, timeouts or empty catalogs.

The favicon uses the Commander's supplied TPK Miami logo, with excess transparent margin trimmed and original proportions retained in a self-contained 64px SVG image asset at public/favicon-tpk.svg. The HTML references it with the configured Pages base path.

Implementation: src/components/ShopSection.tsx; src/pages/index.tsx; src/layouts/parts/Header.tsx and Footer.tsx; src/styles/globals.css; index.html; public/favicon-tpk.svg.

Verification: 8 source/asset regression tests via npm test; production build via npm run build. Additional local Chromium checks cover live feed/products/images, five viewport widths, navigation, failure/retry, empty feed, unsafe values, unknown currency and timeout. Existing site/contact browser checks were rerun without sending email or placing an order.

No DNS, Shopify products/settings, payment settings or contact provider routing were changed. Publication target remains https://ccamacho-crypto.github.io/tpkmiami/#shop .
