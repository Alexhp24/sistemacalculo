<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Diseño de Losas Macizas') }}
        </h2>
    </x-slot>
    <script>
        MathJax = {
            loader: {
                load: ['input/asciimath', 'output/chtml']
            }
        }
    </script>
    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form id="datosForm" method="post">
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
                                            <th class="py-2 px-4">b</th>
                                            <th class="py-2 px-4"><input type="text" name="b" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="b" value="100" placeholder="b" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">-</th>
                                            <th class="py-2 px-4">t</th>
                                            <th class="py-2 px-4"><input type="text" name="t" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="t" value="100" placeholder="t" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">cm</th>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th class="py-2 px-4">Momento ultimo</th>
                                            <th class="py-2 px-4">Mu</th>
                                            <th class="py-2 px-4"><input type="text" name="mu" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="mu" value="1400000" placeholder="momento ulitmo" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4">Kg/cm</th>
                                        </tr>
                                        <tr>
                                            <th class="py-2 px-4">
                                                <div class="input-group mb-2">
                                                    <button type="submit" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" type="button">DISEÑAR</button>
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
                            <table id="desingcorte" class="min-w-full text-gray-800 dark:text-white">
                                <!-- Requisitos de diseño vigas -->
                                <thead class="bg-gray-200 dark:bg-gray-800">
                                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                        <th class="text-xl py-2 px-4 text-left" colspan="4">1.- Requisitos de diseño</th>
                                    </tr>
                                    <tr class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                        <th class="text-lg py-2 px-4" scope="col">Nombre</th>
                                        <th class="text-lg py-2 px-4" scope="col">Símbolo</th>
                                        <th class="text-lg py-2 px-4" scope="col">Fórmula</th>
                                        <th class="text-lg py-2 px-4" scope="col">Resultado</th>
                                    </tr>
                                </thead>
                                <tbody id="resultadosiniciales" class="bg-gray-100 dark:bg-gray-800  py-2"></tbody>

                                <thead class="bg-gray-200 dark:bg-gray-700">
                                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                        <th class="text-xl py-2 px-4 text-left" colspan="4">2.- Diseño por flexion</th>
                                    </tr>
                                    <tr class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                        <th class="text-xl" scope="col">Nombre</th>
                                        <th class="text-xl" scope="col">Simbolo</th>
                                        <th class="text-xl" scope="col">Formula</th>
                                        <th class="text-xl" scope="col">Resultado</th>
                                    </tr>
                                </thead>
                                <tbody id="resultadoflexion" class="py-2"></tbody>

                                <thead class="bg-gray-200 dark:bg-gray-700">
                                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                        <th class="text-xl py-2 px-4 text-left" colspan="4">3.- Diseño por Corte</th>
                                    </tr>
                                    <tr class="bg-gray-500 text-white dark:bg-gray-500 dark:text-white">
                                        <th class="text-xl" scope="col">Nombre</th>
                                        <th class="text-xl" scope="col">Simbolo</th>
                                        <th class="text-xl" scope="col">Formula</th>
                                        <th class="text-xl" scope="col">Resultado</th>
                                    </tr>
                                    <tr class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                                        <th class="text-xm py-2 px-4 text-left" colspan="4">3.1- Calcular corte a una distancia</th>
                                    </tr>
                                </thead>
                                <tbody id="resuladocorte" class="py-2"></tbody>
                                <!-- Diseño del calculo del area del refuerzo  -->
                                <thead class="bg-gray-200 dark:bg-gray-700"></thead>
                                <tbody id="resultados2" class="py-2"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js"></script>
    <script src="{{ asset('assets/js/adm_losas_macisa.js') }}"></script>

</x-app-layout>