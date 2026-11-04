"""Package only the running site's source and assets, excluding platform internals/secrets."""
from pathlib import Path
import hashlib
import zipfile

root = Path(__file__).resolve().parents[1]
files = [
    '.gitignore', '.npmrc', 'README.md', 'package.json', 'package-lock.json',
    'vite.config.ts', 'tailwind.config.js', 'postcss.config.js', 'index.html',
    'src/App.tsx', 'src/main.tsx', 'src/pages/index.tsx',
    'src/styles/globals.css', 'src/lib/assets.ts', 'src/lib/utils.ts',
    'src/lib/contact-form.config.json', 'src/config/asset-map.json',
    'src/content/pages/home.json', 'src/components/ContactForm.tsx',
    'src/components/ui/carousel.tsx', 'src/components/ui/button.tsx',
    'src/layouts/parts/Header.tsx', 'src/layouts/parts/Footer.tsx',
    'public/favicon.ico', 'scripts/site.test.mjs', 'scripts/browser-check.py',
    'scripts/restore-assets.py', 'scripts/prepare-images.py', 'scripts/package-source.py',
    'verification/assets.json', 'verification/browser-results.json',
    'verification/npm-audit.json',
]
files += [p.relative_to(root).as_posix() for p in (root/'public/media').rglob('*.webp')]
output = root/'TPK-Miami-Source.zip'
with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as archive:
    for name in sorted(files):
        archive.write(root/name,name)
print('Archive:',output.name)
print('Files:',len(files),'Bytes:',output.stat().st_size)
print('SHA256:',hashlib.sha256(output.read_bytes()).hexdigest())
