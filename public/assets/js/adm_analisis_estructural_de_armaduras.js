import { Grid } from "./cad/grid.js";
import { History } from "./cad/history.js";
import { Shape, Marker } from "./cad/shapes.js";
import { pointDistance, distanceToSegment, formatCoordinate } from "./cad/utils.js";
import { makeCreateDeleteColumn } from "./tabulator_base/table.js";
import { createSpreeadSheetTable } from "./tabulator_base/table_factory.js";
import { matlabColorScale } from "./matlab/color_scale.js";

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
  const datosGeneralesModel = (id) => {
    return {
      id: id,
      data: [
        {
          id: 1,
          column: 27,
          x: 0,
          y: 0,
          pd1: 5.1319,
          pd2: -0.0348,
          pd3: 0.0803,
          pl1: 0.0912,
          pl2: -0.0009,
          pl3: 0.0001,
          sismo1: 6.0318,
          sismo2: 3.0391,
          sismo3: 0.1554,
        },
        {
          id: 2,
          column: 1,
          x: 0,
          y: 14.13,
          pd1: 10.2057,
          pd2: 0.1979,
          pd3: 0.1814,
          pl1: 1.5233,
          pl2: 0.1312,
          pl3: 0.0191,
          sismo1: 2.5603,
          sismo2: 3.2251,
          sismo3: 0.8937,
        },
        {
          id: 3,
          column: 3,
          x: 4.8,
          y: 14.13,
          pd1: 9.8239,
          pd2: 0.2463,
          pd3: 0.0002,
          pl1: 1.4297,
          pl2: 0.1277,
          pl3: 0.0185,
          sismo1: 2.5856,
          sismo2: 2.7967,
          sismo3: 0.8873,
        },
        {
          id: 4,
          column: 5,
          x: 0,
          y: 10.87,
          pd1: 13.3251,
          pd2: -0.0238,
          pd3: 0.1576,
          pl1: 2.5238,
          pl2: -0.0266,
          pl3: 0.0146,
          sismo1: 1.8216,
          sismo2: 3.6588,
          sismo3: 0.4599,
        },
        {
          id: 5,
          column: 7,
          x: 4.8,
          y: 10.87,
          pd1: 18.7931,
          pd2: 0.1901,
          pd3: 0.0595,
          pl1: 3.0877,
          pl2: 0.0709,
          pl3: 0.0257,
          sismo1: 32.1112,
          sismo2: 4.5443,
          sismo3: 2.4735,
        },
        {
          id: 6,
          column: 12,
          x: 0,
          y: 7.23,
          pd1: 14.7282,
          pd2: -0.1881,
          pd3: 0.1981,
          pl1: 1.6038,
          pl2: -0.1404,
          pl3: 0.0089,
          sismo1: 1.9516,
          sismo2: 3.593,
          sismo3: 0.419,
        },
        {
          id: 7,
          column: 13,
          x: 4.8,
          y: 7.23,
          pd1: 14.7224,
          pd2: -0.3165,
          pd3: -0.1065,
          pl1: 1.8861,
          pl2: -0.2279,
          pl3: 0.0054,
          sismo1: 0.4018,
          sismo2: 2.9011,
          sismo3: 0.4681,
        },
        {
          id: 8,
          column: 15,
          x: 6.72,
          y: 7.23,
          pd1: 9.9749,
          pd2: 0.0000408,
          pd3: -0.0061,
          pl1: 0.807,
          pl2: -0.0716,
          pl3: 0.0027,
          sismo1: 1.4632,
          sismo2: 3.4036,
          sismo3: 0.4395,
        },
        {
          id: 9,
          column: 17,
          x: 0,
          y: 2.73,
          pd1: 9.4622,
          pd2: -0.0227,
          pd3: 0.0391,
          pl1: -0.1035,
          pl2: 0.0068,
          pl3: 0.0023,
          sismo1: 3.794,
          sismo2: 3.6411,
          sismo3: 0.2977,
        },
        {
          id: 10,
          column: 19,
          x: 4.8,
          y: 2.73,
          pd1: 10.763,
          pd2: -0.2191,
          pd3: 0.0164,
          pl1: 0.0193,
          pl2: -0.0092,
          pl3: 0.0033,
          sismo1: 2.1638,
          sismo2: 1.7708,
          sismo3: 0.2303,
        },
        {
          id: 11,
          column: 21,
          x: 6.72,
          y: 2.73,
          pd1: 6.3618,
          pd2: 0.0513,
          pd3: 0.0301,
          pl1: -0.0489,
          pl2: 0.0162,
          pl3: 0.0047,
          sismo1: 3.8355,
          sismo2: 3.4022,
          sismo3: 0.2552,
        },
        {
          id: 12,
          column: 23,
          x: 4.8,
          y: 0,
          pd1: 8.2016,
          pd2: -0.0442,
          pd3: 0.0308,
          pl1: 0.0553,
          pl2: 0.0009,
          pl3: 0.0035,
          sismo1: 10.7601,
          sismo2: 3.3956,
          sismo3: 1.0017,
        },
        {
          id: 13,
          column: 25,
          x: 6.72,
          y: 0,
          pd1: 5.4082,
          pd2: 0.0524,
          pd3: 0.0285,
          pl1: -0.0155,
          pl2: 0.0127,
          pl3: 0.0034,
          sismo1: 16.1751,
          sismo2: 3.8987,
          sismo3: 0.9936,
        },
        {
          id: 14,
          column: 166,
          x: 6.72,
          y: 10.87,
          pd1: 10.6504,
          pd2: 0.2522,
          pd3: 0.05,
          pl1: 0.9954,
          pl2: 0.1076,
          pl3: 0.0182,
          sismo1: 32.9814,
          sismo2: 4.4079,
          sismo3: 2.3816,
        },
      ],
      config: {
        /* layout: "fitDataTable", */
        height: 480,
        columns: [
          makeCreateDeleteColumn(id),
          {
            title: "Columna",
            field: "column",
            editor: "number",
          },
          {
            title: "X",
            field: "x",
            editor: "number",
          },
          {
            title: "Y",
            field: "y",
            editor: "number",
          },
          {
            title: "PD",
            columns: [
              {
                title: "",
                field: "pd1",
                editor: "number",
              },
              {
                title: "",
                field: "pd2",
                editor: "number",
              },
              {
                title: "",
                field: "pd3",
                editor: "number",
              },
            ],
          },
          {
            title: "PL",
            columns: [
              {
                title: "",
                field: "pl1",
                editor: "number",
              },
              {
                title: "",
                field: "pl2",
                editor: "number",
              },
              {
                title: "",
                field: "pl3",
                editor: "number",
              },
            ],
          },
          {
            title: "SISMO",
            columns: [
              {
                title: "",
                field: "sismo1",
                editor: "number",
              },
              {
                title: "",
                field: "sismo2",
                editor: "number",
              },
              {
                title: "",
                field: "sismo3",
                editor: "number",
              },
            ],
          },
        ],
      },
    };
  };

  const datosGenerales = createSpreeadSheetTable(datosGeneralesModel("#datosGenerales"));

  // Init GUI Components
  var canvas = document.querySelector("#plot canvas");
  var form = document.querySelector("#plot form");
  var text = document.querySelector("#plot textarea");
  var ctx = canvas.getContext("2d");
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
  var Tools = {
    MOVE: 0,
    LINE: 1,
    ADD: 2,
    CUT: 3,
    ORIGIN: 4,
    VISIBILITY: 5,
    COLORIZE: 6,
    SELECT: 7,
    NONE: 8,
  };
  var Styles = {
    ARRAY: 0,
    ONE_ARRAY: 1,
    NORMALIZED: 2,
    ONE_NORMALIZED: 3,
  };
  const shapes = [];
  let markers = [];

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
    grid.set(parseInt(form.zoom.value), canvas);
    redraw();
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
  canvas.onmousedown = function (evt) {
    const { x, y } = getMousePos(canvas, evt);
    if (0 > x || canvas.width < x || 0 > y || canvas.height < y) {
      return;
    }

    var click = grid.translate(x, y, snap_enabled);
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
      case Tools.CUT:
        const deleteShape = closestLine(click);
        index = shapes.indexOf(deleteShape);
        if (index !== -1) {
          shapes.splice(index, 1);
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
    mousePos = grid.translate(x, y, snap_enabled);
    redraw();

    if (currentTool === Tools.LINE && shape) {
      const last_point = shape.getLastPoint();
      if (last_point) {
        const unitVec = {
          x: (mousePos.x - last_point.x) / pointDistance(last_point, mousePos),
          y: (mousePos.y - last_point.y) / pointDistance(last_point, mousePos),
        };
        const perpUnitVec = { x: -unitVec.y, y: unitVec.x };
        const midPoint = { x: (last_point.x + mousePos.x) * 0.5, y: (last_point.y + mousePos.y) * 0.5 };
        const mid = grid.toPoint({ x: midPoint.x + perpUnitVec.x * 5, y: midPoint.y + perpUnitVec.y * 5 });
        input.style.top = mid.y + "px";
        input.style.left = mid.x + "px";
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
        if (shape.points.length >= 2) {
          shapes.push(shape);
        }
        editor.removeChild(input);
        shape = new Shape(true);
        switchTool(Tools.MOVE);
        canvas.style.cursor = "move";
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

  document.getElementById("zapatas2Form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = datosGenerales.getData();
    markers = data.map((row) => {
      return new Marker({ x: row.x, y: row.y }, row.column);
    });
    redraw();
  });

  document.getElementById("calcularZapatas2").addEventListener("submit", (event) => {
    event.preventDefault();
    const octaveMatrix = (table, ...fields) => {
      return (
        "[" +
        table
          .getData()
          .map((row) => {
            return fields.map((field) => row[field]).join(" ");
          })
          .join(";") +
        "]"
      );
    };
    const formData = new FormData(event.target);
    formData.append("column", octaveMatrix(datosGenerales, "column", "x", "y"));
    formData.append("PD", octaveMatrix(datosGenerales, "column", "pd1", "pd2", "pd3"));
    formData.append("PL", octaveMatrix(datosGenerales, "column", "pl1", "pl2", "pl3"));
    formData.append("SISMO", octaveMatrix(datosGenerales, "column", "sismo1", "sismo2", "sismo3"));
    formData.append(
      "poligonos",
      `struct(${shapes
        .map((shape, index) => {
          return `'poligono${index + 1}', [${[...shape.points, shape.points[0]].map((p) => `${p.x},${p.y}`).join(";")}]`;
        })
        .join(",")})`
    );
    const polygons = shapes.length;
    console.log(Object.fromEntries(formData));
    fetch("/zapatas2", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/octet-stream")) {
          return response.arrayBuffer();
        } else {
          const error = await response.text();
          return Promise.reject(error);
        }
      })
      .then((matData) => {
        const zapatas2 = mat4js.read(matData);
        console.log(zapatas2);
        zapatas2.data.ZZT.forEach((zl, index) => {
          const traces = Array.from(Array(polygons), (_, index) => {
            return index;
          }).map((index) => {
            const part = zl.length / shapes.length;
            const kData = zl.slice(index * part, (index + 1) * part); // Z-axis data
            return {
              x: zapatas2.data.XX.slice(index * part, (index + 1) * part), // X-axis data
              y: zapatas2.data.YY.slice(index * part, (index + 1) * part), // Y-axis data
              z: kData,
              mode: "markers", // Scatter plot mode
              marker: {
                size: 2, // Size of the markers
                color: zl, // Color of the markers, based on Z data
                //colorscale: "Viridis", // Color scale
                //colorscale: "Jet", // Color scale
                colorscale: matlabColorScale, // Color scale
                showscale: true, // Show the color scale
                colorbar: {
                  title: {
                    text: "Presion Admisible (Tn/m)",
                    side: "right",
                  },
                },
              },
              hovertemplate: "<b>x</b>: %{x}<br>" + "<b>y</b>: %{y}<br>" + "<b>z</b>: %{marker.color:.4f}" + "<extra></extra>",
              type: "scattergl", // 3D scatter plot type
              /* type: "pointcloudgl", // 3D scatter plot type */
            };
          });
          const layout = {
            xaxis: {
              scaleanchor: "y",
              scaleratio: 1,
            },
            yaxis: {
              constrain: "domain",
            },
            showlegend: false,
            title: `<b>Comb ${index + 1}<br>σ<sub>min</sub> = ${zapatas2.data.mins[index].toFixed(4)}<br>σ<sub>max</sub> = ${zapatas2.data.maxs[index].toFixed(
              4
            )}</b>`,
          };
          // Plot the chart using Plotly
          Plotly.react(`zapata${index + 1}`, traces, layout, { responsive: false });
        });
      });
  });
});
