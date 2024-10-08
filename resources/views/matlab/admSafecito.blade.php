<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Safecito') }}
        </h2>
    </x-slot>
    <style>
        .tabulator-cell:not(.tabulator-editable):not(.tabulator-calcs>.tabulator-cell) {
            background-color: #f2f2f2 !important;
        }
    </style>
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.css" rel="stylesheet">
    <link href="https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css" rel="stylesheet">
    <script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>
    <script src="https://unpkg.com/virtual-webgl@1.0.6/src/virtual-webgl.js"></script>
    <script src="https://cdn.plot.ly/plotly-2.34.0.min.js" charset="utf-8"></script>
    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form id="zapatas2Form">
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
                                    <tbody>
                                        <tr>
                                            <td class="py-2 px-4">-</td>
                                            <td class="py-2 px-4">Df</td>
                                            <td class="py-2 px-4"><input type="number" name="dF"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="dF" step="any" value="2" required></td>
                                            <td class="py-2 px-4">-</td>
                                        </tr>
                                        <tr>
                                            <td class="py-2 px-4">Peso Especifico</td>
                                            <td class="py-2 px-4">𝛾<sub>e</sub></td>
                                            <td class="py-2 px-4"><input type="number" name="pesoEspecifico"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="pesoEspecifico" step="any" value="1.8" required></td>
                                            <td class="py-2 px-4">-</td>
                                        </tr>
                                        <tr>
                                            <th class="text-xl py-2 px-4 text-left border-b border-gray-600"
                                                colspan="4" scope="col">Propiedades</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4" colspan="4">
                                                <div class="w-full">
                                                    <div id="datosGenerales"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4" colspan="4">
                                                <div class="w-full">
                                                    <div id="combinacionDeCargas"></div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="py-2 px-4 text-left" colspan="4">
                                                <div class="input-group mb-2 text-left inline-block">
                                                    <button id="calcular"
                                                        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                                        type="submit">CARGAR</button>
                                                </div>
                                                <div class="input-group mb-2 text-left inline-block">
                                                    <button id="generarPDF"
                                                        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                                        type="button">PDF</button>
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
                                <thead>
                                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                        <th class="text-xl py-2 px-4 text-left" colspan="4">1.- Analisis
                                            Estructural
                                        </th>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-gray-600">
                                        <td id="plot" class="py-2 px-4" colspan="4">
                                            <!-- GUI -->
                                            <div>
                                                <form>
                                                    <textarea class="hidden" name="coords" readonly></textarea>
                                                    <input class="hidden" type="range" name="zoom" min="5"
                                                        max="40">
                                                </form>
                                                <ul class="flex items-center gap-4 mb-2">
                                                    <li id="arrows"><i class="fa fa-arrows" title="M: Mover"></i>
                                                    <li id="pencil"><i class="fa fa-pencil" title="L: Linea"></i>
                                                    <li id="plus" class="hidden"><i class="fa fa-plus"
                                                            title="A: Add"></i>
                                                    <li id="scissors"><i class="fa fa-eraser" title="C: Eliminar"></i>
                                                    <li id="copy"><i class="fa fa-clone" title="D: Copiar"></i>
                                                    <li id="eye-slash" class="hidden"><i class="fa fa-eye-slash"
                                                            title="V: Toggle Visibility"></i>
                                                    <li id="anchor"><i class="fa fa-anchor"
                                                            title="S: Toggle Grid Snap"></i>
                                                    </li>
                                                    <li class="hidden"><input type="number" name="snap"
                                                            class="form-control w-20 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                            id="snap" value="1" step="any"
                                                            min="0" required></i>
                                                    </li>
                                                    <li id="crosshairs"><i class="fa fa-crosshairs"
                                                            title="O: Editar Punto"></i>
                                                    <li><label for="x">X: </label>
                                                        <input type="number" name="x"
                                                            class="form-control w-20 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                            id="x" placeholder="0" step="any"
                                                            required></i>
                                                    </li>
                                                    <li><label for="y">Y: </label><input type="number"
                                                            name="y"
                                                            class="form-control w-20 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                            id="y" placeholder="0" step="any"
                                                            required></i>
                                                    </li>
                                                </ul>
                                                <ul class="flex gap-4 hidden">
                                                    <li id="undo"><i class="fa fa-undo" title="U: Undo"></i>
                                                    <li id="redo"><i class="fa fa-repeat" title="R: Redo"></i>
                                                    <li id="refresh"><i class="fa fa-trash-o"
                                                            title="Delete All"></i>
                                                    </li>
                                                </ul>
                                                {{-- <ol class="flex gap-4">
                                                    <li><i class="fa fa-file fa-rotate-180"></i></li>
                                                    <li><i class="fa fa-trash-o"></i></li>
                                                </ol> --}}
                                                <ul class="flex hidden">
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
                                                <ul class="flex hidden">
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
                                                <ul class="flex hidden gap-4">

                                                    <li id="clipboard"><i class="fa fa-clipboard"
                                                            title="Select array text"></i>
                                                </ul>
                                            </div>
                                            <div class="w-full h-[640px] relative" id="editor"><canvas
                                                    class="w-full h-full"></canvas>
                                            </div>
                                            <form id="calcularZapatas2">
                                                @csrf
                                                <button
                                                    class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 mt-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                                    type="submit">CALCULAR</button>
                                            </form>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody id="polygons">
                                </tbody>
                                <tbody id="graficos">
                                    <tr class="bg-gray-100 dark:bg-gray-600">
                                        <td class="py-2 px-4" colspan="4">
                                            <div id="zapata1"></div>
                                        </td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-gray-600">
                                        <td class="py-2 px-4" colspan="4">
                                            <div id="zapata2"></div>
                                        </td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-gray-600">
                                        <td class="py-2 px-4" colspan="4">
                                            <div id="zapata3"></div>
                                        </td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-gray-600">
                                        <td class="py-2 px-4" colspan="4">
                                            <div id="zapata4"></div>
                                        </td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-gray-600">
                                        <td class="py-2 px-4" colspan="4">
                                            <div id="zapata5"></div>
                                        </td>
                                    </tr>
                                    <tr class="bg-gray-100 dark:bg-gray-600">
                                        <td class="py-2 px-4" colspan="4">
                                            <div id="zapata6"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('assets/js/mat4js.index.min.js') }}"></script>
    <script src="{{ asset('assets/js/adm_safecito.js') }}" type="module"></script>
</x-app-layout>
