<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Diseño de zapata general') }}
        </h2>
    </x-slot>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" />
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js"></script>

    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form action="{{ route('zapataGenCon') }}" id="DataZapatageneral" method="post">
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
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">γs</th>
                                            <th class="py-2 px-4"><input type="text" name="ys"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="ys" value="1" placeholder="ys" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">tonf/m<sup>3</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">Df</th>
                                            <th class="py-2 px-4"><input type="text" name="df"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="df" value="1" placeholder="df" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">t</th>
                                            <th class="py-2 px-4"><input type="text" name="t"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="t" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">b</th>
                                            <th class="py-2 px-4"><input type="text" name="b"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="b" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">L</th>
                                            <th class="py-2 px-4"><input type="text" name="l"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="l" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">B</th>
                                            <th class="py-2 px-4"><input type="text" name="DZY"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="DZY" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">σs</th>
                                            <th class="py-2 px-4"><input type="text" name="cps"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="cps" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">kgf/m<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">α s</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="Columna" id="Columna"
                                                    aria-label="Default select example">
                                                    <option disabled>α s</option>
                                                    <option value="40">Columna Interior</option>
                                                    <option value="30" selected>Columna de Borde</option>
                                                    <option value="20">Columna en Esquina</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ф Varilla X</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="VarillaX" id="VarillaX"
                                                    aria-label="Default select example">
                                                    <option disabled>Ф Varilla</option>
                                                    <option value="0">Ø 0"</option>
                                                    <option value="0.283">6mm</option>
                                                    <option value="0.503">8mm</option>
                                                    <option value="0.713" selected>Ø 3/8"</option>
                                                    <option value="1.131">12mm</option>
                                                    <option value="1.267">Ø 1/2"</option>
                                                    <option value="1.979">Ø 5/8"</option>
                                                    <option value="2.850">Ø 3/4"</option>
                                                    <option value="5.067">Ø 1"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ф Varilla Y</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="VarillaY" id="VarillaY"
                                                    aria-label="Default select example">
                                                    <option disabled>Ф Varilla</option>
                                                    <option value="0">Ø 0"</option>
                                                    <option value="0.283">6mm</option>
                                                    <option value="0.503">8mm</option>
                                                    <option value="0.713" selected>Ø 3/8"</option>
                                                    <option value="1.131">12mm</option>
                                                    <option value="1.267">Ø 1/2"</option>
                                                    <option value="1.979">Ø 5/8"</option>
                                                    <option value="2.850">Ø 3/4"</option>
                                                    <option value="5.067">Ø 1"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Espaciamiento X</th>
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4"><input type="text" name="espaciamientox"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="espaciamientox" value="1" placeholder="1"
                                                    min="0" required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Espaciamiento Y</th>
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4"><input type="text" name="espaciamientoy"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="espaciamientoy" value="1" placeholder="1"
                                                    min="0" required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Inercia</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    name="inercia" id="inercia"
                                                    aria-label="Default select example">
                                                    <option disabled>α s</option>
                                                    </option>
                                                    <option value="Sregular" selected>Seccion Regular</option>
                                                    <option value="Sirregular">Seccion Irregular</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">Ix</th>
                                            <th class="py-2 px-4"><input type="text" name="B"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="B" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">cm<sup>4</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4"></th>
                                            <th class="py-2 px-4">Iy</th>
                                            <th class="py-2 px-4"><input type="text" name="By"
                                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                                    id="By" value="1" placeholder="1" min="0"
                                                    required
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                                            </th>
                                            <th class="py-2 px-4">cm<sup>4</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th colspan="4">
                                                <div id="CargaConServ"></div>
                                                <div id="CargaConServ"></div>
                                            </th>
                                        </tr>
                                        <input type="hidden" name="dataFromHandsontable" id="dataFromHandsontable"
                                            value="">
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
                            <div id="resultadosZapataGeneral"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script src="{{ asset('assets/js/adm_zapata_general.js') }}"></script>

</x-app-layout>
