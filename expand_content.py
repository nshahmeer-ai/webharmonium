import json
import os

# 1. Update Articles
with open('data/articles.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['articles'].extend([
    {
        'title': 'The History of the Harmonium in South Asia',
        'excerpt': 'Discover how a European instrument became the soul of Indian Classical Music, Qawwali, and Bhajans.',
        'category': 'Theory',
        'url': 'articles/history-of-harmonium',
        'readTime': '10 min read',
        'slug': 'history-of-harmonium',
        'keywords': ['harmonium history', 'indian classical music', 'qawwali'],
        'publishedAt': '2024-06-01'
    },
    {
        'title': 'Proper Bellows Technique for Beginners',
        'excerpt': 'Learn the secret to smooth, sustained notes by mastering the push and pull of the harmonium bellows.',
        'category': 'Technique',
        'url': 'articles/bellows-technique',
        'readTime': '7 min read',
        'slug': 'bellows-technique',
        'keywords': ['harmonium bellows', 'harmonium technique', 'pumping bellows'],
        'publishedAt': '2024-06-02'
    },
    {
        'title': 'Vocal Warm-ups with the Harmonium',
        'excerpt': 'Use the harmonium to find your pitch and warm up your vocal cords with classic Riyaz techniques.',
        'category': 'Practice',
        'url': 'articles/vocal-warmups-harmonium',
        'readTime': '6 min read',
        'slug': 'vocal-warmups-harmonium',
        'keywords': ['vocal warmups', 'riyaz', 'singing with harmonium'],
        'publishedAt': '2024-06-03'
    },
    {
        'title': 'Understanding Thaats (Parent Scales)',
        'excerpt': 'An introduction to the 10 Thaats of Hindustani classical music, the foundation for all Raags.',
        'category': 'Theory',
        'url': 'articles/understanding-thaats',
        'readTime': '12 min read',
        'slug': 'understanding-thaats',
        'keywords': ['thaats', 'hindustani classical', 'music theory', 'parent scales'],
        'publishedAt': '2024-06-04'
    }
])

with open('data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

# 2. Update Raags
with open('data/raags.json', 'r', encoding='utf-8') as f:
    raags_data = json.load(f)

raags_data['raags'].extend([
    {
        'id': 'raag-bhairavi',
        'name': 'Raag Bhairavi',
        'time': 'Morning / Universal',
        'thaat': 'Bhairavi',
        'aaroh': "S r g m P d n S'",
        'avroh': "S' n d P m g r S",
        'pakad': "S r g m, P d n S'",
        'vadi': 'Ma',
        'samvadi': 'Sa',
        'description': 'A versatile and highly popular morning raag, often performed at the end of concerts. It uses all flat (komal) notes: r, g, d, n.'
    },
    {
        'id': 'raag-darbari',
        'name': 'Raag Darbari',
        'time': 'Late Night',
        'thaat': 'Asavari',
        'aaroh': "S R g m P d n S'",
        'avroh': "S' d n P, m P g, m R S",
        'pakad': "R n S, D n P, m P g, m R S",
        'vadi': 'Re',
        'samvadi': 'Pa',
        'description': 'A deeply majestic, serious late-night raag created by Tansen. It is characterized by slow, heavy oscillations (andolan) on Ga and Dha.'
    },
    {
        'id': 'raag-asavari',
        'name': 'Raag Asavari',
        'time': 'Morning',
        'thaat': 'Asavari',
        'aaroh': "S R m P d S'",
        'avroh': "S' n d P, m P d m P g, R S",
        'pakad': "R m P, n d P, m P d m P g, R S",
        'vadi': 'Dha',
        'samvadi': 'Ga',
        'description': 'A melancholy morning raag that evokes feelings of longing and renunciation.'
    }
])

with open('data/raags.json', 'w', encoding='utf-8') as f:
    json.dump(raags_data, f, indent=2)

print('Successfully added 4 new articles and 3 new raags.')
