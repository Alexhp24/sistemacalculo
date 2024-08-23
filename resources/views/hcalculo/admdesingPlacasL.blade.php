<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Diseño de placas en L') }}
        </h2>
    </x-slot>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <table class="table-auto w-full text-gray-800 dark:text-white px-6">
                                <thead class="bg-white dark:bg-gray-800">
                                    <tr class="text-center">
                                        <th class="py-2 px-8 text-left">Diseño por flexion</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr class="bg-white dark:bg-gray-800">
                                        <td colspan="4">
                                            <div id="solicitudCargaT1"></div>
                                            <div class="d-flex justify-content-start">
                                                <button id="saveDataBtn1"
                                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-800">
                                        <td colspan="4">
                                            <div id="solicitudCargaT2" class="table-container"></div>
                                            <div class="d-flex justify-content-start">
                                                <button id="saveDataBtn2" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ver
                                                    resultados</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="bg-white dark:bg-gray-800">
                                        <td colspan="4">
                                            <div id="solicitudCargaT3" class="table-container"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="overflow-auto">
                            <form id="generalForm" class="mt-2" method="post">
                                <table class="table-auto w-full text-gray-800 dark:text-white px-6">
                                    <thead class="bg-white dark:bg-gray-800">
                                        <tr class="text-center">
                                            <th class="py-2 px-4">Nombre</th>
                                            <th class="py-2 px-4">Simb.</th>
                                            <th class="py-2 px-4">Entrada</th>
                                            <th class="py-2 px-4">Unidad <br> Medida</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-center" id="formContainer"></tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Resultados -->
                <div class="w-full md:w-2/3 px-4 mt-4 md:mt-0">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Resultados</h3>
                        <div class="overflow-x-auto">
                            <div class="col-md-10 p-0 mt-3" id="resultadosContainer">
                                <!-- -------Diseño por Flexión------- -->
                                <div class="card card-info p-0 m-0">
                                    <div class="card-header d-flex justify-content-between">
                                        <h3 class="text-gray-950 dark:text-white">DISEÑO POR FLEXIÓN</h3>
                                    </div>
                                    <!-- Tablas interiores -->
                                    <div class="card-body p-0 m-0 d-none" class="collapsible-content" id="content2">
                                        <!-- <div style="width: 100%; height: 500px;" class="mb-5 d-none">
                                                            <canvas id="graphDF" width="500" height="500"></canvas>
                                                        </div> -->
                                        <!-- Tabla Análisis en Dirección "x" -->
                                        <div class="card m-0">
                                            <div class="card-header d-flex justify-content-between text-gray-950 dark:text-white">Análisis en
                                                dirección "X"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDFx">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="flexDesingT1X"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDF1X"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ver tablas
                                                                siguientes</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="flexDesingT2X" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDF2X"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar datos
                                                                (necesario)</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="flexDesingT3X" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <!-- <button id="saveDataBtnDF3X" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar Datos Iniciales</button> -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Tabla Análisis en Dirección "y" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "Y"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDFy">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex flex-column">
                                                        <div class="d-flex flex-column mb-5">
                                                            <div id="flexDesingT1Y" class="table-container"></div>
                                                            <div class="d-flex justify-content-start">
                                                                <button id="saveDataBtnDF1Y"
                                                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column mb-5">
                                                            <div id="flexDesingT2Y" class="table-container"></div>
                                                            <div class="d-flex justify-content-start">
                                                                <button id="saveDataBtnDF2Y"
                                                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar Datos
                                                                    (necesario)</button>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column mb-5">
                                                            <div id="flexDesingT3Y" class="table-container"></div>
                                                            <div class="d-flex justify-content-start">
                                                                <!-- <button id="saveDataBtnDF3X" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar Datos Iniciales</button> -->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- -------end Diseño por Flexión------- -->

                                <!-- -------Diseño por Corte------- -->
                                <div class="card card-info p-0 m-0">
                                    <div class="card-header d-flex justify-content-between">
                                        <h3 class="text-gray-950 dark:text-white">DISEÑO POR CORTE</h3>
                                    </div>
                                    <!-- Tablas interiores -->
                                    <div class="card-body p-0 m-0 d-none" class="collapsible-content" id="content3">
                                        <!-- <div style="width: 100%; height: 500px;" class="mb-5 d-none">
                                                            <canvas id="graphDF" width="500" height="500"></canvas>
                                                        </div> -->
                                        <!-- Tabla Análisis en Dirección "x" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "X"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDCx">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="cutDesingT1X" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDC1X"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="cutDesingT2X" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDC2X"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="cutDesingT3X" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDC3X"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Esquema Armado
                                                                Final</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="cutDesingT4X" class="table-container"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Tabla Análisis en Dirección "y" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "Y"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDCy">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="cutDesingT1Y" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDC1Y"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="cutDesingT2Y" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDC2Y"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="cutDesingT3Y" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDC3Y"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Esquema Armado
                                                                Final</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="cutDesingT4Y" class="table-container"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- -------end Diseño por Corte------- -->

                                <!-- -------Diagramas de Interacción------- -->
                                <div class="card bg-info p-0 m-0">
                                    <div class="card-header d-flex justify-content-between">
                                        <h3 class="text-gray-950 dark:text-white">DIAGRAMAS DE INTERACCIÓN</h3>
                                    </div>
                                    <!-- Tablas interiores -->
                                    <div class="card-body p-0 m-0 d-none" class="collapsible-content" id="content4">
                                        <!-- <div style="width: 100%; height: 500px;" class="mb-5 d-none">
                                                            <canvas id="graphDF" width="500" height="500"></canvas>
                                                        </div> -->
                                        <!-- Tabla Análisis en Dirección "x" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "X"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDIx">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="diT1X" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDI1X"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="diT2X" class="table-container"></div>
                                                        <!-- <div class="d-flex justify-content-start">
                                                                                <button id="saveDataBtnDI2X" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                                            </div> -->
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="diT3X" class="table-container"></div>
                                                        <!-- <div class="d-flex justify-content-start">
                                                                                <button id="saveDataBtnDC3X" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ancho Efectivo del Ala</button>
                                                                            </div> -->
                                                    </div>
                                                    <!-- <div class="d-flex flex-column mb-5">
                                                                            <div id="cutDesingT4X" class="table-container"></div>
                                                                        </div> -->
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Tabla Análisis en Dirección "y" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "Y"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDIy">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="diT1Y" class="table-container"></div>
                                                        <div class="d-flex justify-content-start">
                                                            <button id="saveDataBtnDI1Y"
                                                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="diT2Y" class="table-container"></div>
                                                        <!-- <div class="d-flex justify-content-start">
                                                                                <button id="saveDataBtnDI2Y" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                                            </div> -->
                                                    </div>
                                                    <div class="d-flex flex-column mb-5">
                                                        <div id="diT3Y" class="table-container"></div>
                                                        <!-- <div class="d-flex justify-content-start">
                                                                                <button id="saveDataBtnDI3Y" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Esquema Armado Final</button>
                                                                            </div> -->
                                                    </div>
                                                    <!-- <div class="d-flex flex-column mb-5">
                                                                            <div id="cutDesingT4Y" class="table-container"></div>
                                                                        </div> -->
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Diagramas -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Diagramas de
                                                Interacción</div>
                                            <div class="card-body">
                                                <div class="d-flex flex-column" id="diagramsContainer">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- -------end Diagramas de Interacción------- -->

                                <!-- -------Verificación del agrietamiento------- -->
                                <div class="card card-info p-0 m-0">
                                    <div class="card-header d-flex justify-content-between">
                                        <h3 class="text-gray-950 dark:text-white">VERIFCACIÓN DEL AGRIETAMIENTO</h3>
                                        <button class="collapsible-btn ml-auto" data-target="content5">ver /
                                            ocultar</button>
                                    </div>
                                    <!-- Tablas interiores -->
                                    <div class="card-body p-0 m-0 d-none" class="collapsible-content" id="content5">

                                        <!-- <div style="width: 100%; height: 500px;" class="mb-5 d-none">
                                                            <canvas id="graphDF" width="500" height="500"></canvas>
                                                        </div> -->
                                        <!-- Tabla Análisis en Dirección "x" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "X"</div>
                                            <div class="card-body collapsible-content d-none" id="contentVAx">

                                                <div class="d-flex flex-column">
                                                    <div id="vaT1X" class="table-container"></div>
                                                </div>

                                            </div>
                                        </div>
                                        <!-- Tabla Análisis en Dirección "y" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "Y" </div>
                                            <div class="card-body collapsible-content d-none" id="contentVAy">
                                                <div class="d-flex flex-column">
                                                    <div id="vaT1Y" class="table-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- -------Verificación del agrietamiento------- -->

                                <!-- -------Diseño por Compresión Pura------- -->
                                <div class="card card-info p-0 m-0">
                                    <div class="card-header d-flex justify-content-between">
                                        <h3 class="text-gray-950 dark:text-white">DISEÑO POR COMPRESIÓN PURA</h3>
                                        <button class="collapsible-btn ml-auto" data-target="content6">ver /
                                            ocultar</button>
                                    </div>
                                    <!-- Tablas interiores -->
                                    <div class="card-body p-0 m-0 d-none" class="collapsible-content" id="content6">
                                        <!-- <div style="width: 100%; height: 500px;" class="mb-5 d-none">
                                                            <canvas id="graphDF" width="500" height="500"></canvas>
                                                        </div> -->
                                        <!-- Tabla Análisis en Dirección "x" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "X"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDCPx">
                                                <div class="d-flex flex-column">
                                                    <div id="dcpT1X" class="table-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Tabla Análisis en Dirección "y" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "Y"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDCPy">
                                                <div class="d-flex flex-column">
                                                    <div id="dcpT1Y" class="table-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- -------Diseño por Compresión Pura  ------- -->

                                <!-- -------Diseño por Deslizamiento------- -->
                                <div class="card card-info p-0 m-0">
                                    <div class="card-header d-flex justify-content-between">
                                        <h3 class="text-gray-950 dark:text-white">DISEÑO POR DESLIZAMIENTO</h3>
                                    </div>
                                    <!-- Tablas interiores -->
                                    <div class="card-body p-0 m-0 d-none" class="collapsible-content" id="content7">
                                        <!-- <div style="width: 100%; height: 500px;" class="mb-5 d-none">
                                                            <canvas id="graphDF" width="500" height="500"></canvas>
                                                        </div> -->
                                        <!-- Tabla Análisis en Dirección "x" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "X"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDDx">
                                                <div class="d-flex flex-column">
                                                    <div id="ddT1X" class="table-container"></div>
                                                    <div class="d-flex justify-content-start">
                                                        <button id="saveDataBtnDD1X"
                                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column mb-5">
                                                    <div id="ddT2X" class="table-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Tabla Análisis en Dirección "y" -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Análisis en
                                                dirección "Y"</div>
                                            <div class="card-body collapsible-content d-none" id="contentDDy">
                                                <div class="d-flex flex-column">
                                                    <div id="ddT1Y" class="table-container"></div>
                                                    <div class="d-flex justify-content-start">
                                                        <button id="saveDataBtnDD1Y"
                                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column mb-5">
                                                    <div id="ddT2Y" class="table-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- -------Diseño por Deslizamiento  ------- -->

                                <!-- -------Efecto Local - Carga Puntual------- -->
                                <div class="card card-info p-0 m-0">
                                    <div class="card-header d-flex justify-content-between">
                                        <h3 class="text-gray-950 dark:text-white">EFECTO LOCAL - CARGA PUNTUAL</h3>
                                        <button class="collapsible-btn ml-auto" data-target="content8">ver /
                                            ocultar</button>
                                    </div>
                                    <!-- Tablas interiores -->
                                    <div class="card-body p-0 m-0 d-none" class="collapsible-content" id="content8">
                                        <!-- <div style="width: 100%; height: 500px;" class="mb-5 d-none">
                                                            <canvas id="graphDF" width="500" height="500"></canvas>
                                                        </div> -->
                                        <div class="card m-0">
                                            <div class="text-gray-950 dark:text-white">Efecto Local -
                                                Carga Puntual</div>
                                            <div class="card-body collapsible-content d-none" id="contentEL">
                                                <div class="d-flex flex-column">
                                                    <div id="elT1" class="table-container"></div>
                                                    <div class="d-flex justify-content-start">
                                                        <button id="saveDataBtnEL1X"
                                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Siguiente</button>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-column mb-5">
                                                    <div id="elT2" class="table-container"></div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <!-- -------Efecto Local - Carga Puntual------- -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <script type="module" src="{{ asset('assets/js/adm_desing_placasL.js') }}"></script>

</x-app-layout>
