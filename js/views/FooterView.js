/**
 * FooterView.js — VIEW LAYER
 * Renders the site footer from config data.
 */

class FooterView {
  /**
   * @param {object} footerConfig — from AppModel.footer
   * @param {object} siteConfig   — from AppModel.site
   */
  render(footerConfig, siteConfig) {
    const badges = footerConfig.tagBadges.map(b => /* html */`
      <span class="footer-badge ${b.colorClass}">${b.label}</span>
    `).join('');

    const columns = footerConfig.columns.map(col => /* html */`
      <div class="footer-col">
        <h5>${col.heading}</h5>
        <ul class="footer-links">
          ${col.links.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
        </ul>
      </div>
    `).join('');

    return /* html */`
      <footer role="contentinfo">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo" style="display:inline-flex;align-items:center;gap:8px;margin-bottom:4px">
              <svg class="logo-svg" viewBox="0 0 100 100" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 6px rgba(212,175,55,0.3));">
                <defs>
                  <linearGradient id="goldGradFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFE082" />
                    <stop offset="50%" stop-color="#D4AF37" />
                    <stop offset="100%" stop-color="#AA7C11" />
                  </linearGradient>
                </defs>
                <rect x="5" y="5" width="90" height="90" rx="18" fill="#141414" stroke="url(#goldGradFooter)" stroke-width="3"/>
                <rect x="25" y="32" width="12" height="38" rx="2" fill="#FFFFFF" />
                <rect x="41" y="32" width="12" height="38" rx="2" fill="#FFFFFF" />
                <rect x="57" y="32" width="12" height="38" rx="2" fill="#FFFFFF" />
                <rect x="33" y="32" width="7" height="22" rx="1" fill="#2A2A2A" />
                <rect x="49" y="32" width="7" height="22" rx="1" fill="#2A2A2A" />
                <path d="M72 45 C72 41, 78 38, 78 41 C78 47, 72 47, 72 45 Z" fill="url(#goldGradFooter)" />
                <path d="M77 22 L77 41" stroke="url(#goldGradFooter)" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M77 24 C77 24, 82 23, 85 27" stroke="url(#goldGradFooter)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
              </svg>
              <span class="text-gold" style="font-size:18px;font-family:var(--font-heading);font-weight:800">Learn</span>
              <span style="color:var(--text-primary);font-size:18px;font-family:var(--font-heading);font-weight:800">Harmonium</span>
            </a>
            <p>${siteConfig.description}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:4px">
              ${badges}
            </div>
          </div>
          ${columns}
        </div>
        <div class="footer-bottom">
          <span>© ${siteConfig.year} ${siteConfig.name}. All rights reserved.</span>
          <span>${siteConfig.madeWith}</span>
        </div>
      </footer>
    `;
  }
}
