import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Lightweight in-memory room registry for AshiGame (Meme Duel 4-digit room multiplayer)
const rooms = new Map();

function getLocalIPs() {
  const ifaces = os.networkInterfaces();
  const addresses = [];
  for (const name in ifaces) {
    (ifaces[name] || []).forEach((d) => {
      if (d.family === 'IPv4' && !d.internal) {
        addresses.push({ name, address: d.address });
      }
    });
  }
  return addresses;
}

function createMultiplayerMiddleware(defaultPort) {
  return (req, res, next) => {
    const reqUrl = new URL(req.url || '/', 'http://localhost');
    const pathname = reqUrl.pathname;

    if (!pathname.startsWith('/api/')) return next();

    const sendJSON = (status, payload) => {
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(payload));
    };

    if (pathname === '/api/health') {
      return sendJSON(200, { status: 'ok', timestamp: Date.now() });
    }

    if (pathname === '/api/info') {
      const hostHeader = req.headers.host || '';
      const port = parseInt(hostHeader.split(':')[1], 10) || defaultPort;
      return sendJSON(200, { success: true, port, ips: getLocalIPs() });
    }

    if (pathname === '/api/room/create' && req.method === 'POST') {
      let code;
      do {
        code = String(Math.floor(1000 + Math.random() * 9000));
      } while (rooms.has(code));
      rooms.set(code, {
        code,
        hostConnected: true,
        guestConnected: false,
        events: [],
        lastUpdated: Date.now()
      });
      return sendJSON(200, { success: true, code });
    }

    if (pathname === '/api/room/join' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const { code } = JSON.parse(body || '{}');
          const room = rooms.get(String(code || '').trim());
          if (!room) {
            return sendJSON(404, { success: false, message: 'ไม่พบห้องรหัสนี้ กรุณาตรวจสอบโค้ด 4 หลัก' });
          }
          room.guestConnected = true;
          room.lastUpdated = Date.now();
          room.events.push({ id: room.events.length + 1, type: 'GUEST_JOINED', timestamp: Date.now() });
          return sendJSON(200, { success: true, code: room.code });
        } catch {
          return sendJSON(400, { success: false, message: 'Invalid payload' });
        }
      });
      return;
    }

    if (pathname === '/api/room/action' && req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('end', () => {
        try {
          const { code, playerKey, action } = JSON.parse(body || '{}');
          const room = rooms.get(String(code || '').trim());
          if (!room) return sendJSON(404, { success: false, message: 'Room not found' });
          room.lastUpdated = Date.now();
          const item = { id: room.events.length + 1, playerKey, action, timestamp: Date.now() };
          room.events.push(item);
          return sendJSON(200, { success: true, eventId: item.id });
        } catch {
          return sendJSON(400, { success: false, message: 'Invalid payload' });
        }
      });
      return;
    }

    if (pathname === '/api/room/poll' && req.method === 'GET') {
      const code = String(reqUrl.searchParams.get('code') || '').trim();
      const since = parseInt(reqUrl.searchParams.get('since') || '0', 10);
      const room = rooms.get(code);
      if (!room) return sendJSON(404, { success: false, message: 'Room not found' });
      return sendJSON(200, {
        success: true,
        guestConnected: room.guestConnected,
        events: room.events.filter((e) => e.id > since)
      });
    }

    next();
  };
}

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    cors: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  plugins: [
    {
      name: 'ashigame-portal-plugin',
      configureServer(server) {
        server.middlewares.use(createMultiplayerMiddleware(5173));
      },
      configurePreviewServer(server) {
        server.middlewares.use(createMultiplayerMiddleware(4173));
      },
      closeBundle() {
        if (fs.existsSync('games')) {
          fs.cpSync('games', path.join('dist', 'games'), { recursive: true, force: true });
        }
      }
    }
  ]
});
