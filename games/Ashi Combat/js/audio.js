// ==========================================
// ASHI COMBAT: MORTAL KOMBAT AUDIO ENGINE
// ==========================================

class CombatAudio {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.bgmInterval = null;
    this.bgmPlaying = false;
    this.step = 0;
    this.bpm = 135;
    this.currentTheme = 'pit';
    this.speechAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.35;
    this.bgmGain.connect(this.ctx.destination);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.6;
    this.sfxGain.connect(this.ctx.destination);
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    if (!this.ctx) return;
    if (muted) {
      if (this.bgmGain) this.bgmGain.gain.value = 0;
      if (this.sfxGain) this.sfxGain.gain.value = 0;
      if (this.speechAvailable) window.speechSynthesis.cancel();
    } else {
      if (this.bgmGain) this.bgmGain.gain.value = 0.35;
      if (this.sfxGain) this.sfxGain.gain.value = 0.6;
    }
  }

  // ==========================================
  // PROCEDURAL SOUND EFFECTS
  // ==========================================

  playPunch(isHeavy = false) {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    // Whoosh + impact noise
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = isHeavy ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isHeavy ? 180 : 260, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + (isHeavy ? 0.22 : 0.12));

    gain.gain.setValueAtTime(isHeavy ? 0.8 : 0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isHeavy ? 0.22 : 0.12));

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + (isHeavy ? 0.22 : 0.12));

    // Crunch noise
    this.playNoise(isHeavy ? 0.18 : 0.08, 0.4, 400);

    if (isHeavy) {
      this.playBoneCrunch();
    }
  }

  playBoneCrunch() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.linearRampToValueAtTime(30, t + 0.15);
    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  playKick(isHeavy = false) {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isHeavy ? 220 : 320, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.18);

    gain.gain.setValueAtTime(isHeavy ? 0.75 : 0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.18);

    this.playNoise(isHeavy ? 0.12 : 0.07, 0.35, 600);
  }

  playBlock() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.08);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  playNoise(duration, volume, filterFreq = 1000) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;

    const gain = this.ctx.createGain();
    gain.gain.value = volume;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start();
  }

  playSpear() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    // Metal chain whistle + strike
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.linearRampToValueAtTime(400, t + 0.25);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.25);
    this.playNoise(0.2, 0.4, 3000);
  }

  playFreeze() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    // Crystalline frost chimes
    [1200, 1600, 2400].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.35);

      gain.gain.setValueAtTime(0.25, t + idx * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + idx * 0.04);
      osc.stop(t + 0.35);
    });

    this.playNoise(0.25, 0.3, 4000);
  }

  playFire() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.linearRampToValueAtTime(60, t + 0.4);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.4);

    this.playNoise(0.45, 0.5, 800);
  }

  playLightning() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.setValueAtTime(180, t + 0.05);
    osc.frequency.setValueAtTime(900, t + 0.1);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.3);

    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.3);

    this.playNoise(0.3, 0.6, 2500);
  }

  playSonicBoom() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(350, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.45);

    gain.gain.setValueAtTime(0.8, t);
    gain.gain.exponentialRampToValueAtTime(0.005, t + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.45);

    this.playNoise(0.35, 0.45, 1200);
  }

  playBloodSpurt() {
    if (this.isMuted) return;
    this.ensureContext();
    this.playNoise(0.18, 0.35, 1800);
  }

  playGong() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    [110, 164, 220, 275].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 2.5);
    });
  }

  playFatalityStart() {
    if (this.isMuted) return;
    this.ensureContext();
    this.playGong();

    // Dark rumble chord
    const t = this.ctx.currentTime;
    [55, 65, 82].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 3.0);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 3.0);
    });
  }

  playFatalityImpact() {
    if (this.isMuted) return;
    this.ensureContext();
    this.playPunch(true);
    this.playBoneCrunch();
    this.playBloodSpurt();
    this.playGong();
  }

  playSuper() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.35);

    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.35);
  }

  // ==========================================
  // ANNOUNCER VOICE SYNTHESIS (DEEP MORTAL KOMBAT VOICE)
  // ==========================================

  announce(text) {
    if (this.isMuted) return;

    // Use Web Speech API if supported
    if (this.speechAvailable) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85; // Slow dramatic pace
        utterance.pitch = 0.55; // Deep gravelly demonic pitch
        utterance.volume = 1.0;

        // Try finding a deep English voice
        const voices = window.speechSynthesis.getVoices();
        const deepVoice = voices.find((v) => /en[-_](us|gb|ca)/i.test(v.lang) && /david|george|mark|male/i.test(v.name)) ||
          voices.find((v) => /en/i.test(v.lang));
        if (deepVoice) utterance.voice = deepVoice;

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // Fallback to robotic synth sound
        this.synthDemonGrunt();
      }
    } else {
      this.synthDemonGrunt();
    }
  }

  synthDemonGrunt() {
    if (this.isMuted) return;
    this.ensureContext();
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, t);
    osc.frequency.linearRampToValueAtTime(70, t + 0.4);
    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.4);
  }

  // ==========================================
  // BGM SYNTHESIZER: MORTAL KOMBAT TECHNO SYNDROME
  // ==========================================

  startBGM(theme = 'pit') {
    if (this.bgmPlaying) return;
    this.ensureContext();
    this.currentTheme = theme;
    this.bgmPlaying = true;
    this.step = 0;

    const stepInterval = (60 / this.bpm / 4) * 1000; // 16th notes
    this.bgmInterval = setInterval(() => {
      if (!this.bgmPlaying || this.isMuted) return;
      this.tickBGM();
    }, stepInterval);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  tickBGM() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const s = this.step % 16;
    const bar = Math.floor(this.step / 16) % 4;

    // 1. Kick Drum (4 on the floor: steps 0, 4, 8, 12)
    if (s % 4 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(38, t + 0.09);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(t);
      osc.stop(t + 0.09);
    }

    // 2. Snare / Clack (steps 4, 12)
    if (s === 4 || s === 12) {
      this.playBGMNoise(t, 0.07, 0.22, 1200);
    }

    // 3. Rolling 16th Hi-Hat
    if (s % 2 === 0) {
      this.playBGMNoise(t, 0.03, s % 4 === 2 ? 0.15 : 0.08, 6000);
    }

    // 4. MK Driving Synth Bassline (Techno Syndrome Motif: A - A - C - A - D - A - C - B)
    // Notes in Hz for A minor: A1 = 55, C2 = 65.4, D2 = 73.4, E2 = 82.4, G1 = 49
    const notesA = [55, 55, 65.4, 55, 73.4, 55, 65.4, 61.7];
    const noteFreq = notesA[Math.floor(s / 2) % notesA.length];

    if (s % 2 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(noteFreq, t);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + (s % 4 === 0 ? 300 : 0), t);
      filter.Q.value = 4;

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.02, t + 0.11);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGain);

      osc.start(t);
      osc.stop(t + 0.11);
    }

    // 5. Minor Gothic Chord Stabs on step 0 of every bar
    if (s === 0) {
      const root = bar === 3 ? 164.81 : 146.83; // E or D minor
      [root, root * 1.2, root * 1.5].forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(t);
        osc.stop(t + 0.28);
      });
    }

    this.step++;
  }

  playBGMNoise(t, duration, volume, filterFreq) {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;

    const gain = this.ctx.createGain();
    gain.gain.value = volume;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    noise.start(t);
  }
}

export const combatAudio = new CombatAudio();
