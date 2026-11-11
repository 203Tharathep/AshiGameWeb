import { Peer } from 'peerjs';

export class MultiplayerManager {
  constructor(onStateChange, onChatMessage) {
    this.onStateChange = onStateChange;
    this.onChatMessage = onChatMessage;
    this.peer = null;
    this.isHost = false;
    this.roomCode = null;
    this.connections = new Map(); // peerId -> DataConnection (host side)
    this.hostConn = null;          // DataConnection to host (client side)
    this.players = new Map();     // peerId -> playerInfo
    this.localPlayerId = null;
    this.localPlayerInfo = {
      name: 'นักซิ่งอาชิ',
      carId: 'gt',
      skinId: 'green_dress',
      color: '#ff2255',
      isReady: false
    };

    this.sendInterval = null;
    this.lastSentPacketTime = 0;
  }

  generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  createRoom(playerInfo, onRoomCreated, onError) {
    this.isHost = true;
    this.roomCode = this.generateRoomCode();
    this.localPlayerInfo = { ...playerInfo, isReady: true };

    const peerId = `ashilane-${this.roomCode.toLowerCase()}`;
    this.initPeer(peerId, () => {
      this.localPlayerId = this.peer.id;
      this.players.set(this.localPlayerId, {
        id: this.localPlayerId,
        ...this.localPlayerInfo,
        isHost: true
      });

      if (onRoomCreated) onRoomCreated(this.roomCode);
      this.notifyState();
    }, onError);

    this.peer.on('connection', (conn) => {
      this.handleIncomingConnection(conn);
    });
  }

  joinRoom(roomCode, playerInfo, onJoined, onError) {
    this.isHost = false;
    this.roomCode = roomCode.toUpperCase().trim();
    this.localPlayerInfo = { ...playerInfo, isReady: false };

    this.initPeer(null, () => {
      this.localPlayerId = this.peer.id;
      const hostPeerId = `ashilane-${this.roomCode.toLowerCase()}`;
      const conn = this.peer.connect(hostPeerId, { reliable: true });

      conn.on('open', () => {
        this.hostConn = conn;
        // Send join packet
        conn.send({
          type: 'JOIN',
          player: this.localPlayerInfo
        });
        if (onJoined) onJoined(this.roomCode);
      });

      conn.on('data', (data) => {
        this.handleClientReceivedData(data);
      });

      conn.on('close', () => {
        alert('หลุดการเชื่อมต่อจากเจ้าของห้อง (Host disconnected)');
      });

      conn.on('error', (err) => {
        if (onError) onError(err);
      });
    }, onError);
  }

  initPeer(peerId, onSuccess, onError) {
    try {
      this.peer = peerId ? new Peer(peerId) : new Peer();

      this.peer.on('open', () => {
        if (onSuccess) onSuccess();
      });

      this.peer.on('error', (err) => {
        console.error('PeerJS error:', err);
        if (onError) onError(err);
      });
    } catch (e) {
      if (onError) onError(e);
    }
  }

  handleIncomingConnection(conn) {
    conn.on('open', () => {
      this.connections.set(conn.peer, conn);
    });

    conn.on('data', (data) => {
      this.handleHostReceivedData(conn.peer, data);
    });

    conn.on('close', () => {
      this.connections.delete(conn.peer);
      this.players.delete(conn.peer);
      this.broadcast({
        type: 'PLAYER_LEFT',
        peerId: conn.peer
      });
      this.notifyState();
    });
  }

  handleHostReceivedData(senderPeerId, data) {
    if (data.type === 'JOIN') {
      this.players.set(senderPeerId, {
        id: senderPeerId,
        ...data.player,
        isHost: false
      });

      // Send full lobby state to the new client
      const conn = this.connections.get(senderPeerId);
      if (conn) {
        conn.send({
          type: 'WELCOME',
          players: Array.from(this.players.values())
        });
      }

      // Broadcast new player to everyone else
      this.broadcast({
        type: 'PLAYER_JOINED',
        player: this.players.get(senderPeerId)
      }, senderPeerId);

      this.notifyState();
    } else if (data.type === 'UPDATE_PLAYER') {
      const p = this.players.get(senderPeerId);
      if (p) {
        Object.assign(p, data.player);
        this.broadcast({
          type: 'PLAYER_UPDATED',
          peerId: senderPeerId,
          player: p
        });
        this.notifyState();
      }
    } else if (data.type === 'CAR_TRANSFORM') {
      // Relay racer transform to other peers
      this.broadcast(data, senderPeerId);
    } else if (data.type === 'CHAT') {
      this.broadcast(data);
      if (this.onChatMessage) this.onChatMessage(data);
    }
  }

  handleClientReceivedData(data) {
    if (data.type === 'WELCOME') {
      this.players.clear();
      data.players.forEach(p => this.players.set(p.id, p));
      this.notifyState();
    } else if (data.type === 'PLAYER_JOINED') {
      this.players.set(data.player.id, data.player);
      this.notifyState();
    } else if (data.type === 'PLAYER_UPDATED') {
      this.players.set(data.peerId, data.player);
      this.notifyState();
    } else if (data.type === 'PLAYER_LEFT') {
      this.players.delete(data.peerId);
      this.notifyState();
    } else if (data.type === 'START_RACE') {
      if (this.onStartRaceCallback) {
        this.onStartRaceCallback(data);
      }
    } else if (data.type === 'CAR_TRANSFORM') {
      if (this.onRacerTransform) {
        this.onRacerTransform(data);
      }
    } else if (data.type === 'CHAT') {
      if (this.onChatMessage) this.onChatMessage(data);
    }
  }

  broadcast(data, excludePeerId = null) {
    this.connections.forEach((conn, peerId) => {
      if (peerId !== excludePeerId && conn.open) {
        conn.send(data);
      }
    });
  }

  sendToHost(data) {
    if (this.hostConn && this.hostConn.open) {
      this.hostConn.send(data);
    }
  }

  updateLocalPlayer(info) {
    this.localPlayerInfo = { ...this.localPlayerInfo, ...info };
    if (this.isHost) {
      const p = this.players.get(this.localPlayerId);
      if (p) Object.assign(p, this.localPlayerInfo);
      this.broadcast({
        type: 'PLAYER_UPDATED',
        peerId: this.localPlayerId,
        player: this.localPlayerInfo
      });
      this.notifyState();
    } else {
      this.sendToHost({
        type: 'UPDATE_PLAYER',
        player: this.localPlayerInfo
      });
    }
  }

  startRace(settings = {}) {
    if (!this.isHost) return;
    const packet = {
      type: 'START_RACE',
      startTime: Date.now() + 3500, // 3.5s countdown
      settings
    };
    this.broadcast(packet);
    if (this.onStartRaceCallback) {
      this.onStartRaceCallback(packet);
    }
  }

  sendTransform(transformData) {
    const packet = {
      type: 'CAR_TRANSFORM',
      peerId: this.localPlayerId,
      ...transformData
    };
    if (this.isHost) {
      this.broadcast(packet);
    } else {
      this.sendToHost(packet);
    }
  }

  sendChat(message, emote = null) {
    const packet = {
      type: 'CHAT',
      senderId: this.localPlayerId,
      senderName: this.localPlayerInfo.name,
      message,
      emote,
      timestamp: Date.now()
    };
    if (this.isHost) {
      this.broadcast(packet);
      if (this.onChatMessage) this.onChatMessage(packet);
    } else {
      this.sendToHost(packet);
    }
  }

  notifyState() {
    if (this.onStateChange) {
      this.onStateChange({
        roomCode: this.roomCode,
        isHost: this.isHost,
        localPlayerId: this.localPlayerId,
        players: Array.from(this.players.values())
      });
    }
  }

  disconnect() {
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.connections.clear();
    this.players.clear();
    this.hostConn = null;
  }
}

