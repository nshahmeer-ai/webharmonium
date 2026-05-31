/**
 * app.js — Application Entry Point
 * Imports nothing (all classes loaded via <script> in index.html).
 * Creates AppController and starts the app on DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const app = new AppController();
    await app.start();
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.warn('Service Worker registration failed: ', err);
      });
    }
  } catch (err) {
    console.error('[WebHarmonium] Startup error:', err);
    // Graceful degradation — show a minimal error state
    const main = document.getElementById('mainContent');
    if (main) {
      main.innerHTML = `
        <div style="padding:80px 24px;text-align:center;color:var(--text-secondary)">
          <div style="font-size:48px;margin-bottom:16px">🎵</div>
          <h2 style="color:var(--text-primary);margin-bottom:12px">Loading WebHarmonium...</h2>
          <p>Please refresh the page. If the issue persists, ensure you're running the site on a local server (not as a file://).</p>
          <button onclick="location.reload()" class="btn btn-gold" style="margin-top:24px">Refresh</button>
        </div>
      `;
    }
  }
});
