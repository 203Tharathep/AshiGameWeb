// 100% Procedural Audio Synthesizer & Speech Cadence Engine for Sister Location
// Faithful translation of Unity ProceduralAudioSynthesizer.cs using Web Audio API

export class ProceduralAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.sampleRate = 22050;

    this.cachedBuffers = {};
    this.ambientSource = null;
    this.musicBoxSource = null;
    this.activeVoiceNode = null;

    this.activeSpeaker = '';
    this.activeSubtitle = '';
    this.subtitleTimer = 0;
    this.dialogueQueue = [];

    this.isMuted = false;
    this.musicBoxGain = null;
    this.musicBoxPan = null;
    this.ambientGain = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx({ sampleRate: this.sampleRate });
        this.prewarmCommonBuffers();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  prewarmCommonBuffers() {
    if (!this.ctx) return;
    this.cachedBuffers['shock'] = this._generateShockBuffer();
    this.cachedBuffers['honk'] = this._generateHonkBuffer();
    this.cachedBuffers['vent_crawl'] = this._generateVentCrawlBuffer();
    this.cachedBuffers['flash_beacon'] = this._generateFlashBeaconBuffer();
    this.cachedBuffers['springlock_wind'] = this._generateSpringlockBuffer();
    this.cachedBuffers['door_slam'] = this._generateDoorSlamBuffer();
    this.cachedBuffers['jumpscare'] = this._generateJumpscareBuffer();
    this.cachedBuffers['chime'] = this._generateChimeBuffer();
    this.cachedBuffers['crumbling_dreams'] = this._generateCrumblingDreamsBuffer();
    this.cachedBuffers['casual_bongos'] = this._generateCasualBongosBuffer();
    this.cachedBuffers['elevator_hum'] = this._generateElevatorHumBuffer();
  }

  update(deltaTime) {
    if (this.subtitleTimer > 0) {
      this.subtitleTimer -= deltaTime;
      if (this.subtitleTimer <= 0) {
        if (this.dialogueQueue.length > 0) {
          this._playNextQueuedLine();
        } else {
          this.activeSpeaker = '';
          this.activeSubtitle = '';
        }
      }
    } else if (this.dialogueQueue.length > 0) {
      this._playNextQueuedLine();
    }
  }

  clearDialogue() {
    this.dialogueQueue = [];
    this.subtitleTimer = 0;
    this.activeSpeaker = '';
    this.activeSubtitle = '';
    if (this.activeVoiceNode) {
      try { this.activeVoiceNode.stop(); } catch (e) {}
      this.activeVoiceNode = null;
    }
  }

  speak(speaker, text, profile = 'HandUnit', duration = 4.5, interrupt = false) {
    this.ensureContext();
    if (interrupt) {
      this.clearDialogue();
    }
    this.dialogueQueue.push({
      speaker,
      text,
      profile,
      duration: Math.max(1.8, duration)
    });
    if (this.subtitleTimer <= 0) {
      this._playNextQueuedLine();
    }
  }

  _playNextQueuedLine() {
    if (this.dialogueQueue.length === 0) return;
    const line = this.dialogueQueue.shift();
    this.activeSpeaker = line.speaker;
    this.activeSubtitle = line.text;
    this.subtitleTimer = line.duration;

    if (!this.ctx) return;
    try {
      const voiceBuf = this._generateVoiceCadenceBuffer(line.text, line.profile, Math.min(line.duration, 3.5));
      const src = this.ctx.createBufferSource();
      src.buffer = voiceBuf;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.45;
      src.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();
      this.activeVoiceNode = src;
    } catch (e) {
      // Audio fallback
    }
  }

  playSfx(key, volume = 0.8, panStereo = 0) {
    this.ensureContext();
    if (!this.ctx) return;
    const buf = this.cachedBuffers[key];
    if (!buf) return;

    try {
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      const gain = this.ctx.createGain();
      gain.gain.value = volume;

      if (this.ctx.createStereoPanner && panStereo !== 0) {
        const pan = this.ctx.createStereoPanner();
        pan.pan.value = Math.max(-1, Math.min(1, panStereo));
        src.connect(pan);
        pan.connect(gain);
      } else {
        src.connect(gain);
      }

      gain.connect(this.ctx.destination);
      src.start();
    } catch (e) {}
  }

  setMusicBoxStage(stage, panStereo = 0) {
    // stage 0=off, 1=distant, 2=medium, 3=loud danger
    this.ensureContext();
    if (!this.ctx) return;

    if (stage <= 0) {
      if (this.musicBoxSource) {
        try { this.musicBoxSource.stop(); } catch (e) {}
        this.musicBoxSource = null;
      }
      return;
    }

    if (!this.musicBoxSource) {
      const buf = this.cachedBuffers['crumbling_dreams'];
      if (!buf) return;
      this.musicBoxSource = this.ctx.createBufferSource();
      this.musicBoxSource.buffer = buf;
      this.musicBoxSource.loop = true;

      this.musicBoxGain = this.ctx.createGain();
      if (this.ctx.createStereoPanner) {
        this.musicBoxPan = this.ctx.createStereoPanner();
        this.musicBoxSource.connect(this.musicBoxPan);
        this.musicBoxPan.connect(this.musicBoxGain);
      } else {
        this.musicBoxSource.connect(this.musicBoxGain);
      }
      this.musicBoxGain.connect(this.ctx.destination);
      this.musicBoxSource.start();
    }

    if (this.musicBoxGain) {
      const targetVol = stage === 1 ? 0.16 : (stage === 2 ? 0.45 : 0.92);
      this.musicBoxGain.gain.setValueAtTime(targetVol, this.ctx.currentTime);
    }
    if (this.musicBoxPan && this.ctx.createStereoPanner) {
      this.musicBoxPan.pan.setValueAtTime(Math.max(-1, Math.min(1, panStereo)), this.ctx.currentTime);
    }
    if (this.musicBoxSource) {
      this.musicBoxSource.playbackRate.setValueAtTime(stage === 3 ? 1.04 : 1.0, this.ctx.currentTime);
    }
  }

  startAmbientLoop(loopKey, volume = 0.28) {
    this.ensureContext();
    if (!this.ctx) return;
    const buf = this.cachedBuffers[loopKey];
    if (!buf) return;

    this.stopAmbientLoop();

    try {
      this.ambientSource = this.ctx.createBufferSource();
      this.ambientSource.buffer = buf;
      this.ambientSource.loop = true;

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.value = volume;
      this.ambientSource.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);
      this.ambientSource.start();
    } catch (e) {}
  }

  stopAmbientLoop() {
    if (this.ambientSource) {
      try { this.ambientSource.stop(); } catch (e) {}
      this.ambientSource = null;
    }
  }

  // --- MATHEMATICAL PROCEDURAL AUDIO BUFFER GENERATORS ---

  _createBuffer(durationSec) {
    const samples = Math.max(1024, Math.round(this.sampleRate * durationSec));
    return this.ctx.createBuffer(1, samples, this.sampleRate);
  }

  _generateShockBuffer() {
    const buf = this._createBuffer(0.6);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const decay = Math.exp(-t * 3.5);
      const buzz = (t * 60) % 1.0 > 0.5 ? 0.6 : -0.6;
      const noise = (Math.random() * 2 - 1) * 0.45;
      data[i] = (buzz + noise) * decay;
    }
    return buf;
  }

  _generateHonkBuffer() {
    const buf = this._createBuffer(0.35);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const decay = Math.exp(-t * 6);
      const tone1 = Math.sin(2 * Math.PI * 523.25 * t);
      const tone2 = Math.sin(2 * Math.PI * 659.25 * t);
      data[i] = (tone1 * 0.5 + tone2 * 0.5) * decay;
    }
    return buf;
  }

  _generateVentCrawlBuffer() {
    const buf = this._createBuffer(0.3);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const decay = Math.exp(-t * 18);
      const lowThump = Math.sin(2 * Math.PI * 85 * t);
      const metalClang = Math.sin(2 * Math.PI * 440 * t) * 0.35;
      data[i] = (lowThump + metalClang) * decay;
    }
    return buf;
  }

  _generateFlashBeaconBuffer() {
    const buf = this._createBuffer(0.45);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const pop = Math.exp(-t * 40) * (Math.random() * 2 - 1);
      const whineFreq = 1200 + t * 4000;
      const whine = Math.sin(2 * Math.PI * whineFreq * t) * 0.25 * Math.exp(-t * 3);
      data[i] = pop * 0.7 + whine;
    }
    return buf;
  }

  _generateSpringlockBuffer() {
    const buf = this._createBuffer(0.12);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      data[i] = Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t * 50);
    }
    return buf;
  }

  _generateDoorSlamBuffer() {
    const buf = this._createBuffer(0.7);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const lowImpact = Math.sin(2 * Math.PI * 55 * t) * Math.exp(-t * 7);
      const clang = (Math.random() * 2 - 1) * Math.exp(-t * 22) * 0.5;
      data[i] = lowImpact * 0.8 + clang;
    }
    return buf;
  }

  _generateJumpscareBuffer() {
    const buf = this._createBuffer(1.4);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const mod = Math.sin(2 * Math.PI * 45 * t);
      const s1 = Math.sin(2 * Math.PI * (820 + mod * 120) * t);
      const s2 = Math.sin(2 * Math.PI * (1180 - mod * 150) * t);
      const noise = (Math.random() * 2 - 1) * 0.4;
      data[i] = (s1 * 0.35 + s2 * 0.35 + noise) * Math.min(1.0, 1.4 - t * 0.7);
    }
    return buf;
  }

  _generateChimeBuffer() {
    const buf = this._createBuffer(0.35);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const bell = Math.sin(2 * Math.PI * 880 * t) * Math.exp(-t * 9) +
                   Math.sin(2 * Math.PI * 1760 * t) * Math.exp(-t * 14) * 0.3;
      data[i] = bell * 0.6;
    }
    return buf;
  }

  _generateCrumblingDreamsBuffer() {
    // 16-note loop: A4, C5, E5, D5, C5, B4, A4, G4, A4, C5, E5, G5, E5, D5, C5, B4
    const notes = [
      440.0, 523.25, 659.25, 587.33, 523.25, 493.88, 440.0, 392.0,
      440.0, 523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 493.88
    ];
    const noteDur = 0.38;
    const totalSec = notes.length * noteDur;
    const buf = this._createBuffer(totalSec);
    const data = buf.getChannelData(0);

    for (let n = 0; n < notes.length; n++) {
      const f = notes[n];
      const startIdx = Math.round(n * noteDur * this.sampleRate);
      const endIdx = Math.round((n + 1) * noteDur * this.sampleRate);
      for (let i = startIdx; i < endIdx && i < data.length; i++) {
        const nt = (i - startIdx) / this.sampleRate;
        const decay = Math.exp(-nt * 3.8);
        const osc = Math.sin(2 * Math.PI * f * nt) + Math.sin(2 * Math.PI * f * 2 * nt) * 0.25;
        data[i] = osc * decay * 0.45;
      }
    }
    return buf;
  }

  _generateCasualBongosBuffer() {
    const buf = this._createBuffer(2.4);
    const data = buf.getChannelData(0);
    const beats = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1];
    const bongoFreqs = [220, 290, 220, 340, 220, 290, 340, 220];

    for (let b = 0; b < beats.length; b++) {
      const startIdx = Math.round(beats[b] * this.sampleRate);
      const freq = bongoFreqs[b];
      for (let i = startIdx; i < startIdx + 3000 && i < data.length; i++) {
        const t = (i - startIdx) / this.sampleRate;
        data[i] += Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 22) * 0.5;
      }
    }
    return buf;
  }

  _generateElevatorHumBuffer() {
    const buf = this._createBuffer(3.0);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const hum = Math.sin(2 * Math.PI * 62 * t) * 0.35 +
                  Math.sin(2 * Math.PI * 124 * t) * 0.2 +
                  (Math.random() * 2 - 1) * 0.04;
      data[i] = hum;
    }
    return buf;
  }

  _generateVoiceCadenceBuffer(text, profile, durationSec) {
    const buf = this._createBuffer(durationSec);
    const data = buf.getChannelData(0);

    let baseFreq = 165;
    let vibrato = 5;
    let isRobotic = false;

    switch (profile) {
      case 'HandUnit': baseFreq = 155; isRobotic = true; break;
      case 'AngstyTeen': baseFreq = 195; isRobotic = true; break;
      case 'CircusBaby': baseFreq = 265; vibrato = 3.5; break;
      case 'ElizabethAfton': baseFreq = 340; vibrato = 6; break;
      case 'WilliamAfton': baseFreq = 110; vibrato = 2; break;
      case 'BoardMember': baseFreq = 135; vibrato = 2.5; break;
      case 'MichaelAfton': baseFreq = 122; vibrato = 3; break;
      case 'FuntimeFreddy': baseFreq = 220; vibrato = 14; isRobotic = true; break;
      case 'BonBon': baseFreq = 370; vibrato = 8; break;
      case 'Vlad': baseFreq = 145; vibrato = 4.5; break;
      case 'Clara': baseFreq = 290; vibrato = 7; break;
    }

    const syllableCount = Math.min(28, Math.max(3, Math.floor(text.length / 4)));
    for (let i = 0; i < data.length; i++) {
      const t = i / this.sampleRate;
      const sylIdx = Math.floor((i / data.length) * syllableCount);
      const charSeed = text.length > 0 ? text.charCodeAt(sylIdx % text.length) : 65;
      if (charSeed % 5 === 0) {
        data[i] = 0;
        continue;
      }

      const mod = Math.sin(2 * Math.PI * vibrato * t) * 12;
      const f = baseFreq + mod;
      let osc = Math.sin(2 * Math.PI * f * t);
      if (isRobotic) {
        osc = osc > 0 ? 0.8 : -0.8;
      }
      data[i] = osc * 0.35;
    }
    return buf;
  }
}

