<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Cimiento Corrido') }}
        </h2>
    </x-slot>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/echarts@latest/dist/echarts.min.js"></script>
    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form id="cimientosControler" method="POST" action="{{ route('cimientocorrido') }}">
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
                                                <input type="text" name="fc" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="fc" placeholder="210" min="0" value="210" required>
                                            </th>
                                            <th class="py-2 px-4">kg/cm<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Esfuerzo de fluencia del acero</th>
                                            <th class="py-2 px-4">fy</th>
                                            <th class="py-2 px-4"><input type="text" name="fy" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="fy" placeholder="4200" min="0" value="4200" required></th>
                                            <th class="py-2 px-4">kg/cm<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">L1</th>
                                            <th class="py-2 px-4"><input type="text" name="l1" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="l1" value="30" placeholder="L1" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">L2</th>
                                            <th class="py-2 px-4"><input type="text" name="l2" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="l2" value="50" placeholder="L2" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Ø Columna</th>
                                            <th class="py-2 px-4" colspan="3">
                                                <select class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" name="columna" id="columna" aria-label="Default select example">
                                                    <option value="" selected="selected" disabled>Seleccione</option>
                                                    <option value="0.60">6 mm</option>
                                                    <option value="0.80">8 mm</option>
                                                    <option value="0.95">3/8"</option>
                                                    <option value="1.20">12 mm</option>
                                                    <option value="1.27">1/2"</option>
                                                    <option value="1.59">5/8"</option>
                                                    <option value="1.91" selected>3/4"</option>
                                                    <option value="2.54">1"</option>
                                                    <option value="3.49">1 3/8"</option>
                                                </select>
                                            </th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">re</th>
                                            <th class="py-2 px-4"><input type="text" name="re" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="re" value="7.50" placeholder="re" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">γ albanileria</th>
                                            <th class="py-2 px-4"><input type="text" name="yalba" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="yalba" value="1800" placeholder="1800" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">kg/cm<sup>3</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">γ C° simple</th>
                                            <th class="py-2 px-4"><input type="text" name="ycsimple" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="ycsimple" value="2300" placeholder="2300" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">kg/cm<sup>3</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4"> γ C° armado</th>
                                            <th class="py-2 px-4"><input type="text" name="ycarmado" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="ycarmado" value="2400" placeholder="2400" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">kg/cm<sup>3</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Esf Adm del Terr (σt)</th>
                                            <th class="py-2 px-4"><input type="text" name="esadterr" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="esadterr" value="0.90" placeholder="0.90" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">kg/cm<sup>2</sup></th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Prof de la Ciment (Df)</th>
                                            <th class="py-2 px-4"><input type="text" name="pdcimt" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="pdcimt" value="1.40" placeholder="1.40" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">γ prom</th>
                                            <th class="py-2 px-4"><input type="text" name="yprom" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="yprom" value="1" placeholder="1" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">Ton/m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">s/c</th>
                                            <th class="py-2 px-4"><input type="text" name="sc" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="sc" value="0.20" placeholder="0.20" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">Ton/m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">Esp. muro</th>
                                            <th class="py-2 px-4"><input type="text" name="esmuro" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="esmuro" value="0.25" placeholder="0.25" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Carga Muerta</th>
                                            <th class="py-2 px-4">CM</th>
                                            <th class="py-2 px-4"><input type="text" name="CM" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="CM" value="6805" placeholder="6805" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">kg/m</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Carga Viva</th>
                                            <th class="py-2 px-4">CV</th>
                                            <th class="py-2 px-4"><input type="text" name="CV" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="CV" value="600" placeholder="600" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">kg/m</th>
                                        </tr>
                                        <tr>
                                            <th class="py-2 px-4">
                                                <div class="input-group mb-2">
                                                    <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="submit">DISEÑAR</button>
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
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">DISEÑO DE CIMIENTO CORRIDO</h3>
                        <div class="overflow-x-auto">
                            <div id="main" style="width: 100%; height: 600px;"></div>
                            <div class="card-body" id="ObtenerResultadosCimiento"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('assets/js/adm_cimiento_corrido.js') }}"></script>

</x-app-layout>