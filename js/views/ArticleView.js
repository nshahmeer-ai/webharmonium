/**
 * ArticleView.js — VIEW LAYER
 * Renders article cards and the articles section.
 */

class ArticleView {
  /**
   * Render the full articles section shell.
   * The grid is populated separately via renderGrid().
   */
  renderSection() {
    return /* html */`
      <section class="section" id="articles" aria-label="Learning articles">
        <div class="section-header">
          <span class="label">Learning Hub</span>
          <h2>Master Harmonium with <span class="text-gold">Expert Guides</span></h2>
          <div class="section-divider"></div>
          <p>From complete beginner to advanced player — our guides cover every aspect of harmonium learning.</p>

          <!-- Search / Filter -->
          <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <input type="text" id="articleSearch"
              placeholder="Search articles..."
              style="padding:10px 18px;border-radius:8px;border:1.5px solid var(--border);
                     background:rgba(255,255,255,0.04);color:var(--text-primary);
                     font-family:var(--font-body);font-size:14px;outline:none;width:260px;"
              aria-label="Search articles" />
            <select id="articleFilter"
              style="padding:10px 14px;border-radius:8px;border:1.5px solid var(--border);
                     background:var(--secondary);color:var(--text-primary);
                     font-family:var(--font-body);font-size:14px;outline:none;cursor:pointer;"
              aria-label="Filter by category">
              <option value="">All Categories</option>
            </select>
          </div>
        </div>

        <div class="grid-3" id="articlesGrid"></div>

        <div style="text-align:center;margin-top:40px">
          <button class="btn btn-outline" id="loadMoreBtn">View All Articles →</button>
        </div>
      </section>
    `;
  }

  /**
   * Render article cards into the grid.
   * @param {Array} articles
   */
  renderGrid(articles) {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;
    grid.innerHTML = articles.length
      ? articles.map(a => this._card(a)).join('')
      : '<p style="text-align:center;grid-column:1/-1;color:var(--text-secondary)">No articles found.</p>';
  }

  /**
   * Populate the category filter <select>.
   * @param {string[]} categories
   */
  renderFilterOptions(categories) {
    const sel = document.getElementById('articleFilter');
    if (!sel) return;
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      sel.appendChild(opt);
    });
  }

  _card(a) {
    return /* html */`
      <a href="${a.url || '#'}" class="article-card" aria-label="${a.title}">
        <div class="article-card-body">
          <span class="article-tag">${a.category}</span>
          <h4>${a.title}</h4>
          <p>${a.excerpt}</p>
        </div>
        <div class="article-card-footer">
          <span>📖 ${a.readTime || '5 min read'}</span>
          <span style="color:var(--accent-gold)">Read →</span>
        </div>
      </a>
    `;
  }
}
