// Custom Night Menu and Private Room (Ennard Boss / Custom Night 10/20) Scenes
// Faithful translation of Unity PrivateRoomAndCustomNightScenes.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

export const ANIM_IDS = [
  'ballora', 'funtime_freddy', 'yenndo', 'funtime_foxy', 'bonnet',
  'bidybab', 'electrobab', 'lolbit', 'minireena_1', 'minireena_2'
];

export const ANIM_NAMES = [
  'Ballora', 'F. Freddy', 'Yenndo', 'F. Foxy', 'Bonnet',
  'Bidybab', 'Electrobab', 'Lolbit', 'Minireena', 'Minireena 2'
];

export const PRESETS = [
  { id: 'angry_ballet', title: 'Angry Ballet', activeIndices: [0, 8, 9], cutsceneStage: 1 },
  { id: 'freddy_and_co', title: 'Freddy & Co.', activeIndices: [1, 2, 3, 4], cutsceneStage: 2 },
  { id: 'funtime_frenzy', title: 'Funtime Frenzy', activeIndices: [1, 2, 3, 7], cutsceneStage: 3 },
  { id: 'dolls_attack', title: 'Dolls, Attack!', activeIndices: [4, 5, 6, 8, 9], cutsceneStage: 4 },
  { id: 'girls_night', title: "Girls' Night", activeIndices: [0, 3, 4, 5, 8, 9], cutsceneStage: 5 },
  { id: 'weirdos', title: 'Weirdos', activeIndices: [2, 4, 6, 7, 8], cutsceneStage: 6 },
  { id: 'top_shelf', title: 'Top Shelf', activeIndices: [0, 1, 2, 3, 4], cutsceneStage: 6 },
  { id: 'bottom_shelf', title: 'Bottom Shelf', activeIndices: [5, 6, 7, 8, 9], cutsceneStage: 7 },
  { id: 'cupcake_challenge', title: 'Cupcake Challenge', activeIndices: [0, 1, 3, 4, 6, 7, 8], cutsceneStage: 7 },
  { id: 'golden_freddy', title: 'Golden Freddy', activeIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], cutsceneStage: 8 }
];

export class CustomNightMenuScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.aiLevels = new Int32Array(10);
    this.selectedPresetIndex = 0;
    this.difficultyIndex = 3; // 0=Easy(5), 1=Normal(10), 2=Hard(15), 3=V.Hard(20)
  }

  enter() {
    this.applyPreset(0, 3);
  }

  applyPreset(presetIdx, diffIdx) {
    this.selectedPresetIndex = presetIdx;
    this.difficultyIndex = diffIdx;
    const levelVal = (diffIdx + 1) * 5;
    for (let i = 0; i < 10; i++) this.aiLevels[i] = 0;

    const preset = PRESETS[presetIdx];
    for (const idx of preset.activeIndices) {
      this.aiLevels[idx] = levelVal;
    }
  }

  update(deltaTime) {}

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#0c0a14');
    canvas.drawText('CUSTOM NIGHT — 10 ANIMATRONICS & 10 CHALLENGE PRESETS', 60, 28, 28, '#facc15', 'left', 950, 45);

    // 10 Animatronics grid (2 rows x 5)
    for (let i = 0; i < 10; i++) {
      const col = i % 5;
      const row = Math.floor(i / 5);
      const x = 60 + col * 165;
      const y = 85 + row * 175;

      canvas.fillRect(x, y, 150, 160, '#1e2433');
      canvas.strokeRect(x, y, 150, 160, 2, this.aiLevels[i] > 0 ? '#38bdf8' : '#475569');
      canvas.drawText(ANIM_NAMES[i], x + 5, y + 8, 15, '#ffffff', 'center', 140, 26);

      const headId = (ANIM_IDS[i] === 'minireena_1' || ANIM_IDS[i] === 'minireena_2') ? 'minireena' : ANIM_IDS[i];
      canvas.drawAnimatronicHead(headId, x + 75, y + 80, 0.55, 0);

      // AI Level adjustment buttons
      canvas.drawText(`AI: ${this.aiLevels[i]}`, x + 35, y + 125, 15, '#facc15');
      if (canvas.button(x + 5, y + 122, 28, 28, '-', '#334155', '#ffffff', 16)) {
        this.aiLevels[i] = Math.max(0, this.aiLevels[i] - 1);
      }
      if (canvas.button(x + 115, y + 122, 28, 28, '+', '#334155', '#ffffff', 16)) {
        this.aiLevels[i] = Math.min(20, this.aiLevels[i] + 1);
      }
    }

    // Presets bar
    canvas.fillRect(60, 455, 1155, 165, '#131722');
    canvas.strokeRect(60, 455, 1155, 165, 2, '#38bdf8');
    canvas.drawText('CHALLENGE PRESETS:', 75, 465, 17, '#38bdf8');

    for (let p = 0; p < PRESETS.length; p++) {
      const px = 75 + p * 114;
      const isSelected = (this.selectedPresetIndex === p);
      const starsData = this.state.getPresetStars(PRESETS[p].id);

      let starIcon = '☆';
      if (starsData.vhard) starIcon = '★★★★';
      else if (starsData.hard) starIcon = '★★★';
      else if (starsData.normal) starIcon = '★★';
      else if (starsData.easy) starIcon = '★';

      if (canvas.button(px, 495, 108, 48, PRESETS[p].title, isSelected ? '#0284c7' : '#1e293b', '#ffffff', 12)) {
        this.applyPreset(p, this.difficultyIndex);
      }
      canvas.drawText(starIcon, px, 545, 12, '#facc15', 'center', 108, 20);
    }

    // Difficulty selectors
    const diffNames = ['EASY (5)', 'NORMAL (10)', 'HARD (15)', 'V.HARD (20)'];
    for (let d = 0; d < 4; d++) {
      const isD = (this.difficultyIndex === d);
      if (canvas.button(75 + d * 160, 570, 150, 40, diffNames[d], isD ? '#16a34a' : '#1e293b', '#ffffff', 14)) {
        this.applyPreset(this.selectedPresetIndex, d);
      }
    }

    // START GAME BUTTON
    if (canvas.button(890, 565, 160, 48, '▶ START NIGHT', '#15803d', '#ffffff', 18)) {
      this.router.transitionTo(SceneId.PRIVATE_ROOM, {
        customNight: true,
        aiLevels: Array.from(this.aiLevels),
        presetId: PRESETS[this.selectedPresetIndex].id,
        difficultyIndex: this.difficultyIndex
      });
    }

    if (canvas.button(1060, 565, 140, 48, 'TITLE MENU', '#334155', '#ffffff', 15)) {
      this.router.transitionTo(SceneId.TITLE_MENU);
    }

    canvas.drawCrtScanlinesAndStatic(0.12, 0.4);
  }

  exit() {}
}

export class PrivateRoomScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.isCustomNight = false;
    this.ai = new Int32Array(10);
    this.presetId = '';
    this.difficultyIndex = 3;

    this.nightDuration = 360;
    this.nightElapsed = 0;

    this.power = 100;
    this.oxygen = 100;

    this.leftDoorClosed = false;
    this.rightDoorClosed = false;
    this.ventDoorClosed = false;
    this.cameraUp = false;
    this.activeCam = 1;

    // Ennard Boss State
    this.ennardStage = 0;
    this.ennardMoveTimer = 0;
    this.ennardAttackDir = 0; // 0=left, 1=vent, 2=right
    this.ennardCam = 6;

    // Custom Night Animatronic States
    this.bonnetActive = false;
    this.bonnetX = 1060;
    this.yenndoActive = false;
    this.yenndoKillTimer = 0;
    this.lolbitMonitors = 0;
    this.electrobabCam = 0;

    this.balloraStage = 0;
    this.balloraSide = -1;
    this.balloraTimer = 0;

    this.freddyStage = 0;
    this.freddySide = -1;
    this.freddyTimer = 0;
    this.freddyAttackTimer = 0;

    this.foxyStage = 0;
    this.foxyTimer = 0;

    this.bidybabStage = 0;
    this.bidybabTimer = 0;

    this.minireena1Active = false;
    this.minireena2Count = 0;
  }

  enter(parameters) {
    this.isCustomNight = parameters && parameters.customNight ? true : false;
    this.presetId = parameters && parameters.presetId ? parameters.presetId : '';
    this.difficultyIndex = parameters && typeof parameters.difficultyIndex === 'number' ? parameters.difficultyIndex : 3;

    if (parameters && parameters.aiLevels) {
      for (let i = 0; i < 10; i++) this.ai[i] = parameters.aiLevels[i] || 0;
    } else {
      for (let i = 0; i < 10; i++) this.ai[i] = 0;
    }

    this.nightDuration = this.state.state.fastTimerMode ? 180 : 360;
    this.nightElapsed = 0;
    this.power = 100;
    this.oxygen = 100;

    this.leftDoorClosed = false;
    this.rightDoorClosed = false;
    this.ventDoorClosed = false;
    this.cameraUp = false;
    this.activeCam = 1;

    this.ennardStage = 0;
    this.ennardMoveTimer = 0;
    this.ennardAttackDir = 0;
    this.ennardCam = 6;

    this.bonnetActive = false;
    this.yenndoActive = false;
    this.lolbitMonitors = 0;
    this.electrobabCam = 0;
    this.balloraStage = 0;
    this.freddyStage = 0;
    this.foxyStage = 0;
    this.bidybabStage = 0;
    this.minireena1Active = false;
    this.minireena2Count = 0;

    this.audio.clearDialogue();
    if (!this.isCustomNight) {
      this.audio.speak('HandUnit', 'Access Granted. Warning: You have entered a highly restricted area. Power reserves are limited.', 'HandUnit', 5.5, true);
      this.audio.speak('Circus Baby (Ennard)', "Why didn't you trust me? Why didn't you believe me? We need you so that we can leave.", 'CircusBaby', 6.5, false);
    }
  }

  update(deltaTime) {
    this.nightElapsed += deltaTime;
    if (this.nightElapsed >= this.nightDuration) {
      this.completeShiftVictory();
      return;
    }

    // Power drain
    let usage = 1;
    if (this.leftDoorClosed) usage++;
    if (this.rightDoorClosed) usage++;
    if (this.ventDoorClosed) usage++;
    if (this.cameraUp) usage++;
    if (this.electrobabCam !== 0) usage += 2;

    this.power = Math.max(0, this.power - usage * 0.16 * deltaTime);
    if (this.power <= 0) {
      this.leftDoorClosed = false;
      this.rightDoorClosed = false;
      this.ventDoorClosed = false;
      this.cameraUp = false;
      this.router.triggerJumpscare(this.isCustomNight ? 'funtime_freddy' : 'ennard', this.isCustomNight ? SceneId.CUSTOM_NIGHT_MENU : SceneId.PRIVATE_ROOM);
      return;
    }

    if (this.isCustomNight) {
      this.updateCustomNightAI(deltaTime);
    } else {
      this.updateEnnardBossFight(deltaTime);
    }
  }

  updateEnnardBossFight(deltaTime) {
    const hour = Math.floor((this.nightElapsed / this.nightDuration) * 6);
    const interval = hour >= 3 ? 3.2 : 5.5;
    this.ennardMoveTimer += deltaTime;

    if (this.ennardMoveTimer >= interval) {
      this.ennardMoveTimer = 0;
      this.audio.playSfx('vent_crawl', 0.75);

      if (this.ennardStage < 2) {
        this.ennardStage++;
        if (this.ennardStage === 1) {
          this.ennardAttackDir = Math.floor(Math.random() * 3); // 0=left, 1=vent, 2=right
          this.ennardCam = this.ennardAttackDir === 0 ? 3 : (this.ennardAttackDir === 1 ? 5 : 4);
        } else if (this.ennardStage === 2) {
          this.ennardCam = this.ennardAttackDir === 0 ? 1 : (this.ennardAttackDir === 1 ? 5 : 2);
          if (hour < 3) {
            this.audio.speak('Circus Baby (Ennard)', "Hello? Isn't there anyone in there? We need you so that we can hide.", 'CircusBaby', 4.0, false);
          } else {
            this.audio.speak('Elizabeth Afton (Ennard)', "I know it was an accident! Isn't this why you came here? To be with me again?", 'ElizabethAfton', 4.5, false);
          }
        }
      } else {
        const blocked = (this.ennardAttackDir === 0 && this.leftDoorClosed) ||
                        (this.ennardAttackDir === 1 && this.ventDoorClosed) ||
                        (this.ennardAttackDir === 2 && this.rightDoorClosed);
        if (blocked) {
          this.audio.playSfx('door_slam', 0.9);
          this.ennardStage = 0;
          this.ennardCam = 6;
        } else {
          this.router.triggerJumpscare('ennard', SceneId.PRIVATE_ROOM, { customNight: false });
        }
      }
    }
  }

  updateCustomNightAI(deltaTime) {
    // Bonnet walking across screen
    if (this.bonnetActive) {
      this.bonnetX -= 180 * deltaTime;
      if (this.bonnetX <= 140) {
        this.bonnetActive = false;
        this.router.triggerJumpscare('bonnet', SceneId.CUSTOM_NIGHT_MENU);
        return;
      }
    } else if (this.ai[4] > 0 && Math.random() < (this.ai[4] * 0.008 * deltaTime)) {
      this.bonnetActive = true;
      this.bonnetX = 1060;
      this.audio.speak('Bonnet', 'Hee-hee-hee!', 'BonBon', 1.8, false);
    }

    // Lolbit
    if (this.lolbitMonitors < 3 && this.ai[7] > 0 && Math.random() < (this.ai[7] * 0.006 * deltaTime)) {
      this.lolbitMonitors = 3;
    }

    // Yenndo
    if (this.yenndoActive) {
      this.yenndoKillTimer += deltaTime;
      if (this.yenndoKillTimer >= 2.0 && !this.cameraUp) {
        this.router.triggerJumpscare('yenndo', SceneId.CUSTOM_NIGHT_MENU);
        return;
      }
    } else if (this.ai[2] > 0 && !this.cameraUp && Math.random() < (this.ai[2] * 0.006 * deltaTime)) {
      this.yenndoActive = true;
      this.yenndoKillTimer = 0;
    }

    // Ballora
    if (this.ai[0] > 0) {
      this.balloraTimer += deltaTime;
      if (this.balloraTimer >= 6.0 - (this.ai[0] * 0.18)) {
        this.balloraTimer = 0;
        if (this.balloraStage === 0) {
          this.balloraSide = Math.random() < 0.5 ? -1 : 1;
          this.balloraStage = 1;
        } else if (this.balloraStage < 3) {
          this.balloraStage++;
        } else {
          const blocked = (this.balloraSide === -1 && this.leftDoorClosed) || (this.balloraSide === 1 && this.rightDoorClosed);
          if (blocked) {
            this.audio.playSfx('door_slam', 0.85);
            this.balloraStage = 0;
          } else {
            this.router.triggerJumpscare('ballora', SceneId.CUSTOM_NIGHT_MENU);
          }
        }
      }
    }
  }

  completeShiftVictory() {
    this.audio.playSfx('chime', 1.0);
    if (!this.isCustomNight) {
      this.state.state.starsUnlocked.star3_fakeEnding = true;
      this.state.save();
      this.router.transitionTo(SceneId.TV_LIVING_ROOM, { episode: 4 });
    } else {
      if (this.presetId) {
        this.state.markPresetWon(this.presetId, this.difficultyIndex);
      }
      this.router.transitionTo(SceneId.CUSTOM_NIGHT_MENU);
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#06080e');

    // Office Desk & Walls
    this.renderOffice(canvas);

    if (this.cameraUp) {
      this.renderCameraView(canvas);
    }

    // Lolbit Overlay
    if (this.lolbitMonitors >= 3) {
      this.renderLolbitGlitch(canvas);
    }

    // Top HUD
    const hour = Math.floor((this.nightElapsed / this.nightDuration) * 6);
    const hourText = hour === 0 ? '12 AM' : `${hour} AM`;
    canvas.drawText(`${hourText} | POWER: ${Math.round(this.power)}%`, 980, 30, 24, '#38bdf8');

    canvas.drawCrtScanlinesAndStatic(0.12, 0.4);
  }

  renderOffice(canvas) {
    // Left Door
    canvas.fillRect(80, 120, 180, 480, this.leftDoorClosed ? '#dc2626' : '#1e293b');
    canvas.strokeRect(80, 120, 180, 480, 4, '#475569');
    if (canvas.button(80, 610, 180, 48, this.leftDoorClosed ? 'OPEN LEFT [A]' : 'CLOSE LEFT [A]', '#334155', '#ffffff', 14)) {
      this.leftDoorClosed = !this.leftDoorClosed;
      this.audio.playSfx('door_slam', 0.85);
    }

    // Center Vent Door
    canvas.fillRect(520, 80, 240, 160, this.ventDoorClosed ? '#dc2626' : '#1e293b');
    canvas.strokeRect(520, 80, 240, 160, 4, '#475569');
    if (canvas.button(520, 250, 240, 42, this.ventDoorClosed ? 'OPEN VENT [W]' : 'CLOSE VENT [W]', '#334155', '#ffffff', 14)) {
      this.ventDoorClosed = !this.ventDoorClosed;
      this.audio.playSfx('door_slam', 0.85);
    }

    // Right Door
    canvas.fillRect(1020, 120, 180, 480, this.rightDoorClosed ? '#dc2626' : '#1e293b');
    canvas.strokeRect(1020, 120, 180, 480, 4, '#475569');
    if (canvas.button(1020, 610, 180, 48, this.rightDoorClosed ? 'OPEN RIGHT [D]' : 'CLOSE RIGHT [D]', '#334155', '#ffffff', 14)) {
      this.rightDoorClosed = !this.rightDoorClosed;
      this.audio.playSfx('door_slam', 0.85);
    }

    // Yenndo standing inside office
    if (this.yenndoActive) {
      canvas.drawAnimatronicHead('yenndo', 640, 440, 1.85, 0, 0, true);
    }

    // Bonnet walking across bottom of office
    if (this.bonnetActive) {
      canvas.fillRect(this.bonnetX, 510, 85, 95, '#f43f5e');
      canvas.drawText('BONNET', this.bonnetX + 10, 520, 12, '#ffffff');
      if (canvas.button(this.bonnetX + 30, 550, 30, 30, '●', '#000000', '#ffffff', 14)) {
        this.bonnetActive = false;
        this.audio.playSfx('honk', 0.9);
      }
    }

    // Flip Monitor Button
    if (canvas.button(480, 640, 320, 52, 'CAMERA MONITOR [S]', '#0284c7', '#ffffff', 18)) {
      this.cameraUp = !this.cameraUp;
      this.audio.playSfx('springlock_wind', 0.7);
    }
  }

  renderCameraView(canvas) {
    canvas.fillRect(160, 60, 960, 540, '#020617');
    canvas.strokeRect(160, 60, 960, 540, 4, '#38bdf8');

    // Camera feed content
    canvas.drawText(`CAMERA FEED: CAM 0${this.activeCam}`, 190, 85, 20, '#38bdf8');

    if (!this.isCustomNight && this.ennardCam === this.activeCam) {
      canvas.drawAnimatronicHead('ennard', 640, 320, 1.6, 0.25);
      canvas.drawText('ENNARD DETECTED IN CAMERA FEED!', 440, 130, 18, '#ef4444');
    }

    // Cam switch buttons
    for (let c = 1; c <= 7; c++) {
      const bx = 920 + ((c - 1) % 2) * 85;
      const by = 340 + Math.floor((c - 1) / 2) * 55;
      const isCur = (this.activeCam === c);
      if (canvas.button(bx, by, 75, 45, `CAM ${c}`, isCur ? '#16a34a' : '#1e293b', '#ffffff', 14)) {
        this.activeCam = c;
      }
    }

    // 1-9-8-3 Easter Egg Keypad
    canvas.fillRect(190, 480, 260, 90, '#1e293b');
    canvas.strokeRect(190, 480, 260, 90, 2, '#475569');
    canvas.drawText('EASTER EGG KEYPAD [1-9-8-3]', 200, 490, 13, '#94a3b8');
    if (canvas.button(200, 520, 240, 38, 'CODE: 1-9-8-3 (BEDROOM FEED)', '#7c3aed', '#ffffff', 13)) {
      this.audio.speak('HandUnit', '1983 Observation Feed Activated.', 'HandUnit', 3.5, true);
    }
  }

  renderLolbitGlitch(canvas) {
    canvas.fillRect(360, 150, 560, 420, '#f97316');
    canvas.strokeRect(360, 150, 560, 420, 6, '#ffffff');
    canvas.drawAnimatronicHead('lolbit', 640, 320, 1.85, 0.4);
    canvas.drawText('PLEASE STAND BY', 460, 460, 32, '#ffffff');

    if (canvas.button(560, 505, 160, 48, 'TYPE L-O-L', '#581c87', '#ffffff', 16)) {
      this.lolbitMonitors = 0;
      this.audio.playSfx('chime', 0.9);
    }
  }

  exit() {}
}

