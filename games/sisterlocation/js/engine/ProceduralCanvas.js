// 100% Procedural Canvas 2D Rendering Engine for Five Nights at Freddy's: Sister Location
// Faithful translation of Unity ProceduralCanvas.cs (1280x720 logical coordinate space)

export class ProceduralCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.logicalWidth = 1280;
    this.logicalHeight = 720;

    this.scaleX = 1;
    this.scaleY = 1;
    this.mouseLogical = { x: -100, y: -100 };
    this.mouseJustPressed = false;
    this.mouseHeld = false;
  }

  beginFrame(mousePos, mousePressed, mouseHeld) {
    this.scaleX = this.canvas.width / this.logicalWidth;
    this.scaleY = this.canvas.height / this.logicalHeight;
    this.mouseLogical = mousePos;
    this.mouseJustPressed = mousePressed;
    this.mouseHeld = mouseHeld;

    // Reset transform to match logical coordinates
    this.ctx.setTransform(this.scaleX, 0, 0, this.scaleY, 0, 0);
  }

  fillRect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  strokeRect(x, y, w, h, thickness, color) {
    this.fillRect(x, y, w, thickness, color);
    this.fillRect(x, y + h - thickness, w, thickness, color);
    this.fillRect(x, y, thickness, h, color);
    this.fillRect(x + w - thickness, y, thickness, h, color);
  }

  drawLine(x1, y1, x2, y2, thickness, color) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = thickness;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawCircle(cx, cy, r, color, fill = true) {
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, Math.max(0.1, r), 0, Math.PI * 2);
    if (fill) {
      this.ctx.fillStyle = color;
      this.ctx.fill();
    } else {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }

  drawText(text, x, y, fontSize, color, align = 'left', maxWidth = 800, maxHeight = 120, bold = true) {
    if (!text) return;
    this.ctx.save();
    this.ctx.font = `${bold ? 'bold ' : ''}${Math.round(fontSize)}px 'Share Tech Mono', 'VT323', monospace, sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textBaseline = 'middle';

    const lines = String(text).split('\n');
    const lineHeight = fontSize * 1.25;

    let startY = y + lineHeight / 2;
    if (align === 'center' || align === 'middle-center') {
      this.ctx.textAlign = 'center';
      const totalH = lines.length * lineHeight;
      startY = y + (maxHeight - totalH) / 2 + lineHeight / 2;
      const centerX = x + maxWidth / 2;
      for (let i = 0; i < lines.length; i++) {
        this.ctx.fillText(lines[i], centerX, startY + i * lineHeight, maxWidth);
      }
    } else {
      this.ctx.textAlign = 'left';
      for (let i = 0; i < lines.length; i++) {
        this.ctx.fillText(lines[i], x, startY + i * lineHeight, maxWidth);
      }
    }
    this.ctx.restore();
  }

  isHovered(x, y, w, h) {
    return (
      this.mouseLogical.x >= x &&
      this.mouseLogical.x <= x + w &&
      this.mouseLogical.y >= y &&
      this.mouseLogical.y <= y + h
    );
  }

  button(x, y, w, h, label, bgColor = '#1e2433', textColor = '#ffffff', fontSize = 16) {
    const hovered = this.isHovered(x, y, w, h);
    const drawBg = hovered ? this._lightenColor(bgColor, 0.25) : bgColor;

    this.fillRect(x, y, w, h, drawBg);
    this.strokeRect(x, y, w, h, 2, hovered ? '#facc15' : 'rgba(255, 255, 255, 0.35)');
    this.drawText(label, x, y, fontSize, textColor, 'center', w, h, true);

    return hovered && this.mouseJustPressed;
  }

  _lightenColor(col, factor) {
    // Quick helper to blend with white on hover
    if (col.startsWith('#')) {
      return col;
    }
    return col;
  }

  /// <summary>
  /// Renders articulated Funtime Animatronic with 4 split faceplates, endoskeleton, and eye color.
  /// Faithful to ProceduralCanvas.cs DrawAnimatronicHead
  /// </summary>
  drawAnimatronicHead(animatronicId, cx, cy, scale, faceplateOpenAmount, jawOpenAmount = 0, endoOnly = false) {
    const spread = faceplateOpenAmount * 28 * scale;
    const r = 90 * scale;

    // Endoskeleton skull & wires underneath
    this.fillRect(cx - r * 0.65, cy - r * 0.75, r * 1.3, r * 1.5, '#2e3038');
    for (let i = -2; i <= 2; i++) {
      this.fillRect(cx + i * 18 * scale - 3, cy - r * 0.7, 6 * scale, r * 1.35, '#737a85');
      this.fillRect(cx - r * 0.6, cy + i * 20 * scale - 2, r * 1.2, 4 * scale, '#525761');
    }

    // Default palette
    let eyeCol = '#34d399';
    let shellMain = '#ebebf2';
    let accent = '#e11d48';

    switch (animatronicId) {
      case 'circus_baby':
        eyeCol = '#22c55e';
        shellMain = '#f3f4f6';
        accent = '#e11d48';
        // Pigtails
        this.fillRect(cx - r * 1.55 - spread * 0.4, cy - r * 0.85, r * 0.55, r * 1.3, '#c2410c');
        this.fillRect(cx + r * 1.0 + spread * 0.4, cy - r * 0.85, r * 0.55, r * 1.3, '#c2410c');
        break;
      case 'ballora':
        eyeCol = '#d946ef';
        shellMain = '#ede9fe';
        accent = '#3b82f6';
        // Tiara
        this.fillRect(cx - r * 0.45, cy - r * 1.15 - spread * 0.5, r * 0.9, r * 0.25, '#facc15');
        break;
      case 'funtime_freddy':
        eyeCol = '#38bdf8';
        shellMain = '#f1f5f9';
        accent = '#a855f7';
        // Top hat & ears
        this.fillRect(cx - r * 0.35, cy - r * 1.45 - spread * 0.5, r * 0.7, r * 0.55, '#1e1e24');
        this.fillRect(cx - r * 0.95 - spread, cy - r * 1.1 - spread, r * 0.35, r * 0.35, accent);
        this.fillRect(cx + r * 0.6 + spread, cy - r * 1.1 - spread, r * 0.35, r * 0.35, accent);
        break;
      case 'funtime_foxy':
        eyeCol = '#f59e0b';
        shellMain = '#f8fafc';
        accent = '#f43f5e';
        // Fox ears
        this.fillRect(cx - r * 0.95 - spread, cy - r * 1.25 - spread, r * 0.32, r * 0.5, accent);
        this.fillRect(cx + r * 0.63 + spread, cy - r * 1.25 - spread, r * 0.32, r * 0.5, accent);
        break;
      case 'ennard':
        eyeCol = '#38bdf8';
        shellMain = '#e2e8f0';
        accent = '#dc2626';
        // Striped party hat (green/yellow)
        this.fillRect(cx - r * 0.25, cy - r * 1.45, r * 0.5, r * 0.55, '#22c55e');
        this.fillRect(cx - r * 0.22, cy - r * 1.25, r * 0.44, r * 0.12, '#facc15');
        break;
      case 'yenndo':
        eyeCol = '#facc15';
        endoOnly = true;
        break;
      case 'lolbit':
        eyeCol = '#ffffff';
        shellMain = '#f97316';
        accent = '#a855f7';
        break;
      case 'bidybab':
        eyeCol = '#38bdf8';
        shellMain = '#fef08a';
        accent = '#ef4444';
        break;
      case 'minireena':
      case 'minireena_1':
      case 'minireena_2':
        eyeCol = '#facc15';
        shellMain = '#f5f5f4';
        accent = '#1c1917';
        break;
    }

    // Glowing Endoskeleton Eyes
    this.fillRect(cx - r * 0.48, cy - r * 0.28, r * 0.32, r * 0.26, '#000000');
    this.fillRect(cx + r * 0.16, cy - r * 0.28, r * 0.32, r * 0.26, '#000000');
    this.fillRect(cx - r * 0.4, cy - r * 0.22, r * 0.16, r * 0.15, eyeCol);
    this.fillRect(cx + r * 0.24, cy - r * 0.22, r * 0.16, r * 0.15, eyeCol);

    // Endoskeleton Jaw
    const jawDrop = jawOpenAmount * 22 * scale;
    this.fillRect(cx - r * 0.42, cy + r * 0.25 + jawDrop, r * 0.84, r * 0.32, '#8d949e');
    for (let t = 0; t < 6; t++) {
      this.fillRect(cx - r * 0.36 + t * (r * 0.13), cy + r * 0.18 + jawDrop, r * 0.09, r * 0.09, '#ffffff');
    }

    if (endoOnly) return;

    // 4 Articulated Split Faceplates (Top-Left, Top-Right, Bottom-Left, Bottom-Right)
    const plateW = r * 0.82;
    const plateH = r * 0.78;

    // Top-Left Faceplate
    this.fillRect(cx - plateW - spread - 2, cy - plateH - spread - 2, plateW, plateH * 0.55, shellMain);
    this.fillRect(cx - plateW - spread - 2, cy - plateH * 0.25 - spread, plateW * 0.35, plateH * 0.25, shellMain);

    // Top-Right Faceplate
    this.fillRect(cx + spread + 2, cy - plateH - spread - 2, plateW, plateH * 0.55, shellMain);
    this.fillRect(cx + plateW * 0.65 + spread + 2, cy - plateH * 0.25 - spread, plateW * 0.35, plateH * 0.25, shellMain);

    // Bottom-Left Faceplate + Cheek
    this.fillRect(cx - plateW - spread - 2, cy + spread + 2, plateW, plateH * 0.85, shellMain);
    this.fillRect(cx - plateW * 0.75 - spread, cy + plateH * 0.15 + spread, r * 0.28, r * 0.28, accent);

    // Bottom-Right Faceplate + Cheek
    this.fillRect(cx + spread + 2, cy + spread + 2, plateW, plateH * 0.85, shellMain);
    this.fillRect(cx + plateW * 0.45 + spread, cy + plateH * 0.15 + spread, r * 0.28, r * 0.28, accent);

    // Nose
    const isRedNose = animatronicId === 'circus_baby' || animatronicId === 'ennard';
    this.fillRect(cx - r * 0.14, cy - r * 0.04, r * 0.28, r * 0.18, isRedNose ? '#ef4444' : '#0a0a0c');
  }

  drawCrtScanlinesAndStatic(staticIntensity, vignetteDarkness = 0.28) {
    // Horizontal scanlines
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
    for (let y = 0; y < 720; y += 6) {
      this.ctx.fillRect(0, y, this.logicalWidth, 2);
    }

    // Static snow bars
    if (staticIntensity > 0.01) {
      const bars = Math.min(45, Math.max(2, Math.round(staticIntensity * 36)));
      for (let i = 0; i < bars; i++) {
        const by = Math.random() * this.logicalHeight;
        const bh = 2 + Math.random() * 12;
        const alpha = (0.05 + Math.random() * 0.3) * staticIntensity;
        this.ctx.fillStyle = `rgba(215, 230, 245, ${alpha.toFixed(3)})`;
        this.ctx.fillRect(0, by, this.logicalWidth, bh);
      }
    }

    // Edge vignette
    if (vignetteDarkness > 0.01) {
      this.ctx.fillStyle = `rgba(0, 0, 0, ${vignetteDarkness.toFixed(3)})`;
      this.ctx.fillRect(0, 0, this.logicalWidth, 32);
      this.ctx.fillRect(0, this.logicalHeight - 32, this.logicalWidth, 32);
      this.ctx.fillRect(0, 0, 40, this.logicalHeight);
      this.ctx.fillRect(this.logicalWidth - 40, 0, 40, this.logicalHeight);
    }
  }
}

