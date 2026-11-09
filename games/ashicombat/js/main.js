/**
 * Ashi Kombat - Main Game Controller & UI
 * Handles Character Select, Arcade Mode, Local 2P, Touch Controls, and Audio.
 */

import { FIGHTERS, STAGES } from './fightersData.js';
import { CombatRenderer } from './renderer.js';
import { CombatEngine } from './engine.js';

class AshiCombatApp {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.renderer = new CombatRenderer(this.canvas);
    this.sound = window.AshiSound;
    this.engine = new CombatEngine(this.sound, this.renderer);

    this.mode = 'vs_cpu'; // 'arcade', 'vs_cpu', 'vs_player', 'training'
    this.p1Fighter = FIGHTERS[0];
    this.p2Fighter = FIGHTERS[1];
    this.selectedStage = STAGES[0];
    this.aiDifficulty = 'normal';

    // Arcade Tower State
    this.arcadeLadder = [];
    this.arcadeStep = 0;

    this.currentScreen = 'title'; // 'title', 'char_select', 'versus', 'battle', 'tower', 'victory'

    this.initDOM();
    this.initEvents();
    this.initVirtualControls();

    // Start Animation Loop
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  initDOM() {
    this.dom = {
      titleScreen: document.getElementById('titleScreen'),
      charSelectScreen: document.getElementById('charSelectScreen'),
      versusScreen: document.getElementById('versusScreen'),
      battleHUD: document.getElementById('battleHUD'),
      towerScreen: document.getElementById('towerScreen'),
      victoryScreen: document.getElementById('victoryScreen'),
      pauseModal: document.getElementById('pauseModal'),
      moveListModal: document.getElementById('moveListModal'),

      // Buttons & Inputs
      btnArcade: document.getElementById('btnArcade'),
      btnVsCpu: document.getElementById('btnVsCpu'),
      btnVs2P: document.getElementById('btnVs2P'),
      btnTraining: document.getElementById('btnTraining'),
      btnHowToPlay: document.getElementById('btnHowToPlay'),
      btnSoundToggle: document.getElementById('btnSoundToggle'),
      btnPause: document.getElementById('btnPause'),
      btnResume: document.getElementById('btnResume'),
      btnQuitToMenu: document.getElementById('btnQuitToMenu'),

      // Select Screen Elements
      rosterGrid: document.getElementById('rosterGrid'),
      p1Preview: document.getElementById('p1Preview'),
      p2Preview: document.getElementById('p2Preview'),
      p1Name: document.getElementById('p1Name'),
      p2Name: document.getElementById('p2Name'),
      p1Stats: document.getElementById('p1Stats'),
      p2Stats: document.getElementById('p2Stats'),
      btnConfirmSelect: document.getElementById('btnConfirmSelect'),
      stageSelect: document.getElementById('stageSelect'),
      diffSelect: document.getElementById('diffSelect'),

      // Versus Screen
      vsP1Img: document.getElementById('vsP1Img'),
      vsP2Img: document.getElementById('vsP2Img'),
      vsP1Name: document.getElementById('vsP1Name'),
      vsP2Name: document.getElementById('vsP2Name'),
      vsStageName: document.getElementById('vsStageName'),

      // Victory Screen
      winnerImg: document.getElementById('winnerImg'),
      winnerTitle: document.getElementById('winnerTitle'),
      winnerQuote: document.getElementById('winnerQuote'),
      btnRematch: document.getElementById('btnRematch'),
      btnChangeChar: document.getElementById('btnChangeChar'),
      btnVictoryMenu: document.getElementById('btnVictoryMenu'),

      // Mobile Touch Overlay
      touchControls: document.getElementById('touchControls')
    };

    this.renderRoster();
  }

  initEvents() {
    // Mode Select Buttons
    this.dom.btnArcade?.addEventListener('click', () => this.startMode('arcade'));
    this.dom.btnVsCpu?.addEventListener('click', () => this.startMode('vs_cpu'));
    this.dom.btnVs2P?.addEventListener('click', () => this.startMode('vs_player'));
    this.dom.btnTraining?.addEventListener('click', () => this.startMode('training'));

    this.dom.btnHowToPlay?.addEventListener('click', () => {
      this.dom.moveListModal.classList.remove('hidden');
    });

    document.querySelectorAll('.close-modal').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.dom.moveListModal.classList.add('hidden');
        this.dom.pauseModal.classList.add('hidden');
      });
    });

    // Sound toggle
    this.dom.btnSoundToggle?.addEventListener('click', () => {
      const isMuted = this.sound.toggleMute();
      this.dom.btnSoundToggle.textContent = isMuted ? '🔇 เสียง: ปิด' : '🔊 เสียง: เปิด';
    });

    // Confirm Select
    this.dom.btnConfirmSelect?.addEventListener('click', () => {
      this.sound.playGong();
      const stageIdx = parseInt(this.dom.stageSelect.value || '0', 10);
      this.selectedStage = STAGES[stageIdx] || STAGES[0];
      this.aiDifficulty = this.dom.diffSelect ? this.dom.diffSelect.value : 'normal';

      if (this.mode === 'arcade') {
        this.startArcadeTower();
      } else {
        this.showVersusScreen();
      }
    });

    // Victory Buttons
    this.dom.btnRematch?.addEventListener('click', () => {
      this.startBattle();
    });
    this.dom.btnChangeChar?.addEventListener('click', () => {
      this.showScreen('char_select');
    });
    this.dom.btnVictoryMenu?.addEventListener('click', () => {
      this.showScreen('title');
      this.sound.startBGM('menu');
    });

    // Keyboard Listeners
    window.addEventListener('keydown', (e) => {
      this.sound.ensureContext();
      if (this.currentScreen === 'battle') {
        this.engine.handleKeyDown(e.key);
      } else if (this.currentScreen === 'title' && e.key === ' ') {
        this.startMode('vs_cpu');
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.currentScreen === 'battle') {
        this.engine.handleKeyUp(e.key);
      }
    });

    // Resize handling for responsive canvas
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize();
  }

  handleResize() {
    const container = document.getElementById('canvasWrap');
    if (!container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const aspect = 16 / 9;

    let targetW = cw;
    let targetH = cw / aspect;

    if (targetH > ch) {
      targetH = ch;
      targetW = ch * aspect;
    }

    this.canvas.style.width = `${targetW}px`;
    this.canvas.style.height = `${targetH}px`;
  }

  // --- Screens & Navigation ---
  showScreen(screen) {
    this.currentScreen = screen;
    const screens = [
      this.dom.titleScreen,
      this.dom.charSelectScreen,
      this.dom.versusScreen,
      this.dom.towerScreen,
      this.dom.victoryScreen
    ];
    screens.forEach((s) => s?.classList.add('hidden'));

    if (screen === 'title') this.dom.titleScreen?.classList.remove('hidden');
    if (screen === 'char_select') this.dom.charSelectScreen?.classList.remove('hidden');
    if (screen === 'versus') this.dom.versusScreen?.classList.remove('hidden');
    if (screen === 'tower') this.dom.towerScreen?.classList.remove('hidden');
    if (screen === 'victory') this.dom.victoryScreen?.classList.remove('hidden');

    if (screen === 'battle') {
      this.dom.touchControls?.classList.remove('hidden');
    } else {
      this.dom.touchControls?.classList.add('hidden');
    }
  }

  startMode(mode) {
    this.mode = mode;
    this.sound.ensureContext();
    this.sound.playGong();
    this.sound.startBGM('menu');
    this.showScreen('char_select');
  }

  renderRoster() {
    if (!this.dom.rosterGrid) return;
    this.dom.rosterGrid.innerHTML = '';

    FIGHTERS.forEach((f, idx) => {
      const card = document.createElement('div');
      card.className = `roster-card ${idx === 0 ? 'selected-p1' : ''} ${idx === 1 ? 'selected-p2' : ''}`;
      card.dataset.id = f.id;
      card.innerHTML = `
        <img src="${f.portrait}" alt="${f.name}" class="roster-thumb" />
        <div class="roster-name">${f.name}</div>
      `;

      card.addEventListener('click', () => {
        this.selectFighter(f, card);
      });

      this.dom.rosterGrid.appendChild(card);
    });

    this.updatePreview(this.p1Fighter, 1);
    this.updatePreview(this.p2Fighter, 2);
  }

  selectFighter(f, card) {
    this.sound.playPunch(false);
    this.p1Fighter = f;

    // Pick random different opponent for CPU
    if (this.mode !== 'vs_player') {
      const others = FIGHTERS.filter((item) => item.id !== f.id);
      this.p2Fighter = others[Math.floor(Math.random() * others.length)];
    }

    // Update Highlights
    document.querySelectorAll('.roster-card').forEach((c) => {
      c.classList.remove('selected-p1', 'selected-p2');
      if (c.dataset.id === this.p1Fighter.id) c.classList.add('selected-p1');
      if (c.dataset.id === this.p2Fighter.id) c.classList.add('selected-p2');
    });

    this.updatePreview(this.p1Fighter, 1);
    this.updatePreview(this.p2Fighter, 2);

    // Speak character voice quote
    if (f.voiceQuotes && f.voiceQuotes.length > 0) {
      const quote = f.voiceQuotes[Math.floor(Math.random() * f.voiceQuotes.length)];
      this.sound.speak(f.name);
    }
  }

  updatePreview(f, playerNum) {
    const isP1 = playerNum === 1;
    const previewEl = isP1 ? this.dom.p1Preview : this.dom.p2Preview;
    const nameEl = isP1 ? this.dom.p1Name : this.dom.p2Name;
    const statsEl = isP1 ? this.dom.p1Stats : this.dom.p2Stats;

    if (previewEl) previewEl.src = f.portrait;
    if (nameEl) nameEl.innerHTML = `${f.name} <small>(${f.thaiName})</small>`;

    if (statsEl) {
      statsEl.innerHTML = `
        <div class="stat-row"><span>HP</span><div class="stat-bar"><div style="width: ${f.stats.health / 13}%"></div></div></div>
        <div class="stat-row"><span>PWR</span><div class="stat-bar"><div style="width: ${f.stats.power}%"></div></div></div>
        <div class="stat-row"><span>SPD</span><div class="stat-bar"><div style="width: ${f.stats.speed * 10}%"></div></div></div>
        <div class="stat-badge">${f.archetype}</div>
      `;
    }
  }

  showVersusScreen() {
    this.showScreen('versus');
    if (this.dom.vsP1Img) this.dom.vsP1Img.src = this.p1Fighter.portrait;
    if (this.dom.vsP2Img) this.dom.vsP2Img.src = this.p2Fighter.portrait;
    if (this.dom.vsP1Name) this.dom.vsP1Name.textContent = this.p1Fighter.name;
    if (this.dom.vsP2Name) this.dom.vsP2Name.textContent = this.p2Fighter.name;
    if (this.dom.vsStageName) this.dom.vsStageName.textContent = `ARENA: ${this.selectedStage.thaiName}`;

    this.sound.speak('VS!');
    setTimeout(() => {
      this.startBattle();
    }, 2400);
  }

  startArcadeTower() {
    // Generate 5 ladder opponents leading to boss
    const roster = FIGHTERS.filter((f) => f.id !== this.p1Fighter.id);
    this.arcadeLadder = [];
    for (let i = 0; i < 4; i++) {
      const pick = roster.splice(Math.floor(Math.random() * roster.length), 1)[0];
      this.arcadeLadder.push(pick);
    }
    // Final Boss: Goro Ashi or Fire Ashi
    const boss = FIGHTERS.find((f) => f.id === 'goro_ashi') || FIGHTERS[0];
    this.arcadeLadder.push(boss);
    this.arcadeStep = 0;

    this.showTowerLadder();
  }

  showTowerLadder() {
    this.showScreen('tower');
    const ladderWrap = document.getElementById('towerLadderWrap');
    if (ladderWrap) {
      ladderWrap.innerHTML = '';
      [...this.arcadeLadder].reverse().forEach((f, idx) => {
        const stepNum = this.arcadeLadder.length - 1 - idx;
        const isCurrent = stepNum === this.arcadeStep;
        const isDefeated = stepNum < this.arcadeStep;

        const row = document.createElement('div');
        row.className = `tower-slot ${isCurrent ? 'active' : ''} ${isDefeated ? 'beaten' : ''}`;
        row.innerHTML = `
          <div class="tower-num">${stepNum === 4 ? 'BOSS' : `TIER ${stepNum + 1}`}</div>
          <img src="${f.portrait}" class="tower-thumb" />
          <div class="tower-fighter-name">${f.name}</div>
        `;
        ladderWrap.appendChild(row);
      });
    }

    setTimeout(() => {
      this.p2Fighter = this.arcadeLadder[this.arcadeStep];
      this.showVersusScreen();
    }, 2200);
  }

  startBattle() {
    this.showScreen('battle');
    this.sound.startBGM('fight');
    const isP2AI = this.mode !== 'vs_player';
    this.engine.initMatch(this.p1Fighter, this.p2Fighter, this.selectedStage, isP2AI, this.aiDifficulty);
  }

  // --- Mobile On-Screen Virtual Arcade Controls ---
  initVirtualControls() {
    const bindTouch = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.sound.ensureContext();
        this.engine.handleKeyDown(key);
      });
      el.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.engine.handleKeyUp(key);
      });
      el.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.sound.ensureContext();
        this.engine.handleKeyDown(key);
      });
      el.addEventListener('mouseup', (e) => {
        e.preventDefault();
        this.engine.handleKeyUp(key);
      });
    };

    bindTouch('btnDpadUp', 'w');
    bindTouch('btnDpadDown', 's');
    bindTouch('btnDpadLeft', 'a');
    bindTouch('btnDpadRight', 'd');

    bindTouch('btnActionLP', 'u');
    bindTouch('btnActionHP', 'j');
    bindTouch('btnActionLK', 'i');
    bindTouch('btnActionHK', 'k');
    bindTouch('btnActionBlock', 'l');
    bindTouch('btnActionSuper', ' ');
    bindTouch('btnActionFatality', 'f');
  }

  // --- Game Loop (60 FPS) ---
  loop() {
    if (this.currentScreen === 'battle') {
      this.engine.update();
      this.renderer.render({
        stage: this.engine.stage,
        time: this.engine.time,
        p1: this.engine.p1,
        p2: this.engine.p2,
        projectiles: this.engine.projectiles,
        roundTimer: this.engine.roundTimer
      });

      // Check Match Over
      if (this.engine.matchState === 'MATCH_OVER') {
        this.handleMatchEnd();
      }
    }

    requestAnimationFrame(this.loop);
  }

  handleMatchEnd() {
    const winner = this.engine.p1.roundsWon >= 2 ? this.engine.p1 : this.engine.p2;

    if (this.mode === 'arcade' && winner === this.engine.p1) {
      this.arcadeStep++;
      if (this.arcadeStep < this.arcadeLadder.length) {
        this.showTowerLadder();
        return;
      }
    }

    this.showScreen('victory');
    this.sound.startBGM('menu');

    if (this.dom.winnerImg) this.dom.winnerImg.src = winner.fighter.portrait;
    if (this.dom.winnerTitle) this.dom.winnerTitle.textContent = `${winner.fighter.name} WINS!`;
    if (this.dom.winnerQuote) {
      const quote = winner.fighter.voiceQuotes ? winner.fighter.voiceQuotes[0] : 'ข้าคือจ้าวยุทธภพแห่งอชิคอมแบต!';
      this.dom.winnerQuote.textContent = `"${quote}"`;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.AshiCombat = new AshiCombatApp();
});

