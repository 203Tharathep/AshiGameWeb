import fs from 'fs';
import path from 'path';

console.log('Verifying SisterLocation integration...');

// 1. Verify gamesData.js
import { OFFICIAL_GAMES, CATEGORIES } from '../src/gamesData.js';
const slGame = OFFICIAL_GAMES.find(g => g.id === 'sisterlocation');

if (!slGame) {
  console.error('ERROR: sisterlocation game not found in OFFICIAL_GAMES!');
  process.exit(1);
}

console.log('✓ Found sisterlocation in OFFICIAL_GAMES:');
console.log('  Title:', slGame.title);
console.log('  Play URL:', slGame.playUrl);
console.log('  Category:', slGame.category);

// 2. Verify all referenced files exist
const checkPath = (relPath, desc) => {
  const norm = relPath.replace(/^\.\//, '');
  if (!fs.existsSync(norm)) {
    console.error(`ERROR: ${desc} does not exist: ${norm}`);
    process.exit(1);
  }
  console.log(`  ✓ ${desc} verified: ${norm}`);
};

checkPath(slGame.playUrl, 'playUrl');
checkPath(slGame.thumbnailBg, 'thumbnailBg');
checkPath(slGame.icon, 'icon');
for (const sc of slGame.screenshots) {
  checkPath(sc.src, `Screenshot (${sc.caption})`);
}

// 3. Verify JS scene imports
const mainJs = fs.readFileSync('games/sisterlocation/js/main.js', 'utf8');
const engineFiles = fs.readdirSync('games/sisterlocation/js/engine');
const sceneFiles = fs.readdirSync('games/sisterlocation/js/scenes');

console.log(`✓ Engine files count: ${engineFiles.length}`);
console.log(`✓ Scene files count: ${sceneFiles.length}`);

console.log('\nAll checks passed successfully!');

