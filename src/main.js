import { OFFICIAL_GAMES, CATEGORIES } from './gamesData.js?v=25';
import { PortalBGM } from './bgm.js?v=15';

const SVG_HEART_OUTLINE = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
const SVG_HEART_SOLID = `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.9"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
const SVG_MOON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const SVG_SUN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const SVG_MUSIC_OFF = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
const SVG_MUSIC_NOTE = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;
const HTML_EQ_BARS = `<span class="eq-bars"><i></i><i></i><i></i></span>`;

class CleanGamePortal {
  constructor() {
    this.games = OFFICIAL_GAMES;
    this.categories = CATEGORIES;
    this.activeCategory = 'all';
    this.currentSort = 'featured';
    this.searchQuery = '';
    this.currentGame = null;
    this.isMobileAspect = false;
    this.currentScreenshots = [];
    this.currentScreenshotIndex = 0;

    this.theme = localStorage.getItem('ashigame_theme') || 'light';
    this.favorites = new Set(this.loadArray('ashigame_favorites'));

    this.bgm = new PortalBGM();

    this.cacheDOM();
    if (this.dom.searchInput) {
      this.dom.searchInput.value = '';
    }
    if (this.dom.bgmVolumeSlider) {
      this.dom.bgmVolumeSlider.value = String(this.bgm.isMuted ? 0 : this.bgm.volume);
    }

    this.applyTheme(this.theme);
    this.bgm.onStateChange = (state) => this.syncBgmUI(state);

    this.bindEvents();
    this.renderCategories();
    this.renderGrid();
    this.handleRoute();
    this.refreshGamesCatalogIfStatic();

    // Attempt auto-playing Lobby BGM immediately when on the normal Home page
    if (!this.currentGame) {
      this.bgm.tryAutoStart();
    }
  }

  async refreshGamesCatalogIfStatic() {
    if (!import.meta.url.includes('/src/main.js')) return;
    try {
      const freshUrl = new URL('./gamesData.js', import.meta.url);
      freshUrl.searchParams.set('ts', String(Date.now()));
      const mod = await import(/* @vite-ignore */ freshUrl.href);
      if (
        Array.isArray(mod?.OFFICIAL_GAMES) &&
        JSON.stringify(mod.OFFICIAL_GAMES) !== JSON.stringify(this.games)
      ) {
        this.games = mod.OFFICIAL_GAMES;
        if (Array.isArray(mod.CATEGORIES)) {
          this.categories = mod.CATEGORIES;
        }
        this.renderCategories();
        this.renderGrid();
        if (window.location.hash.startsWith('#play/')) {
          this.handleRoute();
        }
      }
    } catch {
      // Ignore in bundled or offline environments
    }
  }

  loadArray(key) {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  saveJSON(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {
      // Ignore storage errors
    }
  }

  cacheDOM() {
    this.dom = {
      brandLogoLink: document.getElementById('brandLogoLink'),
      searchInput: document.getElementById('searchInput'),
      searchClearBtn: document.getElementById('searchClearBtn'),
      bgmPillWrap: document.getElementById('bgmPillWrap'),
      bgmToggleBtn: document.getElementById('bgmToggleBtn'),
      bgmIconWrap: document.getElementById('bgmIconWrap'),
      bgmLabelText: document.getElementById('bgmLabelText'),
      bgmVolumeSlider: document.getElementById('bgmVolumeSlider'),
      randomGameBtn: document.getElementById('randomGameBtn'),
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      themeIconWrap: document.getElementById('themeIconWrap'),

      homeView: document.getElementById('homeView'),
      spotlightHero: document.getElementById('spotlightHero'),
      categoryPills: document.getElementById('categoryPills'),
      sortSelect: document.getElementById('sortSelect'),
      gamesCountLabel: document.getElementById('gamesCountLabel'),
      gamesGrid: document.getElementById('gamesGrid'),

      playerView: document.getElementById('playerView'),
      backToHomeBtn: document.getElementById('backToHomeBtn'),
      crumbCategory: document.getElementById('crumbCategory'),
      crumbTitle: document.getElementById('crumbTitle'),
      stageAmbientGlow: document.getElementById('stageAmbientGlow'),
      gameStageWrapper: document.getElementById('gameStageWrapper'),
      iframeLoader: document.getElementById('iframeLoader'),
      gameIframe: document.getElementById('gameIframe'),
      exitFullscreenBtn: document.getElementById('exitFullscreenBtn'),

      playerGameIcon: document.getElementById('playerGameIcon'),
      playerGameTitle: document.getElementById('playerGameTitle'),
      playerCategoryText: document.getElementById('playerCategoryText'),

      playerFavBtn: document.getElementById('playerFavBtn'),
      playerFavIconWrap: document.getElementById('playerFavIconWrap'),
      mobileAspectBtn: document.getElementById('mobileAspectBtn'),
      topNavLandscapeBtn: document.getElementById('topNavLandscapeBtn'),
      topNavLandscapeText: document.getElementById('topNavLandscapeText'),
      lightsToggleBtn: document.getElementById('lightsToggleBtn'),
      lightsOffOverlay: document.getElementById('lightsOffOverlay'),
      reloadGameBtn: document.getElementById('reloadGameBtn'),
      openStandaloneBtn: document.getElementById('openStandaloneBtn'),
      fullscreenBtn: document.getElementById('fullscreenBtn'),

      playerDescription: document.getElementById('playerDescription'),
      playerControlsList: document.getElementById('playerControlsList'),
      playerScreenshotsGrid: document.getElementById('playerScreenshotsGrid'),
      relatedGamesList: document.getElementById('relatedGamesList'),

      lightboxModal: document.getElementById('lightboxModal'),
      closeLightboxBtn: document.getElementById('closeLightboxBtn'),
      prevLightboxBtn: document.getElementById('prevLightboxBtn'),
      nextLightboxBtn: document.getElementById('nextLightboxBtn'),
      lightboxImg: document.getElementById('lightboxImg'),
      lightboxCaption: document.getElementById('lightboxCaption'),
      toast: document.getElementById('toast')
    };
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ashigame_theme', theme);
    this.dom.themeIconWrap.innerHTML = theme === 'dark' ? SVG_SUN : SVG_MOON;
  }

  syncBgmUI(state) {
    if (!this.dom.bgmPillWrap) return;
    const { isPlaying, isMuted, inGame, needsGesture, volume } = state;

    this.dom.bgmPillWrap.classList.toggle('is-playing', isPlaying);
    this.dom.bgmPillWrap.classList.toggle('needs-gesture', !isPlaying && !isMuted && needsGesture);

    if (this.dom.bgmVolumeSlider && document.activeElement !== this.dom.bgmVolumeSlider) {
      this.dom.bgmVolumeSlider.value = String(isMuted ? 0 : volume);
    }

    if (isMuted) {
      this.dom.bgmIconWrap.innerHTML = SVG_MUSIC_OFF;
      this.dom.bgmLabelText.textContent = 'ปิดเสียง';
    } else if (isPlaying) {
      this.dom.bgmIconWrap.innerHTML = HTML_EQ_BARS;
      this.dom.bgmLabelText.textContent = 'BGM';
    } else if (inGame) {
      this.dom.bgmIconWrap.innerHTML = SVG_MUSIC_NOTE;
      this.dom.bgmLabelText.textContent = 'พักเพลง';
    } else {
      this.dom.bgmIconWrap.innerHTML = SVG_MUSIC_NOTE;
      this.dom.bgmLabelText.textContent = 'เปิดเพลง';
    }
  }

  bindEvents() {
    window.addEventListener('hashchange', () => this.handleRoute());

    this.dom.bgmToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const muted = this.bgm.toggleMute();
      this.showToast(muted ? 'ปิดเพลงพื้นหลังแล้ว' : 'เปิดเพลงพื้นหลังแล้ว');
    });

    this.dom.bgmVolumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      this.bgm.setVolume(val);
    });

    this.dom.themeToggleBtn.addEventListener('click', () => {
      this.applyTheme(this.theme === 'dark' ? 'light' : 'dark');
    });

    this.dom.brandLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.activeCategory = 'all';
      this.searchQuery = '';
      this.dom.searchInput.value = '';
      this.dom.searchClearBtn?.classList.add('hidden');
      this.renderCategories();
      this.renderGrid();
      window.location.hash = '#home';
    });

    this.dom.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim();
      this.dom.searchClearBtn?.classList.toggle('hidden', !this.searchQuery);
      if (!this.dom.playerView.classList.contains('hidden') && this.searchQuery) {
        window.location.hash = '#home';
      }
      this.renderGrid();
    });

    this.dom.searchClearBtn?.addEventListener('click', () => {
      this.searchQuery = '';
      this.dom.searchInput.value = '';
      this.dom.searchClearBtn?.classList.add('hidden');
      this.renderGrid();
      this.dom.searchInput.focus();
    });

    this.dom.sortSelect?.addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.renderGrid();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        this.dom.searchInput.focus();
      }
      if (e.key === 'Escape') {
        document.body.classList.remove('lights-off');
        this.dom.lightboxModal.classList.add('hidden');
        this.exitAllFullscreenModes();
      }
      if (!this.dom.lightboxModal.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') this.stepLightbox(1);
        if (e.key === 'ArrowLeft') this.stepLightbox(-1);
      }
    });

    window.addEventListener('message', (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'ashi-stage-tall') {
        this.isMobileAspect = Boolean(e.data.active);
        this.dom.gameStageWrapper.classList.toggle('aspect-mobile', this.isMobileAspect);
        this.dom.gameStageWrapper.classList.toggle('aspect-wide', !this.isMobileAspect);
        this.dom.mobileAspectBtn.classList.toggle('active', this.isMobileAspect);
      } else if (e.data.type === 'ashi-toggle-fullscreen') {
        this.toggleStageFullscreen();
      } else if (e.data.type === 'ashi-toggle-landscape') {
        this.toggleLandscape();
      } else if (e.data.type === 'ashi-exit-fullscreen') {
        this.exitAllFullscreenModes();
      }
    });

    this.dom.randomGameBtn.addEventListener('click', () => {
      const pool = this.currentGame
        ? this.games.filter((g) => g.id !== this.currentGame.id)
        : this.games;
      const picked = pool[Math.floor(Math.random() * pool.length)] || this.games[0];
      this.openGame(picked.id);
    });

    this.dom.backToHomeBtn.addEventListener('click', () => {
      window.location.hash = '#home';
    });

    this.dom.gameIframe.addEventListener('load', () => {
      if (this.dom.gameIframe.src && !this.dom.gameIframe.src.endsWith('about:blank')) {
        this.dom.iframeLoader.style.display = 'none';
        try {
          this.dom.gameIframe.focus({ preventScroll: true });
        } catch {
          // Ignore focus restrictions
        }
      }
    });

    this.dom.playerFavBtn.addEventListener('click', () => {
      if (!this.currentGame) return;
      this.toggleFavorite(this.currentGame.id);
      this.updatePlayerBarState();
    });

    this.dom.mobileAspectBtn.addEventListener('click', () => {
      this.userToggledAspect = true;
      this.isMobileAspect = !this.isMobileAspect;
      this.dom.gameStageWrapper.classList.toggle('aspect-mobile', this.isMobileAspect);
      this.dom.gameStageWrapper.classList.toggle('aspect-wide', !this.isMobileAspect);
      this.dom.mobileAspectBtn.classList.toggle('active', this.isMobileAspect);
    });

    this.dom.topNavLandscapeBtn?.addEventListener('click', () => {
      this.toggleLandscape();
    });

    const wakeExitFsBtn = () => {
      const isFs =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        this.dom.gameStageWrapper?.classList.contains('is-pseudo-fullscreen') ||
        this.dom.gameStageWrapper?.classList.contains('is-rotated-landscape');
      if (isFs) {
        this.showExitFsBtnTemporarily();
      }
    };
    this.dom.gameStageWrapper?.addEventListener('mousemove', wakeExitFsBtn, { passive: true });
    this.dom.gameStageWrapper?.addEventListener('touchstart', wakeExitFsBtn, { passive: true });

    const handleOrientationOrResize = () => {
      if (window.innerWidth > window.innerHeight && this.dom.gameStageWrapper.classList.contains('is-rotated-landscape')) {
        this.toggleLandscape(false);
      }
      if (this.currentGame && this.currentGame.allowMobileAspect && !this.userToggledAspect) {
        const isMobilePortrait = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
        const shouldBeMobile = Boolean(
          this.currentGame.defaultMobileAspect !== false && isMobilePortrait
        );
        if (shouldBeMobile !== this.isMobileAspect) {
          this.isMobileAspect = shouldBeMobile;
          this.dom.gameStageWrapper.classList.toggle('aspect-mobile', this.isMobileAspect);
          this.dom.gameStageWrapper.classList.toggle('aspect-wide', !this.isMobileAspect);
          this.dom.mobileAspectBtn.classList.toggle('active', this.isMobileAspect);
        }
      }
      try {
        this.dom.gameIframe?.contentWindow?.dispatchEvent(new Event('resize'));
      } catch (e) {}
    };

    window.addEventListener('resize', handleOrientationOrResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleOrientationOrResize, 80);
      setTimeout(handleOrientationOrResize, 280);
    });

    this.dom.lightsToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('lights-off');
    });

    this.dom.lightsOffOverlay.addEventListener('click', () => {
      document.body.classList.remove('lights-off');
    });

    this.dom.reloadGameBtn.addEventListener('click', () => {
      if (!this.currentGame) return;
      this.dom.iframeLoader.style.display = 'flex';
      this.dom.gameIframe.src = `${this.currentGame.playUrl}?t=${Date.now()}`;
      this.showToast('รีโหลดเกมเรียบร้อย');
    });

    this.dom.fullscreenBtn.addEventListener('click', () => {
      this.toggleStageFullscreen();
    });

    const triggerExitFs = (e) => {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      this.exitAllFullscreenModes();
    };

    if (this.dom.exitFullscreenBtn) {
      this.dom.exitFullscreenBtn.addEventListener('pointerdown', triggerExitFs);
      this.dom.exitFullscreenBtn.addEventListener('touchstart', triggerExitFs, { passive: false });
      this.dom.exitFullscreenBtn.addEventListener('click', triggerExitFs);
    }

    const onNativeFullscreenChange = () => {
      const isNativeFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isNativeFs) {
        if (this.dom.gameStageWrapper?.classList.contains('is-pseudo-fullscreen')) {
          this.togglePseudoFullscreen(false);
        }
      }
    };
    document.addEventListener('fullscreenchange', onNativeFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onNativeFullscreenChange);

    this.dom.closeLightboxBtn.addEventListener('click', () => {
      this.dom.lightboxModal.classList.add('hidden');
    });

    this.dom.prevLightboxBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.stepLightbox(-1);
    });

    this.dom.nextLightboxBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.stepLightbox(1);
    });

    this.dom.lightboxModal.addEventListener('click', (e) => {
      if (e.target === this.dom.lightboxModal) {
        this.dom.lightboxModal.classList.add('hidden');
      }
    });
  }

  // =========================================================================
  // ROUTING
  // =========================================================================
  handleRoute() {
    const hash = window.location.hash || '#home';
    if (hash.startsWith('#play/')) {
      const id = decodeURIComponent(hash.replace('#play/', ''));
      const found = this.games.find((g) => g.id === id);
      if (found) {
        this.mountPlayer(found);
        return;
      }
    }
    this.unmountPlayer();
  }

  openGame(id) {
    window.location.hash = `#play/${encodeURIComponent(id)}`;
  }

  // =========================================================================
  // MINIMAL HOME VIEW RENDERING
  // =========================================================================
  toggleFavorite(id) {
    if (this.favorites.has(id)) {
      this.favorites.delete(id);
      this.showToast('นำออกจากรายการโปรดแล้ว');
    } else {
      this.favorites.add(id);
      this.showToast('บันทึกในรายการโปรดแล้ว');
    }
    this.saveJSON('ashigame_favorites', [...this.favorites]);
    this.renderCategories();
    this.renderGrid();
  }

  renderCategories() {
    this.dom.categoryPills.innerHTML = this.categories.map((cat) => {
      const active = this.activeCategory === cat.id ? 'active' : '';
      let count = 0;
      if (cat.id === 'all') {
        count = this.games.length;
      } else if (cat.id === 'favorites') {
        count = this.favorites.size;
      } else {
        count = this.games.filter((g) => g.category === cat.id).length;
      }
      return `
        <button class="pill-btn ${active}" data-cat="${cat.id}">
          <span class="pill-icon">${cat.icon || '🎮'}</span>
          <span class="pill-label">${cat.label}</span>
          <span class="pill-count">${count}</span>
        </button>
      `;
    }).join('');

    this.dom.categoryPills.querySelectorAll('.pill-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.cat;
        this.renderCategories();
        this.renderGrid();
      });
    });
  }

  renderSpotlightHero() {
    if (!this.dom.spotlightHero) return;

    if (this.searchQuery) {
      this.dom.spotlightHero.style.display = 'none';
      return;
    }

    const filtered = this.getFilteredGames();
    if (filtered.length === 0) {
      this.dom.spotlightHero.style.display = 'none';
      return;
    }

    const featuredGame =
      this.activeCategory === 'all'
        ? this.games.find((g) => g.id === 'ashibirds') || filtered[0]
        : filtered[0];

    if (!featuredGame) {
      this.dom.spotlightHero.style.display = 'none';
      return;
    }

    this.dom.spotlightHero.style.display = 'block';
    const isFav = this.favorites.has(featuredGame.id);
    const playsFormatted =
      (featuredGame.plays || 0) >= 1000
        ? `${((featuredGame.plays || 0) / 1000).toFixed(1)}k`
        : `${featuredGame.plays || 0}`;

    this.dom.spotlightHero.innerHTML = `
      <div class="hero-card" data-id="${featuredGame.id}">
        <div class="hero-backdrop" style="background-image: url('${featuredGame.thumbnailBg}')"></div>
        <div class="hero-overlay"></div>
        
        <div class="hero-content">
          <div class="hero-badge-row">
            <span class="hero-tag">🔥 แนะนำประจำสัปดาห์</span>
            <span class="hero-genre-tag">${featuredGame.categoryLabel}</span>
          </div>

          <h2 class="hero-title">${featuredGame.title}</h2>
          <p class="hero-subtitle">${featuredGame.subtitle}</p>

          <div class="hero-meta-row">
            <span class="hero-stat-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              ${playsFormatted} ครั้ง
            </span>
            <span class="hero-stat-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              ${featuredGame.likes || 0} ถูกใจ
            </span>
            ${featuredGame.allowMobileAspect ? `<span class="hero-stat-pill mobile-ready">📱 รองรับมือถือ</span>` : ''}
          </div>

          <div class="hero-actions">
            <button class="hero-play-btn js-hero-play" data-id="${featuredGame.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
              <span>เล่นเกมนี้ทันที</span>
            </button>
            <button class="hero-fav-btn ${isFav ? 'is-fav' : ''} js-hero-fav" data-id="${featuredGame.id}" title="บันทึกรายการโปรด">
              ${isFav ? SVG_HEART_SOLID : SVG_HEART_OUTLINE}
              <span>${isFav ? 'ในรายการโปรด' : 'บันทึก'}</span>
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <img class="hero-thumb" src="${featuredGame.thumbnailBg}" alt="${featuredGame.title}" />
        </div>
      </div>
    `;

    this.dom.spotlightHero.querySelector('.js-hero-play')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openGame(featuredGame.id);
    });

    this.dom.spotlightHero.querySelector('.hero-card')?.addEventListener('click', (e) => {
      if (e.target.closest('.js-hero-fav')) return;
      this.openGame(featuredGame.id);
    });

    this.dom.spotlightHero.querySelector('.js-hero-fav')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleFavorite(featuredGame.id);
    });
  }

  getFilteredGames() {
    let list = [...this.games];
    if (this.activeCategory === 'favorites') {
      list = list.filter((g) => this.favorites.has(g.id));
    } else if (this.activeCategory !== 'all') {
      list = list.filter((g) => g.category === this.activeCategory);
    }

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.subtitle.toLowerCase().includes(q) ||
          g.categoryLabel.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q)
      );
    }

    if (this.currentSort === 'plays') {
      list.sort((a, b) => (b.plays || 0) - (a.plays || 0));
    } else if (this.currentSort === 'likes') {
      list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (this.currentSort === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title, 'th'));
    }

    return list;
  }

  renderGrid() {
    this.renderSpotlightHero();
    const filtered = this.getFilteredGames();
    this.dom.gamesCountLabel.textContent = `${filtered.length} เกม`;

    if (filtered.length === 0) {
      this.dom.gamesGrid.innerHTML = `
        <div class="empty-box">
          <div class="empty-icon">🎮</div>
          <h3>ไม่พบเกมในหมวดหมู่นี้</h3>
          <p>ลองค้นหาด้วยคำอื่น หรือเลือกดูหมวดหมู่อื่นๆ ได้เลย</p>
          ${
            this.searchQuery
              ? `<button id="clearSearchFromEmpty" class="btn-clear-empty">ล้างคำค้นหา</button>`
              : ''
          }
        </div>
      `;
      document.getElementById('clearSearchFromEmpty')?.addEventListener('click', () => {
        this.searchQuery = '';
        if (this.dom.searchInput) this.dom.searchInput.value = '';
        this.dom.searchClearBtn?.classList.add('hidden');
        this.renderGrid();
      });
      return;
    }

    this.dom.gamesGrid.innerHTML = filtered
      .map((game) => {
        const isFav = this.favorites.has(game.id);
        const playsFormatted =
          (game.plays || 0) >= 1000
            ? `${((game.plays || 0) / 1000).toFixed(1)}k`
            : `${game.plays || 0}`;
        const badgeText = game.badge
          ? game.badge.split('·')[0].trim()
          : game.categoryLabel.split('/')[0].trim();

        return `
          <article class="game-card js-card" data-id="${game.id}">
            <div class="card-cover ${game.coverFit === 'contain' ? 'is-contain' : ''}">
              ${
                game.coverFit === 'contain'
                  ? `<div class="card-cover-backdrop" style="background-image: url('${game.thumbnailBg}')"></div>`
                  : ''
              }
              <img class="card-cover-img" src="${game.thumbnailBg}" alt="${game.title}" loading="lazy" />
              ${
                game.characterOverlay
                  ? `<img class="card-char-overlay" src="${game.characterOverlay}" alt="" loading="lazy" />`
                  : ''
              }

              <!-- Genre Badge on Cover -->
              <span class="card-badge-pill">${badgeText}</span>

              <!-- Favorite Button -->
              <button class="card-fav-btn ${isFav ? 'is-fav' : ''} js-fav" data-id="${game.id}" title="${isFav ? 'นำออกจากรายการโปรด' : 'บันทึกในรายการโปรด'}" aria-label="รายการโปรด">
                ${isFav ? SVG_HEART_SOLID : SVG_HEART_OUTLINE}
              </button>

              <!-- Plays / Likes Pill -->
              <div class="card-stats-pill">
                <span>🔥 ${playsFormatted}</span>
                <span>⭐ ${game.likes || 0}</span>
              </div>

              <!-- Play Overlay -->
              <div class="card-play-overlay">
                <span class="play-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4"></polygon>
                  </svg>
                  เล่นเลย
                </span>
              </div>
            </div>

            <div class="card-content">
              <div class="card-meta-row">
                <span class="card-cat-tag">${game.categoryLabel}</span>
                <span class="card-enter-hint">เล่น →</span>
              </div>
              <h2 class="card-title">${game.title}</h2>
              <p class="card-subtitle">${game.subtitle}</p>
            </div>
          </article>
        `;
      })
      .join('');

    this.dom.gamesGrid.querySelectorAll('.js-card').forEach((card) => {
      card.addEventListener('click', () => this.openGame(card.dataset.id));
    });

    this.dom.gamesGrid.querySelectorAll('.js-fav').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(btn.dataset.id);
      });
    });
  }

  // =========================================================================
  // MINIMAL PLAYER VIEW RENDERING
  // =========================================================================
  mountPlayer(game) {
    const isSame = this.currentGame && this.currentGame.id === game.id;
    this.currentGame = game;
    this.bgm.setInGame(true);

    this.dom.homeView.classList.add('hidden');
    this.dom.playerView.classList.remove('hidden');
    
    // Instant scroll to top of game stage without jumping down on mobile/tablet
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (this.dom.playerView) {
      this.dom.playerView.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    requestAnimationFrame(() => window.scrollTo(0, 0));
    setTimeout(() => window.scrollTo(0, 0), 80);
    setTimeout(() => window.scrollTo(0, 0), 250);

    if (!isSame) {
      this.userToggledAspect = false;
      // Auto-adapt aspect ratio based on platform / screen orientation
      const isMobilePortrait = window.innerWidth <= 768 && window.innerHeight > window.innerWidth;
      this.isMobileAspect = Boolean(
        game.allowMobileAspect && game.defaultMobileAspect !== false && isMobilePortrait
      );

      this.dom.gameStageWrapper.classList.toggle('aspect-mobile', this.isMobileAspect);
      this.dom.gameStageWrapper.classList.toggle('aspect-wide', !this.isMobileAspect);
      this.dom.mobileAspectBtn.classList.toggle('active', this.isMobileAspect);
      this.dom.mobileAspectBtn.style.display = game.allowMobileAspect ? 'inline-flex' : 'none';

      this.dom.iframeLoader.style.display = 'flex';
      this.dom.gameIframe.src = game.playUrl;
      clearTimeout(this.loaderFallbackTimer);
      this.loaderFallbackTimer = setTimeout(() => {
        this.dom.iframeLoader.style.display = 'none';
      }, 2000);
    }

    if (this.dom.stageAmbientGlow) {
      this.dom.stageAmbientGlow.style.backgroundImage = `url('${game.thumbnailBg}')`;
    }

    this.dom.crumbCategory.textContent = game.categoryLabel;
    this.dom.crumbTitle.textContent = game.title;
    this.dom.playerGameIcon.src = game.icon;
    this.dom.playerGameTitle.textContent = game.title;
    this.dom.playerCategoryText.textContent = game.categoryLabel;
    this.dom.openStandaloneBtn.href = game.playUrl;

    this.dom.playerDescription.textContent = game.description;

    this.dom.playerControlsList.innerHTML = game.controls
      .map((c) => {
        const keysHtml = c.key
          .split('/')
          .map((k) => `<kbd class="kbd-key">${k.trim()}</kbd>`)
          .join('<span class="kbd-sep">/</span>');
        return `
          <div class="ctrl-item">
            <div class="ctrl-keys-wrap">${keysHtml}</div>
            <span class="ctrl-desc">${c.action}</span>
          </div>
        `;
      })
      .join('');

    this.currentScreenshots = Array.isArray(game.screenshots) ? game.screenshots : [];
    this.dom.playerScreenshotsGrid.innerHTML = this.currentScreenshots
      .map(
        (s, idx) => `
        <div class="shot-item" data-index="${idx}" title="${s.caption}">
          <img src="${s.src}" alt="${s.caption}" loading="lazy" />
        </div>
      `
      )
      .join('');

    this.dom.playerScreenshotsGrid.querySelectorAll('.shot-item').forEach((el) => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index, 10) || 0;
        this.openLightbox(idx);
      });
    });

    const others = this.games.filter((g) => g.id !== game.id);
    this.dom.relatedGamesList.innerHTML = others
      .map(
        (g) => `
        <div class="other-game-row ${g.coverFit === 'contain' ? 'is-contain' : ''}" data-id="${g.id}">
          <img src="${g.thumbnailBg}" alt="${g.title}" loading="lazy" />
          <div class="other-game-info">
            <strong>${g.title}</strong>
            <span>${g.categoryLabel}</span>
          </div>
        </div>
      `
      )
      .join('');

    this.dom.relatedGamesList.querySelectorAll('.other-game-row').forEach((row) => {
      row.addEventListener('click', () => this.openGame(row.dataset.id));
    });

    this.updatePlayerBarState();
  }

  updatePlayerBarState() {
    if (!this.currentGame) return;
    const isFav = this.favorites.has(this.currentGame.id);
    this.dom.playerFavBtn.classList.toggle('active', isFav);
    this.dom.playerFavIconWrap.innerHTML = isFav ? SVG_HEART_SOLID : SVG_HEART_OUTLINE;
  }

  openLightbox(index) {
    if (!this.currentScreenshots || !this.currentScreenshots.length) return;
    this.currentScreenshotIndex = Math.max(0, Math.min(index, this.currentScreenshots.length - 1));
    const shot = this.currentScreenshots[this.currentScreenshotIndex];
    if (shot) {
      this.dom.lightboxImg.src = shot.src;
      this.dom.lightboxCaption.textContent = `${shot.caption} (${this.currentScreenshotIndex + 1}/${this.currentScreenshots.length})`;
      this.dom.lightboxModal.classList.remove('hidden');
    }
  }

  stepLightbox(delta) {
    if (!this.currentScreenshots || this.currentScreenshots.length <= 1) return;
    this.currentScreenshotIndex =
      (this.currentScreenshotIndex + delta + this.currentScreenshots.length) %
      this.currentScreenshots.length;
    const shot = this.currentScreenshots[this.currentScreenshotIndex];
    if (shot) {
      this.dom.lightboxImg.src = shot.src;
      this.dom.lightboxCaption.textContent = `${shot.caption} (${this.currentScreenshotIndex + 1}/${this.currentScreenshots.length})`;
    }
  }

  showExitFsBtnTemporarily() {
    if (!this.dom.exitFullscreenBtn) return;
    this.dom.exitFullscreenBtn.classList.remove('is-hidden-peek');
    clearTimeout(this.exitFsPeekTimer);
    this.exitFsPeekTimer = setTimeout(() => {
      const isFs =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        this.dom.gameStageWrapper?.classList.contains('is-pseudo-fullscreen') ||
        this.dom.gameStageWrapper?.classList.contains('is-rotated-landscape');
      if (isFs) {
        this.dom.exitFullscreenBtn.classList.add('is-hidden-peek');
      }
    }, 3200);
  }

  togglePseudoFullscreen(forceState) {
    const stage = this.dom.gameStageWrapper;
    if (!stage) return;
    const nextState =
      typeof forceState === 'boolean'
        ? forceState
        : !stage.classList.contains('is-pseudo-fullscreen');
    stage.classList.toggle('is-pseudo-fullscreen', nextState);
    document.body.classList.toggle('has-pseudo-fullscreen', nextState);
    if (nextState) {
      this.showExitFsBtnTemporarily();
    }
    try {
      this.dom.gameIframe.focus({ preventScroll: true });
    } catch {
      // Ignore focus errors
    }
  }

  toggleStageFullscreen() {
    const stage = this.dom.gameStageWrapper;
    if (!stage) return;
    const fsElement = document.fullscreenElement || document.webkitFullscreenElement;
    const isRotated = stage.classList.contains('is-rotated-landscape');
    const isPseudo = stage.classList.contains('is-pseudo-fullscreen');

    if (fsElement || isRotated || isPseudo) {
      this.exitAllFullscreenModes();
      return;
    }

    const reqFs = stage.requestFullscreen || stage.webkitRequestFullscreen;
    if (reqFs) {
      try {
        const res = reqFs.call(stage);
        if (res && typeof res.catch === 'function') {
          res.catch(() => this.togglePseudoFullscreen(true));
        } else {
          this.showExitFsBtnTemporarily();
        }
      } catch {
        this.togglePseudoFullscreen(true);
      }
    } else {
      this.togglePseudoFullscreen(true);
    }

    setTimeout(() => {
      try {
        this.dom.gameIframe?.contentWindow?.dispatchEvent(new Event('resize'));
      } catch (e) {}
    }, 150);
  }

  exitAllFullscreenModes() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      try {
        (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
      } catch (e) {}
    }

    const stage = this.dom.gameStageWrapper;
    if (stage) {
      stage.classList.remove('is-pseudo-fullscreen');
      stage.classList.remove('is-rotated-landscape');
    }
    document.body.classList.remove('has-pseudo-fullscreen');
    document.body.classList.remove('has-rotated-landscape');

    if (this.dom.topNavLandscapeBtn) {
      this.dom.topNavLandscapeBtn.classList.remove('active');
    }
    if (this.dom.topNavLandscapeText) {
      this.dom.topNavLandscapeText.textContent = 'แนวนอน';
    }

    try {
      if (screen.orientation && typeof screen.orientation.unlock === 'function') {
        screen.orientation.unlock();
      }
    } catch (e) {}

    if (this.dom.exitFullscreenBtn) {
      this.dom.exitFullscreenBtn.classList.remove('is-hidden-peek');
    }

    setTimeout(() => {
      try {
        this.dom.gameIframe?.contentWindow?.dispatchEvent(new Event('resize'));
      } catch (e) {}
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  toggleLandscape(forceState) {
    const stage = this.dom.gameStageWrapper;
    if (!stage) return;
    const isCurrentlyRotated = stage.classList.contains('is-rotated-landscape');
    const nextState = typeof forceState === 'boolean' ? forceState : !isCurrentlyRotated;

    stage.classList.toggle('is-rotated-landscape', nextState);
    document.body.classList.toggle('has-rotated-landscape', nextState);

    if (this.dom.topNavLandscapeBtn) {
      this.dom.topNavLandscapeBtn.classList.toggle('active', nextState);
    }
    if (this.dom.topNavLandscapeText) {
      this.dom.topNavLandscapeText.textContent = nextState ? 'แนวตั้ง' : 'แนวนอน';
    }

    if (nextState) {
      this.showExitFsBtnTemporarily();
      try {
        if (screen.orientation && typeof screen.orientation.lock === 'function') {
          screen.orientation.lock('landscape').catch(() => {});
        }
      } catch (e) {}
      this.showToast('สลับจอเป็นแนวนอนเรียบร้อย');
    } else {
      try {
        if (screen.orientation && typeof screen.orientation.unlock === 'function') {
          screen.orientation.unlock();
        }
      } catch (e) {}
      this.showToast('กลับสู่แนวปกติ');
    }

    setTimeout(() => {
      try {
        this.dom.gameIframe?.contentWindow?.dispatchEvent(new Event('resize'));
      } catch (e) {}
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  unmountPlayer() {
    document.body.classList.remove('lights-off');
    this.exitAllFullscreenModes();
    if (this.currentGame) {
      this.dom.gameIframe.src = 'about:blank';
      this.currentGame = null;
    }
    this.dom.playerView.classList.add('hidden');
    this.dom.homeView.classList.remove('hidden');
    this.bgm.setInGame(false);
    this.renderGrid();
  }

  showToast(msg) {
    this.dom.toast.textContent = msg;
    this.dom.toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.dom.toast.classList.remove('show');
    }, 2000);
  }
}

const bootPortal = () => {
  if (!window.__ashiPortal) {
    window.__ashiPortal = new CleanGamePortal();
  }
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootPortal);
} else {
  bootPortal();
}

window.addEventListener('pageshow', (e) => {
  if (e.persisted && window.__ashiPortal) {
    window.__ashiPortal.renderGrid();
    window.__ashiPortal.handleRoute();
  }
});
