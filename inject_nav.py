import os
import glob

nav_html = """  <div id="navMount">
    <header class="navbar" role="banner">
      <a href="/" class="logo" aria-label="LearnHarmonium Home" style="display: flex; align-items: center; gap: 8px;">
        <svg class="logo-svg" viewBox="0 0 100 100" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 8px rgba(212,175,55,0.3));">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFE082" />
              <stop offset="50%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#AA7C11" />
            </linearGradient>
          </defs>
          <rect x="5" y="5" width="90" height="90" rx="18" fill="#141414" stroke="url(#goldGrad)" stroke-width="3"/>
          <rect x="25" y="32" width="12" height="38" rx="2" fill="#FFFFFF" />
          <rect x="41" y="32" width="12" height="38" rx="2" fill="#FFFFFF" />
          <rect x="57" y="32" width="12" height="38" rx="2" fill="#FFFFFF" />
          <rect x="33" y="32" width="7" height="22" rx="1" fill="#2A2A2A" />
          <rect x="49" y="32" width="7" height="22" rx="1" fill="#2A2A2A" />
          <path d="M72 45 C72 41, 78 38, 78 41 C78 47, 72 47, 72 45 Z" fill="url(#goldGrad)" />
          <path d="M77 22 L77 41" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M77 24 C77 24, 82 23, 85 27" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        </svg>
        <span class="text-gold" style="font-weight: 800; font-size: 20px; font-family: var(--font-heading);">Learn</span><span style="color:var(--text-primary); font-weight: 800; font-size: 20px; font-family: var(--font-heading);">Harmonium</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/#app" class="nav-link" data-navlink="/#app">Play</a><a href="/#raags" class="nav-link" data-navlink="/#raags">Library</a><a href="/#ai" class="nav-link" data-navlink="/#ai">AI Assistant</a>
        <a href="/#articles" class="btn btn-gold btn-sm" style="margin-left:8px">Start Learning</a>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </header>
    <div class="mobile-nav" id="mobileNav" role="dialog" aria-label="Mobile navigation">
      <div class="mobile-nav-panel">
        <a href="/#app"><i data-lucide="music" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px;"></i> Play</a><a href="/#raags"><i data-lucide="book-open" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px;"></i> Library</a><a href="/#ai"><i data-lucide="bot" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px;"></i> AI Assistant</a>
        <a href="/articles/harmonium-basics">Harmonium Basics</a><a href="/about">About Us</a><a href="/contact">Contact Support</a>
        <div style="margin-top:20px;">
          <a href="/#articles" class="btn btn-gold" style="width:100%;text-align:center;">Start Learning</a>
        </div>
      </div>
    </div>
  </div>"""

for filepath in glob.glob("**/*.html", recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    if '<div id="navMount"></div>' in html:
        html = html.replace('<div id="navMount"></div>', nav_html)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Injected Nav into: {filepath}")
