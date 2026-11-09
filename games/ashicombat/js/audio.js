/**
 * Ashi Kombat - Procedural & Synthesized Web Audio Sound Engine
 * Provides 90s Mortal Kombat arcade style BGM, announcer voices, and combat FX.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.bgmGain = null;
    this.muted = false;
    this.bgmPlaying = false;
    this.bgmStep = 0;
    this.bgmTimer = null;
    this.bpm = 128;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);

      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio init failed:', e);
    }
  }

  ensureContext() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.85, this.ctx.currentTime);
    }
    return this.muted;
  }

  // --- Retro Sound Effects ---

  playPunch(heavy = false) {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = heavy ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(heavy ? 160 : 240, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + (heavy ? 0.22 : 0.12));

    // Add noise burst for impact
    const bufferSize = this.ctx.sampleRate * (heavy ? 0.18 : 0.08);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(heavy ? 1200 : 2500, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(heavy ? 0.8 : 0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + (heavy ? 0.2 : 0.09));

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    gain.gain.setValueAtTime(heavy ? 0.9 : 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + (heavy ? 0.22 : 0.12));

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    noise.start(now);
    osc.stop(now + (heavy ? 0.22 : 0.12));
    noise.stop(now + (heavy ? 0.2 : 0.09));
  }

  playKick(heavy = false) {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(heavy ? 180 : 220, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.25);

    gain.gain.setValueAtTime(heavy ? 1.0 : 0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    // Crack snap
    const snap = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snap.type = 'square';
    snap.frequency.setValueAtTime(450, now);
    snap.frequency.exponentialRampToValueAtTime(60, now + 0.08);
    snapGain.gain.setValueAtTime(0.5, now);
    snapGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    snap.connect(snapGain);
    snapGain.connect(this.sfxGain);

    osc.start(now);
    snap.start(now);
    osc.stop(now + 0.25);
    snap.stop(now + 0.08);
  }

  playBlock() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playWhoosh() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.08);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.15);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.15);
  }

  playFireball() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  playLightning() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800 + Math.random() * 600, now + i * 0.05);
      osc.frequency.exponentialRampToValueAtTime(150, now + i * 0.05 + 0.12);
      gain.gain.setValueAtTime(0.4, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.12);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.12);
    }
  }

  playUppercut() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    this.playPunch(true);
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
    gain.gain.setValueAtTime(1.0, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playBoneCrack() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const times = [0, 0.04, 0.08];
    times.forEach((t) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, now + t);
      osc.frequency.exponentialRampToValueAtTime(200, now + t + 0.04);
      gain.gain.setValueAtTime(0.6, now + t);
      gain.gain.exponentialRampToValueAtTime(0.01, now + t + 0.04);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + t);
      osc.stop(now + t + 0.04);
    });
  }

  playGong() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [140, 210, 280, 360, 480];
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      gain.gain.setValueAtTime(0.3 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 2.5);
    });
  }

  playFatalitySiren() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(900, now + 0.4);
    osc.frequency.linearRampToValueAtTime(150, now + 0.9);
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 1.2);
  }

  // --- Voice Announcer (Speech Synthesis / Formant Vocalizer) ---
  speak(text) {
    // If Web Speech API is supported, use deep pitched retro voice
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 0.85;
        utter.pitch = 0.45; // Deep demon / MK announcer voice
        utter.volume = this.muted ? 0 : 1;
        // Select deep English voice if available
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Mark')));
        if (maleVoice) utter.voice = maleVoice;
        window.speechSynthesis.speak(utter);
      } catch (e) {
        console.warn('SpeechSynthesis error:', e);
      }
    }
    // Also synthesize a dramatic bass boom underneath
    this.playAnnouncerImpact();
  }

  playAnnouncerImpact() {
    this.ensureContext();
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Pre-configured announcer callouts
  announceRound(num) {
    this.playGong();
    this.speak(`Round ${num}`);
  }

  announceFight() {
    setTimeout(() => {
      this.playWhoosh();
      this.speak('FIGHT!');
    }, 400);
  }

  announceFinishHim() {
    this.playFatalitySiren();
    setTimeout(() => {
      this.speak('FINISH HIM!');
    }, 200);
  }

  announceFatality() {
    this.playFatalitySiren();
    this.playGong();
    setTimeout(() => {
      this.speak('FATALITY!');
    }, 300);
  }

  announceFlawless() {
    setTimeout(() => {
      this.speak('FLAWLESS VICTORY!');
    }, 1200);
  }

  announceWinner(name) {
    setTimeout(() => {
      this.speak(`${name} WINS!`);
    }, 600);
  }

  // --- Dynamic Mortal Kombat BGM Engine ---
  startBGM(type = 'fight') {
    this.ensureContext();
    if (this.bgmPlaying) this.stopBGM();
    this.bgmPlaying = true;
    this.bgmStep = 0;
    this.bpm = type === 'menu' ? 105 : 132;

    const stepDuration = 60 / this.bpm / 4; // 16th note in seconds

    // Bassline patterns (D minor techno combat vibe)
    const bassNotes = type === 'menu'
      ? [36, 0, 36, 0, 39, 0, 38, 0, 36, 0, 36, 0, 41, 0, 43, 0] // D, D#, D, F, G
      : [36, 36, 48, 36, 39, 36, 48, 36, 34, 34, 46, 34, 38, 38, 50, 38];

    // High synth arpeggios
    const synthNotes = [60, 63, 67, 72, 70, 67, 63, 60, 58, 62, 65, 70, 69, 65, 62, 58];

    const playStep = () => {
      if (!this.bgmPlaying || !this.ctx || this.muted) return;
      const now = this.ctx.currentTime;
      const step = this.bgmStep % 16;

      // Kick drum on 0, 4, 8, 12
      if (step % 4 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(130, now);
        kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.15);
        kickGain.gain.setValueAtTime(0.7, now);
        kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        kickOsc.connect(kickGain);
        kickGain.connect(this.bgmGain);
        kickOsc.start(now);
        kickOsc.stop(now + 0.15);
      }

      // Snare on 4, 12
      if (step === 4 || step === 12) {
        const snareBuf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.12, this.ctx.sampleRate);
        const data = snareBuf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 800);
        const snareNoise = this.ctx.createBufferSource();
        snareNoise.buffer = snareBuf;
        const snareGain = this.ctx.createGain();
        snareGain.gain.setValueAtTime(0.4, now);
        snareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        snareNoise.connect(snareGain);
        snareGain.connect(this.bgmGain);
        snareNoise.start(now);
        snareNoise.stop(now + 0.12);
      }

      // Hi-hat on every odd 16th
      if (step % 2 === 1) {
        const hatBuf = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.04, this.ctx.sampleRate);
        const data = hatBuf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 200);
        const hat = this.ctx.createBufferSource();
        hat.buffer = hatBuf;
        const hatGain = this.ctx.createGain();
        hatGain.gain.setValueAtTime(0.2, now);
        hatGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
        hat.connect(hatGain);
        hatGain.connect(this.bgmGain);
        hat.start(now);
        hat.stop(now + 0.04);
      }

      // Synth Bass
      const midi = bassNotes[step];
      if (midi > 0) {
        const freq = 440 * Math.pow(2, (midi - 69) / 12);
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        const bFilter = this.ctx.createBiquadFilter();

        bOsc.type = 'sawtooth';
        bOsc.frequency.setValueAtTime(freq, now);

        bFilter.type = 'lowpass';
        bFilter.frequency.setValueAtTime(1400, now);
        bFilter.frequency.exponentialRampToValueAtTime(300, now + stepDuration * 0.9);

        bGain.gain.setValueAtTime(0.35, now);
        bGain.gain.exponentialRampToValueAtTime(0.01, now + stepDuration * 0.9);

        bOsc.connect(bFilter);
        bFilter.connect(bGain);
        bGain.connect(this.bgmGain);

        bOsc.start(now);
        bOsc.stop(now + stepDuration * 0.9);
      }

      // Lead Synth (fight intensity)
      if (type === 'fight' && step % 2 === 0) {
        const leadMidi = synthNotes[step];
        const leadFreq = 440 * Math.pow(2, (leadMidi - 69) / 12);
        const lOsc = this.ctx.createOscillator();
        const lGain = this.ctx.createGain();
        lOsc.type = 'square';
        lOsc.frequency.setValueAtTime(leadFreq, now);
        lGain.gain.setValueAtTime(0.12, now);
        lGain.gain.exponentialRampToValueAtTime(0.005, now + stepDuration * 1.5);
        lOsc.connect(lGain);
        lGain.connect(this.bgmGain);
        lOsc.start(now);
        lOsc.stop(now + stepDuration * 1.5);
      }

      this.bgmStep++;
    };

    this.bgmTimer = setInterval(playStep, stepDuration * 1000);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }
}

window.AshiSound = new SoundEngine();

