import * as THREE from 'three';
import { SKINS } from '../data/skinsData.js';
import { disposeObject3D } from './Track.js';

const Z_AXIS = new THREE.Vector3(0, 0, 1);

/**
 * Themed scenery around a Track: ground, skyline, roadside props, Ashi billboards,
 * tunnels, grandstands and weather particles. Everything is inside `this.group`.
 */
export class TrackDecorations {
  constructor(scene, track) {
    this.scene = scene;
    this.track = track;
    this.def = track.def;
    this.theme = track.def.theme || {};
    this.textureLoader = new THREE.TextureLoader();

    this.group = new THREE.Group();
    this.group.name = 'TrackDecorations';
    this.scene.add(this.group);

    this.holograms = [];
    this.weather = null;
    this.bounds = track.getBounds();
    this.radius = Math.max(this.bounds.maxX - this.bounds.minX, this.bounds.maxZ - this.bounds.minZ) / 2;

    this.buildGround();
    this.buildSkyline();
    this.buildRoadsideProps();
    this.buildAshiBillboards();
    this.buildTunnel();
    this.buildGrandstands();
    if (this.theme.holograms) this.buildFloatingHolograms();
    if (this.theme.weather) this.buildWeather(this.theme.weather);
  }

  rand(min, max) {
    return min + Math.random() * (max - min);
  }

  buildGround() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = this.theme.ground || '#0b0c14';
    ctx.fillRect(0, 0, 512, 512);

    const detail = this.theme.groundDetail || '#1b2238';
    if (this.theme.skyline === 'city') {
      ctx.strokeStyle = detail;
      ctx.lineWidth = 2;
      for (let x = 0; x <= 512; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, x); ctx.lineTo(512, x); ctx.stroke();
      }
    } else if (this.theme.skyline === 'volcano') {
      // Glowing lava cracks
      ctx.strokeStyle = detail;
      ctx.lineWidth = 2;
      for (let i = 0; i < 26; i++) {
        let x = Math.random() * 512;
        let y = Math.random() * 512;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let s = 0; s < 6; s++) {
          x += (Math.random() - 0.5) * 60;
          y += (Math.random() - 0.5) * 60;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } else {
      for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? detail : 'rgba(255,255,255,0.08)';
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 3);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    const groundRadius = this.radius + 220;
    tex.repeat.set(groundRadius / 18, groundRadius / 18);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(groundRadius, 64),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95, metalness: 0.0 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(this.bounds.cx, -0.02, this.bounds.cz);
    ground.receiveShadow = true;
    this.group.add(ground);

    const farIsEmissive = this.theme.skyline === 'volcano';
    const far = new THREE.Mesh(
      new THREE.PlaneGeometry(6000, 6000),
      farIsEmissive
        ? new THREE.MeshBasicMaterial({ color: this.theme.farGround })
        : new THREE.MeshStandardMaterial({ color: this.theme.farGround ?? 0x05060c, roughness: 0.4, metalness: 0.3 })
    );
    far.rotation.x = -Math.PI / 2;
    far.position.set(this.bounds.cx, -0.4, this.bounds.cz);
    this.group.add(far);
  }

  /** Picks a random spot in a ring around the track that keeps clear of the road. */
  findClearSpot(minR, maxR, margin) {
    for (let tries = 0; tries < 25; tries++) {
      const a = Math.random() * Math.PI * 2;
      const r = this.rand(minR, maxR);
      const x = this.bounds.cx + Math.cos(a) * r;
      const z = this.bounds.cz + Math.sin(a) * r;
      if (this.track.isClearOfTrack(x, z, margin)) return { x, z };
    }
    return null;
  }

  buildSkyline() {
    const style = this.theme.skyline;
    const R = this.radius;

    if (style === 'city' || style === 'resort') {
      const isCity = style === 'city';
      const count = isCity ? 90 : 45;
      const boxGeo = new THREE.BoxGeometry(1, 1, 1);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: isCity ? 0x121422 : 0xf1e3cf,
        roughness: isCity ? 0.5 : 0.8,
        metalness: isCity ? 0.8 : 0.05
      });
      const bodies = new THREE.InstancedMesh(boxGeo, bodyMat, count);
      const trims = new THREE.InstancedMesh(boxGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }), count);
      const palette = isCity ? [0x00f0ff, 0xff00aa, 0xffd700, 0x00ff88] : [0xff7a59, 0x2ec4b6, 0xffbf69, 0x6a8eae];
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      const color = new THREE.Color();
      let n = 0;
      for (let i = 0; i < count; i++) {
        const spot = this.findClearSpot(R * 0.35, R + 260, 35);
        if (!spot) continue;
        const w = this.rand(14, 34);
        const d = this.rand(14, 34);
        const h = isCity ? this.rand(40, 160) : this.rand(12, 45);
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * Math.PI);
        m.compose(new THREE.Vector3(spot.x, h / 2 - 1, spot.z), q, new THREE.Vector3(w, h, d));
        bodies.setMatrixAt(n, m);
        m.compose(new THREE.Vector3(spot.x, h - 1, spot.z), q, new THREE.Vector3(w * 1.03, isCity ? 1.2 : 2.2, d * 1.03));
        trims.setMatrixAt(n, m);
        trims.setColorAt(n, color.setHex(palette[n % palette.length]));
        n++;
      }
      bodies.count = n;
      trims.count = n;
      bodies.castShadow = false;
      this.group.add(bodies, trims);
    } else if (style === 'mountains') {
      const coneGeo = new THREE.ConeGeometry(1, 1, 7);
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x6b7c8f, roughness: 0.9, flatShading: true });
      const snowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7, flatShading: true });
      for (let i = 0; i < 34; i++) {
        const spot = this.findClearSpot(R + 80, R + 420, 80);
        if (!spot) continue;
        const r = this.rand(50, 120);
        const h = this.rand(80, 210);
        const mtn = new THREE.Mesh(coneGeo, rockMat);
        mtn.scale.set(r, h, r);
        mtn.position.set(spot.x, h / 2 - 2, spot.z);
        mtn.rotation.y = Math.random() * Math.PI;
        const cap = new THREE.Mesh(coneGeo, snowMat);
        cap.scale.set(r * 0.42, h * 0.42, r * 0.42);
        cap.position.set(spot.x, h - h * 0.21 - 1.5, spot.z);
        cap.rotation.y = mtn.rotation.y;
        this.group.add(mtn, cap);
      }
    } else if (style === 'volcano') {
      // The big volcano behind the circuit
      const vx = this.bounds.cx - (R + 230);
      const vz = this.bounds.cz + 80;
      const volcano = new THREE.Mesh(
        new THREE.CylinderGeometry(55, 210, 190, 18, 1, true),
        new THREE.MeshStandardMaterial({ color: 0x2a1410, roughness: 0.95, flatShading: true, side: THREE.DoubleSide })
      );
      volcano.position.set(vx, 93, vz);
      const lava = new THREE.Mesh(
        new THREE.CircleGeometry(55, 18),
        new THREE.MeshBasicMaterial({ color: 0xff5a00 })
      );
      lava.rotation.x = -Math.PI / 2;
      lava.position.set(vx, 175, vz);
      this.group.add(volcano, lava);
      this.lavaTop = lava;

      // Lava rivers flowing down
      const riverMat = new THREE.MeshBasicMaterial({ color: 0xff3a00 });
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const river = new THREE.Mesh(new THREE.BoxGeometry(6, 200, 2), riverMat);
        river.position.set(vx + Math.cos(a) * 130, 90, vz + Math.sin(a) * 130);
        river.lookAt(vx, 90, vz);
        river.rotateX(-0.82);
        this.group.add(river);
      }

      // Rock spires
      const spireGeo = new THREE.ConeGeometry(1, 1, 5);
      const spireMat = new THREE.MeshStandardMaterial({ color: 0x1f1210, roughness: 1, flatShading: true });
      for (let i = 0; i < 40; i++) {
        const spot = this.findClearSpot(R * 0.4, R + 300, 30);
        if (!spot) continue;
        const s = this.rand(8, 22);
        const h = this.rand(30, 90);
        const spire = new THREE.Mesh(spireGeo, spireMat);
        spire.scale.set(s, h, s);
        spire.position.set(spot.x, h / 2 - 1, spot.z);
        this.group.add(spire);
      }
    }
  }

  buildRoadsideProps() {
    const style = this.theme.props;
    if (!style) return;
    const track = this.track;
    const half = track.trackWidth / 2;
    const step = Math.round((style === 'lamps' ? 34 : 18) / track.sampleSpacing);
    const spots = [];

    for (let i = 0; i < track.sampleCount; i += step) {
      [-1, 1].forEach(side => {
        if (style === 'lamps' && side === -1 && (i / step) % 2 === 1) return;
        const p = track.samplePos[i];
        const n = track.sampleNorm[i];
        const off = style === 'lamps' ? half + 1.6 : half + this.rand(5, 16);
        const x = p.x + n.x * side * off;
        const z = p.z + n.z * side * off;
        const clearMargin = style === 'lamps' ? 1.0 : 3;
        if (track.distanceToCentreLine(x, z, 1) > half + clearMargin) {
          spots.push({ x, z, side, i });
        }
      });
    }
    if (spots.length === 0) return;

    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const v = new THREE.Vector3();
    const yAxis = new THREE.Vector3(0, 1, 0);

    const makeInstanced = (geo, mat, cb, castShadow = false) => {
      const mesh = new THREE.InstancedMesh(geo, mat, spots.length);
      spots.forEach((sp, k) => {
        cb(sp, k);
        mesh.setMatrixAt(k, m);
      });
      mesh.castShadow = castShadow;
      this.group.add(mesh);
      return mesh;
    };

    if (style === 'palms') {
      const scales = spots.map(() => this.rand(0.8, 1.3));
      const trunkGeo = new THREE.CylinderGeometry(0.25, 0.4, 7, 6);
      trunkGeo.translate(0, 3.5, 0);
      makeInstanced(trunkGeo, new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 1 }), (sp, k) => {
        q.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.rand(-0.15, 0.15));
        m.compose(v.set(sp.x, 0, sp.z), q, s.setScalar(scales[k]));
      }, true);
      const leafGeo = new THREE.ConeGeometry(3.2, 1.6, 7);
      leafGeo.translate(0, 7.4, 0);
      makeInstanced(leafGeo, new THREE.MeshStandardMaterial({ color: 0x2f9e44, roughness: 0.8, flatShading: true }), (sp, k) => {
        q.setFromAxisAngle(yAxis, Math.random() * Math.PI);
        m.compose(v.set(sp.x, 0, sp.z), q, s.setScalar(scales[k]));
      }, true);
    } else if (style === 'pines') {
      const scales = spots.map(() => this.rand(0.8, 1.5));
      const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 2, 6);
      trunkGeo.translate(0, 1, 0);
      makeInstanced(trunkGeo, new THREE.MeshStandardMaterial({ color: 0x5b3a1e }), (sp, k) => {
        m.compose(v.set(sp.x, 0, sp.z), q.identity(), s.setScalar(scales[k]));
      });
      const crownGeo = new THREE.ConeGeometry(2.4, 7, 7);
      crownGeo.translate(0, 5.2, 0);
      makeInstanced(crownGeo, new THREE.MeshStandardMaterial({ color: 0x1f5f3f, roughness: 0.9, flatShading: true }), (sp, k) => {
        m.compose(v.set(sp.x, 0, sp.z), q.identity(), s.setScalar(scales[k]));
      }, true);
      const snowGeo = new THREE.ConeGeometry(1.3, 2.6, 7);
      snowGeo.translate(0, 7.9, 0);
      makeInstanced(snowGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true }), (sp, k) => {
        m.compose(v.set(sp.x, 0, sp.z), q.identity(), s.setScalar(scales[k]));
      });
    } else if (style === 'lamps') {
      const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, 8, 6);
      poleGeo.translate(0, 4, 0);
      makeInstanced(poleGeo, new THREE.MeshStandardMaterial({ color: 0x33333e, metalness: 0.8, roughness: 0.3 }), sp => {
        m.compose(v.set(sp.x, 0, sp.z), q.identity(), s.setScalar(1));
      });
      const headGeo = new THREE.BoxGeometry(0.6, 0.25, 2.2);
      headGeo.translate(0, 8, 0);
      makeInstanced(headGeo, new THREE.MeshBasicMaterial({ color: 0xbfe9ff }), sp => {
        const n = track.sampleNorm[sp.i];
        const ang = Math.atan2(n.x, n.z);
        q.setFromAxisAngle(yAxis, ang);
        m.compose(v.set(sp.x - n.x * sp.side * 1.0, 0, sp.z - n.z * sp.side * 1.0), q, s.setScalar(1));
      });
    } else if (style === 'rocks') {
      const rockGeo = new THREE.DodecahedronGeometry(1.4, 0);
      makeInstanced(rockGeo, new THREE.MeshStandardMaterial({ color: 0x2b1a16, roughness: 1, flatShading: true }), () => {
        q.setFromEuler(new THREE.Euler(Math.random() * 3, Math.random() * 3, Math.random() * 3));
        const sc = this.rand(0.6, 1.8);
        m.compose(v.set(0, 0, 0), q, s.set(sc, sc * this.rand(0.6, 1.2), sc));
      }, true);
      // Instanced rocks: place properly (compose above used origin, redo with positions)
      const rocks = this.group.children[this.group.children.length - 1];
      spots.forEach((sp, k) => {
        rocks.getMatrixAt(k, m);
        m.setPosition(sp.x, 0.4, sp.z);
        rocks.setMatrixAt(k, m);
      });
      rocks.instanceMatrix.needsUpdate = true;
      // Small glowing lava pools
      const poolGeo = new THREE.CircleGeometry(1.6, 10);
      poolGeo.rotateX(-Math.PI / 2);
      makeInstanced(poolGeo, new THREE.MeshBasicMaterial({ color: 0xff4a00 }), (sp, k) => {
        m.compose(v.set(sp.x + 2.5, 0.03, sp.z + 1.5), q.identity(), s.setScalar(k % 3 === 0 ? 1 : 0.0001));
      });
    }
  }

  buildAshiBillboards() {
    const track = this.track;
    const files = SKINS.slice(0, 12).map(s => ({ file: s.file, title: s.name }));
    const count = Math.max(6, Math.min(10, Math.round(track.trackLength / 200)));
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x181a20, metalness: 0.8, roughness: 0.3 });
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x33333e, metalness: 0.9, roughness: 0.2 });
    const neonMat = new THREE.MeshBasicMaterial({ color: this.theme.railB ?? 0x00f3ff });
    const half = track.trackWidth / 2;

    for (let b = 0; b < count; b++) {
      const t = (b + 0.35) / count;
      const i = track.indexFromT(t);
      const p = track.samplePos[i];
      const tan = track.sampleTan[i];
      const n = track.sampleNorm[i];
      const w = 14;
      const h = 9;
      // Try outside of the curve first, then the other side
      const prefer = -Math.sign(track.sampleCurv[i]) || (b % 2 === 0 ? 1 : -1);
      let pos = null;
      for (const side of [prefer, -prefer]) {
        const dist = half + 9;
        const x = p.x + n.x * side * dist;
        const z = p.z + n.z * side * dist;
        if (track.distanceToCentreLine(x, z, 1) > half + 7.5) {
          pos = new THREE.Vector3(x, 0, z);
          break;
        }
      }
      if (!pos) continue;

      const cfg = files[b % files.length];
      const group = new THREE.Group();
      group.position.copy(pos);

      const poleGeo = new THREE.CylinderGeometry(0.3, 0.35, 10, 10);
      const poleL = new THREE.Mesh(poleGeo, poleMat);
      poleL.position.set(-w * 0.35, 5, 0);
      const poleR = new THREE.Mesh(poleGeo, poleMat);
      poleR.position.set(w * 0.35, 5, 0);
      group.add(poleL, poleR);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 1, h + 1, 0.8), frameMat);
      frame.position.set(0, 8 + h / 2, 0);
      const border = new THREE.Mesh(new THREE.BoxGeometry(w + 1.2, h + 1.2, 0.2), neonMat);
      border.position.set(0, 8 + h / 2, -0.35);
      group.add(frame, border);

      const tex = this.textureLoader.load(`/assets/ashi/${cfg.file}`);
      tex.colorSpace = THREE.SRGBColorSpace;
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }));
      screen.position.set(0, 8 + h / 2, 0.42);
      group.add(screen);

      // Face oncoming traffic
      const look = p.clone().addScaledVector(tan, -30);
      group.lookAt(look.x, 0, look.z);
      group.castShadow = true;
      this.group.add(group);
    }
  }

  buildTunnel() {
    const range = this.def.tunnel;
    if (!range) return;
    const track = this.track;
    const [startT, endT] = range;
    const len = (endT - startT) * track.trackLength;
    const ringsCount = Math.max(8, Math.round(len / 7));
    const radius = track.trackWidth / 2 + 1.5;
    const ringGeo = new THREE.TorusGeometry(radius, 0.35, 6, 24, Math.PI);
    const matA = new THREE.MeshBasicMaterial({ color: this.theme.railB ?? 0x00f0ff });
    const matB = new THREE.MeshBasicMaterial({ color: this.theme.railA ?? 0xff0066 });

    for (let k = 0; k <= ringsCount; k++) {
      const t = startT + (k / ringsCount) * (endT - startT);
      const i = track.indexFromT(t);
      const p = track.samplePos[i];
      const ring = new THREE.Mesh(ringGeo, k % 2 === 0 ? matA : matB);
      ring.position.set(p.x, 0, p.z);
      ring.quaternion.setFromUnitVectors(Z_AXIS, track.sampleTan[i]);
      this.group.add(ring);
    }
  }

  buildGrandstands() {
    const track = this.track;
    const half = track.trackWidth / 2;
    const standMat = new THREE.MeshStandardMaterial({ color: 0x242836, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: this.theme.railA ?? 0xff0044, roughness: 0.4 });
    const crowdColors = [0xff2255, 0x00d2ff, 0xffd700, 0x00ff88, 0xffffff, 0x9d4edd];
    const crowdGeo = new THREE.BoxGeometry(0.6, 0.9, 0.6);
    const crowdMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });

    [-1, 1].forEach(side => {
      const i = track.wrapIndex(30 / track.sampleSpacing);
      const p = track.samplePos[i];
      const n = track.sampleNorm[i];
      const tan = track.sampleTan[i];
      const dist = half + 11;
      const pos = new THREE.Vector3(p.x + n.x * side * dist, 0, p.z + n.z * side * dist);
      if (track.distanceToCentreLine(pos.x, pos.z, 1) < half + 8) return;

      const group = new THREE.Group();
      group.position.copy(pos);
      group.quaternion.setFromUnitVectors(Z_AXIS, tan);

      // Stepped seating facing the track
      for (let row = 0; row < 4; row++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(14 - row * 0, 1.5 + row * 1.5, 3), standMat);
        step.geometry.dispose();
        step.geometry = new THREE.BoxGeometry(3, 1.5 + row * 1.5, 56);
        step.position.set(side * row * 3, (1.5 + row * 1.5) / 2, 0);
        step.receiveShadow = true;
        group.add(step);
      }
      const roof = new THREE.Mesh(new THREE.BoxGeometry(14, 0.6, 58), roofMat);
      roof.position.set(side * 4.5, 10, 0);
      roof.rotation.z = side * 0.12;
      roof.castShadow = true;
      group.add(roof);

      // Crowd
      const crowd = new THREE.InstancedMesh(crowdGeo, crowdMat, 4 * 40);
      const m = new THREE.Matrix4();
      const c = new THREE.Color();
      let k = 0;
      for (let row = 0; row < 4; row++) {
        for (let j = 0; j < 40; j++) {
          m.makeTranslation(side * row * 3, 1.5 + row * 1.5 + 0.45, -26 + j * 1.3 + Math.random() * 0.4);
          crowd.setMatrixAt(k, m);
          crowd.setColorAt(k, c.setHex(crowdColors[(k * 7 + row) % crowdColors.length]));
          k++;
        }
      }
      group.add(crowd);
      this.group.add(group);
    });
  }

  buildFloatingHolograms() {
    const holoGeo = new THREE.OctahedronGeometry(1.2, 0);
    const holoMat = new THREE.MeshBasicMaterial({ color: 0xffdd00, wireframe: true, transparent: true, opacity: 0.8 });
    [0.08, 0.26, 0.46, 0.68, 0.88].forEach(t => {
      const p = this.track.getPositionAt(t);
      const mesh = new THREE.Mesh(holoGeo, holoMat);
      mesh.position.set(p.x, 6.5, p.z);
      this.group.add(mesh);
      this.holograms.push(mesh);
    });
  }

  buildWeather(type) {
    const count = type === 'snow' ? 2200 : 900;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    this.weatherBox = { w: 160, h: 50 };
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * this.weatherBox.w;
      positions[i * 3 + 1] = Math.random() * this.weatherBox.h;
      positions[i * 3 + 2] = (Math.random() - 0.5) * this.weatherBox.w;
      speeds[i] = 0.6 + Math.random() * 0.8;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const c = document.createElement('canvas');
    c.width = 32;
    c.height = 32;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(16, 16, 1, 16, 16, 15);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 32, 32);
    const tex = new THREE.CanvasTexture(c);

    const mat = new THREE.PointsMaterial({
      size: type === 'snow' ? 0.45 : 0.35,
      map: tex,
      color: type === 'snow' ? 0xffffff : 0xff7a1a,
      transparent: true,
      depthWrite: false,
      blending: type === 'snow' ? THREE.NormalBlending : THREE.AdditiveBlending
    });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    this.group.add(points);
    this.weather = { type, points, positions, speeds, count, time: 0 };
  }

  update(delta, camera) {
    this.holograms.forEach(h => {
      h.rotation.y += delta * 2;
      h.rotation.x += delta * 1.5;
    });

    if (this.lavaTop) {
      const pulse = 0.75 + Math.sin(performance.now() * 0.002) * 0.25;
      this.lavaTop.material.color.setRGB(1, 0.3 * pulse + 0.05, 0);
    }

    const w = this.weather;
    if (w && camera) {
      w.time += delta;
      const p = w.positions;
      const box = this.weatherBox;
      const cx = camera.position.x;
      const cz = camera.position.z;
      const dir = w.type === 'snow' ? -1 : 1;
      for (let i = 0; i < w.count; i++) {
        const ix = i * 3;
        p[ix + 1] += dir * w.speeds[i] * delta * (w.type === 'snow' ? 4 : 3);
        p[ix] += Math.sin(w.time + i) * delta * 0.8;
        if (p[ix + 1] < 0) p[ix + 1] += box.h;
        if (p[ix + 1] > box.h) p[ix + 1] -= box.h;
      }
      w.points.position.set(cx, 0, cz);
      // Wrap horizontally so the volume follows the camera seamlessly
      for (let i = 0; i < w.count; i++) {
        const ix = i * 3;
        if (p[ix] > box.w / 2) p[ix] -= box.w;
        if (p[ix] < -box.w / 2) p[ix] += box.w;
      }
      w.points.geometry.attributes.position.needsUpdate = true;
    }
  }

  dispose() {
    disposeObject3D(this.group);
    this.scene.remove(this.group);
  }
}
