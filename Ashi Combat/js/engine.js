// ==========================================
// ASHI COMBAT: 2D COMBAT ENGINE
// ==========================================

import { combatAudio } from './audio.js';

export class Projectile {
  constructor(fighter, type, x, y, dir, opts = {}) {
    this.fighter = fighter;
    this.type = type; // 'spear', 'freeze', 'fireball', 'lightning', 'mewing', 'snore', 'shadow', 'rock'
    this.x = x;
    this.y = y;
    this.dir = dir; // 1 or -1
    this.speed = opts.speed || 14;
    this.width = opts.width || 40;
    this.height = opts.height || 40;
    this.damage = opts.damage || 15;
    this.active = true;
    this.lifetime = opts.lifetime || 90;
    this.age = 0;
    this.color = opts.color || '#ffaa00';
    this.isSpear = type === 'spear';
    this.attachedVictim = null;
    this.pullBackSpeed = 16;
  }

  update(engine) {
    this.age++;
    if (this.age > this.lifetime) {
      this.active = false;
      return;
    }

    if (this.isSpear && this.attachedVictim) {
      // Pulling victim back to the fighter
      const targetX = this.fighter.x + this.fighter.facing * 70;
      const dx = targetX - this.attachedVictim.x;
      if (Math.abs(dx) > 20) {
        this.attachedVictim.x += Math.sign(dx) * this.pullBackSpeed;
        this.x = this.attachedVictim.x;
      } else {
        this.attachedVictim.stunTimer = 60; // stunned for 1 sec
        this.attachedVictim.state = 'hurt';
        this.active = false;
        combatAudio.playPunch(true);
      }
      return;
    }

    this.x += this.dir * this.speed;

    // Check boundary
    if (this.x < 30 || this.x > 1250) {
      this.active = false;
    }
  }

  getHitbox() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    };
  }
}

export class Fighter {
  constructor(data, isP1, floorY = 570) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.thaiName = data.thaiName;
    this.isP1 = isP1;
    this.floorY = floorY;

    // Positions
    this.x = isP1 ? 320 : 960;
    this.y = floorY;
    this.vx = 0;
    this.vy = 0;
    this.width = 85;
    this.height = 175;
    this.facing = isP1 ? 1 : -1;

    // Combat Stats
    this.maxHp = 100;
    this.hp = 100;
    this.superMeter = 0; // 0 to 100
    this.roundsWon = 0;

    // Multipliers from stats
    this.atkMul = (data.stats.atk || 8) / 8;
    this.speedMul = (data.stats.spd || 8) / 8;
    this.defMul = (data.stats.def || 8) / 8;

    // States
    this.state = 'idle'; // idle, walk_fwd, walk_bwd, jump, crouch, punch_light, punch_heavy, kick_light, kick_heavy, special, block, hurt, knockdown, getup, dazed, fatality_performer, fatality_victim, victory, dead
    this.stateTime = 0;
    this.isGrounded = true;
    this.isBlocking = false;
    this.isCrouching = false;
    this.invulnerableTimer = 0;
    this.freezeTimer = 0;
    this.stunTimer = 0;
    this.armorTimer = 0;
    this.curseTimer = 0; // cannot block

    // Hitbox / Combo
    this.hitbox = null;
    this.hasHitThisAttack = false;
    this.comboHits = 0;
    this.comboDamage = 0;
    this.comboTimer = 0;

    // Fatality state
    this.fatalityType = null;
    this.fatalityStage = 0;

    // Special animation helpers
    this.activeSpecial = null;
  }

  reset(isP1) {
    this.isP1 = isP1;
    this.x = isP1 ? 320 : 960;
    this.y = this.floorY;
    this.vx = 0;
    this.vy = 0;
    this.facing = isP1 ? 1 : -1;
    this.hp = this.maxHp;
    this.state = 'idle';
    this.stateTime = 0;
    this.isGrounded = true;
    this.isBlocking = false;
    this.isCrouching = false;
    this.invulnerableTimer = 0;
    this.freezeTimer = 0;
    this.stunTimer = 0;
    this.armorTimer = 0;
    this.curseTimer = 0;
    this.hitbox = null;
    this.hasHitThisAttack = false;
    this.comboHits = 0;
    this.comboDamage = 0;
    this.comboTimer = 0;
    this.fatalityType = null;
    this.fatalityStage = 0;
    this.activeSpecial = null;
  }

  getHurtbox() {
    const crouchOffset = this.isCrouching ? 60 : 0;
    const h = this.height - crouchOffset;
    return {
      x: this.x - this.width / 2,
      y: this.y - h,
      width: this.width,
      height: h
    };
  }

  setState(newState, force = false) {
    if (this.state === newState && !force) return;
    if (this.state === 'dead' || this.state === 'fatality_victim') return;
    if (this.state === 'dazed' && !force && newState !== 'hurt' && newState !== 'knockdown' && newState !== 'fatality_victim') return;

    this.state = newState;
    this.stateTime = 0;
    this.hasHitThisAttack = false;
    this.hitbox = null;

    if (newState === 'crouch') {
      this.isCrouching = true;
    } else if (newState !== 'crouch_punch' && newState !== 'crouch_kick' && newState !== 'crouch_block') {
      this.isCrouching = false;
    }
  }

  handleInputs(inputs, opponent, engine) {
    if (this.freezeTimer > 0 || this.stunTimer > 0) return;
    if (this.state === 'hurt' || this.state === 'knockdown' || this.state === 'getup' || this.state === 'dazed') return;
    if (this.state === 'fatality_performer' || this.state === 'fatality_victim' || this.state === 'victory' || this.state === 'dead') return;

    // Update facing direction automatically if on ground and not in locked attack
    const isAttacking = this.state.startsWith('punch') || this.state.startsWith('kick') || this.state.startsWith('special');
    if (this.isGrounded && !isAttacking) {
      this.facing = this.x < opponent.x ? 1 : -1;
    }

    // 1. Fatality trigger during "FINISH HIM"
    if (engine.isFinishHim && inputs.fatality && !isAttacking) {
      engine.triggerFatality(this, opponent);
      return;
    }

    // 2. Fatal Blow (Super Move when Super Meter == 100)
    if (inputs.superMove && this.superMeter >= 100 && this.isGrounded && !isAttacking) {
      this.superMeter = 0;
      this.executeSuper(opponent, engine);
      return;
    }

    // 3. Specials
    if (inputs.special && this.isGrounded && !isAttacking) {
      this.executeSpecial(inputs.specialIndex || 0, opponent, engine);
      return;
    }

    // 4. Blocking
    if (inputs.block && this.isGrounded && this.curseTimer <= 0 && !isAttacking) {
      this.isBlocking = true;
      this.setState(inputs.down ? 'crouch_block' : 'block');
      this.vx = 0;
      return;
    } else {
      this.isBlocking = false;
    }

    // 5. Attacks (only when free)
    if (!isAttacking) {
      if (inputs.punchHeavy) {
        this.setState(inputs.down ? 'crouch_punch_heavy' : 'punch_heavy');
        this.vx = this.facing * 3;
        combatAudio.playPunch(true);
        return;
      }
      if (inputs.punch) {
        this.setState(inputs.down ? 'crouch_punch' : 'punch_light');
        this.vx = this.facing * 2;
        combatAudio.playPunch(false);
        return;
      }
      if (inputs.kickHeavy) {
        this.setState(inputs.down ? 'crouch_kick' : 'kick_heavy');
        this.vx = this.facing * 4;
        combatAudio.playKick(true);
        return;
      }
      if (inputs.kick) {
        this.setState('kick_light');
        this.vx = this.facing * 3;
        combatAudio.playKick(false);
        return;
      }
    }

    // 6. Movement
    if (!isAttacking) {
      if (inputs.up && this.isGrounded) {
        this.vy = -20; // Jump force
        this.isGrounded = false;
        this.setState('jump');
        // Forward / backward jump velocity
        if (inputs.right) this.vx = 6 * this.speedMul;
        else if (inputs.left) this.vx = -6 * this.speedMul;
        return;
      }

      if (inputs.down && this.isGrounded) {
        this.setState('crouch');
        this.vx = 0;
        return;
      }

      if (this.isGrounded) {
        if (inputs.right) {
          const isMovingFwd = this.facing === 1;
          this.vx = 5.5 * this.speedMul;
          this.setState(isMovingFwd ? 'walk_fwd' : 'walk_bwd');
        } else if (inputs.left) {
          const isMovingFwd = this.facing === -1;
          this.vx = -5.5 * this.speedMul;
          this.setState(isMovingFwd ? 'walk_fwd' : 'walk_bwd');
        } else {
          this.vx = 0;
          this.setState('idle');
        }
      }
    }
  }

  executeSpecial(index, opponent, engine) {
    const special = this.data.specials[index] || this.data.specials[0];
    this.activeSpecial = special;
    this.setState('special');
    this.superMeter = Math.max(0, this.superMeter - (special.cost || 20));

    // Handle character-specific special moves
    const key = special.key;

    if (key === 'spear') {
      // Scorpion Spear
      combatAudio.playSpear();
      combatAudio.announce('GET OVER HERE!');
      engine.addProjectile(new Projectile(this, 'spear', this.x + this.facing * 60, this.y - 110, this.facing, {
        speed: 18,
        width: 35,
        height: 25,
        damage: special.damage * this.atkMul,
        color: '#ffcc00'
      }));
    } else if (key === 'firebreath') {
      // Scorpion Fire Breath
      combatAudio.playFire();
      this.vx = this.facing * 2;
    } else if (key === 'teleport' || key === 'thundertp') {
      // Teleport behind opponent
      combatAudio.playLightning();
      this.x = opponent.x - opponent.facing * 90;
      this.facing = opponent.x < this.x ? -1 : 1;
      this.vy = -10;
      this.isGrounded = false;
      this.setState('kick_heavy');
      combatAudio.playKick(true);
    } else if (key === 'freeze') {
      // Sub-Zero Ice Freeze
      combatAudio.playFreeze();
      engine.addProjectile(new Projectile(this, 'freeze', this.x + this.facing * 60, this.y - 100, this.facing, {
        speed: 15,
        width: 45,
        height: 45,
        damage: special.damage * this.atkMul,
        color: '#00d4ff'
      }));
    } else if (key === 'slide') {
      // Sub-Zero Ice Slide
      combatAudio.playFreeze();
      this.vx = this.facing * 16;
      this.isCrouching = true;
    } else if (key === 'iceclone') {
      // Sub-Zero Ice Clone Decoy
      combatAudio.playFreeze();
      engine.addIceClone(this.x, this.y);
      this.x -= this.facing * 120; // hop backwards
    } else if (key === 'mewing') {
      // Gigachad Mewing Shockwave
      combatAudio.playSonicBoom();
      engine.addProjectile(new Projectile(this, 'mewing', this.x + this.facing * 60, this.y - 110, this.facing, {
        speed: 16,
        width: 55,
        height: 70,
        damage: special.damage * this.atkMul,
        color: '#ffd700'
      }));
    } else if (key === 'chinupper') {
      // Gigachad Chin Uppercut
      combatAudio.playPunch(true);
      this.vy = -22;
      this.vx = this.facing * 5;
      this.isGrounded = false;
    } else if (key === 'flexarmor') {
      // Gigachad Hyper Flex Armor
      combatAudio.playSonicBoom();
      this.armorTimer = 180; // 3 seconds of super armor
      engine.addEffect('flash', this.x, this.y - 100, '#ffd700');
    } else if (key === 'torpedo') {
      // Raiden Torpedo Fly
      combatAudio.playLightning();
      combatAudio.announce('GIBBERISH FLY!');
      this.vx = this.facing * 20;
      this.vy = -1;
      this.isGrounded = false;
    } else if (key === 'lightning') {
      // Raiden Lightning Bolt
      combatAudio.playLightning();
      engine.addProjectile(new Projectile(this, 'lightning', this.x + this.facing * 60, this.y - 110, this.facing, {
        speed: 19,
        width: 60,
        height: 35,
        damage: special.damage * this.atkMul,
        color: '#70d6ff'
      }));
    } else if (key === 'dragonkick') {
      // Liu Kang Flying Dragon Kick
      combatAudio.playFire();
      this.vx = this.facing * 18;
      this.vy = -6;
      this.isGrounded = false;
    } else if (key === 'bicycle') {
      // Liu Kang Bicycle Kicks
      combatAudio.playKick(true);
      this.vx = this.facing * 9;
      this.vy = -4;
      this.isGrounded = false;
    } else if (key === 'dragonfire') {
      // Liu Kang Dragon Fireball
      combatAudio.playFire();
      engine.addProjectile(new Projectile(this, 'fireball', this.x + this.facing * 60, this.y - 105, this.facing, {
        speed: 16,
        width: 50,
        height: 40,
        damage: special.damage * this.atkMul,
        color: '#ff4400'
      }));
    } else if (key === 'divestomp') {
      // Boxer Dive Stomp
      combatAudio.playPunch(true);
      this.vy = -24;
      this.vx = this.facing * 4;
      this.isGrounded = false;
    } else if (key === 'gatling') {
      // Boxer Gatling Punches
      combatAudio.playPunch(true);
      this.vx = this.facing * 4;
    } else if (key === 'snore') {
      // Slumber Snore Cannon
      combatAudio.playSonicBoom();
      engine.addProjectile(new Projectile(this, 'snore', this.x + this.facing * 60, this.y - 100, this.facing, {
        speed: 11,
        width: 65,
        height: 65,
        damage: special.damage * this.atkMul,
        color: '#c77dff'
      }));
    } else if (key === 'rollstrike') {
      // Slumber Rolling Snorlax
      combatAudio.playPunch(true);
      this.vx = this.facing * 16;
    } else if (key === 'shadowclone') {
      // Shadow Clone Rush
      combatAudio.playLightning();
      engine.addProjectile(new Projectile(this, 'shadow', this.x + this.facing * 60, this.y - 90, this.facing, {
        speed: 15,
        width: 75,
        height: 120,
        damage: special.damage * this.atkMul,
        color: '#4a0e4e'
      }));
    } else {
      // Generic special
      combatAudio.playPunch(true);
    }
  }

  executeSuper(opponent, engine) {
    this.setState('special');
    combatAudio.playSuper();
    engine.triggerSlowMo(40, 0.25);
    engine.addEffect('screen_dim', this.x, this.y, '#ffff00');
    combatAudio.announce('SUPER COMBO!');

    // Devastating rush forward
    this.vx = this.facing * 22;
    this.hasHitThisAttack = false;
  }

  update(opponent, engine) {
    this.stateTime++;

    // Timers
    if (this.invulnerableTimer > 0) this.invulnerableTimer--;
    if (this.freezeTimer > 0) {
      this.freezeTimer--;
      this.vx = 0;
      this.vy = 0;
      return;
    }
    if (this.stunTimer > 0) {
      this.stunTimer--;
      this.vx = 0;
      return;
    }
    if (this.armorTimer > 0) this.armorTimer--;
    if (this.curseTimer > 0) this.curseTimer--;

    // Combo timer
    if (this.comboTimer > 0) {
      this.comboTimer--;
      if (this.comboTimer <= 0) {
        this.comboHits = 0;
        this.comboDamage = 0;
      }
    }

    // Apply Physics & Gravity
    if (!this.isGrounded) {
      this.vy += 1.05; // Gravity
      this.y += this.vy;

      if (this.y >= this.floorY) {
        this.y = this.floorY;
        this.vy = 0;
        this.isGrounded = true;
        if (this.state === 'jump') {
          this.setState('idle');
          this.vx = 0;
        } else if (this.state === 'knockdown') {
          // Bounce off floor
          combatAudio.playPunch(true);
          engine.triggerScreenShake(12);
          this.setState('getup');
        }
      }
    }

    this.x += this.vx;

    // Arena Boundaries (leave room for screen)
    if (this.x < 70) this.x = 70;
    if (this.x > 1210) this.x = 1210;

    // Friction on ground
    if (this.isGrounded) {
      this.vx *= 0.82;
      if (Math.abs(this.vx) < 0.2) this.vx = 0;
    }

    // State Durations & Transitions
    this.updateAttackFrames(opponent, engine);
  }

  updateAttackFrames(opponent, engine) {
    const st = this.stateTime;

    // Punch Light (16 frames)
    if (this.state === 'punch_light' || this.state === 'crouch_punch') {
      if (st >= 4 && st <= 10 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 20 : -90),
          y: this.y - (this.state === 'crouch_punch' ? 70 : 130),
          width: 70,
          height: 40,
          damage: 7 * this.atkMul,
          knockbackX: this.facing * 5,
          knockbackY: -2,
          isHeavy: false,
          type: 'punch'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 15) this.setState(this.isCrouching ? 'crouch' : 'idle');
    }

    // Punch Heavy / Uppercut (24 frames)
    else if (this.state === 'punch_heavy' || this.state === 'crouch_punch_heavy') {
      if (st >= 6 && st <= 14 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 25 : -100),
          y: this.y - 145,
          width: 75,
          height: 70,
          damage: 16 * this.atkMul,
          knockbackX: this.facing * 8,
          knockbackY: -16, // Launches into air!
          isHeavy: true,
          type: 'uppercut'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 24) this.setState(this.isCrouching ? 'crouch' : 'idle');
    }

    // Kick Light (18 frames)
    else if (this.state === 'kick_light') {
      if (st >= 5 && st <= 11 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 25 : -100),
          y: this.y - 95,
          width: 75,
          height: 45,
          damage: 9 * this.atkMul,
          knockbackX: this.facing * 6,
          knockbackY: -2,
          isHeavy: false,
          type: 'kick'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 18) this.setState('idle');
    }

    // Kick Heavy / Roundhouse (26 frames)
    else if (this.state === 'kick_heavy' || this.state === 'crouch_kick') {
      if (st >= 7 && st <= 15 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 25 : -110),
          y: this.y - (this.state === 'crouch_kick' ? 35 : 125),
          width: 85,
          height: 50,
          damage: 17 * this.atkMul,
          knockbackX: this.facing * 10,
          knockbackY: -9,
          isHeavy: true,
          type: 'heavy_kick'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 26) this.setState(this.isCrouching ? 'crouch' : 'idle');
    }

    // Special moves active window
    else if (this.state === 'special') {
      if (st >= 6 && st <= 22 && !this.hasHitThisAttack) {
        this.hitbox = {
          x: this.x + (this.facing === 1 ? 20 : -115),
          y: this.y - 120,
          width: 95,
          height: 80,
          damage: (this.activeSpecial ? this.activeSpecial.damage : 20) * this.atkMul,
          knockbackX: this.facing * 12,
          knockbackY: -11,
          isHeavy: true,
          type: 'special'
        };
      } else {
        this.hitbox = null;
      }
      if (st > 35) this.setState('idle');
    }

    // Hurt recovery (14 frames)
    else if (this.state === 'hurt') {
      if (st > 14) this.setState('idle');
    }

    // Knockdown & Get up
    else if (this.state === 'getup') {
      if (st > 25) {
        this.setState('idle');
        this.invulnerableTimer = 20; // wakeup frames
      }
    }
  }

  takeDamage(amount, knockX, knockY, isHeavy, isBlocked, engine) {
    if (this.invulnerableTimer > 0) return;
    if (this.armorTimer > 0) {
      // Super armor: take reduced damage, no flinch!
      this.hp = Math.max(0, this.hp - Math.round(amount * 0.5));
      combatAudio.playBlock();
      engine.addEffect('spark', this.x, this.y - 100, '#ffd700');
      return;
    }

    if (isBlocked) {
      const chipDamage = Math.max(1, Math.round(amount * 0.15));
      this.hp = Math.max(0, this.hp - chipDamage);
      this.vx = knockX * 0.4;
      combatAudio.playBlock();
      engine.addEffect('spark', this.x, this.y - 100, '#ffffff');
      return;
    }

    const finalDamage = Math.round((amount / this.defMul));
    this.hp = Math.max(0, this.hp - finalDamage);

    // Super meter gain on receiving damage
    this.superMeter = Math.min(100, this.superMeter + 6);

    // Sound and particle effects
    if (isHeavy) {
      combatAudio.playBoneCrunch();
      engine.triggerScreenShake(14);
    } else {
      combatAudio.playPunch(false);
      engine.triggerScreenShake(5);
    }
    combatAudio.playBloodSpurt();

    engine.addBloodParticles(this.x, this.y - 100, this.facing * -1, isHeavy ? 28 : 14, this.data.bloodColor || '#ff0000');
    engine.addDamagePopup(this.x, this.y - 140, finalDamage, isHeavy);

    // Knockback
    this.vx = knockX;
    if (knockY < -4) {
      this.vy = knockY;
      this.isGrounded = false;
      this.setState('knockdown', true);
    } else {
      this.setState('hurt', true);
    }

    // Check KO
    if (this.hp <= 0) {
      engine.handlePlayerZeroHP(this);
    }
  }
}

export class CombatEngine {
  constructor(p1Data, p2Data, stage) {
    this.stage = stage;
    this.floorY = stage.floorY || 570;
    this.p1 = new Fighter(p1Data, true, this.floorY);
    this.p2 = new Fighter(p2Data, false, this.floorY);

    this.projectiles = [];
    this.iceClones = [];
    this.effects = [];
    this.bloodParticles = [];
    this.damagePopups = [];

    // Match State
    this.round = 1;
    this.maxRounds = 3;
    this.roundTime = 99; // 99 seconds
    this.timerFrames = 0;
    this.state = 'intro'; // intro, fight, round_over, finish_him, fatality, match_over
    this.stateTimer = 0;

    // Slow motion & screen shake
    this.timeScale = 1.0;
    this.slowMoTimer = 0;
    this.screenShake = 0;

    // Finish Him state
    this.isFinishHim = false;
    this.finishHimTimer = 0;
    this.winner = null;
    this.loser = null;
    this.fatalityPerformer = null;
    this.fatalityVictim = null;
    this.fatalityType = null;
    this.isFlawless = false;
  }

  startMatch() {
    this.round = 1;
    this.p1.roundsWon = 0;
    this.p2.roundsWon = 0;
    this.startRound(1);
  }

  startRound(roundNumber) {
    this.round = roundNumber;
    this.roundTime = 99;
    this.timerFrames = 0;
    this.p1.reset(true);
    this.p2.reset(false);
    this.projectiles = [];
    this.iceClones = [];
    this.isFinishHim = false;
    this.state = 'intro';
    this.stateTimer = 0;

    combatAudio.playGong();
    const roundText = roundNumber === 1 ? 'ROUND ONE' : roundNumber === 2 ? 'ROUND TWO' : 'FINAL ROUND';
    combatAudio.announce(`${roundText}... FIGHT!`);
  }

  update(p1Inputs, p2Inputs) {
    // Screen shake decay
    if (this.screenShake > 0) this.screenShake *= 0.88;
    if (this.screenShake < 0.5) this.screenShake = 0;

    // Slow motion timer
    if (this.slowMoTimer > 0) {
      this.slowMoTimer--;
      if (this.slowMoTimer <= 0) this.timeScale = 1.0;
    }

    this.stateTimer++;

    // 1. Intro State
    if (this.state === 'intro') {
      if (this.stateTimer > 90) { // 1.5 seconds intro
        this.state = 'fight';
        this.stateTimer = 0;
      }
      return;
    }

    // 2. Fight State & Finish Him State
    if (this.state === 'fight' || this.state === 'finish_him') {
      // Countdown Timer (every 60 frames = 1 sec)
      if (this.state === 'fight') {
        this.timerFrames++;
        if (this.timerFrames >= 60) {
          this.timerFrames = 0;
          this.roundTime--;
          if (this.roundTime <= 0) {
            this.handleTimeOver();
            return;
          }
        }
      }

      // Finish Him timeout
      if (this.state === 'finish_him') {
        this.finishHimTimer--;
        if (this.finishHimTimer <= 0) {
          // Time expired -> standard decisive win
          this.loser.setState('dead');
          this.winner.setState('victory');
          this.state = 'match_over';
          combatAudio.announce(`${this.winner.name.toUpperCase()} WINS!`);
        }
      }

      // Input & Updates for both fighters
      this.p1.handleInputs(p1Inputs, this.p2, this);
      this.p2.handleInputs(p2Inputs, this.p1, this);

      this.p1.update(this.p2, this);
      this.p2.update(this.p1, this);

      // Check Attacks & Hitboxes
      this.checkCombatCollisions();

      // Update Projectiles
      this.updateProjectiles();
    }

    // 3. Fatality State
    if (this.state === 'fatality') {
      this.updateFatalitySequence();
    }

    // Update Particles & Effects
    this.updateParticles();
  }

  checkCombatCollisions() {
    // 1. P1 attacking P2
    if (this.p1.hitbox && !this.p1.hasHitThisAttack) {
      if (this.rectIntersects(this.p1.hitbox, this.p2.getHurtbox())) {
        this.p1.hasHitThisAttack = true;
        this.p1.comboHits++;
        this.p1.comboDamage += Math.round(this.p1.hitbox.damage);
        this.p1.comboTimer = 55;
        this.p1.superMeter = Math.min(100, this.p1.superMeter + 10);

        const isBlocked = this.p2.isBlocking;
        this.p2.takeDamage(
          this.p1.hitbox.damage,
          this.p1.hitbox.knockbackX,
          this.p1.hitbox.knockbackY,
          this.p1.hitbox.isHeavy,
          isBlocked,
          this
        );
      }
    }

    // 2. P2 attacking P1
    if (this.p2.hitbox && !this.p2.hasHitThisAttack) {
      if (this.rectIntersects(this.p2.hitbox, this.p1.getHurtbox())) {
        this.p2.hasHitThisAttack = true;
        this.p2.comboHits++;
        this.p2.comboDamage += Math.round(this.p2.hitbox.damage);
        this.p2.comboTimer = 55;
        this.p2.superMeter = Math.min(100, this.p2.superMeter + 10);

        const isBlocked = this.p1.isBlocking;
        this.p1.takeDamage(
          this.p2.hitbox.damage,
          this.p2.hitbox.knockbackX,
          this.p2.hitbox.knockbackY,
          this.p2.hitbox.isHeavy,
          isBlocked,
          this
        );
      }
    }
  }

  updateProjectiles() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.update(this);

      const target = proj.fighter === this.p1 ? this.p2 : this.p1;
      if (proj.active && this.rectIntersects(proj.getHitbox(), target.getHurtbox())) {
        if (proj.type === 'freeze') {
          target.freezeTimer = 130; // frozen in ice
          target.takeDamage(proj.damage, 0, 0, false, target.isBlocking, this);
          combatAudio.playFreeze();
          this.addEffect('ice_shatter', target.x, target.y - 90, '#00d4ff');
          proj.active = false;
        } else if (proj.type === 'spear') {
          proj.attachedVictim = target;
          target.takeDamage(proj.damage, 0, 0, true, false, this);
        } else if (proj.type === 'snore') {
          target.stunTimer = 110;
          target.takeDamage(proj.damage, target.facing * -4, -3, false, false, this);
          proj.active = false;
        } else {
          target.takeDamage(proj.damage, proj.dir * 8, -6, true, target.isBlocking, this);
          proj.active = false;
        }
      }

      if (!proj.active && !proj.attachedVictim) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  handlePlayerZeroHP(loser) {
    const winner = loser === this.p1 ? this.p2 : this.p1;
    this.winner = winner;
    this.loser = loser;

    // Check if this is the deciding round
    const neededWins = 2;
    if (winner.roundsWon + 1 >= neededWins) {
      // FINISH HIM!
      winner.roundsWon++;
      this.isFinishHim = true;
      this.state = 'finish_him';
      this.finishHimTimer = 360; // 6 seconds to execute Fatality!
      loser.setState('dazed', true);
      this.triggerSlowMo(60, 0.35);
      combatAudio.playFatalityStart();
      combatAudio.announce('FINISH HIM!');
    } else {
      // Normal round win
      winner.roundsWon++;
      this.state = 'round_over';
      this.stateTimer = 0;
      combatAudio.announce(`${winner.name.toUpperCase()} WINS!`);
      setTimeout(() => {
        this.startRound(this.round + 1);
      }, 2500);
    }
  }

  handleTimeOver() {
    this.state = 'round_over';
    if (this.p1.hp > this.p2.hp) {
      this.p1.roundsWon++;
      combatAudio.announce(`${this.p1.name.toUpperCase()} WINS!`);
    } else if (this.p2.hp > this.p1.hp) {
      this.p2.roundsWon++;
      combatAudio.announce(`${this.p2.name.toUpperCase()} WINS!`);
    } else {
      combatAudio.announce('DRAW GAME!');
    }
    setTimeout(() => {
      if (this.p1.roundsWon >= 2 || this.p2.roundsWon >= 2) {
        this.state = 'match_over';
      } else {
        this.startRound(this.round + 1);
      }
    }, 2500);
  }

  triggerFatality(performer, victim) {
    if (!this.isFinishHim) return;
    this.state = 'fatality';
    this.stateTimer = 0;
    this.fatalityPerformer = performer;
    this.fatalityVictim = victim;
    this.fatalityType = performer.data.fatality.name;
    this.isFlawless = performer.hp === performer.maxHp;

    performer.setState('fatality_performer', true);
    victim.setState('fatality_victim', true);

    combatAudio.playFatalityStart();
    this.triggerSlowMo(90, 0.2);
    this.triggerScreenShake(20);
    this.addEffect('screen_dim', performer.x, performer.y, '#990000');
  }

  updateFatalitySequence() {
    const t = this.stateTimer;
    const p = this.fatalityPerformer;
    const v = this.fatalityVictim;

    // Cinematic beats:
    // Beat 1: Zoom & Darkness (0 - 60)
    // Beat 2: Execution Strike (60)
    if (t === 60) {
      combatAudio.playFatalityImpact();
      this.triggerScreenShake(25);
      this.addBloodParticles(v.x, v.y - 100, v.facing * -1, 80, v.data.bloodColor || '#ff0000');
      this.addEffect('explosion', v.x, v.y - 90, p.data.color || '#ffaa00');
    }

    // Beat 3: FATALITY Banner (90)
    if (t === 90) {
      combatAudio.announce('FATALITY!');
    }

    // Beat 4: Announce winner (180)
    if (t === 180) {
      const flawlessText = this.isFlawless ? ' FLAWLESS VICTORY!' : '';
      combatAudio.announce(`${p.name.toUpperCase()} WINS!${flawlessText}`);
      p.setState('victory');
      v.setState('dead');
    }

    // End match (320 frames ~ 5.3s)
    if (t >= 320) {
      this.state = 'match_over';
    }
  }

  triggerSlowMo(duration, scale = 0.3) {
    this.slowMoTimer = duration;
    this.timeScale = scale;
  }

  triggerScreenShake(amount) {
    this.screenShake = Math.max(this.screenShake, amount);
  }

  addProjectile(proj) {
    this.projectiles.push(proj);
  }

  addIceClone(x, y) {
    this.iceClones.push({ x, y, lifetime: 180, age: 0 });
  }

  addBloodParticles(x, y, dir, count, color = '#ff0000') {
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) - (Math.PI / 2) + (dir * 0.4);
      const speed = 4 + Math.random() * 12;
      this.bloodParticles.push({
        x: x + (Math.random() * 20 - 10),
        y: y + (Math.random() * 30 - 15),
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed - (Math.random() * 6),
        radius: 2.5 + Math.random() * 4,
        color,
        alpha: 1.0,
        gravity: 0.65,
        lifetime: 50 + Math.random() * 40,
        age: 0
      });
    }
  }

  addDamagePopup(x, y, damage, isHeavy) {
    this.damagePopups.push({
      x: x + (Math.random() * 30 - 15),
      y,
      damage,
      isHeavy,
      vy: -4,
      alpha: 1.0,
      age: 0,
      lifetime: 45
    });
  }

  addEffect(type, x, y, color = '#ffffff') {
    this.effects.push({
      type,
      x,
      y,
      color,
      age: 0,
      lifetime: 30,
      radius: 10
    });
  }

  updateParticles() {
    // Blood particles
    for (let i = this.bloodParticles.length - 1; i >= 0; i--) {
      const p = this.bloodParticles[i];
      p.age++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;

      // Floor splatter
      if (p.y >= this.floorY + 10) {
        p.y = this.floorY + 10;
        p.vx = 0;
        p.vy = 0;
      }
      p.alpha = Math.max(0, 1 - p.age / p.lifetime);
      if (p.age >= p.lifetime) {
        this.bloodParticles.splice(i, 1);
      }
    }

    // Damage popups
    for (let i = this.damagePopups.length - 1; i >= 0; i--) {
      const d = this.damagePopups[i];
      d.age++;
      d.y += d.vy;
      d.vy *= 0.92;
      d.alpha = Math.max(0, 1 - d.age / d.lifetime);
      if (d.age >= d.lifetime) {
        this.damagePopups.splice(i, 1);
      }
    }

    // Special effects
    for (let i = this.effects.length - 1; i >= 0; i--) {
      const e = this.effects[i];
      e.age++;
      e.radius += 3;
      if (e.age >= e.lifetime) {
        this.effects.splice(i, 1);
      }
    }
  }

  rectIntersects(r1, r2) {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.y + r1.height > r2.y
    );
  }
}
