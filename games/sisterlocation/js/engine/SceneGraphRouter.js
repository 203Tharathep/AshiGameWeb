// SceneGraphRouter for Sister Location
// Isolates all 21 scenes, enforces clean exit() timer cleanup, and runs global RNG Easter Egg checks.
// Faithful translation of Unity SceneGraphRouter.cs

export const SceneId = {
  OPENING_CUTSCENE: 'OPENING_CUTSCENE',
  TITLE_MENU: 'TITLE_MENU',
  EXTRAS_MENU: 'EXTRAS_MENU',
  PRE_NIGHT_INTERLUDE: 'PRE_NIGHT_INTERLUDE',
  ELEVATOR: 'ELEVATOR',
  VENT_CRAWL: 'VENT_CRAWL',
  PRIMARY_CONTROL: 'PRIMARY_CONTROL',
  BALLORA_GALLERY: 'BALLORA_GALLERY',
  BREAKER_ROOM: 'BREAKER_ROOM',
  CIRCUS_CONTROL: 'CIRCUS_CONTROL',
  UNDER_DESK: 'UNDER_DESK',
  FUNTIME_AUDITORIUM: 'FUNTIME_AUDITORIUM',
  PARTS_AND_SERVICE: 'PARTS_AND_SERVICE',
  SPRINGLOCK_SUIT: 'SPRINGLOCK_SUIT',
  SCOOPING_ROOM: 'SCOOPING_ROOM',
  PRIVATE_ROOM: 'PRIVATE_ROOM',
  TV_LIVING_ROOM: 'TV_LIVING_ROOM',
  BABY_8BIT_MINIGAME: 'BABY_8BIT_MINIGAME',
  CUSTOM_NIGHT_MENU: 'CUSTOM_NIGHT_MENU',
  DECAY_8BIT_CUTSCENE: 'DECAY_8BIT_CUTSCENE',
  SPRINGTRAP_FINALE: 'SPRINGTRAP_FINALE'
};

const BLUEPRINT_TITLES = [
  'PROJECT: CIRCUS BABY — HEIGHT: 7.2 FT | WEIGHT: 585 LBS | INTERNAL ICE CREAM DISPENSER & STORAGE TANK',
  'PROJECT: BALLORA — HEIGHT: 6.2 FT | WEIGHT: 347 LBS | AUDIO ACTIVATION SENSOR & DETERRENCE ARRAY',
  'PROJECT: FUNTIME FREDDY — HEIGHT: 6.0 FT | WEIGHT: 350 LBS | VOICE MIMIC / LURE & CHEST CAVITY STORAGE (OCCUPIED)',
  'PROJECT: FUNTIME FOXY — HEIGHT: 5.9 FT | WEIGHT: 290 LBS | LIGHT-ACTIVATED MOTION SENSOR & PARENTAL VOICE SYNC'
];

const BLUEPRINT_ANIMS = ['circus_baby', 'ballora', 'funtime_freddy', 'funtime_foxy'];

export class SceneGraphRouter {
  constructor(stateService, audioSynthesizer) {
    this.stateService = stateService;
    this.audio = audioSynthesizer;
    this.scenes = {};
    this.currentScene = null;
    this.currentSceneId = null;

    // Easter Egg states
    this.blueprintOverlayTimer = 0;
    this.blueprintOverlayIndex = 0;
    this.lolbitMaskOverride = false;
    this.rareSpawnActive = false;

    // Jumpscare states
    this.jumpscareTimer = 0;
    this.jumpscareAnimId = '';
    this.postJumpscareScene = SceneId.TITLE_MENU;
    this.postJumpscareParams = null;

    this.babyWhisperTimer = 14;
  }

  registerScene(id, scene) {
    this.scenes[id] = scene;
  }

  transitionTo(nextId, parameters = {}) {
    if (this.currentScene && typeof this.currentScene.exit === 'function') {
      this.currentScene.exit();
    }

    this.audio.setMusicBoxStage(0);
    this.evaluateTransitionEasterEggs(nextId);

    const nextScene = this.scenes[nextId];
    if (nextScene) {
      this.currentScene = nextScene;
      this.currentSceneId = nextId;
      if (typeof nextScene.enter === 'function') {
        nextScene.enter(parameters);
      }
    }
  }

  triggerJumpscare(animatronicId, returnScene = SceneId.TITLE_MENU, returnParams = null) {
    this.jumpscareAnimId = animatronicId;
    this.jumpscareTimer = 1.45;
    this.postJumpscareScene = returnScene;
    this.postJumpscareParams = returnParams;
    this.audio.clearDialogue();
    this.audio.playSfx('jumpscare', 1.0);
  }

  forceBlueprintEasterEgg(index = -1) {
    this.blueprintOverlayIndex = index >= 0 ? index % 4 : Math.floor(Math.random() * 4);
    this.blueprintOverlayTimer = 10;
  }

  evaluateTransitionEasterEggs(nextId) {
    const force = this.stateService.state.debugForceEasterEggs;

    // 1 in 10,000 Blueprint overlay
    if (Math.floor(Math.random() * 10000) === 0) {
      this.forceBlueprintEasterEgg();
    }

    // 1 in 5,000 Lolbit mask
    this.lolbitMaskOverride = force || Math.floor(Math.random() * 5000) === 0;

    // 1 in 1,000 Rare spawn (Yenndo / Bidybab / Minireena)
    this.rareSpawnActive = force || Math.floor(Math.random() * 1000) === 0;
  }

  update(deltaTime) {
    if (this.blueprintOverlayTimer > 0) {
      this.blueprintOverlayTimer -= deltaTime;
    }

    if (this.jumpscareTimer > 0) {
      this.jumpscareTimer -= deltaTime;
      if (this.jumpscareTimer <= 0) {
        this.transitionTo(this.postJumpscareScene, this.postJumpscareParams || {});
      }
      return;
    }

    // Ambient 1-5-7-8 slowed whisper in darkened rooms
    this.babyWhisperTimer -= deltaTime;
    if (this.babyWhisperTimer <= 0) {
      this.babyWhisperTimer = 18 + Math.random() * 16;
      if (this.currentSceneId && this.isDarkGameplayScene(this.currentSceneId) && !this.audio.activeSubtitle) {
        const digits = ['1...', '5...', '7...', '8...'];
        const seq = digits[Math.floor(Math.random() * digits.length)] + ' ' + digits[Math.floor(Math.random() * digits.length)];
        this.audio.speak('Whisper (Slowed)', seq, 'CircusBaby', 2.2, false);
      }
    }

    if (this.currentScene && typeof this.currentScene.update === 'function') {
      this.currentScene.update(deltaTime);
    }
  }

  render(canvas) {
    if (this.jumpscareTimer > 0) {
      this.renderJumpscare(canvas);
      return;
    }

    if (this.currentScene && typeof this.currentScene.render === 'function') {
      this.currentScene.render(canvas);
    }

    if (this.blueprintOverlayTimer > 0) {
      this.renderBlueprintOverlay(canvas);
    }
  }

  renderJumpscare(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#1c0808');
    const shakeX = (Math.random() * 2 - 1) * 28;
    const shakeY = (Math.random() * 2 - 1) * 24;
    const openAmt = Math.abs(Math.sin(Date.now() * 0.015)) + 0.35;
    canvas.drawAnimatronicHead(this.jumpscareAnimId, 640 + shakeX, 360 + shakeY, 2.65, openAmt, 1.0);
    canvas.drawCrtScanlinesAndStatic(0.75, 0.4);
  }

  renderBlueprintOverlay(canvas) {
    canvas.fillRect(40, 40, 1200, 640, 'rgba(10, 36, 97, 0.96)');
    canvas.strokeRect(55, 55, 1170, 610, 3, '#70c5ff');

    // Blueprint grid
    for (let gx = 80; gx < 1200; gx += 40) {
      canvas.fillRect(gx, 60, 1, 600, 'rgba(77, 153, 242, 0.18)');
    }
    for (let gy = 80; gy < 660; gy += 40) {
      canvas.fillRect(60, gy, 1160, 1, 'rgba(77, 153, 242, 0.18)');
    }

    canvas.drawText('AFTON ROBOTICS, LLC — CONFIDENTIAL TECHNICAL BLUEPRINT (1/10,000 ARCHIVE)', 80, 75, 22, '#22d3ee', 'left', 1000, 40);
    canvas.drawText(BLUEPRINT_TITLES[this.blueprintOverlayIndex], 80, 115, 18, '#ffffff', 'left', 1100, 40);

    canvas.drawAnimatronicHead(BLUEPRINT_ANIMS[this.blueprintOverlayIndex], 420, 380, 1.65, 0.45, 0.25);

    // Cross section
    canvas.strokeRect(720, 210, 380, 340, 2, '#22d3ee');
    canvas.drawText('INTERNAL CAVITY SCHEMATIC:\n• A: Positronic Voice Synthesizer\n• B: Articulated Faceplate Servos\n• C: Pressurized Storage Tank\n• D: Automated Capture Claw / Lure\n\n© XXX4 AFTON ROBOTICS, LLC', 740, 230, 17, '#bae6fd', 'left', 340, 300);

    if (this.blueprintOverlayIndex === 0 || this.blueprintOverlayIndex === 2) {
      // Child specimen in tank
      canvas.strokeRect(850, 420, 120, 110, 2, '#f87171');
      canvas.fillRect(895, 435, 30, 30, 'rgba(248, 113, 113, 0.55)');
      canvas.fillRect(885, 470, 50, 50, 'rgba(248, 113, 113, 0.55)');
      canvas.drawText('SPECIMEN DETECTED', 852, 395, 13, '#f87171');
    }

    if (canvas.button(1060, 75, 140, 36, 'CLOSE [X]', '#1e40af', '#ffffff', 15)) {
      this.blueprintOverlayTimer = 0;
    }
  }

  isDarkGameplayScene(id) {
    return (
      id === SceneId.PRIMARY_CONTROL ||
      id === SceneId.BALLORA_GALLERY ||
      id === SceneId.CIRCUS_CONTROL ||
      id === SceneId.FUNTIME_AUDITORIUM ||
      id === SceneId.PRIVATE_ROOM
    );
  }
}

