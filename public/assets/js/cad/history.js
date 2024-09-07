export class History {
  constructor() {
    this.clear();
  }

  clear() {
    this.pointsHistory = [];
    this.tail = -1;
  }

  commit(points) {
    // Remove any history after the current tail
    var splice_index = this.tail + 1;
    if (splice_index <= this.pointsHistory.length - 1) {
      this.pointsHistory.splice(splice_index, this.pointsHistory.length - splice_index);
    }
    // Add the new point set to the history
    var clone = this.clone(points);
    this.pointsHistory.push(this.clone(points));
    this.tail = this.pointsHistory.length - 1;
  }

  undo() {
    --this.tail;
    if (this.tail <= -1) {
      this.tail = -1;
      return [];
    } else {
      return this.clone(this.pointsHistory[this.tail]);
    }
  }

  redo() {
    ++this.tail;
    if (this.tail > this.pointsHistory.length - 1) {
      this.tail = this.pointsHistory.length - 1;
      console.log("Nothing to redo.");
    }
    if (this.tail === -1) {
      return [];
    } else {
      return this.clone(this.pointsHistory[this.tail]);
    }
  }

  clone(points) {
    var pointsClone = [];
    for (var i = 0, len = points.length; i < len; i++) {
      pointsClone.push({
        x: points[i].x,
        y: points[i].y,
        visible: points[i].visible,
        color: points[i].color,
      });
    }
    return pointsClone;
  }
}