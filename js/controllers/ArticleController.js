/**
 * ArticleController.js — CONTROLLER LAYER
 * Wires ArticleView ↔ ArticleModel.
 * Handles search input, category filter, load-more.
 */

class ArticleController {
  /**
   * @param {ArticleView}  view
   * @param {ArticleModel} model
   */
  constructor(view, model) {
    this._view  = view;
    this._model = model;
    this._showing = 9;   // cards visible at a time
  }

  /** Call after the articles section HTML is in the DOM. */
  init() {
    this._view.renderFilterOptions(this._model.getCategories());
    this._renderFiltered();
    this._bindEvents();
  }

  _bindEvents() {
    document.getElementById('articleSearch')?.addEventListener('input', (e) => {
      this._renderFiltered(e.target.value, document.getElementById('articleFilter')?.value);
    });

    document.getElementById('articleFilter')?.addEventListener('change', (e) => {
      this._renderFiltered(document.getElementById('articleSearch')?.value, e.target.value);
    });

    document.getElementById('loadMoreBtn')?.addEventListener('click', () => {
      this._showing += 9;
      this._renderFiltered(
        document.getElementById('articleSearch')?.value,
        document.getElementById('articleFilter')?.value
      );
    });
  }

  _renderFiltered(query = '', category = '') {
    let articles = this._model.getAll();
    if (query?.trim())    articles = articles.filter(a =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    if (category?.trim()) articles = articles.filter(a => a.category === category);

    const btn = document.getElementById('loadMoreBtn');
    if (btn) btn.style.display = articles.length > this._showing ? '' : 'none';

    this._view.renderGrid(articles.slice(0, this._showing));
  }
}
