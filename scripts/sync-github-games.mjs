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
      repo.name === 'FiveNightsAtAshi3'
    ) {
      const fnafHtmlPath = path.join(destDir, 'index.html');
      let html = fs.readFileSync(fnafHtmlPath, 'utf8');
      html = html.replace(
        /max-width:\s*100vw;\s*max-height:\s*100vh;\s*aspect-ratio:\s*16\s*\/\s*9;/,
        'flex-shrink: 0;\n    transform-origin: center center;'
      );
      if (repo.name === 'FiveNightsAtAshi' && !html.includes('fitGameWrap')) {
        html = html.replace(
          '// Mouse Tracking for Office Panning',
          `function fitGameWrap() {\n  const wrap = document.getElementById('game-wrap');\n  const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);\n  wrap.style.transform = \`scale(\${scale})\`;\n}\nwindow.addEventListener('resize', fitGameWrap);\nfitGameWrap();\n\n// Mouse Tracking for Office Panning`
        );
      }
      if (repo.name === 'FiveNightsAtAshi2') {
        html = html.replace(
          '<a href="https://github.com/AkashiZai/fivenightatashi" target="_blank" class="switch-game-btn">',
          '<a href="../fivenightatashi/index.html" onclick="switchToPart1(event)" class="switch-game-btn">'
        );
        html = html.replace(
          '<a href="index.html" class="tool-pill" style="text-decoration:none;">Switch to FNaA 1</a>',
          '<a href="../fivenightatashi/index.html" onclick="switchToPart1(event)" class="tool-pill" style="text-decoration:none;">Switch to FNaA 1</a>'
        );
        if (!html.includes('fitGameWrap')) {
          html = html.replace(
            '// Mouse & Keyboard Input',
            `function fitGameWrap() {\n  const wrap = document.getElementById('game-wrap');\n  const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);\n  wrap.style.transform = \`scale(\${scale})\`;\n}\nwindow.addEventListener('resize', fitGameWrap);\nfitGameWrap();\n\nfunction switchToPart1(e) {\n  if (window.top && window.top !== window) {\n    e.preventDefault();\n    window.top.location.hash = '#play/fivenightatashi';\n  }\n}\n\n// Mouse & Keyboard Input`
          );
        }
      }
      if (repo.name === 'FiveNightsAtAshi3') {
        html = html.replaceAll(
          'href="https://github.com/AkashiZai/fivenightatashi" target="_blank"',
          'href="../fivenightatashi/index.html" onclick="switchToPart(event, \'fivenightatashi\')"'
        );
        html = html.replaceAll(
          'href="https://github.com/AkashiZai/fivenightatashi2" target="_blank"',
          'href="../fivenightatashi2/index.html" onclick="switchToPart(event, \'fivenightatashi2\')"'
        );
        if (!html.includes('fitGameWrap')) {
          html = html.replace(
            '// Mouse & Keyboard Input',
            `function fitGameWrap() {\n  const wrap = document.getElementById('game-wrap');\n  const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);\n  wrap.style.transform = \`scale(\${scale})\`;\n}\nwindow.addEventListener('resize', fitGameWrap);\nfitGameWrap();\n\nfunction switchToPart(e, gameId) {\n  if (window.top && window.top !== window) {\n    e.preventDefault();\n    window.top.location.hash = '#play/' + gameId;\n  }\n}\n\n// Mouse & Keyboard Input`
          );
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

      // Increase sun spawn interval by 2 seconds
      const levelsPath = path.join(destDir, 'js', 'levels.js');
      if (fs.existsSync(levelsPath)) {
        let lvl = fs.readFileSync(levelsPath, 'utf8');
        lvl = lvl.replaceAll('skySunInterval: 4.5,', 'skySunInterval: 6.5,');
        lvl = lvl.replaceAll('skySunInterval: 6.0,', 'skySunInterval: 8.0,');
        lvl = lvl.replaceAll('skySunInterval: 4.2,', 'skySunInterval: 6.2,');
        lvl = lvl.replaceAll('skySunInterval: 3.8,', 'skySunInterval: 5.8,');
        fs.writeFileSync(levelsPath, lvl, 'utf8');
      }
      const plantsPath = path.join(destDir, 'js', 'plants.js');
      if (fs.existsSync(plantsPath)) {
        let pl = fs.readFileSync(plantsPath, 'utf8');
        pl = pl.replaceAll('this.sunTimer = 7.0; // 7 seconds between suns', 'this.sunTimer = 9.0; // 9 seconds between suns (+2s)');
        pl = pl.replaceAll('this.sunTimer = 2.5 + Math.random() * 1.0;', 'this.sunTimer = 4.5 + Math.random() * 1.0;');
        fs.writeFileSync(plantsPath, pl, 'utf8');
      }
      const gameJsPath = path.join(destDir, 'js', 'game.js');
      if (fs.existsSync(gameJsPath)) {
        let gj = fs.readFileSync(gameJsPath, 'utf8');
        gj = gj.replaceAll('this.skySunTimer = 7.0;', 'this.skySunTimer = 9.0;');
        gj = gj.replaceAll('this.skySunTimer = 1.0;', 'this.skySunTimer = 3.0;');
        fs.writeFileSync(gameJsPath, gj, 'utf8');
      }
    }

    console.log(`Updated ${repo.name} -> ${repo.dest}`);
  }
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}

console.log('\nAll 8 GitHub games synced successfully!');
