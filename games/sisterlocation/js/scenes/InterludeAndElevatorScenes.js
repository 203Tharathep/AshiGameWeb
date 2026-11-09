// Interlude, Elevator Descent, and Vent Crawl Scenes
// Faithful translation of Unity InterludeAndElevatorScenes.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

const ELIZABETH_QUOTES = [
  '',
  "Daddy, why won't you let me play with her?",
  "Daddy, you let the other children go see her. Why won't you let me go?",
  "Daddy just once let me go play with her. She's so pretty and shiny. Didn't you make her just for me?",
  "Daddy, she can make balloons! Have you seen her make balloons? Oh Daddy, let me go to her!",
  "Daddy isn't watching."
];

export class PreNightInterludeScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;
    this.night = 1;
    this.timer = 0;
  }

  enter(parameters) {
    this.night = parameters && parameters.night ? parameters.night : this.state.state.currentNight;
    this.state.state.currentNight = this.night;
    this.state.save();

    this.timer = 0;
    this.audio.stopAmbientLoop();
    this.audio.clearDialogue();

    const quote = (this.night >= 1 && this.night <= 5) ? ELIZABETH_QUOTES[this.night] : ELIZABETH_QUOTES[1];
    this.audio.speak('Elizabeth Afton', quote, 'ElizabethAfton', 5.2, true);
  }

  update(deltaTime) {
    this.timer += deltaTime;
    if (this.timer >= 6.0) {
      if (this.night === 4) {
        this.router.transitionTo(SceneId.SPRINGLOCK_SUIT);
      } else {
        this.router.transitionTo(SceneId.ELEVATOR, { night: this.night });
      }
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#000000');
    canvas.drawText(`NIGHT ${this.night}`, 440, 290, 44, '#d9e2ec', 'center', 400, 80);
    canvas.drawCrtScanlinesAndStatic(0.08, 0.5);
  }

  exit() {
    this.audio.clearDialogue();
  }
}

// Deliberately missing the letter 'B' per canonical HandUnit keypad
const KEYPAD_LETTERS = 'ACDEFGHIJKLMNOPQRSTUVWXYZ';

export class ElevatorScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.night = 1;
    this.descentTimer = 0;
    this.keypadActive = false;
    this.keypadCompleted = false;
    this.typedCount = 0;
    this.autocorrectText = '';
    this.doorsReady = false;
  }

  enter(parameters) {
    this.night = parameters && parameters.night ? parameters.night : this.state.state.currentNight;
    this.descentTimer = 0;
    this.keypadActive = false;
    this.keypadCompleted = false;
    this.typedCount = 0;
    this.autocorrectText = '';
    this.doorsReady = false;

    this.audio.startAmbientLoop('elevator_hum', 0.35);
    this.audio.clearDialogue();

    if (this.night === 1) {
      this.audio.speak('HandUnit', 'Welcome to the first day of your exciting new career! Please enter your name as seen above the keypad. This cannot be changed later, so please be careful.', 'HandUnit', 6.0, true);
    } else if (this.night === 2) {
      this.audio.speak('HandUnit', 'Welcome back for another night of intellectual stimulation! Please make a selection for your virtual companion voice on the keypad.', 'HandUnit', 5.5, true);
    } else if (this.night === 3) {
      this.audio.speak('HandUnit', 'Welcome back to another pivotal night of your thriving new career! Please select your therapeutic musical accompaniment on the keypad.', 'HandUnit', 5.5, true);
    } else if (this.night === 5) {
      this.audio.speak('HandUnit', 'Welcome back to your last day on the job! Please enter your desired one-week bonus gift basket on the keypad. Note: two technicians are still on-site tonight.', 'HandUnit', 6.0, true);
    }
  }

  update(deltaTime) {
    this.descentTimer += deltaTime;
    if (this.descentTimer >= 2.2 && !this.keypadCompleted) {
      this.keypadActive = true;
    }
    if (this.keypadCompleted && this.descentTimer >= 6.5) {
      this.doorsReady = true;
    }
  }

  render(canvas) {
    const flicker = Math.random() < 0.06 ? 0.45 : 1.0;
    canvas.fillRect(0, 0, 1280, 720, `rgba(15, 20, 30, ${flicker})`);

    // Elevator scrolling shaft walls
    const scrollOffset = (this.descentTimer * 240) % 120;
    for (let y = -120; y < 760; y += 120) {
      const ry = y + scrollOffset;
      canvas.fillRect(120, ry, 1040, 10, '#232938');
    }

    // Back window (1 in 1000 Bidybab eyes)
    canvas.fillRect(490, 130, 300, 220, '#05080f');
    canvas.strokeRect(490, 130, 300, 220, 6, '#475261');
    if (this.router.rareSpawnActive) {
      canvas.fillRect(615, 230, 14, 14, '#facc15');
      canvas.fillRect(650, 230, 14, 14, '#facc15');
      canvas.drawText('1/1,000 BIDYBAB PEEK', 560, 140, 14, '#facc15');
    }

    // Nose honk red button on bottom-right wall
    if (canvas.button(1060, 480, 56, 56, '●', '#b91c1c', '#ffffff', 24)) {
      this.audio.playSfx('honk', 0.9);
    }
    canvas.drawText('DO NOT TOUCH', 1030, 542, 13, '#94a3b8');

    // HandUnit Yellow Keypad
    if (this.keypadActive && !this.keypadCompleted) {
      this.renderHandUnitKeypad(canvas);
    }

    // Red Door Open Button
    if (this.doorsReady) {
      if (canvas.button(510, 400, 260, 64, 'OPEN ELEVATOR DOORS\n& ENTER VENT', '#dc2626', '#ffffff', 18)) {
        this.audio.playSfx('door_slam', 0.85);
        this.router.transitionTo(SceneId.VENT_CRAWL, {
          targetScene: SceneId.PRIMARY_CONTROL,
          night: this.night,
          label: 'FRONT VENTILATION SHAFT -> PRIMARY CONTROL MODULE'
        });
      }
    }

    canvas.drawCrtScanlinesAndStatic(0.14, 0.35);
  }

  renderHandUnitKeypad(canvas) {
    canvas.fillRect(380, 220, 520, 360, '#eab308');
    canvas.strokeRect(380, 220, 520, 360, 5, '#713f12');
    canvas.fillRect(410, 245, 460, 52, '#1e293b');

    const displayPrompt = this.typedCount === 0 ? "ENTER SELECTION (NOTE: NO 'B' KEY)" : `INPUT: ${this.autocorrectText}`;
    canvas.drawText(displayPrompt, 425, 258, 18, '#4ade80', 'left', 430, 36);

    for (let i = 0; i < KEYPAD_LETTERS.length; i++) {
      const col = i % 7;
      const row = Math.floor(i / 7);
      const jx = (Math.random() * 2 - 1) * 3.5;
      const jy = (Math.random() * 2 - 1) * 3.5;
      const bx = 415 + col * 62 + jx;
      const by = 320 + row * 56 + jy;

      if (canvas.button(bx, by, 52, 46, KEYPAD_LETTERS[i], '#334155', '#fef08a', 18)) {
        this.audio.playSfx('chime', 0.6);
        this.typedCount++;
        this.autocorrectText += KEYPAD_LETTERS[(i + 3) % KEYPAD_LETTERS.length];
        if (this.typedCount >= 3) {
          this.completeHandUnitAutocorrect();
        }
      }
    }
  }

  completeHandUnitAutocorrect() {
    this.keypadCompleted = true;
    this.keypadActive = false;

    if (this.night === 1) {
      this.audio.speak('HandUnit', 'It seems that you had some trouble with the keypad. I see what you were trying to type, and I will auto-correct it for you. One moment. Welcome: Eggs Benedict.', 'HandUnit', 6.2, true);
    } else if (this.night === 2) {
      this.audio.speak('HandUnit', 'It seems that you had some trouble with the keypad. I see what you were trying to type, and I will auto-correct it for you. Thank you for choosing: Angsty Teen.', 'HandUnit', 6.0, true);
    } else if (this.night === 3) {
      this.audio.startAmbientLoop('casual_bongos', 0.32);
      this.audio.speak('HandUnit', "Thank you for selecting: Casual Bongos. Also, due to unforeseen malfunctions from today's shows, your nightly pay has been decreased.", 'HandUnit', 6.2, true);
    } else if (this.night === 5) {
      this.audio.speak('HandUnit', 'Thank you for selecting: Exotic Butters. Please proceed through the front ventilation shaft.', 'HandUnit', 5.5, true);
    }
  }

  exit() {}
}

export class VentCrawlScene {
  constructor(router, audio) {
    this.router = router;
    this.audio = audio;
    this.targetScene = SceneId.PRIMARY_CONTROL;
    this.night = 1;
    this.label = 'VENTILATION SHAFT';
    this.progress = 0;
    this.clangStepTimer = 0;
    this.scaryClangs = false;
  }

  enter(parameters) {
    this.progress = 0;
    this.clangStepTimer = 0;
    this.targetScene = parameters && parameters.targetScene ? parameters.targetScene : SceneId.PRIMARY_CONTROL;
    this.night = parameters && parameters.night ? parameters.night : 1;
    this.label = parameters && parameters.label ? parameters.label : 'VENTILATION SHAFT';
    this.scaryClangs = parameters && parameters.scaryClangs ? parameters.scaryClangs : false;
  }

  update(deltaTime) {
    const isCrawling = window._fnafSlKeyHeld && (window._fnafSlKeyHeld['KeyW'] || window._fnafSlKeyHeld['ArrowUp'] || window._fnafSlKeyHeld['KeyS']);
    const isFast = window._fnafSlKeyHeld && (window._fnafSlKeyHeld['ShiftLeft'] || window._fnafSlKeyHeld['ShiftRight']);

    if (isCrawling) {
      const speed = isFast ? 42 : 24;
      this.progress += speed * deltaTime;
      this.clangStepTimer += deltaTime * (isFast ? 2.2 : 1.2);
      if (this.clangStepTimer >= 0.35) {
        this.clangStepTimer = 0;
        this.audio.playSfx('vent_crawl', this.scaryClangs ? 1.0 : 0.65);
      }
    }

    if (this.progress >= 100) {
      this.router.transitionTo(this.targetScene, { night: this.night });
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#05070a');

    // Perspective rectangular duct frames
    const phase = (this.progress * 0.12) % 1.0;
    for (let i = 0; i < 6; i++) {
      const t = (i + phase) / 6;
      const w = 160 + t * (1240 - 160);
      const h = 100 + t * (680 - 100);
      canvas.strokeRect(640 - w * 0.5, 360 - h * 0.5, w, h, 3, `rgba(51, 65, 85, ${t.toFixed(2)})`);
    }

    canvas.drawText(this.label, 240, 45, 22, '#22d3ee', 'center', 800, 40);
    canvas.drawText(`HOLD [W] TO CRAWL — PROGRESS: ${Math.round(this.progress)}%`, 340, 620, 20, '#facc15', 'center', 600, 40);

    if (canvas.button(520, 550, 240, 48, 'CRAWL FORWARD [W]', '#1e3a5f', '#ffffff', 17)) {
      this.progress += 25;
      this.audio.playSfx('vent_crawl', 0.8);
    }

    canvas.drawCrtScanlinesAndStatic(0.12, 0.45);
  }

  exit() {}
}

