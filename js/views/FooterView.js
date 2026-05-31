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
            <a href="index.html" class="logo" style="display:inline-flex;margin-bottom:4px">
              <div class="logo-icon" style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;"><i data-lucide="music" style="width:14px;height:14px;color:var(--accent-gold);"></i></div>
              <span class="text-gold" style="font-size:18px;font-family:var(--font-heading);font-weight:800">Web</span>
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
