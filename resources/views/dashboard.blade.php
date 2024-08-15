<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="flex flex-wrap">
                <div class="w-full md:w-2/3">
                    <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">Nuestros
                            Aplicativos</h2>

                        <!-- Vigas -->
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">vigas</h3>
                        <div class="overflow-auto">
                            <div class="container mx-auto px-4">
                                <div class="grid grid-cols-5 gap-4">
                                    <a href="{{ url('admDvigas') }}">
                                        <div
                                            class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <div class="flex items-center">
                                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                    </path>
                                                </svg>
                                                <span>Diseño de Vigas</span>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="{{ url('admvigasG') }}">
                                        <div
                                            class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <div class="flex items-center">
                                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                    </path>
                                                </svg>
                                                <span>Vigas General</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Losas -->
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Losas</h3>
                        <div class="overflow-auto">
                            <div class="container mx-auto px-4">
                                <div class="grid grid-cols-4 gap-4">
                                    <a href="{{ url('admlosasaligerada') }}">
                                        <div
                                            class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <div class="flex items-center">
                                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                    </path>
                                                </svg>
                                                <span>Diseño de losas Aligeradas</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="{{ url('admlosasmaciza') }}">
                                        <div
                                            class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <div class="flex items-center">
                                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                    </path>
                                                </svg>
                                                <span>Diseño de losas Macizas</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Columnas -->
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Losas</h3>
                        <div class="overflow-auto">
                            <div class="container mx-auto px-4">
                                <div class="grid grid-cols-4 gap-4">
                                    <a href="{{ url('admColumna') }}">
                                        <div
                                            class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <div class="flex items-center">
                                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                    </path>
                                                </svg>
                                                <span>Diseño de Columnas</span>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            </div>
                        </div>
                        <!-- Muros de contencion -->
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Muros de contencion</h3>
                        <div class="overflow-auto">
                            <div class="container mx-auto px-4">
                                <div class="grid grid-cols-3 gap-4">
                                    <a href="{{ url('admMurosContencion') }}">
                                        <div
                                            class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <div class="flex items-center">
                                                <svg class="w-10 h-6 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                    </path>
                                                </svg>
                                                <span>Diseño de Muros de Contencion</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Zapata -->
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Zapatas</h3>
                        <div class="overflow-auto">
                            <div class="container mx-auto px-4">
                                <div class="grid grid-cols-5 gap-4">
                                    <a href="{{ url('admZapataCombinada') }}">
                                        <div
                                            class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <div class="flex items-center">
                                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                    </path>
                                                </svg>
                                                <span>Zapata Combinada</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="{{ url('admZapataConectada') }}">
                                        <div
                                            class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            <div class="flex items-center">
                                                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                    </path>
                                                </svg>
                                                <span>Zapata Conectada</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- cimiento corrido -->
                        <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Cimiento Corrido</h3>
                        <div class="overflow-auto">
                            <div class="container mx-auto px-4">
                                <div class="grid grid-cols-5 gap-4">
                                    <div
                                        class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <div class="flex items-center">
                                            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                </path>
                                            </svg>
                                            <span>Cimiento corrido</span>
                                        </div>
                                    </div>

                                    <div
                                        class="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <div class="flex items-center">
                                            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-12 0v1z">
                                                </path>
                                            </svg>
                                            <span>Cimiento corrido</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3 px-4 mt-4 md:mt-0">
                    <div class="w-96 px-6 py-6  text-center bg-gray-800 rounded-lg lg:mt-0 xl:px-10">
                        <div class="space-y-4 xl:space-y-6">
                            <img class="mx-auto rounded-full h-36 w-36" src="{{ url('/assets/img/avatarra.jpeg') }}"
                                alt="author avatar">
                            <div class="space-y-2">
                                <div
                                    class="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                                    <h3 class="text-white">{{ Auth::user()->name }}</h3>
                                    <p class="text-indigo-500">Cuenta gratuita</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
