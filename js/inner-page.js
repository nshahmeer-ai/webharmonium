/**
 * inner-page.js — Shared controller for static inner pages (About, Contact, Privacy, Terms)
 * Loads only AppModel + NavView + FooterView. No harmonium, no articles.
 */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const appModel   = new AppModel();
    const navView    = new NavView();
    const footerView = new FooterView();

    await appModel.load();

    const { site, nav, footer } = {
      site:   appModel.site,
      nav:    appModel.nav,
      footer: appModel.footer,
    };

    // Inject nav
    const navMount = document.getElementById('navMount');
    if (navMount) navMount.innerHTML = navView.render(nav, site);

    // Inject footer
    const footerMount = document.getElementById('footerMount');
    if (footerMount) footerMount.innerHTML = footerView.render(footer, site);

    // Mobile nav toggle
    const toggle    = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    toggle?.addEventListener('click', () => mobileNav?.classList.toggle('open'));
    mobileNav?.addEventListener('click', e => { if (e.target === mobileNav) mobileNav.classList.remove('open'); });

    // Active nav link
    const page = window.location.pathname.split('/').pop() || 'index.html';
    navView.setActive(page);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 60;
        navbar.style.background        = scrolled ? 'rgba(15,23,42,0.98)' : 'rgba(15,23,42,0.92)';
        navbar.style.borderBottomColor = scrolled ? 'rgba(212,175,55,0.25)' : 'rgba(212,175,55,0.18)';
      }, { passive: true });
    }

  } catch(err) {
    console.error('[WebHarmonium] Inner page load error:', err);
  }
});
