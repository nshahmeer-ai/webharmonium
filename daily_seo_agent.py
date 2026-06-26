import json
import os
import re
import datetime
import google.generativeai as genai

# Setup Gemini API Key
API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("No GEMINI_API_KEY found. Exiting.")
    exit(1)

genai.configure(api_key=API_KEY)

# Use the latest model
model = genai.GenerativeModel('gemini-1.5-pro-latest')

def generate_article(topic):
    prompt = f"""
    You are an expert harmonium player and a passionate music teacher writing for an online blog (WebHarmonium).
    Write a highly engaging, human-like, and conversational article about: "{topic}"
    
    CRITICAL RULES to avoid sounding like AI:
    - DO NOT use generic AI intro/outros (e.g. "In conclusion", "In today's fast paced world", "Delve into").
    - Use a warm, slightly informal, encouraging tone. Add a quick personal anecdote or relatable struggle.
    - Format with <h2> subheadings, short paragraphs (2-3 sentences), and bullet points where useful.
    - Keep the total length around 500-700 words.
    - Output ONLY the HTML content that would go inside the <div class="article-body">. Do not include <html>, <head>, or <body> tags. Do not wrap in markdown ```html.
    """
    
    try:
        response = model.generate_content(prompt)
        content = response.text
        # Clean up any markdown code blocks if the AI ignored the instruction
        if content.startswith("```html"):
            content = content[7:-3]
        return content.strip()
    except Exception as e:
        print(f"Error generating article for {topic}: {e}")
        return None

def generate_meta(topic):
    prompt = f"""
    For the blog topic: "{topic}"
    Generate a JSON object with SEO metadata.
    Format exactly like this (no markdown ticks):
    {{
        "title": "A highly clickable SEO title under 60 chars",
        "excerpt": "A catchy meta description under 150 chars.",
        "keywords": ["keyword1", "keyword2", "keyword3"],
        "slug": "url-friendly-slug-like-this"
    }}
    """
    try:
        response = model.generate_content(prompt)
        res_text = response.text
        if res_text.startswith("```json"):
            res_text = res_text[7:-3]
        return json.loads(res_text.strip())
    except Exception as e:
        print(f"Error generating meta for {topic}: {e}")
        return None

# 1. Pop 2 topics from backlog
with open('data/seo_topics.txt', 'r', encoding='utf-8') as f:
    topics = [line.strip() for line in f.readlines() if line.strip()]

if len(topics) == 0:
    print("No more topics in backlog. Exiting.")
    exit(0)

# Take first 2
todays_topics = topics[:2]
remaining_topics = topics[2:]

with open('data/seo_topics.txt', 'w', encoding='utf-8') as f:
    for t in remaining_topics:
        f.write(t + '\n')

print(f"Today's topics: {todays_topics}")

# 2. Process and Update articles.json
with open('data/articles.json', 'r', encoding='utf-8') as f:
    articles_data = json.load(f)

new_articles = []
for topic in todays_topics:
    print(f"Generating content for: {topic}")
    meta = generate_meta(topic)
    body_html = generate_article(topic)
    
    if meta and body_html:
        article_entry = {
            "title": meta['title'],
            "excerpt": meta['excerpt'],
            "category": "Blog",
            "url": f"articles/{meta['slug']}",
            "readTime": "5 min read",
            "slug": meta['slug'],
            "keywords": meta['keywords'],
            "publishedAt": datetime.datetime.now().strftime("%Y-%m-%d")
        }
        articles_data['articles'].insert(0, article_entry) # Put at the top
        new_articles.append((article_entry, body_html))

with open('data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles_data, f, indent=2)

# 3. Build HTML pages
with open('articles/learn-harmonium-online.html', 'r', encoding='utf-8') as f:
    article_template = f.read()

for article, body_html in new_articles:
    filename = f"articles/{article['slug']}.html"
    print(f"Building HTML: {filename}")
    
    html = article_template
    
    # Meta replacements
    html = re.sub(r'<title>.*?</title>', f"<title>{article['title']} | LearnHarmonium</title>", html)
    html = re.sub(r'<meta name="description" content=".*?" />', f'<meta name="description" content="{article["excerpt"]}" />', html)
    html = re.sub(r'<meta property="og:title" content=".*?" />', f'<meta property="og:title" content="{article["title"]}" />', html)
    html = re.sub(r'<meta property="og:description" content=".*?" />', f'<meta property="og:description" content="{article["excerpt"]}" />', html)
    
    html = html.replace('learn harmonium, harmonium for beginners, online harmonium', ", ".join(article['keywords']))
    html = html.replace('learn-harmonium-online.html', f"{article['slug']}.html")
    
    # Content replacements
    html = html.replace('>Beginner • Beginner<', f">{article['category']} • {article['category']}<")
    html = html.replace('>Learn Harmonium Online: Complete Beginner\'s Guide<', f">{article['title']}<")
    html = html.replace('2024-01-01', article['publishedAt'])
    html = html.replace('8 min read', article['readTime'])
    
    # Body Replacement
    body_start = html.find('<div class="article-body">')
    body_end = html.find('<div class="social-share-bar"', body_start)
    
    if body_start != -1 and body_end != -1:
         full_new_body = f'<div class="article-body">\n{body_html}\n</div>\n\n      <!-- Social Share -->\n      <div class="social-share-bar"'
         html = html[:body_start] + full_new_body + html[body_end + 33:]
         
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

print("Daily SEO Agent finished successfully!")
