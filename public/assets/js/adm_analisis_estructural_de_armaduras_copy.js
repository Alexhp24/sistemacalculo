function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  const style = getComputedStyle(canvas);

  // Adjust for the CSS padding and border of the canvas
  const paddingLeft = parseFloat(style.paddingLeft);
  const paddingTop = parseFloat(style.paddingTop);
  const borderLeft = parseFloat(style.borderLeftWidth);
  const borderTop = parseFloat(style.borderTopWidth);

  // Calculate the mouse position
  const x = evt.clientX - rect.left - paddingLeft - borderLeft;
  const y = evt.clientY - rect.top - paddingTop - borderTop;

  return {
    x: (x / (rect.width - paddingLeft - borderLeft * 2)) * canvas.width,
    y: (y / (rect.height - paddingTop - borderTop * 2)) * canvas.height,
  };
}

document.addEventListener("DOMContentLoaded", () => {


  
  var VERSION = "3.2";

  // Init GUI Components
  var canvas = document.querySelector("#plot canvas");
  var div = document.querySelector("#plot div");
  var form = document.querySelector("#plot form");
  var text = document.querySelector("#plot textarea");
  var ctx = canvas.getContext("2d");
  const editor = document.getElementById("editor");
  const input = document.createElement("input");
  input.type = "number";
  input.style.color = "black";
  input.style.position = "absolute";
  input.style.top = 0;
  input.style.left = 0;
  input.style.transform = "translate(-50%,-50%)";
  // Global vars
  var Tools = {
    MOVE: 0,
    LINE: 1,
    ADD: 2,
    CUT: 3,
    ORIGIN: 4,
    VISIBILITY: 5,
    COLORIZE: 6,
  };
  var Styles = {
    ARRAY: 0,
    ONE_ARRAY: 1,
    NORMALIZED: 2,
    ONE_NORMALIZED: 3,
  };
  const shapes = [];
  var shape,
    grid,
    history,
    currentTool = Tools.LINE,
    mousePos = { x: 0, y: 0 },
    snap_enabled = true;
  input.addEventListener("keyup", (ev) => {
    if (ev.which === 13) {
      const last_point = shape.getLastPoint();
      const unitVec = {
        x: (mousePos.x - last_point.x) / pointDistance(last_point, mousePos),
        y: (mousePos.y - last_point.y) / pointDistance(last_point, mousePos),
      };
      const distance = parseFloat(input.value);
      const newPoint = { x: last_point.x + unitVec.x * distance, y: last_point.y + unitVec.y * distance };
      const isDone = shape.addPointToEnd(newPoint);
      if (isDone) {
        shapes.push(shape);
        editor.removeChild(input);
        shape = new Shape(true);
      }
    }
  });

  var HANDLE_RELATIVE_RADIUS = 0.17; // Vertex handle radius relative to grid spacing
  var handleIsSelected = false;
  var selectedHandleIndex = 0;

  var PEN_COMMAND = 9000;
  var PEN_UP = 7000;
  var PEN_COLOR0 = 8000;

  var COLORS = [
    "#000000", // 00 (Penup)
    "#2020FF", // 01 BLUE
    "#FFFFFF", // 02 WHITE
    "#00FF00", // 03 GREEN
    "#FFFF00", // 04 YELLOW
    "#FF0000", // 05 RED
    "#00FFFF", // 06 CYAN
    "#FF00FF", // 07 MAGENTA
    "#008080", // 08 CYAN_DK
    "#E55300", // 09 ORANGE
    "#8B4513", // 10 BROWN
    "#808000", // 11 YELLOW_DK
    "#808080", // 12 GRAY
    "#404040", // 13 GRAY_DK
    "#87CEFA", // 14 LIGHTSKYBLUE
    "#1E90FF", // 15 DODGERBLUE
    "#ADD8E6", // 16 LIGHTBLUE
  ];

  var current_selected_color = COLORS[1];

  // Functions
  function windowResize() {
    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = parseFloat(getComputedStyle(canvas).width) * scale;
    canvas.height = parseFloat(getComputedStyle(canvas).height) * scale;
    grid.set(parseInt(form.zoom.value));
    redraw();
  }

  //---------------------------------
  // Distance to line segment.
  // Adapted from http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
  function sqr(x) {
    return x * x;
  }
  function pointDistanceSquared(v, w) {
    return sqr(v.x - w.x) + sqr(v.y - w.y);
  }
  function pointDistance(v, w) {
    return Math.sqrt(sqr(v.x - w.x) + sqr(v.y - w.y));
  }
  function distanceToSegmentSquared(p, v, w) {
    var l2 = pointDistanceSquared(v, w);
    if (l2 === 0) return pointDistanceSquared(p, v);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0) return pointDistanceSquared(p, v);
    if (t > 1) return pointDistanceSquared(p, w);
    return pointDistanceSquared(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
  }
  function distanceToSegment(p, v, w) {
    return Math.sqrt(distanceToSegmentSquared(p, v, w));
  }
  //---------------------------------

  function formatCoordinate(coordinate) {
    // Return shortest possible string representation, up to 2 digits of precision
    //   9.00  -> "9"
    //   9.10  -> "9.1"
    //   9.12  -> "9.12"
    //   9.123 -> "9.12"
    return Number(coordinate.toFixed(2)).toString();
  }

  function closestPoint(searchPoint) {
    // Returns null if there are 0 points in the shape
    var shortestDistance = 0.65;
    for (let index = 0; index < shapes.length; index++) {
      const collided = shapes[index].points.find((p, index, points) => {
        const distance = pointDistance(searchPoint, p);
        return distance <= shortestDistance;
      });
      if (collided) {
        return collided;
      }
    }
  }

  function closestLine(searchPoint) {
    var shortestDistance = 0.2;
    return shapes.find((s) => {
      for (let index = 0; index < s.points.length - 1; index++) {
        const lineLength = pointDistance(s.points[index], s.points[index + 1]);
        const d1 = pointDistance(s.points[index], searchPoint);
        const d2 = pointDistance(s.points[index + 1], searchPoint);
        if (d1 + d2 >= lineLength - shortestDistance && d1 + d2 <= lineLength + shortestDistance) {
          return true;
        }
      }
      if (s.points.length > 2) {
        const lineLength = pointDistance(s.points[0], s.points[s.points.length - 1]);
        const d1 = pointDistance(s.points[0], searchPoint);
        const d2 = pointDistance(s.points[s.points.length - 1], searchPoint);
        if (d1 + d2 >= lineLength - shortestDistance && d1 + d2 <= lineLength + shortestDistance) {
          return true;
        }
      }
    });
  }

  function undo() {
    shape.points = history.undo();
    redraw();
  }

  function redo() {
    shape.points = history.redo();
    redraw();
  }

  function switchTool(newTool) {
    currentTool = newTool;
    redraw();
  }

  function drawFinishedShape(s) {
    var i, p, color, line_color;
    ctx.save();
    // Draw lines
    if (s.points.length >= 2) {
      if (s.points[0].color) {
        line_color = COLORS[s.points[0].color];
      } else {
        line_color = "white";
      }
      ctx.strokeStyle = line_color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (i = 0; i < s.points.length; i++) {
        p = grid.toPoint(s.points[i]);
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
          continue;
        }
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        if (p.color) {
          line_color = COLORS[p.color];
        }
        if (p.visible) {
          ctx.strokeStyle = line_color;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
        } else {
          ctx.strokeStyle = "gray";
          ctx.setLineDash([5, 10]);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
        }
      }
      if (s.points.length > 2) {
        const begin = grid.toPoint(s.points[0]);
        ctx.lineTo(begin.x, begin.y);
        ctx.stroke();
      }
      ctx.stroke();
    }

    // Draw vertex handles
    for (i = 0; i < s.points.length; i++) {
      if (handleIsSelected && i === selectedHandleIndex) {
        color = "red";
      } else if (i == s.points.length - 1) {
        color = "blue";
      } else if (i == 0) {
        color = "cyan";
      } else {
        color = "green";
      }
      p = grid.toPoint(s.points[i]);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, HANDLE_RELATIVE_RADIUS * grid.size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawUnfinishedShape(s) {}

  function redraw() {
    var x_pos = 10;
    var y_pos = 15;
    var y_step = 15;
    grid.draw();
    shapes.forEach((s) => {
      drawFinishedShape(s);
    });
    shape.draw(grid);

    ctx.save();
    ctx.font = "12px Helvetica";

    // Show snap mode
    ctx.fillStyle = snap_enabled ? "white" : "red";
    ctx.fillText(snap_enabled ? "Snap Enabled" : "Snap Disabled", x_pos, y_pos);
    y_pos += y_step;

    // Show mouse coordinates
    ctx.fillStyle = "white";
    ctx.fillText("(" + formatCoordinate(mousePos.x) + ", " + formatCoordinate(mousePos.y) + ")", x_pos, y_pos);
    y_pos += y_step;
    const mPos = grid.toPoint(mousePos);
    ctx.fillText("(" + formatCoordinate(mPos.x) + ", " + formatCoordinate(mPos.y) + ")", x_pos, y_pos);
    y_pos += y_step;
    const lp = shape.getLastPoint();
    if (lp) {
      ctx.fillText("(" + formatCoordinate(lp.x) + ", " + formatCoordinate(lp.y) + ")", x_pos, y_pos);
      y_pos += y_step;
      const midPoint = {
        x: (mPos.x + lp.x) * 0.5,
        y: (mPos.y + lp.y) * 0.5,
      };
      ctx.fillText("(" + formatCoordinate(midPoint.x) + ", " + formatCoordinate(midPoint.y) + ")", x_pos, y_pos);
      y_pos += y_step;
    }

    // Show current tool
    var modeText = "";
    switch (currentTool) {
      case Tools.MOVE:
        modeText = "Move";
        break;
      case Tools.LINE:
        modeText = "Line";
        var last_point = shape.getLastPoint();
        if (last_point) {
          var c = grid.toPoint(last_point);
          const mouse = grid.toPoint(mousePos);
          ctx.setLineDash([]);
          ctx.strokeStyle = "gray";
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        break;
      case Tools.ADD:
        modeText = "Add";
        break;
      case Tools.CUT:
        modeText = "Cut";
        break;
      case Tools.ORIGIN:
        modeText = "Change Origin";
        break;
      case Tools.VISIBILITY:
        modeText = "Toggle Visibility";
        break;
      case Tools.COLORIZE:
        modeText = "Colorize";
        break;
    }
    ctx.fillText(modeText, x_pos, y_pos);
    ctx.restore();
  }

  // DataObjs
  var Shape = function (parseUrl) {
    this.reset(parseUrl);
  };
  Shape.prototype = {
    reset: function (parseUrl) {
      this.points = [];

      if (parseUrl) {
        // Can supply initial point data in URL following "?".
        // For example: wwww.mylocation.com/polygondraw.html?[0,0,1,1]
        var pointsString = window.location.search.substring(1);
        var color_index = null;
        var pending_color = null;
        if (pointsString !== "") {
          var pointArray = JSON.parse(pointsString);
          if (pointArray.length % 2 === 0) {
            for (var i = 0, len = pointArray.length; i < len; i += 2) {
              if (pointArray[i] == PEN_COMMAND) {
                if (pointArray[i + 1] == PEN_UP) {
                  this.points[this.points.length - 1].visible = false;
                } else {
                  color_index = pointArray[i + 1] - PEN_COLOR0;
                  if (color_index >= 0 && color_index < COLORS.length) {
                    if (i === 0) {
                      // If a color is specified as the very fist directive,
                      // then that color is applied to the next vertex (which
                      // will be the fist vertex in the data set).  Otherwise,
                      // color directives are applied to the previous vertex.
                      pending_color = color_index;
                    } else {
                      this.points[this.points.length - 1].color = color_index;
                    }
                  }
                }
              } else {
                this.points.push({
                  x: pointArray[i],
                  y: pointArray[i + 1],
                  visible: true,
                  color: pending_color ? pending_color : null,
                });
                pending_color = null;
              }
            }
            // Start in MOVE mode if starting with an existing dataset
            currentTool = Tools.MOVE;
          }
        }
      }
    },

    addPointToEnd: function (position) {
      /* const last_point = this.getLastPoint(); */
      const begin = this.points[0];
      if (this.points.length != 0 && pointDistance(begin, position) <= 0.65) {
        // No noting if the add location is the same as the last point
        return true;
      }
      this.addPointAfterIndex(this.points.length - 1, position);
      return false;
    },

    addPointAfterIndex: function (index, position) {
      shape.points.splice(index + 1, 0, { x: position.x, y: position.y, visible: true, color: null });
      this._optimize();
    },

    getLastPoint: function () {
      if (this.points.length === 0) {
        return null;
      }

      this.last_point = this.points[this.points.length - 1];
      return {
        x: this.last_point.x,
        y: this.last_point.y,
      };
    },

    deletePoint: function (index) {
      this.points.splice(index, 1);
      this._optimize();
    },

    colorizePoint: function (index, color) {
      this.points[index].color = color;
      this._optimize();
    },

    _optimize: function () {
      // Optimize the color assignments.  Color only needs to be specified once, on
      // the first node that the color is drawn TO (not from)
      var i, point, color;
      color = null;
      for (i = 0; i < this.points.length; i++) {
        point = this.points[i];
        if (color !== null && point.color == color) {
          point.color = null;
        }
        if (point.color !== null) {
          color = point.color;
        }
      }
    },

    draw: function (grid_) {
      var i, p, color, line_color;

      ctx.save();

      // Draw lines
      if (this.points.length >= 2) {
        if (this.points[0].color) {
          line_color = COLORS[this.points[0].color];
        } else {
          line_color = "white";
        }
        ctx.strokeStyle = line_color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (i = 0; i < this.points.length; i++) {
          p = grid_.toPoint(this.points[i]);
          if (i === 0) {
            ctx.moveTo(p.x, p.y);
            continue;
          }
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          if (p.color) {
            line_color = COLORS[p.color];
          }

          if (p.visible) {
            ctx.strokeStyle = line_color;
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
          } else {
            ctx.strokeStyle = "gray";
            ctx.setLineDash([5, 10]);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      // Draw vertex handles
      for (i = 0; i < this.points.length; i++) {
        if (handleIsSelected && i === selectedHandleIndex) {
          color = "red";
        } else if (i == this.points.length - 1) {
          color = "blue";
        } else if (i == 0) {
          color = "cyan";
        } else {
          color = "green";
        }
        p = grid_.toPoint(this.points[i]);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, HANDLE_RELATIVE_RADIUS * grid.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    },
  };

  var History = function () {
    this.clear();
  };

  History.prototype = {
    clear: function () {
      this.pointsHistory = [];
      this.tail = -1;
    },

    commit: function (points) {
      // Remove any history after the current tail
      var splice_index = this.tail + 1;
      if (splice_index <= this.pointsHistory.length - 1) {
        this.pointsHistory.splice(splice_index, this.pointsHistory.length - splice_index);
      }
      // Add the new point set to the history
      var clone = this.clone(points);
      this.pointsHistory.push(this.clone(points));
      this.tail = this.pointsHistory.length - 1;
    },

    undo: function () {
      --this.tail;
      if (this.tail <= -1) {
        this.tail = -1;
        return [];
      } else {
        return this.clone(this.pointsHistory[this.tail]);
      }
    },

    redo: function () {
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
    },

    clone: function (points) {
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
    },
  };

  var Grid = function () {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
  };
  Grid.prototype = {
    set: function (size) {
      this.size = size;

      var wt = Math.ceil(canvas.width / size);
      var ht = Math.ceil(canvas.height / size);
      this.width = (wt + (wt % 2)) * size + 1;
      this.height = (ht + (ht % 2)) * size + 1;

      this.x = 0;
      this.y = 0;

      /*       this.x = Math.round((canvas.width - this.width) / 2);
      this.y = Math.round((canvas.height - this.height) / 2); */

      this.origo = {
        x: Math.round(this.width / (this.size * 2)),
        y: Math.round(this.height / (this.size * 2)),
      };

      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.createGrid();
      this.draw();
    },

    createGrid: function () {
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
    },

    draw: function () {
      ctx.drawImage(this.canvas, this.x, this.y);
    },

    translate: function (x, y) {
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
    },

    toPoint: function (p) {
      return {
        x: (p.x + this.origo.x) * this.size + this.x,
        y: (this.origo.y - p.y) * this.size + this.y,
        visible: p.visible,
        color: p.color,
      };
    },
  };

  // Setup
  shape = new Shape(true);
  grid = new Grid();
  history = new History();

  windowResize();
  redraw();

  window.onresize = windowResize;

  form.zoom.oninput = function () {
    // Responds during slide Firefox, Safari, Chrome
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.set(parseInt(this.value));
    redraw();
  };

  form.zoom.onchange = function () {
    // IE10 support (IE10 does not support oninput)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.set(parseInt(this.value));
    redraw();
  };

  canvas.onmousedown = function (evt) {
    const { x, y } = getMousePos(canvas, evt);
    if (0 > x || canvas.width < x || 0 > y || canvas.height < y) {
      return;
    }

    var click = grid.translate(x, y);
    var index, i, len;
    switch (currentTool) {
      case Tools.LINE:
        const isDone = shape.addPointToEnd(click);
        if (shape.points.length >= 1) {
          editor.appendChild(input);
        }
        if (isDone) {
          shapes.push(shape);
          editor.removeChild(input);
          /* document.getElementById("polygons").innerHTML += `
          <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
            <th class="text-xl py-2 px-4 text-left" colspan="4">Poligono ${shapes.length}
            </th>
          </tr>
          <tr class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
            <th class="text-lg py-2 px-8" scope="col">X
            </th>
            <th class="text-lg py-2 px-4" scope="col">Y</th>
          </tr>
          ${shape.points.reduce((body, p) => {
            return (
              body +
              `
              <tr class="bg-gray-100 dark:bg-gray-600">
                <td class="py-2 px-4">${p.x.toFixed(2)}</td>
                <td class="py-2 px-4">${p.y.toFixed(2)}</td>
              </tr>`
            );
          }, "")}
          `; */
          shape = new Shape(true);
        }
        history.commit(shape.points);
        break;

      case Tools.MOVE:
        if (handleIsSelected) {
          handleIsSelected = false;
          history.commit(shape.points);
        } else {
          index = closestPoint(click);
          if (index) {
            handleIsSelected = true;
            selectedHandleIndex = index;
          } else if ((index = closestLine(click))) {
            handleIsSelected = true;
            selectedHandleIndex = index;
          }
        }
        break;

      case Tools.ADD:
        len = shape.points.length;
        var shortestDistance = 10000000000;
        var matchIndex = 0;
        if (len >= 2) {
          // Find the nearest line segment to the click
          for (i = 0; i < len - 1; i++) {
            var distance = distanceToSegment(click, shape.points[i], shape.points[i + 1]);
            if (distance < shortestDistance) {
              shortestDistance = distance;
              matchIndex = i;
            }
          }
          // Add the new point
          shape.addPointAfterIndex(matchIndex, click);
          history.commit(shape.points);
        }
        break;

      case Tools.CUT:
        index = closestPoint(click);
        shape.deletePoint(index);
        history.commit(shape.points);
        break;

      case Tools.ORIGIN:
        // Move the origin to the click location
        for (i = 0, len = shape.points.length; i < len; i++) {
          shape.points[i].x -= click.x;
          shape.points[i].y -= click.y;
        }
        history.commit(shape.points);
        break;
      case Tools.VISIBILITY:
        // Toggle visibility of closest point
        index = closestPoint(click);
        if (index !== null) {
          // First point may not be invisible
          // Two consecutive points may not be invisible
          // Last and next-to-last point may not be invisible
          if (
            index > 0 &&
            shape.points[index - 1].visible &&
            !(shape.points.length - 1 > index && !shape.points[index + 1].visible) &&
            index < shape.points.length - 2
          ) {
            shape.points[index].visible = !shape.points[index].visible;
          }
        }
        history.commit(shape.points);
        break;
      case Tools.COLORIZE:
        // Toggle visibility of closest point
        index = closestPoint(click);
        if (index !== null) {
          shape.colorizePoint(index, current_selected_color);
          history.commit(shape.points);
        }
        break;
    }

    redraw();
  };

  canvas.onmousemove = function (evt) {
    const { x, y } = getMousePos(canvas, evt);
    if (0 > x || canvas.width < x || 0 > y || canvas.height < y) {
      return;
    }
    const prevMouse = mousePos;
    mousePos = grid.translate(x, y);
    redraw();

    if (currentTool === Tools.LINE && shape) {
      const last_point = shape.getLastPoint();
      if (last_point) {
        /* const lp = grid.toPoint(last_point);
        const mp = grid.toPoint(mousePos); */
        const mid = grid.toPoint({ x: (last_point.x + mousePos.x) * 0.5, y: (last_point.y + mousePos.y) * 0.5 });
        input.style.top = mid.y + "px";
        input.style.left = mid.x + "px";
        /* const mp = grid.toPoint(mousePos);
        input.style.top = mp.y + "px";
        input.style.left = mp.x + "px"; */
        input.value = pointDistance(last_point, mousePos).toFixed(2);
        input.focus();
        input.select();
      }
    } else if (currentTool === Tools.MOVE && handleIsSelected) {
      if (selectedHandleIndex instanceof Shape) {
        const dX = mousePos.x - prevMouse.x;
        const dY = mousePos.y - prevMouse.y;
        selectedHandleIndex.points.forEach((point) => {
          point.x += dX;
          point.y += dY;
        });
      } else {
        selectedHandleIndex.x = mousePos.x;
        selectedHandleIndex.y = mousePos.y;
      }
    }
  };

  // Button
  document.getElementById("pencil").onclick = function () {
    switchTool(Tools.LINE);
  };
  document.getElementById("arrows").onclick = function () {
    switchTool(Tools.MOVE);
  };
  document.getElementById("plus").onclick = function () {
    switchTool(Tools.ADD);
  };
  document.getElementById("scissors").onclick = function () {
    switchTool(Tools.CUT);
  };
  document.getElementById("crosshairs").onclick = function () {
    switchTool(Tools.ORIGIN);
  };
  document.getElementById("eye-slash").onclick = function () {
    switchTool(Tools.VISIBILITY);
  };
  document.getElementById("anchor").onclick = function () {
    snap_enabled = !snap_enabled;
    redraw();
  };
  var color_index;
  for (color_index = 1; color_index <= 16; color_index++) {
    (function (_color_index) {
      document.getElementById("color:" + _color_index).onclick = function () {
        switchTool(Tools.COLORIZE);
        current_selected_color = _color_index;
      };
    })(color_index);
  }

  document.getElementById("clipboard").onclick = function () {
    text.focus();
    text.select();
  };
  document.getElementById("copy").onclick = function () {
    var url = window.location.href.split("?")[0] + "?" + text.value;
    window.open(url);
  };
  document.getElementById("refresh").onclick = function () {
    if (confirm("Clear all polygon points and start over? This operation cannot be undone.")) {
      switchTool(Tools.LINE);
      shape = new Shape(false);
      history.clear();
      redraw();
    }
  };
  document.getElementById("undo").onclick = function () {
    undo();
  };
  document.getElementById("redo").onclick = function () {
    redo();
  };

  // Keyboard handler
  document.addEventListener("keydown", function (evt) {
    switch (evt.keyCode) {
      case 77: // "M"
      case 27: // <escape>
        shape.last_point = null;
        switchTool(Tools.MOVE);
        break;
      case 76: // "L"
        switchTool(Tools.LINE);
        break;
      case 65: // "A"
        switchTool(Tools.ADD);
        break;
      case 67: // "C"
        switchTool(Tools.CUT);
        break;
      case 79: // "O"
        switchTool(Tools.ORIGIN);
        break;
      case 86: // "V"
        switchTool(Tools.VISIBILITY);
        break;
      case 85: // "U"
        undo();
        break;
      case 82: // "R"
        redo();
        break;
      case 83: // "S"
        snap_enabled = !snap_enabled;
        redraw();
        break;
    }
  });
});
