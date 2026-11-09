// FNaF Sister Location Web Bootstrapper
// Faithful translation of Unity FNaFSlGameBootstrapper.cs

import { ProceduralCanvas } from './engine/ProceduralCanvas.js';
import { ProceduralAudioSynthesizer } from './engine/ProceduralAudioSynthesizer.js';
import { GameStateService } from './engine/GameStateService.js';
import { SceneGraphRouter, SceneId } from './engine/SceneGraphRouter.js';

import { OpeningCutsceneScene, TitleMenuScene, ExtrasMenuScene } from './scenes/OpeningAndMenusScenes.js';
import { PreNightInterludeScene, ElevatorScene, VentCrawlScene } from './scenes/InterludeAndElevatorScenes.js';
import { PrimaryControlScene, CircusControlScene, UnderDeskScene } from './scenes/Night1And2ControlScenes.js';
import { BalloraGalleryScene, BreakerRoomScene } from './scenes/BalloraAndBreakerScenes.js';
import { FuntimeAuditoriumScene, PartsAndServiceScene } from './scenes/Night3And5AuditoriumAndPartsScenes.js';
import { SpringlockSuitScene, ScoopingRoomScene } from './scenes/Night4SpringlockAndScoopingScenes.js';
import { CustomNightMenuScene, PrivateRoomScene } from './scenes/PrivateRoomAndCustomNightScenes.js';
import { Baby8BitMinigameScene } from './scenes/Baby8BitMinigameScene.js';
import { TvLivingRoomScene, Decay8BitCutsceneScene, SpringtrapFinaleScene } from './scenes/TvAndFinaleCutscenesScenes.js';

window._fnafSlKeyHeld = {};
window._fnafSlMouseDown = false;

class FNaFSlGameBootstrapper {
  constructor() {
    this.canvasEl = document.getElementById('gameCanvas');
    this.canvas = new ProceduralCanvas(this.canvasEl);
    this.state = new GameStateService();
    this.audio = new ProceduralAudioSynthesizer();
    this.router = new SceneGraphRouter(this.state, this.audio);

    this.mouseLogical = { x: -100, y: -100 };
    this.mousePressedThisFrame = false;
    this.mouseHeld = false;
    this.debugBarExpanded = false;

    this.lastTime = performance.now();

    this.initInput();
    this.registerAll21Scenes();
    this.router.transitionTo(SceneId.OPENING_CUTSCENE);

    requestAnimationFrame((t) => this.loop(t));
  }

  initInput() {
    const updateMousePos = (clientX, clientY) => {
      const rect = this.canvasEl.getBoundingClientRect();
      const scaleX = 1280 / rect.width;
      const scaleY = 720 / rect.height;
      this.mouseLogical.x = (clientX - rect.left) * scaleX;
      this.mouseLogical.y = (clientY - rect.top) * scaleY;
    };

    window.addEventListener('mousemove', (e) => {
      updateMousePos(e.clientX, e.clientY);
    });

    window.addEventListener('mousedown', (e) => {
      this.audio.ensureContext();
      updateMousePos(e.clientX, e.clientY);
      this.mousePressedThisFrame = true;
      this.mouseHeld = true;
      window._fnafSlMouseDown = true;
    });

    window.addEventListener('mouseup', () => {
      this.mouseHeld = false;
      window._fnafSlMouseDown = false;
    });

    window.addEventListener('keydown', (e) => {
      this.audio.ensureContext();
      window._fnafSlKeyHeld[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      window._fnafSlKeyHeld[e.code] = false;
    });

    // Touch support
    this.canvasEl.addEventListener('touchstart', (e) => {
      this.audio.ensureContext();
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
        this.mousePressedThisFrame = true;
        this.mouseHeld = true;
        window._fnafSlMouseDown = true;
      }
      e.preventDefault();
    }, { passive: false });

    this.canvasEl.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
      }
      e.preventDefault();
    }, { passive: false });

    this.canvasEl.addEventListener('touchend', (e) => {
      this.mouseHeld = false;
      window._fnafSlMouseDown = false;
      e.preventDefault();
    }, { passive: false });
  }

  registerAll21Scenes() {
    this.router.registerScene(SceneId.OPENING_CUTSCENE, new OpeningCutsceneScene(this.router, this.audio));
    this.router.registerScene(SceneId.TITLE_MENU, new TitleMenuScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.EXTRAS_MENU, new ExtrasMenuScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.PRE_NIGHT_INTERLUDE, new PreNightInterludeScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.ELEVATOR, new ElevatorScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.VENT_CRAWL, new VentCrawlScene(this.router, this.audio));
    this.router.registerScene(SceneId.PRIMARY_CONTROL, new PrimaryControlScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.BALLORA_GALLERY, new BalloraGalleryScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.BREAKER_ROOM, new BreakerRoomScene(this.router, this.audio));
    this.router.registerScene(SceneId.CIRCUS_CONTROL, new CircusControlScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.UNDER_DESK, new UnderDeskScene(this.router, this.audio));
    this.router.registerScene(SceneId.FUNTIME_AUDITORIUM, new FuntimeAuditoriumScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.PARTS_AND_SERVICE, new PartsAndServiceScene(this.router, this.audio));
    this.router.registerScene(SceneId.SPRINGLOCK_SUIT, new SpringlockSuitScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.SCOOPING_ROOM, new ScoopingRoomScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.PRIVATE_ROOM, new PrivateRoomScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.TV_LIVING_ROOM, new TvLivingRoomScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.BABY_8BIT_MINIGAME, new Baby8BitMinigameScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.CUSTOM_NIGHT_MENU, new CustomNightMenuScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.DECAY_8BIT_CUTSCENE, new Decay8BitCutsceneScene(this.router, this.state, this.audio));
    this.router.registerScene(SceneId.SPRINGTRAP_FINALE, new SpringtrapFinaleScene(this.router, this.state, this.audio));
  }

  loop(currentTime) {
    const dt = Math.min(0.1, (currentTime - this.lastTime) / 1000);
    this.lastTime = currentTime;

    // Update state
    this.audio.update(dt);
    this.router.update(dt);

    // Render frame
    this.canvas.beginFrame(this.mouseLogical, this.mousePressedThisFrame, this.mouseHeld);
    this.router.render(this.canvas);
    this.renderSubtitleBar();
    this.renderDeveloperDebugToolbar();

    this.mousePressedThisFrame = false;
    requestAnimationFrame((t) => this.loop(t));
  }

  renderSubtitleBar() {
    if (!this.audio.activeSubtitle) return;

    this.canvas.fillRect(140, 652, 1000, 56, 'rgba(5, 8, 15, 0.88)');
    this.canvas.strokeRect(140, 652, 1000, 56, 2, 'rgba(89, 166, 242, 0.65)');
    const formatted = `[${this.audio.activeSpeaker}]: "${this.audio.activeSubtitle}"`;
    this.canvas.drawText(formatted, 156, 656, 16, '#f1f5f9', 'center', 968, 48, true);
  }

  renderDeveloperDebugToolbar() {
    const toggleLabel = this.debugBarExpanded ? 'DEV DEBUG [HIDE ▲]' : 'DEV DEBUG / RNG [▼]';
    if (this.canvas.button(1095, 4, 178, 26, toggleLabel, 'rgba(36, 36, 56, 0.9)', '#22d3ee', 12)) {
      this.debugBarExpanded = !this.debugBarExpanded;
    }

    if (!this.debugBarExpanded) return;

    this.canvas.fillRect(480, 32, 792, 76, 'rgba(10, 13, 26, 0.95)');
    this.canvas.strokeRect(480, 32, 792, 76, 2, '#22d3ee');

    const rngForced = this.state.state.debugForceEasterEggs;
    const rngText = rngForced ? '100% RNG EGGS: ON' : '100% RNG EGGS: OFF';
    const rngCol = rngForced ? '#15803d' : '#3f2e2e';
    if (this.canvas.button(490, 38, 175, 28, rngText, rngCol, '#ffffff', 12)) {
      this.state.state.debugForceEasterEggs = !this.state.state.debugForceEasterEggs;
      this.state.save();
    }

    const fastMode = this.state.state.fastTimerMode;
    const timerText = fastMode ? 'TIMER: FAST' : 'TIMER: CANON';
    if (this.canvas.button(672, 38, 130, 28, timerText, '#334155', '#ffffff', 12)) {
      this.state.state.fastTimerMode = !this.state.state.fastTimerMode;
      this.state.save();
    }

    if (this.canvas.button(808, 38, 150, 28, 'UNLOCK ALL (4★)', '#854d0e', '#facc15', 12)) {
      this.state.unlockAllForTesting();
    }

    if (this.canvas.button(964, 38, 145, 28, 'BLUEPRINT EGG', '#1e3a5f', '#22d3ee', 12)) {
      this.router.forceBlueprintEasterEgg();
    }

    if (this.canvas.button(1115, 38, 148, 28, 'TITLE SCREEN', '#334155', '#ffffff', 12)) {
      this.router.transitionTo(SceneId.TITLE_MENU);
    }

    // Row 2: Instant Scene / Night Jumpers
    for (let n = 1; n <= 5; n++) {
      if (this.canvas.button(490 + (n - 1) * 66, 72, 60, 28, `N${n}`, '#2e3852', '#ffffff', 12)) {
        this.state.state.currentNight = n;
        this.state.save();
        this.router.transitionTo(SceneId.PRE_NIGHT_INTERLUDE, { night: n });
      }
    }

    if (this.canvas.button(822, 72, 105, 28, '8-BIT BABY', '#881337', '#ffffff', 12)) {
      this.router.transitionTo(SceneId.BABY_8BIT_MINIGAME);
    }

    if (this.canvas.button(933, 72, 110, 28, 'PVT ROOM', '#166534', '#ffffff', 12)) {
      this.router.transitionTo(SceneId.PRIVATE_ROOM, { customNight: false });
    }

    if (this.canvas.button(1049, 72, 110, 28, 'CUSTOM N.', '#713f12', '#facc15', 12)) {
      this.router.transitionTo(SceneId.CUSTOM_NIGHT_MENU);
    }

    if (this.canvas.button(1165, 72, 98, 28, 'FINALE', '#581c87', '#ffffff', 12)) {
      this.router.transitionTo(SceneId.SPRINGTRAP_FINALE, { returnToExtras: false });
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new FNaFSlGameBootstrapper();
});

