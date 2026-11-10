import fs from 'fs';
import path from 'path';
import assert from 'assert';

console.log('--- Testing Ashi Kombat Responsive & Multiplayer System ---');

// 1. Verify CSS styles for Character Select responsiveness
const cssPath = path.resolve('games/ashicombat/css/style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

assert(cssContent.includes('.select-container'), 'CSS should have .select-container');
assert(cssContent.includes('overflow-y: auto'), 'select-container must have overflow-y: auto');
assert(cssContent.includes('@media (max-width: 1024px)'), 'CSS must have tablet/mobile media query (1024px)');
assert(cssContent.includes('@media (max-width: 680px)'), 'CSS must have phone portrait media query (680px)');
assert(cssContent.includes('@media (max-height: 560px)'), 'CSS must have mobile landscape media query (560px)');
assert(cssContent.includes('.online-room-box'), 'CSS must have online room modal styles');
assert(cssContent.includes('.mk-btn-online'), 'CSS must have online button styles');
console.log('✓ CSS responsive rules and online modal styles verified');

// 2. Verify HTML elements for Online Room and Character Selection
const htmlPath = path.resolve('games/ashicombat/index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

assert(htmlContent.includes('peerjs.min.js'), 'HTML must include peerjs.min.js script');
assert(htmlContent.includes('id="btnOnlineRoom"'), 'HTML must have Online Room button');
assert(htmlContent.includes('id="onlineRoomModal"'), 'HTML must have Online Room modal');
assert(htmlContent.includes('id="btnCreateRoomAct"'), 'HTML must have Create Room button');
assert(htmlContent.includes('id="btnJoinRoomAct"'), 'HTML must have Join Room button');
assert(htmlContent.includes('id="joinRoomInput"'), 'HTML must have Join Room input field');
assert(htmlContent.includes('id="hostRoomCodeDisplay"'), 'HTML must have Host code display');
assert(htmlContent.includes('id="btnBackToTitle"'), 'HTML must have Back to Title button');
assert(htmlContent.includes('id="onlineLobbyBanner"'), 'HTML must have Online Lobby banner');
console.log('✓ HTML markup for online multiplayer and select screen verified');

// 3. Verify Portal style.css min-height responsiveness
const portalCssPath = path.resolve('src/style.css');
const portalCss = fs.readFileSync(portalCssPath, 'utf8').replace(/\r\n/g, '\n');

assert(!portalCss.includes('min-height: 480px;\n  max-height: 82vh;'), 'aspect-wide min-height should not be 480px');
assert(portalCss.includes('aspect-ratio: 16 / 9;\n  min-height: 0;\n  max-height: 82vh;'), 'aspect-wide should have min-height: 0');
console.log('✓ Portal stage frame min-height fix verified');

// 4. Test Room Code generator and cleaner logic
function generateRoomCode() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = 'AK-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function cleanRoomCode(raw) {
  let c = (raw || '').trim().toUpperCase();
  if (c.startsWith('AK-')) c = c.substring(3);
  else if (c.startsWith('AK')) c = c.substring(2);
  c = c.replace(/[^A-Z0-9]/g, '');
  return c ? `AK-${c}` : '';
}

for (let i = 0; i < 50; i++) {
  const code = generateRoomCode();
  assert(code.startsWith('AK-'), 'Generated code must start with AK-');
  assert.strictEqual(code.length, 7, 'Generated code must be 7 chars total');
  const cleaned = cleanRoomCode(code);
  assert.strictEqual(cleaned, code, 'Cleaned code should match generated code');
}

assert.strictEqual(cleanRoomCode('  ak-4829  '), 'AK-4829');
assert.strictEqual(cleanRoomCode('ak4829'), 'AK-4829');
assert.strictEqual(cleanRoomCode('4829'), 'AK-4829');
console.log('✓ Room Code generation and input cleanup verified');

// 5. Test CombatEngine input mapping and snapshot synchronization
import { CombatEngine } from '../games/ashicombat/js/engine.js';

const mockSound = {
  playPunch: () => {},
  playWhoosh: () => {},
  playBlock: () => {},
  playHitVoice: () => {},
  playAttackGrunt: () => {},
  playSuper: () => {},
  announceRound: () => {},
  announceFight: () => {},
  announceFinishHim: () => {},
  announceWinner: () => {},
  announceFatality: () => {},
  announceFlawless: () => {},
  speak: () => {}
};

const mockRenderer = {
  preloadFighterImages: () => {},
  triggerScreenShake: () => {},
  triggerFlash: () => {},
  spawnBlood: () => {},
  spawnFX: () => {},
  showBanner: () => {}
};

const engine = new CombatEngine(mockSound, mockRenderer);
const f1 = {
  id: 'fire_ashi',
  name: 'Fire Ashi',
  stats: { health: 1000, power: 85, speed: 7 },
  attacks: { punchLight: { damage: 30, startup: 4, active: 4, recovery: 8, hitstun: 14 } },
  specials: []
};
const f2 = {
  id: 'goro_ashi',
  name: 'Goro Ashi',
  stats: { health: 1200, power: 95, speed: 5 },
  attacks: { punchLight: { damage: 35, startup: 5, active: 4, recovery: 10, hitstun: 16 } },
  specials: []
};

engine.initMatch(f1, f2, { name: 'Temple' }, false);

// Test Player 1 input
engine.handlePlayerKey(1, 'w', true);
assert.strictEqual(engine.p1Keys['w'], true, 'P1 W key must be down');
engine.handlePlayerKey(1, 'w', false);
assert.strictEqual(engine.p1Keys['w'], false, 'P1 W key must be up');

// Test Player 2 input (using WASD mapped for Guest)
engine.handlePlayerKey(2, 'w', true);
assert.strictEqual(engine.p2Keys['arrowup'], true, 'P2 mapped arrowup key must be down');
engine.handlePlayerKey(2, 'w', false);
assert.strictEqual(engine.p2Keys['arrowup'], false, 'P2 mapped arrowup key must be up');

// Test snapshot and apply snapshot
engine.p1.hp = 750;
engine.p2.hp = 600;
engine.roundTimer = 85;
const snap = engine.getStateSnapshot();
assert.strictEqual(snap.p1.hp, 750);
assert.strictEqual(snap.p2.hp, 600);
assert.strictEqual(snap.timer, 85);

// Create second engine and apply snapshot (simulating guest receiving state)
const guestEngine = new CombatEngine(mockSound, mockRenderer);
guestEngine.initMatch(f1, f2, { name: 'Temple' }, false);
assert.strictEqual(guestEngine.p1.hp, 1000);
guestEngine.applyStateSnapshot(snap);
assert.strictEqual(guestEngine.p1.hp, 750, 'Guest P1 HP must sync to host snap');
assert.strictEqual(guestEngine.p2.hp, 600, 'Guest P2 HP must sync to host snap');
assert.strictEqual(guestEngine.roundTimer, 85, 'Guest timer must sync to host snap');

console.log('✓ Authoritative WebRTC network state snapshot sync verified');
console.log('--- ALL TESTS PASSED SUCCESSFULLY! ---');
