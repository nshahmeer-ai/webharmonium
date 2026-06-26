import os
import glob
import re

def optimize_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Inject Google Fonts Preconnect
    font_tags = """
  <!-- Preconnect and Preload Google Fonts for PageSpeed -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
"""
    if "fonts.googleapis.com" not in html:
        # Inject right after <head> or <meta name="viewport" ...>
        if '<meta name="viewport"' in html:
            parts = html.split('<meta name="viewport" content="width=device-width, initial-scale=1.0" />')
            if len(parts) == 2:
                html = parts[0] + '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' + font_tags + parts[1]
        elif "<head>" in html:
            html = html.replace("<head>", "<head>" + font_tags)

    # 2. Add 'defer' to all local scripts if missing
    # Find all <script src="..."> that do not have defer and add it before the closing >
    html = re.sub(r'<script src="([^"]+)"(?! defer)></script>', r'<script src="\1" defer></script>', html)
    html = re.sub(r'<script src="([^"]+)"(?!\s+defer)>', r'<script src="\1" defer>', html)
    
    # Clean up double defers just in case
    html = html.replace(' defer defer>', ' defer>')

    # 3. Add explicit dimensions to empty images to prevent CLS
    html = html.replace('<img src=""', '<img src="/icon.svg" width="800" height="400" style="max-width:100%; height:auto;"')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Optimized: {filepath}")

if __name__ == "__main__":
    # Find all HTML files recursively
    count = 0
    for filepath in glob.iglob('**/*.html', recursive=True):
        optimize_html_file(filepath)
        count += 1
    
    print(f"All {count} HTML files optimized for PageSpeed!")
