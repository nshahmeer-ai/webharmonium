/**
 * RaagView.js — VIEW LAYER
 * Renders raag chips section from data arrays.
 */

class RaagView {
  /**
   * @param {Array<{label, href}>} chips
   */
  render(chips) {
    const chipHtml = chips.map(c => /* html */`
      <a href="${c.href}" class="raag-chip" ${c.id ? `data-raag-id="${c.id}"` : ''}>${c.label}</a>
    `).join('');

    return /* html */`
      <section class="section" aria-label="Quick access to raags and scales">
        <div class="section-header">
          <span class="label">Explore Music</span>
          <h2>Popular <span class="text-gold">Raags & Scales</span></h2>
          <div class="section-divider"></div>
          <p>Dive into classical Indian music theory with our curated library of raags and scales.</p>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:40px">
          ${chipHtml}
        </div>
      </section>
    `;
  }
}
