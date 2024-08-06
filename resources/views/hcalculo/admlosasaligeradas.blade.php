<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Diseño de Losas Aligeradas') }}
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
    <div class="py-12">
        <div class="container mx-auto w-full">
            <div class="flex flex-wrap">
                <!-- Formulario -->
                <div class="w-full md:w-1/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Datos Generales</h3>
                        <div class="overflow-auto">
                            <form  id="FlexionViga" method="POST" action="{{ route('desingLosa') }}">
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
                                            <th class="py-2 px-4">N° tramos</th>
                                            <th class="py-2 px-4">#</th>
                                            <th class="py-2 px-4"><input type="text" name="num_tramos" class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md" id="num_tramos" value="1" placeholder="tramos" min="0" required oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></th>
                                            <th class="py-2 px-4"></th>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table-auto w-full text-gray-800 dark:text-white px-6" id="LuzLibreTramo">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Luz libre (m)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Carga Muerta (Ton. m)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Carga Viva (Ton. m)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Base (cm)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Altura (losa)(cm)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">b (cm)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Mi (Tonf-m)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Md (Tonf-m)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">δ1 (cm)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">δ2 (cm)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">δ3 (cm)</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table-auto w-full text-gray-800 dark:text-white px-6" id="tablaTramos">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Eje</th>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                        </tr>
                                        <tr class="bg-primary">
                                            <th scope="row">Negativo(-)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                        </tr>
                                        <tr>
                                            <th scope="row">MU (TN-M)-</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vu (TNF)-</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tu (TNF)-</th>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                        </tr>
                                        <tr class="bg-primary">
                                            <th scope="row">Positivo(+)</th>
                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                        </tr>
                                        <tr>
                                            <th scope="row">MU (TN-M)+</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Vu (TNF)+</th>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tu (TNF)+</th>
                                        </tr>
                                    </tbody>
                                </table>
                                <br>
                                <br>
                                <div class="col-md-3">
                                    <div class="input-group mb-2">
                                        <button type="submit" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">DISEÑAR</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Resultados -->
                <div class="w-full md:w-2/3 px-4 mt-4 md:mt-0">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Resultados</h3>
                        <div class="overflow-x-auto">
                            <div class="table-responsive" id="ObtenerResultados"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js"></script>
    <script src="{{ asset('assets/js/adm_losas_aligeradas.js') }}"></script>

</x-app-layout>