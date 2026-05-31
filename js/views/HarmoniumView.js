/**
 * HarmoniumView.js — VIEW LAYER
 * Renders the entire virtual harmonium instrument UI shell.
 * Receives config data; produces HTML. Zero audio logic. Zero event binding.
 * The controller attaches all events after render.
 */

class HarmoniumView {
  /**
   * @param {object} config  — from AppModel.harmonium
   * @param {NoteModel} noteModel
   */
  render(config, noteModel) {
    const stops = config.stops.map(s => /* html */`
      <div class="stop-knob ${s.active ? 'active' : ''}"
           data-stop="${s.id}"
           role="button"
           aria-pressed="${s.active}"
           aria-label="${s.label} Stop"
           tabindex="0">
        <div class="knob"></div>
        <label>${s.label}</label>
      </div>
    `).join('');

    const keyboard = this._renderKeyboard(noteModel, config.octaves.default);

    return /* html */`
      <section class="harmonium-section" id="harmonium" aria-label="Virtual Harmonium">
        <div class="section-header">
          <span class="label">Interactive Instrument</span>
          <h2>Virtual <span class="text-gold">Harmonium</span></h2>
          <div class="section-divider"></div>
          <p>Click keys, use your keyboard, or touch on mobile. The authentic multi-reed sound engine recreates the warm, resonant tone of a real harmonium.</p>
        </div>

        <div class="harmonium-wrapper" role="application" aria-label="Interactive Harmonium">

          <div class="bellows" id="bellows" aria-hidden="true"></div>

          <div class="harmonium-controls">
            <div class="harmonium-brand">${config.brand}</div>
            <div class="stops-group" role="group" aria-label="Reed Stops">${stops}</div>
            <div class="volume-control">
              <label for="volumeSlider">🔊</label>
              <input type="range" class="volume-slider" id="volumeSlider"
                     min="${config.volume.min}" max="${config.volume.max}"
                     value="${config.volume.default}" aria-label="Volume" />
            </div>
          </div>

          <div class="notes-visualizer" id="notesVisualizer" aria-live="polite" aria-label="Notes being played">
            <span style="font-size:11px;color:var(--text-secondary);margin-right:8px;flex-shrink:0">Playing:</span>
          </div>

          <div class="octave-control" role="group" aria-label="Octave control">
            <button class="octave-btn" id="octaveDown" aria-label="Lower octave">−</button>
            <span class="octave-display" id="octaveDisplay">Octave ${config.octaves.default}</span>
            <button class="octave-btn" id="octaveUp" aria-label="Raise octave">+</button>
          </div>

          <div class="keyboard-container">
            <div class="keyboard" id="harmoniumKeyboard" role="group" aria-label="Harmonium keyboard">
              ${keyboard}
            </div>
          </div>

          <div class="harmonium-footer">
            <div class="recording-panel" role="group" aria-label="Recording controls">
              <button class="rec-btn" id="recBtn" title="Start/Stop Recording" aria-label="Toggle recording">⏺</button>
              <span class="rec-timer" id="recTimer" aria-live="polite">00:00</span>
              <button class="play-btn" id="playBtn" style="display:none" aria-label="Play recording">▶ Play</button>
              <button class="download-btn" id="downloadBtn" style="display:none" aria-label="Download recording">⬇ Save</button>
            </div>
            <div class="keyboard-hint" aria-label="Keyboard shortcuts">
              White keys: <kbd class="kbd">${config.keyboardHintWhite}</kbd>
              &nbsp;&nbsp;Black keys: <kbd class="kbd">${config.keyboardHintBlack}</kbd>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // ── Private: build keyboard HTML ────────────────────────────────────────
  _renderKeyboard(noteModel, defaultOctave) {
    const whiteNotes = noteModel.whiteNotes;
    const blackNotes = noteModel.blackNotes;
    const octaves    = noteModel.octaves;

    let html       = '';
    let whiteIndex = 0;

    octaves.forEach(oct => {
      whiteNotes.forEach(note => {
        const noteName = note + oct;
        const sargam   = noteModel.getSargam(note);
        const shortcut = oct === defaultOctave ? this._shortcutFor(note, false, noteModel) : '';

        // White key
        html += /* html */`
          <div class="key white" data-note="${noteName}" id="key-${noteName}">
            ${shortcut ? `<span class="key-shortcut">${shortcut}</span>` : ''}
            <span class="key-label">${sargam}<br><small style="font-size:8px;opacity:0.5">${note}${oct}</small></span>
          </div>
        `;

        // Black key (positioned absolutely via JS after render)
        const blackBase = blackNotes[note];
        if (blackBase) {
          const blackNoteName = blackBase + oct;
          const bSargam  = noteModel.getSargam(blackBase);
          const bShortcut = oct === defaultOctave ? this._shortcutFor(blackBase, true, noteModel) : '';
          html += /* html */`
            <div class="key black" data-note="${blackNoteName}" id="key-${blackNoteName}" data-white-index="${whiteIndex}">
              ${bShortcut ? `<span class="key-shortcut">${bShortcut}</span>` : ''}
              <span class="key-label">${bSargam}</span>
            </div>
          `;
        }

        whiteIndex++;
      });
    });

    return html;
  }

  /** Find the keyboard shortcut character for a base note. */
  _shortcutFor(base, isBlack, noteModel) {
    const map = noteModel.keyboardMap;
    for (const [key, val] of Object.entries(map)) {
      const vBase   = val.replace('+1', '');
      const isPlus1 = val.includes('+1');
      if (!isPlus1 && vBase === base) return key.toUpperCase();
    }
    return '';
  }

  // ── Post-render: position black keys ────────────────────────────────────
  positionBlackKeys() {
    document.querySelectorAll('.key.black').forEach(el => {
      const wIdx = parseInt(el.dataset.whiteIndex ?? 0, 10);
      el.style.left = (wIdx * 50 + 34) + 'px';
    });
  }

  // ── Note visualizer update ───────────────────────────────────────────────
  pushNoteChip(sargam, noteName, freq) {
    const container = document.getElementById('notesVisualizer');
    if (!container) return;
    const chip = document.createElement('span');
    chip.className = 'note-chip';
    chip.textContent = sargam;
    chip.title = `${noteName} | ${freq?.toFixed(1) ?? '?'} Hz`;
    container.insertBefore(chip, container.children[1] ?? null);
    // Fade old chips
    setTimeout(() => {
      if (chip.parentNode) {
        chip.style.opacity = '0.35';
        chip.style.transition = 'opacity 0.8s ease';
      }
    }, 800);
    // Keep max 12
    const chips = container.querySelectorAll('.note-chip');
    if (chips.length > 12) chips[chips.length - 1].remove();
  }

  // ── Bellows visual update ────────────────────────────────────────────────
  updateBellows(activeCount) {
    const el = document.getElementById('bellows');
    if (!el) return;
    if (activeCount > 0) {
      el.style.boxShadow = `0 0 20px rgba(212,175,55,${Math.min(0.6, activeCount * 0.15)})`;
      el.style.transform = `scaleY(${1 + activeCount * 0.04})`;
    } else {
      el.style.boxShadow = '';
      el.style.transform = '';
    }
  }

  // ── Key active state ─────────────────────────────────────────────────────
  setKeyActive(noteName, active) {
    const el = document.getElementById('key-' + noteName);
    if (el) el.classList.toggle('active', active);
  }

  // ── Octave display ───────────────────────────────────────────────────────
  updateOctaveDisplay(octave) {
    const el = document.getElementById('octaveDisplay');
    if (el) el.textContent = `Octave ${octave}`;
  }

  // ── Recording UI ─────────────────────────────────────────────────────────
  setRecordingState(isRecording) {
    const btn = document.getElementById('recBtn');
    btn?.classList.toggle('recording', isRecording);
  }

  updateRecordTimer(seconds) {
    const el = document.getElementById('recTimer');
    if (el) {
      const m = String(Math.floor(seconds / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      el.textContent = `${m}:${s}`;
    }
  }

  showPlaybackButtons(audioUrl) {
    const playBtn = document.getElementById('playBtn');
    const dlBtn   = document.getElementById('downloadBtn');
    if (playBtn) {
      playBtn.style.display = '';
      playBtn.dataset.audioUrl = audioUrl;
    }
    if (dlBtn) {
      dlBtn.style.display = '';
      dlBtn.dataset.audioUrl = audioUrl;
    }
  }
}
