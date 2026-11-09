// ==========================================
// ASHI COMBAT: MORTAL KOMBAT EDITION - MAIN
// ==========================================

import { FIGHTERS, STAGES, LADDER } from './data.js';
import { combatAudio } from './audio.js';
import { CombatEngine } from './engine.js';
import { CombatRenderer } from './renderer.js';
import { FighterAI } from './ai.js';

class AshiCombatGame {
  constructor() {
    this.canvas = document.getElementById('combatCanvas');
    this.renderer = new CombatRenderer(this.canvas);
    this.engine = null;
    this.ai = new FighterAI('warrior');

    // Flow State: 'title', 'mode_select', 'char_select', 'stage_select', 'versus', 'battle', 'tower', 'game_over', 'victory'
    this.flowState = 'title';

    // Game Mode: '1p' (Arcade Ladder), '2p' (Versus), 'training'
    this.gameMode = '1p';
    this.difficulty = 'warrior';

    // Selections
    this.p1Index = 0;
    this.p2Index = 1;
    this.stageIndex = 0;
    this.towerStep = 0; // Current position in ladder (0 to LADDER.length - 1)

    // Key states
    this.keys = {};
    this.touchInputsP1 = {};

    this.initInputs();
    this.initUI();
    this.renderer.preloadFighterImages(FIGHTERS);
    this.startLoop();
  }

  initInputs() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      combatAudio.ensureContext();

      // UI navigation during menus
      if (this.flowState === 'title' && (e.code === 'Enter' || e.code === 'Space')) {
        this.openModeSelect();
      } else if (this.flowState === 'char_select') {
        this.handleCharSelectKeys(e.code);
      } else if (this.flowState === 'stage_select') {
        this.handleStageSelectKeys(e.code);
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Touch button bindings
    const bindTouch = (btnId, keyName) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      const start = (e) => {
        e.preventDefault();
        combatAudio.ensureContext();
        this.touchInputsP1[keyName] = true;
      };
      const end = (e) => {
        e.preventDefault();
        this.touchInputsP1[keyName] = false;
      };
      btn.addEventListener('touchstart', start, { passive: false });
      btn.addEventListener('touchend', end, { passive: false });
      btn.addEventListener('mousedown', start);
      btn.addEventListener('mouseup', end);
    };

    bindTouch('btn-left', 'left');
    bindTouch('btn-right', 'right');
    bindTouch('btn-up', 'up');
    bindTouch('btn-down', 'down');
    bindTouch('btn-punch', 'punch');
    bindTouch('btn-punch-heavy', 'punchHeavy');
    bindTouch('btn-kick', 'kick');
    bindTouch('btn-kick-heavy', 'kickHeavy');
    bindTouch('btn-special', 'special');
    bindTouch('btn-block', 'block');
    bindTouch('btn-super', 'superMove');
    bindTouch('btn-fatality', 'fatality');
  }

  initUI() {
    // Menu Buttons
    document.getElementById('btnStartGame')?.addEventListener('click', () => {
      combatAudio.ensureContext();
      this.openModeSelect();
    });

    document.getElementById('btnMode1P')?.addEventListener('click', () => {
      this.gameMode = '1p';
      this.openCharSelect();
    });

    document.getElementById('btnMode2P')?.addEventListener('click', () => {
      this.gameMode = '2p';
      this.openCharSelect();
    });

    document.getElementById('btnModeTraining')?.addEventListener('click', () => {
      this.gameMode = 'training';
      this.openCharSelect();
    });

    // Audio & Fullscreen buttons
    document.getElementById('btnToggleAudio')?.addEventListener('click', () => {
      combatAudio.setMute(!combatAudio.isMuted);
      const icon = document.getElementById('audioIcon');
      if (icon) icon.textContent = combatAudio.isMuted ? '🔇' : '🔊';
    });

    document.getElementById('btnFullscreen')?.addEventListener('click', () => {
      const elem = document.getElementById('game-container') || document.documentElement;
      if (!document.fullscreenElement) {
        elem.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });

    // Rematch & Return buttons
    document.getElementById('btnConfirmChar')?.addEventListener('click', () => {
      this.confirmCharacter();
    });

    document.getElementById('btnRematch')?.addEventListener('click', () => {
      this.startBattle();
    });

    document.getElementById('btnChangeChar')?.addEventListener('click', () => {
      this.openCharSelect();
    });
  }

  getP1Inputs() {
    return {
      up: this.keys['KeyW'] || this.touchInputsP1['up'] || false,
      down: this.keys['KeyS'] || this.touchInputsP1['down'] || false,
      left: this.keys['KeyA'] || this.touchInputsP1['left'] || false,
      right: this.keys['KeyD'] || this.touchInputsP1['right'] || false,
      punch: this.keys['KeyJ'] || this.touchInputsP1['punch'] || false,
      punchHeavy: this.keys['KeyU'] || this.touchInputsP1['punchHeavy'] || false,
      kick: this.keys['KeyK'] || this.touchInputsP1['kick'] || false,
      kickHeavy: this.keys['KeyI'] && this.keys['ShiftLeft'] ? true : this.touchInputsP1['kickHeavy'] || false,
      special: this.keys['KeyI'] || this.touchInputsP1['special'] || false,
      specialIndex: 0,
      block: this.keys['KeyL'] || this.touchInputsP1['block'] || false,
      superMove: this.keys['Space'] || this.touchInputsP1['superMove'] || false,
      fatality: this.keys['KeyF'] || this.touchInputsP1['fatality'] || false
    };
  }

  getP2Inputs() {
    if (this.gameMode === '1p' || this.gameMode === 'training') {
      // Handled by AI
      return this.ai.getInputs(this.engine.p2, this.engine.p1, this.engine);
    }

    // 2P Local Keyboard controls
    return {
      up: this.keys['ArrowUp'] || false,
      down: this.keys['ArrowDown'] || false,
      left: this.keys['ArrowLeft'] || false,
      right: this.keys['ArrowRight'] || false,
      punch: this.keys['Numpad1'] || this.keys['KeyZ'] || false,
      punchHeavy: this.keys['Numpad4'] || this.keys['KeyC'] || false,
      kick: this.keys['Numpad2'] || this.keys['KeyX'] || false,
      kickHeavy: this.keys['Numpad5'] || this.keys['KeyV'] || false,
      special: this.keys['Numpad0'] || this.keys['KeyB'] || false,
      specialIndex: 0,
      block: this.keys['Numpad3'] || this.keys['KeyN'] || false,
      superMove: this.keys['Enter'] || false,
      fatality: this.keys['NumpadDecimal'] || this.keys['KeyM'] || false
    };
  }

  // ==========================================
  // FLOW TRANSITIONS
  // ==========================================

  showScreen(screenId) {
    document.querySelectorAll('.screen-overlay').forEach((el) => {
      el.classList.add('hidden');
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
  }

  openModeSelect() {
    this.flowState = 'mode_select';
    this.showScreen('screen-mode-select');
    combatAudio.playGong();
    combatAudio.announce('CHOOSE YOUR MODE!');
  }

  openCharSelect() {
    this.flowState = 'char_select';
    this.showScreen('screen-char-select');
    this.renderCharSelectGrid();
    this.updateCharSelectPreview();
    combatAudio.announce('CHOOSE YOUR FIGHTER!');
  }

  renderCharSelectGrid() {
    const grid = document.getElementById('charGrid');
    if (!grid) return;
    grid.innerHTML = '';

    FIGHTERS.forEach((f, idx) => {
      const box = document.createElement('div');
      box.className = `char-card ${idx === this.p1Index ? 'selected-p1' : ''} ${idx === this.p2Index && this.gameMode === '2p' ? 'selected-p2' : ''}`;
      box.style.borderColor = f.color;

      box.innerHTML = `
        <div class="char-thumb-wrap">
          <img src="${f.avatar}" alt="${f.name}" class="char-thumb" />
          <div class="char-glow" style="background:${f.color}"></div>
        </div>
        <div class="char-card-name">${f.name}</div>
        <div class="char-card-thai">${f.thaiName}</div>
      `;

      box.addEventListener('click', () => {
        this.p1Index = idx;
        combatAudio.playPunch(false);
        this.updateCharSelectPreview();
        this.renderCharSelectGrid();
      });

      grid.appendChild(box);
    });
  }

  updateCharSelectPreview() {
    const f1 = FIGHTERS[this.p1Index];
    document.getElementById('p1PreviewImg').src = f1.avatar;
    document.getElementById('p1PreviewName').textContent = f1.name.toUpperCase();
    document.getElementById('p1PreviewThai').textContent = f1.thaiName;
    document.getElementById('p1PreviewTitle').textContent = f1.title;
    document.getElementById('p1Quote').textContent = f1.quote;
    document.getElementById('p1AtkBar').style.width = `${(f1.stats.atk / 10) * 100}%`;
    document.getElementById('p1SpdBar').style.width = `${(f1.stats.spd / 10) * 100}%`;
    document.getElementById('p1DefBar').style.width = `${(f1.stats.def / 10) * 100}%`;

    // Special moves list
    const movesList = document.getElementById('p1MovesList');
    if (movesList) {
      movesList.innerHTML = f1.specials
        .map((s) => `<li><span class="move-name">${s.name} (${s.nameTh}):</span> <span class="move-input">${s.input}</span></li>`)
        .join('');
      movesList.innerHTML += `<li class="fatality-move"><span class="move-name">FATALITY - ${f1.fatality.name}:</span> <span class="move-input">${f1.fatality.input}</span></li>`;
    }

    // P2 Setup
    if (this.gameMode === '1p') {
      const nextOpponentId = LADDER[this.towerStep] || 'scorpion';
      this.p2Index = FIGHTERS.findIndex((f) => f.id === nextOpponentId);
      if (this.p2Index === -1) this.p2Index = 1;
    }

    const f2 = FIGHTERS[this.p2Index];
    document.getElementById('p2PreviewImg').src = f2.avatar;
    document.getElementById('p2PreviewName').textContent = f2.name.toUpperCase();
    document.getElementById('p2PreviewThai').textContent = f2.thaiName;
  }

  handleCharSelectKeys(code) {
    const cols = 4;
    const total = FIGHTERS.length;

    if (code === 'KeyA' || code === 'ArrowLeft') {
      this.p1Index = (this.p1Index - 1 + total) % total;
      combatAudio.playPunch(false);
      this.renderCharSelectGrid();
      this.updateCharSelectPreview();
    } else if (code === 'KeyD' || code === 'ArrowRight') {
      this.p1Index = (this.p1Index + 1) % total;
      combatAudio.playPunch(false);
      this.renderCharSelectGrid();
      this.updateCharSelectPreview();
    } else if (code === 'KeyW' || code === 'ArrowUp') {
      if (this.p1Index >= cols) this.p1Index -= cols;
      combatAudio.playPunch(false);
      this.renderCharSelectGrid();
      this.updateCharSelectPreview();
    } else if (code === 'KeyS' || code === 'ArrowDown') {
      if (this.p1Index + cols < total) this.p1Index += cols;
      combatAudio.playPunch(false);
      this.renderCharSelectGrid();
      this.updateCharSelectPreview();
    } else if (code === 'Enter' || code === 'Space' || code === 'KeyJ') {
      this.confirmCharacter();
    }
  }

  confirmCharacter() {
    combatAudio.playGong();
    const p1 = FIGHTERS[this.p1Index];
    combatAudio.announce(`${p1.name.toUpperCase()}!`);
    this.openStageSelect();
  }

  openStageSelect() {
    this.flowState = 'stage_select';
    this.showScreen('screen-stage-select');
    this.renderStageList();
  }

  renderStageList() {
    const list = document.getElementById('stageList');
    if (!list) return;
    list.innerHTML = '';

    STAGES.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = `stage-card ${idx === this.stageIndex ? 'selected-stage' : ''}`;
      card.innerHTML = `
        <div class="stage-name">${s.name}</div>
        <div class="stage-thai">${s.nameTh}</div>
        <div class="stage-sub">${s.subtitle}</div>
      `;
      card.addEventListener('click', () => {
        this.stageIndex = idx;
        combatAudio.playPunch(false);
        this.renderStageList();
      });
      list.appendChild(card);
    });

    document.getElementById('btnConfirmStage').onclick = () => {
      this.openVersusScreen();
    };
  }

  handleStageSelectKeys(code) {
    if (code === 'KeyW' || code === 'ArrowUp') {
      this.stageIndex = (this.stageIndex - 1 + STAGES.length) % STAGES.length;
      combatAudio.playPunch(false);
      this.renderStageList();
    } else if (code === 'KeyS' || code === 'ArrowDown') {
      this.stageIndex = (this.stageIndex + 1) % STAGES.length;
      combatAudio.playPunch(false);
      this.renderStageList();
    } else if (code === 'Enter' || code === 'Space') {
      this.openVersusScreen();
    }
  }

  openVersusScreen() {
    this.flowState = 'versus';
    this.showScreen('screen-versus');

    const f1 = FIGHTERS[this.p1Index];
    const f2 = FIGHTERS[this.p2Index];

    document.getElementById('vsP1Img').src = f1.avatar;
    document.getElementById('vsP1Name').textContent = f1.name.toUpperCase();
    document.getElementById('vsP1Quote').textContent = f1.quote;

    document.getElementById('vsP2Img').src = f2.avatar;
    document.getElementById('vsP2Name').textContent = f2.name.toUpperCase();
    document.getElementById('vsP2Quote').textContent = f2.quote;

    combatAudio.playGong();
    combatAudio.announce(`${f1.name.toUpperCase()} VERSUS ${f2.name.toUpperCase()}!`);

    setTimeout(() => {
      this.startBattle();
    }, 2800);
  }

  startBattle() {
    this.flowState = 'battle';
    this.showScreen('screen-battle');

    const f1 = FIGHTERS[this.p1Index];
    const f2 = FIGHTERS[this.p2Index];
    const stage = STAGES[this.stageIndex];

    this.engine = new CombatEngine(f1, f2, stage);
    this.engine.startMatch();

    combatAudio.startBGM(stage.theme);
  }

  handleMatchEnd() {
    combatAudio.stopBGM();

    const winner = this.engine.winner;
    const isP1Winner = winner === this.engine.p1;

    if (this.gameMode === '1p') {
      if (isP1Winner) {
        this.towerStep++;
        if (this.towerStep >= LADDER.length) {
          // Beat the game!
          this.openVictoryScreen();
        } else {
          // Advance to next tower fighter
          this.openTowerScreen();
        }
      } else {
        // Defeated in tower
        this.openGameOverScreen();
      }
    } else {
      // 2P mode victory screen
      this.showScreen('screen-match-result');
      document.getElementById('resultWinnerText').textContent = `${winner.name.toUpperCase()} WINS!`;
      document.getElementById('resultWinnerImg').src = winner.data.avatar;
    }
  }

  openTowerScreen() {
    this.flowState = 'tower';
    this.showScreen('screen-tower');

    const ladderList = document.getElementById('towerLadder');
    if (ladderList) {
      ladderList.innerHTML = '';
      [...LADDER].reverse().forEach((fighterId, reverseIdx) => {
        const idx = LADDER.length - 1 - reverseIdx;
        const f = FIGHTERS.find((item) => item.id === fighterId);
        const item = document.createElement('div');
        const isCurrent = idx === this.towerStep;
        const isDefeated = idx < this.towerStep;

        item.className = `tower-slot ${isCurrent ? 'current' : ''} ${isDefeated ? 'defeated' : ''}`;
        item.innerHTML = `
          <div class="tower-step-num">${idx + 1}</div>
          <img src="${f.avatar}" class="tower-thumb" />
          <div class="tower-name">${f.name}</div>
          ${isDefeated ? '<div class="skull-stamp">💀 DEFEATED</div>' : ''}
          ${isCurrent ? '<div class="now-stamp">⚔️ NEXT BATTLE</div>' : ''}
        `;
        ladderList.appendChild(item);
      });
    }

    combatAudio.playGong();
    combatAudio.announce('KOMBAT ADVANCES!');

    setTimeout(() => {
      this.p2Index = FIGHTERS.findIndex((f) => f.id === LADDER[this.towerStep]);
      this.stageIndex = (this.stageIndex + 1) % STAGES.length;
      this.openVersusScreen();
    }, 3500);
  }

  openVictoryScreen() {
    this.flowState = 'victory';
    this.showScreen('screen-victory');

    const p1 = FIGHTERS[this.p1Index];
    document.getElementById('victoryChampImg').src = p1.avatar;
    document.getElementById('victoryChampName').textContent = p1.name.toUpperCase();
    document.getElementById('victoryEpilogue').textContent =
      `ขอคารวะแด่ ${p1.name} ผู้พิชิตศึกมหากาพย์ Ashi Combat! ได้ก้าวขึ้นเป็นสุดยอดนักสู้ในตำนานเหนือหอพักอชิทั้งปวง!`;

    combatAudio.playGong();
    combatAudio.announce('CHAMPION OF ASHI COMBAT! FLAWLESS VICTORY!');
  }

  openGameOverScreen() {
    this.flowState = 'game_over';
    this.showScreen('screen-game-over');
    combatAudio.announce('YOU LOSE!');
  }

  // ==========================================
  // MAIN GAME LOOP (60 FPS)
  // ==========================================

  startLoop() {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (this.flowState === 'battle' && this.engine) {
        const p1Inputs = this.getP1Inputs();
        const p2Inputs = this.getP2Inputs();

        this.engine.update(p1Inputs, p2Inputs);
        this.renderer.render(this.engine);

        if (this.engine.state === 'match_over' && this.engine.stateTimer > 180) {
          this.handleMatchEnd();
        }
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.ashiCombat = new AshiCombatGame();
});
