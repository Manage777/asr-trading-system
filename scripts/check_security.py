"""Static security regression checks. Run from the repository root with Python 3.
These checks do not replace browser testing or a security assessment.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

for path in ROOT.glob('*.html'):
    page = Page()
    page.feed(path.read_text())
    policies = [a['content'] for t, a in page.tags if t == 'meta' and a.get('http-equiv', '').lower() == 'content-security-policy']
    assert len(policies) == 1, path
    policy = policies[0]
    for rule in ["default-src 'none'", "script-src 'self'", "style-src 'self'", "object-src 'none'", "base-uri 'none'", "connect-src 'none'", "frame-src 'none'", "form-action 'self' https://formsubmit.co"]:
        assert rule in policy.split('; '), (path, rule)
    assert 'unsafe-inline' not in policy and 'unsafe-eval' not in policy, path
    for tag, attrs in page.tags:
        assert tag != 'style' and 'style' not in attrs, (path, 'inline style')
        assert not any(k.startswith('on') for k in attrs), (path, 'inline event handler')
        if tag == 'script':
            assert attrs.get('src') == 'website.js', (path, 'unexpected script')
        if tag == 'form':
            assert attrs.get('action') == 'https://formsubmit.co/support@asrtradingsystem.com'
            assert attrs.get('method', '').upper() == 'POST'
        for key in ['src', 'href', 'action']:
            value = attrs.get(key, '')
            assert not value.lower().startswith(('http:', 'javascript:', '//')), (path, key)
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            href = attrs['href']
            assert not urlsplit(href).netloc and (ROOT / href).is_file(), (path, href)
    if path.name == 'index.html':
        fields = {a.get('name'): a for t, a in page.tags if t == 'input'}
        assert fields['_captcha']['value'] == 'true'
        assert fields['_honey'].get('tabindex') == '-1'
        assert fields['_next']['value'] == 'https://asrtradingsystem.com/thank-you.html'
        assert 'checked' not in fields['Consent'] and 'required' in fields['Consent']
    print('PASS', path.name)
print('Static checks passed; browser interactions and email delivery need separate verification.')
