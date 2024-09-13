export class Grid {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.offestX = 0;
    this.offestY = 0;
    this.scaleX = 1.0;
    this.scaleY = 1.0;
    this.size = 3;
  }

  set(size, canvas) {
    this.width = this.canvas.width = canvas.width;
    this.height = this.canvas.height = canvas.height;
    this.ctx.save();
    this.ctx.strokeStyle = "#282828";
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.fill();
    this.ctx.restore();
    const ctx = canvas.getContext("2d");
    this.createGrid();
    this.draw(ctx);
  }

  createGrid() {
    const ctx = this.ctx; // Assuming you're using a canvas context
    const gridSpacing = 50; // Define grid spacing in world coordinates

    const screenWidth = this.canvas.width;
    const screenHeight = this.canvas.height;

    // Convert screen bounds to world coordinates
    const topLeftWorld = this.screenToWorld({ x: 0, y: 0 });
    const bottomRightWorld = this.screenToWorld({ x: screenWidth, y: screenHeight });

    // Vertical lines
    const minX = Math.floor(topLeftWorld.x / gridSpacing) * gridSpacing;
    const maxX = Math.ceil(bottomRightWorld.x / gridSpacing) * gridSpacing;
    for (let x = minX; x <= maxX; x += gridSpacing) {
      const screenPoint1 = this.worldToScreen({ x: x, y: topLeftWorld.y });
      const screenPoint2 = this.worldToScreen({ x: x, y: bottomRightWorld.y });

      ctx.beginPath();
      ctx.moveTo(screenPoint1.x, screenPoint1.y);
      ctx.lineTo(screenPoint2.x, screenPoint2.y);
      ctx.strokeStyle = "#ccc"; // Grid line color
      ctx.stroke();
    }

    // Horizontal lines
    const minY = Math.floor(topLeftWorld.y / gridSpacing) * gridSpacing;
    const maxY = Math.ceil(bottomRightWorld.y / gridSpacing) * gridSpacing;
    for (let y = minY; y <= maxY; y += gridSpacing) {
      const screenPoint1 = this.worldToScreen({ x: topLeftWorld.x, y: y });
      const screenPoint2 = this.worldToScreen({ x: bottomRightWorld.x, y: y });

      ctx.beginPath();
      ctx.moveTo(screenPoint1.x, screenPoint1.y);
      ctx.lineTo(screenPoint2.x, screenPoint2.y);
      ctx.strokeStyle = "#ccc"; // Grid line color
      ctx.stroke();
    }
  }

  draw(ctx) {
    ctx.drawImage(this.canvas, 0, 0);
  }

  worldToScreen(p) {
    return {
      x: (p.x - this.offestX) * this.scaleX,
      y: (p.y - this.offestY) * this.scaleY,
    };
  }

  screenToWorld(p) {
    return {
      x: p.x / this.scaleX + this.offestX,
      y: p.y / this.scaleY + this.offestY,
    };
  }
}
