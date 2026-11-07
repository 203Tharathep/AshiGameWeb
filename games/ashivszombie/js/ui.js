// Ashi vs Zombie - User Interface & HUD Manager (Premium PvZ Overhaul)

class UIManager {
    constructor(game) {
        this.game = game;
        this.selectedSeed = null;
        this.shovelActive = false;
        this.unlockedPlants = ['sunflower', 'peashooter'];
        this.plantCooldowns = {};
        this.currentLevelIndex = 0;
        this.currentWorldFilter = 'all';
        this.loadProgress();
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('ashi_vs_zombie_progress');
            if (saved) {
                const data = JSON.parse(saved);
                this.unlockedPlants = Array.isArray(data.unlockedPlants) ? data.unlockedPlants : ['sunflower', 'peashooter'];
                this.currentLevelIndex = typeof data.currentLevelIndex === 'number' ? data.currentLevelIndex : 0;
            }
        } catch (e) {
            this.unlockedPlants = ['sunflower', 'peashooter'];
            this.currentLevelIndex = 0;
        }

        // Guarantee basic starters
        if (!this.unlockedPlants.includes('sunflower')) this.unlockedPlants.push('sunflower');
        if (!this.unlockedPlants.includes('peashooter')) this.unlockedPlants.push('peashooter');
    }

    saveProgress() {
        try {
            localStorage.setItem('ashi_vs_zombie_progress', JSON.stringify({
                unlockedPlants: this.unlockedPlants,
                currentLevelIndex: this.currentLevelIndex
            }));
        } catch (e) {}
    }

    unlockPlant(plantId) {
        if (!this.unlockedPlants.includes(plantId)) {
            this.unlockedPlants.push(plantId);
            this.saveProgress();
        }
    }

    initUI() {
        this.bindEvents();
        if (this.game && this.game.currentLevel) {
            this.renderSeedBank();
            this.renderWaveFlags();
        }
    }

    // --- Title & Help Modals ---
    showTitleModal() {
        const modal = document.getElementById('title-modal');
        if (!modal) return;
        const playBtnText = document.getElementById('title-play-btn-text');
        if (playBtnText) {
            if (this.currentLevelIndex > 0 && window.LEVELS_CONFIG && window.LEVELS_CONFIG[this.currentLevelIndex]) {
                const lvl = window.LEVELS_CONFIG[this.currentLevelIndex];
                playBtnText.textContent = `เล่นต่อ ด่าน ${lvl.id} ▶️`;
            } else {
                playBtnText.textContent = 'เริ่มเล่นเกม (START) ▶️';
            }
        }
        modal.classList.remove('hidden');
    }

    hideTitleModal() {
        const modal = document.getElementById('title-modal');
        if (modal) modal.classList.add('hidden');
    }

    openHelpModal() {
        const modal = document.getElementById('help-modal');
        if (modal) modal.classList.remove('hidden');
    }

    closeHelpModal() {
        const modal = document.getElementById('help-modal');
        if (modal) modal.classList.add('hidden');
    }

    // --- Seed Bank & Cards ---
    renderSeedBank() {
        const seedContainer = document.getElementById('seed-cards-container');
        if (!seedContainer) return;
        seedContainer.innerHTML = '';

        const level = this.game ? this.game.currentLevel : null;
        if (!level || !Array.isArray(level.allowedPlants)) return;

        // Plants available for this level
        const available = level.allowedPlants.filter(p => this.unlockedPlants.includes(p) || p === 'sunflower' || p === 'peashooter');

        available.forEach(plantId => {
            const plant = window.PLANT_TYPES[plantId];
            if (!plant) return;

            const card = document.createElement('div');
            card.className = 'seed-card';
            card.id = `seed-${plantId}`;
            card.dataset.plantId = plantId;
            card.title = `${plant.nameTh} (${plant.name}) - ราคา ${plant.cost} ☀️`;

            card.innerHTML = `
                <div class="seed-cost">${plant.cost}</div>
                <div class="seed-img-wrap">
                    <img src="${plant.sprite}" alt="${plant.name}" />
                </div>
                <div class="seed-cooldown-overlay" id="cd-${plantId}"></div>
                <div class="seed-name-label">${plant.nameTh}</div>
            `;

            card.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectSeed(plantId);
            });

            let isTouchDragging = false;
            card.addEventListener('touchstart', (e) => {
                isTouchDragging = false;
                if (this.selectedSeed !== plantId) {
                    this.selectSeed(plantId);
                }
            }, { passive: true });

            card.addEventListener('touchmove', (e) => {
                if (!e.touches || !e.touches[0]) return;
                isTouchDragging = true;
                if (this.game && this.game.handleCanvasMove) {
                    this.game.handleCanvasMove(e.touches[0].clientX, e.touches[0].clientY);
                }
            }, { passive: true });

            card.addEventListener('touchend', (e) => {
                if (isTouchDragging && e.changedTouches && e.changedTouches[0]) {
                    e.preventDefault();
                    if (this.game && this.game.handleCanvasMove && this.game.handleCanvasClick) {
                        this.game.handleCanvasMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
                        if (this.game.hoverRow >= 0 && this.game.hoverCol >= 0) {
                            this.game.handleCanvasClick();
                        }
                    }
                }
                isTouchDragging = false;
            });

            seedContainer.appendChild(card);
        });
    }

    selectSeed(plantId) {
        const plant = window.PLANT_TYPES[plantId];
        if (!plant) return;

        // Check if on cooldown
        const cdLeft = this.plantCooldowns[plantId] || 0;
        if (cdLeft > 0) return;

        // Check if enough sun
        if (this.game.sun < plant.cost) {
            window.AudioMgr.playHit('splat');
            return;
        }

        if (this.selectedSeed === plantId) {
            this.deselectAll();
        } else {
            this.deselectAll();
            this.selectedSeed = plantId;
            const card = document.getElementById(`seed-${plantId}`);
            if (card) card.classList.add('selected');
        }
    }

    toggleShovel() {
        this.deselectAll();
        this.shovelActive = !this.shovelActive;
        const shovelBtn = document.getElementById('shovel-btn');
        if (shovelBtn) {
            if (this.shovelActive) {
                shovelBtn.classList.add('active');
            } else {
                shovelBtn.classList.remove('active');
            }
        }
    }

    deselectAll() {
        this.selectedSeed = null;
        this.shovelActive = false;
        document.querySelectorAll('.seed-card').forEach(c => c.classList.remove('selected'));
        const shovelBtn = document.getElementById('shovel-btn');
        if (shovelBtn) shovelBtn.classList.remove('active');
    }

    startCooldown(plantId) {
        const plant = window.PLANT_TYPES[plantId];
        if (plant) {
            this.plantCooldowns[plantId] = plant.cooldown;
        }
    }

    updateCooldowns(dt) {
        for (const [plantId, cd] of Object.entries(this.plantCooldowns)) {
            if (cd > 0) {
                const newCd = Math.max(0, cd - dt);
                this.plantCooldowns[plantId] = newCd;
                const plant = window.PLANT_TYPES[plantId];
                const cdOverlay = document.getElementById(`cd-${plantId}`);
                if (cdOverlay && plant) {
                    const pct = (newCd / plant.cooldown) * 100;
                    cdOverlay.style.height = `${pct}%`;
                    cdOverlay.textContent = newCd > 0.15 ? `${newCd.toFixed(1)}s` : '';
                }
            } else {
                const cdOverlay = document.getElementById(`cd-${plantId}`);
                if (cdOverlay && cdOverlay.textContent !== '') {
                    cdOverlay.textContent = '';
                }
            }
        }

        // Update card affordability classes
        document.querySelectorAll('.seed-card').forEach(card => {
            const plantId = card.dataset.plantId;
            const plant = window.PLANT_TYPES[plantId];
            const cd = this.plantCooldowns[plantId] || 0;
            if (plant && this.game) {
                const cannotAfford = this.game.sun < plant.cost;
                if (cannotAfford) {
                    card.classList.add('insufficient');
                } else {
                    card.classList.remove('insufficient');
                }

                if (cannotAfford || cd > 0) {
                    card.classList.add('disabled');
                } else {
                    card.classList.remove('disabled');
                }
            }
        });
    }

    updateSunDisplay(amount) {
        const sunEl = document.getElementById('sun-count');
        const sunBox = document.getElementById('sun-bank-box');
        if (sunEl) sunEl.textContent = amount;
        if (sunBox) {
            sunBox.classList.remove('bump');
            void sunBox.offsetWidth; // trigger reflow
            sunBox.classList.add('bump');
        }
    }

    renderWaveFlags() {
        const container = document.getElementById('wave-flags-container');
        if (!container) return;
        container.innerHTML = '';

        const level = this.game ? this.game.currentLevel : null;
        if (!level || !Array.isArray(level.waves) || level.waves.length === 0) return;

        const total = level.waves.length;
        level.waves.forEach((w, idx) => {
            if (w.isFlag) {
                const pct = ((idx + 1) / total) * 100;
                const flagEl = document.createElement('div');
                flagEl.className = 'wave-flag-pin';
                flagEl.style.left = `${Math.min(94, Math.max(6, pct))}%`;
                flagEl.textContent = '🚩';
                flagEl.title = w.isFinal ? 'Final Wave!' : 'Huge Wave!';
                container.appendChild(flagEl);
            }
        });
    }

    updateWaveProgress(percent, waveIndex, totalWaves, isFinal) {
        const bar = document.getElementById('wave-progress-fill');
        const head = document.getElementById('wave-zombie-head');
        const textEl = document.getElementById('wave-stage-text');

        const safePct = Math.min(100, Math.max(0, percent));
        if (bar) bar.style.width = `${safePct}%`;
        if (head) head.style.left = `${Math.min(93, Math.max(0, safePct))}%`;

        if (textEl) {
            if (isFinal) {
                textEl.textContent = '⚠️ FINAL WAVE!';
                textEl.style.color = '#ff4444';
            } else if (totalWaves) {
                textEl.textContent = `WAVE ${waveIndex || 1}/${totalWaves}`;
                textEl.style.color = '#ffd700';
            } else {
                textEl.textContent = 'WAVE';
                textEl.style.color = '#ffd700';
            }
        }
    }

    showNewPlantModal(plantId, onProceed) {
        const plant = window.PLANT_TYPES[plantId];
        if (!plant) {
            if (onProceed) onProceed();
            return;
        }

        const modal = document.getElementById('reward-modal');
        const img = document.getElementById('reward-plant-img');
        const name = document.getElementById('reward-plant-name');
        const desc = document.getElementById('reward-plant-desc');
        const cost = document.getElementById('reward-plant-cost');

        if (img) img.src = plant.sprite;
        if (name) name.textContent = `${plant.name} (${plant.nameTh})`;
        if (desc) desc.textContent = plant.descTh;
        if (cost) cost.textContent = `ราคา: ${plant.cost} ☀️ | คูลดาวน์: ${plant.cooldown} วินาที`;

        if (modal) modal.classList.remove('hidden');
        window.AudioMgr.playWin();

        const btn = document.getElementById('reward-ok-btn');
        if (btn) {
            const clickHandler = () => {
                btn.removeEventListener('click', clickHandler);
                if (modal) modal.classList.add('hidden');
                if (onProceed) onProceed();
            };
            btn.addEventListener('click', clickHandler);
        }
    }

    showVictoryModal(stats, onNextLevel, onReplay, mowersLost = 0) {
        const modal = document.getElementById('victory-modal');
        const zEl = document.getElementById('stat-zombies-killed');
        const sEl = document.getElementById('stat-sun-collected');
        const pEl = document.getElementById('stat-plants-planted');
        const starsContainer = document.getElementById('victory-stars');

        if (zEl) zEl.textContent = stats.zombiesKilled;
        if (sEl) sEl.textContent = stats.sunCollected;
        if (pEl) pEl.textContent = stats.plantsPlanted;

        // Calculate stars: 3 stars if 0 lawnmowers lost, 2 stars if 1-2 lost, 1 star if >= 3
        let starCount = 3;
        if (mowersLost >= 3) starCount = 1;
        else if (mowersLost > 0) starCount = 2;

        if (starsContainer) {
            const starSpans = starsContainer.querySelectorAll('.star');
            starSpans.forEach((s, idx) => {
                s.classList.toggle('star-active', idx < starCount);
            });
        }

        if (modal) modal.classList.remove('hidden');
        window.AudioMgr.playWin();

        const nextBtn = document.getElementById('victory-next-btn');
        if (nextBtn) {
            nextBtn.onclick = () => {
                if (modal) modal.classList.add('hidden');
                if (onNextLevel) onNextLevel();
            };
        }

        const replayBtn = document.getElementById('victory-replay-btn');
        if (replayBtn) {
            replayBtn.onclick = () => {
                if (modal) modal.classList.add('hidden');
                if (onReplay) onReplay();
            };
        }

        const homeBtn = document.getElementById('victory-home-btn');
        if (homeBtn) {
            homeBtn.onclick = () => {
                if (modal) modal.classList.add('hidden');
                this.showTitleModal();
            };
        }
    }

    showGameOverModal(onReplay) {
        const modal = document.getElementById('gameover-modal');
        if (modal) modal.classList.remove('hidden');
        window.AudioMgr.playLose();

        const retryBtn = document.getElementById('gameover-retry-btn');
        if (retryBtn) {
            retryBtn.onclick = () => {
                if (modal) modal.classList.add('hidden');
                if (onReplay) onReplay();
            };
        }

        const homeBtn = document.getElementById('gameover-home-btn');
        if (homeBtn) {
            homeBtn.onclick = () => {
                if (modal) modal.classList.add('hidden');
                this.showTitleModal();
            };
        }
    }

    // --- Almanac ---
    openAlmanac() {
        const modal = document.getElementById('almanac-modal');
        if (modal) modal.classList.remove('hidden');
        this.renderAlmanacTab('plants');
    }

    closeAlmanac() {
        const modal = document.getElementById('almanac-modal');
        if (modal) modal.classList.add('hidden');
    }

    renderAlmanacTab(tab) {
        const listEl = document.getElementById('almanac-list');
        if (!listEl) return;
        listEl.innerHTML = '';

        const tabPlantsBtn = document.getElementById('tab-plants-btn');
        const tabZombiesBtn = document.getElementById('tab-zombies-btn');

        if (tab === 'plants') {
            if (tabPlantsBtn) tabPlantsBtn.classList.add('active');
            if (tabZombiesBtn) tabZombiesBtn.classList.remove('active');

            Object.values(window.PLANT_TYPES).forEach(plant => {
                const isUnlocked = this.unlockedPlants.includes(plant.id);
                const item = document.createElement('div');
                item.className = `almanac-item ${isUnlocked ? '' : 'locked'}`;
                item.innerHTML = `
                    <img src="${plant.sprite}" alt="${plant.name}" />
                    <span>${isUnlocked ? plant.nameTh : '??? (ยังไม่ปลด)'}</span>
                `;
                item.onclick = () => {
                    this.showPlantDetail(plant, isUnlocked);
                };
                listEl.appendChild(item);
            });

            const first = Object.values(window.PLANT_TYPES)[0];
            this.showPlantDetail(first, true);

        } else {
            if (tabPlantsBtn) tabPlantsBtn.classList.remove('active');
            if (tabZombiesBtn) tabZombiesBtn.classList.add('active');

            Object.values(window.ZOMBIE_TYPES).forEach(zombie => {
                const item = document.createElement('div');
                item.className = 'almanac-item';
                item.innerHTML = `
                    <img src="${zombie.sprite}" alt="${zombie.name}" />
                    <span>${zombie.nameTh}</span>
                `;
                item.onclick = () => {
                    this.showZombieDetail(zombie);
                };
                listEl.appendChild(item);
            });

            const first = Object.values(window.ZOMBIE_TYPES)[0];
            this.showZombieDetail(first);
        }
    }

    showPlantDetail(plant, isUnlocked) {
        const detailEl = document.getElementById('almanac-detail');
        if (!detailEl) return;
        if (!isUnlocked) {
            detailEl.innerHTML = `
                <div class="detail-locked" style="text-align: center; padding: 40px 10px;">
                    <div style="font-size: 42px; margin-bottom: 10px;">🔒</div>
                    <h3 style="color: var(--pvz-gold); margin-bottom: 8px;">ยังไม่ปลดล็อกตัวละครนี้</h3>
                    <p style="color: #ecd599;">ผ่านด่าน ${plant.unlockedAt || 'ถัดไป'} เพื่อปลดล็อกพลังพืชอชิตัวนี้มาใช้งาน!</p>
                </div>
            `;
            return;
        }

        detailEl.innerHTML = `
            <div class="detail-header">
                <img src="${plant.sprite}" class="detail-avatar" alt="${plant.name}" />
                <div class="detail-title">
                    <h2>${plant.name}</h2>
                    <h4>${plant.nameTh}</h4>
                    <span class="badge">☀️ ราคา: ${plant.cost} แต้ม</span>
                    <span class="badge">⏱️ คูลดาวน์: ${plant.cooldown} วินาที</span>
                    <span class="badge">❤️ HP: ${plant.maxHp}</span>
                </div>
            </div>
            <div class="detail-body">
                <p><strong>คุณสมบัติการต่อสู้:</strong> ${plant.descTh}</p>
                <p><strong>บันทึกประวัติอชิ:</strong> ${plant.desc}</p>
            </div>
        `;
    }

    showZombieDetail(zombie) {
        const detailEl = document.getElementById('almanac-detail');
        if (!detailEl) return;
        detailEl.innerHTML = `
            <div class="detail-header">
                <img src="${zombie.sprite}" class="detail-avatar" alt="${zombie.name}" />
                <div class="detail-title">
                    <h2>${zombie.name}</h2>
                    <h4>${zombie.nameTh}</h4>
                    <span class="badge red">❤️ เลือด: ${zombie.maxHp}</span>
                    <span class="badge">⚡ ความเร็ว: ${zombie.speed}</span>
                    <span class="badge">🍽️ กัดแรง: ${zombie.eatDps}/วินาที</span>
                </div>
            </div>
            <div class="detail-body">
                <p><strong>ข้อมูลสายพันธุ์:</strong> ซอมบี้ร่างอชิที่หิวจัด! พร้อมบุกประชิดหอพักเพื่อเขมือบสมอง</p>
                <p><strong>วิธีแก้ทาง:</strong> ${zombie.hasShield ? 'ถือโล่กล่องพิซซ่ากันกระสุนตรง! ให้ใช้ใยสไปเดอร์หรือระเบิดแก้ทาง' : (zombie.canVault ? 'ระวัง! วิ่งเร็วมากและสามารถกระโดดข้ามพืชตัวแรกได้ วาง Fat-Ashi ดักไว้' : 'ระดมยิงด้วย Gekko-Ashi หรือ Repeater ตั้งแต่เนิ่นๆ')}</p>
            </div>
        `;
    }

    // --- Level Select Modal ---
    openLevelSelect(worldFilter = 'all') {
        const modal = document.getElementById('level-select-modal');
        const grid = document.getElementById('level-grid');
        if (!grid || !modal) return;
        grid.innerHTML = '';
        this.currentWorldFilter = worldFilter;

        // Update tabs active state
        const tabBtns = document.querySelectorAll('.world-tab');
        tabBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.world === String(worldFilter));
        });

        window.LEVELS_CONFIG.forEach((lvl, idx) => {
            if (worldFilter !== 'all' && String(lvl.world) !== String(worldFilter)) {
                return;
            }

            const rewardPlant = lvl.rewardPlant ? window.PLANT_TYPES[lvl.rewardPlant] : null;
            const btn = document.createElement('div');
            btn.className = 'level-card';
            btn.innerHTML = `
                <div class="level-num">${lvl.id}</div>
                ${rewardPlant ? `<img src="${rewardPlant.sprite}" class="level-thumb-reward" alt="" title="รางวัล: ${rewardPlant.nameTh}" />` : ''}
                <div class="level-title">${lvl.nameTh}</div>
                <div class="level-badge">${lvl.theme}</div>
            `;
            btn.onclick = () => {
                modal.classList.add('hidden');
                this.hideTitleModal();
                this.currentLevelIndex = idx;
                this.saveProgress();
                this.game.startLevel(idx);
            };
            grid.appendChild(btn);
        });

        modal.classList.remove('hidden');
    }

    bindEvents() {
        // Shovel
        const shovelBtn = document.getElementById('shovel-btn');
        if (shovelBtn) shovelBtn.onclick = () => this.toggleShovel();

        // Speed
        const speedBtn = document.getElementById('speed-btn');
        if (speedBtn) {
            speedBtn.onclick = () => {
                this.game.gameSpeed = this.game.gameSpeed === 1 ? 2 : 1;
                speedBtn.textContent = `${this.game.gameSpeed}x ⚡`;
                speedBtn.classList.toggle('active', this.game.gameSpeed === 2);
            };
        }

        // Music & Sound
        const musicBtn = document.getElementById('music-btn');
        if (musicBtn) {
            musicBtn.onclick = () => {
                window.AudioMgr.setMusicEnabled(!window.AudioMgr.musicEnabled);
                musicBtn.textContent = window.AudioMgr.musicEnabled ? '🎵 ดนตรี' : '🔇 ดนตรี: ปิด';
                musicBtn.classList.toggle('off', !window.AudioMgr.musicEnabled);
            };
        }

        const soundBtn = document.getElementById('sound-btn');
        if (soundBtn) {
            soundBtn.onclick = () => {
                window.AudioMgr.setSoundEnabled(!window.AudioMgr.soundEnabled);
                soundBtn.textContent = window.AudioMgr.soundEnabled ? '🔊 เสียง' : '🔇 เสียง: ปิด';
                soundBtn.classList.toggle('off', !window.AudioMgr.soundEnabled);
            };
        }

        // Pause Menu
        const pauseBtn = document.getElementById('pause-btn');
        if (pauseBtn) {
            pauseBtn.onclick = () => this.game.togglePause();
        }

        const resumeBtn = document.getElementById('pause-resume-btn');
        if (resumeBtn) resumeBtn.onclick = () => this.game.togglePause();

        const restartBtn = document.getElementById('pause-restart-btn');
        if (restartBtn) {
            restartBtn.onclick = () => {
                const pauseModal = document.getElementById('pause-modal');
                if (pauseModal) pauseModal.classList.add('hidden');
                this.game.restartLevel();
            };
        }

        const pauseLevelSelectBtn = document.getElementById('pause-level-select-btn');
        if (pauseLevelSelectBtn) {
            pauseLevelSelectBtn.onclick = () => {
                const pauseModal = document.getElementById('pause-modal');
                if (pauseModal) pauseModal.classList.add('hidden');
                this.openLevelSelect('all');
            };
        }

        const pauseHomeBtn = document.getElementById('pause-home-btn');
        if (pauseHomeBtn) {
            pauseHomeBtn.onclick = () => {
                const pauseModal = document.getElementById('pause-modal');
                if (pauseModal) pauseModal.classList.add('hidden');
                this.showTitleModal();
            };
        }

        // Top Home Button
        const homeBtn = document.getElementById('home-btn');
        if (homeBtn) {
            homeBtn.onclick = () => {
                this.showTitleModal();
            };
        }

        // Title Screen Buttons
        const titlePlayBtn = document.getElementById('title-play-btn');
        if (titlePlayBtn) {
            titlePlayBtn.onclick = () => {
                this.hideTitleModal();
                if (!this.game.isRunning) {
                    this.game.startLevel(this.currentLevelIndex || 0);
                } else if (this.game.isPaused) {
                    this.game.togglePause();
                }
            };
        }

        const titleLevelsBtn = document.getElementById('title-levels-btn');
        if (titleLevelsBtn) {
            titleLevelsBtn.onclick = () => this.openLevelSelect('all');
        }

        const titleAlmanacBtn = document.getElementById('title-almanac-btn');
        if (titleAlmanacBtn) {
            titleAlmanacBtn.onclick = () => this.openAlmanac();
        }

        const titleHelpBtn = document.getElementById('title-help-btn');
        if (titleHelpBtn) {
            titleHelpBtn.onclick = () => this.openHelpModal();
        }

        const helpCloseBtn = document.getElementById('help-close-btn');
        if (helpCloseBtn) {
            helpCloseBtn.onclick = () => this.closeHelpModal();
        }

        // Almanac
        const almanacBtn = document.getElementById('almanac-btn');
        if (almanacBtn) almanacBtn.onclick = () => this.openAlmanac();

        const closeAlmanacBtn = document.getElementById('almanac-close-btn');
        if (closeAlmanacBtn) closeAlmanacBtn.onclick = () => this.closeAlmanac();

        const tabPlantsBtn = document.getElementById('tab-plants-btn');
        if (tabPlantsBtn) tabPlantsBtn.onclick = () => this.renderAlmanacTab('plants');

        const tabZombiesBtn = document.getElementById('tab-zombies-btn');
        if (tabZombiesBtn) tabZombiesBtn.onclick = () => this.renderAlmanacTab('zombies');

        // Level Select World Tabs
        const worldTabs = document.querySelectorAll('.world-tab');
        worldTabs.forEach(t => {
            t.onclick = () => {
                this.openLevelSelect(t.dataset.world || 'all');
            };
        });

        const closeLvlBtn = document.getElementById('close-level-select-btn');
        if (closeLvlBtn) {
            closeLvlBtn.onclick = () => {
                const lvlModal = document.getElementById('level-select-modal');
                if (lvlModal) lvlModal.classList.add('hidden');
            };
        }
    }
}

window.UIManager = UIManager;
