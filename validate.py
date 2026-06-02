import json
try:
    with open('d:\\webharmonium\\data\\site.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("site.json is VALID")
except Exception as e:
    print("site.json ERROR:", e)

try:
    with open('d:\\webharmonium\\data\\articles.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("articles.json is VALID")
except Exception as e:
    print("articles.json ERROR:", e)
