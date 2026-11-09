// Funtime Auditorium and Parts & Service Scenes
// Faithful translation of Unity Night3And5AuditoriumAndPartsScenes.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

export class FuntimeAuditoriumScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.night = 3;
    this.phase = 'inbound';
    this.progress = 0;
    this.flashCooldown = 0;
    this.flashActiveTimer = 0;
    this.foxyVisibleOnFlash = false;
    this.foxyWaitTimer = 0;

    // Night 5 Audio Maze
    this.mazeStep = 0;
    this.mazeStepTimer = 0;
    this.privateRoomRightHold = 0;
  }

  enter(parameters) {
    this.night = parameters && parameters.night ? parameters.night : this.state.state.currentNight;
    this.phase = parameters && parameters.phase ? parameters.phase : 'inbound';
    this.progress = 0;
    this.flashCooldown = 0;
    this.flashActiveTimer = 0;
    this.foxyVisibleOnFlash = false;
    this.foxyWaitTimer = 0;
    this.mazeStep = 0;
    this.mazeStepTimer = 0;
    this.privateRoomRightHold = 0;

    if (this.night === 3 && this.phase === 'inbound') {
      this.audio.speak('HandUnit', 'Funtime Foxy is motion-activated. Use your Flash Beacon with SPACE sparingly to see in the dark. Stop moving if Funtime Foxy is near.', 'HandUnit', 6.5, true);
    } else if (this.night === 3 && this.phase === 'outbound_n3') {
      this.audio.speak('HandUnit', 'Great job in Parts and Service! Now walk back through Funtime Auditorium to complete your shift.', 'HandUnit', 5.5, true);
    } else if (this.night === 5 && this.phase === 'inbound') {
      this.audio.speak('HandUnit', 'Walk forward through Funtime Auditorium to reach Parts and Service.', 'HandUnit', 4.5, true);
    } else if (this.night === 5 && this.phase === 'outbound_n5') {
      this.audio.speak('Circus Baby', 'Ballora is in front of you. Do not use your flash beacon. Follow my voice carefully. Go forward.', 'CircusBaby', 5.5, true);
    }
  }

  update(deltaTime) {
    if (this.flashCooldown > 0) this.flashCooldown -= deltaTime;
    if (this.flashActiveTimer > 0) this.flashActiveTimer -= deltaTime;

    if (this.night === 5 && this.phase === 'outbound_n5') {
      this.updateNight5AudioMaze(deltaTime);
      return;
    }

    const moving = window._fnafSlKeyHeld && (window._fnafSlKeyHeld['KeyW'] || window._fnafSlKeyHeld['ArrowUp']);

    if (this.night === 3 && this.phase === 'outbound_n3') {
      if (moving) {
        this.progress += 35 * deltaTime;
        if (this.progress >= 35) {
          // Scripted inevitable Funtime Foxy jumpscare transitioning to Night 4
          this.state.state.currentNight = Math.max(this.state.state.currentNight, 4);
          this.state.save();
          this.router.triggerJumpscare('funtime_foxy', SceneId.PRE_NIGHT_INTERLUDE, { night: 4 });
          return;
        }
      }
      return;
    }

    if (this.foxyWaitTimer > 0) {
      this.foxyWaitTimer -= deltaTime;
      if (moving) {
        this.router.triggerJumpscare('funtime_foxy', SceneId.FUNTIME_AUDITORIUM, { night: this.night, phase: this.phase });
        return;
      }
      if (this.foxyWaitTimer <= 0) {
        this.foxyVisibleOnFlash = false;
      }
    } else if (moving) {
      this.progress += 18 * deltaTime;
      if (this.progress >= 100) {
        if (this.phase === 'inbound') {
          this.router.transitionTo(SceneId.PARTS_AND_SERVICE, { night: this.night });
        }
      }
    }
  }

  updateNight5AudioMaze(deltaTime) {
    this.mazeStepTimer += deltaTime;

    // Player holding Right Arrow / D to enter Private Room
    const holdingRight = window._fnafSlKeyHeld && (window._fnafSlKeyHeld['KeyD'] || window._fnafSlKeyHeld['ArrowRight']);
    if (holdingRight) {
      this.privateRoomRightHold += deltaTime;
      if (this.privateRoomRightHold >= 3.2) {
        this.router.transitionTo(SceneId.PRIVATE_ROOM, { customNight: false });
        return;
      }
    } else {
      this.privateRoomRightHold = Math.max(0, this.privateRoomRightHold - deltaTime * 0.8);
    }

    if (this.mazeStep === 0 && this.mazeStepTimer >= 6.0) {
      this.mazeStep = 1;
      this.audio.speak('Circus Baby', 'Stop. Be still. She is right in front of you. Do not move.', 'CircusBaby', 4.5, true);
    } else if (this.mazeStep === 1 && this.mazeStepTimer >= 11.5) {
      this.mazeStep = 2;
      this.audio.speak('Circus Baby', 'Go forward and left. Keep moving.', 'CircusBaby', 4.0, true);
    } else if (this.mazeStep === 2 && this.mazeStepTimer >= 16.5) {
      this.mazeStep = 3;
      this.audio.speak('Circus Baby', 'Stop. She is right behind you. Do not move.', 'CircusBaby', 4.0, true);
    } else if (this.mazeStep === 3 && this.mazeStepTimer >= 21.5) {
      this.mazeStep = 4;
      this.audio.speak('Circus Baby', 'You are almost there. Go forward into the Scooping Room.', 'CircusBaby', 4.5, true);
    } else if (this.mazeStep === 4 && this.mazeStepTimer >= 26.5) {
      this.router.transitionTo(SceneId.SCOOPING_ROOM);
    }
  }

  fireFlashBeacon() {
    if (this.flashCooldown > 0) return;
    this.flashCooldown = 3.0;
    this.flashActiveTimer = 0.45;
    this.audio.playSfx('flash_beacon', 0.9);

    if (Math.random() < 0.45) {
      this.foxyVisibleOnFlash = true;
      this.foxyWaitTimer = 4.0;
    } else {
      this.foxyVisibleOnFlash = false;
    }
  }

  render(canvas) {
    const lit = this.flashActiveTimer > 0;
    canvas.fillRect(0, 0, 1280, 720, lit ? '#1e2436' : '#030407');

    if (lit) {
      canvas.fillRect(140, 420, 1000, 260, '#151924');
      if (this.router.rareSpawnActive) {
        canvas.drawAnimatronicHead('yenndo', 640, 340, 1.55, 0, 0, true);
        canvas.drawText('1/1,000 YENNDO SIGHTING!', 520, 120, 18, '#facc15');
      } else if (this.foxyVisibleOnFlash) {
        canvas.drawAnimatronicHead('funtime_foxy', 640, 340, 1.65, 0.2);
        canvas.drawText('FUNTIME FOXY DETECTED! STOP MOVING & WAIT 4 SECONDS!', 340, 100, 20, '#ef4444', 'center', 600, 50);
      } else {
        canvas.drawText('PATH CLEAR — HOLD [W] TO WALK FORWARD', 440, 120, 18, '#4ade80', 'center', 400, 40);
      }
    }

    if (this.night === 5 && this.phase === 'outbound_n5') {
      canvas.drawText(
        `NIGHT 5 AUDIO MAZE — STEP ${this.mazeStep}/4\n• REAL ENDING: FOLLOW BABY'S COMMANDS ([W] / STOP)\n• FAKE ENDING (PRIVATE ROOM): HOLD [W + D] (${this.privateRoomRightHold.toFixed(1)}/3.2s)`,
        180, 40, 17, '#22d3ee', 'center', 920, 90
      );
    } else {
      const beaconStatus = this.flashCooldown <= 0 ? 'FLASH BEACON READY [SPACE]' : `BEACON RECHARGING (${this.flashCooldown.toFixed(1)}s)`;
      canvas.drawText(`${beaconStatus} | PROGRESS: ${Math.round(this.progress)}% | HOLD [W] TO WALK`, 240, 640, 18, '#facc15', 'center', 800, 40);
    }

    if (canvas.button(510, 560, 260, 48, 'FLASH BEACON [SPACE]', '#0284c7', '#ffffff', 16)) {
      this.fireFlashBeacon();
    }

    canvas.drawCrtScanlinesAndStatic(lit ? 0.25 : 0.1, 0.55);
  }

  exit() {}
}

export class PartsAndServiceScene {
  constructor(router, audio) {
    this.router = router;
    this.audio = audio;

    this.night = 3;
    this.freddyStep = 0;
    this.bonBonHeight = 0;

    // Night 5 Baby passcode
    this.babyHatchOpen = false;
    this.targetPasscode = [];
    this.passcodeStep = 0;
    this.digitSpeakTimer = 0;
    this.cardTaken = false;
  }

  enter(parameters) {
    this.night = parameters && parameters.night ? parameters.night : 3;
    this.freddyStep = 0;
    this.bonBonHeight = 0;
    this.babyHatchOpen = false;
    this.targetPasscode = [];
    for (let i = 0; i < 6; i++) {
      this.targetPasscode.push(Math.floor(1 + Math.random() * 9));
    }
    this.passcodeStep = 0;
    this.digitSpeakTimer = 1.5;
    this.cardTaken = false;

    if (this.night === 3) {
      this.audio.speak('HandUnit', "Welcome to Parts and Service. Deactivated Funtime Freddy is in front of you. First, press the small button under Freddy's right cheek.", 'HandUnit', 6.5, true);
    } else {
      this.audio.speak('Circus Baby', "I'm broken. I can't be fixed. I'm going to be taken to the Scooping Room soon, but it won't fix what is wrong with me. Will you help me? Press the button on my cheek.", 'CircusBaby', 7.5, true);
    }
  }

  update(deltaTime) {
    if (this.night === 3 && this.freddyStep === 6) {
      // Bon-Bon rises
      this.bonBonHeight = Math.min(1.0, this.bonBonHeight + deltaTime * 0.35);
    } else if (this.night === 5 && this.babyHatchOpen && this.passcodeStep < this.targetPasscode.length) {
      this.digitSpeakTimer -= deltaTime;
      if (this.digitSpeakTimer <= 0) {
        this.digitSpeakTimer = 3.2;
        const digit = this.targetPasscode[this.passcodeStep];
        this.audio.speak('Circus Baby', `${digit}...`, 'CircusBaby', 2.0, true);
      }
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#06070b');

    if (this.night === 3) {
      this.renderNight3FreddyMaintenance(canvas);
    } else {
      this.renderNight5BabyPasscode(canvas);
    }

    canvas.drawCrtScanlinesAndStatic(0.12, 0.45);
  }

  renderNight3FreddyMaintenance(canvas) {
    const openAmt = this.freddyStep >= 4 ? 0.95 : (this.freddyStep * 0.12);
    canvas.drawAnimatronicHead('funtime_freddy', 640, 270, 1.65, openAmt, this.freddyStep >= 4 ? 0.55 : 0);

    // Torso
    canvas.fillRect(510, 410, 260, 240, '#f1f5f9');
    canvas.strokeRect(510, 410, 260, 240, 4, '#cbd5e1');

    if (this.freddyStep >= 5) {
      // Chest Cavity open
      canvas.fillRect(540, 450, 200, 160, '#0f172a');
      canvas.strokeRect(540, 450, 200, 160, 2, '#38bdf8');
      if (canvas.button(580, 500, 120, 50, 'RELEASE CHIP', '#0284c7', '#ffffff', 14)) {
        this.freddyStep = 6;
        this.audio.playSfx('chime', 0.85);
        this.audio.speak('HandUnit', 'Great! Now catch Bon-Bon peeking on Freddy’s shoulder and press his black button under his bowtie.', 'HandUnit', 5.5, true);
      }
    }

    // Step 0: Right Cheek
    if (this.freddyStep === 0) {
      if (canvas.button(565, 305, 36, 36, '●', '#e11d48', '#ffffff', 16)) {
        this.freddyStep = 1;
        this.audio.playSfx('chime', 0.8);
        this.audio.speak('HandUnit', 'Now press the button on Freddy’s left cheek.', 'HandUnit', 4.0, true);
      }
    } else if (this.freddyStep === 1) {
      if (canvas.button(680, 305, 36, 36, '●', '#e11d48', '#ffffff', 16)) {
        this.freddyStep = 2;
        this.audio.playSfx('chime', 0.8);
        this.audio.speak('HandUnit', 'Now press the button near Freddy’s right eye.', 'HandUnit', 4.0, true);
      }
    } else if (this.freddyStep === 2) {
      if (canvas.button(590, 225, 32, 32, '●', '#e11d48', '#ffffff', 14)) {
        this.freddyStep = 3;
        this.audio.playSfx('chime', 0.8);
        this.audio.speak('HandUnit', 'Now press Freddy’s nose.', 'HandUnit', 3.5, true);
      }
    } else if (this.freddyStep === 3) {
      if (canvas.button(625, 260, 30, 24, '●', '#000000', '#ffffff', 14)) {
        this.freddyStep = 4;
        this.audio.playSfx('honk', 0.85);
        this.audio.speak('HandUnit', 'Faceplates opened. Release the chest cavity secondary power module.', 'HandUnit', 5.0, true);
      }
    } else if (this.freddyStep === 4) {
      if (canvas.button(610, 380, 60, 30, 'RELEASE', '#475569', '#ffffff', 13)) {
        this.freddyStep = 5;
      }
    } else if (this.freddyStep === 6) {
      // Bon-Bon on right shoulder
      const bby = 280 - this.bonBonHeight * 120;
      canvas.fillRect(800, bby, 110, 110, '#3b82f6');
      canvas.strokeRect(800, bby, 110, 110, 3, '#1d4ed8');
      canvas.drawText('BON-BON', 815, bby + 10, 14, '#ffffff');

      if (canvas.button(835, bby + 60, 40, 30, '●', '#000000', '#ffffff', 16)) {
        this.audio.playSfx('chime', 1.0);
        this.audio.speak('HandUnit', 'Great job! You have retrieved the power module. Return through Funtime Auditorium.', 'HandUnit', 6.0, true);
        setTimeout(() => {
          this.router.transitionTo(SceneId.FUNTIME_AUDITORIUM, { night: 3, phase: 'outbound_n3' });
        }, 2200);
      }
    }
  }

  renderNight5BabyPasscode(canvas) {
    canvas.drawAnimatronicHead('circus_baby', 640, 280, 1.75, this.babyHatchOpen ? 0.8 : 0);

    if (!this.babyHatchOpen) {
      if (canvas.button(560, 310, 40, 40, '●', '#dc2626', '#ffffff', 18)) {
        this.babyHatchOpen = true;
        this.audio.playSfx('door_slam', 0.85);
        this.audio.speak('Circus Baby', 'There is a keypad on my cheek. Enter the code I say.', 'CircusBaby', 5.0, true);
      }
    } else {
      // Keypad Overlay
      canvas.fillRect(820, 180, 260, 300, '#1e293b');
      canvas.strokeRect(820, 180, 260, 300, 3, '#38bdf8');
      canvas.drawText(`CODE PROGRESS: ${this.passcodeStep}/${this.targetPasscode.length}`, 840, 200, 16, '#38bdf8');

      for (let d = 1; d <= 9; d++) {
        const col = (d - 1) % 3;
        const row = Math.floor((d - 1) / 3);
        const bx = 840 + col * 70;
        const by = 230 + row * 60;

        if (canvas.button(bx, by, 58, 48, String(d), '#334155', '#ffffff', 18)) {
          this.handleKeypadDigit(d);
        }
      }

      if (this.passcodeStep >= this.targetPasscode.length && !this.cardTaken) {
        if (canvas.button(560, 480, 160, 50, 'TAKE CARD', '#16a34a', '#ffffff', 16)) {
          this.cardTaken = true;
          this.audio.playSfx('chime', 0.9);
          this.audio.speak('Circus Baby', 'You must press that green button on the conveyor belt to send me to the Scooping Room.', 'CircusBaby', 5.5, true);
        }
      }

      if (this.cardTaken) {
        if (canvas.button(540, 560, 200, 52, 'SEND TO SCOOPING ROOM', '#15803d', '#ffffff', 16)) {
          this.router.transitionTo(SceneId.FUNTIME_AUDITORIUM, { night: 5, phase: 'outbound_n5' });
        }
      }
    }
  }

  handleKeypadDigit(digit) {
    if (this.passcodeStep >= this.targetPasscode.length) return;
    const expected = this.targetPasscode[this.passcodeStep];
    if (digit === expected) {
      this.audio.playSfx('chime', 0.7);
      this.passcodeStep++;
      this.digitSpeakTimer = 0.5;
    } else {
      this.router.triggerJumpscare('ennard', SceneId.PARTS_AND_SERVICE, { night: 5 });
    }
  }

  exit() {}
}

