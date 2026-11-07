import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const REPOS = [
  {
    name: 'AkiraJung',
    url: 'https://github.com/203Tharathep/AkiraJung.git',
    dest: 'games/akirajung',
    copyItems: ['index.html', 'manifest.json', 'service-worker.js', 'src', 'asset']
  },
  {
    name: 'AshiCard',
    url: 'https://github.com/203Tharathep/AshiCard.git',
    dest: 'games/ashicard',
    copyItems: ['index.html', 'style.css', 'script.js', 'ashi']
  },
  {
    name: 'FiveNightsAtAshi',
    url: 'https://github.com/AkashiZai/fivenightatashi.git',
    dest: 'games/fivenightatashi',
    copyItems: ['index.html', 'assets']
  },
  {
    name: 'FiveNightsAtAshi2',
    url: 'https://github.com/AkashiZai/fivenightatashi2.git',
    dest: 'games/fivenightatashi2',
    copyItems: ['index.html', 'assets2']
  },
  {
    name: 'FiveNightsAtAshi3',
    url: 'https://github.com/AkashiZai/fivenightatashi3.git',
    dest: 'games/fivenightatashi3',
    copyItems: ['index.html', 'assets3']
  },
  {
    name: 'FiveNightsAtAshi4',
    url: 'https://github.com/AkashiZai/fivenightatashi4.git',
    dest: 'games/fivenightatashi4',
    copyItems: ['index.html', 'assets4']
  },
  {
    name: 'FiveNightsAtAshiSisterLocation',
    url: 'https://github.com/AkashiZai/fivenightatashisisterlocation.git',
    dest: 'games/fivenightatashisisterlocation',
    copyItems: ['index.html', 'assets5']
  },
  {
    name: 'AshiGame',
    url: 'https://github.com/AkashiZai/AshiGame.git',
    dest: 'games/ashigame',
    copyItems: ['index.html', 'style.css', 'cards.js', 'game.js', 'peerjs.min.js', 'images']
  },
  {
    name: 'AshiTunnel',
    url: 'https://github.com/203Tharathep/Ashi-Tunnel.git',
    dest: 'games/ashitunnel',
    copyItems: ['dist']
  },
  {
    name: 'AshiVsZombie',
    url: 'https://github.com/203Tharathep/AshiVsZombie.git',
    dest: 'games/ashivszombie',
    copyItems: ['index.html', 'css', 'js', 'assets']
  }
];

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'ashi-y8-sync-'));
console.log('Syncing games from GitHub...');

try {
  for (const repo of REPOS) {
    const cloneDir = path.join(tmpRoot, repo.name);
    console.log(`\nCloning ${repo.url} ...`);
    execSync(`git clone --depth 1 "${repo.url}" "${cloneDir}"`, { stdio: 'inherit' });

    const destDir = path.resolve(repo.dest);
    fs.mkdirSync(destDir, { recursive: true });

    for (const item of repo.copyItems) {
      const srcPath = path.join(cloneDir, item);
      const dstPath = path.join(destDir, item);
      if (fs.existsSync(srcPath)) {
        fs.cpSync(srcPath, dstPath, { recursive: true, force: true });
      }
    }

    if (
      repo.name === 'FiveNightsAtAshi' ||
      repo.name === 'FiveNightsAtAshi2' ||
      repo.name === 'FiveNightsAtAshi3' ||
      repo.name === 'FiveNightsAtAshi4' ||
      repo.name === 'FiveNightsAtAshiSisterLocation'
    ) {
      const fnafHtmlPath = path.join(destDir, 'index.html');
      let html = fs.readFileSync(fnafHtmlPath, 'utf8');

      // Responsive wrapper scaling
      html = html.replace(
        /max-width:\s*100vw;\s*max-height:\s*100vh;\s*aspect-ratio:\s*16\s*\/\s*9;/,
        'flex-shrink: 0;\n    transform-origin: center center;'
      );
      html = html.replace(
        /max-width:\s*177\.78vh;\s*max-height:\s*56\.25vw;\s*margin:\s*auto;\s*top:\s*50%;\s*transform:\s*translateY\(-50%\);/,
        'width: 1280px; height: 720px; flex-shrink: 0; transform-origin: center center;'
      );
      html = html.replace(
        /html,\s*body\s*\{\s*width:\s*100vw;\s*height:\s*100vh;\s*overflow:\s*hidden;\s*background:\s*#000;\s*color:\s*([^;]+);\s*font-family:\s*([^;]+);\s*\}/,
        'html, body { width: 100vw; height: 100vh; margin: 0; padding: 0; overflow: hidden; background: #000; color: $1; font-family: $2; display: flex; align-items: center; justify-content: center; }'
      );

      // Replace switch links across all FNAA games with portal internal links
      html = html.replaceAll('href="fnaf.html"', 'href="../fivenightatashi/index.html" onclick="switchToPart(event, \'fivenightatashi\')"');
      html = html.replaceAll('href="fnaf1.html"', 'href="../fivenightatashi/index.html" onclick="switchToPart(event, \'fivenightatashi\')"');
      html = html.replaceAll('href="fnaf2.html"', 'href="../fivenightatashi2/index.html" onclick="switchToPart(event, \'fivenightatashi2\')"');
      html = html.replaceAll('href="fnaf3.html"', 'href="../fivenightatashi3/index.html" onclick="switchToPart(event, \'fivenightatashi3\')"');
      html = html.replaceAll('href="fnaf4.html"', 'href="../fivenightatashi4/index.html" onclick="switchToPart(event, \'fivenightatashi4\')"');
      html = html.replaceAll('href="fnafsl.html"', 'href="../fivenightatashisisterlocation/index.html" onclick="switchToPart(event, \'fivenightatashisisterlocation\')"');
      html = html.replaceAll('href="index.html" class="switch-game-btn"', 'href="../fivenightatashi/index.html" onclick="switchToPart(event, \'fivenightatashi\')" class="switch-game-btn"');
      html = html.replaceAll('href="index.html" class="tool-pill"', 'href="../fivenightatashi/index.html" onclick="switchToPart(event, \'fivenightatashi\')" class="tool-pill"');

      // Inject fitGameWrap and switchToPart helper
      if (!html.includes('fitGameWrap')) {
        const scriptCloseIndex = html.lastIndexOf('</script>');
        if (scriptCloseIndex !== -1) {
          const helperCode = `\nfunction fitGameWrap() {\n  const wrap = document.getElementById('game-wrap');\n  if (!wrap) return;\n  const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);\n  wrap.style.transform = \`scale(\${scale})\`;\n}\nwindow.addEventListener('resize', fitGameWrap);\nwindow.addEventListener('DOMContentLoaded', fitGameWrap);\nfitGameWrap();\n\nfunction switchToPart(e, gameId) {\n  if (window.top && window.top !== window) {\n    e.preventDefault();\n    window.top.location.hash = '#play/' + gameId;\n  }\n}\n`;
          html = html.slice(0, scriptCloseIndex) + helperCode + html.slice(scriptCloseIndex);
        }
      }

      fs.writeFileSync(fnafHtmlPath, html, 'utf8');
    }

    if (repo.name === 'AshiTunnel') {
      const distDir = path.join(destDir, 'dist');
      if (fs.existsSync(distDir)) {
        for (const item of fs.readdirSync(distDir)) {
          const s = path.join(distDir, item);
          const d = path.join(destDir, item);
          fs.cpSync(s, d, { recursive: true, force: true });
        }
        fs.rmSync(distDir, { recursive: true, force: true });
      }
      const indexPath = path.join(destDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        let h = fs.readFileSync(indexPath, 'utf8');
        h = h.replaceAll('src="/assets/', 'src="./assets/');
        h = h.replaceAll('href="/assets/', 'href="./assets/');
        h = h.replaceAll('src="/ashi/', 'src="./ashi/');
        h = h.replaceAll('src="/qrcode.png"', 'src="./qrcode.png"');
        fs.writeFileSync(indexPath, h, 'utf8');
      }
      const assetsDir = path.join(destDir, 'assets');
      if (fs.existsSync(assetsDir)) {
        for (const f of fs.readdirSync(assetsDir)) {
          if (f.endsWith('.js')) {
            const jsPath = path.join(assetsDir, f);
            let js = fs.readFileSync(jsPath, 'utf8');
            js = js.replaceAll('"/ashi/', '"./ashi/');
            fs.writeFileSync(jsPath, js, 'utf8');
          }
        }
      }
    }

    if (repo.name === 'AshiVsZombie') {
      const indexPath = path.join(destDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        let h = fs.readFileSync(indexPath, 'utf8');
        if (!h.includes('fitGameWrapper')) {
          h = h.replace(
            "window.addEventListener('DOMContentLoaded', () => {",
            "function fitGameWrapper() {\n    const wrap = document.getElementById('game-wrapper');\n    if (!wrap) return;\n    const targetW = 1060;\n    const targetH = 728;\n    const scale = Math.min(window.innerWidth / targetW, window.innerHeight / targetH);\n    wrap.style.transform = `scale(${scale})`;\n}\nwindow.addEventListener('resize', fitGameWrapper);\nwindow.addEventListener('DOMContentLoaded', () => {\n    fitGameWrapper();"
          );
          fs.writeFileSync(indexPath, h, 'utf8');
        }
      }
      const cssPath = path.join(destDir, 'css', 'style.css');
      if (fs.existsSync(cssPath)) {
        let c = fs.readFileSync(cssPath, 'utf8');
        c = c.replace(
          /body\s*\{[^}]*min-height:\s*100vh;[^}]*\}/,
          'html, body {\n    width: 100vw;\n    height: 100vh;\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n    background: radial-gradient(circle at center, #1b2838 0%, #0d131a 100%);\n    color: #ffffff;\n    font-family: \'Segoe UI\', system-ui, -apple-system, sans-serif;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}'
        );
        c = c.replace('max-width: 1060px;', 'width: 1060px;\n    flex-shrink: 0;\n    transform-origin: center center;');
        fs.writeFileSync(cssPath, c, 'utf8');
      }

      // Increase sun spawn interval by 2 seconds & adjust wave timings
      const levelsPath = path.join(destDir, 'js', 'levels.js');
      if (fs.existsSync(levelsPath)) {
        let lvl = fs.readFileSync(levelsPath, 'utf8');
        lvl = lvl.replaceAll('startingSun: 0,', 'startingSun: 25,');
        lvl = lvl.replaceAll('skySunInterval: 4.5,', 'skySunInterval: 6.5,');
        lvl = lvl.replaceAll('skySunInterval: 6.0,', 'skySunInterval: 8.0,');
        lvl = lvl.replaceAll('skySunInterval: 4.2,', 'skySunInterval: 6.2,');
        lvl = lvl.replaceAll('skySunInterval: 3.8,', 'skySunInterval: 5.8,');

        // Delay wave spawns slightly
        lvl = lvl.replaceAll('delay: 18,', 'delay: 26,');
        lvl = lvl.replaceAll('delay: 42,', 'delay: 54,');
        lvl = lvl.replaceAll('delay: 66,', 'delay: 82,');
        lvl = lvl.replaceAll('delay: 90,', 'delay: 110,');
        lvl = lvl.replaceAll('delay: 115,', 'delay: 140,');
        lvl = lvl.replace('{ delay: 140, isFlag: true, isFinal: true, zombies: [', '{ delay: 170, isFlag: true, isFinal: true, zombies: [');
        lvl = lvl.replaceAll('delay: 20,', 'delay: 28,');
        lvl = lvl.replaceAll('delay: 44,', 'delay: 56,');
        lvl = lvl.replaceAll('delay: 68,', 'delay: 84,');
        lvl = lvl.replaceAll('delay: 92,', 'delay: 112,');
        lvl = lvl.replaceAll('delay: 116,', 'delay: 140,');
        lvl = lvl.replaceAll('delay: 142,', 'delay: 172,');
        lvl = lvl.replace('{ delay: 8, zombies: [{ type: \'boss\', row: 2 }] }', '{ delay: 15, zombies: [{ type: \'boss\', row: 2 }] }');
        fs.writeFileSync(levelsPath, lvl, 'utf8');
      }
      const zombiesPath = path.join(destDir, 'js', 'zombies.js');
      if (fs.existsSync(zombiesPath)) {
        let zm = fs.readFileSync(zombiesPath, 'utf8');
        zm = zm.replace(/(basic:\s*\{[\s\S]*?speed:\s*)20,/, '$115,');
        zm = zm.replace(/(cone:\s*\{[\s\S]*?speed:\s*)20,/, '$115,');
        zm = zm.replace(/(bucket:\s*\{[\s\S]*?speed:\s*)18,/, '$114,');
        zm = zm.replace(/(shield:\s*\{[\s\S]*?speed:\s*)18,/, '$114,');
        zm = zm.replace(/(gigachad:\s*\{[\s\S]*?speed:\s*)46,\s*normalSpeed:\s*20,/, '$136,\n        normalSpeed: 15,');
        zm = zm.replace(/(couch:\s*\{[\s\S]*?speed:\s*)12,/, '$19.5,');
        zm = zm.replace(/(boss:\s*\{[\s\S]*?speed:\s*)8,/, '$16.5,');
        zm = zm.replace('this.speed = this.type.normalSpeed || 20;', 'this.speed = this.type.normalSpeed || 15;');
        fs.writeFileSync(zombiesPath, zm, 'utf8');
      }
      const plantsPath = path.join(destDir, 'js', 'plants.js');
      if (fs.existsSync(plantsPath)) {
        let pl = fs.readFileSync(plantsPath, 'utf8');
        pl = pl.replaceAll(
          'this.sunTimer = 7.0; // 7 seconds between suns',
          'const sunflowerCount = (game && game.plants) ? game.plants.filter(p => p.typeId === \'sunflower\' && p.hp > 0).length : 1;\n                this.sunTimer = 9.0 + (sunflowerCount * 0.5);'
        );
        pl = pl.replaceAll('this.sunTimer = 2.5 + Math.random() * 1.0;', 'this.sunTimer = 4.5 + Math.random() * 1.0;');
        pl = pl.replaceAll(
          'descTh: \'อชิชุดว่ายน้ำ ผลิตดวงอาทิตย์ 25 แต้ม ทุกๆ 7 วินาทีเพื่อใช้ปลูกตัวอื่น\',',
          'descTh: \'อชิชุดว่ายน้ำ ผลิตดวงอาทิตย์ 25 แต้ม คูลดาวน์พื้นฐาน 9 วินาที (+0.5 วินาทีต่อจำนวนต้นที่ปลูก)\','
        );
        // Increase card deployment cooldowns for high-cost & heavy plants
        pl = pl.replace(/(gatling:\s*\{[\s\S]*?cost:\s*200,\s*cooldown:\s*)10\.0/, '$145.0');
        pl = pl.replace(/(repeater:\s*\{[\s\S]*?cost:\s*175,\s*cooldown:\s*)5\.5/, '$130.0');
        pl = pl.replace(/(bomb:\s*\{[\s\S]*?cost:\s*150,\s*cooldown:\s*)16\.0/, '$145.0');
        pl = pl.replace(/(chomper:\s*\{[\s\S]*?cost:\s*150,\s*cooldown:\s*)7\.5/, '$130.0');
        pl = pl.replace(/(icepea:\s*\{[\s\S]*?cost:\s*150,\s*cooldown:\s*)5\.5/, '$125.0');
        pl = pl.replace(/(jalapeno:\s*\{[\s\S]*?cost:\s*100,\s*cooldown:\s*)16\.0/, '$140.0');
        pl = pl.replace(/(catapult:\s*\{[\s\S]*?cost:\s*100,\s*cooldown:\s*)8\.0/, '$116.0');
        pl = pl.replace(/(wallnut:\s*\{[\s\S]*?cost:\s*50,\s*cooldown:\s*)10\.0/, '$120.0');
        fs.writeFileSync(plantsPath, pl, 'utf8');
      }
      const gameJsPath = path.join(destDir, 'js', 'game.js');
      if (fs.existsSync(gameJsPath)) {
        let gj = fs.readFileSync(gameJsPath, 'utf8');
        gj = gj.replaceAll('this.skySunTimer = 7.0;', 'this.skySunTimer = 9.0;');
        gj = gj.replaceAll('this.skySunTimer = 1.0;', 'this.skySunTimer = 3.0;');
        gj = gj.replaceAll('this.sun = 0;', 'this.sun = 25;');
        gj = gj.replaceAll(': 0;', ': 25;');
        gj = gj.replace(
          'const newPlant = new window.PlantInstance(plantType.id, row, col);\n                    this.plants.push(newPlant);',
          'const newPlant = new window.PlantInstance(plantType.id, row, col);\n                    if (plantType.id === \'sunflower\') {\n                        const sunflowerCount = this.plants.filter(p => p.typeId === \'sunflower\' && p.hp > 0).length + 1;\n                        newPlant.sunTimer += sunflowerCount * 0.5;\n                    }\n                    this.plants.push(newPlant);'
        );
        fs.writeFileSync(gameJsPath, gj, 'utf8');
      }
    }

    console.log(`Updated ${repo.name} -> ${repo.dest}`);
  }
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}

console.log('\nAll 10 GitHub games synced successfully!');
