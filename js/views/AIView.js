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
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (!isLocal) {
      // Production View: Professional "Coming Soon" Teaser Card
      return `
        <section class="ai-section" id="ai-assistant-section">
          <div class="container">
            <div class="section-header" style="text-align: center; margin-bottom: 40px;">
              <span class="badge" style="background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); color:var(--accent-gold); display:inline-flex; align-items:center; gap:4px;">
                <i data-lucide="sparkles" style="width:12px; height:12px;"></i> Phase 3 Preview
              </span>
              <h2 style="margin-top: 10px;">AI Music <span class="text-gold">Assistant</span></h2>
              <p class="lead" style="max-width: 600px; margin: 10px auto 0;">Auto-generate harmonium notes and playing guides for any song or melody globally using advanced AI.</p>
            </div>

            <div class="glass-card" style="text-align: center; padding: 60px 40px; max-width: 720px; margin: 0 auto; border-color: rgba(212,175,55,0.22);">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.22); border-radius: 50%; margin-bottom: 24px; color: var(--accent-gold);">
                <i data-lucide="sparkles" style="width: 32px; height: 32px;"></i>
              </div>
              <div style="margin-bottom:16px;">
                <span class="badge" style="background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3); color: var(--cta);">✨ AI Assistant — Coming Soon</span>
              </div>
              <h3 style="font-family: var(--font-heading); font-size: 24px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">AI Harmonium Song Transcriber</h3>
              <p style="color: var(--text-secondary); line-height: 1.6; max-width: 540px; margin: 0 auto 32px; font-size: 15px;">
                Get instant harmonium notes (Sargam and Western) for any song, lyrics, or melody on demand. Listen to generated previews played note-by-note and follow along with visual keys highlighting in real-time.
              </p>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); text-align: left; max-width: 520px; margin: 0 auto 40px; gap: 16px;">
                <div style="display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--text-secondary);"><i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--cta); flex-shrink: 0; margin-top: 1px;"></i> <span>Sargam &amp; Western notations for any lyrics</span></div>
                <div style="display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--text-secondary);"><i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--cta); flex-shrink: 0; margin-top: 1px;"></i> <span>Note-by-note visual keyboard walkthroughs</span></div>
                <div style="display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--text-secondary);"><i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--cta); flex-shrink: 0; margin-top: 1px;"></i> <span>Zero-latency playback synth rendering</span></div>
                <div style="display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--text-secondary);"><i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--cta); flex-shrink: 0; margin-top: 1px;"></i> <span>Powered by Google Gemini 2.5 Flash</span></div>
              </div>

              <div style="font-size: 12px; color: var(--text-secondary); border-top: 1px solid var(--border); padding-top: 20px;">
                🛡️ Stored 100% locally on your browser. Zero backend data sharing.
              </div>
            </div>
          </div>
        </section>
      `;
    }

    // Localhost View: Active AI Assistant Panel (For Local Testing/Admin)
    return `
      <section class="ai-section" id="ai-assistant-section">
        <div class="container">
          <div class="section-header" style="text-align: center; margin-bottom: 40px;">
            <span class="badge" style="background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.3); color:var(--accent-gold); display:inline-flex; align-items:center; gap:4px;">
              <i data-lucide="sparkles" style="width:12px; height:12px;"></i> Phase 3: AI Feature
            </span>
            <h2 style="margin-top: 10px;">AI Music <span class="text-gold">Assistant</span></h2>
            <p class="lead" style="max-width: 600px; margin: 10px auto 0;">Auto-generate harmonium notes and playing guides for any song or melody globally using advanced AI.</p>
          </div>

          <div class="ai-grid">
            <!-- Left Panel: Form & Key Setup -->
            <div class="ai-panel ai-form-panel">
              <!-- API Key Config Card -->
              <div class="glass-card key-config-card ${hasKey ? 'configured' : 'needs-config'}">
                <div class="card-header">
                  <h3 style="display:inline-flex; align-items:center; gap:6px; margin:0;"><i data-lucide="key" style="width:16px; height:16px; color:var(--accent-gold);"></i> Gemini API Key Settings</h3>
                  <span class="status-indicator" style="display:inline-flex; align-items:center; gap:4px;">
                    ${hasKey ? '<i data-lucide="check" style="width:10px; height:10px;"></i> Active' : '<i data-lucide="alert-triangle" style="width:10px; height:10px;"></i> Action Required'}
                  </span>
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
                <h3 style="display:inline-flex; align-items:center; gap:6px; margin:0 0 10px;"><i data-lucide="music" style="width:16px; height:16px; color:var(--accent-gold);"></i> Request Harmonium Notes</h3>
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

                <button class="btn btn-gold btn-lg btn-block" id="btnGenerateAI" ${!hasKey ? 'disabled' : ''} style="display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                  <i data-lucide="sparkles" style="width:16px; height:16px;"></i> Generate Harmonium Notes
                </button>
              </div>
            </div>

            <!-- Right Panel: Results View -->
            <div class="ai-panel ai-results-panel">
              <div class="glass-card results-card" id="aiResultsContainer">
                <div class="results-empty-state">
                  <div class="empty-icon" style="display:flex; align-items:center; justify-content:center; margin-bottom:12px;"><i data-lucide="sparkles" style="width:40px; height:40px; color:var(--accent-gold); opacity:0.6;"></i></div>
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
            <span class="badge badge-green" style="display:inline-flex; align-items:center; gap:4px;"><i data-lucide="check" style="width:10px; height:10px;"></i> Generated</span>
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
        
        <div class="results-success-footer" style="display:inline-flex; align-items:center; gap:6px;">
          <i data-lucide="info" style="width:14px; height:14px; color:var(--accent-gold); flex-shrink:0;"></i>
          <p style="margin:0;">Click the play icon (▶) on any row to hear the sequence played step-by-step and watch the keys highlight above.</p>
        </div>
      </div>
    `;
  }

  /** Renders an error block */
  renderError(message) {
    return `
      <div class="results-error-state">
        <div class="error-icon" style="display:flex; align-items:center; justify-content:center; margin-bottom:12px;"><i data-lucide="alert-circle" style="width:40px; height:40px; color:#EF4444;"></i></div>
        <h4>Generation Failed</h4>
        <p>${message}</p>
        <button class="btn btn-outline btn-sm" id="btnRetryAI" style="margin-top: 14px;">Try Again</button>
      </div>
    `;
  }
}
