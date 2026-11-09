// Circus Baby 8-Bit Minigame Scene
// Full platformer: Pink/Blue/Green Cupcakes, Ice Cream Dispenser, Elizabeth Afton capture, Star 2 Award
// Faithful translation of Unity Baby8BitMinigameScene.cs

import { SceneId } from '../engine/SceneGraphRouter.js';

export class Baby8BitMinigameScene {
  constructor(router, state, audio) {
    this.router = router;
    this.state = state;
    this.audio = audio;

    this.playerX = 160;
    this.playerY = 500;
    this.playerVy = 0;
    this.grounded = true;
    this.timeRemaining = 60.0;

    this.cupcakeType = 1; // 1=Pink, 2=Blue, 3=Green
    this.cupcakeAmmo = 10;
    this.hasIceCream = false;

    this.elizabethCutsceneActive = false;
    this.elizabethX = -80;
    this.cutsceneTimer = 0;
    this.clawExtended = false;

    this.children = [];
    this.projectiles = [];
  }

  enter() {
    this.playerX = 160;
    this.playerY = 500;
    this.playerVy = 0;
    this.grounded = true;
    this.timeRemaining = 60.0;

    this.cupcakeType = 1;
    this.cupcakeAmmo = 10;
    this.hasIceCream = false;
    this.elizabethCutsceneActive = false;
    this.elizabethX = -80;
    this.cutsceneTimer = 0;
    this.clawExtended = false;

    this.projectiles = [];
    this.children = [
      { worldX: 450, y: 500, hitsNeeded: 2, fed: false },
      { worldX: 560, y: 500, hitsNeeded: 2, fed: false },
      { worldX: 950, y: 500, hitsNeeded: 3, fed: false },
      { worldX: 1100, y: 500, hitsNeeded: 3, fed: false },
      { worldX: 1750, y: 500, hitsNeeded: 1, fed: false },
      { worldX: 1900, y: 500, hitsNeeded: 1, fed: false },
      { worldX: 2050, y: 500, hitsNeeded: 1, fed: false }
    ];

    this.audio.startAmbientLoop('casual_bongos', 0.22);
  }

  update(deltaTime) {
    if (this.elizabethCutsceneActive) {
      this.updateElizabethCutscene(deltaTime);
      return;
    }

    this.timeRemaining -= deltaTime;
    if (this.timeRemaining <= 0) {
      this.router.transitionTo(SceneId.TITLE_MENU);
      return;
    }

    // Platformer physics & movement
    const left = window._fnafSlKeyHeld && (window._fnafSlKeyHeld['KeyA'] || window._fnafSlKeyHeld['ArrowLeft']);
    const right = window._fnafSlKeyHeld && (window._fnafSlKeyHeld['KeyD'] || window._fnafSlKeyHeld['ArrowRight']);
    const jump = window._fnafSlKeyHeld && (window._fnafSlKeyHeld['KeyW'] || window._fnafSlKeyHeld['ArrowUp'] || window._fnafSlKeyHeld['Space']);

    if (left) this.playerX = Math.max(60, this.playerX - 220 * deltaTime);
    if (right) this.playerX = Math.min(2700, this.playerX + 220 * deltaTime);

    if (jump && this.grounded) {
      this.playerVy = -480;
      this.grounded = false;
      this.audio.playSfx('vent_crawl', 0.5);
    }

    // Gravity
    this.playerVy += 980 * deltaTime;
    this.playerY += this.playerVy * deltaTime;

    // Floor collision
    if (this.playerY >= 500) {
      // Check pits
      const inPit1 = (this.playerX >= 680 && this.playerX <= 790);
      const inPit2 = (this.playerX >= 1480 && this.playerX <= 1600);
      const inPit3 = (this.playerX >= 2280 && this.playerX <= 2400);

      if (inPit1 || inPit2 || inPit3) {
        if (this.playerY > 740) {
          // Fell in pit
          this.enter();
          return;
        }
      } else {
        this.playerY = 500;
        this.playerVy = 0;
        this.grounded = true;
      }
    }

    // Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.x += p.vx * deltaTime;
      p.y += p.vy * deltaTime;

      // Hit check against children
      for (const ch of this.children) {
        if (!ch.fed && Math.abs(p.x - ch.worldX) < 40 && Math.abs(p.y - ch.y) < 50) {
          ch.hitsNeeded--;
          if (ch.hitsNeeded <= 0) {
            ch.fed = true;
            this.audio.playSfx('chime', 0.7);
          }
          if (!p.piercing) {
            this.projectiles.splice(i, 1);
            break;
          }
        }
      }

      if (p.x > this.playerX + 1200 || p.y > 700) {
        this.projectiles.splice(i, 1);
      }
    }

    // Check all children fed -> Ice Cream Dispenser at 2600
    const allFed = this.children.every(c => c.fed);
    if (allFed && !this.hasIceCream) {
      if (Math.abs(this.playerX - 2580) < 60) {
        this.hasIceCream = true;
        this.audio.playSfx('chime', 1.0);
      }
    }

    // Return with ice cream to starting zone (<200) triggers Elizabeth cutscene!
    if (this.hasIceCream && this.playerX <= 220) {
      this.elizabethCutsceneActive = true;
      this.cutsceneTimer = 0;
      this.elizabethX = 60;
    }
  }

  shootCupcake() {
    if (this.cupcakeAmmo <= 0) return;
    this.cupcakeAmmo--;
    this.audio.playSfx('chime', 0.5);

    if (this.cupcakeType === 1) {
      // Pink: single forward
      this.projectiles.push({ x: this.playerX + 30, y: this.playerY - 20, vx: 450, vy: -40, piercing: false });
    } else if (this.cupcakeType === 2) {
      // Blue: 3-way
      this.projectiles.push({ x: this.playerX + 30, y: this.playerY - 20, vx: 450, vy: -120, piercing: false });
      this.projectiles.push({ x: this.playerX + 30, y: this.playerY - 20, vx: 480, vy: -30, piercing: false });
      this.projectiles.push({ x: this.playerX + 30, y: this.playerY - 20, vx: 450, vy: 60, piercing: false });
    } else if (this.cupcakeType === 3) {
      // Green: piercing
      this.projectiles.push({ x: this.playerX + 30, y: this.playerY - 20, vx: 550, vy: 0, piercing: true });
    }
  }

  updateElizabethCutscene(deltaTime) {
    this.cutsceneTimer += deltaTime;
    if (this.cutsceneTimer < 3.0) {
      this.elizabethX += 50 * deltaTime;
    } else if (this.cutsceneTimer >= 3.0 && this.cutsceneTimer < 4.2) {
      this.clawExtended = true;
    } else if (this.cutsceneTimer >= 4.2 && this.cutsceneTimer < 6.0) {
      this.clawExtended = false;
      this.audio.playSfx('jumpscare', 0.85);
    } else if (this.cutsceneTimer >= 6.0) {
      this.state.state.starsUnlocked.star2_minigame = true;
      this.state.save();
      this.router.transitionTo(SceneId.TITLE_MENU);
    }
  }

  render(canvas) {
    canvas.fillRect(0, 0, 1280, 720, '#020617');

    const camX = Math.max(0, this.playerX - 400);

    // Green grass ground with pits
    const groundParts = [
      [0, 680],
      [790, 1480],
      [1600, 2280],
      [2400, 2800]
    ];
    for (const [x1, x2] of groundParts) {
      canvas.fillRect(x1 - camX, 540, x2 - x1, 180, '#16a34a');
      canvas.fillRect(x1 - camX, 540, x2 - x1, 16, '#4ade80');
    }

    // Children
    for (const ch of this.children) {
      const cx = ch.worldX - camX;
      if (cx > -60 && cx < 1340) {
        canvas.fillRect(cx - 15, ch.y - 10, 30, 45, ch.fed ? '#22d3ee' : '#f87171');
        canvas.fillRect(cx - 10, ch.y - 30, 20, 20, '#fef08a');
        if (!ch.fed) {
          canvas.drawText(`${ch.hitsNeeded}`, cx - 5, ch.y - 45, 14, '#ef4444');
        }
      }
    }

    // Cupcakes in flight
    for (const p of this.projectiles) {
      canvas.fillRect(p.x - camX - 8, p.y - 8, 16, 16, p.piercing ? '#22c55e' : (this.cupcakeType === 2 ? '#3b82f6' : '#ec4899'));
    }

    // Player (8-Bit Circus Baby)
    const px = this.playerX - camX;
    canvas.fillRect(px - 22, this.playerY - 45, 44, 85, '#dc2626');
    canvas.fillRect(px - 16, this.playerY - 80, 32, 35, '#ffffff');
    canvas.fillRect(px - 24, this.playerY - 78, 10, 20, '#ea580c');
    canvas.fillRect(px + 14, this.playerY - 78, 10, 20, '#ea580c');

    // Ice Cream Dispenser at 2580
    if (!this.hasIceCream && this.children.every(c => c.fed)) {
      const ix = 2580 - camX;
      canvas.fillRect(ix - 20, 460, 40, 80, '#f43f5e');
      canvas.drawText('ICE CREAM', ix - 35, 430, 14, '#fef08a');
    }

    // Elizabeth Cutscene
    if (this.elizabethCutsceneActive) {
      const ex = this.elizabethX - camX;
      canvas.fillRect(ex, 470, 24, 60, '#f472b6');
      canvas.fillRect(ex + 4, 450, 16, 20, '#fef08a');

      if (this.clawExtended) {
        // Metallic Claw extending from Baby's stomach
        canvas.fillRect(px - 60, this.playerY, 50, 8, '#94a3b8');
        canvas.fillRect(px - 70, this.playerY - 12, 12, 32, '#64748b');
      }
    }

    // HUD
    canvas.drawText(`TIME: ${Math.ceil(this.timeRemaining)}s | AMMO: ${this.cupcakeAmmo} | CUPCAKE: ${this.cupcakeType === 1 ? 'PINK' : (this.cupcakeType === 2 ? 'BLUE' : 'GREEN')}`, 60, 40, 20, '#facc15');
    if (this.hasIceCream) {
      canvas.drawText('🍦 ICE CREAM RETRIEVED! WALK BACK TO STARTING SCREEN!', 260, 80, 20, '#4ade80');
    }

    // Controls buttons
    if (canvas.button(60, 620, 150, 48, 'CYCLE AMMO [E]', '#1e3a5f', '#ffffff', 14)) {
      this.cupcakeType = (this.cupcakeType % 3) + 1;
      this.cupcakeAmmo = this.cupcakeType === 1 ? 10 : (this.cupcakeType === 2 ? 4 : 3);
    }

    if (canvas.button(230, 620, 150, 48, 'SHOOT [CLICK]', '#b91c1c', '#ffffff', 14)) {
      this.shootCupcake();
    }

    if (canvas.button(1080, 30, 140, 40, 'EXIT MENU', '#334155', '#ffffff', 15)) {
      this.router.transitionTo(SceneId.TITLE_MENU);
    }

    canvas.drawCrtScanlinesAndStatic(0.1, 0.35);
  }

  exit() {}
}

