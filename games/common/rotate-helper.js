/**
 * AshiGame Universal Mobile Landscape Switcher
 * Provides an on-screen rotate button for mobile/tablet players.
 * Works seamlessly in both iframe (portal) and standalone new tabs.
 */
(function() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  function initRotateHelper() {
    // If inside portal iframe, the portal's stage frame already has #stageRotateLandscapeBtn
    // We only need the floating button in standalone window/tabs.
    if (window.self !== window.top) {
      return;
    }

    if (document.getElementById('ashiFloatingRotateBtn')) return;

    // Inject styles
    const style = document.createElement('style');
    style.id = 'ashiRotateHelperStyles';
    style.textContent = `
      .ashi-rotate-btn-pill {
        position: fixed !important;
        top: calc(env(safe-area-inset-top, 0px) + 10px) !important;
        right: calc(env(safe-area-inset-right, 0px) + 12px) !important;
        z-index: 9999999 !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        background: rgba(15, 17, 23, 0.88) !important;
        color: #f8fafc !important;
        border: 1px solid rgba(255, 255, 255, 0.28) !important;
        padding: 6px 13px !important;
        border-radius: 999px !important;
        font-family: 'Kanit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        letter-spacing: 0.2px !important;
        cursor: pointer !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5) !important;
        transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      .ashi-rotate-btn-pill:hover, .ashi-rotate-btn-pill:active {
        transform: scale(1.05) !important;
        background: rgba(30, 35, 50, 0.96) !important;
        border-color: #f59e0b !important;
      }
      .ashi-rotate-btn-pill.is-active {
        background: #2563eb !important;
        border-color: #60a5fa !important;
        color: #ffffff !important;
      }
      .ashi-rotate-btn-pill svg {
        width: 14px !important;
        height: 14px !important;
        display: block !important;
        flex-shrink: 0 !important;
      }

      /* Force landscape container rotation */
      html.ashi-force-landscape,
      body.ashi-force-landscape {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        width: 100dvh !important;
        height: 100dvw !important;
        max-width: none !important;
        max-height: none !important;
        margin: 0 !important;
        transform: translate(-50%, -50%) rotate(90deg) !important;
        transform-origin: center center !important;
        overflow: hidden !important;
        z-index: 999999 !important;
      }
    `;
    document.head.appendChild(style);

    // Create Button
    const btn = document.createElement('button');
    btn.id = 'ashiFloatingRotateBtn';
    btn.className = 'ashi-rotate-btn-pill';
    btn.setAttribute('title', 'หมุนหน้าจอแนวนอน / แนวตั้ง');
    btn.setAttribute('aria-label', 'หมุนหน้าจอแนวนอน');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
      </svg>
      <span class="rotate-text">แนวนอน</span>
    `;

    document.body.appendChild(btn);

    const textSpan = btn.querySelector('.rotate-text');
    let isForced = false;

    function setRotatedState(state) {
      isForced = state;
      btn.classList.toggle('is-active', isForced);
      if (textSpan) {
        textSpan.textContent = isForced ? 'แนวตั้ง' : 'แนวนอน';
      }
      document.documentElement.classList.toggle('ashi-force-landscape', isForced);
      document.body.classList.toggle('ashi-force-landscape', isForced);

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('orientationchange'));
      }, 100);
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const next = !isForced;
      if (next) {
        try {
          if (screen.orientation && typeof screen.orientation.lock === 'function') {
            screen.orientation.lock('landscape').catch(() => {});
          }
        } catch (err) {}
      } else {
        try {
          if (screen.orientation && typeof screen.orientation.unlock === 'function') {
            screen.orientation.unlock();
          }
        } catch (err) {}
      }
      setRotatedState(next);
    });

    // Auto cleanup if user physically turns device to landscape
    function checkPhysicalOrientation() {
      if (window.innerWidth > window.innerHeight && isForced) {
        setRotatedState(false);
      }
    }

    window.addEventListener('resize', checkPhysicalOrientation);
    window.addEventListener('orientationchange', () => {
      setTimeout(checkPhysicalOrientation, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRotateHelper);
  } else {
    initRotateHelper();
  }
})();
