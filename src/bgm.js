// Seamless Stereo WAV Cozy Lo-Fi Background Music Engine for AshiGameWeb
export class PortalBGM {
  constructor() {
    this.audio = null;
    this.blobUrl = null;
    this.fadeTimer = null;

    this.isMuted = localStorage.getItem('ashigame_bgm_muted') === 'true';
    const savedVol = parseFloat(localStorage.getItem('ashigame_bgm_volume'));
    this.volume = Number.isFinite(savedVol) ? Math.max(0, Math.min(1, savedVol)) : 0.45;

    this.inGame = false;
    this.isPlaying = false;
    this.needsGesture = false;
    this.onStateChange = null;

    this.initAudioElement();
    this.bindGestureUnlock();
    this.bindVisibility();
  }

  initAudioElement() {
    const wavBlob = this.buildCozyLofiWav();
    this.blobUrl = URL.createObjectURL(wavBlob);

    this.audio = new Audio(this.blobUrl);
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = this.isMuted ? 0 : this.volume;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.needsGesture = false;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });
  }

  // Synthesize a warm, seamless 8-bar stereo 32kHz 16-bit PCM chillhop / lobby loop
  buildCozyLofiWav() {
    const sr = 32000;
    const bpm = 88;
    const stepSec = 60 / bpm / 2; // eighth-note
    const totalSteps = 64; // 8 bars * 8 eighth-notes
    const loopSec = totalSteps * stepSec;
    const totalSamples = Math.floor(loopSec * sr);

    const left = new Float32Array(totalSamples);
    const right = new Float32Array(totalSamples);

    const addSample = (idx, lVal, rVal) => {
      const wrapped = ((idx % totalSamples) + totalSamples) % totalSamples;
      left[wrapped] += lVal;
      right[wrapped] += rVal;
    };

    const addTone = (startSec, durSec, freq, amp, pan = 0, bright = 0.14) => {
      const start = Math.floor(startSec * sr);
      const len = Math.floor(durSec * sr);
      const lGain = Math.cos(((pan + 1) * Math.PI) / 4);
      const rGain = Math.sin(((pan + 1) * Math.PI) / 4);
      const attack = Math.min(Math.floor(0.018 * sr), Math.floor(len * 0.2));
      const twoPiF = (2 * Math.PI * freq) / sr;

      for (let i = 0; i < len; i++) {
        const env =
          i < attack
            ? i / attack
            : Math.exp((-3.6 * (i - attack)) / len);
        const phase = twoPiF * i;
        // Warm Rhodes-like fundamental + gentle 2nd & 3rd overtones
        const sig =
          (Math.sin(phase) +
            bright * Math.sin(phase * 2) * Math.exp((-6 * i) / len) +
            bright * 0.35 * Math.sin(phase * 3) * Math.exp((-10 * i) / len)) *
          amp *
          env;
        addSample(start + i, sig * lGain, sig * rGain);
      }
    };

    const addKick = (startSec, amp = 0.24) => {
      const start = Math.floor(startSec * sr);
      const len = Math.floor(0.16 * sr);
      let phase = 0;
      for (let i = 0; i < len; i++) {
        const t = i / len;
        const freq = 42 + 78 * Math.exp(-t * 14);
        phase += (2 * Math.PI * freq) / sr;
        const env = Math.exp(-t * 7.5);
        const sig = Math.sin(phase) * amp * env;
        addSample(start + i, sig, sig);
      }
    };

    const addBrush = (startSec, durSec = 0.045, amp = 0.035, pan = 0) => {
      const start = Math.floor(startSec * sr);
      const len = Math.floor(durSec * sr);
      const lGain = Math.cos(((pan + 1) * Math.PI) / 4);
      const rGain = Math.sin(((pan + 1) * Math.PI) / 4);
      let prev = 0;
      // Deterministic PRNG so loop is crisp and consistent
      let seed = (start + 12345) >>> 0;
      for (let i = 0; i < len; i++) {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        const white = (seed / 2147483648) - 1;
        const hp = white - prev;
        prev = white * 0.82;
        const env = Math.exp((-5.5 * i) / len);
        const sig = hp * amp * env;
        addSample(start + i, sig * lGain, sig * rGain);
      }
    };

    const bars = [
      {
        bass: [174.61, null, null, null, null, 174.61, null, 196.00], // F3
        chord: [261.63, 329.63, 349.23, 440.00], // Fmaj7
        melody: [523.25, null, 659.25, null, 587.33, null, 523.25, null]
      },
      {
        bass: [164.81, null, null, null, null, 164.81, null, 146.83], // E3
        chord: [246.94, 293.66, 329.63, 392.00], // Em7
        melody: [493.88, null, null, 587.33, 659.25, null, 493.88, null]
      },
      {
        bass: [146.83, null, null, null, null, 146.83, null, 164.81], // D3
        chord: [261.63, 293.66, 349.23, 440.00], // Dm7
        melody: [523.25, null, 440.00, null, 523.25, 587.33, 659.25, null]
      },
      {
        bass: [130.81, null, null, null, null, 130.81, null, 196.00], // C3
        chord: [246.94, 293.66, 329.63, 392.00], // Cmaj9
        melody: [587.33, null, 523.25, null, 392.00, null, null, null]
      },
      {
        bass: [116.54, null, null, null, null, 116.54, null, 130.81], // Bb2
        chord: [233.08, 293.66, 349.23, 440.00], // Bbmaj7
        melody: [440.00, null, 523.25, null, 587.33, null, 698.46, null]
      },
      {
        bass: [110.00, null, null, null, null, 110.00, null, 130.81], // A2
        chord: [246.94, 261.63, 329.63, 392.00], // Am9
        melody: [659.25, null, 523.25, null, 440.00, null, 392.00, null]
      },
      {
        bass: [146.83, null, null, null, null, 146.83, null, 174.61], // D3
        chord: [261.63, 329.63, 349.23, 440.00], // Dm9
        melody: [440.00, null, 523.25, null, 587.33, null, 659.25, null]
      },
      {
        bass: [196.00, null, null, null, null, 196.00, null, 146.83], // G3
        chord: [246.94, 293.66, 349.23, 440.00], // G9sus4 -> G13
        melody: [587.33, null, 523.25, null, 493.88, null, 440.00, null]
      }
    ];

    for (let barIdx = 0; barIdx < bars.length; barIdx++) {
      const bar = bars[barIdx];
      const barStart = barIdx * 8 * stepSec;

      // Strummed Rhodes chords on beat 1 and gentle syncopation on step 5
      bar.chord.forEach((freq, nIdx) => {
        const pan = (nIdx - 1.5) * 0.22;
        addTone(barStart + nIdx * 0.022, stepSec * 5.2, freq, 0.13, pan, 0.16);
        addTone(barStart + 5 * stepSec + nIdx * 0.015, stepSec * 2.8, freq, 0.075, -pan, 0.12);
      });

      for (let s = 0; s < 8; s++) {
        const t = barStart + s * stepSec;
        const swing = s % 2 === 1 ? 0.024 : 0;

        // Warm Bass
        if (bar.bass[s]) {
          addTone(t + swing, stepSec * 3.2, bar.bass[s], 0.22, 0, 0.06);
        }

        // Melody + subtle stereo echo
        if (bar.melody[s]) {
          const melFreq = bar.melody[s];
          addTone(t + swing, stepSec * 2.3, melFreq, 0.135, 0.18, 0.2);
          addTone(t + swing + stepSec * 1.5, stepSec * 1.6, melFreq, 0.042, -0.35, 0.1);
        }

        // Cozy minimal Lo-Fi rhythm
        if (s === 0 || s === 5) {
          addKick(t + swing, s === 0 ? 0.21 : 0.15);
        }
        if (s === 2 || s === 6) {
          addBrush(t + swing, 0.065, 0.055, 0.08);
        } else {
          addBrush(t + swing, 0.03, 0.02, -0.12);
        }
      }
    }

    // Gentle peak limiter / normalization to ~0.72 so audio is clear and warm without clipping
    let peak = 0.001;
    for (let i = 0; i < totalSamples; i++) {
      const aL = Math.abs(left[i]);
      const aR = Math.abs(right[i]);
      if (aL > peak) peak = aL;
      if (aR > peak) peak = aR;
    }
    const norm = 0.72 / peak;

    // Encode 16-bit Stereo WAV
    const dataSize = totalSamples * 4;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    const writeStr = (offset, str) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 2, true); // Stereo
    view.setUint32(24, sr, true);
    view.setUint32(28, sr * 4, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    writeStr(36, 'data');
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < totalSamples; i++) {
      const sL = Math.max(-1, Math.min(1, left[i] * norm));
      const sR = Math.max(-1, Math.min(1, right[i] * norm));
      view.setInt16(offset, sL < 0 ? sL * 0x8000 : sL * 0x7fff, true);
      view.setInt16(offset + 2, sR < 0 ? sR * 0x8000 : sR * 0x7fff, true);
      offset += 4;
    }

    return new Blob([buffer], { type: 'audio/wav' });
  }

  bindGestureUnlock() {
    const unlock = () => {
      if (!this.isMuted && !this.inGame && this.audio && this.audio.paused) {
        this.playSmooth();
      }
    };
    window.addEventListener('pointerdown', unlock, { capture: true, passive: true });
    window.addEventListener('keydown', unlock, { capture: true, passive: true });
    window.addEventListener('touchstart', unlock, { capture: true, passive: true });
  }

  bindVisibility() {
    document.addEventListener('visibilitychange', () => {
      if (!this.audio) return;
      if (document.hidden) {
        if (!this.audio.paused) this.audio.pause();
      } else if (!this.isMuted && !this.inGame) {
        this.playSmooth();
      }
    });
  }

  tryAutoStart() {
    if (this.isMuted || this.inGame || !this.audio) {
      this.notify();
      return;
    }
    this.audio.volume = this.volume;
    const p = this.audio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // Browser requires first click/tap on fresh session
        this.needsGesture = true;
        this.isPlaying = false;
        this.notify();
      });
    }
  }

  playSmooth() {
    if (!this.audio || this.isMuted || this.inGame) return;
    clearInterval(this.fadeTimer);
    const target = this.volume;
    this.audio.volume = Math.min(target, 0.04);
    const p = this.audio.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        if (this.inGame || this.isMuted) {
          this.audio.pause();
          this.notify();
          return;
        }
        this.fadeVolumeTo(target, 350);
      }).catch(() => {
        this.needsGesture = true;
        this.notify();
      });
    }
  }

  fadeVolumeTo(target, durationMs = 300, pauseAtZero = false) {
    if (!this.audio) return;
    clearInterval(this.fadeTimer);
    const startVol = this.audio.volume;
    const steps = 12;
    const stepTime = Math.max(16, Math.floor(durationMs / steps));
    let count = 0;

    this.fadeTimer = setInterval(() => {
      count++;
      const ratio = count / steps;
      const nextVol = startVol + (target - startVol) * ratio;
      this.audio.volume = Math.max(0, Math.min(1, nextVol));
      if (count >= steps) {
        clearInterval(this.fadeTimer);
        this.audio.volume = Math.max(0, Math.min(1, target));
        if (pauseAtZero && target === 0 && !this.audio.paused) {
          this.audio.pause();
        }
        this.notify();
      }
    }, stepTime);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    try {
      localStorage.setItem('ashigame_bgm_volume', String(this.volume));
    } catch {
      // Ignore storage error
    }

    if (this.volume === 0) {
      this.isMuted = true;
      localStorage.setItem('ashigame_bgm_muted', 'true');
      if (this.audio && !this.audio.paused) this.audio.pause();
    } else {
      if (this.isMuted) {
        this.isMuted = false;
        localStorage.setItem('ashigame_bgm_muted', 'false');
      }
      if (this.audio) {
        this.audio.volume = this.volume;
        if (this.audio.paused && !this.inGame) {
          this.playSmooth();
        }
      }
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('ashigame_bgm_muted', String(this.isMuted));
    } catch {
      // Ignore storage error
    }

    if (this.isMuted) {
      this.fadeVolumeTo(0, 220, true);
    } else {
      if (this.volume === 0) {
        this.volume = 0.45;
        localStorage.setItem('ashigame_bgm_volume', '0.45');
      }
      this.inGame = false;
      this.playSmooth();
    }
    this.notify();
    return this.isMuted;
  }

  setInGame(flag) {
    this.inGame = flag;
    if (flag) {
      if (this.audio && !this.audio.paused) {
        this.fadeVolumeTo(0, 260, true);
      }
    } else if (!this.isMuted) {
      this.playSmooth();
    }
    this.notify();
  }

  notify() {
    if (typeof this.onStateChange === 'function') {
      this.onStateChange({
        isPlaying: Boolean(this.audio && !this.audio.paused && !this.isMuted),
        isMuted: this.isMuted,
        inGame: this.inGame,
        needsGesture: this.needsGesture,
        volume: this.volume
      });
    }
  }
}
