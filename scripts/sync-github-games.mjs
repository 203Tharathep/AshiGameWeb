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

    console.log(`Updated ${repo.name} -> ${repo.dest}`);
  }
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}

console.log('\nAll 6 GitHub games synced successfully!');
