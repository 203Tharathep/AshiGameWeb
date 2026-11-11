import * as THREE from 'three';

export class ParticleSystem {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];

    // Shared smoke texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 4, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.5, 'rgba(200, 200, 220, 0.4)');
    grad.addColorStop(1, 'rgba(150, 150, 180, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    this.smokeTex = new THREE.CanvasTexture(canvas);

    // Particle geometries
    this.smokeGeo = new THREE.PlaneGeometry(0.8, 0.8);
    this.sparkGeo = new THREE.PlaneGeometry(0.18, 0.18);
    this.flameGeo = new THREE.ConeGeometry(0.15, 0.8, 8);
    this.flameGeo.rotateX(Math.PI / 2);

    this.flameMat = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
  }

  emitTireSmoke(pos, color = 0xdddddd) {
    const mat = new THREE.MeshBasicMaterial({
      map: this.smokeTex,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
    const mesh = new THREE.Mesh(this.smokeGeo, mat);
    mesh.position.copy(pos);
    mesh.position.y += 0.1;
    mesh.rotation.z = Math.random() * Math.PI * 2;
    this.scene.add(mesh);

    this.particles.push({
      mesh,
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.5, 0.5 + Math.random() * 0.5, (Math.random() - 0.5) * 0.5),
      scaleGrowth: 2.5,
      life: 0.6,
      maxLife: 0.6
    });
  }

  emitCelebrationFirework(pos) {
    const fireworkColors = [0xffd700, 0x00f0ff, 0xff0055, 0x00ff88, 0xffffff, 0xdd00ff];
    const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

    for (let i = 0; i < 20; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(this.sparkGeo, mat);
      mesh.scale.setScalar(1.6 + Math.random() * 1.6);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      const angle = Math.random() * Math.PI * 2;
      const speed = 3.5 + Math.random() * 6.5;
      const vy = 2.5 + Math.random() * 6.0;

      this.particles.push({
        mesh,
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          vy,
          Math.sin(angle) * speed
        ),
        scaleGrowth: -0.6,
        life: 0.8 + Math.random() * 0.4,
        maxLife: 1.2
      });
    }
  }

  emitDriftSparks(pos, level = 1) {
    const sparkColors = [0x00f0ff, 0x00d2ff, 0xffaa00, 0xdd00ff];
    const color = sparkColors[level] || 0x00f0ff;

    for (let i = 0; i < 2; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(this.sparkGeo, mat);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      this.particles.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          1 + Math.random() * 2,
          (Math.random() - 0.5) * 3
        ),
        scaleGrowth: -0.5,
        life: 0.35,
        maxLife: 0.35
      });
    }
  }

  emitExhaustFlame(pipes, isBoost) {
    if (!pipes || pipes.length === 0 || !isBoost) return;

    pipes.forEach(pipe => {
      const worldPos = new THREE.Vector3();
      pipe.getWorldPosition(worldPos);

      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00f0ff : 0xff00bb,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(this.flameGeo, mat);
      mesh.position.copy(worldPos);
      mesh.quaternion.copy(pipe.parent.quaternion);
      this.scene.add(mesh);

      this.particles.push({
        mesh,
        velocity: new THREE.Vector3(0, 0, 0),
        scaleGrowth: -1.2,
        life: 0.12,
        maxLife: 0.12
      });
    });
  }

  update(delta, camera) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= delta;

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
        continue;
      }

      // Billboard towards camera if plane
      if (camera && p.mesh.geometry === this.smokeGeo) {
        p.mesh.quaternion.copy(camera.quaternion);
      }

      p.mesh.position.addScaledVector(p.velocity, delta);
      const scaleDelta = 1 + p.scaleGrowth * delta;
      p.mesh.scale.multiplyScalar(Math.max(0.1, scaleDelta));
      p.mesh.material.opacity = (p.life / p.maxLife) * 0.6;
    }
  }
}

