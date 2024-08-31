<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Zapatas Grafico') }}
        </h2>
    </x-slot>
    <style>
        .tabulator-cell:not(.tabulator-editable):not(.tabulator-calcs>.tabulator-cell) {
            background-color: #f2f2f2 !important;
        }

        #zapatas,
        #zapatas * {
            box-sizing: content-box;
        }
    </style>
    <link href="https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css" rel="stylesheet">
    <script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>
    <script src="https://unpkg.com/virtual-webgl@1.0.6/src/virtual-webgl.js"></script>
    <script src="https://cdn.plot.ly/plotly-2.34.0.min.js" charset="utf-8"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.css" rel="stylesheet">
    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form id="zapatasForm">
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
                                        <tr>
                                            <td class="py-2 px-4">Modulo Elástico</td>
                                            <td class="py-2 px-4">E</td>
                                            <td class="py-2 px-4"><input type="number" name="modElastico"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="modElastico" min="0" value="210" required></td>
                                            <td class="py-2 px-4">Kpa</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-4">Área de la sección</td>
                                            <td class="py-2 px-4">A</td>
                                            <td class="py-2 px-4"><input type="number" name="aSeccion"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="aSeccion" min="0" value="210" required></td>
                                            <td class="py-2 px-4">m<sup>2</sup></td>
                                        </tr>
                                        <tr>
                                            <th class="text-xl py-2 px-4 text-left border-b border-gray-600"
                                                colspan="4" scope="col">Nodos</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">ID</th>
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="nodoID"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="nodoID" min="0" required>
                                            </th>
                                            <th class="py-2 px-4"></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Posición</th>
                                            <th class="py-2 px-4">x</th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="posX"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="posX" placeholder="0" min="0" required>
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Posición</th>
                                            <th class="py-2 px-4">y</th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="posY"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="posY" placeholder="0" min="0" required>
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr>
                                            <th class="text-xl py-2 px-4 text-left border-b border-gray-600"
                                                colspan="4" scope="col">Barras</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">ID</th>
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="barraID"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="barraID" min="0" required>
                                            </th>
                                            <th class="py-2 px-4"></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Nodo</th>
                                            <th class="py-2 px-4">A</th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="nodoAID"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="nodoAID" min="0"" required>
                                            </th>
                                            <th class="py-2 px-4">ID</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Nodo</th>
                                            <th class="py-2 px-4">B</th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="nodoBID"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="nodoBID" min="0"" required>
                                            </th>
                                            <th class="py-2 px-4">ID</th>
                                        </tr>
                                        <tr>
                                            <th class="text-xl py-2 px-4 text-left border-b border-gray-600"
                                                colspan="4" scope="col">Soportes</th>
                                        </tr>
                                        <tr>
                                            <th class="text-xl py-2 px-4 text-left border-b border-gray-600"
                                                colspan="4" scope="col">Fuerzas</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">ID</th>
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="nodoID"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="nodoID" min="0" required>
                                            </th>
                                            <th class="py-2 px-4"></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Magnitud</th>
                                            <th class="py-2 px-4">X</th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="magnitudX"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="magnitudX" min="0" required>
                                            </th>
                                            <th class="py-2 px-4">kN</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Magnitud</th>
                                            <th class="py-2 px-4">Y</th>
                                            <th class="py-2 px-4">
                                                <input type="number" name="magnitudY"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="magnitudY" min="0" required>
                                            </th>
                                            <th class="py-2 px-4">kN</th>
                                        </tr>
                                        <!-- Agregar más filas según sea necesario -->
                                        <tr>
                                            <th class="py-2 px-4">
                                                <div class="input-group mb-2 text-left">
                                                    <button id="calcular"
                                                        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                                        type="submit">DISEÑAR</button>
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Resultados -->
                <div class="w-full md:w-2/3 px-4 mt-4 md:mt-0">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Resultados</h3>
                        <div class="overflow-x-auto" id="resultados">
                            <table class="min-w-full text-gray-800 dark:text-white">
                                <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                    <th class="text-xl py-2 px-4 text-left" colspan="4">1.- Analisis Estructural
                                    </th>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td id="plot" class="py-2 px-4">
                                        <!-- GUI -->
                                        <canvas></canvas>
                                        <div>
                                            <form>
                                                <textarea name="coords" readonly></textarea>
                                                <input type="range" name="zoom" min="5" max="40">
                                            </form>
                                            <ul style="top:10px;left:10px">
                                                <li id="arrows"><i class="fa fa-arrows" title="M: Move"></i>
                                                <li id="pencil"><i class="fa fa-pencil" title="L: Line"></i>
                                                <li id="plus"><i class="fa fa-plus" title="A: Add"></i>
                                                <li id="scissors"><i class="fa fa-scissors" title="C: Cut"></i>
                                                <li id="crosshairs"><i class="fa fa-crosshairs"
                                                        title="O: Change Origin"></i>
                                                <li id="eye-slash"><i class="fa fa-eye-slash"
                                                        title="V: Toggle Visibility"></i>
                                                <li id="anchor"><i class="fa fa-anchor"
                                                        title="S: Toggle Grid Snap"></i>
                                                </li>
                                            </ul>

                                            <ul style="top:45px;left:10px;">
                                                <li id="undo"><i class="fa fa-undo" title="U: Undo"></i>
                                                <li id="redo"><i class="fa fa-repeat" title="R: Redo"></i>
                                                <li id="refresh"><i class="fa fa-trash-o" title="Delete All"></i>
                                                </li>
                                            </ul>

                                            <!-- <ol style="bottom:89px;left:10px;">
        <li><i class="fa fa-file fa-rotate-180"></i></li><li><i class="fa fa-trash-o"></i></li>
    </ol> -->

                                            <ul style="top:80px;left:10px;">
                                                <li id="color:1" style="background-color:#2020FF"><i
                                                        class="fa fa-paint-brush" title="Color: BLUE"></i>
                                                <li id="color:2" style="background-color:#FFFFFF"><i
                                                        class="fa fa-paint-brush" title="Color: WHITE"></i>
                                                <li id="color:3" style="background-color:#00FF00"><i
                                                        class="fa fa-paint-brush" title="Color: GREEN"></i>
                                                <li id="color:4" style="background-color:#FFFF00"><i
                                                        class="fa fa-paint-brush" title="Color: YELLOW"></i>
                                                <li id="color:5" style="background-color:#FF0000"><i
                                                        class="fa fa-paint-brush" title="Color: RED"></i>
                                                <li id="color:6" style="background-color:#00FFFF"><i
                                                        class="fa fa-paint-brush" title="Color: CYAN"></i>
                                                <li id="color:7" style="background-color:#FF00FF"><i
                                                        class="fa fa-paint-brush" title="Color: MAGENTA"></i>
                                                <li id="color:8" style="background-color:#008080"><i
                                                        class="fa fa-paint-brush" title="Color: CYAN_DK"></i>
                                            </ul>

                                            <ul style="top:115px;left:10px;">
                                                <li id="color:9" style="background-color:#E55300"><i
                                                        class="fa fa-paint-brush" title="Color: ORANGE"></i>
                                                <li id="color:10" style="background-color:#8B4513"><i
                                                        class="fa fa-paint-brush" title="Color: BROWN"></i>
                                                <li id="color:11" style="background-color:#808000"><i
                                                        class="fa fa-paint-brush" title="Color: YELLOW_DK"></i>
                                                <li id="color:12" style="background-color:#808080"><i
                                                        class="fa fa-paint-brush" title="Color: GRAY"></i>
                                                <li id="color:13" style="background-color:#404040"><i
                                                        class="fa fa-paint-brush" title="Color: GRAY_DK"></i>
                                                <li id="color:14" style="background-color:#87CEFA"><i
                                                        class="fa fa-paint-brush" title="Color: LIGHTSKYBLUE"></i>
                                                <li id="color:15" style="background-color:#1E90FF"><i
                                                        class="fa fa-paint-brush" title="Color: DODGERBLUE"></i>
                                                <li id="color:16" style="background-color:#ADD8E6"><i
                                                        class="fa fa-paint-brush" title="Color: LIGHTBLUE"></i>
                                            </ul>

                                            <ul style="bottom:40px;right:11px">
                                                <li id="copy"><i class="fa fa-copy"
                                                        title="Open polygon in new editor instance as URL"></i>
                                                <li id="clipboard"><i class="fa fa-clipboard"
                                                        title="Select array text"></i>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('assets/js/mat4js.index.min.js') }}"></script>
    <script src="{{ asset('assets/js/adm_analisis_estructural_de_armaduras.js') }}" type="module"></script>

</x-app-layout>
