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

    if (repo.name === 'FiveNightsAtAshi') {
      const fnafHtmlPath = path.join(destDir, 'index.html');
      let html = fs.readFileSync(fnafHtmlPath, 'utf8');
      html = html.replace(
        /max-width:\s*100vw;\s*max-height:\s*100vh;\s*aspect-ratio:\s*16\s*\/\s*9;/,
        'flex-shrink: 0;\n    transform-origin: center center;'
      );
      if (!html.includes('fitGameWrap')) {
        html = html.replace(
          '// Mouse Tracking for Office Panning',
          `function fitGameWrap() {\n  const wrap = document.getElementById('game-wrap');\n  const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720);\n  wrap.style.transform = \`scale(\${scale})\`;\n}\nwindow.addEventListener('resize', fitGameWrap);\nfitGameWrap();\n\n// Mouse Tracking for Office Panning`
        );
      }
      fs.writeFileSync(fnafHtmlPath, html, 'utf8');
    }

    console.log(`Updated ${repo.name} -> ${repo.dest}`);
  }
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}

console.log('\nAll 4 GitHub games synced successfully!');
