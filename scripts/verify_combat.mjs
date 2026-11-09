import { FIGHTERS, STAGES } from '../games/ashicombat/js/fightersData.js';
import fs from 'fs';
import path from 'path';

console.log('--- Checking Ashi Combat Data ---');
console.log('Total Fighters:', FIGHTERS.length);
console.log('Total Stages:', STAGES.length);

let allFilesExist = true;

for (const f of FIGHTERS) {
  const p = path.join('games/ashicombat', f.portrait);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  console.log(`[${exists ? 'OK' : 'MISSING'}] ${f.name.padEnd(16)} -> ${p} (${size} bytes)`);
  if (!exists || size === 0) allFilesExist = false;
}

console.log('Cover exists:', fs.existsSync('games/ashicombat/assets/cover.jpg'));
console.log('Icon exists:', fs.existsSync('games/ashicombat/assets/icon.png'));
console.log('Index HTML exists:', fs.existsSync('games/ashicombat/index.html'));
console.log('JS files:');
console.log('- audio.js:', fs.existsSync('games/ashicombat/js/audio.js'));
console.log('- engine.js:', fs.existsSync('games/ashicombat/js/engine.js'));
console.log('- renderer.js:', fs.existsSync('games/ashicombat/js/renderer.js'));
console.log('- main.js:', fs.existsSync('games/ashicombat/js/main.js'));
console.log('- style.css:', fs.existsSync('games/ashicombat/css/style.css'));
console.log('All files verified successfully:', allFilesExist);

