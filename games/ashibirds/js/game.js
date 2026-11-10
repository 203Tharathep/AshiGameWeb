// Ashi Birds - Rigid-Body Slingshot Physics Engine (Matter.js + Canvas 2D)
// Features: 7 Die-Cut Ashi Birds, 5 Die-Cut Ashi Pig Classes, 10 Grounded Levels,
// Real Trajectory Simulation, Zero Circle-Clipping, Full Desktop & Mobile Touch Support

const {
  Engine,
  World,
  Bodies,
  Body,
  Events,
  Composite
} = Matter;

class AshiBirdsGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Widescreen 16:9 virtual canvas
    this.width = 1280;
    this.height = 720;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.groundY = window.GROUND_SURFACE_Y || 610;

    // Slingshot Anchor on Grassy Hill
    this.slingX = 235;
    this.slingY = 475;
    this.maxSlingDist = 125;

    //Slingshot Fork Tip Coordinates
    this.forkLeft = { x: this.slingX - 16, y: this.slingY - 12 };
    this.forkRight = { x: this.slingX + 16, y: this.slingY - 12 };

    // Physics Engine (Tuned for smooth, readable flight speed & balanced obstacle collapse)
    this.engine = Engine.create({
      gravity: { x: 0, y: 1.0, scale: 0.00028 },
      positionIterations: 10,
      velocityIterations: 8
    });
    this.world = this.engine.world;
    this.crushCooldowns = new Map();

    // Game State
    this.currentLevelIndex = 0;
    this.currentLevel = null;
    this.totalScore = 0;
    this.levelScore = 0;
    this.currentStars = 0;
    this.comboCount = 0;
    this.lastHitTime = 0;
    this.birdsQueue = [];
    this.activeBird = null;
    this.flyingBirds = [];
    this.targets = [];
    this.blocks = [];
    this.tntBoxes = [];

    // Interaction & Turn State
    this.isDragging = false;
    this.dragPos = { x: this.slingX, y: this.slingY };
    this.hasFired = false;
    this.anyBirdFiredInLevel = false;
    this.abilityUsed = false;
    this.isGameOver = false;
    this.settleTimer = 0;
    this.levelElapsed = 0;
    this.animTime = 0;

    // Screen Shake
    this.shakeTimer = 0;
    this.shakeIntensity = 0;

    // Visual Effects
    this.particles = [];
    this.floatingTexts = [];
    this.smokeTrails = [];
    this.shockwaves = [];
    this.clouds = [
      { x: 140, y: 95, s: 1.0, speed: 12 },
      { x: 480, y: 68, s: 1.25, speed: 8 },
      { x: 860, y: 110, s: 0.9, speed: 14 },
      { x: 1140, y: 78, s: 1.15, speed: 10 }
    ];

    this.imagesCache = {};
    this.levelStars = this.loadStars();

    this.preloadImages();
    this.setupMatterEvents();
    this.setupInputEvents();
    this.setupUIEvents();

    this.initLevel(this.currentLevelIndex);
    this.startLoop();
  }

  loadStars() {
    try {
      const raw = localStorage.getItem('ashibirds_stars');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  saveStars() {
    try {
      localStorage.setItem('ashibirds_stars', JSON.stringify(this.levelStars));
    } catch (e) {}
  }

  preloadImages() {
    const urls = [
      'assets/sprites/red.png',
      'assets/sprites/chuck.png',
      'assets/sprites/blues.png',
      'assets/sprites/blue_single.png',
      'assets/sprites/bomb.png',
      'assets/sprites/stella.png',
      'assets/sprites/terence.png',
      'assets/sprites/eagle.png',
      'assets/sprites/pig_chef.png',
      'assets/sprites/pig_commander.png',
      'assets/sprites/pig_king.png',
      'assets/cover.jpg'
    ];

    urls.forEach((u) => {
      const img = new Image();
      img.src = u;
      this.imagesCache[u] = img;
    });
  }

  // =========================================================================
  // LEVEL INITIALIZATION & WORLD BUILDING
  // =========================================================================
  initLevel(lvlIndex) {
    if (lvlIndex < 0 || lvlIndex >= window.LEVELS_DATA.length) {
      lvlIndex = 0;
    }
    this.currentLevelIndex = lvlIndex;
    this.currentLevel = window.LEVELS_DATA[lvlIndex];
    this.levelScore = 0;
    this.currentStars = 0;
    this.comboCount = 0;
    this.lastHitTime = 0;
    this.isGameOver = false;
    this.hasFired = false;
    this.anyBirdFiredInLevel = false;
    this.abilityUsed = false;
    this.isDragging = false;
    this.settleTimer = 0;
    this.levelElapsed = 0;

    this.particles = [];
    this.floatingTexts = [];
    this.smokeTrails = [];
    this.shockwaves = [];
    this.flyingBirds = [];

    // Hide modals
    ['victory-modal', 'defeat-modal', 'level-modal', 'roster-modal'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });

    // Clear Matter World
    World.clear(this.world, false);
    Engine.clear(this.engine);

    // Static Ground (top surface exactly at Y = 610) & Side Walls
    const ground = Bodies.rectangle(this.width / 2, this.groundY + 45, this.width * 2, 90, {
      isStatic: true,
      friction: 0.9,
      restitution: 0.1,
      label: 'ground'
    });
    const leftWall = Bodies.rectangle(-60, this.height / 2, 80, this.height * 2, {
      isStatic: true,
      label: 'wall'
    });
    const rightWall = Bodies.rectangle(this.width + 80, this.height / 2, 80, this.height * 2, {
      isStatic: true,
      label: 'wall'
    });
    World.add(this.world, [ground, leftWall, rightWall]);

    // Build Structure Blocks
    this.blocks = [];
    this.tntBoxes = [];
    this.totalBlocksInLevel = this.currentLevel.blocks.length;
    this.destroyedBlocksCount = 0;
    this.crushCooldowns.clear();
    this.currentLevel.blocks.forEach((bData) => {
      const mat = window.MATERIAL_TYPES[bData.mat] || window.MATERIAL_TYPES.wood;
      const block = Bodies.rectangle(bData.x, bData.y, bData.w, bData.h, {
        density: mat.density,
        friction: mat.friction,
        frictionStatic: 0.52,
        restitution: mat.restitution,
        label: mat.isTNT ? 'tnt' : 'block'
      });
      block.matType = bData.mat;
      block.matDef = mat;
      block.w = bData.w;
      block.h = bData.h;
      block.maxHp = Math.max(25, Math.round(bData.w * bData.h * mat.hpPerArea));
      block.hp = block.maxHp;
      block.isTNT = Boolean(mat.isTNT);
      block.exploded = false;
      block.bubbleTimer = 0;

      this.blocks.push(block);
      if (block.isTNT) this.tntBoxes.push(block);
      World.add(this.world, block);
    });

    // Build Target Pigs
    this.targets = [];
    this.currentLevel.targets.forEach((tData) => {
      const pDef = window.PIG_TYPES[tData.type] || window.PIG_TYPES.chef_small;
      const target = Bodies.circle(tData.x, tData.y, pDef.radius, {
        density: 0.0022,
        friction: 0.65,
        frictionStatic: 0.8,
        restitution: 0.2,
        label: 'pig'
      });
      target.pDef = pDef;
      target.maxHp = pDef.maxHp;
      target.hp = target.maxHp;
      target.alive = true;
      target.bubbleTimer = 0;
      target.hurtFlash = 0;

      this.targets.push(target);
      World.add(this.world, target);
    });

    // Build Birds Queue
    this.birdsQueue = [];
    this.currentLevel.birds.forEach((bKey) => {
      const bDef = window.BIRD_TYPES[bKey] || window.BIRD_TYPES.red;
      this.birdsQueue.push(bDef);
    });

    this.loadNextBirdIntoSling();
    this.updateHUD();
    this.renderBirdsQueueUI();
  }

  loadNextBirdIntoSling() {
    if (this.birdsQueue.length === 0) {
      this.activeBird = null;
      this.updateSkillButtonUI();
      return;
    }

    const bDef = this.birdsQueue.shift();
    this.activeBird = {
      bDef,
      inSling: true,
      state: 'idle',
      angle: 0,
      hasUsedAbility: false,
      fuseTimer: 0,
      position: { x: this.slingX, y: this.slingY }
    };
    this.dragPos = { x: this.slingX, y: this.slingY };
    this.hasFired = false;
    this.abilityUsed = false;

    this.renderBirdsQueueUI();
    this.updateSkillButtonUI();
  }

  // =========================================================================
  // INPUT & SLINGSHOT CONTROLS (MOUSE, TOUCH & KEYBOARD)
  // =========================================================================
  setupInputEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.width / rect.width;
      const scaleY = this.height / rect.height;
      const touch = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
      const clientX = touch ? touch.clientX : e.clientX;
      const clientY = touch ? touch.clientY : e.clientY;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const onPointerDown = (e) => {
      if (this.isGameOver) return;
      window.ashiAudio.ensureContext();
      const p = getPos(e);

      // If bird is currently flying in the air -> Trigger Special Ability!
      if (this.hasFired && this.flyingBirds.length > 0 && !this.abilityUsed) {
        this.triggerBirdAbility();
        return;
      }

      if (!this.activeBird || !this.activeBird.inSling) return;

      const dist = Math.hypot(p.x - this.slingX, p.y - this.slingY);
      if (dist < 110) {
        this.isDragging = true;
        this.updateDragPos(p.x, p.y);
      }
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;
      const p = getPos(e);
      this.updateDragPos(p.x, p.y);
    };

    const onPointerUp = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.fireBird();
    };

    this.canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      onPointerDown(e);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging) e.preventDefault();
      onPointerMove(e);
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      if (this.isDragging) e.preventDefault();
      onPointerUp();
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        if (this.hasFired && this.flyingBirds.length > 0 && !this.abilityUsed) {
          e.preventDefault();
          this.triggerBirdAbility();
        }
      } else if (e.code === 'KeyR') {
        this.initLevel(this.currentLevelIndex);
      } else if (e.code === 'KeyM') {
        const muted = window.ashiAudio.toggleMute();
        const sBtn = document.getElementById('btn-sound-toggle');
        if (sBtn) sBtn.textContent = muted ? '🔇' : '🔊';
      }
    });
  }

  updateDragPos(rawX, rawY) {
    let dx = rawX - this.slingX;
    let dy = rawY - this.slingY;
    const dist = Math.hypot(dx, dy);

    if (dist > this.maxSlingDist) {
      dx = (dx / dist) * this.maxSlingDist;
      dy = (dy / dist) * this.maxSlingDist;
    }

    // Clamp so bird never overlaps the ground collider
    const birdRadius = this.activeBird?.bDef?.radius || 28;
    const clampedY = Math.min(this.groundY - birdRadius - 6, Math.max(260, this.slingY + dy));
    this.dragPos = {
      x: this.slingX + dx,
      y: clampedY
    };

    if (this.activeBird) {
      this.activeBird.position = { x: this.dragPos.x, y: this.dragPos.y };
    }

    if (Math.random() < 0.25) {
      window.ashiAudio.playSlingshotPull(dist / this.maxSlingDist);
    }
  }

  getLaunchVelocity() {
    const dx = this.slingX - this.dragPos.x;
    const dy = this.slingY - this.dragPos.y;
    const speedFactor = 0.105;
    return {
      vx: dx * speedFactor,
      vy: dy * speedFactor,
      pullDist: Math.hypot(dx, dy)
    };
  }

  fireBird() {
    if (!this.activeBird) return;

    const { vx, vy, pullDist } = this.getLaunchVelocity();

    // Cancel shot if not pulled far enough or pulled backward toward the right
    if (pullDist < 18 || vx < 0.8) {
      this.dragPos = { x: this.slingX, y: this.slingY };
      this.activeBird.position = { x: this.slingX, y: this.slingY };
      return;
    }

    // Create a fresh dynamic Matter.js circle body at launch position (prevents static Infinity mass bug)
    const bDef = this.activeBird.bDef;
    const launchedBird = Bodies.circle(this.dragPos.x, this.dragPos.y, bDef.radius, {
      density: bDef.density,
      restitution: bDef.restitution,
      friction: bDef.friction,
      frictionAir: 0.0038,
      label: 'bird'
    });
    launchedBird.bDef = bDef;
    launchedBird.inSling = false;
    launchedBird.state = 'flying';
    launchedBird.hasUsedAbility = false;
    launchedBird.fuseTimer = 0;

    World.add(this.world, launchedBird);
    Body.setVelocity(launchedBird, { x: vx, y: vy });

    this.hasFired = true;
    this.anyBirdFiredInLevel = true;
    this.flyingBirds = [launchedBird];
    this.activeBird = null;

    window.ashiAudio.playSlingshotRelease();
    this.createPuffParticles(this.slingX, this.slingY, '#ffffff', 16);
    this.updateSkillButtonUI();
  }

  // =========================================================================
  // 7 UNIQUE ASHI BIRD ABILITIES
  // =========================================================================
  triggerBirdAbility() {
    if (this.abilityUsed || this.flyingBirds.length === 0) return;
    const primeBird = this.flyingBirds[0];
    if (!primeBird || primeBird.hasUsedAbility || !primeBird.bDef.hasAbility) return;

    primeBird.hasUsedAbility = true;
    this.abilityUsed = true;
    this.updateSkillButtonUI();

    const type = primeBird.bDef.abilityType;
    const pos = primeBird.position;
    const vel = primeBird.velocity;

    if (type === 'warcry') {
      // Red Ashi: Mild Battle Warcry Sonic Push
      window.ashiAudio.playAbility('warcry');
      this.shockwaves.push({ x: pos.x, y: pos.y, r: 10, maxR: 85, color: '#ff5252', alpha: 0.85 });
      this.createPuffParticles(pos.x, pos.y, '#ff5252', 14);
      this.addFloatingText(pos.x, pos.y - 38, 'BATTLE WARCRY! 💢', '#ff8a80');
      this.applyRadialPulse(pos.x, pos.y, 85, 0.012, 40);
    } else if (type === 'speed') {
      // Chuck Yellow Ashi: Supersonic Armor-Piercing Rocket Dash (1-Hit Hard Wall Breaker - KEPT STRONG!)
      const angle = Math.atan2(vel.y * 0.3, Math.max(2.5, vel.x));
      const boostSpeed = 15.8;
      const dv = {
        x: Math.cos(angle) * boostSpeed,
        y: Math.sin(angle) * boostSpeed
      };
      Body.setVelocity(primeBird, dv);
      primeBird.isBoosted = true;
      primeBird.isChuckDash = true;
      primeBird.dashVel = dv;
      primeBird.pierceCount = 3;

      window.ashiAudio.playAbility('speed');
      this.triggerScreenShake(0.2, 7);
      this.createPuffParticles(pos.x, pos.y, '#ffd54f', 28);
      this.shockwaves.push({ x: pos.x, y: pos.y, r: 12, maxR: 115, color: '#ffca28', alpha: 1.0 });
      this.addFloatingText(pos.x, pos.y - 38, 'ARMOR PIERCE DASH! ⚡', '#ffe082');
    } else if (type === 'split') {
      // The Blues Ashi: Gentle Triple Split (Mild spread, no massive explosions)
      const angle = Math.atan2(vel.y, vel.x);
      const speed = Math.max(5.8, Math.hypot(vel.x, vel.y) * 0.95);

      [-0.18, 0.18].forEach((offset) => {
        const clone = Bodies.circle(pos.x, pos.y, primeBird.bDef.radius, {
          density: primeBird.bDef.density,
          restitution: primeBird.bDef.restitution,
          friction: primeBird.bDef.friction,
          frictionAir: 0.0038,
          label: 'bird'
        });
        clone.bDef = primeBird.bDef;
        clone.state = 'flying';
        clone.hasUsedAbility = true;
        clone.isSplitClone = true;
        Body.setVelocity(clone, {
          x: Math.cos(angle + offset) * speed,
          y: Math.sin(angle + offset) * speed
        });
        World.add(this.world, clone);
        this.flyingBirds.push(clone);
      });

      window.ashiAudio.playAbility('split');
      this.createPuffParticles(pos.x, pos.y, '#4fc3f7', 16);
      this.addFloatingText(pos.x, pos.y - 38, 'TRIPLE SPLIT! ❄️', '#81d4fa');
    } else if (type === 'bomb') {
      // Bomb Black Ashi: Controlled Local Bomb Explosion
      this.detonateBomb(primeBird);
    } else if (type === 'bubble') {
      // Stella Pink Ashi: Mild Pink Bubble Lift
      window.ashiAudio.playAbility('bubble');
      this.shockwaves.push({ x: pos.x, y: pos.y, r: 10, maxR: 105, color: '#f48fb1', alpha: 0.85 });
      this.createPuffParticles(pos.x, pos.y, '#f8bbd0', 16);
      this.addFloatingText(pos.x, pos.y - 38, 'BUBBLE LIFT! 🫧', '#f48fb1');

      const candidates = [...this.blocks, ...this.targets]
        .map((b) => ({ body: b, dist: Math.hypot(b.position.x - pos.x, b.position.y - pos.y) }))
        .filter((item) => item.dist < 105)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 4);

      candidates.forEach(({ body }) => {
        body.bubbleTimer = 1.1;
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.8, y: -2.0 });
      });
    } else if (type === 'slam') {
      // Terence Big Red Ashi: Moderate Heavy Slam (No 1-hit wall break)
      window.ashiAudio.playAbility('slam');
      Body.setVelocity(primeBird, { x: Math.max(3.2, vel.x * 0.8), y: 8.5 });
      primeBird.isBoosted = true;
      primeBird.isSlamming = true;
      this.createPuffParticles(pos.x, pos.y, '#ef5350', 16);
      this.addFloatingText(pos.x, pos.y - 42, 'HEAVY SLAM! 💥', '#ff8a80');
    } else if (type === 'eagle_dive') {
      // Mighty Eagle Ashi: Sky Dive + Moderate Local Earthquake (No 1-hit wall break)
      window.ashiAudio.playAbility('eagle_dive');
      Body.setVelocity(primeBird, { x: 9.5, y: 8.8 });
      primeBird.isEagleDiving = true;
      primeBird.isBoosted = true;
      this.createPuffParticles(pos.x, pos.y, '#ffd54f', 18);
      this.addFloatingText(pos.x, pos.y - 45, 'MIGHTY SKY DIVE! 🦅', '#ffe57f');
    }
  }

  applyRadialPulse(cx, cy, radius, forceBase, maxDamage) {
    const allBodies = Composite.allBodies(this.world);
    allBodies.forEach((body) => {
      if (body.isStatic || body.label === 'bird') return;
      const d = Math.hypot(body.position.x - cx, body.position.y - cy);
      if (d < radius && d > 1) {
        const linearFactor = 1 - d / radius;
        const falloff = Math.pow(linearFactor, 1.25);
        const safeMass = Math.min(body.mass || 1, 5.5);
        const f = falloff * forceBase * safeMass;
        const fx = ((body.position.x - cx) / d) * f;
        const fy = ((body.position.y - cy) / d) * f - 0.0035 * falloff;
        Body.applyForce(body, body.position, { x: fx, y: fy });

        if (body.label === 'pig' || body.label === 'block') {
          this.applyDamage(body, Math.round(maxDamage * falloff));
        } else if (body.isTNT && !body.exploded && d < radius * 0.75) {
          this.detonateTNT(body);
        }
      }
    });
  }

  detonateBomb(bombBird) {
    if (!bombBird || bombBird.exploded) return;
    bombBird.exploded = true;
    const px = bombBird.position.x;
    const py = bombBird.position.y;
    const blastRadius = 120;

    window.ashiAudio.playExplosion();
    this.triggerScreenShake(0.22, 6);
    this.createExplosionEffect(px, py, 22, 5.0);
    this.shockwaves.push({ x: px, y: py, r: 14, maxR: blastRadius, color: '#ff6e40', alpha: 0.9 });
    this.addFloatingText(px, py - 42, 'KABOOM! 💣', '#ff7043');

    this.applyRadialPulse(px, py, blastRadius, 0.025, 140);

    World.remove(this.world, bombBird);
    this.flyingBirds = this.flyingBirds.filter((b) => b !== bombBird);
  }

  detonateTNT(tntBody) {
    if (!tntBody || tntBody.exploded) return;
    tntBody.exploded = true;
    const tx = tntBody.position.x;
    const ty = tntBody.position.y;
    const radius = 150;

    setTimeout(() => {
      if (this.isGameOver) return;
      window.ashiAudio.playExplosion();
      this.triggerScreenShake(0.3, 9);
      this.createExplosionEffect(tx, ty, 34, 7.5);
      this.shockwaves.push({ x: tx, y: ty, r: 16, maxR: radius, color: '#ff3d00', alpha: 1.0 });
      this.addFloatingText(tx, ty - 38, 'TNT BOOM! 🔥', '#ff5252');

      // Stronger, satisfying TNT blast (150px radius, 0.046 force, 260 max damage)
      this.applyRadialPulse(tx, ty, radius, 0.046, 260);

      this.destroyedBlocksCount++;

      World.remove(this.world, tntBody);
      this.blocks = this.blocks.filter((b) => b !== tntBody);
      this.tntBoxes = this.tntBoxes.filter((b) => b !== tntBody);
      this.updateHUD();
    }, 60);
  }

  triggerEagleEarthquake(impactX, impactY) {
    window.ashiAudio.playExplosion();
    this.triggerScreenShake(0.25, 7);
    this.createExplosionEffect(impactX, impactY, 26, 5.8);
    this.shockwaves.push({ x: impactX, y: impactY, r: 16, maxR: 165, color: '#ffd54f', alpha: 0.9 });
    this.addFloatingText(impactX, impactY - 50, 'MIGHTY EARTHQUAKE! 🦅⚡', '#ffd54f');

    this.applyRadialPulse(impactX, impactY, 165, 0.024, 130);
  }

  triggerScreenShake(duration = 0.3, intensity = 8) {
    this.shakeTimer = Math.max(this.shakeTimer, duration);
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }

  // =========================================================================
  // MATTER.JS COLLISION EVENTS & BALANCED OBSTACLE-TO-PIG DAMAGE
  // =========================================================================
  setupMatterEvents() {
    Events.on(this.engine, 'collisionStart', (evt) => {
      // Never damage blocks/pigs before the player has fired a bird!
      if (!this.anyBirdFiredInLevel || this.levelElapsed < 0.4) return;

      evt.pairs.forEach((pair) => {
        this.handleCollision(pair.bodyA, pair.bodyB, false);
      });
    });

    // Also handle active crushing when falling/sliding obstacles press onto pigs
    Events.on(this.engine, 'collisionActive', (evt) => {
      if (!this.anyBirdFiredInLevel || this.levelElapsed < 0.4) return;

      const now = performance.now();
      evt.pairs.forEach((pair) => {
        const a = pair.bodyA;
        const b = pair.bodyB;
        if (a.label !== 'pig' && b.label !== 'pig') return;

        const key = a.id < b.id ? `${a.id}_${b.id}` : `${b.id}_${a.id}`;
        const lastTime = this.crushCooldowns.get(key) || 0;
        if (now - lastTime >= 160) {
          this.crushCooldowns.set(key, now);
          this.handleCollision(a, b, true);
        }
      });
    });
  }

  handleCollision(bodyA, bodyB, isActive = false) {
    const v1 = bodyA.velocity || { x: 0, y: 0 };
    const v2 = bodyB.velocity || { x: 0, y: 0 };
    const relSpeed = Math.hypot(v1.x - v2.x, v1.y - v2.y);

    // Check Mighty Eagle Dive & Terence Slam on impact
    if (!isActive) {
      const eagleBird = bodyA.isEagleDiving ? bodyA : (bodyB.isEagleDiving ? bodyB : null);
      if (eagleBird) {
        eagleBird.isEagleDiving = false;
        this.triggerEagleEarthquake(eagleBird.position.x, eagleBird.position.y);
      }

      const slamBird = bodyA.isSlamming ? bodyA : (bodyB.isSlamming ? bodyB : null);
      if (slamBird) {
        slamBird.isSlamming = false;
        this.triggerScreenShake(0.18, 5);
        this.shockwaves.push({ x: slamBird.position.x, y: slamBird.position.y, r: 10, maxR: 70, color: '#ef5350', alpha: 0.8 });
        this.applyRadialPulse(slamBird.position.x, slamBird.position.y, 70, 0.014, 45);
      }

      // Check Bomb Bird auto-fuse start on first hard hit
      const bombBird = (bodyA.label === 'bird' && bodyA.bDef?.id === 'bomb') ? bodyA
        : ((bodyB.label === 'bird' && bodyB.bDef?.id === 'bomb') ? bodyB : null);
      if (bombBird && bombBird.fuseTimer === 0 && relSpeed > 1.0) {
        bombBird.fuseTimer = 0.85; // Auto-detonates in 0.85s if not tapped earlier
      }
    }

    const involvesPig = bodyA.label === 'pig' || bodyB.label === 'pig';
    const hitByBird = bodyA.label === 'bird' || bodyB.label === 'bird';
    const hasChuckBoost = Boolean((bodyA.isBoosted && bodyA.bDef?.id === 'chuck') || (bodyB.isBoosted && bodyB.bDef?.id === 'chuck'));

    // Minimum speed threshold (Chuck boosted dash never skipped)
    const minSpeed = hasChuckBoost ? 0 : (involvesPig ? (isActive ? 0.45 : 0.35) : 0.95);
    if (relSpeed < minSpeed) return;

    // Trigger TNT if hit hard enough (or hit directly by a bird)
    if (!isActive) {
      if (bodyA.isTNT && !bodyA.exploded && (hitByBird || relSpeed > 1.75)) {
        this.detonateTNT(bodyA);
      }
      if (bodyB.isTNT && !bodyB.exploded && (hitByBird || relSpeed > 1.75)) {
        this.detonateTNT(bodyB);
      }
    }

    // Safe finite mass (fixes Matter.js static body mass === Infinity bug!)
    const massA = bodyA.isStatic ? 1.8 : Math.min(bodyA.mass || 1, 7.5);
    const massB = bodyB.isStatic ? 1.8 : Math.min(bodyB.mass || 1, 7.5);

    // 1. Calculate damage to bodyA
    if (bodyA.label === 'pig') {
      const dmgToPigA = this.computePigImpactDamage(bodyA, bodyB, relSpeed, massB, isActive);
      this.applyDamage(bodyA, dmgToPigA);
    } else if (bodyA.label === 'block' && !isActive) {
      const dmgToBlockA = this.computeBlockImpactDamage(bodyA, bodyB, relSpeed, massB);
      this.applyDamage(bodyA, dmgToBlockA);
    }

    // 2. Calculate damage to bodyB
    if (bodyB.label === 'pig') {
      const dmgToPigB = this.computePigImpactDamage(bodyB, bodyA, relSpeed, massA, isActive);
      this.applyDamage(bodyB, dmgToPigB);
    } else if (bodyB.label === 'block' && !isActive) {
      const dmgToBlockB = this.computeBlockImpactDamage(bodyB, bodyA, relSpeed, massA);
      this.applyDamage(bodyB, dmgToBlockB);
    }

    // Preserve piercing momentum ONLY for Chuck when smashing through blocks/pigs
    if (!isActive) {
      const birdBody = bodyA.label === 'bird' ? bodyA : (bodyB.label === 'bird' ? bodyB : null);
      const targetBody = birdBody === bodyA ? bodyB : bodyA;
      if (birdBody && birdBody.bDef?.id === 'chuck' && birdBody.pierceCount > 0 && birdBody.dashVel && (targetBody.label === 'block' || targetBody.label === 'pig')) {
        birdBody.pierceCount -= 1;
        Body.setVelocity(birdBody, {
          x: birdBody.dashVel.x * 0.85,
          y: birdBody.dashVel.y * 0.85
        });
      }
    }

    // Sound effects on significant collision
    if (!isActive && (relSpeed > 1.5 || hasChuckBoost) && (bodyA.label === 'block' || bodyB.label === 'block')) {
      const blk = bodyA.label === 'block' ? bodyA : bodyB;
      if (blk.matType === 'wood') window.ashiAudio.playWoodHit();
      else if (blk.matType === 'ice') window.ashiAudio.playGlassBreak();
      else if (blk.matType === 'stone') window.ashiAudio.playStoneHit();
    }
  }

  computeBlockImpactDamage(block, otherBody, relSpeed, otherMass) {
    let mult = 1.0;
    if (otherBody.label === 'bird' && otherBody.bDef) {
      const bId = otherBody.bDef.id;

      // Yellow Bird (Chuck) Skill ONLY -> Instant 1-Hit Destruction on ANY Hard Wall (Stone, Wood, Ice)!
      if (otherBody.isBoosted && bId === 'chuck') {
        this.shockwaves.push({
          x: block.position.x,
          y: block.position.y,
          r: 10,
          maxR: 85,
          color: '#ffd54f',
          alpha: 0.95
        });
        return Math.max((block.hp || 500) + 500, 9999);
      }

      mult = 1.45;
      if (bId === 'chuck') mult = block.matType === 'wood' ? 3.0 : 2.0;
      if (bId === 'blues') mult = block.matType === 'ice' ? 2.5 : 1.2;
      if (bId === 'terence' || bId === 'eagle') mult = 2.0;
      if (otherBody.isBoosted && bId !== 'chuck') mult *= 1.25;
      if (otherBody.isSplitClone) mult *= 0.7;
    } else if (otherBody.label === 'ground') {
      mult = 0.75;
    }
    return Math.round(relSpeed * otherMass * 5.2 * mult);
  }

  computePigImpactDamage(pig, otherBody, relSpeed, otherMass, isActive) {
    if (otherBody.label === 'bird') {
      // Direct bird hit on a pig: Only Chuck 1-hits with skill active!
      if (otherBody.isBoosted && otherBody.bDef?.id === 'chuck') {
        return Math.max((pig.hp || 300) + 200, 999);
      }
      let boost = (otherBody.isBoosted && otherBody.bDef?.id !== 'chuck') ? 1.25 : 1.0;
      if (otherBody.isSplitClone) boost *= 0.7;
      const raw = Math.round(relSpeed * otherMass * 7.5 * boost);
      return isActive ? Math.min(42, raw) : Math.max(24, raw);
    }

    if (otherBody.label === 'block' || otherBody.label === 'tnt') {
      // Balanced Obstacle-to-Pig Damage!
      // Light nudge deals ~15-28 dmg; falling roof or 2-3 blocks deals ~55-95 total dmg
      const matMult = otherBody.matDef?.obstacleDmgMult || 1.5;
      const angularSpeed = Math.abs(otherBody.angularVelocity || 0);
      const effectiveSpeed = relSpeed + angularSpeed * 7.5;
      const raw = Math.round(effectiveSpeed * Math.max(1.3, otherMass) * 7.2 * matMult);
      if (isActive) {
        return Math.max(11, Math.min(42, Math.round(raw * 0.6)));
      }
      return Math.max(15, Math.min(82, raw));
    }

    if (otherBody.label === 'ground' || otherBody.label === 'wall') {
      // Pig falling from an upper floor onto the ground
      if (relSpeed < 1.15) return 0;
      const raw = Math.round((relSpeed - 0.65) * 22);
      return Math.max(12, Math.min(68, raw));
    }

    return Math.round(relSpeed * otherMass * 4.5);
  }

  applyDamage(body, damage) {
    if (!body || body.hp <= 0 || damage <= 0) return;
    body.hp -= damage;

    if (body.label === 'pig') {
      body.hurtFlash = 0.24;
      // Show floating orange damage number on non-lethal hits so obstacle damage is clearly visible
      const now = performance.now();
      if (body.hp > 0 && damage >= 6 && now - (body.lastDmgTextTime || 0) > 130) {
        body.lastDmgTextTime = now;
        this.addFloatingText(
          body.position.x + (Math.random() - 0.5) * 18,
          body.position.y - body.pDef.radius - 10,
          `-${damage}`,
          '#ffab40'
        );
      }
    }

    if (body.hp <= 0) {
      if (body.label === 'pig' && body.alive) {
        this.killPig(body);
      } else if (body.label === 'block' && !body.isTNT) {
        this.destroyBlock(body);
      }
    }
  }

  killPig(pig) {
    pig.alive = false;
    window.ashiAudio.playPigPop();
    const pts = pig.pDef.score;
    this.totalScore += pts;
    this.levelScore += pts;

    this.addFloatingScore(pig.position.x, pig.position.y - 24, pts, '#76ff03', true);
    this.createPuffParticles(pig.position.x, pig.position.y, '#76ff03', 24);
    this.createPuffParticles(pig.position.x, pig.position.y, '#ffffff', 14);

    World.remove(this.world, pig);
    this.targets = this.targets.filter((t) => t !== pig);

    this.updateHUD();
  }

  destroyBlock(block) {
    const bx = block.position.x;
    const by = block.position.y;
    const reachX = (block.w || 30) * 0.7 + 42;
    const reachY = (block.h || 30) * 0.7 + 48;

    this.destroyedBlocksCount++;

    // Falling debris & splinter impact on nearby pigs when an adjacent/overhead obstacle shatters
    this.targets.slice().forEach((pig) => {
      if (!pig.alive) return;
      const dx = Math.abs(pig.position.x - bx);
      const dy = Math.abs(pig.position.y - by);
      if (dx < reachX + pig.pDef.radius && dy < reachY + pig.pDef.radius) {
        const distFactor = Math.max(0.4, 1 - Math.hypot(dx, dy) / (reachX + reachY));
        const matMult = block.matDef?.obstacleDmgMult || 1.5;
        const debrisDmg = Math.round((18 + 16 * distFactor) * (matMult / 1.45));
        this.applyDamage(pig, debrisDmg);
      }
    });

    // Wake and nudge supported blocks above so collapsing roofs drop cleanly onto pigs below
    this.blocks.forEach((other) => {
      if (other === block) return;
      if (Math.abs(other.position.x - bx) < (block.w + other.w) * 0.65 && other.position.y < by + 20) {
        Body.setVelocity(other, {
          x: other.velocity.x + (Math.random() - 0.5) * 0.6,
          y: Math.max(other.velocity.y, 1.0)
        });
      }
    });

    this.createDebrisParticles(bx, by, block.matDef.color, 14);
    World.remove(this.world, block);
    this.blocks = this.blocks.filter((b) => b !== block);

    this.updateHUD();
  }

  // =========================================================================
  // MAIN UPDATE LOOP
  // =========================================================================
  update(dt) {
    this.levelElapsed += dt;
    this.animTime += dt;

    Engine.update(this.engine, dt * 1000);

    // Update clouds
    this.clouds.forEach((c) => {
      c.x += c.speed * dt;
      if (c.x > this.width + 160) c.x = -160;
    });

    // Update screen shake
    if (this.shakeTimer > 0) {
      this.shakeTimer = Math.max(0, this.shakeTimer - dt);
    }

    // Update Stella's Pink Anti-Gravity Bubbles
    const allDynamic = [...this.blocks, ...this.targets];
    allDynamic.forEach((b) => {
      if (b.hurtFlash > 0) b.hurtFlash = Math.max(0, b.hurtFlash - dt);
      if (b.bubbleTimer > 0) {
        b.bubbleTimer -= dt;
        // Apply gentle upward float force during Stella's Bubble Lift
        Body.applyForce(b, b.position, { x: 0, y: -0.00045 * (b.mass || 1) });
        if (b.bubbleTimer <= 0) {
          this.createPuffParticles(b.position.x, b.position.y, '#f48fb1', 12);
          window.ashiAudio.playGlassBreak();
          this.applyDamage(b, 20);
        }
      }
      // Kill pigs that fall off the right/left cliff
      if (b.label === 'pig' && b.alive && (b.position.y > this.height + 50 || b.position.x > this.width + 70)) {
        this.killPig(b);
      }
    });

    // Update Bomb Bird countdown fuse
    this.flyingBirds.forEach((fb) => {
      if (fb.fuseTimer > 0 && !fb.exploded) {
        fb.fuseTimer -= dt;
        if (fb.fuseTimer <= 0) {
          this.detonateBomb(fb);
        }
      }
    });

    // Update smoke trails for flying birds
    if (this.hasFired && this.flyingBirds.length > 0) {
      this.flyingBirds.forEach((fb) => {
        if (Math.hypot(fb.velocity.x, fb.velocity.y) > 2.5 && Math.random() < 0.65) {
          this.smokeTrails.push({
            x: fb.position.x,
            y: fb.position.y,
            r: fb.bDef.radius * 0.35,
            alpha: 0.65,
            color: fb.isBoosted ? '#ffd54f' : '#ffffff'
          });
        }
      });
    }

    for (let i = this.smokeTrails.length - 1; i >= 0; i--) {
      const st = this.smokeTrails[i];
      st.alpha -= 0.018;
      st.r += 0.15;
      if (st.alpha <= 0) this.smokeTrails.splice(i, 1);
    }

    // Update shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.r += (sw.maxR - sw.r) * 0.22 + 4;
      sw.alpha -= 0.045;
      if (sw.alpha <= 0 || sw.r >= sw.maxR) this.shockwaves.splice(i, 1);
    }

    // Check if active turn has settled
    if (this.hasFired && !this.isGameOver) {
      let allSettled = true;
      for (const fb of this.flyingBirds) {
        const speed = Math.hypot(fb.velocity.x, fb.velocity.y);
        const outOfBounds = fb.position.x > this.width + 60 || fb.position.x < -50 || fb.position.y > this.height + 40;
        if ((speed > 0.45 || fb.fuseTimer > 0) && !outOfBounds) {
          allSettled = false;
        }
      }

      // Also wait if any bubbles are still floating
      const anyBubbleActive = allDynamic.some((b) => b.bubbleTimer > 0);
      if (anyBubbleActive) allSettled = false;

      if (allSettled || this.flyingBirds.length === 0) {
        this.settleTimer += dt;
        if (this.settleTimer > 1.1) {
          this.concludeTurn();
        }
      } else {
        this.settleTimer = 0;
      }
    }

    // Instant victory check when all targets are eliminated
    if (this.anyBirdFiredInLevel && this.targets.length === 0 && !this.isGameOver) {
      this.settleTimer += dt;
      if (this.settleTimer > 1.15) {
        this.handleLevelVictory();
      }
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity || 0.16;
      p.alpha -= p.fade;
      if (p.alpha <= 0) this.particles.splice(i, 1);
    }

    // Update floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.rVelY || -1.3;
      ft.alpha -= 0.016;
      if (ft.scale && ft.scale > 1.0) {
        ft.scale = Math.max(1.0, ft.scale - 0.018);
      }
      if (ft.alpha <= 0) this.floatingTexts.splice(i, 1);
    }
  }

  concludeTurn() {
    this.settleTimer = 0;
    this.hasFired = false;
    this.abilityUsed = false;

    this.flyingBirds.forEach((b) => {
      this.createPuffParticles(b.position.x, b.position.y, '#ffffff', 8);
      World.remove(this.world, b);
    });
    this.flyingBirds = [];

    if (this.targets.length === 0) {
      this.handleLevelVictory();
    } else if (this.birdsQueue.length > 0) {
      this.loadNextBirdIntoSling();
    } else {
      this.handleLevelDefeat();
    }
  }

  handleLevelVictory() {
    if (this.isGameOver) return;
    this.isGameOver = true;

    // Count remaining unused birds (including activeBird if still in sling)
    const unusedCount = this.birdsQueue.length + (this.activeBird ? 1 : 0);
    const totalBirds = this.currentLevel.birds.length;
    const birdsUsed = Math.max(1, totalBirds - unusedCount);
    const maxDirect3StarBirds = totalBirds >= 4 ? 2 : 1;
    const birdsBonus = unusedCount * 10000;
    this.totalScore += birdsBonus;
    this.levelScore += birdsBonus;

    const blockRatio = this.totalBlocksInLevel > 0
      ? (this.destroyedBlocksCount / this.totalBlocksInLevel)
      : 0;
    const blockPercent = Math.round(blockRatio * 100);

    // Exact user rules:
    // 1. ด่านที่มีนก 3 ตัว: ใช้นก 1 ตัว -> ได้ 3 ดาวทันที
    // 2. ด่านที่มีนก 4 ตัวขึ้นไป: ใช้นกไม่เกิน 2 ตัว -> ได้ 3 ดาวทันที
    // 3. หากใช้เกินโควตาข้างต้น: ต้องทำลายสิ่งกีดขวางเกิน 50% (>= 50%) ถึงจะได้ 3 ดาว
    let stars = 1;
    let starReason = '';

    if (birdsUsed <= maxDirect3StarBirds) {
      stars = 3;
      if (maxDirect3StarBirds === 1) {
        starReason = '🌟 สุดยอดความแม่นยำ! ฆ่าหมูหมดด้วยนกเพียง 1 ตัว ได้รับ 3 ดาวเต็ม!';
      } else {
        starReason = `🌟 ยอดเยี่ยม! ฆ่าหมูหมดด้วยนกเพียง ${birdsUsed} ตัว (ไม่เกิน 2 ตัว) ได้รับ 3 ดาวเต็ม!`;
      }
    } else if (blockPercent >= 50) {
      stars = 3;
      starReason = `⭐⭐⭐ ยอดเยี่ยม! ทำลายสิ่งกีดขวางได้ถึง ${blockPercent}% (เกิน 50%) ได้รับ 3 ดาวเต็ม!`;
    } else if (blockPercent >= 20 || unusedCount >= 1) {
      stars = 2;
      const targetBirds = maxDirect3StarBirds === 1 ? 'นก 1 ตัว' : 'นกไม่เกิน 2 ตัว';
      starReason = `⭐⭐ ผ่านด่านได้ 2 ดาว (ทำลายสิ่งกีดขวางได้ ${blockPercent}% • ต้องทำลายเกิน 50% หรือใช้${targetBirds}เพื่อรับ 3 ดาว)`;
    } else {
      stars = 1;
      const targetBirds = maxDirect3StarBirds === 1 ? 'นก 1 ตัว' : 'นกไม่เกิน 2 ตัว';
      starReason = `⭐ ผ่านด่านได้ 1 ดาว (ทำลายสิ่งกีดขวางได้ ${blockPercent}% • ต้องทำลายเกิน 50% หรือใช้${targetBirds}เพื่อรับ 3 ดาว)`;
    }

    this.levelStars[this.currentLevelIndex] = Math.max(
      this.levelStars[this.currentLevelIndex] || 0,
      stars
    );
    this.saveStars();
    this.updateHUD();

    window.ashiAudio.playVictory();
    this.showVictoryModal(stars, birdsBonus, unusedCount, birdsUsed, blockRatio, starReason, maxDirect3StarBirds);
  }

  handleLevelDefeat() {
    if (this.isGameOver) return;
    this.isGameOver = true;
    window.ashiAudio.playDefeat();
    this.showDefeatModal();
  }

  // =========================================================================
  // RENDERING ENGINE (CANVAS 2D - DIE-CUT SPRITES, NO CIRCLE CLIPPING)
  // =========================================================================
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();

    if (this.shakeTimer > 0) {
      const sx = (Math.random() - 0.5) * this.shakeIntensity;
      const sy = (Math.random() - 0.5) * this.shakeIntensity;
      this.ctx.translate(sx, sy);
    }

    // 1. Scenic Angry Birds Backdrop
    this.renderBackground();

    // 2. Back Slingshot Arm & Back Rubber Band
    this.renderSlingshotBack();
    if (this.isDragging && this.activeBird) {
      this.renderRubberBand(this.forkLeft, this.dragPos);
    }

    // 3. Accurate Parabolic Trajectory Dots
    if (this.isDragging && this.activeBird) {
      this.renderTrajectory();
    }

    // 4. Smoke Trails
    this.smokeTrails.forEach((st) => {
      this.ctx.fillStyle = st.color;
      this.ctx.globalAlpha = st.alpha * 0.55;
      this.ctx.beginPath();
      this.ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1.0;

    // 5. Blocks (Wood, Ice, Stone, TNT)
    this.blocks.forEach((block) => this.renderBlock(block));

    // 6. Target Ashi Pigs (Die-cut transparent sprites)
    this.targets.forEach((pig) => this.renderPig(pig));

    // 7. Waiting Ashi Birds on the Grassy Hill
    this.renderWaitingBirdsOnGround();

    // 8. Active Bird in Slingshot & Flying Birds (Die-cut transparent sprites)
    if (this.activeBird) {
      this.renderBird(this.activeBird);
    }
    this.flyingBirds.forEach((fb) => this.renderBird(fb));

    // 9. Front Rubber Band & Front Slingshot Fork
    if (this.isDragging && this.activeBird) {
      this.renderRubberBand(this.forkRight, this.dragPos);
    }
    this.renderSlingshotFront();

    // 10. Shockwaves, Particles & Score Popups
    this.renderShockwavesAndParticles();

    this.ctx.restore();
  }

  renderBackground() {
    const theme = this.currentLevel ? this.currentLevel.theme : 'sunny';
    const gy = this.groundY;

    if (theme === 'sunny') {
      // Bright Angry Birds Sky
      const sky = this.ctx.createLinearGradient(0, 0, 0, gy);
      sky.addColorStop(0, '#36a9e1');
      sky.addColorStop(0.55, '#85d7ff');
      sky.addColorStop(1, '#dcf5ff');
      this.ctx.fillStyle = sky;
      this.ctx.fillRect(0, 0, this.width, gy);

      // Soft Sun
      this.ctx.fillStyle = 'rgba(255, 249, 196, 0.85)';
      this.ctx.beginPath();
      this.ctx.arc(1080, 115, 52, 0, Math.PI * 2);
      this.ctx.fill();

      // Distant Pastel Mountains
      this.ctx.fillStyle = '#9ccc65';
      this.ctx.beginPath();
      this.ctx.arc(280, gy + 110, 320, Math.PI, 0);
      this.ctx.arc(760, gy + 140, 390, Math.PI, 0);
      this.ctx.arc(1160, gy + 100, 290, Math.PI, 0);
      this.ctx.fill();

      // Midground Rolling Hills
      this.ctx.fillStyle = '#7cb342';
      this.ctx.beginPath();
      this.ctx.arc(160, gy + 80, 220, Math.PI, 0);
      this.ctx.arc(580, gy + 95, 250, Math.PI, 0);
      this.ctx.arc(980, gy + 75, 230, Math.PI, 0);
      this.ctx.fill();
    } else if (theme === 'sunset') {
      const sky = this.ctx.createLinearGradient(0, 0, 0, gy);
      sky.addColorStop(0, '#bf360c');
      sky.addColorStop(0.5, '#f57c00');
      sky.addColorStop(1, '#ffe082');
      this.ctx.fillStyle = sky;
      this.ctx.fillRect(0, 0, this.width, gy);

      // Setting Sun
      this.ctx.fillStyle = 'rgba(255, 224, 130, 0.9)';
      this.ctx.beginPath();
      this.ctx.arc(1020, 170, 64, 0, Math.PI * 2);
      this.ctx.fill();

      // Canyon Mesas
      this.ctx.fillStyle = '#8d3b1b';
      this.ctx.beginPath();
      this.ctx.arc(310, gy + 120, 330, Math.PI, 0);
      this.ctx.arc(880, gy + 110, 360, Math.PI, 0);
      this.ctx.fill();
    } else {
      // Midnight & Boss Theme
      const sky = this.ctx.createLinearGradient(0, 0, 0, gy);
      sky.addColorStop(0, '#090d1c');
      sky.addColorStop(0.55, '#1b1938');
      sky.addColorStop(1, '#311b4e');
      this.ctx.fillStyle = sky;
      this.ctx.fillRect(0, 0, this.width, gy);

      // Stars
      this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
      for (let i = 0; i < 24; i++) {
        const sx = (i * 173) % this.width;
        const sy = (i * 97) % 320;
        this.ctx.fillRect(sx, sy, 2.5, 2.5);
      }

      // Full Moon
      this.ctx.fillStyle = '#fff9c4';
      this.ctx.shadowColor = '#fff59d';
      this.ctx.shadowBlur = 35;
      this.ctx.beginPath();
      this.ctx.arc(1080, 120, 46, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Dark Hills
      this.ctx.fillStyle = '#1d1430';
      this.ctx.beginPath();
      this.ctx.arc(320, gy + 110, 330, Math.PI, 0);
      this.ctx.arc(890, gy + 110, 360, Math.PI, 0);
      this.ctx.fill();
    }

    // Fluffy Clouds
    this.clouds.forEach((c) => {
      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.scale(c.s, c.s);
      this.ctx.fillStyle = theme === 'midnight' || theme === 'boss'
        ? 'rgba(180, 160, 220, 0.16)'
        : 'rgba(255, 255, 255, 0.82)';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 28, 0, Math.PI * 2);
      this.ctx.arc(26, -6, 34, 0, Math.PI * 2);
      this.ctx.arc(56, 0, 26, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // Slingshot Grassy Mound Pedestal
    this.ctx.fillStyle = theme === 'sunset' ? '#6d2c11' : (theme === 'sunny' ? '#558b2f' : '#26183d');
    this.ctx.beginPath();
    this.ctx.ellipse(this.slingX, gy + 4, 88, 28, 0, Math.PI, 0);
    this.ctx.fill();

    // Main Ground Soil & Lush Top Grass Strip
    this.ctx.fillStyle = theme === 'sunset' ? '#4e1d08' : (theme === 'sunny' ? '#4e342e' : '#120b1d');
    this.ctx.fillRect(0, gy, this.width, this.height - gy);

    this.ctx.fillStyle = theme === 'sunset' ? '#a84315' : (theme === 'sunny' ? '#689f38' : '#39205a');
    this.ctx.fillRect(0, gy, this.width, 16);

    this.ctx.fillStyle = theme === 'sunset' ? '#d8692b' : (theme === 'sunny' ? '#8bc34a' : '#563482');
    this.ctx.fillRect(0, gy, this.width, 6);
  }

  renderSlingshotBack() {
    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // Back Y-arm
    this.ctx.lineWidth = 14;
    this.ctx.strokeStyle = '#4e342e';
    this.ctx.beginPath();
    this.ctx.moveTo(this.slingX, this.slingY + 26);
    this.ctx.lineTo(this.forkLeft.x, this.forkLeft.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  renderSlingshotFront() {
    this.ctx.save();
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    // Wooden Main Stem
    this.ctx.lineWidth = 18;
    this.ctx.strokeStyle = '#5d4037';
    this.ctx.beginPath();
    this.ctx.moveTo(this.slingX, this.groundY - 14);
    this.ctx.lineTo(this.slingX, this.slingY + 26);
    this.ctx.stroke();

    // Front Y-arm
    this.ctx.lineWidth = 14;
    this.ctx.strokeStyle = '#6d4c41';
    this.ctx.beginPath();
    this.ctx.moveTo(this.slingX, this.slingY + 26);
    this.ctx.lineTo(this.forkRight.x, this.forkRight.y);
    this.ctx.stroke();

    // Wooden highlight
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = '#8d6e63';
    this.ctx.beginPath();
    this.ctx.moveTo(this.slingX - 3, this.groundY - 22);
    this.ctx.lineTo(this.slingX - 3, this.slingY + 32);
    this.ctx.stroke();

    this.ctx.restore();
  }

  renderRubberBand(anchor, birdPos) {
    this.ctx.save();
    this.ctx.strokeStyle = '#2b1810';
    this.ctx.lineWidth = 7;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.moveTo(anchor.x, anchor.y);
    this.ctx.lineTo(birdPos.x, birdPos.y);
    this.ctx.stroke();

    // Leather Pouch
    this.ctx.fillStyle = '#3e2723';
    this.ctx.beginPath();
    this.ctx.arc(birdPos.x, birdPos.y, 9, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  renderTrajectory() {
    const { vx, vy, pullDist } = this.getLaunchVelocity();
    if (pullDist < 18 || vx < 0.8) return;

    let simX = this.dragPos.x;
    let simY = this.dragPos.y;
    let simVx = vx;
    let simVy = vy;

    // Exact step matching Matter.js velocity + gravity integration
    const airFriction = 1 - 0.0038;
    const gravStep = this.engine.gravity.y * this.engine.gravity.scale * (1000 / 60) * (1000 / 60);

    this.ctx.save();
    for (let i = 1; i <= 140; i++) {
      simVy += gravStep;
      simVx *= airFriction;
      simVy *= airFriction;
      simX += simVx;
      simY += simVy;

      if (simY > this.groundY) break;

      if (i % 5 === 0) {
        const dotIdx = i / 5;
        const radius = Math.max(2.5, 6.2 - dotIdx * 0.14);
        this.ctx.fillStyle = dotIdx % 2 === 0 ? '#ffffff' : '#ffd54f';
        this.ctx.strokeStyle = 'rgba(0,0,0,0.55)';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.ctx.arc(simX, simY, radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
      }
    }
    this.ctx.restore();
  }

  // Die-cut Sprite Renderer for Ashi Birds (NO Circle Clip!)
  renderBird(bird) {
    const p = bird.position;
    const bDef = bird.bDef;
    const r = bDef.radius;
    // Before splitting, The Blues in the slingshot can show the iconic 3-bird stack or single bird
    const spriteUrl = (bDef.id === 'blues' && bird.inSling && bDef.queueSprite)
      ? bDef.queueSprite
      : bDef.sprite;
    const img = this.imagesCache[spriteUrl];

    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(bird.angle);

    // Subtle red glow if Bomb Bird fuse is burning
    if (bird.fuseTimer > 0 && Math.floor(this.animTime * 14) % 2 === 0) {
      this.ctx.shadowColor = '#ff1744';
      this.ctx.shadowBlur = 22;
    } else if (bird.isBoosted || bird.isEagleDiving) {
      this.ctx.shadowColor = '#ffd54f';
      this.ctx.shadowBlur = 18;
    } else {
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      this.ctx.shadowBlur = 6;
      this.ctx.shadowOffsetY = 3;
    }

    if (img && img.complete && img.naturalWidth > 0) {
      const baseSize = r * (bDef.drawScale || 2.35);
      const aspect = img.naturalWidth / img.naturalHeight;
      let drawW = baseSize;
      let drawH = baseSize;
      if (aspect > 1) {
        drawH = baseSize / aspect;
      } else {
        drawW = baseSize * aspect;
      }
      this.ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    } else {
      this.ctx.fillStyle = bDef.color;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, r, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  // Die-cut Sprite Renderer for Ashi Pigs (NO Circle Clip!)
  renderPig(pig) {
    const p = pig.position;
    const pDef = pig.pDef;
    const r = pDef.radius;
    const img = this.imagesCache[pDef.sprite];

    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(pig.angle);

    if (pig.hurtFlash > 0) {
      this.ctx.shadowColor = '#ff1744';
      this.ctx.shadowBlur = 16;
    } else {
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.38)';
      this.ctx.shadowBlur = 6;
      this.ctx.shadowOffsetY = 3;
    }

    if (img && img.complete && img.naturalWidth > 0) {
      const baseSize = r * (pDef.drawScale || 2.4);
      const aspect = img.naturalWidth / img.naturalHeight;
      let drawW = baseSize;
      let drawH = baseSize;
      if (aspect > 1) {
        drawH = baseSize / aspect;
      } else {
        drawW = baseSize * aspect;
      }
      this.ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    } else {
      this.ctx.fillStyle = '#66bb6a';
      this.ctx.beginPath();
      this.ctx.arc(0, 0, r, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.restore();

    // Render Pink Stella Bubble if trapped
    if (pig.bubbleTimer > 0) {
      this.renderPinkBubble(p.x, p.y, r * 1.45);
    }

    // Render Health Bar above damaged pigs or Boss Pig
    if (pig.hp < pig.maxHp || pDef.isBoss) {
      const barW = pDef.isBoss ? 72 : 44;
      const barH = 6;
      const bx = p.x - barW / 2;
      const by = p.y - r * 1.35 - 10;
      const ratio = Math.max(0, pig.hp / pig.maxHp);

      this.ctx.save();
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      this.ctx.fillRect(bx - 1, by - 1, barW + 2, barH + 2);
      this.ctx.fillStyle = ratio > 0.5 ? '#76ff03' : (ratio > 0.25 ? '#ffca28' : '#ff1744');
      this.ctx.fillRect(bx, by, barW * ratio, barH);
      this.ctx.restore();
    }
  }

  renderPinkBubble(x, y, radius) {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(244, 143, 177, 0.32)';
    this.ctx.strokeStyle = 'rgba(255, 193, 227, 0.9)';
    this.ctx.lineWidth = 2.5;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();

    // Specular bubble shine
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    this.ctx.beginPath();
    this.ctx.arc(x - radius * 0.35, y - radius * 0.35, radius * 0.2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  renderBlock(block) {
    const p = block.position;
    const w = block.w;
    const h = block.h;
    const mat = block.matDef;

    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(block.angle);

    if (block.isTNT) {
      // Wooden TNT Explosive Crate
      this.ctx.fillStyle = '#d32f2f';
      this.ctx.fillRect(-w / 2, -h / 2, w, h);

      // Crate Cross Slats
      this.ctx.strokeStyle = '#8e0000';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(-w / 2 + 1.5, -h / 2 + 1.5, w - 3, h - 3);

      // White Banner
      this.ctx.fillStyle = '#fff8e1';
      this.ctx.fillRect(-w / 2 + 3, -h * 0.22, w - 6, h * 0.44);

      this.ctx.fillStyle = '#b71c1c';
      this.ctx.font = '900 14px "Inter", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('TNT', 0, 1);
    } else {
      // Rich Material Block with Bevel
      const grad = this.ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      grad.addColorStop(0, mat.color);
      grad.addColorStop(1, mat.colorDark || mat.color);
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(-w / 2, -h / 2, w, h);

      // Inner highlight
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(-w / 2 + 2, -h / 2 + 2, w - 4, h - 4);

      // Outer border
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = mat.borderColor;
      this.ctx.strokeRect(-w / 2, -h / 2, w, h);

      // Damage cracks
      const dmgRatio = 1 - block.hp / block.maxHp;
      if (dmgRatio > 0.3) {
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
        this.ctx.lineWidth = 1.8;
        this.ctx.beginPath();
        this.ctx.moveTo(-w * 0.28, -h * 0.25);
        this.ctx.lineTo(0, 0);
        this.ctx.lineTo(w * 0.3, h * 0.22);
        if (dmgRatio > 0.6) {
          this.ctx.moveTo(w * 0.2, -h * 0.25);
          this.ctx.lineTo(0, 0);
          this.ctx.lineTo(-w * 0.22, h * 0.28);
        }
        this.ctx.stroke();
      }
    }

    this.ctx.restore();

    if (block.bubbleTimer > 0) {
      this.renderPinkBubble(p.x, p.y, Math.max(w, h) * 0.65);
    }
  }

  renderWaitingBirdsOnGround() {
    this.birdsQueue.forEach((bDef, idx) => {
      const hop = Math.abs(Math.sin(this.animTime * 3.5 + idx * 1.1)) * 5;
      const qx = this.slingX - 75 - idx * 46;
      const qy = this.groundY - 20 - hop;
      const spriteUrl = bDef.queueSprite || bDef.sprite;
      const img = this.imagesCache[spriteUrl];

      this.ctx.save();
      this.ctx.translate(qx, qy);
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      this.ctx.shadowBlur = 5;
      this.ctx.shadowOffsetY = 2;

      if (img && img.complete && img.naturalWidth > 0) {
        const size = 44;
        const aspect = img.naturalWidth / img.naturalHeight;
        const dw = aspect > 1 ? size : size * aspect;
        const dh = aspect > 1 ? size / aspect : size;
        this.ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
      }
      this.ctx.restore();
    });
  }

  renderShockwavesAndParticles() {
    // Shockwave rings
    this.shockwaves.forEach((sw) => {
      this.ctx.save();
      this.ctx.strokeStyle = sw.color;
      this.ctx.globalAlpha = Math.max(0, sw.alpha);
      this.ctx.lineWidth = 6;
      this.ctx.beginPath();
      this.ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.restore();
    });

    // Particles
    this.particles.forEach((p) => {
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.globalAlpha = 1.0;

    // Floating Score / Skill Popups
    this.floatingTexts.forEach((ft) => {
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, ft.alpha));
      const baseSize = ft.isScore ? 24 : 22;
      const fontSize = Math.round(baseSize * (ft.scale || 1.0));
      this.ctx.font = `900 ${fontSize}px "Inter", "IBM Plex Sans Thai", sans-serif`;
      this.ctx.fillStyle = ft.color;
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = ft.isScore ? 5 : 4;
      this.ctx.textAlign = 'center';
      this.ctx.shadowColor = 'rgba(0,0,0,0.85)';
      this.ctx.shadowBlur = 6;
      this.ctx.strokeText(ft.text, ft.x, ft.y);
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    });
  }

  // =========================================================================
  // PARTICLE GENERATORS
  // =========================================================================
  createPuffParticles(x, y, color = '#ffffff', count = 14) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 3 + Math.random() * 5,
        color,
        alpha: 1.0,
        fade: 0.028 + Math.random() * 0.02,
        gravity: 0.04
      });
    }
  }

  createDebrisParticles(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        r: 3 + Math.random() * 4,
        color,
        alpha: 1.0,
        fade: 0.024,
        gravity: 0.2
      });
    }
  }

  createExplosionEffect(x, y, count = 26, maxSpeed = 6.2) {
    const colors = ['#ff3d00', '#ff9100', '#ffd600', '#ffffff', '#424242'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * maxSpeed;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        fade: 0.025 + Math.random() * 0.02,
        gravity: 0.06
      });
    }
  }

  addFloatingText(x, y, text, color = '#ffd54f', isBig = false) {
    this.floatingTexts.push({
      x,
      y,
      text,
      color,
      alpha: 1.0,
      scale: isBig ? 1.35 : 1.0,
      rVelY: isBig ? -1.8 : -1.3
    });
  }

  addFloatingScore(x, y, pts, color = '#ffd54f', isBig = false) {
    const text = `+${pts.toLocaleString()}`;
    this.floatingTexts.push({
      x,
      y,
      text,
      color,
      alpha: 1.0,
      scale: isBig ? 1.4 : 1.15,
      isScore: true,
      rVelY: isBig ? -2.0 : -1.5
    });
  }

  registerHitCombo(x, y) {
    const now = performance.now();
    if (now - this.lastHitTime < 1350) {
      this.comboCount++;
      if (this.comboCount >= 2) {
        const comboBonus = Math.min(this.comboCount * 300, 3000);
        this.levelScore += comboBonus;
        this.totalScore += comboBonus;
        const comboText = `COMBO x${this.comboCount}! +${comboBonus.toLocaleString()}`;
        this.addFloatingText(x, y - 48, comboText, '#ffb300', true);
        this.createPuffParticles(x, y - 36, '#ffb300', 10);
      }
    } else {
      this.comboCount = 1;
    }
    this.lastHitTime = now;
  }

  // =========================================================================
  // UI & HUD MANAGEMENT
  // =========================================================================
  updateHUD() {
    const scoreEl = document.getElementById('hud-score');
    if (scoreEl) {
      scoreEl.textContent = this.levelScore.toLocaleString();
      scoreEl.classList.add('bump');
      clearTimeout(this.scoreBumpTimer);
      this.scoreBumpTimer = setTimeout(() => {
        scoreEl.classList.remove('bump');
      }, 160);
    }

    const lvlEl = document.getElementById('hud-level-title');
    if (lvlEl && this.currentLevel) lvlEl.textContent = this.currentLevel.name;

    const subEl = document.getElementById('hud-level-sub');
    if (subEl && this.currentLevel) subEl.textContent = this.currentLevel.subtitle || '';

    const pigsLeftEl = document.getElementById('hud-pigs-left');
    if (pigsLeftEl) pigsLeftEl.textContent = `${this.targets.length}`;

    // Live Star Calculation & Target Progress Bar
    if (this.currentLevel) {
      const unusedCount = this.birdsQueue.length + (this.activeBird ? 1 : 0);
      const totalBirds = this.currentLevel.birds.length;
      const birdsUsed = Math.max(0, totalBirds - unusedCount);
      const maxDirect3StarBirds = totalBirds >= 4 ? 2 : 1;
      const blockRatio = this.totalBlocksInLevel > 0
        ? (this.destroyedBlocksCount / this.totalBlocksInLevel)
        : 0;
      const blockPct = Math.round(blockRatio * 100);

      // Determine projected stars based on exact user rule:
      let stars = 0;
      if (this.isGameOver) {
        stars = this.levelStars[this.currentLevelIndex] || 1;
      } else {
        if (birdsUsed <= maxDirect3StarBirds) {
          // If within direct 3-star bird limit, clearing all pigs will earn 3 stars!
          stars = 3;
        } else if (blockPct >= 50) {
          // More than direct bird limit used, but obstacles destroyed >= 50%
          stars = 3;
        } else if (blockPct >= 20 || unusedCount >= 1) {
          stars = 2;
        } else {
          stars = 1;
        }
      }

      // Play chime when reaching a new star during gameplay
      if (stars > this.currentStars) {
        this.currentStars = stars;
        if (window.ashiAudio) window.ashiAudio.playStarChime(stars);
        const starLabels = ['⭐ ปลดล็อก 1 ดาวแล้ว!', '⭐⭐ ปลดล็อก 2 ดาวแล้ว!', '⭐⭐⭐ 3 ดาวเต็ม สุดยอด!'];
        this.addFloatingText(this.width / 2, 140, starLabels[stars - 1] || '⭐ STAR!', '#ffd54f', true);
      }

      const liveStarsEl = document.getElementById('hud-live-stars');
      if (liveStarsEl) {
        liveStarsEl.textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
      }

      const fillEl = document.getElementById('hud-star-fill');
      if (fillEl) {
        let fillPct = 0;
        if (birdsUsed <= maxDirect3StarBirds) {
          fillPct = 100;
        } else {
          fillPct = Math.min(100, Math.round((blockPct / 50) * 100));
        }
        fillEl.style.width = `${fillPct}%`;
      }

      const targetEl = document.getElementById('hud-star-target');
      if (targetEl) {
        if (this.targets.length > 0) {
          if (birdsUsed <= maxDirect3StarBirds) {
            const limitDesc = maxDirect3StarBirds === 1 ? 'นก 1 ตัว' : 'นกไม่เกิน 2 ตัว';
            targetEl.textContent = `หมูเหลือ ${this.targets.length} • ใช้นกไป ${birdsUsed} ตัว (ชนะด้วย${limitDesc} = 3★ ทันที!)`;
          } else {
            targetEl.textContent = `หมูเหลือ ${this.targets.length} • ทำลายสิ่งกีดขวาง ${this.destroyedBlocksCount}/${this.totalBlocksInLevel} (${blockPct}%) (ทำลายเกิน 50% = 3★)`;
          }
        } else {
          targetEl.textContent = `★★★ เคลียร์ด่านสำเร็จ! (${stars} ดาว)`;
        }
      }
    }
  }

  updateSkillButtonUI() {
    const skillBtn = document.getElementById('btn-trigger-skill');
    const currentBirdCard = document.getElementById('active-bird-info');
    const bDef = this.activeBird?.bDef || this.flyingBirds[0]?.bDef;

    if (currentBirdCard && bDef) {
      const spriteUrl = bDef.queueSprite || bDef.sprite;
      currentBirdCard.innerHTML = `
        <img src="${spriteUrl}" class="active-bird-sprite" alt="${bDef.nameTh}" />
        <div class="active-bird-meta">
          <strong>${bDef.nameTh}</strong>
          <span>${bDef.abilityName}</span>
        </div>
      `;
    }

    if (skillBtn) {
      const canSkill = this.hasFired && !this.abilityUsed && this.flyingBirds.length > 0;
      skillBtn.classList.toggle('ready', canSkill);
      skillBtn.disabled = !canSkill;
    }
  }

  renderBirdsQueueUI() {
    const wrap = document.getElementById('birds-queue-strip');
    if (!wrap) return;
    wrap.innerHTML = '';

    const allBirds = [];
    if (this.activeBird) allBirds.push(this.activeBird.bDef);
    allBirds.push(...this.birdsQueue);

    allBirds.forEach((bDef, i) => {
      const card = document.createElement('div');
      card.className = `queue-bird-slot ${i === 0 ? 'active' : ''}`;
      card.title = `${bDef.nameTh} — ${bDef.desc}`;
      const spriteUrl = bDef.queueSprite || bDef.sprite;
      card.innerHTML = `<img src="${spriteUrl}" alt="${bDef.nameTh}" />`;
      wrap.appendChild(card);
    });
  }

  setupUIEvents() {
    const lvlBtn = document.getElementById('btn-level-select');
    if (lvlBtn) lvlBtn.onclick = () => this.openLevelSelect();

    const rosterBtn = document.getElementById('btn-roster');
    if (rosterBtn) rosterBtn.onclick = () => this.openRosterModal();

    const restartBtn = document.getElementById('btn-restart');
    if (restartBtn) restartBtn.onclick = () => this.initLevel(this.currentLevelIndex);

    const skillBtn = document.getElementById('btn-trigger-skill');
    if (skillBtn) {
      skillBtn.onclick = (e) => {
        e.stopPropagation();
        this.triggerBirdAbility();
      };
    }

    const soundBtn = document.getElementById('btn-sound-toggle');
    if (soundBtn) {
      soundBtn.onclick = () => {
        const muted = window.ashiAudio.toggleMute();
        soundBtn.textContent = muted ? '🔇' : '🔊';
      };
    }

    const victoryNextBtn = document.getElementById('victory-next-btn');
    if (victoryNextBtn) {
      victoryNextBtn.onclick = () => {
        document.getElementById('victory-modal').classList.add('hidden');
        if (this.currentLevelIndex + 1 < window.LEVELS_DATA.length) {
          this.initLevel(this.currentLevelIndex + 1);
        } else {
          this.openLevelSelect();
        }
      };
    }

    const victoryRetryBtn = document.getElementById('victory-retry-btn');
    if (victoryRetryBtn) {
      victoryRetryBtn.onclick = () => {
        document.getElementById('victory-modal').classList.add('hidden');
        this.initLevel(this.currentLevelIndex);
      };
    }

    const defeatRetryBtn = document.getElementById('defeat-retry-btn');
    if (defeatRetryBtn) {
      defeatRetryBtn.onclick = () => {
        document.getElementById('defeat-modal').classList.add('hidden');
        this.initLevel(this.currentLevelIndex);
      };
    }

    // Title / Cover Screen Actions
    const titleModal = document.getElementById('title-modal');
    const startBtn = document.getElementById('title-start-btn');
    if (startBtn && titleModal) {
      startBtn.onclick = () => {
        window.ashiAudio.ensureContext();
        titleModal.classList.add('hidden');
      };
    }

    const titleRosterBtn = document.getElementById('title-roster-btn');
    if (titleRosterBtn && titleModal) {
      titleRosterBtn.onclick = () => {
        window.ashiAudio.ensureContext();
        titleModal.classList.add('hidden');
        this.openRosterModal();
      };
    }

    const titleLevelsBtn = document.getElementById('title-levels-btn');
    if (titleLevelsBtn && titleModal) {
      titleLevelsBtn.onclick = () => {
        window.ashiAudio.ensureContext();
        titleModal.classList.add('hidden');
        this.openLevelSelect();
      };
    }
  }

  openLevelSelect() {
    const modal = document.getElementById('level-modal');
    const grid = document.getElementById('level-grid');
    if (!modal || !grid) return;
    grid.innerHTML = '';

    window.LEVELS_DATA.forEach((lvl, idx) => {
      const card = document.createElement('div');
      card.className = `lvl-card ${idx === this.currentLevelIndex ? 'current' : ''}`;
      const stars = this.levelStars[idx] || 0;
      const starText = '★'.repeat(stars) + '☆'.repeat(3 - stars);
      const firstBird = window.BIRD_TYPES[lvl.birds[0]] || window.BIRD_TYPES.red;

      card.innerHTML = `
        <div class="lvl-num">ด่าน ${lvl.id}</div>
        <img class="lvl-thumb-sprite" src="${firstBird.queueSprite || firstBird.sprite}" alt="" />
        <div class="lvl-title">${lvl.name.split(':')[1] || lvl.name}</div>
        <div class="lvl-stars">${starText}</div>
      `;
      card.onclick = () => {
        modal.classList.add('hidden');
        this.initLevel(idx);
      };
      grid.appendChild(card);
    });

    modal.classList.remove('hidden');
  }

  openRosterModal() {
    const modal = document.getElementById('roster-modal');
    const grid = document.getElementById('roster-grid');
    if (!modal || !grid) return;
    grid.innerHTML = '';

    Object.values(window.BIRD_TYPES).forEach((b) => {
      const item = document.createElement('div');
      item.className = 'roster-card';
      item.innerHTML = `
        <div class="roster-sprite-wrap">
          <img src="${b.queueSprite || b.sprite}" alt="${b.nameTh}" />
        </div>
        <div class="roster-info">
          <span class="roster-tag bird-tag">นกอชิ</span>
          <h4>${b.nameTh}</h4>
          <div class="roster-skill">${b.abilityName}</div>
          <p>${b.desc}</p>
        </div>
      `;
      grid.appendChild(item);
    });

    ['chef', 'commander', 'boss'].forEach((pKey) => {
      const p = window.PIG_TYPES[pKey];
      if (!p) return;
      const item = document.createElement('div');
      item.className = 'roster-card pig-card';
      item.innerHTML = `
        <div class="roster-sprite-wrap">
          <img src="${p.sprite}" alt="${p.nameTh}" />
        </div>
        <div class="roster-info">
          <span class="roster-tag pig-tag">ศัตรู (${p.maxHp} HP)</span>
          <h4>${p.nameTh}</h4>
          <div class="roster-skill">ค่าหัว +${p.score.toLocaleString()} แต้ม</div>
          <p>เป้าหมายประจำป้อมปราการ กำจัดให้หมดเพื่อผ่านด่าน!</p>
        </div>
      `;
      grid.appendChild(item);
    });

    modal.classList.remove('hidden');
  }

  showVictoryModal(stars, birdsBonus, unusedCount, birdsUsed = 1, blockRatio = 0, starReason = '', maxDirect3StarBirds = 1) {
    const modal = document.getElementById('victory-modal');
    if (!modal) return;

    const starsEl = document.getElementById('victory-stars-display');
    if (starsEl) starsEl.textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);

    const pct = Math.round((blockRatio || 0) * 100);
    const blocksStatEl = document.getElementById('victory-blocks-stat');
    if (blocksStatEl) {
      blocksStatEl.textContent = `${this.destroyedBlocksCount} / ${this.totalBlocksInLevel} ชิ้น (${pct}%)`;
    }

    const birdsStatEl = document.getElementById('victory-birds-stat');
    if (birdsStatEl) {
      let birdBadge = '';
      if (birdsUsed <= maxDirect3StarBirds) {
        birdBadge = maxDirect3StarBirds === 1
          ? '🌟 (ใช้นกตัวเดียว ได้ 3 ดาวทันที!)'
          : `🌟 (ใช้นก ${birdsUsed} ตัว ไม่เกิน 2 ตัว ได้ 3 ดาวทันที!)`;
      }
      birdsStatEl.textContent = `${birdsUsed} ตัว ${birdBadge}`;
    }

    const baseScore = Math.max(0, this.levelScore - birdsBonus);
    const baseEl = document.getElementById('victory-base-score');
    if (baseEl) baseEl.textContent = baseScore.toLocaleString();

    const bonusEl = document.getElementById('victory-bonus-num');
    if (bonusEl) {
      bonusEl.textContent = unusedCount > 0 ? `+${birdsBonus.toLocaleString()}` : '+0';
    }

    const bonusLabelEl = document.getElementById('victory-bonus-label');
    if (bonusLabelEl) {
      bonusLabelEl.textContent = unusedCount > 0
        ? `โบนัสนกเหลือ (${unusedCount} ตัว x10,000):`
        : 'โบนัสนกเหลือ:';
    }

    const scoreEl = document.getElementById('victory-score-num');
    if (scoreEl) scoreEl.textContent = this.levelScore.toLocaleString();

    const statusEl = document.getElementById('victory-star-status');
    if (statusEl) {
      statusEl.textContent = starReason || (stars === 3 ? '⭐⭐⭐ 3 ดาวเต็ม!' : `⭐ ได้รับ ${stars} ดาว`);
      if (stars === 3) {
        statusEl.style.borderColor = '#ffd54f';
        statusEl.style.color = '#ffd54f';
      } else if (stars === 2) {
        statusEl.style.borderColor = '#ffca28';
        statusEl.style.color = '#ffca28';
      } else {
        statusEl.style.borderColor = '#ffb300';
        statusEl.style.color = '#ffb300';
      }
    }

    modal.classList.remove('hidden');
  }

  showDefeatModal() {
    const modal = document.getElementById('defeat-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
  }

  // =========================================================================
  // ANIMATION LOOP
  // =========================================================================
  startLoop() {
    let lastTime = performance.now();
    const frame = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.035);
      lastTime = time;

      this.update(dt);
      this.render();
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
}

function fitGame() {
  const wrap = document.getElementById('game-wrap');
  if (!wrap) return;
  const targetW = 1280;
  const targetH = 720;
  const vw = (window.visualViewport && window.visualViewport.width) || window.innerWidth;
  const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
  const padW = vw < 600 ? 6 : 0;
  const padH = vh < 600 ? 6 : 0;
  const availW = Math.max(vw - padW * 2, 240);
  const availH = Math.max(vh - padH * 2, 240);
  const scale = Math.min(availW / targetW, availH / targetH);
  wrap.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', fitGame);
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', fitGame);
}
window.addEventListener('orientationchange', () => {
  setTimeout(fitGame, 60);
  setTimeout(fitGame, 250);
});
window.addEventListener('DOMContentLoaded', () => {
  fitGame();
  window.game = new AshiBirdsGame();
});
