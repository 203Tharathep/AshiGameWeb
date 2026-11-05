import { sound } from './audio.js';
import { STORY_NODES, CG_GALLERY, ENDINGS } from './story.js';

class AkiraVisualNovel {
  constructor() {
    this.state = {
      currentNodeId: 'start',
      affection: 20,
      energy: 80,
      time: '07:45 น.',
      items: [],
      history: [],
      autoMode: false,
      skipMode: false,
      typewriterSpeed: 25, // ms per char
      isTyping: false,
      fullText: '',
      displayedText: ''
    };

    this.unlockedCGs = new Set(JSON.parse(localStorage.getItem('akirajung_cg') || '[]'));
    this.unlockedEndings = new Set(JSON.parse(localStorage.getItem('akirajung_endings') || '[]'));

    this.typewriterTimer = null;
    this.autoTimer = null;
    this.particles = [];

    this.initDOM();
    this.initCanvas();
    this.initAudioUI();
    this.initModals();
    this.initEvents();
    this.showTitleScreen();
  }

  initDOM() {
    this.dom = {
      app: document.getElementById('app'),
      titleScreen: document.getElementById('title-screen'),
      gameScreen: document.getElementById('game-screen'),
      bgLayer: document.getElementById('bg-layer'),
      speedLines: document.getElementById('speed-lines'),
      screenFlash: document.getElementById('screen-flash'),
      hudTime: document.getElementById('hud-time'),
      heartFill: document.getElementById('heart-fill'),
      heartVal: document.getElementById('heart-val'),
      itemsContainer: document.getElementById('items-container'),
      characterStage: document.getElementById('character-stage'),
      characterCard: document.getElementById('character-card'),
      characterImg: document.getElementById('character-img'),
      emotionBubble: document.getElementById('emotion-bubble'),
      dialogueBox: document.getElementById('dialogue-box'),
      speakerBadge: document.getElementById('speaker-badge'),
      dialogueText: document.getElementById('dialogue-text'),
      choiceBox: document.getElementById('choice-box'),
      nextArrow: document.getElementById('next-arrow'),
      autoBtn: document.getElementById('auto-btn'),
      skipBtn: document.getElementById('skip-btn'),
      audioToggle: document.getElementById('audio-toggle-btn'),
      // Modals
      galleryModal: document.getElementById('gallery-modal'),
      endingsModal: document.getElementById('endings-modal'),
      saveModal: document.getElementById('save-modal'),
      logModal: document.getElementById('log-modal'),
      settingsModal: document.getElementById('settings-modal'),
      endingResultModal: document.getElementById('ending-result-modal')
    };
  }

  initCanvas() {
    this.canvas = document.getElementById('effect-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Create 35 sakura petals
    for (let i = 0; i < 35; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 2 + 1,
        speedY: Math.random() * 1.5 + 1.2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > this.canvas.height) {
          p.y = -20;
          p.x = Math.random() * this.canvas.width;
        }
        if (p.x > this.canvas.width) {
          p.x = -20;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = `rgba(255, 182, 193, ${p.opacity})`;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initAudioUI() {
    this.dom.audioToggle.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      this.dom.audioToggle.textContent = isMuted ? '🔇' : '🎵';
      this.dom.audioToggle.title = isMuted ? 'เปิดเสียง' : 'ปิดเสียง';
    });
  }

  initModals() {
    // Gallery button
    document.querySelectorAll('.open-gallery-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.renderGallery();
        this.openModal(this.dom.galleryModal);
      });
    });

    // Endings button
    document.querySelectorAll('.open-endings-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.renderEndings();
        this.openModal(this.dom.endingsModal);
      });
    });

    // Save/Load buttons
    document.getElementById('save-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.renderSaveSlots('save');
      this.openModal(this.dom.saveModal);
    });
    document.getElementById('load-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.renderSaveSlots('load');
      this.openModal(this.dom.saveModal);
    });

    // Backlog Log button
    document.getElementById('log-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.renderLog();
      this.openModal(this.dom.logModal);
    });

    // Mobile QR button
    document.getElementById('mobile-btn')?.addEventListener('click', () => {
      sound.playClick();
      const mobileModal = document.getElementById('mobile-modal');
      const qrImg = document.getElementById('mobile-qr-img');
      const playUrl = window.location.href;
      if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(playUrl)}`;
      }
      const urlDisplay = document.getElementById('mobile-url-display');
      if (urlDisplay) {
        urlDisplay.textContent = `👉 ${playUrl}`;
      }
      this.openModal(mobileModal);
    });

    // Settings button
    document.getElementById('settings-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.openModal(this.dom.settingsModal);
    });

    // Close buttons on all modals
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sound.playClick();
        const modal = e.target.closest('.modal-backdrop');
        if (modal) this.closeModal(modal);
      });
    });

    // Sliders
    const bgmSlider = document.getElementById('bgm-slider');
    const sfxSlider = document.getElementById('sfx-slider');
    const voiceSlider = document.getElementById('voice-slider');
    const speedSlider = document.getElementById('speed-slider');

    if (bgmSlider) {
      bgmSlider.addEventListener('input', (e) => sound.setBgmVolume(parseFloat(e.target.value)));
    }
    if (sfxSlider) {
      sfxSlider.addEventListener('input', (e) => sound.setSfxVolume(parseFloat(e.target.value)));
    }
    if (voiceSlider) {
      voiceSlider.addEventListener('input', (e) => sound.setVoiceVolume(parseFloat(e.target.value)));
    }
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.state.typewriterSpeed = 60 - parseInt(e.target.value);
      });
    }
  }

  openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
  }

  closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
  }

  initEvents() {
    // Title menu buttons
    document.getElementById('start-game-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.startGame();
    });

    // Advance dialogue on dialogue box click
    this.dom.dialogueBox?.addEventListener('click', () => {
      if (this.state.isTyping) {
        this.completeTypewriter();
      } else {
        this.advanceStory();
      }
    });

    // Auto button
    this.dom.autoBtn?.addEventListener('click', () => {
      sound.playClick();
      this.state.autoMode = !this.state.autoMode;
      this.dom.autoBtn.classList.toggle('active', this.state.autoMode);
      if (this.state.autoMode && !this.state.isTyping) {
        this.scheduleAutoAdvance();
      }
    });

    // Skip button
    this.dom.skipBtn?.addEventListener('click', () => {
      sound.playClick();
      this.state.skipMode = !this.state.skipMode;
      this.dom.skipBtn.classList.toggle('active', this.state.skipMode);
      if (this.state.skipMode) {
        this.completeTypewriter();
        this.advanceStory();
      }
    });

    // Title button in HUD
    document.getElementById('title-hud-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.showTitleScreen();
    });

    // Keyboard support (Space / Enter / Escape)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        const openModal = document.querySelector('.modal-backdrop.open');
        if (openModal) this.closeModal(openModal);
        return;
      }
      if (e.code === 'Space' || e.code === 'Enter') {
        if (e.code === 'Space') e.preventDefault();
        if (this.dom.gameScreen.style.display !== 'none' && !document.querySelector('.modal-backdrop.open')) {
          e.preventDefault();
          if (this.state.isTyping) {
            this.completeTypewriter();
          } else {
            this.advanceStory();
          }
        }
      }
    });
  }

  showTitleScreen() {
    this.dom.titleScreen.style.display = 'flex';
    this.dom.gameScreen.style.display = 'none';
    this.dom.titleScreen.style.backgroundImage = "url('./asset/bg/school_gate.jpg')";
    sound.playBgm('title');
  }

  startGame(startNode = 'start') {
    this.dom.titleScreen.style.display = 'none';
    this.dom.gameScreen.style.display = 'flex';
    this.state = {
      ...this.state,
      currentNodeId: startNode,
      affection: 20,
      energy: 80,
      time: '07:45 น.',
      items: [],
      history: [],
      autoMode: false,
      skipMode: false
    };
    this.dom.autoBtn.classList.remove('active');
    this.dom.skipBtn.classList.remove('active');
    this.loadNode(this.state.currentNodeId);
  }

  loadNode(nodeId) {
    const node = STORY_NODES[nodeId];
    if (!node) return;

    this.state.currentNodeId = nodeId;

    // Handle Resolver Nodes (like branching based on affection)
    if (node.isResolver) {
      const nextId = node.check(this.state);
      this.loadNode(nextId);
      return;
    }

    // Handle Ending Screens
    if (node.isEnding) {
      this.showEndingResult(node.endingId);
      return;
    }

    // Check unlocks
    if (node.unlockCG) {
      this.unlockCG(node.unlockCG);
    }
    if (node.unlockEnding) {
      this.unlockEnding(node.unlockEnding);
    }

    // Play Voice Clip if specified
    if (node.voice) {
      sound.playVoice(node.voice);
    } else {
      sound.stopVoice();
    }

    // Apply Effects
    if (node.effects) {
      if (node.effects.includes('shake')) this.triggerShake();
      if (node.effects.includes('flash')) this.triggerFlash('flash-white');
      if (node.effects.includes('shock')) {
        this.triggerFlash('flash-red');
        sound.playShock();
      }
      if (node.effects.includes('heartbeat')) sound.playHeartbeat();
      if (node.effects.includes('love_up')) sound.playLoveUp();
      if (node.effects.includes('victory')) sound.playVictory();
    }

    // Update Background
    if (node.bg) {
      this.dom.bgLayer.style.backgroundImage = `url('${node.bg}')`;
    }

    // Update BGM
    if (node.bgm) {
      sound.playBgm(node.bgm);
      if (node.bgm === 'panic') {
        this.dom.speedLines.classList.add('active');
      } else {
        this.dom.speedLines.classList.remove('active');
      }
    }

    // Update Status HUD
    if (node.time) this.state.time = node.time;
    this.updateHUD();

    // Update Character Sprite
    if (node.avatar) {
      this.dom.characterImg.src = node.avatar;
      this.dom.characterStage.style.opacity = '1';
      this.dom.characterCard.classList.add('talking');
    } else {
      this.dom.characterStage.style.opacity = '0';
      this.dom.characterCard.classList.remove('talking');
    }

    // Emotion bubble
    if (node.speakerType === 'pizza' || node.speakerType === 'muscle') {
      this.dom.emotionBubble.textContent = '🔥';
      this.dom.emotionBubble.style.display = 'block';
    } else if (node.speakerType === 'bikini') {
      this.dom.emotionBubble.textContent = '💖';
      this.dom.emotionBubble.style.display = 'block';
    } else if (node.effects && node.effects.includes('shock')) {
      this.dom.emotionBubble.textContent = '⚡';
      this.dom.emotionBubble.style.display = 'block';
    } else {
      this.dom.emotionBubble.style.display = 'none';
    }

    // Update Speaker
    this.dom.speakerBadge.textContent = node.speaker || '';
    this.dom.speakerBadge.className = 'speaker-badge ' + (node.speakerType || '');
    this.dom.speakerBadge.style.display = node.speaker ? 'block' : 'none';

    // Log history
    this.state.history.push({
      speaker: node.speaker || 'บรรยาย',
      text: node.text
    });

    // Start Typewriter
    this.startTypewriter(node.text, node.speakerType);

    // Hide choices until text is complete or show if immediate
    this.renderChoices(node.choices || []);
  }

  startTypewriter(text, speakerType) {
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.state.isTyping = true;
    this.state.fullText = text;
    this.state.displayedText = '';
    this.dom.dialogueText.textContent = '';
    this.dom.nextArrow.style.display = 'none';
    this.dom.choiceBox.style.display = 'none';

    if (this.state.skipMode) {
      this.completeTypewriter();
      return;
    }

    let charIdx = 0;
    this.typewriterTimer = setInterval(() => {
      if (charIdx < text.length) {
        this.dom.dialogueText.textContent += text[charIdx];
        if (charIdx % 2 === 0) {
          sound.playBlip(speakerType);
        }
        charIdx++;
      } else {
        this.completeTypewriter();
      }
    }, this.state.typewriterSpeed);
  }

  completeTypewriter() {
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
    }
    this.state.isTyping = false;
    this.dom.dialogueText.textContent = this.state.fullText;
    this.dom.characterCard.classList.remove('talking');

    const node = STORY_NODES[this.state.currentNodeId];
    if (node && node.choices && node.choices.length > 0) {
      this.dom.choiceBox.style.display = 'flex';
      this.dom.nextArrow.style.display = 'none';
    } else {
      this.dom.nextArrow.style.display = 'inline-block';
      if (this.state.autoMode) {
        this.scheduleAutoAdvance();
      }
    }
  }

  renderChoices(choices) {
    this.dom.choiceBox.innerHTML = '';
    if (!choices || choices.length === 0) return;

    choices.forEach(ch => {
      // Check item requirements
      let isDisabled = false;
      let badge = '';
      if (ch.requireItem && !this.state.items.includes(ch.requireItem)) {
        isDisabled = true;
        badge = ` (ต้องการ: ${ch.requireItem})`;
      }

      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      if (isDisabled) {
        btn.style.opacity = '0.4';
        btn.style.cursor = 'not-allowed';
      }
      btn.innerHTML = `<span>${ch.text}${badge}</span>`;

      if (!isDisabled) {
        btn.addEventListener('mouseenter', () => sound.playHover());
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          sound.playClick();

          // Apply state modifications
          if (ch.addAffection) {
            this.state.affection = Math.min(100, Math.max(0, this.state.affection + ch.addAffection));
            sound.playLoveUp();
          }
          if (ch.gainItem && !this.state.items.includes(ch.gainItem)) {
            this.state.items.push(ch.gainItem);
          }
          if (ch.gainItemUsed) {
            this.state.items = this.state.items.filter(it => it !== ch.gainItemUsed);
          }

          this.updateHUD();
          this.loadNode(ch.next);
        });
      }

      this.dom.choiceBox.appendChild(btn);
    });
  }

  advanceStory() {
    const node = STORY_NODES[this.state.currentNodeId];
    if (!node) return;

    // If there are multiple choices, player must pick a choice
    if (node.choices && node.choices.length > 1) {
      return;
    }

    // If single choice or default next
    if (node.choices && node.choices.length === 1) {
      const ch = node.choices[0];
      if (ch.addAffection) this.state.affection = Math.min(100, this.state.affection + ch.addAffection);
      if (ch.gainItem && !this.state.items.includes(ch.gainItem)) this.state.items.push(ch.gainItem);
      this.updateHUD();
      this.loadNode(ch.next);
    }
  }

  scheduleAutoAdvance() {
    if (this.autoTimer) clearTimeout(this.autoTimer);
    this.autoTimer = setTimeout(() => {
      if (this.state.autoMode && !this.state.isTyping) {
        this.advanceStory();
      }
    }, 1800);
  }

  updateHUD() {
    this.dom.hudTime.textContent = `⏰ ${this.state.time}`;
    this.dom.heartFill.style.width = `${this.state.affection}%`;
    this.dom.heartVal.textContent = `${this.state.affection}%`;

    // Render items
    this.dom.itemsContainer.innerHTML = '';
    this.state.items.forEach(item => {
      const chip = document.createElement('div');
      chip.className = 'item-chip';
      chip.textContent = `✨ ${item}`;
      this.dom.itemsContainer.appendChild(chip);
    });
  }

  triggerShake() {
    this.dom.app.classList.remove('screen-shake');
    void this.dom.app.offsetWidth;
    this.dom.app.classList.add('screen-shake');
    setTimeout(() => this.dom.app.classList.remove('screen-shake'), 400);
  }

  triggerFlash(colorClass) {
    this.dom.screenFlash.className = `screen-flash ${colorClass}`;
    setTimeout(() => {
      this.dom.screenFlash.className = 'screen-flash';
    }, 250);
  }

  unlockCG(cgId) {
    if (!this.unlockedCGs.has(cgId)) {
      this.unlockedCGs.add(cgId);
      localStorage.setItem('akirajung_cg', JSON.stringify([...this.unlockedCGs]));
      sound.playLoveUp();
    }
  }

  unlockEnding(endingId) {
    if (!this.unlockedEndings.has(endingId)) {
      this.unlockedEndings.add(endingId);
      localStorage.setItem('akirajung_endings', JSON.stringify([...this.unlockedEndings]));
    }
  }

  // --- Endings Result Overlay ---
  showEndingResult(endingId) {
    const ending = ENDINGS.find(e => e.id === endingId);
    if (!ending) return;

    this.unlockEnding(endingId);
    if (endingId === 'ending_true') sound.playVictory();

    const overlay = this.dom.endingResultModal;
    overlay.innerHTML = `
      <div class="ending-result-card">
        <div class="ending-result-badge">${ending.badge}</div>
        <h2 class="ending-result-title">${ending.title}</h2>
        <p class="ending-result-desc">${ending.desc}</p>
        <div class="ending-btn-group">
          <button id="end-replay-btn" class="menu-btn primary-btn">🔄 เล่นใหม่อีกครั้ง</button>
          <button id="end-gallery-btn" class="menu-btn">🖼️ ดูแกลเลอรี</button>
          <button id="end-title-btn" class="menu-btn">🏠 กลับหน้าหลัก</button>
        </div>
      </div>
    `;

    overlay.style.display = 'flex';

    document.getElementById('end-replay-btn').addEventListener('click', () => {
      overlay.style.display = 'none';
      sound.playClick();
      this.startGame();
    });

    document.getElementById('end-gallery-btn').addEventListener('click', () => {
      sound.playClick();
      this.renderGallery();
      this.openModal(this.dom.galleryModal);
    });

    document.getElementById('end-title-btn').addEventListener('click', () => {
      overlay.style.display = 'none';
      sound.playClick();
      this.showTitleScreen();
    });
  }

  // --- Render Modals Content ---
  renderGallery() {
    const container = document.getElementById('gallery-container');
    container.innerHTML = '';

    CG_GALLERY.forEach(cg => {
      const isUnlocked = this.unlockedCGs.has(cg.id);
      const card = document.createElement('div');
      card.className = 'cg-card';
      card.innerHTML = `
        <div class="cg-thumb-wrap">
          <img src="${cg.src}" class="cg-thumb" alt="${cg.title}" />
          ${!isUnlocked ? `
            <div class="cg-locked-mask">
              <span>🔒</span>
              <span style="font-size: 0.85rem">ยังไม่ปลดล็อก</span>
            </div>
          ` : ''}
        </div>
        <div class="cg-info">
          <div class="cg-name">${isUnlocked ? cg.title : '??? (พบได้ในเนื้อเรื่อง)'}</div>
          <div class="cg-desc">${isUnlocked ? cg.desc : cg.sub}</div>
        </div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          sound.playClick();
          window.open(cg.src, '_blank');
        });
      }

      container.appendChild(card);
    });
  }

  renderEndings() {
    const container = document.getElementById('endings-container');
    container.innerHTML = '';

    ENDINGS.forEach(end => {
      const isUnlocked = this.unlockedEndings.has(end.id);
      const item = document.createElement('div');
      item.className = `ending-item ${isUnlocked ? 'unlocked' : ''}`;
      item.innerHTML = `
        <div>
          <div class="ending-title">${isUnlocked ? end.title : '🔒 ตอนจบที่ยังไม่ถูกค้นพบ'}</div>
          <div class="ending-desc">${isUnlocked ? end.desc : 'เล่นเกมและตัดสินใจเลือกเส้นทางเพื่อปลดล็อกฉากจบนี้'}</div>
        </div>
        <div class="ending-badge">${isUnlocked ? end.badge : 'ยังไม่ปลดล็อก'}</div>
      `;
      container.appendChild(item);
    });
  }

  renderLog() {
    const container = document.getElementById('log-container');
    container.innerHTML = '';
    this.state.history.forEach(entry => {
      const el = document.createElement('div');
      el.className = 'log-entry';
      el.innerHTML = `
        <div class="log-speaker">${entry.speaker}</div>
        <div class="log-text">${entry.text}</div>
      `;
      container.appendChild(el);
    });
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  renderSaveSlots(mode = 'save') {
    const container = document.getElementById('save-container');
    container.innerHTML = '';

    for (let slot = 1; slot <= 4; slot++) {
      const key = `akirajung_save_${slot}`;
      const savedData = JSON.parse(localStorage.getItem(key) || 'null');

      const card = document.createElement('div');
      card.className = 'save-slot-card';
      card.innerHTML = `
        <div class="slot-num">ช่องเซฟที่ ${slot}</div>
        <div class="slot-date">${savedData ? savedData.date : 'ว่างเปล่า'}</div>
        <div class="slot-preview">${savedData ? `เวลา: ${savedData.time} | พลังใจ: ${savedData.affection}%` : 'ไม่มีข้อมูล'}</div>
      `;

      card.addEventListener('click', () => {
        if (mode === 'save') {
          const savePayload = {
            date: new Date().toLocaleDateString('th-TH') + ' ' + new Date().toLocaleTimeString('th-TH'),
            nodeId: this.state.currentNodeId,
            time: this.state.time,
            affection: this.state.affection,
            items: this.state.items
          };
          localStorage.setItem(key, JSON.stringify(savePayload));
          sound.playLoveUp();
          this.closeModal(this.dom.saveModal);
          alert(`บันทึกเกมลงในช่องที่ ${slot} เรียบร้อยแล้ว!`);
        } else {
          // Load
          if (savedData) {
            sound.playClick();
            this.closeModal(this.dom.saveModal);
            this.startGame(savedData.nodeId);
            this.state.affection = savedData.affection;
            this.state.time = savedData.time;
            this.state.items = savedData.items;
            this.updateHUD();
          } else {
            alert('ช่องเซฟนี้ว่างเปล่า!');
          }
        }
      });

      container.appendChild(card);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new AkiraVisualNovel();
});
