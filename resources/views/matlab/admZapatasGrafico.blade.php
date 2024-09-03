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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
        integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
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
                                    <tbody class="text-center">
                                        <tr>
                                            <th class="text-xl py-2 px-4 text-left border-b border-gray-600"
                                                colspan="4" scope="col">Cargas</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4" colspan="4">
                                                <div id="cargas"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="text-xl py-2 px-4 text-left border-b border-gray-600"
                                                colspan="4" scope="col">Propiedades</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4" colspan="4">
                                                <div id="propiedades"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th class="text-xl py-2 px-4 text-left border-b border-gray-600"
                                                colspan="4" scope="col">Poligono</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4">
                                                <div id="poligonoExterior"></div>
                                            </td>
                                            <td class="py-2 px-4">
                                                <div id="poligonoInterior1"></div>
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4">
                                                <div id="poligonoInterior2"></div>
                                            </td>
                                            <td class="py-2 px-4">
                                                <div id="poligonoInterior3"></div>
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4">
                                                <div id="poligonoInterior4"></div>
                                            </td>
                                            <td class="py-2 px-4">
                                                <div id="poligonoInterior5"></div>
                                            </td>
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
                                            <th class="py-2 px-4">
                                                <div class="input-group mb-2 text-left">
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
                                <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                    <th class="text-xl py-2 px-4 text-left" colspan="4">1.- Analisis Estructural
                                    </th>
                                </tr>
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
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4">
                                        <div id="zapata7"></div>
                                    </td>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4">
                                        <div id="zapata8"></div>
                                    </td>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4">
                                        <div id="zapata9"></div>
                                    </td>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4">
                                        <div id="zapata10"></div>
                                    </td>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4">
                                        <div id="zapata11"></div>
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
    <script src="{{ asset('assets/js/adm_zapatas_grafico.js') }}" type="module"></script>

</x-app-layout>
