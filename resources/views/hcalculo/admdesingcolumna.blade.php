<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Diseño de Columna') }}
        </h2>
    </x-slot>
    <script>
        MathJax = {
            loader: {
                load: ['input/asciimath', 'output/chtml']
            }
        }
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@latest/dist/echarts.min.js"></script>
    <!-- ==============================MODELS MODAL================== -->


    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form id="ColumnaF" method="POST" action="{{ route('columacon') }}">
                                @csrf
                                <table class="table-auto w-full text-gray-800 dark:text-white px-6">
                                    <thead class="bg-white dark:bg-gray-800">
                                        <tr class="text-center">
                                            <th class="py-2 px-4">Nombre</th>
                                            <th class="py-2 px-4">Simb.</th>
                                            <th class="py-2 px-4">Entrada</th>
                                            <th class="py-2 px-4">Unidad <br> Medida</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-center">
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" scope="row">
                                                Cantidad de pisos
                                            </th>
                                            <td class="py-2 px-4">
                                                # Piso
                                            </td>
                                            <td class="py-2 px-4">
                                                <input type="text" id="piso" name="piso" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" placeholder="1" value="1" required />
                                            </td>
                                            <td class="py-2 px-4">
                                                unidad
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" scope="row">
                                                Esfuerzo de compresion de concreto
                                            </th>
                                            <td class="py-2 px-4">
                                                fc
                                            </td>
                                            <td class="py-2 px-4">
                                                <input type="text" id="fc" name="fc" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" placeholder="210" value="210" required />
                                            </td>
                                            <td class="py-2 px-4">
                                                kg/cm<sup>2</sup>
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" scope="row">
                                                Esfuerzo de fluencia del acero
                                            </th>
                                            <td class="py-2 px-4">
                                                fy
                                            </td>
                                            <td class="py-2 px-4">
                                                <input type="text" id="fy" name="fy" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" placeholder="4200" value="4200" />
                                            </td>
                                            <td class="py-2 px-4">
                                                kg/cm<sup>2</sup>
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" scope="row">
                                                Altura
                                            </th>
                                            <td class="py-2 px-4">
                                                H
                                            </td>
                                            <td class="py-2 px-4">
                                                <input type="text" id="altura" name="altura" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" placeholder="0" value="0" />
                                            </td>
                                            <td class="py-2 px-4">
                                                cm
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" scope="row">
                                                Longitud en eje X
                                            </th>
                                            <td class="py-2 px-4">
                                                Lx
                                            </td>
                                            <td class="py-2 px-4">
                                                <input type="text" id="L1" name="L1" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" placeholder="0" value="0" />
                                            </td>
                                            <td class="py-2 px-4">
                                                cm
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" scope="row">
                                                Longitud en eje Y
                                            </th>
                                            <td class="py-2 px-4">
                                                Ly
                                            </td>
                                            <td class="py-2 px-4">
                                                <input type="text" id="L2" name="L2" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" placeholder="0" value="0" />
                                            </td>
                                            <td class="py-2 px-4">
                                                cm
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" scope="row">
                                                Peralte efectivo en "cm"
                                            </th>
                                            <td class="py-2 px-4">
                                                d
                                            </td>
                                            <td class="py-2 px-4">
                                                <input type="text" id="d" name="d" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" placeholder="0" value="0" />
                                            </td>
                                            <td class="py-2 px-4">
                                                cm
                                            </td>
                                        </tr>
                                    </tbody>
                                    <br>
                                    <br>
                                    <!-- Longitud Arriostrada -->
                                    <div class="card-body sm:rounded-lg">
                                        <div class="card-header  h-30 bg-gradient-to-r from-cyan-500 to-blue-500 sm:rounded-lg">
                                            <h1 class="text-center text-2xl font-bold decoration-indigo-500">
                                                Longitud Arriostrada (Análisis en Dirección X-X)
                                                <button id="btnLongArriosX" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                                    Ver
                                                </button>
                                            </h1>
                                        </div>
                                        <div class="card-body" id="contentLongArriosX">
                                            <section class="content">
                                                <div class="container-fluid">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div id="longitudArriostradaX"></div>
                                                        <button type="button" id="guardarTablaX" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div class="card-body sm:rounded-lg">
                                        <div class="card-header  h-30 bg-gradient-to-r from-cyan-500 to-blue-500 sm:rounded-lg">
                                            <h1 class="text-center text-2xl font-bold decoration-indigo-500">
                                                Longitud Arriostrada (Análisis en Dirección Y-Y)
                                                <button id="btnLongArriosY" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                                    Ver
                                                </button>
                                            </h1>
                                        </div>
                                        <div class="card-body" id="contentLongArriosY">
                                            <section class="content">
                                                <div class="container-fluid">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div id="longitudArriostradaY"></div>
                                                        <button type="button" id="guardarTablaY" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar</button>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <!-- condicion ezbeltes -->
                                    <div class="card-body sm:rounded-lg">
                                        <div class="card-header  h-30 bg-gradient-to-r from-cyan-500 to-blue-500 sm:rounded-lg">
                                            <h1 class="text-center text-2xl font-bold decoration-indigo-500">
                                                Condicion de Ezbeltez
                                                <button id="btncez" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                                    Ver
                                                </button>
                                            </h1>
                                        </div>
                                        <div class="card-body" id="contentCE">
                                            <section class="content">
                                                <div class="container-fluid">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div id="Scrga"></div>
                                                        <div id="Scrga"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <!-- incluido XX -->
                                    <div class="card-body sm:rounded-lg">
                                        <div class="card-header  h-30 bg-gradient-to-r from-cyan-500 to-blue-500 sm:rounded-lg">
                                            <h1 class="text-center text-2xl font-bold decoration-indigo-500">
                                                Diagrama de Interacción (Incluido "Ø") - Dirección X-X
                                                <button type="button" id="btnDIIYY" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                                    Ver
                                                </button>
                                            </h1>
                                        </div>
                                        <div class="card-body" id="contentDIIYY">
                                            <section class="content">
                                                <div class="container-fluid">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div id="diagramaxx"></div>
                                                        <div id="myDiagramsxx"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <!-- Excluido xx -->
                                    <div class="card-body sm:rounded-lg">
                                        <div class="card-header  h-30 bg-gradient-to-r from-cyan-500 to-blue-500 sm:rounded-lg">
                                            <h1 class="text-center text-2xl font-bold decoration-indigo-500">
                                                Diagrama de Interacción (Excludio "Ø") - Dirección X-X
                                                <button type="button" id="btnDIIXX" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                                    Ver
                                                </button>
                                            </h1>
                                        </div>
                                        <div class="card-body" id="contentDIIXX">
                                            <section class="content">
                                                <div class="container-fluid">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div id="diagramaex"></div>
                                                        <div id="myDiagramex"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <!-- Incuido YY -->
                                    <div class="card-body sm:rounded-lg">
                                        <div class="card-header  h-30 bg-gradient-to-r from-cyan-500 to-blue-500 sm:rounded-lg">
                                            <h1 class="text-center text-2xl font-bold decoration-indigo-500">
                                                Diagrama de Interacción (Incluido "Ø") - Dirección Y-Y
                                                <button type="button" id="btnDIEYY" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                                    Ver
                                                </button>
                                            </h1>
                                        </div>
                                        <div class="card-body" id="contentDIEYY">
                                            <section class="content">
                                                <div class="container-fluid">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div id="diagramayy"></div>
                                                        <div id="myDiagramsyy"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <!-- excluido YY -->
                                    <div class="card-body sm:rounded-lg">
                                        <div class="card-header  h-30 bg-gradient-to-r from-cyan-500 to-blue-500 sm:rounded-lg">
                                            <h1 class="text-center text-2xl font-bold decoration-indigo-500">
                                                Diagrama de Interacción (Excluido "Ø") - Dirección Y-Y
                                                <button type="button" id="btnDIEXX" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                                    Ver
                                                </button>
                                            </h1>
                                        </div>
                                        <div class="card-body" id="contentDIEXX">
                                            <section class="content">
                                                <div class="container-fluid">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div id="diagramaexy"></div>
                                                        <div id="myDiagramexy"></div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <script>
                                        document.getElementById('btnLongArriosX').addEventListener('click', function() {
                                            var contentCE = document.getElementById('contentLongArriosX');
                                            if (contentCE.style.display === "none") {
                                                contentCE.style.display = "block";
                                            } else {
                                                contentCE.style.display = "none";
                                            }
                                        });
                                        document.getElementById('btnLongArriosY').addEventListener('click', function() {
                                            var contentCE = document.getElementById('contentLongArriosY');
                                            if (contentCE.style.display === "none") {
                                                contentCE.style.display = "block";
                                            } else {
                                                contentCE.style.display = "none";
                                            }
                                        });
                                        document.getElementById('btncez').addEventListener('click', function() {
                                            var contentCE = document.getElementById('contentCE');
                                            if (contentCE.style.display === "none") {
                                                contentCE.style.display = "block";
                                            } else {
                                                contentCE.style.display = "none";
                                            }
                                        });
                                        document.getElementById('btnDIIYY').addEventListener('click', function() {
                                            var contentDIIYY = document.getElementById('contentDIIYY');
                                            if (contentDIIYY.style.display === "none") {
                                                contentDIIYY.style.display = "block";
                                            } else {
                                                contentDIIYY.style.display = "none";
                                            }
                                        });
                                        document.getElementById('btnDIEYY').addEventListener('click', function() {
                                            var contentDIEYY = document.getElementById('contentDIEYY');
                                            if (contentDIEYY.style.display === "none") {
                                                contentDIEYY.style.display = "block";
                                            } else {
                                                contentDIEYY.style.display = "none";
                                            }
                                        });
                                        document.getElementById('btnDIIXX').addEventListener('click', function() {
                                            var contentDIIXX = document.getElementById('contentDIIXX');
                                            if (contentDIIXX.style.display === "none") {
                                                contentDIIXX.style.display = "block";
                                            } else {
                                                contentDIIXX.style.display = "none";
                                            }
                                        });
                                        document.getElementById('btnDIEXX').addEventListener('click', function() {
                                            var contentDIEXX = document.getElementById('contentDIEXX');
                                            if (contentDIEXX.style.display === "none") {
                                                contentDIEXX.style.display = "block";
                                            } else {
                                                contentDIEXX.style.display = "none";
                                            }
                                        });
                                    </script>
                                    <thead class="bg-white dark:bg-gray-800">
                                        <tr class="text-center">
                                            <th class="py-2 px-4" colspan="4">Diseño por corte</th>
                                        </tr>
                                        <tr class="text-center">
                                            <th class="py-2 px-4">Nombre</th>
                                            <th class="py-2 px-4">Simb.</th>
                                            <th class="py-2 px-4">Entrada</th>
                                            <th class="py-2 px-4">Unidad <br> Medida</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-center">
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Condicion de Esbeltez</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" name="CDEsbelZ" id="CDEsbelZ" aria-label="Default select example">
                                                    <option disabled selected>Condicion de Esbeltez</option>
                                                    <option value="1.01">Biarticulada</option>
                                                    <option value="0.5">Empotrado Impedido</option>
                                                    <option value="2">Empotrado y Libre</option>
                                                    <option value="1.02">Empotrado Permitido</option>
                                                    <option value="1">Según Norma</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Sistema Estructural</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" name="SEstru" id="SEstru" aria-label="Default select example">
                                                    <option value="" disabled selected>Sistema Estructural</option>
                                                    <option value="Porticos">Pórticos</option>
                                                    <option value="DualTipI">Dual Tipo I</option>
                                                    <option value="DualTipII">Dual Tipo II</option>
                                                    <option value="MEstructurales">Muros Estructurales</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Sistema Estructural</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" name="Tgrapas" id="Tgrapas" aria-label="Default select example">
                                                    <option value="" disabled selected>Tipo de Grapas
                                                    </option>
                                                    <option value="caso I">CASO I</option>
                                                    <option value="caso II">CASO II</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Pu inf</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="puinf" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="puinf" placeholder="0" min="0" value="0" required>
                                            </th>
                                            <th class="py-2 px-4">Ton</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Pu Sup</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="pusup" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="pusup" placeholder="0" min="0" value="0" required>
                                            </th>
                                            <th class="py-2 px-4">Ton</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Mn inf</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="Mninf" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="Mninf" placeholder="0" min="0" value="0" required>
                                            </th>
                                            <th class="py-2 px-4">Ton.m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Mn Sup</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="Mnsup" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="Mnsup" placeholder="0" min="0" value="0" required>
                                            </th>
                                            <th class="py-2 px-4">Ton.m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Vud etabs (Ton)</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="VudEtaps" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="VudEtaps" placeholder="0" min="0" value="0" required>
                                            </th>
                                            <th class="py-2 px-4">Ton</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Area del Acero Total:</th>
                                            <th class="py-2 px-4">Area del Acero Total:</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="AAceroTotal" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="AAceroTotal" placeholder="0" min="0" value="0" required>
                                            </th>
                                            <th class="py-2 px-4">cm<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Sistema Estructural</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" name="AEstribos" id="AEstribos" aria-label="Default select example">
                                                    <option disabled selected>Acero de Estribos</option>
                                                    <option value="0.28">ø6mm</option>
                                                    <option value="1.13">12mm</option>
                                                    <option value="0.50">8mm</option>
                                                    <option value="0.71">ø3/8"</option>
                                                    <option value="1.27">ø1/2"</option>
                                                    <option value="1.98">ø5/8"</option>
                                                    <option value="2.85">ø3/4"</option>
                                                    <option value="5.10">ø1"</option>
                                                    <option value="7.92">ø1 1/4"</option>
                                                    <option value="11.40">ø1 1/2"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Acero Maximo Longitudinal</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" name="AmaxLong" id="AmaxLong" aria-label="Default select example">
                                                    <option disabled selected>Acero de Estribos</option>
                                                    <option value="0.28">ø6mm</option>
                                                    <option value="1.13">12mm</option>
                                                    <option value="0.50">8mm</option>
                                                    <option value="0.71">ø3/8"</option>
                                                    <option value="1.27">ø1/2"</option>
                                                    <option value="1.98">ø5/8"</option>
                                                    <option value="2.85">ø3/4"</option>
                                                    <option value="5.10">ø1"</option>
                                                    <option value="7.92">ø1 1/4"</option>
                                                    <option value="11.40">ø1 1/2"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th class="py-2 px-4">
                                                <div class="input-group mb-2">
                                                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="submit">DISEÑAR</button>
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>

                                <input type="hidden" name="dataFromHandsontable" id="dataFromHandsontable" value="">
                                <input type="hidden" name="dataFromHandsontableLAX" id="dataFromHandsontableLAX" value="">
                                <input type="hidden" name="dataFromHandsontableLAY" id="dataFromHandsontableLAY" value="">
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Resultados -->
                <div class="w-full md:w-2/3 px-4 mt-4 md:mt-0">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Resultados</h3>
                        <div class="overflow-x-auto">
                            <div id="ObtenerResultadosCol"></div>
                        </div>
                        <div class="overflow-x-auto">
                            <div class="grid grid-cols-2 gap-4">
                                <script src="https://npmcdn.com/chart.js@latest/dist/chart.umd.js"></script>
                                <div class="myChartDiv">
                                    <canvas id="DIXXs" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;">></canvas>
                                </div>
                                <div class="myChartDiv">
                                    <canvas id="DIejey" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;">></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js"></script>
    <script src="{{ asset('assets/js/adm_desing_columna.js') }}"></script>

</x-app-layout>