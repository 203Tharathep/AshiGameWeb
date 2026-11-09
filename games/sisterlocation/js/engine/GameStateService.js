// Persistent Game State Service for FNAF_SL_SAVE_V1
// Faithful translation of Unity GameStateService.cs using localStorage

export const CANONICAL_PRESET_IDS = [
  'angry_ballet',
  'freddy_and_co',
  'funtime_frenzy',
  'dolls_attack',
  'girls_night',
  'weirdos',
  'top_shelf',
  'bottom_shelf',
  'cupcake_challenge',
  'golden_freddy'
];

export class GameStateService {
  constructor() {
    this.SAVE_KEY = 'FNAF_SL_SAVE_V1';
    this.state = this.createDefault();
    this.load();
  }

  createDefault() {
    return {
      starsUnlocked: {
        star1_realEnding: false,
        star2_minigame: false,
        star3_fakeEnding: false,
        star4_goldenFreddyVHard: false
      },
      currentNight: 1,
      presetStars: CANONICAL_PRESET_IDS.map(id => ({
        presetId: id,
        easy: false,
        normal: false,
        hard: false,
        vhard: false
      })),
      debugForceEasterEggs: false,
      fastTimerMode: true,
      vhardPresetsBeatenCount: 0
    };
  }

  load() {
    try {
      const raw = localStorage.getItem(this.SAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = Object.assign(this.createDefault(), parsed);
      }
    } catch (e) {
      this.state = this.createDefault();
    }
    this.ensurePresetsInitialized();
  }

  save() {
    try {
      this.ensurePresetsInitialized();
      localStorage.setItem(this.SAVE_KEY, JSON.stringify(this.state));
    } catch (e) {}
  }

  ensurePresetsInitialized() {
    if (!this.state.starsUnlocked) {
      this.state.starsUnlocked = {
        star1_realEnding: false,
        star2_minigame: false,
        star3_fakeEnding: false,
        star4_goldenFreddyVHard: false
      };
    }
    if (!Array.isArray(this.state.presetStars)) {
      this.state.presetStars = [];
    }
    for (const pid of CANONICAL_PRESET_IDS) {
      if (!this.state.presetStars.find(p => p.presetId === pid)) {
        this.state.presetStars.push({
          presetId: pid,
          easy: false,
          normal: false,
          hard: false,
          vhard: false
        });
      }
    }
  }

  resetNewGame() {
    this.state.currentNight = 1;
    this.save();
  }

  unlockAllForTesting() {
    this.state.starsUnlocked.star1_realEnding = true;
    this.state.starsUnlocked.star2_minigame = true;
    this.state.starsUnlocked.star3_fakeEnding = true;
    this.state.starsUnlocked.star4_goldenFreddyVHard = true;
    this.state.currentNight = 5;
    for (const p of this.state.presetStars) {
      p.easy = true;
      p.normal = true;
      p.hard = true;
      p.vhard = true;
    }
    this.state.vhardPresetsBeatenCount = 7;
    this.save();
  }

  getPresetStars(presetId) {
    this.ensurePresetsInitialized();
    let entry = this.state.presetStars.find(p => p.presetId === presetId);
    if (!entry) {
      entry = { presetId, easy: false, normal: false, hard: false, vhard: false };
      this.state.presetStars.push(entry);
    }
    return entry;
  }

  markPresetWon(presetId, difficultyIndex) {
    const entry = this.getPresetStars(presetId);
    if (difficultyIndex === 0) entry.easy = true;
    else if (difficultyIndex === 1) entry.normal = true;
    else if (difficultyIndex === 2) entry.hard = true;
    else if (difficultyIndex >= 3) {
      if (!entry.vhard) {
        this.state.vhardPresetsBeatenCount = Math.min(7, (this.state.vhardPresetsBeatenCount || 0) + 1);
      }
      entry.vhard = true;
      if (presetId === 'golden_freddy') {
        this.state.starsUnlocked.star4_goldenFreddyVHard = true;
      }
    }
    this.save();
  }

  getEarnedStarCount() {
    let count = 0;
    if (this.state.starsUnlocked.star1_realEnding) count++;
    if (this.state.starsUnlocked.star2_minigame) count++;
    if (this.state.starsUnlocked.star3_fakeEnding) count++;
    if (this.state.starsUnlocked.star4_goldenFreddyVHard) count++;
    return count;
  }
}

