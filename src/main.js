import { OFFICIAL_GAMES, CATEGORIES } from './gamesData.js';
import { PortalBGM } from './bgm.js';

const SVG_HEART_OUTLINE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
const SVG_HEART_SOLID = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
const SVG_MOON = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const SVG_SUN = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const SVG_MUSIC_OFF = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
const SVG_MUSIC_NOTE = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;
const HTML_EQ_BARS = `<span class="eq-bars"><i></i><i></i><i></i></span>`;

class CleanGamePortal {
  constructor() {
    this.games = OFFICIAL_GAMES;
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.currentGame = null;
    this.isMobileAspect = false;

    this.theme = localStorage.getItem('ashigame_theme') || 'light';
    this.favorites = new Set(this.loadArray('ashigame_favorites'));
    this.likedGames = new Set(this.loadArray('ashigame_likes'));

    this.bgm = new PortalBGM();

    this.cacheDOM();
    if (this.dom.searchInput) {
      this.dom.searchInput.value = '';
    }
    this.applyTheme(this.theme);
    this.updateBgmButton();
    this.bgm.onStateChange = () => this.updateBgmButton();

    this.bindEvents();
    this.renderCategories();
    this.renderGrid();
    this.handleRoute();
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
      bgmToggleBtn: document.getElementById('bgmToggleBtn'),
      bgmIconWrap: document.getElementById('bgmIconWrap'),
      bgmLabelText: document.getElementById('bgmLabelText'),
      randomGameBtn: document.getElementById('randomGameBtn'),
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      themeIconWrap: document.getElementById('themeIconWrap'),

      homeView: document.getElementById('homeView'),
      categoryPills: document.getElementById('categoryPills'),
      gamesCountLabel: document.getElementById('gamesCountLabel'),
      gamesGrid: document.getElementById('gamesGrid'),

      playerView: document.getElementById('playerView'),
      backToHomeBtn: document.getElementById('backToHomeBtn'),
      crumbCategory: document.getElementById('crumbCategory'),
      crumbTitle: document.getElementById('crumbTitle'),
      gameStageWrapper: document.getElementById('gameStageWrapper'),
      iframeLoader: document.getElementById('iframeLoader'),
      gameIframe: document.getElementById('gameIframe'),
      exitFullscreenBtn: document.getElementById('exitFullscreenBtn'),

      playerGameIcon: document.getElementById('playerGameIcon'),
      playerGameTitle: document.getElementById('playerGameTitle'),
      playerCategoryText: document.getElementById('playerCategoryText'),

      likeBtn: document.getElementById('likeBtn'),
      likeCountText: document.getElementById('likeCountText'),
      playerFavBtn: document.getElementById('playerFavBtn'),
      playerFavIconWrap: document.getElementById('playerFavIconWrap'),
      mobileAspectBtn: document.getElementById('mobileAspectBtn'),
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

  updateBgmButton() {
    if (!this.dom.bgmToggleBtn) return;
    if (this.bgm.isMuted) {
      this.dom.bgmToggleBtn.classList.remove('is-playing');
      this.dom.bgmIconWrap.innerHTML = SVG_MUSIC_OFF;
      this.dom.bgmLabelText.textContent = 'ปิดเพลง';
    } else if (this.bgm.inGame) {
      this.dom.bgmToggleBtn.classList.remove('is-playing');
      this.dom.bgmIconWrap.innerHTML = SVG_MUSIC_NOTE;
      this.dom.bgmLabelText.textContent = 'พักเพลง';
    } else {
      const running = this.bgm.ctx && this.bgm.ctx.state === 'running' && this.bgm.isPlaying;
      this.dom.bgmToggleBtn.classList.toggle('is-playing', Boolean(running));
      this.dom.bgmIconWrap.innerHTML = running ? HTML_EQ_BARS : SVG_MUSIC_NOTE;
      this.dom.bgmLabelText.textContent = 'เพลง';
    }
  }

  bindEvents() {
    window.addEventListener('hashchange', () => this.handleRoute());

    this.dom.bgmToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const muted = this.bgm.toggleMute();
      this.updateBgmButton();
      this.showToast(muted ? 'ปิดเพลงพื้นหลังแล้ว' : 'เปิดเพลงพื้นหลังแล้ว');
    });

    this.dom.themeToggleBtn.addEventListener('click', () => {
      this.applyTheme(this.theme === 'dark' ? 'light' : 'dark');
    });

    this.dom.brandLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.activeCategory = 'all';
      this.searchQuery = '';
      this.dom.searchInput.value = '';
      this.renderCategories();
      this.renderGrid();
      window.location.hash = '#home';
    });

    this.dom.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim();
      if (!this.dom.playerView.classList.contains('hidden') && this.searchQuery) {
        window.location.hash = '#home';
      }
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
          this.dom.gameIframe.focus();
        } catch {
          // Ignore focus restrictions
        }
      }
    });

    this.dom.likeBtn.addEventListener('click', () => {
      if (!this.currentGame) return;
      const id = this.currentGame.id;
      if (this.likedGames.has(id)) {
        this.likedGames.delete(id);
      } else {
        this.likedGames.add(id);
        this.showToast('ถูกใจเกมนี้แล้ว');
      }
      this.saveJSON('ashigame_likes', [...this.likedGames]);
      this.updatePlayerBarState();
      this.renderGrid();
    });

    this.dom.playerFavBtn.addEventListener('click', () => {
      if (!this.currentGame) return;
      this.toggleFavorite(this.currentGame.id);
      this.updatePlayerBarState();
    });

    this.dom.mobileAspectBtn.addEventListener('click', () => {
      this.isMobileAspect = !this.isMobileAspect;
      this.dom.gameStageWrapper.classList.toggle('aspect-mobile', this.isMobileAspect);
      this.dom.gameStageWrapper.classList.toggle('aspect-wide', !this.isMobileAspect);
      this.dom.mobileAspectBtn.classList.toggle('active', this.isMobileAspect);
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
      const stage = this.dom.gameStageWrapper;
      if (!document.fullscreenElement) {
        stage.requestFullscreen?.().catch(() => {
          window.open(this.currentGame?.playUrl, '_blank');
        });
      } else {
        document.exitFullscreen?.();
      }
    });

    this.dom.exitFullscreenBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
    });

    this.dom.closeLightboxBtn.addEventListener('click', () => {
      this.dom.lightboxModal.classList.add('hidden');
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
  // HOME VIEW RENDERING
  // =========================================================================
  getLikeInfo(game) {
    const extra = this.likedGames.has(game.id) ? 1 : 0;
    const likes = game.likes + extra;
    const pct = Math.round((likes / (likes + game.dislikes)) * 100);
    return { likes, pct };
  }

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
    this.dom.categoryPills.innerHTML = CATEGORIES.map((cat) => {
      const active = this.activeCategory === cat.id ? 'active' : '';
      return `<button class="pill-btn ${active}" data-cat="${cat.id}">${cat.label}</button>`;
    }).join('');

    this.dom.categoryPills.querySelectorAll('.pill-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activeCategory = btn.dataset.cat;
        this.renderCategories();
        this.renderGrid();
      });
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
    return list;
  }

  renderGrid() {
    const filtered = this.getFilteredGames();
    this.dom.gamesCountLabel.textContent = `${filtered.length} เกม`;

    if (filtered.length === 0) {
      this.dom.gamesGrid.innerHTML = `
        <div class="empty-box">
          <p>ไม่พบเกมในหมวดหมู่หรือคำค้นหานี้</p>
        </div>
      `;
      return;
    }

    this.dom.gamesGrid.innerHTML = filtered
      .map((game) => {
        const { pct } = this.getLikeInfo(game);
        const isFav = this.favorites.has(game.id);
        return `
          <article class="game-card">
            <div class="card-cover js-play" data-id="${game.id}">
              <img class="card-cover-img" src="${game.thumbnailBg}" alt="${game.title}" loading="lazy" />
              ${
                game.characterOverlay
                  ? `<img class="card-char-overlay" src="${game.characterOverlay}" alt="" loading="lazy" />`
                  : ''
              }
              <span class="card-badge">${game.badge}</span>
              <button class="card-fav-btn ${isFav ? 'is-fav' : ''} js-fav" data-id="${game.id}" title="รายการโปรด">
                ${isFav ? SVG_HEART_SOLID : SVG_HEART_OUTLINE}
              </button>
              <div class="card-play-overlay">
                <div class="play-circle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4"></polygon>
                  </svg>
                </div>
              </div>
            </div>

            <div class="card-content">
              <h2 class="card-title js-play" data-id="${game.id}">${game.title}</h2>
              <p class="card-subtitle">${game.subtitle}</p>

              <div class="card-bottom">
                <div class="card-stats">
                  <span class="stat-like">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    ${pct}%
                  </span>
                </div>

                <button class="card-play-btn js-play" data-id="${game.id}">เข้าเล่น</button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    this.dom.gamesGrid.querySelectorAll('.js-play').forEach((el) => {
      el.addEventListener('click', () => this.openGame(el.dataset.id));
    });

    this.dom.gamesGrid.querySelectorAll('.js-fav').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(btn.dataset.id);
      });
    });
  }

  // =========================================================================
  // PLAYER VIEW RENDERING
  // =========================================================================
  mountPlayer(game) {
    const isSame = this.currentGame && this.currentGame.id === game.id;
    this.currentGame = game;
    this.bgm.setInGame(true);

    this.dom.homeView.classList.add('hidden');
    this.dom.playerView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!isSame) {
      this.isMobileAspect = false;
      this.dom.gameStageWrapper.classList.remove('aspect-mobile');
      this.dom.gameStageWrapper.classList.add('aspect-wide');
      this.dom.mobileAspectBtn.classList.remove('active');
      this.dom.mobileAspectBtn.style.display = game.allowMobileAspect ? 'inline-flex' : 'none';

      this.dom.iframeLoader.style.display = 'flex';
      this.dom.gameIframe.src = game.playUrl;
      clearTimeout(this.loaderFallbackTimer);
      this.loaderFallbackTimer = setTimeout(() => {
        this.dom.iframeLoader.style.display = 'none';
      }, 2000);
    }

    this.dom.crumbCategory.textContent = game.categoryLabel;
    this.dom.crumbTitle.textContent = game.title;
    this.dom.playerGameIcon.src = game.icon;
    this.dom.playerGameTitle.textContent = game.title;
    this.dom.playerCategoryText.textContent = game.categoryLabel;
    this.dom.openStandaloneBtn.href = game.playUrl;

    this.dom.playerDescription.textContent = game.description;

    this.dom.playerControlsList.innerHTML = game.controls
      .map(
        (c) => `
        <div class="ctrl-item">
          <span class="ctrl-key">${c.key}</span>
          <span class="ctrl-desc">${c.action}</span>
        </div>
      `
      )
      .join('');

    this.dom.playerScreenshotsGrid.innerHTML = game.screenshots
      .map(
        (s) => `
        <div class="shot-item" data-src="${s.src}" data-cap="${s.caption}">
          <img src="${s.src}" alt="${s.caption}" loading="lazy" />
        </div>
      `
      )
      .join('');

    this.dom.playerScreenshotsGrid.querySelectorAll('.shot-item').forEach((el) => {
      el.addEventListener('click', () => {
        this.dom.lightboxImg.src = el.dataset.src;
        this.dom.lightboxCaption.textContent = el.dataset.cap;
        this.dom.lightboxModal.classList.remove('hidden');
      });
    });

    const others = this.games.filter((g) => g.id !== game.id);
    this.dom.relatedGamesList.innerHTML = others
      .map(
        (g) => `
        <div class="other-game-row" data-id="${g.id}">
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
    const { likes } = this.getLikeInfo(this.currentGame);
    const isLiked = this.likedGames.has(this.currentGame.id);
    const isFav = this.favorites.has(this.currentGame.id);

    this.dom.likeCountText.textContent = likes.toLocaleString('th-TH');
    this.dom.likeBtn.classList.toggle('active', isLiked);

    this.dom.playerFavBtn.classList.toggle('active', isFav);
    this.dom.playerFavIconWrap.innerHTML = isFav ? SVG_HEART_SOLID : SVG_HEART_OUTLINE;
  }

  unmountPlayer() {
    document.body.classList.remove('lights-off');
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
