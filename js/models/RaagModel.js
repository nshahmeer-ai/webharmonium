/**
 * RaagModel.js — MODEL LAYER
 * Loads and exposes raag data from data/raags.json.
 * No DOM. No rendering.
 */

class RaagModel {
  constructor() {
    this._raags = [];
  }

  async load() {
    const res    = await fetch('data/raags.json');
    const data   = await res.json();
    this._raags  = data.raags ?? [];
    return this;
  }

  getAll()                 { return this._raags; }
  getById(id)              { return this._raags.find(r => r.id === id) ?? null; }
  getByDifficulty(level)   { return this._raags.filter(r => r.difficulty === level); }
  getByThaat(thaat)        { return this._raags.filter(r => r.thaat === thaat); }

  /** Return raag chip display objects: { label, href }. */
  getChips() {
    return this._raags.map(r => ({
      label: `🎵 ${r.name}`,
      href:  `#`,          // Will route to raag page in Phase 2
      id:    r.id,
    }));
  }
}
