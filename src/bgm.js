// Cozy Arcade / eShop Lo-Fi Background Music Engine (Web Audio API)
export class PortalBGM {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filterNode = null;
    this.schedulerTimer = null;

    this.isMuted = localStorage.getItem('ashigame_bgm_muted') === 'true';
    this.inGame = false;
    this.isPlaying = false;
    this.volume = 0.28;

    this.stepIndex = 0;
    this.nextNoteTime = 0;
    this.stepDuration = 60 / 84 / 2; // 84 BPM eighth-note steps

    // 8-bar cozy jazzy chord progression (frequencies in Hz)
    this.bars = [
      {
        bass: 174.61, // F3
        chord: [261.63, 329.63, 349.23, 440.00], // Fmaj7
        melody: [523.25, null, 659.25, null, 587.33, null, 523.25, null]
      },
      {
        bass: 164.81, // E3
        chord: [246.94, 293.66, 329.63, 392.00], // Em7
        melody: [493.88, null, null, 587.33, 659.25, null, 493.88, null]
      },
      {
        bass: 146.83, // D3
        chord: [261.63, 293.66, 349.23, 440.00], // Dm7
        melody: [523.25, null, 440.00, null, 523.25, 587.33, 659.25, null]
      },
      {
        bass: 130.81, // C3
        chord: [246.94, 293.66, 329.63, 392.00], // Cmaj9
        melody: [587.33, null, 523.25, null, 392.00, null, null, null]
      },
      {
        bass: 116.54, // Bb2
        chord: [233.08, 293.66, 349.23, 440.00], // Bbmaj7
        melody: [440.00, null, 523.25, null, 587.33, null, 698.46, null]
      },
      {
        bass: 110.00, // A2
        chord: [261.63, 329.63, 392.00, 440.00], // Am7
        melody: [659.25, null, 523.25, null, 440.00, null, 392.00, null]
      },
      {
        bass: 146.83, // D3
        chord: [261.63, 329.63, 349.23, 440.00], // Dm9
        melody: [349.23, null, 440.00, 523.25, 587.33, null, 523.25, null]
      },
      {
        bass: 196.00, // G3
        chord: [246.94, 329.63, 349.23, 440.00], // G13
        melody: [587.33, null, 523.25, null, 493.88, null, 392.00, null]
      }
    ];

    this.onStateChange = null;
    this.setupAutoUnlock();
    this.setupVisibilityHandler();
  }

  initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm low-pass filter for mellow Rhodes / Chillhop tone
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(1750, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(0.7, this.ctx.currentTime);
    this.filterNode.connect(this.masterGain);

    // Soft ambient delay echo
    const delay = this.ctx.createDelay();
    delay.delayTime.setValueAtTime(0.28, this.ctx.currentTime);
    const feedback = this.ctx.createGain();
    feedback.gain.setValueAtTime(0.2, this.ctx.currentTime);
    const wet = this.ctx.createGain();
    wet.gain.setValueAtTime(0.15, this.ctx.currentTime);

    this.filterNode.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(wet);
    wet.connect(this.masterGain);
  }

  setupAutoUnlock() {
    const unlock = () => {
      if (!this.isMuted && !this.inGame) {
        this.start();
      }
      if (this.ctx && this.ctx.state === 'running') {
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
      }
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
  }

  setupVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (!this.ctx) return;
      if (document.hidden) {
        this.fadeTo(0.0001, 0.2);
      } else if (this.shouldPlay()) {
        this.ctx.resume().catch(() => {});
        this.fadeTo(this.volume, 0.4);
      }
    });
  }

  shouldPlay() {
    return !this.isMuted && !this.inGame && !document.hidden;
  }

  fadeTo(targetGain, seconds = 0.35) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
    this.masterGain.gain.linearRampToValueAtTime(Math.max(0.0001, targetGain), now + seconds);
  }

  start() {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.notify();
      }).catch(() => {});
    }

    if (!this.isPlaying) {
      this.isPlaying = true;
      this.nextNoteTime = this.ctx.currentTime + 0.06;
      this.schedulerTimer = setInterval(() => this.scheduleLoop(), 80);
    }

    if (this.shouldPlay()) {
      this.fadeTo(this.volume, 0.5);
    }
    this.notify();
  }

  stopScheduler() {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.isPlaying = false;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('ashigame_bgm_muted', String(this.isMuted));
    } catch {
      // Ignore storage errors
    }

    if (this.isMuted) {
      this.fadeTo(0.0001, 0.25);
      setTimeout(() => {
        if (this.isMuted) this.stopScheduler();
        this.notify();
      }, 280);
    } else {
      // Allow playing if user explicitly unmuted
      this.inGame = false;
      this.start();
    }
    this.notify();
    return this.isMuted;
  }

  setInGame(flag) {
    this.inGame = flag;
    if (!this.ctx) {
      this.notify();
      return;
    }
    if (flag) {
      this.fadeTo(0.0001, 0.35);
    } else if (!this.isMuted) {
      this.start();
      this.fadeTo(this.volume, 0.5);
    }
    this.notify();
  }

  isActiveAudio() {
    return !this.isMuted && !this.inGame;
  }

  notify() {
    if (typeof this.onStateChange === 'function') {
      this.onStateChange(this.isActiveAudio(), this.isMuted);
    }
  }

  scheduleLoop() {
    if (!this.ctx || !this.shouldPlay()) return;
    while (this.nextNoteTime < this.ctx.currentTime + 0.22) {
      this.playStep(this.stepIndex, this.nextNoteTime);
      this.nextNoteTime += this.stepDuration;
      this.stepIndex = (this.stepIndex + 1) % (this.bars.length * 8);
    }
  }

  playStep(step, time) {
    const bar = this.bars[Math.floor(step / 8) % this.bars.length];
    const subStep = step % 8;

    // Warm electric piano chord on beat 1 and gentle syncopation on step 5
    if (subStep === 0) {
      bar.chord.forEach((freq, idx) => {
        this.playRhodesNote(freq, time + idx * 0.018, this.stepDuration * 4.5, 0.085);
      });
      this.playBassNote(bar.bass, time, this.stepDuration * 4.2, 0.14);
    } else if (subStep === 5) {
      bar.chord.forEach((freq, idx) => {
        this.playRhodesNote(freq, time + idx * 0.012, this.stepDuration * 2.6, 0.055);
      });
      this.playBassNote(bar.bass * 1.5, time, this.stepDuration * 2.2, 0.09);
    }

    // Soft bell melody
    const mel = bar.melody[subStep];
    if (mel) {
      this.playBellNote(mel, time, this.stepDuration * 2.1, 0.075);
    }

    // Subtle soft lo-fi shaker on even eighth notes
    if (subStep % 2 === 0) {
      this.playSoftTick(time, subStep === 2 || subStep === 6 ? 0.022 : 0.01);
    }
  }

  playRhodesNote(freq, time, dur, peak) {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    const g2 = this.ctx.createGain();
    g2.gain.setValueAtTime(0.12, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(peak, time + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0008, time + dur);

    osc1.connect(gain);
    osc2.connect(g2);
    g2.connect(gain);
    gain.connect(this.filterNode);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + dur + 0.03);
    osc2.stop(time + dur + 0.03);
  }

  playBassNote(freq, time, dur, peak) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(peak, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(time);
    osc.stop(time + dur + 0.03);
  }

  playBellNote(freq, time, dur, peak) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(peak, time + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0008, time + dur);

    osc.connect(gain);
    gain.connect(this.filterNode);

    osc.start(time);
    osc.stop(time + dur + 0.03);
  }

  playSoftTick(time, peak) {
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.025);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(5200, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(peak, time);

    noise.connect(hp);
    hp.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
  }
}

