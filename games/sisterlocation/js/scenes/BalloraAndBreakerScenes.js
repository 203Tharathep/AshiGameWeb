// Ballora Gallery & Breaker Room Scenes
// Faithful translation of Unity BalloraAndBreakerScenes.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

export class BalloraGalleryScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.inbound = true;
    this.distance = 0;
    this.balloraOrbitPhase = 0;
    this.musicStage = 1;
    this.movementDangerTimer = 0;
    this.sangLyrics = false;

    // 0+1 Debug Blue Screen
    this.debugHoldTimer = 0;
    this.blueScreenActive = false;
    this.blueScreenCounter = 1042;
  }

  enter(parameters) {
    this.inbound = parameters && typeof parameters.inbound === 'boolean' ? parameters.inbound : true;
    this.distance = 0;
    this.balloraOrbitPhase = 0;
    this.musicStage = 1;
    this.movementDangerTimer = 0;
    this.sangLyrics = false;
    this.debugHoldTimer = 0;
    this.blueScreenActive = false;

    this.audio.setMusicBoxStage(1);
    if (this.inbound) {
      this.audio.speak('HandUnit', 'Go forward through Ballora Gallery as fast as you can to reach the Breaker Room.', 'HandUnit', 5.0, true);
    } else {
      this.audio.speak('HandUnit', 'Now crawl carefully back through Ballora Gallery to the Primary Control Module.', 'HandUnit', 5.0, true);
    }
  }

  update(deltaTime) {
    // Secret 0+1 Blue screen
    const holdingZeroAndOne = window._fnafSlKeyHeld &&
      (window._fnafSlKeyHeld['Digit0'] || window._fnafSlKeyHeld['Numpad0']) &&
      (window._fnafSlKeyHeld['Digit1'] || window._fnafSlKeyHeld['Numpad1']);

    if (holdingZeroAndOne && !this.blueScreenActive) {
      this.debugHoldTimer += deltaTime;
      const requiredSec = this.state.state.debugForceEasterEggs ? 5.0 : 83.0;
      if (this.debugHoldTimer >= requiredSec) {
        this.blueScreenActive = true;
        this.audio.setMusicBoxStage(0);
      }
    } else if (!holdingZeroAndOne) {
      this.debugHoldTimer = 0;
    }

    if (this.blueScreenActive) {
      return;
    }

    this.balloraOrbitPhase += deltaTime * 0.55;
    const proximity = Math.sin(this.balloraOrbitPhase);
    if (proximity < 0.15) this.musicStage = 1;
    else if (proximity < 0.68) this.musicStage = 2;
    else this.musicStage = 3;

    const pan = Math.cos(this.balloraOrbitPhase) * 0.75;
    this.audio.setMusicBoxStage(this.musicStage, pan);

    if (this.musicStage === 3 && !this.sangLyrics && this.distance > 25) {
      this.sangLyrics = true;
      this.audio.speak(
        'Ballora',
        "Why do you hide inside your walls, when there is music in my halls? All I see is an empty room, no more joy, an empty tomb. It's so good to sing all day, to dance, to spin, to fly away.",
        'CircusBaby',
        8.0,
        false
      );
    }

    const moving = window._fnafSlKeyHeld && (window._fnafSlKeyHeld['KeyW'] || window._fnafSlKeyHeld['ArrowUp']);

    if (moving) {
      if (this.musicStage === 3) {
        this.movementDangerTimer += deltaTime;
        if (this.movementDangerTimer >= 0.85) {
          this.router.triggerJumpscare('ballora', SceneId.BALLORA_GALLERY, { inbound: this.inbound });
          return;
        }
      } else {
        this.movementDangerTimer = Math.max(0, this.movementDangerTimer - deltaTime);
      }

      const crawlSpeed = this.musicStage === 1 ? 16 : 9;
      this.distance += crawlSpeed * deltaTime;

      if (this.distance >= 100) {
        if (this.inbound) {
          this.router.transitionTo(SceneId.BREAKER_ROOM);
        } else {
          this.router.transitionTo(SceneId.PRIMARY_CONTROL, { night: 2, fromBreaker: true });
        }
      }
    } else {
      this.movementDangerTimer = Math.max(0, this.movementDangerTimer - deltaTime * 2.0);
    }
  }

  render(canvas) {
    if (this.blueScreenActive) {
      canvas.fillRect(0, 0, 1280, 720, '#0000aa');
      canvas.drawText('*** STOP: 0x00000050 (PAGE_FAULT_IN_NONPAGED_AREA) ***', 80, 80, 22, '#ffffff');
      canvas.drawText(`BALLORA DANCE TRACK SYSTEM EXCEPTION AT 0x77F83210\nCOUNTER: ${this.blueScreenCounter}\nPRESS [SPACE] TO RESTART`, 80, 140, 18, '#ffffff');
      if (canvas.button(80, 600, 260, 48, 'DISMISS BLUE SCREEN', '#000066', '#ffffff', 16)) {
        this.blueScreenActive = false;
      }
      return;
    }

    canvas.fillRect(0, 0, 1280, 720, '#05070a');

    // Ballora gliding silhouette in dark
    const bx = 640 + Math.cos(this.balloraOrbitPhase) * 380;
    const scale = this.musicStage === 3 ? 1.55 : (this.musicStage === 2 ? 0.95 : 0.55);
    canvas.drawAnimatronicHead('ballora', bx, 340, scale, 0);

    // Proximity Stage Indicator
    const stageCol = this.musicStage === 1 ? '#4ade80' : (this.musicStage === 2 ? '#facc15' : '#ef4444');
    const stageText = this.musicStage === 1 ? 'STAGE 1: DISTANT (SAFE TO CRAWL [W])' :
      (this.musicStage === 2 ? 'STAGE 2: APPROACHING (CAUTION!)' : 'STAGE 3: LOUD! STOP MOVING IMMEDIATELY!');
    canvas.drawText(`BALLORA MUSIC BOX: ${stageText}`, 240, 40, 20, stageCol, 'center', 800, 40);
    canvas.drawText(`DISTANCE TO ${this.inbound ? 'BREAKER ROOM' : 'CONTROL MODULE'}: ${Math.round(this.distance)}%`, 340, 630, 20, '#ffffff', 'center', 600, 40);

    if (canvas.button(540, 560, 200, 48, 'CRAWL FORWARD [W]', '#1e3a5f', '#ffffff', 16)) {
      this.distance += 4;
    }

    canvas.drawCrtScanlinesAndStatic(0.16, 0.5);
  }

  exit() {
    this.audio.setMusicBoxStage(0);
  }
}

const SYSTEM_NAMES = [
  'Ballora Gallery',
  'Funtime Auditorium',
  'Circus Gallery',
  'Circus Control',
  'Parts/Services',
  'Control Module',
  'Breaker Room',
  'Elevators'
];

export class BreakerRoomScene {
  constructor(router, audio) {
    this.router = router;
    this.audio = audio;

    this.systemProgress = new Float32Array(8);
    this.selectedSystem = -1;
    this.monitorUp = true;
    this.freddyPhase = 0;
    this.freddyAdvanceTimer = 0;
    this.mascotCooldown = 0;
  }

  enter() {
    for (let i = 0; i < 8; i++) this.systemProgress[i] = 0;
    this.selectedSystem = -1;
    this.monitorUp = true;
    this.freddyPhase = 0;
    this.freddyAdvanceTimer = 0;
    this.mascotCooldown = 0;

    this.audio.speak('HandUnit', 'Use the interface on the left to reboot all eight facility systems to 100%. Use the Mascot Response Audio button to calm Funtime Freddy.', 'HandUnit', 6.5, true);
  }

  update(deltaTime) {
    if (this.mascotCooldown > 0) this.mascotCooldown -= deltaTime;

    // Funtime Freddy advances faster while monitor is up
    this.freddyAdvanceTimer += deltaTime * (this.monitorUp ? 1.35 : 0.45);
    if (this.freddyAdvanceTimer >= 4.5) {
      this.freddyAdvanceTimer = 0;
      this.freddyPhase++;
      if (this.freddyPhase === 1) {
        this.audio.speak('Funtime Freddy', 'Bon-Bon, say hi to our friends!', 'FuntimeFreddy', 3.0, true);
      } else if (this.freddyPhase === 2) {
        this.audio.speak('Funtime Freddy', 'I see you over there in the dark! Come on out!', 'FuntimeFreddy', 3.2, true);
      } else if (this.freddyPhase === 3) {
        this.audio.speak('Funtime Freddy', 'Well, hello again! Ha-ha-ha!', 'FuntimeFreddy', 3.0, true);
      } else if (this.freddyPhase >= 4) {
        this.router.triggerJumpscare('funtime_freddy', SceneId.BREAKER_ROOM);
        return;
      }
    }

    // Rebooting selected system while holding mouse
    if (this.monitorUp && this.selectedSystem >= 0 && this.selectedSystem < 8 && window._fnafSlMouseDown) {
      this.systemProgress[this.selectedSystem] = Math.min(100, this.systemProgress[this.selectedSystem] + 24 * deltaTime);
    }

    // Check all 8 online
    let allOnline = true;
    for (let i = 0; i < 8; i++) {
      if (this.systemProgress[i] < 100) {
        allOnline = false;
        break;
      }
    }

    if (allOnline) {
      this.router.transitionTo(SceneId.BALLORA_GALLERY, { inbound: false });
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#06080d');

    // Right room view with Funtime Freddy advancing
    const freddyScale = this.freddyPhase === 0 ? 0.4 : (this.freddyPhase === 1 ? 0.75 : (this.freddyPhase === 2 ? 1.25 : 1.85));
    if (this.freddyPhase > 0) {
      canvas.drawAnimatronicHead('funtime_freddy', 900, 360, freddyScale, this.freddyPhase >= 3 ? 0.35 : 0);
    }

    // Danger Phase Indicator
    const dangerCols = ['#22c55e', '#facc15', '#f97316', '#ef4444'];
    canvas.fillRect(1020, 35, 210, 46, dangerCols[Math.min(3, this.freddyPhase)]);
    canvas.strokeRect(1020, 35, 210, 46, 3, '#ffffff');
    canvas.drawText(`DANGER: ${this.freddyPhase}/3`, 1030, 46, 17, '#000000', 'center', 190, 30);

    if (this.monitorUp) {
      this.renderBreakerMonitor(canvas);
    } else {
      canvas.drawText('MONITOR DOWN — LOOKING AT FUNTIME FREDDY IN THE DARK', 180, 100, 20, '#facc15');
      if (canvas.button(510, 580, 260, 54, 'PULL UP MONITOR [S]', '#1e3a5f', '#ffffff', 18)) {
        this.monitorUp = true;
      }
    }

    // Bon-Bon Mascot Audio Button
    const mascotText = this.mascotCooldown <= 0 ? 'PLAY BON-BON AUDIO [SPACE]' : `COOLDOWN (${this.mascotCooldown.toFixed(1)}s)`;
    if (canvas.button(960, 620, 270, 52, mascotText, '#7c3aed', '#ffffff', 16) && this.mascotCooldown <= 0) {
      this.playBonBonCalmingAudio();
    }

    canvas.drawCrtScanlinesAndStatic(0.14, 0.45);
  }

  renderBreakerMonitor(canvas) {
    canvas.fillRect(60, 60, 620, 600, '#0f172a');
    canvas.strokeRect(60, 60, 620, 600, 4, '#38bdf8');
    canvas.drawText('FACILITY POWER REBOOT INTERFACE', 90, 80, 20, '#38bdf8');

    for (let i = 0; i < 8; i++) {
      const y = 125 + i * 54;
      const isSelected = (this.selectedSystem === i);
      const prog = Math.round(this.systemProgress[i]);

      canvas.fillRect(90, y, 400, 44, isSelected ? '#1e3a5f' : '#1e293b');
      canvas.strokeRect(90, y, 400, 44, 2, prog >= 100 ? '#4ade80' : (isSelected ? '#facc15' : '#475569'));

      // Progress bar fill
      if (prog > 0) {
        canvas.fillRect(92, y + 2, 396 * (prog / 100), 40, prog >= 100 ? '#15803d' : '#0284c7');
      }

      canvas.drawText(`${SYSTEM_NAMES[i]}: ${prog}%`, 110, y + 10, 16, '#ffffff');

      if (canvas.button(500, y, 150, 44, prog >= 100 ? 'ONLINE' : (isSelected ? 'HOLD CLICK' : 'RESTART'), prog >= 100 ? '#15803d' : '#2563eb', '#ffffff', 14)) {
        this.selectedSystem = i;
      }
    }

    if (canvas.button(90, 580, 220, 48, 'LOWER MONITOR [S]', '#334155', '#ffffff', 16)) {
      this.monitorUp = false;
    }
  }

  playBonBonCalmingAudio() {
    this.mascotCooldown = 4.5;
    this.freddyPhase = Math.max(0, this.freddyPhase - 1);
    this.freddyAdvanceTimer = 0;
    const quotes = [
      'Calm down, Freddy! Everything is okay!',
      'Go back to sleep, Freddy! No one is here!',
      "It's just a mouse! Go back to your stage!"
    ];
    this.audio.speak('Bon-Bon', quotes[Math.floor(Math.random() * quotes.length)], 'BonBon', 3.0, true);
  }

  exit() {}
}

