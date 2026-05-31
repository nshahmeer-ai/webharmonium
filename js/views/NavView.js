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
      `<a href="${l.href}">${l.icon} ${l.label}</a>`
    ).join('');

    const mobileExtra = (navConfig.mobileExtra ?? []).map(l =>
      `<a href="${l.href}">${l.label}</a>`
    ).join('');

    return /* html */`
      <header class="navbar" role="banner">
        <a href="index.html" class="logo" aria-label="${siteConfig.name} Home">
          <div class="logo-icon" aria-hidden="true">🎵</div>
          <span class="text-gold">Web</span><span style="color:var(--text-primary)">Harmonium</span>
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
