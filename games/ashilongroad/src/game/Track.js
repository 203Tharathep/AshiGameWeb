import * as THREE from 'three';

const UP = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);

/**
 * A flat closed-loop race track built from a track definition (see tracksData.js).
 * All meshes live inside `this.group` so a track can be disposed / swapped at runtime.
 *
 * The spline is pre-sampled every ~2 m into lookup tables (positions, tangents,
 * normals, curvature). Cars keep a sample-index hint so closest-point queries are
 * a cheap local search instead of the old 160x getPointAt() global scan.
 */
export class Track {
  constructor(scene, def) {
    this.scene = scene;
    this.def = def;
    this.theme = def.theme || {};

    this.trackWidth = def.trackWidth || 20;           // barrier to barrier
    this.kerbWidth = 1.2;
    this.roadWidth = this.trackWidth - this.kerbWidth * 2;
    this.wallHeight = 1.0;
    this.maxAllowedLateral = this.trackWidth / 2 - 0.9; // car centre limit

    this.group = new THREE.Group();
    this.group.name = `Track:${def.id}`;
    this.scene.add(this.group);

    this.checkpoints = [];
    this.sectorCount = 16;
    this.boostPads = [];
    this.startLightMats = [];
    this.brakeZones = [];

    this.initSpline();
    this.buildSamples();
    this.buildRoadMesh();
    this.buildKerbs();
    this.buildCrashBarriers();
    this.buildStartFinishLine();
    this.buildBrakeDistanceMarkers();
    this.buildTireBarriers();
    this.buildCheckpoints();
    this.buildBoostPads();
  }

  // ------------------------------------------------------------------
  // Geometry helpers
  // ------------------------------------------------------------------
  initSpline() {
    const pts = this.def.points.map(([x, z]) => new THREE.Vector3(x, 0, z));
    this.spline = new THREE.CatmullRomCurve3(pts, true, 'centripetal', 0.5);
    this.spline.arcLengthDivisions = 3000;
    this.trackLength = this.spline.getLength();
  }

  buildSamples() {
    const N = Math.max(400, Math.ceil(this.trackLength / 2));
    this.sampleCount = N;
    this.sampleSpacing = this.trackLength / N;
    this.samplePos = new Array(N);
    this.sampleTan = new Array(N);
    this.sampleNorm = new Array(N);
    this.sampleCurv = new Float32Array(N); // signed rad / metre (+ = turning left / towards +normal)

    for (let i = 0; i < N; i++) {
      const t = i / N;
      const p = this.spline.getPointAt(t);
      p.y = 0;
      const tan = this.spline.getTangentAt(t);
      tan.y = 0;
      tan.normalize();
      this.samplePos[i] = p;
      this.sampleTan[i] = tan;
      this.sampleNorm[i] = new THREE.Vector3().crossVectors(UP, tan).normalize();
    }

    // Signed curvature using a +-3 sample window, then smoothed
    const raw = new Float32Array(N);
    const k = 3;
    for (let i = 0; i < N; i++) {
      const a = this.sampleTan[(i - k + N) % N];
      const b = this.sampleTan[(i + k) % N];
      const ang = Math.atan2(a.z * b.x - a.x * b.z, a.x * b.x + a.z * b.z);
      raw[i] = ang / (2 * k * this.sampleSpacing);
    }
    for (let i = 0; i < N; i++) {
      let s = 0;
      for (let j = -2; j <= 2; j++) s += raw[(i + j + N) % N];
      this.sampleCurv[i] = s / 5;
    }
  }

  wrapIndex(i) {
    const N = this.sampleCount;
    return ((Math.round(i) % N) + N) % N;
  }

  indexFromT(t) {
    return this.wrapIndex(((t % 1) + 1) % 1 * this.sampleCount);
  }

  /** World position at lap fraction t with a lateral offset (+ = towards normal). */
  getPositionAt(t, lateral = 0, target = new THREE.Vector3()) {
    const i = this.indexFromT(t);
    return target.copy(this.samplePos[i]).addScaledVector(this.sampleNorm[i], lateral);
  }

  /**
   * Closest centre-line point to `pos`. Pass the previous sample index as `hint`
   * for a fast local search. Returns index, t (0..1), point, tangent, normal,
   * signed lateral offset and planar distance.
   */
  getClosest(pos, hint = -1) {
    const N = this.sampleCount;
    const P = this.samplePos;
    let best = -1;
    let bestD = Infinity;

    if (hint >= 0) {
      const W = 36;
      for (let k = -W; k <= W; k++) {
        const i = (hint + k + N) % N;
        const dx = pos.x - P[i].x;
        const dz = pos.z - P[i].z;
        const d = dx * dx + dz * dz;
        if (d < bestD) { bestD = d; best = i; }
      }
      const limit = this.trackWidth * 2.5;
      if (bestD > limit * limit) best = -1;
    }

    if (best < 0) {
      bestD = Infinity;
      for (let i = 0; i < N; i++) {
        const dx = pos.x - P[i].x;
        const dz = pos.z - P[i].z;
        const d = dx * dx + dz * dz;
        if (d < bestD) { bestD = d; best = i; }
      }
    }

    // Refine: project onto the neighbouring segment for a continuous t
    let base = best;
    let frac = this.projectFrac(pos, best, (best + 1) % N);
    if (frac < 0) {
      base = (best - 1 + N) % N;
      frac = this.projectFrac(pos, base, best);
    }
    frac = Math.min(1, Math.max(0, frac));

    const a = P[base];
    const b = P[(base + 1) % N];
    const point = new THREE.Vector3(a.x + (b.x - a.x) * frac, 0, a.z + (b.z - a.z) * frac);
    const tangent = this.sampleTan[best];
    const normal = this.sampleNorm[best];
    const dx = pos.x - point.x;
    const dz = pos.z - point.z;
    const lateral = dx * normal.x + dz * normal.z;

    return {
      index: best,
      t: (base + frac) / N,
      point,
      tangent,
      normal,
      lateral,
      distance: Math.sqrt(dx * dx + dz * dz)
    };
  }

  projectFrac(pos, i0, i1) {
    const a = this.samplePos[i0];
    const b = this.samplePos[i1];
    const abx = b.x - a.x;
    const abz = b.z - a.z;
    const len2 = abx * abx + abz * abz || 1;
    return ((pos.x - a.x) * abx + (pos.z - a.z) * abz) / len2;
  }

  /** Backwards compatible helper used by older code paths. */
  getClosestPointAndT(pos, hint = -1) {
    return this.getClosest(pos, hint);
  }

  getRespawnTransform(t, lateral = 0) {
    const i = this.indexFromT(t);
    const tan = this.sampleTan[i];
    const pos = this.samplePos[i].clone().addScaledVector(this.sampleNorm[i], lateral);
    pos.y = 0.05;
    return { position: pos, rotationY: Math.atan2(tan.x, tan.z), index: i };
  }

  /** Planar distance from (x, z) to the centre line (coarse, used at build time). */
  distanceToCentreLine(x, z, stride = 2) {
    let best = Infinity;
    for (let i = 0; i < this.sampleCount; i += stride) {
      const p = this.samplePos[i];
      const dx = x - p.x;
      const dz = z - p.z;
      const d = dx * dx + dz * dz;
      if (d < best) best = d;
    }
    return Math.sqrt(best);
  }

  isClearOfTrack(x, z, margin = 6) {
    return this.distanceToCentreLine(x, z) > this.trackWidth / 2 + margin;
  }

  getBounds() {
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const p of this.samplePos) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    }
    return { minX, maxX, minZ, maxZ, cx: (minX + maxX) / 2, cz: (minZ + maxZ) / 2 };
  }

  // ------------------------------------------------------------------
  // Strip builder (road, kerbs, walls) driven by the sample table
  // ------------------------------------------------------------------
  buildStrip(innerOffset, outerOffset, y0, y1, vScale, material, vertical = false) {
    const N = this.sampleCount;
    const verts = [];
    const uvs = [];
    const idx = [];
    let dist = 0;

    for (let i = 0; i <= N; i++) {
      const s = i % N;
      if (i > 0) dist += this.sampleSpacing;
      const p = this.samplePos[s];
      const n = this.sampleNorm[s];
      const v = dist / vScale;

      if (vertical) {
        const x = p.x + n.x * innerOffset;
        const z = p.z + n.z * innerOffset;
        verts.push(x, y0, z, x, y1, z);
        uvs.push(v, 0, v, 1);
      } else {
        verts.push(p.x + n.x * innerOffset, y0, p.z + n.z * innerOffset);
        verts.push(p.x + n.x * outerOffset, y1, p.z + n.z * outerOffset);
        uvs.push(0, v, 1, v);
      }

      if (i < N) {
        const b = i * 2;
        idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, material);
    this.group.add(mesh);
    return mesh;
  }

  buildRoadMesh() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = this.theme.tarmac || '#1c1e24';
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 6000; i++) {
      const r = Math.random();
      ctx.fillStyle = r > 0.66 ? 'rgba(0,0,0,0.35)' : (r > 0.33 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.09)');
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }

    // Rubbered-in racing grooves
    [[110, 190], [322, 402]].forEach(([a, b]) => {
      const g = ctx.createLinearGradient(a, 0, b, 0);
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(0.5, 'rgba(0,0,0,0.35)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(a, 0, b - a, 512);
    });

    // Edge lines + dashed centre line
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(14, 0, 10, 512);
    ctx.fillRect(488, 0, 10, 512);
    ctx.fillRect(250, 0, 12, 256);

    const roadTex = new THREE.CanvasTexture(canvas);
    roadTex.wrapS = THREE.ClampToEdgeWrapping;
    roadTex.wrapT = THREE.RepeatWrapping;
    roadTex.colorSpace = THREE.SRGBColorSpace;
    roadTex.anisotropy = 8;

    const roadMat = new THREE.MeshStandardMaterial({
      map: roadTex,
      roughness: 0.82,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    const half = this.roadWidth / 2;
    this.trackMesh = this.buildStrip(-half, half, 0.05, 0.05, 14, roadMat);
    this.trackMesh.receiveShadow = true;
  }

  buildKerbs() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#d21424';
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillStyle = '#f0f2f5';
    ctx.fillRect(0, 64, 64, 64);
    const kerbTex = new THREE.CanvasTexture(canvas);
    kerbTex.wrapS = THREE.ClampToEdgeWrapping;
    kerbTex.wrapT = THREE.RepeatWrapping;
    kerbTex.colorSpace = THREE.SRGBColorSpace;

    const kerbMat = new THREE.MeshStandardMaterial({
      map: kerbTex,
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });

    const half = this.roadWidth / 2;
    const k = this.kerbWidth;
    this.kerbMeshL = this.buildStrip(-half - k, -half, 0.055, 0.055, 6, kerbMat);
    this.kerbMeshR = this.buildStrip(half, half + k, 0.055, 0.055, 6, kerbMat);
    this.kerbMeshL.receiveShadow = true;
    this.kerbMeshR.receiveShadow = true;
  }

  buildCrashBarriers() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2f343f';
    ctx.fillRect(0, 0, 1024, 256);
    for (let x = 0; x < 1024; x += 32) {
      ctx.fillStyle = (x / 32) % 2 === 0 ? '#ffd700' : '#111111';
      ctx.fillRect(x, 0, 32, 36);
    }

    const sponsors = [
      { text: 'ASHI GRAND PRIX', bg: '#00f3ff', color: '#000000' },
      { text: this.def.name.toUpperCase(), bg: '#ff0055', color: '#ffffff' },
      { text: 'PIRELLI RACING', bg: '#ffd700', color: '#d21424' },
      { text: 'ASHI LANE 3D', bg: '#7928ca', color: '#00f3ff' }
    ];
    sponsors.forEach((sp, i) => {
      const segW = 256;
      const sx = i * segW;
      ctx.fillStyle = sp.bg;
      ctx.fillRect(sx + 8, 60, segW - 16, 150);
      ctx.fillStyle = sp.color;
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let size = 26;
      while (ctx.measureText(sp.text).width > segW - 28 && size > 12) {
        size -= 2;
        ctx.font = `bold ${size}px sans-serif`;
      }
      ctx.fillText(sp.text, sx + segW / 2, 135);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;

    const wallMat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.65,
      metalness: 0.25,
      side: THREE.DoubleSide
    });

    const half = this.trackWidth / 2;
    [-half, half].forEach((offset, sideIdx) => {
      const wall = this.buildStrip(offset, offset, 0, this.wallHeight, 8, wallMat, true);
      wall.castShadow = true;
      wall.receiveShadow = true;

      // Glowing top rail
      const railPts = [];
      for (let i = 0; i < this.sampleCount; i += 2) {
        const p = this.samplePos[i];
        const n = this.sampleNorm[i];
        railPts.push(new THREE.Vector3(p.x + n.x * offset, this.wallHeight, p.z + n.z * offset));
      }
      const railCurve = new THREE.CatmullRomCurve3(railPts, true);
      const railGeo = new THREE.TubeGeometry(railCurve, Math.min(1200, railPts.length), 0.08, 5, true);
      const railMat = new THREE.MeshBasicMaterial({ color: sideIdx === 0 ? (this.theme.railA ?? 0xff0055) : (this.theme.railB ?? 0x00f3ff) });
      this.group.add(new THREE.Mesh(railGeo, railMat));
    });
  }

  buildStartFinishLine() {
    const pt = this.samplePos[0];
    const tangent = this.sampleTan[0];
    const normal = this.sampleNorm[0];

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    for (let x = 0; x < 512; x += 32) {
      for (let y = 0; y < 128; y += 32) {
        ctx.fillStyle = (Math.floor(x / 32) + Math.floor(y / 32)) % 2 === 0 ? '#ffffff' : '#111111';
        ctx.fillRect(x, y, 32, 32);
      }
    }
    const checkerTex = new THREE.CanvasTexture(canvas);
    checkerTex.colorSpace = THREE.SRGBColorSpace;

    // Plane: X across the track, length along travel direction
    const finishGeo = new THREE.PlaneGeometry(this.roadWidth, 4);
    finishGeo.rotateX(-Math.PI / 2);
    const finishMesh = new THREE.Mesh(finishGeo, new THREE.MeshStandardMaterial({
      map: checkerTex,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    }));
    finishMesh.quaternion.setFromUnitVectors(Z_AXIS, tangent);
    finishMesh.position.set(pt.x, 0.07, pt.z);
    finishMesh.receiveShadow = true;
    this.group.add(finishMesh);

    // Painted grid boxes behind the line
    const boxMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });
    for (let g = 0; g < 8; g++) {
      const row = Math.floor(g / 2);
      const col = g % 2 === 0 ? -1 : 1;
      const lateral = col * this.trackWidth * 0.2;
      const back = 12 + row * 10;
      const pos = pt.clone().addScaledVector(tangent, -back).addScaledVector(normal, lateral);
      const bar = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.35).rotateX(-Math.PI / 2), boxMat);
      bar.quaternion.setFromUnitVectors(Z_AXIS, tangent);
      bar.position.set(pos.x, 0.07, pos.z).addScaledVector(tangent, 2.6);
      this.group.add(bar);
    }

    this.buildStartGantry(pt, tangent, normal);
  }

  buildStartGantry(pt, tangent, normal) {
    const gantry = new THREE.Group();
    const halfWidth = this.trackWidth / 2 + 1.2;
    const facing = tangent.clone().negate(); // face the grid (cars approach from behind)

    const steelMat = new THREE.MeshStandardMaterial({ color: 0x1f222a, metalness: 0.85, roughness: 0.3 });
    const housingMat = new THREE.MeshStandardMaterial({ color: 0x111114, metalness: 0.9, roughness: 0.2 });

    const colGeo = new THREE.CylinderGeometry(0.5, 0.6, 9.5, 12);
    const colL = new THREE.Mesh(colGeo, steelMat);
    colL.position.copy(pt).addScaledVector(normal, -halfWidth);
    colL.position.y = 4.75;
    const colR = new THREE.Mesh(colGeo, steelMat);
    colR.position.copy(pt).addScaledVector(normal, halfWidth);
    colR.position.y = 4.75;

    const beam = new THREE.Mesh(new THREE.BoxGeometry(this.trackWidth + 4, 1.6, 1.4), steelMat);
    beam.position.set(pt.x, 9.5, pt.z);
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), normal);

    // F1 style start lights (5 pods) - driven by setStartLights()
    const lightsGroup = new THREE.Group();
    const bulbGeo = new THREE.CircleGeometry(0.35, 16);
    for (let i = 0; i < 5; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0x220004 });
      this.startLightMats.push(mat);
      const pod = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.5), housingMat);
      pod.position.set((i - 2) * 1.8, 0, 0.8);
      const b1 = new THREE.Mesh(bulbGeo, mat);
      b1.position.set(0, 0.4, 0.26);
      const b2 = new THREE.Mesh(bulbGeo, mat);
      b2.position.set(0, -0.4, 0.26);
      pod.add(b1, b2);
      lightsGroup.add(pod);
    }
    lightsGroup.position.set(pt.x, 8.4, pt.z);
    lightsGroup.quaternion.setFromUnitVectors(Z_AXIS, facing);

    // Banner
    const bannerCanvas = document.createElement('canvas');
    bannerCanvas.width = 512;
    bannerCanvas.height = 128;
    const bctx = bannerCanvas.getContext('2d');
    bctx.fillStyle = '#0a0d18';
    bctx.fillRect(0, 0, 512, 128);
    bctx.strokeStyle = '#00f3ff';
    bctx.lineWidth = 6;
    bctx.strokeRect(6, 6, 500, 116);
    bctx.textAlign = 'center';
    let size = 36;
    bctx.font = `bold ${size}px sans-serif`;
    const title = this.def.name.toUpperCase();
    while (bctx.measureText(title).width > 470 && size > 16) {
      size -= 2;
      bctx.font = `bold ${size}px sans-serif`;
    }
    bctx.fillStyle = '#ff0055';
    bctx.fillText(title, 256, 56);
    bctx.font = 'bold 22px sans-serif';
    bctx.fillStyle = '#00f3ff';
    bctx.fillText('START / FINISH', 256, 96);

    const bannerTex = new THREE.CanvasTexture(bannerCanvas);
    bannerTex.colorSpace = THREE.SRGBColorSpace;
    const bannerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 2.2),
      new THREE.MeshBasicMaterial({ map: bannerTex })
    );
    bannerMesh.position.set(pt.x, 10.9, pt.z).addScaledVector(facing, 0.75);
    bannerMesh.quaternion.setFromUnitVectors(Z_AXIS, facing);

    gantry.add(colL, colR, beam, lightsGroup, bannerMesh);
    this.group.add(gantry);
  }

  /**
   * Start lights: `count` red pods lit (0..5). `green` turns all pods green (GO).
   */
  setStartLights(count, green = false) {
    this.startLightMats.forEach((m, i) => {
      if (green) m.color.setHex(0x00ff66);
      else m.color.setHex(i < count ? 0xff0022 : 0x220004);
    });
  }

  /** Finds the sharpest corners (local curvature peaks) - used for markers & AI. */
  findCorners(maxCount = 5, minCurv = 0.012) {
    const N = this.sampleCount;
    const window = Math.round(60 / this.sampleSpacing);
    const corners = [];
    for (let i = 0; i < N; i++) {
      const c = Math.abs(this.sampleCurv[i]);
      if (c < minCurv) continue;
      let isPeak = true;
      for (let k = -window; k <= window; k++) {
        if (k === 0) continue;
        if (Math.abs(this.sampleCurv[(i + k + N) % N]) > c) { isPeak = false; break; }
      }
      if (isPeak) corners.push({ index: i, curv: this.sampleCurv[i] });
    }
    corners.sort((a, b) => Math.abs(b.curv) - Math.abs(a.curv));
    return corners.slice(0, maxCount);
  }

  buildBrakeDistanceMarkers() {
    const corners = this.findCorners(5, 0.015);
    this.brakeZones = corners;
    const half = this.trackWidth / 2;
    const boardGeo = new THREE.BoxGeometry(1.6, 1.4, 0.2);
    const texCache = {};

    corners.forEach(corner => {
      // Corner turns towards sign(curv) side -> markers go on the outside
      const outsideSign = -Math.sign(corner.curv) || 1;
      [150, 100, 50].forEach(distM => {
        const i = this.wrapIndex(corner.index - distM / this.sampleSpacing - 25 / this.sampleSpacing);
        const p = this.samplePos[i];
        const tan = this.sampleTan[i];
        const n = this.sampleNorm[i];

        if (!texCache[distM]) {
          const c = document.createElement('canvas');
          c.width = 128;
          c.height = 128;
          const ctx = c.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 128, 128);
          ctx.fillStyle = '#000000';
          ctx.font = '900 64px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${distM}`, 64, 64);
          texCache[distM] = new THREE.CanvasTexture(c);
          texCache[distM].colorSpace = THREE.SRGBColorSpace;
        }

        const board = new THREE.Mesh(boardGeo, new THREE.MeshStandardMaterial({ map: texCache[distM] }));
        board.position.set(p.x + n.x * outsideSign * (half + 1.4), 1.2, p.z + n.z * outsideSign * (half + 1.4));
        board.quaternion.setFromUnitVectors(Z_AXIS, tan.clone().negate());
        this.group.add(board);
      });
    });
  }

  buildTireBarriers() {
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x141416, roughness: 0.9 });
    const tireGeo = new THREE.TorusGeometry(0.4, 0.16, 6, 12);
    tireGeo.rotateX(Math.PI / 2);
    const half = this.trackWidth / 2;

    this.brakeZones.forEach(corner => {
      const outsideSign = -Math.sign(corner.curv) || 1;
      for (let s = -3; s <= 3; s++) {
        const i = this.wrapIndex(corner.index + s * (4 / this.sampleSpacing));
        const p = this.samplePos[i];
        const n = this.sampleNorm[i];
        const base = new THREE.Vector3(p.x + n.x * outsideSign * (half + 1.0), 0, p.z + n.z * outsideSign * (half + 1.0));
        for (let row = 0; row < 3; row++) {
          const tire = new THREE.Mesh(tireGeo, tireMat);
          tire.position.set(base.x, 0.16 + row * 0.3, base.z);
          tire.castShadow = row === 2;
          this.group.add(tire);
        }
      }
    });
  }

  buildCheckpoints() {
    this.checkpoints = [];
    for (let i = 0; i < this.sectorCount; i++) {
      const t = i / this.sectorCount;
      const idx = this.indexFromT(t);
      this.checkpoints.push({
        index: i,
        t,
        position: this.samplePos[idx],
        tangent: this.sampleTan[idx],
        normal: this.sampleNorm[idx]
      });
    }
  }

  buildBoostPads() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,40,60,0.6)';
    ctx.fillRect(0, 0, 128, 256);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    for (let y = 40; y < 240; y += 70) {
      ctx.beginPath();
      ctx.moveTo(25, y + 30);
      ctx.lineTo(64, y);
      ctx.lineTo(103, y + 30);
      ctx.stroke();
    }
    const boostTex = new THREE.CanvasTexture(canvas);
    boostTex.colorSpace = THREE.SRGBColorSpace;
    boostTex.wrapS = THREE.ClampToEdgeWrapping;
    boostTex.wrapT = THREE.RepeatWrapping;

    const padMat = new THREE.MeshBasicMaterial({
      map: boostTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    this.boostPadMat = padMat;
    // Texture "up" (arrow tip) must point along +Z (travel direction)
    const padGeo = new THREE.PlaneGeometry(6, 12);
    padGeo.rotateX(Math.PI / 2);

    (this.def.boostPads || []).forEach((t, k) => {
      const i = this.indexFromT(t);
      const lateral = (k % 3 - 1) * (this.roadWidth * 0.22);
      const p = this.samplePos[i].clone().addScaledVector(this.sampleNorm[i], lateral);
      const mesh = new THREE.Mesh(padGeo, padMat);
      mesh.quaternion.setFromUnitVectors(Z_AXIS, this.sampleTan[i]);
      mesh.position.set(p.x, 0.09, p.z);
      this.group.add(mesh);
      this.boostPads.push({ mesh, position: new THREE.Vector3(p.x, 0.35, p.z), tangent: this.sampleTan[i], radius: 4.2 });
    });
  }

  update(delta) {
    if (this.boostPadMat && this.boostPadMat.map) {
      this.boostPadMat.map.offset.y = (this.boostPadMat.map.offset.y - delta * 1.2) % 1;
    }
  }

  dispose() {
    disposeObject3D(this.group);
    this.scene.remove(this.group);
  }
}

/** Disposes geometries, materials and (non-shared) textures of an object tree. */
export function disposeObject3D(root) {
  const geos = new Set();
  const mats = new Set();
  root.traverse(obj => {
    if (obj.geometry) geos.add(obj.geometry);
    if (obj.material) {
      (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach(m => mats.add(m));
    }
  });
  geos.forEach(g => g.dispose());
  mats.forEach(m => {
    ['map', 'emissiveMap', 'alphaMap'].forEach(key => {
      const tex = m[key];
      if (tex && !(tex.userData && tex.userData.shared)) tex.dispose();
    });
    m.dispose();
  });
}
