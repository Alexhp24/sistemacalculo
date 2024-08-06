<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Detalle del rol') }}
            <a class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" href="{{ route('roles.index') }}"> regresar</a>
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="col-xs-12 mb-3">
                    <div class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" >
                        <strong>Name:</strong>
                        {{ $role->name }}
                    </div>
                </div>
                <div class="col-xs-12 mb-3">
                    <div class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        <strong>Permissions:</strong>
                        @if (!empty($rolePermissions))
                        @foreach ($rolePermissions as $v)
                        <label class="label label-secondary text-dark">{{ $v->name }},</label>
                        @endforeach
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>