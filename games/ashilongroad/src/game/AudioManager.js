export class AudioManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.engineGain = null;
    this.engineOsc = null;
    this.engineSub = null;
    this.screechGain = null;
    this.screechSource = null;
    this.bgmInterval = null;
    this.speechVoices = [];

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        try {
          this.speechVoices = window.speechSynthesis.getVoices();
        } catch (e) {}
      };
      try {
        this.speechVoices = window.speechSynthesis.getVoices();
      } catch (e) {}
    }
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.setupEngineSynth();
    this.setupScreechSynth();
  }

  setupEngineSynth() {
    if (!this.ctx) return;

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    this.engineGain.connect(this.ctx.destination);

    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.setValueAtTime(60, this.ctx.currentTime);

    this.engineSub = this.ctx.createOscillator();
    this.engineSub.type = 'triangle';
    this.engineSub.frequency.setValueAtTime(30, this.ctx.currentTime);

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(800, this.ctx.currentTime);

    this.engineOsc.connect(this.engineFilter);
    this.engineSub.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);

    this.engineOsc.start();
    this.engineSub.start();
  }

  setupScreechSynth() {
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    this.screechGain = this.ctx.createGain();
    this.screechGain.gain.setValueAtTime(0, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.screechGain);
    this.screechGain.connect(this.ctx.destination);

    whiteNoise.start();
  }

  updateEngine(speedKmh, throttle, isDrifting, isBoost) {
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const baseFreq = 55;
    const speedPitch = (speedKmh / 280) * 190;
    const throttlePitch = (throttle > 0 ? 30 : 0);
    const boostPitch = (isBoost ? 60 : 0);

    const freq = baseFreq + speedPitch + throttlePitch + boostPitch;

    this.engineOsc.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);
    this.engineSub.frequency.setTargetAtTime(freq * 0.5, this.ctx.currentTime, 0.05);

    const targetVol = Math.min(0.26, 0.06 + (speedKmh / 280) * 0.16 + (throttle > 0 ? 0.05 : 0));
    this.engineGain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.08);

    if (isDrifting && speedKmh > 20) {
      this.screechGain.gain.setTargetAtTime(0.18, this.ctx.currentTime, 0.05);
    } else {
      this.screechGain.gain.setTargetAtTime(0.0, this.ctx.currentTime, 0.05);
    }
  }

  playGridIntroSwoosh() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.7);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.7);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.20, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.1);
  }

  playCountdown(pitch = 440, duration = 0.15) {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playBoostSound() {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  playCollision() {
    this.playCollisionThud();
  }

  playCollisionThud() {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';

    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playItemPickup() {
    if (!this.ctx || this.isMuted) return;
    const notes = [587.33, 880];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  playSlip() {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playMissileShoot() {
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playGridIntroSwoosh() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    try {
      // Sweeping whoosh noise filter
      const bufferSize = Math.floor(this.ctx.sampleRate * 1.8);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 3.5;
      filter.frequency.setValueAtTime(260, now);
      filter.frequency.exponentialRampToValueAtTime(3400, now + 1.1);
      filter.frequency.exponentialRampToValueAtTime(320, now + 1.8);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 1.8);

      // Low frequency sub-rumble riser
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(55, now);
      sub.frequency.exponentialRampToValueAtTime(140, now + 1.4);
      subGain.gain.setValueAtTime(0.18, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      sub.connect(subGain);
      subGain.connect(this.ctx.destination);
      sub.start(now);
      sub.stop(now + 1.8);
    } catch (e) {}
  }

  playVictoryChime() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // 1. Triumphant Fanfare Arpeggio Chords
    const chords = [
      { time: 0.00, notes: [523.25, 659.25] },          // C5, E5
      { time: 0.16, notes: [587.33, 698.46] },          // D5, F5
      { time: 0.32, notes: [659.25, 783.99] },          // E5, G5
      { time: 0.48, notes: [783.99, 987.77] },          // G5, B5
      { time: 0.68, notes: [1046.50, 1318.51, 1567.98] } // Grand C6 Chord!
    ];

    chords.forEach(c => {
      c.notes.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + c.time;
        const dur = (c.time >= 0.68) ? 1.8 : 0.35;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2600, startTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    });

    // 2. Crowd Cheer Noise Synth
    try {
      const bufferSize = this.ctx.sampleRate * 2.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.7));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(950, now + 0.6);
      bandpass.Q.setValueAtTime(1.4, now + 0.6);

      const cheerGain = this.ctx.createGain();
      cheerGain.gain.setValueAtTime(0.001, now + 0.6);
      cheerGain.gain.exponentialRampToValueAtTime(0.25, now + 0.85);
      cheerGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      noise.connect(bandpass);
      bandpass.connect(cheerGain);
      cheerGain.connect(this.ctx.destination);

      noise.start(now + 0.6);
    } catch (e) {}
  }

  toggleBgm() {
    this.init();
    if (this.bgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.bgmPlaying;
  }

  startBgm() {
    if (!this.ctx || this.bgmPlaying) return;
    this.bgmPlaying = true;

    const bassline = [110, 110, 130.81, 146.83, 110, 110, 164.81, 146.83];
    let step = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.bgmPlaying || this.isMuted) return;
      const freq = bassline[step % bassline.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    }, 160);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeech();
    }
    if (this.engineGain) {
      this.engineGain.gain.setValueAtTime(this.isMuted ? 0 : 0.1, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  announceRacer(name, isPlayer = false, pos = 1) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || this.isMuted) return;

    try {
      window.speechSynthesis.cancel();

      const allVoices = (this.speechVoices && this.speechVoices.length > 0)
        ? this.speechVoices
        : window.speechSynthesis.getVoices();

      // Priority 1: Thai male authoritative voice (like Niwat)
      const thaiMaleVoice = allVoices.find(v => {
        const lang = (v.lang || '').toLowerCase();
        const vname = (v.name || '').toLowerCase();
        return (lang.startsWith('th') || vname.includes('thai') || vname.includes('ไทย')) &&
               (vname.includes('niwat') || vname.includes('male') || vname.includes('ชาย'));
      });

      // Priority 2: Any Thai voice (Premwadee, Google ภาษาไทย, etc.)
      const thaiVoice = thaiMaleVoice || allVoices.find(v => {
        const lang = (v.lang || '').toLowerCase();
        const vname = (v.name || '').toLowerCase();
        return lang.startsWith('th') || vname.includes('thai') || vname.includes('ไทย');
      });

      // ดึงและทำความสะอาดชื่อนักแข่ง ตัดวงเล็บภาษาอังกฤษส่วนเกินและอิโมจิออก เพื่อให้อ่านออกเสียงได้อย่างเข้ม ดุดัน และชัดเจน
      let cleanName = (name || '')
        .replace(/\s*\([^)]*\)/g, '')
        .replace(/#\d+/g, '')
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu, '')
        .trim();

      if (!cleanName && isPlayer) {
        cleanName = 'นักซิ่งอาชิ';
      }

      // หมายเลขภาษาไทยสำหรับเสียงพากย์ (ไม่มี P นำหน้า)
      const thaiNumberWords = {
        1: 'หนึ่ง',
        2: 'สอง',
        3: 'สาม',
        4: 'สี่',
        5: 'ห้า',
        6: 'หก',
        7: 'เจ็ด',
        8: 'แปด'
      };

      // อ่านทั้งหมายเลขและชื่อนักแข่ง (เช่น "7, วัลคิรี อาชิ", "1, นักซิ่งอาชิ")
      let text = '';
      if (thaiVoice) {
        const numWord = thaiNumberWords[pos] || `${pos}`;
        text = cleanName ? `${numWord}, ${cleanName}` : numWord;
      } else {
        text = cleanName ? `${pos}, ${cleanName}` : `${pos}`;
      }

      const utterance = new SpeechSynthesisUtterance(text);

      if (thaiVoice) {
        utterance.voice = thaiVoice;
        utterance.lang = 'th-TH';
      } else {
        const enMaleVoice = allVoices.find(v => {
          const vname = (v.name || '').toLowerCase();
          return v.lang.startsWith('en') && (vname.includes('david') || vname.includes('guy') || vname.includes('male') || vname.includes('natural'));
        }) || allVoices.find(v => v.lang.startsWith('en'));

        if (enMaleVoice) utterance.voice = enMaleVoice;
        utterance.lang = 'en-US';
      }

      // โทนเสียงเข้มๆ ทุ้มๆ ดุดันระดับต่ำสุด (Web Speech API pitch 0.0 คือขีดจำกัดเสียงต่ำสุด ตอบโจทย์ pitch -3.0)
      utterance.pitch = 0.0;
      utterance.rate = 0.92; // จังหวะเข้ม กระชับ หนักแน่น ไม่ยานคาง
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis notice:', e);
    }
  }

  playAnnouncerImpact(isPlayer = false) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    try {
      // 1. Deep Sub-Bass Thud (75Hz -> 20Hz Sub Drop for ultra deep resonance)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(isPlayer ? 95 : 75, now);
      subOsc.frequency.exponentialRampToValueAtTime(20, now + 0.45);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(isPlayer ? 0.50 : 0.42, now + 0.02);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.55);

      // 2. Heavy Stadium Low-Mid Body (Fierce punch)
      const bodyOsc = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      bodyOsc.type = 'triangle';
      bodyOsc.frequency.setValueAtTime(isPlayer ? 135 : 105, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(38, now + 0.30);

      bodyGain.gain.setValueAtTime(0.001, now);
      bodyGain.gain.linearRampToValueAtTime(0.28, now + 0.015);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(this.ctx.destination);
      bodyOsc.start(now);
      bodyOsc.stop(now + 0.35);

      // 3. Stadium Radio Comm Squelch/Chirp
      const chirp = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();
      chirp.type = 'sine';
      chirp.frequency.setValueAtTime(1550, now);
      chirp.frequency.setValueAtTime(2100, now + 0.022);

      chirpGain.gain.setValueAtTime(0.05, now);
      chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      chirp.connect(chirpGain);
      chirpGain.connect(this.ctx.destination);
      chirp.start(now);
      chirp.stop(now + 0.05);
    } catch (e) {}
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }
}
