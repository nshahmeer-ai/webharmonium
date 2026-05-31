/**
 * AIController.js — CONTROLLER LAYER
 * Coordinates user events, key configs, AI generation queries, and note playback
 * with AudioEngine and HarmoniumView integration.
 */

class AIController {
  /**
   * @param {AIModel} aiModel 
   * @param {AIView} aiView 
   * @param {NoteModel} noteModel 
   * @param {AudioEngine} audioEngine 
   * @param {HarmoniumView} harmoniumView 
   */
  constructor(aiModel, aiView, noteModel, audioEngine, harmoniumView) {
    this._aiModel = aiModel;
    this._aiView = aiView;
    this._noteModel = noteModel;
    this._audioEngine = audioEngine;
    this._harmoniumView = harmoniumView;

    this._container = null;
    this._currentData = null;
    this._currentFormat = 'sargam';
    this._isPlaying = false;
    this._activePlayButton = null;
  }

  /** Initialize the controller by binding events and setting mounting point */
  init(mountElement) {
    this._container = mountElement;
    this.render();
  }

  /** Render the initial HTML panel */
  render() {
    const hasKey = this._aiModel.hasApiKey();
    const savedKey = this._aiModel.getApiKey();
    
    this._container.innerHTML = this._aiView.render(hasKey, savedKey);
    this.bindEvents();

    if (this._currentData) {
      this.renderResults();
    }
  }

  /** Bind active user events */
  bindEvents() {
    // Save Key button
    const btnSaveKey = this._container.querySelector('#btnSaveKey');
    if (btnSaveKey) {
      btnSaveKey.addEventListener('click', () => {
        const input = this._container.querySelector('#inputApiKey');
        const key = input ? input.value : '';
        if (!key) {
          alert('Please enter a valid API key.');
          return;
        }
        this._aiModel.saveApiKey(key);
        this.render();
      });
    }

    // Edit Key button
    const btnEditKey = this._container.querySelector('#btnEditKey');
    if (btnEditKey) {
      btnEditKey.addEventListener('click', () => {
        this._aiModel.saveApiKey('');
        this.render();
      });
    }

    // Generate AI notes
    const btnGenerateAI = this._container.querySelector('#btnGenerateAI');
    if (btnGenerateAI) {
      btnGenerateAI.addEventListener('click', () => this.handleGeneration());
    }

    // Notation format select box
    const selectNotationFormat = this._container.querySelector('#selectNotationFormat');
    if (selectNotationFormat) {
      selectNotationFormat.addEventListener('change', (e) => {
        this._currentFormat = e.target.value;
      });
    }
  }

  /** Render Success results view */
  renderResults() {
    const resultsContainer = this._container.querySelector('#aiResultsContainer');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = this._aiView.renderResults(this._currentData, this._currentFormat);

    // Bind playback click handlers
    const playButtons = resultsContainer.querySelectorAll('.play-line-btn');
    playButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnElement = e.currentTarget;
        const lineIdx = parseInt(btnElement.getAttribute('data-line-index'));
        const line = this._currentData.lines[lineIdx];
        if (line) {
          this.playLineSequence(line.notes, btnElement);
        }
      });
    });

    // Bind notation toggle pills in success header
    const toggleBtns = resultsContainer.querySelectorAll('.notation-toggle-pill button');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this._currentFormat = e.target.getAttribute('data-format');
        this.renderResults();
      });
    });
  }

  /** Handles the note generation pipeline */
  async handleGeneration() {
    const inputQuery = this._container.querySelector('#inputSongQuery');
    const query = inputQuery ? inputQuery.value.trim() : '';

    if (!query) {
      alert('Please enter a song name or lyrics.');
      return;
    }

    const resultsContainer = this._container.querySelector('#aiResultsContainer');
    if (resultsContainer) {
      resultsContainer.innerHTML = this._aiView.renderLoading();
    }

    try {
      this._currentData = await this._aiModel.generateNotes(query);
      this.renderResults();
    } catch (err) {
      console.error('[AIController] Generation failed:', err);
      if (resultsContainer) {
        resultsContainer.innerHTML = this._aiView.renderError(err.message);
        
        // Bind retry button
        const btnRetry = resultsContainer.querySelector('#btnRetryAI');
        if (btnRetry) {
          btnRetry.addEventListener('click', () => this.handleGeneration());
        }
      }
    }
  }

  /** Plays note sequence on the harmonium line-by-line */
  async playLineSequence(notes, button) {
    if (this._isPlaying) {
      // If clicking same button that is currently playing, we ignore or skip.
      if (this._activePlayButton === button) return;
      return;
    }

    this._isPlaying = true;
    this._activePlayButton = button;
    button.disabled = true;
    button.classList.add('playing');
    button.innerHTML = '<span class="play-icon">⏸</span>';

    // Resume AudioContext if suspended
    const ctx = this._audioEngine._ctx;
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
    }

    for (const noteName of notes) {
      const trimmedNote = noteName.trim();
      const freq = this._noteModel.getFrequency(trimmedNote);

      if (freq) {
        // Highlight active key visually
        this._harmoniumView.setKeyActive(trimmedNote, true);
        
        // Trigger sound synthesiser voice
        this._audioEngine.play(trimmedNote, freq);
      }

      // Wait 550ms before releasing note
      await new Promise(resolve => setTimeout(resolve, 550));

      if (freq) {
        this._harmoniumView.setKeyActive(trimmedNote, false);
        this._audioEngine.stop(trimmedNote);
      }

      // Brief gap between notes (80ms)
      await new Promise(resolve => setTimeout(resolve, 80));
    }

    button.disabled = false;
    button.classList.remove('playing');
    button.innerHTML = '<span class="play-icon">▶</span>';
    this._isPlaying = false;
    this._activePlayButton = null;
  }
}
