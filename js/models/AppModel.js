/**
 * AppModel.js — MODEL LAYER
 * Loads and exposes global site configuration from data/site.json.
 * Single source of truth for: nav, hero, stats, features, CTA, footer.
 * No DOM. No rendering.
 */

class AppModel {
  constructor() {
    this._data = null;
  }

  async load(basePath = '') {
    const res  = await fetch(`${basePath}data/site.json`);
    this._data = await res.json();
    return this;
  }

  get site()       { return this._data.site; }
  get nav()        { return this._data.nav; }
  get hero()       { return this._data.hero; }
  get stats()      { return this._data.stats; }
  get features()   { return this._data.features; }
  get harmonium()  { return this._data.harmonium; }
  get raagChips()  { return this._data.raagChips; }
  get cta()        { return this._data.cta; }
  get footer()     { return this._data.footer; }
  get seo()        { return this._data.seo; }
}
