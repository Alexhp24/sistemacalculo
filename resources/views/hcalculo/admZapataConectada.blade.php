<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Diseño de Zapata Conectada') }}
        </h2>
    </x-slot>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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
                            <form action="{{ route('zapataconectadaCon') }}" method="POST" id="DataZapataconectada">
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
                                            <th class="py-2 px-4" colspan="4">Dimensiones de la columna 1</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="anchoCol1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="anchoCol1" placeholder="0.6" min="0" step="any"
                                                    value="0.6" required>
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Largo</th>
                                            <th class="py-2 px-4">Largo</th>
                                            <th class="py-2 px-4"><input type="text" name="largoCol1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="largoCol1" placeholder="0.4" min="0" value="0.4"
                                                    step="any" required></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">Dimensiones de la columna 2</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="anchoCol2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="anchoCol2" placeholder="0.8" min="0" step="any"
                                                    value="0.8" required>
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Largo</th>
                                            <th class="py-2 px-4">Largo</th>
                                            <th class="py-2 px-4"><input type="text" name="largoCol2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="largoCol2" placeholder="0.4" min="0" value="0.4"
                                                    step="any" required></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">Dimensiones de la zapata 1</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="anchoZap1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="anchoZap1" placeholder="1.2" min="0" step="any"
                                                    value="1.2" required>
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Largo</th>
                                            <th class="py-2 px-4">Largo</th>
                                            <th class="py-2 px-4"><input type="text" name="largoZap1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="largoZap1" placeholder="1.5" min="0" value="1.5"
                                                    step="any" required></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">Dimensiones de la zapata 2</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">
                                                <input type="text" name="anchoZap2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="anchoZap2" placeholder="1.5" min="0" step="any"
                                                    value="1.5" required>
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Largo</th>
                                            <th class="py-2 px-4">Largo</th>
                                            <th class="py-2 px-4"><input type="text" name="largoZap2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="largoZap2" placeholder="1.5" min="0" value="1.5"
                                                    step="any" required></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>

                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">Viga</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4">Ancho</th>
                                            <th class="py-2 px-4"><input type="text" name="anchoViga"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="anchoViga" value="0.4" placeholder="0.4" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>

                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">Luz libre entre columnas</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Luz Libre</th>
                                            <th class="py-2 px-4">ln</th>
                                            <th class="py-2 px-4"><input type="text" name="lndiseno"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="lndiseno" value="5" placeholder="5" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">Tipo de diseño</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Tipo de diseño</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="tipoDiseño" id="tipoDiseño"
                                                    aria-label="Default select example">
                                                    <option value="1">Tipo 1</option>
                                                    <option value="2">Tipo 2</option>
                                                    <option value="3">Tipo 3</option>
                                                    <option value="4">Tipo 4</option>
                                                    <option value="5">Tipo 5</option>
                                                    <option value="6">Tipo 6</option>
                                                    <option value="7">Tipo 7</option>
                                                    <option value="8">Tipo 8</option>
                                                    <option value="9">Tipo 9</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800 text-left">
                                            <th class="py-2 px-4" colspan="4">2.- Datos principales</th>
                                        </tr>
                                        {{-- Columna 1 --}}
                                        <tr class="bg-white dark:bg-gray-800 text-left">
                                            <th class="py-2 px-4" colspan="4">Columna 1</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">P<sub>D1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="PD1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="PD1" value="120" placeholder="120" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">P<sub>L1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="PL1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="PL1" value="70" placeholder="70" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">P<sub>SX1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="PSX1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="PSX1" value="20" placeholder="20" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">P<sub>SY1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="PSY1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="PSY1" value="12" placeholder="12" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>Dx1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MDx1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MDx1" value="8" placeholder="8" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>Lx1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MLx1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MLx1" value="6" placeholder="6" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>Dy1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MDy1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MDy1" value="6" placeholder="6" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>Ly1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MLy1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MLy1" value="4" placeholder="4" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>SX1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MSX1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MSX1" value="9" placeholder="9" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>SY1</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MSY1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MSY1" value="6" placeholder="6" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        {{-- Columna 2 --}}
                                        <tr class="bg-white dark:bg-gray-800 text-left">
                                            <th class="py-2 px-4" colspan="4">Columna 2</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">P<sub>D2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="PD2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="PD2" value="200" placeholder="200" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">P<sub>L2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="PL2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="PL2" value="115" placeholder="115" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">P<sub>SX2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="PSX2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="PSX2" value="15" placeholder="15" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">P<sub>SY2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="PSY2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="PSY2" value="13" placeholder="13" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>Dx2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MDx2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MDx2" value="3" placeholder="3" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>Lx2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MLx2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MLx2" value="1.5" placeholder="1.5" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>Dy2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MDy2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MDy2" value="7" placeholder="7" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>Ly2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MLy2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MLy2" value="5" placeholder="5" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>SX2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MSX2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MSX2" value="10" placeholder="10" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">M<sub>SY2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="MSY2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="MSY2" value="7" placeholder="7" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonnef</th>
                                        </tr>

                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">Capacidad portante admisible neta
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">qₙₑₜₐ</th>
                                            <th class="py-2 px-4"><input type="text" name="qneta"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="qneta" value="4" placeholder="4" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">kgf/cm<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4" colspan="4">Anchos de cada cimentación</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">B₁</th>
                                            <th class="py-2 px-4"><input type="text" name="b1"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="b1" value="3.4" placeholder="3.4" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">B₂</th>
                                            <th class="py-2 px-4"><input type="text" name="b2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="b2" value="2.8" placeholder="2.8" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">L <sub>2</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="l2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="l2" value="3.2" placeholder="3.2" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Factor de amplificación de cargas muertas</th>
                                            <th class="py-2 px-4">α<sub>D</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="fact_ampli_cm"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="fact_ampli_cm" value="1.4" placeholder="1.4"
                                                    min="0" required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4"></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Factor de amplificación de cargas vivas</th>
                                            <th class="py-2 px-4">α<sub>L</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="fact_ampli_cv"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="fact_ampli_cv" value="1.7" placeholder="1.7"
                                                    min="0" required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4"></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Factor de amplificación de cargas muertas</th>
                                            <th class="py-2 px-4">α<sub>D</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="fact_ampli_cm_c2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="fact_ampli_cm_c2" value="1.25" placeholder="1.25"
                                                    min="0" required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4"></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Factor de amplificación de cargas vivas</th>
                                            <th class="py-2 px-4">α<sub>D</sub></th>
                                            <th class="py-2 px-4"><input type="text" name="fact_ampli_cv_c2"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="fact_ampli_cv_c2" value="1.25" placeholder="1.25"
                                                    min="0" required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4"></th>
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
                            <canvas id="myCanvas" width="1000" height="300" style="border: none;"></canvas>
                        </div>
                        <div class="overflow-x-auto">
                            <div id="ObtenerResultadosZConectada">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <script src="{{ asset('assets/js/adm_zapata_conectada.js') }}"></script>

</x-app-layout>
