export class Minimap {
  constructor(canvasElement, track) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.setTrack(track);
  }

  setTrack(track) {
    this.track = track;
    this.bounds = this.computeBounds();
  }

  computeBounds() {
    if (!this.track || !this.track.samplePos) {
      return { minX: -100, maxX: 100, minZ: -100, maxZ: 100, midX: 0, midZ: 0, maxRange: 200 };
    }

    const b = this.track.getBounds();
    const padding = 30;
    const rangeX = (b.maxX - b.minX) + padding * 2;
    const rangeZ = (b.maxZ - b.minZ) + padding * 2;
    const maxRange = Math.max(rangeX, rangeZ, 50);

    return {
      minX: b.minX,
      maxX: b.maxX,
      minZ: b.minZ,
      maxZ: b.maxZ,
      midX: b.cx,
      midZ: b.cz,
      maxRange
    };
  }

  worldToMap(worldX, worldZ) {
    const usableSize = this.width - 24;
    const normX = (worldX - (this.bounds.midX - this.bounds.maxRange / 2)) / this.bounds.maxRange;
    // Invert Z so forward on start straight (+Z) points UP on the minimap
    const normZ = ((this.bounds.midZ + this.bounds.maxRange / 2) - worldZ) / this.bounds.maxRange;

    return {
      x: Math.max(4, Math.min(this.width - 4, normX * usableSize + 12)),
      y: Math.max(4, Math.min(this.height - 4, normZ * usableSize + 12))
    };
  }

  render(playerCar, otherCars = []) {
    if (!this.track) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Track path background glow
    ctx.strokeStyle = '#1a2238';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    this.drawPath(ctx);

    // Track road outline
    ctx.strokeStyle = this.track.theme?.railB ? `#${this.track.theme.railB.toString(16).padStart(6, '0')}` : '#324060';
    ctx.lineWidth = 6;
    this.drawPath(ctx);

    // Start / Finish marker
    const startPt = this.track.samplePos[0];
    if (startPt) {
      const startMap = this.worldToMap(startPt.x, startPt.z);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(startMap.x - 5, startMap.y - 2, 10, 4);
    }

    // Render other racers (AI or Friends)
    otherCars.forEach((car) => {
      if (!car || !car.position) return;
      const m = this.worldToMap(car.position.x, car.position.z);
      ctx.fillStyle = car.bodyColor || '#ffaa00';
      ctx.beginPath();
      ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Render Player with directional arrow
    if (playerCar && playerCar.position) {
      const pm = this.worldToMap(playerCar.position.x, playerCar.position.z);
      ctx.save();
      ctx.translate(pm.x, pm.y);

      // Pulse ring
      ctx.strokeStyle = '#00f0ffaa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
      ctx.stroke();

      // Heading arrow: Inverted rotation so that rotationY = 0 points UP
      const angle = -playerCar.rotationY;
      ctx.rotate(angle);
      ctx.fillStyle = '#00f3ff';
      ctx.beginPath();
      ctx.moveTo(0, -7);
      ctx.lineTo(5, 5);
      ctx.lineTo(0, 3);
      ctx.lineTo(-5, 5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  drawPath(ctx) {
    if (!this.track || !this.track.samplePos) return;
    const N = this.track.sampleCount;
    const stride = Math.max(1, Math.floor(N / 120));
    ctx.beginPath();
    let first = true;
    for (let i = 0; i < N; i += stride) {
      const pt = this.track.samplePos[i];
      const m = this.worldToMap(pt.x, pt.z);
      if (first) {
        ctx.moveTo(m.x, m.y);
        first = false;
      } else {
        ctx.lineTo(m.x, m.y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
}
