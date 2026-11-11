import * as THREE from 'three';
import { Track } from './Track.js';
import { TrackDecorations } from './TrackDecorations.js';
import { CarModelBuilder } from './CarModelBuilder.js';
import { Car } from './Car.js';
import { AICar } from './AICar.js';
import { ParticleSystem } from './ParticleSystem.js';
import { AudioManager } from './AudioManager.js';
import { Minimap } from './Minimap.js';
import { ItemSystem } from './ItemSystem.js';
import { HUD } from '../ui/HUD.js';
import { UIManager } from '../ui/UIManager.js';
import { MultiplayerManager } from '../network/MultiplayerManager.js';
import { CARS } from '../data/carsData.js';
import { SKINS } from '../data/skinsData.js';
import { TRACKS, DIFFICULTIES, getTrackDef } from '../data/tracksData.js';

export class Game {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.state = 'MENU'; // 'MENU', 'STAGE_SELECT', 'GARAGE', 'LOBBY', 'RACING', 'VICTORY'
    this.gameMode = 'gp'; // 'gp', 'timeattack', 'multiplayer'

    // Active track & settings
    this.currentTrackId = 'beach';
    this.currentDifficulty = 'normal';
    this.currentLaps = 3;

    // Clock & Timing
    this.clock = new THREE.Clock();
    this.raceStartTime = 0;
    this.isRacing = false;
    this.countdownActive = false;

    // Three.js Core
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.ambientLight = null;
    this.dirLight = null;

    // Camera settings
    this.cameraMode = 0; // 0: Chase Cam, 1: Close Cam, 2: Hood Cam
    this.cameraOffset = new THREE.Vector3(0, 3.8, -7.5);
    this.cameraLookOffset = new THREE.Vector3(0, 1.2, 4);

    // Systems
    this.track = null;
    this.decorations = null;
    this.carBuilder = new CarModelBuilder();
    this.particles = null;
    this.audio = new AudioManager();
    this.hud = new HUD();
    this.minimap = null;
    this.items = null;

    // Racers
    this.playerCar = null;
    this.aiCars = [];
    this.remotePlayers = new Map(); // peerId -> { car, lastPacket }

    // Garage Preview & 360 Turntable
    this.garageCarMesh = null;
    this.garageGroup = null;
    this.garageAngle = 0.5;
    this.garagePitch = 0.26;
    this.garageDistance = 6.0;
    this.garageTargetAngle = 0.5;
    this.garageTargetPitch = 0.26;
    this.garageTargetDistance = 6.0;
    this.garageAutoSpin = true;
    this.garageIsDragging = false;
    this.garageDragPrevX = 0;
    this.garageDragPrevY = 0;

    // Multiplayer
    this.multiplayer = new MultiplayerManager(
      (lobbyState) => this.onMultiplayerStateChanged(lobbyState),
      (chatMsg) => this.onChatMessage(chatMsg)
    );
    this.multiplayer.onStartRaceCallback = (packet) => this.onMultiplayerStartRace(packet);
    this.multiplayer.onRacerTransform = (data) => this.onRemoteRacerTransform(data);

    // UI
    this.ui = new UIManager(this);

    // Inputs
    this.keys = {};
    this.initInputs();

    // Init Three Scene & Start loop
    this.initThree();
    this.animate();
  }

  initThree() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    this.container.appendChild(this.renderer.domElement);

    // Dynamic Lights
    this.ambientLight = new THREE.AmbientLight(0xffe2c4, 0.75);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.dirLight.position.set(120, 220, 100);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 600;
    this.dirLight.shadow.camera.left = -300;
    this.dirLight.shadow.camera.right = 300;
    this.dirLight.shadow.camera.top = 300;
    this.dirLight.shadow.camera.bottom = -300;
    this.scene.add(this.dirLight);

    // Particles System
    this.particles = new ParticleSystem(this.scene);

    // Load Default Starting Track
    this.loadTrack(this.currentTrackId);

    // Default player car setup for initial menu backdrop
    this.setupPlayerCar(CARS[0], 'Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg', '#ff2255');
    this.positionCarAtStart(this.playerCar, 0);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  loadTrack(trackId) {
    const trackDef = getTrackDef(trackId);
    this.currentTrackId = trackDef.id;

    // 1. Dispose old track and decorations
    if (this.decorations) {
      this.decorations.dispose();
      this.decorations = null;
    }
    if (this.track) {
      this.track.dispose();
      this.track = null;
    }

    // 2. Set environment & lighting based on track theme
    const theme = trackDef.theme || {};
    this.scene.background = new THREE.Color(theme.sky ?? 0x0a0c18);
    this.scene.fog = new THREE.FogExp2(theme.fog ?? 0x0a0c18, theme.fogDensity || 0.0035);
    this.renderer.toneMappingExposure = theme.exposure || 1.1;

    if (this.ambientLight) {
      this.ambientLight.color.setHex(theme.ambient ?? 0xb0c4de);
      this.ambientLight.intensity = theme.ambientIntensity || 0.7;
    }
    if (this.dirLight) {
      this.dirLight.color.setHex(theme.sun ?? 0xffffff);
      this.dirLight.intensity = theme.sunIntensity || 1.4;
    }

    // 3. Build new Track and themed Decorations
    this.track = new Track(this.scene, trackDef);
    this.decorations = new TrackDecorations(this.scene, this.track);

    // 4. Update ItemSystem
    if (!this.items) {
      this.items = new ItemSystem(this.scene, this.track, this.particles, this.audio, this.hud);
    } else {
      this.items.resetForTrack(this.track);
    }

    // 5. Update Minimap
    const minimapCanvas = document.getElementById('minimap-canvas');
    if (minimapCanvas) {
      if (!this.minimap) {
        this.minimap = new Minimap(minimapCanvas, this.track);
      } else {
        this.minimap.setTrack(this.track);
      }
    }

    // 6. Update HUD stage label
    this.hud.setStage(trackDef.nameTh);
  }

  setupPlayerCar(carConfig, skinFileName, color, addons = null) {
    if (this.playerCar && this.playerCar.model) {
      this.scene.remove(this.playerCar.model);
    }

    this.playerCar = new Car(carConfig, skinFileName, color, true);
    this.playerCar.game = this;
    const appliedAddons = addons || this.ui?.currentAddons;
    const builtModel = this.carBuilder.createCar(carConfig.id, skinFileName, color, false, appliedAddons);
    this.playerCar.setModel(builtModel);
    this.scene.add(this.playerCar.model);

    this.hud.setDriverAvatar(skinFileName, this.ui.playerName);
  }

  positionCarAtStart(car, gridIndex = 0) {
    if (!this.track || !this.track.samplePos) return;

    const pt = this.track.samplePos[0];
    const tangent = this.track.sampleTan[0];
    const normal = this.track.sampleNorm[0];

    // 2-wide staggered grid behind start line on home straight
    const row = Math.floor(gridIndex / 2);
    const col = (gridIndex % 2 === 0) ? -1 : 1;
    const lateralOffset = col * (this.track.roadWidth * 0.22);
    const longitudinalOffset = -10 - (row * 8.0);

    const pos = pt.clone()
      .addScaledVector(tangent, longitudinalOffset)
      .addScaledVector(normal, lateralOffset);

    car.position.set(pos.x, 0.05, pos.z);
    car.rotationY = Math.atan2(tangent.x, tangent.z);
    car.speed = 0;
    car.velocity.set(0, 0, 0);
    car.lap = 1;
    car.hasPassedHalfway = false;
    car.sampleIndexHint = 0;
    car.totalDistance = 0;
    car.isFinished = false;
    car.spinTimer = 0;
    car.isSpinning = false;
  }

  startSinglePlayer(mode = 'gp', trackId = 'beach', difficulty = 'normal', laps = 3) {
    this.gameMode = mode;
    this.currentDifficulty = difficulty;
    this.currentLaps = laps;
    this.state = 'RACING';
    this.audio.init();

    // Ensure garage showcase items are closed and world visuals restored
    if (this.garageCarMesh) {
      this.scene.remove(this.garageCarMesh.root);
      this.garageCarMesh = null;
    }
    if (this.garageGroup) {
      this.garageGroup.visible = false;
    }
    if (this.track && this.track.group) {
      this.track.group.visible = true;
    }
    if (this.decorations && this.decorations.group) {
      this.decorations.group.visible = true;
    }
    if (this.prevSceneBackground) {
      this.scene.background = this.prevSceneBackground;
      this.scene.fog = this.prevSceneFog;
      this.prevSceneBackground = null;
      this.prevSceneFog = null;
    }

    // 1. Load selected stage
    if (!this.track || this.track.def.id !== trackId) {
      this.loadTrack(trackId);
    }

    // 2. Setup Player Car
    const playerConfig = this.ui.getPlayerConfig();
    const carConfig = CARS.find(c => c.id === playerConfig.carId) || CARS[0];
    this.setupPlayerCar(carConfig, playerConfig.skinFileName, playerConfig.color, playerConfig.addons);
    this.playerCar.totalLaps = laps;

    this.clearOpponents();
    this.positionCarAtStart(this.playerCar, 0);

    // 3. Setup AI Competitors if GP mode
    if (mode === 'gp') {
      const diffMul = DIFFICULTIES[difficulty]?.aiMul || 1.0;

      const aiRivalConfigs = [
        { name: 'วัลคิรี อาชิ (Cyber)', car: 'hyper', skin: 'Gemini_Generated_Image_kwy6itkwy6itkwy6.jpeg', color: '#00f0ff', lane: -2.8, skill: 0.93 },
        { name: 'บิกินี่แดง อาชิ (Hot)', car: 'gt', skin: 'qwen_edit_20261004_234512.png', color: '#ff0033', lane: 2.8, skill: 0.92 },
        { name: 'แรลลี่ อสูร อาชิ', car: 'rally', skin: 'Gemini_Generated_Image_w62h0zw62h0zw62h.jpg', color: '#ff0055', lane: -3.2, skill: 0.89 },
        { name: 'เสี่ยอาชิ (CEO)', car: 'f1', skin: 'Gemini_Generated_Image_t2e45ct2e45ct2e4.jpeg', color: '#ffd700', lane: 3.2, skill: 0.94 },
        { name: 'ชเร็ค อาชิ (Ogre)', car: 'truck', skin: 'Gemini_Generated_Image_9bccp39bccp39bcc.jpeg', color: '#38b000', lane: -1.2, skill: 0.90 },
        { name: 'คลาสสิก อาชิ', car: 'speedster', skin: 'Gemini_Generated_Image_ovar5lovar5lovar.jpeg', color: '#e0e7ff', lane: 1.2, skill: 0.88 }
      ];

      aiRivalConfigs.forEach((cfg, idx) => {
        const carDef = CARS.find(c => c.id === cfg.car) || CARS[0];
        const ai = new AICar(carDef, cfg.skin, cfg.color, cfg.name, cfg.lane, cfg.skill);
        ai.game = this;
        ai.totalLaps = laps;
        ai.setDifficulty(diffMul);

        const built = this.carBuilder.createCar(carDef.id, cfg.skin, cfg.color, true);
        ai.setModel(built);
        this.scene.add(ai.model);
        this.positionCarAtStart(ai, idx + 1);
        this.aiCars.push(ai);
      });
    }

    // Build Starting Lineup Array for the snappy showcase
    const lineupRacers = [
      {
        name: this.ui.playerName,
        carName: carConfig.nameTh,
        carTag: carConfig.tag || carConfig.name,
        carId: carConfig.id,
        skinFileName: playerConfig.skinFileName,
        color: playerConfig.color,
        isPlayer: true,
        car: this.playerCar
      }
    ];

    this.aiCars.forEach(ai => {
      lineupRacers.push({
        name: ai.name,
        carName: ai.config?.nameTh || 'รถซิ่งอาชิ',
        carTag: ai.config?.tag || ai.config?.name || 'RIVAL',
        carId: ai.config?.id || 'gt',
        skinFileName: ai.skinFileName,
        color: ai.bodyColor,
        isPlayer: false,
        car: ai
      });
    });

    const stageTitle = this.track?.def ? `${this.track.def.icon || '🏁'} ${this.track.def.nameTh} (${this.track.def.name})` : 'STARTING GRID';

    // Snappy starting grid showcase before countdown
    this.playGridIntro(lineupRacers, stageTitle, () => this.startCountdown());
  }

  playGridIntro(racers, stageTitle, onComplete) {
    this.state = 'GRID_INTRO';
    this.gridIntroTimer = 0;
    this.gridIntroRacers = racers || [];
    this.gridIntroOnComplete = onComplete;
    this.countdownActive = true;
    this.isRacing = false;
    this.lastGridFocusedIndex = -1;

    // Freeze all cars on grid
    if (this.playerCar) {
      this.playerCar.speed = 0;
      this.playerCar.velocity.set(0, 0, 0);
      this.playerCar.inputs.throttle = 0;
      this.playerCar.inputs.steer = 0;
      this.playerCar.inputs.boost = false;
      this.playerCar.inputs.drift = false;
    }

    this.aiCars.forEach(ai => {
      ai.speed = 0;
      ai.velocity.set(0, 0, 0);
      ai.inputs.throttle = 0;
      ai.inputs.steer = 0;
      ai.inputs.boost = false;
      ai.inputs.drift = false;
    });

    const totalCars = Math.max(1, this.gridIntroRacers.length);
    if (totalCars === 1) {
      this.rivalSlotDuration = 0;
      this.playerSlotDuration = 3.6;
      this.gridIntroDuration = 3.6;
    } else {
      this.rivalSlotDuration = 2.8; // 2.8s rotating showcase per rival (smooth camera orbit & clear name announcement)
      this.playerSlotDuration = 3.6;  // 3.6s rotating showcase & swoop for player
      this.gridIntroDuration = (totalCars - 1) * this.rivalSlotDuration + this.playerSlotDuration;
    }

    // Determine initial car to focus (the rear-most car on the grid)
    const initialIndex = totalCars > 1 ? totalCars - 1 : 0;
    const initialRacer = this.gridIntroRacers[initialIndex];
    const initialCar = initialRacer?.car || (initialIndex === 0 ? this.playerCar : this.aiCars[initialIndex - 1]);

    if (initialCar) {
      const carPos = initialCar.position;
      const carHeading = initialCar.rotationY;
      const col = (initialIndex % 2 === 0) ? -1 : 1;
      const phi = (initialIndex === 0) ? -1.35 : ((col === -1) ? -1.25 : 1.25);
      const dist = (initialIndex === 0) ? 4.35 : 4.25;
      const height = 0.82;

      const Fx = Math.sin(carHeading);
      const Fz = Math.cos(carHeading);
      const Rx = Math.cos(carHeading);
      const Rz = -Math.sin(carHeading);

      const Ox = dist * (Math.cos(phi) * Fx + Math.sin(phi) * Rx);
      const Oz = dist * (Math.cos(phi) * Fz + Math.sin(phi) * Rz);

      this.camera.position.set(carPos.x + Ox, carPos.y + height, carPos.z + Oz);
      this.camera.lookAt(carPos.x, carPos.y + 0.65, carPos.z);
      this.camera.fov = 57;
      this.camera.updateProjectionMatrix();

      this.slotStartCamPos = this.camera.position.clone();
      this.slotStartLookTarget = new THREE.Vector3(carPos.x, carPos.y + 0.65, carPos.z);
      this.lastLookTarget = this.slotStartLookTarget.clone();
    } else {
      this.slotStartCamPos = null;
      this.slotStartLookTarget = null;
      this.lastLookTarget = null;
    }

    if (this.audio) {
      if (this.audio.playAnnouncerImpact) {
        this.audio.playAnnouncerImpact(false);
      } else if (this.audio.playGridIntroSwoosh) {
        this.audio.playGridIntroSwoosh();
      }
    }

    this.ui.showGridIntro(racers, stageTitle, () => this.finishGridIntro());
  }

  updateGridIntro(delta) {
    this.gridIntroTimer += delta;
    const duration = this.gridIntroDuration;
    const timer = this.gridIntroTimer;

    if (timer >= duration) {
      this.finishGridIntro();
      return;
    }

    const totalRacers = this.gridIntroRacers.length;
    if (totalRacers === 0) {
      this.finishGridIntro();
      return;
    }

    // Helper: Quintic smootherstep for buttery smooth zero-acceleration easing
    const smoother = (u) => {
      const cu = Math.max(0, Math.min(1, u));
      return cu * cu * cu * (cu * (cu * 6 - 15) + 10);
    };

    // Calculate active racer index and normalized slot progress (0..1)
    let activeRacerIndex = 0;
    let slotProgress = 0;

    if (totalRacers === 1) {
      activeRacerIndex = 0;
      slotProgress = Math.min(1, Math.max(0, timer / this.playerSlotDuration));
    } else {
      const rivalTotalTime = (totalRacers - 1) * this.rivalSlotDuration;
      if (timer < rivalTotalTime) {
        // Cycling from back of grid (N - 1) down to 1
        const slot = Math.min(totalRacers - 2, Math.floor(timer / this.rivalSlotDuration));
        activeRacerIndex = (totalRacers - 1) - slot;
        const timeInSlot = timer - (slot * this.rivalSlotDuration);
        slotProgress = Math.min(1, Math.max(0, timeInSlot / this.rivalSlotDuration));
      } else {
        // Grand finale: Player car (P1, Pole Position)
        activeRacerIndex = 0;
        const timeInSlot = timer - rivalTotalTime;
        slotProgress = Math.min(1, Math.max(0, timeInSlot / this.playerSlotDuration));
      }
    }

    // Switch lower-third broadcast card & announce driver name via voice when focused racer changes
    if (activeRacerIndex !== this.lastGridFocusedIndex) {
      this.lastGridFocusedIndex = activeRacerIndex;
      const racer = this.gridIntroRacers[activeRacerIndex];
      const pos = activeRacerIndex + 1;

      // Remember camera start position for this slot so transition is continuous & smooth
      this.slotStartCamPos = this.camera.position.clone();
      this.slotStartLookTarget = (this.lastLookTarget || new THREE.Vector3()).clone();

      if (this.audio) {
        if (this.audio.playAnnouncerImpact) {
          this.audio.playAnnouncerImpact(!!racer?.isPlayer);
        } else if (this.audio.playGridIntroSwoosh) {
          this.audio.playGridIntroSwoosh();
        }
        if (this.audio.announceRacer && racer) {
          this.audio.announceRacer(racer.name, !!racer.isPlayer, pos);
        }
      }
      this.ui.updateGridBroadcast(activeRacerIndex);
    }

    const racer = this.gridIntroRacers[activeRacerIndex];
    const car = racer?.car || (activeRacerIndex === 0 ? this.playerCar : this.aiCars[activeRacerIndex - 1]);
    const carPos = car ? car.position : new THREE.Vector3(0, 0, 0);
    const carHeading = car ? car.rotationY : 0;
    const carLook = new THREE.Vector3(carPos.x, carPos.y + 0.45, carPos.z);

    const Fx = Math.sin(carHeading);
    const Fz = Math.cos(carHeading);
    const Rx = Math.cos(carHeading);
    const Rz = -Math.sin(carHeading);

    let targetCamPos = new THREE.Vector3();
    let targetLookTarget = carLook.clone();

    if (activeRacerIndex > 0) {
      // --- Rival Car Orbiting Camera Showcase ---
      const s = smoother(slotProgress);
      const col = (activeRacerIndex % 2 === 0) ? -1 : 1;

      // Rotating camera angle across front and side flank
      const phiStart = (col === -1) ? -1.25 : 1.25;
      const phiEnd = (col === -1) ? 0.45 : -0.45;
      const phi = phiStart + (phiEnd - phiStart) * s;

      const dist = 4.45 - Math.sin(s * Math.PI) * 0.35;
      const height = 0.95 + Math.sin(s * Math.PI) * 0.40;

      const Ox = dist * (Math.cos(phi) * Fx + Math.sin(phi) * Rx);
      const Oz = dist * (Math.cos(phi) * Fz + Math.sin(phi) * Rz);

      const orbitCamPos = new THREE.Vector3(carPos.x + Ox, carPos.y + height, carPos.z + Oz);
      const orbitLook = carLook.clone().addScaledVector(new THREE.Vector3(Fx, 0, Fz), 0.25);

      // Smooth jib-glide between cars during first 26% of the car's showcase
      const transitionWindow = 0.26;
      if (slotProgress < transitionWindow && this.slotStartCamPos && this.slotStartLookTarget) {
        const u = slotProgress / transitionWindow;
        const w = smoother(u);
        targetCamPos.lerpVectors(this.slotStartCamPos, orbitCamPos, w);
        targetLookTarget.lerpVectors(this.slotStartLookTarget, orbitLook, w);
      } else {
        targetCamPos.copy(orbitCamPos);
        targetLookTarget.copy(orbitLook);
      }
      this.camera.fov = 57;
      this.camera.updateProjectionMatrix();
    } else {
      // --- Player Car (Pole Position, P1): Dramatic 360°/180° Orbit & Swoop into Cockpit Chase Cam ---
      const p = slotProgress;
      const phase1Split = 0.58; // 0..0.58: Rotating showcase (~2.1s), 0.58..1.0: Swoop behind car (~1.5s)

      const chaseOffset = this.cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), carHeading);
      const chaseCamPos = carPos.clone().add(chaseOffset);
      const lookOffset = this.cameraLookOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), carHeading);
      const chaseLookTarget = carPos.clone().add(lookOffset);

      if (p < phase1Split) {
        const u = p / phase1Split;
        const s = smoother(u);

        // Wide dynamic orbit sweeping 140° across player car front and side
        const phi = -1.35 + s * 2.45;
        const dist = 4.35 - s * 0.45;
        const height = 0.80 + Math.sin(s * Math.PI) * 0.42;

        const Ox = dist * (Math.cos(phi) * Fx + Math.sin(phi) * Rx);
        const Oz = dist * (Math.cos(phi) * Fz + Math.sin(phi) * Rz);

        const orbitCamPos = new THREE.Vector3(carPos.x + Ox, carPos.y + height, carPos.z + Oz);
        const orbitLook = carLook.clone().addScaledVector(new THREE.Vector3(Fx, 0, Fz), 0.3);

        const transitionWindow = 0.22;
        if (p < transitionWindow && this.slotStartCamPos && this.slotStartLookTarget) {
          const tw = p / transitionWindow;
          const w = smoother(tw);
          targetCamPos.lerpVectors(this.slotStartCamPos, orbitCamPos, w);
          targetLookTarget.lerpVectors(this.slotStartLookTarget, orbitLook, w);
        } else {
          targetCamPos.copy(orbitCamPos);
          targetLookTarget.copy(orbitLook);
        }
        this.camera.fov = 57;
        this.camera.updateProjectionMatrix();
      } else {
        const u = (p - phase1Split) / (1 - phase1Split);
        const s = smoother(u);

        const phiEnd = -1.35 + 2.45;
        const distEnd = 3.9;
        const heightEnd = 0.80;
        const Ox = distEnd * (Math.cos(phiEnd) * Fx + Math.sin(phiEnd) * Rx);
        const Oz = distEnd * (Math.cos(phiEnd) * Fz + Math.sin(phiEnd) * Rz);
        const p1ExitPos = new THREE.Vector3(carPos.x + Ox, carPos.y + heightEnd, carPos.z + Oz);

        // Arching Bezier curve apex overhead
        const apexPos = carPos.clone()
          .addScaledVector(new THREE.Vector3(Fx, 0, Fz), -2.2)
          .add(new THREE.Vector3(0, 2.8, 0));

        const inv = 1 - s;
        const inv2 = inv * inv;
        const s2 = s * s;
        const midW = 2 * inv * s;

        targetCamPos.x = inv2 * p1ExitPos.x + midW * apexPos.x + s2 * chaseCamPos.x;
        targetCamPos.y = inv2 * p1ExitPos.y + midW * apexPos.y + s2 * chaseCamPos.y;
        targetCamPos.z = inv2 * p1ExitPos.z + midW * apexPos.z + s2 * chaseCamPos.z;

        targetLookTarget.lerpVectors(carLook, chaseLookTarget, s);
        this.camera.fov = THREE.MathUtils.lerp(57, 65, s);
        this.camera.updateProjectionMatrix();
      }
    }

    this.camera.position.copy(targetCamPos);
    this.camera.lookAt(targetLookTarget);

    this.lastLookTarget = targetLookTarget.clone();

    // Keep car models alive (wheels, underglow, idle visuals)
    if (this.playerCar) this.playerCar.updateVisuals(delta);
    this.aiCars.forEach(ai => ai.updateVisuals(delta));
    this.remotePlayers.forEach(r => {
      if (r.car) r.car.updateVisuals(delta);
    });
  }

  finishGridIntro() {
    if (this.state !== 'GRID_INTRO') return;

    if (this.audio && this.audio.stopSpeech) {
      this.audio.stopSpeech();
    }

    // Immediately snap camera to chase position behind player car
    if (this.playerCar) {
      const playerPos = this.playerCar.position;
      const playerRotY = this.playerCar.rotationY;
      const chaseOffset = this.cameraOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotY);
      this.camera.position.copy(playerPos).add(chaseOffset);

      const lookTargetOffset = this.cameraLookOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), playerRotY);
      this.camera.lookAt(playerPos.clone().add(lookTargetOffset));
      this.camera.fov = 65;
      this.camera.updateProjectionMatrix();
    }

    this.ui.hideGridIntro();
    this.ui.showView('hud');
    this.state = 'RACING';

    if (this.gridIntroOnComplete) {
      const cb = this.gridIntroOnComplete;
      this.gridIntroOnComplete = null;
      cb();
    }
  }

  startCountdown() {
    this.countdownActive = true;
    this.isRacing = false;

    if (this.playerCar) {
      this.playerCar.speed = 0;
      this.playerCar.inputs.throttle = 0;
      this.playerCar.inputs.steer = 0;
      this.playerCar.inputs.boost = false;
      this.playerCar.inputs.drift = false;
    }

    this.aiCars.forEach(ai => {
      ai.speed = 0;
      ai.inputs.throttle = 0;
      ai.inputs.steer = 0;
      ai.inputs.boost = false;
      ai.inputs.drift = false;
    });

    if (this.track && this.track.setStartLights) {
      this.track.setStartLights(0, false);
    }

    this.hud.playCountdown(
      (step) => {
        if (step === 3) {
          this.audio.playCountdown(440, 0.18);
          if (this.track && this.track.setStartLights) this.track.setStartLights(2, false);
        } else if (step === 2) {
          this.audio.playCountdown(440, 0.18);
          if (this.track && this.track.setStartLights) this.track.setStartLights(4, false);
        } else if (step === 1) {
          this.audio.playCountdown(440, 0.18);
          if (this.track && this.track.setStartLights) this.track.setStartLights(5, false);
        } else if (step === 'GO') {
          this.audio.playCountdown(880, 0.45);
          if (this.track && this.track.setStartLights) this.track.setStartLights(5, true);
          setTimeout(() => {
            if (this.track && this.track.setStartLights) this.track.setStartLights(0, false);
          }, 1500);
        }
      },
      () => {
        this.countdownActive = false;
        this.isRacing = true;
        this.raceStartTime = performance.now();
      }
    );
  }

  clearOpponents() {
    this.aiCars.forEach(ai => {
      if (ai.model) this.scene.remove(ai.model);
    });
    this.aiCars = [];

    this.remotePlayers.forEach(p => {
      if (p.car && p.car.model) this.scene.remove(p.car.model);
    });
    this.remotePlayers.clear();
  }

  // --- Multiplayer Lifecycle ---
  onMultiplayerStateChanged(lobbyState) {
    this.ui.updateLobbyPlayers(lobbyState.players, lobbyState.localPlayerId);
  }

  onMultiplayerStartRace(packet) {
    this.gameMode = 'multiplayer';
    this.state = 'RACING';
    this.audio.init();

    // Ensure garage showcase items are closed and world visuals restored
    if (this.garageCarMesh) {
      this.scene.remove(this.garageCarMesh.root);
      this.garageCarMesh = null;
    }
    if (this.garageGroup) {
      this.garageGroup.visible = false;
    }
    if (this.track && this.track.group) {
      this.track.group.visible = true;
    }
    if (this.decorations && this.decorations.group) {
      this.decorations.group.visible = true;
    }
    if (this.prevSceneBackground) {
      this.scene.background = this.prevSceneBackground;
      this.scene.fog = this.prevSceneFog;
      this.prevSceneBackground = null;
      this.prevSceneFog = null;
    }

    const settings = packet.settings || {};
    const trackId = settings.trackId || 'beach';
    const laps = settings.laps || 3;
    const aiCount = settings.aiCount || 0;

    if (!this.track || this.track.def.id !== trackId) {
      this.loadTrack(trackId);
    }

    const playerConfig = this.ui.getPlayerConfig();
    const carConfig = CARS.find(c => c.id === playerConfig.carId) || CARS[0];
    this.setupPlayerCar(carConfig, playerConfig.skinFileName, playerConfig.color, playerConfig.addons);
    this.playerCar.totalLaps = laps;

    this.clearOpponents();

    const playersList = Array.from(this.multiplayer.players.values());
    const myIndex = playersList.findIndex(p => p.id === this.multiplayer.localPlayerId);
    this.positionCarAtStart(this.playerCar, myIndex >= 0 ? myIndex : 0);

    // Remote Players
    playersList.forEach((p, idx) => {
      if (p.id !== this.multiplayer.localPlayerId) {
        const remoteCarDef = CARS.find(c => c.id === p.carId) || CARS[0];
        const remoteSkin = p.skinFileName || 'Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg';
        const remoteCar = new Car(remoteCarDef, remoteSkin, p.color, false);
        remoteCar.game = this;
        remoteCar.totalLaps = laps;
        const built = this.carBuilder.createCar(remoteCarDef.id, remoteSkin, p.color, true);
        remoteCar.setModel(built);
        this.scene.add(remoteCar.model);
        this.positionCarAtStart(remoteCar, idx);

        this.remotePlayers.set(p.id, {
          car: remoteCar,
          name: p.name,
          skinFileName: remoteSkin,
          targetPos: remoteCar.position.clone(),
          targetRotY: remoteCar.rotationY
        });
      }
    });

    // Fill with AI if requested by host
    if (aiCount > 0) {
      const startGridIdx = playersList.length;
      for (let i = 0; i < aiCount; i++) {
        const aiCarDef = CARS[i % CARS.length];
        const aiSkin = SKINS[i % SKINS.length].file;
        const ai = new AICar(aiCarDef, aiSkin, '#ff5500', `บอทอาชิ #${i + 1}`, (i % 2 === 0 ? -2.5 : 2.5), 0.88);
        ai.game = this;
        ai.totalLaps = laps;
        const built = this.carBuilder.createCar(aiCarDef.id, aiSkin, '#ff5500', true);
        ai.setModel(built);
        this.scene.add(ai.model);
        this.positionCarAtStart(ai, startGridIdx + i);
        this.aiCars.push(ai);
      }
    }

    const lineupRacers = [];
    playersList.forEach(p => {
      const isMe = p.id === this.multiplayer.localPlayerId;
      const cDef = CARS.find(c => c.id === p.carId) || CARS[0];
      const remote = this.remotePlayers.get(p.id);
      lineupRacers.push({
        name: p.name,
        carName: cDef.nameTh,
        carTag: cDef.tag || cDef.name,
        carId: cDef.id,
        skinFileName: p.skinFileName || 'Gemini_Generated_Image_4g9dic4g9dic4g9d.jpg',
        color: p.color,
        isPlayer: isMe,
        car: isMe ? this.playerCar : (remote?.car || null)
      });
    });

    this.aiCars.forEach(ai => {
      lineupRacers.push({
        name: ai.name,
        carName: ai.config?.nameTh || 'รถซิ่งอาชิ',
        carTag: ai.config?.tag || ai.config?.name || 'RIVAL',
        carId: ai.config?.id || 'gt',
        skinFileName: ai.skinFileName,
        color: ai.bodyColor,
        isPlayer: false,
        car: ai
      });
    });

    const stageTitle = this.track?.def ? `${this.track.def.icon || '🏁'} ${this.track.def.nameTh}` : 'MULTIPLAYER GRID';
    this.playGridIntro(lineupRacers, stageTitle, () => this.startCountdown());
  }

  onRemoteRacerTransform(data) {
    const remote = this.remotePlayers.get(data.peerId);
    if (!remote || !remote.car) return;

    remote.targetPos.set(data.x, data.y, data.z);
    remote.targetRotY = data.rotY;
    remote.car.speed = data.speed;
    remote.car.isDrifting = data.isDrifting;
    remote.car.boostTimer = data.boostTimer;
    remote.car.lap = data.lap;
    remote.car.totalDistance = data.totalDistance;
    remote.car.isFinished = data.isFinished;
  }

  onChatMessage(packet) {
    this.hud.showNotification(`${packet.senderName}: ${packet.message}`);
    this.hud.showReaction(packet.message, 3000);
  }

  sendEmote(text) {
    if (this.state === 'RACING') {
      this.hud.showReaction(text, 2500);
      if (this.gameMode === 'multiplayer') {
        this.multiplayer.sendChat(text);
      }
    }
  }

  // --- Garage Preview & 360 Turntable ---
  setupGarageEnvironment() {
    if (this.garageGroup) return;

    this.garageGroup = new THREE.Group();
    this.garageGroup.name = 'GarageShowroom';

    const cx = 0.3; // Center alignment matching turntable and car
    const cz = 0.0;

    // 1. High-Gloss Epoxy Showroom Floor
    const floorGeo = new THREE.PlaneGeometry(36, 36);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0f18,
      roughness: 0.18,
      metalness: 0.65
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(cx, -0.01, cz);
    floorMesh.receiveShadow = true;
    this.garageGroup.add(floorMesh);

    // Staging Perimeter Floor Lines (Cyan Neon Boundary)
    const stageLineMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.45 });
    const makeFloorLine = (w, h, px, pz) => {
      const g = new THREE.PlaneGeometry(w, h);
      g.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(g, stageLineMat);
      m.position.set(px, 0.005, pz);
      this.garageGroup.add(m);
    };
    makeFloorLine(11.0, 0.08, cx, cz - 5.5);
    makeFloorLine(11.0, 0.08, cx, cz + 5.5);
    makeFloorLine(0.08, 11.0, cx - 5.5, cz);
    makeFloorLine(0.08, 11.0, cx + 5.5, cz);

    // Hazard Stripes Staging Decals at Corners
    if (typeof document !== 'undefined') {
      const hazardCanvas = document.createElement('canvas');
      hazardCanvas.width = 256;
      hazardCanvas.height = 32;
      const hCtx = hazardCanvas.getContext('2d');
      if (hCtx) {
        hCtx.fillStyle = '#0a0d14';
        hCtx.fillRect(0, 0, 256, 32);
        hCtx.fillStyle = '#f59e0b';
        for (let i = -32; i < 288; i += 32) {
          hCtx.beginPath();
          hCtx.moveTo(i, 32);
          hCtx.lineTo(i + 20, 0);
          hCtx.lineTo(i + 36, 0);
          hCtx.lineTo(i + 16, 32);
          hCtx.closePath();
          hCtx.fill();
        }
        const hazardTex = new THREE.CanvasTexture(hazardCanvas);
        hazardTex.wrapS = THREE.RepeatWrapping;
        hazardTex.repeat.set(4, 1);
        const hazardMat = new THREE.MeshBasicMaterial({ map: hazardTex });
        const hStrip1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 0.28), hazardMat);
        hStrip1.rotateX(-Math.PI / 2);
        hStrip1.position.set(cx, 0.006, cz - 5.7);
        const hStrip2 = new THREE.Mesh(new THREE.PlaneGeometry(8, 0.28), hazardMat);
        hStrip2.rotateX(-Math.PI / 2);
        hStrip2.position.set(cx, 0.006, cz + 5.7);
        this.garageGroup.add(hStrip1, hStrip2);
      }
    }

    // 2. High-Tech Turntable Platform
    const platformGeo = new THREE.CylinderGeometry(3.7, 3.95, 0.24, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x141620,
      metalness: 0.84,
      roughness: 0.2
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.set(cx, 0.12, cz);
    platform.receiveShadow = true;
    this.garageGroup.add(platform);

    // Top Disc with brushed metallic finish
    const topDiscGeo = new THREE.CylinderGeometry(3.58, 3.58, 0.02, 64);
    const topDiscMat = new THREE.MeshStandardMaterial({
      color: 0x1e2230,
      metalness: 0.9,
      roughness: 0.32
    });
    const topDisc = new THREE.Mesh(topDiscGeo, topDiscMat);
    topDisc.position.set(cx, 0.245, cz);
    topDisc.receiveShadow = true;
    this.garageGroup.add(topDisc);

    // Outer Neon Glow Ring
    const neonRingGeo = new THREE.TorusGeometry(3.8, 0.035, 16, 64);
    neonRingGeo.rotateX(Math.PI / 2);
    const neonRingMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
    const neonRing = new THREE.Mesh(neonRingGeo, neonRingMat);
    neonRing.position.set(cx, 0.24, cz);
    this.garageGroup.add(neonRing);

    // Inner Grid Circle
    const innerRingGeo = new THREE.TorusGeometry(2.35, 0.015, 16, 64);
    innerRingGeo.rotateX(Math.PI / 2);
    const innerRingMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.4 });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.set(cx, 0.25, cz);
    this.garageGroup.add(innerRing);

    // Crosshair alignment marks on turntable
    const markGeo = new THREE.PlaneGeometry(0.04, 0.6);
    markGeo.rotateX(-Math.PI / 2);
    const markMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.5 });
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(markGeo, markMat);
      const angle = (i * Math.PI) / 2;
      m.position.set(cx + Math.sin(angle) * 2.8, 0.252, cz + Math.cos(angle) * 2.8);
      m.rotation.y = angle;
      this.garageGroup.add(m);
    }

    // Luminous Center Light Disc (Glow Puddle on Turntable)
    if (typeof document !== 'undefined') {
      const puddleCanvas = document.createElement('canvas');
      puddleCanvas.width = 256;
      puddleCanvas.height = 256;
      const pCtx = puddleCanvas.getContext('2d');
      if (pCtx) {
        const radGrad = pCtx.createRadialGradient(128, 128, 10, 128, 128, 128);
        radGrad.addColorStop(0, 'rgba(0, 243, 255, 0.55)');
        radGrad.addColorStop(0.35, 'rgba(0, 210, 255, 0.28)');
        radGrad.addColorStop(0.75, 'rgba(0, 210, 255, 0.08)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        pCtx.fillStyle = radGrad;
        pCtx.fillRect(0, 0, 256, 256);
        const puddleTex = new THREE.CanvasTexture(puddleCanvas);
        const puddleMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(7.2, 7.2),
          new THREE.MeshBasicMaterial({
            map: puddleTex,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            depthWrite: false
          })
        );
        puddleMesh.rotateX(-Math.PI / 2);
        puddleMesh.position.set(cx, 0.248, cz);
        this.garageGroup.add(puddleMesh);
      }
    }

    // 8 Stage Rim Uplight Beacons around Turntable
    const podChromeMat = new THREE.MeshStandardMaterial({ color: 0x222638, metalness: 0.9, roughness: 0.2 });
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const lx = cx + Math.sin(angle) * 3.82;
      const lz = cz + Math.cos(angle) * 3.82;
      const pod = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.10, 16), podChromeMat);
      pod.position.set(lx, 0.26, lz);
      const lensColor = i % 2 === 0 ? 0x00f3ff : 0xffffff;
      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.08, 16), new THREE.MeshBasicMaterial({ color: lensColor }));
      lens.rotateX(-Math.PI / 2);
      lens.position.set(lx, 0.312, lz);
      const uplight = new THREE.PointLight(lensColor, 0.95, 4.8);
      uplight.position.set(lx, 0.40, lz);
      this.garageGroup.add(pod, lens, uplight);
    }

    // Volumetric Spotlight Beam (Translucent light shaft shining down onto car)
    const coneGeo = new THREE.CylinderGeometry(0.7, 3.8, 6.2, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x88e8ff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const lightBeam = new THREE.Mesh(coneGeo, coneMat);
    lightBeam.position.set(cx, 3.4, cz);
    this.garageGroup.add(lightBeam);

    // Overhead Circular Studio Lighting Truss at Y = 5.6m
    const trussRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.06, 12, 32),
      new THREE.MeshStandardMaterial({ color: 0x2a3045, metalness: 0.85, roughness: 0.25 })
    );
    trussRing.rotateX(Math.PI / 2);
    trussRing.position.set(cx, 5.6, cz);
    this.garageGroup.add(trussRing);

    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const sx = cx + Math.sin(a) * 3.6;
      const sz = cz + Math.cos(a) * 3.6;
      const spotHousing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.16, 0.32, 12),
        podChromeMat
      );
      spotHousing.position.set(sx, 5.46, sz);
      spotHousing.lookAt(cx, 0.5, cz);
      this.garageGroup.add(spotHousing);
    }

    // 3. --- SHOWROOM 3D ARCHITECTURAL WALLS & BACKGROUND ---
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x111420,
      roughness: 0.68,
      metalness: 0.35
    });
    const columnMat = new THREE.MeshStandardMaterial({
      color: 0x181c2c,
      roughness: 0.52,
      metalness: 0.55
    });

    // BACK WALL (Z = cz - 12.6)
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(28, 8.5, 0.5), wallMat);
    backWall.position.set(cx, 4.25, cz - 12.6);
    this.garageGroup.add(backWall);

    // Architectural Vertical Columns along Back Wall
    [-11, -7.5, -4, 0.3, 4.5, 8, 11.5].forEach(colX => {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.45, 8.5, 0.35), columnMat);
      col.position.set(colX, 4.25, cz - 12.4);
      this.garageGroup.add(col);
    });

    // Horizontal Neon Accent Tubes on Back Wall
    const neonWallCyan = new THREE.Mesh(
      new THREE.BoxGeometry(27.6, 0.06, 0.08),
      new THREE.MeshBasicMaterial({ color: 0x00f3ff })
    );
    neonWallCyan.position.set(cx, 1.4, cz - 12.3);
    const neonWallAmber = new THREE.Mesh(
      new THREE.BoxGeometry(27.6, 0.06, 0.08),
      new THREE.MeshBasicMaterial({ color: 0xffaa00 })
    );
    neonWallAmber.position.set(cx, 5.2, cz - 12.3);
    this.garageGroup.add(neonWallCyan, neonWallAmber);

    // Massive 3D Illuminated Centerpiece Neon Billboard ("ASHI MOTORSPORT")
    if (typeof document !== 'undefined') {
      const signCanvas = document.createElement('canvas');
      signCanvas.width = 1024;
      signCanvas.height = 256;
      const sCtx = signCanvas.getContext('2d');
      if (sCtx) {
        // Dark Carbon Weave Texture
        sCtx.fillStyle = '#0a0d18';
        sCtx.fillRect(0, 0, 1024, 256);
        sCtx.strokeStyle = '#00f3ff';
        sCtx.lineWidth = 6;
        sCtx.strokeRect(12, 12, 1000, 232);

        // Inner glowing bevel
        sCtx.strokeStyle = '#ff0077';
        sCtx.lineWidth = 2;
        sCtx.strokeRect(20, 20, 984, 216);

        // Main Title
        sCtx.fillStyle = '#00f3ff';
        sCtx.font = 'bold 74px "Kanit", sans-serif';
        sCtx.textAlign = 'center';
        sCtx.shadowColor = '#00f3ff';
        sCtx.shadowBlur = 24;
        sCtx.fillText('⚡ ASHI MOTORSPORT ⚡', 512, 105);

        // Subtitle
        sCtx.shadowBlur = 10;
        sCtx.shadowColor = '#ffd700';
        sCtx.fillStyle = '#ffd700';
        sCtx.font = '600 32px "Kanit", sans-serif';
        sCtx.fillText('360° HYPER TUNING SHOWROOM • DIVISION 01', 512, 165);

        // Kanji / Japanese badge
        sCtx.shadowBlur = 0;
        sCtx.fillStyle = '#94a3b8';
        sCtx.font = 'bold 24px monospace';
        sCtx.fillText('「 アシ・レーシング • TOKYO SPEED LAB 」', 512, 212);

        const signTex = new THREE.CanvasTexture(signCanvas);
        const signMat = new THREE.MeshBasicMaterial({ map: signTex });
        const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(8.8, 2.3), signMat);
        signMesh.position.set(cx, 5.2, cz - 12.3);

        const signBacking = new THREE.Mesh(
          new THREE.BoxGeometry(9.0, 2.5, 0.12),
          new THREE.MeshStandardMaterial({ color: 0x060810, metalness: 0.9, roughness: 0.2 })
        );
        signBacking.position.set(cx, 5.2, cz - 12.37);

        this.garageGroup.add(signBacking, signMesh);
      }
    }

    // LEFT WALL (X = cx - 13.5) - Industrial Sectional Glass Garage Bay Door
    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.5, 26), wallMat);
    leftWall.position.set(cx - 13.5, 4.25, cz);
    this.garageGroup.add(leftWall);

    // Sectional Glass Roll-up Door Panels
    const glassDoorMat = new THREE.MeshStandardMaterial({
      color: 0x142032,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.75
    });
    const doorFrameMat = new THREE.MeshStandardMaterial({ color: 0x222638, metalness: 0.8, roughness: 0.3 });
    const garageDoor = new THREE.Mesh(new THREE.BoxGeometry(0.18, 5.8, 14), glassDoorMat);
    garageDoor.position.set(cx - 13.2, 3.0, cz);
    const garageDoorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6.2, 14.5), doorFrameMat);
    garageDoorFrame.position.set(cx - 13.2, 3.2, cz);
    this.garageGroup.add(garageDoor, garageDoorFrame);

    // Overhead Door Rollup Canister Drum
    const rollDrum = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 14.6, 24), doorFrameMat);
    rollDrum.position.set(cx - 13.1, 6.5, cz);
    this.garageGroup.add(rollDrum);

    // Wall-Mounted Status Terminal on Left Wall
    if (typeof document !== 'undefined') {
      const termCanvas = document.createElement('canvas');
      termCanvas.width = 512;
      termCanvas.height = 256;
      const tCtx = termCanvas.getContext('2d');
      if (tCtx) {
        tCtx.fillStyle = '#060a14';
        tCtx.fillRect(0, 0, 512, 256);
        tCtx.strokeStyle = '#00f3ff';
        tCtx.lineWidth = 4;
        tCtx.strokeRect(6, 6, 500, 244);
        tCtx.fillStyle = '#00f3ff';
        tCtx.font = 'bold 36px "Kanit", sans-serif';
        tCtx.fillText('BAY 01 // ACTIVE', 30, 60);
        tCtx.fillStyle = '#10b981';
        tCtx.font = '28px monospace';
        tCtx.fillText('STATUS: DYNO READY', 30, 110);
        tCtx.fillStyle = '#f59e0b';
        tCtx.fillText('TEMP: 21°C  HUMID: 48%', 30, 155);
        tCtx.fillStyle = '#94a3b8';
        tCtx.fillText('ECU TELEMETRY: CONNECTED', 30, 205);

        const termTex = new THREE.CanvasTexture(termCanvas);
        const termMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(2.4, 1.2),
          new THREE.MeshBasicMaterial({ map: termTex })
        );
        termMesh.position.set(cx - 13.2, 3.4, cz - 8.2);
        termMesh.rotation.y = Math.PI / 2;
        this.garageGroup.add(termMesh);
      }
    }

    // RIGHT WALL (X = cx + 13.5) - Professional Supercar Tuning Workshop
    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.5, 26), wallMat);
    rightWall.position.set(cx + 13.5, 4.25, cz);
    this.garageGroup.add(rightWall);

    // 1) Snap-On Red Mechanic Tool Cabinet Workstation
    const toolRedMat = new THREE.MeshStandardMaterial({ color: 0xd90429, metalness: 0.65, roughness: 0.25 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf8f9fa, metalness: 0.95, roughness: 0.1 });
    const toolBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.85, 3.8), toolRedMat);
    toolBody.position.set(cx + 12.9, 0.95, cz - 2.5);

    // Chrome Drawer Handles on Tool Cabinet
    [-0.8, -0.4, 0, 0.4, 0.8].forEach(dy => {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 3.2), chromeMat);
      handle.position.set(cx + 12.43, 0.95 + dy * 0.7, cz - 2.5);
      this.garageGroup.add(handle);
    });
    this.garageGroup.add(toolBody);

    // Mechanic Workstation Laptop on Top of Cabinet
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.55), chromeMat);
    laptopBase.position.set(cx + 12.8, 1.9, cz - 2.5);
    const laptopScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.35, 0.55),
      new THREE.MeshBasicMaterial({ color: 0x00f3ff })
    );
    laptopScreen.position.set(cx + 12.95, 2.06, cz - 2.5);
    laptopScreen.rotation.z = -0.15;
    this.garageGroup.add(laptopBase, laptopScreen);

    // 2) Stacks of Racing Slick Tires on Vertical Storage Racks
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x16161a, roughness: 0.9, metalness: 0.1 });
    const yellowSidewallMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const makeTire = (px, py, pz) => {
      const tGroup = new THREE.Group();
      tGroup.position.set(px, py, pz);
      const tMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.36, 24), tireMat);
      tMesh.rotateZ(Math.PI / 2);
      const stripeL = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.015, 8, 24), yellowSidewallMat);
      stripeL.rotateY(Math.PI / 2);
      stripeL.position.x = -0.185;
      tGroup.add(tMesh, stripeL);
      return tGroup;
    };

    // Stacks of 4 tires
    for (let i = 0; i < 4; i++) {
      this.garageGroup.add(makeTire(cx + 12.9, 0.2 + i * 0.38, cz + 2.0));
      this.garageGroup.add(makeTire(cx + 12.9, 0.2 + i * 0.38, cz + 3.2));
    }

    // 3) Racing Fuel Drums (102 Octane)
    const drumOrangeMat = new THREE.MeshStandardMaterial({ color: 0xea580c, metalness: 0.6, roughness: 0.3 });
    const drumBlackMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.7, roughness: 0.3 });
    const makeDrum = (px, pz, mat) => {
      const d = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.15, 24), mat);
      d.position.set(px, 0.58, pz);
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.02, 8, 24), chromeMat);
      ring1.rotateX(Math.PI / 2);
      ring1.position.y = 0.25;
      const ring2 = ring1.clone();
      ring2.position.y = -0.25;
      d.add(ring1, ring2);
      return d;
    };
    this.garageGroup.add(
      makeDrum(cx + 12.8, cz - 6.2, drumOrangeMat),
      makeDrum(cx + 12.8, cz - 7.2, drumBlackMat),
      makeDrum(cx + 12.0, cz - 6.7, drumOrangeMat)
    );

    // CEILING (Y = 8.2) with Exposed Steel Trusses
    const ceilingGeo = new THREE.PlaneGeometry(36, 36);
    ceilingGeo.rotateX(Math.PI / 2);
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x080a12, roughness: 0.9, metalness: 0.2 });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.position.set(cx, 8.2, cz);
    this.garageGroup.add(ceiling);

    // Steel Structural Trusses across ceiling
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x1e2436, metalness: 0.8, roughness: 0.3 });
    [-8, -3, 2, 7].forEach(tz => {
      const truss = new THREE.Mesh(new THREE.BoxGeometry(27.4, 0.45, 0.35), trussMat);
      truss.position.set(cx, 7.8, cz + tz);
      this.garageGroup.add(truss);
    });

    // 4. --- MODERN HEXAGONAL HONEYCOMB STUDIO CEILING LED GRID ---
    // Iconic supercar detailing bay ceiling lights with glowing white/cyan tubes
    const hexGroup = new THREE.Group();
    hexGroup.position.set(cx, 7.55, cz);
    const ledTubeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const createHexagonLED = (hx, hz, radius = 1.35) => {
      const g = new THREE.Group();
      g.position.set(hx, 0, hz);
      for (let i = 0; i < 6; i++) {
        const a1 = (i * Math.PI) / 3;
        const a2 = ((i + 1) * Math.PI) / 3;
        const x1 = Math.cos(a1) * radius;
        const z1 = Math.sin(a1) * radius;
        const x2 = Math.cos(a2) * radius;
        const z2 = Math.sin(a2) * radius;
        const len = Math.hypot(x2 - x1, z2 - z1);
        const tube = new THREE.Mesh(new THREE.BoxGeometry(len, 0.045, 0.06), ledTubeMat);
        tube.position.set((x1 + x2) / 2, 0, (z1 + z2) / 2);
        tube.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
        g.add(tube);
      }
      return g;
    };

    // 7 Interconnected Honeycomb Hexagons overhead
    hexGroup.add(createHexagonLED(0, 0, 1.4));
    for (let i = 0; i < 6; i++) {
      const ang = (i * Math.PI) / 3;
      hexGroup.add(createHexagonLED(Math.cos(ang) * 2.45, Math.sin(ang) * 2.45, 1.4));
    }
    this.garageGroup.add(hexGroup);

    // 5. --- PREMIUM AUTO SHOWROOM LIGHTING RIG ---
    // Studio Ambient Light for rich, vibrant car body paint reflection
    const garageAmbient = new THREE.AmbientLight(0xfff8ee, 1.25);
    this.garageGroup.add(garageAmbient);

    // Overhead Central Key Spotlight (High intensity, focused on car)
    const studioSpot = new THREE.SpotLight(0xffffff, 4.8, 28, Math.PI / 3.4, 0.45, 1.0);
    studioSpot.position.set(cx, 6.8, cz);
    studioSpot.target.position.set(cx, 0.4, cz);
    this.garageGroup.add(studioSpot);
    this.garageGroup.add(studioSpot.target);

    // Front Warm Stage Spotlight (Vividly illuminates front bumper, grille & headlights)
    const frontSpot = new THREE.SpotLight(0xfff5ea, 4.2, 22, Math.PI / 3.2, 0.4, 1.0);
    frontSpot.position.set(cx, 3.8, cz + 5.5);
    frontSpot.target.position.set(cx, 0.4, cz);
    this.garageGroup.add(frontSpot);
    this.garageGroup.add(frontSpot.target);

    // Dual Angled Front Floodlights
    const frontFillL = new THREE.DirectionalLight(0xdbeafe, 1.15);
    frontFillL.position.set(cx - 4.5, 4.2, cz + 4.5);
    const frontFillR = new THREE.DirectionalLight(0xfef3c7, 1.15);
    frontFillR.position.set(cx + 4.5, 4.2, cz + 4.5);
    this.garageGroup.add(frontFillL, frontFillR);

    // Cyan Rim Light (Left)
    const rimCyan = new THREE.PointLight(0x00f3ff, 2.8, 24);
    rimCyan.position.set(cx - 5.2, 3.0, cz - 3.8);
    this.garageGroup.add(rimCyan);

    // Pink/Magenta Rim Light (Right)
    const rimPink = new THREE.PointLight(0xff0066, 2.6, 24);
    rimPink.position.set(cx + 5.2, 3.0, cz - 3.8);
    this.garageGroup.add(rimPink);

    // Back Wall Neon Uplight
    const backWash = new THREE.SpotLight(0x00d2ff, 3.5, 26, Math.PI / 2.6, 0.5);
    backWash.position.set(cx, 1.0, cz - 10.0);
    backWash.target.position.set(cx, 5.2, cz - 12.4);
    this.garageGroup.add(backWash);
    this.garageGroup.add(backWash.target);

    this.garageGroup.visible = false;
    this.scene.add(this.garageGroup);
  }

  enterGaragePreview(carId, skinFileName, color, addons = null) {
    this.state = 'GARAGE';
    if (!this.garageGroup) {
      this.setupGarageEnvironment();
    }
    this.garageGroup.visible = true;

    // Hide playerCar, track, and decorations so there's never a second car or track clutter in garage
    if (this.playerCar && this.playerCar.model) {
      this.playerCar.model.visible = false;
    }
    if (this.track && this.track.group) {
      this.track.group.visible = false;
    }
    if (this.decorations && this.decorations.group) {
      this.decorations.group.visible = false;
    }

    // Save previous sky / fog and switch to clean dark luxury showroom atmosphere
    if (!this.prevSceneBackground) {
      this.prevSceneBackground = this.scene.background;
      this.prevSceneFog = this.scene.fog;
    }
    this.scene.background = new THREE.Color(0x0c0f1a);
    this.scene.fog = new THREE.FogExp2(0x0c0f1a, 0.006);

    if (this.garageCarMesh) {
      this.scene.remove(this.garageCarMesh.root);
      this.garageCarMesh = null;
    }

    const appliedAddons = addons || this.ui?.currentAddons;
    this.garageCarMesh = this.carBuilder.createCar(carId, skinFileName, color, false, appliedAddons);
    this.garageCarMesh.root.position.set(0.3, 0.25, 0);
    this.scene.add(this.garageCarMesh.root);

    this.updateGarageCamera(0.016);
  }

  updateGarageSkin(skinFileName) {
    if (this.state !== 'GARAGE') return;
    const car = this.ui.getSelectedCar();
    this.enterGaragePreview(car.id, skinFileName, this.ui.currentColor, this.ui.currentAddons);
  }

  updateGarageColor(color) {
    if (this.state !== 'GARAGE') return;
    const car = this.ui.getSelectedCar();
    this.enterGaragePreview(car.id, this.ui.getSelectedSkinFile(), color, this.ui.currentAddons);
  }

  updateGarageAddons(addons) {
    if (this.state !== 'GARAGE') return;
    const car = this.ui.getSelectedCar();
    this.enterGaragePreview(car.id, this.ui.getSelectedSkinFile(), this.ui.currentColor, addons);
  }

  exitGaragePreview() {
    if (this.garageCarMesh) {
      this.scene.remove(this.garageCarMesh.root);
      this.garageCarMesh = null;
    }
    if (this.garageGroup) {
      this.garageGroup.visible = false;
    }

    // Restore track, scenery, and scene background/fog
    if (this.track && this.track.group) {
      this.track.group.visible = true;
    }
    if (this.decorations && this.decorations.group) {
      this.decorations.group.visible = true;
    }
    if (this.prevSceneBackground) {
      this.scene.background = this.prevSceneBackground;
      this.scene.fog = this.prevSceneFog;
      this.prevSceneBackground = null;
      this.prevSceneFog = null;
    }

    // Update PlayerCar with new car, skin, color, and addons for main menu backdrop
    const playerConfig = this.ui.getPlayerConfig();
    const carConfig = CARS.find(c => c.id === playerConfig.carId) || CARS[0];
    this.setupPlayerCar(carConfig, playerConfig.skinFileName, playerConfig.color, playerConfig.addons);
    this.positionCarAtStart(this.playerCar, 0);
    if (this.playerCar && this.playerCar.model) {
      this.playerCar.model.visible = true;
    }

    this.state = 'MENU';
  }

  // --- 360° Orbit Inspection Camera ---
  updateGarageCamera(delta) {
    if (this.garageAutoSpin && !this.garageIsDragging) {
      this.garageTargetAngle += delta * 0.32;
    }

    // Smooth damping for fluid, cinematic 360 orbit
    this.garageAngle = THREE.MathUtils.damp(this.garageAngle, this.garageTargetAngle, 12, delta);
    this.garagePitch = THREE.MathUtils.damp(this.garagePitch, this.garageTargetPitch, 12, delta);
    this.garageDistance = THREE.MathUtils.damp(this.garageDistance, this.garageTargetDistance, 12, delta);

    // Look target slightly offset to the right so car is framed outside left HUD
    const cx = 0.3;
    const cy = 0.72;
    const cz = 0;

    const horizontalDist = this.garageDistance * Math.cos(this.garagePitch);
    const camY = cy + this.garageDistance * Math.sin(this.garagePitch);
    const camX = cx + Math.sin(this.garageAngle) * horizontalDist;
    const camZ = cz + Math.cos(this.garageAngle) * horizontalDist;

    this.camera.position.set(camX, camY, camZ);
    this.camera.lookAt(cx, cy, cz);

    if (this.garageCarMesh && this.garageCarMesh.root) {
      this.garageCarMesh.root.position.set(cx, 0.25, cz);
    }
  }

  toggleGarageAutoSpin() {
    this.garageAutoSpin = !this.garageAutoSpin;
    return this.garageAutoSpin;
  }

  rotateGarageBy(deltaAngle) {
    this.garageTargetAngle += deltaAngle;
  }

  zoomGarageBy(deltaZoom) {
    this.garageTargetDistance = Math.max(2.8, Math.min(10.5, this.garageTargetDistance + deltaZoom));
  }

  setGarageCameraAngle(angle, pitch = null, dist = null) {
    this.garageTargetAngle = angle;
    if (pitch !== null) this.garageTargetPitch = pitch;
    if (dist !== null) this.garageTargetDistance = dist;
  }

  // --- Main Loop ---
  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = Math.min(this.clock.getDelta(), 0.08);

    if (this.state === 'GARAGE') {
      this.updateGarageCamera(delta);
      this.renderer.render(this.scene, this.camera);
      return;
    }

    if (this.state === 'MENU' || this.state === 'STAGE_SELECT' || this.state === 'LOBBY') {
      const time = performance.now() * 0.0003;
      const camX = Math.cos(time) * 45;
      const camZ = Math.sin(time) * 45 + 20;
      this.camera.position.set(camX, 15, camZ);
      this.camera.lookAt(0, 2, 20);
      if (this.decorations) this.decorations.update(delta, this.camera);
      this.renderer.render(this.scene, this.camera);
      return;
    }

    if (this.state === 'GRID_INTRO') {
      this.updateGridIntro(delta);
      if (this.track) this.track.update(delta);
      if (this.decorations) this.decorations.update(delta, this.camera);
      if (this.particles) this.particles.update(delta, this.camera);
      this.renderer.render(this.scene, this.camera);
      return;
    }

    if (this.state === 'RACING') {
      this.updateRace(delta);
    } else if (this.state === 'VICTORY') {
      this.updateVictoryScene(delta);
    }

    if (this.track) this.track.update(delta);
    if (this.decorations) this.decorations.update(delta, this.camera);
    if (this.particles) this.particles.update(delta, this.camera);

    this.renderer.render(this.scene, this.camera);
  }

  updateRace(delta) {
    if (!this.isRacing) {
      // บอทและผู้เล่นไม่ออกรถไปก่อน: หยุดนิ่งอยู่กับที่บนกริดสตาร์ทจนกว่าสัญญาณ GO จะเริ่ม
      if (this.playerCar) {
        this.playerCar.inputs.throttle = 0;
        this.playerCar.inputs.steer = 0;
        this.playerCar.inputs.boost = false;
        this.playerCar.inputs.drift = false;
        this.playerCar.speed = 0;
        this.playerCar.updateVisuals(delta);
      }

      this.aiCars.forEach(ai => {
        ai.inputs.throttle = 0;
        ai.inputs.steer = 0;
        ai.inputs.boost = false;
        ai.inputs.drift = false;
        ai.speed = 0;
        ai.updateVisuals(delta);
      });

      this.audio.updateEngine(0, 0, false, false);
      this.updateCamera(delta);
      return;
    }

    // 1. Process Player Controls
    this.updatePlayerInputs();
    this.playerCar.update(delta, this.track);

    // Audio update for player engine
    this.audio.updateEngine(
      this.playerCar.getSpeedKmh(),
      this.playerCar.inputs.throttle,
      this.playerCar.isDrifting,
      this.playerCar.boostTimer > 0
    );

    // Nitro sound trigger
    if (this.playerCar.boostTimer > 1.95 && this.playerCar.inputs.boost) {
      this.audio.playBoostSound();
      this.hud.showReaction('🚀 บูสต์ติดจรวด!', 1200);
    }

    // Tire smoke particles on drift
    if (this.playerCar.isDrifting) {
      const smokePosL = this.playerCar.position.clone().add(new THREE.Vector3(-0.6, 0.1, -1.0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.playerCar.rotationY));
      const smokePosR = this.playerCar.position.clone().add(new THREE.Vector3(0.6, 0.1, -1.0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.playerCar.rotationY));
      this.particles.emitTireSmoke(smokePosL);
      this.particles.emitTireSmoke(smokePosR);

      // Mini-turbo sparks
      if (this.playerCar.driftLevel > 0) {
        this.particles.emitDriftSparks(smokePosL, this.playerCar.driftLevel);
        this.particles.emitDriftSparks(smokePosR, this.playerCar.driftLevel);
      }
    }

    // Exhaust Nitro Flames
    if (this.playerCar.boostTimer > 0 && this.playerCar.exhaustPipes) {
      this.particles.emitExhaustFlame(this.playerCar.exhaustPipes, true);
    }

    // 2. Update AI Cars
    const allRacerCars = [
      this.playerCar,
      ...this.aiCars,
      ...Array.from(this.remotePlayers.values()).map(r => r.car)
    ];

    this.aiCars.forEach(ai => {
      ai.updateAI(delta, this.track, this.playerCar, allRacerCars);
      if (ai.isDrifting) {
        this.particles.emitTireSmoke(ai.position);
      }
    });

    // 3. Resolve Car-to-Car Collisions (รถชนกันความเร็วตกฮวบ)
    this.resolveCarCollisions(delta);

    // 3. Update Remote Multiplayer Cars (Interpolation)
    this.remotePlayers.forEach(remote => {
      remote.car.position.lerp(remote.targetPos, delta * 15);
      remote.car.rotationY = THREE.MathUtils.lerp(remote.car.rotationY, remote.targetRotY, delta * 15);
      remote.car.updateVisuals(delta);
    });

    // 4. Update Item System (Boxes, Bananas, Missiles)
    if (this.items) {
      const opponents = [
        ...this.aiCars,
        ...Array.from(this.remotePlayers.values()).map(r => r.car)
      ];
      this.items.update(delta, this.playerCar, opponents);
    }

    // 5. Send Multiplayer Network Packet at ~25Hz
    if (this.gameMode === 'multiplayer' && this.isRacing) {
      const now = performance.now();
      if (!this.lastNetPacket || now - this.lastNetPacket > 40) {
        this.lastNetPacket = now;
        this.multiplayer.sendTransform({
          x: this.playerCar.position.x,
          y: this.playerCar.position.y,
          z: this.playerCar.position.z,
          rotY: this.playerCar.rotationY,
          speed: this.playerCar.speed,
          isDrifting: this.playerCar.isDrifting,
          boostTimer: this.playerCar.boostTimer,
          lap: this.playerCar.lap,
          totalDistance: this.playerCar.totalDistance,
          isFinished: this.playerCar.isFinished
        });
      }
    }

    // 6. Compute Real-time Rankings
    const allRacers = [
      { name: this.ui.playerName, car: this.playerCar, isPlayer: true, carName: this.playerCar.config.nameTh, skinFileName: this.playerCar.skinFileName },
      ...this.aiCars.map(ai => ({ name: ai.name, car: ai, isPlayer: false, carName: ai.config.nameTh, skinFileName: ai.skinFileName })),
      ...Array.from(this.remotePlayers.values()).map(r => ({ name: r.name, car: r.car, isPlayer: false, carName: r.car.config.nameTh, skinFileName: r.skinFileName }))
    ];

    allRacers.sort((a, b) => b.car.totalDistance - a.car.totalDistance);
    const playerRank = allRacers.findIndex(r => r.isPlayer) + 1;

    // 7. Update HUD & Minimap
    this.hud.update(this.playerCar, playerRank, allRacers.length);
    if (this.minimap) {
      this.minimap.render(this.playerCar, allRacers.filter(r => !r.isPlayer).map(r => r.car));
    }

    // 8. Check Victory / Finish Condition
    if (this.playerCar.isFinished && this.state !== 'VICTORY') {
      this.state = 'VICTORY';
      this.audio.playVictoryChime();

      const totalTime = (performance.now() - this.raceStartTime) / 1000;
      const results = allRacers.map(r => ({
        name: r.name,
        carName: r.carName,
        skinFileName: r.skinFileName,
        isPlayer: r.isPlayer,
        totalTime: r.isPlayer ? totalTime : totalTime + (Math.random() * 4 - 2),
        bestLap: r.car.bestLapTime || totalTime / 3
      }));

      setTimeout(() => {
        this.ui.showVictoryScreen(results);
      }, 1500);
    }

    // 9. Dynamic Camera Follow
    this.updateCamera(delta);
  }

  resolveCarCollisions(delta) {
    if (!this.isRacing) return;
    const cars = [this.playerCar, ...this.aiCars];
    const collisionRadius = 2.1;
    const minDist = collisionRadius * 2;

    for (let i = 0; i < cars.length; i++) {
      for (let j = i + 1; j < cars.length; j++) {
        const carA = cars[i];
        const carB = cars[j];
        if (!carA || !carB) continue;

        const diff = new THREE.Vector3().subVectors(carA.position, carB.position);
        diff.y = 0;
        const dist = diff.length();

        if (dist > 0.001 && dist < minDist) {
          const overlap = minDist - dist;
          const normal = diff.normalize();

          // เด้งแยกออกจากกันเบาๆ นุ่มนวล ไม่สะบัดหรือหมุนติ้ว
          carA.position.addScaledVector(normal, overlap * 0.5);
          carB.position.addScaledVector(normal, -overlap * 0.5);

          const now = performance.now();
          const lastHitA = carA.lastCarHitTime || 0;
          const lastHitB = carB.lastCarHitTime || 0;

          if (now - lastHitA > 400 && now - lastHitB > 400) {
            carA.lastCarHitTime = now;
            carB.lastCarHitTime = now;

            // ตอนที่ชน ความเร็วจะลดลงอย่างมาก (Severe collision speed penalty)
            carA.speed = Math.max(0, carA.speed * 0.52);
            carB.speed = Math.max(0, carB.speed * 0.52);

            // ตัดบูสต์เมื่อชน
            carA.boostTimer = 0;
            carB.boostTimer = 0;

            if (this.audio) this.audio.playCollision();
            if (this.particles) {
              const midPoint = new THREE.Vector3().addVectors(carA.position, carB.position).multiplyScalar(0.5);
              this.particles.emitDriftSparks(midPoint, 2);
            }

            if ((carA.isPlayer || carB.isPlayer) && this.hud) {
              this.hud.showReaction('💥 ชนกับคู่แข่ง! ความเร็วตกฮวบ', 1200);
            }
          }
        }
      }
    }
  }

  updateVictoryScene(delta) {
    if (!this.playerCar) return;

    // Decelerate cars to a clean halt
    if (this.playerCar.speed > 0) {
      this.playerCar.speed = Math.max(0, this.playerCar.speed - 22 * delta);
      this.playerCar.updatePhysics(delta, this.track);
    }
    this.playerCar.updateVisuals(delta);

    this.aiCars.forEach(ai => {
      if (ai.speed > 0) {
        ai.speed = Math.max(0, ai.speed - 22 * delta);
        ai.updatePhysics(delta, this.track);
      }
      ai.updateVisuals(delta);
    });

    // Smooth cinematic orbit camera around the winning car / finish area
    this.victoryCameraAngle = (this.victoryCameraAngle || 0) + delta * 0.32;
    const center = this.playerCar.position;
    const camDist = 8.5;
    const camHeight = 3.0;

    this.camera.position.set(
      center.x + Math.sin(this.victoryCameraAngle) * camDist,
      center.y + camHeight,
      center.z + Math.cos(this.victoryCameraAngle) * camDist
    );
    this.camera.lookAt(center.x, center.y + 0.9, center.z);

    // Periodic 3D fireworks celebration
    this.victoryFireworkTimer = (this.victoryFireworkTimer || 0) + delta;
    if (this.victoryFireworkTimer > 0.4) {
      this.victoryFireworkTimer = 0;
      if (this.particles) {
        const offset = new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          4.0 + Math.random() * 4.5,
          (Math.random() - 0.5) * 16
        );
        this.particles.emitCelebrationFirework(center.clone().add(offset));
      }
    }
  }

  updateCamera(delta) {
    if (!this.playerCar) return;

    const carPos = this.playerCar.position;
    const carRotY = this.playerCar.rotationY;

    let offset = this.cameraOffset;
    let lookTargetOffset = this.cameraLookOffset;

    if (this.cameraMode === 1) {
      offset = new THREE.Vector3(0, 2.5, -5.0);
      lookTargetOffset = new THREE.Vector3(0, 1.0, 3.5);
    } else if (this.cameraMode === 2) {
      offset = new THREE.Vector3(0, 1.2, 0.4);
      lookTargetOffset = new THREE.Vector3(0, 1.1, 12);
    }

    const speedRatio = Math.min(1.0, Math.abs(this.playerCar.speed) / 55);
    const boostBoost = (this.playerCar.boostTimer > 0) ? 14 : 0;
    const targetFov = 65 + (speedRatio * 16) + boostBoost;
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFov, delta * 6);
    this.camera.updateProjectionMatrix();

    const rotatedOffset = offset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotY);
    const targetCamPos = carPos.clone().add(rotatedOffset);

    this.camera.position.lerp(targetCamPos, delta * 12);

    const rotatedLookTarget = lookTargetOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), carRotY);
    const lookAtPos = carPos.clone().add(rotatedLookTarget);
    this.camera.lookAt(lookAtPos);
  }

  initInputs() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      // Skip Starting Grid Intro on Space, Enter, or Escape
      if (this.state === 'GRID_INTRO' && (e.code === 'Space' || e.code === 'Enter' || e.code === 'Escape')) {
        this.finishGridIntro();
        return;
      }

      // Switch camera view
      if (e.code === 'KeyC') {
        this.cameraMode = (this.cameraMode + 1) % 3;
        const modes = ['กล้อง: ตามหลังมุมกว้าง', 'กล้อง: ระยะประชิด', 'กล้อง: หน้ารถ'];
        this.hud.showReaction(modes[this.cameraMode], 1200);
      }

      // Use Item with Q or F
      if ((e.code === 'KeyQ' || e.code === 'KeyF') && this.state === 'RACING') {
        if (this.items) {
          this.items.useItem(this.playerCar);
        }
      }

      // Respawn shortcut
      if (e.code === 'KeyR' && this.state === 'RACING') {
        this.playerCar.respawn(this.track);
        this.hud.showReaction('🔄 รีเซ็ตรถกลับแทร็ก!', 1200);
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Mobile / Touch controls
    const bindTouch = (id, keyName) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('touchstart', (e) => { e.preventDefault(); this.keys[keyName] = true; });
      el.addEventListener('touchend', (e) => { e.preventDefault(); this.keys[keyName] = false; });
      el.addEventListener('mousedown', () => { this.keys[keyName] = true; });
      el.addEventListener('mouseup', () => { this.keys[keyName] = false; });
    };

    bindTouch('btn-touch-gas', 'KeyW');
    bindTouch('btn-touch-brake', 'KeyS');
    bindTouch('btn-touch-left', 'KeyA');
    bindTouch('btn-touch-right', 'KeyD');
    bindTouch('btn-touch-drift', 'Space');
    bindTouch('btn-touch-boost', 'ShiftLeft');
    bindTouch('btn-touch-item', 'KeyQ');

    // --- Garage 360° Interactive Orbit Drag & Zoom Handlers ---
    window.addEventListener('pointerdown', (e) => {
      if (this.state !== 'GARAGE') return;
      if (e.target.closest('.garage-console') || 
          e.target.closest('.garage-topbar') || 
          e.target.closest('.garage-turntable-controls') || 
          e.target.closest('button') || 
          e.target.closest('input') ||
          e.target.closest('.color-swatch') ||
          e.target.closest('.addon-pill') ||
          e.target.closest('.skin-card')) {
        return;
      }
      this.garageIsDragging = true;
      this.garageDragPrevX = e.clientX;
      this.garageDragPrevY = e.clientY;
    });

    window.addEventListener('pointermove', (e) => {
      if (this.state !== 'GARAGE' || !this.garageIsDragging) return;
      const dx = e.clientX - this.garageDragPrevX;
      const dy = e.clientY - this.garageDragPrevY;
      this.garageDragPrevX = e.clientX;
      this.garageDragPrevY = e.clientY;

      this.garageTargetAngle -= dx * 0.0075;
      this.garageTargetPitch = Math.max(-0.06, Math.min(1.22, this.garageTargetPitch + dy * 0.0065));
    });

    window.addEventListener('pointerup', () => {
      this.garageIsDragging = false;
    });

    window.addEventListener('pointercancel', () => {
      this.garageIsDragging = false;
    });

    window.addEventListener('wheel', (e) => {
      if (this.state !== 'GARAGE') return;
      if (e.target.closest('.garage-tab-scroll') || e.target.closest('.skins-scroll-grid')) {
        return; // Allow native list scrolling
      }
      e.preventDefault();
      this.zoomGarageBy(e.deltaY * 0.005);
    }, { passive: false });
  }

  updatePlayerInputs() {
    let throttle = 0;
    let steer = 0;

    // Keyboard
    if (this.keys['KeyW'] || this.keys['ArrowUp']) throttle += 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) throttle -= 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) steer += 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) steer -= 1;

    // Gamepad API support
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    if (gamepads && gamepads[0]) {
      const gp = gamepads[0];
      if (Math.abs(gp.axes[0]) > 0.15) steer -= gp.axes[0];
      if (gp.buttons[7] && gp.buttons[7].value > 0.1) throttle += gp.buttons[7].value;
      if (gp.buttons[6] && gp.buttons[6].value > 0.1) throttle -= gp.buttons[6].value;
      if (gp.buttons[0] && gp.buttons[0].pressed) this.keys['ShiftLeft'] = true;
      if (gp.buttons[2] && gp.buttons[2].pressed) this.keys['Space'] = true;
      if (gp.buttons[1] && gp.buttons[1].pressed) {
        if (this.items) this.items.useItem(this.playerCar);
      }
    }

    this.playerCar.inputs.throttle = throttle;
    this.playerCar.inputs.steer = steer;
    this.playerCar.inputs.drift = !!this.keys['Space'];
    this.playerCar.inputs.boost = !!(this.keys['ShiftLeft'] || this.keys['ShiftRight'] || this.keys['KeyE']);
  }

  restartRace() {
    this.startSinglePlayer(this.gameMode, this.currentTrackId, this.currentDifficulty, this.currentLaps);
  }

  exitToMainMenu() {
    if (this.audio && this.audio.stopSpeech) {
      this.audio.stopSpeech();
    }
    this.clearOpponents();
    this.state = 'MENU';
    this.audio.updateEngine(0, 0, false, false);
    this.positionCarAtStart(this.playerCar, 0);
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
