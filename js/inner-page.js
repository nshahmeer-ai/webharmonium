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

    // Inject Structured Data
    const sdMount = document.getElementById('structuredData');
    if (sdMount) {
      const pageName = window.location.pathname.split('/').pop() || 'index.html';
      const isAbout = pageName === 'about';
      const isContact = pageName === 'contact';
      const schemaType = isAbout ? 'AboutPage' : isContact ? 'ContactPage' : 'WebPage';
      
      sdMount.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": schemaType,
        "name": document.title,
        "url": window.location.href,
        "publisher": {
          "@type": "Organization",
          "name": "LearnHarmonium",
          "logo": "https://webharmonium-ochre.vercel.app/icon.svg"
        }
      });
    }

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

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('Service Worker registration failed: ', err);
      });
    }

  } catch(err) {
    console.error('[WebHarmonium] Inner page load error:', err);
  }
});
