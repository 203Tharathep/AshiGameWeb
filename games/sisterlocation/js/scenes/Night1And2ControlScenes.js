// Primary Control, Circus Control, and Under Desk Scenes
// Faithful translation of Unity Night1And2ControlScenes.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

export class PrimaryControlScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.night = 1;
    this.leftLightOn = false;
    this.rightLightOn = false;
    this.shockFlashTimer = 0;

    this.leftShockCount = 0;
    this.rightShockCount = 0;
    this.balloraCheckedAfterShock = false;
    this.foxyCheckedAfterShock = false;
    this.returningFromBreaker = false;
  }

  enter(parameters) {
    this.night = parameters && parameters.night ? parameters.night : this.state.state.currentNight;
    this.returningFromBreaker = parameters && parameters.fromBreaker ? parameters.fromBreaker : false;

    this.leftLightOn = false;
    this.rightLightOn = false;
    this.shockFlashTimer = 0;
    this.leftShockCount = 0;
    this.rightShockCount = 0;
    this.balloraCheckedAfterShock = false;
    this.foxyCheckedAfterShock = false;

    if (this.returningFromBreaker) {
      this.audio.speak('HandUnit', 'Great job restoring the breaker room systems! That concludes your duties for Night 2. Have a restful evening!', 'HandUnit', 6.0, true);
      return;
    }

    if (this.night === 1) {
      this.audio.speak('HandUnit', "You are now in the Primary Control Module. Let's check on Ballora first. Press the blue button on the elevated keypad to the left.", 'HandUnit', 6.0, true);
    } else if (this.night === 2) {
      this.audio.speak('Angsty Teen', "Alright, let's check on Ballora. Push the blue button on the left keypad, whatever.", 'AngstyTeen', 5.2, true);
    } else if (this.night === 3) {
      this.audio.speak('HandUnit', "Let's check on Ballora on the left window, then Funtime Foxy on the right window.", 'HandUnit', 5.2, true);
    } else if (this.night === 5) {
      this.audio.speak('HandUnit', 'Let us check both stages to make sure the animatronics are in place before you enter Funtime Auditorium.', 'HandUnit', 5.5, true);
    }
  }

  update(deltaTime) {
    if (this.shockFlashTimer > 0) {
      this.shockFlashTimer -= deltaTime;
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#0c0f17');

    this.renderLeftWindow(canvas);
    this.renderRightWindow(canvas);
    this.renderCenterProps(canvas);

    this.renderKeypad(canvas, 60, 410, 'BALLORA GALLERY', true);
    this.renderKeypad(canvas, 1020, 410, 'FUNTIME AUDITORIUM', false);

    if (this.shockFlashTimer > 0) {
      canvas.fillRect(0, 0, 1280, 720, `rgba(180, 230, 255, ${this.shockFlashTimer.toFixed(2)})`);
    }

    // Vent transition buttons
    if (this.night === 1 && this.balloraCheckedAfterShock && this.foxyCheckedAfterShock) {
      if (canvas.button(480, 580, 320, 52, 'ENTER CIRCUS GALLERY VENT [S]', '#047857', '#ffffff', 17)) {
        this.router.transitionTo(SceneId.VENT_CRAWL, {
          targetScene: SceneId.CIRCUS_CONTROL,
          night: 1,
          label: 'PRIMARY CONTROL -> CIRCUS CONTROL MODULE'
        });
      }
    } else if (this.night === 2 && this.balloraCheckedAfterShock && this.foxyCheckedAfterShock) {
      if (canvas.button(480, 580, 320, 52, 'ENTER CIRCUS GALLERY VENT [S]', '#047857', '#ffffff', 17)) {
        this.router.transitionTo(SceneId.VENT_CRAWL, {
          targetScene: SceneId.CIRCUS_CONTROL,
          night: 2,
          label: 'PRIMARY CONTROL -> CIRCUS CONTROL MODULE'
        });
      }
    } else if (this.night === 3 && this.balloraCheckedAfterShock && this.foxyCheckedAfterShock) {
      if (canvas.button(1020, 335, 200, 48, 'ENTER AUDITORIUM', '#b45309', '#ffffff', 16)) {
        this.router.transitionTo(SceneId.FUNTIME_AUDITORIUM, { night: 3, phase: 'inbound' });
      }
    } else if (this.night === 5 && this.balloraCheckedAfterShock && this.foxyCheckedAfterShock) {
      if (canvas.button(1020, 335, 200, 48, 'ENTER AUDITORIUM', '#b45309', '#ffffff', 16)) {
        this.router.transitionTo(SceneId.FUNTIME_AUDITORIUM, { night: 5, phase: 'inbound' });
      }
    }

    if (this.returningFromBreaker) {
      if (canvas.button(480, 580, 320, 52, 'LEAVE VIA VENT -> FINISH NIGHT 2', '#15803d', '#ffffff', 17)) {
        this.state.state.currentNight = Math.max(this.state.state.currentNight, 3);
        this.state.save();
        this.router.transitionTo(SceneId.TV_LIVING_ROOM, { episode: 1 });
      }
    }

    canvas.drawCrtScanlinesAndStatic(0.12, 0.38);
  }

  renderLeftWindow(canvas) {
    const lit = this.leftLightOn;
    canvas.fillRect(60, 90, 360, 290, lit ? '#1e2436' : '#05070c');
    canvas.strokeRect(60, 90, 360, 290, 6, '#475569');

    if (lit) {
      if (this.leftShockCount === 0 && this.night === 1) {
        canvas.drawText('BALLORA IS NOT ON STAGE', 110, 220, 17, '#f87171');
      } else {
        canvas.drawAnimatronicHead('ballora', 240, 240, 1.25, 0);
        canvas.drawText('BALLORA ON STAGE', 140, 110, 16, '#4ade80');
      }
    }
  }

  renderRightWindow(canvas) {
    const lit = this.rightLightOn;
    canvas.fillRect(860, 90, 360, 290, lit ? '#1e2436' : '#05070c');
    canvas.strokeRect(860, 90, 360, 290, 6, '#475569');

    if (lit) {
      if (this.rightShockCount < 2 && this.night === 1) {
        canvas.drawText('FUNTIME FOXY NOT ON STAGE', 900, 220, 16, '#f87171');
      } else {
        canvas.drawAnimatronicHead('funtime_foxy', 1040, 240, 1.25, 0);
        canvas.drawText('FUNTIME FOXY ON STAGE', 940, 110, 16, '#4ade80');
      }
    }
  }

  renderCenterProps(canvas) {
    // Hanging clown / Ennard mask
    const isLolbit = this.router.lolbitMaskOverride;
    canvas.drawAnimatronicHead(isLolbit ? 'lolbit' : 'ennard', 640, 160, 0.9, 0);
    if (isLolbit) {
      canvas.drawText('1/5,000 LOLBIT MASK EGG', 540, 65, 14, '#f97316');
    }

    // Clickable Ennard Nose Honk
    if (canvas.button(630, 150, 20, 20, '●', '#dc2626', '#ffffff', 14)) {
      this.audio.playSfx('honk', 0.9);
    }

    // Vent entrance
    canvas.fillRect(520, 440, 240, 130, '#0f172a');
    canvas.strokeRect(520, 440, 240, 130, 4, '#334155');
    canvas.drawText('CIRCUS GALLERY VENT', 540, 495, 15, '#94a3b8');
  }

  renderKeypad(canvas, x, y, title, isLeft) {
    canvas.fillRect(x, y, 200, 190, '#272d3b');
    canvas.strokeRect(x, y, 200, 190, 3, '#576275');
    canvas.drawText(title, x + 10, y + 10, 14, '#ffffff', 'center', 180, 26);

    const lightActive = isLeft ? this.leftLightOn : this.rightLightOn;
    if (canvas.button(x + 25, y + 45, 150, 54, lightActive ? 'LIGHT: ON' : 'LIGHT [BLUE]', '#2563eb', '#ffffff', 16)) {
      if (isLeft) {
        this.leftLightOn = !this.leftLightOn;
        this.onLeftLightToggled();
      } else {
        this.rightLightOn = !this.rightLightOn;
        this.onRightLightToggled();
      }
    }

    if (canvas.button(x + 25, y + 115, 150, 54, 'SHOCK [RED]', '#dc2626', '#ffffff', 16)) {
      this.audio.playSfx('shock', 0.95);
      this.shockFlashTimer = 0.55;
      this.leftLightOn = false;
      this.rightLightOn = false;

      if (isLeft) {
        this.leftShockCount++;
        this.onLeftShockTriggered();
      } else {
        this.rightShockCount++;
        this.onRightShockTriggered();
      }
    }
  }

  onLeftLightToggled() {
    if (!this.leftLightOn) return;
    if (this.night === 1) {
      if (this.leftShockCount === 0) {
        this.audio.speak('HandUnit', "Uh-oh! It looks like Ballora doesn't feel like dancing. Let's give her some motivation. Press the red button to administer a controlled shock.", 'HandUnit', 6.0, true);
      } else if (!this.balloraCheckedAfterShock) {
        this.balloraCheckedAfterShock = true;
        this.audio.speak('HandUnit', "Excellent! Ballora is back on stage. Now let's check on Funtime Foxy on the right keypad.", 'HandUnit', 5.5, true);
      }
    } else if (this.night === 2) {
      if (this.leftShockCount >= 1 && !this.balloraCheckedAfterShock) {
        this.balloraCheckedAfterShock = true;
        this.audio.speak('Angsty Teen (Glitch)', 'Argumentative. Standards. Elevation. Passive. Heights. Now check Funtime Foxy on the right.', 'AngstyTeen', 5.8, true);
      }
    } else if (this.night === 3 || this.night === 5) {
      this.balloraCheckedAfterShock = true;
      this.audio.speak('HandUnit', 'Great! Ballora is on stage. Now check Funtime Auditorium on the right.', 'HandUnit', 5.0, true);
    }
  }

  onLeftShockTriggered() {
    if (this.night === 2) {
      this.audio.speak('Angsty Teen', "Let's check the light again.", 'AngstyTeen', 3.0, true);
    }
  }

  onRightLightToggled() {
    if (!this.rightLightOn) return;
    if (this.night === 1) {
      if (this.rightShockCount === 0) {
        this.audio.speak('HandUnit', "Let's motivate Funtime Foxy with a controlled shock.", 'HandUnit', 4.2, true);
      } else if (this.rightShockCount === 1) {
        this.audio.speak('HandUnit', "Looks like Funtime Foxy is taking the day off. Let's motivate Funtime Foxy with another controlled shock.", 'HandUnit', 5.2, true);
      } else if (!this.foxyCheckedAfterShock) {
        this.foxyCheckedAfterShock = true;
        this.audio.speak('HandUnit', "Great job! Funtime Foxy is in working order. Now proceed through the vent in front of you to Circus Control.", 'HandUnit', 6.0, true);
      }
    } else if (this.night === 2) {
      if (this.rightShockCount >= 1 && !this.foxyCheckedAfterShock) {
        this.foxyCheckedAfterShock = true;
        this.audio.speak('Angsty Teen (Glitch)', 'Voice synthesizer offline. System error. Please proceed through the front vent to Circus Control.', 'AngstyTeen', 5.5, true);
      }
    } else if (this.night === 3 || this.night === 5) {
      this.foxyCheckedAfterShock = true;
      this.audio.speak('HandUnit', 'Funtime Foxy is in place. You may now enter the auditorium.', 'HandUnit', 4.5, true);
    }
  }

  onRightShockTriggered() {}
  exit() {}
}

export class CircusControlScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.night = 1;
    this.lightOn = false;
    this.shockFlash = 0;
    this.shockCount = 0;
    this.night1Complete = false;
    this.powerOutage = false;
  }

  enter(parameters) {
    this.night = parameters && parameters.night ? parameters.night : this.state.state.currentNight;
    this.lightOn = false;
    this.shockFlash = 0;
    this.shockCount = 0;
    this.night1Complete = false;
    this.powerOutage = false;

    if (this.night === 1) {
      this.audio.speak('HandUnit', "You are now in Circus Control. Let's check the light and see if Circus Baby is on stage.", 'HandUnit', 5.5, true);
    } else if (this.night === 2) {
      this.audio.speak('Angsty Teen', 'Circus Control. Check Baby, shock her, whatever you want.', 'AngstyTeen', 4.5, true);
    }
  }

  update(deltaTime) {
    if (this.shockFlash > 0) this.shockFlash -= deltaTime;
  }

  render(canvas) {
    const bg = this.powerOutage ? '#050508' : '#0e121d';
    canvas.fillRect(0, 0, 1280, 720, bg);

    // Observation window (Baby never visible behind glass)
    const winCol = this.lightOn && !this.powerOutage ? '#374151' : '#070a10';
    canvas.fillRect(240, 80, 800, 280, winCol);
    canvas.strokeRect(240, 80, 800, 280, 6, '#475569');

    if (this.lightOn && !this.powerOutage) {
      canvas.drawText('CIRCUS GALLERY STAGE (CIRCUS BABY NOT VISIBLE)', 410, 210, 18, '#facc15');
    }
    if (this.router.rareSpawnActive) {
      canvas.fillRect(620, 320, 14, 14, '#facc15');
      canvas.fillRect(650, 320, 14, 14, '#facc15');
      canvas.drawText('1/1,000 BIDYBAB AT WINDOW', 530, 290, 14, '#facc15');
    }

    // Control Desk with 4 colored eye-buttons
    canvas.fillRect(260, 400, 520, 180, '#242733');
    const eyeCols = ['#22d3ee', '#22c55e', '#d946ef', '#facc15'];
    for (let i = 0; i < 4; i++) {
      if (canvas.button(300 + i * 115, 440, 85, 85, '◉', eyeCols[i], '#000000', 28)) {
        this.audio.playSfx('chime', 0.7);
      }
    }

    // Right Keypad
    canvas.fillRect(850, 390, 210, 190, '#272d3b');
    if (canvas.button(875, 415, 160, 55, 'LIGHT [BLUE]', '#2563eb', '#ffffff', 16)) {
      this.lightOn = !this.lightOn;
    }
    if (canvas.button(875, 490, 160, 55, `SHOCK (${this.shockCount}/3)`, '#dc2626', '#ffffff', 16)) {
      this.handleShockPressed();
    }

    if (this.night1Complete) {
      if (canvas.button(460, 610, 360, 56, 'CRAWL BACK [S] -> FINISH NIGHT 1', '#15803d', '#ffffff', 18)) {
        this.state.state.currentNight = Math.max(this.state.state.currentNight, 2);
        this.state.save();
        this.router.transitionTo(SceneId.TV_LIVING_ROOM, { episode: 1 });
      }
    }

    if (this.powerOutage || this.night === 3) {
      if (canvas.button(460, 610, 360, 56, 'HIDE UNDER THE DESK', '#854d0e', '#fef08a', 18)) {
        this.router.transitionTo(SceneId.UNDER_DESK, { night: this.night });
      }
    }

    if (this.shockFlash > 0) {
      canvas.fillRect(0, 0, 1280, 720, `rgba(180, 220, 255, ${this.shockFlash.toFixed(2)})`);
    }

    canvas.drawCrtScanlinesAndStatic(0.12, 0.38);
  }

  handleShockPressed() {
    this.lightOn = false;
    if (this.night === 1) {
      this.audio.playSfx('shock', 0.95);
      this.shockFlash = 0.5;
      this.shockCount++;
      if (this.shockCount === 1) {
        this.audio.speak('HandUnit', "Let's try another controlled shock.", 'HandUnit', 3.5, true);
      } else if (this.shockCount === 2) {
        this.audio.speak('HandUnit', 'One more controlled shock should do the trick.', 'HandUnit', 3.8, true);
      } else if (this.shockCount >= 3) {
        this.night1Complete = true;
        this.audio.speak('HandUnit', "Great job, Circus Baby! That concludes your duties for your first night on the job. Please exit back through the ventilation shaft.", 'HandUnit', 6.5, true);
      }
    } else if (this.night === 2) {
      this.audio.playSfx('door_slam', 0.7);
      this.powerOutage = true;
      this.audio.speak('Angsty Teen (Failure)', 'Power failure. HandUnit restarting... Hide under the desk now.', 'AngstyTeen', 5.0, true);
    }
  }

  exit() {}
}

const NIGHT3_STORY_LINES = [
  "Did you know that I was on stage once? It wasn't for very long, only one day. What a wonderful day, though.",
  "I was in a small room with balloons and a few tables. I always counted the children in the room with me.",
  "Two, then three, then two, then three, then four, then two, then none.",
  "Then there was one. A little girl, standing by herself. I was no longer myself. And I stopped singing.",
  "My stomach opened, and there was ice cream. I couldn't move, at least, not until she stepped closer.",
  "There was screaming for a moment, but only for a moment. I still hear her sometimes. Why did that happen?"
];

export class UnderDeskScene {
  constructor(router, audio) {
    this.router = router;
    this.audio = audio;
    this.night = 2;
    this.doorClosedRatio = 0.35;
    this.timer = 0;
    this.pullWave = 0;
    this.pullProgress = 0;
    this.storyLineIdx = 0;
  }

  enter(parameters) {
    this.night = parameters && parameters.night ? parameters.night : 2;
    this.doorClosedRatio = 0.35;
    this.timer = 0;
    this.pullWave = 0;
    this.pullProgress = 0;
    this.storyLineIdx = 0;

    if (this.night === 3) {
      this.audio.speak('Circus Baby', NIGHT3_STORY_LINES[0], 'CircusBaby', 6.0, true);
    } else {
      this.audio.speak('Circus Baby', "Pull the metal sheet closed and hold it tight. Don't look into their eyes.", 'CircusBaby', 5.0, true);
    }
  }

  update(deltaTime) {
    this.timer += deltaTime;

    if (this.night === 3) {
      const nextIdx = Math.floor(this.timer / 6.2);
      if (nextIdx > this.storyLineIdx && nextIdx < NIGHT3_STORY_LINES.length) {
        this.storyLineIdx = nextIdx;
        this.audio.speak('Circus Baby', NIGHT3_STORY_LINES[this.storyLineIdx], 'CircusBaby', 6.0, true);
      }
      if (this.timer >= NIGHT3_STORY_LINES.length * 6.2) {
        this.router.transitionTo(SceneId.PRIMARY_CONTROL, { night: 3 });
      }
      return;
    }

    // Player holding mouse or D/RightArrow pulls door closed (right)
    const playerPulling = (window._fnafSlMouseDown) || (window._fnafSlKeyHeld && (window._fnafSlKeyHeld['KeyD'] || window._fnafSlKeyHeld['ArrowRight']));
    if (playerPulling) {
      this.doorClosedRatio = Math.min(1.0, this.doorClosedRatio + deltaTime * 0.65);
    }

    if (this.timer > 3.5 && this.pullWave === 0) {
      this.pullWave = 1;
      this.pullProgress = 0;
      this.audio.speak('Bidybab', 'Someone is inside! Pull it open!', 'ElizabethAfton', 3.5, true);
    }

    if (this.pullWave === 1 || this.pullWave === 3) {
      this.pullProgress += deltaTime;
      const bidybabForce = this.pullWave === 1 ? 0.42 : 0.52;
      this.doorClosedRatio -= bidybabForce * deltaTime;

      if (this.doorClosedRatio <= 0.05) {
        this.router.triggerJumpscare('ennard', SceneId.CIRCUS_CONTROL, { night: 2 });
        return;
      }

      if (this.pullProgress >= 5.0) {
        if (this.pullWave === 1) {
          this.pullWave = 2;
          this.pullProgress = 0;
          this.audio.speak('Bidybab', 'Knock knock... We can see you through the holes...', 'ElizabethAfton', 4.0, true);
        } else {
          this.pullWave = 4;
          this.audio.speak('Bidybab', "She's watching us! Oh, we have to leave now! See you soon!", 'ElizabethAfton', 4.5, true);
        }
      }
    } else if (this.pullWave === 2) {
      this.pullProgress += deltaTime;
      if (this.pullProgress >= 3.5) {
        this.pullWave = 3;
        this.pullProgress = 0;
      }
    } else if (this.pullWave === 4 && this.timer > 20) {
      this.audio.speak('Circus Baby', "When your guide comes back online, he is going to tell you that he was unsuccessful and that you must restart the system manually in the Breaker Room. Ballora will not return to her stage anymore. Go slowly and stop when her music is loud.", 'CircusBaby', 8.5, true);
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#040508');

    // Glowing Bidybab eyes outside gap
    const gapWidth = (1 - this.doorClosedRatio) * 1080;
    if (gapWidth > 30 && this.night === 2) {
      canvas.fillRect(100 + gapWidth * 0.5 - 30, 340, 18, 18, '#facc15');
      canvas.fillRect(100 + gapWidth * 0.5 + 12, 340, 18, 18, '#facc15');
    }

    // Perforated metal sliding sheet
    const doorWidth = this.doorClosedRatio * 1080;
    canvas.fillRect(1280 - 100 - doorWidth, 80, doorWidth, 560, '#374151');
    canvas.strokeRect(1280 - 100 - doorWidth, 80, doorWidth, 560, 4, '#6b7280');

    // Perforated circular holes
    for (let hx = 0; hx < 10; hx++) {
      for (let hy = 0; hy < 6; hy++) {
        const px = (1280 - 60 - doorWidth) + hx * 95;
        const py = 135 + hy * 82;
        if (px > 120 && px < 1140) {
          const eyeInHole = (this.pullWave >= 1 && this.pullWave <= 3 && hx === 3 && hy === 2);
          canvas.fillRect(px, py, 24, 24, eyeInHole ? '#facc15' : '#090a0f');
        }
      }
    }

    if (this.night === 2) {
      canvas.drawText(`UNDER DESK — HOLD LEFT-CLICK OR [D] TO PULL SHEET CLOSED (${Math.round(this.doorClosedRatio * 100)}%)`, 240, 30, 18, '#facc15', 'center', 800, 40);
      if (this.pullWave === 4) {
        if (canvas.button(450, 620, 380, 50, 'PROCEED TO BALLORA GALLERY', '#166534', '#ffffff', 17)) {
          this.router.transitionTo(SceneId.BALLORA_GALLERY, { night: 2, inbound: true });
        }
      }
    } else {
      canvas.drawText("NIGHT 3 SECRET — CIRCUS BABY'S ICE CREAM MONOLOGUE", 240, 30, 18, '#22d3ee', 'center', 800, 40);
      if (canvas.button(480, 620, 320, 50, 'RETURN TO PRIMARY CONTROL', '#1e3a5f', '#ffffff', 16)) {
        this.router.transitionTo(SceneId.PRIMARY_CONTROL, { night: 3 });
      }
    }

    canvas.drawCrtScanlinesAndStatic(0.15, 0.45);
  }

  exit() {}
}

