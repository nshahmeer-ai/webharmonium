/**
 * NoteModel.js — MODEL LAYER
 * Loads and exposes note/frequency/keyboard-map data from data/notes.json.
 * No DOM. No rendering. Pure data access.
 */

class NoteModel {
  constructor() {
    this._data = null;
  }

  async load(basePath = '') {
    const res  = await fetch(`${basePath}data/notes.json`);
    this._data = await res.json();
    return this;
  }

  /** Full note name → frequency. e.g. 'C4' → 261.63 */
  getFrequency(noteName) {
    return this._data.frequencies[noteName] ?? null;
  }

  /** All frequencies map. */
  get frequencies()   { return this._data.frequencies; }

  /** Sargam label for a base note id. e.g. 'C' → 'Sa' */
  getSargam(noteId) {
    return this._data.notes.find(n => n.id === noteId)?.sargam ?? noteId;
  }

  /** Full note metadata array. */
  get notes()         { return this._data.notes; }

  /** Keyboard char → base note id mapping. */
  get keyboardMap()   { return this._data.keyboardMap; }

  /** White note base ids in order. */
  get whiteNotes()    { return this._data.whiteNotes; }

  /** Black note map: white base → black base. */
  get blackNotes()    { return this._data.blackNotes; }

  /** Octave numbers to render. */
  get octaves()       { return this._data.octaves; }
}
