import os
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def remove_mount(html_str, mount_id):
    return re.sub(f'<!--.*?-->\n\s*<div id="{mount_id}"></div>\n', '', html_str)

# 1. Create play.html
play_html = html
for m in ['heroMount', 'statsMount', 'featuresMount', 'raagMount', 'aiMount', 'articlesMount']:
    play_html = remove_mount(play_html, m)
play_html = play_html.replace('<title>LearnHarmonium</title>', '<title>Play Virtual Harmonium - LearnHarmonium</title>')
play_html = play_html.replace('https://learnharmonium.netlify.app/', 'https://webharmonium-ochre.vercel.app/play')

with open('play.html', 'w', encoding='utf-8') as f:
    f.write(play_html)

# 2. Create learn.html
learn_html = html
for m in ['heroMount', 'statsMount', 'featuresMount', 'harmoniumMount', 'aiMount']:
    learn_html = remove_mount(learn_html, m)
learn_html = learn_html.replace('<title>LearnHarmonium</title>', '<title>Learn Harmonium - Articles and Raags</title>')
learn_html = learn_html.replace('https://learnharmonium.netlify.app/', 'https://webharmonium-ochre.vercel.app/learn')

with open('learn.html', 'w', encoding='utf-8') as f:
    f.write(learn_html)

# 3. Create ai-assistant.html
ai_html = html
for m in ['heroMount', 'statsMount', 'featuresMount', 'harmoniumMount', 'raagMount', 'articlesMount']:
    ai_html = remove_mount(ai_html, m)
ai_html = ai_html.replace('<title>LearnHarmonium</title>', '<title>AI Harmonium Assistant - LearnHarmonium</title>')
ai_html = ai_html.replace('https://learnharmonium.netlify.app/', 'https://webharmonium-ochre.vercel.app/ai-assistant')

with open('ai-assistant.html', 'w', encoding='utf-8') as f:
    f.write(ai_html)

print('Generated play.html, learn.html, ai-assistant.html')
