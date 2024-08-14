<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Diseño de Zapata Combinada') }}
        </h2>
    </x-slot>
    <script>
        MathJax = {
            loader: {
                load: ['input/asciimath', 'output/chtml']
            }
        }
    </script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js"
        integrity="sha512-7U4rRB8aGAHGVad3u2jiC7GA5/1YhQcQjxKeaVms/bT66i3LVBMRcBI9KwABNWnxOSwulkuSXxZLGuyfvo7V1A=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@latest/dist/echarts.min.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/chart.js"></script>


    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form action="{{ route('zapatacombCon') }}" method="POST" id="DataZapataCombinada">
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
                                            <th class="py-2 px-4">Descripción</th>
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="des"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="des" placeholder="Zapata A1" value="Zapata A1" min="0" step="any"
                                                    required>
                                            </th>
                                            <th class="py-2 px-4">-</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Factor K</th>
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4"><input type="text" name="fk"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="fk" placeholder="1" min="0" value="1"
                                                    step="any" required></th>
                                            <th class="py-2 px-4">-</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">qa</th>
                                            <th class="py-2 px-4"><input type="text" name="qa"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="qa" step="any" value="3" placeholder="3"
                                                    min="0" required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">Ton/m<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Presión de Servicio</th>
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4"><input type="text" name="p_servicio"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="p_servicio" value="8" placeholder="8" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">Ton/m<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800 text-center">
                                            <th class="py-2 px-4" colspan="4">Predimencionamiento</th>
                                        </tr>
                                        {{-- Columna 1 --}}
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">columna 1</th>
                                            <th class="py-2 px-4">t1</th>
                                            <th class="py-2 px-4"><input type="text" name="t1_col1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="t1_col1" value="0.5" placeholder="0.5" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">columna 1</th>
                                            <th class="py-2 px-4">t2</th>
                                            <th class="py-2 px-4"><input type="text" name="t2_col1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="t2_col1" value="0.5" placeholder="0.5" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">columna 1</th>
                                            <th class="py-2 px-4">m1</th>
                                            <th class="py-2 px-4"><input type="text" name="m1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="m1" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        {{-- Columna 2 --}}
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">columna 2</th>
                                            <th class="py-2 px-4">t1</th>
                                            <th class="py-2 px-4"><input type="text" name="t1_col2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="t1_col2" value="0.5" placeholder="0.5" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">columna 2</th>
                                            <th class="py-2 px-4">t2</th>
                                            <th class="py-2 px-4"><input type="text" name="t2_col2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="t2_col2" value="0.5" placeholder="0.5" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">columna 2</th>
                                            <th class="py-2 px-4">m2</th>
                                            <th class="py-2 px-4"><input type="text" name="m2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="m2" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Esfuerzo de compresión del concreto</th>
                                            <th class="py-2 px-4">fc</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="fc"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="fc" placeholder="210" min="0" value="210"
                                                    required>
                                            </th>
                                            <th class="py-2 px-4">kg/cm<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Esfuerzo de fluencia del acero</th>
                                            <th class="py-2 px-4">fy</th>
                                            <th class="py-2 px-4"><input type="text" name="fy"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="fy" placeholder="4200" min="0" value="4200"
                                                    required></th>
                                            <th class="py-2 px-4">kg/cm<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Profundidad de desplante</th>
                                            <th class="py-2 px-4">Df</th>
                                            <th class="py-2 px-4"><input type="text" name="df"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="df" placeholder="1.5" min="0" value="1.5"
                                                    required></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">S/C</th>
                                            <th class="py-2 px-4"><input type="text" name="sc"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="sc" placeholder="500" min="0" value="500"
                                                    required></th>
                                            <th class="py-2 px-4">Kg/m<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">ym</th>
                                            <th class="py-2 px-4"><input type="text" name="ym"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="ym" placeholder="2000" min="0" value="2000"
                                                    required></th>
                                            <th class="py-2 px-4">Kg/m<sup>3</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">hc</th>
                                            <th class="py-2 px-4"><input type="text" name="hc"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="hc" placeholder="0.2" min="0" value="0.2"
                                                    required></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">σt</th>
                                            <th class="py-2 px-4"><input type="text" name="ot"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="ot" placeholder="3" min="0" value="3"
                                                    required></th>
                                            <th class="py-2 px-4">Kg/m<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">hz</th>
                                            <th class="py-2 px-4"><input type="text" name="hz"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="hz" placeholder="1" min="0" value="1"
                                                    required></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">r</th>
                                            <th class="py-2 px-4"><input type="text" name="r"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="r" placeholder="1" min="0" value="1"
                                                    required></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">rec</th>
                                            <th class="py-2 px-4"><input type="text" name="rec"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="rec" placeholder="7.5" min="0" value="7.5"
                                                    required></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Le</th>
                                            <th class="py-2 px-4"><input type="text" name="Le"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="Le" placeholder="5" min="0" value="5"
                                                    required></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <input name="dataCargacol1" type="hidden" id="dataCargacol1"
                                            value="">
                                        <input name="dataCargacol2" type="hidden" id="dataCargacol2"
                                            value="">

                                        {{-- COMBINACION Y CARGAS --}}
                                        <tr class="bg-white dark:bg-gray-800 text-center">
                                            <th class="py-2 px-4" colspan="4">Combinacion de cargas</th>
                                        </tr>

                                        {{-- Columna 1 --}}
                                        <tr class="bg-white dark:bg-gray-500 text-left">
                                            <th class="py-2 px-4" colspan="4">Columna 1</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">
                                                <div id="CargaConServ" class="tamaño-tabla" style="height: 160px">
                                                </div>
                                            </th>
                                        </tr>

                                        {{-- Columna 2 --}}
                                        <tr class="bg-white dark:bg-gray-500 text-left">
                                            <th class="py-2 px-4" colspan="4">Columna 2</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">
                                                <div id="CargaConServcol2" class="tamaño-tabla"
                                                    style="height: 160px">
                                                </div>
                                            </th>
                                        </tr>

                                        {{-- Diseño de verificacion por cortante --}}
                                        <tr class="bg-white dark:bg-gray-500 text-left">
                                            <th class="py-2 px-4" colspan="4">Diseño de verificacion por cortante
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Columna 1</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="selectColumna1" id="selectColumna1"
                                                    aria-label="Default select example">
                                                    <option value="fila1_col1">1.4CM+1.7CV</option>
                                                    <option value="fila2_col1">1.25(CM+CV)+Sx</option>
                                                    <option value="fila3_col1">1.25(CM+CV)-Sx</option>
                                                    <option value="fila4_col1">1.25(CM+CV)+Sy</option>
                                                    <option value="fila5_col1">1.25(CM+CV)-Sy</option>
                                                    <option value="fila6_col1">0.9CM+Sx</option>
                                                    <option value="fila7_col1">0.9CM-Sx</option>
                                                    <option value="fila8_col1">0.9CM+Sy</option>
                                                    <option value="fila9_col1">0.9CM-Sx</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Columna 2</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="selectColumna2" id="selectColumna2"
                                                    aria-label="Default select example">
                                                    <option value="fila1_col2">1.4CM+1.7CV</option>
                                                    <option value="fila2_col2">1.25(CM+CV)+Sx</option>
                                                    <option value="fila3_col2">1.25(CM+CV)-Sx</option>
                                                    <option value="fila4_col2">1.25(CM+CV)+Sy</option>
                                                    <option value="fila5_col2">1.25(CM+CV)-Sy</option>
                                                    <option value="fila6_col2">0.9CM+Sx</option>
                                                    <option value="fila7_col2">0.9CM-Sx</option>
                                                    <option value="fila8_col2">0.9CM+Sy</option>
                                                    <option value="fila9_col2">0.9CM-Sx</option>
                                                </select>
                                            </th>
                                        </tr>

                                        {{-- Columna 1 --}}
                                        <tr class="bg-white dark:bg-gray-500 text-left">
                                            <th class="py-2 px-4" colspan="4">Columna 1</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">lv</th>
                                            <th class="py-2 px-4"><input type="text" name="lv_col1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="lv_col1" placeholder="0.75" min="0" value="0.75"
                                                    required></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">d</th>
                                            <th class="py-2 px-4"><input type="text" name="d_col1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="d_col1" placeholder="90.6" min="0" value="90.6"
                                                    required></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ф Varilla</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="VarillaX_Col1" id="VarillaX_Col1"
                                                    aria-label="Default select example">
                                                    <option value="0">Ø 0"</option>
                                                    <option value="0.28">6mm</option>
                                                    <option value="0.5">8mm</option>
                                                    <option value="0.71" selected>Ø 3/8"</option>
                                                    <option value="1.13">12mm</option>
                                                    <option value="1.29">Ø 1/2"</option>
                                                    <option value="1.99">Ø 5/8"</option>
                                                    <option value="2.84">Ø 3/4"</option>
                                                    <option value="5.1">Ø 1"</option>
                                                    <option value="10.06">Ø 1 3/8"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">ρmin</th>
                                            <th class="py-2 px-4"><input type="text" name="pmin_col1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="pmin_col1" placeholder="0.0018" min="0"
                                                    value="0.0018" required></th>
                                            <th class="py-2 px-4">-</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ф Varilla</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="selectVFColumna1" id="selectVFColumna1"
                                                    aria-label="Default select example">
                                                    <option value="fila1_col1">1.4CM+1.7CV</option>
                                                    <option value="fila2_col1">1.25(CM+CV)+Sx</option>
                                                    <option value="fila3_col1">1.25(CM+CV)-Sx</option>
                                                    <option value="fila4_col1">1.25(CM+CV)+Sy</option>
                                                    <option value="fila5_col1">1.25(CM+CV)-Sy</option>
                                                    <option value="fila6_col1">0.9CM+Sx</option>
                                                    <option value="fila7_col1">0.9CM-Sx</option>
                                                    <option value="fila8_col1">0.9CM+Sy</option>
                                                    <option value="fila9_col1">0.9CM-Sx</option>
                                                </select>
                                            </th>
                                        </tr>

                                        {{-- Columna 2 --}}
                                        <tr class="bg-white dark:bg-gray-500 text-left">
                                            <th class="py-2 px-4" colspan="4">Columna 2</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">lv</th>
                                            <th class="py-2 px-4"><input type="text" name="lv_col2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="lv_col2" placeholder="0.75" min="0" value="0.75"
                                                    required></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">d</th>
                                            <th class="py-2 px-4"><input type="text" name="d_col2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="d_col2" placeholder="90.6" min="0" value="89.01"
                                                    required></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ф Varilla</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="VarillaX_Col2" id="VarillaX_Col2"
                                                    aria-label="Default select example">
                                                    <option value="0">Ø 0"</option>
                                                    <option value="0.28">6mm</option>
                                                    <option value="0.5">8mm</option>
                                                    <option value="0.71" selected>Ø 3/8"</option>
                                                    <option value="1.13">12mm</option>
                                                    <option value="1.29">Ø 1/2"</option>
                                                    <option value="1.99">Ø 5/8"</option>
                                                    <option value="2.84">Ø 3/4"</option>
                                                    <option value="5.1">Ø 1"</option>
                                                    <option value="10.06">Ø 1 3/8"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">ρmin</th>
                                            <th class="py-2 px-4"><input type="text" name="pmin_col2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="pmin_col2" placeholder="0.0018" min="0"
                                                    value="0.0018" required></th>
                                            <th class="py-2 px-4">-</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ф Varilla</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="selectVFColumna2" id="selectVFColumna2"
                                                    aria-label="Default select example">
                                                    <option value="fila1_col2">1.4CM+1.7CV</option>
                                                    <option value="fila2_col2">1.25(CM+CV)+Sx</option>
                                                    <option value="fila3_col2">1.25(CM+CV)-Sx</option>
                                                    <option value="fila4_col2">1.25(CM+CV)+Sy</option>
                                                    <option value="fila5_col2">1.25(CM+CV)-Sy</option>
                                                    <option value="fila6_col2">0.9CM+Sx</option>
                                                    <option value="fila7_col2">0.9CM-Sx</option>
                                                    <option value="fila8_col2">0.9CM+Sy</option>
                                                    <option value="fila9_col2">0.9CM-Sx</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">φ</th>
                                            <th class="py-2 px-4"><input type="text" name="fi_general"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="pmin_fi_generalcol2" placeholder="0.9" min="0"
                                                    value="0.9" required></th>
                                            <th class="py-2 px-4">-</th>
                                        </tr>
                                        {{-- Verificacion por corte y punzunamiento --}}
                                        <tr class="bg-white dark:bg-gray-800 text-left">
                                            <th class="py-2 px-4" colspan="4">Verificación por Corte y
                                                Punzonamiento
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-500 text-left">
                                            <th class="py-2 px-4" colspan="4">Columna 1</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">d</th>
                                            <th class="py-2 px-4"><input type="text" name="dvc_col1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="dvc_col1" placeholder="91.55" min="0" value="91.55"
                                                    required></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">r</th>
                                            <th class="py-2 px-4"><input type="text" name="r_vc_col1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="r_vc_col1" placeholder="7.5" min="0" value="7.5"
                                                    required></th>
                                            <th class="py-2 px-4">-</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ф Varilla</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="VarillaVC_Col1" id="VarillaVC_Col1"
                                                    aria-label="Default select example">
                                                    <option value="0">Ø 0"</option>
                                                    <option value="0.28">6mm</option>
                                                    <option value="0.5">8mm</option>
                                                    <option value="0.71" selected>Ø 3/8"</option>
                                                    <option value="1.13">12mm</option>
                                                    <option value="1.29">Ø 1/2"</option>
                                                    <option value="1.99">Ø 5/8"</option>
                                                    <option value="2.84">Ø 3/4"</option>
                                                    <option value="5.1">Ø 1"</option>
                                                    <option value="10.06">Ø 1 3/8"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Tipo de Columna y Factor α</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="fa_Col1" id="fa_Col1"
                                                    aria-label="Default select example">
                                                    <option value="40">Columnas Interiores</option>
                                                    <option value="30" selected>Columnas de Borde</option>
                                                    <option value="20">Columnas de Esquina</option>
                                                </select>
                                            </th>
                                        </tr>

                                        {{-- Columna 2 --}}
                                        <tr class="bg-white dark:bg-gray-500 text-left">
                                            <th class="py-2 px-4" colspan="4">Columna 2</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">d</th>
                                            <th class="py-2 px-4"><input type="text" name="dvc_col2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="dvc_col2" placeholder="91.55" min="0" value="91.55"
                                                    required></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">r</th>
                                            <th class="py-2 px-4"><input type="text" name="r_vc_col2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="r_vc_col2" placeholder="7.5" min="0" value="7.5"
                                                    required></th>
                                            <th class="py-2 px-4">-</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ф Varilla</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="VarillaVC_Col2" id="VarillaVC_Col2"
                                                    aria-label="Default select example">
                                                    <option value="0">Ø 0"</option>
                                                    <option value="0.28">6mm</option>
                                                    <option value="0.5">8mm</option>
                                                    <option value="0.71" selected>Ø 3/8"</option>
                                                    <option value="1.13">12mm</option>
                                                    <option value="1.29">Ø 1/2"</option>
                                                    <option value="1.99">Ø 5/8"</option>
                                                    <option value="2.84">Ø 3/4"</option>
                                                    <option value="5.1">Ø 1"</option>
                                                    <option value="10.06">Ø 1 3/8"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Tipo de Columna y Factor α</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="fa_Col2" id="fa_Col2"
                                                    aria-label="Default select example">
                                                    <option value="40">Columnas Interiores</option>
                                                    <option value="30" selected>Columnas de Borde</option>
                                                    <option value="20">Columnas de Esquina</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">∅</th>
                                            <th class="py-2 px-4"><input type="text" name="ovcp"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="ovcp" placeholder="0.85" min="0" value="0.85"
                                                    required></th>
                                            <th class="py-2 px-4">-</th>
                                        </tr>
                                        <tr>
                                            <th class="py-2 px-4">
                                                <div class="input-group mb-2">
                                                    <button
                                                        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                                        type="submit">DISEÑAR</button>
                                                </div>
                                            </th>
                                        </tr>
                                        <!-- Agregar más filas según sea necesario -->
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
                        <div class="overflow-x-auto">
                            <div class="overflow-x-auto">
                                <canvas id="predimencionamiento" width="1000" height="400" ></canvas>
                            </div>
                            <div class="overflow-x-auto">
                                <canvas id="vistaplanta" width="1000" height="400" ></canvas>
                            </div>
                            <div class="overflow-x-auto">
                                <canvas id="myChart" width="1000" height="400" ></canvas>
                            </div>
                            <div class="overflow-x-auto">
                                <canvas id="VC_flexion" width="1000" height="400" ></canvas>
                            </div>
                            <div class="overflow-x-auto">
                                <canvas id="corte_punzonamiento" width="1000" height="400" ></canvas>
                            </div>
                            <div class="overflow-x-auto">
                                <div id="ObtenerResultadosZComb"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js"></script>
    <script src="{{ asset('assets/js/adm_zapata_combinada.js') }}"></script>

</x-app-layout>
