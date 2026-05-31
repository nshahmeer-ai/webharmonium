/**
 * HarmoniumController.js — CONTROLLER LAYER
 * Wires HarmoniumView ↔ AudioEngine ↔ NoteModel.
 * Owns all event listeners for keyboard, mouse, touch, controls.
 */

class HarmoniumController {
  /**
   * @param {HarmoniumView} view
   * @param {AudioEngine}   engine
   * @param {NoteModel}     noteModel
   * @param {object}        config    — from AppModel.harmonium
   */
  constructor(view, engine, noteModel, config) {
    this._view      = view;
    this._engine    = engine;
    this._noteModel = noteModel;
    this._config    = config;

    this._currentOctave = config.octaves.default;
    this._octaveMin     = config.octaves.min;
    this._octaveMax     = config.octaves.max;

    this._pressedKeys   = new Set();    // currently held keyboard keys

    // Recording state
    this._isRecording   = false;
    this._mediaRecorder = null;
    this._recordChunks  = [];
    this._recordSeconds = 0;
    this._recordTimer   = null;

    // Connect engine callback → view
    this._engine.onBellowsChange = (count) => this._view.updateBellows(count);
  }

  /** Call after the harmonium HTML has been inserted into the DOM. */
  bindEvents() {
    this._bindKeyboard();
    this._bindKeyElements();
    this._bindVolume();
    this._bindOctave();
    this._bindStops();
    this._bindRecording();
  }

  // ── Keyboard (computer) ────────────────────────────────────────────────

  _bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.repeat) return;
      if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return;
      const key = e.key.toLowerCase();
      if (this._pressedKeys.has(key)) return;
      this._pressedKeys.add(key);
      const noteName = this._resolveNote(key);
      if (!noteName) return;
      this._playNote(noteName);
    });

    document.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      this._pressedKeys.delete(key);
      const noteName = this._resolveNote(key);
      if (!noteName) return;
      this._stopNote(noteName);
    });
  }

  _resolveNote(key) {
    const map   = this._noteModel.keyboardMap;
    const base  = map[key];
    if (!base) return null;
    if (base.includes('+1')) {
      return base.replace('+1', '') + (this._currentOctave + 1);
    }
    return base + this._currentOctave;
  }

  // ── Mouse + Touch on key elements ─────────────────────────────────────

  _bindKeyElements() {
    document.querySelectorAll('.key').forEach(el => {
      const noteName = el.dataset.note;

      // Mouse
      el.addEventListener('mousedown',  (e) => { e.preventDefault(); this._playNote(noteName); });
      el.addEventListener('mouseup',    ()  => this._stopNote(noteName));
      el.addEventListener('mouseleave', ()  => this._stopNote(noteName));

      // Touch
      el.addEventListener('touchstart', (e) => { e.preventDefault(); this._playNote(noteName); }, { passive: false });
      el.addEventListener('touchend',   (e) => { e.preventDefault(); this._stopNote(noteName); });
      el.addEventListener('touchcancel',()  => this._stopNote(noteName));
    });
  }

  _playNote(noteName) {
    const freq = this._noteModel.getFrequency(noteName);
    if (!freq) return;
    this._engine.play(noteName, freq);
    this._view.setKeyActive(noteName, true);
    // Push sargam chip
    const base   = noteName.replace(/\d/g, '');
    const sargam = this._noteModel.getSargam(base);
    this._view.pushNoteChip(sargam, noteName, freq);
  }

  _stopNote(noteName) {
    this._engine.stop(noteName);
    this._view.setKeyActive(noteName, false);
  }

  // ── Volume slider ──────────────────────────────────────────────────────

  _bindVolume() {
    const slider = document.getElementById('volumeSlider');
    if (!slider) return;
    slider.style.setProperty('--val', slider.value + '%');
    slider.addEventListener('input', () => {
      const val = slider.value / 100;
      slider.style.setProperty('--val', slider.value + '%');
      this._engine.setVolume(val);
    });
  }

  // ── Octave controls ────────────────────────────────────────────────────

  _bindOctave() {
    document.getElementById('octaveDown')?.addEventListener('click', () => {
      this._currentOctave = Math.max(this._octaveMin, this._currentOctave - 1);
      this._engine.stopAll();
      this._view.updateOctaveDisplay(this._currentOctave);
    });
    document.getElementById('octaveUp')?.addEventListener('click', () => {
      this._currentOctave = Math.min(this._octaveMax, this._currentOctave + 1);
      this._engine.stopAll();
      this._view.updateOctaveDisplay(this._currentOctave);
    });
  }

  // ── Stop knobs ─────────────────────────────────────────────────────────

  _bindStops() {
    document.querySelectorAll('.stop-knob').forEach(knob => {
      const activate = () => {
        const stopId = knob.dataset.stop;
        const active = this._engine.toggleStop(stopId);
        knob.classList.toggle('active', active);
        knob.setAttribute('aria-pressed', String(active));
      };
      knob.addEventListener('click', activate);
      knob.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
    });
  }

  // ── Recording ─────────────────────────────────────────────────────────

  _bindRecording() {
    document.getElementById('recBtn')?.addEventListener('click', () => {
      this._isRecording ? this._stopRecording() : this._startRecording();
    });

    document.getElementById('playBtn')?.addEventListener('click', function () {
      const url = this.dataset.audioUrl;
      if (url) new Audio(url).play();
    });

    document.getElementById('downloadBtn')?.addEventListener('click', function () {
      const url = this.dataset.audioUrl;
      if (!url) return;
      const a  = document.createElement('a');
      a.href   = url;
      a.download = 'webharmonium-recording.webm';
      a.click();
    });
  }

  _startRecording() {
    const stream = this._engine.getRecordingStream();
    this._recordChunks  = [];
    this._mediaRecorder = new MediaRecorder(stream);
    this._mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) this._recordChunks.push(e.data);
    };
    this._mediaRecorder.onstop = () => {
      const blob = new Blob(this._recordChunks, { type: 'audio/webm' });
      const url  = URL.createObjectURL(blob);
      this._view.showPlaybackButtons(url);
    };
    this._mediaRecorder.start(100);
    this._isRecording   = true;
    this._recordSeconds = 0;
    this._view.setRecordingState(true);
    this._recordTimer = setInterval(() => {
      this._recordSeconds++;
      this._view.updateRecordTimer(this._recordSeconds);
    }, 1000);
  }

  _stopRecording() {
    this._mediaRecorder?.stop();
    this._isRecording = false;
    clearInterval(this._recordTimer);
    this._view.setRecordingState(false);
  }
}
