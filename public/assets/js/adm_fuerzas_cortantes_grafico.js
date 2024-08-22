(function () {
  'use strict';

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
      width: 75,
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

  document.addEventListener("DOMContentLoaded", () => {
    const propiedadesModel = (id) => {
      return {
        id: id,
        config: {
          columns: [
            makeCreateDeleteColumn(id),
            {
              title: "Bi",
              field: "bi",
              editor: "number",
            },
            {
              title: "Hi",
              field: "hi",
              editor: "number",
            },
            {
              title: "Lti",
              field: "lti",
              editor: "number",
            },
            {
              title: "Wdi",
              field: "wdi",
              editor: "number",
            },
            {
              title: "Wvi",
              field: "wvi",
              editor: "number",
            },
          ],
        },
      };
    };

    const T1Model = {
      id: "#T1",
      config: {
        layout: "fitColumns",
        columns: [
          {
            title: "T1",
            columns: [
              {
                title: "Mu",
                field: "Mu",
              },
              {
                title: "Asd",
                field: "Asd",
              },
              {
                title: "Asmin",
                field: "Asmin",
              },
            ],
          },
        ],
      },
    };

    const T2Model = {
      id: "#T2",
      config: {
        layout: "fitColumns",
        columns: [
          {
            title: "T2",
            columns: [
              {
                title: "Vu",
                field: "Vu",
              },
              {
                title: "Vc",
                field: "Vc",
              },
              {
                title: "Ratio",
                field: "Ratio",
              },
            ],
          },
        ],
      },
    };

    const propiedades = createSpreeadSheetTable(propiedadesModel("#propiedades"));

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

    // $('#fuerzasCortantesForm').on('submit', function (event) {
    //   event.preventDefault();
    //   let id;
    //   event.preventDefault();
    //   const updater = setInterval(() => {
    //     document.getElementById("fuerzasCortantes").src = "./assets/img/fuerzascortantes/" + id + ".png?t=" + new Date().getTime();
    //   }, 500);

    //   const formData = new FormData(event.target);
    //   formData.append("b", octaveVector(propiedades, "bi"));
    //   formData.append("h", octaveVector(propiedades, "hi"));
    //   formData.append("Lt", octaveVector(propiedades, "lti"));
    //   formData.append("WD", octaveVector(propiedades, "wdi"));
    //   formData.append("WV", octaveVector(propiedades, "wvi"));

    //   id = btoa(formData);
    //   formData.append("_id", id);
    //   console.log(Object.fromEntries(formData));

    //   $.ajax({
    //     url: $(this).attr('action'),
    //     method: 'POST',
    //     data: $(this).serialize(),
    //     success: function (response) {
          
    //       console.log(response.text());
    //     },
    //     error: function (xhr, status, error) {
    //       console.error('Error al enviar la solicitud AJAX', error);
    //     }
    //   });
    // });

    document.getElementById("fuerzasCortantesForm").addEventListener("submit", (event) => {
      let id;
      event.preventDefault();
      const updater = setInterval(() => {
        document.getElementById("fuerzasCortantes").src = "./assets/img/fuerzascortantes/" + id + ".png?t=" + new Date().getTime();
      }, 500);

      const formData = new FormData(event.target);
      formData.append("b", octaveVector(propiedades, "bi"));
      formData.append("h", octaveVector(propiedades, "hi"));
      formData.append("Lt", octaveVector(propiedades, "lti"));
      formData.append("WD", octaveVector(propiedades, "wdi"));
      formData.append("WV", octaveVector(propiedades, "wvi"));

      id = btoa(formData);
      formData.append("_id", id);
      console.log(Object.fromEntries(formData));
      fetch("/fuerzasCortantes", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((json) => {
          clearInterval(updater);
          console.log(json);
          json.T1 = json.T1.split("\r\n")
            .map((row) => row.split(","))
            .map((row) => {
              return { Mu: row[0], Asd: row[1], Asmin: row[2] };
            });
          json.T2 = json.T2.split("\r\n")
            .map((row) => row.split(","))
            .map((row) => {
              return { Vu: row[0], Vc: row[1], Ratio: row[2] };
            });
          T1Model.config.data = json.T1;
          T2Model.config.data = json.T2;
          createSpreeadSheetTable(T1Model);
          createSpreeadSheetTable(T2Model);
          document.getElementById("fuerzasCortantes").src = "./assets/img/fuerzascortantes/" + id + ".png?t=" + new Date().getTime();
        })
        .catch((error) => {
          clearInterval(updater);
          console.log(error);
        });
    });
  });
})();
