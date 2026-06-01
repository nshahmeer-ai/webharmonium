import os
import re

dir_path = r'd:\webharmonium'

replacements = {
    "🎵": '<i data-lucide="music" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "🏠": '<i data-lucide="home" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "ℹ️": '<i data-lucide="info" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "✉️": '<i data-lucide="mail" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "🔒": '<i data-lucide="lock" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "📜": '<i data-lucide="file-text" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "🎼": '<i data-lucide="music" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "📊": '<i data-lucide="bar-chart" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "🎤": '<i data-lucide="mic" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "📘": '<i data-lucide="facebook" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "🐦": '<i data-lucide="twitter" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "💬": '<i data-lucide="message-circle" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "🔗": '<i data-lucide="link" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "▶️": '<i data-lucide="play" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "▶": '<i data-lucide="play" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "⏸️": '<i data-lucide="pause" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "⏸": '<i data-lucide="pause" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "🎹": '<i data-lucide="music" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "✨": '<i data-lucide="sparkles" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "📚": '<i data-lucide="book-open" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "↑": '<i data-lucide="arrow-up" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "↓": '<i data-lucide="arrow-down" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "←": '<i data-lucide="arrow-left" style="width:1em;height:1em;vertical-align:middle;"></i>',
    "✓": '<i data-lucide="check" style="width:1em;height:1em;vertical-align:middle;"></i>'
}

def replace_emojis_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content
        for emoji, replacement in replacements.items():
            new_content = new_content.replace(emoji, replacement)
            
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        pass

for root, _, files in os.walk(dir_path):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.js', '.json')):
            replace_emojis_in_file(os.path.join(root, file))
