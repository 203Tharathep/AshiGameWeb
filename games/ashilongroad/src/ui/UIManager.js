import confetti from 'canvas-confetti';
import { CARS } from '../data/carsData.js';
import { SKINS } from '../data/skinsData.js';
import { TRACKS, DIFFICULTIES } from '../data/tracksData.js';

export class UIManager {
  constructor(game) {
    this.game = game;

    // View Elements
    this.viewMenu = document.getElementById('view-menu');
    this.viewStageSelect = document.getElementById('view-stage-select');
    this.viewGarage = document.getElementById('view-garage');
    this.viewLobby = document.getElementById('view-lobby');
    this.viewVictory = document.getElementById('view-victory');
    this.viewGridIntro = document.getElementById('view-grid-intro');
    this.gridIntroStageTitle = document.getElementById('grid-intro-stage-title');
    this.gridBroadcastCard = document.getElementById('grid-broadcast-card');
    this.gbPhoto = document.getElementById('gb-photo');
    this.gbPos = document.getElementById('gb-pos');
    this.gbName = document.getElementById('gb-name');
    this.gbCarName = document.getElementById('gb-car-name');
    this.gbCarTag = document.getElementById('gb-car-tag');
    this.gbBadge = document.getElementById('gb-badge');
    this.gbColorDot = document.getElementById('gb-color-dot');
    this.btnSkipGridIntro = document.getElementById('btn-skip-grid-intro');
    this.onGridIntroSkip = null;
    this.currentGridRacers = [];
    this.activeGridRacerIndex = -1;

    // Selected Player Customization
    const savedCarIdx = parseInt(localStorage.getItem('ashilane_car_index') || '0', 10);
    this.currentCarIndex = (!isNaN(savedCarIdx) && savedCarIdx >= 0 && savedCarIdx < CARS.length) ? savedCarIdx : 0;
    this.currentSkinId = localStorage.getItem('ashilane_skin') || 'green_dress';
    const initSkin = SKINS.find(s => s.id === this.currentSkinId);
    this.currentColor = localStorage.getItem('ashilane_color') || initSkin?.color || '#0d5c3a';
    this.playerName = localStorage.getItem('ashilane_name') || 'นักซิ่งอาชิ';

    // Addons Customization with LocalStorage Persistence
    const savedAddons = (() => {
      try {
        return JSON.parse(localStorage.getItem('ashilane_addons') || '{}');
      } catch (e) {
        return {};
      }
    })();

    this.currentAddons = {
      spoiler: savedAddons.spoiler || 'stock',
      rim: savedAddons.rim || 'stock',
      exhaust: savedAddons.exhaust || 'stock',
      roof_hood: savedAddons.roof_hood || 'none',
      underglow: savedAddons.underglow || 'body_match'
    };

    // Stage Selection State
    this.selectedTrackId = 'beach';
    this.selectedDifficulty = 'normal';
    this.selectedLaps = 3;
    this.targetGameMode = 'gp';

    this.initEventListeners();
    this.populateGarageSkins();
    this.updateGarageStats();
    this.populateStageCards();
  }

  initEventListeners() {
    // Menu buttons
    document.getElementById('btn-play-single')?.addEventListener('click', () => {
      this.openStageSelect('gp');
    });

    document.getElementById('btn-play-timeattack')?.addEventListener('click', () => {
      this.openStageSelect('timeattack');
    });

    document.getElementById('btn-open-garage')?.addEventListener('click', () => {
      this.showView('garage');
      this.syncGarageAddonPills();
      const car = CARS[this.currentCarIndex];
      const nameEl = document.getElementById('garage-car-name');
      if (nameEl) nameEl.textContent = car.nameTh;
      const tagEl = document.getElementById('garage-car-tag');
      if (tagEl) tagEl.textContent = car.tag;
      const descEl = document.getElementById('garage-car-desc');
      if (descEl) descEl.textContent = car.desc;
      this.updateGarageStats();

      const colorInput = document.getElementById('garage-color-input');
      if (colorInput) colorInput.value = this.currentColor;
      const colorHex = document.getElementById('garage-color-hex');
      if (colorHex) colorHex.textContent = this.currentColor.toUpperCase();

      this.game.enterGaragePreview(
        CARS[this.currentCarIndex].id,
        this.getSelectedSkinFile(),
        this.currentColor,
        this.currentAddons
      );
    });

    document.getElementById('btn-open-create-room')?.addEventListener('click', () => {
      this.showCreateRoomPrompt();
    });

    document.getElementById('btn-open-join-room')?.addEventListener('click', () => {
      this.showJoinRoomPrompt();
    });

    document.getElementById('btn-toggle-bgm')?.addEventListener('click', () => {
      const isPlaying = this.game.audio.toggleBgm();
      const btn = document.getElementById('btn-toggle-bgm');
      if (btn) btn.textContent = isPlaying ? '🎵 เพลง: เปิด' : '🔇 เพลง: ปิด';
    });

    // Stage Select controls
    document.getElementById('btn-stage-back')?.addEventListener('click', () => {
      this.showView('menu');
    });

    document.getElementById('btn-start-selected-race')?.addEventListener('click', () => {
      this.triggerRaceStartTransition(() => {
        this.game.startSinglePlayer(
          this.targetGameMode,
          this.selectedTrackId,
          this.selectedDifficulty,
          this.selectedLaps
        );
      });
    });

    // Difficulty buttons in Stage Select
    document.querySelectorAll('.diff-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const diff = btn.dataset.diff;
        if (diff) {
          this.selectedDifficulty = diff;
          document.querySelectorAll('.diff-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    // Laps buttons in Stage Select
    document.querySelectorAll('.laps-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const laps = parseInt(btn.dataset.laps || '3');
        this.selectedLaps = laps;
        document.querySelectorAll('.laps-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // --- Garage Console Tab Switching ---
    document.querySelectorAll('.garage-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabKey = btn.dataset.tab;
        document.querySelectorAll('.garage-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.garage-tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`tab-${tabKey}`)?.classList.add('active');
      });
    });

    // --- Garage Addon Customization Pills ---
    document.querySelectorAll('.addon-pills-row').forEach(row => {
      const category = row.dataset.category;
      row.querySelectorAll('.addon-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const val = pill.dataset.value;
          this.currentAddons[category] = val;
          try {
            localStorage.setItem('ashilane_addons', JSON.stringify(this.currentAddons));
          } catch (e) {}

          row.querySelectorAll('.addon-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');

          this.game.updateGarageAddons(this.currentAddons);
        });
      });
    });

    // --- Garage Car Model Switcher ---
    document.getElementById('garage-car-prev')?.addEventListener('click', () => {
      this.currentCarIndex = (this.currentCarIndex - 1 + CARS.length) % CARS.length;
      this.onGarageCarChanged();
    });

    document.getElementById('garage-car-next')?.addEventListener('click', () => {
      this.currentCarIndex = (this.currentCarIndex + 1) % CARS.length;
      this.onGarageCarChanged();
    });

    document.getElementById('btn-garage-back')?.addEventListener('click', () => {
      this.showView('menu');
      this.game.exitGaragePreview();
    });

    // --- Color Pickers in Garage ---
    const colorInput = document.getElementById('garage-color-input');
    const colorHex = document.getElementById('garage-color-hex');
    if (colorInput) {
      colorInput.value = this.currentColor;
      colorInput.addEventListener('input', (e) => {
        this.currentColor = e.target.value;
        try { localStorage.setItem('ashilane_color', this.currentColor); } catch (err) {}
        if (colorHex) colorHex.textContent = this.currentColor.toUpperCase();
        this.game.updateGarageColor(this.currentColor);
      });
    }

    // Color Swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        const color = e.target.dataset.color;
        if (color) {
          this.currentColor = color;
          try { localStorage.setItem('ashilane_color', this.currentColor); } catch (err) {}
          if (colorInput) colorInput.value = color;
          if (colorHex) colorHex.textContent = color.toUpperCase();
          this.game.updateGarageColor(color);
        }
      });
    });

    // --- 360° Turntable Interactive Toolbar Buttons ---
    const quickViews = [
      { id: 'btn-tt-view-front', angle: Math.PI, pitch: 0.22, dist: 5.4 },
      { id: 'btn-tt-view-side', angle: Math.PI / 2, pitch: 0.18, dist: 5.8 },
      { id: 'btn-tt-view-rear', angle: 0, pitch: 0.22, dist: 5.4 },
      { id: 'btn-tt-view-iso', angle: 0.65, pitch: 0.3, dist: 6.0 },
      { id: 'btn-tt-view-top', angle: 0.65, pitch: 1.15, dist: 6.8 }
    ];

    quickViews.forEach(qv => {
      document.getElementById(qv.id)?.addEventListener('click', () => {
        document.querySelectorAll('.tt-quick-views .tt-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(qv.id)?.classList.add('active');
        this.game.setGarageCameraAngle(qv.angle, qv.pitch, qv.dist);
      });
    });

    document.getElementById('btn-tt-left')?.addEventListener('click', () => {
      this.game.rotateGarageBy(-Math.PI / 6);
    });

    document.getElementById('btn-tt-right')?.addEventListener('click', () => {
      this.game.rotateGarageBy(Math.PI / 6);
    });

    document.getElementById('btn-tt-autospin')?.addEventListener('click', () => {
      const btn = document.getElementById('btn-tt-autospin');
      const active = this.game.toggleGarageAutoSpin();
      btn?.classList.toggle('active', active);
    });

    document.getElementById('btn-tt-zoom-in')?.addEventListener('click', () => {
      this.game.zoomGarageBy(-0.8);
    });

    document.getElementById('btn-tt-zoom-out')?.addEventListener('click', () => {
      this.game.zoomGarageBy(0.8);
    });

    // Player name input
    const nameInput = document.getElementById('player-name-input');
    if (nameInput) {
      nameInput.value = this.playerName;
      nameInput.addEventListener('input', (e) => {
        this.playerName = e.target.value.trim() || 'นักซิ่งอาชิ';
        localStorage.setItem('ashilane_name', this.playerName);
      });
    }

    // Lobby buttons
    document.getElementById('btn-copy-code')?.addEventListener('click', () => {
      const code = document.getElementById('lobby-room-code')?.textContent;
      if (code) {
        navigator.clipboard.writeText(code);
        alert(`คัดลอกรหัสห้องแล้ว: ${code}`);
      }
    });

    document.getElementById('btn-copy-link')?.addEventListener('click', () => {
      const code = document.getElementById('lobby-room-code')?.textContent;
      if (code) {
        const url = `${window.location.origin}${window.location.pathname}?room=${code}`;
        navigator.clipboard.writeText(url);
        alert(`คัดลอกลิงก์ชวนเพื่อนแล้ว!\n${url}`);
      }
    });

    document.getElementById('btn-start-race')?.addEventListener('click', () => {
      const laps = parseInt(document.getElementById('lobby-laps-select')?.value || '3');
      const aiCount = parseInt(document.getElementById('lobby-ai-select')?.value || '2');
      const trackId = document.getElementById('lobby-stage-select')?.value || 'beach';
      this.triggerRaceStartTransition(() => {
        this.game.multiplayer.startRace({ laps, aiCount, trackId });
      });
    });

    document.getElementById('btn-ready')?.addEventListener('click', () => {
      const btn = document.getElementById('btn-ready');
      const isReady = btn.dataset.ready !== 'true';
      btn.dataset.ready = isReady ? 'true' : 'false';
      btn.textContent = isReady ? '✅ พร้อมแล้ว!' : '⏳ กดพร้อม';
      btn.classList.toggle('ready', isReady);
      this.game.multiplayer.updateLocalPlayer({ isReady });
    });

    document.getElementById('btn-leave-lobby')?.addEventListener('click', () => {
      this.game.multiplayer.disconnect();
      this.showView('menu');
    });

    // In-game Emote Soundboard buttons
    document.querySelectorAll('.emote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const emoteText = btn.textContent;
        this.game.sendEmote(emoteText);
      });
    });

    // Victory Screen buttons
    document.getElementById('btn-victory-restart')?.addEventListener('click', () => {
      this.showView('hud');
      this.game.restartRace();
    });

    document.getElementById('btn-victory-stage')?.addEventListener('click', () => {
      this.openStageSelect(this.game.gameMode || 'gp');
    });

    document.getElementById('btn-victory-menu')?.addEventListener('click', () => {
      this.showView('menu');
      this.game.exitToMainMenu();
    });

    // Starting Grid Intro Skip buttons
    this.btnSkipGridIntro?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.skipGridIntro();
    });

    this.viewGridIntro?.addEventListener('click', () => {
      this.skipGridIntro();
    });
  }

  triggerRaceStartTransition(onCutPoint) {
    const curtain = document.getElementById('cinematic-transition-curtain');
    if (!curtain) {
      if (onCutPoint) onCutPoint();
      return;
    }

    try {
      this.game?.audio?.playClick?.();
    } catch (e) {}

    // Animate active modal card out smoothly
    const activeCard = document.querySelector('#view-stage-select .stage-select-card, #view-lobby .lobby-card');
    if (activeCard) {
      activeCard.style.transition = 'transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.18s cubic-bezier(0.4, 0, 0.2, 1)';
      activeCard.style.transform = 'scale(0.96) translateY(8px)';
      activeCard.style.opacity = '0';
    }

    // Flash curtain to black
    curtain.classList.remove('hidden');
    void curtain.offsetHeight;
    curtain.classList.add('active');

    setTimeout(() => {
      if (activeCard) {
        activeCard.style.transform = '';
        activeCard.style.opacity = '';
        activeCard.style.transition = '';
      }
      if (onCutPoint) onCutPoint();

      setTimeout(() => {
        curtain.classList.remove('active');
        setTimeout(() => {
          curtain.classList.add('hidden');
        }, 250);
      }, 50);
    }, 180);
  }

  showView(viewName) {
    if (viewName !== 'grid_intro') {
      this.hideGridIntro();
    }
    [this.viewMenu, this.viewStageSelect, this.viewGarage, this.viewLobby, this.viewVictory].forEach(v => {
      if (v) v.classList.add('hidden');
    });

    if (viewName === 'menu') this.viewMenu?.classList.remove('hidden');
    else if (viewName === 'stage_select') this.viewStageSelect?.classList.remove('hidden');
    else if (viewName === 'garage') this.viewGarage?.classList.remove('hidden');
    else if (viewName === 'lobby') this.viewLobby?.classList.remove('hidden');
    else if (viewName === 'victory') this.viewVictory?.classList.remove('hidden');
    else if (viewName === 'grid_intro') this.viewGridIntro?.classList.remove('hidden');

    if (viewName === 'hud') {
      this.game.hud.show();
    } else {
      this.game.hud.hide();
    }
  }

  showGridIntro(racers, stageName, onFinish) {
    this.showView('grid_intro');
    this.onGridIntroSkip = onFinish;
    this.currentGridRacers = racers || [];
    this.activeGridRacerIndex = -1;
    this.game.hud.hide();

    if (this.gridIntroStageTitle) {
      this.gridIntroStageTitle.textContent = stageName || 'STARTING LINE';
    }

    // Show initial racer (the last car at the back of the grid, e.g. P7)
    const initialIndex = this.currentGridRacers.length > 0 ? this.currentGridRacers.length - 1 : 0;
    this.updateGridBroadcast(initialIndex);

    this.viewGridIntro?.classList.remove('hidden');
  }

  updateGridBroadcast(racerIndex) {
    if (!this.currentGridRacers || racerIndex === this.activeGridRacerIndex) return;
    if (racerIndex < 0 || racerIndex >= this.currentGridRacers.length) return;

    this.activeGridRacerIndex = racerIndex;
    const r = this.currentGridRacers[racerIndex];
    const pos = racerIndex + 1;

    // Update broadcast card values
    if (this.gbPos) {
      this.gbPos.textContent = pos;
      this.gbPos.className = `grid-broadcast-pos-badge ${pos === 1 ? 'p1' : pos === 2 ? 'p2' : pos === 3 ? 'p3' : ''}`;
    }

    if (this.gbPhoto) {
      const skinFile = r.skinFileName || 'Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg';
      this.gbPhoto.src = `/assets/ashi/${skinFile}`;
    }

    if (this.gbName) {
      this.gbName.innerHTML = `${r.name} ${r.isPlayer ? '<span class="gb-you-badge">YOU (คุณ)</span>' : ''}`;
    }

    if (this.gbCarName) {
      this.gbCarName.textContent = r.carName || 'รถซิ่งอาชิ';
    }

    if (this.gbCarTag) {
      this.gbCarTag.textContent = r.carTag || 'RACER';
    }

    if (this.gbColorDot) {
      this.gbColorDot.style.backgroundColor = r.color || '#00f3ff';
    }

    if (this.gbBadge) {
      this.gbBadge.textContent = r.isPlayer ? '👑 POLE POSITION' : '🏎️ RIVAL RACER';
      this.gbBadge.className = `gb-role-pill ${r.isPlayer ? 'pole' : ''}`;
    }

    if (this.gridBroadcastCard) {
      this.gridBroadcastCard.classList.toggle('is-player', !!r.isPlayer);
      this.gridBroadcastCard.style.borderColor = r.isPlayer ? '#ffd700' : (r.color || 'rgba(0, 243, 255, 0.5)');
      this.gridBroadcastCard.style.boxShadow = r.isPlayer
        ? '0 14px 45px rgba(0, 0, 0, 0.85), 0 0 32px rgba(255, 215, 0, 0.5)'
        : `0 14px 40px rgba(0, 0, 0, 0.8), 0 0 24px ${r.color ? r.color + '55' : 'rgba(0, 243, 255, 0.3)'}`;

      // Re-trigger slide animation on switch
      this.gridBroadcastCard.style.animation = 'none';
      void this.gridBroadcastCard.offsetHeight;
      this.gridBroadcastCard.style.animation = 'gbSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  }

  skipGridIntro() {
    if (this.onGridIntroSkip) {
      const cb = this.onGridIntroSkip;
      this.onGridIntroSkip = null;
      this.hideGridIntro();
      cb();
    }
  }

  hideGridIntro() {
    this.viewGridIntro?.classList.add('hidden');
    this.onGridIntroSkip = null;
  }

  openStageSelect(mode = 'gp') {
    this.targetGameMode = mode;
    const titleEl = document.getElementById('stage-select-title');
    if (titleEl) {
      titleEl.textContent = mode === 'gp' ? '🏆 เลือกด่านแข่งขัน (AI Grand Prix)' : '⏱️ เลือกด่านจับเวลา (Time Attack)';
    }

    const diffBox = document.getElementById('stage-difficulty-row');
    if (diffBox) {
      diffBox.style.display = mode === 'gp' ? 'flex' : 'none';
    }

    this.showView('stage_select');
  }

  populateStageCards() {
    const container = document.getElementById('stages-grid');
    if (!container) return;
    container.innerHTML = '';

    const stageIcons = {
      beach: '🏖️',
      buriram: '🌃',
      snow: '❄️',
      volcano: '🌋'
    };

    const stageBadges = {
      beach: 'มือใหม่ & สปีด',
      buriram: 'แสงสีนีออน',
      snow: 'ดริฟต์หิมะ',
      volcano: 'ความเร็วสูงสุด'
    };

    TRACKS.forEach(t => {
      const card = document.createElement('div');
      const isSelected = t.id === this.selectedTrackId;
      card.className = `stage-card ${isSelected ? 'selected' : ''} stage-${t.id}`;
      card.dataset.id = t.id;

      const stars = '★'.repeat(t.difficulty) + '☆'.repeat(4 - t.difficulty);

      card.innerHTML = `
        <div class="stage-card-header">
          <span class="stage-num">${t.stageLabel}</span>
          <span class="stage-stars">${stars}</span>
        </div>
        <div class="stage-card-visual">
          <span class="stage-icon">${stageIcons[t.id] || '🏎️'}</span>
          <div class="stage-tag">${stageBadges[t.id] || 'GRAND PRIX'}</div>
        </div>
        <div class="stage-card-body">
          <h3 class="stage-name">${t.nameTh}</h3>
          <div class="stage-name-en">${t.name}</div>
          <p class="stage-desc">${t.desc}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectedTrackId = t.id;
        document.querySelectorAll('.stage-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });

      container.appendChild(card);
    });
  }

  populateGarageSkins() {
    const container = document.getElementById('garage-skins-list');
    if (!container) return;
    container.innerHTML = '';

    SKINS.forEach(skin => {
      const card = document.createElement('div');
      card.className = `skin-card ${skin.id === this.currentSkinId ? 'selected' : ''} ${skin.rarity}`;
      card.innerHTML = `
        <div class="skin-thumb-wrap">
          <img src="/assets/ashi/${skin.file}" alt="${skin.nameTh}" loading="lazy" />
          <span class="skin-tag">${skin.tag}</span>
        </div>
        <div class="skin-info">
          <div class="skin-name">${skin.nameTh}</div>
          <div class="skin-desc">${skin.desc}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.currentSkinId = skin.id;
        try { localStorage.setItem('ashilane_skin', this.currentSkinId); } catch (err) {}
        document.querySelectorAll('.skin-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        if (skin.color) {
          this.currentColor = skin.color;
          try { localStorage.setItem('ashilane_color', this.currentColor); } catch (err) {}
          const colorInput = document.getElementById('garage-color-input');
          if (colorInput) colorInput.value = this.currentColor;
          const colorHex = document.getElementById('garage-color-hex');
          if (colorHex) colorHex.textContent = this.currentColor.toUpperCase();
        }

        this.game.updateGarageSkin(this.getSelectedSkinFile());
      });

      container.appendChild(card);
    });
  }

  syncGarageAddonPills() {
    document.querySelectorAll('.addon-pills-row').forEach(row => {
      const category = row.dataset.category;
      const curVal = this.currentAddons[category];
      row.querySelectorAll('.addon-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.value === curVal);
      });
    });
  }

  onGarageCarChanged() {
    try { localStorage.setItem('ashilane_car_index', this.currentCarIndex); } catch (err) {}
    const car = CARS[this.currentCarIndex];
    document.getElementById('garage-car-name').textContent = car.nameTh;
    document.getElementById('garage-car-tag').textContent = car.tag;
    document.getElementById('garage-car-desc').textContent = car.desc;

    this.updateGarageStats();
    this.game.enterGaragePreview(car.id, this.getSelectedSkinFile(), this.currentColor, this.currentAddons);
  }

  updateGarageStats() {
    const car = CARS[this.currentCarIndex];
    const stats = car.stats;

    document.getElementById('stat-speed-bar').style.width = `${stats.speed}%`;
    document.getElementById('stat-accel-bar').style.width = `${stats.accel}%`;
    document.getElementById('stat-drift-bar').style.width = `${stats.drift}%`;
    document.getElementById('stat-handling-bar').style.width = `${stats.handling}%`;
    document.getElementById('stat-boost-bar').style.width = `${stats.boost}%`;
  }

  getSelectedCar() {
    return CARS[this.currentCarIndex];
  }

  getSelectedSkinFile() {
    const skin = SKINS.find(s => s.id === this.currentSkinId);
    return skin ? skin.file : 'Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg';
  }

  getPlayerConfig() {
    return {
      name: this.playerName,
      carId: CARS[this.currentCarIndex].id,
      skinFileName: this.getSelectedSkinFile(),
      color: this.currentColor,
      addons: { ...this.currentAddons }
    };
  }

  showCreateRoomPrompt() {
    const playerConfig = this.getPlayerConfig();
    this.game.multiplayer.createRoom(
      playerConfig,
      (roomCode) => {
        this.setupLobbyView(roomCode, true);
      },
      (err) => {
        alert('เกิดข้อผิดพลาดในการสร้างห้อง: ' + err.message);
      }
    );
  }

  showJoinRoomPrompt() {
    const code = prompt('กรุณากรอกรหัสห้อง (Room Code เช่น ASHI-1234):');
    if (!code) return;

    const playerConfig = this.getPlayerConfig();
    this.game.multiplayer.joinRoom(
      code,
      playerConfig,
      (joinedCode) => {
        this.setupLobbyView(joinedCode, false);
      },
      (err) => {
        alert('ไม่สามารถเชื่อมต่อห้องนี้ได้ ตรวจสอบรหัสห้องอีกครั้ง: ' + err.message);
      }
    );
  }

  setupLobbyView(roomCode, isHost) {
    this.showView('lobby');
    document.getElementById('lobby-room-code').textContent = roomCode;

    const hostControls = document.getElementById('lobby-host-controls');
    const startBtn = document.getElementById('btn-start-race');
    const readyBtn = document.getElementById('btn-ready');

    if (isHost) {
      if (hostControls) hostControls.classList.remove('hidden');
      if (startBtn) startBtn.classList.remove('hidden');
      if (readyBtn) readyBtn.classList.add('hidden');
    } else {
      if (hostControls) hostControls.classList.add('hidden');
      if (startBtn) startBtn.classList.add('hidden');
      if (readyBtn) readyBtn.classList.remove('hidden');
    }
  }

  updateLobbyPlayers(players, localPlayerId) {
    const container = document.getElementById('lobby-players-grid');
    if (!container) return;
    container.innerHTML = '';

    players.forEach(p => {
      const card = document.createElement('div');
      const isSelf = p.id === localPlayerId;
      card.className = `lobby-player-card ${isSelf ? 'self' : ''}`;

      const carInfo = CARS.find(c => c.id === p.carId) || CARS[0];
      const skinFile = p.skinFileName || 'Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg';

      card.innerHTML = `
        <div class="player-avatar">
          <img src="/assets/ashi/${skinFile}" alt="${p.name}" />
        </div>
        <div class="player-details">
          <div class="p-name">${p.name} ${p.isHost ? '👑 (Host)' : ''} ${isSelf ? '(คุณ)' : ''}</div>
          <div class="p-car">${carInfo.nameTh}</div>
          <div class="p-status ${p.isReady ? 'ready' : 'waiting'}">
            ${p.isReady ? '✅ พร้อมแล้ว' : '⏳ รอพร้อม'}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  showVictoryScreen(results) {
    this.showView('victory');

    // Multi-burst Confetti Celebration!
    try {
      if (typeof confetti === 'function') {
        // Center burst
        confetti({ particleCount: 140, spread: 85, origin: { y: 0.55 } });
        // Left cannon
        setTimeout(() => confetti({ particleCount: 85, angle: 60, spread: 60, origin: { x: 0.12, y: 0.65 } }), 350);
        // Right cannon
        setTimeout(() => confetti({ particleCount: 85, angle: 120, spread: 60, origin: { x: 0.88, y: 0.65 } }), 700);
        // Champion gold sparkle shower
        setTimeout(() => confetti({
          particleCount: 130,
          spread: 110,
          origin: { y: 0.35 },
          colors: ['#ffd700', '#ffaa00', '#ffffff', '#00f0ff']
        }), 1150);
      }
    } catch (e) {}

    // 1. Determine player rank and dynamic headline
    const playerRank = results.findIndex(r => r.isPlayer) + 1;
    const headlineEl = document.getElementById('podium-headline');
    const subheadlineEl = document.getElementById('podium-subheadline');

    if (headlineEl && subheadlineEl) {
      if (playerRank === 1) {
        headlineEl.innerHTML = '👑 ยินดีด้วย! คุณคว้าแชมป์อันดับ 1! 🏆';
        subheadlineEl.textContent = 'สุดยอดฝีมือไร้เทียมทาน คว้าถ้วยรางวัลชนะเลิศอันดับ 1 ครองโพเดียมทองคำ!';
      } else if (playerRank === 2) {
        headlineEl.innerHTML = '🥈 ยอดเยี่ยมมาก! คุณขึ้นโพเดียมอันดับ 2!';
        subheadlineEl.textContent = 'ขับเคี่ยวสุดมันส์ ก้าวขึ้นสู่โพเดียมเหรียญเงินแห่งเกียรติยศ!';
      } else if (playerRank === 3) {
        headlineEl.innerHTML = '🥉 เยี่ยมมาก! คุณขึ้นโพเดียมอันดับ 3!';
        subheadlineEl.textContent = 'ฝ่าฟันอุปสรรคจนเข้าเส้นชัยติด 1 ใน 3 โพเดียมเหรียญทองแดง!';
      } else {
        headlineEl.innerHTML = '🏁 การแข่งขันสิ้นสุด! โพเดียม 3 อันดับแรก';
        subheadlineEl.textContent = `คุณเข้าเส้นชัยในอันดับที่ ${playerRank} — ซ้อมมือแล้วกลับมาท้าชิงแชมป์ใหม่!`;
      }
    }

    // 2. Populate Podium 1st, 2nd, 3rd
    const podiumRanks = [
      { rank: 1, id: '1', result: results[0] },
      { rank: 2, id: '2', result: results[1] },
      { rank: 3, id: '3', result: results[2] }
    ];

    podiumRanks.forEach(({ rank, id, result }) => {
      const colEl = document.getElementById(`podium-col-${id}`);
      const avatarEl = document.getElementById(`podium-avatar-${id}`);
      const nameEl = document.getElementById(`podium-name-${id}`);
      const carEl = document.getElementById(`podium-car-${id}`);
      const timeEl = document.getElementById(`podium-time-${id}`);

      if (!colEl) return;

      if (result) {
        colEl.style.display = 'flex';
        if (avatarEl) {
          avatarEl.onerror = () => {
            avatarEl.src = '/assets/ashi/Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg';
          };
          avatarEl.src = `/assets/ashi/${result.skinFileName || 'Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg'}`;
        }
        if (nameEl) {
          nameEl.innerHTML = `${result.name} ${result.isPlayer ? '<span class="podium-you-pill">YOU</span>' : ''}`;
        }
        if (carEl) {
          carEl.textContent = result.carName || 'รถซิ่งอาชิ';
        }
        if (timeEl) {
          const formattedTotal = result.totalTime ? this.game.hud.formatTime(result.totalTime) : 'DNF';
          const formattedBest = result.bestLap ? this.game.hud.formatTime(result.bestLap) : '-';
          timeEl.innerHTML = `<span>เวลา: <strong>${formattedTotal}</strong></span> | <span>Best: <strong>${formattedBest}</strong></span>`;
        }
      } else {
        colEl.style.display = 'none';
      }
    });

    // 3. Populate All Racers Table
    const tableBody = document.getElementById('victory-rankings-body');
    if (tableBody) {
      tableBody.innerHTML = '';
      results.forEach((r, idx) => {
        const row = document.createElement('tr');
        row.className = r.isPlayer ? 'player-row' : '';
        const rankSuffix = ['1st 🏆', '2nd 🥈', '3rd 🥉'][idx] || `${idx + 1}th`;

        row.innerHTML = `
          <td class="rank-col">${rankSuffix}</td>
          <td class="name-col">
            <img src="/assets/ashi/${r.skinFileName || 'Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg'}" onerror="this.src='/assets/ashi/Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg'" class="mini-avatar" />
            <span>${r.name}</span>
            ${r.isPlayer ? '<span class="podium-you-pill mini">YOU</span>' : ''}
          </td>
          <td class="car-col">${r.carName}</td>
          <td class="time-col">${r.totalTime ? this.game.hud.formatTime(r.totalTime) : 'DNF'}</td>
          <td class="best-col">${r.bestLap ? this.game.hud.formatTime(r.bestLap) : '-'}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  }
}
