import os

files = [
    'about.html', 'cms.html', 'contact.html', 'privacy.html', 'terms.html',
    'article-template.html', 'templates/note-template.html', 
    'templates/raag-template.html', 'templates/scale-template.html'
]

pwa_meta = """  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#141414">
"""

sw_script = """
      // Register Service Worker for PWA
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
      }
"""

for f in files:
    if not os.path.exists(f): continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    modified = False

    if '<link rel="manifest"' not in content:
        if '<!-- Favicon -->' in content:
            content = content.replace('<!-- Favicon -->', pwa_meta + '\n  <!-- Favicon -->')
        else:
            content = content.replace('</head>', pwa_meta + '\n</head>')
        modified = True

    if 'template.html' in f:
        if 'navigator.serviceWorker.register' not in content:
            # article-template ends with "});\n  </script>"
            # note-template ends with "});\n  </script>"
            if "});\n  </script>" in content:
                content = content.replace("});\n  </script>", sw_script + "    });\n  </script>")
                modified = True
            elif "    });\n  </script>" in content:
                content = content.replace("    });\n  </script>", sw_script + "    });\n  </script>")
                modified = True

    if modified:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated {f}")
