(function () {
  "use strict";

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
    });
    table["spareRow"] = spareRow;
    return table;
  }

  const bold_formatter = (...rows) => {
    return {
      formatter: function (cell, formatterParams, onRendered) {
        //cell - the cell component
        //formatterParams - parameters set for the column
        //onRendered - function to call when the formatter has been rendered
        const bold = rows.some((row) => {
          if (cell.getRow()._row.type !== "calc") {
            return cell.getRow().getIndex() === row;
          } else {
            return false;
          }
        });
        if (rows.length == 0 || bold) {
          return `<b>${cell.getValue() ?? ""}</b>`; //return the contents of the cell;
        } else {
          return cell.getValue();
        }
      },
    };
  };

  document.addEventListener("DOMContentLoaded", () => {
    const cargasModel = (id) => {
      return {
        data: [
          { nombres: "P", sismica: 0, muerta: 2909, viva: 0 },
          { nombres: "MX", sismica: 1700, muerta: 3529, viva: 0 },
          { nombres: "MY", sismica: 1320, muerta: 1441, viva: 0 },
        ],
        id: id,
        config: {
          layout: "fitDataTable",
          height: 120,
          columns: [
            {
              title: "Nombres",
              field: "nombres",
              headerSort: false,
              resizable: false,
              ...bold_formatter(1, 2, 3),
            },
            {
              title: "Sísmica",
              field: "sismica",
              editor: "number",
            },
            {
              title: "Muerta",
              field: "muerta",
              editor: "number",
            },
            {
              title: "Viva",
              field: "viva",
              editor: "number",
            },
          ],
        },
      };
    };

    const propiedadesModel = (id) => {
      return {
        data: [
          { nombres: "A", entradas: 343.5 },
          { nombres: "Ixx", entradas: 9193 },
          { nombres: "Iyy", entradas: 35202 },
          { nombres: "Df", entradas: 2 },
        ],
        id: id,
        config: {
          layout: "fitDataTable",
          height: 150,
          columns: [
            {
              title: "Nombres",
              field: "nombres",
              headerSort: false,
              resizable: false,
              ...bold_formatter(1, 2, 3, 4),
            },
            {
              title: "Entradas",
              field: "entradas",
              editor: "number",
              headerSort: false,
              resizable: false,
            },
          ],
        },
      };
    };

    const poligonoModel = (id, title, data) => {
      return {
        data: data,
        id: id,
        config: {
          layout: "fitDataTable",
          height: 200,
          columns: [
            {
              title: title,
              columns: [
                makeCreateDeleteColumn(id),
                {
                  title: "X",
                  field: "xv",
                  editor: "number",
                },
                {
                  title: "Y",
                  field: "yv",
                  editor: "number",
                },
              ],
            },
          ],
        },
      };
    };

    const data1 = [
      { xv: -7.0389, yv: 11.6025 },
      { xv: 7.0539, yv: 11.6025 },
      { xv: 7.0539, yv: -8.4825 },
      { xv: -7.0389, yv: -8.4825 },
    ];

    const cargas = createSpreeadSheetTable(cargasModel("#cargas"));
    const propiedades = createSpreeadSheetTable(propiedadesModel("#propiedades"));
    const poligonoExterior = createSpreeadSheetTable(poligonoModel("#poligonoExterior", "Poligono Exterior", data1));
    const poligonoInterior1 = createSpreeadSheetTable(
      poligonoModel("#poligonoInterior1", "Poligono Interior 1", [
        // Polygon 1
        { xv: -5.0, yv: 6.0 },
        { xv: -2.0, yv: 5.5 },
        { xv: 0.5, yv: 6.5 },
        { xv: -1.0, yv: 4.0 },
      ])
    );
    const poligonoInterior2 = createSpreeadSheetTable(
      poligonoModel("#poligonoInterior2", "Poligono Interior 2", [
        // Polygon 2
        { xv: -3.0, yv: 2.0 },
        { xv: -1.5, yv: 1.0 },
        { xv: 1.5, yv: 2.5 },
        { xv: 0.5, yv: 4.0 },
      ])
    );
    const poligonoInterior3 = createSpreeadSheetTable(
      poligonoModel("#poligonoInterior3", "Poligono Interior 3", [
        // Polygon 3
        { xv: -4.0, yv: -3.0 },
        { xv: -2.5, yv: -4.5 },
        { xv: 1.0, yv: -3.5 },
        { xv: -1.0, yv: -1.5 },
      ])
    );
    const poligonoInterior4 = createSpreeadSheetTable(poligonoModel("#poligonoInterior4", "Poligono Interior 4", []));
    const poligonoInterior5 = createSpreeadSheetTable(poligonoModel("#poligonoInterior5", "Poligono Interior 5", []));

    const octaveVector = (table, name) => {
      const data = table.getData();
      if (data.length === 0) {
        return "1:0";
      } else {
        return (
          "[" +
          table
            .getData()
            .map((row) => {
              return row[name];
            })
            .join(",") +
          "]"
        );
      }
    };

    document.getElementById("zapatasForm").addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      propiedades.getData().forEach((row) => {
        formData.append(row.nombres, row.entradas);
      });

      cargas.getData().forEach((row) => {
        formData.append(row.nombres + "S", row.sismica);
        formData.append(row.nombres + "m", row.muerta);
        formData.append(row.nombres + "v", row.viva);
      });
      formData.append(
        "poligonos",
        `struct('poligonoExterior', [${octaveVector(poligonoExterior, "xv")}; ${octaveVector(poligonoExterior, "yv")}], 'poligonoInterior1', [${octaveVector(
          poligonoInterior1,
          "xv"
        )}; ${octaveVector(poligonoInterior1, "yv")}], 'poligonoInterior2', [${octaveVector(poligonoInterior2, "xv")}; ${octaveVector(
          poligonoInterior2,
          "yv"
        )}], 'poligonoInterior3', [${octaveVector(poligonoInterior3, "xv")}; ${octaveVector(poligonoInterior3, "yv")}], 'poligonoInterior4', [${octaveVector(
          poligonoInterior4,
          "xv"
        )}; ${octaveVector(poligonoInterior4, "yv")}], 'poligonoInterior5', [${octaveVector(poligonoInterior5, "xv")}; ${octaveVector(
          poligonoInterior5,
          "yv"
        )}])`
      );

      const swalTailwind = Swal.mixin({
        customClass: {
          confirmButton: "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded",
        },
        buttonsStyling: false,
      });
      const waitingPopup = swalTailwind.fire({
        title: "Calculando!",
        html: "Por favor espere!<br>",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      console.log(Object.fromEntries(formData));
      fetch("/zapatas", {
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
          waitingPopup.close();
          const zapatas = mat4js.read(matData);
          console.log(zapatas);
          zapatas.data.ZLT.forEach((zl, index) => {
            const trace = {
              x: zapatas.data.XL, // X-axis data
              y: zapatas.data.YL, // Y-axis data
              z: zl, // Z-axis data
              mode: "markers", // Scatter plot mode
              marker: {
                size: 2, // Size of the markers
                color: zl, // Color of the markers, based on Z data
                colorscale: "Viridis", // Color scale
                showscale: true, // Show the color scale
                colorbar: {
                  title: {
                    text: "Presion Admisible (Tn/m)",
                    side: "right",
                  },
                },
              },
              type: "scattergl", // 3D scatter plot type
              /* type: "pointcloudgl", // 3D scatter plot type */
              scene: `scene${index + 1}`,
            };
            const layout = {
              height: 500,
              /* width: 400, */
              showlegend: false,
              title: `<b>Comb ${index + 1}<br>σ<sub>min</sub> = ${Math.min(...zl).toFixed(2)}<br>σ<sub>max</sub> = ${Math.max(...zl).toFixed(2)}</b>`,
            };
            // Plot the chart using Plotly
            Plotly.react(`zapata${index + 1}`, [trace], layout, { responsive: false });
          });
        })
        .catch((error) => {
          console.log(error);
          waitingPopup.hideLoading();
          swalTailwind.fire({
            icon: "error",
            html: `
              ${error}
            `,
            showConfirmButton: true,
          });

          Array.from(Array(11), (_, index) => index + 1).forEach((index) => {
            Plotly.purge(`zapata${index}`);
          });
        });
    });
  });
})();
