import { Game } from './game/Game.js';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.game = game;

  // Auto-join room if URL has ?room=CODE
  const urlParams = new URLSearchParams(window.location.search);
  const roomParam = urlParams.get('room');
  if (roomParam) {
    setTimeout(() => {
      const confirmJoin = confirm(`คุณต้องการเข้าร่วมห้อง "${roomParam.toUpperCase()}" ใช่หรือไม่?`);
      if (confirmJoin) {
        const playerConfig = game.ui.getPlayerConfig();
        game.multiplayer.joinRoom(
          roomParam,
          playerConfig,
          (joinedCode) => {
            game.ui.setupLobbyView(joinedCode, false);
          },
          (err) => {
            alert('ไม่สามารถเชื่อมต่อห้องได้: ' + err.message);
          }
        );
      }
    }, 500);
  }
});

