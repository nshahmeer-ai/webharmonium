/**
 * ArticleModel.js — MODEL LAYER
 * Loads and exposes articles data from data/articles.json.
 * No DOM. No rendering. Supports filtering and lookup.
 */

class ArticleModel {
  constructor() {
    this._articles = [];
  }

  async load(basePath = '') {
    const res        = await fetch(`${basePath}data/articles.json`);
    const data       = await res.json();
    this._articles   = data.articles ?? [];
    return this;
  }

  /** Return all articles. */
  getAll()                     { return this._articles; }

  /** Return the first N articles. */
  getTop(n)                    { return this._articles.slice(0, n); }

  /** Filter articles by category. */
  getByCategory(cat)           { return this._articles.filter(a => a.category === cat); }

  /** Get one article by its slug. */
  getBySlug(slug)              { return this._articles.find(a => a.slug === slug) ?? null; }

  /** Return all unique categories. */
  getCategories()              { return [...new Set(this._articles.map(a => a.category))]; }

  /** Search articles by keyword (title + excerpt). */
  search(query) {
    const q = query.toLowerCase();
    return this._articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q)
    );
  }
}
