import glob
import re

html_files = glob.glob('*.html')
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix root / logo links
    content = content.replace('href="index.html"', 'href="/"')
    
    # Fix specific app anchors to the new standalone pages
    content = content.replace('href="index.html#harmonium"', 'href="/play"')
    content = content.replace('href="index.html#articles"', 'href="/learn"')
    content = content.replace('href="index.html#ai-assistant-section"', 'href="/ai-assistant"')
    
    # Remove .html from any local links like privacy.html -> /privacy
    content = content.replace('href="privacy.html"', 'href="/privacy"')
    content = content.replace('href="terms.html"', 'href="/terms"')
    content = content.replace('href="about.html"', 'href="/about"')
    content = content.replace('href="contact.html"', 'href="/contact"')
    
    # Also fix articles/ and scales/ and notes/ links
    content = re.sub(r'href="(articles/[^"]+)\.html"', r'href="/\1"', content)
    content = re.sub(r'href="(scales/[^"]+)\.html"', r'href="/\1"', content)
    content = re.sub(r'href="(notes/[^"]+)\.html"', r'href="/\1"', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f'Fixed links in {len(html_files)} HTML files.')
