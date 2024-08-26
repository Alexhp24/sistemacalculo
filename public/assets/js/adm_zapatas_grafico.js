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
          clipboard = clipboard.split("\n");

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
          { nombres: "P", sismica: 0, muerta: 1700, viva: 1320 },
          { nombres: "MX", sismica: 2909, muerta: 3529, viva: 1441 },
          { nombres: "MY", sismica: 0, muerta: 0, viva: 0 },
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

    const poligonoModel = (id) => {
      return {
        data: [
          { xv: -7.0389, yv: 11.6025 },
          { xv: 7.0539, yv: 11.6025 },
          { xv: 7.0539, yv: -8.4825 },
          { xv: -7.0389, yv: -8.4825 },
          { xv: -7.0389, yv: -8.4825 },
          { xv: -5.5291, yv: 10.1025 },
          { xv: -5.5597, yv: 6.0669 },
          { xv: -3.3975, yv: 6.0669 },
          { xv: -3.3975, yv: 2.6826 },
          { xv: -5.5589, yv: 2.6826 },
          { xv: -5.5491, yv: -0.2575 },
          { xv: 5.5539, yv: -0.2575 },
          { xv: 5.5539, yv: 2.6826 },
          { xv: 2.5561, yv: 2.6826 },
          { xv: 2.5561, yv: 6.0666 },
          { xv: 5.5539, yv: 6.0666 },
          { xv: 5.5539, yv: 10.1025 },
          { xv: -5.5291, yv: 10.1025 },
          { xv: -5.5291, yv: 10.1025 },
          { xv: -5.5291, yv: -1.7575 },
          { xv: -5.5291, yv: -4.5928 },
          { xv: -3.3975, yv: -4.5928 },
          { xv: -3.392, yv: -6.9824 },
          { xv: -0.5897, yv: -6.9824 },
          { xv: -0.5897, yv: -6.2075 },
          { xv: 1.5553, yv: -6.2075 },
          { xv: 1.5571, yv: -6.971 },
          { xv: 2.5557, yv: -6.971 },
          { xv: 2.5557, yv: -4.5928 },
          { xv: 5.5539, yv: -4.5928 },
          { xv: 5.5539, yv: -1.7575 },
          { xv: -5.5291, yv: -1.7575 },
        ],
        id: id,
        config: {
          layout: "fitDataTable",
          height: 200,
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
      };
    };

    const cargas = createSpreeadSheetTable(cargasModel("#cargas"));
    const propiedades = createSpreeadSheetTable(propiedadesModel("#propiedades"));
    const poligono = createSpreeadSheetTable(poligonoModel("#poligono"));

    const octaveVector = (table, name) => {
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
    };

    const updateImgSrc = (name, id, img) => (img.src = `/assets/img/fcsv/${name}${id}.png?t=${new Date().getTime()}`);

    document.getElementById("zapatasForm").addEventListener("submit", (event) => {
      let id;
      event.preventDefault();
      const updater = setInterval(() => {
        updateImgSrc("zapatasComb1", id, document.getElementById("zapata1"));
        updateImgSrc("zapatasComb2", id, document.getElementById("zapata2"));
      }, 1000);

      const formData = new FormData(event.target);
      propiedades.getData().forEach((row) => {
        formData.append(row.nombres, row.entradas);
      });

      cargas.getData().forEach((row) => {
        formData.append(row.nombres + "S", row.sismica);
        formData.append(row.nombres + "m", row.muerta);
        formData.append(row.nombres + "v", row.viva);
      });

      formData.append("xv", octaveVector(poligono, "xv"));
      formData.append("yv", octaveVector(poligono, "yv"));

      id = btoa(JSON.stringify(Object.fromEntries(formData))).slice(0, 32);
      formData.append("_id", id);
      console.log(Object.fromEntries(formData));
      fetch("/zapatas", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((json) => {
          clearInterval(updater);
          console.log(json);
          updateImgSrc("zapatas1", id, document.getElementById("zapata1"));
          updateImgSrc("zapatas2", id, document.getElementById("zapata2"));
          const sigmas = json.split("\n")
            .map((row) => row.split(","))
            .map((row) => {
              return { min: row[0], max: row[1] };
            });
        })
        .catch((error) => {
          clearInterval(updater);
          console.log(error);
        });
    });
  });
})();
