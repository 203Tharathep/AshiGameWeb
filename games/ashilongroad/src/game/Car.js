import * as THREE from 'three';

export class Car {
  constructor(carConfig, skinFileName, bodyColor, isPlayer = true) {
    this.config = carConfig;
    this.physics = carConfig.physics || {};
    this.isPlayer = isPlayer;
    this.skinFileName = skinFileName;
    this.bodyColor = bodyColor;
    this.game = null;

    // Kinematics
    this.position = new THREE.Vector3(0, 0.05, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.speed = 0; // forward speed in m/s
    this.steeringAngle = 0;
    this.rotationY = 0;
    this.pitch = 0;
    this.roll = 0;

    // Fast track lookup cache
    this.sampleIndexHint = -1;

    // Speed Feathering & Momentum System (ระบบเลี้ยงความเร็ว)
    this.isFeathering = false;
    this.featheringHistoryTimer = 0;
    this.apexBonusTimer = 0;

    // Drift & Boost
    this.isDrifting = false;
    this.driftDirection = 0; // -1 left, +1 right
    this.driftTimer = 0;
    this.driftLevel = 0; // 0 none, 1 blue, 2 orange, 3 purple
    this.boostTimer = 0;
    this.nitroFuel = 100;
    this.isNitroActive = false;

    // Item System status
    this.currentItem = null;
    this.isInvincible = false;
    this.isSpinning = false;
    this.spinTimer = 0;

    // Track Progress
    this.totalLaps = 3;
    this.lap = 1;
    this.currentCheckpoint = 0;
    this.hasPassedHalfway = false;
    this.totalDistance = 0;
    this.lapTimes = [];
    this.currentLapTime = 0;
    this.bestLapTime = null;
    this.isFinished = false;
    this.finishRank = 1;

    // Collision State
    this.isHittingBarrier = false;
    this.lastBounceTime = 0;
    this.lastCarHitTime = 0;

    // Visual Mesh model reference
    this.model = null;
    this.wheels = null;
    this.steerGroups = null;
    this.exhaustPipes = null;
    this.brakeLightMat = null;
    this.underglowMat = null;

    // Inputs
    this.inputs = {
      throttle: 0,
      steer: 0,
      drift: false,
      boost: false,
      reset: false
    };

    this.wheelRotation = 0;
    this.lastBounceTime = 0;
  }

  setModel(builtModel) {
    this.model = builtModel.root;
    this.chassis = builtModel.chassis;
    this.wheels = builtModel.wheels;
    this.steerGroups = builtModel.steerGroups;
    this.exhaustPipes = builtModel.exhaustPipes;
    this.brakeLightMat = builtModel.brakeLightMat;
    this.underglowMat = builtModel.underglowMat;
  }

  update(delta, track) {
    if (this.isFinished && this.speed > 12) {
      this.inputs.throttle = 0.25;
    }

    // Spinout handling from banana / missile hit
    if (this.spinTimer > 0) {
      this.spinTimer -= delta;
      this.isSpinning = true;
      this.rotationY += delta * 14;
      this.speed = Math.max(0, this.speed - delta * 30);
      this.velocity.set(0, 0, 0);
      if (this.spinTimer <= 0) {
        this.isSpinning = false;
      }
      this.updateVisuals(delta);
      this.updateTrackProgress(delta, track);
      return;
    }

    this.handleInputs(delta, track);
    this.updatePhysics(delta, track);
    this.updateVisuals(delta);
    this.updateTrackProgress(delta, track);
  }

  handleInputs(delta, track) {
    // Nitro Boost Trigger
    if (this.inputs.boost && this.nitroFuel > 12 && this.boostTimer <= 0) {
      this.boostTimer = 2.2;
      this.nitroFuel = Math.max(0, this.nitroFuel - 32);
      this.isNitroActive = true;
    }

    if (this.boostTimer > 0) {
      this.boostTimer -= delta;
      if (this.boostTimer <= 0) {
        this.isNitroActive = false;
      }
    } else {
      this.nitroFuel = Math.min(100, this.nitroFuel + delta * 6.5);
    }

    // Drift handling
    const isMovingForward = this.speed > 10;
    if (this.inputs.drift && isMovingForward && Math.abs(this.inputs.steer) > 0.08) {
      if (!this.isDrifting) {
        this.isDrifting = true;
        this.driftDirection = Math.sign(this.inputs.steer);
        this.driftTimer = 0;
      }
      this.driftTimer += delta;

      if (this.driftTimer > 2.0) {
        this.driftLevel = 3;
      } else if (this.driftTimer > 1.2) {
        this.driftLevel = 2;
      } else if (this.driftTimer > 0.55) {
        this.driftLevel = 1;
      } else {
        this.driftLevel = 0;
      }
    } else {
      if (this.isDrifting) {
        if (this.driftLevel > 0) {
          const miniTurboDurations = [0, 0.75, 1.3, 1.9];
          this.boostTimer = Math.max(this.boostTimer, miniTurboDurations[this.driftLevel]);
          this.nitroFuel = Math.min(100, this.nitroFuel + this.driftLevel * 14);
          if (this.game && this.game.audio) {
            this.game.audio.playBoostSound();
          }
        }
        this.isDrifting = false;
        this.driftTimer = 0;
        this.driftLevel = 0;
      }
    }

    // Manual Respawn
    if (this.inputs.reset) {
      this.respawn(track);
    }
  }

  updatePhysics(delta, track) {
    const p = this.physics;
    const baseMaxSpeed = p.maxSpeed || 50; // Higher speed limit (160 - 200+ km/h)
    let maxSpeed = baseMaxSpeed;
    let accelRate = p.accelRate || 23;

    if (this.boostTimer > 0) {
      maxSpeed = baseMaxSpeed * 1.45; // up to ~260 - 290 km/h!
      accelRate *= 1.8;
    }

    // 1. Acceleration & Braking with Power Curve
    if (this.inputs.throttle > 0) {
      if (this.speed < maxSpeed) {
        const speedRatio = Math.min(1, Math.max(0, this.speed / maxSpeed));
        const powerCurve = Math.max(0.22, 1.0 - speedRatio * 0.65);
        this.speed += this.inputs.throttle * accelRate * powerCurve * delta;
      }

      // Check Apex Exit Bonus after speed feathering
      if (this.featheringHistoryTimer > 0.35 && Math.abs(this.steeringAngle) < 0.25) {
        this.apexBonusTimer = 0.6;
        this.featheringHistoryTimer = 0;
        if (this.isPlayer && this.game) {
          if (this.game.audio) this.game.audio.playBoostSound();
          if (this.game.hud) this.game.hud.showReaction('⚡ APEX EXIT! สปีดพุ่ง!', 1200);
        }
      }
    } else if (this.inputs.throttle < 0) {
      // Braking
      if (this.speed > 0) {
        const brakeRate = p.brakeRate || 35;
        this.speed -= brakeRate * delta;
        if (this.speed < 0) this.speed = 0;
      } else {
        if (this.speed > -maxSpeed * 0.3) {
          this.speed -= accelRate * 0.4 * delta;
        }
      }
    } else {
      // Coasting / Speed Feathering (เลี้ยงความเร็ว)
      // Rolling resistance is low (2.0 m/s²) so the car carries momentum through corners!
      const rollingDrag = this.isDrifting ? 4.5 : 2.0;
      if (this.speed > 0) {
        this.speed = Math.max(0, this.speed - rollingDrag * delta);
      } else if (this.speed < 0) {
        this.speed = Math.min(0, this.speed + rollingDrag * delta);
      }
    }

    // Apex exit bonus acceleration
    if (this.apexBonusTimer > 0) {
      this.apexBonusTimer -= delta;
      this.speed = Math.min(maxSpeed * 1.15, this.speed + accelRate * 0.7 * delta);
    }

    // เมื่อหมดเวลาบูสต์ ความเร็วจะกลับเท่าเดิมที่สูงสุดตอนขับปกติ (Bleed excess speed down to baseMaxSpeed)
    if (this.boostTimer <= 0 && this.apexBonusTimer <= 0 && this.speed > baseMaxSpeed) {
      const bleedRate = 28.0; // ดึงความเร็วส่วนเกินลดลงอย่างรวดเร็วและนุ่มนวล (~0.7s คืนสู่ความเร็วสูงสุดปกติ)
      this.speed = Math.max(baseMaxSpeed, this.speed - bleedRate * delta);
    }

    // 2. Speed Feathering Detection (เลี้ยงความเร็วเข้าโค้ง)
    const isTurning = Math.abs(this.inputs.steer) > 0.15;
    const isCoasting = this.inputs.throttle <= 0.3 && this.inputs.throttle >= 0;
    const isFastEnough = this.speed > 16; // > ~58 km/h

    if (isTurning && isCoasting && isFastEnough && !this.isDrifting) {
      this.isFeathering = true;
      this.featheringHistoryTimer += delta;
    } else {
      this.isFeathering = false;
      if (this.inputs.throttle <= 0) {
        this.featheringHistoryTimer = Math.max(0, this.featheringHistoryTimer - delta * 0.5);
      } else if (this.apexBonusTimer <= 0) {
        this.featheringHistoryTimer = 0;
      }
    }

    // 3. Steering & Turning Dynamics (ปรับให้เลี้ยวได้ง่ายขึ้น ตอบสนองไว คล่องตัว)
    const targetSteer = this.inputs.steer;
    // Fast & responsive steering response (เลี้ยวตอบสนองทันใจ ไม่หน่วง)
    this.steeringAngle = THREE.MathUtils.lerp(this.steeringAngle, targetSteer, delta * 20.0);

    // 4. ปรับให้เวลาเลี้ยวความเร็วจะลดลงอย่างนุ่มนวลและเป็นธรรมชาติ
    const steerMag = Math.abs(this.steeringAngle);
    if (steerMag > 0.08 && Math.abs(this.speed) > 4.0) {
      const baseScrub = 2.4;
      const speedScrub = (Math.abs(this.speed) / baseMaxSpeed) * 4.8;
      const scrubDecel = steerMag * (baseScrub + speedScrub);
      const scrubFactor = this.isFeathering ? 0.6 : (this.isDrifting ? 0.75 : 1.0);
      if (this.speed > 0) {
        this.speed = Math.max(0, this.speed - scrubDecel * scrubFactor * delta);
      }
    }

    // Speed ratio: responsive at all speeds (คล่องตัวแม้ช่วงความเร็วต่ำ)
    const speedRatio = Math.min(1.0, 0.45 + (Math.abs(this.speed) / 10.0) * 0.55);
    const baseTurnRate = p.turnRate || 2.85;

    // Grip & Agility (เลี้ยวได้ง่ายและคมกริบ ไม่ดื้อโค้ง)
    let gripModifier = 1.05;
    if (this.isFeathering) {
      // เมื่อเลี้ยงความเร็ว (ผ่อนคันเร่งเข้าโค้ง) หน้ารถจะจิกคมขึ้นเป็นพิเศษ!
      gripModifier = 1.30;
    }

    let turnSpeed = baseTurnRate * this.steeringAngle * speedRatio * gripModifier * Math.sign(this.speed || 1);

    if (this.isDrifting) {
      // Drifting provides higher yaw rate for sharp hairpins (ดริฟต์สะบัดเลี้ยวโค้งแคบได้ง่ายสะใจ)
      turnSpeed *= 1.65;
    }

    this.rotationY += turnSpeed * delta;

    // Forward Direction vector
    const forward = new THREE.Vector3(
      Math.sin(this.rotationY),
      0,
      Math.cos(this.rotationY)
    );

    let moveDir = forward.clone();
    if (this.isDrifting && Math.abs(this.speed) > 4) {
      const slideAngle = this.driftDirection * 0.36;
      moveDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), slideAngle);
    }

    this.velocity.copy(moveDir).multiplyScalar(this.speed);
    this.position.addScaledVector(this.velocity, delta);

    // Track barrier guiding & gentle elastic rebound
    if (track) {
      const closest = track.getClosest(this.position, this.sampleIndexHint);
      this.sampleIndexHint = closest.index;

      const barrierLimit = track.maxAllowedLateral || (track.trackWidth / 2 - 0.9);
      const lateralDist = closest.lateral;

      if (Math.abs(lateralDist) > barrierLimit) {
        const wallSide = Math.sign(lateralDist);
        const penetration = Math.abs(lateralDist) - barrierLimit;

        // 1. Gently bounce car inward away from the barrier (no clipping, no wild rotation)
        const gentleBounce = penetration + 0.08;
        this.position.addScaledVector(closest.normal, -wallSide * gentleBounce);

        // 2. DO NOT override rotationY! Car heading stays under player control.

        // 3. ตอนที่ชนความเร็วจะลดลงอย่างมาก (Severe Speed Loss & Boost Cut)
        const intoWall = forward.dot(closest.normal) * wallSide;
        const now = performance.now();

        if (!this.isHittingBarrier) {
          this.isHittingBarrier = true;
          // Initial impact: ตัดความเร็วลดลงอย่างมากในจังหวะกระแทกครั้งแรก
          if (intoWall > 0.25) {
            this.speed = Math.max(0, this.speed * 0.40); // ชนมุมเฉียง/ตรง ความเร็วฮวบ 60%
          } else {
            this.speed = Math.max(0, this.speed * 0.58); // เฉี่ยว/ไถลขอบทาง ความเร็วฮวบ 42%
          }
          // ตัดบูสต์ทันทีเมื่อชนกำแพง
          this.boostTimer = 0;
          this.isNitroActive = false;

          if (this.isPlayer && this.game && this.game.hud) {
            this.game.hud.showReaction('💥 ชนที่กั้น! ความเร็วตกฮวบ', 1200);
          }
        } else {
          // Continuous scraping friction: แรงเสียดสีเมื่อครูดขอบทางต่อเนื่อง
          const scrapeFriction = 35.0; // m/s²
          this.speed = Math.max(0, this.speed - scrapeFriction * delta);
        }

        // 4. Audio & sparks
        if (this.game) {
          if (this.game.audio && (!this.lastBounceTime || now - this.lastBounceTime > 280)) {
            this.lastBounceTime = now;
            this.game.audio.playCollision();
          }
          if (this.game.particles && Math.abs(this.speed) > 4) {
            const sparkPos = this.position.clone().addScaledVector(closest.normal, wallSide * 0.6);
            this.game.particles.emitDriftSparks(sparkPos, 2);
          }
        }
      } else {
        this.isHittingBarrier = false;
      }

      // Ground plane clamping: tires rest firmly on the road surface
      const targetY = closest.point.y + 0.05;
      this.position.y = THREE.MathUtils.lerp(this.position.y, targetY, delta * 16);

      // Boost pads check
      if (track.boostPads && track.boostPads.length > 0) {
        for (let i = 0; i < track.boostPads.length; i++) {
          const pad = track.boostPads[i];
          if (this.position.distanceTo(pad.position) < pad.radius && this.boostTimer < 2.0) {
            this.boostTimer = 2.6;
            this.speed = Math.max(this.speed, (p.maxSpeed || 50) * 1.35);
            this.nitroFuel = Math.min(100, this.nitroFuel + 25);
            if (this.isPlayer && this.game && this.game.audio) {
              this.game.audio.playBoostSound();
              if (this.game.hud) this.game.hud.showReaction('🚀 บูสต์เร่งความเร็ว!', 1200);
            }
            break;
          }
        }
      }
    }
  }

  updateVisuals(delta) {
    if (!this.model) return;

    this.model.position.copy(this.position);

    const targetRoll = this.isDrifting
      ? -this.driftDirection * 0.12
      : -this.steeringAngle * 0.08 * (Math.abs(this.speed) / 30);
    this.roll = THREE.MathUtils.lerp(this.roll, targetRoll, delta * 8);

    const targetPitch = (this.inputs.throttle > 0 ? -0.04 : (this.inputs.throttle < 0 ? 0.06 : 0));
    this.pitch = THREE.MathUtils.lerp(this.pitch, targetPitch, delta * 8);

    this.model.rotation.set(this.pitch, this.rotationY, this.roll, 'YXZ');

    // Steer front wheels
    if (this.steerGroups) {
      const maxWheelAngle = 0.45;
      const wheelAngle = this.steeringAngle * maxWheelAngle;
      this.steerGroups.forEach(g => {
        g.rotation.y = wheelAngle;
      });
    }

    // Spin wheels
    this.wheelRotation += (this.speed / 0.35) * delta;
    if (this.wheels) {
      Object.values(this.wheels).forEach(w => {
        if (w && w.children.length >= 2) {
          w.children[0].rotation.x = this.wheelRotation;
          w.children[1].rotation.x = this.wheelRotation;
        }
      });
    }

    // Brake lights
    if (this.brakeLightMat) {
      if (this.inputs.throttle < 0 || (this.inputs.drift && this.speed > 5)) {
        this.brakeLightMat.color.setHex(0xff0022);
      } else {
        this.brakeLightMat.color.setHex(0x550011);
      }
    }
  }

  updateTrackProgress(delta, track) {
    if (!track || this.isFinished) return;

    this.currentLapTime += delta;

    const closest = track.getClosest(this.position, this.sampleIndexHint);
    this.sampleIndexHint = closest.index;
    const t = closest.t;

    // Track halfway point to ensure forward lap completion
    if (t > 0.4 && t < 0.6) {
      this.hasPassedHalfway = true;
    }

    // Finish line cross check (wrapping from > 0.85 to < 0.15)
    if (this.hasPassedHalfway && t < 0.15) {
      this.hasPassedHalfway = false;
      this.lapTimes.push(this.currentLapTime);
      if (!this.bestLapTime || this.currentLapTime < this.bestLapTime) {
        this.bestLapTime = this.currentLapTime;
      }
      this.currentLapTime = 0;

      const maxLaps = this.totalLaps || 3;
      if (this.lap >= maxLaps) {
        this.isFinished = true;
      } else {
        this.lap += 1;
        if (this.isPlayer && this.game && this.game.hud) {
          this.game.hud.showNotification(`รอบที่ ${this.lap} / ${maxLaps}!`);
        }
      }
    }

    // Monotonic continuous distance calculation
    this.totalDistance = (this.lap - 1) + t;
  }

  respawn(track) {
    if (!track) return;
    const closest = track.getClosest(this.position, this.sampleIndexHint);
    const respawnTransform = track.getRespawnTransform(closest.t);

    this.position.copy(respawnTransform.position);
    this.rotationY = respawnTransform.rotationY;
    this.speed = 0;
    this.velocity.set(0, 0, 0);
    this.boostTimer = 0;
    this.isDrifting = false;
    this.isSpinning = false;
    this.spinTimer = 0;
    this.sampleIndexHint = respawnTransform.index;
  }

  getSpeedKmh() {
    return Math.max(0, Math.round(Math.abs(this.speed) * 3.6));
  }
}
