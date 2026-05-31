/**
 * HeroView.js — VIEW LAYER
 * Renders the hero section from hero config data.
 */

class HeroView {
  /**
   * @param {object} hero — from AppModel.hero
   */
  render(hero) {
    const ctaButtons = hero.cta.map(b =>
      `<a href="${b.href}" class="btn ${b.style}">${b.label}</a>`
    ).join('');

    return /* html */`
      <section class="hero bg-noise" aria-label="Hero">
        <div class="hero-bg" aria-hidden="true"></div>
        <div class="hero-content">
          <div class="hero-badge anim-fade-up">${hero.badge}</div>
          <h1 class="anim-fade-up-1">
            ${hero.h1Line1}<br />
            <span class="text-gold">${hero.h1Gold}</span>
          </h1>
          <p class="lead anim-fade-up-2">${hero.lead}</p>
          <div class="hero-actions anim-fade-up-3">
            ${ctaButtons}
          </div>
        </div>
        <div class="scroll-indicator" aria-hidden="true">
          <span>${hero.scrollHint}</span>
          <div class="arrow"></div>
        </div>
      </section>
    `;
  }
}
