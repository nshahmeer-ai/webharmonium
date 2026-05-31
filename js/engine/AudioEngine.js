/**
 * AudioEngine.js — MODEL LAYER (Audio)
 * Pure Web Audio API synthesizer. Zero DOM references.
 * Emits events via callbacks registered by the controller.
 */

class AudioEngine {
  constructor() {
    this._ctx        = null;
    this._masterGain = null;
    this._reverb     = null;
    this._dest       = null;          // MediaStreamDestination for recording
    this._active     = {};            // noteName → [voice objects]
    this._bellows    = 0;             // count of simultaneously-pressed keys
    this._volume     = 0.8;
    this._stops      = { bass: true, male: true, treble: false };

    // Callbacks (set by controller)
    this.onBellowsChange = null;      // (activeCount) => void
  }

  // ── Lazy init (must be triggered by user gesture) ──────────────────────
  _init() {
    if (this._ctx) return;
    this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    this._dest = this._ctx.createMediaStreamDestination();

    this._masterGain = this._ctx.createGain();
    this._masterGain.gain.value = this._volume;

    this._reverb = this._ctx.createConvolver();
    this._reverb.buffer = this._buildReverbBuffer(1.4);

    const reverbGain = this._ctx.createGain();
    reverbGain.gain.value = 0.22;
    const dryGain = this._ctx.createGain();
    dryGain.gain.value = 0.85;

    this._masterGain.connect(dryGain);
    this._masterGain.connect(this._reverb);
    this._reverb.connect(reverbGain);

    dryGain.connect(this._ctx.destination);
    dryGain.connect(this._dest);
    reverbGain.connect(this._ctx.destination);
    reverbGain.connect(this._dest);
  }

  _buildReverbBuffer(duration) {
    const rate   = this._ctx.sampleRate;
    const length = Math.floor(rate * duration);
    const buf    = this._ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
      }
    }
    return buf;
  }

  // ── Reed voice factory ──────────────────────────────────────────────────
  _createVoice(freq, detune, gainVal) {
    const osc1   = this._ctx.createOscillator();
    const osc2   = this._ctx.createOscillator();
    const oscGain = this._ctx.createGain();
    const filter  = this._ctx.createBiquadFilter();
    const env     = this._ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';
    osc1.frequency.value = freq;
    osc2.frequency.value = freq;
    osc1.detune.value    = detune;
    osc2.detune.value    = -detune * 0.4;

    filter.type          = 'lowpass';
    filter.frequency.value = freq * 4.5;
    filter.Q.value       = 1.2;

    oscGain.gain.value   = gainVal;
    env.gain.setValueAtTime(0, this._ctx.currentTime);
    env.gain.linearRampToValueAtTime(1, this._ctx.currentTime + 0.025);

    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(filter);
    filter.connect(env);
    env.connect(this._masterGain);

    osc1.start();
    osc2.start();
    return { osc1, osc2, env };
  }

  // ── Public API ──────────────────────────────────────────────────────────

  /** Play a note by its full name (e.g. 'C4', 'Gb5'). */
  play(noteName, freq) {
    this._init();
    if (this._ctx.state === 'suspended') this._ctx.resume();
    if (this._active[noteName]) return;

    const voices = [];
    if (this._stops.bass)   voices.push(this._createVoice(freq * 0.5,  -8, 0.45));
    if (this._stops.male) {
      voices.push(this._createVoice(freq,  6, 0.7));
      voices.push(this._createVoice(freq, -5, 0.5));
    }
    if (this._stops.treble) voices.push(this._createVoice(freq * 2, 4, 0.3));

    this._active[noteName] = voices;
    this._bellows++;
    this.onBellowsChange?.(this._bellows);
  }

  /** Stop a note. */
  stop(noteName) {
    const voices = this._active[noteName];
    if (!voices) return;
    const fade = 0.18;
    voices.forEach(v => {
      v.env.gain.setTargetAtTime(0, this._ctx.currentTime, fade * 0.4);
      v.osc1.stop(this._ctx.currentTime + fade);
      v.osc2.stop(this._ctx.currentTime + fade);
    });
    delete this._active[noteName];
    this._bellows = Math.max(0, this._bellows - 1);
    this.onBellowsChange?.(this._bellows);
  }

  /** Stop all active notes. */
  stopAll() {
    Object.keys(this._active).forEach(n => this.stop(n));
  }

  /** Set master volume 0–1. */
  setVolume(val) {
    this._volume = val;
    if (this._masterGain) {
      this._masterGain.gain.setTargetAtTime(val, this._ctx.currentTime, 0.05);
    }
  }

  /** Toggle a stop (bass | male | treble). */
  toggleStop(stopId) {
    if (stopId in this._stops) {
      this._stops[stopId] = !this._stops[stopId];
      this.stopAll();
    }
    return this._stops[stopId];
  }

  /** Returns the MediaStream for recording. Initialises audio if needed. */
  getRecordingStream() {
    this._init();
    return this._dest.stream;
  }
}
