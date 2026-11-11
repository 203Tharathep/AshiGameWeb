import * as THREE from 'three';

export class CarModelBuilder {
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
    this.textureCache = new Map();
  }

  loadSkinTexture(fileName) {
    if (!fileName) return null;
    const url = `/assets/ashi/${fileName}`;
    if (this.textureCache.has(url)) {
      return this.textureCache.get(url);
    }
    const texture = this.textureLoader.load(url);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    this.textureCache.set(url, texture);
    return texture;
  }

  makeSideDecal(width, height, isLeft = false) {
    const geo = new THREE.PlaneGeometry(width, height);
    if (isLeft) {
      const uvs = geo.attributes.uv;
      for (let i = 0; i < uvs.count; i++) {
        uvs.setX(i, 1 - uvs.getX(i));
      }
      uvs.needsUpdate = true;
    }
    return geo;
  }

  // --- Parametric Aerodynamic Geometries for Sculpted Automotive Curves & Flush Liveries ---
  createCurvedHoodGeometry(widthRear = 1.48, widthFront = 1.28, length = 1.55, heightRear = 0.64, heightFront = 0.36) {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const uvs = [];
    const ind = [];
    const segX = 14;
    const segZ = 14;

    for (let j = 0; j <= segZ; j++) {
      const tz = j / segZ; // 0 = cowl (rear), 1 = nose (front)
      const z = 0.40 + tz * length;
      const w = widthRear - tz * (widthRear - widthFront);
      const baseY = heightRear - Math.pow(tz, 1.18) * (heightRear - heightFront);

      for (let i = 0; i <= segX; i++) {
        const tx = (i / segX) * 2 - 1; // -1 to +1
        const x = tx * (w * 0.5);

        // Muscular crest over front wheels + central aerodynamic extraction channel
        const fenderBulge = Math.exp(-Math.pow(Math.abs(tx) - 0.72, 2) * 12) * 0.038;
        const centerDip = -Math.exp(-Math.pow(tx, 2) * 9) * 0.026;
        const camber = -(tx * tx) * 0.028;
        const y = baseY + fenderBulge + centerDip + camber;

        pos.push(x, y, z);
        uvs.push((tx + 1) * 0.5, 1 - tz);
      }
    }

    for (let j = 0; j < segZ; j++) {
      for (let i = 0; i < segX; i++) {
        const a = j * (segX + 1) + i;
        const b = (j + 1) * (segX + 1) + i;
        const c = (j + 1) * (segX + 1) + (i + 1);
        const d = j * (segX + 1) + (i + 1);
        ind.push(a, b, d);
        ind.push(b, c, d);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(ind);
    geo.computeVertexNormals();
    return geo;
  }

  createCurvedDoorGeometry(isLeft = false, zStart = -0.48, zEnd = 0.68, yBottom = 0.24, yTop = 0.62) {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const uvs = [];
    const ind = [];
    const segZ = 12;
    const segY = 8;
    const sideSign = isLeft ? -1 : 1;
    const length = zEnd - zStart;
    const height = yTop - yBottom;

    for (let j = 0; j <= segZ; j++) {
      const tz = j / segZ; // 0 = rear, 1 = front
      const z = zStart + tz * length;

      // Coke-bottle athletic waistline: pinched inward at the center
      const waistIndent = Math.sin(tz * Math.PI) * 0.095;
      const baseWidth = (0.86 - tz * 0.02) - waistIndent;

      for (let i = 0; i <= segY; i++) {
        const ty = i / segY; // 0 = bottom, 1 = top
        const y = yBottom + ty * height;
        // Inward tumblehome angle towards top
        const x = sideSign * (baseWidth - ty * 0.035);

        pos.push(x, y, z);

        // UVs: map texture so character faces forward on both flanks
        const u = isLeft ? tz : (1 - tz);
        const v = ty;
        uvs.push(u, v);
      }
    }

    for (let j = 0; j < segZ; j++) {
      for (let i = 0; i < segY; i++) {
        const a = j * (segY + 1) + i;
        const b = (j + 1) * (segY + 1) + i;
        const c = (j + 1) * (segY + 1) + (i + 1);
        const d = j * (segY + 1) + (i + 1);

        if (isLeft) {
          ind.push(a, d, b);
          ind.push(b, d, c);
        } else {
          ind.push(a, b, d);
          ind.push(b, c, d);
        }
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(ind);
    geo.computeVertexNormals();
    return geo;
  }

  createCurvedWindshieldGeometry() {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const uvs = [];
    const ind = [];
    const segX = 10;
    const segZ = 8;

    for (let j = 0; j <= segZ; j++) {
      const tz = j / segZ; // 0 = cowl (bottom), 1 = roof header (top)
      const z = 0.40 - tz * 0.46; // sweeps back from 0.40 to -0.06
      const w = 1.32 - tz * 0.16; // width tapers from 1.32 to 1.16
      const y = 0.63 + Math.sin(tz * (Math.PI / 2)) * 0.25; // curves up to 0.88

      for (let i = 0; i <= segX; i++) {
        const tx = (i / segX) * 2 - 1; // -1 to +1
        const x = tx * (w * 0.5);
        // Horizontal aerodynamic curve (curved panoramic windshield)
        const curveBack = (1 - tx * tx) * 0.045;
        pos.push(x, y, z + curveBack);
        uvs.push((tx + 1) * 0.5, tz);
      }
    }

    for (let j = 0; j < segZ; j++) {
      for (let i = 0; i < segX; i++) {
        const a = j * (segX + 1) + i;
        const b = (j + 1) * (segX + 1) + i;
        const c = (j + 1) * (segX + 1) + (i + 1);
        const d = j * (segX + 1) + (i + 1);
        ind.push(a, b, d);
        ind.push(b, c, d);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(ind);
    geo.computeVertexNormals();
    return geo;
  }

  createCurvedFastbackGeometry() {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    const uvs = [];
    const ind = [];
    const segX = 10;
    const segZ = 10;

    for (let j = 0; j <= segZ; j++) {
      const tz = j / segZ; // 0 = roof (top), 1 = rear deck (bottom)
      const z = -0.38 - tz * 0.95; // slopes back from -0.38 to -1.33
      const w = 1.16 - tz * 0.12;
      const y = 0.88 - Math.pow(tz, 1.2) * 0.30; // slopes down from 0.88 to 0.58

      for (let i = 0; i <= segX; i++) {
        const tx = (i / segX) * 2 - 1;
        const x = tx * (w * 0.5);
        const camber = -(tx * tx) * 0.025;
        pos.push(x, y + camber, z);
        uvs.push((tx + 1) * 0.5, 1 - tz);
      }
    }

    for (let j = 0; j < segZ; j++) {
      for (let i = 0; i < segX; i++) {
        const a = j * (segX + 1) + i;
        const b = (j + 1) * (segX + 1) + i;
        const c = (j + 1) * (segX + 1) + (i + 1);
        const d = j * (segX + 1) + (i + 1);
        ind.push(a, b, d);
        ind.push(b, c, d);
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(ind);
    geo.computeVertexNormals();
    return geo;
  }

  // --- Seamless Continuous Unibody Vehicle Shell Generator ---
  createUnibodyCarGeometry({
    length = 4.1,
    noseZ = 2.05,
    tailZ = -2.05,
    maxFrontWidth = 1.80,
    waistWidth = 1.56,
    maxRearWidth = 1.86,
    frontWheelZ = 1.25,
    rearWheelZ = -1.20,
    hoodCowlZ = 0.45,
    roofPeakZ = -0.15,
    fastbackZ = -1.15,
    noseHeight = 0.32,
    cowlHeight = 0.64,
    roofHeight = 0.88,
    tailHeight = 0.54,
    sillHeight = 0.18,
    segZ = 32,
    segRing = 16
  } = {}) {
    const geo = new THREE.BufferGeometry();
    const positions = [];
    const uvs = [];
    const indices = [];

    function getSlice(tz) {
      const z = noseZ - tz * length;
      let w;
      if (z > frontWheelZ) {
        const f = (z - frontWheelZ) / (noseZ - frontWheelZ);
        w = maxFrontWidth - f * 0.40;
      } else if (z > 0) {
        const f = z / frontWheelZ;
        w = waistWidth + f * (maxFrontWidth - waistWidth);
      } else if (z > rearWheelZ) {
        const f = -z / -rearWheelZ;
        w = waistWidth + f * (maxRearWidth - waistWidth);
      } else {
        const f = (rearWheelZ - z) / (rearWheelZ - tailZ);
        w = maxRearWidth - f * 0.22;
      }

      let yCenter;
      if (z > hoodCowlZ) {
        const f = (z - hoodCowlZ) / (noseZ - hoodCowlZ);
        yCenter = cowlHeight - Math.pow(f, 1.2) * (cowlHeight - noseHeight);
      } else if (z > roofPeakZ) {
        const f = (z - roofPeakZ) / (hoodCowlZ - roofPeakZ);
        yCenter = roofHeight - f * (roofHeight - cowlHeight);
      } else if (z > fastbackZ) {
        const f = (roofPeakZ - z) / (roofPeakZ - fastbackZ);
        yCenter = roofHeight - Math.pow(f, 1.1) * (roofHeight - 0.60);
      } else {
        const f = (fastbackZ - z) / (fastbackZ - tailZ);
        yCenter = 0.60 - f * (0.60 - tailHeight);
      }

      return { z, halfW: w * 0.5, yCenter, ySill: sillHeight };
    }

    for (let j = 0; j <= segZ; j++) {
      const tz = j / segZ;
      const slice = getSlice(tz);

      for (let i = 0; i <= segRing; i++) {
        const theta = (i / segRing) * Math.PI;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        const x = cosT * slice.halfW;
        const y = slice.ySill + Math.pow(sinT, 0.72) * (slice.yCenter - slice.ySill);

        positions.push(x, y, slice.z);

        // Continuous Full-Vehicle UV Coordinates
        const u = i / segRing;
        const v = 1.0 - tz;
        uvs.push(u, v);
      }
    }

    for (let j = 0; j < segZ; j++) {
      for (let i = 0; i < segRing; i++) {
        const a = j * (segRing + 1) + i;
        const b = (j + 1) * (segRing + 1) + i;
        const c = (j + 1) * (segRing + 1) + (i + 1);
        const d = j * (segRing + 1) + (i + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    // Solid Underbody Belly Pan: Seal the bottom of the car between sills
    for (let j = 0; j < segZ; j++) {
      const a = j * (segRing + 1) + 0; // right sill at j
      const b = (j + 1) * (segRing + 1) + 0; // right sill at j+1
      const c = (j + 1) * (segRing + 1) + segRing; // left sill at j+1
      const d = j * (segRing + 1) + segRing; // left sill at j
      indices.push(a, d, b);
      indices.push(b, d, c);
    }

    // Solid Front Nose Cap (z = noseZ): Seal front end completely
    const frontSlice = getSlice(0);
    const frontCenterIdx = positions.length / 3;
    positions.push(0, (frontSlice.yCenter + frontSlice.ySill) * 0.5, frontSlice.z);
    uvs.push(0.5, 1.0);
    for (let i = 0; i < segRing; i++) {
      const v1 = 0 * (segRing + 1) + i;
      const v2 = 0 * (segRing + 1) + (i + 1);
      indices.push(frontCenterIdx, v1, v2);
    }

    // Solid Rear Tail Cap (z = tailZ): Seal rear end completely
    const rearSlice = getSlice(1.0);
    const rearCenterIdx = positions.length / 3;
    positions.push(0, (rearSlice.yCenter + rearSlice.ySill) * 0.5, rearSlice.z);
    uvs.push(0.5, 0.0);
    for (let i = 0; i < segRing; i++) {
      const v1 = segZ * (segRing + 1) + i;
      const v2 = segZ * (segRing + 1) + (i + 1);
      indices.push(rearCenterIdx, v2, v1);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  makeFramedLivery() {
    // With full-body unibody skin wrap, the vehicle shell itself is completely wrapped.
    // Return empty group to eliminate disjointed floating decal boxes.
    return new THREE.Group();
  }

  createCar(carType = 'gt', skinFileName = null, bodyColor = '#ff2255', isRival = false, addons = null) {
    if (typeof isRival === 'object' && isRival !== null && addons === null) {
      addons = isRival;
      isRival = false;
    }

    const root = new THREE.Group();
    root.name = 'CarRoot';

    const skinTexture = skinFileName ? this.loadSkinTexture(skinFileName) : null;
    const parsedColor = new THREE.Color(bodyColor);

    // --- Premium Automotive Shader Materials ---
    // Full-Body Livery Wrap Material:
    // When a skin is selected, bodyMat wraps the ENTIRE car with the skin texture in 100% full vibrant color!
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: skinTexture ? 0xffffff : parsedColor,
      map: skinTexture,
      metalness: skinTexture ? 0.28 : 0.58,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 0.96
    });

    const decalMat = bodyMat;

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x141418,
      roughness: 0.4,
      metalness: 0.5
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x111114,
      roughness: 0.7,
      metalness: 0.2
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x101c28,
      metalness: 0.2,
      roughness: 0.06,
      transmission: 0.82,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.95
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf8f9fa,
      metalness: 0.98,
      roughness: 0.08
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.92,
      roughness: 0.18
    });

    // Lights
    const lightGlowMat = new THREE.MeshBasicMaterial({ color: 0xddf8ff });
    const drlMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const brakeLightMat = new THREE.MeshBasicMaterial({ color: 0xff002e });
    const amberLightMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });

    // Wheels & Brakes
    const wheelTireMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.92,
      metalness: 0.1
    });

    const wheelRimMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.94,
      roughness: 0.14
    });

    const brakeDiscMat = new THREE.MeshStandardMaterial({
      color: 0xb0b8c4,
      metalness: 0.95,
      roughness: 0.25
    });

    const caliperMat = new THREE.MeshStandardMaterial({
      color: 0xff1030,
      metalness: 0.75,
      roughness: 0.2
    });

    // Sub-groups for animation
    const chassis = new THREE.Group();
    chassis.name = 'Chassis';
    root.add(chassis);

    const wheels = {
      frontLeft: null,
      frontRight: null,
      rearLeft: null,
      rearRight: null
    };

    const frontWheelSteerGroupL = new THREE.Group();
    const frontWheelSteerGroupR = new THREE.Group();
    chassis.add(frontWheelSteerGroupL);
    chassis.add(frontWheelSteerGroupR);

    // Custom Underglow Color Support
    let underglowColorHex = bodyColor;
    if (addons?.underglow) {
      if (addons.underglow === 'none') {
        underglowColorHex = null;
      } else if (addons.underglow !== 'body_match') {
        underglowColorHex = addons.underglow;
      }
    }

    let underglowMesh = null;
    let underglowMat = null;
    if (underglowColorHex) {
      const underglowParsed = new THREE.Color(underglowColorHex);
      const underglowGeo = new THREE.PlaneGeometry(1.8, 3.6);
      underglowMat = new THREE.MeshBasicMaterial({
        color: underglowParsed,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      if (typeof document !== 'undefined') {
        const underglowCanvas = document.createElement('canvas');
        underglowCanvas.width = 128;
        underglowCanvas.height = 256;
        const ctx = underglowCanvas.getContext('2d');
        if (ctx) {
          const grad = ctx.createRadialGradient(64, 128, 8, 64, 128, 64);
          grad.addColorStop(0, underglowColorHex);
          grad.addColorStop(0.55, underglowColorHex + 'aa');
          grad.addColorStop(1, '#00000000');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 128, 256);
          const underglowTex = new THREE.CanvasTexture(underglowCanvas);
          underglowMat = new THREE.MeshBasicMaterial({
            map: underglowTex,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          });
        }
      }

      underglowMesh = new THREE.Mesh(underglowGeo, underglowMat);
      underglowMesh.rotation.x = -Math.PI / 2;
      underglowMesh.position.y = 0.08;
      root.add(underglowMesh);
    }

    const rimStyle = addons?.wheels || 'stock';
    const makeW = (r, w, p, x, y, z) => this.createWheel(wheelTireMat, wheelRimMat, r, w, p, x, y, z, brakeDiscMat, caliperMat, rimStyle);

    // Dispatch to specific car body builder
    if (carType === 'kart') {
      this.buildKartBody(chassis, bodyMat, decalMat, trimMat, carbonMat, chromeMat, goldMat, lightGlowMat, brakeLightMat);
      wheels.frontLeft = makeW(0.24, 0.22, frontWheelSteerGroupL, -0.72, 0.24, 0.92);
      wheels.frontRight = makeW(0.24, 0.22, frontWheelSteerGroupR, 0.72, 0.24, 0.92);
      wheels.rearLeft = makeW(0.32, 0.30, chassis, -0.78, 0.32, -0.85);
      wheels.rearRight = makeW(0.32, 0.30, chassis, 0.78, 0.32, -0.85);
    } else if (carType === 'truck') {
      this.buildTruckBody(chassis, bodyMat, decalMat, trimMat, carbonMat, glassMat, chromeMat, lightGlowMat, drlMat, brakeLightMat, amberLightMat);
      wheels.frontLeft = makeW(0.46, 0.34, frontWheelSteerGroupL, -0.96, 0.46, 1.35);
      wheels.frontRight = makeW(0.46, 0.34, frontWheelSteerGroupR, 0.96, 0.46, 1.35);
      wheels.rearLeft = makeW(0.46, 0.34, chassis, -0.96, 0.46, -1.35);
      wheels.rearRight = makeW(0.46, 0.34, chassis, 0.96, 0.46, -1.35);
    } else if (carType === 'f1') {
      this.buildF1Body(chassis, bodyMat, decalMat, trimMat, carbonMat, chromeMat, lightGlowMat, brakeLightMat);
      wheels.frontLeft = makeW(0.33, 0.28, frontWheelSteerGroupL, -0.92, 0.33, 1.48);
      wheels.frontRight = makeW(0.33, 0.28, frontWheelSteerGroupR, 0.92, 0.33, 1.48);
      wheels.rearLeft = makeW(0.39, 0.38, chassis, -0.96, 0.39, -1.32);
      wheels.rearRight = makeW(0.39, 0.38, chassis, 0.96, 0.39, -1.32);
    } else if (carType === 'muscle') {
      this.buildMuscleBody(chassis, bodyMat, decalMat, trimMat, carbonMat, chromeMat, glassMat, lightGlowMat, brakeLightMat);
      wheels.frontLeft = makeW(0.36, 0.28, frontWheelSteerGroupL, -0.86, 0.36, 1.25);
      wheels.frontRight = makeW(0.36, 0.28, frontWheelSteerGroupR, 0.86, 0.36, 1.25);
      wheels.rearLeft = makeW(0.41, 0.35, chassis, -0.88, 0.41, -1.18);
      wheels.rearRight = makeW(0.41, 0.35, chassis, 0.88, 0.41, -1.18);
    } else if (carType === 'hyper') {
      this.buildHyperBody(chassis, bodyMat, decalMat, trimMat, carbonMat, glassMat, chromeMat, lightGlowMat, drlMat, brakeLightMat);
      wheels.frontLeft = makeW(0.35, 0.28, frontWheelSteerGroupL, -0.86, 0.35, 1.30);
      wheels.frontRight = makeW(0.35, 0.28, frontWheelSteerGroupR, 0.86, 0.35, 1.30);
      wheels.rearLeft = makeW(0.40, 0.36, chassis, -0.90, 0.40, -1.25);
      wheels.rearRight = makeW(0.40, 0.36, chassis, 0.90, 0.40, -1.25);
    } else if (carType === 'rally') {
      this.buildRallyBody(chassis, bodyMat, decalMat, trimMat, carbonMat, glassMat, lightGlowMat, amberLightMat, brakeLightMat);
      wheels.frontLeft = makeW(0.35, 0.28, frontWheelSteerGroupL, -0.86, 0.35, 1.15);
      wheels.frontRight = makeW(0.35, 0.28, frontWheelSteerGroupR, 0.86, 0.35, 1.15);
      wheels.rearLeft = makeW(0.35, 0.28, chassis, -0.86, 0.35, -1.15);
      wheels.rearRight = makeW(0.35, 0.28, chassis, 0.86, 0.35, -1.15);
    } else if (carType === 'speedster') {
      this.buildSpeedsterBody(chassis, bodyMat, decalMat, trimMat, carbonMat, chromeMat, glassMat, lightGlowMat, brakeLightMat);
      wheels.frontLeft = makeW(0.34, 0.24, frontWheelSteerGroupL, -0.80, 0.34, 1.20);
      wheels.frontRight = makeW(0.34, 0.24, frontWheelSteerGroupR, 0.80, 0.34, 1.20);
      wheels.rearLeft = makeW(0.36, 0.26, chassis, -0.82, 0.36, -1.15);
      wheels.rearRight = makeW(0.36, 0.26, chassis, 0.82, 0.36, -1.15);
    } else {
      // Default: GT Supercar
      this.buildGTBody(chassis, bodyMat, decalMat, trimMat, carbonMat, glassMat, chromeMat, lightGlowMat, drlMat, brakeLightMat);
      wheels.frontLeft = makeW(0.35, 0.26, frontWheelSteerGroupL, -0.84, 0.35, 1.22);
      wheels.frontRight = makeW(0.35, 0.26, frontWheelSteerGroupR, 0.84, 0.35, 1.22);
      wheels.rearLeft = makeW(0.38, 0.30, chassis, -0.86, 0.38, -1.18);
      wheels.rearRight = makeW(0.38, 0.30, chassis, 0.86, 0.38, -1.18);
    }

    // High-performance Exhaust Pipes (with custom addon support)
    const exhaustStyle = addons?.exhaust || 'stock';
    const exhaustPipes = this.createExhaustPipes(chassis, carType, chromeMat, exhaustStyle);

    // Apply User Custom Addons (Spoiler, Roof/Hood)
    if (addons) {
      if (addons.spoiler && addons.spoiler !== 'stock') {
        this.applySpoilerAddon(chassis, carType, addons.spoiler, bodyMat, carbonMat, chromeMat, decalMat);
      }
      const roofItem = addons.roof_hood || addons.roofHood;
      if (roofItem && roofItem !== 'none') {
        this.applyRoofHoodAddon(chassis, carType, roofItem, bodyMat, carbonMat, chromeMat);
      }
    }

    // Dual Projector Driving Spotlights
    const headLightL = new THREE.SpotLight(0xfff6e5, 2.2, 38, Math.PI / 4.8, 0.35);
    headLightL.position.set(-0.6, 0.52, 2.0);
    headLightL.target.position.set(-0.6, 0, 16);
    chassis.add(headLightL);
    chassis.add(headLightL.target);

    const headLightR = new THREE.SpotLight(0xfff6e5, 2.2, 38, Math.PI / 4.8, 0.35);
    headLightR.position.set(0.6, 0.52, 2.0);
    headLightR.target.position.set(0.6, 0, 16);
    chassis.add(headLightR);
    chassis.add(headLightR.target);

    return {
      root,
      chassis,
      wheels,
      steerGroups: [frontWheelSteerGroupL, frontWheelSteerGroupR],
      exhaustPipes,
      brakeLightMat,
      underglowMat,
      bodyMat,
      decalMat
    };
  }

  // --- High-Detail 3D Alloy Wheel with Ventilated Rotor & Red Caliper ---
  createWheel(tireMat, rimMat, radius, width, parent, posX, posY, posZ, discMat, caliperMat, rimStyle = 'stock') {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(posX, posY, posZ);

    // 1. Rubber Tire with Chamfer Profile
    const tireGeo = new THREE.CylinderGeometry(radius, radius, width * 0.92, 28);
    tireGeo.rotateZ(Math.PI / 2);
    const tireMesh = new THREE.Mesh(tireGeo, tireMat);
    tireMesh.castShadow = true;
    wheelGroup.add(tireMesh);

    // Rounded Outer Sidewall Torus
    const sidewallGeo = new THREE.TorusGeometry(radius * 0.94, width * 0.12, 10, 24);
    sidewallGeo.rotateY(Math.PI / 2);
    const sidewall = new THREE.Mesh(sidewallGeo, tireMat);
    wheelGroup.add(sidewall);

    // Dynamic Rim Material based on selected Addon Style
    let effectiveRimMat = rimMat;
    if (rimStyle === 'gold_mesh') {
      effectiveRimMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.92, roughness: 0.22 });
    } else if (rimStyle === 'deep_dish') {
      effectiveRimMat = new THREE.MeshStandardMaterial({ color: 0xf4f7fb, metalness: 0.98, roughness: 0.06 });
    }

    const rimRadius = radius * 0.68;

    if (rimStyle === 'turbofan') {
      // Aerodynamic closed turbofan disc
      const turboGeo = new THREE.CylinderGeometry(rimRadius, rimRadius, width * 0.98, 28);
      turboGeo.rotateZ(Math.PI / 2);
      const turboMesh = new THREE.Mesh(turboGeo, new THREE.MeshStandardMaterial({ color: 0x161822, metalness: 0.82, roughness: 0.3 }));
      wheelGroup.add(turboMesh);

      // Radial turbine extractor vanes
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        const vane = new THREE.Mesh(new THREE.BoxGeometry(width * 1.02, rimRadius * 0.45, 0.02), effectiveRimMat);
        vane.position.set(0, Math.sin(ang) * rimRadius * 0.55, Math.cos(ang) * rimRadius * 0.55);
        vane.rotation.x = ang + 0.35;
        wheelGroup.add(vane);
      }
      // Center lock bullet cap
      const bullet = new THREE.Mesh(new THREE.ConeGeometry(rimRadius * 0.25, width * 0.4, 16), effectiveRimMat);
      bullet.rotateZ(posX > 0 ? -Math.PI / 2 : Math.PI / 2);
      bullet.position.x = (posX > 0) ? width * 0.45 : -width * 0.45;
      wheelGroup.add(bullet);

    } else if (rimStyle === 'gold_mesh') {
      // Outer stepped rim barrel
      const rimGeo = new THREE.CylinderGeometry(rimRadius, rimRadius * 0.88, width * 0.96, 24);
      rimGeo.rotateZ(Math.PI / 2);
      wheelGroup.add(new THREE.Mesh(rimGeo, effectiveRimMat));

      // Cross-laced mesh spokes (10 pairs)
      for (let i = 0; i < 10; i++) {
        const ang = (i / 10) * Math.PI * 2;
        const s1 = new THREE.Mesh(new THREE.BoxGeometry(width * 0.98, rimRadius * 0.88, 0.022), effectiveRimMat);
        s1.rotation.x = ang + 0.18;
        const s2 = new THREE.Mesh(new THREE.BoxGeometry(width * 0.98, rimRadius * 0.88, 0.022), effectiveRimMat);
        s2.rotation.x = ang - 0.18;
        wheelGroup.add(s1, s2);
      }

      // Red anodized center-lock nut
      const nut = new THREE.Mesh(new THREE.CylinderGeometry(rimRadius * 0.22, rimRadius * 0.22, width * 1.04, 12), new THREE.MeshStandardMaterial({ color: 0xff0033, metalness: 0.9, roughness: 0.2 }));
      nut.rotateZ(Math.PI / 2);
      wheelGroup.add(nut);

    } else if (rimStyle === 'deep_dish') {
      // Stepped polished deep dish barrel
      const lipRadius = rimRadius * 1.02;
      const rimGeo = new THREE.CylinderGeometry(lipRadius, rimRadius * 0.72, width * 0.98, 24);
      rimGeo.rotateZ(Math.PI / 2);
      wheelGroup.add(new THREE.Mesh(rimGeo, effectiveRimMat));

      // 6-spoke concave dish star
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2;
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(width * 0.92, rimRadius * 0.82, 0.038), effectiveRimMat);
        spoke.rotation.x = ang;
        wheelGroup.add(spoke);
      }

      // Deep recessed center cap
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(rimRadius * 0.26, rimRadius * 0.26, width * 0.98, 16), effectiveRimMat);
      cap.rotateZ(Math.PI / 2);
      wheelGroup.add(cap);

    } else {
      // Default: sport_5spoke
      const rimGeo = new THREE.CylinderGeometry(rimRadius, rimRadius * 0.92, width * 0.96, 20);
      rimGeo.rotateZ(Math.PI / 2);
      wheelGroup.add(new THREE.Mesh(rimGeo, effectiveRimMat));

      // 5-Spoke Star Blades
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(width * 0.98, rimRadius * 0.92, 0.038), effectiveRimMat);
        spoke.rotation.x = angle;
        wheelGroup.add(spoke);
      }

      // Center Hub Nut
      const centerCap = new THREE.Mesh(new THREE.CylinderGeometry(rimRadius * 0.28, rimRadius * 0.28, width * 1.02, 16), effectiveRimMat);
      centerCap.rotateZ(Math.PI / 2);
      wheelGroup.add(centerCap);
    }

    // Ventilated Brake Disc Rotor
    if (discMat) {
      const discGeo = new THREE.CylinderGeometry(radius * 0.54, radius * 0.54, 0.02, 18);
      discGeo.rotateZ(Math.PI / 2);
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.position.x = (posX > 0) ? -width * 0.22 : width * 0.22;
      wheelGroup.add(disc);

      // Sport Red Brake Caliper
      if (caliperMat) {
        const caliperGeo = new THREE.BoxGeometry(0.048, radius * 0.32, radius * 0.24);
        const caliper = new THREE.Mesh(caliperGeo, caliperMat);
        caliper.position.set((posX > 0) ? -width * 0.22 : width * 0.22, radius * 0.34, 0);
        wheelGroup.add(caliper);
      }
    }

    // Heavy Mechanical Axle Spindle connecting Wheel to Chassis (Never floating!)
    const axleMat = new THREE.MeshStandardMaterial({ color: 0x18181e, metalness: 0.85, roughness: 0.4 });
    const axleLen = 0.40;
    const axleGeo = new THREE.CylinderGeometry(radius * 0.22, radius * 0.22, axleLen, 12);
    axleGeo.rotateZ(Math.PI / 2);
    const axle = new THREE.Mesh(axleGeo, axleMat);
    axle.position.x = (posX > 0) ? -width * 0.42 - axleLen * 0.5 : width * 0.42 + axleLen * 0.5;
    wheelGroup.add(axle);

    parent.add(wheelGroup);
    return wheelGroup;
  }

  // --- Player/Driver Avatar (Disabled: Cars are driverless/clean cockpit) ---
  addDriverBobblehead(chassis, skinTexture, carType) {
    return null;
  }

  // --- Exhaust Pipes per Vehicle Archetype with Addon Customization ---
  createExhaustPipes(chassis, carType, chromeMat, exhaustStyle = 'stock') {
    const pipes = [];
    let pipeMat = chromeMat || new THREE.MeshStandardMaterial({ color: 0xddeeff, metalness: 0.95, roughness: 0.1 });

    if (exhaustStyle === 'burnt_titanium') {
      pipeMat = new THREE.MeshPhysicalMaterial({
        color: 0x3d66eb,
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08
      });
    } else if (exhaustStyle === 'quad_carbon') {
      pipeMat = new THREE.MeshStandardMaterial({
        color: 0x16161a,
        metalness: 0.5,
        roughness: 0.4
      });
    }

    const createSinglePipe = (x, y, z, r = 0.07, len = 0.28) => {
      const geo = new THREE.CylinderGeometry(r * 0.85, r, len, 16);
      geo.rotateX(Math.PI / 2);
      const mesh = new THREE.Mesh(geo, pipeMat);
      mesh.position.set(x, y, z);

      // Inner hollow black depth
      const innerGeo = new THREE.CylinderGeometry(r * 0.7, r * 0.7, 0.05, 12);
      innerGeo.rotateX(Math.PI / 2);
      const innerMesh = new THREE.Mesh(innerGeo, new THREE.MeshBasicMaterial({ color: 0x050505 }));
      innerMesh.position.set(0, 0, len * 0.48);
      mesh.add(innerMesh);

      chassis.add(mesh);
      pipes.push(mesh);
      return mesh;
    };

    const archetypeTails = {
      kart: { z: -1.12, y: 0.22, r: 0.05, len: 0.20 },
      f1: { z: -2.12, y: 0.32, r: 0.07, len: 0.25 },
      truck: { z: -2.22, y: 0.36, r: 0.09, len: 0.28 },
      speedster: { z: -1.94, y: 0.32, r: 0.06, len: 0.26 },
      rally: { z: -1.95, y: 0.28, r: 0.07, len: 0.26 },
      muscle: { z: -2.08, y: 0.30, r: 0.08, len: 0.28 },
      hyper: { z: -2.05, y: 0.36, r: 0.06, len: 0.26 },
      gt: { z: -1.94, y: 0.28, r: 0.07, len: 0.26 }
    };
    const def = archetypeTails[carType] || archetypeTails.gt;

    if (exhaustStyle === 'side_pipes') {
      if (carType === 'kart') {
        createSinglePipe(-0.52, 0.16, 0.1, 0.045, 0.6);
        createSinglePipe(0.52, 0.16, 0.1, 0.045, 0.6);
      } else {
        createSinglePipe(-0.84, 0.22, 0.3, 0.065, 1.4);
        createSinglePipe(0.84, 0.22, 0.3, 0.065, 1.4);
      }
      return pipes;
    } else if (exhaustStyle === 'quad_carbon') {
      const scale = (carType === 'kart' ? 0.6 : 1);
      createSinglePipe(-0.46 * scale, def.y, def.z, def.r, def.len);
      createSinglePipe(-0.30 * scale, def.y, def.z, def.r, def.len);
      createSinglePipe(0.30 * scale, def.y, def.z, def.r, def.len);
      createSinglePipe(0.46 * scale, def.y, def.z, def.r, def.len);
      return pipes;
    } else if (exhaustStyle === 'burnt_titanium') {
      const scale = (carType === 'kart' ? 0.6 : 1);
      createSinglePipe(-0.36 * scale, def.y, def.z, def.r * 1.2, def.len);
      createSinglePipe(0.36 * scale, def.y, def.z, def.r * 1.2, def.len);
      return pipes;
    }

    // Default per vehicle type ('stock')
    if (carType === 'hyper') {
      // Quad center exhaust diamond cluster
      createSinglePipe(-0.09, def.y + 0.12, def.z, 0.05, def.len);
      createSinglePipe(0.09, def.y + 0.12, def.z, 0.05, def.len);
      createSinglePipe(0, def.y + 0.22, def.z, 0.055, def.len);
      createSinglePipe(0, def.y + 0.02, def.z, 0.055, def.len);
    } else if (carType === 'gt') {
      // Quad twin tips (left pair, right pair)
      createSinglePipe(-0.46, def.y, def.z, 0.065, def.len);
      createSinglePipe(-0.32, def.y, def.z, 0.065, def.len);
      createSinglePipe(0.32, def.y, def.z, 0.065, def.len);
      createSinglePipe(0.46, def.y, def.z, 0.065, def.len);
    } else if (carType === 'f1') {
      // Center high-mount jet exhaust
      createSinglePipe(0, def.y + 0.10, def.z, 0.095, def.len);
    } else if (carType === 'speedster') {
      // Chrome side rocker pipes
      createSinglePipe(-0.84, 0.22, 0.3, 0.06, 1.4);
      createSinglePipe(0.84, 0.22, 0.3, 0.06, 1.4);
    } else if (carType === 'rally') {
      // Single fat angled rally exhaust on right
      createSinglePipe(0.48, def.y, def.z, 0.085, def.len);
    } else if (carType === 'truck') {
      // Heavy dual square-exit pipes
      createSinglePipe(-0.52, def.y, def.z, 0.09, def.len);
      createSinglePipe(0.52, def.y, def.z, 0.09, def.len);
    } else if (carType === 'kart') {
      // Attached directly to kart rear engine block
      createSinglePipe(0.24, def.y, def.z, 0.045, def.len);
    } else {
      // Muscle / default dual pipes
      createSinglePipe(-0.38, def.y, def.z, 0.075, def.len);
      createSinglePipe(0.38, def.y, def.z, 0.075, def.len);
    }

    return pipes;
  }

  // --- Modular Custom Addon Spoilers / Wings ---
  applySpoilerAddon(chassis, carType, spoilerType, bodyMat, carbonMat, chromeMat, decalMat = null) {
    const existing = chassis.getObjectByName('CarSpoiler');
    if (existing) {
      chassis.remove(existing);
    }
    if (!spoilerType || spoilerType === 'none') return;

    const spoilerGroup = new THREE.Group();
    spoilerGroup.name = 'CarSpoiler';

    let tailY = 0.52;
    let tailZ = -1.82;
    if (carType === 'truck') { tailY = 0.82; tailZ = -2.15; }
    else if (carType === 'f1') { tailY = 0.36; tailZ = -1.85; }
    else if (carType === 'kart') { tailY = 0.26; tailZ = -1.05; }
    else if (carType === 'speedster') { tailY = 0.48; tailZ = -1.80; }
    else if (carType === 'muscle') { tailY = 0.58; tailZ = -1.95; }
    else if (carType === 'hyper') { tailY = 0.48; tailZ = -1.95; }
    else if (carType === 'rally') { tailY = 0.64; tailZ = -1.80; }

    if (spoilerType === 'gt_wing') {
      // Swan-neck carbon GT Wing (Pylons penetrate into deck so there is zero gap!)
      const pL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.20), carbonMat);
      pL.position.set(-0.52, tailY + 0.18, tailZ);
      const pR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.20), carbonMat);
      pR.position.set(0.52, tailY + 0.18, tailZ);

      const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.05, 0.42), bodyMat);
      wingBlade.position.set(0, tailY + 0.38, tailZ - 0.04);
      wingBlade.rotation.x = 0.10;

      if (decalMat) {
        const wingDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.72, 0.36), decalMat);
        wingDecal.rotation.x = -Math.PI / 2 + 0.10;
        wingDecal.position.set(0, tailY + 0.41, tailZ - 0.04);
        spoilerGroup.add(wingDecal);
      }

      const endL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.24, 0.46), bodyMat);
      endL.position.set(-0.91, tailY + 0.38, tailZ - 0.04);
      const endR = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.24, 0.46), bodyMat);
      endR.position.set(0.91, tailY + 0.38, tailZ - 0.04);

      spoilerGroup.add(pL, pR, wingBlade, endL, endR);
    } else if (spoilerType === 'ducktail') {
      // Body-colored street ducktail mounted firmly to rear deck
      const dtMesh = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.14, 0.18), bodyMat);
      dtMesh.position.set(0, tailY + 0.04, tailZ + 0.04);
      dtMesh.rotation.x = -0.34;

      if (decalMat) {
        const dtDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 0.12), decalMat);
        dtDecal.position.set(0, tailY + 0.055, tailZ + 0.05);
        dtDecal.rotation.x = -0.34;
        spoilerGroup.add(dtDecal);
      }

      const dtLip = new THREE.Mesh(new THREE.BoxGeometry(1.44, 0.03, 0.08), carbonMat);
      dtLip.position.set(0, tailY + 0.10, tailZ - 0.01);
      dtLip.rotation.x = -0.34;

      spoilerGroup.add(dtMesh, dtLip);
    } else if (spoilerType === 'hyper_fin') {
      // Twin Le Mans shark aero fins with neon tips
      const finL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 0.85), bodyMat);
      finL.position.set(-0.62, tailY + 0.14, tailZ + 0.30);
      const finR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 0.85), bodyMat);
      finR.position.set(0.62, tailY + 0.14, tailZ + 0.30);

      const ledMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
      const ledL = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.03, 0.82), ledMat);
      ledL.position.set(-0.62, tailY + 0.32, tailZ + 0.30);
      const ledR = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.03, 0.82), ledMat);
      ledR.position.set(0.62, tailY + 0.32, tailZ + 0.30);

      spoilerGroup.add(finL, finR, ledL, ledR);
    } else if (spoilerType === 'drag_wing') {
      // Extended Pro-Mod drag wing with body-matching deck & livery
      const deck = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.04, 0.62), bodyMat);
      deck.position.set(0, tailY + 0.05, tailZ - 0.22);
      deck.rotation.x = 0.06;

      if (decalMat) {
        const dragDecal = new THREE.Mesh(new THREE.PlaneGeometry(1.50, 0.54), decalMat);
        dragDecal.rotation.x = -Math.PI / 2 + 0.06;
        dragDecal.position.set(0, tailY + 0.075, tailZ - 0.22);
        spoilerGroup.add(dragDecal);
      }

      const strutL = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42), chromeMat);
      strutL.position.set(-0.5, tailY - 0.10, tailZ - 0.3);
      strutL.rotation.x = 0.6;
      const strutR = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42), chromeMat);
      strutR.position.set(0.5, tailY - 0.10, tailZ - 0.3);
      strutR.rotation.x = 0.6;

      const spillL = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.24, 0.65), bodyMat);
      spillL.position.set(-0.79, tailY + 0.11, tailZ - 0.22);
      const spillR = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.24, 0.65), bodyMat);
      spillR.position.set(0.79, tailY + 0.11, tailZ - 0.22);

      spoilerGroup.add(deck, strutL, strutR, spillL, spillR);
    }

    chassis.add(spoilerGroup);
  }

  // --- Modular Custom Addon Roof & Hood Equipment ---
  applyRoofHoodAddon(chassis, carType, addonType, bodyMat, carbonMat, chromeMat) {
    const existing = chassis.getObjectByName('CarRoofHood');
    if (existing) {
      chassis.remove(existing);
    }
    if (!addonType || addonType === 'none') return;

    const group = new THREE.Group();
    group.name = 'CarRoofHood';

    let roofY = 0.88;
    let roofZ = -0.15;
    let hoodY = 0.62;
    let hoodZ = 0.85;

    if (carType === 'truck') { roofY = 1.15; roofZ = 0.05; hoodY = 0.78; hoodZ = 1.15; }
    else if (carType === 'kart') { roofY = 0.48; roofZ = -0.20; hoodY = 0.38; hoodZ = 0.55; }
    else if (carType === 'f1') { roofY = 0.68; roofZ = -0.40; hoodY = 0.38; hoodZ = 0.95; }
    else if (carType === 'speedster') { roofY = 0.66; roofZ = 0.10; hoodY = 0.54; hoodZ = 0.85; }
    else if (carType === 'muscle') { roofY = 0.95; roofZ = -0.15; hoodY = 0.66; hoodZ = 0.95; }
    else if (carType === 'hyper') { roofY = 0.78; roofZ = -0.15; hoodY = 0.48; hoodZ = 0.85; }
    else if (carType === 'rally') { roofY = 0.96; roofZ = -0.12; hoodY = 0.65; hoodZ = 0.85; }

    if (addonType === 'roof_scoop') {
      // Body-matching aerodynamic roof intake scoop
      const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.14, 0.62), bodyMat);
      scoop.position.set(0, roofY + 0.05, roofZ);
      scoop.rotation.x = -0.15;

      const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.08, 0.04), new THREE.MeshBasicMaterial({ color: 0x050505 }));
      mouth.position.set(0, roofY + 0.06, roofZ + 0.30);

      group.add(scoop, mouth);
    } else if (addonType === 'blower_scoop') {
      // Chrome V8 Supercharger Blower with 3 red butterfly valves
      const blower = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.24, 0.52), chromeMat);
      blower.position.set(0, hoodY + 0.10, hoodZ);

      const redMat = new THREE.MeshBasicMaterial({ color: 0xff0022 });
      [-0.12, 0, 0.12].forEach(ox => {
        const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 16), redMat);
        valve.rotateX(Math.PI / 2);
        valve.position.set(ox, hoodY + 0.14, hoodZ + 0.27);
        group.add(valve);
      });

      group.add(blower);
    } else if (addonType === 'rally_lightbar') {
      // Quad rally LED light bar across roof brow
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.05, 0.08), carbonMat);
      bar.position.set(0, roofY + 0.02, roofZ + 0.45);

      const ledGlow = new THREE.MeshBasicMaterial({ color: 0xfffae0 });
      [-0.36, -0.12, 0.12, 0.36].forEach(ox => {
        const pod = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.10, 0.08), carbonMat);
        pod.position.set(ox, roofY + 0.05, roofZ + 0.46);
        const lens = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.08), ledGlow);
        lens.position.set(ox, roofY + 0.05, roofZ + 0.51);
        group.add(pod, lens);
      });

      group.add(bar);
    }

    chassis.add(group);
  }

  // ==========================================
  // CAR 1: Ashi GT Supercar (Seamless Unibody Shell & Full-Body Livery Wrap)
  // ==========================================
  buildGTBody(chassis, bodyMat, decalMat, trimMat, carbonMat, glassMat, chromeMat, lightMat, drlMat, brakeMat) {
    // 1. Continuous Seamless Unibody Supercar Shell (100% connected, full-body skin wrap!)
    const unibodyGeo = this.createUnibodyCarGeometry({
      length: 4.10,
      noseZ: 2.05,
      tailZ: -2.05,
      maxFrontWidth: 1.82,
      waistWidth: 1.56,
      maxRearWidth: 1.88,
      roofHeight: 0.88,
      cowlHeight: 0.64,
      noseHeight: 0.32,
      tailHeight: 0.52,
      sillHeight: 0.16
    });
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMat);
    chassis.add(unibodyMesh);

    // 2. Carbon Aerodynamic Ground-Effects Undertray & Side Skirts
    const undertray = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.06, 4.08), carbonMat);
    undertray.position.set(0, 0.14, 0);
    const skirtL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 2.35), carbonMat);
    skirtL.position.set(-0.82, 0.18, 0.05);
    const skirtR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 2.35), carbonMat);
    skirtR.position.set(0.82, 0.18, 0.05);
    chassis.add(undertray, skirtL, skirtR);

    // 3. Flush Panoramic Windshield & Fastback Glass
    const windshieldGeo = this.createCurvedWindshieldGeometry();
    const windshieldMesh = new THREE.Mesh(windshieldGeo, glassMat);
    const fastbackGeo = this.createCurvedFastbackGeometry();
    const fastbackMesh = new THREE.Mesh(fastbackGeo, glassMat);
    chassis.add(windshieldMesh, fastbackMesh);

    // 4. Sleek Carbon A-Pillars
    const aPillarL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.54), carbonMat);
    aPillarL.position.set(-0.62, 0.74, 0.16);
    aPillarL.rotation.set(-0.52, -0.28, 0.35);
    const aPillarR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.54), carbonMat);
    aPillarR.position.set(0.62, 0.74, 0.16);
    aPillarR.rotation.set(-0.52, 0.28, -0.35);
    chassis.add(aPillarL, aPillarR);

    // 5. Twin Hood Air Extraction Vents
    const ventL = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.025, 0.42), carbonMat);
    ventL.position.set(-0.32, 0.56, 0.76);
    ventL.rotation.x = -0.16;
    const ventR = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.025, 0.42), carbonMat);
    ventR.position.set(0.32, 0.56, 0.76);
    ventR.rotation.x = -0.16;
    chassis.add(ventL, ventR);

    // 6. Detailed Racing Cockpit Interior Visible Through Glass
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x18181c, roughness: 0.8 });
    const seatRedMat = new THREE.MeshStandardMaterial({ color: 0xdd1133, roughness: 0.5 });
    for (const sx of [-0.30, 0.30]) {
      const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.40), seatMat);
      seatBase.position.set(sx, 0.45, -0.18);
      const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.38, 0.10), seatMat);
      seatBack.position.set(sx, 0.65, -0.34);
      seatBack.rotation.x = -0.15;
      const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.14, 0.08), seatRedMat);
      headrest.position.set(sx, 0.82, -0.37);
      chassis.add(seatBase, seatBack, headrest);
    }
    const wheelHub = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.022, 8, 16), carbonMat);
    wheelHub.position.set(-0.30, 0.68, 0.08);
    wheelHub.rotation.x = 0.35;
    const cageBar = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.15, 12), carbonMat);
    cageBar.rotation.z = Math.PI / 2;
    cageBar.position.set(0, 0.78, -0.45);
    chassis.add(wheelHub, cageBar);

    // 7. Aero Wing Mirrors
    const mirrorL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.10), carbonMat);
    mirrorL.position.set(-0.76, 0.68, 0.38);
    const mirrorR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.10), carbonMat);
    mirrorR.position.set(0.76, 0.68, 0.38);
    chassis.add(mirrorL, mirrorR);

    // 8. Front Carbon Splitter & Winglet Canards
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.05, 0.48), carbonMat);
    splitter.position.set(0, 0.18, 2.02);
    const canardL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.32), carbonMat);
    canardL.position.set(-0.86, 0.26, 1.98);
    canardL.rotation.y = 0.15;
    const canardR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.32), carbonMat);
    canardR.position.set(0.86, 0.26, 1.98);
    canardR.rotation.y = -0.15;
    chassis.add(splitter, canardL, canardR);

    // 9. Swept-Back Projector LED Headlights & Cyan DRL Eyebrows (Flush in fender nose)
    const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.12), lightMat);
    hlL.position.set(-0.56, 0.34, 1.93);
    hlL.rotation.y = -0.15;
    const drlL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.025, 0.10), drlMat);
    drlL.position.set(-0.56, 0.38, 1.94);
    drlL.rotation.y = -0.15;

    const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.12), lightMat);
    hlR.position.set(0.56, 0.34, 1.93);
    hlR.rotation.y = 0.15;
    const drlR = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.025, 0.10), drlMat);
    drlR.position.set(0.56, 0.38, 1.94);
    drlR.rotation.y = 0.15;
    chassis.add(hlL, drlL, hlR, drlR);

    // 10. Rear Fascia: Continuous 3D Neon LED Taillight Bar
    const tailBar = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.05, 0.06), brakeMat);
    tailBar.position.set(0, 0.51, -1.94);
    const tailBarGlow = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.08, 0.04), new THREE.MeshBasicMaterial({ color: 0xff1033, transparent: true, opacity: 0.7 }));
    tailBarGlow.position.set(0, 0.51, -1.945);
    chassis.add(tailBar, tailBarGlow);

    // 11. Rear Carbon Diffuser with 4 Vertical Aerodynamic Strakes
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.14, 0.48), carbonMat);
    diffuser.position.set(0, 0.19, -1.86);
    diffuser.rotation.x = 0.12;
    for (let f = -0.48; f <= 0.48; f += 0.32) {
      const strake = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.18, 0.52), carbonMat);
      strake.position.set(f, 0.19, -1.86);
      strake.rotation.x = 0.12;
      chassis.add(strake);
    }
    chassis.add(diffuser);

    // 12. Carbon Swan-Neck GT Rear Wing (Stock) with Full-Body Wrap on upper blade!
    const defaultWing = new THREE.Group();
    defaultWing.name = 'CarSpoiler';
    const pL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.16), carbonMat);
    pL.position.set(-0.52, 0.74, -1.72);
    pL.rotation.x = -0.22;
    const pR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.16), carbonMat);
    pR.position.set(0.52, 0.74, -1.72);
    pR.rotation.x = -0.22;

    const wingBlade = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.045, 0.42), bodyMat);
    wingBlade.position.set(0, 0.89, -1.76);
    wingBlade.rotation.x = 0.04;

    const endL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.46), bodyMat);
    endL.position.set(-0.89, 0.89, -1.76);
    const endR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.46), bodyMat);
    endR.position.set(0.89, 0.89, -1.76);
    defaultWing.add(pL, pR, wingBlade, endL, endR);
    chassis.add(defaultWing);
  }

  // ==========================================
  // CAR 2: Ashi Go-Kart 500 (Seamless Unibody Fairing & Attached Engine)
  // ==========================================
  buildKartBody(chassis, bodyMat, decalMat, trimMat, carbonMat, chromeMat, goldMat, lightMat, brakeMat) {
    // 1. Continuous Aerodynamic Kart Fairing Shell (Nose + Nassau panel + Pods)
    const unibodyGeo = this.createUnibodyCarGeometry({
      length: 2.30,
      noseZ: 1.15,
      tailZ: -1.15,
      maxFrontWidth: 1.25,
      waistWidth: 1.05,
      maxRearWidth: 1.35,
      frontWheelZ: 0.88,
      rearWheelZ: -0.85,
      hoodCowlZ: 0.35,
      roofPeakZ: 0.05,
      fastbackZ: -0.55,
      noseHeight: 0.20,
      cowlHeight: 0.42,
      roofHeight: 0.48,
      tailHeight: 0.26,
      sillHeight: 0.10
    });
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMat);
    chassis.add(unibodyMesh);

    // 2. Carbon Undertray Floor
    const floorTray = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.04, 2.20), carbonMat);
    floorTray.position.set(0, 0.09, 0);
    chassis.add(floorTray);

    // 3. Tubular Front Chrome Bumper Loop
    const frontBumper = new THREE.Mesh(new THREE.TorusGeometry(0.60, 0.03, 8, 20, Math.PI), chromeMat);
    frontBumper.rotation.x = Math.PI / 2;
    frontBumper.position.set(0, 0.18, 1.12);
    chassis.add(frontBumper);

    // 4. High-Back Racing Bucket Seat
    const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.10, 0.45), trimMat);
    seatBase.position.set(0, 0.20, -0.22);
    const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.52, 0.08), trimMat);
    seatBack.position.set(0, 0.46, -0.42);
    seatBack.rotation.x = 0.22;
    chassis.add(seatBase, seatBack);

    // 5. Steering Column & 3-Spoke Wheel
    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.42), chromeMat);
    column.position.set(0, 0.42, 0.22);
    column.rotation.x = -0.55;
    const stWheel = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.02, 8, 16), trimMat);
    stWheel.position.set(0, 0.55, 0.12);
    stWheel.rotation.x = -0.55;
    chassis.add(column, stWheel);

    // 6. Exposed 2-Stroke Racing Engine Block (Connected to frame at right rear)
    const engineBlock = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.30, 0.30), chromeMat);
    engineBlock.position.set(0.28, 0.28, -0.65);
    const goldCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.20, 12), goldMat);
    goldCylinder.position.set(0.28, 0.46, -0.65);
    const airFilter = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.16, 12), new THREE.MeshStandardMaterial({ color: 0xff0044 }));
    airFilter.rotateZ(Math.PI / 2);
    airFilter.position.set(0.46, 0.36, -0.65);
    chassis.add(engineBlock, goldCylinder, airFilter);

    // 7. Rear Chrome Bumper & LED Light
    const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.06, 0.06), chromeMat);
    rearBumper.position.set(0, 0.24, -1.14);
    const tailLight = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.05, 0.04), brakeMat);
    tailLight.position.set(0, 0.28, -1.15);
    chassis.add(rearBumper, tailLight);
  }

  // ==========================================
  // CAR 3: Ashi Cyber Truck (Continuous Cyber Unibody & Flush Skin Wrap)
  // ==========================================
  buildTruckBody(chassis, bodyMat, decalMat, trimMat, carbonMat, glassMat, chromeMat, lightMat, drlMat, brakeMat, amberMat) {
    // 1. Continuous Cyber Truck Unibody Shell
    const unibodyGeo = this.createUnibodyCarGeometry({
      length: 4.45,
      noseZ: 2.22,
      tailZ: -2.23,
      maxFrontWidth: 1.88,
      waistWidth: 1.84,
      maxRearWidth: 1.88,
      frontWheelZ: 1.35,
      rearWheelZ: -1.35,
      hoodCowlZ: 0.65,
      roofPeakZ: 0.05,
      fastbackZ: -0.90,
      noseHeight: 0.52,
      cowlHeight: 0.82,
      roofHeight: 1.15,
      tailHeight: 0.82,
      sillHeight: 0.22
    });
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMat);
    chassis.add(unibodyMesh);

    // 2. Heavy Rocker Underside & Rock Sliders
    const undertray = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.08, 4.40), carbonMat);
    undertray.position.set(0, 0.20, 0);
    const rockSliderL = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.12, 2.50), trimMat);
    rockSliderL.position.set(-0.92, 0.25, 0);
    const rockSliderR = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.12, 2.50), trimMat);
    rockSliderR.position.set(0.92, 0.25, 0);
    chassis.add(undertray, rockSliderL, rockSliderR);

    // 3. Angular Cyber Windshield & Side Glass
    const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.04, 0.82), glassMat);
    windshield.position.set(0, 0.98, 0.38);
    windshield.rotation.x = -0.48;
    const sideGlassL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 1.20), glassMat);
    sideGlassL.position.set(-0.72, 0.96, -0.20);
    sideGlassL.rotation.z = -0.12;
    const sideGlassR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 1.20), glassMat);
    sideGlassR.position.set(0.72, 0.96, -0.20);
    sideGlassR.rotation.z = 0.12;
    chassis.add(windshield, sideGlassL, sideGlassR);

    // 4. Cyber Horizon LED Lightbar (Flush with front nose contour)
    const horizonBar = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.06, 0.06), lightMat);
    horizonBar.position.set(0, 0.54, 2.22);
    const drlStrip = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.02, 0.08), drlMat);
    drlStrip.position.set(0, 0.57, 2.22);
    chassis.add(horizonBar, drlStrip);

    // 5. Steel Heavy Bullbar with Dual Red Recovery Hooks
    const bullBar = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.34, 0.12), trimMat);
    bullBar.position.set(0, 0.40, 2.24);
    const hookL = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 6, 12), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
    hookL.position.set(-0.48, 0.32, 2.30);
    const hookR = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 6, 12), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
    hookR.position.set(0.48, 0.32, 2.30);
    chassis.add(bullBar, hookL, hookR);

    // 6. Roof-Mounted Offroad LED Amber Pods (Flush on roof peak)
    const roofLightbar = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.06, 0.08), trimMat);
    roofLightbar.position.set(0, 1.15, 0.05);
    chassis.add(roofLightbar);
    for (let i = -0.45; i <= 0.45; i += 0.30) {
      const pod = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.05, 0.05), amberMat);
      pod.position.set(i, 1.15, 0.09);
      chassis.add(pod);
    }

    // 7. Cyber Tail Laser Lightbar
    const tailLaser = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.07, 0.06), brakeMat);
    tailLaser.position.set(0, 0.82, -2.23);
    chassis.add(tailLaser);

    // 8. Angled Rear Bed Roll-Cage Bars
    const cageL = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.7), trimMat);
    cageL.position.set(-0.72, 0.98, -1.15);
    cageL.rotation.x = -0.52;
    const cageR = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.7), trimMat);
    cageR.position.set(0.72, 0.98, -1.15);
    cageR.rotation.x = -0.52;
    chassis.add(cageL, cageR);
  }

  // ==========================================
  // CAR 4: Ashi Formula-X (Sculpted Open-Wheel Monocoque & DRS Wing)
  // ==========================================
  buildF1Body(chassis, bodyMat, decalMat, trimMat, carbonMat, chromeMat, lightMat, brakeMat) {
    // 1. Aerodynamic Formula-X Monocoque
    const unibodyGeo = this.createUnibodyCarGeometry({
      length: 4.35,
      noseZ: 2.18,
      tailZ: -2.17,
      maxFrontWidth: 1.15,
      waistWidth: 0.84,
      maxRearWidth: 1.32,
      frontWheelZ: 1.48,
      rearWheelZ: -1.32,
      hoodCowlZ: 0.65,
      roofPeakZ: -0.22,
      fastbackZ: -0.95,
      noseHeight: 0.22,
      cowlHeight: 0.42,
      roofHeight: 0.68,
      tailHeight: 0.36,
      sillHeight: 0.12
    });
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMat);
    chassis.add(unibodyMesh);

    // 2. Full-Length Carbon Undertray Floor
    const floorTray = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.05, 3.80), carbonMat);
    floorTray.position.set(0, 0.12, 0);
    chassis.add(floorTray);

    // 3. Multi-Tier Front Aerodynamic Wing (Anchored into nosecone)
    const fwMain = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.05, 0.52), carbonMat);
    fwMain.position.set(0, 0.16, 2.15);
    const fwUpper = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.04, 0.35), bodyMat);
    fwUpper.position.set(0, 0.22, 2.10);
    const endL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, 0.58), bodyMat);
    endL.position.set(-0.94, 0.24, 2.15);
    const endR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.24, 0.58), bodyMat);
    endR.position.set(0.94, 0.24, 2.15);
    const fwMountL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.24), carbonMat);
    fwMountL.position.set(-0.16, 0.20, 2.10);
    const fwMountR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.24), carbonMat);
    fwMountR.position.set(0.16, 0.20, 2.10);
    chassis.add(fwMain, fwUpper, endL, endR, fwMountL, fwMountR);

    // 4. Titanium Halo Cockpit Safety Ring
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.035, 8, 16, Math.PI), trimMat);
    halo.position.set(0, 0.66, 0.12);
    halo.rotation.x = -Math.PI / 2;
    const haloCenterPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.28), trimMat);
    haloCenterPillar.position.set(0, 0.52, 0.38);
    chassis.add(halo, haloCenterPillar);

    // 5. Engine Airbox Scoop (Above driver head)
    const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.38, 0.60), bodyMat);
    scoop.position.set(0, 0.70, -0.40);
    chassis.add(scoop);

    // 6. Giant 2-Tier Rear DRS Wing (Stock)
    const defaultWing = new THREE.Group();
    defaultWing.name = 'CarSpoiler';
    const rwMain = new THREE.Mesh(new THREE.BoxGeometry(1.76, 0.06, 0.42), bodyMat);
    rwMain.position.set(0, 0.90, -1.88);
    const rwFlap = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.04, 0.22), carbonMat);
    rwFlap.position.set(0, 1.00, -1.94);
    const pillarL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.46, 0.14), carbonMat);
    pillarL.position.set(-0.42, 0.67, -1.82);
    const pillarR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.46, 0.14), carbonMat);
    pillarR.position.set(0.42, 0.67, -1.82);
    const wingEndL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.48), bodyMat);
    wingEndL.position.set(-0.88, 0.92, -1.88);
    const wingEndR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.48), bodyMat);
    wingEndR.position.set(0.88, 0.92, -1.88);
    defaultWing.add(rwMain, rwFlap, pillarL, pillarR, wingEndL, wingEndR);
    chassis.add(defaultWing);

    // 7. FIA Flashing Red Rain Light at Rear Diffuser
    const rainLight = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.06), brakeMat);
    rainLight.position.set(0, 0.28, -2.14);
    chassis.add(rainLight);
  }

  // ==========================================
  // CAR 5: Ashi Muscle V8 (Muscular Fastback Unibody & Blower)
  // ==========================================
  buildMuscleBody(chassis, bodyMat, decalMat, trimMat, carbonMat, chromeMat, glassMat, lightMat, brakeMat) {
    // 1. Muscular Widebody Fastback Unibody
    const unibodyGeo = this.createUnibodyCarGeometry({
      length: 4.22,
      noseZ: 2.11,
      tailZ: -2.11,
      maxFrontWidth: 1.84,
      waistWidth: 1.70,
      maxRearWidth: 1.88,
      frontWheelZ: 1.25,
      rearWheelZ: -1.18,
      hoodCowlZ: 0.48,
      roofPeakZ: -0.15,
      fastbackZ: -1.05,
      noseHeight: 0.42,
      cowlHeight: 0.68,
      roofHeight: 0.95,
      tailHeight: 0.58,
      sillHeight: 0.18
    });
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMat);
    chassis.add(unibodyMesh);

    // 2. Carbon Undertray & Rocker Skirts
    const undertray = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.06, 4.15), carbonMat);
    undertray.position.set(0, 0.16, 0);
    chassis.add(undertray);

    // 3. Flush Windshield & Fastback Rear Glass
    const windshieldGeo = this.createCurvedWindshieldGeometry();
    const windshieldMesh = new THREE.Mesh(windshieldGeo, glassMat);
    const fastbackGeo = this.createCurvedFastbackGeometry();
    const fastbackMesh = new THREE.Mesh(fastbackGeo, glassMat);
    chassis.add(windshieldMesh, fastbackMesh);

    // 4. Chrome Supercharger Blower with Triple Red Butterflies
    const blower = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.24, 0.46), chromeMat);
    blower.position.set(0, 0.76, 0.92);
    const scoopFlap1 = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), new THREE.MeshBasicMaterial({ color: 0xff002b }));
    scoopFlap1.position.set(-0.12, 0.78, 1.16);
    const scoopFlap2 = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), new THREE.MeshBasicMaterial({ color: 0xff002b }));
    scoopFlap2.position.set(0, 0.78, 1.16);
    const scoopFlap3 = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), new THREE.MeshBasicMaterial({ color: 0xff002b }));
    scoopFlap3.position.set(0.12, 0.78, 1.16);
    chassis.add(blower, scoopFlap1, scoopFlap2, scoopFlap3);

    // 5. Classic Recessed Black Mesh Grille with Quad Headlights
    const grille = new THREE.Mesh(new THREE.BoxGeometry(1.50, 0.28, 0.08), trimMat);
    grille.position.set(0, 0.46, 2.08);
    chassis.add(grille);

    const makeRoundHeadlight = (x) => {
      const hl = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.06, 16), lightMat);
      hl.rotateX(Math.PI / 2);
      hl.position.set(x, 0.46, 2.11);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.10, 0.02, 8, 16), chromeMat);
      ring.position.set(x, 0.46, 2.12);
      chassis.add(hl, ring);
    };
    makeRoundHeadlight(-0.58);
    makeRoundHeadlight(-0.36);
    makeRoundHeadlight(0.36);
    makeRoundHeadlight(0.58);

    // 6. Classic Ducktail Rear Spoiler (Stock)
    const defaultWing = new THREE.Group();
    defaultWing.name = 'CarSpoiler';
    const ducktail = new THREE.Mesh(new THREE.BoxGeometry(1.60, 0.12, 0.22), bodyMat);
    ducktail.position.set(0, 0.68, -2.04);
    ducktail.rotation.x = -0.22;
    defaultWing.add(ducktail);
    chassis.add(defaultWing);

    // 7. Triple-Bar Classic Tail Lights
    const tailBar = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.14, 0.06), brakeMat);
    tailBar.position.set(0, 0.50, -2.08);
    chassis.add(tailBar);
  }

  // ==========================================
  // CAR 6: Ashi Valkyrie Hypercar (Le Mans Sculpted Unibody)
  // ==========================================
  buildHyperBody(chassis, bodyMat, decalMat, trimMat, carbonMat, glassMat, chromeMat, lightMat, drlMat, brakeMat) {
    // 1. Ultra-Low Sculpted Le Mans Prototype Unibody
    const unibodyGeo = this.createUnibodyCarGeometry({
      length: 4.32,
      noseZ: 2.16,
      tailZ: -2.16,
      maxFrontWidth: 1.86,
      waistWidth: 1.52,
      maxRearWidth: 1.94,
      frontWheelZ: 1.30,
      rearWheelZ: -1.25,
      hoodCowlZ: 0.44,
      roofPeakZ: -0.15,
      fastbackZ: -1.15,
      noseHeight: 0.28,
      cowlHeight: 0.52,
      roofHeight: 0.78,
      tailHeight: 0.48,
      sillHeight: 0.14
    });
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMat);
    chassis.add(unibodyMesh);

    // 2. Carbon Ground-Effects Undertray & Side Aero Blades
    const undertray = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.05, 4.25), carbonMat);
    undertray.position.set(0, 0.12, 0);
    const aeroBladeL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.10, 2.20), carbonMat);
    aeroBladeL.position.set(-0.84, 0.16, 0);
    const aeroBladeR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.10, 2.20), carbonMat);
    aeroBladeR.position.set(0.84, 0.16, 0);
    chassis.add(undertray, aeroBladeL, aeroBladeR);

    // 3. Panoramic Fighter-Jet Cockpit Canopy
    const cockpitGeo = new THREE.SphereGeometry(0.64, 20, 16);
    cockpitGeo.scale(0.92, 0.58, 2.0);
    const cockpit = new THREE.Mesh(cockpitGeo, glassMat);
    cockpit.position.set(0, 0.62, -0.15);
    chassis.add(cockpit);

    // 4. Carbon Dorsal Shark Fin
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.42, 1.70), carbonMat);
    fin.position.set(0, 0.74, -0.92);
    chassis.add(fin);

    // 5. Dual-Deck Front Carbon Aero Splitter
    const fSplitter = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.045, 0.52), carbonMat);
    fSplitter.position.set(0, 0.16, 2.12);
    chassis.add(fSplitter);

    // 6. Futuristic Y-Shaped Cyber Matrix Headlights (Flush in nose tunnels)
    const hlL1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.05), drlMat);
    hlL1.position.set(-0.62, 0.30, 2.06);
    hlL1.rotation.z = 0.35;
    const hlR1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.05), drlMat);
    hlR1.position.set(0.62, 0.30, 2.06);
    hlR1.rotation.z = -0.35;
    chassis.add(hlL1, hlR1);

    // 7. Curved Active Rear Wing with Cyan Wingtip LEDs (Stock)
    const defaultWing = new THREE.Group();
    defaultWing.name = 'CarSpoiler';
    const rw = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.05, 0.42), bodyMat);
    rw.position.set(0, 0.86, -1.94);
    const pylonL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.16), carbonMat);
    pylonL.position.set(-0.48, 0.68, -1.90);
    const pylonR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.38, 0.16), carbonMat);
    pylonR.position.set(0.48, 0.68, -1.90);
    const ledL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.44), drlMat);
    ledL.position.set(-0.93, 0.86, -1.94);
    const ledR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.44), drlMat);
    ledR.position.set(0.93, 0.86, -1.94);
    defaultWing.add(rw, pylonL, pylonR, ledL, ledR);
    chassis.add(defaultWing);

    // 8. Rear Under-Diffuser with Neon Brake Outline
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.12, 0.48), carbonMat);
    diffuser.position.set(0, 0.18, -1.96);
    diffuser.rotation.x = 0.10;
    const brakeStrip = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.04, 0.04), brakeMat);
    brakeStrip.position.set(0, 0.38, -2.12);
    chassis.add(diffuser, brakeStrip);
  }

  // ==========================================
  // CAR 7: Ashi WRC Rally Beast (Aggressive Widebody Hatchback)
  // ==========================================
  buildRallyBody(chassis, bodyMat, decalMat, trimMat, carbonMat, glassMat, lightMat, amberMat, brakeMat) {
    // 1. Aggressive Widebody Rally Hatchback Unibody
    const unibodyGeo = this.createUnibodyCarGeometry({
      length: 4.02,
      noseZ: 2.01,
      tailZ: -2.01,
      maxFrontWidth: 1.84,
      waistWidth: 1.68,
      maxRearWidth: 1.86,
      frontWheelZ: 1.15,
      rearWheelZ: -1.15,
      hoodCowlZ: 0.46,
      roofPeakZ: -0.12,
      fastbackZ: -1.15,
      noseHeight: 0.40,
      cowlHeight: 0.68,
      roofHeight: 0.96,
      tailHeight: 0.64,
      sillHeight: 0.20
    });
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMat);
    chassis.add(unibodyMesh);

    // 2. Underbody Skid Plate & Rocker Guards
    const skid = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.05, 0.52), carbonMat);
    skid.position.set(0, 0.19, 1.88);
    skid.rotation.x = -0.25;
    const undertray = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.06, 3.90), carbonMat);
    undertray.position.set(0, 0.18, 0);
    chassis.add(skid, undertray);

    // 3. Flush Windshield & Hatchback Glass
    const windshieldGeo = this.createCurvedWindshieldGeometry();
    const windshieldMesh = new THREE.Mesh(windshieldGeo, glassMat);
    const fastbackGeo = this.createCurvedFastbackGeometry();
    const fastbackMesh = new THREE.Mesh(fastbackGeo, glassMat);
    chassis.add(windshieldMesh, fastbackMesh);

    // 4. Quad Front Rally Fog Light Pods on Hood (Flush mounting)
    const podBar = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.08, 0.16), trimMat);
    podBar.position.set(0, 0.50, 1.55);
    chassis.add(podBar);

    for (let i = -0.36; i <= 0.36; i += 0.24) {
      const podLight = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 0.06, 16), lightMat);
      podLight.rotateX(Math.PI / 2);
      podLight.position.set(i, 0.50, 1.64);
      chassis.add(podLight);
    }

    // 5. Roof Air Intake Scoop
    const roofScoop = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.44), carbonMat);
    roofScoop.position.set(0, 0.98, 0.20);
    chassis.add(roofScoop);

    // 6. Large Dual-Plane WRC Rear Wing (Stock)
    const defaultWing = new THREE.Group();
    defaultWing.name = 'CarSpoiler';
    const rwLower = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.05, 0.32), carbonMat);
    rwLower.position.set(0, 0.98, -1.72);
    const rwUpper = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.05, 0.38), bodyMat);
    rwUpper.position.set(0, 1.16, -1.84);
    const wingPillarL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 0.32), carbonMat);
    wingPillarL.position.set(-0.65, 1.05, -1.78);
    const wingPillarR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 0.32), carbonMat);
    wingPillarR.position.set(0.65, 1.05, -1.78);
    defaultWing.add(rwLower, rwUpper, wingPillarL, wingPillarR);
    chassis.add(defaultWing);

    // 7. Bright Red Rally Mudflaps behind wheels
    const flapMat = new THREE.MeshBasicMaterial({ color: 0xff002b });
    const makeMudflap = (x, z) => {
      const flap = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.03), flapMat);
      flap.position.set(x, 0.22, z);
      chassis.add(flap);
    };
    makeMudflap(-0.86, 0.85);
    makeMudflap(0.86, 0.85);
    makeMudflap(-0.88, -1.45);
    makeMudflap(0.88, -1.45);

    // 8. Headlights & Taillights (Flush in fascia)
    const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.06), lightMat);
    hlL.position.set(-0.58, 0.40, 1.95);
    const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, 0.06), lightMat);
    hlR.position.set(0.58, 0.40, 1.95);
    const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 0.06), brakeMat);
    tailL.position.set(-0.65, 0.65, -1.96);
    const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 0.06), brakeMat);
    tailR.position.set(0.65, 0.65, -1.96);
    chassis.add(hlL, hlR, tailL, tailR);
  }

  // ==========================================
  // CAR 8: Ashi Retro Speedster (Vintage Roadster Unibody)
  // ==========================================
  buildSpeedsterBody(chassis, bodyMat, decalMat, trimMat, carbonMat, chromeMat, glassMat, lightMat, brakeMat) {
    // 1. Curvaceous Vintage Roadster Unibody Shell
    const unibodyGeo = this.createUnibodyCarGeometry({
      length: 3.96,
      noseZ: 1.98,
      tailZ: -1.98,
      maxFrontWidth: 1.76,
      waistWidth: 1.58,
      maxRearWidth: 1.80,
      frontWheelZ: 1.20,
      rearWheelZ: -1.15,
      hoodCowlZ: 0.40,
      roofPeakZ: -0.10,
      fastbackZ: -0.92,
      noseHeight: 0.34,
      cowlHeight: 0.60,
      roofHeight: 0.68,
      tailHeight: 0.48,
      sillHeight: 0.16
    });
    const unibodyMesh = new THREE.Mesh(unibodyGeo, bodyMat);
    chassis.add(unibodyMesh);

    // 2. Sculpted Flared Wheel Arches (Enclosing wheels cleanly)
    const fArchGeo = new THREE.CylinderGeometry(0.38, 0.40, 0.28, 16, 1, false, 0, Math.PI);
    fArchGeo.rotateZ(Math.PI / 2);
    const fArchL = new THREE.Mesh(fArchGeo, bodyMat);
    fArchL.position.set(-0.76, 0.34, 1.20);
    const fArchR = new THREE.Mesh(fArchGeo, bodyMat);
    fArchR.position.set(0.76, 0.34, 1.20);
    const rArchL = new THREE.Mesh(fArchGeo, bodyMat);
    rArchL.position.set(-0.78, 0.36, -1.15);
    const rArchR = new THREE.Mesh(fArchGeo, bodyMat);
    rArchR.position.set(0.78, 0.36, -1.15);
    chassis.add(fArchL, fArchR, rArchL, rArchR);

    // 3. Undertray & Rocker Sills
    const undertray = new THREE.Mesh(new THREE.BoxGeometry(1.60, 0.06, 3.90), carbonMat);
    undertray.position.set(0, 0.15, 0);
    chassis.add(undertray);

    // 4. Curving Low-Cut Speedster Frameless Windshield
    const shield = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.22, 16, 1, false, -Math.PI / 3, (2 * Math.PI) / 3), glassMat);
    shield.position.set(0, 0.68, 0.25);
    shield.rotation.x = 0.35;
    chassis.add(shield);

    // 5. Streamlined Aerodynamic Headrest Fairing behind Driver
    const fairingGeo = new THREE.ConeGeometry(0.22, 0.82, 16);
    fairingGeo.rotateX(-Math.PI / 2);
    const fairing = new THREE.Mesh(fairingGeo, bodyMat);
    fairing.position.set(-0.30, 0.62, -0.45);
    chassis.add(fairing);

    // 6. Chrome Bullet Side Mirrors on Cowl
    const bMirrorL = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), chromeMat);
    bMirrorL.position.set(-0.72, 0.62, 0.32);
    const bMirrorR = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), chromeMat);
    bMirrorR.position.set(0.72, 0.62, 0.32);
    chassis.add(bMirrorL, bMirrorR);

    // 7. Embedded Front Bullet Headlights (Physically anchored into front fender crown!)
    const makeHeadlight = (x) => {
      const pod = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), chromeMat);
      pod.position.set(x, 0.36, 1.80);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.022, 8, 16), chromeMat);
      ring.position.set(x, 0.36, 1.91);
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.11, 16), lightMat);
      lens.position.set(x, 0.36, 1.92);
      chassis.add(pod, ring, lens);
    };
    makeHeadlight(-0.52);
    makeHeadlight(0.52);

    // 8. Classic Front Chrome Grille & Bumper
    const grille = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.20, 0.08), chromeMat);
    grille.position.set(0, 0.26, 1.95);
    const grilleInner = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.16, 0.04), new THREE.MeshBasicMaterial({ color: 0x111115 }));
    grilleInner.position.set(0, 0.26, 1.96);
    const fBumper = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.06, 0.08), chromeMat);
    fBumper.position.set(0, 0.22, 1.97);
    chassis.add(grille, grilleInner, fBumper);

    // 9. Hood Center Chrome Spine (Flush along the sloping hood contour)
    const spine = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.025, 1.35), chromeMat);
    spine.position.set(0, 0.48, 1.05);
    spine.rotation.x = -0.14;
    chassis.add(spine);

    // 10. Classic Dual Rear Bumperettes & Round Tail Lights
    const tlL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16), brakeMat);
    tlL.rotateX(Math.PI / 2);
    tlL.position.set(-0.54, 0.46, -1.94);
    const tlR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16), brakeMat);
    tlR.rotateX(Math.PI / 2);
    tlR.position.set(0.54, 0.46, -1.94);
    const bumpL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.08), chromeMat);
    bumpL.position.set(-0.42, 0.36, -1.96);
    const bumpR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.08), chromeMat);
    bumpR.position.set(0.42, 0.36, -1.96);
    chassis.add(tlL, tlR, bumpL, bumpR);
  }
}
