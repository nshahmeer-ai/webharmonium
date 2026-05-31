/**
 * AIView.js — VIEW LAYER
 * Renders the AI Music Assistant UI, form elements, key configuration panels,
 * loading animations, and song results.
 */

class AIView {
  constructor() {}

  /** Main rendering method for the AI Section container */
  render(hasKey, savedKey = '') {
    const keyMasked = savedKey ? `${savedKey.slice(0, 6)}...${savedKey.slice(-4)}` : '';
    
    return `
      <section class="ai-section" id="ai-assistant-section">
        <div class="container">
          <div class="section-header" style="text-align: center; margin-bottom: 40px;">
            <span class="badge" style="background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); color:var(--accent-gold);">✨ Phase 3: AI Feature</span>
            <h2 style="margin-top: 10px;">AI Music <span class="text-gold">Assistant</span></h2>
            <p class="lead" style="max-width: 600px; margin: 10px auto 0;">Auto-generate harmonium notes and playing guides for any song or melody globally using advanced AI.</p>
          </div>

          <div class="ai-grid">
            <!-- Left Panel: Form & Key Setup -->
            <div class="ai-panel ai-form-panel">
              <!-- API Key Config Card -->
              <div class="glass-card key-config-card ${hasKey ? 'configured' : 'needs-config'}">
                <div class="card-header">
                  <h3>🔑 Gemini API Key Settings</h3>
                  <span class="status-indicator">${hasKey ? '✓ Active' : '⚠ Action Required'}</span>
                </div>
                
                <div class="config-toggle-view" id="configToggleView">
                  ${hasKey ? `
                    <div class="key-status-row">
                      <span class="masked-key">Key: <code>${keyMasked}</code></span>
                      <button class="btn btn-outline btn-sm" id="btnEditKey">Edit Key</button>
                    </div>
                  ` : `
                    <p style="font-size:13px; color:var(--text-secondary); margin-bottom:12px;">
                      To generate notes for free, you need a Gemini API Key. 
                      <a href="https://aistudio.google.com/" target="_blank" rel="noopener" class="text-gold" style="text-decoration:underline;">Get a free key here</a>.
                    </p>
                    <div class="key-input-row">
                      <input type="password" id="inputApiKey" placeholder="AIzaSy..." class="form-input" />
                      <button class="btn btn-gold" id="btnSaveKey">Save Key</button>
                    </div>
                  `}
                </div>
              </div>

              <!-- Song Input Card -->
              <div class="glass-card input-card ${!hasKey ? 'disabled' : ''}">
                <h3>✨ Request Harmonium Notes</h3>
                <p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">
                  Enter a song title, artist, or paste a couple of lines of lyrics. The AI will transcribe the melody for you.
                </p>
                
                <div class="form-group">
                  <label for="inputSongQuery">Song Name / Lyrics</label>
                  <input type="text" id="inputSongQuery" placeholder="e.g. Tajdar-e-Haram, Amazing Grace, or Lab Pe Aati Hai..." class="form-input" ${!hasKey ? 'disabled' : ''} />
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label for="selectNotationFormat">Preferred Notation</label>
                    <select id="selectNotationFormat" class="form-input" ${!hasKey ? 'disabled' : ''}>
                      <option value="sargam">Indian Sargam (Sa Re Ga)</option>
                      <option value="western">Western Notes (C D E)</option>
                    </select>
                  </div>
                </div>

                <button class="btn btn-gold btn-lg btn-block" id="btnGenerateAI" ${!hasKey ? 'disabled' : ''}>
                  ✨ Generate Harmonium Notes
                </button>
              </div>
            </div>

            <!-- Right Panel: Results View -->
            <div class="ai-panel ai-results-panel">
              <div class="glass-card results-card" id="aiResultsContainer">
                <div class="results-empty-state">
                  <div class="empty-icon">✨</div>
                  <h4>No Notes Generated Yet</h4>
                  <p>Configure your API Key and submit a song query on the left. The AI-generated notation and interactive practice rows will appear here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /** Renders a beautiful pulsing loading animation */
  renderLoading() {
    return `
      <div class="results-loading-state">
        <div class="musical-waves">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h4>AI is Transcribing Melody...</h4>
        <p>Analyzing song structures and mapping harmonium key positions. This usually takes 4-7 seconds.</p>
      </div>
    `;
  }

  /** Renders the results of AI generation */
  renderResults(data, format = 'sargam') {
    const isSargam = format === 'sargam';
    
    let linesHtml = '';
    data.lines.forEach((line, idx) => {
      const displayNotes = isSargam ? line.sargam : line.notes;
      
      // Build notes row
      let notesRow = '';
      displayNotes.forEach((n, nIdx) => {
        const correspondingWestern = line.notes[nIdx] || 'C4';
        notesRow += `<span class="note-item" data-note="${correspondingWestern}">${n}</span>`;
      });

      linesHtml += `
        <div class="result-line-row" data-line-index="${idx}">
          <div class="line-meta">
            <button class="play-line-btn" data-line-index="${idx}" aria-label="Play this line">
              <span class="play-icon">▶</span>
            </button>
          </div>
          <div class="line-content">
            <div class="notes-line-container">
              ${notesRow}
            </div>
            <div class="lyrics-line-text">${line.lyric}</div>
          </div>
        </div>
      `;
    });

    return `
      <div class="results-success-view">
        <div class="results-success-header">
          <div>
            <span class="badge badge-green">✓ Generated</span>
            <h3 id="resultSongTitle" style="margin-top:4px; font-family:var(--font-heading); color:var(--text-primary);">${data.songTitle}</h3>
            <span style="font-size:12px; color:var(--text-secondary);">Suggested Scale: <strong>${data.key}</strong></span>
          </div>
          <div class="notation-toggle-pill">
            <button class="toggle-pill-btn ${isSargam ? 'active' : ''}" data-format="sargam">Sargam</button>
            <button class="toggle-pill-btn ${!isSargam ? 'active' : ''}" data-format="western">Western</button>
          </div>
        </div>

        <div class="result-lines-list">
          ${linesHtml}
        </div>
        
        <div class="results-success-footer">
          <p>💡 Click the play icon (▶) on any row to hear the sequence played step-by-step and watch the keys highlight above.</p>
        </div>
      </div>
    `;
  }

  /** Renders an error block */
  renderError(message) {
    return `
      <div class="results-error-state">
        <div class="error-icon">❌</div>
        <h4>Generation Failed</h4>
        <p>${message}</p>
        <button class="btn btn-outline btn-sm" id="btnRetryAI" style="margin-top: 14px;">Try Again</button>
      </div>
    `;
  }
}
