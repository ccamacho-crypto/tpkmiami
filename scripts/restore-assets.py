"""Restore the image slots referenced by the exported website from its live origin.
Run from the project root: python3 scripts/restore-assets.py
Only downloads public images; it does not submit forms or change the live site.
"""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://tpkmiami.com'
paths = set()
for source in (ROOT / 'src').rglob('*'):
    if source.suffix in {'.tsx', '.css'}:
        paths.update(re.findall(r'/airo-assets/(?:images|uploads)/[a-zA-Z0-9/_.-]+', source.read_text()))
# The header's logo can be assembled in JSX, so include the known live slot.
paths.add('/airo-assets/images/logo/horizontal')


def download(path):
    destination = ROOT / 'public' / path.lstrip('/')
    destination.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run([
        'curl', '--fail', '--location', '--silent', '--show-error',
        '--retry', '2', '--max-time', '60', '--user-agent', 'Mozilla/5.0',
        '--output', str(destination), '--write-out', '%{content_type}', ORIGIN + path,
    ], capture_output=True, text=True)
    if result.returncode:
        destination.unlink(missing_ok=True)
        return {'path': path, 'error': result.stderr.strip()}
    data = destination.read_bytes()
    content_type = result.stdout.strip()
    if not content_type.startswith('image/'):
        destination.unlink(missing_ok=True)
        return {'path': path, 'error': 'Not an image: ' + content_type}
    return {'path': path, 'source': ORIGIN + path, 'bytes': len(data),
            'contentType': content_type, 'sha256': hashlib.sha256(data).hexdigest()}


with ThreadPoolExecutor(max_workers=6) as pool:
    results = sorted(pool.map(download, sorted(paths)), key=lambda row: row['path'])
report = ROOT / 'verification' / 'assets.json'
report.parent.mkdir(exist_ok=True)
report.write_text(json.dumps(results, indent=2) + '\n')
for row in results:
    print(row['path'], row.get('bytes', row.get('error')))
failures = [row for row in results if 'error' in row]
print(f'{len(results) - len(failures)}/{len(results)} images restored')
raise SystemExit(bool(failures))
