import { Grid } from "./cad/grid.js";
import { History } from "./cad/history.js";
import { Shape, Marker } from "./cad/shapes.js";
import { pointDistance, distanceToSegment, formatCoordinate } from "./cad/utils.js";
import { matlabColorScale } from "./matlab/color_scale.js";

("use strict");

function* recursiveColumnLeafIterator(colDef) {
  if (!colDef.columns) {
    yield colDef;
  } else {
    for (let item of colDef.columns) {
      yield* recursiveColumnLeafIterator(item);
    }
  }
}

function linkMutators(tblModel) {
  for (const column of recursiveColumnLeafIterator(tblModel.config)) {
    Object.entries(tblModel.mutators ?? {}).forEach(([mutator, { deps, mutator: mutate }]) => {
      if (column.field === mutator) {
        column.mutator = (value, data, type, params, component) => {
          const result = mutate(value, data, type, params, component);
          return Number.isNaN(result) ? undefined : result;
        };
      }
      if (deps?.includes(column.field)) {
        column.mutateLink ??= [];
        if (!column.mutateLink.includes(mutator)) {
          column.mutateLink.push(mutator);
        }
      }
    });
  }
}

const makeCreateDeleteColumn = (id) => {
  return {
    headerSort: false,
    width: 50,
    resizable: false,
    titleFormatter: function (cell, formatterParams, onRendered) {
      const fname = `makeCreateDeleteColumn_addItem_tbl_${id.substring(1)}`;
      window[fname] = (event) => {
        event.preventDefault();
        cell.getTable().addRow({});
      };
      return `<button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded" onclick=${fname}(event)>+</button>`;
    },
    formatter: function (cell, formatterParams, onRendered) {
      const fDelete = `makeCreateDeleteColumn_removeItemBelow_tbl_${id.substring(1)}${cell.getRow().getIndex()}`;
      const fCreate = `makeCreateDeleteColumn_addItemBelow_tbl_${id.substring(1)}${cell.getRow().getIndex()}`;
      window[fDelete] = (event) => {
        cell.getRow().delete();
      };
      window[fCreate] = (event) => {
        cell.getTable().addRow({}, false, cell.getRow().getIndex());
      };
      return `<button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded" onclick=${fCreate}(event)>+</button><button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded" onclick=${fDelete}(event)>-</button>`;
    },
  };
};

const clearValue = {};
// TODO: auto column group names
// TODO: delete spare row on sort
const defaultConfig = {
  placeholder: "Sin Datos", //display message to user on empty table
  layout: "fitDataFill",
  layoutColumnsOnNewData: true,
  columnHeaderVertAlign: "middle", //align header contents to bottom of cell
  //enable range selection
  headerSortClickElement: "icon",
  selectableRange: 1,
  selectableRangeColumns: false,
  /* selectableRangeRows: true, */
  selectableRangeClearCells: true,
  selectableRangeClearCellsValue: clearValue,
  clipboardPasteParser: function (clipboard) {
    var data = [],
      rows = [],
      range = this.table.modules.selectRange.activeRange,
      singleCell = false,
      bounds,
      startCell,
      colWidth,
      columnMap,
      startCol;

    if (range) {
      bounds = range.getBounds();
      startCell = bounds.start;

      if (bounds.start === bounds.end) {
        singleCell = true;
      }

      if (startCell) {
        //get data from clipboard into array of columns and rows.
        clipboard = clipboard.replaceAll("\r\n", "\n").split("\n");

        clipboard.forEach(function (row) {
          data.push(row.split("\t"));
        });

        if (data.length) {
          columnMap = this.table.columnManager.getVisibleColumnsByIndex();
          startCol = columnMap.indexOf(startCell.column);

          if (startCol > -1) {
            if (singleCell) {
              colWidth = data[0].length;
            } else {
              colWidth = columnMap.indexOf(bounds.end.column) - startCol + 1;
            }

            columnMap = columnMap.slice(startCol, startCol + colWidth);

            data.forEach((item) => {
              var row = {};
              var itemLength = item.length;

              columnMap.forEach(function (col, i) {
                row[col.field] = item[i % itemLength];
              });

              rows.push(row);
            });

            return rows;
          }
        }
      }
    }

    return false;
  },
  clipboardPasteAction: function (data) {
    var rows = [],
      range = this.table.modules.selectRange.activeRange,
      singleCell = false,
      bounds,
      startCell,
      startRow,
      rowWidth,
      dataLength;

    dataLength = data.length;

    if (range) {
      bounds = range.getBounds();
      startCell = bounds.start;

      if (bounds.start === bounds.end) {
        singleCell = true;
      }

      if (startCell) {
        const flattenTree = (arr, row) => {
          arr.push(row._row);
          if (row.getTreeChildren()) {
            return row.getTreeChildren().reduce(flattenTree, arr);
          } else {
            return arr;
          }
        };
        const flattenParent = (arr, row) => {
          arr.push(row);
          if (row.component.getTreeChildren()) {
            return row.component.getTreeChildren().reduce(flattenTree, arr);
          } else {
            return arr;
          }
        };
        rows = this.table.rowManager.activeRows.slice();
        if (this.table.options.dataTree) {
          rows = rows.reduce(flattenParent, []);
        }

        startRow = rows.indexOf(startCell.row);

        if (singleCell) {
          rowWidth = data.length;
        } else {
          rowWidth = rows.indexOf(bounds.end.row) - startRow + 1;
        }

        if (startRow > -1) {
          this.table.blockRedraw();

          rows = rows.slice(startRow, startRow + rowWidth);

          rows.forEach((row, i) => {
            const dataObj = data[i % dataLength];
            const dataToUpdate = Object.keys(dataObj)
              .filter((key) => {
                const cell = row.getCell(key);
                return isCellEditable(cell.component);
              })
              .reduce((obj, key) => {
                obj[key] = dataObj[key];
                return obj;
              }, {});
            row.updateData(dataToUpdate);
          });

          this.table.restoreRedraw();
        }
      }
    }

    return rows;
  },
  //change edit trigger mode to make cell navigation smoother
  editTriggerEvent: "dblclick",
  history: true,
  //configure clipboard to allow copy and paste of range format data
  clipboard: true,
  clipboardCopyConfig: {
    columnHeaders: false, //do not include column headers in clipboard output
    columnGroups: false, //do not include column groups in column headers for printed table
    rowHeaders: false, //do not include row headers in clipboard output
    rowGroups: false, //do not include row groups in clipboard output
    columnCalcs: false, //do not include column calculation rows in clipboard output
    dataTree: false, //do not include data tree in printed table
    formatCells: false, //show raw cell values without formatter
  },
  clipboardCopyStyled: false,
  clipboardCopyRowRange: "range",
  columnDefaults: {
    hozAlign: "center",
    vertAlign: "middle",
    headerHozAlign: "center",
    headerWordWrap: true,
    resizable: true,
  },
};

function isCellEditable(cell) {
  let isEditable = false;
  const column = cell.getColumn();
  const columnDef = column.getDefinition();
  if (typeof columnDef.editable === "function") {
    isEditable = columnDef.editable(cell);
  } else {
    isEditable = columnDef.editor !== undefined;
  }
  return isEditable;
}

function createSpreeadSheetTable(tableModel) {
  const spareRow = tableModel.spareRow ?? false;
  const columnDefaults = tableModel.config.columnDefaults ?? {};
  defaultConfig.columnDefaults = {
    ...defaultConfig.columnDefaults,
    ...columnDefaults,
  };
  delete tableModel.config.columnDefaults;
  const config = { ...defaultConfig, ...tableModel.config };
  tableModel.config.columnDefaults = columnDefaults;
  let rowIndex = 0;
  linkMutators(tableModel);

  const table = new Tabulator(tableModel.id, config);

  table.on("cellEdited", function (cell) {
    if (cell.getValue() === clearValue) {
      if (!isCellEditable(cell)) {
        cell.restoreOldValue();
        return;
      } else {
        const row = cell.getRow();
        row.update({ [cell.getField()]: "" });
      }
    }

    const lastIndex = table.getRows().length;
    if (spareRow && lastIndex === cell.getRow().getPosition()) {
      table.addRow({});
    }
  });

  table.on("rowAdded", function (row) {
    const nextIndex = ++rowIndex;
    row.update({ id: nextIndex });
  });

  table.on("clipboardPasted", function (clipboard, rowData, rows) {
    if (rowData.length > rows.length && spareRow) {
      table.addRow(rowData.slice(rows.length));
      table.addRow({});
    }
  });

  table.on("tableBuilt", function () {
    if (tableModel.data !== undefined) {
      table.addRow(tableModel.data);
      table.clearHistory();
    }
    if (spareRow) {
      table.addRow({});
    }
    table.redraw();
  });
  table["spareRow"] = spareRow;
  return table;
}

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

  const combinacionDeCargasModel = (id) => {
    return {
      id: id,
      data: [
        { id: 1, column1: "Pm + Pv", column2: "MXm + MXv", column3: "MYm + MYv" },
        { id: 2, column1: "Pm + 0.7 * PS", column2: "MXm + 0.7 * MXS", column3: "MYm" },
        { id: 3, column1: "Pm + 0.7 * PS", column2: "MXm - 0.7 * MXS", column3: "MYm" },
        { id: 4, column1: "Pm + 0.7 * PS", column2: "MXm", column3: "MYm + 0.7 * MYS" },
        { id: 5, column1: "Pm + 0.7 * PS", column2: "MXm", column3: "MYm - 0.7 * MYS" },
        { id: 6, column1: "Pm + 0.75 * Pv + 0.7 * 0.75 * PS", column2: "MXm + 0.75 * MXv + 0.7 * 0.75 * MXS", column3: "MYm + 0.75 * MYv" },
        { id: 7, column1: "Pm + 0.75 * Pv + 0.7 * 0.75 * PS", column2: "MXm + 0.75 * MXv - 0.7 * 0.75 * MXS", column3: "MYm + 0.75 * MYv" },
        { id: 8, column1: "Pm + 0.75 * Pv + 0.7 * 0.75 * PS", column2: "MXm + 0.75 * MXv", column3: "MYm + 0.75 * MYv + 0.7 * 0.75 * MYS" },
        { id: 9, column1: "Pm + 0.75 * Pv + 0.7 * 0.75 * PS", column2: "MXm + 0.75 * MXv", column3: "MYm + 0.75 * MYv - 0.7 * 0.75 * MYS" },
        { id: 10, column1: "0.6 * Pm + 0.7 * PS", column2: "0.6 * MXm", column3: "0.6 * MYm + 0.7 * MYS" },
        { id: 11, column1: "0.6 * Pm + 0.7 * PS", column2: "0.6 * MXm", column3: "0.6 * MYm - 0.7 * MYS" },
      ],
      config: {
        height: 480,
        columns: [
          makeCreateDeleteColumn(id),
          {
            title: "Combinacion de Cargas",
            columns: [
              {
                title: "",
                field: "column1",
                editor: "input",
              },
              {
                title: "",
                field: "column2",
                editor: "input",
              },
              {
                title: "",
                field: "column3",
                editor: "input",
              },
            ],
          },
        ],
      },
    };
  };

  const datosGenerales = createSpreeadSheetTable(datosGeneralesModel("#datosGenerales"));
  const combinacionDeCargas = createSpreeadSheetTable(combinacionDeCargasModel("#combinacionDeCargas"));

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
      case 83: // "S" */
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
    const xx = markers.map((m) => m.point.x);
    const yy = markers.map((m) => m.point.y);
    const cminx = Math.min(...xx);
    const cmaxx = Math.max(...xx);

    const cminy = Math.min(...yy);
    const cmaxy = Math.max(...yy);

    const dX = Math.abs(cminx - cmaxx);
    const scaleX = canvas.width / dX;
    grid.scaleX = scaleX;
    grid.scaleY = scaleX;

    const dY = Math.abs(cminy - cmaxy);
    const scaleY = canvas.height / dY;
    grid.scaleY = grid.scaleX = scaleX < scaleY ? scaleX * 0.9 : scaleY * 0.9;

    grid.offestX = 0;
    grid.offestY = 0;
    const range = grid.screenToWorld({ x: canvas.width * 0.5, y: canvas.height * 0.5 });

    grid.offestX = (cminx + cmaxx) * 0.5 - range.x;
    grid.offestY = (cminy + cmaxy) * 0.5 - range.y;
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
            return fields.map((field) => row[field]).join(",");
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
    formData.append("Co", octaveMatrix(combinacionDeCargas, "column1", "column2", "column3"));
    formData.append(
      "poligonos",
      `struct(${shapes
        .map((shape, index) => {
          return `'poligono${index + 1}', [${[...shape.points, shape.points[0]].map((p) => `${p.x},${p.y}`).join(";")}]`;
        })
        .join(",")})`
    );
    const columns = datosGenerales.getData();
    const graficos = document.getElementById("graficos");
    graficos.innerHTML = "";
    combinacionDeCargas.getData().forEach((_, index) => {
      // Plot the chart using Plotly
      graficos.innerHTML += `
        <tr class="bg-gray-100 dark:bg-gray-600">
          <td class="py-2 px-4" colspan="4">
              <div id="zapata${index + 1}"></div>
          </td>
        </tr>`;
    });

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
        combinacionDeCargas.getData().forEach((title, index) => {
          const traces = Object.values(zapatas2.data.resultados).map(({ XX, YY, ZZ, max, min }, poligonoN) => {
            return {
              x: XX, // X-axis data
              y: YY, // Y-axis data
              z: ZZ[index],
              mode: "markers", // Scatter plot mode
              marker: {
                size: 2, // Size of the markers
                color: ZZ[index], // Color of the markers, based on Z data
                //colorscale: "Viridis", // Color scale
                //colorscale: "Jet", // Color scale
                /* showscale: true, // Show the color scale */
                coloraxis: "coloraxis",
              },
              name: `<b>Poligono ${poligonoN + 1}<br>σ<sub>min</sub> = ${min[index].toFixed(3)}<br>σ<sub>max</sub> = ${max[index].toFixed(3)}</b><br>`,
              hovertemplate: "<b>x</b>: %{x}<br>" + "<b>y</b>: %{y}<br>" + "<b>z</b>: %{marker.color:.4f}" + "<extra></extra>",
              type: "scattergl", // 3D scatter plot type
              /* type: "pointcloudgl", // 3D scatter plot type */
            };
          });
          const markers = columns.map((row) => {
            return {
              x: [row.x],
              y: [row.y],
              text: [`${row.column}`],
              mode: "markers+text",
              type: "scattergl",
              textposition: "top right",
              textfont: {
                family: "Arial",
                size: 10,
                color: "lightgrey",
              },
              showlegend: false,
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
            coloraxis: {
              colorscale: matlabColorScale, // Color scale
              colorbar: {
                title: {
                  text: "Presion Admisible (Tn/m)",
                  side: "right",
                },
              },
            },
            showlegend: true,
            legend: { x: 0, y: 0.5 },
            annotations: Object.values(zapatas2.data.resultados).map(({ XC: [xc], YC: [yc] }, index) => {
              return {
                x: xc,
                y: yc,
                xref: "x",
                yref: "y",
                text: `P${index + 1}`,
                font: {
                  color: "lightgrey",
                  size: 10,
                },
                align: "left",
                showarrow: false,
              };
            }),
            title: `<b>Comb: [${title.column1}, ${title.column2}, ${title.column3}]</b>`,
          };
          Plotly.react(`zapata${index + 1}`, [...traces, ...markers], layout, { responsive: false });
        });
      });
  });
});
