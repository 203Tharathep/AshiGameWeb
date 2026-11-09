// Springlock Suit & Scooping Room Real Ending Scenes
// Faithful translation of Unity Night4SpringlockAndScoopingScenes.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

export class SpringlockSuitScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.introTimer = 0;
    this.survivalActive = false;
    this.survivalRemaining = 180;
    this.springlocks = new Float32Array(10);

    this.leftClimberHeight = 0;
    this.rightClimberHeight = 0;
    this.centerDropY = -100;
    this.wiggleShakeOffset = 0;
  }

  enter() {
    this.introTimer = 0;
    this.survivalActive = false;
    this.survivalRemaining = this.state.state.fastTimerMode ? 90 : 180;
    for (let i = 0; i < 10; i++) this.springlocks[i] = 100;

    this.leftClimberHeight = 0;
    this.rightClimberHeight = 0;
    this.centerDropY = -100;
    this.wiggleShakeOffset = 0;

    this.audio.clearDialogue();
    this.audio.speak(
      'Technician 1',
      'Well, I have to be somewhere in 15 minutes, and this place gives me the creeps. Can we just get this over with? Set Ballora on the rollers.',
      'Technician',
      6.0,
      true
    );
    this.audio.speak(
      'Circus Baby',
      "Shh, be still and quiet. You've been sleeping for quite a while. I kidnapped you. You're inside something that came from my old pizzeria. Keep the springlocks wound tight.",
      'CircusBaby',
      8.5,
      false
    );
  }

  update(deltaTime) {
    if (!this.survivalActive) {
      this.introTimer += deltaTime;
      if (this.introTimer >= 12.5) {
        this.survivalActive = true;
        this.audio.playSfx('door_slam', 0.9);
      }
      return;
    }

    this.survivalRemaining -= deltaTime;
    if (this.survivalRemaining <= 0) {
      this.state.state.currentNight = Math.max(this.state.state.currentNight, 5);
      this.state.save();
      this.router.transitionTo(SceneId.TV_LIVING_ROOM, { episode: 3 });
      return;
    }

    if (this.wiggleShakeOffset > 0) {
      this.wiggleShakeOffset = Math.max(0, this.wiggleShakeOffset - deltaTime * 35);
    }

    // Unwind all 10 springlocks
    for (let i = 0; i < 10; i++) {
      this.springlocks[i] -= 2.35 * deltaTime;
      if (this.springlocks[i] <= 0) {
        this.router.triggerJumpscare('ballora', SceneId.SPRINGLOCK_SUIT);
        return;
      }
    }

    // Lethal climbing Minireenas
    if (this.leftClimberHeight > 0) {
      this.leftClimberHeight += 0.14 * deltaTime;
      if (this.leftClimberHeight >= 1.0) {
        this.router.triggerJumpscare('ballora', SceneId.SPRINGLOCK_SUIT);
        return;
      }
    } else if (Math.random() < 0.16 * deltaTime) {
      this.leftClimberHeight = 0.05;
    }

    if (this.rightClimberHeight > 0) {
      this.rightClimberHeight += 0.14 * deltaTime;
      if (this.rightClimberHeight >= 1.0) {
        this.router.triggerJumpscare('ballora', SceneId.SPRINGLOCK_SUIT);
        return;
      }
    } else if (Math.random() < 0.16 * deltaTime) {
      this.rightClimberHeight = 0.05;
    }

    // Center hallucination Minireena
    this.centerDropY += 110 * deltaTime;
    if (this.centerDropY > 820) this.centerDropY = -120;
  }

  wiggleSuit() {
    this.audio.playSfx('vent_crawl', 0.85);
    this.wiggleShakeOffset = 18;
    this.leftClimberHeight = 0;
    this.rightClimberHeight = 0;
    for (let i = 0; i < 10; i++) {
      this.springlocks[i] = Math.max(2, this.springlocks[i] - 12);
    }
  }

  windSpringlock(index) {
    if (index >= 0 && index < 10) {
      this.springlocks[index] = Math.min(100, this.springlocks[index] + 18);
      this.audio.playSfx('springlock_wind', 0.7);
    }
  }

  render(canvas) {
    const sx = this.wiggleShakeOffset > 0 ? (Math.random() * 2 - 1) * this.wiggleShakeOffset : 0;
    canvas.fillRect(0, 0, 1280, 720, '#0a080c');

    // Faceplate Eyehole cutout
    canvas.fillRect(100 + sx, 80, 500, 360, '#151924');
    canvas.fillRect(680 + sx, 80, 500, 360, '#151924');
    canvas.strokeRect(100 + sx, 80, 500, 360, 8, '#78350f');
    canvas.strokeRect(680 + sx, 80, 500, 360, 8, '#78350f');

    // Climbing Minireenas
    if (this.leftClimberHeight > 0) {
      const ly = 720 - this.leftClimberHeight * 580;
      canvas.drawAnimatronicHead('minireena', 130 + sx, ly, 0.6, 0);
    }
    if (this.rightClimberHeight > 0) {
      const ry = 720 - this.rightClimberHeight * 580;
      canvas.drawAnimatronicHead('minireena', 1150 + sx, ry, 0.6, 0);
    }

    // Center hallucination Minireena
    canvas.drawAnimatronicHead('minireena', 640 + sx, this.centerDropY, 0.75, 0);

    // Springlock knobs (5 left, 5 right)
    for (let i = 0; i < 5; i++) {
      // Left 5
      const valL = Math.round(this.springlocks[i]);
      const colL = valL < 30 ? '#ef4444' : (valL < 60 ? '#facc15' : '#22c55e');
      canvas.fillRect(20 + sx, 100 + i * 90, 60, 60, '#1e293b');
      canvas.strokeRect(20 + sx, 100 + i * 90, 60, 60, 3, colL);
      canvas.drawText(`${valL}%`, 25 + sx, 115 + i * 90, 15, colL);
      if (canvas.button(20 + sx, 100 + i * 90, 60, 60, '', 'transparent', '#ffffff')) {
        this.windSpringlock(i);
      }

      // Right 5
      const valR = Math.round(this.springlocks[5 + i]);
      const colR = valR < 30 ? '#ef4444' : (valR < 60 ? '#facc15' : '#22c55e');
      canvas.fillRect(1200 + sx, 100 + i * 90, 60, 60, '#1e293b');
      canvas.strokeRect(1200 + sx, 100 + i * 90, 60, 60, 3, colR);
      canvas.drawText(`${valR}%`, 1205 + sx, 115 + i * 90, 15, colR);
      if (canvas.button(1200 + sx, 100 + i * 90, 60, 60, '', 'transparent', '#ffffff')) {
        this.windSpringlock(5 + i);
      }
    }

    // Top instruction & time remaining
    const timeText = `NIGHT 4 SURVIVAL: ${Math.ceil(this.survivalRemaining)}s REMAINING | CLICK KNOBS TO WIND`;
    canvas.drawText(timeText, 240, 25, 20, '#facc15', 'center', 800, 35);

    // Wiggle Button
    if (canvas.button(490, 620, 300, 54, 'WIGGLE SUIT [A / D]', '#b91c1c', '#ffffff', 18)) {
      this.wiggleSuit();
    }

    canvas.drawCrtScanlinesAndStatic(0.18, 0.45);
  }

  exit() {}
}

export class ScoopingRoomScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;
    this.timer = 0;
    this.phase = 0;
  }

  enter() {
    this.timer = 0;
    this.phase = 0;
    this.audio.clearDialogue();
    this.audio.speak(
      'Circus Baby (Ennard)',
      'You are in the Scooping Room now. Funtime Foxy has already been here today. Funtime Freddy has already been here today. Ballora has already been here today. Circus Baby has already been here today. Look at us now: Ennard. The Scooper only hurts for a moment.',
      'CircusBaby',
      11.5,
      true
    );
  }

  update(deltaTime) {
    this.timer += deltaTime;
    if (this.phase === 0 && this.timer >= 11.8) {
      this.phase = 1;
      this.audio.playSfx('jumpscare', 1.0);
      this.audio.playSfx('door_slam', 1.0);
    } else if (this.phase === 1 && this.timer >= 14.0) {
      this.phase = 2;
      this.audio.playSfx('elevator_hum', 0.6);
    } else if (this.phase === 2 && this.timer >= 19.5) {
      this.state.state.starsUnlocked.star1_realEnding = true;
      this.state.save();
      this.router.transitionTo(SceneId.TITLE_MENU);
    }
  }

  render(canvas) {
    if (this.phase === 0) {
      canvas.fillRect(0, 0, 1280, 720, '#0c0709');
      // Empty animatronic shells
      canvas.drawAnimatronicHead('funtime_foxy', 260, 560, 0.7, 0.9);
      canvas.drawAnimatronicHead('funtime_freddy', 450, 580, 0.7, 0.9);
      canvas.drawAnimatronicHead('ballora', 820, 570, 0.7, 0.9);
      canvas.drawAnimatronicHead('circus_baby', 1010, 560, 0.7, 0.9);

      // Ennard behind window
      canvas.fillRect(380, 110, 520, 320, '#1e2430');
      canvas.strokeRect(380, 110, 520, 320, 6, '#475569');
      canvas.drawAnimatronicHead('ennard', 640, 270, 1.45, 0.15);

      // Warning siren
      if (Math.sin(Date.now() * 0.008) > 0) {
        canvas.fillRect(0, 0, 1280, 720, 'rgba(239, 68, 68, 0.22)');
      }
    } else if (this.phase === 1) {
      // S.C.U.P. strike
      canvas.fillRect(0, 0, 1280, 720, '#991b1b');
      canvas.fillRect(520, 60, 240, 600, '#1f2937');
      canvas.drawText('S.C.U.P. (SCALABLE CREATION OF ULTERIOR PRESENCE) ENGAGED', 240, 340, 26, '#ffffff', 'center', 800, 60);
    } else {
      // Bathroom mirror silhouette finale
      canvas.fillRect(0, 0, 1280, 720, '#030508');
      canvas.strokeRect(390, 90, 500, 540, 8, '#334155');
      canvas.fillRect(400, 100, 480, 520, '#0f172a');

      // Silhouette
      canvas.fillRect(560, 220, 160, 190, '#000000');
      canvas.fillRect(480, 410, 320, 210, '#000000');

      // Purple Glowing Eyes
      if (this.timer >= 15.5) {
        canvas.fillRect(595, 295, 24, 16, '#c084fc');
        canvas.fillRect(661, 295, 24, 16, '#c084fc');
      }

      canvas.drawText('REAL ENDING UNLOCKED — ★ STAR 1 AWARDED', 340, 35, 24, '#facc15', 'center', 600, 40);
    }

    canvas.drawCrtScanlinesAndStatic(0.18, 0.45);
  }

  exit() {}
}

