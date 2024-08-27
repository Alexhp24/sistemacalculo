<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Fuerzas Cortantes Grafico') }}
        </h2>
    </x-slot>
    <link href="https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css" rel="stylesheet">
    <script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form id="fuerzasCortantesForm">
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
                                            <td class="py-2 px-4">Resistencia a la compresion del concreto</td>
                                            <td class="py-2 px-4">fc</td>
                                            <td class="py-2 px-4"><input type="number" name="fc"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="fc" min="0" value="210" step="any" required></td>
                                            <td class="py-2 px-4">Tn/m</td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4">Esfuerzo de fluencia del acero</td>
                                            <td class="py-2 px-4">Fy</td>
                                            <td class="py-2 px-4"><input type="number" name="Fy"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="Fy" min="0" value="4200" step="any" required></td>
                                            <td class="py-2 px-4">Tn/m</td>
                                        </tr>
                                        {{-- <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4">Modulo de Elasticidad del concreto</td>
                                            <td class="py-2 px-4">E</td>
                                            <td class="py-2 px-4"><input type="number" name="E"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="E" min="0" value="2173000" required></td>
                                            <td class="py-2 px-4">Tn/m</td>
                                        </tr> --}}
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4">Factor rm</td>
                                            <td class="py-2 px-4"></td>
                                            <td class="py-2 px-4"><input type="number" name="frm"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="frm" min="0" value="1.4" step="any" required></td>
                                            <td class="py-2 px-4"></td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4">Factor rv</td>
                                            <td class="py-2 px-4"></td>
                                            <td class="py-2 px-4"><input type="number" name="frv"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="frv" min="0" value="1.7" step="any" required></td>
                                            <td class="py-2 px-4"></td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <td class="py-2 px-4">Ancho Tributario</td>
                                            <td class="py-2 px-4"></td>
                                            <td class="py-2 px-4"><input type="number" name="anchoTributario"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="anchoTributario" value="1" step="any" required></td>
                                            <td class="py-2 px-4"></td>
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
                                        <!-- Agregar más filas según sea necesario -->
                                        <tr>
                                            <th class="py-2 px-4">
                                                <div class="input-group mb-2">
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
                                    <th class="text-xl py-2 px-4 text-left" colspan="4">
                                        1.- Geometria
                                    </th>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4" id="viguetas">
                                    </td>
                                </tr>
                                <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                    <th class="text-xl py-2 px-4 text-left" colspan="4">
                                        2.- Cargas Muertas
                                    </th>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4" id="cargaMuerta">
                                    </td>
                                </tr>
                                <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                    <th class="text-xl py-2 px-4 text-left" colspan="4">
                                        3.- Cargas Vivas
                                    </th>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4" id="cargaViva">
                                    </td>
                                </tr>
                                <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                    <th class="text-xl py-2 px-4 text-left" colspan="4">
                                        4.- Analisis Estructural
                                    </th>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4">
                                        <div id="fuerzasCortantes"></div>
                                    </td>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4">
                                        <div id="momentosFlectores"></div>
                                    </td>
                                </tr>
                                <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                    <th class="text-xl py-2 px-4 text-left" colspan="4">
                                        5.- Diseño a Flexion
                                    </th>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="2">
                                        <div id="T1"></div>
                                    </td>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4" id="asd">
                                    </td>
                                </tr>
                                <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                    <th class="text-xl py-2 px-4 text-left" colspan="4">
                                        6.- Diseño a Cortante
                                    </th>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="2">
                                        <div id="T2"></div>
                                    </td>
                                </tr>
                                <tr class="bg-gray-100 dark:bg-gray-600">
                                    <td class="py-2 px-4" colspan="4" id="vu">
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('assets/js/mat4js.index.min.js') }}"></script>
    <script src="{{ asset('assets/js/adm_fuerzas_cortantes_grafico.js') }}" type="module"></script>

</x-app-layout>
