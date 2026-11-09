// ==========================================
// ASHI COMBAT: CPU FIGHTER AI
// ==========================================

export class FighterAI {
  constructor(difficulty = 'warrior') {
    this.difficulty = difficulty; // novice, warrior, master
    this.reactionDelay = difficulty === 'novice' ? 24 : difficulty === 'warrior' ? 14 : 6;
    this.timer = 0;
    this.state = 'eval'; // eval, approach, retreat, attack, block
    this.stateTimer = 0;
    this.targetDist = 120;
  }

  getInputs(aiFighter, opponent, engine) {
    this.timer++;
    const inputs = {
      up: false,
      down: false,
      left: false,
      right: false,
      punch: false,
      punchHeavy: false,
      kick: false,
      kickHeavy: false,
      special: false,
      specialIndex: 0,
      block: false,
      superMove: false,
      fatality: false
    };

    // If opponent is dazed during Finish Him -> Trigger Fatality!
    if (engine.isFinishHim && opponent.state === 'dazed') {
      if (Math.random() < 0.6) {
        inputs.fatality = true;
        return inputs;
      } else {
        inputs.punchHeavy = true;
        return inputs;
      }
    }

    // Distance to opponent
    const dx = opponent.x - aiFighter.x;
    const dist = Math.abs(dx);
    const facing = Math.sign(dx) || 1;

    // React to incoming projectiles
    const incomingProjectiles = engine.projectiles.filter((p) => p.fighter !== aiFighter);
    if (incomingProjectiles.length > 0) {
      const p = incomingProjectiles[0];
      const pDist = Math.abs(p.x - aiFighter.x);
      if (pDist < 250) {
        // Master & Warrior jump over or block
        if (this.difficulty !== 'novice' && Math.random() < 0.8) {
          inputs.up = true;
          if (facing === 1) inputs.right = true;
          else inputs.left = true;
          return inputs;
        } else {
          inputs.block = true;
          return inputs;
        }
      }
    }

    // React to opponent's attack: Block or Evade
    const isOpponentAttacking = opponent.state.startsWith('punch') || opponent.state.startsWith('kick') || opponent.state.startsWith('special');
    if (isOpponentAttacking && dist < 140) {
      const blockChance = this.difficulty === 'master' ? 0.85 : this.difficulty === 'warrior' ? 0.65 : 0.35;
      if (Math.random() < blockChance) {
        inputs.block = true;
        if (opponent.isCrouching) inputs.down = true;
        return inputs;
      }
    }

    // Super Move when available
    if (aiFighter.superMeter >= 100 && dist < 220) {
      inputs.superMove = true;
      return inputs;
    }

    // Offensive / Neutral behavior state machine
    this.stateTimer++;
    if (this.stateTimer > 40) {
      this.stateTimer = 0;
      const roll = Math.random();
      if (dist > 300) {
        this.state = roll < 0.7 ? 'approach' : 'special_range';
      } else if (dist < 100) {
        this.state = roll < 0.6 ? 'attack' : roll < 0.85 ? 'retreat' : 'uppercut';
      } else {
        this.state = roll < 0.5 ? 'approach' : 'attack';
      }
    }

    // Execute actions based on AI state
    if (this.state === 'approach') {
      if (facing === 1) inputs.right = true;
      else inputs.left = true;
      if (Math.random() < 0.08 && aiFighter.isGrounded) inputs.up = true; // occasional jump in
    } else if (this.state === 'retreat') {
      if (facing === 1) inputs.left = true;
      else inputs.right = true;
    } else if (this.state === 'special_range') {
      if (Math.random() < 0.5) {
        inputs.special = true;
        inputs.specialIndex = Math.floor(Math.random() * (aiFighter.data.specials.length || 1));
      } else {
        this.state = 'approach';
      }
    } else if (this.state === 'attack' && dist < 140) {
      const atkRoll = Math.random();
      if (atkRoll < 0.3) {
        inputs.punch = true;
      } else if (atkRoll < 0.55) {
        inputs.kick = true;
      } else if (atkRoll < 0.8) {
        inputs.kickHeavy = true;
      } else {
        inputs.special = true;
        inputs.specialIndex = 0;
      }
    } else if (this.state === 'uppercut' && dist < 120) {
      inputs.down = true;
      inputs.punchHeavy = true;
    }

    return inputs;
  }
}
