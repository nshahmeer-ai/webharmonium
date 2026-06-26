import json
import os

# 1. Generate Song Pages
with open('data/songs.json', 'r', encoding='utf-8') as f:
    songs_data = json.load(f)['songs']

with open('songs/kun-faya-kun.html', 'r', encoding='utf-8') as f:
    song_template = f.read()

# Extract the lyrics block part from template to replace
lyrics_start_marker = '<div class="song-lyrics-box">'
lyrics_end_marker = '<!-- Play Along Mini-App -->'

for song in songs_data:
    filename = f"songs/{song['slug']}.html"
    if os.path.exists(filename) and song['slug'] in ['kun-faya-kun', 'tajdar-e-haram', 'lab-pe-aati-hai-dua']:
        continue # Skip already customized files

    print(f"Generating {filename}...")
    html = song_template
    
    # Basic Meta Replacements
    html = html.replace('Kun Faya Kun Harmonium Notes (Sargam) | Easy Tutorial for Beginners', f"{song['title']} Harmonium & Piano Notes | Easy Tutorial")
    html = html.replace('Learn how to play Kun Faya Kun on the harmonium. Get easy step-by-step sargam notes, chords, and a free interactive play-along tutorial for beginners.', song['description'])
    html = html.replace('Kun Faya Kun harmonium notes, Kun Faya Kun sargam, play Kun Faya Kun, A.R. Rahman harmonium tutorial', f"{song['title']} notes, {song['title']} chords, {song['title']} sargam, play {song['title']}")
    html = html.replace('kun-faya-kun', song['slug'])
    
    # Content Replacements
    html = html.replace('>Kun Faya Kun<', f">{song['title']}<")
    html = html.replace('diff-intermediate">Intermediate', f"diff-{song['difficulty'].lower()}\">{song['difficulty']}")
    html = html.replace('Khamaj Thaat', song['scale'])
    html = html.replace('A.R. Rahman', song['artist'])
    html = html.replace('A modern Sufi classic from Rockstar. Uses a soothing melody with a mix of Shuddha and Komal notes.', song['description'])
    
    # Generate Lyrics HTML
    lyrics_html = '<div class="song-lyrics-box">\n'
    for lyric in song['lyrics']:
        lyrics_html += f'''
        <div class="lyric-line">
          <div class="lyric-text">{lyric['line']}</div>
          <div class="lyric-sargam">{lyric['sargam']}</div>
          <div class="lyric-western">{lyric['western']}</div>
          <button class="play-line-btn" data-sargam="{lyric['sargam']}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Play Line
          </button>
        </div>
        '''
    lyrics_html += '</div>\n\n    <!-- Play Along Mini-App -->'
    
    # Inject Lyrics
    start_idx = html.find(lyrics_start_marker)
    end_idx = html.find(lyrics_end_marker) + len(lyrics_end_marker)
    if start_idx != -1 and end_idx != -1:
        html = html[:start_idx] + lyrics_html + html[end_idx:]

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)


# 2. Generate Article Pages
with open('data/articles.json', 'r', encoding='utf-8') as f:
    articles_data = json.load(f)['articles']

with open('articles/learn-harmonium-online.html', 'r', encoding='utf-8') as f:
    article_template = f.read()

for article in articles_data:
    filename = f"{article['url']}.html"
    if os.path.exists(filename):
        continue

    print(f"Generating {filename}...")
    html = article_template
    
    # Meta replacements
    html = html.replace('Learn Harmonium Online: Complete Beginner\'s Guide | LearnHarmonium', f"{article['title']} | LearnHarmonium")
    html = html.replace('Everything you need to start playing harmonium from scratch. Understand the instrument, keys, bellows, and first notes.', article['excerpt'])
    html = html.replace('learn harmonium, harmonium for beginners, online harmonium', ", ".join(article['keywords']))
    html = html.replace('learn-harmonium-online.html', f"{article['slug']}.html")
    
    # Content replacements
    html = html.replace('>Beginner • Beginner<', f">{article['category']} • {article['category']}<")
    html = html.replace('>Learn Harmonium Online: Complete Beginner\'s Guide<', f">{article['title']}<")
    html = html.replace('2024-01-01', article['publishedAt'])
    html = html.replace('8 min read', article['readTime'])
    
    # Body Replacement (Simple)
    body_start = html.find('<div class="article-body">')
    body_end = html.find('<div class="social-share-bar"', body_start)
    
    new_body = f'''<div class="article-body">
        <h2>{article['title']}</h2>
        <p>{article['excerpt']}</p>
        <p><em>(Full article content coming soon...)</em></p>
      </div>\n\n      <!-- Social Share -->\n      <div class="social-share-bar"'''
      
    if body_start != -1 and body_end != -1:
         html = html[:body_start] + new_body + html[body_end + 33:]
         
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

print("Global pages generated successfully!")
