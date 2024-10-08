<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Predim</title>
    <link rel="stylesheet" href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.min.css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="antialiased bg-gray-100 dark:bg-gray-900">

    <style>
        /* Static Section (.col-md-12) */
        .col-md-12 {
            height: 150px;
            /* Set a fixed height for static behavior */
            overflow: hidden;
            /* Hide any content that overflows */
        }

        /* Scrollable Section (.drawing-board.col-md-12) */
        .drawing-board.col-md-12 {
            height: 500px;
            /* Set a desired height for the scrollable area */
            width: 1200px;
            overflow-y: auto;
            /* Enable vertical scrolling */
            overflow-x: auto;
        }
    </style>

    <div class="w-full  ">
        <div class="bg-white dark:bg-gray-900 shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"></h3>
            <div class="overflow-x-auto">
                <div class="border-b border-gray-200 dark:border-gray-700 mb-4 text-gray-950 dark:text-white">
                    <ul class="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li class="mr-2" role="presentation">
                            <button
                                class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active"
                                id="profile-tab" data-tabs-target="#profile" type="button" role="tab"
                                aria-controls="profile" aria-selected="true">
                                Archivo
                            </button>
                        </li>
                        <li class="mr-2" role="presentation">
                            <button
                                class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                                id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab"
                                aria-controls="dashboard" aria-selected="false">
                                Columnas
                            </button>
                        </li>
                        <li class="mr-2" role="presentation">
                            <button
                                class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                                id="settings-tab" data-tabs-target="#settings" type="button" role="tab"
                                aria-controls="settings" aria-selected="false">
                                Vigas
                            </button>
                        </li>
                        <li role="presentation">
                            <button
                                class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                                id="contacts-tab" data-tabs-target="#contacts" type="button" role="tab"
                                aria-controls="contacts" aria-selected="false">
                                Zapata
                            </button>
                        </li>
                        <li role="presentation">
                            <button
                                class="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300"
                                id="losas-tab" data-tabs-target="#losas" type="button" role="tab"
                                aria-controls="losas" aria-selected="false">
                                Lozas
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="myTabContent">
                    <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 text-gray-950 dark:text-white" id="profile"
                        role="tabpanel" aria-labelledby="profile-tab">
                        <div class="grid grid-cols-4 gap-4">
                            <div>
                                <button class="btn create-new">
                                    <i class="ri-file-pdf-2-line"></i> Nuevo
                                </button>
                            </div>
                            <div>
                                <button class="btn save-img">
                                    <i class="ri-save-line"></i> Guardar
                                </button>
                            </div>
                            <div>
                                <button class="btn clear-canvas">
                                    <i class="ri-delete-bin-6-line"></i> Eliminar
                                </button>
                            </div>
                            <div>
                                <div class="">
                                    <label for="upload-pdf" class="btn upload-label">
                                        <i class="ri-chat-upload-line"></i> Cargar
                                    </label>
                                    <input type="file" id="upload-pdf" accept=".pdf" style="display: none" />
                                </div>
                            </div>
                            <div>
                                <button data-modal-target="static-modal" data-modal-toggle="static-modal"
                                    type="button">
                                    Reportes
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 text-gray-950 dark:text-white hidden"
                        id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                        <div class="grid grid-cols-10 gap-10">
                            <label type="hidden"
                                data-id="{{ url('/assets/pdf/4.-PLANIMETRIA MODULOS I pdf.pdf') }}">pei</label>
                            <div>
                                <button class="btn btn-sm tool" data-tool="rectangle" title="Rectángulo">
                                    <i class="ri-rectangle-line"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-sm tool" data-tool="cuadrado" title="Cuadrado">
                                    <i class="ri-square-line"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-sm tool" data-tool="circulo" title="Círculo">
                                    <i class="ri-circle-line"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-sm tool" data-tool="te" title="T">
                                    <i class="ri-t-box-line"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-sm tool" data-tool="ele" title="T">
                                    <i class="ri-ruler-2-line"></i>
                                </button>
                            </div>
                            <div>
                                <label for="npisos" class="text-center col-sm-6 col-form-label">Cantidad de
                                    pisos</label>
                            </div>
                            <div>
                                <input type="number" id="npisos"
                                    class="form-control w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 px-1 rounded-md"
                                    value="1" min="1" />
                            </div>
                            <div>
                                <label for="color_linea"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                <input id="color_linea" type="color" value="#4A98F7">
                            </div>
                            <div>
                                <label for="range_linea"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default
                                    range</label>
                                <input id="range_linea" type="range" value="2" min="0" max="10"
                                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                            </div>
                        </div>
                    </div> <!----->
                    <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 text-gray-950 dark:text-white hidden"
                        id="settings" role="tabpanel" aria-labelledby="settings-tab">
                        <div class="grid grid-cols-10 gap-10">
                            <div>
                                <button class="btn btn-sm tool" data-tool="cuadradovigas" title="Vigas">
                                    <i class="ri-t-box-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 text-gray-950 dark:text-white hidden"
                        id="contacts" role="tabpanel" aria-labelledby="contacts-tab">
                        <div class="flex items-center">
                            <!-- Contenedor flex para alinear elementos -->
                            <button class="btn btn-sm tool" data-tool="cuadradozapata" title="CuadradoZapata">
                                <i class="ri-square-line"></i>
                            </button>
                            <div class="ml-12">
                                <!-- Incremento mayor de margen izquierdo -->
                                <div>
                                    <label for="Zpisos" class="text-center col-sm-6 col-form-label">Cantidad de
                                        pisos
                                    </label>
                                </div>
                                <div>
                                    <input type="number" id="Zpisos" class="form-control" value="0"
                                        min="0" />
                                </div>
                            </div>
                            <div class="ml-12">
                                <!-- Incremento mayor de margen izquierdo de suelos  -->
                                <div>
                                    <label for="Zpisos" class="text-center col-sm-6 col-form-label">Capacidad de
                                        suelos
                                    </label>
                                </div>
                                <div>
                                    <input type="number" id="Zsuelos" class="form-control" value="0"
                                        min="0" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 text-gray-950 dark:text-white hidden"
                        id="losas" role="tabpanel" aria-labelledby="losas-tab">
                        <button>
                            <div>
                                <button class="btn btn-sm tool" data-tool="cuadradolosas" title="CuadradoLosas">
                                    <i class="ri-ruler-2-fill"></i>
                                </button>
                            </div>
                        </button>

                    </div>
                </div>
                <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
                    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-2xl max-h-full">
                        <!-- Modal content -->
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <!-- Modal header -->
                            <div
                                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Reportes Predim
                                </h3>
                                <button type="button"
                                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="static-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="relative overflow-x-auto">
                                <table
                                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">Elementos</th>
                                            <th scope="col" class="px-6 py-3">Tipo</th>
                                            <th scope="col" class="px-6 py-3">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Columna
                                            </th>
                                            <td class="px-6 py-4">
                                                <!-- Tabla anidada -->
                                                <table
                                                    class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead
                                                        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" class="px-2 py-1">Subelemento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">Rectangulo</td>
                                                        </tr>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">Cuadro</td>
                                                        </tr>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">Circulo</td>
                                                        </tr>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">Te</td>
                                                        </tr>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">Le</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td class="px-6 py-4">
                                                <!-- Tabla anidada para la columna "Cantidad" -->
                                                <table
                                                    class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <tbody>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">
                                                                <p id="rectangulo-count">0</p>
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">
                                                                <p id="cuadro-count">0</p>
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">
                                                                <p id="circulo-count">0</p>
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">
                                                                <p id="te-count">0</p>
                                                            </td>
                                                        </tr>
                                                        <tr
                                                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                            <td class="px-2 py-1">
                                                                <p id="le-count">0</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Vigas
                                            </th>
                                            <td class="px-6 py-4">vigas</td>
                                            <td class="px-6 py-4">
                                                <p id="vigas-count">0</p>
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Zapata
                                            </th>
                                            <td class="px-6 py-4">zapata</td>
                                            <td class="px-6 py-4">
                                                <p id="zapata-count">0</p>
                                            </td>
                                        </tr>
                                        <tr class="bg-white dark:bg-gray-800">
                                            <th scope="row"
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Lozas
                                            </th>
                                            <td class="px-6 py-4">losas</td>
                                            <td class="px-6 py-4">
                                                <p id="losas-count">0</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- /// -->
                            <div
                                class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button data-modal-hide="static-modal" type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Guardar
                                </button>
                                <button data-modal-hide="static-modal" type="button"
                                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <section class="drawing-board col-md-12">
                    <canvas id="canvas" class="border"></canvas>
                </section>
            </div>
        </div>
    </div>


    

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js"></script>
    <script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></script>
    <script src="{{ asset('assets/js/adm_predim_view.js') }}"></script>
</body>

</html>
