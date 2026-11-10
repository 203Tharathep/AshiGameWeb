/**
 * Ashi Kombat - Main Game Controller & UI
 * Handles Character Select, Arcade Mode, Local 2P, Online WebRTC Room, Touch Controls, and Audio.
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

    this.mode = 'vs_cpu'; // 'arcade', 'vs_cpu', 'vs_player', 'training', 'online'
    this.p1Fighter = FIGHTERS[0];
    this.p2Fighter = FIGHTERS[1];
    this.selectedStage = STAGES[0];
    this.aiDifficulty = 'normal';

    // Arcade Tower State
    this.arcadeLadder = [];
    this.arcadeStep = 0;

    this.currentScreen = 'title'; // 'title', 'char_select', 'versus', 'battle', 'tower', 'victory'

    // Online WebRTC Multiplayer State
    this.online = {
      isOnline: false,
      isHost: false,
      roomCode: '',
      peer: null,
      conn: null,
      syncTimer: null,
      peerReady: false
    };

    this.initDOM();
    this.initEvents();
    this.initVirtualControls();
    this.initOnlineEvents();

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
      btnOnlineRoom: document.getElementById('btnOnlineRoom'),
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
      btnBackToTitle: document.getElementById('btnBackToTitle'),
      stageSelect: document.getElementById('stageSelect'),
      diffSelect: document.getElementById('diffSelect'),
      onlineLobbyBanner: document.getElementById('onlineLobbyBanner'),
      onlineBannerCode: document.getElementById('onlineBannerCode'),
      onlinePlayerRoleText: document.getElementById('onlinePlayerRoleText'),

      // Online Room Modal Elements
      onlineRoomModal: document.getElementById('onlineRoomModal'),
      btnCloseOnlineModal: document.getElementById('btnCloseOnlineModal'),
      tabHostRoom: document.getElementById('tabHostRoom'),
      tabJoinRoom: document.getElementById('tabJoinRoom'),
      onlineHostPanel: document.getElementById('onlineHostPanel'),
      onlineJoinPanel: document.getElementById('onlineJoinPanel'),
      btnCreateRoomAct: document.getElementById('btnCreateRoomAct'),
      hostRoomInfo: document.getElementById('hostRoomInfo'),
      hostRoomCodeDisplay: document.getElementById('hostRoomCodeDisplay'),
      btnCopyRoomCode: document.getElementById('btnCopyRoomCode'),
      hostStatusMsg: document.getElementById('hostStatusMsg'),
      joinRoomInput: document.getElementById('joinRoomInput'),
      btnJoinRoomAct: document.getElementById('btnJoinRoomAct'),
      joinStatusMsg: document.getElementById('joinStatusMsg'),

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
      this.dom.moveListModal?.classList.remove('hidden');
    });

    document.querySelectorAll('.close-modal').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.dom.moveListModal?.classList.add('hidden');
        this.dom.pauseModal?.classList.add('hidden');
      });
    });

    // Sound toggle
    this.dom.btnSoundToggle?.addEventListener('click', () => {
      const isMuted = this.sound.toggleMute();
      this.dom.btnSoundToggle.textContent = isMuted ? '🔇 เสียง: ปิด' : '🔊 เสียง: เปิด';
    });

    // Stage Selection dropdown sync
    this.dom.stageSelect?.addEventListener('change', () => {
      const stageIdx = parseInt(this.dom.stageSelect.value || '0', 10);
      this.selectedStage = STAGES[stageIdx] || STAGES[0];
      if (this.online.isOnline && this.online.isHost) {
        this.sendNetMessage({ type: 'STAGE_SELECT', stageIdx });
      }
    });

    // Back to Title from Character Select
    this.dom.btnBackToTitle?.addEventListener('click', () => {
      if (this.online.isOnline) {
        this.sendNetMessage({ type: 'LEAVE_ROOM' });
        this.disconnectOnline();
      }
      this.showScreen('title');
      this.sound.startBGM('menu');
    });

    // Confirm Select & Start Battle
    this.dom.btnConfirmSelect?.addEventListener('click', () => {
      if (this.online.isOnline && !this.online.isHost) {
        this.showToast('รอโฮสต์กดเริ่มเกม...');
        return;
      }

      this.sound.playGong();
      const stageIdx = parseInt(this.dom.stageSelect.value || '0', 10);
      this.selectedStage = STAGES[stageIdx] || STAGES[0];
      this.aiDifficulty = this.dom.diffSelect ? this.dom.diffSelect.value : 'normal';

      if (this.online.isOnline) {
        // Broadcast Start Match to Guest
        this.sendNetMessage({
          type: 'START_MATCH',
          p1Id: this.p1Fighter.id,
          p2Id: this.p2Fighter.id,
          stageIdx
        });
        this.showVersusScreen();
      } else if (this.mode === 'arcade') {
        this.startArcadeTower();
      } else {
        this.showVersusScreen();
      }
    });

    // Victory Buttons
    this.dom.btnRematch?.addEventListener('click', () => {
      if (this.online.isOnline) {
        this.sendNetMessage({ type: 'REMATCH' });
      }
      this.startBattle();
    });

    this.dom.btnChangeChar?.addEventListener('click', () => {
      if (this.online.isOnline) {
        this.sendNetMessage({ type: 'CHANGE_CHAR' });
      }
      this.showScreen('char_select');
    });

    this.dom.btnVictoryMenu?.addEventListener('click', () => {
      if (this.online.isOnline) {
        this.sendNetMessage({ type: 'LEAVE_ROOM' });
        this.disconnectOnline();
      }
      this.showScreen('title');
      this.sound.startBGM('menu');
    });

    // Unified Keyboard Listeners
    window.addEventListener('keydown', (e) => {
      this.sound.ensureContext();
      if (this.currentScreen === 'battle') {
        this.handleGameKey(e.key, true);
      } else if (this.currentScreen === 'title' && e.key === ' ') {
        this.startMode('vs_cpu');
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.currentScreen === 'battle') {
        this.handleGameKey(e.key, false);
      }
    });

    // Resize handling for responsive canvas
    window.addEventListener('resize', () => this.handleResize());
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => this.handleResize());
    }
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.handleResize(), 100);
    });
    this.handleResize();
  }

  handleGameKey(key, isDown) {
    if (!key) return;
    const k = key.toLowerCase();

    if (this.online.isOnline) {
      const myPlayer = this.online.isHost ? 1 : 2;
      this.engine.handlePlayerKey(myPlayer, k, isDown);
      this.sendNetMessage({ type: 'INPUT', player: myPlayer, key: k, isDown });
    } else {
      if (isDown) {
        this.engine.handleKeyDown(k);
      } else {
        this.engine.handleKeyUp(k);
      }
    }
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

    this.canvas.style.width = `${Math.floor(targetW)}px`;
    this.canvas.style.height = `${Math.floor(targetH)}px`;
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

    // Reset online state if previously playing online
    if (this.online.isOnline) {
      this.disconnectOnline(true);
    }

    // Configure selection UI for offline mode
    if (this.dom.onlineLobbyBanner) this.dom.onlineLobbyBanner.classList.add('hidden');
    if (this.dom.btnConfirmSelect) {
      this.dom.btnConfirmSelect.disabled = false;
      this.dom.btnConfirmSelect.textContent = '⚔️ เข้าสู่สังเวียน (FIGHT!)';
    }
    if (this.dom.stageSelect) this.dom.stageSelect.disabled = false;
    if (this.dom.diffSelect) this.dom.diffSelect.disabled = false;

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
        <img src="${f.portrait}" alt="${f.name}" class="roster-thumb" loading="lazy" />
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

    if (this.online.isOnline) {
      if (this.online.isHost) {
        this.p1Fighter = f;
        this.updatePreview(this.p1Fighter, 1);
        this.sendNetMessage({ type: 'SELECT_FIGHTER', player: 1, fighterId: f.id });
      } else {
        this.p2Fighter = f;
        this.updatePreview(this.p2Fighter, 2);
        this.sendNetMessage({ type: 'SELECT_FIGHTER', player: 2, fighterId: f.id });
      }
    } else {
      this.p1Fighter = f;
      // Pick random different opponent for CPU
      if (this.mode !== 'vs_player') {
        const others = FIGHTERS.filter((item) => item.id !== f.id);
        this.p2Fighter = others[Math.floor(Math.random() * others.length)] || FIGHTERS[1];
      }
      this.updatePreview(this.p1Fighter, 1);
      this.updatePreview(this.p2Fighter, 2);
    }

    this.updateRosterHighlights();

    // Speak character voice quote
    if (f.voiceQuotes && f.voiceQuotes.length > 0) {
      this.sound.speak(f.name);
    }
  }

  updateRosterHighlights() {
    document.querySelectorAll('.roster-card').forEach((c) => {
      c.classList.remove('selected-p1', 'selected-p2');
      if (c.dataset.id === this.p1Fighter.id) c.classList.add('selected-p1');
      if (c.dataset.id === this.p2Fighter.id) c.classList.add('selected-p2');
    });
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
        <div class="stat-row"><span>HP</span><div class="stat-bar"><div style="width: ${Math.min(100, f.stats.health / 13)}%"></div></div></div>
        <div class="stat-row"><span>PWR</span><div class="stat-bar"><div style="width: ${Math.min(100, f.stats.power)}%"></div></div></div>
        <div class="stat-row"><span>SPD</span><div class="stat-bar"><div style="width: ${Math.min(100, f.stats.speed * 10)}%"></div></div></div>
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

    const isOnline = this.online.isOnline;
    const isP2AI = !isOnline && this.mode !== 'vs_player';

    this.engine.initMatch(this.p1Fighter, this.p2Fighter, this.selectedStage, isP2AI, this.aiDifficulty);

    // Host sends authoritative state sync every 80ms
    if (this.online.syncTimer) {
      clearInterval(this.online.syncTimer);
      this.online.syncTimer = null;
    }

    if (isOnline && this.online.isHost) {
      this.online.syncTimer = setInterval(() => {
        if (this.currentScreen === 'battle' && this.online.conn && this.online.conn.open) {
          const snap = this.engine.getStateSnapshot();
          if (snap) {
            this.sendNetMessage({ type: 'STATE_SYNC', snap });
          }
        }
      }, 80);
    }
  }

  // --- Mobile On-Screen Virtual Arcade Controls ---
  initVirtualControls() {
    const bindTouch = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;

      const onStart = (e) => {
        e.preventDefault();
        this.sound.ensureContext();
        this.handleGameKey(key, true);
      };

      const onEnd = (e) => {
        e.preventDefault();
        this.handleGameKey(key, false);
      };

      el.addEventListener('touchstart', onStart, { passive: false });
      el.addEventListener('touchend', onEnd, { passive: false });
      el.addEventListener('mousedown', onStart);
      el.addEventListener('mouseup', onEnd);
      el.addEventListener('mouseleave', onEnd);
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
    if (this.online.syncTimer) {
      clearInterval(this.online.syncTimer);
      this.online.syncTimer = null;
    }

    const winner = this.engine.p1.roundsWon >= 2 ? this.engine.p1 : this.engine.p2;

    if (!this.online.isOnline && this.mode === 'arcade' && winner === this.engine.p1) {
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

  // ==========================================================================
  // ONLINE WEBRTC ROOM MULTIPLAYER SYSTEM
  // ==========================================================================

  initOnlineEvents() {
    // Open Online Modal
    this.dom.btnOnlineRoom?.addEventListener('click', () => {
      this.sound.ensureContext();
      this.sound.playGong();
      this.openOnlineModal();
    });

    this.dom.btnCloseOnlineModal?.addEventListener('click', () => {
      this.dom.onlineRoomModal?.classList.add('hidden');
    });

    // Tab Switching
    this.dom.tabHostRoom?.addEventListener('click', () => {
      this.dom.tabHostRoom.classList.add('active');
      this.dom.tabJoinRoom?.classList.remove('active');
      this.dom.onlineHostPanel?.classList.remove('hidden');
      this.dom.onlineJoinPanel?.classList.add('hidden');
    });

    this.dom.tabJoinRoom?.addEventListener('click', () => {
      this.dom.tabJoinRoom.classList.add('active');
      this.dom.tabHostRoom?.classList.remove('active');
      this.dom.onlineJoinPanel?.classList.remove('hidden');
      this.dom.onlineHostPanel?.classList.add('hidden');
    });

    // Host Action: Create Room
    this.dom.btnCreateRoomAct?.addEventListener('click', () => {
      this.createOnlineRoom();
    });

    // Host Action: Copy Room Code
    this.dom.btnCopyRoomCode?.addEventListener('click', () => {
      this.copyRoomCode();
    });

    // Join Action: Join Room
    this.dom.btnJoinRoomAct?.addEventListener('click', () => {
      this.joinOnlineRoom();
    });

    this.dom.joinRoomInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.joinOnlineRoom();
      }
    });
  }

  openOnlineModal() {
    if (this.dom.onlineRoomModal) {
      this.dom.onlineRoomModal.classList.remove('hidden');
    }
    // Reset view
    this.dom.tabHostRoom?.click();
    if (this.dom.hostRoomInfo) this.dom.hostRoomInfo.classList.add('hidden');
    if (this.dom.btnCreateRoomAct) this.dom.btnCreateRoomAct.style.display = 'block';
    if (this.dom.joinStatusMsg) this.dom.joinStatusMsg.textContent = '';
  }

  generateRoomCode() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = 'AK-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  createOnlineRoom() {
    if (typeof window.Peer === 'undefined') {
      alert('ไม่พบระบบเชื่อมต่อ PeerJS กรุณารีเฟรชหน้าเว็บ');
      return;
    }

    this.disconnectOnline(true);

    const roomCode = this.generateRoomCode();
    const peerId = `ashikombat-${roomCode.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`;

    if (this.dom.hostStatusMsg) this.dom.hostStatusMsg.textContent = '⏳ กำลังเปิดห้องบนเซิร์ฟเวอร์...';
    if (this.dom.btnCreateRoomAct) this.dom.btnCreateRoomAct.style.display = 'none';
    if (this.dom.hostRoomInfo) this.dom.hostRoomInfo.classList.remove('hidden');
    if (this.dom.hostRoomCodeDisplay) this.dom.hostRoomCodeDisplay.textContent = roomCode;

    try {
      this.online.peer = new window.Peer(peerId);
    } catch (e) {
      console.error(e);
      if (this.dom.hostStatusMsg) this.dom.hostStatusMsg.textContent = '❌ ไม่สามารถสร้างห้องได้ กรุณาลองใหม่';
      if (this.dom.btnCreateRoomAct) this.dom.btnCreateRoomAct.style.display = 'block';
      return;
    }

    this.online.roomCode = roomCode;
    this.online.isHost = true;

    this.online.peer.on('open', (id) => {
      this.online.peerReady = true;
      if (this.dom.hostStatusMsg) {
        this.dom.hostStatusMsg.textContent = '⏳ ห้องพร้อมแล้ว! ส่งรหัสให้เพื่อนเข้ามาร่วมได้เลย';
      }
    });

    this.online.peer.on('connection', (conn) => {
      this.setupConnection(conn, true);
    });

    this.online.peer.on('error', (err) => {
      console.warn('Peer error:', err);
      if (err.type === 'unavailable-id') {
        // Retry with fresh code
        this.createOnlineRoom();
      } else {
        if (this.dom.hostStatusMsg) {
          this.dom.hostStatusMsg.textContent = `❌ เกิดข้อผิดพลาด: ${err.message || err.type}`;
        }
        if (this.dom.btnCreateRoomAct) this.dom.btnCreateRoomAct.style.display = 'block';
      }
    });
  }

  joinOnlineRoom() {
    if (typeof window.Peer === 'undefined') {
      alert('ไม่พบระบบเชื่อมต่อ PeerJS กรุณารีเฟรชหน้าเว็บ');
      return;
    }

    let raw = this.dom.joinRoomInput ? this.dom.joinRoomInput.value.trim().toUpperCase() : '';
    if (!raw) {
      if (this.dom.joinStatusMsg) this.dom.joinStatusMsg.textContent = '⚠️ กรุณาพิมพ์รหัสห้อง';
      return;
    }

    if (raw.startsWith('AK-')) raw = raw.substring(3);
    else if (raw.startsWith('AK')) raw = raw.substring(2);
    raw = raw.replace(/[^A-Z0-9]/g, '');

    if (raw.length < 3) {
      if (this.dom.joinStatusMsg) this.dom.joinStatusMsg.textContent = '⚠️ รหัสห้องไม่ถูกต้อง';
      return;
    }

    const roomCode = `AK-${raw}`;
    const targetPeerId = `ashikombat-${raw.toLowerCase()}`;

    this.disconnectOnline(true);
    if (this.dom.joinStatusMsg) this.dom.joinStatusMsg.textContent = '⏳ กำลังค้นหาห้องและเชื่อมต่อ...';

    try {
      this.online.peer = new window.Peer();
    } catch (e) {
      console.error(e);
      if (this.dom.joinStatusMsg) this.dom.joinStatusMsg.textContent = '❌ การเชื่อมต่อล้มเหลว';
      return;
    }

    this.online.roomCode = roomCode;
    this.online.isHost = false;

    this.online.peer.on('open', () => {
      this.online.peerReady = true;
      const conn = this.online.peer.connect(targetPeerId, { reliable: true });

      const timeoutTimer = setTimeout(() => {
        if (!this.online.isOnline) {
          if (this.dom.joinStatusMsg) this.dom.joinStatusMsg.textContent = '❌ ไม่พบห้องนี้ หรือห้องเต็มแล้ว';
        }
      }, 9000);

      conn.on('open', () => {
        clearTimeout(timeoutTimer);
        this.setupConnection(conn, false);
      });

      conn.on('error', (err) => {
        clearTimeout(timeoutTimer);
        if (this.dom.joinStatusMsg) this.dom.joinStatusMsg.textContent = '❌ ไม่สามารถเชื่อมต่อห้องได้';
      });
    });

    this.online.peer.on('error', (err) => {
      console.warn('Peer error:', err);
      if (this.dom.joinStatusMsg) {
        this.dom.joinStatusMsg.textContent = `❌ ข้อผิดพลาด: ${err.type}`;
      }
    });
  }

  setupConnection(conn, isHost) {
    this.online.conn = conn;
    this.online.isOnline = true;
    this.online.isHost = isHost;
    this.mode = 'online';

    conn.on('data', (data) => {
      this.handleNetMessage(data);
    });

    conn.on('close', () => {
      this.showToast('⚠️ เพื่อนได้ออกจากห้องแล้ว');
      this.disconnectOnline();
      this.showScreen('title');
      this.sound.startBGM('menu');
    });

    conn.on('error', (err) => {
      console.warn('Connection error:', err);
      this.showToast('⚠️ การเชื่อมต่อขัดข้อง');
      this.disconnectOnline();
      this.showScreen('title');
    });

    // Close Modal and transition to Character Selection Screen
    this.dom.onlineRoomModal?.classList.add('hidden');
    this.sound.playGong();
    this.sound.startBGM('menu');

    // Setup Online Lobby UI
    if (this.dom.onlineLobbyBanner) {
      this.dom.onlineLobbyBanner.classList.remove('hidden');
    }
    if (this.dom.onlineBannerCode) {
      this.dom.onlineBannerCode.textContent = this.online.roomCode;
    }
    if (this.dom.onlinePlayerRoleText) {
      this.dom.onlinePlayerRoleText.textContent = isHost
        ? '👑 คุณคือ Player 1 (โฮสต์)'
        : '⚔️ คุณคือ Player 2 (ผู้ท้าชิง)';
    }

    if (isHost) {
      if (this.dom.btnConfirmSelect) {
        this.dom.btnConfirmSelect.disabled = false;
        this.dom.btnConfirmSelect.textContent = '⚔️ เข้าสู่สังเวียน (FIGHT!)';
      }
      if (this.dom.stageSelect) this.dom.stageSelect.disabled = false;
      if (this.dom.diffSelect) this.dom.diffSelect.disabled = true;

      // Welcome handshake: send current host selection
      setTimeout(() => {
        this.sendNetMessage({
          type: 'LOBBY_WELCOME',
          hostFighterId: this.p1Fighter.id,
          stageIdx: parseInt(this.dom.stageSelect.value || '0', 10)
        });
      }, 300);
    } else {
      if (this.dom.btnConfirmSelect) {
        this.dom.btnConfirmSelect.disabled = true;
        this.dom.btnConfirmSelect.textContent = '⏳ รอโฮสต์เริ่มเกม (WAITING FOR HOST)';
      }
      if (this.dom.stageSelect) this.dom.stageSelect.disabled = true;
      if (this.dom.diffSelect) this.dom.diffSelect.disabled = true;

      // Send guest's fighter choice
      setTimeout(() => {
        this.sendNetMessage({
          type: 'GUEST_READY',
          guestFighterId: this.p2Fighter.id
        });
      }, 300);
    }

    this.showScreen('char_select');
    this.showToast(`เชื่อมต่อห้อง ${this.online.roomCode} สำเร็จ!`);
  }

  sendNetMessage(msg) {
    if (this.online.conn && this.online.conn.open) {
      try {
        this.online.conn.send(msg);
      } catch (err) {
        console.warn('sendNetMessage error:', err);
      }
    }
  }

  handleNetMessage(msg) {
    if (!msg || !msg.type) return;

    switch (msg.type) {
      case 'LOBBY_WELCOME': {
        const hostF = FIGHTERS.find((f) => f.id === msg.hostFighterId);
        if (hostF) {
          this.p1Fighter = hostF;
          this.updatePreview(this.p1Fighter, 1);
        }
        if (typeof msg.stageIdx === 'number' && STAGES[msg.stageIdx]) {
          this.selectedStage = STAGES[msg.stageIdx];
          if (this.dom.stageSelect) this.dom.stageSelect.value = String(msg.stageIdx);
        }
        this.updateRosterHighlights();
        break;
      }

      case 'GUEST_READY': {
        const guestF = FIGHTERS.find((f) => f.id === msg.guestFighterId);
        if (guestF) {
          this.p2Fighter = guestF;
          this.updatePreview(this.p2Fighter, 2);
        }
        this.updateRosterHighlights();
        break;
      }

      case 'SELECT_FIGHTER': {
        const targetFighter = FIGHTERS.find((f) => f.id === msg.fighterId);
        if (!targetFighter) return;

        if (msg.player === 1) {
          this.p1Fighter = targetFighter;
          this.updatePreview(this.p1Fighter, 1);
        } else {
          this.p2Fighter = targetFighter;
          this.updatePreview(this.p2Fighter, 2);
        }
        this.updateRosterHighlights();
        this.sound.playPunch(false);
        break;
      }

      case 'STAGE_SELECT': {
        if (typeof msg.stageIdx === 'number' && STAGES[msg.stageIdx]) {
          this.selectedStage = STAGES[msg.stageIdx];
          if (this.dom.stageSelect) this.dom.stageSelect.value = String(msg.stageIdx);
        }
        break;
      }

      case 'START_MATCH': {
        if (msg.p1Id) {
          this.p1Fighter = FIGHTERS.find((f) => f.id === msg.p1Id) || this.p1Fighter;
        }
        if (msg.p2Id) {
          this.p2Fighter = FIGHTERS.find((f) => f.id === msg.p2Id) || this.p2Fighter;
        }
        if (typeof msg.stageIdx === 'number' && STAGES[msg.stageIdx]) {
          this.selectedStage = STAGES[msg.stageIdx];
        }
        this.sound.playGong();
        this.showVersusScreen();
        break;
      }

      case 'INPUT': {
        if (this.currentScreen === 'battle') {
          // If I am Host (P1), guest's input is P2. If I am Guest (P2), host's input is P1.
          this.engine.handlePlayerKey(msg.player, msg.key, msg.isDown);
        }
        break;
      }

      case 'STATE_SYNC': {
        if (!this.online.isHost && this.currentScreen === 'battle') {
          this.engine.applyStateSnapshot(msg.snap);
        }
        break;
      }

      case 'REMATCH': {
        this.showToast('เพื่อนขอดวลใหม่อีกครั้ง!');
        this.startBattle();
        break;
      }

      case 'CHANGE_CHAR': {
        this.showToast('เพื่อนขอเปลี่ยนตัวละคร');
        this.showScreen('char_select');
        break;
      }

      case 'LEAVE_ROOM': {
        this.showToast('⚠️ เพื่อนได้ออกจากห้องแล้ว');
        this.disconnectOnline();
        this.showScreen('title');
        this.sound.startBGM('menu');
        break;
      }

      default:
        break;
    }
  }

  disconnectOnline(silent = false) {
    if (this.online.syncTimer) {
      clearInterval(this.online.syncTimer);
      this.online.syncTimer = null;
    }
    if (this.online.conn) {
      try { this.online.conn.close(); } catch (e) {}
      this.online.conn = null;
    }
    if (this.online.peer) {
      try { this.online.peer.destroy(); } catch (e) {}
      this.online.peer = null;
    }

    this.online.isOnline = false;
    this.online.isHost = false;
    this.online.roomCode = '';
    this.online.peerReady = false;

    if (this.dom.onlineLobbyBanner) {
      this.dom.onlineLobbyBanner.classList.add('hidden');
    }
    if (this.dom.btnConfirmSelect) {
      this.dom.btnConfirmSelect.disabled = false;
      this.dom.btnConfirmSelect.textContent = '⚔️ เข้าสู่สังเวียน (FIGHT!)';
    }
    if (this.dom.stageSelect) this.dom.stageSelect.disabled = false;
    if (this.dom.diffSelect) this.dom.diffSelect.disabled = false;

    if (!silent) {
      this.showToast('ตัดการเชื่อมต่อออนไลน์แล้ว');
    }
  }

  copyRoomCode() {
    const code = this.online.roomCode;
    if (!code) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        this.showToast('📋 คัดลอกรหัสห้องสำเร็จ!');
      }).catch(() => {
        this.fallbackCopy(code);
      });
    } else {
      this.fallbackCopy(code);
    }
  }

  fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      this.showToast('📋 คัดลอกรหัสห้องสำเร็จ!');
    } catch (e) {
      prompt('คัดลอกรหัสห้องนี้ส่งให้เพื่อน:', text);
    }
    document.body.removeChild(ta);
  }

  showToast(text) {
    let toast = document.getElementById('mkToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mkToast';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.94);
        color: #ffcc00;
        border: 1.5px solid #ffcc00;
        padding: 9px 20px;
        border-radius: 999px;
        font-family: 'Kanit', sans-serif;
        font-size: 14px;
        font-weight: 700;
        z-index: 9999999;
        pointer-events: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.85);
        transition: opacity 0.25s ease, transform 0.25s ease;
        opacity: 0;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 2800);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.AshiCombat = new AshiCombatApp();
});
