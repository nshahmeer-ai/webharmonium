/**
 * FeaturesView.js — VIEW LAYER
 * Renders the features section from a features array.
 */

class FeaturesView {
  /**
   * @param {Array<{icon, title, desc}>} features
   */
  render(features) {
    const cards = features.map(f => /* html */`
      <div class="card feature-card">
        <span class="icon" style="display:flex; align-items:center; justify-content:center; height:36px; margin-bottom:16px;"><i data-lucide="${f.icon}" style="width:28px;height:28px;color:var(--accent-gold);"></i></span>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>
    `).join('');

    return /* html */`
      <section class="features-section" aria-label="Features">
        <div class="section" style="background:var(--secondary)">
          <div class="section-header">
            <span class="label">Why WebHarmonium</span>
            <h2>Everything You Need to <span class="text-gold">Master Harmonium</span></h2>
            <div class="section-divider"></div>
          </div>
          <div class="grid-3">${cards}</div>
        </div>
      </section>
    `;
  }
}
