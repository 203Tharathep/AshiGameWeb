// Opening, Title Menu, and Extras Menu Scenes
// Faithful translation of Unity OpeningAndMenusScenes.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

export class OpeningCutsceneScene {
  constructor(router, audio) {
    this.router = router;
    this.audio = audio;
    this.timer = 0;
    this.dialogueIndex = 0;
  }

  enter() {
    this.timer = 0;
    this.dialogueIndex = 0;
    this.audio.clearDialogue();
    this.audio.speak(
      'Board Member',
      "There's no doubting what you've achieved on a technical level. These are clearly state-of-the-art. There are just certain design choices that were made for these robots that we don't fully understand. We were hoping that you could shed some light on those.",
      'BoardMember',
      8.5,
      true
    );
  }

  update(deltaTime) {
    this.timer += deltaTime;
    if (this.dialogueIndex === 0 && this.timer >= 8.6) {
      this.dialogueIndex = 1;
      this.audio.speak(
        'William Afton',
        "She can dance, she can sing, she's equipped with a built-in helium tank for inflating balloons right at her fingertips. She can take song requests. She can even dispense ice cream.",
        'WilliamAfton',
        7.5,
        true
      );
    } else if (this.dialogueIndex === 1 && this.timer >= 16.2) {
      this.dialogueIndex = 2;
      this.audio.speak(
        'Board Member',
        "With all due respect, those aren't the design choices we were curious about, Mr. Afton.",
        'BoardMember',
        5.5,
        true
      );
    } else if (this.timer >= 22.5) {
      this.router.transitionTo(SceneId.TITLE_MENU);
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#05050a');

    // Silhouette panning
    const panY = 520 - Math.min(1.0, this.timer / 22) * 260;
    canvas.strokeRect(340, 60, 600, 600, 1, 'rgba(25, 89, 140, 0.25)');
    canvas.drawAnimatronicHead('circus_baby', 640, panY, 2.2, 0.35, 0.1, false);

    canvas.fillRect(0, 0, 1280, 720, 'rgba(0, 0, 0, 0.52)');
    canvas.drawText('AFTON ROBOTICS, LLC — BOARD INQUIRY ARCHIVE', 60, 40, 18, 'rgba(115, 178, 230, 0.7)');

    if (canvas.button(1080, 36, 150, 38, 'SKIP >>', '#262638', '#ffffff', 15)) {
      this.router.transitionTo(SceneId.TITLE_MENU);
    }

    canvas.drawCrtScanlinesAndStatic(0.12, 0.45);
  }

  exit() {
    this.audio.clearDialogue();
  }
}

export class TitleMenuScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.twitchTimer = 0;
    this.activeCharIndex = 0;
    this.faceplateOpen = 0;
    this.whisperTimer = 6;
    this.showcaseIds = ['circus_baby', 'funtime_freddy', 'ballora', 'funtime_foxy'];
  }

  enter() {
    this.twitchTimer = 0;
    this.activeCharIndex = 0;
    this.faceplateOpen = 0;
    this.whisperTimer = 6;
    this.audio.startAmbientLoop('elevator_hum', 0.18);
  }

  update(deltaTime) {
    this.twitchTimer += deltaTime;
    if (this.twitchTimer > 2.8) {
      this.twitchTimer = 0;
      this.activeCharIndex = (this.activeCharIndex + 1) % this.showcaseIds.length;
    }

    if (Math.random() < 0.12) {
      this.faceplateOpen = 0.25 + Math.random() * 0.7;
    } else {
      this.faceplateOpen = Math.max(0, this.faceplateOpen - deltaTime * 8);
    }

    this.whisperTimer -= deltaTime;
    if (this.whisperTimer <= 0) {
      this.whisperTimer = 9 + Math.random() * 7;
      this.audio.speak('Whisper', 'Help me...', 'ElizabethAfton', 1.8, false);
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#08080d');

    // Right twitching animatronic showcase
    const jx = this.faceplateOpen > 0.2 ? (Math.random() * 2 - 1) * 8 : 0;
    const jy = this.faceplateOpen > 0.2 ? (Math.random() * 2 - 1) * 6 : 0;
    canvas.drawAnimatronicHead(this.showcaseIds[this.activeCharIndex], 880 + jx, 360 + jy, 2.15, this.faceplateOpen, this.faceplateOpen * 0.5);

    // Title Logo
    canvas.drawText("FIVE NIGHTS AT FREDDY'S", 80, 60, 42, '#ea580c', 'left', 650, 60);
    canvas.drawText('S I S T E R   L O C A T I O N', 82, 112, 30, '#cbd5e1', 'left', 650, 50);

    // 4 Gold Stars
    const stars = this.state.state.starsUnlocked;
    this.drawStarBadge(canvas, 80, 175, stars.star1_realEnding, '★ STAR 1: REAL ENDING (SCOOPED)');
    this.drawStarBadge(canvas, 80, 212, stars.star2_minigame, '★ STAR 2: 8-BIT BABY MINIGAME');
    this.drawStarBadge(canvas, 80, 249, stars.star3_fakeEnding, '★ STAR 3: FAKE ENDING (PRIVATE ROOM)');
    this.drawStarBadge(canvas, 80, 286, stars.star4_goldenFreddyVHard, '★ STAR 4: GOLDEN FREDDY 10/20 V.HARD');

    // Buttons
    if (canvas.button(80, 350, 320, 48, 'NEW GAME', '#2e0f0f', '#ffffff', 22)) {
      this.state.resetNewGame();
      this.router.transitionTo(SceneId.PRE_NIGHT_INTERLUDE, { night: 1 });
    }

    const contLabel = `CONTINUE (NIGHT ${this.state.state.currentNight})`;
    if (canvas.button(80, 412, 320, 48, contLabel, '#1e2638', '#ffffff', 22)) {
      this.router.transitionTo(SceneId.PRE_NIGHT_INTERLUDE, { night: this.state.state.currentNight });
    }

    const extrasUnlocked = stars.star1_realEnding || stars.star3_fakeEnding || this.state.state.currentNight >= 5 || this.state.state.debugForceEasterEggs;
    const extrasCol = extrasUnlocked ? '#1e3a29' : '#1a1a1a';
    if (canvas.button(80, 474, 320, 48, extrasUnlocked ? 'EXTRAS MENU' : 'EXTRAS (LOCKED)', extrasCol, extrasUnlocked ? '#ffffff' : '#6b7280', 20) && extrasUnlocked) {
      this.router.transitionTo(SceneId.EXTRAS_MENU);
    }

    const customUnlocked = this.state.getEarnedStarCount() >= 3 || this.state.state.debugForceEasterEggs;
    const customCol = customUnlocked ? '#452a0a' : '#1a1a1a';
    if (canvas.button(80, 536, 320, 48, customUnlocked ? 'CUSTOM NIGHT' : 'CUSTOM NIGHT (NEED 3 STARS)', customCol, customUnlocked ? '#facc15' : '#6b7280', 20) && customUnlocked) {
      this.router.transitionTo(SceneId.CUSTOM_NIGHT_MENU);
    }

    if (canvas.button(80, 598, 320, 40, 'REPLAY OPENING CUTSCENE', '#1f1f2e', '#c7d2fe', 16)) {
      this.router.transitionTo(SceneId.OPENING_CUTSCENE);
    }

    canvas.drawCrtScanlinesAndStatic(0.18, 0.35);
  }

  drawStarBadge(canvas, x, y, unlocked, label) {
    const col = unlocked ? '#facc15' : '#4b5563';
    canvas.drawText(label, x, y, 16, col, 'left', 500, 32);
  }

  exit() {}
}

export class ExtrasMenuScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;
    this.tabIndex = 0;
    this.subIndex = 0;
    this.makingOfFaceplate = 0.2;
    this.animList = ['circus_baby', 'ballora', 'funtime_freddy', 'funtime_foxy', 'ennard', 'yenndo', 'lolbit'];
  }

  enter() {
    this.tabIndex = 0;
    this.subIndex = 0;
    this.makingOfFaceplate = 0.2;
  }

  update(deltaTime) {
    this.makingOfFaceplate = Math.abs(Math.sin(Date.now() * 0.001 * 0.45));
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#0a0d14');
    canvas.drawText('EXTRAS & ARCHIVES', 60, 35, 30, '#ffffff');

    const tabs = ['ANIMATRONICS', 'BLUEPRINTS', 'MAKING OF', 'JUMPSCARES', 'CUTSCENE THEATER'];
    for (let i = 0; i < tabs.length; i++) {
      const bg = this.tabIndex === i ? '#3b6ba8' : '#1e2436';
      if (canvas.button(60 + i * 215, 85, 205, 40, tabs[i], bg, '#ffffff', 15)) {
        this.tabIndex = i;
        this.subIndex = 0;
      }
    }

    if (this.tabIndex === 0) {
      const id = this.animList[this.subIndex % this.animList.length];
      canvas.drawAnimatronicHead(id, 640, 380, 2.0, 0.25, 0.1);
      canvas.drawText(`MODEL VIEWER: ${id.toUpperCase()}`, 440, 150, 22, '#22d3ee', 'center', 400, 40);
      if (canvas.button(340, 580, 160, 40, '< PREV', '#26334d', '#ffffff')) {
        this.subIndex = (this.subIndex + this.animList.length - 1) % this.animList.length;
      }
      if (canvas.button(780, 580, 160, 40, 'NEXT >', '#26334d', '#ffffff')) {
        this.subIndex = (this.subIndex + 1) % this.animList.length;
      }
    } else if (this.tabIndex === 1) {
      canvas.drawText('TECHNICAL BLUEPRINTS (AFTON ROBOTICS)', 440, 160, 22, '#22d3ee', 'center', 400, 40);
      for (let b = 0; b < 4; b++) {
        if (canvas.button(460, 230 + b * 60, 360, 46, `VIEW BLUEPRINT #${b + 1}: ${this.animList[b].toUpperCase()}`, '#1d4ed8', '#ffffff', 16)) {
          this.router.forceBlueprintEasterEgg(b);
        }
      }
    } else if (this.tabIndex === 2) {
      const targets = ['circus_baby', 'funtime_freddy', 'funtime_foxy'];
      const id = targets[this.subIndex % targets.length];
      canvas.drawText(`MAKING OF: ${id.toUpperCase()} (WIREFRAME -> ENDO -> SHELL)`, 340, 150, 20, '#facc15', 'center', 600, 40);
      canvas.drawAnimatronicHead(id, 640, 380, 2.0, this.makingOfFaceplate, this.makingOfFaceplate * 0.5, this.makingOfFaceplate > 0.7);
      if (canvas.button(540, 580, 200, 40, 'CYCLE MODEL', '#334155', '#ffffff')) {
        this.subIndex = (this.subIndex + 1) % targets.length;
      }
    } else if (this.tabIndex === 3) {
      canvas.drawText('JUMPSCARE VIEWER', 440, 150, 22, '#ef4444', 'center', 400, 40);
      for (let j = 0; j < this.animList.length; j++) {
        const anim = this.animList[j];
        if (canvas.button(460, 200 + j * 52, 360, 42, `TRIGGER ${anim.toUpperCase()} JUMPSCARE`, '#5b1414', '#ffffff', 15)) {
          this.router.triggerJumpscare(anim, SceneId.EXTRAS_MENU);
        }
      }
    } else if (this.tabIndex === 4) {
      canvas.drawText('CUTSCENE THEATER (TV EPISODES, 8-BIT DECAY & FINALE)', 340, 150, 20, '#22d3ee', 'center', 600, 40);
      for (let ep = 1; ep <= 4; ep++) {
        if (canvas.button(240, 205 + (ep - 1) * 52, 360, 42, `TV EPISODE ${ep}: IMMORTAL & RESTLESS`, '#292447', '#ffffff', 15)) {
          this.router.transitionTo(SceneId.TV_LIVING_ROOM, { episode: ep, returnToExtras: true });
        }
      }
      for (let st = 1; st <= 7; st++) {
        if (canvas.button(660, 195 + (st - 1) * 44, 380, 36, `8-BIT MICHAEL DECAY CUTSCENE #${st}`, '#331f3d', '#ffffff', 14)) {
          this.router.transitionTo(SceneId.DECAY_8BIT_CUTSCENE, { stage: st, returnToExtras: true });
        }
      }
      if (canvas.button(660, 515, 380, 44, "SPRINGTRAP FINALE (FAZBEAR'S FRIGHT)", '#61370f', '#facc15', 15)) {
        this.router.transitionTo(SceneId.SPRINGTRAP_FINALE, { returnToExtras: true });
      }
    }

    // Hidden 8-Bit Baby Minigame icon
    canvas.fillRect(24, 650, 44, 48, '#dc2626');
    canvas.fillRect(32, 660, 28, 24, '#ffffff');
    canvas.fillRect(36, 666, 6, 6, '#22c55e');
    canvas.fillRect(48, 666, 6, 6, '#22c55e');
    if (canvas.button(20, 646, 155, 54, '8-BIT BABY', 'rgba(220, 38, 38, 0.35)', '#facc15', 13)) {
      this.router.transitionTo(SceneId.BABY_8BIT_MINIGAME);
    }

    if (canvas.button(1060, 645, 170, 44, 'BACK TO TITLE', '#334155', '#ffffff', 16)) {
      this.router.transitionTo(SceneId.TITLE_MENU);
    }

    canvas.drawCrtScanlinesAndStatic(0.1, 0.3);
  }

  exit() {}
}

