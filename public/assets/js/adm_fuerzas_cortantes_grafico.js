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

  document.addEventListener("DOMContentLoaded", () => {
    const propiedadesModel = (id) => {
      return {
        id: id,
        config: {
          layout: "fitDataTable",
          height: 360,
          columns: [
            makeCreateDeleteColumn(id),
            {
              title: "B",
              field: "bi",
              editor: "number",
            },
            {
              title: "T",
              field: "hi",
              editor: "number",
            },
            {
              title: "Lti",
              field: "lti",
              editor: "number",
            },
            {
              title: "Cm",
              field: "wdi",
              editor: "number",
            },
            {
              title: "Cv",
              field: "wvi",
              editor: "number",
            },
          ],
        },
      };
    };

    const T1Model = {
      id: "#T1",
      mutators: {
        diametro: {
          deps: ["Asd"],
          mutator: function (value, data) {
            const asd = parseFloat(data.Asd);
            if (asd <= 0.71) {
              return '1 Ø 3/8"';
            } else if (asd <= 1.27) {
              return '1 Ø 1/2"';
            } else if (asd <= 2) {
              return '1 Ø 5/8"';
            } else if (asd <= 2.71) {
              return '1 Ø 5/8" + 1 Ø 3/8"';
            } else if (asd <= 3.27) {
              return '5/8" + 1/2"';
            }
            return "";
          },
        },
      },
      config: {
        layout: "fitColumns",
        columns: [
          {
            title: "Diseño a Flexión",
            columns: [
              {
                title: "Mu Tn-m",
                field: "Mu",
                formatter: function (cell, formatterParams, onRendered) {
                  const value = parseFloat(cell.getValue());
                  return isNaN(value) ? "" : value.toFixed(2) + " Tn-m";
                },
              },
              {
                title: "Asd cm²",
                field: "Asd",
                formatter: function (cell, formatterParams, onRendered) {
                  const value = parseFloat(cell.getValue());
                  return isNaN(value)
                    ? `${cell.getValue().r.toFixed(2)}${cell.getValue().i < 0 ? "" : "+"}${cell.getValue().i.toFixed(2)}i`
                    : value.toFixed(2) + " cm²";
                },
              },
              {
                title: "Asmin cm²",
                field: "Asmin",
                formatter: function (cell, formatterParams, onRendered) {
                  const value = parseFloat(cell.getValue());
                  return isNaN(value) ? "" : value.toFixed(2) + " cm²";
                },
              },
              {
                title: "Diametro",
                field: "diametro",
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
            title: "Diseño a Cortante",
            columns: [
              {
                title: "Vu Tn",
                field: "Vu",
                formatter: function (cell, formatterParams, onRendered) {
                  const value = parseFloat(cell.getValue());
                  return isNaN(value) ? "" : value.toFixed(2) + " Tn";
                },
              },
              {
                title: "Vc Tn",
                field: "Vc",
                formatter: function (cell, formatterParams, onRendered) {
                  const value = parseFloat(cell.getValue());
                  return isNaN(value) ? "" : value.toFixed(2) + " Tn";
                },
              },
              {
                title: "Ratio Vu/Vc%",
                field: "Ratio",
                formatter: function (cell, formatterParams, onRendered) {
                  const value = parseFloat(cell.getValue());
                  return isNaN(value) ? "" : value.toFixed(2) + " %";
                },
              },
              {
                title: "Longitud de ensanche",
                field: "x",
                formatter: function (cell, formatterParams, onRendered) {
                  const value = parseFloat(cell.getValue());
                  return isNaN(value) ? "" : value.toFixed(2) + " m";
                },
              },
              {
                title: "Ancho de ensanche",
                field: "b",
                formatter: function (cell, formatterParams, onRendered) {
                  const value = parseFloat(cell.getValue());
                  return isNaN(value) ? "" : value.toFixed(2) + " cm";
                },
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

    document.getElementById("fuerzasCortantesForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const viguetaComponent = (percent, width, b, t, isLast) => {
        return `<div class="text-center text-sm" style="width: calc(${percent}% - ${!isLast ? "4px" : "8px"}); display: inline-block">
        <div>
          <p>Vigueta</p>
          <p>${b.toFixed(2)} m x ${t.toFixed(2)} m</p>
        </div>
        <div class="border-t-4 ${!isLast ? "border-l-4" : "border-l-4 border-r-4"}">${width} m</div>
      </div>`;
      };
      const carga = (name, percentX, percentY, width, cm, isLast) => {
        return `<div class="text-center text-sm" style="width: calc(${percentX}% - ${!isLast ? "4px" : "8px"}); display: inline-block">
          <p style="transform: translateY(calc(128px - 128px * ${percentY} / 100))">${name}=${cm.toFixed(2)} tn/m</p>
          <div class="mb-2 h-[128px] relative flex items-center justify-center">
            <div class="absolute bottom-0 border-4 w-full border-indigo-500 h-[${percentY}%]">
            </div>
          </div>
          <div class="border-t-4 ${!isLast ? "border-l-4" : "border-l-4 border-r-4"}">${width} m</div>
        </div>`;
      };
      const asdComponent = (percentX, asd1, d1, asd2, d2, asd3, d3, isLast) => {
        return `<div class="text-center text-xs" style="width: calc(${percentX}% - ${!isLast ? "4px" : "8px"}); display: inline-block">
          <div class="flex justify-between">
            <div class="border-l-4 px-2">${parseFloat(asd1).toFixed(2)} cm²<br>${d1}</div>
            <div class="${!isLast ? "" : "border-r-4"} px-2">${parseFloat(asd3).toFixed(2)} cm²<br>${d3}</div>
          </div>
          <div class="border-t-4 ${!isLast ? "border-l-4" : "border-l-4 border-r-4"}">${parseFloat(asd2).toFixed(2)} cm²<br>${d2}</div>
        </div>`;
      };
      const vuComponent = (width, percentX, vu1, x1, vu2, x2, isLast) => {
        return `<div class="text-center text-xs" style="width: calc(${percentX}% - ${!isLast ? "4px" : "8px"}); display: inline-block">
          <div class="flex justify-between">
            <div class="border-l-4 px-2">${parseFloat(vu1).toFixed(2)} Tn<br>${x1.toFixed(2)} m</div>
            <div class="${!isLast ? "" : "border-r-4"} px-2">${parseFloat(vu2).toFixed(2)} Tn<br>${x2.toFixed(2)} m</div>
          </div>
          <div class="border-t-4 ${!isLast ? "border-l-4" : "border-l-4 border-r-4"}">${width} m</div>
        </div>`;
      };

      const total = propiedades
        .getData()
        .map((row) => {
          const value = parseFloat(row.lti);
          return isNaN(value) ? 0 : value;
        })
        .reduce((acc, value) => {
          return acc + value;
        }, 0);
      const topHeigthWdi = Math.max(
        ...propiedades.getData().map((row) => {
          return row.wdi;
        })
      );
      const topHeigthWvi = Math.max(
        ...propiedades.getData().map((row) => {
          return row.wvi;
        })
      );

      document.getElementById("viguetas").innerHTML = propiedades.getData().reduce((html, row, index, data) => {
        const percent = (parseFloat(row.lti) / total) * 100;
        return html + viguetaComponent(percent, row.lti, parseFloat(row.bi), parseFloat(row.hi), index === data.length - 1);
      }, "");
      document.getElementById("cargaMuerta").innerHTML = propiedades.getData().reduce((html, row, index, data) => {
        const percentX = (parseFloat(row.lti) / total) * 100;
        const percentY = (parseFloat(row.wdi) / topHeigthWdi) * 100;
        return html + carga("Cm", percentX, percentY, row.lti, parseFloat(row.wdi), index === data.length - 1);
      }, "");
      document.getElementById("cargaViva").innerHTML = propiedades.getData().reduce((html, row, index, data) => {
        const percentX = (parseFloat(row.lti) / total) * 100;
        const percentY = (parseFloat(row.wvi) / topHeigthWvi) * 100;
        return html + carga("Cv", percentX, percentY, row.lti, parseFloat(row.wvi), index === data.length - 1);
      }, "");

      const formData = new FormData(event.target);
      formData.append("b", octaveVector(propiedades, "bi"));
      formData.append("h", octaveVector(propiedades, "hi"));
      formData.append("Lt", octaveVector(propiedades, "lti"));
      formData.append("WD", octaveVector(propiedades, "wdi"));
      formData.append("WV", octaveVector(propiedades, "wvi"));

      console.log(Object.fromEntries(formData));
      fetch("/fuerzasCortantes", {
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
          const aligerados = mat4js.read(matData);
          console.log(aligerados);

          // Loop through each vector in the SHEAR array
          const tracesFC = aligerados.data.SHEART.map((sheari) => ({
            x: aligerados.data.L4,
            y: sheari,
            mode: "lines",
            line: { width: 2 },
          }));

          // Add the axexx vector as another trace
          tracesFC.push({
            x: aligerados.data.L4,
            y: aligerados.data.axexx,
            mode: "lines",
            line: { width: 2 },
          });

          const layoutFC = {
            showlegend: false,
            title: "Diagrama de Fuerzas cortantes (Tn)",
            xaxis: {
              title: "Longitud (m)",
            },
            yaxis: {
              title: "Fuerzas cortantes (Tn)",
            },
          };
          Plotly.newPlot("fuerzasCortantes", tracesFC, layoutFC);

          // Loop through each vector in the SHEAR array
          const tracesMF = aligerados.data.x1n
            .map((x1, index) => ({
              x: x1,
              y: aligerados.data.y1n[index],
              mode: "lines",
              line: { width: 2 },
            }))
            .concat(
              aligerados.data.x2n.map((x2, index) => ({
                x: x2,
                y: aligerados.data.y2n[index],
                mode: "lines",
                line: { width: 2 },
              }))
            );

          // Add the axexx vector as another trace
          tracesMF.push({
            x: aligerados.data.L5,
            y: aligerados.data.L5.map((_) => 0),
            mode: "lines",
            line: { width: 2 },
          });

          const layout = {
            showlegend: false,
            title: "Diagrama de Momentos Flectores (Tn-m)",
            xaxis: {
              title: "Longitud (m)",
            },
            yaxis: {
              title: "Momentos flectores (Tn)",
            },
          };
          Plotly.newPlot("momentosFlectores", tracesMF, layout);
          const T1 = createSpreeadSheetTable(T1Model);
          const T2 = createSpreeadSheetTable(T2Model);
          setTimeout(() => {
            T1.addData(
              Object.keys(aligerados.data.T1).reduce((acc, key) => {
                aligerados.data.T1[key].forEach((value, index) => {
                  acc[index] ??= {};
                  acc[index][key] = value;
                });
                return acc;
              }, [])
            );
            T2.addData(
              Object.keys(aligerados.data.T2).reduce((acc, key) => {
                aligerados.data.T2[key].forEach((value, index) => {
                  acc[index] ??= {};
                  acc[index][key] = value;
                });
                return acc;
              }, [])
            );
            const asdValues = T1.getData();
            document.getElementById("asd").innerHTML = propiedades.getData().reduce((html, row, index, data) => {
              const percentX = (parseFloat(row.lti) / total) * 100;
              return (
                html +
                asdComponent(
                  percentX,
                  asdValues[index * 3].Asd,
                  asdValues[index * 3].diametro,
                  asdValues[index * 3 + 1].Asd,
                  asdValues[index * 3 + 1].diametro,
                  asdValues[index * 3 + 2].Asd,
                  asdValues[index * 3 + 2].diametro,
                  index === data.length - 1
                )
              );
            }, "");

            const vuValues = T2.getData();
            let dVu, x;
            T2.getData().forEach((row, index, data) => {
              if (index % 2 === 0) {
                dVu = -data[index + 1].Vu - data[index].Vu;
              }
              if (dVu !== 0) {
                const L = propiedades.getData()[index % 2].lti;
                x = ((row.Vc - row.Vu) * L) / dVu;
              } else {
                x = 0;
              }
              T2.getRow(index + 1).update({ x: x });
            });
            T2.getData().forEach((row, index, data) => {
              const fc = parseFloat(document.getElementById("fc").value);
              const b = (row.Vu * 1000) / (0.85 * 0.53 * Math.sqrt(fc) * parseFloat(propiedades.getData()[index % 2].hi) * 100);
              T2.getRow(index + 1).update({ b: b });
            });
            document.getElementById("vu").innerHTML = propiedades.getData().reduce((html, row, index, data) => {
              const percentX = (parseFloat(row.lti) / total) * 100;
              const x1 = T2.getData()[2 * index].x;
              const x2 = T2.getData()[2 * index + 1].x;
              return html + vuComponent(row.lti, percentX, vuValues[index * 2].Vu, x1, vuValues[index * 2 + 1].Vu, x2, index === data.length - 1);
            }, "");
          }, 500);
        })
        .catch((error) => {
          const swalTailwind = Swal.mixin({
            customClass: {
              confirmButton: "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded",
            },
            buttonsStyling: false
          });
          console.log(error);
          swalTailwind.fire({
            icon: "error",
            html: `
              ${error}
            `,
            showConfirmButton: true,
          });
        });
    });
  });
})();
