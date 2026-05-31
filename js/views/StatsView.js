/**
 * StatsView.js — VIEW LAYER
 * Renders the stats banner from an array of stat objects.
 */

class StatsView {
  /**
   * @param {Array<{value:string, label:string}>} stats
   */
  render(stats) {
    const items = stats.map(s => /* html */`
      <div class="stat-item">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');

    return /* html */`
      <div class="stats-banner" role="region" aria-label="Platform statistics">
        ${items}
      </div>
    `;
  }
}
