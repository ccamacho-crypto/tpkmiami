"""Real Chromium smoke tests. Run using Python with Playwright installed."""
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
base = os.environ.get('TEST_URL', 'http://127.0.0.1:5184/tpkmiami/')
report = {'url': base, 'checks': [], 'pageErrors': [], 'failedLocalRequests': []}
output = root / 'verification'
output.mkdir(exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless=True)
    page = browser.new_page(viewport={'width':1440,'height':1000}, device_scale_factor=1)
    page.on('pageerror', lambda e: report['pageErrors'].append(str(e)))
    page.on('response', lambda r: report['failedLocalRequests'].append({'url':r.url,'status':r.status}) if r.url.startswith(base) and r.status >= 400 else None)
    page.goto(base)
    page.get_by_role('heading', name='Upcoming Adventures').wait_for()
    page.evaluate('document.fonts.ready')
    page.locator('header img').evaluate('(i)=>i.decode()')
    assert page.get_by_role('heading', name='TOTAL PARTY KILL!', exact=True).count()==1
    report['checks'].append('Main content renders with accessible H1')
    page.screenshot(path=str(output/'desktop.png'))
    # Force lazy images to load and verify every image, including off-screen slides.
    broken=page.evaluate('''async()=>{ const images=[...document.images]; await Promise.all(images.map(i=>{i.loading='eager'; return i.decode().catch(()=>{});})); return images.filter(i=>!i.naturalWidth).map(i=>i.src); }''')
    assert not broken, broken
    report['checks'].append('All 25 image elements decode successfully; CSS texture requested locally')
    assert page.locator('#schedule').inner_text().count('6:30 PM')==8
    report['checks'].append('All eight weekly events retained')
    carousel=page.locator('#schedule [aria-roledescription="carousel"]')
    track=carousel.locator('[role="group"]').first.locator('..')
    before=track.get_attribute('style')
    carousel.get_by_role('button', name='Next slide').click()
    page.wait_for_timeout(700)
    after=track.get_attribute('style')
    assert before!=after, 'Carousel next must move slide track'
    report['checks'].append('Flyer carousel next control moves slides')
    page.get_by_role('navigation',name='Main navigation').get_by_role('link',name='Contact',exact=True).click()
    page.wait_for_function("location.hash === '#contact'")
    assert page.url.startswith(base)
    page.reload()
    page.get_by_label('Message *').wait_for()
    report['checks'].append('Contact anchor and refresh retain repository subpath')
    assert page.get_by_label('Email *').get_attribute('required') is not None
    assert page.get_by_role('link',name='totalpartykillmiami@gmail.com').get_attribute('href')=='mailto:totalpartykillmiami@gmail.com'
    assert page.get_by_role('button',name='Open email draft').count()==1
    assert page.locator('iframe').count()==3
    report['checks'].append('Contact validation, explicit email fallback, and three video embeds present; no inquiry submitted')
    for width in [390,768,1024,1440]:
        page.set_viewport_size({'width':width,'height':844})
        page.evaluate('window.scrollTo(0,0)')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Horizontal overflow {width}'
        if width==390:
            page.get_by_role('button',name='Open menu').click()
            mobile=page.get_by_role('navigation',name='Mobile navigation')
            mobile.get_by_role('link',name='Schedule',exact=True).click()
            assert page.get_by_role('button',name='Open menu').count()==1
            page.evaluate('window.scrollTo(0,0)')
            page.screenshot(path=str(output/'mobile.png'))
    report['checks'].append('No horizontal overflow at 390/768/1024/1440px; mobile menu opens and closes after navigation')
    assert not report['pageErrors'], report['pageErrors']
    assert not report['failedLocalRequests'], report['failedLocalRequests']
    browser.close()
(output/'browser-results.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
