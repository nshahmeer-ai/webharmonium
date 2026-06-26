import json
import os
import re

# --- 1. pSEO Data Generation (Scales) ---
NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

def get_scale_notes(root, is_major=True):
    root_idx = NOTES.index(root)
    # Major: W-W-H-W-W-W-H -> 2,2,1,2,2,2,1
    # Minor: W-H-W-W-H-W-W -> 2,1,2,2,1,2,2
    intervals = [2,2,1,2,2,2,1] if is_major else [2,1,2,2,1,2,2]
    scale = [NOTES[root_idx]]
    curr = root_idx
    for i in intervals[:-1]:
        curr = (curr + i) % 12
        scale.append(NOTES[curr])
    return scale

with open('data/scales.json', 'r', encoding='utf-8') as f:
    scales_data = json.load(f)

existing_scale_ids = [s['id'] for s in scales_data['scales']]

for note in NOTES:
    for is_maj in [True, False]:
        type_str = "Major" if is_maj else "Minor"
        s_id = f"{note.lower()}-{type_str.lower()}"
        if s_id not in existing_scale_ids:
            s_notes = get_scale_notes(note, is_maj)
            asc = s_notes + [note]
            desc = list(reversed(asc))
            scales_data['scales'].append({
                "id": s_id,
                "name": f"{note} {type_str}",
                "slug": f"{note.lower()}-{type_str.lower()}-scale",
                "key": note,
                "type": f"{type_str} (Diatonic)" if is_maj else "Natural Minor",
                "difficulty": "Intermediate",
                "notes": s_notes,
                "ascending": asc,
                "descending": desc,
                "description": f"The {note} {type_str} scale. An essential scale for mastering piano chords and harmonium melodies.",
                "longDescription": f"Practicing the {note} {type_str} scale is critical for building finger dexterity on the harmonium. This page teaches you the exact notes and finger positions.",
                "intervalsDesc": "Follows the standard step pattern for Western scales."
            })

with open('data/scales.json', 'w', encoding='utf-8') as f:
    json.dump(scales_data, f, indent=2)


# --- 2. pSEO Data Generation (Songs) ---
with open('data/songs.json', 'r', encoding='utf-8') as f:
    songs_data = json.load(f)

existing_song_slugs = [s['slug'] for s in songs_data['songs']]

viral_songs = [
    {"title": "Shape of You", "artist": "Ed Sheeran", "scale": "C# Minor"},
    {"title": "Let It Be", "artist": "The Beatles", "scale": "C Major"},
    {"title": "Hallelujah", "artist": "Leonard Cohen", "scale": "C Major"},
    {"title": "Someone Like You", "artist": "Adele", "scale": "A Major"},
    {"title": "A Thousand Years", "artist": "Christina Perri", "scale": "Bb Major"},
    {"title": "Believer", "artist": "Imagine Dragons", "scale": "Bb Minor"},
    {"title": "Perfect", "artist": "Ed Sheeran", "scale": "Ab Major"},
    {"title": "Despacito", "artist": "Luis Fonsi", "scale": "B Minor"},
    {"title": "Billie Jean", "artist": "Michael Jackson", "scale": "F# Minor"},
    {"title": "Bohemian Rhapsody", "artist": "Queen", "scale": "Bb Major"}
]

for vs in viral_songs:
    slug = vs['title'].lower().replace(' ', '-')
    if slug not in existing_song_slugs:
        songs_data['songs'].append({
            "slug": slug,
            "title": vs['title'],
            "artist": vs['artist'],
            "scale": vs['scale'],
            "difficulty": "Intermediate",
            "description": f"Learn to play {vs['title']} by {vs['artist']} on the harmonium. Get easy step-by-step notes and chords.",
            "lyrics": [
                {
                    "line": f"Playing {vs['title']}",
                    "sargam": "Full notation coming soon!",
                    "western": "Full notation coming soon!"
                }
            ],
            "tags": ["Viral", "Pop", "Western"]
        })

with open('data/songs.json', 'w', encoding='utf-8') as f:
    json.dump(songs_data, f, indent=2)


# --- 3. HTML Generation ---
if not os.path.exists('scales'): os.makedirs('scales')
if not os.path.exists('songs'): os.makedirs('songs')

# Scales HTML
with open('templates/scale-template.html', 'r', encoding='utf-8') as f:
    scale_tmpl = f.read()

for scale in scales_data['scales']:
    fname = f"scales/{scale['slug']}.html"
    if not os.path.exists(fname):
        print(f"Generating {fname}...")
        html = scale_tmpl.replace('{{META_TITLE}}', f"{scale['name']} Scale Harmonium Notes | How to Play {scale['key']} {scale['type']}")
        html = html.replace('{{META_DESCRIPTION}}', scale['description'])
        html = html.replace('{{META_KEYWORDS}}', f"{scale['name']}, harmonium scale, play {scale['key']}, piano chords")
        html = html.replace('{{CANONICAL_URL}}', f"https://webharmonium-ochre.vercel.app/scales/{scale['slug']}")
        html = html.replace('{{OG_TITLE}}', f"{scale['name']} Scale Harmonium Notes")
        
        # UI Replacements
        html = html.replace('{{SCALE_NAME}}', scale['name'])
        html = html.replace('{{DIFFICULTY_TAG}}', f"diff-{scale['difficulty'].lower()}")
        html = html.replace('{{SCALE_DIFFICULTY}}', scale['difficulty'])
        html = html.replace('{{SCALE_KEY}}', scale['key'])
        html = html.replace('{{SCALE_TYPE}}', scale['type'])
        html = html.replace('{{SCALE_DESC}}', scale['description'])
        html = html.replace('{{SCALE_LONG_DESC}}', scale['longDescription'])
        html = html.replace('{{SCALE_INTERVALS_DESC}}', scale['intervalsDesc'])
        html = html.replace('{{ASCENDING_NOTES}}', " - ".join(scale['ascending']))
        html = html.replace('{{DESCENDING_NOTES}}', " - ".join(scale['descending']))
        html = html.replace('{{SCALE_ID}}', scale['id'])
        
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(html)

# Songs HTML (Using kun-faya-kun as base template)
with open('songs/kun-faya-kun.html', 'r', encoding='utf-8') as f:
    song_tmpl = f.read()
    lyrics_start = song_tmpl.find('<div class="song-lyrics-box">')
    lyrics_end = song_tmpl.find('<!-- Play Along Mini-App -->')

for song in songs_data['songs']:
    fname = f"songs/{song['slug']}.html"
    if not os.path.exists(fname):
        print(f"Generating {fname}...")
        html = song_tmpl
        html = re.sub(r'<title>.*?</title>', f'<title>{song["title"]} Harmonium Notes | Play {song["artist"]}</title>', html)
        html = re.sub(r'content="Learn how to play Kun Faya Kun.*?"', f'content="{song["description"]}"', html)
        html = re.sub(r'href="https://webharmonium-ochre.vercel.app/songs/kun-faya-kun"', f'href="https://webharmonium-ochre.vercel.app/songs/{song["slug"]}"', html)
        html = html.replace('>Kun Faya Kun<', f">{song['title']}<")
        html = html.replace('Khamaj Thaat', song['scale'])
        html = html.replace('A.R. Rahman', song['artist'])
        html = html.replace('A modern Sufi classic from Rockstar. Uses a soothing melody with a mix of Shuddha and Komal notes.', song['description'])
        
        lyrics_html = '<div class="song-lyrics-box">\n'
        for lyric in song['lyrics']:
            lyrics_html += f'''<div class="lyric-line"><div class="lyric-text">{lyric['line']}</div><div class="lyric-western">{lyric['western']}</div></div>'''
        lyrics_html += '</div>\n\n    <!-- Play Along Mini-App -->'
        
        if lyrics_start != -1 and lyrics_end != -1:
            html = html[:lyrics_start] + lyrics_html + html[lyrics_end + 28:]
            
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(html)

print("pSEO Generation Complete: All Scales + Viral Songs added!")
