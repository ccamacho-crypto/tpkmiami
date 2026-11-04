"""Convert restored extensionless image slots into static-host-safe WebP files.
Requires Pillow for this one-time preparation only; npm builds use committed files.
"""
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1]
records = json.loads((root / 'verification/assets.json').read_text())
mapping = {}
for record in records:
    source = root / 'public' / record['path'].lstrip('/')
    relative = record['path'].replace('/airo-assets/images/', '/media/') + '.webp'
    target = root / 'public' / relative.lstrip('/')
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        image.thumbnail((2400, 2400))
        image.save(target, 'WEBP', quality=90, method=6)
    mapping[record['path']] = relative
    print(relative, target.stat().st_size)
(root / 'src/config/asset-map.json').write_text(json.dumps(mapping, indent=2) + '\n')
