/**
 * AppController.js — CONTROLLER LAYER (Root)
 * Bootstraps all models → views → controllers.
 * Handles page-level concerns: navbar scroll, mobile nav, animations.
 */

class AppController {
  constructor() {
    // Models
    this._appModel     = new AppModel();
    this._noteModel    = new NoteModel();
    this._articleModel = new ArticleModel();
    this._raagModel    = new RaagModel();

    // Views
    this._navView       = new NavView();
    this._heroView      = new HeroView();
    this._statsView     = new StatsView();
    this._harmoniumView = new HarmoniumView();
    this._featuresView  = new FeaturesView();
    this._raagView      = new RaagView();
    this._articleView   = new ArticleView();
    this._footerView    = new FooterView();

    // Engine
    this._audioEngine   = new AudioEngine();

    // Sub-controllers (created after data is loaded)
    this._harmoniumCtrl = null;
    this._articleCtrl   = null;
    this._aiCtrl        = null;

    // AI Components
    this._aiModel = new AIModel();
    this._aiView  = new AIView();
  }

  /** Entry point — load all data, then render. */
  async start() {
    // 1. Load all models in parallel
    await Promise.all([
      this._appModel.load(),
      this._noteModel.load(),
      this._articleModel.load(),
      this._raagModel.load(),
    ]);

    // 2. Apply SEO from data
    this._applySEO(this._appModel.seo?.home);
    this._applyStructuredData();

    // 3. Render Critical Above-the-fold UI
    const { site, nav, hero, stats, features, harmonium, raagChips, cta, footer } = {
      site:      this._appModel.site,
      nav:       this._appModel.nav,
      hero:      this._appModel.hero,
      stats:     this._appModel.stats,
      features:  this._appModel.features,
      harmonium: this._appModel.harmonium,
      raagChips: this._appModel.raagChips,
      cta:       this._appModel.cta,
      footer:    this._appModel.footer,
    };

    this._inject('navMount',   this._navView.render(nav, site));
    this._inject('heroMount',  this._heroView.render(hero));

    // Yield back to the browser's paint thread! This instantly drops the Speed Index.
    await new Promise(resolve => setTimeout(resolve, 50));

    // 4. Render Below-the-fold UI
    this._inject('statsMount', this._statsView.render(stats));
    this._inject('harmoniumMount', this._harmoniumView.render(harmonium, this._noteModel));
    this._inject('featuresMount',  this._featuresView.render(features));
    this._inject('raagMount',      this._raagView.render(raagChips));
    this._inject('articlesMount',  this._articleView.renderSection());
    this._inject('ctaMount',       this._renderCTA(cta));
    this._inject('footerMount',    this._footerView.render(footer, site));

    // 5. Post-render work
    this._harmoniumView.positionBlackKeys();

    // 6. Bind all controllers
    this._harmoniumCtrl = new HarmoniumController(
      this._harmoniumView,
      this._audioEngine,
      this._noteModel,
      this._appModel.harmonium
    );
    this._harmoniumCtrl.bindEvents();

    this._articleCtrl = new ArticleController(
      this._articleModel,
      this._articleView
    );
    this._articleCtrl.init();

    this._aiCtrl = new AIController(
      this._aiModel,
      this._aiView,
      this._noteModel,
      this._audioEngine,
      this._harmoniumView
    );
    const aiMount = document.getElementById('aiMount');
    if (aiMount) this._aiCtrl.init(aiMount);

    // 7. Page-level UX
    this._bindNav();
    this._bindScrollAnimations();
    this._bindNavbarScroll();
    this._setActiveNavLink();
  }

  // ── Rendering ────────────────────────────────────────────────────────────

  _inject(mountId, html) {
    const el = document.getElementById(mountId);
    if (el) el.innerHTML = html;
  }

  _renderCTA(cta) {
    return /* html */`
      <section style="background:linear-gradient(135deg,rgba(212,175,55,0.12),rgba(34,197,94,0.08));
                      border-top:1px solid var(--border);border-bottom:1px solid var(--border);
                      padding:64px clamp(16px,5vw,64px);text-align:center" aria-label="Call to action">
        <h2 style="margin-bottom:16px">${cta.heading} <span class="text-gold">${cta.headingGold}</span></h2>
        <p class="lead" style="max-width:520px;margin:0 auto 32px">${cta.body}</p>
        <a href="${cta.button.href}" class="btn ${cta.button.style}">${cta.button.label}</a>
      </section>
    `;
  }

  // ── SEO ──────────────────────────────────────────────────────────────────

  _applySEO(seo) {
    if (!seo) return;
    if (seo.title)       document.title = seo.title;
    this._setMeta('description', seo.description);
    this._setMeta('keywords',    seo.keywords);
    if (seo.og) {
      this._setOgMeta('og:type',        seo.og.type);
      this._setOgMeta('og:title',       seo.og.title);
      this._setOgMeta('og:description', seo.og.description);
    }
  }

  _setMeta(name, content) {
    if (!content) return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
    el.content = content;
  }

  _setOgMeta(property, content) {
    if (!content) return;
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
    el.content = content;
  }

  _applyStructuredData() {
    const el = document.getElementById('structuredData');
    if (!el) return;

    const page = window.location.pathname.split('/').pop() || '';
    
    // Base Organization Data
    const orgData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LearnHarmonium",
      "url": "https://webharmonium-ochre.vercel.app/",
      "logo": "https://webharmonium-ochre.vercel.app/icon.svg"
    };

    let schema = [];

    // WebSite / Homepage
    if (page === '' || page === 'index.html') {
      schema.push({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "LearnHarmonium",
        "url": "https://webharmonium-ochre.vercel.app/",
        "description": "South Asia's best free online harmonium platform. Learn, play, and master the harmonium at zero cost.",
        "publisher": orgData
      });
    }

    // SoftwareApplication (Play / AI Assistant)
    if (page === 'play' || page === 'ai-assistant' || page === '' || page === 'index.html') {
      schema.push({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Virtual Harmonium Web App",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      });
    }

    // CollectionPage (Learn)
    if (page === 'learn') {
      schema.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Learn Harmonium Articles and Raags",
        "description": "A collection of free articles, notes, and tutorials for learning harmonium."
      });
    }

    el.textContent = JSON.stringify(schema.length === 1 ? schema[0] : schema);
  }

  // ── Nav UX ───────────────────────────────────────────────────────────────

  _bindNav() {
    const toggle    = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');
    toggle?.addEventListener('click', () => {
      const isOpen = mobileNav?.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav?.addEventListener('click', (e) => {
      if (e.target === mobileNav) mobileNav.classList.remove('open');
    });
  }

  _bindNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 60;
      navbar.style.background    = scrolled ? 'rgba(15,23,42,0.98)' : 'rgba(15,23,42,0.92)';
      navbar.style.borderBottomColor = scrolled ? 'rgba(212,175,55,0.25)' : 'rgba(212,175,55,0.18)';
    }, { passive: true });
  }

  _setActiveNavLink() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    this._navView.setActive(page === '' ? 'index.html' : page);
  }

  // ── Scroll animations ─────────────────────────────────────────────────────

  _bindScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .article-card, .feature-card').forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }
}
