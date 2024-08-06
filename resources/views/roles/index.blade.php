<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('gestion de roles') }}
            @can('role-create')
            <a class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" href="{{ route('roles.create') }}"> Nuevo Rol</a>
            @endcan
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                @if ($message = Session::get('success'))
                <div class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                    <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">Success</span>
                    <div>
                        <span class="font-medium">Success!</span> {{ $message }}
                    </div>
                </div>
                @endif
                <table class="table-auto w-full text-gray-800 dark:text-white px-6">
                    <thead class="bg-gray-200 dark:bg-gray-700">
                        <tr class="text-center">
                            <th class="py-2 px-4">Nombre</th>
                            <th class="py-2 px-4">Ver mas</th>
                            <th class="py-2 px-4">Editar</th>
                            <th class="py-2 px-4">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        @foreach ($roles as $key => $role)
                        <tr class="bg-gray-100 dark:bg-gray-600">
                            <th class="py-2 px-4">{{ $role->name }}</th>
                            <form action="{{ route('roles.destroy', $role->id) }}" method="POST">
                                <th class="py-2 px-4">
                                    <a class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" href="{{ route('roles.show', $role->id) }}">Show</a>
                                </th>
                                <th class="py-2 px-4">
                                    @can('role-edit')
                                    <a class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" href="{{ route('roles.edit', $role->id) }}">Edit</a>
                                    @endcan
                                </th>
                                <th class="py-2 px-4">
                                    @csrf
                                    @method('DELETE')
                                    @can('role-delete')
                                    <button type="submit" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                    @endcan
                                </th>
                            </form>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                {!! $roles->render() !!}
            </div>
        </div>
    </div>
</x-app-layout>