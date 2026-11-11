import * as THREE from 'three';

export class ItemSystem {
  constructor(scene, track, particles, audio, hud) {
    this.scene = scene;
    this.track = track;
    this.particles = particles;
    this.audio = audio;
    this.hud = hud;

    this.itemBoxes = [];
    this.activeBananas = [];
    this.activeMissiles = [];

    this.itemTypes = ['boost', 'banana', 'missile', 'shield'];

    this.initItemBoxes();
  }

  resetForTrack(newTrack) {
    // Clear old boxes
    this.itemBoxes.forEach(b => {
      if (b.mesh) {
        this.scene.remove(b.mesh);
        b.mesh.geometry.dispose();
        if (b.mesh.material) b.mesh.material.dispose();
      }
    });
    this.itemBoxes = [];

    // Clear bananas
    this.activeBananas.forEach(b => {
      if (b.mesh) {
        this.scene.remove(b.mesh);
        b.mesh.geometry.dispose();
        if (b.mesh.material) b.mesh.material.dispose();
      }
    });
    this.activeBananas = [];

    // Clear missiles
    this.activeMissiles.forEach(m => {
      if (m.mesh) {
        this.scene.remove(m.mesh);
        m.mesh.geometry.dispose();
        if (m.mesh.material) m.mesh.material.dispose();
      }
    });
    this.activeMissiles = [];

    this.track = newTrack;
    this.initItemBoxes();
  }

  initItemBoxes() {
    if (!this.track) return;

    const clusters = this.track.def?.itemClusters || [0.2, 0.45, 0.75];
    const boxGeo = new THREE.BoxGeometry(1.3, 1.3, 1.3);

    // Question mark texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff0077aa';
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, 120, 120);
    ctx.font = 'bold 80px sans-serif';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', 64, 64);
    const boxTex = new THREE.CanvasTexture(canvas);
    boxTex.colorSpace = THREE.SRGBColorSpace;

    const boxMat = new THREE.MeshBasicMaterial({
      map: boxTex,
      transparent: true,
      opacity: 0.88
    });

    const halfRoad = (this.track.roadWidth || 16) / 2;
    const offsets = [-halfRoad * 0.55, 0, halfRoad * 0.55];

    clusters.forEach(t => {
      const idx = this.track.indexFromT(t);
      const centerPt = this.track.samplePos[idx];
      const normal = this.track.sampleNorm[idx];

      offsets.forEach(offset => {
        const pos = centerPt.clone().addScaledVector(normal, offset);
        pos.y = 1.1;

        const mesh = new THREE.Mesh(boxGeo, boxMat);
        mesh.position.copy(pos);
        this.scene.add(mesh);

        this.itemBoxes.push({
          mesh,
          pos,
          active: true,
          respawnTimer: 0
        });
      });
    });
  }

  update(delta, playerCar, otherCars = []) {
    // 1. Rotate & Animate Item Boxes
    this.itemBoxes.forEach(box => {
      if (box.active) {
        box.mesh.rotation.y += delta * 2.5;
        box.mesh.rotation.x += delta * 1.5;
        box.mesh.visible = true;

        // Check collision with player
        if (playerCar && !playerCar.currentItem && playerCar.position.distanceTo(box.pos) < 2.2) {
          this.pickupItem(playerCar, box);
        }

        // Check collision with other cars (AI or remote)
        for (let i = 0; i < otherCars.length; i++) {
          const car = otherCars[i];
          if (car && !car.currentItem && car.position.distanceTo(box.pos) < 2.2) {
            box.active = false;
            box.respawnTimer = 6.0;
            box.mesh.visible = false;
            car.currentItem = this.itemTypes[Math.floor(Math.random() * this.itemTypes.length)];
            break;
          }
        }
      } else {
        box.respawnTimer -= delta;
        if (box.respawnTimer <= 0) {
          box.active = true;
          box.mesh.visible = true;
        }
      }
    });

    // 2. Update Bananas
    for (let i = this.activeBananas.length - 1; i >= 0; i--) {
      const b = this.activeBananas[i];
      b.mesh.rotation.y += delta * 1.5;

      // Hit player
      if (playerCar && !playerCar.isInvincible && playerCar.position.distanceTo(b.pos) < 2.0) {
        this.triggerSpinOut(playerCar);
        this.removeBanana(i);
        continue;
      }

      // Hit other cars
      let hit = false;
      for (const car of otherCars) {
        if (car && !car.isInvincible && car.position.distanceTo(b.pos) < 2.0) {
          this.triggerSpinOut(car);
          this.removeBanana(i);
          hit = true;
          break;
        }
      }
      if (hit) continue;
    }

    // 3. Update Missiles
    for (let i = this.activeMissiles.length - 1; i >= 0; i--) {
      const m = this.activeMissiles[i];
      m.life -= delta;

      if (m.life <= 0) {
        this.removeMissile(i);
        continue;
      }

      // Guided flight along missile velocity
      m.pos.addScaledVector(m.velocity, delta);
      m.mesh.position.copy(m.pos);

      // Hit player
      if (m.owner !== playerCar && playerCar && !playerCar.isInvincible && playerCar.position.distanceTo(m.pos) < 2.6) {
        this.triggerSpinOut(playerCar);
        if (this.particles) this.particles.emitExhaustFlame([m.mesh], true);
        this.removeMissile(i);
        continue;
      }

      // Hit other cars
      let hit = false;
      for (const car of otherCars) {
        if (car && m.owner !== car && !car.isInvincible && car.position.distanceTo(m.pos) < 2.6) {
          this.triggerSpinOut(car);
          if (this.particles) this.particles.emitExhaustFlame([m.mesh], true);
          hit = true;
          break;
        }
      }
      if (hit) {
        this.removeMissile(i);
      }
    }
  }

  pickupItem(car, box) {
    box.active = false;
    box.respawnTimer = 6.0;
    box.mesh.visible = false;

    const picked = this.itemTypes[Math.floor(Math.random() * this.itemTypes.length)];
    car.currentItem = picked;

    if (this.audio) this.audio.playItemPickup();
    if (this.hud && car.isPlayer) {
      this.hud.setItem(picked);
      const names = {
        boost: '⚡ ซูเปอร์ไนโตร',
        banana: '🍌 เปลือกกล้วยดักหลัง',
        missile: '🚀 มิสไซล์นำวิถี',
        shield: '🛡️ โล่ป้องกันบาเรีย'
      };
      this.hud.showNotification(`ได้รับ: ${names[picked] || picked}!`);
    }
  }

  useItem(car) {
    if (!car || !car.currentItem) return;
    const item = car.currentItem;
    car.currentItem = null;

    if (car.isPlayer && this.hud) {
      this.hud.setItem(null);
    }

    if (item === 'boost') {
      car.boostTimer = 3.6;
      car.isInvincible = true;
      setTimeout(() => { car.isInvincible = false; }, 3600);
      if (this.audio) this.audio.playBoostSound();
      if (car.isPlayer && this.hud) {
        this.hud.showReaction('⚡ ซูเปอร์ไนโตรติดสปีด!', 1500);
      }
    } else if (item === 'banana') {
      this.dropBanana(car);
      if (car.isPlayer && this.hud) {
        this.hud.showReaction('🍌 วางกล้วยดักหลัง!', 1500);
      }
    } else if (item === 'missile') {
      this.fireMissile(car);
      if (this.audio) this.audio.playMissileShoot();
      if (car.isPlayer && this.hud) {
        this.hud.showReaction('🚀 ยิงจรวดมิสไซล์!', 1500);
      }
    } else if (item === 'shield') {
      car.isInvincible = true;
      setTimeout(() => { car.isInvincible = false; }, 5000);
      if (car.isPlayer && this.hud) {
        this.hud.showReaction('🛡️ โล่ป้องกัน 5 วินาที!', 1500);
      }
    }
  }

  dropBanana(car) {
    const behind = new THREE.Vector3(0, 0.2, -2.6).applyAxisAngle(new THREE.Vector3(0, 1, 0), car.rotationY);
    const pos = car.position.clone().add(behind);
    pos.y = 0.25;

    const geo = new THREE.ConeGeometry(0.35, 0.65, 8);
    geo.rotateZ(Math.PI / 4);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffdd00, roughness: 0.3 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    this.scene.add(mesh);

    this.activeBananas.push({ mesh, pos });
  }

  removeBanana(index) {
    const b = this.activeBananas[index];
    if (b) {
      this.scene.remove(b.mesh);
      b.mesh.geometry.dispose();
      b.mesh.material.dispose();
      this.activeBananas.splice(index, 1);
    }
  }

  fireMissile(car) {
    const forward = new THREE.Vector3(Math.sin(car.rotationY), 0, Math.cos(car.rotationY)).normalize();
    const pos = car.position.clone().addScaledVector(forward, 2.8);
    pos.y += 0.45;

    const geo = new THREE.CylinderGeometry(0.18, 0.18, 1.0, 12);
    geo.rotateX(Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({ color: 0xff0044, metalness: 0.8 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.rotation.y = car.rotationY;
    this.scene.add(mesh);

    this.activeMissiles.push({
      mesh,
      pos,
      velocity: forward.clone().multiplyScalar(68),
      owner: car,
      life: 4.0
    });
  }

  removeMissile(index) {
    const m = this.activeMissiles[index];
    if (m) {
      this.scene.remove(m.mesh);
      m.mesh.geometry.dispose();
      m.mesh.material.dispose();
      this.activeMissiles.splice(index, 1);
    }
  }

  triggerSpinOut(car) {
    if (car.spinTimer > 0) return;
    car.spinTimer = 1.25;
    car.speed *= 0.3;

    if (this.audio) this.audio.playSlip();
    if (car.isPlayer && this.hud) {
      this.hud.showReaction('😵 รถหมุนติ้ว โดนไอเทม!', 1500);
    }
  }
}
