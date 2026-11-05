// Web Audio API Synthesizer Engine for AkiraJung Visual Novel
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.masterGain = null;
    this.currentBgm = null;
    this.bgmTimer = null;
    this.isMuted = false;
    this.bgmVolume = 0.5;
    this.sfxVolume = 0.7;
    this.voiceVolume = 0.9;
    this.currentVoice = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    this.bgmGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
    this.sfxGain.connect(this.masterGain);

    this.initialized = true;
  }

  resumeContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setBgmVolume(val) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : this.bgmVolume, this.ctx.currentTime);
    }
  }

  setSfxVolume(val) {
    this.sfxVolume = Math.max(0, Math.min(1, val));
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : this.sfxVolume, this.ctx.currentTime);
    }
  }

  setVoiceVolume(val) {
    this.voiceVolume = Math.max(0, Math.min(1, val));
    if (this.currentVoice) {
      this.currentVoice.volume = this.voiceVolume;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.ctx) return this.isMuted;
    const t = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, t);
    return this.isMuted;
  }

  // --- Voice Acting Playback ---
  stopVoice() {
    if (this.currentVoice) {
      try {
        this.currentVoice.pause();
        this.currentVoice.currentTime = 0;
      } catch (e) {}
      this.currentVoice = null;
    }
  }

  playVoice(audioSrc) {
    this.resumeContext();
    this.stopVoice();
    if (this.isMuted || !audioSrc) return;

    try {
      const audio = new Audio(audioSrc);
      audio.volume = this.voiceVolume;
      audio.play().catch(() => {});
      this.currentVoice = audio;
    } catch (e) {
      console.warn('Voice play error:', e);
    }
  }

  // --- Sound Effects ---
  playBlip(speaker = 'narrator') {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      let freq = 520;
      if (speaker === 'akira' || speaker === 'akira_girl') freq = 680;
      else if (speaker === 'player') freq = 440;
      else if (speaker === 'boss' || speaker === 'muscle' || speaker === 'pizza') freq = 320;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.9, t + 0.04);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch (e) {}
  }

  playClick() {
    this.resumeContext();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  playHover() {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.04);
  }

  playLoveUp() {
    this.resumeContext();
    if (!this.ctx || this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime + idx * 0.07;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.25);
    });
  }

  playShock() {
    this.resumeContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    const freqs = [220, 233.08, 440, 466.16]; // Dramatic dissonant chord
    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, t);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  }

  playHeartbeat() {
    this.resumeContext();
    if (!this.ctx || this.isMuted) return;
    const t = this.ctx.currentTime;
    [0, 0.18].forEach(delay => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(75, t + delay);
      osc.frequency.exponentialRampToValueAtTime(35, t + delay + 0.12);
      gain.gain.setValueAtTime(0.35, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.15);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + delay);
      osc.stop(t + delay + 0.15);
    });
  }

  playVictory() {
    this.resumeContext();
    if (!this.ctx || this.isMuted) return;
    const arpeg = [
      { f: 523.25, d: 0.15 }, // C
      { f: 659.25, d: 0.15 }, // E
      { f: 783.99, d: 0.15 }, // G
      { f: 1046.50, d: 0.4 }, // C
      { f: 880.00, d: 0.15 }, // A
      { f: 1046.50, d: 0.6 }  // C
    ];
    let curTime = this.ctx.currentTime;
    arpeg.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, curTime);
      gain.gain.setValueAtTime(0.2, curTime);
      gain.gain.exponentialRampToValueAtTime(0.001, curTime + note.d);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(curTime);
      osc.stop(curTime + note.d);
      curTime += note.d * 0.9;
    });
  }

  // --- Dynamic BGM Synthesizers ---
  stopBgm() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    this.currentBgm = null;
  }

  playBgm(trackName) {
    this.resumeContext();
    if (this.currentBgm === trackName) return;
    this.stopBgm();
    this.currentBgm = trackName;

    if (!this.ctx) return;

    if (trackName === 'title') {
      this.startTitleBgm();
    } else if (trackName === 'panic') {
      this.startPanicBgm();
    } else if (trackName === 'encounter') {
      this.startEncounterBgm();
    } else if (trackName === 'sunset') {
      this.startSunsetBgm();
    } else if (trackName === 'bed') {
      this.startBedBgm();
    }
  }

  startTitleBgm() {
    // Dreamy romantic anime chords arpeggio
    // F - G - Em - Am progression
    const chords = [
      [349.23, 440.00, 523.25, 698.46], // F
      [392.00, 493.88, 587.33, 783.99], // G
      [329.63, 392.00, 493.88, 659.25], // Em
      [220.00, 261.63, 329.63, 440.00]  // Am
    ];
    let step = 0;
    const playBar = () => {
      if (this.currentBgm !== 'title' || !this.ctx || this.isMuted) return;
      const chord = chords[step % chords.length];
      chord.forEach((freq, noteIdx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + noteIdx * 0.3;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(t);
        osc.stop(t + 0.85);
      });
      step++;
    };

    playBar();
    this.bgmTimer = setInterval(playBar, 1400);
  }

  startPanicBgm() {
    // Fast comedic anime morning running theme
    const bassline = [220, 247, 261, 293, 330, 293, 261, 247];
    let step = 0;
    const playBeats = () => {
      if (this.currentBgm !== 'panic' || !this.ctx || this.isMuted) return;
      const freq = bassline[step % bassline.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start(t);
      osc.stop(t + 0.16);

      // Accent high note
      if (step % 2 === 0) {
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, t);
        gain2.gain.setValueAtTime(0.03, t);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc2.connect(gain2);
        gain2.connect(this.bgmGain);
        osc2.start(t);
        osc2.stop(t + 0.1);
      }
      step++;
    };

    playBeats();
    this.bgmTimer = setInterval(playBeats, 180);
  }

  startEncounterBgm() {
    // Dramatic funny boss battle theme
    const brassChords = [
      [146.83, 220.00, 261.63], // Dm
      [138.59, 207.65, 246.94], // C#dim
      [130.81, 196.00, 246.94], // C
      [123.47, 185.00, 220.00]  // Bdim
    ];
    let step = 0;
    const playStab = () => {
      if (this.currentBgm !== 'encounter' || !this.ctx || this.isMuted) return;
      const chord = brassChords[step % brassChords.length];
      chord.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq * 1.5, t);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(t);
        osc.stop(t + 0.42);
      });
      step++;
    };

    playStab();
    this.bgmTimer = setInterval(playStab, 500);
  }

  startSunsetBgm() {
    // Emotional sunset confession music box / piano
    const melody = [
      523.25, 587.33, 659.25, 783.99,
      659.25, 587.33, 523.25, 440.00,
      392.00, 523.25, 587.33, 659.25,
      783.99, 880.00, 1046.50, 783.99
    ];
    let step = 0;
    const playTone = () => {
      if (this.currentBgm !== 'sunset' || !this.ctx || this.isMuted) return;
      const freq = melody[step % melody.length];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      // Soft sub-harmonic
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'triangle';
      sub.frequency.setValueAtTime(freq / 2, t);
      subGain.gain.setValueAtTime(0.03, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      osc.connect(gain);
      gain.connect(this.bgmGain);
      sub.connect(subGain);
      subGain.connect(this.bgmGain);

      osc.start(t);
      osc.stop(t + 0.95);
      sub.start(t);
      sub.stop(t + 0.95);

      step++;
    };

    playTone();
    this.bgmTimer = setInterval(playTone, 600);
  }

  startBedBgm() {
    // Sensual, warm, intimate romantic bedroom atmosphere
    // Dm9 - G13 - Cmaj9 - Am9
    const chords = [
      [146.83, 220.00, 261.63, 329.63, 349.23], // Dm9
      [98.00, 196.00, 246.94, 329.63, 392.00],  // G13
      [130.81, 196.00, 246.94, 261.63, 329.63], // Cmaj9
      [110.00, 164.81, 220.00, 261.63, 329.63]  // Am9
    ];
    let step = 0;
    const playLounge = () => {
      if (this.currentBgm !== 'bed' || !this.ctx || this.isMuted) return;
      const chord = chords[step % chords.length];
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime + idx * 0.25;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.045, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(t);
        osc.stop(t + 1.85);
      });
      step++;
    };

    playLounge();
    this.bgmTimer = setInterval(playLounge, 1800);
  }
}

export const sound = new SoundEngine();
