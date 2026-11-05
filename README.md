# Total Party Kill! Miami

A self-contained static React restoration of the supplied site export, preserving the original comic-book design, event schedule, photo carousels and TPKTV embeds.

## Run

Requires Node 22+ and npm.

```sh
npm ci
npm test
npm run build
npm run preview
```

Default preview: http://127.0.0.1:4173/tpkmiami/ . Development: `npm run dev`.

## Hosting

Repository: https://github.com/ccamacho-crypto/tpkmiami

GitHub Pages: https://ccamacho-crypto.github.io/tpkmiami/

The normal Pages workflow runs tests and builds `dist` on pushes to main. GitHub Settings > Pages source is GitHub Actions. No CNAME or DNS change is included; https://tpkmiami.com remains the original site. `VITE_BASE_PATH=/` can be set for a future root-domain deployment, after that deployment is explicitly chosen. The preview has `noindex` and retains the original site's canonical URL to avoid competing with the original.

## Edit

- Event details and page copy: `src/content/pages/home.json`
- Page layout and videos: `src/pages/index.tsx`
- Header/footer: `src/layouts/parts/`
- Colors and typography: `src/styles/globals.css`
- Images: `public/media/`, mapped by `src/config/asset-map.json`
- Public contact recipient: `src/lib/contact-form.config.json`

All 26 referenced image slots were retrieved from the live site and saved locally, then converted to WebP. Builds do not depend on the original media API. Source provenance and hashes are recorded in `verification/assets.json`.

## Contact behavior — Web3Forms direct submission

The form posts to Web3Forms without opening an email app. The recipient and fallback address are **totalpartykillmiami@gmail.com**. On November 4, 2026, this linked email was verified in Web3Forms, selected as the sole recipient for TPK Miami Contact Form, saved and read back after a reload. The public access key identifies that form; changing the fallback address alone does not change provider routing.

Browser mocks verify behavior, not live delivery. The website confirms provider acceptance only; inbox receipt requires confirmation by the inbox owner. See `verification/contact-update.md` for deployment and live-test evidence.

The form preserves messages on failures/timeouts, prevents concurrent submissions, has a honeypot and displays provider acceptance rather than guaranteed delivery. Visitor contact details pass through Web3Forms; the form includes a privacy link. The access key is intentionally public, not a Gmail or private account credential. See https://docs.web3forms.com/getting-started/installation .

## External services and privacy

The old platform analytics and runtime scripts are removed. Google Fonts and three YouTube embeds remain external services and can make third-party requests. The photo gallery is a fixed local set, not a live Instagram feed; Instagram profile links remain functional. This version does not claim an all-services consent gate. Video availability remains controlled by YouTube. No email service credential or private environment file is needed.

## Verification

`npm test`: five source/asset regression tests.

`npm run build`: production Vite build.

`npm audit`: dependency advisory check; see saved audit result.

`python scripts/browser-check.py` (Python Playwright installed): actual Chrome tests, image decoding, eight events, flyer navigation, anchor refresh, contact markup, video embeds and 390/768/1024/1440px layouts. Set `TEST_URL` to test a deployed copy. This test does not send email or prove video playback/email delivery.

## One-time import

A temporary source ZIP and an import workflow may be used to transfer the reviewed source and binary media into the repository. The import verifies the archive hash, rejects traversal/symlinks/unapproved paths, commits restored files, removes the transport ZIP, and deploys the same build. Future changes use the regular Pages workflow. This is a one-time repository import, not a recurring scheduled job.
