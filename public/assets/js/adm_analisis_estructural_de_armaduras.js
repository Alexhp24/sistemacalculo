import { Grid } from "./cad/grid.js";
import { History } from "./cad/history.js";
import { Shape, Marker } from "./cad/shapes.js";
import { pointDistance, distanceToSegment, formatCoordinate } from "./cad/utils.js";
import { matlabColorScale } from "./matlab/color_scale.js";

("use strict");

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
  // Init GUI Components
  const canvas = document.querySelector("#plot canvas");

  const form = document.querySelector("#plot form");
  const ctx = canvas.getContext("2d");
  const editor = document.getElementById("editor");
  const input = document.createElement("input");

  input.type = "number";
  input.style.color = "black";
  input.style.position = "absolute";
  input.style.width = "100px";
  input.style.top = 0;
  input.style.left = 0;
  input.style.transform = "translate(-50%,-50%)";

  // Global vars
  const Tools = {
    MOVE: 0,
    LINE: 1,
    ADD: 2,
    CUT: 3,
    ORIGIN: 4,
    VISIBILITY: 5,
    COLORIZE: 6,
    SELECT: 7,
    NONE: 8,
    EDIT: 9,
    COPY: 10,
  };
  const shapes = [];
  let markers = [];

  let selectedPoint = null;
  let selectedMarker = null;
  const xIn = document.getElementById("x");
  const yIn = document.getElementById("y");

  xIn.addEventListener("input", () => {
    const value = parseFloat(xIn.value);
    if (!isNaN(value) && selectedPoint) {
      selectedPoint.x = value;
    }
    redraw();
  });

  yIn.addEventListener("input", () => {
    const value = parseFloat(yIn.value);
    if (!isNaN(value) && selectedPoint) {
      selectedPoint.y = value;
    }
    redraw();
  });

  var shape,
    isDragging = false,
    dragStart,
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
      const isDone = shape.addPointToEnd(grid.worldToScreen(newPoint), grid);
      if (isDone) {
        shape.calcularPropiedades();
        shapes.push(shape);
        editor.removeChild(input);
        shape = new Shape(true);
      }
    }
  });

  document.getElementById("snap").addEventListener("change", (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      grid.gridSpacing = value;
    }
  });

  let handleIsSelected = false;
  let selectedHandleIndex = 0;
  // Functions
  function windowResize() {
    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = parseFloat(getComputedStyle(canvas).width) * scale;
    canvas.height = parseFloat(getComputedStyle(canvas).height) * scale;
    grid.set(parseInt(form.zoom.value), canvas);
    redraw();
  }
  function closestMarker(searchPoint) {
    // Returns null if there are 0 points in the shape
    var shortestDistance = 5;
    for (let index = 0; index < markers.length; index++) {
      const p = markers[index].point;
      const distance = pointDistance(searchPoint, grid.worldToScreen(p));
      if (distance <= shortestDistance) {
        return markers[index];
      }
    }
  }
  function closestPoint(searchPoint) {
    // Returns null if there are 0 points in the shape
    var shortestDistance = 5;
    for (let index = 0; index < shapes.length; index++) {
      const collided = shapes[index].points.find((p, index, points) => {
        const distance = pointDistance(searchPoint, grid.worldToScreen(p));
        return distance <= shortestDistance;
      });
      if (collided) {
        return collided;
      }
    }
  }
  function closestLine(searchPoint) {
    var shortestDistance = 10;
    return shapes.find((s) => {
      for (let index = 0; index < s.points.length; index++) {
        const lineLength = pointDistance(grid.worldToScreen(s.points[index % s.points.length]), grid.worldToScreen(s.points[(index + 1) % s.points.length]));
        const d1 = pointDistance(grid.worldToScreen(s.points[index % s.points.length]), searchPoint);
        const d2 = pointDistance(grid.worldToScreen(s.points[(index + 1) % s.points.length]), searchPoint);
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
      line_color = "white";
      ctx.strokeStyle = line_color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (i = 0; i < s.points.length; i++) {
        p = grid.worldToScreen(s.points[i]);
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
          continue;
        }
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.strokeStyle = line_color;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
      }
      if (s.points.length > 2) {
        const begin = grid.worldToScreen(s.points[0]);
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
        color = "red";
      }
      p = grid.worldToScreen(s.points[i]);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, grid.size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }
  function redraw() {
    var x_pos = 10;
    var y_pos = 15;
    var y_step = 15;
    grid.draw(ctx);
    markers.forEach((m) => {
      m.draw(grid, ctx);
    });
    shapes.forEach((s) => {
      drawFinishedShape(s);
    });
    shape.draw(grid, ctx);

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
          var c = grid.worldToScreen(last_point);
          const mouse = grid.worldToScreen(mousePos);
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
      case Tools.COPY:
        modeText = "Clonar";
        break;
      case Tools.EDIT:
        modeText = "Editar Punto";
        break;
    }
    ctx.fillText(modeText, x_pos, y_pos);
    ctx.restore();

    document.getElementById("polygons").innerHTML = `
         ${shapes.reduce((body, shape, index) => {
           const propiedades = shape.propiedades();
           return (
             body +
             `<tr class="bg-gray-100 dark:bg-gray-600">
                  <td class="p-0" colspan="4">
                      <div class="relative inline-block">
                          <table class="inline-block text-gray-800 dark:text-white">
                              <tbody id="polygons">
                                  <tr
                                      class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                      <th class="text-xl py-2 px-4 text-left" colspan="4">
                                          Propiedades
                                      </th>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">P</th>
                                      <td class="py-2 px-4">${propiedades.P.toFixed(2)}</td>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">A</th>
                                      <td class="py-2 px-4">${propiedades.A.toFixed(2)}</td>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">IX</th>
                                      <td class="py-2 px-4">${propiedades.IX.toFixed(2)}</td>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">
                                          IY</th>
                                      <td class="py-2 px-4">${propiedades.IY.toFixed(2)}</td>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">
                                          XC</th>
                                      <td class="py-2 px-4">${propiedades.XC.toFixed(2)}</td>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">
                                          YC</th>
                                      <td class="py-2 px-4">${propiedades.YC.toFixed(2)}</td>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">
                                          MX</th>
                                      <td class="py-2 px-4">${propiedades.MX.toFixed(2)}</td>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">
                                          MY</th>
                                      <td class="py-2 px-4">${propiedades.MY.toFixed(2)}</td>
                                  </tr>
                                  <tr
                                      class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                      <th class="text-lg py-2 px-8" scope="col"
                                          colspan="2">
                                          IXY</th>
                                      <td class="py-2 px-4">${propiedades.IXY.toFixed(2)}</td>
                                  </tr>
                              </tbody>
                          </table><table
                              class="inline-block text-gray-800 dark:text-white absolute overflow-y-auto top-0 bottom-0">
                              <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                <th class="text-xl py-2 px-4 text-left" colspan="4">Poligono ${index + 1}
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
                          </table>
                      </div>
                  </td>
              </tr>`
           );
         }, "")}
          `;
  }
  shape = new Shape(true);
  grid = new Grid();
  history = new History();
  windowResize();
  redraw();
  window.onresize = windowResize;
  form.zoom.oninput = function () {
    // Responds during slide Firefox, Safari, Chrome
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.set(parseInt(this.value), canvas);
    redraw();
  };
  form.zoom.onchange = function () {
    // IE10 support (IE10 does not support oninput)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid.set(parseInt(this.value), canvas);
    redraw();
  };
  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const { x, y } = getMousePos(canvas, e);
      const prevMouse = grid.screenToWorld({ x: x, y: y });
      if (e.deltaY < 0) {
        grid.scaleX *= 1.1;
        grid.scaleY *= 1.1;
      } else {
        grid.scaleX *= 0.9;
        grid.scaleY *= 0.9;
      }
      const translatedMouse = grid.screenToWorld({ x: x, y: y });
      grid.offestX += prevMouse.x - translatedMouse.x;
      grid.offestY += prevMouse.y - translatedMouse.y;
      redraw();
    },
    { passive: false }
  );
  canvas.onmousedown = function (evt) {
    evt.preventDefault();
    const { x, y } = getMousePos(canvas, evt);
    switch (currentTool) {
      case Tools.LINE:
        const isDone = shape.addPointToEnd(grid.worldToScreen(mousePos), grid);
        if (shape.points.length >= 1) {
          editor.appendChild(input);
        }
        if (isDone) {
          shape.calcularPropiedades();
          shapes.push(shape);
          editor.removeChild(input);
          shape = new Shape(true);
        }
        history.commit(shape.points);
        break;
      case Tools.MOVE:
        if (evt.button == 1 || 1 == (evt.button & 2)) {
          isDragging = true;
          dragStart = { x: x, y: y };
          return;
        }
        if (handleIsSelected || selectedMarker) {
          handleIsSelected = false;
          let marker = closestMarker({ x: x, y: y });
          if (marker && !selectedMarker) {
            selectedMarker = marker;
          } else if (marker && selectedMarker) {
            selectedHandleIndex.calcularPropiedades();
            const { XC: xc, YC: yc } = selectedHandleIndex.propiedades();
            const midPoints = { x: (marker.point.x + selectedMarker.point.x) * 0.5, y: (marker.point.y + selectedMarker.point.y) * 0.5 };
            const dX = midPoints.x - xc;
            const dY = midPoints.y - yc;
            selectedHandleIndex.points.forEach((point) => {
              point.x += dX;
              point.y += dY;
            });
            selectedMarker = null;
            selectedPoint = null;
            selectedHandleIndex = null;
            handleIsSelected = false;
            switchTool(-1);
            canvas.style.cursor = "default";
          }
          history.commit(shape.points);
        } else {
          let index = closestPoint({ x: x, y: y });
          if (index) {
            handleIsSelected = true;
            selectedHandleIndex = index;
          } else if ((index = closestLine({ x: x, y: y }))) {
            handleIsSelected = true;
            selectedHandleIndex = index;
          }
        }
        break;
      case Tools.CUT:
        const deleteShape = closestLine({ x: x, y: y });
        const index = shapes.indexOf(deleteShape);
        if (index !== -1) {
          shapes.splice(index, 1);
        }
        break;
      case Tools.COPY:
        const cloneShape = closestLine({ x: x, y: y });
        if (cloneShape) {
          handleIsSelected = true;
          shape = structuredClone(cloneShape);
          shape = Object.assign(Object.create(Object.getPrototypeOf(cloneShape)), shape);
          shapes.push(shape);
          selectedHandleIndex = shape;
          shape = new Shape(true);
          switchTool(Tools.MOVE);
          canvas.style.cursor = "move";
        }
        break;
      case Tools.EDIT:
        selectedPoint = closestPoint({ x: x, y: y });
        if (selectedPoint) {
          xIn.value = selectedPoint.x;
          yIn.value = selectedPoint.y;
        }
        break;
    }
    redraw();
  };
  canvas.onmouseup = (evt) => {
    if (evt.button == 1 || 1 == (evt.button & 2)) {
      isDragging = false;
    }
  };
  canvas.onmouseleave = () => {
    isDragging = false;
  };
  canvas.onmousemove = function (evt) {
    const { x, y } = getMousePos(canvas, evt);
    mousePos = grid.screenToWorld({ x: x, y: y }, snap_enabled);
    if (snap_enabled) {
      mousePos.x = Math.floor((mousePos.x + 0.5) * grid.gridSpacing) + grid.gridSpacing - Math.floor(grid.gridSpacing);
      mousePos.y = Math.floor((mousePos.y + 0.5) * grid.gridSpacing) + grid.gridSpacing - Math.floor(grid.gridSpacing);
    }
    if (currentTool === Tools.LINE && shape) {
      const last_point = shape.getLastPoint();
      if (last_point) {
        const lp = grid.worldToScreen(last_point);
        const unitVec = {
          x: (x - lp.x) / pointDistance(lp, { x: x, y: y }),
          y: (y - lp.y) / pointDistance(lp, { x: x, y: y }),
        };
        const perpUnitVec = { x: -unitVec.y, y: unitVec.x };
        const midPoint = { x: (lp.x + x) * 0.5, y: (lp.y + y) * 0.5 };
        const mid = { x: midPoint.x + perpUnitVec.x * 100, y: midPoint.y + perpUnitVec.y * 100 };
        input.style.top = mid.y + "px";
        input.style.left = mid.x + "px";
        input.value = pointDistance(last_point, mousePos).toFixed(2);
        input.focus();
        input.select();
      }
    } else if (currentTool === Tools.MOVE) {
      if (isDragging) {
        grid.offestX -= (x - dragStart.x) / grid.scaleX;
        grid.offestY += (y - dragStart.y) / grid.scaleY;
        dragStart = { x: x, y: y };
      }
      if (handleIsSelected) {
        if (selectedHandleIndex instanceof Shape) {
          selectedHandleIndex.calcularPropiedades();
          const { XC: xc, YC: yc } = selectedHandleIndex.propiedades();
          const dX = mousePos.x - xc;
          const dY = mousePos.y - yc;
          selectedHandleIndex.points.forEach((point) => {
            point.x += dX;
            point.y += dY;
          });
        } else {
          selectedHandleIndex.x = mousePos.x;
          selectedHandleIndex.y = mousePos.y;
        }
      }
    }
    redraw();
  };
  // Button
  document.getElementById("pencil").onclick = function () {
    switchTool(Tools.LINE);
    canvas.style.cursor = "crosshair";
  };
  document.getElementById("arrows").onclick = function () {
    switchTool(Tools.MOVE);
    canvas.style.cursor = "move";
  };
  document.getElementById("plus").onclick = function () {
    switchTool(Tools.ADD);
  };
  document.getElementById("scissors").onclick = function () {
    switchTool(Tools.CUT);
    canvas.style.cursor = "crosshair";
  };
  document.getElementById("anchor").onclick = function () {
    snap_enabled = !snap_enabled;
    redraw();
  };
  document.getElementById("copy").onclick = function () {
    switchTool(Tools.COPY);
    canvas.style.cursor = "copy";
  };
  document.getElementById("crosshairs").onclick = function () {
    switchTool(Tools.EDIT);
    canvas.style.cursor = "cell";
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
  // Keyboard handler
  document.addEventListener("keydown", function (evt) {
    switch (evt.keyCode) {
      case 77: // "M"
      case 27: // <escape>
        if (shape.points.length >= 2) {
          shape.calcularPropiedades();
          editor.removeChild(input);
          shapes.push(shape);
        }
        shape = new Shape(true);
        selectedMarker = null;
        selectedPoint = null;
        selectedHandleIndex = null;
        handleIsSelected = false;
        switchTool(-1);
        canvas.style.cursor = "default";
        redraw();
        break;
      /*       case 76: // "L"
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
        break; */
    }
  });
});
