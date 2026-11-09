/**
 * Ashi Kombat - Canvas Renderer & Particle System
 * Handles 60 FPS graphics, stage rendering, fighter puppet animations,
 * dynamic chroma-key sprite masking, visual FX, and Mortal Kombat HUD.
 */

export class CombatRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 1280;
    this.height = 720;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.particles = [];
    this.cachedCutouts = new Map();
    this.images = new Map();
    this.shakeIntensity = 0;
    this.flashAlpha = 0;
    this.flashColor = '#ffffff';
    this.toastyTimer = 0;
    this.banner = null; // { text, subtext, color, scale, alpha, timer }
  }

  // Preload and chroma-key fighter images
  preloadFighterImages(fighters) {
    fighters.forEach((f) => {
      if (this.images.has(f.id)) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = f.portrait;
      img.onload = () => {
        this.images.set(f.id, img);
        this.generateCutout(f, img);
      };
    });
  }

  // Generate transparent cutout from solid backgrounds (blue, white, dark)
  generateCutout(fighter, img) {
    const offCanvas = document.createElement('canvas');
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    offCanvas.width = w;
    offCanvas.height = h;
    const octx = offCanvas.getContext('2d');
    octx.drawImage(img, 0, 0);

    const imgData = octx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const key = fighter.keyColor;
    const [kr, kg, kb] = fighter.keyColorRGB || [255, 255, 255];

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (key === 'blue') {
        // Remove studio blue background: blue is dominant and significantly higher than red
        if (b > 110 && b > r + 35 && b > g + 15) {
          data[i + 3] = 0;
        }
      } else if (key === 'white') {
        // Remove studio white background
        if (r > 215 && g > 215 && b > 215) {
          data[i + 3] = 0;
        }
      } else if (key === 'black' || key === 'dark') {
        // Remove dark background
        if (r < 25 && g < 25 && b < 25) {
          data[i + 3] = 0;
        }
      }
    }

    octx.putImageData(imgData, 0, 0);
    this.cachedCutouts.set(fighter.id, offCanvas);
  }

  triggerScreenShake(intensity = 15) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }

  triggerFlash(color = '#ffffff', alpha = 0.8) {
    this.flashColor = color;
    this.flashAlpha = alpha;
  }

  triggerToasty() {
    this.toastyTimer = 90; // ~1.5s
  }

  showBanner(text, subtext = '', color = '#ff2222', duration = 120) {
    this.banner = {
      text,
      subtext,
      color,
      timer: duration,
      maxTimer: duration
    };
  }

  // Add blood splatters
  spawnBlood(x, y, count = 18, heavy = false) {
    for (let i = 0; i < count; i++) {
      const speed = heavy ? (4 + Math.random() * 12) : (2 + Math.random() * 8);
      const angle = Math.random() * Math.PI * 2;
      this.particles.push({
        type: 'blood',
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (heavy ? 4 : 2),
        size: Math.random() * (heavy ? 6 : 4) + 2,
        alpha: 1.0,
        decay: 0.015 + Math.random() * 0.02,
        gravity: 0.45,
        color: Math.random() > 0.3 ? '#bb0a0a' : '#880000'
      });
    }
  }

  // Add sparks / flame / projectile particles
  spawnFX(type, x, y, options = {}) {
    const count = options.count || 10;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (options.speed || 6) + 1;
      this.particles.push({
        type,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (options.upward ? 3 : 0),
        size: Math.random() * (options.size || 5) + 2,
        alpha: 1.0,
        decay: options.decay || (0.02 + Math.random() * 0.03),
        gravity: options.gravity !== undefined ? options.gravity : 0.15,
        color: options.color || '#ffaa00'
      });
    }
  }

  // Main Render Loop
  render(gameState) {
    const ctx = this.ctx;
    ctx.save();

    // Screen Shake Offset
    if (this.shakeIntensity > 0) {
      const sx = (Math.random() * 2 - 1) * this.shakeIntensity;
      const sy = (Math.random() * 2 - 1) * this.shakeIntensity;
      ctx.translate(sx, sy);
      this.shakeIntensity *= 0.88;
      if (this.shakeIntensity < 0.5) this.shakeIntensity = 0;
    }

    // 1. Render Stage
    this.renderStage(gameState.stage, gameState.time);

    // 2. Render Projectiles & Shadows
    this.renderShadows(gameState.p1, gameState.p2);
    this.renderProjectiles(gameState.projectiles);

    // 3. Render Fighters
    this.renderFighter(gameState.p1, gameState.p2, 1);
    this.renderFighter(gameState.p2, gameState.p1, -1);

    // 4. Render Particles
    this.updateAndRenderParticles();

    // 5. Screen Flash
    if (this.flashAlpha > 0) {
      ctx.fillStyle = this.flashColor;
      ctx.globalAlpha = this.flashAlpha;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.globalAlpha = 1.0;
      this.flashAlpha -= 0.05;
      if (this.flashAlpha < 0) this.flashAlpha = 0;
    }

    // 6. Toasty Easter Egg Popup
    if (this.toastyTimer > 0) {
      this.renderToasty();
      this.toastyTimer--;
    }

    // 7. Render Mortal Kombat HUD
    this.renderHUD(gameState);

    // 8. Render Central Announcement Banners
    if (this.banner && this.banner.timer > 0) {
      this.renderBanner();
      this.banner.timer--;
    }

    ctx.restore();
  }

  // --- Stage Rendering ---
  renderStage(stage, time = 0) {
    const ctx = this.ctx;
    const stageId = stage?.id || 'temple';

    if (stageId === 'temple') {
      // Ashi Shinto Temple - Fiery Red Night
      const grad = ctx.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0, '#1c0505');
      grad.addColorStop(0.65, '#401212');
      grad.addColorStop(1, '#0e0202');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.width, this.height);

      // Huge Crimson Blood Moon
      ctx.fillStyle = '#ff3311';
      ctx.beginPath();
      ctx.arc(640, 180, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1c0505';
      ctx.beginPath();
      ctx.arc(670, 170, 110, 0, Math.PI * 2);
      ctx.fill();

      // Distant Pagoda silhouettes
      ctx.fillStyle = '#150606';
      this.drawPagoda(ctx, 160, 480, 1.2);
      this.drawPagoda(ctx, 1120, 480, 1.2);

      // Stone Pillars & Flaming Torches
      this.drawFlamingBrazier(ctx, 180, 500, time);
      this.drawFlamingBrazier(ctx, 1100, 500, time);

      // Ground Arena Floor
      const floorGrad = ctx.createLinearGradient(0, 540, 0, this.height);
      floorGrad.addColorStop(0, '#3a1b1b');
      floorGrad.addColorStop(0.2, '#241010');
      floorGrad.addColorStop(1, '#110505');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, 540, this.width, this.height - 540);

      // Stone Tiles & Dragon Engravings
      ctx.strokeStyle = '#522525';
      ctx.lineWidth = 3;
      for (let x = 0; x <= this.width; x += 120) {
        ctx.beginPath();
        ctx.moveTo(x, 540);
        ctx.lineTo(x + (x - 640) * 0.4, this.height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, 540);
      ctx.lineTo(this.width, 540);
      ctx.stroke();

    } else if (stageId === 'comlab') {
      // Computer Lab 101 - Cyber Arena
      ctx.fillStyle = '#060d17';
      ctx.fillRect(0, 0, this.width, this.height);

      // Cyber Matrix Grid
      ctx.strokeStyle = '#00e5ff18';
      ctx.lineWidth = 1;
      for (let x = 0; x < this.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 540);
        ctx.stroke();
      }

      // Computer Monitors in background with blinking code
      for (let i = 0; i < 6; i++) {
        const mx = 120 + i * 180;
        ctx.fillStyle = '#0c1a2d';
        ctx.fillRect(mx, 320, 120, 90);
        ctx.fillStyle = (Math.sin(time * 0.05 + i) > 0) ? '#00e5ff33' : '#00ff8822';
        ctx.fillRect(mx + 6, 326, 108, 78);
      }

      // Floor
      const floorGrad = ctx.createLinearGradient(0, 540, 0, this.height);
      floorGrad.addColorStop(0, '#102236');
      floorGrad.addColorStop(1, '#050c14');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, 540, this.width, this.height - 540);

      // Blue neon ground strip
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, 540);
      ctx.lineTo(this.width, 540);
      ctx.stroke();

    } else if (stageId === 'rooftop') {
      // Rooftop of Destiny - Stormy Sunset Skyline
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#120b22');
      grad.addColorStop(0.5, '#3b1c45');
      grad.addColorStop(1, '#ff6b35');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.width, this.height);

      // Skyline Buildings
      ctx.fillStyle = '#11071a';
      for (let i = 0; i < 15; i++) {
        const bx = i * 90;
        const bh = 150 + Math.sin(i * 1.7) * 80;
        ctx.fillRect(bx, 540 - bh, 80, bh);
      }

      // Floor
      ctx.fillStyle = '#22192f';
      ctx.fillRect(0, 540, this.width, this.height - 540);
      ctx.strokeStyle = '#b388ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 540);
      ctx.lineTo(this.width, 540);
      ctx.stroke();

    } else {
      // Urinal Pit - Yellow Tile Bathroom
      ctx.fillStyle = '#1f1b0a';
      ctx.fillRect(0, 0, this.width, this.height);

      // Tile grid
      ctx.strokeStyle = '#4a421b';
      ctx.lineWidth = 2;
      for (let y = 0; y < 540; y += 45) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(this.width, y);
        ctx.stroke();
      }
      for (let x = 0; x < this.width; x += 45) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 540);
        ctx.stroke();
      }

      // Floor
      ctx.fillStyle = '#302a12';
      ctx.fillRect(0, 540, this.width, this.height - 540);
      ctx.strokeStyle = '#ffd600';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 540);
      ctx.lineTo(this.width, 540);
      ctx.stroke();
    }
  }

  drawPagoda(ctx, x, y, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    for (let r = 0; r < 4; r++) {
      const ry = -r * 50;
      ctx.beginPath();
      ctx.moveTo(-50 - r * 10, ry);
      ctx.lineTo(50 + r * 10, ry);
      ctx.lineTo(35 + r * 8, ry - 35);
      ctx.lineTo(-35 - r * 8, ry - 35);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  drawFlamingBrazier(ctx, x, y, time) {
    ctx.save();
    ctx.fillStyle = '#2a1212';
    ctx.fillRect(x - 20, y, 40, 50);
    ctx.fillRect(x - 30, y - 10, 60, 15);

    // Dancing fire flame
    for (let i = 0; i < 5; i++) {
      const flicker = Math.sin(time * 0.15 + i * 2) * 8;
      const flameGrad = ctx.createRadialGradient(x + flicker * 0.5, y - 25, 2, x, y - 25, 30);
      flameGrad.addColorStop(0, '#ffff55');
      flameGrad.addColorStop(0.4, '#ff5500');
      flameGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.arc(x + flicker, y - 25, 25, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // --- Shadows & Projectiles ---
  renderShadows(p1, p2) {
    const ctx = this.ctx;
    [p1, p2].forEach((p) => {
      if (!p) return;
      const groundY = 540;
      const heightAbove = Math.max(0, groundY - p.y);
      const scale = Math.max(0.3, 1 - heightAbove / 400);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(p.x, groundY, 48 * scale, 14 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  renderProjectiles(projectiles = []) {
    const ctx = this.ctx;
    projectiles.forEach((proj) => {
      ctx.save();
      ctx.translate(proj.x, proj.y);

      if (proj.fx === 'fire') {
        const rad = ctx.createRadialGradient(0, 0, 4, 0, 0, 26);
        rad.addColorStop(0, '#ffffff');
        rad.addColorStop(0.3, '#ffcc00');
        rad.addColorStop(0.7, '#ff3300');
        rad.addColorStop(1, 'transparent');
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();

        // Trail particles
        this.spawnFX('fire', proj.x - proj.vx * 2, proj.y, { count: 2, size: 4, speed: 2, decay: 0.08 });
      } else if (proj.fx === 'web_ball') {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 3;
        ctx.stroke();
      } else {
        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });
  }

  // --- Fighter Puppet Rendering ---
  renderFighter(p, opponent, defaultFacing = 1) {
    if (!p) return;
    const ctx = this.ctx;
    ctx.save();

    const facing = p.x < opponent.x ? 1 : -1;
    ctx.translate(p.x, p.y);
    ctx.scale(facing, 1);

    const cutout = this.cachedCutouts.get(p.fighter.id);
    const rawImg = this.images.get(p.fighter.id);
    const sprite = cutout || rawImg;

    // Animation state transforms
    const anim = p.animState || 'idle';
    let offsetY = 0;
    let rotation = 0;
    let punchExt = 0;
    let kickExt = 0;
    let squishY = 1;

    if (anim === 'idle') {
      offsetY = Math.sin(p.stateTimer * 0.12) * 5;
    } else if (anim === 'walk') {
      offsetY = Math.abs(Math.sin(p.stateTimer * 0.2)) * 12;
      rotation = Math.sin(p.stateTimer * 0.2) * 0.08;
    } else if (anim === 'crouch') {
      squishY = 0.65;
      offsetY = 35;
    } else if (anim === 'jump') {
      offsetY = -10;
    } else if (anim === 'punch') {
      punchExt = 35;
      rotation = 0.05;
    } else if (anim === 'uppercut') {
      punchExt = 45;
      offsetY = -25;
      rotation = -0.15;
    } else if (anim === 'kick') {
      kickExt = 45;
      rotation = -0.1;
    } else if (anim === 'block') {
      squishY = 0.9;
      rotation = -0.08;
    } else if (anim === 'hurt') {
      rotation = -0.25;
      offsetY = 10;
    } else if (anim === 'dizzy') {
      rotation = Math.sin(p.stateTimer * 0.1) * 0.15;
    } else if (anim === 'victory') {
      offsetY = Math.sin(p.stateTimer * 0.1) * 8 - 15;
    }

    ctx.translate(0, offsetY);
    ctx.rotate(rotation);
    ctx.scale(1, squishY);

    // 1. Draw Body / Portrait Sprite
    if (sprite) {
      const targetH = 220;
      const aspect = sprite.width / (sprite.height || 1);
      const targetW = targetH * aspect;

      // Glow effect if in Super / Rage
      if (p.isSuperMode) {
        ctx.shadowColor = '#ff2200';
        ctx.shadowBlur = 25;
      }

      // Draw stylized card or character cutout
      ctx.drawImage(sprite, -targetW / 2, -targetH, targetW, targetH);
      ctx.shadowBlur = 0;
    } else {
      // Fallback silhouette
      ctx.fillStyle = p.fighter.themeColor || '#ff4400';
      ctx.fillRect(-35, -200, 70, 200);
    }

    // 2. Attack Extensions (Punch fist / Kick leg graphic)
    if (punchExt > 0) {
      ctx.fillStyle = '#ffaa33';
      ctx.beginPath();
      ctx.arc(35 + punchExt, -120, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Motion speedlines
      ctx.strokeStyle = '#ff3300';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(10, -120);
      ctx.lineTo(35 + punchExt, -120);
      ctx.stroke();
    }

    if (kickExt > 0) {
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(35 + kickExt, -40, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Arc swoosh
      ctx.strokeStyle = '#ffcc00';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(10, -30, 45, -0.4, 0.4);
      ctx.stroke();
    }

    // 3. Block Shield
    if (anim === 'block') {
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 6;
      ctx.fillStyle = 'rgba(0, 229, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(45, -110, 60, -Math.PI / 2.5, Math.PI / 2.5);
      ctx.stroke();
      ctx.fill();
    }

    // 4. Dizzy Stars
    if (anim === 'dizzy') {
      ctx.fillStyle = '#ffd700';
      for (let i = 0; i < 3; i++) {
        const starAngle = p.stateTimer * 0.15 + (i * Math.PI * 2) / 3;
        const sx = Math.cos(starAngle) * 45;
        const sy = -225 + Math.sin(starAngle) * 15;
        ctx.beginPath();
        ctx.arc(sx, sy, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  // --- Particles Update & Render ---
  updateAndRenderParticles() {
    const ctx = this.ctx;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += pt.gravity;
      pt.alpha -= pt.decay;

      if (pt.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.alpha);
      ctx.fillStyle = pt.color;

      if (pt.type === 'blood') {
        // Sticky blood drip
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (pt.type === 'fire') {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size * (1 + (1 - pt.alpha)), 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(pt.x - pt.size / 2, pt.y - pt.size / 2, pt.size, pt.size);
      }
      ctx.restore();
    }
  }

  // --- Toasty Popup ---
  renderToasty() {
    const ctx = this.ctx;
    ctx.save();
    const progress = Math.sin((this.toastyTimer / 90) * Math.PI);
    const tx = this.width - 140 * progress;
    const ty = this.height - 130;

    // Yellow cartoon bubble
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(tx, ty, 130, 90);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeRect(tx, ty, 130, 90);

    ctx.fillStyle = '#ff2200';
    ctx.font = '900 24px Impact';
    ctx.textAlign = 'center';
    ctx.fillText('TOASTY!', tx + 65, ty + 52);
    ctx.restore();
  }

  // --- Mortal Kombat HUD ---
  renderHUD(gameState) {
    const ctx = this.ctx;
    ctx.save();

    const barW = 480;
    const barH = 26;
    const topY = 40;

    // 1. Player 1 Health Bar (Green to Red with Red trail)
    const p1HpRatio = Math.max(0, gameState.p1.hp / gameState.p1.maxHp);
    const p1DrainRatio = Math.max(0, gameState.p1.drainHp / gameState.p1.maxHp);

    // Frame
    ctx.fillStyle = '#111111';
    ctx.fillRect(60, topY, barW, barH);
    ctx.strokeStyle = '#b8860b';
    ctx.lineWidth = 3;
    ctx.strokeRect(58, topY - 2, barW + 4, barH + 4);

    // Drain Red Bar
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(60 + barW * (1 - p1DrainRatio), topY, barW * p1DrainRatio, barH);

    // Current Green Bar (Drains from right to left)
    const p1Grad = ctx.createLinearGradient(60, 0, 60 + barW, 0);
    p1Grad.addColorStop(0, '#00ff44');
    p1Grad.addColorStop(1, '#a6ff00');
    ctx.fillStyle = p1Grad;
    ctx.fillRect(60 + barW * (1 - p1HpRatio), topY, barW * p1HpRatio, barH);

    // 2. Player 2 Health Bar (Left to Right)
    const p2HpRatio = Math.max(0, gameState.p2.hp / gameState.p2.maxHp);
    const p2DrainRatio = Math.max(0, gameState.p2.drainHp / gameState.p2.maxHp);

    ctx.fillStyle = '#111111';
    ctx.fillRect(740, topY, barW, barH);
    ctx.strokeStyle = '#b8860b';
    ctx.lineWidth = 3;
    ctx.strokeRect(738, topY - 2, barW + 4, barH + 4);

    // Drain Red Bar
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(740, topY, barW * p2DrainRatio, barH);

    // Current Green Bar
    const p2Grad = ctx.createLinearGradient(740, 0, 740 + barW, 0);
    p2Grad.addColorStop(0, '#a6ff00');
    p2Grad.addColorStop(1, '#00ff44');
    ctx.fillStyle = p2Grad;
    ctx.fillRect(740, topY, barW * p2HpRatio, barH);

    // 3. Round Timer (Center)
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(590, 24, 100, 56);
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 3;
    ctx.strokeRect(590, 24, 100, 56);

    ctx.font = '900 42px Impact';
    ctx.textAlign = 'center';
    ctx.fillStyle = gameState.roundTimer <= 10 ? '#ff1111' : '#ffea00';
    ctx.fillText(Math.ceil(gameState.roundTimer), 640, 68);

    // 4. Fighter Names & Round Medallions
    ctx.font = '900 22px Impact';
    ctx.fillStyle = '#ffeedd';
    ctx.textAlign = 'left';
    ctx.fillText(gameState.p1.fighter.name, 62, topY - 8);

    ctx.textAlign = 'right';
    ctx.fillText(gameState.p2.fighter.name, 1218, topY - 8);

    // Win Medallions (Dragon Skull icons)
    for (let i = 0; i < 2; i++) {
      ctx.fillStyle = i < gameState.p1.roundsWon ? '#ffd700' : '#444444';
      ctx.beginPath();
      ctx.arc(68 + i * 22, topY + barH + 14, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.stroke();

      ctx.fillStyle = i < gameState.p2.roundsWon ? '#ffd700' : '#444444';
      ctx.beginPath();
      ctx.arc(1212 - i * 22, topY + barH + 14, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#111';
      ctx.stroke();
    }

    // 5. Super / Rage Meters at Bottom
    this.renderSuperBar(ctx, 60, 680, gameState.p1.superMeter, 'P1 SUPER');
    this.renderSuperBar(ctx, 840, 680, gameState.p2.superMeter, 'P2 SUPER', true);

    // 6. Combo Counter Display
    if (gameState.p1.comboHits > 1) {
      this.renderComboCounter(ctx, 90, 240, gameState.p1.comboHits, gameState.p1.comboDamage);
    }
    if (gameState.p2.comboHits > 1) {
      this.renderComboCounter(ctx, 1190, 240, gameState.p2.comboHits, gameState.p2.comboDamage, true);
    }

    ctx.restore();
  }

  renderSuperBar(ctx, x, y, meter, label, reverse = false) {
    const w = 380;
    const h = 18;
    ctx.fillStyle = '#111';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    const ratio = Math.min(1.0, meter / 100);
    const grad = ctx.createLinearGradient(x, 0, x + w, 0);
    grad.addColorStop(0, '#00b4d8');
    grad.addColorStop(0.66, '#ffaa00');
    grad.addColorStop(1, '#ff0033');

    ctx.fillStyle = grad;
    if (reverse) {
      ctx.fillRect(x + w * (1 - ratio), y, w * ratio, h);
    } else {
      ctx.fillRect(x, y, w * ratio, h);
    }

    // Divisors for 3 bars (33%, 66%)
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.33, y);
    ctx.lineTo(x + w * 0.33, y + h);
    ctx.moveTo(x + w * 0.66, y);
    ctx.lineTo(x + w * 0.66, y + h);
    ctx.stroke();

    ctx.font = '900 13px Inter, sans-serif';
    ctx.fillStyle = meter >= 100 ? '#ffff00' : '#cccccc';
    ctx.textAlign = reverse ? 'right' : 'left';
    ctx.fillText(meter >= 100 ? '⚡ FATAL BLOW READY!' : label, reverse ? x + w : x, y - 5);
  }

  renderComboCounter(ctx, x, y, hits, damage, rightAlign = false) {
    ctx.save();
    ctx.textAlign = rightAlign ? 'right' : 'left';
    ctx.font = '900 44px Impact';
    ctx.fillStyle = '#ff2200';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeText(`${hits} HITS!`, x, y);
    ctx.fillText(`${hits} HITS!`, x, y);

    ctx.font = '700 20px Inter, sans-serif';
    ctx.fillStyle = '#ffea00';
    ctx.strokeText(`${Math.round(damage)} DAMAGE`, x, y + 26);
    ctx.fillText(`${Math.round(damage)} DAMAGE`, x, y + 26);
    ctx.restore();
  }

  // --- Central Announcement Banners ---
  renderBanner() {
    const ctx = this.ctx;
    const b = this.banner;
    const p = b.timer / b.maxTimer;
    const scale = 1.0 + Math.sin(p * Math.PI) * 0.25;

    ctx.save();
    ctx.translate(640, 280);
    ctx.scale(scale, scale);

    ctx.font = '900 76px Impact';
    ctx.textAlign = 'center';
    ctx.fillStyle = b.color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.strokeText(b.text, 0, 0);
    ctx.fillText(b.text, 0, 0);

    if (b.subtext) {
      ctx.font = '700 28px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.strokeText(b.subtext, 0, 45);
      ctx.fillText(b.subtext, 0, 45);
    }
    ctx.restore();
  }
}

