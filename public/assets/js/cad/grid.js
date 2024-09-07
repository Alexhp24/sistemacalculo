export class Grid {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  set(size, canvas) {
    const ctx = canvas.getContext("2d")
    this.size = size;

    var wt = Math.ceil(canvas.width / size);
    var ht = Math.ceil(canvas.height / size);
    this.width = (wt + (wt % 2)) * size + 1;
    this.height = (ht + (ht % 2)) * size + 1;

    this.x = 0;
    this.y = 0;

    this.origo = {
      x: Math.round(this.width / (this.size * 2)),
      y: Math.round(this.height / (this.size * 2)),
    };

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.createGrid();
    this.draw(ctx);
  }

  createGrid() {
    var x = 0,
      y = 0,
      w = this.width - 1,
      h = this.height - 1;

    this.ctx.save();
    this.ctx.strokeStyle = "#282828";
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    while (x < w) {
      x += this.size;
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + h);
    }
    x = 0;
    while (y < h) {
      y += this.size;
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + w, y);
    }
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.fillStyle = "#383838";
    this.ctx.arc(this.origo.x * this.size, this.origo.y * this.size, 5, 0, 2 * Math.PI);
    this.ctx.fill();

    this.ctx.restore();
  }

  draw(ctx) {
    ctx.drawImage(this.canvas, this.x, this.y);
  }

  translate(x, y, snap_enabled) {
    if (snap_enabled) {
      // Snap to grid
      x = Math.round((x - this.x) / this.size);
      y = Math.round((y - this.y) / this.size);
    } else {
      // Free form
      x = (x - this.x) / this.size;
      y = (y - this.y) / this.size;
    }

    return {
      x: x - this.origo.x,
      y: this.origo.y - y,
    };
  }

  toPoint(p) {
    return {
      x: (p.x + this.origo.x) * this.size + this.x,
      y: (this.origo.y - p.y) * this.size + this.y,
      visible: p.visible,
      color: p.color,
    };
  }
}