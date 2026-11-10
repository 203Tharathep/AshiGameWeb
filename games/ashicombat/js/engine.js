/**
 * Ashi Kombat - Core Fighting Game Engine
 * Manages physics, 60 FPS state machine, combo systems, hitboxes,
 * special move input buffers, AI behaviors, and Fatality sequences.
 */

export class CombatEngine {
  constructor(sound, renderer) {
    this.sound = sound;
    this.renderer = renderer;

    this.round = 1;
    this.roundTimer = 99;
    this.matchState = 'INTRO'; // INTRO, FIGHTING, FINISH_HIM, FATALITY, ROUND_OVER, MATCH_OVER
    this.stateTime = 0;
    this.stage = null;

    this.p1 = null;
    this.p2 = null;
    this.projectiles = [];
    this.time = 0;

    this.p1Keys = {};
    this.p2Keys = {};
  }

  initMatch(fighter1, fighter2, stage, isP2AI = true, aiDifficulty = 'normal') {
    this.stage = stage;
    this.round = 1;
    this.roundTimer = 99;
    this.matchState = 'INTRO';
    this.stateTime = 0;
    this.projectiles = [];

    this.p1 = this.createFighterInstance(fighter1, 380, false, 1);
    this.p2 = this.createFighterInstance(fighter2, 900, isP2AI, -1, aiDifficulty);

    this.renderer.preloadFighterImages([fighter1, fighter2]);
    this.sound.announceRound(this.round);
    this.renderer.showBanner(`ROUND ${this.round}`, 'GET READY!', '#ffcc00', 90);

    setTimeout(() => {
      if (this.matchState === 'INTRO') {
        this.matchState = 'FIGHTING';
        this.sound.announceFight();
        this.renderer.showBanner('FIGHT!', '', '#ff2200', 60);
      }
    }, 1800);
  }

  createFighterInstance(fighter, x, isAI = false, facing = 1, aiDifficulty = 'normal') {
    return {
      fighter,
      x,
      y: 540,
      vx: 0,
      vy: 0,
      facing,
      isAI,
      aiDifficulty,
      hp: fighter.stats.health,
      maxHp: fighter.stats.health,
      drainHp: fighter.stats.health,
      superMeter: 0,
      roundsWon: 0,

      // State machine
      animState: 'idle',
      stateTimer: 0,
      isGrounded: true,
      isCrouching: false,
      isBlocking: false,
      isAttacking: false,
      isSuperMode: false,
      invincibleTimer: 0,

      currentAttack: null,
      attackFrame: 0,
      hitConnected: false,

      hitstun: 0,
      blockstun: 0,
      knockdown: false,

      comboHits: 0,
      comboDamage: 0,
      comboTimer: 0,

      inputBuffer: [],
      aiTimer: 0
    };
  }

  // --- Input Handling ---
  handleKeyDown(key) {
    this.handlePlayerKey(1, key, true);
    this.handlePlayerKey(2, key, true);
  }

  handleKeyUp(key) {
    this.handlePlayerKey(1, key, false);
    this.handlePlayerKey(2, key, false);
  }

  handlePlayerKey(playerNum, key, isDown) {
    if (!key) return;
    const k = key.toLowerCase();

    if (playerNum === 1) {
      if (isDown) {
        this.p1Keys[k] = true;
        if (this.p1) this.recordInput(this.p1, k);
        if (this.matchState === 'FINISH_HIM' && (k === ' ' || k === 'f')) {
          this.triggerFatality(this.p1, this.p2);
        }
      } else {
        this.p1Keys[k] = false;
      }
    } else {
      // Map standard keys to P2 controls
      const p2Map = {
        'w': 'arrowup',
        's': 'arrowdown',
        'a': 'arrowleft',
        'd': 'arrowright',
        'u': '4',
        'j': '1',
        'i': '5',
        'k': '2',
        'l': '0',
        ' ': 'enter',
        'f': 'f'
      };
      const mapped = p2Map[k] || k;
      if (isDown) {
        this.p2Keys[mapped] = true;
        this.p2Keys[k] = true;
        if (this.p2) this.recordInput(this.p2, k);
        if (this.matchState === 'FINISH_HIM' && (k === ' ' || k === 'f' || k === 'enter')) {
          this.triggerFatality(this.p2, this.p1);
        }
      } else {
        this.p2Keys[mapped] = false;
        this.p2Keys[k] = false;
      }
    }
  }

  getStateSnapshot() {
    if (!this.p1 || !this.p2) return null;
    return {
      round: this.round,
      timer: this.roundTimer,
      state: this.matchState,
      p1: {
        x: Math.round(this.p1.x),
        y: Math.round(this.p1.y),
        hp: this.p1.hp,
        drainHp: this.p1.drainHp,
        superMeter: this.p1.superMeter,
        facing: this.p1.facing,
        animState: this.p1.animState,
        roundsWon: this.p1.roundsWon
      },
      p2: {
        x: Math.round(this.p2.x),
        y: Math.round(this.p2.y),
        hp: this.p2.hp,
        drainHp: this.p2.drainHp,
        superMeter: this.p2.superMeter,
        facing: this.p2.facing,
        animState: this.p2.animState,
        roundsWon: this.p2.roundsWon
      }
    };
  }

  applyStateSnapshot(snap) {
    if (!snap || !this.p1 || !this.p2) return;
    this.round = snap.round;
    this.roundTimer = snap.timer;
    this.matchState = snap.state;

    this.p1.x = snap.p1.x;
    this.p1.y = snap.p1.y;
    this.p1.hp = snap.p1.hp;
    this.p1.drainHp = snap.p1.drainHp;
    this.p1.superMeter = snap.p1.superMeter;
    this.p1.facing = snap.p1.facing;
    this.p1.animState = snap.p1.animState;
    this.p1.roundsWon = snap.p1.roundsWon;

    this.p2.x = snap.p2.x;
    this.p2.y = snap.p2.y;
    this.p2.hp = snap.p2.hp;
    this.p2.drainHp = snap.p2.drainHp;
    this.p2.superMeter = snap.p2.superMeter;
    this.p2.facing = snap.p2.facing;
    this.p2.animState = snap.p2.animState;
    this.p2.roundsWon = snap.p2.roundsWon;
  }

  recordInput(p, key) {
    p.inputBuffer.push({ key, time: this.time });
    if (p.inputBuffer.length > 12) p.inputBuffer.shift();
  }

  // Check special move combos in input buffer
  checkSpecialMoves(p) {
    if (p.isAttacking || p.hitstun > 0 || p.animState === 'dizzy') return null;

    const recent = p.inputBuffer.filter((i) => this.time - i.time < 35).map((i) => i.key);
    const seq = recent.join('');

    // Special 1: Down, Forward, Punch (e.g. 'sdj')
    if (seq.includes('sdj') || seq.includes('dj')) {
      return p.fighter.specials[0];
    }
    // Special 2: Back, Forward, Kick (e.g. 'adk')
    if (seq.includes('adk') || seq.includes('dk')) {
      return p.fighter.specials[1];
    }
    // Special 3: Down, Down, Kick or Punch (e.g. 'ssk' or 'ssj')
    if (seq.includes('ssk') || seq.includes('ssj') || seq.includes('swk')) {
      return p.fighter.specials[2];
    }
    return null;
  }

  // --- 60 FPS Update Loop ---
  update() {
    this.time++;
    this.stateTime++;

    if (this.matchState === 'FIGHTING') {
      this.roundTimer -= 1 / 60;
      if (this.roundTimer <= 0) {
        this.roundTimer = 0;
        this.handleTimeOver();
        return;
      }
    }

    // Update AI
    if (this.p2.isAI && this.matchState === 'FIGHTING') {
      this.updateAI(this.p2, this.p1);
    }

    // Process Player 1 Inputs
    if (!this.p1.isAI && this.matchState === 'FIGHTING') {
      this.processPlayerInputs(this.p1, this.p2, {
        up: this.p1Keys['w'],
        down: this.p1Keys['s'],
        left: this.p1Keys['a'],
        right: this.p1Keys['d'],
        lightPunch: this.p1Keys['u'],
        heavyPunch: this.p1Keys['j'],
        lightKick: this.p1Keys['i'],
        heavyKick: this.p1Keys['k'],
        block: this.p1Keys['l'] || this.p1Keys['shift'],
        superBtn: this.p1Keys[' '] || this.p1Keys['enter']
      });
    }

    // Process Player 2 Inputs (if human local 2P)
    if (!this.p2.isAI && this.matchState === 'FIGHTING') {
      this.processPlayerInputs(this.p2, this.p1, {
        up: this.p2Keys['arrowup'],
        down: this.p2Keys['arrowdown'],
        left: this.p2Keys['arrowleft'],
        right: this.p2Keys['arrowright'],
        lightPunch: this.p2Keys['4'] || this.p2Keys['insert'],
        heavyPunch: this.p2Keys['1'] || this.p2Keys['end'],
        lightKick: this.p2Keys['5'] || this.p2Keys['home'],
        heavyKick: this.p2Keys['2'] || this.p2Keys['pagedown'],
        block: this.p2Keys['0'] || this.p2Keys['control'],
        superBtn: this.p2Keys['enter'] || this.p2Keys['+']
      });
    }

    // Update Fighters Physics & State
    this.updateFighterPhysics(this.p1, this.p2);
    this.updateFighterPhysics(this.p2, this.p1);

    // Update Projectiles
    this.updateProjectiles();

    // Check Collisions
    if (this.matchState === 'FIGHTING') {
      this.checkAttacks(this.p1, this.p2);
      this.checkAttacks(this.p2, this.p1);
    }

    // Smooth HP Drain trailing bars
    this.p1.drainHp += (this.p1.hp - this.p1.drainHp) * 0.08;
    this.p2.drainHp += (this.p2.hp - this.p2.drainHp) * 0.08;

    // Boundary constraints
    this.enforceBoundaries();
  }

  processPlayerInputs(p, opponent, inputs) {
    if (p.hitstun > 0 || p.animState === 'dizzy' || p.animState === 'knockdown') return;

    // Check Super / Fatal Blow
    if (inputs.superBtn && p.superMeter >= 100 && !p.isAttacking) {
      this.executeSuperMove(p, opponent);
      return;
    }

    // Check Special Moves first
    const special = this.checkSpecialMoves(p);
    if (special) {
      this.executeSpecialMove(p, opponent, special);
      p.inputBuffer = [];
      return;
    }

    // Blocking
    p.isBlocking = inputs.block || false;
    if (p.isBlocking && p.isGrounded) {
      p.animState = 'block';
      p.vx = 0;
      return;
    }

    // Crouching
    p.isCrouching = inputs.down && p.isGrounded;

    // Movement
    if (!p.isAttacking) {
      const speed = p.fighter.stats.speed;
      if (inputs.left) {
        p.vx = -speed;
        p.animState = p.isGrounded ? 'walk' : p.animState;
      } else if (inputs.right) {
        p.vx = speed;
        p.animState = p.isGrounded ? 'walk' : p.animState;
      } else {
        p.vx = 0;
        if (p.isGrounded) {
          p.animState = p.isCrouching ? 'crouch' : 'idle';
        }
      }

      // Jump
      if (inputs.up && p.isGrounded) {
        p.vy = -18;
        p.isGrounded = false;
        p.animState = 'jump';
        this.sound.playWhoosh();
      }

      // Standard Attacks
      if (inputs.lightPunch) {
        this.startAttack(p, 'punch', 'light', p.isCrouching ? 'low' : 'high');
      } else if (inputs.heavyPunch) {
        if (p.isCrouching) {
          this.startAttack(p, 'uppercut', 'heavy', 'launcher');
        } else {
          this.startAttack(p, 'punch', 'heavy', 'high');
        }
      } else if (inputs.lightKick) {
        this.startAttack(p, 'kick', 'light', p.isCrouching ? 'sweep' : 'mid');
      } else if (inputs.heavyKick) {
        this.startAttack(p, 'kick', 'heavy', 'high');
      }
    }
  }

  startAttack(p, animState, weight = 'light', hitType = 'mid') {
    p.isAttacking = true;
    p.animState = animState;
    p.attackFrame = 0;
    p.hitConnected = false;

    let dmg = weight === 'heavy' ? 85 : 45;
    if (hitType === 'launcher') dmg = 110;
    if (hitType === 'sweep') dmg = 65;

    p.currentAttack = {
      name: animState,
      weight,
      hitType,
      damage: dmg,
      activeStart: 4,
      activeEnd: weight === 'heavy' ? 14 : 9,
      duration: weight === 'heavy' ? 24 : 15
    };

    this.sound.playWhoosh();
  }

  executeSpecialMove(p, opponent, special) {
    p.isAttacking = true;
    p.attackFrame = 0;
    p.hitConnected = false;
    p.animState = special.type === 'rush' ? 'kick' : 'punch';

    p.currentAttack = {
      name: special.name,
      isSpecial: true,
      damage: special.damage,
      activeStart: 5,
      activeEnd: 20,
      duration: 30,
      specialData: special
    };

    if (special.type === 'projectile') {
      const facing = p.x < opponent.x ? 1 : -1;
      this.projectiles.push({
        owner: p,
        x: p.x + facing * 45,
        y: p.y - 120,
        vx: facing * (special.speed || 12),
        damage: special.damage,
        fx: special.fx,
        stun: special.stun || 0
      });
      this.sound.playFireball();
    } else if (special.type === 'rush') {
      const facing = p.x < opponent.x ? 1 : -1;
      p.vx = facing * 18;
      this.sound.playWhoosh();
    } else if (special.type === 'teleport') {
      this.renderer.spawnFX('fire', p.x, p.y - 100, { count: 20 });
      p.x = opponent.x - (opponent.x < 640 ? -120 : 120);
      p.y = 540;
      this.renderer.spawnFX('fire', p.x, p.y - 100, { count: 20 });
      this.sound.playFireball();
    }

    this.sound.playAnnouncerImpact();
  }

  executeSuperMove(p, opponent) {
    p.superMeter = 0;
    p.isAttacking = true;
    p.isSuperMode = true;
    p.animState = 'uppercut';

    this.renderer.triggerFlash('#ff0033', 0.9);
    this.renderer.triggerScreenShake(25);
    this.sound.playLightning();
    this.sound.playBoneCrack();
    this.renderer.showBanner(p.fighter.superMove.name, 'FATAL BLOW X-RAY!', '#ff1100', 90);

    p.currentAttack = {
      name: 'SUPER_MOVE',
      damage: p.fighter.superMove.damage,
      activeStart: 3,
      activeEnd: 25,
      duration: 45
    };
  }

  // --- Physics & Attack Frame Update ---
  updateFighterPhysics(p, opponent) {
    p.stateTimer++;

    // Gravity
    if (!p.isGrounded) {
      p.vy += 0.95;
      p.y += p.vy;
      if (p.y >= 540) {
        p.y = 540;
        p.vy = 0;
        p.isGrounded = true;
        if (p.animState === 'jump') p.animState = 'idle';
      }
    }

    // Velocity
    p.x += p.vx;
    p.vx *= 0.85;

    // Hitstun
    if (p.hitstun > 0) {
      p.hitstun--;
      if (p.hitstun === 0 && p.animState === 'hurt') {
        p.animState = 'idle';
      }
    }

    // Attack Frame Processing
    if (p.isAttacking && p.currentAttack) {
      p.attackFrame++;
      if (p.attackFrame >= p.currentAttack.duration) {
        p.isAttacking = false;
        p.isSuperMode = false;
        p.currentAttack = null;
        p.animState = 'idle';
      }
    }

    // Combo Timer Decay
    if (p.comboTimer > 0) {
      p.comboTimer--;
      if (p.comboTimer === 0) {
        p.comboHits = 0;
        p.comboDamage = 0;
      }
    }
  }

  // --- Hit Collision & Damage ---
  checkAttacks(attacker, defender) {
    if (!attacker.isAttacking || !attacker.currentAttack || attacker.hitConnected) return;
    if (defender.animState === 'dizzy' && this.matchState !== 'FINISH_HIM') return;

    const atk = attacker.currentAttack;
    if (attacker.attackFrame < atk.activeStart || attacker.attackFrame > atk.activeEnd) return;

    // Distance Check
    const dist = Math.abs(attacker.x - defender.x);
    const facing = attacker.x < defender.x ? 1 : -1;
    const inRange = dist < (atk.hitType === 'launcher' ? 140 : 120);

    if (inRange) {
      attacker.hitConnected = true;

      // 1. Check Block
      if (defender.isBlocking && defender.isGrounded && atk.hitType !== 'launcher') {
        const chipDmg = Math.round(atk.damage * 0.15);
        defender.hp = Math.max(1, defender.hp - chipDmg);
        defender.vx = facing * 6;
        defender.blockstun = 15;
        this.sound.playBlock();
        this.renderer.spawnFX('spark', defender.x, defender.y - 120, { color: '#00e5ff', count: 6 });
        return;
      }

      // 2. Direct Hit
      const damage = atk.damage;
      defender.hp = Math.max(0, defender.hp - damage);
      defender.hitstun = atk.weight === 'heavy' ? 24 : 14;
      defender.animState = 'hurt';

      // Meter gain
      attacker.superMeter = Math.min(100, attacker.superMeter + 14);
      defender.superMeter = Math.min(100, defender.superMeter + 9);

      // Combos
      attacker.comboHits++;
      attacker.comboDamage += damage;
      attacker.comboTimer = 75;

      // Sound & Screen Shake
      if (atk.hitType === 'launcher') {
        this.sound.playUppercut();
        this.renderer.triggerScreenShake(20);
        this.renderer.spawnBlood(defender.x, defender.y - 120, 24, true);
        defender.vy = -19;
        defender.isGrounded = false;
      } else {
        if (atk.weight === 'heavy') {
          this.sound.playPunch(true);
          this.renderer.triggerScreenShake(12);
          this.renderer.spawnBlood(defender.x, defender.y - 120, 16);
          defender.vx = facing * 12;
        } else {
          this.sound.playPunch(false);
          this.renderer.triggerScreenShake(6);
          this.renderer.spawnBlood(defender.x, defender.y - 120, 8);
          defender.vx = facing * 6;
        }
      }

      // Easter Egg: Random Toasty on huge uppercut!
      if (atk.hitType === 'launcher' && Math.random() < 0.35) {
        this.renderer.triggerToasty();
        this.sound.speak('TOASTY!');
      }

      // Check KO
      if (defender.hp <= 0) {
        this.handleFighterDefeated(attacker, defender);
      }
    }
  }

  updateProjectiles() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.x += proj.vx;

      // Check Screen Out of Bounds
      if (proj.x < 20 || proj.x > 1260) {
        this.projectiles.splice(i, 1);
        continue;
      }

      // Check Hit on Opponent
      const target = proj.owner === this.p1 ? this.p2 : this.p1;
      if (Math.abs(proj.x - target.x) < 45 && Math.abs(proj.y - (target.y - 110)) < 70) {
        target.hp = Math.max(0, target.hp - proj.damage);
        target.animState = 'hurt';
        target.hitstun = 18;

        this.sound.playPunch(true);
        this.renderer.triggerScreenShake(10);
        this.renderer.spawnFX('fire', target.x, target.y - 110, { count: 18 });

        if (target.hp <= 0) {
          this.handleFighterDefeated(proj.owner, target);
        }
        this.projectiles.splice(i, 1);
      }
    }
  }

  // --- Round & Match Over Handling ---
  handleFighterDefeated(winner, loser) {
    if (this.matchState === 'FINISH_HIM' || this.matchState === 'FATALITY') return;

    if (winner.roundsWon === 1) {
      // Final Round Win -> FINISH HIM!
      this.matchState = 'FINISH_HIM';
      loser.animState = 'dizzy';
      loser.vx = 0;
      loser.hp = 0;
      this.sound.announceFinishHim();
      this.renderer.showBanner('FINISH HIM!', 'PERFORM FATALITY!', '#ff0000', 300);

      // Auto-fallback if no Fatality executed after 5 seconds
      setTimeout(() => {
        if (this.matchState === 'FINISH_HIM') {
          this.finishRound(winner, loser, false);
        }
      }, 5000);
    } else {
      // Normal Round Win
      winner.roundsWon++;
      this.finishRound(winner, loser, false);
    }
  }

  triggerFatality(winner, loser) {
    if (this.matchState !== 'FINISH_HIM') return;
    this.matchState = 'FATALITY';

    winner.animState = 'victory';
    loser.animState = 'hurt';

    this.sound.announceFatality();
    this.renderer.triggerFlash('#ff0000', 0.95);
    this.renderer.triggerScreenShake(30);
    this.renderer.spawnBlood(loser.x, loser.y - 100, 70, true);

    const isFlawless = winner.hp >= winner.maxHp;
    this.renderer.showBanner('FATALITY!', `${winner.fighter.name} WINS!`, '#ff0000', 240);

    setTimeout(() => {
      if (isFlawless) {
        this.sound.announceFlawless();
      }
      this.sound.announceWinner(winner.fighter.name);
    }, 1200);

    setTimeout(() => {
      this.matchState = 'MATCH_OVER';
    }, 4500);
  }

  finishRound(winner, loser, isFatality = false) {
    this.matchState = 'ROUND_OVER';
    winner.animState = 'victory';

    if (winner.roundsWon >= 2) {
      this.sound.announceWinner(winner.fighter.name);
      setTimeout(() => {
        this.matchState = 'MATCH_OVER';
      }, 3000);
    } else {
      // Start Next Round
      setTimeout(() => {
        this.round++;
        this.roundTimer = 99;
        this.matchState = 'INTRO';
        this.p1.hp = this.p1.maxHp;
        this.p2.hp = this.p2.maxHp;
        this.p1.drainHp = this.p1.maxHp;
        this.p2.drainHp = this.p2.maxHp;
        this.p1.x = 380;
        this.p2.x = 900;
        this.p1.animState = 'idle';
        this.p2.animState = 'idle';

        this.sound.announceRound(this.round);
        this.renderer.showBanner(`ROUND ${this.round}`, '', '#ffcc00', 90);

        setTimeout(() => {
          this.matchState = 'FIGHTING';
          this.sound.announceFight();
          this.renderer.showBanner('FIGHT!', '', '#ff2200', 60);
        }, 1800);
      }, 2500);
    }
  }

  handleTimeOver() {
    this.matchState = 'ROUND_OVER';
    this.sound.speak('TIME OVER!');
    const winner = this.p1.hp >= this.p2.hp ? this.p1 : this.p2;
    const loser = winner === this.p1 ? this.p2 : this.p1;
    winner.roundsWon++;
    this.finishRound(winner, loser);
  }

  // --- AI Behavior Logic ---
  updateAI(ai, player) {
    if (ai.hitstun > 0 || ai.animState === 'dizzy') return;
    ai.aiTimer++;

    const dist = Math.abs(ai.x - player.x);
    const difficulty = ai.aiDifficulty;

    // Reaction rate
    const tickRate = difficulty === 'master' ? 8 : difficulty === 'hard' ? 14 : 24;
    if (ai.aiTimer % tickRate !== 0) return;

    // 1. Reactive Block
    if (player.isAttacking && dist < 160) {
      const blockChance = difficulty === 'master' ? 0.9 : difficulty === 'hard' ? 0.75 : 0.35;
      if (Math.random() < blockChance) {
        ai.isBlocking = true;
        ai.animState = 'block';
        return;
      }
    }
    ai.isBlocking = false;

    // 2. Use Super if ready
    if (ai.superMeter >= 100 && dist < 200 && Math.random() < 0.6) {
      this.executeSuperMove(ai, player);
      return;
    }

    // 3. Spacing & Attacks
    const speed = ai.fighter.stats.speed;
    const facing = ai.x < player.x ? 1 : -1;

    if (dist > 350) {
      // Far distance: Walk closer or fire projectile
      if (Math.random() < 0.45 && ai.fighter.specials.length > 0) {
        this.executeSpecialMove(ai, player, ai.fighter.specials[0]);
      } else {
        ai.vx = (player.x > ai.x ? 1 : -1) * speed;
        ai.animState = 'walk';
      }
    } else if (dist > 140) {
      // Mid range: Jump in, Rush special, or Walk in
      const roll = Math.random();
      if (roll < 0.35 && ai.fighter.specials[1]) {
        this.executeSpecialMove(ai, player, ai.fighter.specials[1]);
      } else if (roll < 0.65) {
        ai.vy = -18;
        ai.isGrounded = false;
        ai.vx = (player.x > ai.x ? 1 : -1) * speed * 1.2;
        ai.animState = 'jump';
        this.sound.playWhoosh();
      } else {
        ai.vx = (player.x > ai.x ? 1 : -1) * speed;
        ai.animState = 'walk';
      }
    } else {
      // Close range: Strike with combos or uppercut!
      const roll = Math.random();
      if (roll < 0.3) {
        this.startAttack(ai, 'punch', 'light', 'high');
      } else if (roll < 0.6) {
        this.startAttack(ai, 'kick', 'heavy', 'mid');
      } else if (roll < 0.85) {
        this.startAttack(ai, 'uppercut', 'heavy', 'launcher');
      } else if (ai.fighter.specials[2]) {
        this.executeSpecialMove(ai, player, ai.fighter.specials[2]);
      }
    }
  }

  enforceBoundaries() {
    [this.p1, this.p2].forEach((p) => {
      if (p.x < 80) p.x = 80;
      if (p.x > 1200) p.x = 1200;
    });

    // Don't let fighters walk completely through each other unless airborne
    if (this.p1.isGrounded && this.p2.isGrounded) {
      const minDistance = 55;
      if (Math.abs(this.p1.x - this.p2.x) < minDistance) {
        if (this.p1.x < this.p2.x) {
          this.p1.x -= 2;
          this.p2.x += 2;
        } else {
          this.p1.x += 2;
          this.p2.x -= 2;
        }
      }
    }
  }
}

