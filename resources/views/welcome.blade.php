<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Rizabal Asociados</title>
    <link rel="icon" type="image/x-icon" href="{{ url('/assets/img/logo_rizabalAsociados.png') }}">
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>

</head>

<body class="antialiased bg-gray-100 dark:bg-gray-900">

    <!-- Navbar -->
    <nav class="bg-gray-100 dark:bg-gray-900 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <a href="#" class="text-white text-lg font-bold py-2">
                <style>
                    /* Estilo por defecto para el tema claro */
                    .logo {
                        filter: invert(0);
                    }

                    /* Estilo para el tema oscuro */
                    @media (prefers-color-scheme: dark) {
                        .logo {
                            filter: invert(1);
                        }
                    }
                </style>
                <img class="mx-auto rounded-full h-20 w-20 py-2 logo" src="{{ url('/assets/img/logo_rizabalAsociados.png') }}" alt="author avatar">
            </a>
            <div class="hidden md:flex space-x-4">
                <a href="#" class="text-gray-950 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white py-2">Inicio</a>
                <div class="relative group">
                    <button class="text-gray-950 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white py-2">Servicios</button>
                    <div class="absolute hidden group-hover:block bg-gray-700 text-white mt-2 rounded shadow-lg py[-4]">
                        <a href="#" class="block px-4 py-2 hover:bg-gray-600">en construccion</a>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-600">en construccion</a>
                    </div>
                </div>
                <div class="relative group">
                    <button class="text-gray-950 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white py-2">Más</button>
                    <div class="absolute hidden group-hover:block bg-gray-700 text-white mt-2 rounded shadow-lg">
                        <a href="#" class="block px-4 py-2 hover:bg-gray-600">en construccion</a>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-600">en construccion</a>
                    </div>
                </div>
                <a href="#" class="text-gray-950 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white py-2">Contacto</a>
                <a href="#" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Prueba Gratis</a>
            </div>
            <button class="md:hidden text-gray-300 focus:outline-none" id="menu-button">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
        <div class="hidden md:hidden" id="mobile-menu">
            <a href="#" class="block text-gray-950 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white px-4 py-2">Inicio</a>
            <div class="relative group">
                <button class="block text-gray-950 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white px-4 py-2">Servicios</button>
                <div class="hidden group-hover:block bg-gray-700 text-white mt-2 rounded shadow-lg">
                    <a href="#" class="block px-4 py-2 hover:bg-gray-600">Servicio 1</a>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-600">Servicio 2</a>
                </div>
            </div>
            <div class="relative group">
                <button class="block text-gray-950 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white px-4 py-2">Más</button>
                <div class="hidden group-hover:block bg-gray-700 text-white mt-2 rounded shadow-lg">
                    <a href="#" class="block px-4 py-2 hover:bg-gray-600">Opción 1</a>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-600">Opción 2</a>
                </div>
            </div>
            <a href="#" class="block text-gray-950 dark:text-gray-100 hover:text-gray-700 dark:hover:text-white px-4 py-2">Contacto</a>
            <a href="#" class="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Prueba Gratis</a>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="relative flex flex-col items-center justify-center min-h-screen py-6">
        <div class="max-w-7xl mx-auto p-6 lg:p-8">
            <!-- Grid 2x2 with Tailwind CSS -->
            <div class="grid grid-cols-2 gap-4">
                <!-- First row, first column (Logo) -->
                <div class="flex flex-col items-center justify-center bg-white p-6 rounded shadow">
                    <img class="rounded-full h-20 w-20" src="{{ url('/assets/img/logo_rizabalAsociados.png') }}" alt="Rizabal Asociados Logo">
                    <p class="mt-4 text-gray-700 text-center">
                        Rizabal Asociados es una empresa dedicada al diseño de estructuras de ingeniería civil mediante planos, ofreciendo soluciones innovadoras y de alta calidad.
                    </p>
                </div>
                <!-- First row, second column -->
                <div class="bg-white p-6 rounded shadow">
                    <!-- Session Status -->
                    <x-auth-session-status class="mb-4" :status="session('status')" />
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <!-- Email Address -->
                        <div>
                            <x-input-label for="email" :value="__('Email')" />
                            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
                            <x-input-error :messages="$errors->get('email')" class="mt-2" />
                        </div>
                        <!-- Password -->
                        <div class="mt-4">
                            <x-input-label for="password" :value="__('Password')" />
                            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="current-password" />
                            <x-input-error :messages="$errors->get('password')" class="mt-2" />
                        </div>

                        <!-- Remember Me -->
                        <div class="block mt-4">
                            <label for="remember_me" class="inline-flex items-center">
                                <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" name="remember">
                                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('recordar cuenta') }}</span>
                            </label>
                        </div>

                        <div class="flex items-center justify-end mt-4">
                            @if (Route::has('password.request'))
                            <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('password.request') }}">
                                {{ __('olvidaste tu contraseña?') }}
                            </a>
                            @endif

                            <x-primary-button class="ms-3">
                                {{ __('Iniciar Session') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        const menuButton = document.getElementById('menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    </script>
</body>

</html>