/**
 * NavView.js — VIEW LAYER
 * Renders the navigation bar and mobile nav drawer.
 * Receives data objects; returns HTML strings. Zero data fetching. Zero business logic.
 */

class NavView {
  /**
   * @param {object} navConfig  — from AppModel.nav
   * @param {object} siteConfig — from AppModel.site
   */
  render(navConfig, siteConfig) {
    const links = navConfig.links.map(l =>
      `<a href="${l.href}" class="nav-link" data-navlink="${l.href}">${l.label}</a>`
    ).join('');

    const mobileLinks = navConfig.links.map(l =>
      `<a href="${l.href}"><i data-lucide="${l.icon}" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 6px;"></i> ${l.label}</a>`
    ).join('');

    const mobileExtra = (navConfig.mobileExtra ?? []).map(l =>
      `<a href="${l.href}">${l.label}</a>`
    ).join('');

    return /* html */`
      <header class="navbar" role="banner">
        <a href="index.html" class="logo" aria-label="${siteConfig.name} Home" style="display: flex; align-items: center; gap: 8px;">
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
          ${links}
          <a href="${navConfig.cta.href}" class="btn btn-gold btn-sm" style="margin-left:8px">${navConfig.cta.label}</a>
        </nav>
        <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </header>

      <div class="mobile-nav" id="mobileNav" role="dialog" aria-label="Mobile navigation">
        <div class="mobile-nav-panel">
          ${mobileLinks}
          ${mobileExtra}
          <div style="margin-top:24px">
            <a href="${navConfig.cta.href}" class="btn btn-gold" style="display:block;text-align:center">${navConfig.cta.label}</a>
          </div>
        </div>
      </div>
    `;
  }

  /** Mark the current page's nav link as active. */
  setActive(currentPage) {
    document.querySelectorAll('.nav-link[data-navlink]').forEach(el => {
      el.classList.toggle('active', el.dataset.navlink === currentPage);
    });
  }
}
