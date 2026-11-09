// ==========================================
// ASHI COMBAT: CANVAS 2D RENDERER
// ==========================================

export class CombatRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 1280;
    this.height = 720;
    canvas.width = this.width;
    canvas.height = this.height;

    // Preloaded fighter face images
    this.loadedImages = new Map();
    this.bgElements = {
      clouds: [],
      embers: [],
      rain: [],
      lightningTimer: 0,
      torchFlicker: 0
    };
    this.initBackgroundElements();
  }

  preloadFighterImages(fighters) {
    fighters.forEach((f) => {
      if (f.avatar && !this.loadedImages.has(f.avatar)) {
        const img = new Image();
        img.src = f.avatar;
        img.onload = () => {
          this.loadedImages.set(f.avatar, img);
        };
        this.loadedImages.set(f.avatar, img);
      }
    });
  }

  initBackgroundElements() {
    // Cloud layers for Pit & Rooftop
    for (let i = 0; i < 8; i++) {
      this.bgElements.clouds.push({
        x: Math.random() * this.width,
        y: 50 + Math.random() * 200,
        speed: 0.2 + Math.random() * 0.4,
        scale: 0.8 + Math.random() * 1.5,
        alpha: 0.15 + Math.random() * 0.25
      });
    }

    // Embers for Netherrealm / Shaolin
    for (let i = 0; i < 40; i++) {
      this.bgElements.embers.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.random() * 1.5 - 0.75,
        vy: -1 - Math.random() * 2.5,
        size: 1.5 + Math.random() * 3,
        alpha: 0.3 + Math.random() * 0.7,
        color: Math.random() < 0.6 ? '#ff6600' : '#ffcc00'
      });
    }

    // Rain for Rooftop
    for (let i = 0; i < 60; i++) {
      this.bgElements.rain.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        speed: 16 + Math.random() * 8,
        len: 15 + Math.random() * 15
      });
    }
  }

  render(engine) {
    const ctx = this.ctx;
    ctx.save();

    // Screen Shake
    if (engine.screenShake > 0) {
      const sx = (Math.random() * 2 - 1) * engine.screenShake;
      const sy = (Math.random() * 2 - 1) * engine.screenShake;
      ctx.translate(sx, sy);
    }

    // 1. Draw Stage Background
    this.drawStage(engine.stage);

    // 2. Draw Floor Blood & Splatters
    this.drawFloorSplatters(engine);

    // 3. Draw Ice Clones
    this.drawIceClones(engine);

    // 4. Draw Fighters
    this.drawFighter(engine.p1, engine);
    this.drawFighter(engine.p2, engine);

    // 5. Draw Projectiles
    this.drawProjectiles(engine);

    // 6. Draw Particles & Effects
    this.drawParticles(engine);

    // 7. Draw HUD (Health, Super, Timer, Combos)
    this.drawHUD(engine);

    // 8. Draw Banners & Announcements (Fight, Finish Him, Fatality)
    this.drawAnnouncements(engine);

    ctx.restore();
  }

  // ==========================================
  // STAGE BACKGROUNDS
  // ==========================================

  drawStage(stage) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const theme = stage.theme || 'dark-pit';

    this.bgElements.torchFlicker = (this.bgElements.torchFlicker + 0.15) % (Math.PI * 2);

    if (theme === 'dark-pit') {
      // The Pit: Moon, Dark mountains, stone bridge, spikes below
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#05030a');
      skyGrad.addColorStop(0.6, '#180922');
      skyGrad.addColorStop(1, '#050008');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Blood Full Moon
      ctx.save();
      ctx.shadowColor = '#ff2200';
      ctx.shadowBlur = 40;
      ctx.fillStyle = '#ffeedd';
      ctx.beginPath();
      ctx.arc(w / 2, 160, 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Clouds
      this.drawClouds('#30123d');

      // Distant Spikes & Pit Chasm
      ctx.fillStyle = '#08020a';
      ctx.fillRect(0, 600, w, 120);
      for (let x = 30; x < w; x += 45) {
        ctx.fillStyle = '#221526';
        ctx.beginPath();
        ctx.moveTo(x, 720);
        ctx.lineTo(x + 22, 610);
        ctx.lineTo(x + 44, 720);
        ctx.fill();
      }

      // Stone Bridge
      ctx.fillStyle = '#1c1524';
      ctx.fillRect(0, 560, w, 50);

      // Carved Bridge Railing & Runes
      ctx.strokeStyle = '#382548';
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 560, w, 50);
      for (let x = 60; x < w; x += 140) {
        ctx.strokeRect(x, 565, 80, 40);
      }
    } else if (theme === 'netherrealm') {
      // Netherrealm Hellfire: Lava, Volcanoes, Obsidian
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#150000');
      skyGrad.addColorStop(0.5, '#400800');
      skyGrad.addColorStop(1, '#1a0200');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Lava Glow from bottom
      const lavaGlow = ctx.createRadialGradient(w / 2, 650, 50, w / 2, 650, 500);
      lavaGlow.addColorStop(0, 'rgba(255, 120, 0, 0.45)');
      lavaGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lavaGlow;
      ctx.fillRect(0, 200, w, 520);

      // Obsidian Spires
      ctx.fillStyle = '#120505';
      ctx.beginPath();
      ctx.moveTo(0, 560);
      ctx.lineTo(180, 260);
      ctx.lineTo(340, 560);
      ctx.lineTo(550, 320);
      ctx.lineTo(820, 560);
      ctx.lineTo(1050, 280);
      ctx.lineTo(w, 560);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Stone Platform
      ctx.fillStyle = '#220808';
      ctx.fillRect(0, 560, w, 60);

      // Embers
      this.drawEmbers();
    } else if (theme === 'shaolin') {
      // Shaolin Temple: Pagodas, Dragon Lanterns, Courtyard
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#0c0512');
      skyGrad.addColorStop(0.6, '#281122');
      skyGrad.addColorStop(1, '#15060f');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Temple Pagoda Silhouette
      ctx.fillStyle = '#110614';
      ctx.fillRect(200, 250, 880, 310);
      // Roof eaves
      ctx.beginPath();
      ctx.moveTo(120, 270);
      ctx.quadraticCurveTo(640, 180, 1160, 270);
      ctx.lineTo(1050, 330);
      ctx.lineTo(230, 330);
      ctx.closePath();
      ctx.fill();

      // Hanging Glowing Lanterns
      [320, 500, 780, 960].forEach((lx) => {
        const flicker = Math.sin(this.bgElements.torchFlicker + lx) * 5;
        ctx.save();
        ctx.strokeStyle = '#664400';
        ctx.beginPath();
        ctx.moveTo(lx, 260);
        ctx.lineTo(lx, 360 + flicker);
        ctx.stroke();

        ctx.shadowColor = '#ffaa00';
        ctx.shadowBlur = 25;
        ctx.fillStyle = '#ff4400';
        ctx.beginPath();
        ctx.arc(lx, 375 + flicker, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Courtyard Tiles
      ctx.fillStyle = '#22151f';
      ctx.fillRect(0, 560, w, 160);
    } else if (theme === 'rooftop') {
      // Dormitory Rooftop Storm
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, '#040914');
      skyGrad.addColorStop(0.8, '#0b1626');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Bangkok Skyscrapers with illuminated windows
      this.drawCitySkyline();

      // Rain
      this.drawRain();

      // Rooftop Edge & Water Puddles
      ctx.fillStyle = '#131e2e';
      ctx.fillRect(0, 560, w, 160);
    } else {
      // Cyber Neo-Bangkok
      ctx.fillStyle = '#030814';
      ctx.fillRect(0, 0, w, h);

      // Neon Gridlines
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
      ctx.lineWidth = 1.5;
      for (let y = 300; y < 560; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let x = 0; x < w; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 300);
        ctx.lineTo(x * 1.3 - w * 0.15, 560);
        ctx.stroke();
      }

      ctx.fillStyle = '#081426';
      ctx.fillRect(0, 560, w, 160);
    }
  }

  drawClouds(color) {
    const ctx = this.ctx;
    ctx.fillStyle = color;
    this.bgElements.clouds.forEach((c) => {
      c.x += c.speed;
      if (c.x > this.width + 150) c.x = -150;
      ctx.save();
      ctx.globalAlpha = c.alpha;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 45 * c.scale, 0, Math.PI * 2);
      ctx.arc(c.x + 40 * c.scale, c.y - 15 * c.scale, 55 * c.scale, 0, Math.PI * 2);
      ctx.arc(c.x + 85 * c.scale, c.y, 40 * c.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawEmbers() {
    const ctx = this.ctx;
    this.bgElements.embers.forEach((e) => {
      e.x += e.vx;
      e.y += e.vy;
      if (e.y < 0) {
        e.y = this.height;
        e.x = Math.random() * this.width;
      }
      ctx.save();
      ctx.globalAlpha = e.alpha;
      ctx.fillStyle = e.color;
      ctx.shadowColor = e.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawRain() {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(180, 220, 255, 0.45)';
    ctx.lineWidth = 1.2;
    this.bgElements.rain.forEach((r) => {
      r.y += r.speed;
      r.x -= 2;
      if (r.y > this.height) {
        r.y = 0;
        r.x = Math.random() * this.width;
      }
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x - 4, r.y + r.len);
      ctx.stroke();
    });
  }

  drawCitySkyline() {
    const ctx = this.ctx;
    const buildings = [
      { x: 40, w: 90, h: 280 },
      { x: 150, w: 120, h: 360 },
      { x: 290, w: 80, h: 240 },
      { x: 400, w: 140, h: 420 },
      { x: 570, w: 100, h: 300 },
      { x: 700, w: 130, h: 380 },
      { x: 860, w: 110, h: 290 },
      { x: 1000, w: 140, h: 410 },
      { x: 1160, w: 90, h: 260 }
    ];

    buildings.forEach((b) => {
      ctx.fillStyle = '#0a101d';
      ctx.fillRect(b.x, 560 - b.h, b.w, b.h);

      // Windows
      ctx.fillStyle = 'rgba(255, 230, 150, 0.25)';
      for (let wx = b.x + 12; wx < b.x + b.w - 15; wx += 20) {
        for (let wy = 560 - b.h + 20; wy < 540; wy += 35) {
          if (Math.random() > 0.3) {
            ctx.fillRect(wx, wy, 8, 12);
          }
        }
      }
    });
  }

  drawFloorSplatters(engine) {
    const ctx = this.ctx;
    ctx.save();
    engine.bloodParticles.forEach((p) => {
      if (p.vx === 0 && p.vy === 0) {
        // Splattered on floor
        ctx.fillStyle = p.color || '#990000';
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.radius * 1.5, p.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.restore();
  }

  drawIceClones(engine) {
    const ctx = this.ctx;
    engine.iceClones.forEach((clone) => {
      clone.age++;
      ctx.save();
      ctx.globalAlpha = Math.max(0.2, 1 - clone.age / clone.lifetime);
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(100, 230, 255, 0.7)';
      ctx.fillRect(clone.x - 35, clone.y - 170, 70, 170);
      ctx.restore();
    });
  }

  // ==========================================
  // FIGHTER SPRITE & AVATAR RENDERING
  // ==========================================

  drawFighter(fighter, engine) {
    const ctx = this.ctx;
    ctx.save();

    const x = fighter.x;
    const y = fighter.y;
    const facing = fighter.facing;
    const isP1 = fighter.isP1;
    const col = fighter.data.color || '#ffaa00';
    const accentCol = fighter.data.accentColor || '#ffffff';

    // Flip context horizontally if facing left
    ctx.translate(x, y);
    ctx.scale(facing, 1);

    // Dynamic animation offsets based on state
    let bodyBob = 0;
    let armAngleL = 0;
    let armAngleR = 0;
    let legAngleL = 0;
    let legAngleR = 0;
    let headOffsetY = 0;
    let punchOffset = 0;
    let kickOffset = 0;

    const st = fighter.stateTime;

    // 1. Idle breathing
    if (fighter.state === 'idle') {
      bodyBob = Math.sin(st * 0.12) * 4;
      armAngleL = 0.2 + Math.sin(st * 0.12) * 0.08;
      armAngleR = -0.3 + Math.sin(st * 0.12) * 0.08;
    }
    // 2. Walking
    else if (fighter.state === 'walk_fwd' || fighter.state === 'walk_bwd') {
      bodyBob = Math.abs(Math.sin(st * 0.2)) * 6;
      legAngleL = Math.sin(st * 0.2) * 0.45;
      legAngleR = -Math.sin(st * 0.2) * 0.45;
      armAngleL = -Math.sin(st * 0.2) * 0.4;
      armAngleR = Math.sin(st * 0.2) * 0.4;
    }
    // 3. Crouching
    else if (fighter.state.startsWith('crouch')) {
      headOffsetY = 45;
      bodyBob = 50;
      legAngleL = 0.6;
      legAngleR = 0.6;
      if (fighter.state === 'crouch_punch') punchOffset = 30;
      if (fighter.state === 'crouch_punch_heavy') punchOffset = 45;
      if (fighter.state === 'crouch_kick') kickOffset = 50;
    }
    // 4. Punching
    else if (fighter.state === 'punch_light') {
      punchOffset = Math.sin((st / 16) * Math.PI) * 45;
    } else if (fighter.state === 'punch_heavy') {
      punchOffset = Math.sin((st / 24) * Math.PI) * 60;
      headOffsetY = -10;
    }
    // 5. Kicking
    else if (fighter.state === 'kick_light') {
      kickOffset = Math.sin((st / 18) * Math.PI) * 50;
    } else if (fighter.state === 'kick_heavy') {
      kickOffset = Math.sin((st / 26) * Math.PI) * 75;
    }
    // 6. Block
    else if (fighter.state === 'block' || fighter.state === 'crouch_block') {
      armAngleL = 1.1;
      armAngleR = 1.1;
      // Shield Aura
      ctx.save();
      ctx.strokeStyle = accentCol;
      ctx.lineWidth = 4;
      ctx.shadowColor = accentCol;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(35, -90, 60, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();
      ctx.restore();
    }
    // 7. Hurt
    else if (fighter.state === 'hurt') {
      headOffsetY = 15;
      bodyBob = 10;
      armAngleL = -0.5;
      armAngleR = -0.5;
    }
    // 8. Knockdown
    else if (fighter.state === 'knockdown') {
      ctx.rotate(-0.8);
      headOffsetY = 20;
    }
    // 9. Dazed (Finish Him)
    else if (fighter.state === 'dazed') {
      bodyBob = Math.sin(st * 0.1) * 8;
      headOffsetY = Math.sin(st * 0.15) * 6;
      armAngleL = -0.3 + Math.sin(st * 0.1) * 0.2;
      armAngleR = -0.3 - Math.sin(st * 0.1) * 0.2;

      // Swirling stars above head
      for (let i = 0; i < 3; i++) {
        const starAngle = st * 0.1 + (i * Math.PI * 2) / 3;
        const sx = Math.cos(starAngle) * 35;
        const sy = -190 + Math.sin(starAngle) * 12;
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Shadow on ground
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 45, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Legs
    ctx.fillStyle = '#111116';
    // Back leg
    ctx.save();
    ctx.translate(-15, -60 + bodyBob);
    ctx.rotate(legAngleR);
    ctx.fillRect(-12, 0, 24, 60 - bodyBob);
    ctx.fillStyle = col;
    ctx.fillRect(-13, 30 - bodyBob * 0.5, 26, 30); // Shin guard
    ctx.restore();

    // Front leg
    ctx.save();
    ctx.translate(15, -60 + bodyBob);
    ctx.rotate(legAngleL);
    if (kickOffset > 0) {
      // Extended kick
      ctx.fillStyle = '#111116';
      ctx.fillRect(-10, -10, 60 + kickOffset, 24);
      ctx.fillStyle = col;
      ctx.fillRect(30, -12, 35 + kickOffset, 28);
    } else {
      ctx.fillStyle = '#111116';
      ctx.fillRect(-12, 0, 24, 60 - bodyBob);
      ctx.fillStyle = col;
      ctx.fillRect(-13, 30 - bodyBob * 0.5, 26, 30);
    }
    ctx.restore();

    // Torso / Martial Gi / Armor
    ctx.fillStyle = col;
    ctx.fillRect(-28, -130 + bodyBob, 56, 75);

    // Belt & Vest trim
    ctx.fillStyle = accentCol;
    ctx.fillRect(-30, -75 + bodyBob, 60, 12); // Belt
    ctx.fillStyle = '#111116';
    ctx.fillRect(-14, -130 + bodyBob, 28, 75); // Inner tunic

    // Arms
    // Back Arm
    ctx.save();
    ctx.fillStyle = col;
    ctx.translate(-22, -120 + bodyBob);
    ctx.rotate(armAngleR);
    ctx.fillRect(-10, 0, 20, 50);
    ctx.fillStyle = accentCol;
    ctx.fillRect(-11, 25, 22, 25); // Gauntlet
    ctx.restore();

    // Front Arm / Punch
    ctx.save();
    ctx.fillStyle = col;
    ctx.translate(22, -120 + bodyBob);
    if (punchOffset > 0) {
      // Extended punch
      ctx.fillRect(0, -12, 45 + punchOffset, 24);
      ctx.fillStyle = accentCol;
      ctx.fillRect(25, -14, 25 + punchOffset, 28);
      // Fist glow
      ctx.shadowColor = col;
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(45 + punchOffset, 0, 14, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.rotate(armAngleL);
      ctx.fillRect(-10, 0, 20, 50);
      ctx.fillStyle = accentCol;
      ctx.fillRect(-11, 25, 22, 25);
    }
    ctx.restore();

    // Head / Avatar Photo Face
    const avatarImg = this.loadedImages.get(fighter.data.avatar);
    const headX = 0;
    const headY = -145 + bodyBob + headOffsetY;
    const headRadius = 32;

    ctx.save();
    // Ninja Hood / Mask boundary
    ctx.beginPath();
    ctx.arc(headX, headY, headRadius + 4, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();

    // Circular clip for avatar image
    ctx.beginPath();
    ctx.arc(headX, headY, headRadius, 0, Math.PI * 2);
    ctx.clip();

    if (avatarImg && avatarImg.complete) {
      ctx.drawImage(avatarImg, headX - headRadius, headY - headRadius, headRadius * 2, headRadius * 2);
    } else {
      // Fallback head drawing
      ctx.fillStyle = '#ffccaa';
      ctx.fillRect(headX - headRadius, headY - headRadius, headRadius * 2, headRadius * 2);
      ctx.fillStyle = '#000000';
      ctx.fillRect(headX + 5, headY - 5, 8, 8); // Eye
    }
    ctx.restore();

    // Ninja Mask / Headband Overlay
    ctx.fillStyle = col;
    ctx.fillRect(headX - headRadius, headY + 5, headRadius * 2, 22); // Lower mask
    ctx.fillStyle = accentCol;
    ctx.fillRect(headX - headRadius - 4, headY - headRadius + 4, (headRadius + 4) * 2, 10); // Headband

    // Glowing Eyes
    ctx.save();
    ctx.shadowColor = accentCol;
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(headX + 8, headY - 6, 7, 5);
    ctx.restore();

    // Frozen state: solid ice overlay
    if (fighter.freezeTimer > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(100, 220, 255, 0.65)';
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 20;
      ctx.fillRect(-45, -180, 90, 185);
      ctx.restore();
    }

    // Gigachad Hyper Armor: gold shimmer
    if (fighter.armorTimer > 0) {
      ctx.save();
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 20;
      ctx.strokeRect(-35, -170, 70, 170);
      ctx.restore();
    }

    ctx.restore();
  }

  // ==========================================
  // PROJECTILES RENDERING
  // ==========================================

  drawProjectiles(engine) {
    const ctx = this.ctx;

    engine.projectiles.forEach((p) => {
      ctx.save();
      const x = p.x;
      const y = p.y;

      if (p.type === 'spear') {
        // Scorpion Hell Spear & Linked Chain
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(p.fighter.x + p.fighter.facing * 50, p.fighter.y - 110);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Spear head
        ctx.fillStyle = '#ffdd44';
        ctx.shadowColor = '#ff6600';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(x + p.dir * 25, y);
        ctx.lineTo(x - p.dir * 15, y - 12);
        ctx.lineTo(x - p.dir * 15, y + 12);
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'freeze') {
        // Sub-Zero Ice Snowflake Blast
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 4;
        for (let a = 0; a < 6; a++) {
          const angle = (a * Math.PI) / 3 + p.age * 0.1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(angle) * 30, y + Math.sin(angle) * 30);
          ctx.stroke();
        }
      } else if (p.type === 'fireball') {
        // Liu Kang Fireball
        ctx.shadowColor = '#ff3300';
        ctx.shadowBlur = 25;
        const grad = ctx.createRadialGradient(x, y, 5, x, y, 25);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.5, '#ffaa00');
        grad.addColorStop(1, 'rgba(255, 30, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'lightning') {
        // Raiden Lightning Bolt
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(x - p.dir * 35, y);
        ctx.lineTo(x - p.dir * 15, y - 15);
        ctx.lineTo(x + p.dir * 10, y + 12);
        ctx.lineTo(x + p.dir * 35, y);
        ctx.stroke();
      } else if (p.type === 'mewing') {
        // Gigachad Jawline Shockwave
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(x, y, 40, -Math.PI / 2, Math.PI / 2, p.dir === -1);
        ctx.stroke();
      } else if (p.type === 'snore') {
        // Slumber "ZZZ..."
        ctx.font = 'bold 36px "Segoe UI", sans-serif';
        ctx.fillStyle = '#d8b4e2';
        ctx.shadowColor = '#9b5de5';
        ctx.shadowBlur = 12;
        ctx.fillText('Zzz...', x - 30, y + 10);
      } else if (p.type === 'shadow') {
        // Shadow Clone
        ctx.fillStyle = 'rgba(10, 5, 20, 0.9)';
        ctx.shadowColor = '#9d4edd';
        ctx.shadowBlur = 20;
        ctx.fillRect(x - 30, y - 60, 60, 120);
      }

      ctx.restore();
    });
  }

  // ==========================================
  // PARTICLES & EFFECTS RENDERING
  // ==========================================

  drawParticles(engine) {
    const ctx = this.ctx;

    // Blood Particles
    engine.bloodParticles.forEach((p) => {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Damage Popups
    engine.damagePopups.forEach((d) => {
      ctx.save();
      ctx.font = d.isHeavy ? 'bold 32px "Impact", sans-serif' : 'bold 24px "Impact", sans-serif';
      ctx.fillStyle = d.isHeavy ? '#ff3300' : '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.shadowColor = d.isHeavy ? '#ff0000' : '#ffff00';
      ctx.shadowBlur = 10;
      ctx.globalAlpha = d.alpha;

      const txt = `${d.damage}`;
      ctx.strokeText(txt, d.x, d.y);
      ctx.fillText(txt, d.x, d.y);
      ctx.restore();
    });

    // Special Effects (Explosions / Screen Dims)
    engine.effects.forEach((e) => {
      ctx.save();
      if (e.type === 'screen_dim') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(0, 0, this.width, this.height);
      } else if (e.type === 'spark') {
        ctx.strokeStyle = e.color;
        ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(e.x, e.y);
          ctx.lineTo(e.x + Math.cos(a) * e.radius, e.y + Math.sin(a) * e.radius);
          ctx.stroke();
        }
      } else if (e.type === 'explosion') {
        ctx.fillStyle = e.color;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 30;
        ctx.globalAlpha = Math.max(0, 1 - e.age / e.lifetime);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  // ==========================================
  // MORTAL KOMBAT HUD
  // ==========================================

  drawHUD(engine) {
    const ctx = this.ctx;
    ctx.save();

    const p1 = engine.p1;
    const p2 = engine.p2;

    const barWidth = 460;
    const barHeight = 28;
    const topY = 35;

    // 1. P1 Health Bar (Left to Right)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(60, topY, barWidth, barHeight);
    ctx.fillStyle = '#ff2200'; // Underlayer
    ctx.fillRect(60, topY, barWidth, barHeight);

    const p1HpRatio = Math.max(0, p1.hp / p1.maxHp);
    const p1Grad = ctx.createLinearGradient(60, 0, 60 + barWidth, 0);
    p1Grad.addColorStop(0, '#00ff66');
    p1Grad.addColorStop(0.7, '#ffdd00');
    p1Grad.addColorStop(1, '#ff3300');
    ctx.fillStyle = p1Grad;
    ctx.fillRect(60, topY, barWidth * p1HpRatio, barHeight);

    // P1 Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, topY, barWidth, barHeight);

    // 2. P2 Health Bar (Right to Left)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(this.width - 60 - barWidth, topY, barWidth, barHeight);
    ctx.fillStyle = '#ff2200';
    ctx.fillRect(this.width - 60 - barWidth, topY, barWidth, barHeight);

    const p2HpRatio = Math.max(0, p2.hp / p2.maxHp);
    const p2Grad = ctx.createLinearGradient(this.width - 60, 0, this.width - 60 - barWidth, 0);
    p2Grad.addColorStop(0, '#00ff66');
    p2Grad.addColorStop(0.7, '#ffdd00');
    p2Grad.addColorStop(1, '#ff3300');
    ctx.fillStyle = p2Grad;
    ctx.fillRect(this.width - 60 - barWidth * p2HpRatio, topY, barWidth * p2HpRatio, barHeight);

    // P2 Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.width - 60 - barWidth, topY, barWidth, barHeight);

    // Names in Mortal Kombat Font
    ctx.font = 'bold 24px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#ffcc00';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 6;
    ctx.fillText(p1.data.name.toUpperCase(), 65, topY + barHeight + 26);
    ctx.textAlign = 'right';
    ctx.fillText(p2.data.name.toUpperCase(), this.width - 65, topY + barHeight + 26);
    ctx.textAlign = 'left';

    // Round Win Tokens (Dragon Medals)
    for (let r = 0; r < 2; r++) {
      ctx.fillStyle = r < p1.roundsWon ? '#ff2200' : '#444444';
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(60 + barWidth - 25 - r * 28, topY + barHeight + 16, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = r < p2.roundsWon ? '#ff2200' : '#444444';
      ctx.beginPath();
      ctx.arc(this.width - 60 - barWidth + 25 + r * 28, topY + barHeight + 16, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 3. Center Timer (99s)
    ctx.fillStyle = 'rgba(10, 5, 15, 0.9)';
    ctx.fillRect(this.width / 2 - 40, topY - 10, 80, 60);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.width / 2 - 40, topY - 10, 80, 60);

    ctx.font = 'bold 38px "Impact", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = engine.roundTime <= 10 ? '#ff1100' : '#ffffff';
    ctx.shadowColor = engine.roundTime <= 10 ? '#ff0000' : '#ffaa00';
    ctx.shadowBlur = 10;
    ctx.fillText(`${engine.roundTime}`, this.width / 2, topY + 34);
    ctx.textAlign = 'left';

    // 4. Super Meters (Bottom Corners)
    const superW = 260;
    const superH = 18;
    const botY = this.height - 40;

    // P1 Super Meter
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(60, botY, superW, superH);
    ctx.fillStyle = p1.superMeter >= 100 ? '#ffd700' : '#00b4d8';
    ctx.fillRect(60, botY, superW * (p1.superMeter / 100), superH);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, botY, superW, superH);

    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(p1.superMeter >= 100 ? '★ FATAL BLOW READY (SPACE) ★' : 'SUPER METER', 65, botY - 6);

    // P2 Super Meter
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(this.width - 60 - superW, botY, superW, superH);
    ctx.fillStyle = p2.superMeter >= 100 ? '#ffd700' : '#00b4d8';
    ctx.fillRect(this.width - 60 - superW * (p2.superMeter / 100), botY, superW * (p2.superMeter / 100), superH);
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.width - 60 - superW, botY, superW, superH);

    ctx.textAlign = 'right';
    ctx.fillText(p2.superMeter >= 100 ? '★ FATAL BLOW READY ★' : 'SUPER METER', this.width - 65, botY - 6);
    ctx.textAlign = 'left';

    // 5. Combo Hits Display
    if (p1.comboHits >= 2 && p1.comboTimer > 0) {
      ctx.font = 'bold 36px "Impact", sans-serif';
      ctx.fillStyle = '#ffcc00';
      ctx.shadowColor = '#ff2200';
      ctx.shadowBlur = 15;
      ctx.fillText(`${p1.comboHits} HITS!`, 70, 160);
      ctx.font = 'bold 20px "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${p1.comboDamage} DAMAGE`, 70, 190);
    }

    if (p2.comboHits >= 2 && p2.comboTimer > 0) {
      ctx.textAlign = 'right';
      ctx.font = 'bold 36px "Impact", sans-serif';
      ctx.fillStyle = '#ffcc00';
      ctx.shadowColor = '#ff2200';
      ctx.shadowBlur = 15;
      ctx.fillText(`${p2.comboHits} HITS!`, this.width - 70, 160);
      ctx.font = 'bold 20px "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${p2.comboDamage} DAMAGE`, this.width - 70, 190);
      ctx.textAlign = 'left';
    }

    ctx.restore();
  }

  // ==========================================
  // ANNOUNCEMENTS & BANNERS
  // ==========================================

  drawAnnouncements(engine) {
    const ctx = this.ctx;
    ctx.save();
    ctx.textAlign = 'center';

    const cx = this.width / 2;
    const cy = this.height / 2 - 30;

    // 1. Intro Banner: ROUND X ... FIGHT!
    if (engine.state === 'intro') {
      const t = engine.stateTimer;
      ctx.font = 'bold 72px "Impact", sans-serif';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 8;

      if (t < 50) {
        const roundName = engine.round === 1 ? 'ROUND 1' : engine.round === 2 ? 'ROUND 2' : 'FINAL ROUND';
        ctx.fillStyle = '#ffdd00';
        ctx.shadowColor = '#ff2200';
        ctx.shadowBlur = 25;
        ctx.strokeText(roundName, cx, cy);
        ctx.fillText(roundName, cx, cy);
      } else {
        ctx.fillStyle = '#ff1100';
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 35;
        ctx.strokeText('FIGHT!', cx, cy);
        ctx.fillText('FIGHT!', cx, cy);
      }
    }

    // 2. FINISH HIM! Banner
    else if (engine.state === 'finish_him') {
      const pulse = Math.sin(engine.stateTimer * 0.2) * 8;
      ctx.font = `bold ${80 + pulse}px "Impact", sans-serif`;
      ctx.fillStyle = '#ff0000';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 10;
      ctx.shadowColor = '#ff0000';
      ctx.shadowBlur = 30;

      ctx.strokeText('FINISH HIM!', cx, cy);
      ctx.fillText('FINISH HIM!', cx, cy);

      // Subtitle prompt for player
      ctx.font = 'bold 26px "Segoe UI", sans-serif';
      ctx.fillStyle = '#ffd700';
      ctx.shadowBlur = 10;
      ctx.fillText('กดปุ่ม [ F ] หรือแตะปุ่ม FATALITY สีแดงเพื่อสังหาร!', cx, cy + 70);
    }

    // 3. FATALITY Banner
    else if (engine.state === 'fatality') {
      const t = engine.stateTimer;
      if (t >= 70) {
        ctx.font = 'bold 96px "Impact", sans-serif';
        ctx.fillStyle = '#cc0000';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 40;

        ctx.strokeText('FATALITY', cx, cy - 20);
        ctx.fillText('FATALITY', cx, cy - 20);

        if (t >= 150) {
          ctx.font = 'bold 34px "Impact", sans-serif';
          ctx.fillStyle = '#ffd700';
          ctx.shadowBlur = 15;
          const winnerText = `${engine.fatalityPerformer.name.toUpperCase()} WINS!`;
          ctx.fillText(winnerText, cx, cy + 60);

          if (engine.isFlawless) {
            ctx.fillStyle = '#00ffff';
            ctx.fillText('FLAWLESS VICTORY!', cx, cy + 105);
          }
        }
      }
    }

    // 4. Round Over / Decisive Win Banner
    else if (engine.state === 'round_over' || engine.state === 'match_over') {
      ctx.font = 'bold 64px "Impact", sans-serif';
      ctx.fillStyle = '#ffd700';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#ff5500';
      ctx.shadowBlur = 20;

      const winnerText = engine.winner ? `${engine.winner.name.toUpperCase()} WINS!` : 'MATCH OVER';
      ctx.strokeText(winnerText, cx, cy);
      ctx.fillText(winnerText, cx, cy);
    }

    ctx.restore();
  }
}
